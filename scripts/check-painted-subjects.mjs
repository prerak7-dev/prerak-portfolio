import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright'), sharp = require('sharp');
const server = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint());
const output = 'tmp/painted-subjects', errors = [];
const selector = '.cinematic-environment > .cinematic-contour-dissolve';
await mkdir(output, { recursive: true });

async function open(theme, viewport) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /shader|WebGLProgram/i.test(message.text())) errors.push(message.text()); });
  await page.addInitScript(theme => localStorage.setItem('aegis-theme', theme), theme);
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => !document.querySelector('#boot-loader')
    && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  assert.equal(await page.locator(selector).evaluate(canvas => canvas.style.visibility), 'hidden');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForFunction(() => document.querySelector('.cinematic-environment > .cinematic-contour-dissolve').dataset.actorState === 'looping');
  await page.waitForTimeout(1700);
  await page.evaluate(() => {
    // Real artwork must move even with the decorative particle pass removed.
    document.querySelector('.living-pigment-field').style.display = 'none';
    const canvas = document.querySelector('.cinematic-environment > .cinematic-contour-dissolve');
    const gl = canvas.getContext('webgl2'), draw = gl.drawElements.bind(gl);
    const locations = new WeakMap();
    window.capturePaintedActor = () => new Promise(resolve => { window.pendingActorCapture = resolve; });
    gl.drawElements = (...args) => {
      draw(...args);
      if (!window.pendingActorCapture) return;
      const program = gl.getParameter(gl.CURRENT_PROGRAM);
      if (!locations.has(program)) locations.set(program, gl.getUniformLocation(program, 'uActorIdle'));
      if (gl.getUniform(program, locations.get(program)) < .5) return;
      const resolve = window.pendingActorCapture;
      window.pendingActorCapture = null;
      resolve({ png: canvas.toDataURL(), width: canvas.width, height: canvas.height,
        time: Number(canvas.dataset.actorTime), stats: { ...canvas.dataset } });
    };
  });
  return page;
}

async function chapter(page, label, id) {
  const tab = page.getByRole('tab', { name: label, exact: true, includeHidden: true });
  if (await tab.isVisible() && await tab.getAttribute('aria-hidden') !== 'true') { await tab.focus(); await page.keyboard.press('Enter'); }
  else await tab.evaluate(node => node.click());
  await page.waitForFunction(id => {
    const root = document.querySelector('.archive-viewport'), canvas = document.querySelector('.cinematic-environment > .cinematic-contour-dissolve');
    return root.dataset.chapter === id && root.dataset.chapterCopyPhase === 'idle'
      && root.classList.contains('chapter-settled') && canvas.dataset.actorState === 'looping';
  }, id, { timeout: 45000 });
  await page.mouse.move(4, 300);
  await page.waitForTimeout(200);
}

async function measure(page, sceneIndex, label) {
  const regions = await page.evaluate(async sceneIndex => {
    const { getPaintedSubjects } = await import('/prerak-portfolio/src/data/paintedSubjects.js');
    const { PIGMENT_SCENE_SELECTORS } = await import('/prerak-portfolio/src/data/livingPigmentArt.js');
    const { readSceneImageProjection } = await import('/prerak-portfolio/src/utils/cinematicGeometryRenderer.js');
    const { getSceneCoverProjection } = await import('/prerak-portfolio/src/data/cinematicViewport.js');
    const image = document.querySelector(PIGMENT_SCENE_SELECTORS[sceneIndex]);
    const projection = readSceneImageProjection(image, getSceneCoverProjection(innerWidth, innerHeight), innerWidth);
    const portrait = image.naturalHeight > image.naturalWidth;
    return { projection, viewportWidth: innerWidth, viewportHeight: innerHeight, portrait,
      subjects: getPaintedSubjects(sceneIndex, portrait) };
  }, sceneIndex);
  const capture = () => page.evaluate(() => window.capturePaintedActor());
  const before = await capture();
  await page.waitForTimeout(1400);
  const after = await capture();
  assert(after.time > before.time + .4, `${label}: the subject clock must advance at rest`);
  assert.equal(Number(after.stats.actorDrawCalls), 1, 'Subject animation shares one existing background draw');
  assert(Number(after.stats.sceneTextures) <= 6 && Number(after.stats.geometryTextures) <= 12);
  assert(after.width * after.height <= 3686500);
  const first = await sharp(Buffer.from(before.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
  const second = await sharp(Buffer.from(after.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
  const sx = after.width / regions.viewportWidth, sy = after.height / regions.viewportHeight;
  const p = regions.projection;
  for (const subject of regions.subjects) {
    const [cx, cy, rx, ry] = subject.region;
    const left = Math.max(0, Math.floor((p.left + (cx - rx) * p.width) * sx));
    const right = Math.min(after.width, Math.ceil((p.left + (cx + rx) * p.width) * sx));
    const top = Math.max(0, Math.floor((p.top + (cy - ry) * p.height) * sy));
    const bottom = Math.min(after.height, Math.ceil((p.top + (cy + ry) * p.height) * sy));
    let changed = 0, visible = 0;
    for (let y = top; y < bottom; y++) for (let x = left; x < right; x++) {
      const offset = (y * after.width + x) * 4;
      if (Math.max(first[offset + 3], second[offset + 3]) <= 18) continue;
      visible++;
      if (Math.abs(first[offset] - second[offset]) + Math.abs(first[offset + 1] - second[offset + 1])
        + Math.abs(first[offset + 2] - second[offset + 2]) > 18) changed++;
    }
    assert(visible < 60 || changed >= 6, `${label}: ${subject.name} must move its actual artwork (${changed}/${visible})`);
    console.log(`${label}: ${subject.name}, ${changed} changed painted pixels / ${visible} visible pixels`);
  }
  if (sceneIndex === 0) {
    const pins = regions.portrait ? [[.135, .461], [.14, .48], [.129, .52]] : [[.094, .412], [.097, .44], [.097, .498]];
    for (const [u, v] of pins) {
      const x = Math.round((p.left + u * p.width) * sx), y = Math.round((p.top + v * p.height) * sy);
      if (x < 0 || x >= after.width || y < 0 || y >= after.height) continue;
      const alpha = second[(y * after.width + x) * 4 + 3];
      assert(alpha < 5, `${label}: the head, shoulder and feet cannot be moved by a neighboring effect (${alpha})`);
    }
  }
  await page.screenshot({ path: `${output}/${label}.png` });
  return after.time;
}

try {
  const page = await open('default-light', { width: 1440, height: 900 });
  await measure(page, 0, 'desktop-home');
  for (const [label, id, scene] of [['Cores', 'cores', 1], ['Case Studies', 'projects', 2],
    ['Education', 'education', 3], ['Field Notes', 'personal', 4], ['Contact', 'contact', 5]]) {
    await chapter(page, label, id); await measure(page, scene, `desktop-${id}`);
  }
  await chapter(page, 'Case Studies', 'projects');
  let lastTime = Number(await page.locator(selector).getAttribute('data-actor-time'));
  for (const [label, theme] of [['Fall', 'fall-light'], ['Spring', 'spring-light'], ['Winter', 'winter-light'], ['Monochrome', 'default-light']]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForFunction(theme => document.querySelector('.archive-app').classList.contains(`theme-${theme}`)
      && !document.documentElement.classList.contains('theme-contour-transition-active'), theme, { timeout: 45000 });
    await page.mouse.move(4, 300);
    lastTime = await measure(page, 2, theme);
    await page.getByRole('switch', { name: 'Light appearance' }).click();
    await page.waitForFunction(theme => document.querySelector('.archive-app').classList.contains(`theme-${theme}`)
      && !document.documentElement.classList.contains('theme-contour-transition-active'), theme.replace('-light', ''), { timeout: 45000 });
    const darkTime = await measure(page, 2, theme.replace('-light', ''));
    assert(darkTime > lastTime, 'Appearance changes cannot restart the subject pose');
    await page.getByRole('switch', { name: 'Light appearance' }).click();
    await page.waitForFunction(theme => document.querySelector('.archive-app').classList.contains(`theme-${theme}`)
      && !document.documentElement.classList.contains('theme-contour-transition-active'), theme, { timeout: 45000 });
  }
  await page.close();

  const mobile = await open('spring', { width: 390, height: 844 });
  await measure(mobile, 0, 'portrait-home');
  for (const [label, id, scene] of [['Cores', 'cores', 1], ['Case Studies', 'projects', 2],
    ['Education', 'education', 3], ['Field Notes', 'personal', 4], ['Contact', 'contact', 5]]) {
    await chapter(mobile, label, id); await measure(mobile, scene, `portrait-${id}`);
  }
  await mobile.setViewportSize({ width: 844, height: 390 });
  await chapter(mobile, 'Case Studies', 'projects');
  await measure(mobile, 2, 'mobile-landscape');
  await mobile.emulateMedia({ reducedMotion: 'reduce' });
  await mobile.waitForFunction(() => document.querySelector('.cinematic-environment > .cinematic-contour-dissolve').dataset.actorState === 'reduced-motion');
  const paused = Number(await mobile.locator(selector).getAttribute('data-actor-time'));
  await mobile.waitForTimeout(300);
  assert.equal(Number(await mobile.locator(selector).getAttribute('data-actor-time')), paused);
  assert.equal(await mobile.locator(selector).evaluate(canvas => canvas.style.visibility), 'hidden');
  assert.deepEqual(errors, []);
  console.log('PASS: actual painted subjects move on every chapter, all eight appearances and both mobile layouts; reduced motion stops them.');
} catch (error) {
  console.error(error); process.exitCode = 1;
  for (const [index, context] of browser.contexts().entries()) for (const page of context.pages()) {
    console.log(await page.locator(selector).evaluate(canvas => ({ ...canvas.dataset })).catch(() => ({})));
    await page.screenshot({ path: `${output}/failure-${index}.png` }).catch(() => {});
  }
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL'); await new Promise(resolve => setTimeout(resolve, 250)); process.exit(process.exitCode || 0);
  } else await server.close();
}
