import test from 'node:test';
import assert from 'node:assert/strict';
import { createPaintedMotionClock, paintedMotionSample } from './paintedMotionClock.js';

test('painted loops advance indefinitely at rest without restarting on chapter or theme changes', () => {
  const clock = createPaintedMotionClock();
  let pose;
  for (let frame = 0; frame < 12000; frame++) pose = clock.advance(1 / 60, { key: `chapter-${Math.floor(frame / 900)}`, position: 0 });
  assert(Math.abs(pose.time - 200) < .00001);
  assert.equal(pose.speed, 1);
});

test('forward and reversed navigation ease the loop speed without reversing or snapping the pose', () => {
  const clock = createPaintedMotionClock();
  let last = clock.advance(0, { key: 'scroll', position: 0 });
  for (let frame = 1; frame <= 600; frame++) {
    const position = frame < 120 ? frame / 60 : frame < 240 ? 4 - frame / 60 : 0;
    const next = clock.advance(1 / 60, { key: 'scroll', position });
    assert(next.time > last.time);
    assert(next.speed >= .4 && next.speed <= 1.6);
    assert(Math.abs(next.speed - last.speed) < .04);
    last = next;
  }
  assert(Math.abs(last.speed - 1) < .001);
});

test('ending a dissolve retains its accumulated pose and eases back to reading speed', () => {
  const clock = createPaintedMotionClock();
  let last;
  for (let frame = 0; frame <= 60; frame++) last = clock.advance(1 / 60, { key: 'passage:1', position: frame / 60 });
  const next = clock.advance(1 / 60, { key: 'scroll', position: 6 });
  assert(next.time > last.time && next.time - last.time < .03);
  assert(Math.abs(next.speed - last.speed) < .01);
  assert(next.speed > 1, 'Carry momentum through the handoff rather than reset it');
});

test('painted motion is cadence independent and does not jump after a suspended frame', () => {
  const samples = [30, 60, 120].map(hz => {
    const clock = createPaintedMotionClock();
    clock.advance(0, { key: 'scroll', position: 0 });
    let pose;
    for (let frame = 1; frame <= hz * 4; frame++) pose = clock.advance(1 / hz, { key: 'scroll', position: frame / hz });
    const resumed = clock.advance(0, { key: 'scroll', position: 10 });
    assert.deepEqual(resumed, pose);
    return pose;
  });
  for (const pose of samples) assert(Math.abs(pose.time - samples[0].time) < .00001);
});

test('chapter and seal samples respond to direction without treating a theme commit as a scroll jump', () => {
  const motion = { scenePosition: 0 };
  assert.deepEqual(paintedMotionSample(motion, { active: true, kind: 'chapter', token: 2, sceneIndex: 4, targetSceneIndex: 1, progress: .5 }),
    { key: 'passage:2', position: -.5 });
  assert.equal(paintedMotionSample(motion, { active: true, kind: 'theme', token: 3, sceneIndex: 4, progress: .5 }).position, 0);
  assert.equal(paintedMotionSample(motion, {}, { dissolving: true, angle: 90 }).key, 'seal');
  assert.deepEqual(paintedMotionSample({ scenePosition: 3.4 }, {}, null), { key: 'scroll', position: 3.4 });
});
