import test from 'node:test';
import assert from 'node:assert/strict';
import { readSceneImageProjection } from './cinematicGeometryRenderer.js';

test('all render layers share one projection measurement per presented frame', () => {
  const previous = globalThis.document;
  globalThis.document = { timeline: { currentTime: 1 } };
  let reads = 0;
  const image = { isConnected: true, clientWidth: 800, clientHeight: 600,
    naturalWidth: 1600, naturalHeight: 900,
    getBoundingClientRect() { reads++; return { left: 0, top: 0, width: 800, height: 600 }; } };
  try {
    const a = readSceneImageProjection(image, null, 800);
    assert.equal(readSceneImageProjection(image, null, 800), a);
    assert.equal(reads, 1);
    document.timeline.currentTime = 17;
    assert.notEqual(readSceneImageProjection(image, null, 800), a);
    assert.equal(reads, 2);
    readSceneImageProjection(image, null, 900);
    assert.equal(reads, 3, 'A resized viewport cannot reuse a stale projection');
    image.isConnected = false;
    assert.equal(readSceneImageProjection(image, a, 900), a);
  } finally { globalThis.document = previous; }
});
