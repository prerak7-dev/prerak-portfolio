import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { getCelestialTracerFocus } from '../src/data/celestialTracerFocus.js';
import { getCelestialTracerGeometry } from '../src/utils/celestialTracers.js';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright'), sharp = require('sharp');
const names = ['home', 'cores', 'systems', 'chronology', 'field', 'surface'];
const output = 'tmp/celestial-tracers';
await mkdir(output, { recursive: true });

for (const season of ['default', 'fall', 'spring', 'winter']) for (const light of ['light', 'dark']) {
  for (const portrait of [false, true]) for (let scene = 0; scene < 6; scene++) {
    const filename = `public/cinematic/painted-v1/${season}/${light}/${portrait ? 'portrait/' : ''}geometry/${names[scene]}.webp`;
    const data = await sharp(filename).resize(640, 360).ensureAlpha().raw().toBuffer();
    const field = { filename, width: 640, height: 360, data };
    const focused = getCelestialTracerGeometry(field, scene, portrait), focus = getCelestialTracerFocus(scene, portrait);
    assert.equal(getCelestialTracerGeometry(field, scene, portrait), focused, 'Focused geometry is cached, not retraced every frame');
    assert(focused.streamlines.length > 0 && focused.streamlines.length <= 12, `${filename}: no primary-body paths`);
    for (const { points } of focused.streamlines) for (const point of points) {
      assert(point.y <= focus.maxY, `${filename}: path enters the foreground`);
      const radius = Math.hypot((point.x - focus.centerX) / focus.radiusX, (point.y - focus.centerY) / focus.radiusY);
      assert(Math.abs(radius - 1) <= focus.band * 1.42 + 1e-8, `${filename}: path leaves the primary body`);
    }
  }
}
console.log('PASS: all 96 seasonal chapter maps produce bounded primary-body paths.');

const server = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint()), errors = [];
const selector = '.cinematic-atmosphere-field:not([data-tracer-outgoing])';
async function settled(page, chapter) {
  await page.waitForFunction(chapter => {
    const root = document.querySelector('.archive-viewport');
    return root.dataset.chapter === chapter && root.dataset.chapterCopyPhase === 'idle'
      && root.classList.contains('chapter-settled')
      && !document.querySelector('.cinematic-environment > .cinematic-contour-dissolve').dataset.dissolveSource
      && !document.querySelector('[data-tracer-outgoing]')
      && !document.documentElement.matches('.theme-assets-preparing, .theme-contour-transition-active');
  }, chapter, { timeout: 45000 });
}
async function audit(page, scene, label) {
  const result = await page.evaluate(async scene => {
    const { getCelestialTracerFocus } = await import('/prerak-portfolio/src/data/celestialTracerFocus.js');
    const { PIGMENT_SCENE_SELECTORS } = await import('/prerak-portfolio/src/data/livingPigmentArt.js');
    const { readSceneImageProjection } = await import('/prerak-portfolio/src/utils/cinematicGeometryRenderer.js');
    const canvas = document.querySelector('.cinematic-atmosphere-field:not([data-tracer-outgoing])');
    const image = document.querySelector(PIGMENT_SCENE_SELECTORS[scene]);
    const focus = getCelestialTracerFocus(scene, image.naturalHeight > image.naturalWidth);
    const p = readSceneImageProjection(image, null, innerWidth), ratio = canvas.width / innerWidth;
    const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    const slack = 2 / (Math.min(focus.radiusX * p.width, focus.radiusY * p.height) * ratio);
    let visible = 0, outside = 0;
    for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {
      if (pixels[(y * canvas.width + x) * 4 + 3] < 8) continue;
      visible++;
      const u = (x / ratio - p.left) / p.width, v = (y / ratio - p.top) / p.height;
      const distance = Math.hypot((u - focus.centerX) / focus.radiusX, (v - focus.centerY) / focus.radiusY);
      if (Math.abs(distance - 1) > focus.band * 1.42 + slack || v > focus.maxY + 2 / (ratio * p.height)) outside++;
    }
    return { visible, outside, budget: Number(canvas.dataset.tracerBudget), body: canvas.dataset.tracerBody };
  }, scene);
  assert(result.visible > 8, `${label}: tracer pass is blank: ${JSON.stringify(result)}`);
  assert.equal(result.outside, 0, `${label}: strokes or heads escape the celestial body`);
  assert.equal(result.budget, page.viewportSize().width > 1100 && page.viewportSize().height > 500 ? 8 : 5);
  console.log(`${label}: ${JSON.stringify(result)}`);
  await page.screenshot({ path: `${output}/${label}.png` });
}
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => localStorage.setItem('aegis-theme', 'default-light'));
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => !document.querySelector('#boot-loader')
      && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(1800);
    await page.evaluate(() => {
      window.celestialDissolves = [];
      const sample = () => {
        const canvas = document.querySelector('.cinematic-atmosphere-field:not([data-tracer-outgoing])');
        if (canvas?.dataset.tracerDissolve) celestialDissolves.push({ phase: canvas.dataset.tracerDissolve, mask: canvas.style.maskImage });
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await audit(page, 0, `${viewport.width}-home`);
    for (const [label, id, scene] of [['Cores', 'cores', 1], ['Case Studies', 'projects', 2],
      ['Education', 'education', 3], ['Field Notes', 'personal', 4], ['Contact', 'contact', 5]]) {
      await page.getByRole('tab', { name: label, exact: true, includeHidden: true }).evaluate(node => node.click());
      await settled(page, id); await page.waitForTimeout(180);
      await audit(page, scene, `${viewport.width}-${id}`);
    }
    await page.getByRole('tab', { name: 'Cores', exact: true, includeHidden: true }).evaluate(node => node.click());
    await settled(page, 'cores');
    await page.getByRole('button', { name: 'Winter', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.archive-app').classList.contains('theme-winter-light'));
    await settled(page, 'cores'); await audit(page, 1, `${viewport.width}-winter-sun`);
    const phases = await page.evaluate(() => celestialDissolves);
    for (const phase of ['outgoing', 'incoming', 'crossfade']) assert(phases.some(frame => frame.phase === phase && frame.mask), `${phase}: tracer contour mask missing`);
    if (viewport.width === 390) {
      await page.setViewportSize({ width: 844, height: 390 });
      await page.waitForTimeout(1600); await audit(page, 1, '844-landscape-sun');
    }
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: visible strokes stay on the primary body in desktop/phone/landscape; contour handoffs remain active.');
} catch (error) {
  console.error(error); process.exitCode = 1;
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL'); await new Promise(resolve => setTimeout(resolve, 250)); process.exit(process.exitCode || 0);
  } else await server.close();
}
