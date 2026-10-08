import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getThemeContourTransition,
  startThemeContourTransition,
} from './themeContourTransitionStore.js';

function installFakeWindow() {
  const scheduledFrames = [];
  const scheduledTimeouts = [];
  let nextId = 1;
  let now = 0;

  const windowMock = {
    requestAnimationFrame(callback) {
      const id = nextId;
      nextId += 1;
      scheduledFrames.push({ id, callback });
      return id;
    },
    cancelAnimationFrame(id) {
      const index = scheduledFrames.findIndex((entry) => entry.id === id);
      if (index >= 0) scheduledFrames.splice(index, 1);
    },
    setTimeout(callback, delay) {
      const id = nextId;
      nextId += 1;
      scheduledTimeouts.push({ id, callback, dueAt: now + delay });
      return id;
    },
    clearTimeout(id) {
      const index = scheduledTimeouts.findIndex((entry) => entry.id === id);
      if (index >= 0) scheduledTimeouts.splice(index, 1);
    },
  };

  global.window = windowMock;

  return {
    windowMock,
    advance(ms) {
      now += ms;
      let steps = 0;
      while (steps < 200) {
        const dueTimeouts = scheduledTimeouts
          .filter((entry) => entry.dueAt <= now)
          .sort((a, b) => a.dueAt - b.dueAt);
        scheduledTimeouts.splice(0, scheduledTimeouts.length, ...scheduledTimeouts.filter((entry) => entry.dueAt > now));
        for (const entry of dueTimeouts) {
          entry.callback();
        }

        const frames = [...scheduledFrames];
        scheduledFrames.length = 0;
        if (!frames.length) break;
        for (const entry of frames) {
          entry.callback(now);
        }
        steps += 1;
      }
    },
  };
}

test('theme transition completes even if the applyTheme callback never resolves', async () => {
  const { advance, windowMock } = installFakeWindow();
  let completed = false;

  const token = startThemeContourTransition({
    fromTheme: 'default',
    toTheme: 'fall',
    sceneIndex: 0,
    fromImage: {},
    toImage: {},
    geometryImage: {},
    applyTheme: () => new Promise(() => {}),
    onComplete: () => {
      completed = true;
    },
    duration: 300,
  });

  advance(4000);
  await Promise.resolve();
  await Promise.resolve();
  advance(1000);

  assert.equal(completed, true);
  assert.equal(getThemeContourTransition().active, false);
  assert.equal(getThemeContourTransition().token, token);
});

test('a seal reveal continues without resetting background progress or skipping the navigation flight', () => {
  const { advance } = installFakeWindow();
  let visits = 0;
  startThemeContourTransition({
    kind: 'chapter', fromTheme: 'default', toTheme: 'default', sceneIndex: 0,
    targetSceneIndex: 1, targetChapterIndex: 1,
    fromImage: {}, toImage: {}, geometryImage: {},
    initialProgress: .58, duration: 3000, applyProgress: 0,
    applyTheme: () => { visits++; },
  });
  assert.equal(getThemeContourTransition().progress, .58);
  assert.equal(getThemeContourTransition().linearProgress, 0, 'Satellites start at their actual Home pose');
  assert(Math.abs(getThemeContourTransition().duration - 1260) < 1e-9);
  advance(16);
  assert.equal(getThemeContourTransition().progress, .58);
  assert.equal(visits, 1);
  advance(630);
  assert(Math.abs(getThemeContourTransition().linearProgress - .5) < 1e-9);
  assert(Math.abs(getThemeContourTransition().progress - .79) < 1e-9);
  advance(631);
  assert.equal(getThemeContourTransition().active, false);
  assert.equal(getThemeContourTransition().progress, 1);
  assert.equal(visits, 1);
});

test('direct chapter navigation commits one destination under the dissolve and finishes afterward', () => {
  const { advance } = installFakeWindow();
  const visits = [];
  let completed = false;
  startThemeContourTransition({
    kind: 'chapter',
    fromTheme: 'spring',
    toTheme: 'spring',
    sceneIndex: 0,
    targetSceneIndex: 5,
    targetChapterIndex: 6,
    fromImage: {},
    toImage: {},
    geometryImage: {},
    applyProgress: 0,
    applyTheme: () => visits.push(6),
    onComplete: () => { completed = true; },
    duration: 300,
  });
  advance(16);
  assert.equal(getThemeContourTransition().startedAt, 16);
  assert.equal(getThemeContourTransition().duration, 300);
  assert.deepEqual(visits, [6]);
  assert.equal(getThemeContourTransition().active, true);
  assert.equal(getThemeContourTransition().targetSceneIndex, 5);
  assert.equal(getThemeContourTransition().targetChapterIndex, 6);
  assert.equal(completed, false);
  advance(150);
  assert.equal(getThemeContourTransition().linearProgress, .5);
  assert.equal(getThemeContourTransition().startedAt, 16);
  assert.ok(getThemeContourTransition().progress > 0);
  assert.ok(getThemeContourTransition().progress < 1);
  assert.equal(completed, false);
  advance(200);
  assert.equal(completed, true);
  assert.deepEqual(visits, [6]);
  assert.equal(getThemeContourTransition().progress, 1);
});
