import test from 'node:test';
import assert from 'node:assert/strict';
import { getCinematicPaintings, publishCinematicPaintings, clearCinematicPaintings } from './cinematicPaintingStore.js';

test('an old theme or orientation cannot clear the replacement painting readiness', () => {
  const old = {}, current = {};
  publishCinematicPaintings(old, [true, false]);
  publishCinematicPaintings(current, [true, true]);
  clearCinematicPaintings(old);
  assert.deepEqual(getCinematicPaintings(), [true, true]);
  clearCinematicPaintings(current);
  assert.equal(getCinematicPaintings(), null);
});

test('consumer code cannot mutate a published readiness snapshot', () => {
  const owner = {};
  const source = [1, 0];
  publishCinematicPaintings(owner, source);
  source[0] = 0;
  assert.deepEqual(getCinematicPaintings(), [true, false]);
  assert(Object.isFrozen(getCinematicPaintings()));
  clearCinematicPaintings(owner);
});
