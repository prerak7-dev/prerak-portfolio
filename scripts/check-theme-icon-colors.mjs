import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
await mkdir('tmp/theme-icon-colors', { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.classList.contains('chapter-settled'));
  const buttons = page.locator('.theme-icon-row > button');
  const check = async () => {
    const colors = await page.locator('.theme-icon-row > button > svg').evaluateAll(nodes => nodes.map(node => {
      const style = getComputedStyle(node);
      return [style.color, style.stroke, getComputedStyle(node.parentElement).color];
    }));
    assert.equal(colors.length, 5);
    for (const [color, stroke, button] of colors) {
      assert.equal(color, button, 'Icon did not inherit its seasonal control color');
      assert.equal(stroke, button);
      assert.notEqual(color, 'rgb(128, 128, 128)', 'The fixed grey override remains');
    }
  };
  for (const season of ['Monochrome', 'Fall', 'Spring', 'Winter']) for (const light of [false, true]) {
    await page.getByRole('button', { name: season, exact: true }).click();
    const toggle = page.getByRole('switch', { name: 'Light appearance' });
    const id = `${season === 'Monochrome' ? 'default' : season.toLowerCase()}${light ? '-light' : ''}`;
    await page.waitForFunction(season => [...document.querySelector('.archive-viewport').classList].some(name => name === `theme-${season}` || name === `theme-${season}-light`), season === 'Monochrome' ? 'default' : season.toLowerCase());
    if ((await toggle.getAttribute('aria-checked') === 'true') !== light) await toggle.click();
    await page.waitForFunction(id => document.querySelector('.archive-viewport').classList.contains(`theme-${id}`), id);
    for (let index = 0; index < 5; index++) {
      await buttons.nth(index).hover(); await buttons.nth(index).focus(); await check();
    }
  }
  for (const [width, height] of [[1440, 900], [1100, 760], [768, 1024], [700, 900], [390, 844], [320, 568], [844, 390], [568, 320], [480, 320]]) {
    await page.setViewportSize({ width, height }); await page.mouse.move(0, 0); await page.waitForTimeout(300); await check();
    const layout = await page.evaluate(() => {
      const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
      return { selector: rect('.theme-switcher'), identity: rect('.archive-identity'), actions: rect('.archive-header-actions'), header: rect('.archive-header'), position: getComputedStyle(document.querySelector('.theme-switcher')).position };
    });
    assert.equal(layout.position, 'fixed');
    assert(Math.abs((layout.selector.left + layout.selector.right) / 2 - width / 2) < 1, JSON.stringify(layout));
    assert(layout.selector.top >= 0 && layout.selector.top <= 24 && layout.selector.bottom < 90, JSON.stringify(layout));
    const overlap = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    for (const item of [layout.identity, layout.actions]) assert.equal(overlap(layout.selector, item), 0, `${width}: selector overlaps a header control ${JSON.stringify(layout)}`);
    await page.screenshot({ path: `tmp/theme-icon-colors/${width}.png` });
    for (const [label, id] of [['Cores', 'cores'], ['Case Studies', 'projects'], ['Home', 'intro']]) {
      for (let attempt = 0; attempt < 7 && !await page.getByRole('tab', { name: label, exact: true }).count(); attempt++) {
        await page.getByRole('button', { name: id === 'intro' ? 'Previous chapters' : 'Next chapters', exact: true }).click();
        await page.waitForTimeout(180);
      }
      await page.getByRole('tab', { name: label, exact: true }).focus(); await page.keyboard.press('Enter');
      await page.waitForFunction(id => document.querySelector('.archive-viewport').dataset.chapter === id && document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle', id);
      const box = await page.locator('.theme-switcher').boundingBox();
      assert(Math.abs(box.x - layout.selector.left) < 1 && Math.abs(box.y - layout.selector.top) < 1, `${width}: selector moved with the chapter`);
      if (id !== 'intro') {
        const content = await page.locator(`.contour-${id}`).boundingBox();
        assert(content.y >= layout.header.bottom + 8, `${width}: chapter content overlaps header`);
        if (width <= 700 && height >= width) {
          const nav = await page.locator('.chapter-rail').boundingBox();
          assert(content.y >= nav.y + nav.height + 8, `${width}: chapter content overlaps portrait navigation`);
        }
      }
    }
    await buttons.first().hover();
    await page.waitForTimeout(200);
    const tooltip = await buttons.first().locator('.theme-icon-tooltip').boundingBox();
    assert(tooltip.y >= layout.selector.top && tooltip.y + tooltip.height < height, `${width}: tooltip escaped the top of the screen`);
  }
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ appearances: 8, icons: 5, seasonalColors: 'restored', hoverAndFocus: 'passed', topCentered: true, viewports: 9, errors }));
} finally { await browser.close(); }
