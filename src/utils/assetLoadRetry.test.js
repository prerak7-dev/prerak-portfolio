import test from 'node:test';
import assert from 'node:assert/strict';
import { retryAssetLoad } from './assetLoadRetry.js';
import { preloadImageUrl } from './preloadAssets.js';

test('transient asset failures retry with bounded backoff and stop immediately on recovery', async () => {
  let attempts = 0;
  const waits = [];
  const result = await retryAssetLoad(() => ({ loaded: ++attempts === 3 }), { wait: delay => waits.push(delay) });
  assert.equal(result.loaded, true);
  assert.deepEqual(waits, [160, 480]);
  assert.equal(attempts, 3);
});

test('unavailable assets cannot create a retry storm', async () => {
  let attempts = 0;
  const result = await retryAssetLoad(() => ({ loaded: false, attempt: ++attempts }), { wait: () => {} });
  assert.equal(result.loaded, false);
  assert.equal(attempts, 3);
});

test('concurrent chapter requests share one recovering image load', async () => {
  const original = globalThis.Image;
  let attempts = 0;
  globalThis.Image = class {
    decode() { return Promise.resolve(); }
    set src(value) {
      this.url = value;
      const attempt = ++attempts;
      queueMicrotask(() => attempt === 1 ? this.onerror() : this.onload());
    }
  };
  try {
    const [first, second] = await Promise.all([preloadImageUrl('test-recovering-chapter.webp'), preloadImageUrl('test-recovering-chapter.webp')]);
    assert(first && first === second);
    assert.equal(attempts, 2);
    assert.equal(await preloadImageUrl('test-recovering-chapter.webp'), first);
    assert.equal(attempts, 2);
  } finally { globalThis.Image = original; }
});

test('decoded painting retention is bounded by pixel memory, not just image count', async () => {
  const original = globalThis.Image;
  let requests = 0;
  globalThis.Image = class {
    naturalWidth = 6000;
    naturalHeight = 3000;
    decode() { return Promise.resolve(); }
    set src(value) { this.url = value; requests++; queueMicrotask(() => this.onload()); }
  };
  try {
    for (let i = 0; i < 3; i++) await preloadImageUrl(`large-test-painting-${i}.webp`);
    await preloadImageUrl('large-test-painting-2.webp');
    assert.equal(requests, 3, 'The most recent decoded painting stays cached');
    await preloadImageUrl('large-test-painting-0.webp');
    assert.equal(requests, 4, 'Older large paintings release their retained decoder memory');
  } finally { globalThis.Image = original; }
});
