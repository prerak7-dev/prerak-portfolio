import { getCinematicAtmosphereTransition } from './cinematicSceneTimeline.js';

const freezeColors = (colors) => Object.freeze(colors.map((color) => Object.freeze(color)));

function exposeForAdditiveLight(color) {
  const peak = Math.max(...color);
  const target = peak < 90 ? 174 : peak < 140 ? 188 : peak < 188 ? 204 : peak;
  const exposure = peak > 0 ? target / peak : 1;
  return color.map((channel) => Math.min(255, Math.round(channel * exposure)));
}

function scenePalette(seed, drift, rail, tabs, wayfinder) {
  return Object.freeze({
    seed,
    drift,
    rail: freezeColors(rail),
    tabs: freezeColors(tabs),
    wayfinder: freezeColors(wayfinder),
  });
}

function lerp(from, to, mix) {
  return from + (to - from) * mix;
}

export const SWARM_SCENE_KEYS = Object.freeze([
  'intro',
  'cores',
  'systems',
  'chronology',
  'field',
  'surface',
]);

// These colors are sampled from the image regions directly behind each UI field.
// Keeping the three compositions separate lets the swarm inherit local scene light
// instead of applying one decorative theme color everywhere.
export const SWARM_SCENE_PALETTES = Object.freeze({
  default: Object.freeze({
    intro: scenePalette(1947, 1, [[222, 198, 164], [176, 148, 115], [203, 181, 153], [141, 117, 91]], [[226, 201, 165], [169, 160, 149], [155, 133, 110], [118, 101, 85]], [[184, 161, 131], [168, 145, 117], [120, 96, 74], [85, 71, 57]]),
    cores: scenePalette(2039, 0.96, [[232, 204, 154], [192, 161, 112], [139, 119, 91], [77, 69, 59]], [[242, 216, 165], [197, 169, 124], [132, 112, 86], [74, 67, 58]], [[224, 192, 139], [180, 147, 102], [124, 103, 78], [79, 68, 55]]),
    systems: scenePalette(2111, 1.02, [[159, 137, 104], [144, 124, 96], [125, 111, 90], [67, 63, 57]], [[140, 117, 84], [89, 80, 66], [76, 70, 61], [48, 47, 45]], [[216, 179, 121], [178, 145, 98], [126, 105, 76], [85, 74, 59]]),
    chronology: scenePalette(2251, 0.94, [[165, 139, 104], [148, 126, 97], [126, 110, 88], [73, 70, 66]], [[95, 85, 73], [69, 66, 61], [49, 49, 48], [36, 37, 38]], [[148, 122, 89], [133, 112, 84], [116, 99, 77], [101, 88, 71]]),
    field: scenePalette(2383, 1.05, [[201, 164, 113], [174, 143, 101], [145, 121, 90], [116, 99, 77]], [[93, 84, 72], [85, 78, 67], [77, 72, 64], [56, 54, 50]], [[193, 159, 112], [100, 86, 69], [85, 73, 60], [76, 69, 60]]),
    surface: scenePalette(2521, 0.9, [[127, 107, 83], [108, 95, 78], [63, 59, 54], [42, 41, 39]], [[141, 115, 84], [105, 90, 70], [79, 70, 58], [64, 59, 51]], [[97, 85, 70], [68, 63, 55], [48, 46, 43], [23, 23, 23]]),
  }),
  fall: Object.freeze({
    intro: scenePalette(3671, 1.08, [[234, 211, 174], [224, 200, 163], [198, 177, 148], [102, 78, 54]], [[239, 219, 184], [231, 208, 171], [219, 197, 163], [187, 170, 144]], [[156, 139, 116], [118, 85, 56], [105, 75, 49], [88, 73, 56]]),
    cores: scenePalette(3757, 1.06, [[241, 166, 88], [201, 117, 61], [143, 79, 47], [82, 52, 41]], [[246, 177, 94], [210, 126, 64], [151, 83, 47], [86, 53, 39]], [[232, 145, 72], [188, 100, 52], [137, 72, 43], [91, 55, 39]]),
    systems: scenePalette(3821, 1.12, [[114, 55, 39], [85, 50, 36], [54, 36, 30], [41, 30, 27]], [[62, 35, 27], [42, 29, 25], [38, 25, 22], [30, 24, 23]], [[224, 130, 54], [193, 97, 38], [149, 71, 33], [108, 51, 29]]),
    chronology: scenePalette(3967, 1.04, [[114, 55, 39], [88, 47, 36], [72, 38, 32], [59, 35, 31]], [[37, 27, 27], [28, 23, 23], [23, 21, 22], [18, 17, 19]], [[112, 58, 40], [93, 47, 35], [44, 28, 25], [36, 25, 24]]),
    field: scenePalette(4099, 1.15, [[138, 88, 63], [98, 60, 47], [81, 44, 34], [45, 28, 25]], [[40, 33, 33], [29, 26, 27], [26, 23, 25], [24, 22, 23]], [[134, 91, 67], [95, 54, 40], [80, 45, 34], [72, 43, 35]]),
    surface: scenePalette(4231, 1.02, [[72, 48, 44], [66, 40, 36], [47, 31, 30], [40, 25, 25]], [[116, 63, 46], [77, 44, 38], [66, 32, 28], [48, 26, 24]], [[75, 45, 38], [54, 35, 32], [50, 30, 27], [41, 28, 27]]),
  }),
  spring: Object.freeze({
    intro: scenePalette(5281, 0.82, [[243, 225, 194], [232, 215, 187], [211, 203, 184], [163, 151, 121]], [[223, 213, 193], [202, 197, 180], [170, 153, 120], [119, 111, 82]], [[177, 164, 136], [158, 142, 110], [132, 119, 86], [83, 77, 53]]),
    cores: scenePalette(5369, 0.8, [[235, 210, 157], [184, 171, 130], [121, 134, 108], [66, 87, 77]], [[241, 218, 166], [190, 176, 134], [115, 132, 108], [62, 84, 76]], [[225, 199, 145], [170, 154, 112], [106, 119, 94], [67, 85, 71]]),
    systems: scenePalette(5431, 0.84, [[132, 132, 107], [103, 110, 93], [83, 94, 83], [68, 80, 73]], [[74, 91, 78], [56, 68, 63], [47, 57, 56], [44, 54, 53]], [[206, 184, 131], [155, 149, 108], [114, 120, 91], [72, 82, 65]]),
    chronology: scenePalette(5573, 0.78, [[129, 128, 104], [112, 114, 94], [92, 95, 80], [45, 52, 49]], [[36, 43, 41], [31, 37, 37], [22, 27, 29], [20, 25, 27]], [[123, 120, 94], [108, 107, 85], [90, 92, 75], [52, 57, 51]]),
    field: scenePalette(5701, 0.88, [[172, 166, 126], [112, 120, 96], [87, 95, 78], [35, 45, 42]], [[53, 70, 67], [48, 64, 62], [43, 59, 58], [41, 55, 55]], [[139, 137, 105], [82, 85, 65], [63, 67, 52], [55, 61, 51]]),
    surface: scenePalette(5843, 0.76, [[162, 154, 121], [140, 139, 113], [56, 64, 56], [35, 42, 39]], [[172, 160, 122], [113, 113, 87], [72, 81, 67], [54, 64, 56]], [[85, 90, 72], [64, 70, 57], [53, 58, 47], [45, 54, 47]]),
  }),
  winter: Object.freeze({
    intro: scenePalette(7411, 0.68, [[239, 230, 215], [228, 219, 205], [208, 204, 197], [93, 100, 108]], [[234, 222, 205], [223, 211, 195], [213, 204, 190], [183, 183, 181]], [[235, 226, 212], [224, 215, 203], [210, 203, 194], [179, 176, 172]]),
    cores: scenePalette(7483, 0.66, [[242, 233, 218], [202, 205, 207], [146, 158, 172], [88, 103, 122]], [[246, 237, 222], [207, 210, 214], [142, 156, 172], [82, 99, 120]], [[235, 226, 211], [190, 194, 200], [132, 145, 160], [91, 105, 123]]),
    systems: scenePalette(7559, 0.7, [[146, 150, 155], [123, 131, 141], [102, 112, 125], [85, 97, 111]], [[70, 84, 98], [35, 45, 58], [31, 39, 52], [19, 26, 37]], [[226, 220, 212], [167, 168, 169], [133, 139, 145], [100, 110, 121]]),
    chronology: scenePalette(7699, 0.64, [[146, 150, 156], [104, 113, 126], [85, 97, 112], [37, 49, 64]], [[31, 42, 55], [28, 38, 52], [24, 34, 47], [20, 30, 42]], [[132, 138, 148], [106, 116, 129], [89, 100, 115], [75, 87, 104]]),
    field: scenePalette(7829, 0.73, [[129, 137, 147], [105, 116, 129], [84, 97, 112], [26, 37, 53]], [[36, 48, 65], [31, 43, 60], [27, 39, 55], [16, 25, 39]], [[157, 161, 166], [142, 147, 155], [127, 135, 145], [84, 96, 113]]),
    surface: scenePalette(7963, 0.62, [[100, 108, 122], [88, 97, 111], [78, 87, 102], [44, 53, 68]], [[120, 125, 133], [90, 99, 111], [51, 60, 75], [28, 35, 49]], [[84, 92, 104], [66, 74, 87], [58, 67, 80], [50, 58, 71]]),
  }),
});

const resolvedPaletteCache = new Map();
const blendedPaletteCache = new Map();

export function getSwarmScenePalette(theme, sceneIndex, variant) {
  const themeKey = SWARM_SCENE_PALETTES[theme] ? theme : 'default';
  const themePalettes = SWARM_SCENE_PALETTES[themeKey];
  const safeIndex = Math.min(SWARM_SCENE_KEYS.length - 1, Math.max(0, Math.round(sceneIndex || 0)));
  const cacheKey = `${themeKey}:${safeIndex}:${variant}`;
  if (resolvedPaletteCache.has(cacheKey)) return resolvedPaletteCache.get(cacheKey);
  const scene = themePalettes[SWARM_SCENE_KEYS[safeIndex]] || themePalettes.intro;
  const sampledColors = scene[variant] || scene.tabs;
  const palette = Object.freeze({
    seed: scene.seed,
    drift: scene.drift,
    // Canvas uses additive compositing, so lift radiance while preserving each
    // sampled RGB ratio. The emitted light retains the source scene's hue.
    colors: freezeColors(sampledColors.map(exposeForAdditiveLight)),
  });
  resolvedPaletteCache.set(cacheKey, palette);
  return palette;
}

export function getSwarmScenePaletteBlend(theme, scenePosition, variant) {
  const transition = getCinematicAtmosphereTransition(scenePosition);
  const { fromIndex, toIndex } = transition;
  const mix = Math.round(transition.mix * 256) / 256;
  const themeKey = SWARM_SCENE_PALETTES[theme] ? theme : 'default';
  const cacheKey = `${themeKey}:${fromIndex}:${toIndex}:${variant}:${mix}`;
  if (blendedPaletteCache.has(cacheKey)) return blendedPaletteCache.get(cacheKey);
  const from = getSwarmScenePalette(theme, fromIndex, variant);
  const to = getSwarmScenePalette(theme, toIndex, variant);
  const colorCount = Math.min(from.colors.length, to.colors.length);

  const palette = Object.freeze({
    seed: from.seed,
    drift: lerp(from.drift, to.drift, mix),
    fromIndex,
    toIndex,
    mix,
    colors: freezeColors(Array.from({ length: colorCount }, (_, index) => (
      from.colors[index].map((channel, channelIndex) => (
        Math.round(lerp(channel, to.colors[index][channelIndex], mix))
      ))
    ))),
  });
  blendedPaletteCache.set(cacheKey, palette);
  return palette;
}
