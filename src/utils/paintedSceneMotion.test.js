import test from 'node:test';
import assert from 'node:assert/strict';
import { createPaintedMotionGate, limitPaintedScenePosition } from './paintedSceneMotion.js';

test('forward and reverse travel stop before an unloaded painting instead of revealing an empty chapter', () => {
  assert.equal(limitPaintedScenePosition(2.4, 0, [true, true, true, false, true, true]), 2);
  assert.equal(limitPaintedScenePosition(0, 6, [true, true, true, false, false, true]), 6);
  assert.equal(limitPaintedScenePosition(4.5, 3, [true, true, true, true, false, true]), 4);
  assert.equal(limitPaintedScenePosition(3.9, 3.1, [true, true, true, true, false, true]), 3.9);
});

test('a late painting resumes gradually from the held pose and preserves reversibility', () => {
  const gate = createPaintedMotionGate(1);
  assert.equal(gate.update(2, [true, true, false, true, true, true], 16), 1);
  let previous = 1;
  for (let frame = 0; frame < 150; frame++) {
    const current = gate.update(2, [true, true, true, true, true, true], 16);
    assert(current >= previous && current - previous <= .0513);
    previous = current;
  }
  assert.equal(previous, 2);
  const reverse = gate.update(1, [true, false, true, true, true, true], 16);
  assert.equal(reverse, 2);
  assert(gate.update(1, [true, true, true, true, true, true], 16) < reverse);
});

test('already-loaded scrolling and explicit contour handoffs keep their original timing', () => {
  const gate = createPaintedMotionGate(0);
  const loaded = Array(6).fill(true);
  assert.equal(gate.update(.37, loaded, 16), .37);
  assert.equal(gate.update(.19, loaded, 16), .19);
  assert.equal(gate.update(6, Array(6).fill(false), 16, true), 6);
});

test('scroll cannot leave a painting whose outgoing contour is still loading', () => {
  const available = [true, false, true, true, true, true];
  assert.equal(limitPaintedScenePosition(2, 1, available), 1);
  assert.equal(limitPaintedScenePosition(0, 1, available), 1);
});
