import test from 'node:test';
import assert from 'node:assert/strict';
import { getPaintedSubjects, MAX_PAINTED_SUBJECTS } from '../data/paintedSubjects.js';
import { samplePaintedScene, samplePaintedSubject } from './paintedSubjectMotion.js';

test('all native landscape and portrait paintings have bounded subject choreography', () => {
  for (const portrait of [false, true]) for (let scene = 0; scene < 6; scene++) {
    const subjects = getPaintedSubjects(scene, portrait);
    assert(subjects.length > 0 && subjects.length <= MAX_PAINTED_SUBJECTS);
    for (const subject of subjects) {
      assert(subject.region[2] > 0 && subject.region[3] > 0 && subject.period >= 3);
      const point = [Math.min(.95, Math.max(.05, subject.region[0] - subject.region[2] * .35)), Math.min(.95, Math.max(.05, subject.region[1]))];
      const first = samplePaintedSubject(subject, point, 2);
      const second = samplePaintedSubject(subject, point, 7);
      assert(Math.hypot(first.x - second.x, first.y - second.y) > .00001, `${scene}: ${subject.name}`);
    }
  }
});

test('the Home cloak moves while its head, shoulder seam, boots and cliff stay pinned', () => {
  for (const [portrait, pins] of [[false, [[.094, .412], [.097, .44], [.097, .498], [.080, .52]]],
    [true, [[.135, .461], [.14, .48], [.129, .52], [.105, .54]]]]) {
    const cloak = getPaintedSubjects(0, portrait)[0];
    for (const point of pins) for (const time of [0, 1, 4, 10]) {
      const pose = samplePaintedSubject(cloak, point, time);
      assert.equal(pose.x, 0); assert.equal(pose.y, 0);
      assert.deepEqual(samplePaintedScene(0, portrait, point, time).uv, point);
    }
    const tail = [cloak.region[0] - cloak.region[2] * .4, cloak.region[1]];
    assert(Math.hypot(samplePaintedSubject(cloak, tail, 1).x, samplePaintedSubject(cloak, tail, 1).y) > .001);
  }
});

test('complete painted moons turn in the paper plane and cropped subjects rock without sampling missing artwork', () => {
  const moon = getPaintedSubjects(3)[1];
  const point = [moon.region[0] + moon.region[2] * .5, moon.region[1]];
  const turn = samplePaintedSubject(moon, point, moon.period / 4);
  assert(Math.abs(turn.x + moon.region[2] * .5) < .000001);
  assert(Math.abs(turn.y + moon.region[3] * .5) < .000001);
  for (const portrait of [false, true]) for (let scene = 0; scene < 6; scene++) {
    for (const point of [[0, 0], [1, 1], [.02, .5], [.99, .5], [.6, .5]]) {
      const pose = samplePaintedScene(scene, portrait, point, 123, .7);
      assert(pose.uv.every(value => value >= 0 && value <= 1));
    }
  }
});

test('native scenery outside animated subjects remains untouched and entrance is continuous', () => {
  const point = [.5, .2];
  assert.deepEqual(samplePaintedScene(0, false, point, 30).uv, point);
  const cloak = getPaintedSubjects(0)[0];
  const tail = [cloak.region[0] - .01, cloak.region[1]];
  assert.deepEqual(samplePaintedScene(0, false, tail, 30, 0, 0).uv, tail);
  const before = samplePaintedScene(0, false, tail, 30);
  const after = samplePaintedScene(0, false, tail, 30 + 1 / 60);
  assert(Math.hypot(after.uv[0] - before.uv[0], after.uv[1] - before.uv[1]) < .001);
});

test('feathered moon edges turn rigidly without pinching or accumulating a spiral', () => {
  const moon = getPaintedSubjects(3)[1];
  const point = [moon.region[0] + moon.region[2] * .9, moon.region[1]];
  const half = samplePaintedSubject(moon, point, moon.period / 2);
  assert(half.weight > 0 && half.weight < 1);
  assert(Math.abs(half.x + moon.region[2] * 1.8) < 1e-8);
  const full = samplePaintedSubject(moon, point, moon.period);
  assert(Math.hypot(full.x, full.y) < 1e-8);
});
