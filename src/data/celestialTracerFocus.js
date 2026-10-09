const TAU = Math.PI * 2;

function focus(name, centerX, centerY, radiusX, radiusY, band, maxY) {
  return Object.freeze({ name, centerX, centerY, radiusX, radiusY, band, maxY,
    startAngle: 0, endAngle: TAU, count: 12, minEnergy: .035, minMask: .06 });
}

// Native artwork coordinates: only the dominant body, never its reflections,
// foreground terrain, or the smaller companion moons and suns.
const LANDSCAPE = Object.freeze([
  focus('Home celestial arc', .9285, -.1517, .3471, .6171, .055, .48),
  focus('Cores central sun', .503, .697, .081, .144, .10, .739),
  focus('Case Studies satellite', 1.06, .31, .395, .65, .04, .87),
  focus('Chronology orbital body', 1.326, -2.775, 2.066, 3.672, .005, .85),
  focus('Field Notes near body', -.16, .15, .37, .658, .045, .59),
  focus('Contact horizon body', .68, -1.975, 1.31, 2.327, .01, .355),
]);
const PORTRAIT = Object.freeze([
  focus('Home celestial arc', 1.28, -.055, .75, .375, .055, .30),
  focus('Cores central sun', .501, .667, .124, .062, .10, .70),
  focus('Case Studies satellite', 1.26, .57, .62, .315, .04, .87),
  focus('Chronology orbital body', 1.10, .11, 1.28, .645, .035, .79),
  focus('Field Notes near body', -.294, .43, .53, .265, .045, .64),
  focus('Contact horizon body', .677, -.08, .99, .64, .025, .562),
]);

export function getCelestialTracerFocus(sceneIndex, portrait = false) {
  return (portrait ? PORTRAIT : LANDSCAPE)[Math.max(0, Math.min(5, sceneIndex))];
}

export function getCelestialTracerBudget(width, height) {
  return width <= 1100 || height <= 500 ? 5 : 8;
}
