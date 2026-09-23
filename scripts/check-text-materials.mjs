import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
const output = 'tmp/text-materials';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
const report = [];
function monitor(page) {
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text().slice(0, 500)); });
}
async function settled(page) {
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.classList.contains('chapter-settled'));
  await page.waitForTimeout(700);
}
async function chapter(page, label) {
  const button = page.getByRole('tab', { name: label, exact: true });
  await button.locator('strong').click();
  await page.waitForFunction(label => [...document.querySelectorAll('.chapter-rail [role="tab"]')].some(node => node.getAttribute('aria-label') === label && node.getAttribute('aria-selected') === 'true'), label);
  await settled(page);
}
async function theme(page, season, light) {
  await page.getByRole('button', { name: season === 'default' ? 'Monochrome' : season[0].toUpperCase() + season.slice(1), exact: true }).click();
  await page.waitForFunction(value => document.querySelector('.archive-app')?.className.includes(`theme-${value}`), season);
  const toggle = page.getByRole('switch', { name: 'Light appearance' });
  if ((await toggle.getAttribute('aria-checked') === 'true') !== light) await toggle.click();
  await page.waitForFunction(value => document.querySelector('.archive-viewport')?.classList.contains(`theme-${value}`), `${season}${light ? '-light' : ''}`);
  await page.waitForTimeout(850);
  await page.mouse.move(3, 3);
}
async function rectangles(page, selectors) {
  return page.evaluate(selectors => selectors.map(selector => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const r = node.getBoundingClientRect();
    return { selector, left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
  }).filter(Boolean), selectors);
}
function disjoint(rectangles, width, height) {
  for (const r of rectangles) {
    assert(r.width > 0 && r.height > 0, `${r.selector} empty`);
    assert(r.left >= -1 && r.top >= -1 && r.right <= width + 1 && r.bottom <= height + 1, `${r.selector} outside ${width}x${height}: ${JSON.stringify(r)}`);
  }
  for (let i = 0; i < rectangles.length; i++) for (let j = i + 1; j < rectangles.length; j++) {
    const a = rectangles[i]; const b = rectangles[j];
    const area = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    assert(area < 1, `${a.selector} overlaps ${b.selector}: ${area}`);
  }
}
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  monitor(page);
  await page.goto(url);
  await page.waitForSelector('.intro-chapter-content.is-copy-complete');
  await settled(page);
  const materials = [];
  for (const season of ['default', 'fall', 'spring', 'winter']) for (const light of [false, true]) {
    await theme(page, season, light);
    const tokens = await page.locator('.intro-role').first().evaluate(node => ({
      ink: getComputedStyle(node).getPropertyValue('--type-ink'),
      face: getComputedStyle(node).getPropertyValue('--type-face'),
      font: getComputedStyle(node).fontFamily,
      material: node.dataset.textMaterial,
    }));
    assert.equal(tokens.material, 'relief');
    assert(tokens.ink && tokens.face);
    materials.push(tokens);
    await page.screenshot({ path: `${output}/${season}${light ? '-light' : ''}-1440.png` });
  }
  assert.equal(new Set(materials.map(value => value.face)).size, 8);
  assert.equal(new Set(materials.map(value => value.font)).size, 1);
  report.push({ eightMaterials: true, originalFontRetained: true });

  for (const [width, height] of [[390, 844], [320, 568], [768, 1024], [844, 390]]) {
    await page.setViewportSize({ width, height });
    const home = page.getByRole('tab', { name: 'Home', exact: true });
    await home.focus(); await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'intro');
    await settled(page);
    const collapse = page.getByRole('button', { name: 'Collapse lore guide' });
    if (await collapse.count()) await collapse.click();
    for (const selector of ['.intro-manifesto', '.intro-role-orbit', '.intro-actions', '.intro-status']) assert(await page.locator(selector).isVisible());
    assert.equal(await page.locator('.home-beat-controls').count(), 0);
    await page.screenshot({ path: `${output}/home-${width}.png` });
    await page.getByRole('button', { name: 'Expand lore guide' }).click();
    assert(await page.locator('.lore-parchment').isVisible());
    await page.getByRole('button', { name: 'Collapse lore guide' }).click();
    const cores = page.getByRole('tab', { name: 'Cores', exact: true });
    await cores.focus(); await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
    await settled(page);
    assert.equal(await page.locator('.contour-cores .contour-record').count(), 3);
    await page.screenshot({ path: `${output}/cores-${width}.png` });
    const projects = page.getByRole('tab', { name: 'Case Studies', exact: true });
    await projects.focus(); await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'projects');
    await settled(page);
    assert(await page.locator('.contour-projects .contour-record').count() > 5);
    await page.screenshot({ path: `${output}/projects-${width}.png` });
    report.push({ width, height, continuousCopy: true, loreToggle: true });
  }
  console.log(JSON.stringify({ report, errors }, null, 2));
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
