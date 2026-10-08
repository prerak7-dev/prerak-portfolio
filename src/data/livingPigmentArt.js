export const LIVING_PIGMENT_ATLAS = 'cinematic/painted-v1/ui/living-pigment-grains-v1.webp';
export const PIGMENT_SCENE_SELECTORS = Object.freeze([
  '.gateway-sequence-preloads img[data-frame-index="0"]',
  '.cores-plate .environment-living-layer img',
  '.systems-plate .environment-living-layer img',
  '.chronology-plate .environment-living-layer img',
  '.field-plate .environment-living-layer img',
  '.surface-plate .environment-living-layer img',
]);

// UV landmarks belong to the authored plates, not the screen or reading layout.
// Each ellipse is [center x, center y, radius x, radius y, inner radius, weight].
const LANDSCAPE = [
  [[.5, .56, .135, .30, 0, 3], [.94, -.14, .35, .61, .89, 1]],
  [[.20, .70, .073, .13, 0, 1], [.50, .68, .088, .16, 0, 2], [.80, .70, .072, .13, 0, 1]],
  [[.864, .38, .216, .50, .88, 4], [.60, .86, .35, .045, .72, 1]],
  [[.075, -.18, .91, .94, .91, 4], [.107, .436, .029, .052, 0, 1]],
  [[-.035, .40, .28, .69, .91, 4], [.19, .925, .17, .05, .72, 1]],
  [[.68, -.15, .46, .47, .91, 3], [.70, .397, .024, .043, 0, 1]],
];
const PORTRAIT = [
  [[.52, .59, .30, .19, 0, 4], [1.27, -.06, .73, .37, .90, 1]],
  [[.20, .69, .09, .055, 0, 1], [.50, .67, .14, .075, 0, 2], [.81, .69, .09, .055, 0, 1]],
  [[1.27, .625, .67, .355, .90, 4], [.46, .90, .40, .027, .7, 1]],
  [[1.04, .125, 1.25, .575, .91, 4], [.247, .409, .055, .028, 0, 1]],
  [[-.205, .545, .425, .345, .91, 4], [.42, .935, .31, .035, .72, 1]],
  [[.70, .23, .70, .38, .91, 3], [.68, .579, .028, .014, 0, 1]],
];

export function getPigmentLandmarks(sceneIndex, portrait = false) {
  return (portrait ? PORTRAIT : LANDSCAPE)[Math.max(0, Math.min(5, sceneIndex))];
}

export const PIGMENT_LOOP_MODES = Object.freeze({ breathe: 0, orbit: 1, sphere: 2, ripple: 3 });
const SUBJECTS = [
  [
    { name: 'gate mist', kind: 'breathe', period: 18, scrollTurn: .8, phase: .2 },
    { name: 'celestial arc', kind: 'orbit', period: 64, scrollTurn: 1.4, phase: .1 },
  ],
  [
    { name: 'Services sun', kind: 'sphere', period: 36, scrollTurn: 1.8, phase: .1 },
    { name: 'Unreal sun', kind: 'sphere', period: 44, scrollTurn: 1.6, phase: .3 },
    { name: 'Telemetry sun', kind: 'sphere', period: 52, scrollTurn: 1.9, phase: .6 },
  ],
  [
    { name: 'planetary rim', kind: 'orbit', period: 68, scrollTurn: 1.5, phase: .4 },
    { name: 'shore reflection', kind: 'ripple', period: 16, scrollTurn: 1.2, phase: .5 },
  ],
  [
    { name: 'orbital ribbons', kind: 'orbit', period: 72, scrollTurn: 1.4, phase: .7 },
    { name: 'left moon', kind: 'sphere', period: 24, scrollTurn: 2.2, phase: .2 },
  ],
  [
    { name: 'near planetary rim', kind: 'orbit', period: 58, scrollTurn: 1.7, phase: .5 },
    { name: 'tidal bands', kind: 'ripple', period: 20, scrollTurn: 1.4, phase: .8 },
  ],
  [
    { name: 'horizon arc', kind: 'orbit', period: 80, scrollTurn: 1.3, phase: .1 },
    { name: 'distant moon', kind: 'sphere', period: 32, scrollTurn: 2, phase: .4 },
  ],
].map(subjects => Object.freeze(subjects.map(subject => Object.freeze({ ...subject, mode: PIGMENT_LOOP_MODES[subject.kind] }))));

export function getPigmentSubjects(sceneIndex) {
  return SUBJECTS[Math.max(0, Math.min(5, sceneIndex))];
}
