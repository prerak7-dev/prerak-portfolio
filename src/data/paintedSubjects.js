export const MAX_PAINTED_SUBJECTS = 6;
export const PAINTED_SUBJECT_MODES = Object.freeze({ rock: 0, spin: 1, cloth: 2, water: 3, canopy: 4, waterfall: 5 });

function subject(name, kind, region, period, amount, scroll = .06) {
  return Object.freeze({ name, kind, region: Object.freeze(region), period, amount, scroll,
    mode: PAINTED_SUBJECT_MODES[kind] });
}

// Native painting coordinates. Portrait compositions are authored separately,
// so their subjects have their own anchors rather than scaled desktop bounds.
const LANDSCAPE = [
  [subject('wind-blown cloak', 'cloth', [.080, .461, .027, .039], 5.6, .16),
    subject('tree canopy', 'canopy', [-.004, .196, .132, .206], 8, .025),
    subject('falling water', 'waterfall', [.757, .597, .018, .058], 3.1, .11),
    subject('gate reflections', 'water', [.5, .865, .36, .058], 14, .005)],
  [subject('Services sun', 'spin', [.20, .70, .085, .15], 90, 1, .25),
    subject('Unreal sun', 'spin', [.50, .68, .10, .18], 112, 1, .22),
    subject('Telemetry sun', 'spin', [.80, .70, .085, .15], 98, 1, .25),
    subject('sunlit tide', 'water', [.50, .885, .40, .063], 16, .005)],
  [subject('Case Studies satellite', 'rock', [1.06, .31, .395, .65], 34, .065, .10),
    subject('shore reflections', 'water', [.36, .92, .34, .045], 15, .005)],
  [subject('orbital ribbon', 'rock', [.53, .29, .64, .43], 62, .014, .04),
    subject('Education moon', 'spin', [.107, .436, .034, .061], 42, 1, .28),
    subject('chronology tide', 'water', [.50, .94, .42, .035], 19, .005)],
  [subject('near celestial arc', 'rock', [-.53, .41, .75, .98], 52, .021, .06),
    subject('tidal bands', 'water', [.40, .855, .32, .075], 17, .006)],
  [subject('horizon arc', 'rock', [.69, -.20, .60, .61], 70, .018, .05),
    subject('distant moon', 'spin', [.70, .397, .028, .05], 56, 1, .24),
    subject('beacon sea', 'water', [.58, .69, .32, .13], 21, .004)],
];

const PORTRAIT = [
  [subject('wind-blown cloak', 'cloth', [.105, .488, .049, .028], 5.6, .16),
    subject('tree canopy', 'canopy', [.012, .26, .17, .175], 8, .025),
    subject('left waterfall', 'waterfall', [.237, .611, .024, .068], 3.1, .11),
    subject('right waterfall', 'waterfall', [.861, .637, .027, .064], 3.7, .11),
    subject('gate reflections', 'water', [.51, .827, .36, .078], 14, .005)],
  [subject('Services sun', 'spin', [.20, .69, .11, .055], 90, 1, .25),
    subject('Unreal sun', 'spin', [.50, .67, .16, .08], 112, 1, .22),
    subject('Telemetry sun', 'spin', [.81, .69, .11, .055], 98, 1, .25),
    subject('sunlit tide', 'water', [.50, .875, .39, .075], 16, .005)],
  [subject('Case Studies satellite', 'rock', [1.26, .57, .62, .315], 34, .065, .10),
    subject('shore reflections', 'water', [.43, .934, .40, .036], 15, .005)],
  [subject('orbital ribbon', 'rock', [.64, .67, .80, .20], 62, .014, .04),
    subject('Education moon', 'spin', [.247, .409, .058, .030], 42, 1, .28),
    subject('chronology tide', 'water', [.50, .912, .42, .043], 19, .005)],
  [subject('near celestial arc', 'rock', [-.37, .515, .64, .34], 52, .021, .06),
    subject('tidal bands', 'water', [.45, .895, .43, .068], 17, .006)],
  [subject('horizon arc', 'rock', [.70, .14, .85, .37], 70, .018, .05),
    subject('distant moon', 'spin', [.68, .579, .034, .017], 56, 1, .24),
    subject('beacon sea', 'water', [.50, .775, .45, .125], 21, .004)],
];

export function getPaintedSubjects(sceneIndex, portrait = false) {
  return (portrait ? PORTRAIT : LANDSCAPE)[Math.max(0, Math.min(5, sceneIndex))];
}
