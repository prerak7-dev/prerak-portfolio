import { getPaintedSubjects } from '../data/paintedSubjects.js';

const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export function paintedSubjectWeight(subject, point) {
  const [cx, cy, rx, ry] = subject.region;
  const x = (point[0] - cx) / rx, y = (point[1] - cy) / ry;
  const distance = subject.mode < 2 ? Math.hypot(x, y) : Math.max(Math.abs(x), Math.abs(y));
  let weight = 1 - smooth(.78, 1, distance);
  if (subject.kind === 'cloth') {
    weight *= (1 - smooth(.1, .6, x)) * smooth(-.95, -.35, y) * (1 - smooth(.45, .9, y));
  } else if (subject.kind === 'canopy') weight *= (1 - smooth(.5, .98, y));
  return weight * smooth(.004, .025, Math.min(point[0], 1 - point[0], point[1], 1 - point[1]));
}

// Inverse UV deformation: move the actual brushwork, not points drawn over it.
// This mirrors the GPU pass so pinned anchors and loop bounds are testable.
export function samplePaintedSubject(subject, point, time, travel = 0) {
  const [cx, cy, rx, ry] = subject.region;
  const x = (point[0] - cx) / rx, y = (point[1] - cy) / ry;
  const phase = time * Math.PI * 2 / subject.period;
  const amount = subject.amount;
  let dx = 0, dy = 0;
  if (subject.kind === 'rock' || subject.kind === 'spin') {
    const angle = (subject.kind === 'spin' ? phase : Math.sin(phase) * amount) + travel * subject.scroll;
    dx = (x * Math.cos(angle) + y * Math.sin(angle) - x) * rx;
    dy = (-x * Math.sin(angle) + y * Math.cos(angle) - y) * ry;
  } else if (subject.kind === 'cloth') {
    dx = amount * rx * (Math.sin(phase + y * 2.2 + x * 2.6) + .33 * Math.sin(phase * 2 - y * 3.7 + x));
    dy = amount * ry * .3 * Math.cos(phase + y * 2.7);
  } else if (subject.kind === 'water') {
    dx = amount * rx * Math.sin(phase + y * 7 + x * 1.3);
    dy = amount * ry * .35 * Math.sin(phase * 1.6 + x * 5);
  } else if (subject.kind === 'waterfall') {
    dx = amount * rx * .2 * Math.sin(phase + y * 22);
    dy = amount * ry * Math.sin(phase - y * 18);
  } else {
    const pin = (1 - y) * .5;
    dx = amount * rx * pin * Math.sin(phase + y * 3);
    dy = amount * ry * .2 * pin * Math.cos(phase + x * 2);
  }
  const weight = paintedSubjectWeight(subject, point);
  if (!weight) return { x: 0, y: 0, weight: 0 };
  const influence = subject.kind === 'spin' ? 1 : weight;
  return { x: dx * influence, y: dy * influence, weight };
}

export function samplePaintedScene(sceneIndex, portrait, point, time, travel = 0, strength = 1) {
  let x = point[0], y = point[1], coverage = 0, spinX = 0, spinY = 0, spinCoverage = 0;
  for (const subject of getPaintedSubjects(sceneIndex, portrait)) {
    const motion = samplePaintedSubject(subject, point, time, travel);
    if (subject.kind === 'spin' && motion.weight) {
      spinX = motion.x; spinY = motion.y;
      spinCoverage = Math.max(spinCoverage, motion.weight * strength);
    } else { x += motion.x * strength; y += motion.y * strength; }
    coverage = Math.max(coverage, motion.weight * strength);
  }
  const clamp = value => Math.max(0, Math.min(1, value));
  return { uv: [clamp(x), clamp(y)], spinUv: [clamp(x + spinX), clamp(y + spinY)], coverage, spinCoverage };
}
