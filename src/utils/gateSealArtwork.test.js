import test from 'node:test';
import assert from 'node:assert/strict';
import { GATE_SEAL_ART_EXTENT, GATE_SEAL_TIP_REACH, gateSealCircleCoverage, gateSealShapeCoverage, gateSealFootprintCoverage, gateSealTipMirrorWeight } from './gateSealArtwork.js';

test('the entire four-point cross silhouette extends beyond the circle without clipped tips', () => {
  for (const [x, y] of [[1.1, 0], [-1.1, 0], [0, 1.1], [0, -1.1]]) {
    assert.equal(gateSealCircleCoverage(x, y), 0);
    assert.equal(gateSealShapeCoverage(x, y), 1, 'The rotating artwork includes each pointed end outside the rim');
  }
  assert.equal(gateSealShapeCoverage(1.1, .2), 0, 'No circular or rectangular scene cutout around the tips');
  assert.equal(gateSealShapeCoverage(0, 0), 1, 'The center diamond remains solid');
  assert(GATE_SEAL_ART_EXTENT > GATE_SEAL_TIP_REACH + .015, 'Transparent padding keeps feathered tips inside the rotating bitmap');
  for (let angle = 0; angle <= Math.PI * 2; angle += .013) {
    const x = Math.cos(angle) * GATE_SEAL_ART_EXTENT, y = Math.sin(angle) * GATE_SEAL_ART_EXTENT;
    assert.equal(gateSealShapeCoverage(x, y), 0);
  }
});

test('balanced tips exclude the extra gate seam while retaining its old cleanup footprint', () => {
  for (const sign of [-1, 1]) {
    assert.equal(gateSealShapeCoverage(0, sign * 1.23), 0, 'No surplus gate-column paint on either arm');
    assert.equal(gateSealFootprintCoverage(0, sign * 1.23), 1, 'The old longer arm is repaired, not left behind');
    assert.equal(gateSealShapeCoverage(.09, sign * 1.08), 0, 'Pointed tips have a precise narrow shoulder');
  }
  assert.equal(gateSealTipMirrorWeight(0, 1.08), 1, 'The lower tip uses the upper tips same painted length');
  assert.equal(gateSealTipMirrorWeight(0, -1.08), 0);
  assert.equal(gateSealTipMirrorWeight(1.08, 0), 0);
  assert.equal(gateSealTipMirrorWeight(0, .96), 0, 'The disk and central diamond remain native');
});

test('native seal edges and old-tip repair coverage are continuous and bounded', () => {
  for (let x = -1.5; x <= 1.5; x += .009) {
    for (let y = -1.5; y <= 1.5; y += .021) {
      const coverage = gateSealShapeCoverage(x, y), circle = gateSealCircleCoverage(x, y);
      assert(coverage >= 0 && coverage <= 1 && circle >= 0 && circle <= 1);
      assert(coverage >= circle - 1e-12);
      assert(Math.abs(coverage - gateSealShapeCoverage(x, -y)) < 1e-12, 'Upper and lower tip extents stay balanced');
      if (Math.hypot(x, y) < .93) assert.equal(Math.max(0, coverage - circle), 0, 'The repair cannot change the original disk or diamond');
    }
  }
});

test('the painted stone perimeter has nonuniform wear and feathering instead of a circle cutout', () => {
  const edge = Array.from({ length: 240 }, (_, index) => {
    const angle = index / 240 * Math.PI * 2;
    return gateSealCircleCoverage(Math.cos(angle) * .975, Math.sin(angle) * .975);
  });
  assert(Math.max(...edge) - Math.min(...edge) > .35);
  assert(edge.some(alpha => alpha > .5) && edge.some(alpha => alpha < .25));
  for (let index = 0; index < 240; index++) {
    const angle = index / 240 * Math.PI * 2;
    assert.equal(gateSealCircleCoverage(Math.cos(angle) * .93, Math.sin(angle) * .93), 1);
  }
});
