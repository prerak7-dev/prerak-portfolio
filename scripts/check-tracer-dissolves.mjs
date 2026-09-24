import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const output = 'tmp/tracer-dissolves';
await mkdir(output, { recursive: true });
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle'
    && root.classList.contains('chapter-settled')
    && !document.documentElement.matches('.theme-assets-preparing, .theme-contour-transition-active')
    && !document.querySelector('.text-contour-ghosts, [data-tracer-outgoing]');
});

try {
  for (const [width, height] of [[1440, 900], [390, 844], [844, 390]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.tracerTransitions = [];
      const sample = () => {
        const canvas = document.querySelector('.cinematic-atmosphere-field:not([data-tracer-outgoing])');
        const ghost = document.querySelector('.cinematic-atmosphere-field[data-tracer-outgoing]');
        const phase = canvas?.dataset.tracerDissolve;
        if (phase) {
          const text = phase === 'crossfade'
            ? document.querySelector('.archive-header .material-text[style*="mask-image"]')
            : document.querySelector('.archive-scene[aria-hidden="false"] [data-chapter-text-mask]');
          const textMask = text?.style.maskImage;
          const mask = phase === 'outgoing' ? ghost?.style.maskImage : canvas.style.maskImage;
          window.tracerTransitions.push({ phase, sameField: Boolean(mask && textMask && mask.split('-mask-')[0] === textMask.split('-mask-')[0]), mask, ghosts: document.querySelectorAll('[data-tracer-outgoing]').length });
        }
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await idle(page);
    const navigation = await page.evaluate(() => {
      const title = getComputedStyle(document.querySelector('.archive-identity strong')).fontFamily;
      return [...document.querySelectorAll('.chapter-rail-list > button:not([aria-hidden="true"])')].map(button => {
        const marker = button.querySelector('.chapter-celestial-marker').getBoundingClientRect();
        const label = button.querySelector('strong');
        const text = label.getBoundingClientRect();
        return { title, font: getComputedStyle(label).fontFamily, marker: marker.width, gap: text.left - marker.right, alignment: (text.top + text.bottom - marker.top - marker.bottom) / 2, box: button.getBoundingClientRect().toJSON() };
      });
    });
    const markerSize = width > 1100 && height > 500 ? 24 : 19.2;
    for (const [index, item] of navigation.entries()) {
      assert.equal(item.font, item.title);
      assert(Math.abs(item.marker - markerSize) < .1, JSON.stringify(item));
      assert(item.box.height >= 43.99 && item.gap >= 2 && item.gap <= 9 && Math.abs(item.alignment) < 1, JSON.stringify(item));
      for (const other of navigation.slice(index + 1)) {
        const a = item.box, b = other.box;
        assert(!(a.x < b.right - .5 && b.x < a.right - .5 && a.y < b.bottom - .5 && b.y < a.bottom - .5), 'Navigation hit targets overlap');
      }
    }
    await page.evaluate(() => { window.tracerTransitions = []; });
    await page.getByRole('tab', { name: 'Cores', exact: true }).click({ force: true });
    await page.waitForFunction(() => document.querySelector('.cinematic-atmosphere-field:not([data-tracer-outgoing])')?.dataset.tracerDissolve === 'outgoing');
    const oldPixels = await page.locator('.cinematic-atmosphere-field[data-tracer-outgoing]').evaluate(canvas => {
      const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
      let visible = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 40) visible++;
      return visible;
    });
    assert(oldPixels > 100, 'Outgoing tracer snapshot is blank');
    await page.screenshot({ path: `${output}/chapter-exit-${width}.png` });
    await idle(page);
    const chapter = await page.evaluate(() => window.tracerTransitions);
    for (const phase of ['outgoing', 'incoming']) assert(chapter.some(frame => frame.phase === phase && frame.sameField), `${phase} did not share the chapter text field`);

    await page.evaluate(() => { window.tracerTransitions = []; });
    const incomingGeometry = '**/spring/**/geometry/cores*.webp';
    await page.route(incomingGeometry, async route => {
      await new Promise(resolve => setTimeout(resolve, 700));
      await route.continue();
    });
    const geometryRequested = page.waitForRequest(incomingGeometry);
    await page.getByRole('button', { name: 'Spring', exact: true }).click();
    await geometryRequested;
    assert(await page.evaluate(() => document.documentElement.classList.contains('theme-assets-preparing')));
    assert.equal(await page.locator('.cinematic-atmosphere-field:not([data-tracer-outgoing])').getAttribute('data-tracer-dissolve'), null, 'Tracer dissolve started before incoming geometry was ready');
    await page.waitForFunction(() => document.querySelector('.cinematic-atmosphere-field:not([data-tracer-outgoing])')?.dataset.tracerDissolve === 'crossfade');
    await page.waitForTimeout(450);
    await page.screenshot({ path: `${output}/theme-${width}.png` });
    await idle(page);
    const theme = await page.evaluate(() => window.tracerTransitions);
    assert(theme.filter(frame => frame.phase === 'crossfade' && frame.sameField).length > 5, 'Theme tracers did not use the text dissolve');

    await page.evaluate(() => { window.tracerTransitions = []; window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) / 3); });
    await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapter === 'projects');
    await idle(page);
    const scroll = await page.evaluate(() => window.tracerTransitions);
    assert(scroll.some(frame => frame.phase === 'outgoing' && frame.sameField));
    assert(scroll.some(frame => frame.phase === 'incoming' && frame.sameField));
    assert.equal(await page.locator('[data-tracer-dissolve], [data-tracer-outgoing]').count(), 0);
    await page.screenshot({ path: `${output}/settled-${width}.png` });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.getByRole('tab', { name: 'Home', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapter === 'intro');
    await idle(page);
    assert.equal(await page.locator('[data-tracer-dissolve], [data-tracer-outgoing]').count(), 0);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, height, titleFont: navigation[0].font, satelliteSize: markerSize, outgoingPixels: oldPixels, chapterFrames: chapter.length, themeFrames: theme.length, scrollFrames: scroll.length, slowGeometryHeld: true, errors }));
    await page.close();
  }
} finally { await browser.close(); }
