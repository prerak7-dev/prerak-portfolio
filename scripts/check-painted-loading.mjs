import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const server = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint());
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await mkdir('tmp/painted-loading', { recursive: true });
const settled = chapter => page.waitForFunction(chapter => {
  const root = document.querySelector('.archive-viewport');
  return root.dataset.chapter === chapter && root.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled');
}, chapter, { timeout: 60000 });
const tab = async (name, id) => { await page.getByRole('tab', { name, exact: true }).focus(); await page.keyboard.press('Enter'); await settled(id); };
const waitTheme = theme => page.waitForFunction(theme => {
  const root = document.querySelector('.archive-app'), pigment = document.querySelector('.living-pigment-field');
  return root.classList.contains(`theme-${theme}`) && pigment.dataset.pigmentThemes === theme && pigment.dataset.pigmentState === 'reading';
}, theme, { timeout: 60000 });
async function blockedImage(pattern, failFirst = false) {
  let release, attempts = 0;
  const pending = new Promise(resolve => { release = resolve; });
  await page.route(pattern, async route => {
    attempts++;
    if (failFirst && attempts === 1) return route.abort('failed');
    await pending;
    await route.continue();
  });
  return { release, attempts: () => attempts };
}
try {
  if (!process.argv.includes('--gate-only')) {
  await page.addInitScript(() => localStorage.setItem('aegis-theme', 'default'));
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => !document.querySelector('#boot-loader') && document.querySelector('.archive-viewport').dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await tab('Education', 'education');
  const delayed = await blockedImage('**/fall/dark/field.webp', true);
  await page.getByRole('button', { name: 'Fall', exact: true }).click();
  await waitTheme('fall');
  await page.waitForTimeout(800);
  assert(delayed.attempts() >= 2, 'A failed chapter request should retry');
  await page.mouse.move(4, 400); await page.mouse.wheel(0, 3600);
  await page.waitForTimeout(900);
  const held = await page.evaluate(async () => {
    const { getSpatialMotion } = await import('/prerak-portfolio/src/state/spatialMotionStore.js');
    const image = document.querySelector('.field-plate img'), previous = document.querySelector('.chronology-plate');
    return { position: getSpatialMotion().scenePosition, current: image.getAttribute('src'), desired: image.dataset.src,
      complete: image.complete && image.naturalWidth > 0, previousOpacity: Number(previous.style.opacity) };
  });
  assert.equal(held.position, 4, 'Native scrolling must hold the last painted chapter');
  assert.notEqual(held.current, held.desired, 'An undecoded replacement must not discard the last good image');
  assert(held.complete && held.previousOpacity > .99);
  await page.screenshot({ path: 'tmp/painted-loading/held-landscape.png' });
  const sampling = page.evaluate(async () => {
    const { getSpatialMotion } = await import('/prerak-portfolio/src/state/spatialMotionStore.js');
    const positions = [];
    await new Promise(resolve => {
      const sample = () => { positions.push(getSpatialMotion().scenePosition); if (positions.length < 180) requestAnimationFrame(sample); else resolve(); };
      requestAnimationFrame(sample);
    });
    return positions;
  });
  delayed.release();
  const positions = await sampling;
  assert(positions.at(-1) > 4.8, 'Scrolling must resume after recovery');
  assert(positions.every((position, i) => !i || Math.abs(position - positions[i - 1]) <= .13), 'Recovered backgrounds must not snap forward');
  await tab('Field Notes', 'personal');
  console.log('PASS: interrupted requests retry, the current painting stays visible, and native scrolling catches up smoothly.');
  const rotation = await blockedImage('**/fall/dark/portrait/field.webp');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(700);
  assert(rotation.attempts() > 0);
  const retained = await page.locator('.field-plate img').evaluate(image => ({ src: image.src, desired: image.dataset.src, complete: image.complete && image.naturalWidth > 0 }));
  assert(retained.complete && !retained.src.includes('/portrait/') && retained.desired.includes('/portrait/'));
  await page.screenshot({ path: 'tmp/painted-loading/held-portrait.png' });
  rotation.release();
  await page.waitForFunction(() => { const image = document.querySelector('.field-plate img'); return image.complete && image.naturalWidth && image.getAttribute('src') === image.dataset.src && image.src.includes('/portrait/'); });
  await settled('personal');
  console.log('PASS: rotation retains decoded art until its native portrait replacement is ready.');
  const unavailablePattern = '**/spring/dark/portrait/surface.webp';
  await page.route(unavailablePattern, route => route.abort('failed'));
  for (const [label, theme] of [['Spring', 'spring'], ['Winter', 'winter'], ['Monochrome', 'default'], ['Fall', 'fall']]) {
    await page.getByRole('button', { name: label, exact: true }).click(); await waitTheme(theme);
    if (theme === 'spring') {
      await page.getByRole('tab', { name: 'Contact', exact: true }).focus(); await page.keyboard.press('Enter');
      await page.waitForTimeout(1500);
      assert.equal(await page.locator('.archive-viewport').getAttribute('data-chapter'), 'personal', 'A failed tab request must keep the current chapter painted');
      await page.unroute(unavailablePattern);
      await tab('Contact', 'contact'); await tab('Field Notes', 'personal');
      console.log('PASS: an unavailable chapter retains the current scene and a later tab retry recovers without a reload.');
    }
    for (const appearance of [`${theme}-light`, theme]) {
      await page.getByRole('switch', { name: 'Light appearance' }).click(); await waitTheme(appearance);
      const textures = await page.locator('.cinematic-environment > .cinematic-contour-dissolve').evaluate(canvas => ({ scenes: Number(canvas.dataset.sceneTextures), geometry: Number(canvas.dataset.geometryTextures), pixels: canvas.width * canvas.height }));
      assert(textures.scenes <= 6 && textures.geometry <= 12 && textures.pixels <= 3686500);
    }
  }
  assert.deepEqual(errors, []);
  await page.screenshot({ path: 'tmp/painted-loading/final-portrait.png' });
  console.log('PASS: repeated light/dark and seasonal transitions stay within fixed background memory budgets.');
  }
  const cold = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  cold.on('pageerror', error => errors.push(error.message));
  await cold.addInitScript(() => localStorage.setItem('aegis-theme', 'default'));
  const missingCores = '**/default/dark/cores.webp';
  await cold.route(missingCores, route => route.abort('failed'));
  await cold.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await cold.waitForFunction(() => !document.querySelector('#boot-loader') && document.querySelector('.archive-viewport').dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  await cold.emulateMedia({ reducedMotion: 'no-preference' });
  await cold.getByRole('button', { name: 'Open Sesame?', exact: true }).click();
  await cold.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'turning');
  await cold.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'returning', null, { timeout: 15000 });
  await cold.getByRole('button', { name: 'Open Sesame?', exact: true }).click();
  await cold.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'idle', null, { timeout: 15000 });
  assert.equal(await cold.locator('.archive-viewport').getAttribute('data-chapter'), 'intro');
  await cold.unroute(missingCores);
  await cold.getByRole('button', { name: 'Open Sesame?', exact: true }).click();
  await cold.waitForFunction(() => {
    const root = document.querySelector('.archive-viewport');
    return root.dataset.chapter === 'cores' && root.classList.contains('chapter-settled') && root.dataset.chapterCopyPhase === 'idle';
  }, null, { timeout: 30000 });
  assert(await cold.locator('.cores-plate img').evaluate(image => image.complete && image.naturalWidth > 0
    && image.getAttribute('src') === image.dataset.src), 'The recovered chapter must paint its decoded DOM background, not just its particle overlay');
  await cold.screenshot({ path: 'tmp/painted-loading/recovered-gate.png' });
  assert.deepEqual(errors, []);
  console.log('PASS: a failed gate destination returns its seal to rest and a retry enters the decoded Cores painting.');
  await cold.close();
} catch (error) {
  process.exitCode = 1;
  console.error(error);
  console.log({ errors });
  for (const [index, context] of browser.contexts().entries()) for (const active of context.pages()) {
    console.log(await active.locator('.archive-viewport').evaluate(root => ({ chapter: root.dataset.chapter,
      phase: root.querySelector('.gate-seal-entry')?.dataset.sealPhase })).catch(() => ({})));
    await active.screenshot({ path: `tmp/painted-loading/failure-${index}.png` }).catch(() => {});
  }
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL'); await new Promise(resolve => setTimeout(resolve, 250)); process.exit(process.exitCode || 0);
  } else await server.close();
}
