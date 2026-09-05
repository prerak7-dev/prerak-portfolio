import defaultCelestial from '../../content/chapter-celestial/chapter-celestial-default-v1.webp';
import fallCelestial from '../../content/chapter-celestial/chapter-celestial-fall-v1.webp';
import springCelestial from '../../content/chapter-celestial/chapter-celestial-spring-v1.webp';
import winterCelestial from '../../content/chapter-celestial/chapter-celestial-winter-v1.webp';

const chapterCelestialByTheme = Object.freeze({
  default: defaultCelestial,
  fall: fallCelestial,
  spring: springCelestial,
  winter: winterCelestial,
});

export const chapterCelestialSources = Object.freeze(Object.values(chapterCelestialByTheme));

export function getChapterCelestialAsset(theme) {
  return chapterCelestialByTheme[theme] || chapterCelestialByTheme.default;
}

function freezePoint(point) {
  return Object.freeze(point);
}

function createStage(stage) {
  return Object.freeze({
    ...stage,
    labelDirection: freezePoint(stage.labelDirection),
    ...(stage.orbit ? {
      orbit: Object.freeze({
        ...stage.orbit,
        center: freezePoint(stage.orbit.center),
        radius: freezePoint(stage.orbit.radius),
      }),
    } : {}),
    ...(stage.points ? { points: Object.freeze(stage.points.map(freezePoint)) } : {}),
  });
}

const CHRONOLOGY_RAIL_POINTS = [
  { x: 0.167464, y: 0.255048 },
  { x: 0.269139, y: 0.398512 },
  { x: 0.370813, y: 0.515409 },
  { x: 0.472488, y: 0.600425 },
  { x: 0.574163, y: 0.669501 },
  { x: 0.675837, y: 0.722636 },
];

const CORES_HORIZON_RAIL_POINTS = [
  { x: 0.29, y: 0.786 },
  { x: 0.375, y: 0.797 },
  { x: 0.46, y: 0.791 },
  { x: 0.545, y: 0.804 },
  { x: 0.63, y: 0.797 },
  { x: 0.715, y: 0.803 },
  { x: 0.8, y: 0.788 },
];

// Planetary contours are stored in normalized source-image space. Orbit stages
// follow circular bodies; path stages follow painted rings with non-circular perspective.
export const CHAPTER_RAIL_STAGES = Object.freeze([
  createStage({
    id: 'intro',
    selector: '.gateway-sequence-preloads img[data-frame-index="0"]',
    orbit: {
      center: { x: 0.869945, y: 0.073646 },
      radius: { x: 0.273855, y: 0.486854 },
      startAngle: 181,
      endAngle: 123,
    },
    labelDirection: { x: 1, y: 0 },
    labelDistance: 96,
    markerDistance: 24,
  }),
  createStage({
    id: 'cores',
    selector: '.cores-plate img',
    points: CORES_HORIZON_RAIL_POINTS,
    labelDirection: { x: 0, y: -1 },
    labelDistance: 80,
    markerDistance: -48,
  }),
  createStage({
    id: 'projects',
    selector: '.systems-plate img',
    orbit: {
      center: { x: 1.03165, y: 0.321719 },
      radius: { x: 0.364657, y: 0.647934 },
      startAngle: 201,
      endAngle: 151,
    },
    labelDirection: { x: 1, y: 0 },
    labelDistance: 96,
    markerDistance: 24,
  }),
  createStage({
    id: 'professional',
    selector: '.chronology-plate img',
    points: CHRONOLOGY_RAIL_POINTS,
    labelDirection: { x: 0.6, y: -0.8 },
    labelDistance: 84,
    markerDistance: 22,
  }),
  createStage({
    id: 'education',
    selector: '.chronology-plate img',
    points: CHRONOLOGY_RAIL_POINTS,
    labelDirection: { x: 0.6, y: -0.8 },
    labelDistance: 84,
    markerDistance: 22,
  }),
  createStage({
    id: 'personal',
    selector: '.field-plate img',
    orbit: {
      center: { x: -0.135227, y: 0.118087 },
      radius: { x: 0.339166, y: 0.602641 },
      startAngle: -12,
      endAngle: 29,
    },
    labelDirection: { x: -1, y: 0 },
    labelDistance: 45,
    labelAlign: 'right',
    markerDistance: 56,
  }),
  createStage({
    id: 'contact',
    selector: '.surface-plate img',
    points: [
      { x: 0.227273, y: 0.21254 },
      { x: 0.345933, y: 0.276302 },
      { x: 0.464593, y: 0.31881 },
      { x: 0.583253, y: 0.337938 },
      { x: 0.701913, y: 0.320935 },
      { x: 0.820573, y: 0.284803 },
    ],
    labelDirection: { x: 0, y: -1 },
    labelDistance: 82,
    markerDistance: 24,
  }),
]);
