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
    await chapter(page, 'Home');
    await page.waitForSelector('.intro-chapter-content.is-copy-complete');
    await theme(page, 'default', false);
    await page.screenshot({ path: `${output}/home-${width}.png` });
    disjoint(await rectangles(page, ['.archive-header', '.home-beat-controls', '.intro-gate-entry', '.spatial-hud.theme-switcher', '.lore-toggle', '.chapter-rail']), width, height);
    assert(await page.getByRole('tab', { name: 'Home', exact: true }).locator('strong').isVisible());
    for (let beat = 3; beat >= 0; beat--) {
      if (beat < 3) await page.getByRole('button', { name: 'Previous introduction passage' }).click();
      const selector = ['.intro-manifesto', '.intro-role-orbit', '.intro-actions', '.intro-status'][beat];
      assert(await page.locator(selector).isVisible());
      disjoint(await rectangles(page, ['.archive-header', selector, '.home-beat-controls']), width, height);
    }
    await page.getByRole('button', { name: 'Next introduction passage' }).focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.intro-role-orbit').isVisible(), true);
    await page.getByRole('button', { name: 'Expand lore guide' }).click();
    await page.waitForTimeout(400);
    assert.equal(await page.locator('.intro-manifesto').isVisible(), false);
    assert.equal(await page.locator('.intro-role-orbit').isVisible(), false);
    disjoint(await rectangles(page, ['.archive-header', '.lore-parchment', '.spatial-hud.theme-switcher', '.chapter-rail']), width, height);
    await page.screenshot({ path: `${output}/lore-${width}.png` });
    await page.getByRole('button', { name: 'Collapse lore guide' }).click();
    await chapter(page, 'Cores');
    while (await page.getByRole('button', { name: 'Previous core', exact: true }).isEnabled()) {
      await page.getByRole('button', { name: 'Previous core', exact: true }).click();
      await page.waitForTimeout(100);
    }
    await page.screenshot({ path: `${output}/cores-${width}.png` });
    disjoint(await rectangles(page, ['.archive-header', '.chapter-rail', '.contour-cores', '.spatial-hud.theme-switcher', '.lore-toggle']), width, height);
    await page.getByRole('button', { name: 'Next core', exact: true }).click();
    await page.waitForTimeout(300);
    assert.match(await page.locator('.contour-cores h3').innerText(), /Unreal/);
    await chapter(page, 'Case Studies');
    await page.screenshot({ path: `${output}/projects-${width}.png` });
    disjoint(await rectangles(page, ['.archive-header', '.chapter-rail', '.contour-projects', '.spatial-hud.theme-switcher', '.lore-toggle']), width, height);
    report.push({ width, height, docksClear: true, beats: 4, loreToggle: true, corePager: true });
  }
  await page.close();

  const motionPage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  monitor(motionPage);
  await motionPage.goto(url);
  await settled(motionPage);
  await chapter(motionPage, 'Cores');
  await motionPage.getByRole('button', { name: 'Spring', exact: true }).click();
  await motionPage.waitForSelector('.text-contour-ghosts');
  await motionPage.waitForTimeout(500);
  const masks = await motionPage.locator('.archive-viewport').evaluate(root => ({
    active: root.dataset.textDissolving,
    masked: [...root.querySelectorAll('.material-text')].filter(node => node.style.maskImage.includes('--text-contour-incoming')).length,
    ghosts: document.querySelector('.text-contour-ghosts')?.childElementCount,
    hiddenFromAT: document.querySelector('.text-contour-ghosts')?.getAttribute('aria-hidden'),
  }));
  assert.equal(masks.active, 'theme');
  assert(masks.masked > 5 && masks.ghosts > 5);
  assert.equal(masks.hiddenFromAT, 'true');
  const maskUrl = await motionPage.locator('.material-text[style*="--text-contour-incoming"]').first().evaluate(node => getComputedStyle(node).maskImage.slice(5, -2));
  const alpha = await motionPage.evaluate(async ({ url, maskUrl }) => {
    const { createTextContourRenderer } = await import(new URL('src/utils/textContourRenderer.js', url));
    const { getTracerSceneField } = await import(new URL('src/data/tracerSceneFields.js', url));
    const { getCinematicGeometryAsset } = await import(new URL('src/data/cinematicAssets.js', url));
    const geometry = new Image(); geometry.src = new URL(getCinematicGeometryAsset('default', 1, 0), url).href; await geometry.decode();
    const renderer = createTextContourRenderer();
    const width = innerWidth; const height = innerHeight;
    const cover = Math.max(width, height * 16 / 9);
    renderer.configure(geometry, { left: (width - cover) / 2, top: (height - cover * 9 / 16) / 2, width: cover, height: cover * 9 / 16 }, getTracerSceneField('default', 1), width, height);
    async function sample(source) {
      const image = new Image(); image.src = source; await image.decode();
      const canvas = document.createElement('canvas'); canvas.width = image.width; canvas.height = image.height;
      const context = canvas.getContext('2d'); context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0; let opaque = 0; let edge = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clear++; else if (pixels[i] === 255) opaque++; else edge++;
      }
      return { clear, opaque, edge };
    }
    try {
      return { live: await sample(maskUrl), start: await sample(renderer.draw(0).incoming), middle: await sample(renderer.draw(.28).incoming), end: await sample(renderer.draw(1).incoming) };
    } finally { renderer.dispose(); }
  }, { url, maskUrl });
  assert(alpha.middle.clear > 0 && alpha.middle.opaque > 0 && alpha.middle.edge > 0, `Contour must have a real irregular alpha front: ${JSON.stringify(alpha)}`);
  assert.equal(alpha.start.opaque + alpha.start.edge, 0);
  assert.equal(alpha.end.clear + alpha.end.edge, 0);
  await motionPage.screenshot({ path: `${output}/contour-text-mid-transition.png` });
  await motionPage.waitForFunction(() => !document.querySelector('.text-contour-ghosts'));
  assert.equal(await motionPage.locator('.material-text[style*="--text-contour-incoming"]').count(), 0);
  await motionPage.screenshot({ path: `${output}/cores-spring-settled.png` });
  await motionPage.getByRole('button', { name: 'Case studies', exact: true }).click();
  await motionPage.waitForSelector('.text-contour-ghosts');
  await motionPage.setViewportSize({ width: 390, height: 844 });
  await motionPage.waitForFunction(() => !document.querySelector('.text-contour-ghosts'));
  await settled(motionPage);
  assert.equal(await motionPage.locator('.archive-viewport').getAttribute('data-chapter'), 'projects');
  assert.equal(await motionPage.locator('.material-text[style*="--text-contour-incoming"]').count(), 0);
  report.push({ contourMasks: masks, alpha, cleanedUp: true, resizeDuringTransition: true });
  console.log(JSON.stringify({ report, errors }, null, 2));
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
