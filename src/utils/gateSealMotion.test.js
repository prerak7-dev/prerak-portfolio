import test from 'node:test';
import assert from 'node:assert/strict';
import { createGateSealTurn, gateSealDissolveProgress, gateSealFaceBounds, gateSealLandmark, gateSealPaintCoverage, gateSealStoryProgress, GATE_SEAL_ANGLE, GATE_SEAL_DISSOLVE_HANDOFF, GATE_SEAL_HOLD_MS, projectGateSeal } from './gateSealMotion.js';

test('the contour reveal starts with stone motion and reverses along the same progress', () => {
  const turn = createGateSealTurn();
  assert.equal(gateSealDissolveProgress(0), 0);
  assert.equal(gateSealDissolveProgress(180), GATE_SEAL_DISSOLVE_HANDOFF);
  assert.equal(gateSealDissolveProgress(-10), 0);
  assert.equal(gateSealDissolveProgress(200), GATE_SEAL_DISSOLVE_HANDOFF);
  for (const elapsed of [100, 600, 1500, 2600]) {
    const pose = turn.sample(elapsed);
    assert(gateSealDissolveProgress(pose.angle) > 0, 'No wait until unlock before revealing');
    const returning = createGateSealTurn(pose.angle, pose.velocity, 0, 1100);
    assert.equal(gateSealDissolveProgress(returning.sample(0).angle), gateSealDissolveProgress(pose.angle));
    assert.equal(gateSealDissolveProgress(returning.sample(1100).angle), 0);
  }
});

test('the stone drive ends at precisely 180 degrees after three seconds without overshoot', () => {
  const turn = createGateSealTurn();
  assert.equal(turn.duration, 3000);
  assert.deepEqual(turn.sample(0), { angle: 0, velocity: 0 });
  let previous = 0;
  for (let elapsed = 1; elapsed < GATE_SEAL_HOLD_MS; elapsed += 13) {
    const { angle, velocity } = turn.sample(elapsed);
    assert(angle >= previous && angle < GATE_SEAL_ANGLE);
    assert(velocity >= 0);
    previous = angle;
  }
  assert.equal(turn.sample(1500).angle, 90);
  assert.deepEqual(turn.sample(3000), { angle: 180, velocity: 0 });
  assert.deepEqual(turn.sample(6000), { angle: 180, velocity: 0 });
});

test('interrupted stone motion preserves momentum then returns gently to its closed stop', () => {
  const forward = createGateSealTurn();
  for (const elapsed of [100, 750, 1500, 2300, 2950]) {
    const pose = forward.sample(elapsed);
    const returning = createGateSealTurn(pose.angle, pose.velocity, 0, 1100);
    assert.equal(returning.sample(0).angle, pose.angle);
    if (pose.angle + pose.velocity * 1100 / 7 <= 180) {
      assert(Math.abs(returning.sample(0).velocity - pose.velocity) < .000001);
    } else {
      assert(returning.sample(0).velocity <= pose.velocity, 'The hard stop brakes residual forward momentum');
    }
    for (let time = 0; time <= 1100; time += 10) {
      const sample = returning.sample(time);
      assert(sample.angle >= 0 && sample.angle <= 180);
    }
    assert.deepEqual(returning.sample(1100), { angle: 0, velocity: 0 });
    const resumedPose = returning.sample(400);
    const resumed = createGateSealTurn(resumedPose.angle, resumedPose.velocity);
    assert.equal(resumed.duration, GATE_SEAL_HOLD_MS, 'Re-entry starts a fresh uninterrupted dwell');
    assert.equal(resumed.sample(3000).angle, 180);
  }
});

test('the resting stone eases into motion without an initial jerk', () => {
  const turn = createGateSealTurn();
  // Fourth-order displacement at rest means velocity, acceleration and jerk
  // all approach zero, rather than stepping torque on the first frame.
  const ratio = turn.sample(20).angle / turn.sample(10).angle;
  assert(ratio > 15.8 && ratio < 16);
  assert(turn.sample(200).angle < .11, 'The first visible turn stays delicate');
  for (const time of [10, 100, 500, 1200]) {
    assert(Math.abs(turn.sample(time).angle + turn.sample(3000 - time).angle - 180) < 1e-10);
  }
});

test('paint sampling takes over gradually and continuously near the closed stop', () => {
  assert.equal(gateSealPaintCoverage(0), 0);
  assert.equal(gateSealPaintCoverage(.375), .5);
  assert.equal(gateSealPaintCoverage(.75), 1);
  assert.equal(gateSealPaintCoverage(180), 1);
  let previous = 0;
  for (let angle = 0; angle <= .75; angle += .005) {
    const coverage = gateSealPaintCoverage(angle);
    assert(coverage >= previous && coverage <= 1);
    assert.equal(gateSealPaintCoverage(-angle), coverage);
    previous = coverage;
  }
  assert(gateSealPaintCoverage(.001) < 1e-7);
  assert(1 - gateSealPaintCoverage(.749) < 1e-7);
});

test('the seal projection follows native landscape and portrait art, including crop and parallax', () => {
  for (const portrait of [false, true]) {
    const projection = { left: -27, top: -44, width: portrait ? 432 : 1560, height: portrait ? 864 : 878 };
    const seal = projectGateSeal(projection, portrait);
    const moved = projectGateSeal({ ...projection, left: projection.left + 11, top: projection.top - 6 }, portrait);
    assert.equal(moved.x - seal.x, 11);
    assert.equal(moved.y - seal.y, -6);
    assert.equal(moved.diameter, seal.diameter);
    assert(seal.target >= 48 && seal.target > seal.diameter);
    assert(seal.y > projection.height * .48);
  }
});

test('the seal uses the original painted circle size in each composition', () => {
  assert.equal(gateSealLandmark().diameter * 1672, 62);
  assert.equal(gateSealLandmark(true).diameter * 887, 58);
});

test('the whole painted seal rotates, including all four cross cuts and its rim', () => {
  for (const portrait of [false, true]) {
    const width = portrait ? 887 : 1672, height = portrait ? 1774 : 941;
    const bounds = gateSealFaceBounds(portrait);
    const landmark = gateSealLandmark(portrait);
    const radius = bounds.radiusX * width;
    assert.equal(radius, landmark.diameter * width / 2, 'The rotating mask reaches the outside of the seal');
    assert(radius >= 29 && radius <= 31, 'No oversize seal or clipped cross endpoints');
    assert(Math.abs(bounds.radiusY * height - radius) < 1e-12, 'The native circle cannot become an ellipse');
    assert.equal(bounds.x, landmark.x); assert.equal(bounds.y, landmark.y);
  }
});

test('the ink score shares the exact stone clock and reverses continuously with it', () => {
  const turn = createGateSealTurn();
  for (let elapsed = 0; elapsed <= 3000; elapsed += 19) {
    const progress = gateSealStoryProgress(turn.sample(elapsed).angle);
    assert(Math.abs(progress * 3000 - elapsed) < .001);
  }
  assert.equal(gateSealStoryProgress(0), 0);
  assert.equal(gateSealStoryProgress(180), 1);
  for (const time of [300, 900, 1800, 2600]) {
    const pose = turn.sample(time);
    const returning = createGateSealTurn(pose.angle, pose.velocity, 0, 1100);
    assert.equal(gateSealStoryProgress(returning.sample(0).angle), gateSealStoryProgress(pose.angle));
    assert.equal(gateSealStoryProgress(returning.sample(1100).angle), 0);
    const back = returning.sample(1000);
    assert(gateSealStoryProgress(back.angle) < gateSealStoryProgress(pose.angle));
  }
});
