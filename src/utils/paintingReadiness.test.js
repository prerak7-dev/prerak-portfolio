import test from 'node:test';
import assert from 'node:assert/strict';
import { isPaintingReady } from './paintingReadiness.js';

const base = 'https://example.com/prerak-portfolio/';
const source = '/prerak-portfolio/winter/home.webp';
const painting = { complete: true, naturalWidth: 2560, src: source, currentSrc: new URL(source, base).href };

test('a painting is ready only when its displayed resource matches the destination', () => {
  assert(isPaintingReady(painting, source, base));
  assert(!isPaintingReady({ ...painting, complete: false }, source, base));
  assert(!isPaintingReady({ ...painting, naturalWidth: 0 }, source, base));
  assert(!isPaintingReady({ ...painting, currentSrc: new URL('fall/home.webp', base).href }, source, base));
  assert(!isPaintingReady(null, source, base));
});

test('relative and absolute resource URLs describe the same decoded painting', () => {
  assert(isPaintingReady({ ...painting, dataset: { src: 'winter/home.webp' } }, undefined, base));
});
