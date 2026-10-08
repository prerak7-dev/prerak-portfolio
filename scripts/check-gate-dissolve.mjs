import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
await mkdir('tmp/gate-dissolve', { recursive: true });

async function settle(page, angle) {
  await page.evaluate(async angle => {
    const { getGateSealPose, settleGateSeal } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
    const pose = getGateSealPose();
    settleGateSeal(angle, pose.theme, pose.portrait, angle > 0);
  }, angle);
  await page.waitForFunction(angle => {
    const canvas = document.querySelector('.cinematic-contour-dissolve');
    return angle === 0 ? canvas.style.visibility === 'hidden'
      : canvas.dataset.dissolveSource === 'seal' && Math.abs(Number(canvas.dataset.dissolveProgress) - .58 * angle / 180) < .0001;
  }, angle);
}

function pixelDifference(left, right) {
  let changed = 0;
  for (let i = 0; i < left.length; i += 4) {
    if (Math.max(...[0, 1, 2].map(channel => Math.abs(left[i + channel] - right[i + channel]))) > 25) changed++;
  }
  return changed;
}

try {
  for (const [index, theme] of ['default', 'default-light', 'fall', 'fall-light', 'spring', 'spring-light', 'winter', 'winter-light'].entries()) {
    const viewport = index % 2 ? { width: 390, height: 844 } : { width: 1440, height: 900 };
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error' && /shader|WebGLProgram/i.test(message.text())) errors.push(message.text()); });
    await page.addInitScript(theme => localStorage.setItem('aegis-theme', theme), theme);
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => !document.querySelector('#boot-loader') && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(300);
    await settle(page, 0);
    const rest = await sharp(await page.screenshot()).ensureAlpha().raw().toBuffer();
    await settle(page, 90);
    assert.equal(await page.locator('.archive-viewport').getAttribute('data-chapter'), 'intro', 'Preview cannot rewrite chapter content');
    const halfway = await page.screenshot({ path: `tmp/gate-dissolve/${theme}.png` });
    const changed = pixelDifference(rest, await sharp(halfway).ensureAlpha().raw().toBuffer());
    assert(changed > viewport.width * viewport.height * .025, `${theme}: preview must visibly reveal the actual next painting, not a blank canvas`);
    await settle(page, 180);
    await settle(page, 90);
    await settle(page, 0);
    assert.equal(await page.locator('.archive-viewport').getAttribute('data-chapter'), 'intro');
    assert.equal(await page.locator('.cinematic-contour-dissolve').getAttribute('data-dissolve-source'), null, 'Rewind releases the entire overlay');
    console.log(`${theme}: ${changed} changed pixels, reversible native contour at ${viewport.width}x${viewport.height}`);
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: all eight appearances render and rewind a nonblank chapter preview before unlock.');
} finally { await browser.close(); }
