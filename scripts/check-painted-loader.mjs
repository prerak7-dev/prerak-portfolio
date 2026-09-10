import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    let release;
    const hold = new Promise(resolve => { release = resolve; });
    await page.route(/\/src\/main\.jsx(?:\?.*)?$/, async route => { await hold; await route.continue(); });
    await page.goto('http://127.0.0.1:4187/prerak-portfolio/', { waitUntil: 'commit' });
    await page.waitForFunction(() => document.getElementById('boot-gateway-frame')?.complete);
    await page.waitForTimeout(600);
    assert.equal(await page.locator('.boot-astrolabe, .boot-celestial, .boot-orbit').count(), 0);
    assert.equal(await page.locator('.boot-frame').evaluate(node => getComputedStyle(node).filter), 'grayscale(1)');
    assert.equal(await page.locator('.boot-paint-progress').evaluate(node => node.offsetHeight), width === 390 ? 28 : 36);
    for (const progress of [.25, .6, 1]) {
      await page.locator('#boot-loader').evaluate((node, progress) => node.style.setProperty('--boot-progress', progress), progress);
      await page.locator('#boot-progress').evaluate((node, progress) => { node.textContent = String(Math.round(progress * 100)).padStart(3, '0'); }, progress);
      await page.waitForTimeout(500);
      assert.equal(await page.locator('.boot-copy').evaluate(node => getComputedStyle(node).opacity), '1');
      await page.screenshot({ path: `watercolor-loader-${width}-${progress}.png` });
    }
    await page.locator('#boot-loader').evaluate(node => node.style.setProperty('--boot-progress', 0));
    release();
    await page.waitForFunction(() => document.querySelector('#boot-loader.is-canvas-covered'), null, { timeout: 60000 });
    await page.screenshot({ path: `watercolor-loader-handoff-${width}.png` });
    await page.waitForFunction(() => document.querySelector('.experience-visible'), null, { timeout: 30000 });
    await page.waitForTimeout(1000);
    assert.equal(await page.locator('#boot-loader').count(), 0);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, errors, loaderCompleted: true }));
    await page.close();
  }
} finally { await browser.close(); }
