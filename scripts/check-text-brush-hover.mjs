import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const output = 'tmp/brush-hover';
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
const leave = async page => {
  await page.mouse.move(5, 450);
  await page.waitForFunction(() => !document.querySelector('.text-brush-wash'));
};
const front = page => page.evaluate(() => {
  const id = document.querySelector('.text-brush-wash')?.style.maskImage.match(/#([^"')]+)/)?.[1];
  const filter = document.getElementById(id)?.querySelector('rect')?.getAttribute('filter')?.match(/#([^"')]+)/)?.[1];
  return Number(document.getElementById(filter)?.querySelector('feFuncA')?.getAttribute('intercept'));
});
const hover = async (page, target, name) => {
  const before = await target.boundingBox();
  await target.hover();
  await page.waitForFunction(() => document.querySelector('.text-brush-wash i'));
  const entering = await front(page);
  await page.waitForTimeout(650);
  const after = await target.boundingBox();
  if (!name.includes('nav')) assert.deepEqual(after, before, `Hover shifted ${name}`);
  const result = await page.evaluate(() => {
    const wash = document.querySelector('.text-brush-wash');
    const style = getComputedStyle(wash.firstChild);
    return { count: wash.children.length, mask: getComputedStyle(wash).maskImage, edge: style.maskImage, pigment: style.backgroundColor,
      pointer: getComputedStyle(wash.parentElement).pointerEvents, inert: wash.parentElement.inert };
  });
  assert(result.edge.includes('loader-brush.webp'));
  assert(result.count > 0 && result.inert && result.pointer === 'none');
  if (name === 'desktop-role') assert(entering < await front(page), 'The contour front should animate, not pop in');
  await page.screenshot({ path: `${output}/${name}.png` });
  return result;
};
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await init(page);
  const first = await hover(page, page.locator('.intro-role').first(), 'desktop-role');
  assert(first.mask.includes('text-contour-'));
  await leave(page);
  await hover(page, page.getByRole('tab', { name: 'Cores', exact: true }), 'desktop-nav');
  await leave(page);
  const lore = await hover(page, page.locator('.lore-parchment p'), 'desktop-lore');
  assert(lore.count >= 2, 'Wrapped lore needs a brush for each line');
  await leave(page);
  const pigments = new Set();
  for (const [name, season] of [['Monochrome', 'default'], ['Fall', 'fall'], ['Spring', 'spring'], ['Winter', 'winter']]) {
    await page.getByRole('button', { name, exact: true }).click();
    await page.waitForFunction(season => document.querySelector('.archive-viewport').classList.contains(`theme-${season}`), season);
    await idle(page);
    for (const light of [false, true]) {
      const toggle = page.getByRole('switch', { name: 'Light appearance' });
      if ((await toggle.getAttribute('aria-checked') === 'true') !== light) await toggle.click();
      await page.waitForFunction(theme => document.querySelector('.archive-viewport').classList.contains(`theme-${theme}`), `${season}${light ? '-light' : ''}`);
      await idle(page);
      const result = await hover(page, page.getByRole('tab', { name: 'Cores', exact: true }), `${season}-${light ? 'light' : 'dark'}-nav`);
      pigments.add(result.pigment);
      await leave(page);
    }
    await page.getByRole('switch', { name: 'Light appearance' }).click();
    await page.waitForFunction(theme => document.querySelector('.archive-viewport').classList.contains(`theme-${theme}`), season);
    await idle(page);
    console.log(`Verified ${season} light/dark brush pigments`);
  }
  assert.equal(pigments.size, 8, 'Each appearance should have its own pigment');
  await page.getByRole('tab', { name: 'Case Studies', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'projects');
  await idle(page);
  const tabs = page.locator('.archive-viewport .contour-project-tabs button');
  await hover(page, tabs.first(), 'case-study-tab');
  await tabs.nth(1).click();
  await idle(page);
  await hover(page, page.locator('.archive-viewport .contour-projects h3').first(), 'case-study-heading');
  await leave(page);
  // Rapid changes stay bounded, and all temporary SVG masks are released on exit.
  for (let index = 0; index < 18; index++) {
    await tabs.nth(index % 3).hover();
    await page.waitForTimeout(35);
    assert(await page.locator('.text-brush-wash').count() <= 3);
  }
  await leave(page);
  assert.equal(await page.locator('filter[id*="hover-"]').count(), 6, 'Hover filter channels should be reused');
  const maskLeaks = await page.evaluate(() => [...document.querySelectorAll('mask')].filter(mask => mask.querySelector('rect')?.getAttribute('filter')?.includes('hover-')).length);
  assert.equal(maskLeaks, 0, 'Hover mask leak');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.mouse.move(1, 1);
  await tabs.first().focus();
  await page.keyboard.press('Tab');
  await page.waitForFunction(() => document.querySelector('.text-brush-wash i'));
  assert.equal(await page.locator('.text-brush-wash').evaluate(node => getComputedStyle(node).maskImage), 'none');
  await page.emulateMedia({ forcedColors: 'active' });
  await page.waitForFunction(() => !document.querySelector('.text-brush-wash'));
  await page.close();
  for (const [width, height] of [[390, 844], [844, 390]]) {
    const mobile = await browser.newPage({ viewport: { width, height }, isMobile: true, hasTouch: true });
    await init(mobile);
    const nav = mobile.getByRole('tab', { name: 'Cores', exact: true });
    await nav.tap();
    await mobile.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
    await idle(mobile);
    assert.equal(await mobile.locator('.text-brush-wash').count(), 0, 'Touch must not leave sticky hover paint');
    await mobile.screenshot({ path: `${output}/touch-${width}x${height}.png` });
    await mobile.close();
  }
  assert.deepEqual(errors, []);
  console.log('Brush hover checks passed: eight appearances, text/nav/tabs, line wrapping, stable layout, bounded resources, keyboard, reduced motion, forced colors, and touch.');
} finally {
  await browser.close();
}
