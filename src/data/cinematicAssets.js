export const GATEWAY_FRAME_COUNT = 24;

const GLOBAL_PRELOAD_ASSETS = ['cinematic/ui/text-distress-mask.png'];
const ARTIFACT_KEYS = ['pipeline', 'plugin', 'telemetry'];
const SCENE_KEYS = [
  'systems',
  'chronology',
  'field',
  'surface',
  'particles',
  'topologySlab',
  'topologyRope',
  'controlSlab',
  'wayfinderSlab',
  'loreSlab',
];

function gatewayFrames(theme) {
  return Array.from(
    { length: GATEWAY_FRAME_COUNT },
    (_, index) => `cinematic/${theme}/gateway/frames/frame-${String(index).padStart(2, '0')}.webp`,
  );
}

function themeAssets(theme) {
  return Object.freeze({
    gatewayFrames: gatewayFrames(theme),
    systems: `cinematic/${theme}/systems.webp`,
    chronology: `cinematic/${theme}/chronology.webp`,
    field: `cinematic/${theme}/field.webp`,
    surface: `cinematic/${theme}/surface.webp`,
    particles: `cinematic/${theme}/particles.${theme === 'default' ? 'png' : 'webp'}`,
    topologySlab: `cinematic/${theme}/topology-slab.png`,
    topologyRope: `cinematic/${theme}/topology-rope.png`,
    controlSlab: `cinematic/${theme}/ui/control-slab.webp`,
    wayfinderSlab: `cinematic/${theme}/ui/wayfinder-slab.webp`,
    loreSlab: `cinematic/${theme}/ui/lore-slab.webp`,
    artifacts: Object.freeze(Object.fromEntries(
      ARTIFACT_KEYS.map((key) => [key, `cinematic/${theme}/artifacts/${key}.webp`]),
    )),
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
  return [
    ...assets.gatewayFrames,
    ...SCENE_KEYS.map((key) => assets[key]),
    ...ARTIFACT_KEYS.map((key) => assets.artifacts[key]),
  ];
}

export function getCompletePreloadManifest(initialTheme) {
  return [
    ...GLOBAL_PRELOAD_ASSETS.map((filename) => ({ filename, decode: true })),
    ...Object.entries(CINEMATIC_THEMES).flatMap(([theme]) => (
      getThemePreloadAssets(theme).map((filename) => ({
        filename,
        decode: theme === initialTheme,
      }))
    )),
  ];
}

export function getGatewayFrameAsset(theme, index) {
  const assets = getCinematicAssets(theme);
  const safeIndex = Math.min(GATEWAY_FRAME_COUNT - 1, Math.max(0, Math.round(index)));
  return assets.gatewayFrames[safeIndex];
}
