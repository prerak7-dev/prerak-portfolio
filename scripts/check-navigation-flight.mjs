import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const output = 'tmp/navigation-flight';
await mkdir(output, { recursive: true });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const settled = () => page.waitForFunction(() => document.querySelector('.archive-viewport')?.classList.contains('chapter-settled') && document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle');
const flying = () => page.waitForFunction(() => Number(document.querySelector('.chapter-rail').dataset.motionProgress) > .2 && document.getAnimations().filter(animation => animation.id === 'chapter-rail-flight').length === 7);
const animations = () => page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'chapter-rail-flight').length);
const click = label => page.getByRole('tab', { name: label, exact: true }).click({ force: true });
try {
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await settled();
  const cdp = await page.context().newCDPSession(page);
  let layers = [];
  cdp.on('LayerTree.layerTreeDidChange', event => { layers = event.layers || []; });
  await cdp.send('LayerTree.enable');
  await click('Contact');
  await flying();
  const { root } = await cdp.send('DOM.getDocument');
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '.chapter-rail-list > button' });
  const reasons = [];
  for (const nodeId of nodeIds) {
    const { node } = await cdp.send('DOM.describeNode', { nodeId });
    const layer = layers.find(item => item.backendNodeId === node.backendNodeId);
    assert(layer, 'A travelling button has no compositor layer');
    const result = await cdp.send('LayerTree.compositingReasons', { layerId: layer.layerId });
    reasons.push(result.compositingReasons);
    assert(result.compositingReasons.some(reason => /active.*(translate|transform).*animation/i.test(reason)), JSON.stringify(result));
  }
  await page.screenshot({ path: `${output}/desktop-flight.png` });
  await settled();
  assert.equal(await animations(), 0);

  // Retarget from the visible pose if the viewport changes during a flight.
  await click('Home');
  await flying();
  await page.setViewportSize({ width: 1366, height: 650 });
  await settled();
  assert.equal(await animations(), 0);
  const rectangles = await page.locator('.chapter-rail-list > button').evaluateAll(nodes => nodes.map(node => {
    const { x, y, width, height } = node.getBoundingClientRect(); return { x, y, width, height };
  }));
  for (const a of rectangles) assert(a.x >= 15.5 && a.x + a.width <= 1350.5 && a.y >= 81.5 && a.y + a.height <= 572.5);

  await click('Field Notes');
  await flying();
  await page.setViewportSize({ width: 390, height: 844 });
  await settled();
  for (const viewport of [{ width: 390, height: 844 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(150);
    assert.equal(await page.locator('.chapter-rail').getAttribute('data-layout'), viewport.width > viewport.height ? 'contour' : 'compact');
    assert.equal(await animations(), 0);
    await page.screenshot({ path: `${output}/compact-${viewport.width}.png` });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(150);
  await click('Home');
  await flying();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(150);
  assert.equal(await animations(), 0, 'Reduced motion left a compositor flight running');
  await settled();
  await click('Cores');
  await settled();
  assert.equal(await animations(), 0);
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ compositorButtons: reasons.length, reasons: reasons[0], resize: 'passed', portraitAndLandscape: 'passed', reducedMotion: 'passed', errors }));
} finally { await browser.close(); }
