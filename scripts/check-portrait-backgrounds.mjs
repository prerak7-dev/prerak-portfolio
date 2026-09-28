import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { getCinematicGeometryAsset, getCinematicSceneAsset } from '../src/data/cinematicAssets.js';
import { APPEARANCE_IDS } from '../src/data/themeAppearance.js';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
const output = 'tmp/portrait-backgrounds';
await mkdir(output, { recursive: true });
if (!process.argv.includes('--quick')) {
  for (const theme of APPEARANCE_IDS) {
    for (let scene = 0; scene < 6; scene++) {
      const image = await sharp(`public/${getCinematicSceneAsset(theme, scene, 0, { portrait: true })}`).metadata();
      const field = await sharp(`public/${getCinematicGeometryAsset(theme, scene, 0, { portrait: true })}`).metadata();
      assert.equal(image.height / image.width, 2);
      assert.deepEqual([field.width, field.height], [320, 640]);
      assert(field.hasAlpha);
    }
  }
}
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
const missing = [];
const chapters = ['Home', 'Cores', 'Case Studies', 'Experience', 'Education', 'Field Notes', 'Contact'];
const selectors = ['.gateway-sequence-preloads img', '.cores-plate img', '.systems-plate img', '.chronology-plate img', '.chronology-plate img', '.field-plate img', '.surface-plate img'];
const waitIdle = page => page.waitForFunction(() => {
  const viewport = document.querySelector('.archive-viewport');
  return viewport?.dataset.chapterCopyPhase === 'idle' && viewport.classList.contains('experience-visible')
    && viewport.classList.contains('chapter-settled')
    && !document.documentElement.classList.contains('theme-contour-transition-active')
    && !document.documentElement.classList.contains('theme-assets-preparing');
}, null, { timeout: 45000 });
try {
  const sizes = process.argv.includes('--quick') ? [[390, 844]] : [[390, 844], [320, 568], [768, 1024], [1440, 900], [844, 390]];
  for (const [width, height] of sizes) {
    const portrait = height > width && width <= 1100;
    const page = await browser.newPage({ viewport: { width, height }, hasTouch: width < 1100 });
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) missing.push(response.url()); });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelector('#boot-gateway-frame')?.naturalWidth > 0);
    const loader = await page.locator('#boot-gateway-frame').evaluate(image => ({ source: image.currentSrc, ratio: image.naturalHeight / image.naturalWidth }));
    assert.equal(loader.source.includes('/portrait/'), portrait);
    if (portrait) assert.equal(loader.ratio, 2);
    await page.screenshot({ path: `${output}/${width}-loading.png` });
    await waitIdle(page);
    await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete');
    const layout = await page.locator('.cinematic-environment').getAttribute('data-artwork-layout');
    assert.equal(layout, portrait ? 'portrait' : 'landscape');
    const order = width === 390 ? chapters : ['Home', 'Field Notes'];
    for (const chapter of order) {
      if (chapter !== 'Home') {
        for (let attempt = 0; attempt < 7 && !(await page.getByRole('tab', { name: chapter, exact: true }).isVisible()); attempt++) {
          await page.getByRole('button', { name: 'Next chapters', exact: true }).click();
          await page.waitForTimeout(300);
        }
        await page.getByRole('tab', { name: chapter, exact: true }).focus();
        await page.keyboard.press('Enter');
        await page.waitForFunction(chapter => [...document.querySelectorAll('.chapter-rail [role="tab"]')].some(tab => tab.getAttribute('aria-label') === chapter && tab.getAttribute('aria-selected') === 'true'), chapter);
        await waitIdle(page);
      }
      const index = chapters.indexOf(chapter);
      await page.waitForFunction(selector => {
        const image = document.querySelector(selector);
        return image?.complete && image.naturalWidth > 0 && image.getAttribute('src') === image.dataset.src;
      }, selectors[index]);
      const image = await page.locator(selectors[index]).evaluate(node => ({ source: node.currentSrc, ratio: node.naturalWidth / node.naturalHeight, rect: node.getBoundingClientRect().toJSON() }));
      assert.equal(image.source.includes('/portrait/'), portrait);
      assert(Math.abs(image.ratio - (portrait ? .5 : 1672 / 941)) < .002);
      assert(image.rect.width >= width - 2 && image.rect.height >= height - 2);
      await page.screenshot({ path: `${output}/${width}-${chapter.replaceAll(' ', '-')}.png` });
    }
    if (width === 390) {
      for (const [nextWidth, nextHeight, expected] of [[844, 390, 'landscape'], [390, 844, 'portrait']]) {
        await page.setViewportSize({ width: nextWidth, height: nextHeight });
        await page.waitForFunction(expected => document.querySelector('.cinematic-environment')?.dataset.artworkLayout === expected, expected);
        await page.waitForFunction(expected => {
          const image = document.querySelector('.surface-plate img');
          return image?.complete && image.naturalWidth > 0 && image.currentSrc.includes('/portrait/') === (expected === 'portrait') && image.getAttribute('src') === image.dataset.src;
        }, expected);
        await page.screenshot({ path: `${output}/rotated-${expected}.png` });
      }
      if (!process.argv.includes('--quick')) {
        for (const [season, label] of [['default', 'Monochrome'], ['fall', 'Fall'], ['spring', 'Spring'], ['winter', 'Winter']]) {
          await page.getByRole('button', { name: label, exact: true }).click();
          for (const light of [false, true]) {
            const toggle = page.getByRole('switch', { name: 'Light appearance' });
            if ((await toggle.getAttribute('aria-checked') === 'true') !== light) await toggle.click();
            const expected = `/painted-v1/${season}/${light ? 'light' : 'dark'}/portrait/surface.webp`;
            await page.waitForFunction(expected => {
              const image = document.querySelector('.surface-plate img');
              return image?.complete && image.currentSrc.endsWith(expected)
                && !document.documentElement.classList.contains('theme-contour-transition-active')
                && !document.documentElement.classList.contains('theme-assets-preparing');
            }, expected);
            await waitIdle(page);
            await page.mouse.move(width - 1, height / 2);
            await page.screenshot({ path: `${output}/theme-${season}-${light ? 'light' : 'dark'}.png` });
          }
          await page.getByRole('switch', { name: 'Light appearance' }).click();
          await waitIdle(page);
        }
        await page.waitForFunction(() => {
          const canvas = document.querySelector('.cinematic-atmosphere-field');
          return canvas && canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data.some((value, index) => index % 4 === 3 && value > 0);
        });
        const before = await page.locator('.cinematic-atmosphere-field').evaluate(canvas => canvas.toDataURL());
        await page.waitForTimeout(200);
        const after = await page.locator('.cinematic-atmosphere-field').evaluate(canvas => canvas.toDataURL());
        assert.notEqual(before, after, 'Portrait tracers must remain animated');
      }
    }
    console.log(JSON.stringify({ width, height, layout, chapters: order, result: 'passed' }));
    await page.close();
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(missing, []);
  console.log('Portrait artwork, chapter loading, and orientation checks passed.');
} finally { await browser.close(); }
