import { projectGeometryPoint } from './cinematicGeometryField.js';

const TAU = Math.PI * 2;
const normalizedPathCache = new WeakMap();

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function rgba(color, alpha) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

function smootherStep(value) {
  const progress = clamp(value);
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

function transitionWindow(progress, start, peak, end) {
  const rise = smootherStep((progress - start) / Math.max(0.001, peak - start));
  const fall = 1 - smootherStep((progress - peak) / Math.max(0.001, end - peak));
  return rise * fall;
}

function strokeSmoothPath(context, points) {
  if (points.length < 2) return;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index];
    const next = points[index + 1];
    context.quadraticCurveTo(
      point.x,
      point.y,
      (point.x + next.x) / 2,
      (point.y + next.y) / 2,
    );
  }
  const last = points[points.length - 1];
  context.lineTo(last.x, last.y);
  context.stroke();
}

function buildNormalizedPath(points) {
  const path = new Path2D();
  path.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index];
    const next = points[index + 1];
    path.quadraticCurveTo(
      point.x,
      point.y,
      (point.x + next.x) / 2,
      (point.y + next.y) / 2,
    );
  }
  const last = points[points.length - 1];
  path.lineTo(last.x, last.y);
  return path;
}

function getNormalizedPathRecords(streamlines) {
  const cached = normalizedPathCache.get(streamlines);
  if (cached) return cached;

  const records = streamlines.map((streamline) => {
    let length = 0;
    for (let index = 1; index < streamline.points.length; index += 1) {
      const previous = streamline.points[index - 1];
      const point = streamline.points[index];
      length += Math.hypot(point.x - previous.x, point.y - previous.y);
    }
    return {
      length: Math.max(0.001, length),
      path: buildNormalizedPath(streamline.points),
      points: streamline.points,
      streamline,
      trailPaths: new Map(),
    };
  });
  normalizedPathCache.set(streamlines, records);
  return records;
}

function getCachedTrailPath(record, headIndex, direction, trailPointCount) {
  const quantizedHead = Math.min(
    record.points.length - 1,
    Math.max(1, Math.round(headIndex / 3) * 3),
  );
  const quantizedTrail = Math.max(6, Math.round(trailPointCount / 3) * 3);
  const key = `${direction}:${quantizedHead}:${quantizedTrail}`;
  const cached = record.trailPaths.get(key);
  if (cached) return cached;

  const start = direction > 0
    ? Math.max(0, quantizedHead - quantizedTrail)
    : Math.min(record.points.length - 1, quantizedHead + quantizedTrail);
  const points = direction > 0
    ? record.points.slice(start, quantizedHead + 1)
    : record.points.slice(quantizedHead, start + 1).reverse();
  const path = buildNormalizedPath(points.length >= 2 ? points : record.points.slice(0, 2));
  record.trailPaths.set(key, path);
  return path;
}

function drawCachedGeometryStreamlines({
  context,
  streamlines,
  palette,
  projection,
  localOffset,
  weight,
  time,
  power,
  quality,
  clipWidth,
  clipHeight,
  densityScale,
  alphaScale,
  widthScale,
  trailScale,
  maxVisibleCount,
  headFrequency,
  cinematicEmphasis,
}) {
  if (
    projection.left > (clipWidth ?? Infinity) + 36
    || projection.top > (clipHeight ?? Infinity) + 36
    || projection.left + projection.width < -36
    || projection.top + projection.height < -36
  ) return;

  const records = getNormalizedPathRecords(streamlines);
  const visibleCount = Math.min(
    records.length,
    maxVisibleCount,
    Math.max(16, Math.round(records.length * quality * 0.28 * densityScale)),
  );
  const depthScale = clamp(
    Math.min(projection.width / 1600, projection.height / 900),
    0.68,
    1.32,
  );
  const userScale = Math.max(1, (Math.abs(projection.width) + Math.abs(projection.height)) * 0.5);

  context.save();
  context.translate(
    projection.left - (localOffset?.left || 0),
    projection.top - (localOffset?.top || 0),
  );
  context.scale(projection.width, projection.height);
  context.globalCompositeOperation = 'lighter';
  context.lineCap = 'round';
  context.lineJoin = 'round';

  for (let index = 0; index < visibleCount; index += 1) {
    const record = records[index];
    const { streamline } = record;
    if (record.points.length < 4) continue;

    const motionCycle = streamline.phase * 2
      + time * streamline.speed * palette.drift * 1.7;
    const headProgress = 0.5 - Math.cos(motionCycle * Math.PI) * 0.5;
    const headIndex = Math.min(
      record.points.length - 1,
      Math.max(1, Math.round(headProgress * (record.points.length - 1))),
    );
    const direction = Math.sin(motionCycle * Math.PI) >= 0 ? 1 : -1;
    const trailPointCount = Math.min(
      34,
      Math.max(8, Math.round(record.points.length * streamline.trail * trailScale * 0.78)),
    );
    const trailPath = getCachedTrailPath(record, headIndex, direction, trailPointCount);

    const color = palette.colors[streamline.colorIndex % palette.colors.length];
    const pulse = 0.88
      + Math.sin(time * (0.46 + streamline.depth * 0.38) + streamline.pulse) * 0.12;
    const alpha = clamp(
      streamline.alpha
        * weight
        * power
        * pulse
        * (0.52 + streamline.depth * 0.48)
        * alphaScale
        * cinematicEmphasis,
      0,
      0.94,
    );
    const lineWidthPixels = streamline.width
      * (0.72 + streamline.depth * 0.46)
      * depthScale
      * widthScale;
    const lineWidth = lineWidthPixels / userScale;

    if (quality > 0.72 && index % 4 === 0) {
      context.strokeStyle = rgba(color, alpha * 0.082);
      context.lineWidth = lineWidth * 4.1;
      context.stroke(trailPath);
    }

    context.strokeStyle = rgba(color, alpha * 0.72);
    context.lineWidth = lineWidth;
    context.stroke(trailPath);

    if (quality > 0.9 && index % 6 === 0) {
      context.strokeStyle = rgba(color, alpha * 0.36);
      context.lineWidth = Math.max(0.18 / userScale, lineWidth * 0.32);
      context.stroke(trailPath);
    }

    if (index % Math.max(1, headFrequency) !== 0) continue;
    const head = record.points[headIndex];
    const previous = record.points[headIndex - 1];
    const angle = Math.atan2(head.y - previous.y, head.x - previous.x);
    const radius = (0.72 + streamline.depth * 0.86) * depthScale * widthScale / userScale;
    context.save();
    context.translate(head.x, head.y);
    context.rotate(angle);
    context.fillStyle = rgba(color, alpha * 0.2);
    context.beginPath();
    context.ellipse(0, 0, radius * 4.8, radius * 1.12, 0, 0, TAU);
    context.fill();
    context.fillStyle = rgba(color, Math.min(0.96, alpha * 1.08));
    context.beginPath();
    context.ellipse(radius * 0.24, 0, radius * 0.72, radius * 0.42, 0, 0, TAU);
    context.fill();
    context.restore();
  }

  context.restore();
}

function pathIntersectsClip(points, clipWidth, clipHeight, margin = 28) {
  if (!Number.isFinite(clipWidth) || !Number.isFinite(clipHeight)) return true;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  points.forEach((point) => {
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  });
  return maxX >= -margin
    && maxY >= -margin
    && minX <= clipWidth + margin
    && minY <= clipHeight + margin;
}

function sampleMotionHistory(path, motionCycle, historySpan, sampleCount) {
  const sourcePoints = [];
  let previousPointIndex = -1;

  for (let sampleIndex = sampleCount - 1; sampleIndex >= 0; sampleIndex -= 1) {
    const age = sampleIndex / Math.max(1, sampleCount - 1);
    const sampleCycle = motionCycle - historySpan * age;
    const progress = 0.5 - Math.cos(sampleCycle * Math.PI) * 0.5;
    const pointIndex = Math.min(
      path.length - 1,
      Math.max(0, Math.round(progress * (path.length - 1))),
    );
    if (pointIndex === previousPointIndex) continue;
    sourcePoints.push(path[pointIndex]);
    previousPointIndex = pointIndex;
  }

  return sourcePoints;
}

function projectPath(points, projection, localOffset = null) {
  return points.map((point) => projectGeometryPoint(point, projection, localOffset));
}

function drawElongatedHead(context, points, color, alpha, radius) {
  if (points.length < 2) return;
  const last = points[points.length - 1];
  const before = points[points.length - 2];
  const angle = Math.atan2(last.y - before.y, last.x - before.x);
  context.save();
  context.translate(last.x, last.y);
  context.rotate(angle);
  context.scale(2.35, 0.38);
  const glow = context.createRadialGradient(0, 0, 0, 0, 0, radius * 5.4);
  glow.addColorStop(0, rgba(color, alpha * 0.96));
  glow.addColorStop(0.16, rgba(color, alpha * 0.42));
  glow.addColorStop(0.46, rgba(color, alpha * 0.11));
  glow.addColorStop(1, rgba(color, 0));
  context.fillStyle = glow;
  context.beginPath();
  context.arc(0, 0, radius * 5.4, 0, TAU);
  context.fill();
  context.strokeStyle = rgba(color, alpha * 0.76);
  context.lineWidth = Math.max(0.22, radius * 0.2);
  context.beginPath();
  context.moveTo(-radius * 3.2, 0);
  context.lineTo(radius * 1.25, 0);
  context.stroke();
  context.fillStyle = rgba(color, Math.min(0.96, alpha * 1.12));
  context.beginPath();
  context.arc(radius * 0.22, 0, Math.max(0.3, radius * 0.48), 0, TAU);
  context.fill();
  context.restore();
}

export function readSceneImageProjection(image, fallback, viewportWidth) {
  if (!image?.isConnected) return fallback;
  const rect = image.getBoundingClientRect();
  const boxWidth = image.clientWidth;
  const boxHeight = image.clientHeight;
  const sourceWidth = image.naturalWidth || Number(image.getAttribute('width')) || 2560;
  const sourceHeight = image.naturalHeight || Number(image.getAttribute('height')) || 1440;
  if (
    rect.width < 1
    || rect.height < 1
    || boxWidth < 1
    || boxHeight < 1
    || sourceWidth < 1
    || sourceHeight < 1
  ) return fallback;
  const coverScale = Math.max(boxWidth / sourceWidth, boxHeight / sourceHeight);
  const transformScaleX = rect.width / boxWidth;
  const transformScaleY = rect.height / boxHeight;
  const renderedWidth = sourceWidth * coverScale * transformScaleX;
  const renderedHeight = sourceHeight * coverScale * transformScaleY;
  return {
    left: rect.left + (rect.width - renderedWidth) / 2,
    top: rect.top + (rect.height - renderedHeight) / 2,
    width: renderedWidth,
    height: renderedHeight,
    viewportWidth,
  };
}

export function drawGeometryStreamlines({
  context,
  geometry,
  palette,
  projection,
  weight,
  time,
  power,
  quality,
  localOffset = null,
  pointer = null,
  clipWidth,
  clipHeight,
  densityScale = 1,
  alphaScale = 1,
  widthScale = 1,
  trailScale = 1,
  streamlines = geometry?.streamlines,
  maxVisibleCount = Number.POSITIVE_INFINITY,
  headFrequency = 9,
  cinematicEmphasis = 1,
}) {
  if (!geometry || !streamlines?.length || weight < 0.002) return;
  if ((!pointer || pointer.energy < 0.003) && typeof Path2D === 'function') {
    drawCachedGeometryStreamlines({
      context,
      streamlines,
      palette,
      projection,
      localOffset,
      weight,
      time,
      power,
      quality,
      clipWidth,
      clipHeight,
      densityScale,
      alphaScale,
      widthScale,
      trailScale,
      maxVisibleCount,
      headFrequency,
      cinematicEmphasis,
    });
    return;
  }
  const visibleCount = Math.min(
    streamlines.length,
    maxVisibleCount,
    Math.max(12, Math.round(streamlines.length * quality * 0.44 * densityScale)),
  );
  const depthScale = clamp(Math.min(projection.width / 1600, projection.height / 900), 0.68, 1.32);
  context.save();
  context.globalCompositeOperation = 'lighter';
  context.lineCap = 'round';
  context.lineJoin = 'round';

  for (let index = 0; index < visibleCount; index += 1) {
    const streamline = streamlines[index];
    const path = streamline.points;
    if (path.length < 4) continue;
    const motionCycle = streamline.phase * 2
      + time * streamline.speed * palette.drift * 1.7;
    const historySpan = streamline.trail * trailScale * 1.45;
    const sampleCount = Math.min(
      28,
      Math.max(10, Math.round(path.length * streamline.trail * trailScale * 0.65)),
    );
    // Sampling motion history lets the tail fold through each zero-velocity
    // turnaround instead of being rebuilt on the opposite side.
    const sourcePoints = sampleMotionHistory(path, motionCycle, historySpan, sampleCount);
    if (sourcePoints.length < 3) continue;
    const points = sourcePoints.map((point) => {
      const projected = projectGeometryPoint(point, projection, localOffset);
      if (pointer?.energy > 0.002) {
        const deltaX = projected.x - pointer.x;
        const deltaY = projected.y - pointer.y;
        const distance = Math.max(1, Math.hypot(deltaX, deltaY));
        const influence = Math.max(0, 1 - distance / 184) * pointer.energy;
        const swirl = Math.sin(pointer.phase + distance * 0.018) * influence * 2.1;
        projected.x += deltaX / distance * influence * 3.2 - deltaY / distance * swirl;
        projected.y += deltaY / distance * influence * 3.2 + deltaX / distance * swirl;
      }
      return projected;
    });
    if (!pathIntersectsClip(points, clipWidth, clipHeight)) continue;

    const first = points[0];
    const last = points[points.length - 1];
    const color = palette.colors[streamline.colorIndex % palette.colors.length];
    const pulse = 0.88 + Math.sin(time * (0.46 + streamline.depth * 0.38) + streamline.pulse) * 0.12;
    const alpha = clamp(streamline.alpha
      * weight
      * power
      * pulse
      * (0.52 + streamline.depth * 0.48)
      * alphaScale
      * cinematicEmphasis, 0, 0.94);
    const lineWidth = streamline.width
      * (0.72 + streamline.depth * 0.46)
      * depthScale
      * widthScale;

    if (quality > 0.72 && index % 4 === 0) {
      context.strokeStyle = rgba(color, alpha * 0.085);
      context.lineWidth = lineWidth * 4.2;
      context.shadowBlur = 0;
      strokeSmoothPath(context, points);
    }

    if (quality > 0.88 && index % 6 === 0) {
      context.strokeStyle = rgba(color, alpha * 0.12);
      context.lineWidth = lineWidth * 1.9;
      context.shadowBlur = 0;
      strokeSmoothPath(context, points);
    }

    if (quality > 0.9 && index % 4 === 0) {
      const gradient = context.createLinearGradient(first.x, first.y, last.x, last.y);
      gradient.addColorStop(0, rgba(color, 0));
      gradient.addColorStop(0.18, rgba(color, alpha * 0.06));
      gradient.addColorStop(0.52, rgba(color, alpha * 0.32));
      gradient.addColorStop(0.84, rgba(color, alpha * 0.82));
      gradient.addColorStop(1, rgba(color, alpha));
      context.strokeStyle = gradient;
    } else {
      context.strokeStyle = rgba(color, alpha * 0.7);
    }
    context.lineWidth = lineWidth;
    context.shadowBlur = 0;
    strokeSmoothPath(context, points);

    if (quality > 0.9 && index % 8 === 0) {
      context.strokeStyle = rgba(color, alpha * 0.4);
      context.lineWidth = Math.max(0.24, lineWidth * 0.34);
      context.shadowColor = rgba(color, alpha * 0.22);
      context.shadowBlur = lineWidth * 0.7;
      strokeSmoothPath(context, points);
    }

    if (index % Math.max(1, headFrequency) === 0) {
      const radius = (0.78 + streamline.depth * 0.92) * depthScale * widthScale;
      drawElongatedHead(context, points, color, alpha * 0.96, radius);
    }
  }
  context.restore();
}

export function drawGeometryContourPassage({
  context,
  geometry,
  field,
  palette,
  projection,
  progress,
  role,
  time,
  power,
  quality,
  localOffset = null,
  clipWidth,
  clipHeight,
}) {
  if (!geometry || progress <= 0.001 || progress >= 0.999) return;
  const transitionPulse = Math.pow(Math.sin(progress * Math.PI), 0.72);
  if (transitionPulse < 0.003) return;

  const streamlines = geometry.streamlines;
  const visibleCount = Math.min(
    streamlines.length,
    Math.max(18, Math.round(34 * quality)),
  );
  const stride = Math.max(1, Math.floor(streamlines.length / visibleCount));
  const source = field?.source || [0.5, 0.5];
  const sourceReach = Math.max(0.25, field?.sourceReach || 0.72);
  const depthScale = clamp(Math.min(projection.width / 1600, projection.height / 900), 0.68, 1.32);
  const roleDirection = role === 'from' ? 1 : -1;

  context.save();
  context.globalCompositeOperation = 'lighter';
  context.lineCap = 'round';
  context.lineJoin = 'round';

  for (let index = 0; index < visibleCount; index += 1) {
    const streamlineIndex = Math.min(
      streamlines.length - 1,
      index * stride + ((index * 7) % stride),
    );
    const streamline = streamlines[streamlineIndex];
    const path = streamline.points;
    if (path.length < 8) continue;

    const anchorPoint = path[Math.min(
      path.length - 1,
      Math.round((0.32 + streamline.phase * 0.36) * (path.length - 1)),
    )];
    const sourceDistance = Math.hypot(anchorPoint.x - source[0], anchorPoint.y - source[1]);
    const spatialOrder = clamp(sourceDistance / sourceReach) * 0.78 + streamline.phase * 0.22;
    const localWindow = role === 'from'
      ? transitionWindow(
        progress,
        0.015 + spatialOrder * 0.16,
        0.26 + spatialOrder * 0.1,
        0.69 + spatialOrder * 0.14,
      )
      : transitionWindow(
        progress,
        0.24 + spatialOrder * 0.18,
        0.54 + spatialOrder * 0.12,
        0.985,
      );
    if (localWindow < 0.002) continue;

    const motionCycle = streamline.phase * 2
      + time * streamline.speed * palette.drift * 0.62
      + progress * roleDirection * (1.08 + streamline.depth * 0.48);
    const historySpan = 0.2 + transitionPulse * 0.5 + localWindow * 0.12;
    const sampleCount = Math.min(
      42,
      Math.max(18, Math.round(path.length * (0.24 + transitionPulse * 0.3) * quality)),
    );
    const sourcePoints = sampleMotionHistory(path, motionCycle, historySpan, sampleCount);
    if (sourcePoints.length < 4) continue;
    const points = projectPath(sourcePoints, projection, localOffset);
    if (!pathIntersectsClip(points, clipWidth, clipHeight, 48)) continue;

    const first = points[0];
    const last = points[points.length - 1];
    const color = palette.colors[streamline.colorIndex % palette.colors.length];
    const flicker = 0.9 + Math.sin(time * 0.58 + streamline.pulse) * 0.1;
    const alpha = clamp(
      (0.15 + streamline.alpha * 0.68)
        * localWindow
        * transitionPulse
        * power
        * flicker
        * (0.72 + streamline.depth * 0.42),
      0,
      0.54,
    );
    const lineWidth = (0.48 + streamline.width * 0.58)
      * (0.78 + streamline.depth * 0.42)
      * depthScale
      * (0.96 + transitionPulse * 0.14);

    if (quality > 0.72 && index % 3 === 0) {
      context.strokeStyle = rgba(color, alpha * 0.075);
      context.lineWidth = lineWidth * 3.4;
      context.shadowBlur = 0;
      strokeSmoothPath(context, points);
    }

    context.strokeStyle = rgba(color, alpha * 0.16);
    context.lineWidth = lineWidth * 1.34;
    context.shadowBlur = 0;
    strokeSmoothPath(context, points);

    const gradient = context.createLinearGradient(first.x, first.y, last.x, last.y);
    gradient.addColorStop(0, rgba(color, 0));
    gradient.addColorStop(0.18, rgba(color, alpha * 0.14));
    gradient.addColorStop(0.7, rgba(color, alpha * 0.74));
    gradient.addColorStop(1, rgba(color, alpha));
    context.strokeStyle = gradient;
    context.lineWidth = lineWidth * 0.72;
    strokeSmoothPath(context, points);

    if (index % 4 === 0) {
      drawElongatedHead(
        context,
        points,
        color,
        alpha * 0.96,
        (0.92 + streamline.depth * 1.18) * depthScale * (1 + transitionPulse * 0.45),
      );
    }
  }

  context.restore();
}

export function eraseGeometryAlongContours({
  context,
  geometry,
  field,
  projection,
  progress,
  role,
  quality,
  weight = 1,
  clipWidth,
  clipHeight,
}) {
  if (!geometry || weight < 0.002 || progress <= 0.001 || progress >= 0.999) return;
  const streamlines = geometry.streamlines;
  const visibleCount = Math.min(
    streamlines.length,
    Math.max(10, Math.round(22 * quality)),
  );
  const stride = Math.max(1, Math.floor(streamlines.length / visibleCount));
  const source = field?.source || [0.5, 0.5];
  const sourceReach = Math.max(0.25, field?.sourceReach || 0.72);
  const maximumWidth = clamp(projection.width * 0.04, 34, 108);

  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = '#000';

  for (let index = 0; index < visibleCount; index += 1) {
    const streamlineIndex = Math.min(
      streamlines.length - 1,
      index * stride + ((index * 11) % stride),
    );
    const streamline = streamlines[streamlineIndex];
    const path = streamline.points;
    if (path.length < 8) continue;

    const anchorPoint = path[Math.min(
      path.length - 1,
      Math.round((0.3 + streamline.phase * 0.4) * (path.length - 1)),
    )];
    const sourceDistance = Math.hypot(anchorPoint.x - source[0], anchorPoint.y - source[1]);
    const spatialOrder = clamp(sourceDistance / sourceReach) * 0.8 + streamline.phase * 0.2;
    const start = role === 'from'
      ? spatialOrder * 0.18
      : 0.16 + spatialOrder * 0.22;
    const duration = role === 'from' ? 0.6 : 0.56;
    const localProgress = smootherStep((progress - start) / duration);
    if (localProgress < 0.002) continue;

    const sampledPath = path.filter((_, pointIndex) => pointIndex % 5 === 0);
    if (sampledPath[sampledPath.length - 1] !== path[path.length - 1]) {
      sampledPath.push(path[path.length - 1]);
    }
    const points = projectPath(sampledPath, projection);
    if (!pathIntersectsClip(points, clipWidth, clipHeight, maximumWidth)) continue;

    const depthWidth = 0.72 + streamline.depth * 0.46;
    context.globalAlpha = clamp((0.24 + localProgress * 0.76) * weight, 0, 1);
    context.lineWidth = 1.2
      + Math.pow(localProgress, 1.55) * maximumWidth * depthWidth;
    context.shadowBlur = 0;
    strokeSmoothPath(context, points);
  }

  context.restore();
}
