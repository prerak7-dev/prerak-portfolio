import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
await mkdir('tmp/mobile-navigation', { recursive: true });
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled')
    && !document.documentElement.matches('.theme-contour-transition-active, .theme-assets-preparing') && !document.querySelector('.text-contour-ghosts');
});
try {
  const requestedWidths = process.argv.slice(2).map(Number);
  for (const [width, height] of [[390, 844], [320, 568], [844, 390], [568, 320], [1024, 768]].filter(([width]) => !requestedWidths.length || requestedWidths.includes(width))) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: true, hasTouch: true });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await idle(page);
    const landscape = width > height;
    assert.equal(await page.locator('.chapter-rail').getAttribute('data-layout'), landscape ? 'contour' : 'compact');
    const read = () => page.evaluate(() => {
      const box = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
      return { header: box('.archive-header'), nav: box('.chapter-rail'), theme: box('.theme-switcher'), avatar: box('.lore-medallion'), lore: box('.lore-parchment'), title: box('.archive-identity strong'), copy: box('.intro-copy-stage') };
    });
    const start = await read();
    assert(Math.abs(start.theme.x - 10) < 1 && Math.abs(start.theme.bottom - (height - 18)) < 1, JSON.stringify(start));
    assert(Math.abs(start.avatar.right - (width - 12)) < 1 && Math.abs(start.avatar.bottom - (height - 18)) < 1, JSON.stringify(start));
    assert(start.theme.right < start.avatar.left, 'Bottom controls overlap');
    if (!landscape) {
      assert(start.nav.top >= start.header.bottom + 7 && start.nav.top <= start.header.bottom + 10);
      assert(start.copy.top >= start.nav.bottom + 10);
      const list = page.locator('.chapter-rail-list');
      assert(await list.evaluate(node => node.scrollWidth > node.clientWidth), 'Portrait navigation should scroll');
      await page.getByRole('button', { name: 'Next chapters', exact: true }).click();
      await page.waitForTimeout(500);
      assert(await list.evaluate(node => node.scrollLeft > 50), 'Navigation scroll arrow did not reveal more tabs');
      await list.evaluate(node => { node.scrollLeft = 0; });
    } else {
      const count = Number(await page.locator('.chapter-rail').getAttribute('data-visible-count'));
      const boxes = await page.locator('.chapter-rail-list > button:not([aria-hidden="true"])').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().toJSON()));
      assert(boxes.length >= count, 'Landscape contour lost visible tabs');
      assert(Math.max(...boxes.map(box => box.x)) - Math.min(...boxes.map(box => box.x)) > 8, 'Landscape contour was flattened into a straight bar');
      const hitboxes = await page.locator('.chapter-rail-list > button:not([aria-hidden="true"])').evaluateAll(nodes => nodes.map(node => {
        const rect = node.getBoundingClientRect();
        const [top = 0, right = top, bottom = top, left = right] = getComputedStyle(node).clipPath.match(/[\d.]+/g)?.map(Number) || [];
        return { x: rect.x + left, y: rect.y + top, right: rect.right - right, bottom: rect.bottom - bottom };
      }));
      for (const box of hitboxes) assert(box.x >= 15 && box.right <= width - 15 && box.y >= 81 && box.bottom <= height - 95, JSON.stringify(box));
      if (count < 7) {
        await page.getByRole('button', { name: 'Next chapters', exact: true }).click();
        await page.waitForFunction(() => Number(document.querySelector('.chapter-rail').dataset.scrollOffset) > .99);
        await page.getByRole('button', { name: 'Previous chapters', exact: true }).click();
        await page.waitForFunction(() => Number(document.querySelector('.chapter-rail').dataset.scrollOffset) < .01);
      }
    }
    await page.screenshot({ path: `tmp/mobile-navigation/home-${width}.png` });
    await page.evaluate(() => {
      window.dockFrames = [];
      const sample = () => {
        window.dockFrames.push(['.theme-switcher', '.lore-medallion', '.lore-parchment', '.archive-identity strong'].map(selector => {
          const rect = document.querySelector(selector).getBoundingClientRect(); return [rect.x, rect.y];
        }));
        window.dockFrame = requestAnimationFrame(sample);
      };
      window.dockFrame = requestAnimationFrame(sample);
    });
    await page.getByRole('tab', { name: 'Cores', exact: true }).click({ force: true });
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
    await idle(page);
    await page.getByRole('button', { name: 'Spring', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('theme-spring'));
    await idle(page);
    const drift = await page.evaluate(() => {
      cancelAnimationFrame(window.dockFrame);
      return Math.max(...window.dockFrames.flatMap(frame => frame.flatMap((point, index) => point.map((value, axis) => Math.abs(value - window.dockFrames[0][index][axis])))));
    });
    assert(drift < 1, `Controls or their text shifted during chapter/theme changes: ${drift}px`);
    await page.screenshot({ path: `tmp/mobile-navigation/cores-${width}.png` });
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, height, layout: landscape ? 'contour' : 'scrollable portrait bar', cornerDrift: drift, errors }));
    await page.close();
  }
} finally { await browser.close(); }
