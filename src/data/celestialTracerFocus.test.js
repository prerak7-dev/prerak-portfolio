import test from 'node:test';
import assert from 'node:assert/strict';
import { getCelestialTracerBudget, getCelestialTracerFocus } from './celestialTracerFocus.js';

test('background tracers have a small, fixed desktop and mobile budget', () => {
  assert.equal(getCelestialTracerBudget(1440, 900), 8);
  for (const [width, height] of [[390, 844], [844, 390], [1024, 768]]) {
    assert.equal(getCelestialTracerBudget(width, height), 5);
  }
});

test('every chapter has one bounded primary body with separately authored portrait anchors', () => {
  for (let scene = 0; scene < 6; scene++) {
    const wide = getCelestialTracerFocus(scene), tall = getCelestialTracerFocus(scene, true);
    assert.notEqual(wide, tall);
    for (const focus of [wide, tall]) {
      assert(Object.isFrozen(focus));
      assert(focus.radiusX > 0 && focus.radiusY > 0);
      assert(focus.band > 0 && focus.band <= .1);
      assert(focus.maxY > 0 && focus.maxY < 1);
      assert.equal(focus.count, 12);
    }
    assert.equal(getCelestialTracerFocus(scene), wide);
  }
});

test('Cores focuses the middle sun and excludes both neighboring suns and the sea', () => {
  for (const portrait of [false, true]) {
    const focus = getCelestialTracerFocus(1, portrait);
    assert(Math.abs(focus.centerX - .5) < .01);
    for (const x of [.2, .8]) assert(Math.abs((x - focus.centerX) / focus.radiusX) > 1 + focus.band * 1.42);
    assert(focus.maxY < (portrait ? .703 : .747));
  }
});

test('the wide chronology focus follows the painted ring rather than the clouds above it', () => {
  const focus = getCelestialTracerFocus(3);
  for (const [x, y] of [[.1, .18], [.5, .59], [.9, .818]]) {
    const distance = Math.hypot((x - focus.centerX) / focus.radiusX, (y - focus.centerY) / focus.radiusY);
    assert(Math.abs(distance - 1) < focus.band, 'The focus must intersect the authored gold band');
  }
});
