import { getCinematicAtmosphereTransition } from '../data/cinematicSceneTimeline.js';
import { getPigmentLandmarks, getPigmentSubjects } from '../data/livingPigmentArt.js';
import { gateSealDissolveProgress } from './gateSealMotion.js';

export const MAX_PIGMENT_QUIET_RECTS = 32;
export const PIGMENT_DESKTOP_COUNT = 5200;
export const PIGMENT_COMPACT_COUNT = 2200;
const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const fract = value => value - Math.floor(value);

export function createPigmentSeeds(sceneIndex, portrait = false, count = PIGMENT_DESKTOP_COUNT) {
  const shapes = getPigmentLandmarks(sceneIndex, portrait);
  const subjects = getPigmentSubjects(sceneIndex);
  const totalWeight = shapes.reduce((sum, shape) => sum + shape[5], 0);
  const values = { position: new Float32Array(count * 2), center: new Float32Array(count * 2), seed: new Float32Array(count * 4),
    radius: new Float32Array(count * 2), normal: new Float32Array(count * 3), loop: new Float32Array(count * 4) };
  let written = 0;
  for (let attempt = 0; written < count && attempt < count * 50; attempt++) {
    let selection = fract((attempt + 1) * .754877666) * totalWeight;
    const shape = shapes.find(item => { selection -= item[5]; return selection < 0; }) || shapes[0];
    const subject = subjects[shapes.indexOf(shape)];
    const [cx, cy, rx, ry, inner] = shape;
    const angle = fract((attempt + 1) * .618033989 + sceneIndex * .13) * Math.PI * 2;
    const radial = Math.sqrt(inner * inner + (1 - inner * inner) * fract((attempt + 1) * .569840291));
    const x = cx + Math.cos(angle) * rx * radial;
    const y = cy + Math.sin(angle) * ry * radial;
    // Cropped rings need seeds around their entire orbit. Otherwise their only
    // initially-visible arc would eventually rotate completely offscreen.
    if (subject.kind !== 'orbit' && (x < 0 || x > 1 || y < 0 || y > 1)) continue;
    values.position.set([clamp(x), clamp(y)], written * 2);
    values.center.set([cx, cy], written * 2);
    values.radius.set([rx, ry], written * 2);
    const back = fract(attempt * .547193 + .17) < .5 ? -1 : 1;
    values.normal.set([Math.cos(angle) * radial, Math.sin(angle) * radial, Math.sqrt(Math.max(0, 1 - radial * radial)) * back], written * 3);
    values.loop.set([subject.mode, Math.PI * 2 / subject.period, subject.scrollTurn, subject.phase], written * 4);
    values.seed.set([fract(attempt * .438579 + .1), fract(attempt * .716937 + .2),
      fract(attempt * .327193 + .3), fract(attempt * .913721 + .4)], written * 4);
    written++;
  }
  return { ...values, count: written };
}

// The loop clock never restarts on a chapter, theme, or scroll handoff. Scroll
// adds a reversible angular offset to the same subject pose used while reading.
export function samplePigmentSubject(subject, normal, time, travel = 0) {
  const angle = time * Math.PI * 2 / subject.period + subject.phase + clamp(travel) * subject.scrollTurn;
  const c = Math.cos(angle), s = Math.sin(angle);
  if (subject.kind === 'sphere') return { x: normal[0] * c + normal[2] * s, y: normal[1], z: normal[2] * c - normal[0] * s };
  if (subject.kind === 'orbit') return { x: normal[0] * c - normal[1] * s, y: normal[0] * s + normal[1] * c, z: 1 };
  if (subject.kind === 'ripple') return { x: normal[0] + Math.sin(angle + normal[0] * 6) * .035,
    y: normal[1] + Math.sin(angle * 2 + normal[0] * 8) * .08, z: 1 };
  return { x: normal[0] + Math.sin(angle + normal[1] * 2) * .022,
    y: normal[1] + Math.sin(angle) * .035, z: 1 };
}

export function resolvePigmentPassage(theme, motion, transition, seal) {
  const staticScene = (sceneIndex, appearance = theme) => [{ sceneIndex, theme: appearance, role: 0, progress: 0, travel: 0, transitioning: false }];
  const pair = (fromIndex, toIndex, progress, fromTheme = theme, toTheme = theme) => {
    if (fromIndex === toIndex && fromTheme === toTheme) return staticScene(fromIndex, fromTheme);
    const p = clamp(progress);
    return [
      { sceneIndex: fromIndex, theme: fromTheme, role: 0, progress: p, travel: p, transitioning: true },
      { sceneIndex: toIndex, theme: toTheme, role: 1, progress: p, travel: 1 - p, transitioning: true },
    ];
  };
  if (transition.active) {
    if (transition.fromTheme === 'boot') return [];
    return pair(transition.sceneIndex, transition.targetSceneIndex ?? transition.sceneIndex,
      transition.progress, transition.fromTheme, transition.toTheme);
  }
  if (motion.scenePosition < .00001 && seal?.dissolving && seal.theme === theme && seal.angle > .00001) {
    return pair(0, 1, gateSealDissolveProgress(seal.angle));
  }
  const { fromIndex, toIndex, mix } = getCinematicAtmosphereTransition(motion.scenePosition);
  if (mix <= .00001 || fromIndex === toIndex) return staticScene(fromIndex);
  if (mix >= .99999) return staticScene(toIndex);
  return pair(fromIndex, toIndex, mix);
}

// Mirrors the shader's reversible spatial flourish for deterministic regression
// checks. Direction comes from scrubbing progress, never a sign-flipping force.
export function samplePigmentFlourish(seed, travel, time = 0) {
  const phase = clamp(travel);
  const theta = seed[0] * Math.PI * 2 + phase * (1.2 + seed[1] * .7);
  const reach = phase * phase * (18 + seed[2] * 58);
  return { x: Math.cos(theta) * reach + Math.sin(time * .22 + seed[0] * 9) * (1 + seed[1] * 3),
    y: Math.sin(theta) * reach - phase * (8 + seed[3] * 34) };
}

export function pigmentQuietRects(rects, width, height) {
  const boxes = rects.filter(rect => rect.width > 0 && rect.height > 0
    && rect.left < width && rect.top < height && rect.left + rect.width > 0 && rect.top + rect.height > 0)
    .map(rect => ({ left: clamp(rect.left - 6, 0, width), top: clamp(rect.top - 6, 0, height),
      right: clamp(rect.left + rect.width + 6, 0, width), bottom: clamp(rect.top + rect.height + 6, 0, height) }));
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (a.left > b.right || b.left > a.right || a.top > b.bottom || b.top > a.bottom) continue;
      boxes[i] = { left: Math.min(a.left, b.left), top: Math.min(a.top, b.top), right: Math.max(a.right, b.right), bottom: Math.max(a.bottom, b.bottom) };
      boxes.splice(j, 1); i = -1; break;
    }
  }
  if (boxes.length > MAX_PIGMENT_QUIET_RECTS) {
    boxes.sort((a, b) => (b.right - b.left) * (b.bottom - b.top) - (a.right - a.left) * (a.bottom - a.top));
    const extra = boxes.splice(MAX_PIGMENT_QUIET_RECTS - 1);
    boxes.push({ left: Math.min(...extra.map(r => r.left)), top: Math.min(...extra.map(r => r.top)),
      right: Math.max(...extra.map(r => r.right)), bottom: Math.max(...extra.map(r => r.bottom)) });
  }
  return boxes;
}
