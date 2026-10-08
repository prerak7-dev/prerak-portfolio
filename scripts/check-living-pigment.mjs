import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright'), sharp = require('sharp');
const browserServer = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: process.env.BROWSER_EXECUTABLE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(browserServer.wsEndpoint());
const errors = [], output = 'tmp/living-pigment';
const phaseOnly = process.argv.includes('--phase-only');
await mkdir(output, { recursive: true });
const selector = '.living-pigment-field';
async function open(theme, viewport) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /shader|WebGLProgram/i.test(message.text())) errors.push(message.text()); });
  await page.addInitScript(theme => localStorage.setItem('aegis-theme', theme), theme);
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => !document.querySelector('#boot-loader') && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  assert.equal(await page.locator(selector).evaluate(c => c.style.visibility), 'hidden', 'Reduced motion keeps the native artwork still');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForFunction(() => document.querySelector('.living-pigment-field')?.dataset.pigmentState === 'reading');
  await page.waitForTimeout(1800);
  return page;
}
async function measure(page, name) {
  const snapshot = await page.locator(selector).evaluate(async canvas => {
    const root = canvas.closest('.archive-viewport');
    const { findTextTargets } = await import('/prerak-portfolio/src/utils/textTargets.js');
    const targets = findTextTargets(root).filter(node => !node.closest('.archive-scene[aria-hidden="true"], .cinematic-environment, .spatial-world') && node.checkVisibility({ checkVisibilityCSS: true }));
    return { png: canvas.toDataURL(), width: canvas.width, height: canvas.height,
      viewportWidth: innerWidth, viewportHeight: innerHeight, scrollWidth: document.documentElement.scrollWidth,
      stats: { ...canvas.dataset }, pointer: getComputedStyle(canvas).pointerEvents,
      texts: targets.map(node => { const r = node.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }) };
  });
  const pixels = await sharp(Buffer.from(snapshot.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
  let painted = 0;
  for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 12) painted++;
  assert(painted > 150, `${name}: the point field must be visible and nonblank ${JSON.stringify(snapshot.stats)}`);
  assert(Number(snapshot.stats.pigmentParticles) <= 10400 && Number(snapshot.stats.pigmentDrawCalls) <= 2);
  assert(snapshot.width * snapshot.height <= 1810000 && snapshot.scrollWidth <= snapshot.viewportWidth);
  assert.equal(snapshot.pointer, 'none');
  assert.equal(snapshot.stats.pigmentError, undefined, `${name}: renderer initialization must survive StrictMode`);
  const sx = snapshot.width / snapshot.viewportWidth, sy = snapshot.height / snapshot.viewportHeight;
  let textPixels = 0;
  for (const rect of snapshot.texts) {
    for (let y = Math.max(0, Math.ceil((rect.y + 4) * sy)); y < Math.min(snapshot.height, Math.floor((rect.y + rect.height - 4) * sy)); y++) {
      for (let x = Math.max(0, Math.ceil((rect.x + 4) * sx)); x < Math.min(snapshot.width, Math.floor((rect.x + rect.width - 4) * sx)); x++) {
        if (pixels[(y * snapshot.width + x) * 4 + 3] > 12) textPixels++;
      }
    }
  }
  assert.equal(textPixels, 0, `${name}: the new layer must leave every reading target clear`);
  await page.screenshot({ path: `${output}/${name}.png` });
  console.log(`${name}: ${painted} textured pixels, ${snapshot.stats.pigmentDrawCalls} draw calls, zero pixels over text`);
  return snapshot;
}
async function chapter(page, label, index) {
  const chapterId = { Home: 'intro', Cores: 'cores', 'Case Studies': 'projects', Experience: 'professional', Education: 'education', 'Field Notes': 'personal', Contact: 'contact' }[label];
  const tab = page.getByRole('tab', { name: label, exact: true });
  if (await tab.isVisible()) { await tab.focus(); await page.keyboard.press('Enter'); }
  else { await tab.evaluate(node => node.click()); }
  await page.waitForFunction(({ index, chapterId }) => {
    const root = document.querySelector('.archive-viewport'), field = document.querySelector('.living-pigment-field');
    return root.dataset.chapter === chapterId && root.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled')
      && field.dataset.pigmentState === 'reading' && field.dataset.pigmentScenes === String(index);
  }, { index, chapterId });
  await page.waitForTimeout(300);
}
async function measureLoop(page, name, sceneIndex) {
  const capture = () => page.locator(selector).evaluate(async (canvas, sceneIndex) => {
    const { getPigmentLandmarks, getPigmentSubjects, PIGMENT_SCENE_SELECTORS } = await import('/prerak-portfolio/src/data/livingPigmentArt.js');
    const { getSceneCoverProjection, usesPortraitArtwork } = await import('/prerak-portfolio/src/data/cinematicViewport.js');
    const { readSceneImageProjection } = await import('/prerak-portfolio/src/utils/cinematicGeometryRenderer.js');
    const image = canvas.closest('.archive-viewport').querySelector(PIGMENT_SCENE_SELECTORS[sceneIndex]);
    const p = readSceneImageProjection(image, getSceneCoverProjection(innerWidth, innerHeight), innerWidth);
    return { png: canvas.toDataURL(), width: canvas.width, height: canvas.height, time: Number(canvas.dataset.pigmentLoopTime),
      state: canvas.dataset.pigmentState, progress: Number(canvas.dataset.pigmentProgress),
      subjects: getPigmentSubjects(sceneIndex).map((subject, index) => {
        const [x, y, rx, ry] = getPigmentLandmarks(sceneIndex, usesPortraitArtwork())[index];
        return { name: subject.name, left: (p.left + (x - rx) * p.width - 12) * canvas.width / innerWidth,
          top: (p.top + (y - ry) * p.height - 12) * canvas.height / innerHeight,
          right: (p.left + (x + rx) * p.width + 12) * canvas.width / innerWidth,
          bottom: (p.top + (y + ry) * p.height + 12) * canvas.height / innerHeight };
      }) };
  }, sceneIndex);
  const before = await capture();
  await page.waitForTimeout(1400);
  const after = await capture();
  assert.equal(after.state, 'reading', `${name}: loops must run without a scroll transition`);
  assert.equal(after.progress, 0);
  assert(after.time > before.time + .3, `${name}: the chapter's loop clock must advance at rest`);
  const first = await sharp(Buffer.from(before.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
  const second = await sharp(Buffer.from(after.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
  let chapterChanges = 0;
  for (const subject of after.subjects) {
    let changed = 0, visible = 0;
    for (let y = Math.max(0, Math.floor(subject.top)); y < Math.min(after.height, Math.ceil(subject.bottom)); y++) {
      for (let x = Math.max(0, Math.floor(subject.left)); x < Math.min(after.width, Math.ceil(subject.right)); x++) {
        const i = (y * after.width + x) * 4;
        if (Math.max(first[i + 3], second[i + 3]) > 12) visible++;
        if (Math.max(first[i + 3], second[i + 3]) > 12
          && Math.abs(first[i + 3] - second[i + 3]) + Math.abs(first[i] - second[i])
          + Math.abs(first[i + 1] - second[i + 1]) + Math.abs(first[i + 2] - second[i + 2]) > 24) changed++;
      }
    }
    chapterChanges += changed;
    assert(changed > 12 || visible <= 30, `${name}: ${subject.name} must visibly animate in its exposed painting landmark (${changed} changed / ${visible} exposed pixels)`);
    console.log(`${name}: ${subject.name} (${changed} changed / ${visible} exposed pixels${visible <= 30 ? '; reading-area masks take precedence' : '; loops at rest'})`);
  }
  assert(chapterChanges > 150, `${name}: each chapter must have prominently visible motion at rest`);
  return after.time;
}
async function appearanceHandoff(page) {
  const before = Number(await page.locator(selector).getAttribute('data-pigment-loop-time'));
  for (const theme of ['default-light', 'default']) {
    await page.getByRole('switch', { name: 'Light appearance' }).click();
    await page.waitForFunction(() => document.querySelector('.living-pigment-field').dataset.pigmentState === 'passage');
    await page.waitForFunction(theme => {
      const c = document.querySelector('.living-pigment-field');
      return c.dataset.pigmentState === 'reading' && c.dataset.pigmentThemes === theme;
    }, theme);
    assert(Number(await page.locator(selector).getAttribute('data-pigment-loop-time')) > before,
      'Appearance handoffs must not restart subject loops');
  }
  console.log('Education: continuous loop phase preserved across light/dark contour handoffs');
}
try {
  const themes = phaseOnly ? ['default'] : ['default', 'default-light', 'fall', 'fall-light', 'spring', 'spring-light', 'winter', 'winter-light'];
  for (const [index, theme] of themes.entries()) {
    const page = await open(theme, index % 2 ? { width: 390, height: 844 } : { width: 1440, height: 900 });
    await measure(page, theme);
    const before = Number(await page.locator(selector).getAttribute('data-pigment-frame'));
    await page.waitForTimeout(300);
    assert(Number(await page.locator(selector).getAttribute('data-pigment-frame')) > before, 'Ambient pigment must move');
    if (index === 0 || index === 5) {
      if (!phaseOnly) await measureLoop(page, theme, 0);
      let loopTime = 0;
      for (const [label, sceneIndex] of (phaseOnly ? [] : [['Cores', 1], ['Case Studies', 2], ['Experience', 3], ['Education', 3], ['Field Notes', 4], ['Contact', 5], ['Home', 0]])) {
        await chapter(page, label, sceneIndex); await measure(page, `${theme}-${label.replaceAll(' ', '-')}`);
        const nextTime = await measureLoop(page, `${theme}-${label.replaceAll(' ', '-')}`, sceneIndex);
        assert(nextTime > loopTime, 'Chapter handoffs must preserve the continuous clock');
        loopTime = nextTime;
        if (index === 0 && label === 'Education') await appearanceHandoff(page);
      }
      await page.mouse.move(4, 4); await page.mouse.wheel(0, 2000);
      await page.waitForFunction(() => document.querySelector('.living-pigment-field').dataset.pigmentState === 'passage');
      await page.waitForTimeout(250);
      const forward = Number(await page.locator(selector).getAttribute('data-pigment-progress'));
      const passage = await measure(page, `${theme}-scroll-passage`);
      assert.equal(Number(passage.stats.pigmentDrawCalls), 2, 'Outgoing and incoming motifs share the background passage');
      await page.mouse.wheel(0, -1500);
      await page.waitForFunction(progress => Number(document.querySelector('.living-pigment-field').dataset.pigmentProgress) < progress,
        forward);
      assert.equal(await page.locator(selector).getAttribute('data-pigment-direction'), '-1');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => document.querySelector('.living-pigment-field').style.visibility === 'hidden');
      const stopped = await page.locator(selector).getAttribute('data-pigment-frame');
      await page.waitForTimeout(200);
      assert.equal(await page.locator(selector).getAttribute('data-pigment-frame'), stopped);
    }
    await page.close();
  }
  if (!phaseOnly) {
  const landscape = await open('winter-light', { width: 844, height: 390 });
  await measure(landscape, 'landscape-home');
  await chapter(landscape, 'Case Studies', 2); await measure(landscape, 'landscape-systems');
  await landscape.close();
  }
  assert.deepEqual(errors, []);
  console.log(phaseOnly ? 'PASS: two-layer scroll choreography, native reversal, readable copy and reduced motion.'
    : 'PASS: all eight appearances, all chapter paintings, native scroll reversal, mobile portrait/landscape, readable copy, cached return journeys, reduced motion and rendering budgets.');
} catch (error) {
  process.exitCode = 1;
  console.error(error);
  console.log({ errors });
  for (const context of browser.contexts()) for (const page of context.pages()) {
    await page.screenshot({ path: `${output}/failure.png` }).catch(() => {});
    console.log(await page.locator(selector).evaluate(c => ({ ...c.dataset })).catch(() => ({})));
  }
  throw error;
} finally {
  // Terminate only the headless browser owned by this test. Edge's graceful
  // shutdown and taskkill tree enumeration can both stall on Windows.
  if (process.platform === 'win32') {
    browserServer.process().kill('SIGKILL');
    await new Promise(resolve => setTimeout(resolve, 250));
    process.exit(process.exitCode || 0);
  } else await browserServer.close();
}
