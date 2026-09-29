import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
await mkdir('tmp/rail-scrolling', { recursive: true });
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled')
    && root.classList.contains('experience-visible')
    && !document.documentElement.classList.contains('theme-contour-transition-active');
});
try {
  for (const [width, height] of [[320, 740], [390, 844], [768, 1024], [844, 390], [568, 320]]) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: true, hasTouch: true });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await idle(page);
    await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete');
    const landscape = width > height;
    if (!landscape) {
      const portrait = await page.locator('.chapter-rail-list').evaluate(list => ({
        width: list.clientWidth,
        tabs: [...list.querySelectorAll('[role="tab"]')].map(tab => {
          const label = tab.querySelector('strong');
          return { width: tab.getBoundingClientRect().width, font: parseFloat(getComputedStyle(label).fontSize), overflow: label.scrollWidth - label.clientWidth };
        }),
      }));
      assert.equal(await page.locator('.chapter-rail').getAttribute('data-visible-count'), '3');
      portrait.tabs.forEach(tab => {
        assert(Math.abs(tab.width * 3 - portrait.width) < 1, 'Portrait must show exactly three equal slots');
        assert(tab.font >= 13 && tab.font <= 16, 'Portrait label is still too small');
        assert(tab.overflow <= 1, 'Chapter name is cut off');
      });
    }
    await page.evaluate(() => {
      window.scrollSamples = [];
      const sample = time => {
        const list = document.querySelector('.chapter-rail-list');
        const rail = document.querySelector('.chapter-rail');
        const points = [...list.querySelectorAll('button')].map(node => {
          const rect = node.getBoundingClientRect();
          return { x: rect.x, y: rect.y, cssX: parseFloat(node.style.getPropertyValue('--chapter-tab-x')) + (parseFloat(node.style.getPropertyValue('--chapter-drift-x')) || 0) };
        });
        window.scrollSamples.push({ time, scroll: list.scrollLeft, offset: Number(rail.dataset.scrollOffset), points });
        window.scrollSampleFrame = requestAnimationFrame(sample);
      };
      window.scrollSampleFrame = requestAnimationFrame(sample);
    });
    await page.getByRole('button', { name: 'Next chapters', exact: true }).click();
    await page.waitForTimeout(750);
    const forward = await page.evaluate(() => window.scrollSamples);
    const moving = forward.filter(sample => sample.scroll > 1 && sample.scroll < forward.at(-1).scroll - 1);
    assert(moving.length >= 5, `Scroll jumped rather than interpolating: ${JSON.stringify(forward.map(sample => sample.scroll))}`);
    assert(new Set(moving.map(sample => sample.scroll)).size > 5);
    if (landscape) {
      assert(moving.some(sample => sample.offset > .05 && sample.offset < .95), 'Missing sub-tab scroll positions');
      for (const sample of moving) for (const point of sample.points) assert(Math.abs(point.x - point.cssX) < 1, `Scroll shifted the fixed contour a second time: ${JSON.stringify(point)}`);
      await page.locator('.chapter-rail-list').evaluate(node => { node.scrollLeft = 48; });
      await page.waitForTimeout(80);
      const edge = await page.locator('.chapter-rail-list > button').first().evaluate(node => ({
        mask: getComputedStyle(node).maskImage, clip: getComputedStyle(node).clipPath, reveal: Number(node.dataset.edgeReveal),
      }));
      assert.equal(edge.clip, 'none');
      assert(edge.reveal > 0 && edge.reveal < 1 && edge.mask.includes('text-contour-'), 'Rail edge is not using the shared contour dissolve');
      // Return to the arrow destination before exercising the inverse action.
      await page.locator('.chapter-rail-list').evaluate(node => { node.scrollLeft = 160; });
      await page.waitForTimeout(80);
    }
    await page.getByRole('button', { name: 'Previous chapters', exact: true }).click();
    await page.waitForTimeout(700);
    assert(await page.locator('.chapter-rail-list').evaluate(node => node.scrollLeft < 2));
    const target = landscape ? page.getByRole('tab', { name: 'Cores', exact: true }) : page.locator('.chapter-rail-list');
    const rect = await target.boundingBox();
    await page.mouse.move(rect.x + Math.min(40, rect.width / 2), rect.y + rect.height / 2);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(350);
    const wheel = await page.locator('.chapter-rail-list').evaluate(node => node.scrollLeft);
    assert(wheel > 90 && wheel <= 121, `Wheel was unresponsive: ${wheel}`);
    await page.mouse.wheel(0, -120);
    await page.waitForTimeout(500);
    assert(await page.locator('.chapter-rail-list').evaluate(node => node.scrollLeft < 2));

    const cdp = await page.context().newCDPSession(page);
    const start = await target.boundingBox();
    const x = landscape ? start.x + 60 : start.x + start.width - 25;
    const y = start.y + start.height / 2;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let step = 1; step <= 8; step++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - step * 12, y }] });
      await page.waitForTimeout(20);
    }
    const duringTouch = await page.locator('.chapter-rail-list').evaluate(node => node.scrollLeft);
    assert(duringTouch > 40, `Touch only responds after release: ${duringTouch}`);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForTimeout(500);
    assert.equal(await page.locator('.archive-viewport').getAttribute('data-chapter'), 'intro', 'Swipe activated a chapter');
    await page.screenshot({ path: `tmp/rail-scrolling/scroll-${width}.png` });
    await page.getByRole('button', { name: 'Previous chapters', exact: true }).click();
    await page.waitForTimeout(700);
    await page.getByRole('tab', { name: 'Cores', exact: true }).click({ force: true });
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
    await idle(page);
    if (landscape) {
      const count = Number(await page.locator('.chapter-rail').getAttribute('data-visible-count'));
      const points = await page.locator('.chapter-rail-list > button').evaluateAll((nodes, count) => nodes.slice(0, count).map(node => {
        const rect = node.getBoundingClientRect(); return { x: rect.x, y: rect.y };
      }), count);
      assert(Math.max(...points.map(point => point.y)) - Math.min(...points.map(point => point.y)) < 25, 'Cores did not use its desktop horizon contour');
      assert(Math.max(...points.map(point => point.x)) - Math.min(...points.map(point => point.x)) > width * .3, 'Landscape is still restricted to a side strip');
      const clearance = await page.evaluate(() => {
        const copyBottom = Math.max(...[...document.querySelectorAll('.cores-chapter-heading, .core-sun')].map(node => node.getBoundingClientRect().bottom));
        const lore = document.querySelector('.lore-toggle').getBoundingClientRect();
        return [...document.querySelectorAll('.chapter-rail-list > button')].filter(node => !node.inert).every(node => {
          const rect = node.getBoundingClientRect();
          return rect.top >= copyBottom && rect.right <= lore.left;
        });
      });
      assert(clearance, 'Cores rail crosses the copy or lore control');
    }
    await page.screenshot({ path: `tmp/rail-scrolling/cores-${width}.png` });
    for (let press = 0; press < 8; press++) await page.getByRole('button', { name: 'Next chapters', exact: true }).click();
    await page.waitForTimeout(700);
    assert(await page.locator('.chapter-rail-list').evaluate(node => Math.abs(node.scrollLeft - (node.scrollWidth - node.clientWidth)) < 2), 'Rapid arrows lost their cumulative destination');
    await page.getByRole('tab', { name: 'Contact', exact: true }).click({ force: true });
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'contact');
    await idle(page);
    for (let press = 0; press < 8; press++) await page.getByRole('button', { name: 'Previous chapters', exact: true }).click();
    await page.waitForTimeout(700);
    assert(await page.locator('.chapter-rail-list').evaluate(node => node.scrollLeft < 2));
    await page.getByRole('tab', { name: 'Home', exact: true }).click({ force: true });
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'intro');
    await idle(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.getByRole('button', { name: 'Next chapters', exact: true }).click();
    assert(await page.locator('.chapter-rail-list').evaluate((node, landscape) => node.scrollLeft >= (landscape ? 160 : node.clientWidth * 2 / 3) - 1, landscape), 'Reduced-motion arrow did not respond immediately');
    await page.evaluate(() => cancelAnimationFrame(window.scrollSampleFrame));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, height, intermediateFrames: moving.length, wheel, touchTravelBeforeRelease: duringTouch, errors }));
    await page.close();
  }
} finally { await browser.close(); }
