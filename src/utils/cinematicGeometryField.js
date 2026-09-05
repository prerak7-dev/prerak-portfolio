import { createAssetPath } from '../security/contentSecurity.js';

const FIELD_WIDTH = 640;
const FIELD_HEIGHT = 360;
const STREAMLINE_COUNT = 128;
const STREAMLINE_STEPS = 160;
const STEP_LENGTH = 1.48;
const fieldCache = new Map();
const focusedStreamlineCache = new WeakMap();
const TAU = Math.PI * 2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function sampleField(field, x, y) {
  const safeX = clamp(x, 0, field.width - 1);
  const safeY = clamp(y, 0, field.height - 1);
  const left = Math.floor(safeX);
  const top = Math.floor(safeY);
  const right = Math.min(field.width - 1, left + 1);
  const bottom = Math.min(field.height - 1, top + 1);
  const mixX = safeX - left;
  const mixY = safeY - top;
  const sampleChannel = (channel) => {
    const topLeft = field.data[(top * field.width + left) * 4 + channel];
    const topRight = field.data[(top * field.width + right) * 4 + channel];
    const bottomLeft = field.data[(bottom * field.width + left) * 4 + channel];
    const bottomRight = field.data[(bottom * field.width + right) * 4 + channel];
    const upper = topLeft + (topRight - topLeft) * mixX;
    const lower = bottomLeft + (bottomRight - bottomLeft) * mixX;
    return upper + (lower - upper) * mixY;
  };
  const tangentX = sampleChannel(0) / 127.5 - 1;
  const tangentY = sampleChannel(1) / 127.5 - 1;
  const length = Math.max(0.0001, Math.hypot(tangentX, tangentY));
  return {
    tangentX: tangentX / length,
    tangentY: tangentY / length,
    energy: sampleChannel(2) / 255,
    mask: sampleChannel(3) / 255,
  };
}

function traceDirection(field, seed, direction, maxSteps = STREAMLINE_STEPS) {
  const points = [];
  let x = seed.x;
  let y = seed.y;
  let previousX = 0;
  let previousY = 0;
  let hasPrevious = false;

  for (let index = 0; index < maxSteps; index += 1) {
    const sample = sampleField(field, x, y);
    if (index > 5 && (sample.energy < 0.055 || sample.mask < 0.08)) break;
    let tangentX = sample.tangentX * direction;
    let tangentY = sample.tangentY * direction;
    if (hasPrevious && tangentX * previousX + tangentY * previousY < 0) {
      tangentX *= -1;
      tangentY *= -1;
    }
    points.push({
      x: x / field.width,
      y: y / field.height,
      energy: sample.energy,
    });
    previousX = tangentX;
    previousY = tangentY;
    hasPrevious = true;
    const localStep = STEP_LENGTH * (0.78 + sample.energy * 0.5);
    x += tangentX * localStep;
    y += tangentY * localStep;
    if (x < 1 || x >= field.width - 1 || y < 1 || y >= field.height - 1) break;
  }
  return points;
}

function readFocusDistance(focus, x, y) {
  const normalizedX = (x - focus.centerX) / Math.max(0.0001, focus.radiusX);
  const normalizedY = (y - focus.centerY) / Math.max(0.0001, focus.radiusY);
  const radialDistance = Math.hypot(normalizedX, normalizedY);
  let angle = Math.atan2(normalizedY, normalizedX);
  if (angle < 0) angle += TAU;
  const startAngle = focus.startAngle ?? 0;
  const endAngle = focus.endAngle ?? TAU;
  const angleInside = startAngle <= endAngle
    ? angle >= startAngle && angle <= endAngle
    : angle >= startAngle || angle <= endAngle;
  return {
    radialError: Math.abs(radialDistance - 1),
    angleInside,
  };
}

function clipPathToFocus(points, focus) {
  if (!focus) return points;
  const band = (focus.band ?? 0.12) * 1.42;
  let longest = [];
  let current = [];
  points.forEach((point) => {
    const sample = readFocusDistance(focus, point.x, point.y);
    if (sample.angleInside && sample.radialError <= band) {
      current.push(point);
      if (current.length > longest.length) longest = current.slice();
    } else {
      current.length = 0;
    }
  });
  return longest;
}

function buildStreamlines(field, seed, options = {}) {
  const focus = options.focus || null;
  const targetCount = options.count || STREAMLINE_COUNT;
  const candidateStride = focus ? 4 : 5;
  const candidates = [];
  for (let y = 2; y < field.height - 2; y += candidateStride) {
    for (let x = 2; x < field.width - 2; x += candidateStride) {
      const sample = sampleField(field, x, y);
      if (sample.energy < 0.14 || sample.mask < 0.17) continue;
      let focusScore = 0;
      if (focus) {
        const focusSample = readFocusDistance(focus, x / field.width, y / field.height);
        const band = focus.band ?? 0.12;
        if (!focusSample.angleInside || focusSample.radialError > band) continue;
        focusScore = 1 - focusSample.radialError / band;
      }
      candidates.push({
        x,
        y,
        score: sample.energy * (focus ? 0.7 : 0.84)
          + sample.mask * (focus ? 0.12 : 0.16)
          + focusScore * (focus ? 0.18 : 0),
      });
    }
  }
  candidates.sort((from, to) => to.score - from.score);
  if (!candidates.length) return [];

  const random = createRandom(seed);
  const streamlines = [];
  const acceptedSeeds = [];
  let attempts = 0;
  while (streamlines.length < targetCount && attempts < targetCount * (focus ? 26 : 18)) {
    attempts += 1;
    const rankedIndex = Math.min(
      candidates.length - 1,
      Math.floor(Math.pow(random(), 1.72) * candidates.length),
    );
    const candidate = candidates[rankedIndex];
    const minimumDistance = focus
      ? 2.8 + random() * 5.2
      : 5.5 + random() * 8.5;
    if (acceptedSeeds.some((point) => Math.hypot(point.x - candidate.x, point.y - candidate.y) < minimumDistance)) {
      continue;
    }
    const maxSteps = focus ? 210 : STREAMLINE_STEPS;
    const backward = traceDirection(field, candidate, -1, maxSteps).reverse();
    const forward = traceDirection(field, candidate, 1, maxSteps);
    const tracedPoints = [...backward.slice(0, -1), ...forward];
    const points = clipPathToFocus(tracedPoints, focus);
    if (points.length < (focus ? 12 : 18)) continue;
    acceptedSeeds.push(candidate);
    streamlines.push(Object.freeze({
      points: Object.freeze(points),
      phase: random(),
      speed: focus ? 0.012 + random() * 0.022 : 0.017 + random() * 0.028,
      trail: focus ? 0.17 + random() * 0.23 : 0.11 + random() * 0.19,
      width: focus ? 0.28 + random() * 0.72 : 0.34 + random() * 0.94,
      alpha: focus ? 0.13 + random() * 0.27 : 0.09 + random() * 0.22,
      depth: random(),
      colorIndex: Math.floor(random() * 4),
      pulse: random() * Math.PI * 2,
    }));
  }
  return Object.freeze(streamlines);
}

function decodeImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load cinematic geometry field: ${url}`));
    image.src = url;
  });
}

async function decodeGeometryField(filename) {
  const url = createAssetPath(import.meta.env.BASE_URL, filename);
  const image = await decodeImage(url);
  const canvas = document.createElement('canvas');
  canvas.width = FIELD_WIDTH;
  canvas.height = FIELD_HEIGHT;
  const context = canvas.getContext('2d', { alpha: true, willReadFrequently: true });
  if (!context) throw new Error('Unable to decode cinematic geometry field.');
  context.drawImage(image, 0, 0, FIELD_WIDTH, FIELD_HEIGHT);
  const data = context.getImageData(0, 0, FIELD_WIDTH, FIELD_HEIGHT).data;
  const field = {
    filename,
    image,
    width: FIELD_WIDTH,
    height: FIELD_HEIGHT,
    data,
  };
  field.streamlines = buildStreamlines(field, hashString(filename));
  return Object.freeze(field);
}

export function loadCinematicGeometryField(filename) {
  if (!filename) return Promise.resolve(null);
  if (!fieldCache.has(filename)) {
    fieldCache.set(filename, decodeGeometryField(filename).catch((error) => {
      fieldCache.delete(filename);
      throw error;
    }));
  }
  return fieldCache.get(filename);
}

export function getFocusedCinematicStreamlines(field, focus, cacheKey = 'focus') {
  if (!field || !focus) return Object.freeze([]);
  let cache = focusedStreamlineCache.get(field);
  if (!cache) {
    cache = new Map();
    focusedStreamlineCache.set(field, cache);
  }
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, buildStreamlines(
      field,
      hashString(`${field.filename}:${cacheKey}`),
      { focus, count: focus.count || 58 },
    ));
  }
  return cache.get(cacheKey);
}

export function projectGeometryPoint(point, projection, localOffset = null) {
  const x = projection.left + point.x * projection.width;
  const y = projection.top + point.y * projection.height;
  return localOffset
    ? { x: x - localOffset.left, y: y - localOffset.top }
    : { x, y };
}

export const CINEMATIC_GEOMETRY_FIELD_SIZE = Object.freeze({
  width: FIELD_WIDTH,
  height: FIELD_HEIGHT,
});
