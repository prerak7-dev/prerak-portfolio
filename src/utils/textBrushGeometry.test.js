import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeBrushLines } from './textBrushGeometry.js';

const rect = (left, top, width, height) => ({ left, top, width, height, right: left + width, bottom: top + height });

test('brushes join inline text and emphasized words on the same line', () => {
  assert.deepEqual(mergeBrushLines([rect(10, 20, 80, 24), rect(90, 18, 60, 28), rect(150, 20, 40, 24)]), [rect(10, 18, 180, 28)]);
});

test('wrapped paragraphs get separate strokes, not a rectangular panel', () => {
  assert.deepEqual(mergeBrushLines([rect(20, 80, 130, 24), rect(20, 20, 300, 24), rect(20, 50, 260, 24)]),
    [rect(20, 20, 300, 24), rect(20, 50, 260, 24), rect(20, 80, 130, 24)]);
});

test('duplicate range boxes and empty text do not produce extra paint', () => {
  assert.deepEqual(mergeBrushLines([rect(20, 20, 300, 24), rect(20, 20, 300, 24), rect(320, 20, 0, 24)]), [rect(20, 20, 300, 24)]);
});

test('measuring a brush never mutates source rectangles', () => {
  const original = Object.freeze(rect(10, 10, 100, 24));
  assert.equal(mergeBrushLines([original, rect(110, 10, 60, 24)])[0].width, 160);
  assert.equal(original.width, 100);
});
