import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const chapters = [
  ['Cores', 'cores'], ['Case Studies', 'systems'], ['Experience', 'chronology'],
  ['Field Notes', 'field'], ['Contact', 'surface'],
];

try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => document.querySelector('.experience-visible'), null, { timeout: 60000 });
    await page.waitForTimeout(3500);
    await page.evaluate(async () => {
      const store = await import('/prerak-portfolio/src/state/themeContourTransitionStore.js');
      window.paintingTransition = () => {
        const { active, progress } = store.getThemeContourTransition();
        return { active, progress };
      };
    });
    const finishTransition = async label => {
      await page.mouse.move(width / 2, 20);
      await page.waitForFunction(() => window.paintingTransition().active, null, { timeout: 15000 });
      await page.waitForFunction(() => window.paintingTransition().progress >= .42, null, { timeout: 15000 });
      const canvas = page.locator('.cinematic-environment .cinematic-contour-dissolve');
      assert.equal(await canvas.evaluate(node => getComputedStyle(node).visibility), 'visible');
      if (label.includes('cores')) await page.screenshot({ path: `night-${label}-mid-${width}.png` });
      await page.waitForFunction(() => !window.paintingTransition().active, null, { timeout: 20000 });
      await page.waitForTimeout(900);
    };
    const checkScene = async (season, label, scene, painted = true) => {
      await page.locator('.chapter-rail-list button').filter({ hasText: label }).click({ force: true });
      await finishTransition(`${season}-${scene}`);
      const node = page.locator(`.${scene}-plate .environment-living-layer img`);
      const state = await node.evaluate(img => ({ src: img.currentSrc, width: img.naturalWidth, filter: getComputedStyle(img).filter }));
      assert.ok(state.width > 0, `${season}/${scene} must load`);
      assert.ok(state.src.endsWith(painted ? `/painted-v1/${season}/dark/${scene}.webp` : `/${season}/${scene}.webp`), state.src);
      if (painted) assert.equal(state.filter, 'none');
      const screenshot = await page.screenshot({ path: `night-${season}-${scene}-final-${width}.png` });
      const stats = await sharp(screenshot).stats();
      // Legacy night paintings intentionally have lower contrast than the new art.
      assert.ok(stats.channels.slice(0, 3).some(channel => channel.stdev > (painted ? 25 : 8)), 'Scene must not be blank');
      assert.ok(await node.evaluate(img => Number(getComputedStyle(img.closest('.environment-plate')).opacity) > .98), 'Final painting must be fully exposed');
      console.log(JSON.stringify({ width, season, scene, state }));
    };
    for (const [label, scene] of chapters) await checkScene('default', label, scene);
    const hud = page.getByRole('complementary', { name: 'Theme selector' });
    for (const [season, name] of [['fall', 'Fall'], ['spring', 'Spring'], ['winter', 'Winter']]) {
      await hud.getByRole('button', { name, exact: true }).click();
      await finishTransition(`${season}-theme`);
      for (const [label, scene] of chapters) await checkScene(season, label, scene);
    }
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, errors, nightScenesPassed: true }));
    await page.close();
  }
} finally { await browser.close(); }
