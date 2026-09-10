import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { APPEARANCE_IDS, SEASONS, appearanceId, getSeason, hasPaintedScene, isLightAppearance, paintedAsset } from './themeAppearance.js';
import { getCinematicSceneAsset, getCinematicGeometryAsset } from './cinematicAssets.js';

const publicRoot = new URL('../../public/', import.meta.url);

test('season selection preserves the independent light or dark appearance', () => {
  assert.equal(APPEARANCE_IDS.length, 8);
  for (const theme of APPEARANCE_IDS) {
    assert.ok(SEASONS.includes(getSeason(theme)));
    assert.equal(appearanceId(theme, isLightAppearance(theme)), theme);
    for (const next of SEASONS) {
      assert.equal(getSeason(appearanceId(next, isLightAppearance(theme))), next);
    }
  }
});

test('all appearances have final Home art and alpha-preserving UI assets', () => {
  for (const theme of APPEARANCE_IDS) {
    for (const asset of ['home', 'avatar', 'satellite', 'geometry/home']) {
      const filename = paintedAsset(theme, asset);
      assert.ok(existsSync(new URL(filename, publicRoot)), filename);
    }
    assert.equal(getCinematicSceneAsset(theme, 0), paintedAsset(theme, 'home'));
  }
});

test('every light and dark chapter uses its authored painting and matching geometry field', () => {
  for (const theme of APPEARANCE_IDS) {
    ['home', 'cores', 'systems', 'chronology', 'field', 'surface'].forEach((scene, index) => {
      const image = getCinematicSceneAsset(theme, index);
      const geometry = getCinematicGeometryAsset(theme, index);
      assert.equal(image, paintedAsset(theme, scene));
      assert.equal(geometry, paintedAsset(theme, `geometry/${scene}`));
      assert.ok(existsSync(new URL(image, publicRoot)), image);
      assert.ok(existsSync(new URL(geometry, publicRoot)), geometry);
    });
  }
});

test('all generated paintings retain their generation prompts and source provenance', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../NewHomeBackgrounds/generated-scenes.json', import.meta.url), 'utf8'));
  assert.equal(manifest.assets.length, 20);
  assert.equal(new Set(manifest.assets.map(asset => `${asset.theme}/${asset.scene}`)).size, 20);
  assert.ok(manifest.assets.every(asset => asset.prompt && asset.source));
});

test('night scene publication tracks completed assets without exposing missing generations', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../NewHomeBackgrounds/generated-night-scenes.json', import.meta.url), 'utf8'));
  const generated = manifest.assets.filter(asset => asset.theme !== 'ui');
  assert.equal(generated.length, 20);
  assert.equal(new Set(generated.map(asset => `${asset.theme}/${asset.scene}`)).size, 20);
  assert.equal(manifest.pending.length, 0);
  for (const asset of generated) {
    assert.ok(hasPaintedScene(asset.theme, asset.scene));
    assert.ok(existsSync(new URL(paintedAsset(asset.theme, asset.scene), publicRoot)));
    assert.ok(existsSync(new URL(paintedAsset(asset.theme, `geometry/${asset.scene}`), publicRoot)));
  }
  for (const asset of manifest.pending) assert.equal(hasPaintedScene(asset.theme, asset.scene), false);
});

test('the loader uses the light Home painting and has no celestial decoration', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
  assert.ok(html.includes('cinematic/painted-v1/default/light/home.webp'));
  assert.ok(html.includes('filter: grayscale(1)'));
  assert.ok(html.includes('class="boot-paint-progress"'));
  assert.ok(!/boot-(astrolabe|celestial|orbit|masonry)/.test(html));
  assert.ok(existsSync(new URL('cinematic/painted-v1/ui/loader-brush.webp', publicRoot)));
});
