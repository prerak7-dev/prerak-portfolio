import test from 'node:test';
import assert from 'node:assert/strict';
import { createTracerAnimation } from './tracerAnimation.js';

function runtime() {
  const document = Object.assign(new EventTarget(), { hidden: false });
  const preference = Object.assign(new EventTarget(), { matches: false });
  const pending = new Map();
  let id = 0;
  return {
    document, preference, pending,
    matchMedia: () => preference,
    requestAnimationFrame: callback => { pending.set(++id, callback); return id; },
    cancelAnimationFrame: frame => pending.delete(frame),
    flush(time) {
      const callbacks = [...pending.values()];
      pending.clear();
      callbacks.forEach(callback => callback(time));
    },
  };
}

test('tracers render every available frame at 60, 120 and 144 Hz without changing speed', () => {
  for (const hz of [60, 120, 144]) {
    const host = runtime();
    const frames = [];
    const animation = createTracerAnimation(frame => frames.push(frame), host);
    for (let index = 0; index <= hz; index++) {
      assert.equal(host.pending.size, 1);
      host.flush(index * 1000 / hz);
    }
    assert.equal(frames.length, hz + 1);
    assert(Math.abs(frames.at(-1).time - 1) < .00001);
    animation.dispose();
    assert.equal(host.pending.size, 0);
  }
});

test('reduced motion invalidations coalesce and preference changes resume smoothly', () => {
  const host = runtime();
  host.preference.matches = true;
  const frames = [];
  const animation = createTracerAnimation(frame => frames.push(frame), host);
  host.flush(0);
  assert.equal(host.pending.size, 0);
  animation.invalidate(); animation.invalidate();
  host.flush(3000);
  assert.equal(frames.length, 2);
  assert.equal(frames.at(-1).time, 0);
  host.preference.matches = false;
  host.preference.dispatchEvent(new Event('change'));
  host.flush(6000);
  assert.equal(frames.at(-1).delta, 0);
  assert.equal(host.pending.size, 1);
  animation.dispose();
});

test('hidden tabs suspend tracer work and do not jump forward on resume', () => {
  const host = runtime();
  const frames = [];
  const animation = createTracerAnimation(frame => frames.push(frame), host);
  host.flush(0); host.flush(16);
  host.document.hidden = true;
  host.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(host.pending.size, 0);
  animation.invalidate();
  assert.equal(host.pending.size, 0);
  host.document.hidden = false;
  host.document.dispatchEvent(new Event('visibilitychange'));
  host.flush(10000);
  assert.equal(frames.at(-1).time, .016);
  animation.dispose();
  animation.invalidate();
  host.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(host.pending.size, 0);
});
