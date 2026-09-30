import test from 'node:test';
import assert from 'node:assert/strict';
import { TEXT_MATERIALS } from '../data/textMaterials.js';
import { chooseReadableInk, contrastingInk, inkContrast, inkLuminance, inkRgb, sampleInkField, stabilizeInkWash, washOpacity } from './adaptiveInk.js';

test('seasonal ink and its localized wash keep at least 4.5:1 sampled contrast', () => {
  for (const [theme, palette] of Object.entries(TEXT_MATERIALS)) {
    const season = theme.replace('-light', '');
    const opposite = TEXT_MATERIALS[theme.endsWith('-light') ? season : `${season}-light`];
    for (const material of ['ink', 'face', 'accent']) {
      const samples = Array.from({ length: 32 }, (_, i) => [i * 8, i * 8, i * 8]);
      const choice = chooseReadableInk(samples, inkRgb(palette[material]), inkRgb(opposite[material]),
        inkRgb(TEXT_MATERIALS[`${season}-light`].halo), inkRgb(TEXT_MATERIALS[season].halo));
      for (const sample of samples) {
        const background = sample.map((channel, i) => Math.round(channel * (1 - choice.opacity) + choice.paper[i] * choice.opacity));
        assert(inkContrast(inkLuminance(choice.ink), inkLuminance(background)) >= 4.5, `${theme} ${material}`);
      }
    }
  }
});

test('readable authored colors stay unchanged without an unnecessary wash', () => {
  const preferred = inkRgb('#fcfaf2');
  const opposite = inkRgb('#27333b');
  assert.deepEqual(contrastingInk(0, preferred, opposite), preferred);
  const choice = chooseReadableInk([[8, 8, 8]], preferred, opposite, [244, 244, 239], [8, 11, 16]);
  assert.deepEqual(choice.ink, preferred);
  assert.equal(choice.opacity, 0);
});

test('sampling follows cover cropping and clamps outside image bounds', () => {
  const field = { width: 2, height: 1, pixels: new Uint8ClampedArray([0, 0, 0, 255, 255, 255, 255, 255]) };
  const projection = { left: -100, top: -50, width: 400, height: 200 };
  assert.deepEqual(sampleInkField(field, projection, 0, 0), [0, 0, 0]);
  assert.deepEqual(sampleInkField(field, projection, 200, 0), [255, 255, 255]);
  assert.deepEqual(sampleInkField(field, projection, 500, 500), [255, 255, 255]);
});

test('minor backdrop fluctuations retain the same wash without losing contrast', () => {
  let opacity = stabilizeInkWash(.4);
  const initial = opacity;
  for (const required of [.41, .39, .42, .4, .38, .41]) {
    opacity = stabilizeInkWash(required, opacity);
    assert.equal(opacity, initial);
    assert(opacity >= required);
  }
  assert(stabilizeInkWash(.7, opacity) >= .7);
  assert.equal(stabilizeInkWash(0, opacity), 0);
});

test('a retained pigment stays readable when it moves to the opposite backdrop', () => {
  for (const [theme, palette] of Object.entries(TEXT_MATERIALS)) {
    const season = theme.replace('-light', '');
    const opposite = TEXT_MATERIALS[theme.endsWith('-light') ? season : `${season}-light`];
    for (const initial of [0, 255]) {
      const choice = chooseReadableInk([[initial, initial, initial]], inkRgb(palette.face), inkRgb(opposite.face),
        inkRgb(TEXT_MATERIALS[`${season}-light`].halo), inkRgb(TEXT_MATERIALS[season].halo));
      let previous;
      for (const gray of [255 - initial, 128, initial, 90, 180]) {
        const sample = [gray, gray, gray];
        previous = stabilizeInkWash(washOpacity([sample], choice.ink, choice.paper), previous);
        const background = sample.map((channel, i) => Math.round(channel * (1 - previous) + choice.paper[i] * previous));
        assert(inkContrast(inkLuminance(choice.ink), inkLuminance(background)) >= 4.5, theme);
      }
    }
  }
});
