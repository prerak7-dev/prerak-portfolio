import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const output = 'tmp/chapter-copy';
await mkdir(output, { recursive: true });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
await page.addInitScript(() => {
  window.copyAudit = { phases: [], leaks: [], overlaps: [], disjoint: [] };
  const sample = () => {
    const root = document.querySelector('.archive-viewport');
    if (root?.classList.contains('experience-visible')) {
      const phase = root.dataset.chapterCopyPhase;
      const scene = root.querySelector('.archive-scene[aria-hidden="false"]');
      const id = scene?.className.match(/scene-(\w+)/)?.[1];
      const progress = Number(root.dataset.chapterCopyProgress || 0);
      const key = `${phase}:${id}`;
      if (window.copyAudit.phases.at(-1)?.key !== key) window.copyAudit.phases.push({ key, phase, id });
      if (['loading', 'entering'].includes(phase) && progress < .95 && scene) {
        const gated = getComputedStyle(scene.parentElement).opacity === '0';
        for (const node of scene.querySelectorAll('.material-text')) {
          if (!gated && node.getClientRects().length && !node.hasAttribute('data-chapter-text-mask')) {
            window.copyAudit.leaks.push({ phase, id, progress, text: node.textContent });
          }
        }
      }
      const buttons = [...root.querySelectorAll('.chapter-rail-list > button')];
      const rects = buttons.map(node => node.getBoundingClientRect());
      for (let i = 0; i < rects.length; i++) {
        const a = rects[i];
        for (let j = i + 1; j < rects.length; j++) {
          const b = rects[j];
          if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > .5 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > .5) {
            window.copyAudit.overlaps.push({ i, j, phase, chapter: root.dataset.chapter, viewport: [innerWidth, innerHeight], a: a.toJSON(), b: b.toJSON() });
          }
        }
        const marker = buttons[i].querySelector('.chapter-celestial-marker').getBoundingClientRect();
        const label = buttons[i].querySelector('strong').getBoundingClientRect();
        const gap = label.left - marker.right;
        if (Math.abs((marker.top + marker.bottom - label.top - label.bottom) / 2) > 1 || gap < 1 || gap > 12) {
          window.copyAudit.disjoint.push({ i, gap, marker: marker.toJSON(), label: label.toJSON() });
        }
      }
    }
    requestAnimationFrame(sample);
  };
  requestAnimationFrame(sample);
});
const idle = () => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled');
});
async function scrollChapter(index, id) {
  await page.evaluate(index => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * index / 6), index);
  await page.waitForFunction(id => document.querySelector('.archive-viewport').dataset.chapter === id, id);
  await idle();
}
try {
  await page.goto(url);
  await page.waitForFunction(() => Number(document.querySelector('.archive-viewport')?.dataset.chapterCopyProgress) > .2);
  await page.screenshot({ path: `${output}/initial-entry.png` });
  await idle();
  assert.equal(await page.getByText(/dare to waste/).count(), 0);
  await page.screenshot({ path: `${output}/home.png` });
  await scrollChapter(1, 'cores');
  await page.screenshot({ path: `${output}/cores.png` });
  await page.getByRole('tab', { name: 'Case Studies', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'exiting');
  assert(await page.locator('.scene-cores[aria-hidden="false"]').count());
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'entering');
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${output}/projects-entry.png` });
  await idle();
  for (const [width, height] of [[1440,900], [1366,650], [768,1024], [390,844], [320,568], [844,390]]) {
    await page.setViewportSize({ width, height });
    for (const [index, id] of ['intro','cores','projects','professional','education','personal','contact'].entries()) {
      await scrollChapter(index, id);
    }
    await page.screenshot({ path: `${output}/contact-${width}.png` });
    const viewportAudit = await page.evaluate(() => ({ overlaps: window.copyAudit.overlaps, disjoint: window.copyAudit.disjoint.length }));
    console.log(JSON.stringify({ viewport: [width, height], overlappingFrames: viewportAudit.overlaps.length, firstOverlap: viewportAudit.overlaps[0], disjointFrames: viewportAudit.disjoint }));
  }
  const audit = await page.evaluate(() => window.copyAudit);
  assert.equal(audit.leaks.length, 0, `Unmasked entry: ${JSON.stringify(audit.leaks.slice(0,3))}`);
  assert.equal(audit.overlaps.length, 0, `Overlapping navigation: ${JSON.stringify(audit.overlaps.slice(0,3))}`);
  assert.equal(audit.disjoint.length, 0, `Disjoint label: ${JSON.stringify(audit.disjoint.slice(0,2))}`);
  for (const phase of ['exiting:cores', 'entering:projects', 'idle:projects']) assert(audit.phases.some(item => item.key === phase), phase);
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ chapterPhases: audit.phases.length, unmaskedFrames: audit.leaks.length, overlappingFrames: audit.overlaps.length, disjointFrames: audit.disjoint.length, errors }));
} finally { await browser.close(); }
