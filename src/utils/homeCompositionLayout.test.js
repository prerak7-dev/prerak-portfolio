import test from 'node:test';
import assert from 'node:assert/strict';
import { getHomeCompositionLayout } from './homeCompositionLayout.js';
import { getContourContentBounds } from './contourContentLayout.js';

test('Home reading areas stay below the header and hold three role lines', () => {
  for (const [width, height] of [[320, 568], [390, 844], [768, 1024], [844, 390], [1101, 701], [1366, 768], [1440, 900], [2560, 1440]]) {
    const cover = Math.max(width, height * 1672 / 941);
    const projection = { left: (width - cover) / 2, top: (height - cover * 941 / 1672) / 2, width: cover, height: cover * 941 / 1672 };
    const header = width <= 1100 || height <= 700 ? 62 : 80;
    const layout = getHomeCompositionLayout(projection, width, height, header);
    assert(layout.sky.top >= header + 10);
    assert(layout.sky.left >= 0 && layout.sky.left + layout.sky.width <= width);
    assert(layout.roleSize * 3.36 <= layout.sky.height + 1);
    assert(layout.sky.top + layout.sky.height < height - 180);
  }
});

test('short landscape chapters reserve the theme and lore control dock', () => {
  const bounds = getContourContentBounds('projects', { left: 0, top: 0, width: 844, height: 475 }, 844, 390);
  assert.equal(bounds.top, 82);
  assert.equal(bounds.top + bounds.height, 292);
  assert(bounds.left + bounds.width <= 844 * .58);
});
