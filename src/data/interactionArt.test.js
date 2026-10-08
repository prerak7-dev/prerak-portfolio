import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { GATE_SEAL_ART, INK_BRUSH_ART, INK_BRUSH_LANES, SEASONAL_SWIRL_ART, SEASONAL_SWIRL_SEASONS, SEASONAL_SWIRL_ELEMENTS } from './interactionArt.js';
import { getCriticalPreloadManifest } from './cinematicAssets.js';

test('generated drafts retain provenance without being loaded by the seasonal swarm', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../scripts/cinematic-source/generated-interaction-art.json', import.meta.url)));
  for (const [entry, asset] of [[manifest.seal, GATE_SEAL_ART], [manifest.brushes, INK_BRUSH_ART]]) {
    assert(existsSync(new URL('../../public/' + asset, import.meta.url)));
    assert(existsSync(new URL('../../scripts/cinematic-source/' + entry.source, import.meta.url)));
    assert(entry.prompt.length > 500);
  }
  const preload = getCriticalPreloadManifest('winter-light', { portrait: true });
  assert(!preload.some(item => item.filename === INK_BRUSH_ART));
  assert(!preload.some(item => item.filename === GATE_SEAL_ART), 'The seal comes directly from the Home painting, not the rejected generated draft');
  assert.equal(INK_BRUSH_LANES, manifest.brushes.atlas.lanes);
});

test('the active seasonal sprite sheet preserves its generated master, prompt, and row mapping', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../scripts/cinematic-source/seasonal-swirl-art-v1.json', import.meta.url)));
  assert(existsSync(new URL('../../public/' + SEASONAL_SWIRL_ART, import.meta.url)));
  assert(existsSync(new URL('../../scripts/cinematic-source/' + manifest.source, import.meta.url)));
  assert(manifest.prompt.length > 1000 && manifest.generator === 'Built-in image_gen');
  assert.deepEqual(manifest.atlas.seasons, SEASONAL_SWIRL_SEASONS);
  assert.deepEqual(manifest.atlas.elements, SEASONAL_SWIRL_ELEMENTS);
  assert(getCriticalPreloadManifest('spring-light', { portrait: true }).some(item => item.filename === SEASONAL_SWIRL_ART && item.decode));
});
