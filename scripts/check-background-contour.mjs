import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const server = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint());
const output = 'tmp/background-contour';
const errors = [];
await mkdir(output, { recursive: true });

async function open(viewport) {
  const page = await browser.newPage({ viewport });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /shader|WebGLProgram/i.test(message.text())) errors.push(message.text());
  });
  await page.addInitScript(() => localStorage.setItem('aegis-theme', 'default'));
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => !document.querySelector('#boot-loader')
    && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  await page.evaluate(() => {
    const canvas = document.querySelector('.cinematic-environment > .cinematic-contour-dissolve');
    const gl = canvas.getContext('webgl2');
    const draw = gl.drawElements.bind(gl);
    const sample = document.createElement('canvas');
    sample.width = 96; sample.height = 60;
    const context = sample.getContext('2d', { willReadFrequently: true });
    const locations = new WeakMap();
    window.contourAudit = [];
    // Read immediately after a real draw: a non-preserved WebGL buffer may be
    // cleared by the compositor before an ordinary screenshot callback.
    gl.drawElements = (...args) => {
      draw(...args);
      const program = gl.getParameter(gl.CURRENT_PROGRAM);
      if (!locations.has(program)) locations.set(program, {
        idle: gl.getUniformLocation(program, 'uActorIdle'),
        progress: gl.getUniformLocation(program, 'uProgress'),
      });
      const { idle, progress: progressLocation } = locations.get(program);
      if (idle && gl.getUniform(program, idle) > .5) return;
      const progress = gl.getUniform(program, progressLocation);
      const bin = Math.floor(progress * 10);
      if (window.contourAudit.some(frame => frame.bin === bin)) return;
      context.drawImage(canvas, 0, 0, 96, 60);
      const pixels = context.getImageData(0, 0, 96, 60).data;
      let alpha = 0, energy = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        alpha += pixels[i + 3]; energy += pixels[i] + pixels[i + 1] + pixels[i + 2];
      }
      window.contourAudit.push({ bin, progress, alpha: alpha / (96 * 60), energy });
    };
  });
  return page;
}

async function settled(page, chapter) {
  await page.waitForFunction(chapter => {
    const root = document.querySelector('.archive-viewport');
    const canvas = document.querySelector('.cinematic-environment > .cinematic-contour-dissolve');
    return !canvas.dataset.dissolveSource && root.dataset.chapter === chapter
      && root.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled');
  }, chapter, { timeout: 45000 });
}

async function tab(page, label, chapter) {
  await page.evaluate(() => { window.contourAudit = []; });
  await selectTab(page, label);
  await settled(page, chapter);
}

async function selectTab(page, label) {
  const tab = page.getByRole('tab', { name: label, exact: true, includeHidden: true });
  if (await tab.isVisible() && await tab.getAttribute('aria-hidden') !== 'true') {
    await tab.focus(); await page.keyboard.press('Enter');
  } else await tab.evaluate(node => node.click());
}

async function assertPassage(page, name) {
  const frames = await page.evaluate(() => window.contourAudit);
  assert(frames.filter(frame => frame.progress > .1 && frame.progress < .9).length >= 4,
    `${name}: a chapter/theme change must render intermediate contour frames: ${JSON.stringify(frames)}`);
  assert(frames.every(frame => frame.alpha > 248 && frame.energy > 10000),
    `${name}: the contour must compose both paintings, not expose a pending DOM layer: ${JSON.stringify(frames)}`);
}

async function holdNativePainting(page, selector, fragment) {
  await page.locator(selector).evaluate((image, fragment) => {
    const nativeSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    const setAttribute = image.setAttribute.bind(image);
    let pendingSource;
    image.setAttribute = (name, value) => {
      if (name === 'src' && value.includes(fragment)) pendingSource = value;
      else setAttribute(name, value);
    };
    Object.defineProperty(image, 'src', { configurable: true,
      get: () => nativeSrc.get.call(image),
      set: value => {
        if (value.includes(fragment)) pendingSource = value;
        else nativeSrc.set.call(image, value);
      },
    });
    window.releaseNativePainting = () => {
      delete image.src; image.setAttribute = setAttribute;
      nativeSrc.set.call(image, pendingSource || image.dataset.src);
    };
  }, fragment);
}

async function assertHeldCover(page, name, rotate = false) {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.cinematic-environment > .cinematic-contour-dissolve');
    return canvas.style.visibility === 'visible' && canvas.dataset.dissolveProgress === '1.00000';
  }, null, { timeout: 15000 });
  await page.waitForTimeout(180);
  const cover = await page.locator('.cinematic-environment > .cinematic-contour-dissolve')
    .evaluate(canvas => ({ visible: canvas.style.visibility, progress: canvas.dataset.dissolveProgress }));
  assert.equal(cover.visible, 'visible', `${name}: a late live painting must remain covered`);
  assert.equal(cover.progress, '1.00000');
  await assertPassage(page, name);
  await page.screenshot({ path: `${output}/${name}-held.png` });
  if (rotate) {
    await page.setViewportSize({ width: 844, height: 390 });
    await page.waitForTimeout(500);
    assert.equal(await page.locator('.cinematic-environment > .cinematic-contour-dissolve')
      .evaluate(canvas => canvas.style.visibility), 'visible');
  }
  await page.evaluate(() => window.releaseNativePainting());
}

try {
  const rotationOnly = process.argv.includes('--rotation-only');
  for (const [width, height] of process.argv.includes('--scroll-only') ? []
    : rotationOnly ? [[390, 844]] : [[1440, 900], [390, 844], [844, 390]]) {
    const page = await open({ width, height });
    await tab(page, 'Cores', 'cores'); await assertPassage(page, `${width}-home-cores`);
    await holdNativePainting(page, '.cores-plate img', '/spring/dark/');
    await page.evaluate(() => { window.contourAudit = []; });
    await page.getByRole('button', { name: 'Spring', exact: true }).click();
    await assertHeldCover(page, `${width}-theme`, rotationOnly);
    await settled(page, 'cores');
    if (rotationOnly) {
      assert(await page.locator('.cores-plate img').evaluate(image => !image.currentSrc.includes('/portrait/') && image.complete));
      await page.screenshot({ path: `${output}/rotation-settled.png` });
      console.log('PASS: rotation during a held contour hands off to the decoded landscape painting without stranding its cover.');
      await page.close();
      continue;
    }

    const original = await page.locator('.field-plate img').getAttribute('src');
    await page.locator('.field-plate img').evaluate(image => { image.src = document.querySelector('.cores-plate img').src; });
    await page.waitForTimeout(120);
    await holdNativePainting(page, '.field-plate img', original);
    await page.evaluate(() => { window.contourAudit = []; });
    await selectTab(page, 'Field Notes');
    await assertHeldCover(page, `${width}-chapter`);
    await page.mouse.move(4, height / 2); await page.mouse.wheel(0, 2400);
    await settled(page, 'personal');
    await page.screenshot({ path: `${output}/${width}-settled.png` });

    for (const [label, chapter] of [['Contact', 'contact'], ['Education', 'education'],
      ['Experience', 'professional'], ['Case Studies', 'projects'], ['Home', 'intro']]) {
      await tab(page, label, chapter); await assertPassage(page, `${width}-${chapter}`);
    }
    console.log(`PASS ${width}x${height}: chapter and theme contours remain opaque and keep delayed live paintings covered.`);
    await page.close();
  }

  if (!rotationOnly) {
  const page = await open({ width: 1440, height: 900 });
  await tab(page, 'Cores', 'cores');
  let release;
  const delayedContour = new Promise(resolve => { release = resolve; });
  await page.route('**/fall/dark/geometry/chronology.webp', async route => { await delayedContour; await route.continue(); });
  await page.getByRole('button', { name: 'Fall', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.archive-app').classList.contains('theme-fall')
    && !document.documentElement.classList.contains('theme-contour-transition-active'), null, { timeout: 30000 });
  await settled(page, 'cores');
  await page.mouse.move(4, 400); await page.mouse.wheel(0, 10000);
  await page.waitForTimeout(1700);
  const held = await page.evaluate(async () => {
    const { getSpatialMotion } = await import('/prerak-portfolio/src/state/spatialMotionStore.js');
    return getSpatialMotion().scenePosition;
  });
  assert(held <= 2, `Scrolling must not cross a missing contour field: ${held}`);
  await page.evaluate(() => { window.contourAudit = []; });
  release();
  await page.waitForFunction(async () => {
    const { getSpatialMotion } = await import('/prerak-portfolio/src/state/spatialMotionStore.js');
    return getSpatialMotion().scenePosition > 2.65;
  }, null, { timeout: 20000 });
  await page.waitForFunction(() => window.contourAudit.some(frame => frame.alpha > 100 && frame.progress > .1),
    null, { timeout: 10000 });
  await page.screenshot({ path: `${output}/scroll-contour-recovered.png` });
  await page.getByRole('button', { name: 'Spring', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.archive-app').classList.contains('theme-spring')
    && !document.documentElement.classList.contains('theme-contour-transition-active'), null, { timeout: 30000 });
  console.log('PASS: delayed scroll contour fields hold the current painting, then recover through a rendered contour.');
  }
  assert.deepEqual(errors, []);
} catch (error) {
  console.error(error); process.exitCode = 1;
  for (const [index, context] of browser.contexts().entries()) for (const page of context.pages()) {
    console.log(await page.locator('.cinematic-environment').evaluate(root => ({ ...root.dataset,
      theme: document.querySelector('.archive-app').className,
      flags: document.documentElement.className,
      canvas: { ...root.querySelector('.cinematic-contour-dissolve').dataset },
      frames: window.contourAudit,
    })).catch(() => ({})));
    await page.screenshot({ path: `${output}/failure-${index}.png` }).catch(() => {});
  }
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL'); await new Promise(resolve => setTimeout(resolve, 250)); process.exit(process.exitCode || 0);
  } else await server.close();
}
