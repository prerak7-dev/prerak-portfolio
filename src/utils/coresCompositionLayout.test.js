import test from 'node:test';
import assert from 'node:assert/strict';
import { getSceneCoverProjection } from '../data/cinematicViewport.js';
import { CORE_SUN_CROWNS, getCoresCompositionLayout } from './coresCompositionLayout.js';

test('each core follows its painted sun crown in both compositions', () => {
  for (const portrait of [false, true]) {
    const [width, height] = portrait ? [768, 1024] : [1440, 900];
    const projection = getSceneCoverProjection(width, height, portrait ? .5 : 16 / 9);
    const layout = getCoresCompositionLayout(projection, width, height, { portrait, contentTop: 150 });
    layout.anchors.forEach((anchor, index) => {
      const point = CORE_SUN_CROWNS[portrait ? 'portrait' : 'landscape'][index];
      assert(Math.abs(anchor.left + anchor.width / 2 - projection.left - point.x * projection.width) < .001);
      assert(anchor.top + anchor.height / 2 < projection.top + point.y * projection.height);
    });
    const moved = getCoresCompositionLayout({ ...projection, left: projection.left + 8, top: projection.top + 3 }, width, height, { portrait, contentTop: 150 });
    moved.anchors.forEach((anchor, index) => {
      assert(Math.abs(anchor.left - layout.anchors[index].left - 8) < .001);
      assert(Math.abs(anchor.top - layout.anchors[index].top - 3) < .001);
    });
  }
});

test('titles, reading sky and controls stay separate on phones, tablets and desktop', () => {
  for (const [width, height] of [[320, 568], [390, 844], [768, 1024], [844, 390], [568, 320], [1440, 900]]) {
    const portrait = width < height;
    const projection = getSceneCoverProjection(width, height, portrait ? .5 : 16 / 9);
    const contentTop = portrait ? width < 700 ? height <= 680 ? 196 : 208 : 154 : height <= 500 ? 74 : 104;
    const layout = getCoresCompositionLayout(projection, width, height, { portrait, contentTop });
    for (const [index, anchor] of layout.anchors.entries()) {
      assert(anchor.height >= 44 && anchor.left >= 0 && anchor.left + anchor.width <= width);
      assert(anchor.top >= contentTop && anchor.top + anchor.height < layout.footer.top);
      assert(layout.detail.top + layout.detail.height <= anchor.top + .001);
      for (const other of layout.anchors.slice(index + 1)) assert(anchor.left + anchor.width <= other.left);
    }
    if (portrait) assert(layout.detail.top >= layout.heading.top + layout.heading.height);
    else assert(layout.detail.left >= layout.heading.left + layout.heading.width);
    assert(layout.detail.width >= 150 && layout.detail.height >= 44);
  }
});
