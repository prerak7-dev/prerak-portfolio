import test from 'node:test';
import assert from 'node:assert/strict';
import { getChapterRailCapacity, scrollRailAlongCurve } from './chapterRailScroll.js';

const slots = [{ x: 500, y: 90 }, { x: 535, y: 150 }, { x: 590, y: 210 }, { x: 665, y: 270 }];
const sizes = Array.from({ length: 7 }, () => ({ width: 140, height: 44 }));

test('landscape adapts capacity without changing desktop geometry or packing every tab into a side strip', () => {
  assert.equal(getChapterRailCapacity(900, 7, false), 7);
  assert.equal(getChapterRailCapacity(390, 7, true), 4);
  assert.equal(getChapterRailCapacity(320, 7, true), 2);
  assert.equal(getChapterRailCapacity(768, 7, true), 7);
});

test('continuous scroll samples the shared contour without integer tab jumps', () => {
  for (let offset = 0; offset < 3; offset += .005) {
    const before = scrollRailAlongCurve(slots, sizes, offset);
    const after = scrollRailAlongCurve(slots, sizes, offset + .005);
    before.forEach((point, index) => {
      const distance = Math.hypot(point.x - after[index].x, point.y - after[index].y);
      assert(distance > .2 && distance < .6);
      assert.equal(point.width, 140);
    });
  }
  const start = scrollRailAlongCurve(slots, sizes, 0);
  const end = scrollRailAlongCurve(slots, sizes, 3);
  slots.forEach((point, index) => {
    assert.deepEqual({ x: start[index].x, y: start[index].y }, point);
    assert.deepEqual({ x: end[index + 3].x, y: end[index + 3].y }, point);
  });
});

test('curve tangents stay continuous across both ends and every tab boundary', () => {
  const delta = .0001;
  for (const offset of [0, 1, 2, 3]) {
    const a = scrollRailAlongCurve(slots, sizes, offset - delta);
    const b = scrollRailAlongCurve(slots, sizes, offset);
    const c = scrollRailAlongCurve(slots, sizes, offset + delta);
    b.forEach((point, index) => {
      assert(Math.hypot((point.x - a[index].x) - (c[index].x - point.x), (point.y - a[index].y) - (c[index].y - point.y)) < .000001);
    });
  }
});
