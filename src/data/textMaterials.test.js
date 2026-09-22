import test from 'node:test';
import assert from 'node:assert/strict';
import { APPEARANCE_IDS } from './themeAppearance.js';
import { TEXT_MATERIALS } from './textMaterials.js';

test('every appearance has a distinct, complete text material', () => {
  assert.deepEqual(Object.keys(TEXT_MATERIALS).sort(), [...APPEARANCE_IDS].sort());
  assert.equal(new Set(Object.values(TEXT_MATERIALS).map(material => material.face)).size, 8);
  for (const material of Object.values(TEXT_MATERIALS)) {
    for (const token of ['face', 'fold', 'edge', 'ink', 'accent', 'light', 'shade', 'halo']) {
      assert.match(material[token], /^#[\da-f]{6}$/i, `${material.name}: ${token}`);
    }
    assert.match(material.grain, /^\d+px$/);
    assert.match(material.angle, /^\d+deg$/);
  }
});

test('reading ink keeps high contrast against its material halo', () => {
  const luminance = color => {
    const channels = color.slice(1).match(/../g).map(hex => parseInt(hex, 16) / 255)
      .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  for (const material of Object.values(TEXT_MATERIALS)) {
    const [low, high] = [luminance(material.ink), luminance(material.halo)].sort((a, b) => a - b);
    assert((high + .05) / (low + .05) >= 7, material.name);
  }
});
