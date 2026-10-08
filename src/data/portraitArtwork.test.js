import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { APPEARANCE_IDS, paintedAsset } from './themeAppearance.js';
import { getCinematicAssets, getCinematicSceneAsset, getCinematicGeometryAsset, getCriticalPreloadManifest, getThemeWarmPreloadManifest, getThemeTransitionPreloadManifest } from './cinematicAssets.js';
import { getSceneCoverProjection, getSceneAspectRatio, PORTRAIT_ARTWORK_QUERY } from './cinematicViewport.js';
import { getTracerSceneField } from './tracerSceneFields.js';

const scenes = ['home', 'cores', 'systems', 'chronology', 'field', 'surface'];
const publicRoot = new URL('../../public/', import.meta.url);

test('all appearances have distinct portrait paintings and matching portrait geometry', () => {
  for (const theme of APPEARANCE_IDS) {
    scenes.forEach((scene, index) => {
      const options = { portrait: true };
      const image = getCinematicSceneAsset(theme, index, 0, options);
      const field = getCinematicGeometryAsset(theme, index, 0, options);
      assert.equal(image, paintedAsset(theme, scene, options));
      assert.equal(field, paintedAsset(theme, `geometry/${scene}`, options));
      assert.notEqual(image, getCinematicSceneAsset(theme, index, 0, { portrait: false }));
      assert.ok(existsSync(new URL(image, publicRoot)), image);
      assert.ok(existsSync(new URL(field, publicRoot)), field);
    });
    assert.equal(getCinematicAssets(theme, { portrait: true }).particles, getCinematicAssets(theme, { portrait: false }).particles);
  }
});

test('portrait preloads never pull in landscape chapter paintings', () => {
  for (const theme of APPEARANCE_IDS) {
    const options = { portrait: true, compact: true };
    const assets = [
      ...getCriticalPreloadManifest(theme, options),
      ...getThemeWarmPreloadManifest(theme, options),
      ...['intro', 'cores', 'projects', 'professional', 'education', 'personal', 'contact'].flatMap(chapter => getThemeTransitionPreloadManifest(theme, chapter, options)),
    ];
    for (const { filename } of assets.filter(asset => asset.filename.includes('/painted-v1/') && !asset.filename.includes('/painted-v1/ui/'))) {
      assert.ok(filename.includes('/portrait/'), filename);
    }
  }
});

test('portrait provenance covers every native tall composition with saved prompts', () => {
  const root = new URL('../../NewPortraitBackgrounds/', import.meta.url);
  const manifest = JSON.parse(readFileSync(new URL('generated-scenes.json', root), 'utf8'));
  assert.equal(manifest.assets.length, 48);
  assert.equal(new Set(manifest.assets.map(a => `${a.theme}/${a.mode}/${a.scene}`)).size, 48);
  for (const asset of manifest.assets) {
    assert.ok(asset.prompt && asset.source);
    assert.equal(asset.height / asset.width, 2);
    assert.equal(asset.original, `${asset.theme}-${asset.mode}-${asset.scene}.png`);
    assert.ok(existsSync(new URL(`cinematic/painted-v1/${asset.theme}/${asset.mode}/portrait/${asset.scene}.webp`, publicRoot)));
  }
});

test('portrait stage preserves aspect ratio and covers common phone viewports', () => {
  for (const [width, height] of [[320, 568], [390, 844], [430, 932], [768, 1024]]) {
    const projection = getSceneCoverProjection(width, height, getSceneAspectRatio(true));
    assert.equal(projection.width / projection.height, .5);
    assert.ok(projection.width >= width && projection.height >= height);
    assert.ok(Math.abs(projection.left + projection.width / 2 - width / 2) < .01);
  }
  assert.equal(getSceneAspectRatio(false), 16 / 9);
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
  assert.ok(html.includes(`<source media="${PORTRAIT_ARTWORK_QUERY}"`));
});

test('portrait dissolve landmarks have separate cache entries from landscape', () => {
  for (const theme of APPEARANCE_IDS) {
    for (let index = 0; index < 6; index++) {
      const landscape = getTracerSceneField(theme, index, { portrait: false });
      const portrait = getTracerSceneField(theme, index, { portrait: true });
      assert.notDeepEqual(portrait.source, landscape.source);
      assert.equal(portrait, getTracerSceneField(theme, index, { portrait: true }));
      assert.equal(landscape, getTracerSceneField(theme, index, { portrait: false }));
    }
  }
});
