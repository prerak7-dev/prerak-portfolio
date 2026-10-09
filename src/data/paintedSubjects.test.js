import test from 'node:test';
import assert from 'node:assert/strict';
import { getPaintedSubjects, MAX_PAINTED_SUBJECTS, PAINTED_SUBJECT_MODES } from './paintedSubjects.js';
import { getCelestialTracerFocus } from './celestialTracerFocus.js';

test('all painted subjects fit the shared shader without dropping existing Home motion', () => {
  for (const portrait of [false, true]) {
    for (let scene = 0; scene < 6; scene++) {
      assert(getPaintedSubjects(scene, portrait).length <= MAX_PAINTED_SUBJECTS);
    }
    const home = getPaintedSubjects(0, portrait);
    assert.equal(home[0].kind, 'cloth');
    for (const kind of ['canopy', 'waterfall', 'water', 'orbit']) assert(home.some(subject => subject.kind === kind));
  }
});

test('Home moon reuses the looping, scroll-responsive celestial motion in both compositions', () => {
  for (const portrait of [false, true]) {
    const moon = getPaintedSubjects(0, portrait).find(subject => subject.name === 'Home moon');
    const focus = getCelestialTracerFocus(0, portrait);
    assert.equal(moon.mode, PAINTED_SUBJECT_MODES.orbit);
    assert.equal(moon.period, 30);
    assert(moon.amount > 0 && moon.scroll > 0);
    assert.deepEqual(moon.region.slice(0, 2), [focus.centerX, focus.centerY]);
    assert(moon.region[2] > focus.radiusX && moon.region[3] > focus.radiusY);
    assert(Object.isFrozen(moon) && Object.isFrozen(moon.region));
    // A little space around the painted rim allows feathered movement while
    // the gate, figure, mountains and water remain outside the moon's mask.
    const pins = portrait ? [[.51, .48], [.13, .46], [.861, .637], [.5, .827]]
      : [[.62, .30], [.5, .55], [.094, .412], [.757, .601]];
    for (const [x, y] of pins) {
      const [cx, cy, rx, ry] = moon.region;
      assert(y > moon.horizon + .01 || Math.hypot((x - cx) / rx, (y - cy) / ry) >= 1);
    }
  }
});
