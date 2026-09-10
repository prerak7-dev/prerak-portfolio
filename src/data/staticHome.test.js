import test from 'node:test';
import assert from 'node:assert/strict';
import { getCinematicSceneReveals } from './cinematicSceneTimeline.js';
import { getGatewayFrameAsset, getCriticalPreloadManifest, getCinematicGeometryAsset } from './cinematicAssets.js';
import { APPEARANCE_IDS } from './themeAppearance.js';

test('Home holds one painting while its dissolve progresses continuously', () => {
  let previous = 0;
  for (let i = 0; i <= 100; i++) {
    const state = getCinematicSceneReveals(i / 100);
    assert.equal(state.gatewayProgress, 0);
    assert.ok(state.coresMix >= previous);
    previous = state.coresMix;
  }
  assert.equal(previous, 1);
  assert.equal(getCinematicSceneReveals(0.28).coresMix, 0);
});

test('all themes load only the closed Home painting and its contour map', () => {
  for (const theme of APPEARANCE_IDS) {
    assert.equal(getGatewayFrameAsset(theme, 23), getGatewayFrameAsset(theme, 0));
    assert.equal(getCinematicGeometryAsset(theme, 0, 23), getCinematicGeometryAsset(theme, 0, 0));
    const frames = getCriticalPreloadManifest(theme).filter(item => /\/home\.webp$/.test(item.filename));
    assert.ok(frames.length > 0);
    assert.ok(frames.every(item => item.filename.includes('painted-v1/')));
  }
});
