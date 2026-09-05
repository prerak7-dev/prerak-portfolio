import { getCinematicAtmosphereTransition } from './cinematicSceneTimeline.js';

const SCENE_FIELDS = Object.freeze([
  Object.freeze({
    motif: 'gateway',
    source: Object.freeze([0.5, 0.7]),
    direction: Object.freeze([0, -1]),
    horizon: 0.76,
    spread: 0.72,
    turbulence: 0.88,
    sourceReach: 0.54,
  }),
  Object.freeze({
    motif: 'triad',
    source: Object.freeze([0.5, 0.66]),
    direction: Object.freeze([0, -1]),
    horizon: 0.735,
    spread: 0.86,
    turbulence: 0.82,
    sourceReach: 0.9,
  }),
  Object.freeze({
    motif: 'eclipse',
    source: Object.freeze([0.705, 0.47]),
    direction: Object.freeze([-0.96, 0.18]),
    horizon: 0.81,
    spread: 0.56,
    turbulence: 0.94,
    sourceReach: 0.82,
  }),
  Object.freeze({
    motif: 'rings',
    source: Object.freeze([0.13, 0.14]),
    direction: Object.freeze([0.88, 0.48]),
    horizon: 0.78,
    spread: 0.68,
    turbulence: 0.9,
    sourceReach: 0.66,
  }),
  Object.freeze({
    motif: 'limb',
    source: Object.freeze([0.132, 0.43]),
    direction: Object.freeze([0.96, 0.12]),
    horizon: 0.61,
    spread: 0.64,
    turbulence: 1.04,
    sourceReach: 0.7,
  }),
  Object.freeze({
    motif: 'horizon',
    source: Object.freeze([0.696, 0.39]),
    direction: Object.freeze([-0.92, 0.2]),
    horizon: 0.405,
    spread: 0.78,
    turbulence: 0.84,
    sourceReach: 0.62,
  }),
]);

const THEME_DYNAMICS = Object.freeze({
  default: Object.freeze({ speed: 1, curl: 1, lift: -0.01, lateral: 0.01 }),
  fall: Object.freeze({ speed: 1.08, curl: 1.14, lift: -0.08, lateral: -0.015 }),
  spring: Object.freeze({ speed: 0.9, curl: 1.28, lift: -0.025, lateral: 0.018 }),
  winter: Object.freeze({ speed: 0.72, curl: 0.82, lift: 0.035, lateral: 0.028 }),
});
const resolvedFieldCache = new Map();
const blendedFieldCache = new Map();

function lerp(from, to, mix) {
  return from + (to - from) * mix;
}

function resolveField(theme, sceneIndex) {
  const safeIndex = Math.min(SCENE_FIELDS.length - 1, Math.max(0, Math.round(sceneIndex || 0)));
  const themeKey = THEME_DYNAMICS[theme] ? theme : 'default';
  const cacheKey = `${themeKey}:${safeIndex}`;
  if (resolvedFieldCache.has(cacheKey)) return resolvedFieldCache.get(cacheKey);
  const dynamics = THEME_DYNAMICS[themeKey];
  const field = Object.freeze({
    ...SCENE_FIELDS[safeIndex],
    ...dynamics,
    sceneIndex: safeIndex,
    seed: 9719 + safeIndex * 977 + Math.max(0, Object.keys(THEME_DYNAMICS).indexOf(themeKey)) * 131,
  });
  resolvedFieldCache.set(cacheKey, field);
  return field;
}

export function getTracerSceneField(theme, sceneIndex) {
  return Object.freeze(resolveField(theme, sceneIndex));
}

export function getTracerSceneBlend(theme, scenePosition) {
  const transition = getCinematicAtmosphereTransition(scenePosition);
  const { fromIndex, toIndex } = transition;
  const mix = Math.round(transition.mix * 512) / 512;
  const themeKey = THEME_DYNAMICS[theme] ? theme : 'default';
  const cacheKey = `${themeKey}:${fromIndex}:${toIndex}:${mix}`;
  if (blendedFieldCache.has(cacheKey)) return blendedFieldCache.get(cacheKey);
  const from = resolveField(theme, fromIndex);
  const to = resolveField(theme, toIndex);
  const directionX = lerp(from.direction[0], to.direction[0], mix);
  const directionY = lerp(from.direction[1], to.direction[1], mix);
  const directionLength = Math.max(0.0001, Math.hypot(directionX, directionY));

  const blend = Object.freeze({
    from,
    to,
    fromIndex,
    toIndex,
    mix,
    source: Object.freeze([lerp(from.source[0], to.source[0], mix), lerp(from.source[1], to.source[1], mix)]),
    direction: Object.freeze([directionX / directionLength, directionY / directionLength]),
    horizon: lerp(from.horizon, to.horizon, mix),
    spread: lerp(from.spread, to.spread, mix),
    turbulence: lerp(from.turbulence, to.turbulence, mix),
    sourceReach: lerp(from.sourceReach, to.sourceReach, mix),
    speed: lerp(from.speed, to.speed, mix),
    curl: lerp(from.curl, to.curl, mix),
    lift: lerp(from.lift, to.lift, mix),
    lateral: lerp(from.lateral, to.lateral, mix),
  });
  blendedFieldCache.set(cacheKey, blend);
  return blend;
}
