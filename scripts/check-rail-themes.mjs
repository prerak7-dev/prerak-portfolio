import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
await mkdir('tmp', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 844, height: 390 }, hasTouch: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.text().includes('Rail contour mask unavailable')) errors.push(message.text()); });
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  const idle = () => page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle'
    && !document.documentElement.classList.contains('theme-contour-transition-active')
    && !document.documentElement.classList.contains('theme-assets-preparing'));
  await idle();
  for (const theme of ['Monochrome', 'Fall', 'Spring', 'Winter']) {
    await page.getByRole('button', { name: theme, exact: true }).click();
    await idle();
    for (const light of [false, true]) {
      const toggle = page.getByRole('switch', { name: 'Light appearance' });
      if ((await toggle.getAttribute('aria-checked') === 'true') !== light) await toggle.click();
      await idle();
      await page.locator('.chapter-rail-list').evaluate(node => { node.scrollLeft = 48; });
      await page.waitForTimeout(250);
      const edge = await page.locator('.chapter-rail-list > button').first().evaluate(node => ({
        mask: getComputedStyle(node).maskImage, clip: getComputedStyle(node).clipPath, reveal: Number(node.dataset.edgeReveal),
      }));
      assert(edge.mask.includes('text-contour-') && edge.clip === 'none' && edge.reveal > 0 && edge.reveal < 1);
      const screenshot = await page.screenshot({ path: `tmp/rail-${theme}-${light ? 'light' : 'dark'}.png` });
      const stats = await sharp(screenshot).stats();
      assert(stats.channels.some(channel => channel.stdev > 25), 'Scene is blank');
      console.log(JSON.stringify({ theme, light, contourEdge: true, nonblank: true }));
    }
  }
  const pixels = () => page.evaluate(() => [...document.querySelectorAll('canvas.cinematic-atmosphere-field')].map(canvas => {
    const ctx = canvas.getContext('2d');
    if (!ctx || !canvas.width || !canvas.height) return 0;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let sum = 0;
    for (let i = 3; i < data.length; i += 4) sum += data[i];
    return sum;
  }));
  const before = await pixels();
  await page.waitForTimeout(180);
  const after = await pixels();
  assert(before.some(value => value > 0), 'Tracer canvas is empty');
  assert.notDeepEqual(before, after, 'Tracer canvas is not moving');
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ movingCanvas: true, errors }));
} finally { await browser.close(); }
