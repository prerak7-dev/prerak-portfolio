import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const output = 'tmp/tracer-appearances';
await mkdir(output, { recursive: true });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const report = [];
try {
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle');
  await page.getByRole('tab', { name: 'Cores', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  await page.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('chapter-settled'));
  for (const [season, label] of [['default','Monochrome'], ['fall','Fall'], ['spring','Spring'], ['winter','Winter']]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForFunction(season => document.querySelector('.archive-viewport').className.includes(`theme-${season}`), season);
    await page.waitForFunction(() => !document.documentElement.matches('.theme-assets-preparing, .theme-contour-transition-active'));
    for (const light of [false, true]) {
      const toggle = page.getByRole('switch', { name: 'Light appearance' });
      if ((await toggle.getAttribute('aria-checked') === 'true') !== light) await toggle.click();
      const theme = `${season}${light ? '-light' : ''}`;
      await page.waitForFunction(theme => document.querySelector('.archive-viewport').classList.contains(`theme-${theme}`), theme);
      await page.waitForFunction(() => !document.documentElement.matches('.theme-assets-preparing, .theme-contour-transition-active'));
      await page.waitForTimeout(250);
      const pixels = await page.locator('.cinematic-atmosphere-field').evaluate((canvas, light) => {
        const data = canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
        let core = 0;
        let visible = 0;
        let maxAlpha = 0;
        for (let i=0; i<data.length; i+=4) {
          maxAlpha = Math.max(maxAlpha, data[i+3]);
          if (data[i+3] < 80) continue;
          visible++;
          const brightness = (data[i] + data[i+1] + data[i+2]) / 3;
          if (light ? brightness < 150 : brightness > 150) core++;
        }
        return { core, visible, maxAlpha, blend: getComputedStyle(canvas).mixBlendMode };
      }, light);
      assert(pixels.core > 100 && pixels.maxAlpha > 140, `${theme}: ${JSON.stringify(pixels)}`);
      assert.equal(pixels.blend, 'normal');
      await page.screenshot({ path: `${output}/${theme}.png` });
      report.push({ theme, ...pixels });
      console.log(JSON.stringify(report.at(-1)));
    }
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
