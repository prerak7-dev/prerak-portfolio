import test from 'node:test';
import assert from 'node:assert/strict';
import { sampleMotionHistory, sampleTracerPoint } from './tracerMotion.js';

const points = Array.from({ length: 100 }, (_, index) => ({ x: index / 99, y: (index / 99) ** 2 }));

test('sub-point tracer motion advances on every frame, not every third geometry point', () => {
  let previous;
  for (let frame = 0; frame < 120; frame++) {
    const trail = sampleMotionHistory(points, .4 + frame / 120 * .03, .18, 24);
    const head = trail.at(-1);
    if (previous) {
      assert(head.x > previous.x);
      assert(Math.hypot(head.x - previous.x, head.y - previous.y) < .001);
    }
    previous = head;
  }
});

test('trails fold continuously through both turnarounds without switching sides', () => {
  for (const turn of [0, 1, 2]) {
    const before = sampleMotionHistory(points, turn - .00001, .18, 24);
    const after = sampleMotionHistory(points, turn + .00001, .18, 24);
    assert.equal(before.length, after.length);
    before.forEach((point, index) => assert(Math.hypot(point.x - after[index].x, point.y - after[index].y) < .0001));
  }
});

test('avatar contours interpolate smoothly across their closed boundary', () => {
  const square = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
  assert.deepEqual(sampleTracerPoint(square, 3.5, true), { x: 0, y: .5 });
  assert.deepEqual(sampleTracerPoint(square, -.5, true), { x: 0, y: .5 });
  assert.deepEqual(sampleTracerPoint(square, 4, true), square[0]);
  assert.deepEqual(sampleTracerPoint(square, 100), square[3]);
});
