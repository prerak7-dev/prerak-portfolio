export const MAX_PAINTED_SUBJECTS = 7;
export const PAINTED_SUBJECT_MODES = Object.freeze({ orbit: 0, spin: 1, cloth: 2, water: 3, canopy: 4, waterfall: 5, solar: 6 });

function subject(name, kind, region, period, amount, scroll = .06, horizon = 1.1) {
  return Object.freeze({ name, kind, region: Object.freeze(region), period, amount, scroll, horizon,
    mode: PAINTED_SUBJECT_MODES[kind] });
}

// Native painting coordinates. Portrait compositions are authored separately,
// so their subjects have their own anchors rather than scaled desktop bounds.
const LANDSCAPE = [
  [subject('wind-blown cloak', 'cloth', [.080, .461, .027, .039], 5.6, .16),
    subject('tree canopy', 'canopy', [-.004, .196, .132, .206], 8, .025),
    subject('cliff waterfall', 'waterfall', [.079, .68, .014, .128], 4.8, .52),
    subject('falling water', 'waterfall', [.757, .601, .010, .047], 3.8, .55),
    subject('distant waterfall', 'waterfall', [.812, .625, .009, .035], 4.2, .5),
    subject('gate reflections', 'water', [.5, .865, .36, .058], 14, .005),
    subject('Home moon', 'orbit', [.9285, -.1517, .385, .684], 30, .16, .08, .46)],
  [subject('Services sun', 'solar', [.201, .711, .044, .078], 66, 1, .18, .747),
    subject('Unreal sun', 'solar', [.503, .697, .081, .144], 84, 1, .16, .747),
    subject('Telemetry sun', 'solar', [.803, .704, .068, .121], 74, 1, .18, .747),
    subject('sunlit tide', 'water', [.50, .885, .40, .063], 16, .005)],
  [subject('Case Studies satellite', 'orbit', [1.06, .31, .395, .65], 24, .18, .10, .88),
    subject('shore reflections', 'water', [.36, .92, .34, .045], 15, .005)],
  [subject('orbital ribbon', 'orbit', [.53, .29, .64, .43], 30, .065, .04, .78),
    subject('Education moon', 'spin', [.107, .436, .034, .061], 42, 1, .28)],
  [subject('near celestial arc', 'orbit', [-.53, .41, .75, .98], 28, .12, .06, .57),
    subject('tidal bands', 'water', [.40, .855, .32, .075], 17, .006)],
  [subject('horizon arc', 'orbit', [.69, -.20, .60, .61], 32, .10, .05, .348),
    subject('distant moon', 'spin', [.698, .377, .011, .0196], 56, 1, .24),
    subject('beacon sea', 'water', [.58, .69, .32, .13], 21, .004)],
];

const PORTRAIT = [
  [subject('wind-blown cloak', 'cloth', [.105, .488, .049, .028], 5.6, .16),
    subject('tree canopy', 'canopy', [.012, .26, .17, .175], 8, .025),
    subject('left waterfall', 'waterfall', [.237, .611, .018, .068], 3.8, .55),
    subject('right waterfall', 'waterfall', [.861, .637, .020, .064], 4.4, .52),
    subject('gate reflections', 'water', [.51, .827, .36, .078], 14, .005),
    subject('Home moon', 'orbit', [1.28, -.055, .832, .416], 30, .16, .08, .32)],
  [subject('Services sun', 'solar', [.198, .690, .077, .0385], 66, 1, .18, .703),
    subject('Unreal sun', 'solar', [.501, .667, .124, .062], 84, 1, .16, .703),
    subject('Telemetry sun', 'solar', [.800, .690, .080, .040], 74, 1, .18, .703),
    subject('sunlit tide', 'water', [.50, .875, .39, .075], 16, .005)],
  [subject('Case Studies satellite', 'orbit', [1.26, .57, .62, .315], 24, .18, .10, .88),
    subject('shore reflections', 'water', [.43, .934, .40, .036], 15, .005)],
  [subject('orbital ribbon', 'orbit', [.64, .67, .80, .20], 30, .065, .04, .855),
    subject('Education moon', 'spin', [.247, .409, .058, .030], 42, 1, .28)],
  [subject('near celestial arc', 'orbit', [-.37, .515, .64, .34], 28, .12, .06, .655),
    subject('tidal bands', 'water', [.45, .895, .43, .068], 17, .006)],
  [subject('horizon arc', 'orbit', [.70, .14, 1.05, .42], 32, .10, .05, .56),
    subject('distant moon', 'spin', [.677, .576, .016, .008], 56, 1, .24),
    subject('beacon sea', 'water', [.50, .775, .45, .125], 21, .004)],
];

export function getPaintedSubjects(sceneIndex, portrait = false) {
  return (portrait ? PORTRAIT : LANDSCAPE)[Math.max(0, Math.min(5, sceneIndex))];
}

// The outer edge of the shared Experience/Education band. Keep its lower
// triangular landscape still; the independently animated moon is exempt.
const NO_BACKDROP_CLIP = Object.freeze([0, 0, 0, 0]);
const CHRONOLOGY_BACKDROP_CLIPS = [
  Object.freeze([1.326, -2.775, 2.066 * 1.008, 3.672 * 1.008]),
  Object.freeze([1.10, .11, 1.28 * 1.035, .645 * 1.035]),
];

export function getPaintedBackdropClip(sceneIndex, portrait = false) {
  return sceneIndex === 3 ? CHRONOLOGY_BACKDROP_CLIPS[Number(portrait)] : NO_BACKDROP_CLIP;
}
