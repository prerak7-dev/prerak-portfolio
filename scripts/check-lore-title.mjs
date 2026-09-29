import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const output = 'tmp/lore-title';
await mkdir(output, { recursive: true });
const errors = [];
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && !root.dataset.textContentPhase
    && !document.documentElement.classList.contains('theme-contour-transition-active');
});
const init = async page => {
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => !document.querySelector('#boot-loader')
    && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  await idle(page);
};
const titleStyles = async page => {
  const result = await page.evaluate(() => {
    const properties = ['fontFamily', 'fontWeight', 'fontStyle', 'textTransform', 'color', 'backgroundImage', 'backgroundSize', 'textShadow', 'filter', 'letterSpacing'];
    return ['.intro-role > .scenic-text', '.intro-actions a > .scenic-text', '.intro-gate-cta > .scenic-text', '.lore-parchment p > .scenic-text'].map(selector => {
      const node = document.querySelector(selector);
      const style = getComputedStyle(node);
      return { selector, material: node.parentElement.dataset.textMaterial, appearance: Object.fromEntries(properties.map(property => [property, style[property]])) };
    });
  });
  for (const item of result) {
    assert.equal(item.material, 'display-ink', item.selector);
    assert.deepEqual(item.appearance, result[0].appearance, item.selector);
  }
  const size = await page.evaluate(() => {
    const compact = matchMedia('(max-width: 1100px), (max-height: 700px), (pointer: coarse)').matches;
    return { actual: parseFloat(getComputedStyle(document.querySelector('.lore-parchment p > .scenic-text')).fontSize), expected: (compact ? 19.38 : 24.225) * .3 };
  });
  assert(Math.abs(size.actual - size.expected) < .001, 'Lore text should be exactly 30% of its previous size');
  assert.equal(await page.locator('.spatial-lore-guide .triangle-pointer').count(), 0);
};
const open = async page => {
  if (await page.locator('.spatial-lore-guide').evaluate(node => node.classList.contains('is-collapsed'))) {
    await page.getByRole('button', { name: 'Open lore guide', exact: true }).click();
    await page.waitForFunction(() => !document.querySelector('.spatial-lore-guide').classList.contains('is-collapsed'));
    await idle(page);
  }
};
const closedBounds = async page => {
  const box = await page.getByRole('button', { name: 'Open lore guide', exact: true }).boundingBox();
  const { width, height } = page.viewportSize();
  assert(box && box.width >= 44 && box.height >= 44);
  assert(box.x > width * .7 && box.y > height * .5 && box.x + box.width <= width - 8);
  assert(box.y + box.height < height - 48, 'Reopen icon should sit above the foreground bushes');
  assert(await page.locator('.lore-toggle').evaluate(node => {
    const rect = node.getBoundingClientRect();
    return node.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
  }), 'Another control overlaps the lore reopen icon');
  const entry = await page.locator('.intro-gate-cta').boundingBox();
  assert(!entry || box.x + box.width <= entry.x || entry.x + entry.width <= box.x || box.y + box.height <= entry.y || entry.y + entry.height <= box.y, 'Lore and archive entry hit boxes overlap');
  return box;
};
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await init(page);
  await titleStyles(page);
  await page.screenshot({ path: `${output}/desktop-open.png` });
  await page.getByRole('button', { name: 'Close lore guide', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
  assert.equal(await page.locator('.text-contour-ghosts .lore-avatar-image').count(), 1);
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'entering');
  assert(await page.locator('.archive-viewport .lore-toggle').evaluate(node => node.style.maskImage.includes('text-contour-')));
  await idle(page);
  const anchor = await closedBounds(page);
  assert.equal(await page.getByRole('button', { name: 'Close lore guide', exact: true }).count(), 0);
  assert(await page.locator('.lore-toggle').evaluate(node => document.activeElement === node));
  await page.screenshot({ path: `${output}/desktop-closed.png` });
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => !document.querySelector('.spatial-lore-guide').classList.contains('is-collapsed'));
  await idle(page);
  assert(await page.locator('.lore-medallion').evaluate(node => document.activeElement === node));
  assert.equal(await page.getByRole('button', { name: 'Open lore guide', exact: true }).count(), 0);
  await page.keyboard.press('Space');
  await page.waitForFunction(() => document.querySelector('.spatial-lore-guide').classList.contains('is-collapsed'));
  await idle(page);
  assert.deepEqual(await closedBounds(page), anchor);
  await open(page);
  await page.getByRole('button', { name: 'Close lore guide', exact: true }).click();
  await page.locator('.archive-header-actions a').first().focus();
  await idle(page);
  assert(await page.locator('.archive-header-actions a').first().evaluate(node => document.activeElement === node), 'Finishing a dissolve must not steal focus from another control');
  const appearances = process.argv.includes('--layout-only') ? [] : [['Monochrome', 'default'], ['Fall', 'fall'], ['Spring', 'spring'], ['Winter', 'winter']];
  for (const [name, season] of appearances) {
    await page.getByRole('button', { name, exact: true }).click();
    await page.waitForFunction(season => document.querySelector('.archive-viewport').classList.contains(`theme-${season}`), season);
    await idle(page);
    for (const light of [false, true]) {
      const toggle = page.getByRole('switch', { name: 'Light appearance' });
      if ((await toggle.getAttribute('aria-checked') === 'true') !== light) await toggle.click();
      await page.waitForFunction(theme => document.querySelector('.archive-viewport').classList.contains(`theme-${theme}`), `${season}${light ? '-light' : ''}`);
      await idle(page);
      await titleStyles(page);
      assert.deepEqual(await closedBounds(page), anchor, 'The lore anchor must not move on theme change');
    }
    await page.getByRole('switch', { name: 'Light appearance' }).click();
    await page.waitForFunction(theme => document.querySelector('.archive-viewport').classList.contains(`theme-${theme}`), season);
    await idle(page);
    console.log(`Verified ${season}: matching title ink and fixed lore anchor in light/dark`);
  }
  await page.locator('.intro-gate-cta').click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  await idle(page);
  await open(page);
  await page.screenshot({ path: `${output}/cores-open.png` });
  await page.getByRole('button', { name: 'Close lore guide', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.spatial-lore-guide').classList.contains('is-collapsed'));
  await idle(page);
  assert.deepEqual(await closedBounds(page), anchor);
  await page.close();
  for (const [width, height] of [[320, 568], [390, 844], [768, 1024], [568, 320], [844, 390]]) {
    const mobile = await browser.newPage({ viewport: { width, height }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    await init(mobile);
    await titleStyles(mobile);
    await closedBounds(mobile);
    await mobile.screenshot({ path: `${output}/${width}x${height}-closed.png` });
    await open(mobile);
    await mobile.screenshot({ path: `${output}/${width}x${height}-open.png` });
    const overlap = await mobile.evaluate(() => {
      const copy = document.querySelector('.lore-parchment').getBoundingClientRect();
      const avatar = document.querySelector('.lore-medallion').getBoundingClientRect();
      const controls = [...document.querySelectorAll('.chapter-scroll-arrow, .chapter-rail [role="tab"]')]
        .filter(node => getComputedStyle(node).display !== 'none' && node.getAttribute('aria-hidden') !== 'true')
        .map(node => node.getBoundingClientRect());
      return copy.bottom > avatar.top || controls.some(control => copy.top < control.bottom && copy.bottom > control.top && copy.left < control.right && copy.right > control.left);
    });
    assert(!overlap, 'Lore copy overlaps its close avatar or navigation controls');
    await mobile.getByRole('button', { name: 'Close lore guide', exact: true }).tap();
    await idle(mobile);
    await closedBounds(mobile);
    assert.equal(await mobile.locator('.intro-actions a').getAttribute('download'), '');
    await mobile.close();
    console.log(`Verified lore controls at ${width}x${height}`);
  }
  assert.deepEqual(errors, []);
  console.log('PASS: shared title material, avatar click/keyboard close, contour exchange, stable scenic dock, and responsive spacing.');
} finally { await browser.close(); }
