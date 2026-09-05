import { memo, useEffect, useRef } from 'react';
import { getSwarmScenePaletteBlend } from '../data/swarmScenePalettes.js';
import { getTracerSceneBlend } from '../data/tracerSceneFields.js';
import { getSpatialMotion, subscribeSpatialMotion } from '../state/spatialMotionStore.js';

const TAU = Math.PI * 2;
const MAX_PIXEL_RATIO = 1.5;
const TARGET_SELECTOR = '[data-tracer-prop]';
const LOOP_SECONDS = 48;

const TARGET_CONFIGS = Object.freeze({
  action: Object.freeze({ count: 8, crossing: 0.2, expand: 5, exponent: 4.8, speed: 68, traceMin: 18, traceMax: 30 }),
  slab: Object.freeze({ count: 13, crossing: 0.28, expand: 8, exponent: 5.4, speed: 78, traceMin: 23, traceMax: 38 }),
  compact: Object.freeze({ count: 7, crossing: 0.18, expand: 5, exponent: 5.1, speed: 64, traceMin: 18, traceMax: 28 }),
  topology: Object.freeze({ count: 10, crossing: 0.24, expand: 7, exponent: 5.3, speed: 72, traceMin: 22, traceMax: 34 }),
  lore: Object.freeze({ count: 20, crossing: 0.34, expand: 11, exponent: 5.5, speed: 70, traceMin: 27, traceMax: 44 }),
});

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function rgba(color, alpha) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
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

function wrapUnit(value) {
  return value - Math.floor(value);
}

function superellipsePoint(turn, width, height, config) {
  const angle = turn * TAU - Math.PI / 2;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const radiusX = Math.max(8, width / 2 + config.expand);
  const radiusY = Math.max(8, height / 2 + config.expand);
  const power = 2 / config.exponent;
  const x = width / 2 + radiusX * Math.sign(cosine || 1) * Math.pow(Math.abs(cosine), power);
  const y = height / 2 + radiusY * Math.sign(sine || 1) * Math.pow(Math.abs(sine), power);
  const normalX = (x - width / 2) / Math.max(1, radiusX * radiusX);
  const normalY = (y - height / 2) / Math.max(1, radiusY * radiusY);
  const normalLength = Math.max(0.0001, Math.hypot(normalX, normalY));
  return { x, y, normalX: normalX / normalLength, normalY: normalY / normalLength };
}

function nearestSourceTurn(width, height, config, sourceLocal) {
  let closestTurn = 0;
  let closestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < 72; index += 1) {
    const turn = index / 72;
    const point = superellipsePoint(turn, width, height, config);
    const distance = Math.hypot(point.x - sourceLocal.x, point.y - sourceLocal.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestTurn = turn;
    }
  }
  return closestTurn;
}

function createAgent(random, config, index) {
  const traceLimit = Math.round(config.traceMin + random() * (config.traceMax - config.traceMin));
  return {
    direction: random() < 0.5 ? -1 : 1,
    startJitter: (random() - 0.5) * 0.15,
    loopPhase: random(),
    loopCount: 2 + Math.floor(random() * 5),
    crossing: random() < config.crossing,
    interiorPull: 0.2 + random() * 0.46,
    sourcePull: 14 + random() * 42,
    normalAmplitude: 1.4 + random() * 7.2,
    normalHarmonic: 1 + Math.floor(random() * 4),
    normalPhase: random() * TAU,
    turnAmplitude: 0.0012 + random() * 0.0042,
    turnHarmonic: 1 + Math.floor(random() * 3),
    turnPhase: random() * TAU,
    widthPhase: random() * TAU,
    widthHarmonic: 1 + Math.floor(random() * 4),
    width: index % 11 === 0 ? 1.55 + random() * 0.85 : 0.72 + random() * 0.92,
    alpha: 0.18 + random() * 0.4,
    colorIndex: Math.floor(random() * 4),
    bloom: random() < 0.42,
    headSize: 4.4 + random() * 5.8,
    headPhase: random() * TAU,
    headHarmonic: 1 + Math.floor(random() * 3),
    trailProgress: 0.035 + random() * 0.085,
    traceLimit,
    trace: [],
    current: null,
  };
}

function sampleAgentLocal(agent, progress, cycle, width, height, config, field, sourceLocal, sourceTurn) {
  const resolvedSourceTurn = sourceTurn ?? nearestSourceTurn(width, height, config, sourceLocal);
  const independentTurnNoise = Math.sin(progress * TAU * agent.turnHarmonic + agent.turnPhase)
    + Math.sin(progress * TAU * (agent.turnHarmonic + 1) - agent.turnPhase * 0.67) * 0.42;
  const turn = wrapUnit(
    resolvedSourceTurn
    + agent.startJitter
    + agent.direction * progress
    + independentTurnNoise * agent.turnAmplitude * field.turbulence,
  );
  const edge = superellipsePoint(turn, width, height, config);
  const normalNoise = Math.sin(progress * TAU * agent.normalHarmonic + agent.normalPhase) * 0.62
    + Math.sin(cycle * (agent.normalHarmonic + 1) + agent.normalPhase * 1.31) * 0.26
    + Math.sin(progress * TAU * (agent.normalHarmonic + 2) - agent.normalPhase * 0.73) * 0.12;
  const closedArc = 0.5 - Math.cos(progress * TAU) * 0.5;
  const crossingPull = agent.crossing ? closedArc * agent.interiorPull : 0;
  const windDistance = closedArc * 15;
  let x = edge.x + edge.normalX * normalNoise * agent.normalAmplitude * field.curl;
  let y = edge.y + edge.normalY * normalNoise * agent.normalAmplitude * field.curl;
  x += (width / 2 - x) * crossingPull + field.lateral * windDistance;
  y += (height / 2 - y) * crossingPull + field.lift * windDistance;

  const sourcePhase = Math.pow(clamp((Math.cos(progress * TAU) - 0.32) / 0.68), 2);
  if (sourcePhase > 0) {
    const deltaX = sourceLocal.x - x;
    const deltaY = sourceLocal.y - y;
    const length = Math.max(1, Math.hypot(deltaX, deltaY));
    x += deltaX / length * sourcePhase * agent.sourcePull * field.sourceReach;
    y += deltaY / length * sourcePhase * agent.sourcePull * field.sourceReach;
  }

  return { x, y };
}

function getElementOpacity(element) {
  if (!element.isConnected || element.closest('[aria-hidden="true"], [inert]')) return 0;
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden') return 0;
  return clamp(Number.parseFloat(style.opacity) || 0);
}

function syncRecords(records, palette, field) {
  const dialog = document.querySelector('.architecture-dialog');
  const root = dialog || document;
  const elements = [
    ...(root.matches?.(TARGET_SELECTOR) ? [root] : []),
    ...root.querySelectorAll(TARGET_SELECTOR),
  ];
  const liveElements = new Set(elements);

  elements.forEach((element, index) => {
    if (records.has(element)) return;
    const type = element.dataset.tracerProp || 'slab';
    const config = TARGET_CONFIGS[type] || TARGET_CONFIGS.slab;
    const random = createRandom(palette.seed + field.seed + index * 977 + type.length * 131);
    const rect = element.getBoundingClientRect();
    const record = {
      element,
      type,
      config,
      random,
      rect,
      opacity: 0,
      visibleOpacity: 0,
      nextVisibilityCheck: 0,
      sourceKey: '',
      sourceTurn: 0,
      agents: Array.from({ length: config.count }, (_, agentIndex) => createAgent(random, config, agentIndex)),
    };
    records.set(element, record);
  });

  records.forEach((record, element) => {
    if (!liveElements.has(element)) records.delete(element);
  });
}

function warpPoint(point, pointer) {
  if (pointer.energy < 0.002) return point;
  const deltaX = point.x - pointer.x;
  const deltaY = point.y - pointer.y;
  const distance = Math.max(1, Math.hypot(deltaX, deltaY));
  const influence = Math.max(0, 1 - distance / 190) * pointer.energy;
  if (influence <= 0) return point;
  const radialX = deltaX / distance;
  const radialY = deltaY / distance;
  const swirl = Math.sin(pointer.phase + distance * 0.025) * influence * 5.2;
  return {
    x: point.x + radialX * influence * 8.5 - radialY * swirl + pointer.velocityX * influence * 0.015,
    y: point.y + radialY * influence * 8.5 + radialX * swirl + pointer.velocityY * influence * 0.015,
  };
}

function strokeTracerSpline(context, points) {
  if (points.length < 2) return;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[Math.max(0, index - 1)];
    const point = points[index];
    const next = points[index + 1];
    const following = points[Math.min(points.length - 1, index + 2)];
    context.bezierCurveTo(
      point.x + (next.x - previous.x) / 6,
      point.y + (next.y - previous.y) / 6,
      next.x - (following.x - point.x) / 6,
      next.y - (following.y - point.y) / 6,
      next.x,
      next.y,
    );
  }
  context.stroke();
}

function drawSourceFilaments(context, records, source, field, palette, power, cycle) {
  if (field.sourceReach < 0.7) return;
  const visible = [...records.values()].filter((record) => record.opacity > 0.08).slice(0, 10);
  context.lineCap = 'round';
  visible.forEach((record, recordIndex) => {
    const targetX = clamp(source.x, record.rect.left, record.rect.right);
    const targetY = clamp(source.y, record.rect.top, record.rect.bottom);
    const color = palette.colors[recordIndex % palette.colors.length];
    for (let strand = 0; strand < 2; strand += 1) {
      const phase = cycle * (strand + 1) + recordIndex * 1.73 + strand * 2.1;
      const offset = Math.sin(phase) * (5 + strand * 3);
      const gradient = context.createLinearGradient(source.x, source.y, targetX, targetY);
      gradient.addColorStop(0, rgba(color, 0.16 * power * record.opacity));
      gradient.addColorStop(0.34, rgba(color, 0.045 * power * record.opacity));
      gradient.addColorStop(1, rgba(color, 0));
      context.strokeStyle = gradient;
      context.lineWidth = 0.42 + strand * 0.24;
      context.beginPath();
      context.moveTo(source.x, source.y);
      context.bezierCurveTo(
        source.x + field.direction[0] * 110 + offset,
        source.y + field.direction[1] * 110 - offset,
        targetX - field.direction[0] * 64 - offset,
        targetY - field.direction[1] * 64 + offset,
        targetX,
        targetY,
      );
      context.stroke();
    }
  });
}

function drawRecord(context, record, palette, pointer, power, quality, cycle) {
  const visibleCount = Math.max(4, Math.round(record.agents.length * quality));
  for (let index = 0; index < visibleCount; index += 1) {
    const agent = record.agents[index];
    if (!agent.current || agent.trace.length < 2) continue;
    const localPoints = agent.trace;
    const points = localPoints.map((point) => warpPoint({
      x: record.rect.left + point.x,
      y: record.rect.top + point.y,
    }, pointer));
    const first = points[0];
    const last = points[points.length - 1];
    const color = palette.colors[agent.colorIndex % palette.colors.length];
    const widthPulse = 0.82 + Math.sin(cycle * agent.widthHarmonic + agent.widthPhase) * 0.18;
    const width = agent.width * widthPulse;
    const opacity = agent.alpha * power * record.opacity;

    if (agent.bloom && quality > 0.7) {
      context.strokeStyle = rgba(color, opacity * 0.14);
      context.lineWidth = width * 4.6;
      context.shadowColor = rgba(color, opacity * 0.48);
      context.shadowBlur = 7;
      strokeTracerSpline(context, points);
    }

    const gradient = context.createLinearGradient(first.x, first.y, last.x, last.y);
    gradient.addColorStop(0, rgba(color, 0));
    gradient.addColorStop(0.2, rgba(color, opacity * 0.12));
    gradient.addColorStop(0.72, rgba(color, opacity * 0.7));
    gradient.addColorStop(1, rgba(color, opacity));
    context.strokeStyle = gradient;
    context.lineWidth = width;
    context.shadowBlur = 0;
    strokeTracerSpline(context, points);

    const pulse = 0.76 + Math.sin(cycle * agent.headHarmonic + agent.headPhase) * 0.2;
    const headSize = agent.headSize * pulse;
    const headOpacity = clamp((0.34 + agent.alpha) * power * record.opacity, 0, 0.94);
    context.fillStyle = rgba(color, headOpacity);
    context.shadowColor = rgba(color, headOpacity * 0.9);
    context.shadowBlur = headSize * 0.75;
    context.beginPath();
    context.arc(last.x, last.y, Math.max(0.75, headSize * 0.12), 0, TAU);
    context.fill();
    context.shadowBlur = 0;
  }
}

function projectSceneSource(field) {
  const stage = document.querySelector('.cinematic-image-stage');
  if (stage) {
    const rect = stage.getBoundingClientRect();
    return {
      x: rect.left + rect.width * field.source[0],
      y: rect.top + rect.height * field.source[1],
    };
  }
  return { x: window.innerWidth * field.source[0], y: window.innerHeight * field.source[1] };
}

export const ScenePropTracerField = memo(function ScenePropTracerField({
  intensity = 1,
  theme = 'default',
}) {
  const canvasRef = useRef(null);
  const intensityRef = useRef(intensity);
  const themeRef = useRef(theme);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!context) return undefined;

    const motion = { ...getSpatialMotion() };
    const initialPalette = getSwarmScenePaletteBlend(themeRef.current, motion.scenePosition, 'tabs');
    const initialField = getTracerSceneBlend(themeRef.current, motion.scenePosition);
    const records = new Map();
    const pointer = {
      x: -10000,
      y: -10000,
      targetX: -10000,
      targetY: -10000,
      velocityX: 0,
      velocityY: 0,
      targetVelocityX: 0,
      targetVelocityY: 0,
      energy: 0,
      inside: false,
      phase: 0,
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let previousTime = 0;
    let width = 1;
    let height = 1;
    let renderedPixelRatio = 0;
    let needsSync = true;
    let lastSync = -1000;
    const unsubscribe = subscribeSpatialMotion((next) => {
      Object.assign(motion, next);
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      const nextWidth = Math.max(1, rect.width);
      const nextHeight = Math.max(1, rect.height);
      if (
        Math.abs(nextWidth - width) < 0.25
        && Math.abs(nextHeight - height) < 0.25
        && Math.abs(pixelRatio - renderedPixelRatio) < 0.01
      ) return;
      width = nextWidth;
      height = nextHeight;
      renderedPixelRatio = pixelRatio;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      needsSync = true;
    };

    const handlePointerMove = (event) => {
      pointer.targetVelocityX = event.clientX - pointer.targetX;
      pointer.targetVelocityY = event.clientY - pointer.targetY;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.inside = true;
    };

    const handlePointerLeave = () => {
      pointer.inside = false;
    };

    const draw = (timestamp = 0) => {
      const elapsed = previousTime
        ? Math.min(0.04, Math.max(0.001, (timestamp - previousTime) / 1000))
        : 1 / 60;
      previousTime = timestamp;
      const time = timestamp / 1000;
      const cycle = (time % LOOP_SECONDS) / LOOP_SECONDS * TAU;
      const palette = getSwarmScenePaletteBlend(themeRef.current, motion.scenePosition, 'tabs');
      const field = getTracerSceneBlend(themeRef.current, motion.scenePosition);
      const source = projectSceneSource(field);
      if (needsSync || timestamp - lastSync > 520) {
        syncRecords(records, initialPalette, initialField.from);
        needsSync = false;
        lastSync = timestamp;
      }

      const pointerEase = 1 - Math.exp(-elapsed * 5.2);
      pointer.x += (pointer.targetX - pointer.x) * pointerEase;
      pointer.y += (pointer.targetY - pointer.y) * pointerEase;
      pointer.energy += ((pointer.inside ? 0.31 : 0) - pointer.energy) * (1 - Math.exp(-elapsed * 2.4));
      pointer.phase += elapsed * (0.7 + pointer.energy);
      pointer.velocityX += (pointer.targetVelocityX - pointer.velocityX) * (1 - Math.exp(-elapsed * 5));
      pointer.velocityY += (pointer.targetVelocityY - pointer.velocityY) * (1 - Math.exp(-elapsed * 5));
      pointer.targetVelocityX *= Math.exp(-elapsed * 11);
      pointer.targetVelocityY *= Math.exp(-elapsed * 11);

      const root = document.documentElement;
      const quality = root.classList.contains('motion-quality-low')
        ? 0.62
        : root.classList.contains('motion-quality-balanced')
          ? 0.82
          : 1;
      const normalizedIntensity = clamp((intensityRef.current - 0.35) / 1.35);
      const power = 0.72 + normalizedIntensity * 0.46;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      context.lineCap = 'round';
      context.lineJoin = 'round';

      records.forEach((record) => {
        const nextRect = record.element.getBoundingClientRect();
        record.rect = nextRect;
        if (timestamp >= record.nextVisibilityCheck) {
          record.visibleOpacity = nextRect.width > 2 && nextRect.height > 2
            ? getElementOpacity(record.element)
            : 0;
          record.nextVisibilityCheck = timestamp + 110;
        }
        record.opacity += (record.visibleOpacity - record.opacity) * (1 - Math.exp(-elapsed * 8));
        if (record.opacity < 0.006) return;

        const sourceLocal = { x: source.x - nextRect.left, y: source.y - nextRect.top };
        const sourceKey = [
          Math.round(nextRect.width / 3),
          Math.round(nextRect.height / 3),
          Math.round(sourceLocal.x / 4),
          Math.round(sourceLocal.y / 4),
        ].join(':');
        if (sourceKey !== record.sourceKey) {
          record.sourceKey = sourceKey;
          record.sourceTurn = nearestSourceTurn(
            nextRect.width,
            nextRect.height,
            record.config,
            sourceLocal,
          );
        }
        record.agents.forEach((agent) => {
          const loopProgress = (time % LOOP_SECONDS) / LOOP_SECONDS;
          const headProgress = wrapUnit(
            agent.loopPhase + agent.direction * agent.loopCount * loopProgress,
          );
          const available = agent.direction > 0 ? headProgress : 1 - headProgress;
          const velocityStretch = 1 + Math.min(0.28, Math.abs(motion.velocity) * 0.035);
          const trailProgress = Math.min(agent.trailProgress * velocityStretch, available);
          agent.trace.length = 0;
          if (trailProgress > 0.001) {
            for (let index = 0; index < agent.traceLimit; index += 1) {
              const local = index / Math.max(1, agent.traceLimit - 1);
              const progress = headProgress - agent.direction * trailProgress * (1 - local);
              agent.trace.push(sampleAgentLocal(
                agent,
                progress,
                cycle,
                nextRect.width,
                nextRect.height,
                record.config,
                field,
                sourceLocal,
                record.sourceTurn,
              ));
            }
          }
          agent.current = agent.trace[agent.trace.length - 1] || null;
        });
      });

      drawSourceFilaments(context, records, source, field, palette, power, cycle);
      records.forEach((record) => {
        if (record.opacity > 0.006) drawRecord(context, record, palette, pointer, power, quality, cycle);
      });
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = 1;
      context.shadowBlur = 0;

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const mutationObserver = new MutationObserver(() => { needsSync = true; });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'class', 'data-tracer-prop', 'inert'],
    });
    resize();
    draw(0);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      unsubscribe();
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-prop-tracer-field" aria-hidden="true" />;
});
