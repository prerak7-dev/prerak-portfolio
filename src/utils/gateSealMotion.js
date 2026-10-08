export const GATE_SEAL_HOLD_MS = 3000;
export const GATE_SEAL_ANGLE = 180;
export const GATE_SEAL_DISSOLVE_HANDOFF = .58;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// Keep the threshold visible during the hold. The committed chapter completes
// the same reveal, while an interrupted turn retraces it without another clock.
export function gateSealDissolveProgress(angle) {
  return GATE_SEAL_DISSOLVE_HANDOFF * clamp(angle / GATE_SEAL_ANGLE, 0, 1);
}

// The complete painted seal, including its cross and rim, turns inside the gate.
export function gateSealLandmark(portrait = false) {
  return portrait ? { x: 458 / 887, y: 1103 / 1774, diameter: 58 / 887 }
    : { x: 837 / 1672, y: 516 / 941, diameter: 62 / 1672 };
}

export function gateSealFaceBounds(portrait = false) {
  const landmark = gateSealLandmark(portrait);
  const radius = landmark.diameter * .5;
  return { x: landmark.x, y: landmark.y, radiusX: radius, radiusY: radius * (portrait ? 887 / 1774 : 1672 / 941) };
}

export function projectGateSeal(projection, portrait = false) {
  const landmark = gateSealLandmark(portrait);
  const diameter = projection.width * landmark.diameter;
  return {
    x: projection.left + projection.width * landmark.x,
    y: projection.top + projection.height * landmark.y,
    diameter,
    target: Math.max(48, diameter + 12),
  };
}

const bezier = (points, t) => {
  const values = points.slice();
  for (let count = values.length - 1; count > 0; count--) {
    for (let index = 0; index < count; index++) values[index] += (values[index + 1] - values[index]) * t;
  }
  return values[0];
};

// A seventh-order drive starts and settles with zero acceleration and jerk.
// Bounded controls preserve interrupted momentum without crossing either stop.
export function createGateSealTurn(from = 0, velocity = 0, target = GATE_SEAL_ANGLE, duration = GATE_SEAL_HOLD_MS) {
  const travel = velocity * duration / 7;
  const points = [from, ...[1, 2, 3].map(step => clamp(from + step * travel, 0, GATE_SEAL_ANGLE)), target, target, target, target];
  const derivative = points.slice(1).map((point, index) => 7 * (point - points[index]) / duration);
  return {
    duration,
    sample(elapsed) {
      const t = clamp(elapsed / duration, 0, 1);
      return { angle: t === 1 ? target : bezier(points, t), velocity: t === 1 ? 0 : bezier(derivative, t) };
    },
  };
}

// Hide the DOM-to-texture sampling handoff within the first sub-degree of motion.
export function gateSealPaintCoverage(angle) {
  const t = clamp(Math.abs(angle) / .75, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

// Invert the resting stone drive so the ink's score has the same three-second
// clock, and retraces the exact same frames when the wheel returns or resumes.
export function gateSealStoryProgress(angle) {
  const target = clamp(angle / GATE_SEAL_ANGLE, 0, 1);
  if (target === 0 || target === 1) return target;
  let low = 0, high = 1;
  for (let step = 0; step < 26; step++) {
    const t = (low + high) / 2;
    const value = t ** 4 * (35 + t * (-84 + t * (70 - 20 * t)));
    if (value < target) low = t; else high = t;
  }
  return (low + high) / 2;
}
