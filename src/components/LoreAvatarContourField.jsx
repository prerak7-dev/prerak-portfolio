import { memo, useEffect, useRef } from 'react';

const SAMPLE_SIZE = 288;
const CONTOUR_POINTS = 240;
const ALPHA_THRESHOLD = 28;
const STOP_MOTION_FRAME_MS = 120;

const TRACER_PROFILE = Object.freeze({
  cycleMs: 9400,
  direction: 1,
  offset: 0.06,
  trailRatio: 0.36,
  intensity: 1,
  lineWidth: 1.5,
  pulseMs: 2300,
  driftMs: 3400,
});

const THEME_PALETTES = {
  default: {
    core: [242, 239, 223],
    glow: [190, 188, 180],
  },
  fall: {
    core: [255, 207, 135],
    glow: [213, 88, 52],
  },
  spring: {
    core: [211, 247, 223],
    glow: [65, 191, 151],
  },
  winter: {
    core: [243, 252, 255],
    glow: [210, 220, 222],
  },
};

function alphaAt(pixels, width, height, x, y) {
  const px = Math.max(0, Math.min(width - 1, Math.round(x)));
  const py = Math.max(0, Math.min(height - 1, Math.round(y)));
  return pixels[(py * width + px) * 4 + 3];
}

function wrap(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function smoothClosedContour(points, passes = 3) {
  let result = points;
  for (let pass = 0; pass < passes; pass += 1) {
    result = result.map((point, index) => {
      const previous = result[(index - 1 + result.length) % result.length];
      const next = result[(index + 1) % result.length];
      return {
        x: previous.x * 0.2 + point.x * 0.6 + next.x * 0.2,
        y: previous.y * 0.2 + point.y * 0.6 + next.y * 0.2,
      };
    });
  }
  return result;
}

function resampleClosedContour(points, count) {
  const segments = [];
  let totalLength = 0;

  for (let index = 0; index < points.length; index += 1) {
    const start = points[index];
    const end = points[(index + 1) % points.length];
    const length = Math.hypot(end.x - start.x, end.y - start.y);
    segments.push({ start, end, length, offset: totalLength });
    totalLength += length;
  }

  if (!totalLength) return [];

  return Array.from({ length: count }, (_, index) => {
    const distance = (index / count) * totalLength;
    const segment = segments.find((candidate) => distance <= candidate.offset + candidate.length)
      ?? segments[segments.length - 1];
    const progress = segment.length ? (distance - segment.offset) / segment.length : 0;
    return {
      x: segment.start.x + (segment.end.x - segment.start.x) * progress,
      y: segment.start.y + (segment.end.y - segment.start.y) * progress,
    };
  });
}

function extractSilhouette(image) {
  const offscreen = document.createElement('canvas');
  offscreen.width = SAMPLE_SIZE;
  offscreen.height = SAMPLE_SIZE;
  const context = offscreen.getContext('2d', { willReadFrequently: true });
  if (!context) return [];

  context.clearRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const pixels = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
  const center = { x: SAMPLE_SIZE * 0.5, y: SAMPLE_SIZE * 0.56 };
  const outerRadius = SAMPLE_SIZE * 0.78;
  const radialPoints = [];

  for (let index = 0; index < CONTOUR_POINTS; index += 1) {
    const angle = (index / CONTOUR_POINTS) * Math.PI * 2 - Math.PI / 2;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    let boundary = null;

    for (let radius = outerRadius; radius >= 0; radius -= 0.8) {
      const x = center.x + cosine * radius;
      const y = center.y + sine * radius;
      if (alphaAt(pixels, SAMPLE_SIZE, SAMPLE_SIZE, x, y) >= ALPHA_THRESHOLD) {
        boundary = { x, y };
        break;
      }
    }

    if (boundary) radialPoints.push(boundary);
  }

  if (radialPoints.length < CONTOUR_POINTS * 0.72) return [];
  return resampleClosedContour(smoothClosedContour(radialPoints), CONTOUR_POINTS);
}

function strokeContour(context, points, color, alpha, width, blur) {
  if (!points.length) return;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
  context.closePath();
  context.strokeStyle = `rgba(${color.join(',')}, ${alpha})`;
  context.lineWidth = width;
  context.shadowBlur = 0;
  context.stroke();
}

function drawTracer(context, points, headIndex, palette, profile, time) {
  const trailLength = Math.max(12, Math.round(points.length * profile.trailRatio));
  const pointCount = points.length;
  const pulse = 0.88 + Math.sin((time / profile.pulseMs) * Math.PI * 2) * 0.12;
  const intensity = profile.intensity * pulse;
  const trail = [];
  for (let distance = trailLength; distance >= 0; distance -= 1) {
    trail.push(points[wrap(headIndex - profile.direction * distance, pointCount)]);
  }
  const start = trail[0];
  const head = trail[trail.length - 1];
  const gradient = context.createLinearGradient(start.x, start.y, head.x, head.y);
  gradient.addColorStop(0, `rgba(${palette.glow.join(',')}, 0)`);
  gradient.addColorStop(0.34, `rgba(${palette.glow.join(',')}, ${0.16 * intensity})`);
  gradient.addColorStop(0.76, `rgba(${palette.glow.join(',')}, ${0.58 * intensity})`);
  gradient.addColorStop(1, `rgba(${palette.core.join(',')}, ${0.9 * intensity})`);

  context.beginPath();
  context.moveTo(start.x, start.y);
  trail.slice(1).forEach((point) => context.lineTo(point.x, point.y));
  context.strokeStyle = `rgba(${palette.glow.join(',')}, ${0.13 * intensity})`;
  context.lineWidth = profile.lineWidth * 3.6;
  context.shadowBlur = 0;
  context.stroke();
  context.strokeStyle = gradient;
  context.lineWidth = profile.lineWidth;
  context.stroke();

  const coreStartIndex = Math.max(0, Math.round(trail.length * 0.72));
  context.beginPath();
  context.moveTo(trail[coreStartIndex].x, trail[coreStartIndex].y);
  trail.slice(coreStartIndex + 1).forEach((point) => context.lineTo(point.x, point.y));
  context.strokeStyle = `rgba(${palette.core.join(',')}, ${0.58 * intensity})`;
  context.lineWidth = 0.62;
  context.stroke();

  const tangentPoint = points[wrap(headIndex + profile.direction * 3, pointCount)];
  const tangentLength = Math.max(0.001, Math.hypot(tangentPoint.x - head.x, tangentPoint.y - head.y));
  const tangentX = (tangentPoint.x - head.x) / tangentLength;
  const tangentY = (tangentPoint.y - head.y) / tangentLength;
  const flareLength = 4.8;

  context.beginPath();
  context.moveTo(head.x - tangentX * flareLength, head.y - tangentY * flareLength);
  context.lineTo(head.x + tangentX * flareLength * 0.45, head.y + tangentY * flareLength * 0.45);
  context.strokeStyle = `rgba(${palette.core.join(',')}, ${0.88 * intensity})`;
  context.lineWidth = 1.05;
  context.shadowBlur = 0;
  context.stroke();

  context.beginPath();
  context.arc(head.x, head.y, 3.4 + intensity, 0, Math.PI * 2);
  context.fillStyle = `rgba(${palette.glow.join(',')}, ${0.16 * intensity})`;
  context.fill();
  context.beginPath();
  context.arc(head.x, head.y, 0.72 + intensity * 0.58, 0, Math.PI * 2);
  context.fillStyle = `rgba(${palette.core.join(',')}, ${0.9 * intensity})`;
  context.shadowBlur = 0;
  context.fill();
}

export const LoreAvatarContourField = memo(function LoreAvatarContourField({ theme = 'default', imageSrc = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const figure = canvas?.parentElement;
    if (!canvas || !figure) return undefined;

    const image = figure.querySelector('.lore-avatar-image.is-current');
    if (!image) return undefined;

    const palette = THEME_PALETTES[theme] ?? THEME_PALETTES.default;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let contour = [];
    let timer = 0;
    let disposed = false;
    let cssWidth = 1;
    let cssHeight = 1;
    let lastStopMotionFrame = -1;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      cssWidth = Math.max(1, bounds.width);
      cssHeight = Math.max(1, bounds.height);
      const pixelRatio = Math.min(1.5, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(cssWidth * pixelRatio));
      canvas.height = Math.max(1, Math.round(cssHeight * pixelRatio));
      const context = canvas.getContext('2d');
      context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const rebuild = () => {
      if (disposed || !image.complete || !image.naturalWidth) return;
      resize();
      contour = extractSilhouette(image).map((point) => ({
        x: (point.x / SAMPLE_SIZE) * cssWidth,
        y: (point.y / SAMPLE_SIZE) * cssHeight,
      }));
    };

    const render = (time = 0) => {
      if (disposed) return;
      const context = canvas.getContext('2d');
      if (!context || !contour.length) {
        timer = window.setTimeout(() => render(performance.now()), STOP_MOTION_FRAME_MS);
        return;
      }

      const stopMotionFrame = Math.floor(time / STOP_MOTION_FRAME_MS);
      if (!reducedMotion && stopMotionFrame === lastStopMotionFrame) {
        timer = window.setTimeout(() => render(performance.now()), STOP_MOTION_FRAME_MS);
        return;
      }
      lastStopMotionFrame = stopMotionFrame;
      const steppedTime = stopMotionFrame * STOP_MOTION_FRAME_MS;

      context.clearRect(0, 0, cssWidth, cssHeight);
      context.save();
      context.globalCompositeOperation = 'lighter';
      context.lineCap = 'round';
      context.lineJoin = 'round';
      strokeContour(context, contour, palette.glow, 0.065, 0.58, 4);

      if (reducedMotion) {
        strokeContour(context, contour, palette.core, 0.22, 0.52, 2);
      } else {
        const drift = Math.sin(steppedTime / TRACER_PROFILE.driftMs) * 0.014;
        const phase = wrap(
          TRACER_PROFILE.offset
          + TRACER_PROFILE.direction * (steppedTime / TRACER_PROFILE.cycleMs)
          + drift,
          1,
        );
        const headIndex = Math.floor(phase * contour.length);
        drawTracer(context, contour, headIndex, palette, TRACER_PROFILE, steppedTime);
      }
      context.restore();

      if (!reducedMotion) {
        timer = window.setTimeout(() => render(performance.now()), STOP_MOTION_FRAME_MS);
      }
    };

    const start = () => {
      rebuild();
      window.clearTimeout(timer);
      render(performance.now());
    };

    const observer = new ResizeObserver(start);
    observer.observe(figure);

    if (image.complete && image.naturalWidth) {
      start();
    } else {
      image.addEventListener('load', start, { once: true });
    }

    return () => {
      disposed = true;
      observer.disconnect();
      image.removeEventListener('load', start);
      window.clearTimeout(timer);
    };
  }, [theme, imageSrc]);

  return <canvas ref={canvasRef} className="lore-avatar-contour-field" aria-hidden="true" />;
});
