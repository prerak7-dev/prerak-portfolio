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
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => document.querySelector('.experience-visible'), { timeout: 60000 });
    await page.waitForTimeout(4500);
    await page.evaluate(async () => {
      const store = await import('/prerak-portfolio/src/state/themeContourTransitionStore.js');
      window.paintingTransition = () => {
        const { active, progress, token } = store.getThemeContourTransition();
        return { active, progress, token };
      };
    });
    const hud = page.getByRole('complementary', { name: 'Theme selector' });
    for (const [name, action] of [
      ['daylight', () => hud.getByRole('switch', { name: 'Light appearance' }).click()],
      ['spring', () => hud.getByRole('button', { name: 'Spring', exact: true }).click()],
      ['cores', () => page.locator('.chapter-rail-list button').filter({ hasText: 'Cores' }).click({ force: true })],
      ['home', () => page.locator('.chapter-rail-list button').filter({ hasText: 'Home' }).click({ force: true })],
      ['night', () => hud.getByRole('switch', { name: 'Light appearance' }).click()],
    ]) {
      await action();
      await page.mouse.move(width / 2, 20);
      await page.waitForFunction(() => window.paintingTransition().active, { timeout: 15000 });
      await page.waitForFunction(() => window.paintingTransition().progress >= .42);
      const canvas = page.locator('.cinematic-environment .cinematic-contour-dissolve');
      const canvasState = await canvas.evaluate(node => ({
        width: node.width, height: node.height, visibility: getComputedStyle(node).visibility,
      }));
      assert.ok(canvasState.width > 0 && canvasState.height > 0 && canvasState.visibility === 'visible');
      await page.screenshot({ path: `painted-motion-${name}-mid-${width}.png` });
      await page.waitForFunction(() => !window.paintingTransition().active, { timeout: 15000 });
      await page.waitForTimeout(600);
      const result = await page.screenshot({ path: `painted-motion-${name}-final-${width}.png` });
      const stats = await sharp(result).stats();
      assert.ok(stats.channels.slice(0, 3).some(channel => channel.stdev > 25), 'Scene must not be blank');
      console.log(JSON.stringify({ width, name, canvasState, errors }));
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
} finally { await browser.close(); }
