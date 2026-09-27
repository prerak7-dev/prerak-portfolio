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

test('redundant content requests do not commit without an animation layer', async () => {
  globalThis.window = new EventTarget();
  try {
    let updates = 0;
    await changeTextContent(() => updates++, '.reading', { shouldUpdate: () => false });
    assert.equal(updates, 0);
  } finally { delete globalThis.window; }
});

test('queued requests check current content when executed, not when clicked', async () => {
  globalThis.window = new EventTarget();
  try {
    let request;
    let current = 'Evidence';
    let updates = 0;
    window.addEventListener('text-contour-change', event => { event.preventDefault(); request = event.detail; });
    const complete = changeTextContent(() => { current = 'Evidence'; updates++; }, '.reading', {
      shouldUpdate: () => current !== 'Evidence',
    });
    assert.equal(request.shouldUpdate(), false);
    current = 'Overview';
    assert.equal(request.shouldUpdate(), true);
    request.update();
    assert.equal(updates, 1);
    request.update();
    assert.equal(updates, 1, 'A satisfied request must not rewrite the same content');
    request.complete(); await complete;
  } finally { delete globalThis.window; }
});

test('a stale queued reader cannot rewrite replacement content', async () => {
  globalThis.window = new EventTarget();
  try {
    let request;
    let currentReader = true;
    let updates = 0;
    window.addEventListener('text-contour-change', event => { event.preventDefault(); request = event.detail; });
    const complete = changeTextContent(() => updates++, '.reading', { shouldUpdate: () => currentReader });
    currentReader = false;
    assert.equal(request.shouldUpdate(), false);
    request.update(); request.complete(); await complete;
    assert.equal(updates, 0);
  } finally { delete globalThis.window; }
});

test('independent tab selections can share a visual scope without sharing a queue key', async () => {
  globalThis.window = new EventTarget();
  try {
    const requests = [];
    window.addEventListener('text-contour-change', event => requests.push(event.detail));
    await changeTextContent(() => {}, '.reading', { key: 'project' });
    await changeTextContent(() => {}, '.reading', { key: 'mode' });
    assert.equal(requests[0].selector, requests[1].selector);
    assert.notEqual(requests[0].key, requests[1].key);
  } finally { delete globalThis.window; }
});
