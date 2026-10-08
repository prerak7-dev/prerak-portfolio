import { getSwarmScenePalette } from '../data/swarmScenePalettes.js';
import { GATE_SEAL_HOLD_MS } from './gateSealMotion.js';
import { INK_FIREWORK_PALETTES } from '../data/inkFireworkPalettes.js';

export const INK_FIREWORK_DURATION_MS = GATE_SEAL_HOLD_MS;
const LAUNCH_MS = 560;
const BLOOM_MS = 1420;
const DRY_MS = 1400;
const TAU = Math.PI * 2;
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * t * (t * (t * 6 - 15) + 10); };

function randomSource(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function ribbon(points, width, seed, color, birth = 0, opacity = .8, duration = BLOOM_MS, kind = 1) {
  return { points, width, seed, color, birth, opacity, duration, kind };
}

export function createInkFireworkScore(width, height, theme = 'default', portrait = false, gateOrigin, sceneField) {
  const palette = getSwarmScenePalette(theme, 0, 'rail');
  const colors = INK_FIREWORK_PALETTES[theme] || INK_FIREWORK_PALETTES.default;
  const random = randomSource(palette.seed);
  const scale = Math.min(width, height);
  const placements = portrait ? [[.25, .38, .19], [.74, .41, .16], [.49, .24, .135]]
    : [[.25, .3, .155], [.60, .29, .11], [.48, .36, .10]];
  return placements.map(([x, y, size], index) => {
    const center = { x: x * width, y: y * height };
    const radius = size * scale;
    const strands = [];
    const count = portrait ? 12 : 18;
    const spin = index % 2 ? -1 : 1;
    const delay = index * 220;
    const birth = delay + LAUNCH_MS;
    for (let ray = 0; ray < count; ray++) {
      const angle = ray / count * TAU + (random() - .5) * .4;
      const depth = .52 + random() * .48;
      const reach = radius * (.65 + random() * .4);
      const curl = (random() - .5) * 2.6;
      const seed = random() * TAU;
      const points = Array.from({ length: 34 }, (_, step) => {
        const t = step / 33;
        const travel = .17 + .83 * (1 - Math.exp(-1.4 * t)) / (1 - Math.exp(-1.4));
        const theta = angle + curl * Math.sin(t * Math.PI * .78) + spin * t * t * .32;
        const capillary = Math.sin(t * 15 + seed) * t * 1.4;
        return { x: center.x + Math.cos(theta) * reach * travel + Math.sin(theta) * capillary,
          y: center.y + Math.sin(theta) * reach * travel * (.72 + depth * .28)
            + reach * t * t * .22 - Math.cos(theta) * capillary };
      });
      const color = colors[(ray + index) % colors.length];
      const brushWidth = Math.max(.75, scale / 700) * (ray % 4 === 0 ? 3.8 : .9 + depth * 1.1);
      const rayBirth = birth + random() * 90;
      strands.push(ribbon(points, brushWidth, seed, color, rayBirth, .44 + depth * .25));
      if (ray % 4 === 0) {
        const fork = points[19];
        const branch = Array.from({ length: 15 }, (_, step) => {
          const t = step / 14;
          const theta = angle + curl * .8 + spin * .34 * t;
          return { x: fork.x + Math.cos(theta) * reach * .38 * t,
            y: fork.y + Math.sin(theta) * reach * .38 * t + reach * .16 * t * t };
        });
        strands.push(ribbon(branch, brushWidth * .45, seed + 1.7, color, rayBirth + BLOOM_MS * .54, .68, BLOOM_MS * .46));
      }
      if (ray % 2 === 0) {
        const inner = points.map((point, step) => ({
          x: center.x + (point.x - center.x) * .63 + Math.sin(step / 33 * Math.PI) * spin * 7,
          y: center.y + (point.y - center.y) * .63,
        }));
        strands.push(ribbon(inner, brushWidth * .45, seed + .8, colors[(ray + index + 1) % colors.length], birth + 190, .3, 1180));
      }
    }
    if (sceneField?.streamlines && sceneField.projection) {
      const projection = sceneField.projection;
      const candidates = sceneField.streamlines.map(line => {
        const points = line.points.map(point => ({ x: projection.left + point.x * projection.width, y: projection.top + point.y * projection.height }));
        const safe = points.filter(point => point.x > 12 && point.x < width - 12 && point.y > height * .17 && point.y < height * .72);
        if (safe.length < 16 || safe.length !== points.length) return null;
        const middle = safe[Math.floor(safe.length / 2)];
        const reach = Math.hypot(safe.at(-1).x - safe[0].x, safe.at(-1).y - safe[0].y);
        return reach > scale * .09 ? { points: safe, distance: Math.hypot(middle.x - center.x, middle.y - center.y) } : null;
      }).filter(Boolean).sort((a, b) => a.distance - b.distance);
      candidates.slice(index * 3, index * 3 + 8).forEach((line, lane) => {
        const points = line.points.filter((_, sample) => sample % 2 === 0);
        if (points.at(-1) !== line.points.at(-1)) points.push(line.points.at(-1));
        strands.push({ ...ribbon(points, Math.max(1, scale / 650) * (lane % 3 === 0 ? 3 : 1.6), random() * TAU,
          colors[(lane + index) % colors.length], birth + lane * 85, .58, 1280 + lane * 45), followsContour: true });
      });
    }
    const origin = gateOrigin || { x: width * .51, y: height * (portrait ? .62 : .55) };
    const launch = Array.from({ length: 38 }, (_, step) => {
      const t = step / 37;
      return { x: origin.x + (center.x - origin.x) * t + Math.sin(t * Math.PI) * radius * spin * .22,
        y: origin.y + (center.y - origin.y) * t - Math.sin(t * Math.PI) * radius * .26 };
    });
    return { center, radius, delay, strands,
      launch: ribbon(launch, Math.max(1.3, scale / 420), random() * TAU, colors[index % colors.length], delay, .7, LAUNCH_MS, 0),
      end: INK_FIREWORK_DURATION_MS };
  });
}

export function sampleInkFirework(burst, elapsed) {
  const local = elapsed - burst.delay;
  const age = local - LAUNCH_MS;
  return {
    launch: smooth(local / LAUNCH_MS),
    launchOpacity: smooth(local / 180) * (1 - smooth(age / 900)),
    growth: smooth(age / BLOOM_MS),
    bleed: smooth(age / (BLOOM_MS + DRY_MS)),
    opacity: smooth(age / 180) * (1 - smooth((age - BLOOM_MS) / DRY_MS) * .28),
  };
}

export function inkRibbonOutline(stroke, growth, spread = 1) {
  const { points } = stroke;
  const head = clamp(growth) * (points.length - 1);
  if (head <= .001) return [];
  const visible = points.slice(0, Math.floor(head) + 1);
  if (head < points.length - 1) {
    const a = points[Math.floor(head)], b = points[Math.ceil(head)];
    const mix = head - Math.floor(head);
    if (mix > 0) visible.push({ x: a.x + (b.x - a.x) * mix, y: a.y + (b.y - a.y) * mix });
  }
  if (visible.length < 2) return [];
  const left = [], right = [];
  visible.forEach((point, index) => {
    const previous = visible[Math.max(0, index - 1)], next = visible[Math.min(visible.length - 1, index + 1)];
    const length = Math.max(.001, Math.hypot(next.x - previous.x, next.y - previous.y));
    const normal = { x: -(next.y - previous.y) / length, y: (next.x - previous.x) / length };
    const t = index / (points.length - 1);
    const width = stroke.width * spread * (.45 + .55 * Math.sin(Math.PI * t))
      * (.78 + .16 * Math.sin(t * 51 + stroke.seed) + .06 * Math.sin(t * 113 - stroke.seed));
    left.push({ x: point.x + normal.x * width, y: point.y + normal.y * width });
    right.push({ x: point.x - normal.x * width, y: point.y - normal.y * width });
  });
  return [...left, ...right.reverse()];
}
