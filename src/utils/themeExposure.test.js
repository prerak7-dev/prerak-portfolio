import test from 'node:test';
import assert from 'node:assert/strict';
import { getThemeVignetteOpacity } from './themeExposure.js';

test('theme commit cannot change exposure independently of dissolve progress', () => {
  for (const [fromTheme, toTheme] of [['fall', 'fall-light'], ['winter-light', 'winter'], ['boot', 'default']]) {
    let previous;
    for (let step = 0; step <= 100; step++) {
      const transition = { active: true, fromTheme, toTheme, progress: step / 100 };
      const value = getThemeVignetteOpacity(fromTheme, transition);
      assert.equal(value, getThemeVignetteOpacity(toTheme, transition));
      if (previous !== undefined) assert.ok(Math.abs(value - previous) <= .010001);
      previous = value;
    }
    assert.equal(previous, getThemeVignetteOpacity(toTheme, { active: false }));
  }
});

test('same-lighting chapter dissolves preserve exposure', () => {
  for (const theme of ['default', 'spring', 'fall-light', 'winter-light']) {
    const resting = getThemeVignetteOpacity(theme);
    for (const progress of [0, .22, .5, .99, 1]) {
      assert.equal(getThemeVignetteOpacity(theme, { active: true, fromTheme: theme, toTheme: theme, progress }), resting);
    }
  }
});
