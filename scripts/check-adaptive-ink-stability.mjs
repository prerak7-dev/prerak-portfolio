import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  await page.waitForTimeout(500);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const navInk = await page.locator('.chapter-rail-list button strong.material-text').evaluateAll(nodes => nodes.map(node => node.style.getPropertyValue('--type-ink-color')));
  await page.getByRole('tab', { name: 'Cores', exact: true }).click({ force: true });
  await page.waitForFunction(() => document.querySelector('.chapter-rail')?.dataset.moving === 'true');
  for (let sample = 0; sample < 10; sample++) {
    await page.waitForTimeout(80);
    assert.deepEqual(await page.locator('.chapter-rail-list button strong.material-text').evaluateAll(nodes => nodes.map(node => node.style.getPropertyValue('--type-ink-color'))), navInk,
      'Orbital navigation must retain its pigment throughout the chapter flight');
  }
  await page.waitForFunction(() => document.querySelector('.chapter-rail')?.dataset.moving === 'false'
    && document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle'
    && !document.documentElement.classList.contains('theme-contour-transition-active'));
  await page.getByRole('tab', { name: 'Home', exact: true }).click({ force: true });
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapter === 'intro'
    && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete'
    && document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle'
    && !document.documentElement.classList.contains('theme-contour-transition-active'));
  // A deterministic two-tone painting exercises motion across a hard luminance
  // boundary without depending on the art's current ambient/parallax position.
  await page.evaluate(async () => {
    const root = document.querySelector('.archive-viewport');
    const canvas = document.createElement('canvas');
    canvas.width = innerWidth; canvas.height = innerHeight;
    const context = canvas.getContext('2d');
    context.fillStyle = '#000'; context.fillRect(0, 0, innerWidth / 2, innerHeight);
    context.fillStyle = '#fff'; context.fillRect(innerWidth / 2, 0, innerWidth / 2, innerHeight);
    const plate = document.createElement('div');
    plate.className = 'gateway-sequence-preloads';
    plate.style.cssText = 'position:fixed;inset:0;pointer-events:none';
    const image = new Image();
    image.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;opacity:0';
    image.src = canvas.toDataURL();
    await image.decode(); plate.append(image); root.prepend(plate);
    const probe = document.createElement('p');
    probe.id = 'adaptive-motion-probe'; probe.className = 'material-text';
    probe.textContent = 'Moving ink';
    probe.style.cssText = 'position:fixed;left:100px;top:400px;width:200px;height:32px;margin:0;font-size:24px';
    root.append(probe);
  });
  await page.waitForFunction(() => document.querySelector('#adaptive-motion-probe')?.dataset.adaptiveInk);
  const read = () => page.locator('#adaptive-motion-probe').evaluate(node => ({
    ink: node.style.getPropertyValue('--type-ink-color'),
    target: Number(node.style.getPropertyValue('--adaptive-wash-0')),
    current: Number(getComputedStyle(node).getPropertyValue('--adaptive-wash-0')),
    background: getComputedStyle(node).backgroundImage,
    transition: getComputedStyle(node).transitionProperty,
    mask: getComputedStyle(node).maskImage,
  }));
  const before = await read();
  assert(before.background.includes('cross-fade'), 'Browser-native wash blending is active');
  const move = (left, scrolling = false) => page.evaluate(({ left, scrolling }) => {
    const root = document.querySelector('.archive-viewport');
    document.querySelector('#adaptive-motion-probe').style.left = `${left}px`;
    root.dispatchEvent(new Event(scrolling ? 'scroll' : 'contour-reading-refresh'));
  }, { left, scrolling });
  await move(1050);
  await page.waitForFunction(target => Number(document.querySelector('#adaptive-motion-probe').style.getPropertyValue('--adaptive-wash-0')) !== target, before.target);
  await page.waitForTimeout(140);
  const during = await read();
  assert.equal(during.ink, before.ink, 'Crossing the boundary must not flip text polarity');
  assert(during.current > Math.min(before.target, during.target) && during.current < Math.max(before.target, during.target), 'Wash must interpolate rather than snap');
  assert(during.transition.includes('--adaptive-wash-0'));
  assert.equal(during.mask, before.mask, 'Adaptation must not take ownership of contour masks');
  // Reverse during the fade. Native transitions must resume from the visible
  // blend, not jump to either endpoint or stack more animation loops.
  await move(100);
  await page.waitForTimeout(100);
  const reversed = await read();
  assert.equal(reversed.ink, before.ink);
  assert(reversed.current > Math.min(before.target, during.target) && reversed.current < Math.max(before.target, during.target));
  await page.waitForTimeout(850);
  const settled = await read();
  assert(Math.abs(settled.current - settled.target) < .001);
  for (let step = 0; step < 12; step++) {
    await move(step % 2 ? 100 : 1050, true);
    await page.waitForTimeout(20);
    const scrolling = await read();
    assert.equal(scrolling.ink, settled.ink);
    assert.equal(scrolling.target, settled.target, 'Hold contrast while scrolling is in progress');
  }
  await move(1050, true);
  await page.waitForTimeout(1100);
  const final = await read();
  assert.notEqual(final.target, settled.target, 'Sample the final scroll position');
  assert(Math.abs(final.current - final.target) < .001);
  const refreshes = await page.locator('.archive-viewport').getAttribute('data-ink-refresh');
  await page.waitForTimeout(1100);
  assert.equal(await page.locator('.archive-viewport').getAttribute('data-ink-refresh'), refreshes, 'No idle sampling loop');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await move(100);
  await page.waitForTimeout(150);
  const reduced = await read();
  assert(Math.abs(reduced.current - reduced.target) < .001, 'Reduced-motion preference skips the blend');
  await page.emulateMedia({ forcedColors: 'active' });
  await page.waitForTimeout(100);
  assert.equal(await page.locator('[data-adaptive-ink]').count(), 0);
  assert.deepEqual(errors, []);
  console.log('PASS: orbital label stability, stable moving ink, gradual wash, smooth interrupted fade, scroll settling, reduced motion, forced colors, and zero idle sampling.');
} finally { await browser.close(); }
