import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const report = [];
try {
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle');
  for (const label of ['Cores', 'Case Studies', 'Experience', 'Education', 'Field Notes', 'Contact', 'Home']) {
    await page.evaluate(() => {
      window.railFrames = [];
      const sample = time => {
        const points = [...document.querySelectorAll('.chapter-rail-list > button')].map(node => {
          const r = node.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height };
        });
        const rail = document.querySelector('.chapter-rail');
        window.railFrames.push({ time, points, progress: rail.dataset.motionProgress, source: rail.dataset.motionSource });
        window.railFrame = requestAnimationFrame(sample);
      };
      window.railFrame = requestAnimationFrame(sample);
    });
    await page.getByRole('tab', { name: label, exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('chapter-transitioning'));
    await page.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('chapter-settled') && document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle');
    await page.waitForFunction(() => document.querySelector('.chapter-rail').dataset.moving === 'false', null, { timeout: 8000 });
    const frames = await page.evaluate(() => { cancelAnimationFrame(window.railFrame); return window.railFrames; });
    let maxSpeed = 0;
    let maxStep = 0;
    let worst;
    for (let f = 1; f < frames.length; f++) {
      const current = frames[f];
      const previous = frames[f - 1];
      for (let i = 0; i < current.points.length; i++) {
        const a = current.points[i];
        const p = previous.points[i];
        const step = Math.hypot(a.x - p.x, a.y - p.y);
        let start = f - 1;
        while (start > 0 && current.time - frames[start].time < 60) start--;
        if (current.time - frames[start].time >= 60) {
          const origin = frames[start].points[i];
          maxSpeed = Math.max(maxSpeed, Math.hypot(a.x - origin.x, a.y - origin.y) / (current.time - frames[start].time) * 1000);
        }
        if (current.time - previous.time < 25 && step > maxStep) { maxStep = step; worst = { i, current, previous }; }
        for (const b of current.points.slice(i + 1)) {
          assert(!(a.x < b.x + b.width - .5 && b.x < a.x + a.width - .5 && a.y < b.y + b.height - .5 && b.y < a.y + a.height - .5), `${label}: overlapping targets`);
        }
      }
    }
    report.push({ label, frames: frames.length, maxSpeed: Math.round(maxSpeed), maxStep: Math.round(maxStep) });
    console.log(JSON.stringify(report.at(-1)));
    if (maxStep >= 45) console.log(JSON.stringify(worst));
    assert(maxStep < 45, `${label}: navigation jumped ${maxStep}px between adjacent frames`);
    assert(maxSpeed < 1600, `${label}: discontinuous navigation (${maxSpeed}px/s)`);
  }
} finally { await browser.close(); }
