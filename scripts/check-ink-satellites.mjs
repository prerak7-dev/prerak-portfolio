import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const sharp = require('sharp');
const { chromium } = require('playwright');
const manifest = JSON.parse(await readFile(new URL('./cinematic-source/satellite-ink-v2.json', import.meta.url)));
for (const entry of manifest.entries) {
  const path = fileURLToPath(new URL(`../public/${entry.output}`, import.meta.url));
  const meta = await sharp(path).metadata();
  assert(meta.hasAlpha && meta.width === 128 && meta.height === 128);
  const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let empty = 0;
  for (let index = 3; index < data.length; index += 4) if (data[index] < 16) empty++;
  assert(empty / (info.width * info.height) > .6, 'Solid background in new satellite');
  assert(data[(64 * 128 + 64) * 4 + 3] < 16, 'Solid satellite center');
}
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
const output = 'tmp/ink-satellites';
await mkdir(output, { recursive: true });
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && !root.dataset.textContentPhase
    && !document.documentElement.classList.contains('theme-contour-transition-active');
});
const init = async page => {
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => !document.querySelector('#boot-loader')
    && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete');
  await idle(page);
};
const open = async page => {
  if (await page.locator('.lore-toggle').getAttribute('aria-expanded') === 'false') await page.locator('.lore-toggle').click();
  await idle(page);
};
const inspect = async page => {
  const result = await page.evaluate(() => {
    const visible = node => {
      for (let parent = node; parent; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        if (style.visibility === 'hidden' || Number(style.opacity) < .01 || style.display === 'none') return false;
      }
      return true;
    };
    const guide = document.querySelector('.spatial-lore-guide');
    return {
      expanded: guide.querySelector('.lore-toggle').getAttribute('aria-expanded') === 'true',
      avatarVisible: visible(guide.querySelector('.lore-avatar-image')),
      copyVisible: visible(guide.querySelector('.lore-parchment')),
      tracerCount: document.querySelectorAll('.lore-avatar-contour-field').length,
      markerStyles: [...document.querySelectorAll('.chapter-celestial-marker, .chapter-celestial-marker *')].map(node => {
        const style = getComputedStyle(node); return { filter: style.filter, shadow: style.boxShadow, background: style.backgroundImage };
      }),
      decorations: [...document.querySelectorAll('.chapter-celestial-marker')].flatMap(node => ['::before', '::after'].map(pseudo => getComputedStyle(node, pseudo).content)),
      sources: [...document.querySelectorAll('.chapter-celestial-marker img')].map(image => ({ url: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })),
    };
  });
  assert.equal(result.avatarVisible, result.expanded, 'Avatar visibility differs from lore text');
  assert.equal(result.copyVisible, result.expanded);
  assert.equal(result.tracerCount, 0);
  result.markerStyles.forEach(style => assert.deepEqual(style, { filter: 'none', shadow: 'none', background: 'none' }));
  assert(result.decorations.every(value => value === 'none'));
  assert(result.sources.length > 0 && result.sources.every(source => source.loaded && source.url.includes('satellite-ink-v2.webp')));
};
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await init(page);
  await open(page);
  await page.locator('.lore-toggle').click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
  assert.equal(await page.locator('.text-contour-ghosts img[data-contour-visual]').count(), 1, 'Avatar missing from contour exit');
  await idle(page);
  await inspect(page);
  assert.equal(await page.locator('.lore-toggle svg').count(), 1, 'Missing reopen icon');
  await page.locator('.lore-toggle').click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'entering');
  assert(await page.locator('.lore-avatar-image').evaluate(node => getComputedStyle(node).maskImage.includes('text-contour-')), 'Avatar missing contour entry');
  await idle(page);
  await inspect(page);
  for (const name of ['Winter', 'Spring', 'Fall', 'Monochrome']) {
    await page.getByRole('button', { name, exact: true }).click();
    await idle(page);
    for (let mode = 0; mode < 2; mode++) {
      await page.getByRole('switch', { name: 'Light appearance' }).click();
      await idle(page);
      await page.getByRole('tab', { name: 'Cores', exact: true }).hover();
      await inspect(page);
      await page.screenshot({ path: `${output}/${name}-${mode}.png` });
    }
  }
  await page.close();
  for (const [width, height] of [[390, 844], [844, 390]]) {
    const mobile = await browser.newPage({ viewport: { width, height }, hasTouch: true, reducedMotion: 'reduce' });
    await init(mobile);
    await inspect(mobile);
    await open(mobile);
    await inspect(mobile);
    await mobile.screenshot({ path: `${output}/open-${width}.png` });
    await mobile.locator('.lore-toggle').click();
    await idle(mobile);
    await inspect(mobile);
    await mobile.screenshot({ path: `${output}/closed-${width}.png` });
    await mobile.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: eight transparent assets; no marker effects; shared avatar/text contour; no avatar tracer; mobile hide/show');
} finally { await browser.close(); }
