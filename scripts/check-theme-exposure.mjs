import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => document.querySelector('.experience-visible'), null, { timeout: 60000 });
    await page.waitForTimeout(3500);
    await page.evaluate(async () => {
      const store = await import('/prerak-portfolio/src/state/themeContourTransitionStore.js');
      window.readDissolve = store.getThemeContourTransition;
      window.startExposureProbe = () => {
        window.exposureFrames = [];
        window.probingExposure = true;
        const sample = () => {
          if (!window.probingExposure) return;
          const { active, progress, fromTheme, toTheme } = store.getThemeContourTransition();
          const opacity = Number(getComputedStyle(document.querySelector('.environment-vignette')).opacity);
          window.exposureFrames.push({ active, progress, fromTheme, toTheme, opacity });
          requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
      };
    });
    const hud = page.getByRole('complementary', { name: 'Theme selector' });
    for (const chapter of ['Home', 'Cores']) {
      if (chapter !== 'Home') {
        await page.locator('.chapter-rail-list button').filter({ hasText: chapter }).click({ force: true });
        await page.waitForFunction(() => window.readDissolve().active);
        await page.waitForFunction(() => !window.readDissolve().active, null, { timeout: 20000 });
      }
      for (const light of [true, false]) {
        await page.evaluate(() => window.startExposureProbe());
        await hud.getByRole('switch', { name: 'Light appearance' }).click();
        await page.mouse.move(width / 2, 15);
        await page.waitForFunction(() => window.readDissolve().active, null, { timeout: 20000 });
        await page.waitForFunction(() => window.readDissolve().progress >= .45);
        await page.screenshot({ path: `exposure-${chapter}-${light}-${width}-mid.png` });
        await page.waitForFunction(() => !window.readDissolve().active, null, { timeout: 20000 });
        await page.waitForTimeout(100);
        const samples = await page.evaluate(() => { window.probingExposure = false; return window.exposureFrames; });
        const moving = samples.filter(x => x.active);
        assert.ok(moving.length > 10);
        const maxExposureError = Math.max(...moving.map(x => Math.abs(x.opacity - (light ? 1 - x.progress : x.progress))));
        assert.ok(maxExposureError < .06, `Exposure must track the dissolve, error=${maxExposureError}`);
        assert.equal(samples.at(-1).opacity, light ? 0 : 1);
        const final = await page.screenshot({ path: `exposure-${chapter}-${light}-${width}-final.png` });
        const stats = await sharp(final).stats();
        assert.ok(stats.channels[0].stdev > 15);
        console.log(JSON.stringify({ width, chapter, light, frames: moving.length, maxExposureError }));
      }
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
} finally { await browser.close(); }
