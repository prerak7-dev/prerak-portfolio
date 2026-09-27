import test from 'node:test';
import assert from 'node:assert/strict';
import { homeTextChoreography, HOME_IDENTITY_ENTRY_MS, HOME_IDENTITY_HOLD_MS, HOME_IDENTITY_EXIT_MS, TEXT_ENTRY_MS } from './textChoreography.js';

test('Home dissolves the identity out, then reveals the header identity and role together', () => {
  const exitStart = HOME_IDENTITY_ENTRY_MS + HOME_IDENTITY_HOLD_MS;
  const dockStart = exitStart + HOME_IDENTITY_EXIT_MS;
  const roleStart = dockStart;
  assert.equal(homeTextChoreography(500, true).role, 0);
  assert.equal(homeTextChoreography(exitStart - 1, true).identity, 1);
  assert.equal(homeTextChoreography(exitStart, true).identityDirection, 'outgoing');
  assert.equal(homeTextChoreography(exitStart, true).identity, 0);
  assert.equal(homeTextChoreography(dockStart - 1, true).identityAtHeader, false);
  assert.equal(homeTextChoreography(dockStart, true).identityAtHeader, true);
  assert.equal(homeTextChoreography(dockStart, true).identityDirection, 'incoming');
  assert.equal(homeTextChoreography(dockStart, true).identity, 0);
  for (const offset of [0, 200, 600, TEXT_ENTRY_MS]) {
    const timing = homeTextChoreography(roleStart + offset, true);
    assert.equal(timing.identity, timing.role);
    assert.equal(timing.stage, 'role');
  }
  assert.equal(homeTextChoreography(roleStart + TEXT_ENTRY_MS, true).motto, 0);
  assert.equal(homeTextChoreography(roleStart + TEXT_ENTRY_MS + 200, true).role, 1);
  assert.equal(homeTextChoreography(10000, true).stage, 'complete');
});

test('Returning Home retains the docked identity and starts with the role', () => {
  assert.equal(homeTextChoreography(0).stage, 'role');
  assert.equal(homeTextChoreography(0).identityAtHeader, true);
  assert.equal(homeTextChoreography(TEXT_ENTRY_MS).motto, 0);
  assert.equal(homeTextChoreography(10000).motto, 1);
});
