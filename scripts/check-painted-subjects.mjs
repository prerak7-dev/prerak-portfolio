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
    window.capturePaintedActor = (time = null, count = null, actorIndex = null, travel = null) => new Promise(resolve => {
      window.pendingActorCapture = { resolve, time, count, actorIndex, travel };
    });
    gl.drawElements = (...args) => {
      const program = gl.getParameter(gl.CURRENT_PROGRAM);
      if (!locations.has(program)) locations.set(program, {
        idle: gl.getUniformLocation(program, 'uActorIdle'), time: gl.getUniformLocation(program, 'uActorTime'),
        strength: gl.getUniformLocation(program, 'uActorStrength'), count: gl.getUniformLocation(program, 'uOutgoingActorCount'),
        projection: gl.getUniformLocation(program, 'uProjection'), travel: gl.getUniformLocation(program, 'uActorTravel'),
      });
      const uniforms = locations.get(program), pending = window.pendingActorCapture;
      if (!pending || gl.getUniform(program, uniforms.idle) < .5) { draw(...args); return; }
      const original = { time: gl.getUniform(program, uniforms.time), strength: gl.getUniform(program, uniforms.strength),
        count: gl.getUniform(program, uniforms.count), projection: gl.getUniform(program, uniforms.projection),
        travel: gl.getUniform(program, uniforms.travel) };
      const restoredActors = [];
      if (pending.actorIndex !== null) {
        for (const [name, size] of [['Regions', 4], ['Motion', 4], ['Edges', 2]]) {
          const location = gl.getUniformLocation(program, `uOutgoingActor${name}[0]`);
          const selected = gl.getUniformLocation(program, `uOutgoingActor${name}[${pending.actorIndex}]`);
          restoredActors.push({ location, size, value: gl.getUniform(program, location) });
          gl[`uniform${size}fv`](location, gl.getUniform(program, selected));
        }
        gl.uniform1i(uniforms.count, 1);
      }
      if (pending.time !== null) {
        gl.uniform1f(uniforms.time, pending.time); gl.uniform1f(uniforms.strength, 1);
        window.actorAuditProjection ??= original.projection;
        gl.uniform4fv(uniforms.projection, window.actorAuditProjection);
      }
      if (pending.count !== null) gl.uniform1i(uniforms.count, pending.count);
      if (pending.travel !== null) gl.uniform2f(uniforms.travel, pending.travel, pending.travel);
      draw(...args);
      gl.uniform1f(uniforms.time, original.time); gl.uniform1f(uniforms.strength, original.strength);
      gl.uniform1i(uniforms.count, original.count);
      gl.uniform4fv(uniforms.projection, original.projection);
      gl.uniform2fv(uniforms.travel, original.travel);
      for (const { location, size, value } of restoredActors) gl[`uniform${size}fv`](location, value);
      window.pendingActorCapture = null;
      pending.resolve({ png: canvas.toDataURL(), width: canvas.width, height: canvas.height,
        time: pending.time ?? original.time, stats: { ...canvas.dataset } });
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
  await page.evaluate(() => { window.actorAuditProjection = null; });
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
  const orbitIndex = regions.subjects.findIndex(subject => subject.kind === 'orbit');
  if ((/^(desktop|portrait)-/.test(label) || sceneIndex === 0) && orbitIndex >= 0) {
    const pixelsAt = async (time, travel = 0) => {
      const frame = await page.evaluate(({ time, index, travel }) => window.capturePaintedActor(time, null, index, travel),
        { time, index: orbitIndex, travel });
      return sharp(Buffer.from(frame.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
    };
    const difference = (a, b) => {
      let change = 0, visible = 0;
      for (let i = 0; i < a.length; i += 4) {
        if (Math.min(a[i + 3], b[i + 3]) < 180) continue;
        change += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]); visible++;
      }
      assert(visible > 100, `${label}: the actual celestial body must be visible`);
      return change / (visible * 3);
    };
    const period = regions.subjects[orbitIndex].period, movement = [];
    for (const phase of [0, .125, .25, .375, .5, .625, .75, .875]) {
      const time = period * (2 + phase);
      movement.push(difference(await pixelsAt(time), await pixelsAt(time + .25)));
    }
    assert(Math.min(...movement) > .5 && Math.min(...movement) / Math.max(...movement) > .14,
      `${label}: motion must continue across the full cycle: ${JSON.stringify(movement)}`);
    const closure = difference(await pixelsAt(period * 2), await pixelsAt(period * 3));
    assert(closure < .08, `${label}: the loop must close exactly (${closure})`);
    for (const phase of [2, 2.5]) {
      assert(difference(await pixelsAt(period * phase - .001), await pixelsAt(period * phase + .001))
        < Math.max(...movement) * .06, `${label}: a hidden flow reset cannot flash or snap`);
    }
    if (sceneIndex === 0) {
      assert(difference(await pixelsAt(period, -.4), await pixelsAt(period, .4)) > .5,
        `${label}: the Home moon must respond to scroll direction`);
      const moon = await pixelsAt(period * 2.25);
      const horizon = regions.subjects[orbitIndex].horizon + (regions.portrait ? .005 : .009);
      for (let y = Math.max(0, Math.ceil((p.top + horizon * p.height) * sy)); y < after.height; y++) {
        for (let x = 0; x < after.width; x++) assert(moon[(y * after.width + x) * 4 + 3] < 3,
          `${label}: moon animation must leave the gate and foreground untouched`);
      }
    }
    console.log(`${label}: full-cycle motion ${Math.min(...movement).toFixed(2)}-${Math.max(...movement).toFixed(2)}, both loop seams continuous`);
  }
  if (sceneIndex === 1) {
    // Solar rotation must never sample the foreground into its face or move
    // the sea below the sun, including at quarter and half turns.
    for (const time of [16.5, 33, 49.5]) {
      const frame = await page.evaluate(time => window.capturePaintedActor(time, 3), time);
      const pixels = await sharp(Buffer.from(frame.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
      const shoreline = regions.portrait ? .715 : .766;
      for (let y = Math.max(0, Math.ceil((p.top + shoreline * p.height) * sy)); y < after.height; y++) {
        for (let x = 0; x < after.width; x++) {
          assert(pixels[(y * after.width + x) * 4 + 3] < 3, `${label}: solar motion must leave foreground waves untouched`);
        }
      }
    }
    console.log(`${label}: foreground waves remain pinned throughout solar rotation`);
  }
  if (sceneIndex === 0) {
    const pins = regions.portrait ? [[.135, .461], [.14, .48], [.129, .52]] : [[.094, .412], [.097, .44], [.097, .498]];
    for (const [u, v] of pins) {
      const x = Math.round((p.left + u * p.width) * sx), y = Math.round((p.top + v * p.height) * sy);
      if (x < 0 || x >= after.width || y < 0 || y >= after.height) continue;
      const alpha = second[(y * after.width + x) * 4 + 3];
      assert(alpha < 5, `${label}: the head, shoulder and feet cannot be moved by a neighboring effect (${alpha})`);
    }
    // The trailing hem must not pick up the flowers below and to its left.
    const flowers = regions.portrait ? [[.065, .503], [.075, .508], [.057, .494]]
      : [[.060, .474], [.067, .484], [.055, .480]];
    const cloakFrame = await page.evaluate(() => window.capturePaintedActor(1.4, 1));
    const cloakPixels = await sharp(Buffer.from(cloakFrame.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
    for (const [u, v] of flowers) {
      const x = Math.round((p.left + u * p.width) * sx), y = Math.round((p.top + v * p.height) * sy);
      if (x < 2 || x >= after.width - 2 || y < 2 || y >= after.height - 2) continue;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        assert(cloakPixels[((y + dy) * after.width + x + dx) * 4 + 3] < 3,
          `${label}: flowers cannot be included in the cloak mask`);
      }
    }
    const index = regions.subjects.findIndex(subject => subject.kind === 'waterfall');
    const fall = regions.subjects[index], [cx, cy, rx, ry] = fall.region;
    const at = async time => {
      const frame = await page.evaluate(({ time, count }) => window.capturePaintedActor(time, count), { time, count: index + 1 });
      return sharp(Buffer.from(frame.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
    };
    const time = fall.period * (2.5 - index * .173), a = await at(time - .15), b = await at(time + .15);
    const x0 = Math.max(0, Math.ceil((p.left + (cx - rx * .4) * p.width) * sx));
    const x1 = Math.min(after.width, Math.floor((p.left + (cx + rx * .4) * p.width) * sx));
    const y0 = Math.max(10, Math.ceil((p.top + (cy - ry * .35) * p.height) * sy));
    const y1 = Math.min(after.height - 10, Math.floor((p.top + (cy + ry * .35) * p.height) * sy));
    const matches = [];
    for (let dy = -8; dy <= 8; dy++) {
      let error = 0, count = 0;
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * after.width + x) * 4, j = ((y + dy) * after.width + x) * 4;
        if (Math.min(a[i + 3], b[j + 3]) < 100) continue;
        for (let channel = 0; channel < 3; channel++) error += (a[i + channel] - b[j + channel]) ** 2;
        count++;
      }
      if (count > 20) matches.push({ dy, error: error / count });
    }
    matches.sort((a, b) => a.error - b.error);
    assert(matches[0]?.dy > 0, `${label}: painted water must flow down instead of oscillating: ${JSON.stringify(matches.slice(0, 3))}`);
    console.log(`${label}: waterfall brushwork travels downward (${matches[0].dy}px between frames)`);
  }
  await page.screenshot({ path: `${output}/${label}.png` });
  return after.time;
}

async function checkHomeMoon() {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    for (const theme of ['default-light', 'default', 'fall-light', 'fall', 'spring-light', 'spring', 'winter-light', 'winter']) {
      const page = await open(theme, viewport);
      await measure(page, 0, `home-moon-${viewport.width}-${theme}`);
      await page.close();
    }
  }
  const page = await open('default-light', { width: 844, height: 390 });
  await measure(page, 0, 'home-moon-landscape');
  await chapter(page, 'Cores', 'cores');
  await chapter(page, 'Home', 'intro');
  assert.match(await page.locator(selector).getAttribute('data-actor-subjects'), /Home moon/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.cinematic-environment > .cinematic-contour-dissolve').dataset.actorState === 'reduced-motion');
  assert.equal(await page.locator(selector).evaluate(canvas => canvas.style.visibility), 'hidden');
  assert.deepEqual(errors, []);
  console.log('PASS: Home moon loops, follows scroll, preserves the foreground and respects reduced motion in every seasonal appearance.');
}

async function checkAllSubjects() {
  const refinementOnly = process.argv.includes('--refinement-only');
  const page = await open('default-light', { width: 1440, height: 900 });
  await measure(page, 0, 'desktop-home');
  for (const [label, id, scene] of [['Cores', 'cores', 1], ['Case Studies', 'projects', 2],
    ['Education', 'education', 3], ['Field Notes', 'personal', 4], ['Contact', 'contact', 5]]) {
    await chapter(page, label, id); await measure(page, scene, `desktop-${id}`);
  }
  await chapter(page, 'Case Studies', 'projects');
  let lastTime = Number(await page.locator(selector).getAttribute('data-actor-time'));
  for (const [label, theme] of refinementOnly ? [] : [['Fall', 'fall-light'], ['Spring', 'spring-light'], ['Winter', 'winter-light'], ['Monochrome', 'default-light']]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForFunction(theme => document.querySelector('.archive-app').classList.contains(`theme-${theme}`)
      && !document.documentElement.classList.contains('theme-contour-transition-active'), theme, { timeout: 45000 });
    await page.mouse.move(4, 300);
    lastTime = await measure(page, 2, theme);
    await chapter(page, 'Cores', 'cores'); await measure(page, 1, `${theme}-cores`);
    await chapter(page, 'Case Studies', 'projects');
    await page.getByRole('switch', { name: 'Light appearance' }).click();
    await page.waitForFunction(theme => document.querySelector('.archive-app').classList.contains(`theme-${theme}`)
      && !document.documentElement.classList.contains('theme-contour-transition-active'), theme.replace('-light', ''), { timeout: 45000 });
    const darkTime = await measure(page, 2, theme.replace('-light', ''));
    await chapter(page, 'Cores', 'cores'); await measure(page, 1, `${theme.replace('-light', '')}-cores`);
    await chapter(page, 'Case Studies', 'projects');
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
  console.log(`PASS: actual painted subjects move on every chapter${refinementOnly ? '' : ', all eight appearances'} and both mobile layouts; reduced motion stops them.`);
}

try {
  if (process.argv.includes('--home-moon-only')) await checkHomeMoon();
  else await checkAllSubjects();
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
