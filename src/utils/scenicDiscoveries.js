import { getPaintedSubjects } from '../data/paintedSubjects.js';
import { APPEARANCE_IDS } from '../data/themeAppearance.js';
import { getCelestialTracerFocus } from '../data/celestialTracerFocus.js';

export const MAX_DISCOVERIES = 3;
export const DISCOVERY_DURATION = 6200;
export const PAINTED_DISCOVERY_DURATION = 9200;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = value => { const t = clamp(value); return t * t * t * (t * (t * 6 - 15) + 10); };

// Hit regions and drawings are separate: the discovery belongs to a landmark,
// but its ink needs a little breathing room beside that landmark.
const LANDMARKS = [
  [
    { kind: 3, region: [.10, .48, .085, .085], art: [.19, .575, .072, .128],
      portraitRegion: [.13, .50, .10, .06], portraitArt: [.24, .555, .13, .065] },
    { kind: 4, region: [.82, .57, .12, .12], art: [.82, .59, .15, .14],
      portraitRegion: [.80, .57, .16, .065], portraitArt: [.78, .57, .21, .07] },
    { kind: 5, region: [.29, .25, .18, .14], art: [.32, .285, .14, .12],
      portraitRegion: [.81, .39, .18, .08], portraitArt: [.77, .48, .21, .065] },
  ],
  [
    { kind: 4, region: [.15, .93, .14, .055], art: [.20, .91, .18, .075],
      portraitRegion: [.18, .94, .16, .045], portraitArt: [.22, .92, .21, .055] },
  ],
  [],
  [],
  [
    { kind: 3, region: [.828, .81, .075, .075], art: [.858, .727, .070, .124],
      portraitRegion: [.82, .815, .10, .06], portraitArt: [.80, .75, .13, .065] },
    { kind: 4, region: [.91, .62, .09, .12], art: [.83, .65, .16, .13],
      portraitRegion: [.88, .68, .12, .065], portraitArt: [.78, .70, .21, .065] },
  ],
  [],
];
const LABELS = { 1: 'Follow the celestial ink tide', 2: 'Stir the water', 3: "Find the traveler's compass",
  4: 'Trace the mountain echoes', 5: 'Release a painted comet' };

export function discoveryContext(sceneIndex, theme, portrait) {
  return sceneIndex + Math.max(0, APPEARANCE_IDS.indexOf(theme)) * 8 + Number(portrait) * 64;
}

export function getScenicDiscoveries(sceneIndex, portrait = false) {
  const subjects = getPaintedSubjects(sceneIndex, portrait);
  const moon = subjects.findIndex(subject => subject.kind === 'spin');
  const target = (kind, index, region, art = region, horizon = 1, round = false) => ({
    id: `${kind}:${index}`, kind, index, region, art, horizon, round,
    anchor: [clamp(region[0], .08, .88), clamp(region[1], .14, .92)], label: LABELS[kind],
  });
  const water = subjects.flatMap((subject, index) => subject.kind === 'water'
    ? [target(2, index, subject.region, subject.region, subject.horizon)] : []);
  const landmarks = (LANDMARKS[sceneIndex] || []).map((landmark, index) => target(landmark.kind, index,
    portrait ? landmark.portraitRegion : landmark.region, portrait ? landmark.portraitArt : landmark.art));
  const sky = subjects.flatMap((subject, index) => {
    const celestial = subject.kind === 'solar' || index === moon || moon < 0 && subject.kind === 'orbit';
    if (!celestial) return [];
    const [x, y] = subject.region;
    if (index === moon) {
      const art = portrait ? [clamp(x + .07, .25, .75), y - .06, .24, .085]
        : [clamp(x + .09, .25, .75), y - .09, .18, .15];
      const region = [x, y, Math.max(subject.region[2], portrait ? .085 : .05),
        Math.max(subject.region[3], portrait ? .045 : .08)];
      return [target(5, index, region, art, subject.horizon, true)];
    }
    const focus = getCelestialTracerFocus(sceneIndex, portrait);
    const art = subject.kind === 'solar' ? subject.region : [focus.centerX, focus.centerY, focus.radiusX, focus.radiusY];
    return [target(1, index, subject.region, art, Math.min(subject.horizon, focus.maxY), true)];
  });
  // The broad celestial hit regions must not swallow the smaller landmarks.
  return [...landmarks, ...water, ...sky];
}

export function findScenicDiscovery(targets, x, y) {
  return targets.find(target => {
    if (y > target.horizon || x < 0 || x > 1 || y < 0 || y > 1) return false;
    const inside = (region, round) => {
      const [cx, cy, rx, ry] = region;
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      return round ? dx * dx + dy * dy < .98 : Math.abs(dx) < .98 && Math.abs(dy) < .98;
    };
    // Also respond around the visible drawing, not only a tiny source subject.
    // Water deliberately retains its original hit region and ripple behavior.
    if (target.kind === 2) {
      const [cx, cy, rx, ry] = target.region;
      return Math.abs((x - cx) / rx) < .94 && Math.abs((y - cy) / ry) < .94;
    }
    return inside(target.region, target.round)
      || (target.kind === 3 || target.kind === 5) && inside(target.art, false);
  });
}

export function isScenicTap(start, end, elapsed) {
  return elapsed <= 650 && Math.hypot(end.x - start.x, end.y - start.y) < 10;
}

export function createDiscoveryField() {
  let pulses = [];
  const cooldowns = new Map();
  return {
    trigger(target, point, context, now) {
      const key = `${context}:${target.id}`;
      if (now - (cooldowns.get(key) ?? -Infinity) < 1800) return false;
      pulses = pulses.filter(pulse => now - pulse.started < pulse.duration
        && (pulse.released === null || now - pulse.released < 500));
      if (target.kind !== 2 && pulses.some(pulse => pulse.context === context
        && pulse.kind === target.kind && pulse.index === target.index && pulse.released === null)) return false;
      // Do not evict a visible response: repeated tapping must not snap ink away.
      if (pulses.length >= MAX_DISCOVERIES) return false;
      cooldowns.set(key, now);
      if (cooldowns.size > 32) cooldowns.delete(cooldowns.keys().next().value);
      pulses.push({ kind: target.kind, index: target.index, art: target.art,
        horizon: target.horizon, duration: target.kind === 2 ? DISCOVERY_DURATION : PAINTED_DISCOVERY_DURATION,
        x: point.x, y: point.y, context, started: now, released: null });
      return true;
    },
    sample(now) {
      pulses = pulses.filter(pulse => now - pulse.started < pulse.duration
        && (pulse.released === null || now - pulse.released < 500));
      return pulses.map(pulse => {
        const age = Math.max(0, now - pulse.started);
        const water = pulse.kind === 2, hold = water ? 2600 : 5100;
        const strength = smooth(age / (water ? 900 : 450)) * (1 - smooth((age - hold) / (pulse.duration - hold)))
          * (pulse.released === null ? 1 : 1 - smooth((now - pulse.released) / 500));
        return { ...pulse, age: age / 1000, strength };
      });
    },
    release(now) { pulses.forEach(pulse => { pulse.released ??= now; }); },
    clear() { pulses = []; cooldowns.clear(); },
  };
}
