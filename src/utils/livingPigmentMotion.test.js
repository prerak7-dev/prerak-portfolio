import test from 'node:test';
import assert from 'node:assert/strict';
import { createPigmentSeeds, MAX_PIGMENT_QUIET_RECTS, pigmentQuietRects, resolvePigmentPassage, samplePigmentFlourish, samplePigmentSubject, PIGMENT_COMPACT_COUNT, PIGMENT_DESKTOP_COUNT } from './livingPigmentMotion.js';
import { buildLivingPigmentGeometry } from './livingPigmentRenderer.js';
import { getPigmentSubjects } from '../data/livingPigmentArt.js';

test('every chapter has a continuous subject loop that remains active at zero scroll progress', () => {
  for (let scene = 0; scene < 6; scene++) for (const subject of getPigmentSubjects(scene)) {
    const normal = [.4, .35, Math.sqrt(1 - .4 ** 2 - .35 ** 2)];
    const first = samplePigmentSubject(subject, normal, 0, 0);
    const later = samplePigmentSubject(subject, normal, subject.period / 4, 0);
    assert(Math.hypot(later.x - first.x, later.y - first.y, later.z - first.z) > .01);
    const wrap = samplePigmentSubject(subject, normal, subject.period, 0);
    for (const axis of ['x', 'y', 'z']) assert(Math.abs(wrap[axis] - first[axis]) < 1e-12, 'No loop-end reset');
    const before = samplePigmentSubject(subject, normal, subject.period - .001, 0);
    const after = samplePigmentSubject(subject, normal, subject.period + .001, 0);
    assert(Math.hypot(after.x - before.x, after.y - before.y, after.z - before.z) < .001);
  }
});

test('the Education moon spins around its own center and shares one pose with its scroll handoff', () => {
  const moon = getPigmentSubjects(3).find(subject => subject.name === 'left moon');
  assert.equal(moon.kind, 'sphere');
  const normal = [.5, .2, Math.sqrt(.71)];
  const reading = samplePigmentSubject(moon, normal, 8, 0);
  const starting = samplePigmentSubject(moon, normal, 8, .000001);
  assert(Math.hypot(starting.x - reading.x, starting.z - reading.z) < .00001, 'Transition starts from the visible loop pose');
  const during = samplePigmentSubject(moon, normal, 8, .4);
  assert(Math.hypot(during.x - reading.x, during.z - reading.z) > .2, 'Scroll adds a visible angular response');
  assert.deepEqual(samplePigmentSubject(moon, normal, 8, .4), during, 'Reversed progress returns to the same angular offset');
  for (let time = 0; time < moon.period; time += .1) {
    const pose = samplePigmentSubject(moon, normal, time, 0);
    assert(Math.abs(Math.hypot(pose.x, pose.y, pose.z) - 1) < 1e-12);
    assert.equal(pose.y, normal[1]);
  }
});

test('cropped orbital subjects seed their complete route instead of rotating all visible grains out of view', () => {
  const seeds = createPigmentSeeds(4, false, 2000);
  const angles = new Set();
  for (let i = 0; i < seeds.count; i++) if (seeds.loop[i * 4] === 1) {
    const angle = Math.atan2(seeds.normal[i * 3 + 1], seeds.normal[i * 3]);
    angles.add(Math.floor((angle + Math.PI) / (Math.PI * 2) * 8));
  }
  assert.equal(angles.size, 8);
});

test('sphere seeds include front and back hemispheres for a fully populated, endless rotation', () => {
  const seeds = createPigmentSeeds(1, true, 600);
  let front = 0, back = 0;
  for (let i = 0; i < seeds.count; i++) {
    assert(Math.abs(Math.hypot(...seeds.normal.slice(i * 3, i * 3 + 3)) - 1) < 1e-6);
    if (seeds.normal[i * 3 + 2] > 0) front++; else back++;
  }
  assert(front > 200 && back > 200);
});

test('all painted motifs have bounded, deterministic seeds in their native portrait and landscape composition', () => {
  for (const portrait of [false, true]) for (let scene = 0; scene < 6; scene++) {
    const seeds = createPigmentSeeds(scene, portrait, 200);
    assert.equal(seeds.count, 200);
    assert.deepEqual(seeds, createPigmentSeeds(scene, portrait, 200));
    assert([...seeds.position].every(value => value >= 0 && value <= 1));
    assert([...seeds.seed].every(value => value >= 0 && value <= 1));
    assert.notDeepEqual(seeds.position, createPigmentSeeds(scene, !portrait, 200).position);
  }
});

test('GPU geometry fits a two-draw fixed budget without per-particle scene objects', () => {
  for (const count of [PIGMENT_DESKTOP_COUNT, PIGMENT_COMPACT_COUNT]) {
    const geometry = buildLivingPigmentGeometry(1, count === PIGMENT_COMPACT_COUNT, count);
    assert.equal(geometry.instanceCount, count);
    assert.equal(geometry.getAttribute('position').count, 4);
    assert.equal(geometry.index.count, 6);
    assert.equal(geometry.getAttribute('aPaintingUv').count, count);
    assert.equal(geometry.getAttribute('aNormal').count, count);
    assert.equal(geometry.getAttribute('aRadius').count, count);
    assert.equal(geometry.getAttribute('aLoop').count, count);
    assert(count * 2 < 11000);
    geometry.dispose();
  }
});

test('native scrolling resolves the same progress in either direction without changing particle paths', () => {
  const transition = { active: false };
  const forward = resolvePigmentPassage('fall-light', { scenePosition: 1.4, direction: 1 }, transition);
  const backward = resolvePigmentPassage('fall-light', { scenePosition: 1.4, direction: -1 }, transition);
  assert.deepEqual(forward, backward);
  assert.deepEqual(forward.map(layer => layer.sceneIndex), [1, 2]);
  assert.equal(forward[0].travel + forward[1].travel, 1);
  const seed = [.3, .4, .6, .8];
  const original = samplePigmentFlourish(seed, forward[0].travel, 2);
  const reverse = samplePigmentFlourish(seed, backward[0].travel, 2);
  assert.deepEqual(original, reverse);
  for (let t = .01; t < 1; t += .01) {
    const before = samplePigmentFlourish(seed, t, 0), after = samplePigmentFlourish(seed, t + .001, 0);
    assert(Math.hypot(after.x - before.x, after.y - before.y) < 1, 'No discontinuities or integer scene jumps');
  }
});

test('chapter and theme dissolves retain their actual from/to identities rather than the already-committed scroll destination', () => {
  const layers = resolvePigmentPassage('winter-light', { scenePosition: 6 }, { active: true,
    fromTheme: 'spring', toTheme: 'winter-light', sceneIndex: 0, targetSceneIndex: 5, progress: .37 });
  assert.deepEqual(layers.map(layer => [layer.sceneIndex, layer.theme]), [[0, 'spring'], [5, 'winter-light']]);
  assert.equal(layers[0].progress, .37);
  assert.equal(layers[1].travel, .63);
  assert.deepEqual(resolvePigmentPassage('default', {}, { active: true, fromTheme: 'boot' }), []);
});

test('the gate preview and its committed handoff share progress, while a cancelled hold returns Home', () => {
  const motion = { scenePosition: 0 };
  const preview = resolvePigmentPassage('spring', motion, { active: false }, { theme: 'spring', dissolving: true, angle: 180 });
  const chapter = resolvePigmentPassage('spring', motion, { active: true,
    fromTheme: 'spring', toTheme: 'spring', sceneIndex: 0, targetSceneIndex: 1, progress: .58 });
  assert.deepEqual(preview, chapter);
  assert.equal(resolvePigmentPassage('spring', motion, { active: false }, { theme: 'spring', dissolving: false, angle: 90 }).length, 1);
  assert.equal(resolvePigmentPassage('spring', motion, { active: false }, { theme: 'spring', dissolving: false, angle: 0 })[0].sceneIndex, 0);
});

test('tabs sharing the same painting never rebuild or scatter the background motif', () => {
  const layers = resolvePigmentPassage('fall', { scenePosition: 4 }, { active: true,
    fromTheme: 'fall', toTheme: 'fall', sceneIndex: 3, targetSceneIndex: 3, progress: .5 });
  assert.equal(layers.length, 1);
  assert.equal(layers[0].transitioning, false);
  assert.equal(layers[0].travel, 0);
});

test('quiet zones merge overlapping copy, clamp to the viewport, and preserve all overflow text in a bounded uniform budget', () => {
  const rects = [{ left: 0, top: 0, width: 50, height: 20 }, { left: 35, top: 10, width: 45, height: 30 },
    { left: -50, top: 10, width: 10, height: 10 }];
  assert.deepEqual(pigmentQuietRects(rects, 400, 800), [{ left: 0, top: 0, right: 86, bottom: 46 }]);
  const many = Array.from({ length: 60 }, (_, i) => ({ left: i % 10 * 35, top: Math.floor(i / 10) * 60, width: 8, height: 8 }));
  const quiet = pigmentQuietRects(many, 400, 800);
  assert(quiet.length <= MAX_PIGMENT_QUIET_RECTS);
  assert(many.every(rect => quiet.some(box => box.left <= rect.left && box.top <= rect.top && box.right >= rect.left + rect.width && box.bottom >= rect.top + rect.height)));
});
