import test from 'node:test';
import assert from 'node:assert/strict';
import { fitScrollableRail, getChapterRailCapacity, getRailEdgeReveal, scrollRailAlongCurve } from './chapterRailScroll.js';
import { railItemsOverlap } from './chapterRailLayout.js';

const slots = [{ x: 500, y: 90 }, { x: 535, y: 150 }, { x: 590, y: 210 }, { x: 665, y: 270 }];
const sizes = Array.from({ length: 7 }, () => ({ width: 140, height: 44 }));

test('scrollable routes keep their curvature with only two visible tabs', () => {
  const samples = Array.from({ length: 33 }, (_, i) => ({ x: 400 + (i / 32) ** 2 * 160, y: 80 + i / 32 * 200 }));
  for (const [width, height, count] of [[568, 320, 2], [844, 390, 4]]) {
    const bounds = { left: 16, right: width - 16, top: 82, bottom: height - 96 };
    const at = offset => fitScrollableRail(samples, sizes, count, offset, bounds, 'y');
    const start = at(0);
    const end = start[count - 1];
    const midpoint = at((count - 1) / 2)[count - 1];
    assert(Math.abs(midpoint.x - (start[0].x + end.x) / 2) > 10, 'Two-slot route lost its authored bend');
    for (let offset = 0; offset <= 7 - count; offset += .05) {
      const points = at(offset);
      const visible = points.filter((_, index) => index - offset >= 0 && index - offset <= count - 1);
      visible.forEach((point, index) => {
        assert(point.x >= bounds.left - .01 && point.x + point.width <= bounds.right + .01);
        assert(point.y >= bounds.top - .01 && point.y + point.height <= bounds.bottom + .01);
        visible.slice(index + 1).forEach(other => assert(!railItemsOverlap(point, other, 5.9)));
      });
      const next = at(offset + .001);
      points.forEach((point, index) => assert(Math.hypot(point.x - next[index].x, point.y - next[index].y) < 1));
    }
  }
});

test('rail edge reveal dissolves whole tabs continuously outside the visible window', () => {
  for (const count of [2, 4]) {
    assert.equal(getRailEdgeReveal(-1, count), 0);
    assert.equal(getRailEdgeReveal(count, count), 0);
    for (let index = 0; index < count; index++) assert.equal(getRailEdgeReveal(index, count), 1);
    for (let p = 0; p <= .65; p += .01) {
      assert(Math.abs(getRailEdgeReveal(-p, count) - getRailEdgeReveal(count - 1 + p, count)) < 1e-10);
      assert(Math.abs(getRailEdgeReveal(-p, count) - getRailEdgeReveal(-p - .001, count)) < .002);
    }
  }
});

test('landscape adapts capacity without changing desktop geometry or packing every tab into a side strip', () => {
  assert.equal(getChapterRailCapacity(900, 7, false), 7);
  assert.equal(getChapterRailCapacity(390, 7, true), 4);
  assert.equal(getChapterRailCapacity(320, 7, true), 2);
  assert.equal(getChapterRailCapacity(768, 7, true), 7);
  assert.equal(getChapterRailCapacity(480, 7, true, 800), 5);
  assert.equal(getChapterRailCapacity(450, 7, true, 600), 3);
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
