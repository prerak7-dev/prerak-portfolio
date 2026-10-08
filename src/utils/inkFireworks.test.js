import test from 'node:test';
import assert from 'node:assert/strict';
import { APPEARANCE_IDS } from '../data/themeAppearance.js';
import { createInkFireworkScore, INK_FIREWORK_DURATION_MS, inkRibbonOutline, sampleInkFirework } from './inkFireworks.js';
import { buildSeasonalSwirlGeometry, SWIRL_PATH_SAMPLES } from './inkFireworksRenderer.js';
import { createGateSealTurn, gateSealStoryProgress } from './gateSealMotion.js';
import { INK_FIREWORK_PALETTES, SEASONAL_PIGMENT_OVERRIDES } from '../data/inkFireworkPalettes.js';
import { TEXT_MATERIALS } from '../data/textMaterials.js';

test('every appearance has a deterministic, bounded ink firework score', () => {
  const palettes = new Set();
  for (const theme of APPEARANCE_IDS) {
    const score = createInkFireworkScore(1440, 900, theme);
    assert.deepEqual(score, createInkFireworkScore(1440, 900, theme));
    assert.equal(score.length, 3);
    palettes.add(JSON.stringify(score.map(burst => burst.launch.color)));
    for (const burst of score) {
      assert(burst.end <= INK_FIREWORK_DURATION_MS);
      assert(burst.strands.length <= 110, 'Detailed ink geometry has a fixed rendering budget');
      for (const stroke of [burst.launch, ...burst.strands]) {
        for (const point of stroke.points) {
          assert(point.x > 0 && point.x < 1440 && point.y > 0 && point.y < 900);
        }
      }
    }
  }
  assert.equal(palettes.size, 8, 'Light/dark inks and each seasonal palette stay distinct');
});

test('seasonal swirls use at most three pigments from their painting or established material palette', () => {
  for (const theme of APPEARANCE_IDS) {
    const { face, fold, accent } = TEXT_MATERIALS[theme];
    const expected = (SEASONAL_PIGMENT_OVERRIDES[theme] || [face, fold, accent]).map(hex => [1, 3, 5].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16)));
    assert.deepEqual(INK_FIREWORK_PALETTES[theme], expected);
    const points = Array.from({ length: 36 }, (_, index) => ({ x: .17 + index / 180, y: .28 + Math.sin(index / 12) * .025 }));
    const field = { streamlines: Array.from({ length: 18 }, () => ({ points })), projection: { left: 0, top: 0, width: 1440, height: 900 } };
    const score = createInkFireworkScore(1440, 900, theme, false, null, field);
    const pigments = new Set(score.flatMap(burst => [burst.launch, ...burst.strands]).map(stroke => JSON.stringify(stroke.color)));
    assert.equal(pigments.size, 3);
    assert([...pigments].every(color => expected.some(rgb => JSON.stringify(rgb) === color)));
  }
});

test('portrait and short-landscape bursts stay framed without chopping their tips', () => {
  for (const [width, height, portrait] of [[390, 844, true], [320, 568, true], [844, 390, false]]) {
    for (const burst of createInkFireworkScore(width, height, 'winter-light', portrait)) {
      for (const stroke of burst.strands) for (const point of stroke.points) {
        assert(point.x > 4 && point.x < width - 4 && point.y > 4 && point.y < height - 4);
      }
    }
  }
});

test('pigment launches and blooms within the seals three-second clock, holding its final ink for the dissolve', () => {
  assert.equal(INK_FIREWORK_DURATION_MS, 3000);
  const score = createInkFireworkScore(1440, 900);
  for (const burst of score) {
    const before = sampleInkFirework(burst, burst.delay - 1);
    assert.equal(before.launchOpacity, 0); assert.equal(before.opacity, 0);
    let previous = 0;
    for (let elapsed = 0; elapsed <= INK_FIREWORK_DURATION_MS; elapsed += 10) {
      const pose = sampleInkFirework(burst, elapsed);
      assert(pose.growth >= previous);
      for (const value of Object.values(pose)) assert(Number.isFinite(value) && value >= 0 && value <= 1);
      previous = pose.growth;
    }
    const final = sampleInkFirework(burst, INK_FIREWORK_DURATION_MS);
    assert(final.opacity > .7); assert.equal(final.growth, 1); assert.equal(final.launchOpacity, 0);
    const middle = sampleInkFirework(burst, burst.delay + 1400);
    assert(middle.growth > 0 && middle.growth < 1 && middle.opacity === 1);
  }
});

test('the GPU receives cached instanced seasonal elements and smooth paths within a fixed rendering budget', () => {
  for (const portrait of [false, true]) {
    const score = createInkFireworkScore(portrait ? 390 : 1440, portrait ? 844 : 900, 'spring', portrait);
    const { geometry, pathTexture, pathCount } = buildSeasonalSwirlGeometry(score, portrait ? 390 : 1440, portrait ? 844 : 900);
    const positions = geometry.getAttribute('position');
    assert.equal(positions.count, 4, 'Every painted element reuses one quad, not a continuous stroke strip');
    assert(geometry.instanceCount > 100 && geometry.instanceCount < 512);
    for (const [name, attribute] of Object.entries(geometry.attributes)) {
      assert.equal(attribute.count, name.startsWith('a') ? geometry.instanceCount : positions.count);
      assert([...attribute.array].every(Number.isFinite));
    }
    assert(geometry.index.count > positions.count);
    assert(Math.max(...geometry.index.array) < positions.count);
    assert.equal(pathTexture.image.width, SWIRL_PATH_SAMPLES);
    assert.equal(pathTexture.image.height, pathCount);
    assert([...pathTexture.image.data].every(Number.isFinite));
    assert([...geometry.getAttribute('aTile').array].every(tile => Number.isInteger(tile) && tile >= 0 && tile < 4));
    assert([...geometry.getAttribute('aReach').array].every(reach => reach >= .5 && reach <= 1));
    geometry.dispose(); pathTexture.dispose();
  }
});

test('painted ribbons traverse the actual scene contours without clipping or replacing their path', () => {
  const points = Array.from({ length: 36 }, (_, index) => ({ x: .17 + index / 180, y: .28 + Math.sin(index / 12) * .025 }));
  const sceneField = { streamlines: Array.from({ length: 18 }, () => ({ points })), projection: { left: 0, top: 0, width: 1440, height: 900 } };
  const score = createInkFireworkScore(1440, 900, 'fall', false, null, sceneField);
  const contour = score.flatMap(burst => burst.strands).filter(stroke => stroke.followsContour);
  assert(contour.length > 0 && contour.length <= 24);
  assert.deepEqual(contour[0].points[0], { x: points[0].x * 1440, y: points[0].y * 900 });
  assert.deepEqual(contour[0].points.at(-1), { x: points.at(-1).x * 1440, y: points.at(-1).y * 900 });
  assert(contour.every(stroke => stroke.width >= 1 && stroke.duration >= 1280));
});

test('seasonal element paths preserve the original swirl endpoints and deterministic flutter data', () => {
  const score = createInkFireworkScore(1440, 900, 'fall');
  const first = buildSeasonalSwirlGeometry(score), second = buildSeasonalSwirlGeometry(score);
  assert.deepEqual(first.pathTexture.image.data, second.pathTexture.image.data);
  for (const name of ['aPath', 'aReach', 'aSeed', 'aSize', 'aTile', 'aColor', 'aTiming']) {
    assert.deepEqual(first.geometry.getAttribute(name).array, second.geometry.getAttribute(name).array);
  }
  score.flatMap(burst => [burst.launch, ...burst.strands]).forEach((stroke, index) => {
    for (const [sample, expected] of [[0, stroke.points[0]], [SWIRL_PATH_SAMPLES - 1, stroke.points.at(-1)]]) {
      const offset = (index * SWIRL_PATH_SAMPLES + sample) * 4;
      const packed = first.pathTexture.image.data;
      assert(Math.abs(packed[offset] - expected.x) < .001 && Math.abs(packed[offset + 1] - expected.y) < .001);
      assert(Math.abs(Math.hypot(packed[offset + 2], packed[offset + 3]) - 1) < .001);
    }
  });
  first.geometry.dispose(); first.pathTexture.dispose(); second.geometry.dispose(); second.pathTexture.dispose();
});

test('a cancelled score retraces the same painted frames and can resume without resetting', () => {
  const burst = createInkFireworkScore(1440, 900)[0];
  const forward = createGateSealTurn();
  const pose = forward.sample(1700);
  const returning = createGateSealTurn(pose.angle, pose.velocity, 0, 1100);
  const time = angle => gateSealStoryProgress(angle) * 3000;
  assert.deepEqual(sampleInkFirework(burst, time(pose.angle)), sampleInkFirework(burst, time(returning.sample(0).angle)));
  const interrupted = returning.sample(450);
  const resumed = createGateSealTurn(interrupted.angle, interrupted.velocity);
  assert.deepEqual(sampleInkFirework(burst, time(interrupted.angle)), sampleInkFirework(burst, time(resumed.sample(0).angle)));
  assert.equal(sampleInkFirework(burst, time(returning.sample(1100).angle)).opacity, 0);
});

test('brush edges advance through fractional samples rather than jumping between points', () => {
  const stroke = createInkFireworkScore(1440, 900)[0].strands[0];
  assert.deepEqual(inkRibbonOutline(stroke, 0), []);
  const a = inkRibbonOutline(stroke, .251), b = inkRibbonOutline(stroke, .252);
  assert.equal(a.length, b.length);
  const distance = Math.hypot(a[a.length / 2 - 1].x - b[b.length / 2 - 1].x, a[a.length / 2 - 1].y - b[b.length / 2 - 1].y);
  assert(distance > 0 && distance < .3);
  assert.deepEqual(inkRibbonOutline(stroke, 1), inkRibbonOutline(stroke, 2));
  assert.deepEqual(inkRibbonOutline(stroke, -1), []);
});
