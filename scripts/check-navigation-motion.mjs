import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const width = Number(process.argv[2] || process.env.VIEWPORT_WIDTH || 1440);
const height = Number(process.argv[3] || process.env.VIEWPORT_HEIGHT || 900);
const page = await browser.newPage({ viewport: { width, height } });
const output = 'tmp/navigation-contour';
await mkdir(output, { recursive: true });
const report = [];
try {
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle');
  const drift = await page.evaluate(async () => {
    const image = document.querySelector('.gateway-sequence-preloads img');
    const tab = document.querySelector('.chapter-rail-list > button');
    const before = tab.getBoundingClientRect();
    const imageBefore = image.getBoundingClientRect();
    const previous = image.style.translate;
    image.style.translate = '-24px 0px';
    await new Promise(resolve => setTimeout(resolve, 180));
    const after = tab.getBoundingClientRect();
    const imageAfter = image.getBoundingClientRect();
    image.style.translate = previous;
    return { tabX: after.x - before.x, imageX: imageAfter.x - imageBefore.x };
  });
  assert(Math.abs(drift.tabX - drift.imageX) < 3 && drift.tabX < -15, `Rail detached from live contour: ${JSON.stringify(drift)}`);
  console.log(JSON.stringify({ viewport: [width, height], followsLiveContour: drift }));
  await page.waitForTimeout(200);
  for (const label of process.argv.includes('--wheel-only') ? [] : ['Cores', 'Case Studies', 'Experience', 'Education', 'Field Notes', 'Contact', 'Home']) {
    await page.evaluate(() => {
      window.railFrames = [];
      const sample = time => {
        const points = [...document.querySelectorAll('.chapter-rail-list > button')].map(node => {
          const r = node.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height };
        });
        const rail = document.querySelector('.chapter-rail');
        const flights = document.getAnimations().filter(animation => animation.id === 'chapter-rail-flight');
        window.railFrames.push({ time, points, progress: rail.dataset.motionProgress, source: rail.dataset.motionSource, flights: flights.length });
        window.railFrame = requestAnimationFrame(sample);
      };
      window.railFrame = requestAnimationFrame(sample);
    });
    // Satellites intentionally follow the drifting painting, so don't wait for
    // Playwright's two-frame stationary-element heuristic before clicking.
    await page.getByRole('tab', { name: label, exact: true }).click({ force: true });
    await page.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('chapter-transitioning'));
    await page.waitForFunction(() => {
      const rail = document.querySelector('.chapter-rail');
      return rail.dataset.motionSource === 'chapter' && Number(rail.dataset.motionProgress) > .45;
    });
    const orbitDirections = await page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'chapter-rail-flight').map(animation => {
      const frames = animation.effect.getKeyframes();
      const [a, mid, b] = [frames[0], frames[60], frames.at(-1)].map(frame => new DOMMatrix(frame.transform));
      const sweep = (b.m41 - a.m41) * (mid.m42 - (a.m42 + b.m42) / 2) - (b.m42 - a.m42) * (mid.m41 - (a.m41 + b.m41) / 2);
      return Math.abs(sweep) > .1 ? Math.sign(sweep) : 0;
    }));
    assert(new Set(orbitDirections.filter(Boolean)).size <= 1, `${label}: Home or another tab broke away from the shared orbital direction`);
    await page.screenshot({ path: `${output}/${width}-${label.replaceAll(' ', '-')}-midpoint.png` });
    await page.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('chapter-settled') && document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle');
    await page.waitForFunction(() => document.querySelector('.chapter-rail').dataset.moving === 'false', null, { timeout: 8000 });
    const frames = await page.evaluate(() => { cancelAnimationFrame(window.railFrame); return window.railFrames; });
    assert(frames.some(frame => frame.flights === 7), `${label}: flight not delegated to the compositor`);
    assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'chapter-rail-flight').length), 0, 'Flight animation leaked after arrival');
    if (label === 'Cores') {
      for (const interval of [[.28, .38], [.58, .68]]) {
        const a = frames.find(frame => frame.source === 'chapter' && Number(frame.progress) >= interval[0]);
        const b = frames.find(frame => frame.source === 'chapter' && Number(frame.progress) >= interval[1]);
        assert(a && b, 'Missing contour choreography samples');
        for (const axis of ['x', 'y']) assert(a.points.reduce((sum, point, i) => sum + Math.abs(point[axis] - b.points[i][axis]), 0) > 5, `${axis} paused in a transit lane`);
      }
    }
    let maxSpeed = 0;
    let maxStep = 0;
    let worst;
    for (let f = 1; f < frames.length; f++) {
      const current = frames[f];
      const previous = frames[f - 1];
      for (let i = 0; i < current.points.length; i++) {
        const a = current.points[i];
        assert(a.x >= 15.5 && a.x + a.width <= width - 15.5 && a.y >= 81.5 && a.y + a.height <= height - 77.5, `${label}: tab left the usable viewport ${JSON.stringify({ i, progress: current.progress, rect: a })}`);
        const p = previous.points[i];
        const step = Math.hypot(a.x - p.x, a.y - p.y);
        let start = f - 1;
        while (start > 0 && current.time - frames[start].time < 60) start--;
        if (current.time - frames[start].time >= 60) {
          const origin = frames[start].points[i];
          maxSpeed = Math.max(maxSpeed, Math.hypot(a.x - origin.x, a.y - origin.y) / (current.time - frames[start].time) * 1000);
        }
        if (current.time - previous.time < 25 && step > maxStep) { maxStep = step; worst = { i, current, previous }; }
        // Overlap is allowed while travelling, but never at a settled destination.
        for (const b of current.source === 'scroll' ? current.points.slice(i + 1) : []) {
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
  // Scroll the background, not Home's intentionally independent copy scroller.
  await page.mouse.move(width - 4, height * .6);
  for (const delta of [height * 3, -height * 3]) {
    await page.evaluate(() => {
      window.scrollRailSamples = [];
      const sample = () => {
        const rail = document.querySelector('.chapter-rail');
        const tab = rail.querySelectorAll('button[role="tab"]')[3].getBoundingClientRect();
        window.scrollRailSamples.push({ x: tab.x, y: tab.y, progress: Number(rail.dataset.motionProgress), source: rail.dataset.motionSource });
        window.scrollRailFrame = requestAnimationFrame(sample);
      };
      window.scrollRailFrame = requestAnimationFrame(sample);
    });
    for (let step = 0; step < 10; step++) {
      await page.mouse.wheel(0, delta / 10);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(2600);
    const samples = await page.evaluate(() => { cancelAnimationFrame(window.scrollRailFrame); return window.scrollRailSamples; });
    const moving = samples.filter(sample => sample.progress > .02 && sample.progress < .98);
    console.log(JSON.stringify({ wheel: delta > 0 ? 'forward' : 'reverse', movingFrames: moving.length, distinctPositions: new Set(moving.map(sample => `${Math.round(sample.x)},${Math.round(sample.y)}`)).size }));
    assert(moving.length > 12 && moving.every(sample => sample.source === 'scroll'), 'Wheel navigation skipped contour choreography');
    assert(new Set(moving.map(sample => `${Math.round(sample.x)},${Math.round(sample.y)}`)).size > 12, 'Wheel navigation snapped between destinations');
    console.log(JSON.stringify({ wheel: delta > 0 ? 'forward' : 'reverse', contourFrames: moving.length }));
  }
} finally { await browser.close(); }
