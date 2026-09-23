import test from 'node:test';
import assert from 'node:assert/strict';
import { getSwarmScenePalette, getSwarmScenePaletteBlend } from './swarmScenePalettes.js';

function luminance(rgb) {
  const linear = rgb.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);

test('all tracer appearances retain contrasting cores and an opposite-tone outline', () => {
  for (const season of ['default', 'fall', 'spring', 'winter']) {
    for (const light of [false, true]) {
      const theme = `${season}${light ? '-light' : ''}`;
      for (let scene = 0; scene < 6; scene++) {
        for (const variant of ['tabs', 'rail', 'wayfinder']) {
          const palette = getSwarmScenePalette(theme, scene, variant);
          assert.equal(palette.compositeOperation, 'source-over');
          for (const color of palette.colors) {
            assert(contrast(color, light ? [240,238,230] : [25,25,25]) > 4.5, `${theme}:${scene}:${color}`);
            assert(contrast(color, palette.underlay) > 6);
          }
          assert.equal(getSwarmScenePaletteBlend(theme, scene, variant).opacityScale, palette.opacityScale);
        }
      }
    }
    assert.notDeepEqual(getSwarmScenePalette(season, 0, 'tabs').colors, getSwarmScenePalette(`${season}-light`, 0, 'tabs').colors);
  }
});
