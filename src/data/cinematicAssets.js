export const GATEWAY_FRAME_COUNT = 24;
export const GATEWAY_COMPACT_MEDIA_QUERY = '(max-width: 1680px)';
export const GATEWAY_GEOMETRY_KEYFRAME_INDICES = Object.freeze([
  0, 3, 6, 9, 12, 15, 18, 21, 23,
]);

export const CINEMATIC_ASSET_GEOMETRY = Object.freeze({
  scene: Object.freeze({ width: 2560, height: 1440 }),
  particleAtlas: Object.freeze({ width: 1254, height: 1254 }),
  topologyRope: Object.freeze({ width: 1536, height: 256 }),
});

const GLOBAL_PRELOAD_ASSETS = [
  'cinematic/ui/text-distress-mask.png',
];
const SCENE_KEYS = [
  'seasonalVines',
  'cores',
  'systems',
  'chronology',
  'field',
  'surface',
  'particles',
  'topologyRope',
];
const PREVIEW_GATEWAY_FRAME_COUNT = 3;

function uniqueManifest(items) {
  const manifest = new Map();
  items.filter((item) => item?.filename).forEach((item) => {
    const existing = manifest.get(item.filename);
    manifest.set(item.filename, {
      ...existing,
      ...item,
      decode: Boolean(existing?.decode || item.decode),
      priority: existing?.priority === 'high' || item.priority === 'high' ? 'high' : 'auto',
    });
  });
  return [...manifest.values()];
}

function manifestItem(filename, decode = false, priority = 'auto') {
  return filename ? { filename, decode, priority } : null;
}

function gatewayFrames(theme) {
  return Array.from(
    { length: GATEWAY_FRAME_COUNT },
    (_, index) => `cinematic/${theme}/gateway/cosmic-frames-v9/frame-${String(index).padStart(2, '0')}.webp`,
  );
}

function compactGatewayFrames(theme) {
  return Array.from(
    { length: GATEWAY_FRAME_COUNT },
    (_, index) => `cinematic/${theme}/gateway/cosmic-frames-v9-compact/frame-${String(index).padStart(2, '0')}.webp`,
  );
}

function gatewayGeometryFrames(theme) {
  return Array.from(
    { length: GATEWAY_FRAME_COUNT },
    (_, index) => `cinematic/${theme}/geometry/gateway/cosmic-frames-v9/frame-${String(index).padStart(2, '0')}.webp`,
  );
}

function geometryAssets(theme) {
  return Object.freeze({
    gatewayFrames: Object.freeze(gatewayGeometryFrames(theme)),
    cores: `cinematic/${theme}/geometry/cores-flow.webp`,
    systems: `cinematic/${theme}/geometry/systems-flow.webp`,
    chronology: `cinematic/${theme}/geometry/chronology-flow.webp`,
    field: `cinematic/${theme}/geometry/field-flow.webp`,
    surface: `cinematic/${theme}/geometry/surface-flow.webp`,
  });
}

function themeAssets(theme) {
  const seasonalVines = ['fall', 'spring'].includes(theme)
    ? `cinematic/${theme}/seasonal-vines-watercolor-v1.webp`
    : null;

  return Object.freeze({
    gatewayFrames: gatewayFrames(theme),
    gatewayCompactFrames: Object.freeze(compactGatewayFrames(theme)),
    seasonalVines,
    cores: `cinematic/${theme}/cores.webp`,
    coresCompact: `cinematic/${theme}/cores-compact.webp`,
    systems: `cinematic/${theme}/systems.webp`,
    chronology: `cinematic/${theme}/chronology.webp`,
    field: `cinematic/${theme}/field.webp`,
    surface: `cinematic/${theme}/surface.webp`,
    particles: `cinematic/${theme}/particles-watercolor.webp`,
    topologyRope: `cinematic/${theme}/topology-rope-segment-watercolor-v2.webp`,
    geometry: geometryAssets(theme),
  });
}

export const CINEMATIC_THEMES = Object.freeze({
  default: themeAssets('default'),
  fall: themeAssets('fall'),
  spring: themeAssets('spring'),
  winter: themeAssets('winter'),
});

export function getCinematicAssets(theme) {
  return CINEMATIC_THEMES[theme] || CINEMATIC_THEMES.default;
}

export function getThemePreloadAssets(theme) {
  const assets = getCinematicAssets(theme);
  return [...new Set([
    ...assets.gatewayFrames,
    ...SCENE_KEYS.map((key) => assets[key]).filter(Boolean),
    ...assets.geometry.gatewayFrames,
    assets.geometry.cores,
    assets.geometry.systems,
    assets.geometry.chronology,
    assets.geometry.field,
    assets.geometry.surface,
  ])];
}

function getResponsiveGatewayFrames(assets, compact) {
  return compact ? assets.gatewayCompactFrames : assets.gatewayFrames;
}

function getResponsiveSceneAsset(assets, key, compact) {
  if (compact && key === 'cores') return assets.coresCompact;
  return assets[key];
}

export function getCriticalPreloadManifest(theme, { compact = false } = {}) {
  const assets = getCinematicAssets(theme);
  const responsiveGatewayFrames = getResponsiveGatewayFrames(assets, compact);
  return uniqueManifest([
    ...GLOBAL_PRELOAD_ASSETS.map((filename) => manifestItem(filename, false, 'high')),
    ...responsiveGatewayFrames.map((filename, index) => (
      manifestItem(filename, false, index < 4 ? 'high' : 'auto')
    )),
    manifestItem(assets.seasonalVines, false, 'high'),
    manifestItem(getResponsiveSceneAsset(assets, 'cores', compact), false, 'high'),
    manifestItem(assets.systems, false, 'high'),
    manifestItem(assets.chronology, false, 'high'),
    manifestItem(assets.field, false, 'high'),
    manifestItem(assets.surface, false, 'high'),
    manifestItem(assets.particles, false, 'high'),
    manifestItem(assets.topologyRope),
    ...GATEWAY_GEOMETRY_KEYFRAME_INDICES
      .map((index) => manifestItem(assets.geometry.gatewayFrames[index])),
    manifestItem(assets.geometry.cores),
    manifestItem(assets.geometry.systems),
    manifestItem(assets.geometry.chronology),
    manifestItem(assets.geometry.field),
    manifestItem(assets.geometry.surface),
  ]);
}

export function getThemeWarmPreloadManifest(theme, { compact = false } = {}) {
  const assets = getCinematicAssets(theme);
  const responsiveGatewayFrames = getResponsiveGatewayFrames(assets, compact);
  const gatewayGeometry = GATEWAY_GEOMETRY_KEYFRAME_INDICES
    .map((index) => assets.geometry.gatewayFrames[index]);
  return uniqueManifest([
    ...responsiveGatewayFrames.map((filename) => manifestItem(filename)),
    ...SCENE_KEYS.map((key) => manifestItem(getResponsiveSceneAsset(assets, key, compact))),
    ...gatewayGeometry.map((filename) => manifestItem(filename)),
    manifestItem(assets.geometry.cores),
    manifestItem(assets.geometry.systems),
    manifestItem(assets.geometry.chronology),
    manifestItem(assets.geometry.field),
    manifestItem(assets.geometry.surface),
  ]);
}

export function getThemePreviewPreloadManifest(theme) {
  const assets = getCinematicAssets(theme);
  return uniqueManifest([
    ...assets.gatewayFrames
      .slice(0, PREVIEW_GATEWAY_FRAME_COUNT)
      .map((filename, index) => manifestItem(filename, false, index < 2 ? 'high' : 'auto')),
    manifestItem(assets.seasonalVines),
    ...['cores', 'systems', 'chronology', 'field', 'surface']
      .map((key) => manifestItem(assets[key], false)),
    manifestItem(assets.particles),
  ]);
}

export function getThemeTransitionPreloadManifest(theme, chapterId = 'intro', { compact = false } = {}) {
  const assets = getCinematicAssets(theme);
  const sceneKey = {
    cores: 'cores',
    projects: 'systems',
    professional: 'chronology',
    education: 'chronology',
    personal: 'field',
    contact: 'surface',
  }[chapterId];
  if (sceneKey) {
    return uniqueManifest([
      manifestItem(getResponsiveSceneAsset(assets, sceneKey, compact), true, 'high'),
      manifestItem(assets.seasonalVines, true, 'high'),
      manifestItem(assets.surface, true, 'high'),
      manifestItem(assets.particles),
    ]);
  }
  const responsiveGatewayFrames = getResponsiveGatewayFrames(assets, compact);
  return uniqueManifest([
    ...responsiveGatewayFrames.map((filename, index) => (
      manifestItem(filename, false, index < 4 ? 'high' : 'auto')
    )),
    manifestItem(assets.seasonalVines, true, 'high'),
    manifestItem(assets.surface, true, 'high'),
    manifestItem(assets.particles),
  ]);
}

export function getCompletePreloadManifest(initialTheme) {
  return uniqueManifest([
    ...getCriticalPreloadManifest(initialTheme),
    ...getThemeWarmPreloadManifest(initialTheme),
    ...Object.keys(CINEMATIC_THEMES)
      .filter((theme) => theme !== initialTheme)
      .flatMap((theme) => getThemePreviewPreloadManifest(theme)),
  ]);
}

export function getGatewayFrameAsset(theme, index, { compact = false } = {}) {
  const assets = getCinematicAssets(theme);
  const safeIndex = Math.min(GATEWAY_FRAME_COUNT - 1, Math.max(0, Math.round(index)));
  return getResponsiveGatewayFrames(assets, compact)[safeIndex];
}

export function getCinematicSceneAsset(theme, sceneIndex, gatewayFrameIndex = 0, options = {}) {
  const assets = getCinematicAssets(theme);
  const safeSceneIndex = Math.min(5, Math.max(0, Math.round(sceneIndex || 0)));
  if (safeSceneIndex === 0) return getGatewayFrameAsset(theme, gatewayFrameIndex, options);
  const sceneKey = ['cores', 'systems', 'chronology', 'field', 'surface'][safeSceneIndex - 1];
  return getResponsiveSceneAsset(assets, sceneKey, Boolean(options.compact));
}

export function getCinematicGeometryAsset(theme, sceneIndex, gatewayFrameIndex = 0) {
  const geometry = getCinematicAssets(theme).geometry;
  const safeSceneIndex = Math.min(5, Math.max(0, Math.round(sceneIndex || 0)));
  if (safeSceneIndex === 0) {
    const safeFrameIndex = Math.min(
      GATEWAY_FRAME_COUNT - 1,
      Math.max(0, Math.round(gatewayFrameIndex || 0)),
    );
    const nearestKeyframe = GATEWAY_GEOMETRY_KEYFRAME_INDICES.reduce((nearest, index) => (
      Math.abs(index - safeFrameIndex) < Math.abs(nearest - safeFrameIndex) ? index : nearest
    ), GATEWAY_GEOMETRY_KEYFRAME_INDICES[0]);
    return geometry.gatewayFrames[nearestKeyframe];
  }
  return geometry[['cores', 'systems', 'chronology', 'field', 'surface'][safeSceneIndex - 1]];
}
