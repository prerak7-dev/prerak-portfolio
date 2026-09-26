import test from 'node:test';
import assert from 'node:assert/strict';
import { changeTextContent } from './changeTextContent.js';

test('text changes remain usable without the contour layer', async () => {
  globalThis.window = new EventTarget();
  try {
    let updates = 0;
    await changeTextContent(() => updates++);
    assert.equal(updates, 1);
  } finally { delete globalThis.window; }
});

test('a captured text change waits for its exit and resolves after entry', async () => {
  globalThis.window = new EventTarget();
  try {
    let request;
    let updates = 0;
    let finished = false;
    window.addEventListener('text-contour-change', event => { event.preventDefault(); request = event.detail; });
    const completed = changeTextContent(() => updates++, '.lore-parchment').then(() => { finished = true; });
    assert.equal(updates, 0);
    assert.equal(request.selector, '.lore-parchment');
    request.update();
    await Promise.resolve();
    assert.equal(updates, 1);
    assert.equal(finished, false);
    request.complete();
    await completed;
    assert.equal(finished, true);
  } finally { delete globalThis.window; }
});

test('reading surfaces retain their exact element scope', async () => {
  globalThis.window = new EventTarget();
  try {
    const scope = { id: 'reading-surface' };
    window.addEventListener('text-contour-change', event => {
      assert.equal(event.detail.selector, scope);
    });
    await changeTextContent(() => {}, scope);
  } finally { delete globalThis.window; }
});
