import test from 'node:test';
import assert from 'node:assert/strict';
import { createGateSealTurn } from '../utils/gateSealMotion.js';
import { driveGateSeal, getGateSealPose, registerGateSealReturn, returnGateSealToRest, settleGateSeal } from './gateSealTurnStore.js';

test('only an interactive gate turn arms the reversible chapter reveal', () => {
  driveGateSeal(createGateSealTurn(), 'fall', false, 100);
  assert.equal(getGateSealPose(1600).dissolving, false);
  driveGateSeal(createGateSealTurn(), 'fall', false, 100, true);
  const pose = getGateSealPose(1600);
  assert.equal(pose.angle, 90);
  assert.equal(pose.dissolving, true);
  settleGateSeal(180, 'fall', false, true);
  assert.equal(getGateSealPose().dissolving, true, 'Hold the reveal through asset/React handoff');
  settleGateSeal(0, 'fall', false);
  assert.equal(getGateSealPose().dissolving, false);
});

test('unrelated navigation can await the gate returning without leaking a previous controller', async () => {
  let resolve;
  const older = registerGateSealReturn(() => Promise.reject(new Error('Stale controller')));
  const current = registerGateSealReturn(() => new Promise(done => { resolve = done; }));
  older();
  let completed = false;
  const resting = returnGateSealToRest().then(() => { completed = true; });
  await Promise.resolve();
  assert.equal(completed, false);
  resolve();
  await resting;
  assert.equal(completed, true);
  current();
  await returnGateSealToRest();
});

test('a rejected gate destination can explicitly recover an already-unlocked seal', async () => {
  let received;
  const unregister = registerGateSealReturn(options => { received = options; return Promise.resolve(); });
  await returnGateSealToRest({ force: true });
  assert.deepEqual(received, { force: true });
  unregister();
});
