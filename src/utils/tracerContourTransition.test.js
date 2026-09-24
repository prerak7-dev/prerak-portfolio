import test from 'node:test';
import assert from 'node:assert/strict';
import { beginTracerContourTransition, maskTracerContourTransition, finishTracerContourTransition } from './tracerContourTransition.js';

function fixture() {
  const nodes = [];
  function canvas() {
    const values = new Map();
    const node = {
      dataset: {}, width: 200, height: 100, offsetWidth: 200, offsetHeight: 100,
      isConnected: true, pixels: 'outgoing scene',
      style: {
        getPropertyValue: key => values.get(key)?.[0] || '',
        getPropertyPriority: key => values.get(key)?.[1] || '',
        setProperty: (key, value, priority = '') => values.set(key, [value, priority]),
        removeProperty: key => values.delete(key),
      },
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 100 }),
      getContext: () => ({ drawImage: source => { node.pixels = source.pixels; } }),
      cloneNode: canvas,
      removeAttribute() {},
      before: ghost => nodes.splice(nodes.indexOf(node), 0, ghost),
      remove: () => { node.isConnected = false; nodes.splice(nodes.indexOf(node), 1); },
    };
    return node;
  }
  const live = canvas();
  nodes.push(live);
  return { root: { querySelectorAll: () => [...nodes] }, live, nodes };
}
const renderer = { mask: (rect, direction) => `url("text-${direction}")` };
const mask = node => node.style.getPropertyValue('mask-image');

test('chapter tracers keep outgoing pixels until their contour exit, then reveal the live scene', () => {
  const { root, live, nodes } = fixture();
  beginTracerContourTransition(root, 'chapter', 'outgoing');
  live.pixels = 'new scene and palette';
  const ghost = nodes[0];
  assert.equal(ghost.pixels, 'outgoing scene');
  assert.match(mask(live), /transparent/);
  maskTracerContourTransition(root, 'chapter', renderer);
  assert.equal(mask(ghost), 'url("text-outgoing")');
  beginTracerContourTransition(root, 'chapter', 'incoming');
  assert.equal(ghost.style.visibility, 'hidden');
  maskTracerContourTransition(root, 'chapter', renderer);
  assert.equal(mask(live), 'url("text-incoming")');
  finishTracerContourTransition(root, 'chapter');
  assert.equal(nodes.length, 1);
  assert.equal(mask(live), '');
  assert.equal(live.dataset.tracerDissolve, undefined);
});

test('navigation holds its pre-commit pixels and an earlier owner cannot end the chapter dissolve', () => {
  const { root, live, nodes } = fixture();
  beginTracerContourTransition(root, 'navigation', 'hold');
  live.pixels = 'destination';
  beginTracerContourTransition(root, 'chapter', 'outgoing');
  assert.equal(nodes.length, 2);
  assert.equal(nodes[0].pixels, 'outgoing scene');
  maskTracerContourTransition(root, 'chapter', renderer);
  finishTracerContourTransition(root, 'navigation');
  assert.equal(nodes.length, 2);
  assert.match(mask(live), /transparent/);
  finishTracerContourTransition(root, 'chapter');
});

test('theme masks are complementary and cleanup restores the original canvas mask', () => {
  const { root, live, nodes } = fixture();
  live.style.setProperty('mask-image', 'base-mask', 'important');
  beginTracerContourTransition(root, 'theme', 'crossfade');
  maskTracerContourTransition(root, 'theme', renderer);
  assert.equal(mask(live), 'url("text-incoming")');
  assert.equal(mask(nodes[0]), 'url("text-outgoing")');
  finishTracerContourTransition(root, 'theme');
  assert.equal(mask(live), 'base-mask');
  assert.equal(live.style.getPropertyPriority('mask-image'), 'important');
});
