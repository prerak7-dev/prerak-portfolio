import test from 'node:test';
import assert from 'node:assert/strict';
import { APPEARANCE_IDS } from '../data/themeAppearance.js';
import { getPaintedSubjects } from '../data/paintedSubjects.js';
import { getCelestialTracerFocus } from '../data/celestialTracerFocus.js';
import { createDiscoveryField, discoveryContext, DISCOVERY_DURATION, PAINTED_DISCOVERY_DURATION, findScenicDiscovery, getScenicDiscoveries, isScenicTap, MAX_DISCOVERIES } from './scenicDiscoveries.js';

test('every painting has discoveries anchored to its own authored subjects', () => {
  for (const portrait of [false, true]) for (let scene = 0; scene < 6; scene++) {
    const targets = getScenicDiscoveries(scene, portrait);
    assert(targets.some(target => target.kind === 1 || target.kind === 5));
    assert(targets.every(target => target.anchor.every(value => value > 0 && value < 1)));
    assert.equal(new Set(targets.map(target => target.id)).size, targets.length);
    assert(targets.every(target => target.art.length === 4 && target.art.every(Number.isFinite)));
    assert.equal(targets.some(target => target.kind === 3), scene === 0 || scene === 4);
    // The lower chronology landscape remains deliberately still.
    if (scene === 3) assert.equal(targets.length, 1);
  }
});

test('four different new discoveries replace the wash and gust while retaining water', () => {
  for (const portrait of [false, true]) {
    assert.deepEqual([...new Set(getScenicDiscoveries(0, portrait).map(target => target.kind))].sort(), [1, 2, 3, 4, 5]);
    const oldLabels = /wake the|call the wind|star map/i;
    for (let scene = 0; scene < 6; scene++) {
      const targets = getScenicDiscoveries(scene, portrait);
      assert(targets.every(target => !oldLabels.test(target.label)));
      const water = getPaintedSubjects(scene, portrait).filter(subject => subject.kind === 'water');
      assert.deepEqual(targets.filter(target => target.kind === 2).map(target => target.region), water.map(subject => subject.region));
    }
  }
});

test('drawings use the authored orientation and do not reposition when tapped', () => {
  const landscape = getScenicDiscoveries(0), portrait = getScenicDiscoveries(0, true);
  for (const kind of [1, 3, 4, 5]) {
    const target = landscape.find(target => target.kind === kind);
    assert.notDeepEqual(target.art, portrait.find(target => target.kind === kind).art);
    const field = createDiscoveryField();
    field.trigger(target, { x: .01, y: .99 }, 0, 0);
    assert.deepEqual(field.sample(1000)[0].art, target.art);
  }
});

test('celestial ink follows the real body instead of a floating diagram', () => {
  for (const portrait of [false, true]) for (let scene = 0; scene < 6; scene++) {
    for (const target of getScenicDiscoveries(scene, portrait).filter(target => target.kind === 1)) {
      const subject = getPaintedSubjects(scene, portrait)[target.index];
      const focus = getCelestialTracerFocus(scene, portrait);
      assert.deepEqual(target.art, subject.kind === 'solar' ? subject.region
        : [focus.centerX, focus.centerY, focus.radiusX, focus.radiusY]);
      assert(target.horizon <= subject.horizon);
    }
  }
});

test('compass and comet respond around their drawings as well as their source subjects', () => {
  for (const portrait of [false, true]) {
    const targets = getScenicDiscoveries(0, portrait);
    for (const kind of [3, 5]) {
      const target = targets.find(item => item.kind === kind);
      assert.equal(findScenicDiscovery(targets, target.art[0], target.art[1])?.kind, kind);
    }
  }
});

test('light, dark, chapter and orientation responses cannot leak into one another', () => {
  const contexts = new Set();
  for (const theme of APPEARANCE_IDS) for (const portrait of [false, true]) for (let scene = 0; scene < 6; scene++) {
    const context = discoveryContext(scene, theme, portrait);
    assert(!contexts.has(context)); contexts.add(context);
  }
});

test('scene hit testing stays within subjects and above their masked horizon', () => {
  const targets = getScenicDiscoveries(1);
  assert.equal(findScenicDiscovery(targets, .503, .697)?.kind, 1);
  assert.equal(findScenicDiscovery(targets, .503, .76), undefined);
  assert.equal(findScenicDiscovery(targets, .5, .885)?.kind, 2);
  assert.equal(findScenicDiscovery(targets, -.01, .885), undefined);
  assert.equal(findScenicDiscovery(getScenicDiscoveries(0, true), .105, .488)?.kind, 3);
});

test('scroll gestures and long presses are not mistaken for taps', () => {
  assert(isScenicTap({ x: 20, y: 30 }, { x: 22, y: 33 }, 200));
  assert(!isScenicTap({ x: 20, y: 30 }, { x: 20, y: 80 }, 200));
  assert(!isScenicTap({ x: 20, y: 30 }, { x: 22, y: 33 }, 900));
});

test('water keeps its original entry, lifetime, and cooldown', () => {
  const field = createDiscoveryField(), target = getScenicDiscoveries(0).find(target => target.kind === 2);
  assert(field.trigger(target, { x: .1, y: .5 }, 0, 0));
  assert(!field.trigger(target, { x: .1, y: .5 }, 0, 1000));
  assert.equal(field.sample(0)[0].strength, 0);
  assert(field.sample(300)[0].strength < field.sample(600)[0].strength);
  assert.equal(field.sample(900)[0].strength, 1);
  assert(field.sample(4000)[0].strength < 1);
  assert.deepEqual(field.sample(DISCOVERY_DURATION), []);
});

test('painted discoveries arrive sooner, remain readable longer, and cannot stack on themselves', () => {
  const field = createDiscoveryField(), target = getScenicDiscoveries(0).find(target => target.kind === 3);
  field.trigger(target, { x: .1, y: .5 }, 0, 0);
  assert.equal(field.sample(450)[0].strength, 1);
  assert.equal(field.sample(5000)[0].strength, 1);
  assert(!field.trigger(target, { x: .1, y: .5 }, 0, 3000));
  assert(field.sample(6200)[0].strength > .7);
  assert.deepEqual(field.sample(PAINTED_DISCOVERY_DURATION), []);
});

test('bounded responses never evict visible ink and interruptions fade instead of snapping', () => {
  const field = createDiscoveryField(), targets = getScenicDiscoveries(0);
  for (let index = 0; index < MAX_DISCOVERIES; index++) assert(field.trigger(targets[index], { x: .5, y: .5 }, 0, 0));
  assert(!field.trigger(targets[0], { x: .5, y: .5 }, 0, 2000));
  field.release(2000);
  assert.equal(field.sample(2000)[0].strength, 1);
  field.release(2200);
  assert(field.sample(2250)[0].strength > 0 && field.sample(2250)[0].strength < 1);
  assert(!field.trigger(targets[0], { x: .5, y: .5 }, 0, 2250));
  assert.deepEqual(field.sample(2500), []);
  field.trigger(targets[0], { x: .5, y: .5 }, 0, 2600);
  field.clear(); assert.deepEqual(field.sample(2700), []);
});
