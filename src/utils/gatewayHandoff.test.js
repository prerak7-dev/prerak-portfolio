import assert from 'node:assert/strict';
import test from 'node:test';
import {
  gatewayBackingProgress,
  gatewayPlateOpacity,
  gatewayDissolveProgress,
  GATEWAY_DISSOLVE_END,
  GATEWAY_DISSOLVE_START,
} from './cinematicTiming.js';

test('Cores backing is opaque before the dissolve starts releasing its cover', () => {
  const releaseStart = GATEWAY_DISSOLVE_START
    + 0.92 * (GATEWAY_DISSOLVE_END - GATEWAY_DISSOLVE_START);
  for (let handoff = releaseStart; handoff <= 1; handoff += 0.001) {
    assert.ok(gatewayBackingProgress(handoff) > 0.999999);
    assert.ok(gatewayPlateOpacity(handoff) < 0.000001);
  }
  assert.equal(gatewayBackingProgress(GATEWAY_DISSOLVE_END), 1);
});

test('gate visibility reaches zero with the Cores backing and reverses continuously', () => {
  assert.equal(gatewayPlateOpacity(0), 1);
  assert.equal(gatewayPlateOpacity(GATEWAY_DISSOLVE_END), 0);
  let previous = 1;
  for (let index = 1; index <= 1000; index += 1) {
    const opacity = gatewayPlateOpacity(index / 1000);
    assert.ok(opacity <= previous);
    assert.ok(previous - opacity < 0.02);
    previous = opacity;
  }
  assert.equal(previous, 0);
});

test('forward and reverse handoffs have continuous monotonic coverage', () => {
  for (const progress of [gatewayBackingProgress, gatewayDissolveProgress]) {
    let previous = progress(0);
    assert.equal(previous, 0);
    for (let index = 1; index <= 1000; index += 1) {
      const current = progress(index / 1000);
      assert.ok(current >= previous);
      assert.ok(current - previous < 0.02);
      previous = current;
    }
    assert.equal(previous, 1);
    for (let index = 999; index >= 0; index -= 1) {
      const current = progress(index / 1000);
      assert.ok(current <= previous);
      previous = current;
    }
    assert.equal(previous, 0);
  }
});
