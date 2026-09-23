import test from 'node:test';
import assert from 'node:assert/strict';
import { claimTextMask, releaseTextMask } from './textMaskOwnership.js';

function element() {
  const values = new Map();
  return { style: {
    getPropertyValue: key => values.get(key)?.[0] || '',
    getPropertyPriority: key => values.get(key)?.[1] || '',
    setProperty: (key, value, priority = '') => values.set(key, [value, priority]),
    removeProperty: key => values.delete(key),
  } };
}

test('finishing an older theme cannot uncover an incoming chapter', () => {
  const node = element();
  node.style.setProperty('mask-image', 'original', 'important');
  claimTextMask(node, 'theme', 'theme-mask');
  claimTextMask(node, 'chapter', 'chapter-mask');
  releaseTextMask(node, 'theme');
  assert.equal(node.style.getPropertyValue('mask-image'), 'chapter-mask');
  releaseTextMask(node, 'chapter');
  assert.equal(node.style.getPropertyValue('mask-image'), 'original');
  assert.equal(node.style.getPropertyPriority('mask-image'), 'important');
});

test('finishing a chapter restores only a still-active underlying mask', () => {
  const node = element();
  claimTextMask(node, 'theme', 'theme-mask');
  claimTextMask(node, 'chapter', 'chapter-mask');
  releaseTextMask(node, 'chapter');
  assert.equal(node.style.getPropertyValue('mask-image'), 'theme-mask');
  releaseTextMask(node, 'theme');
  assert.equal(node.style.getPropertyValue('mask-image'), '');
});
