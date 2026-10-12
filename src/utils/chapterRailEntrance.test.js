import test from 'node:test';
import assert from 'node:assert/strict';
import { createRailEntranceKeyframes } from './chapterRailEntrance.js';

test('the first navigation entrance follows an orbital arc and arrives without residual translation', () => {
  for (const compact of [false, true]) {
    const frames = createRailEntranceKeyframes(compact);
    const point = frame => frame.translate.split(' ').map(parseFloat);
    const [ax, ay] = point(frames[0]);
    const [bx, by] = point(frames[60]);
    assert.equal(frames.length, 121);
    assert.equal(frames[0].opacity, 0);
    assert.equal(frames.at(-1).translate, '0px 0px');
    assert.equal(frames.at(-1).opacity, 1);
    assert(Math.abs(ax * by - ay * bx) > (compact ? 80 : 500), 'The entry must arc, not slide in a straight line');
    for (let i = 1; i < frames.length; i++) {
      assert(frames[i].opacity >= frames[i - 1].opacity);
      const [x, y] = point(frames[i]);
      assert(Number.isFinite(x) && Number.isFinite(y));
      if (compact) assert(Math.abs(y) <= 18, 'The portrait orbit must fit its expanded entry clip');
    }
    for (const [a, b] of [[frames[0], frames[1]], [frames.at(-2), frames.at(-1)]]) {
      const p = point(a), q = point(b);
      assert(Math.hypot(p[0] - q[0], p[1] - q[1]) < .01, 'Departure and arrival must ease to rest');
    }
  }
});
