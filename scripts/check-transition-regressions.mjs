import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const output = 'tmp/transition-regressions';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
await page.addInitScript(() => {
  window.transitionAudit = { encodes: 0, frames: [], shifts: [] };
  const encode = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function(...args) { window.transitionAudit.encodes++; return encode.apply(this, args); };
});
const settled = () => page.waitForFunction(() => document.querySelector('.archive-viewport')?.classList.contains('chapter-settled') && !document.querySelector('.text-contour-ghosts'));
async function chapter(label, id) {
  const tab = page.getByRole('tab', { name: label, exact: true });
  await tab.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(id => document.querySelector('.archive-viewport').dataset.chapter === id, id);
  await settled();
}
try {
  await page.goto(url);
  await settled();
  await page.screenshot({ path: `${output}/home-desktop.png` });
  await page.evaluate(() => {
    window.transitionAudit.encodes = 0;
    const sample = timestamp => {
      const rect = document.querySelector('.archive-identity strong').getBoundingClientRect();
      window.transitionAudit.frames.push(timestamp);
      window.transitionAudit.shifts.push([rect.x, rect.y, rect.width, rect.height]);
      window.auditFrame = requestAnimationFrame(sample);
    };
    window.auditFrame = requestAnimationFrame(sample);
  });
  await page.getByRole('button', { name: 'Spring', exact: true }).click();
  await page.waitForSelector('.text-contour-ghosts');
  const alignment = await page.evaluate(() => [...document.querySelectorAll('.text-contour-ghosts > div > *')]
    .filter(node => node.textContent === 'Prerak Pandey' || node.textContent === 'Wonderer,').map(clone => {
      const original = [...document.querySelectorAll('.archive-viewport .material-text')].find(node => node.textContent === clone.textContent);
      const box = node => { const range = document.createRange(); range.selectNodeContents(node); const r = range.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; };
      return Math.max(...box(original).map((value, index) => Math.abs(value - box(clone)[index])));
    }));
  assert(alignment.length === 2 && Math.max(...alignment) < 1, `Snapshot glyph shift: ${alignment}`);
  await settled();
  const audit = await page.evaluate(() => { cancelAnimationFrame(window.auditFrame); return window.transitionAudit; });
  assert(audit.encodes <= 1, `Repeated mask encoding: ${audit.encodes}`);
  assert(Math.max(...audit.shifts.map(rect => Math.max(...rect.map((value, i) => Math.abs(value - audit.shifts[0][i]))))) < 1);
  const intervals = audit.frames.slice(1).map((time, i) => time - audit.frames[i]).sort((a,b) => a-b);
  console.log(JSON.stringify({ encodes: audit.encodes, frames: intervals.length, p50: intervals[Math.floor(intervals.length*.5)], p95: intervals[Math.floor(intervals.length*.95)], max: intervals.at(-1), glyphShift: Math.max(...alignment) }));

  await page.getByRole('tab', { name: 'Cores', exact: true }).locator('strong').click();
  await page.waitForSelector('.text-contour-ghosts');
  const railMotion = await page.evaluate(async () => {
    const samples = [];
    while (document.querySelector('.text-contour-ghosts')) {
      const node = document.querySelector('.chapter-rail-list > button');
      samples.push([parseFloat(node.style.getPropertyValue('--chapter-tab-x')), parseFloat(node.style.getPropertyValue('--chapter-tab-y'))]);
      await new Promise(requestAnimationFrame);
    }
    return samples;
  });
  const travel = Math.hypot(...railMotion[0].map((value, index) => value - railMotion.at(-1)[index]));
  assert(travel > 100 && railMotion.length > 20, 'Navigation must travel through intermediate curve positions');
  assert(Math.max(...railMotion.slice(1).map((point, i) => Math.hypot(...point.map((value, j) => value - railMotion[i][j])))) < travel * .3, 'Navigation snapped between curves');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${output}/chapter-mid.png` });
  await settled();
  assert.equal(await page.locator('.contour-cores .contour-record').count(), 3);
  await page.screenshot({ path: `${output}/cores-desktop.png` });
  await page.setViewportSize({ width: 1366, height: 650 });
  await page.waitForTimeout(200);
  assert(await page.locator('.chapter-rail').evaluate(node => node.classList.contains('is-orbit-ready')));
  const ys = await page.locator('.chapter-rail-list > button').evaluateAll(nodes => nodes.map(node => parseFloat(node.style.getPropertyValue('--chapter-tab-y'))));
  assert(Math.max(...ys) - Math.min(...ys) > 5, 'The authored curve must not flatten into a dock');
  await page.screenshot({ path: `${output}/cores-short-desktop.png` });

  await chapter('Case Studies', 'projects');
  const overview = await page.locator('.contour-projects .contour-record').first().innerText();
  assert(await page.locator('.contour-projects .contour-record').count() > 5);
  await page.getByRole('button', { name: 'Plugin', exact: true }).click();
  await page.waitForSelector('.text-contour-ghosts');
  await page.waitForFunction(() => !document.querySelector('.text-contour-ghosts'));
  assert.notEqual(await page.locator('.contour-projects .contour-record').first().innerText(), overview);
  await page.getByRole('button', { name: 'Telemetry', exact: true }).click();
  await page.waitForSelector('.text-contour-ghosts');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() => !document.querySelector('.text-contour-ghosts'));
  assert.equal(await page.locator('.material-text[style*="mask-image"]').count(), 0);

  for (const [width, height] of [[390,844],[320,568],[844,390]]) {
    await page.setViewportSize({ width, height });
    await chapter('Home', 'intro');
    const collapse = page.getByRole('button', { name: 'Collapse lore guide' });
    if (await collapse.count()) { await collapse.click(); await page.waitForFunction(() => !document.querySelector('.text-contour-ghosts')); }
    await page.waitForTimeout(200);
    assert.equal(await page.locator('.home-beat-controls').count(), 0);
    for (const selector of ['.intro-manifesto', '.intro-role-orbit', '.intro-actions', '.intro-status']) assert(await page.locator(selector).isVisible(), `${selector} missing on ${width}`);
    const order = await page.locator('.intro-copy-stage > *').evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return [r.top,r.bottom]; }));
    for (let i=1;i<order.length;i++) assert(order[i][0] >= order[i-1][1], `Home copy overlaps at ${width}`);
    await page.screenshot({ path: `${output}/home-${width}.png` });
  }

  // Pixel-check the actual SVG/CSS mask, not just its style declarations.
  const maskPage = await browser.newPage({ viewport: { width: 320, height: 240 } });
  await maskPage.goto(url);
  await maskPage.evaluate(async () => {
    const { createTextContourRenderer } = await import('/prerak-portfolio/src/utils/textContourRenderer.js');
    const { getTracerSceneField } = await import('/prerak-portfolio/src/data/tracerSceneFields.js');
    const { getCinematicGeometryAsset } = await import('/prerak-portfolio/src/data/cinematicAssets.js');
    const geometry = new Image(); geometry.src = '/prerak-portfolio/' + getCinematicGeometryAsset('default', 1, 0); await geometry.decode();
    const host = document.createElement('div'); host.style.cssText = 'position:fixed;inset:0;background:black;z-index:9999';
    const face = document.createElement('div'); face.style.cssText = 'position:absolute;inset:0;background:white';
    host.append(face); document.body.append(host);
    const renderer = createTextContourRenderer();
    renderer.configure(geometry, { left:0, top:0, width:320, height:240 }, getTracerSceneField('default', 1),320,240);
    face.style.maskImage = renderer.mask({left:0,top:0,width:320,height:240});
    window.maskAudit = { renderer, host };
  });
  const pixels = [];
  for (const progress of [0,.28,1]) {
    await maskPage.evaluate(progress => window.maskAudit.renderer.draw(progress), progress);
    await maskPage.waitForTimeout(80);
    const bytes = await maskPage.screenshot({ path: `${output}/mask-${progress}.png` });
    const {data,info} = await sharp(bytes).removeAlpha().raw().toBuffer({resolveWithObject:true});
    const counts = {clear:0,opaque:0,edge:0};
    for(let i=0;i<data.length;i+=info.channels) { if(data[i] < 3) counts.clear++; else if(data[i]>252) counts.opaque++; else counts.edge++; }
    pixels.push(counts);
  }
  assert.equal(pixels[0].opaque + pixels[0].edge,0);
  assert(pixels[1].clear && pixels[1].opaque && pixels[1].edge, JSON.stringify(pixels));
  assert.equal(pixels[2].clear + pixels[2].edge,0);
  await maskPage.close();
  const animations = await page.locator('.archive-scene.active .material-text, .archive-identity .material-text').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).animationName));
  assert(animations.every(name => name === 'none'));
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ curveRestored:true, continuousCopy:true, pixelMasks:pixels, errors }));
} finally { await browser.close(); }
