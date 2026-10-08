import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
await mkdir('tmp/gate-seal', { recursive: true });
const root = '.archive-viewport';
const entry = '.gate-seal-entry';
const seal = '.gate-seal-control';
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled') && !root.dataset.textContentPhase
    && !document.documentElement.classList.contains('theme-contour-transition-active');
});
const init = async options => {
  const page = await browser.newPage({ reducedMotion: 'reduce', ...options });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /shader|WebGLProgram/i.test(message.text())) errors.push(message.text()); });
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => !document.querySelector('#boot-loader') && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  await idle(page);
  await page.waitForFunction(() => document.querySelector('.gate-seal-entry')?.dataset.sealPlaced);
  return page;
};
const moveToSeal = async page => {
  const box = await page.locator(seal).boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'turning');
};
const pose = page => page.evaluate(async () => {
  const { getGateSealPose } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
  return getGateSealPose().angle;
});
const checkRestingStart = async page => {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('.cinematic-contour-dissolve');
    const image = document.querySelector('.gateway-sequence-preloads img');
    return canvas?.dataset.sealPrepared === (image?.currentSrc || image?.src);
  });
  const samples = await page.evaluate(async () => {
    const { createGateSealTurn } = await import('/prerak-portfolio/src/utils/gateSealMotion.js');
    const { driveGateSeal, getGateSealPose, settleGateSeal } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
    const { theme, portrait } = getGateSealPose();
    const canvas = document.querySelector('.gate-seal-painted-face');
    const start = performance.now();
    const frames = [{ elapsed: 0, angle: Number(canvas.dataset.sealAngle),
      rendering: Boolean(canvas.dataset.sealPrepared) && canvas.width > 0 }];
    // Keep the first few frames exactly at rest to catch a premature idle exit.
    driveGateSeal(createGateSealTurn(), theme, portrait, start + 80);
    try {
      await new Promise(resolve => {
        const sample = () => {
          frames.push({ elapsed: performance.now() - start, angle: Number(canvas.dataset.sealAngle),
            rendering: Boolean(canvas.dataset.sealPrepared) && canvas.width > 0 });
          if (performance.now() - start < 600) requestAnimationFrame(sample); else resolve();
        };
        requestAnimationFrame(sample);
      });
    } finally { settleGateSeal(0, theme, portrait); }
    return frames;
  });
  assert(samples.every(sample => sample.rendering), 'The complete native seal is ready while initially at rest');
  assert(samples.some(sample => sample.angle === 0), 'The seal starts exactly at rest');
  assert(samples.at(-1).angle > .75, `The complete painted object advances on every frame ${JSON.stringify(samples)}`);
  await page.waitForFunction(() => document.querySelector('.cinematic-contour-dissolve').style.visibility === 'hidden');
  console.log(`Resting start: ${samples.length} uninterrupted frames of the native painted seal`);
};
const home = async page => {
  await page.mouse.move(5, 5);
  await page.getByRole('tab', { name: 'Home', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'intro');
  await idle(page);
};
const checkAnchor = async (page, name) => {
  await page.evaluate(async () => {
    const { getGateSealPose, settleGateSeal } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
    const { theme, portrait } = getGateSealPose(); settleGateSeal(0, theme, portrait);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  const geometry = await page.evaluate(async () => {
    const { readSceneImageProjection } = await import('/prerak-portfolio/src/utils/cinematicGeometryRenderer.js');
    const { projectGateSeal } = await import('/prerak-portfolio/src/utils/gateSealMotion.js');
    const image = document.querySelector('.gateway-sequence-preloads img');
    const expected = projectGateSeal(readSceneImageProjection(image, null, innerWidth), image.currentSrc.includes('/portrait/'));
    const control = document.querySelector('.gate-seal-control').getBoundingClientRect();
    const canvas = document.querySelector('.gate-seal-painted-face');
    const painting = canvas.getBoundingClientRect();
    const { prepareGateSealArtwork, GATE_SEAL_ART_EXTENT } = await import('/prerak-portfolio/src/utils/gateSealArtwork.js');
    const artwork = prepareGateSealArtwork(image, image.currentSrc.includes('/portrait/'), canvas.width);
    const reference = document.createElement('canvas');
    reference.width = reference.height = canvas.width;
    const referenceContext = reference.getContext('2d');
    referenceContext.drawImage(artwork.backing, 0, 0);
    referenceContext.drawImage(artwork.face, 0, 0);
    const native = reference.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    const moving = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    const tipPixels = artwork.face.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    const tipY = Math.floor(canvas.height / 2 + canvas.height * 1.09 / (2 * GATE_SEAL_ART_EXTENT));
    const lowerTip = (tipY * canvas.width + Math.floor(canvas.width / 2)) * 4;
    const upperTip = ((canvas.height - tipY - 1) * canvas.width + Math.floor(canvas.width / 2)) * 4;
    const tipMismatch = Math.max(...[0, 1, 2, 3].map(channel => Math.abs(tipPixels[lowerTip + channel] - tipPixels[upperTip + channel])));
    let mismatch = 0;
    for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {
      if (Math.hypot(x - canvas.width / 2, y - canvas.height / 2) > canvas.width * .45) continue;
      const offset = (y * canvas.width + x) * 4;
      for (let channel = 0; channel < 3; channel++) mismatch = Math.max(mismatch,
        Math.abs(native[offset + channel] * native[offset + 3] - moving[offset + channel] * moving[offset + 3]) / 255);
    }
    const label = document.querySelector('.intro-gate-cta').getBoundingClientRect();
    return { dx: control.x + control.width / 2 - expected.x, dy: control.y + control.height / 2 - expected.y,
      labelDx: label.x + label.width / 2 - expected.x, gap: label.top - (expected.y + expected.diameter / 2),
      labelVisible: label.left >= 0 && label.right <= innerWidth && label.bottom <= innerHeight,
      hitSize: control.width, width: document.documentElement.scrollWidth, viewport: innerWidth,
      paintSize: painting.width / GATE_SEAL_ART_EXTENT, nativeSize: expected.diameter, mismatch, tipMismatch,
      source: canvas.dataset.sealPrepared, nativeSource: image.currentSrc };
  });
  assert(Math.abs(geometry.dx) < 2 && Math.abs(geometry.dy) < 2, `${name}: seal drifts from the gate ${JSON.stringify(geometry)}`);
  assert(Math.abs(geometry.labelDx) < 2 && geometry.gap >= 0 && geometry.gap < 24, `${name}: label must sit directly beneath the disc`);
  assert(geometry.hitSize >= 48 && geometry.labelVisible && geometry.width <= geometry.viewport);
  assert(Math.abs(geometry.paintSize - geometry.nativeSize) < .05, `${name}: the rotating mechanism cannot be larger than the original seal`);
  assert(geometry.mismatch <= 2 && geometry.source === geometry.nativeSource, `${name}: the cross and diamond must come from this exact painting ${JSON.stringify(geometry)}`);
  assert(geometry.tipMismatch <= 1, `${name}: the upper and lower pointed tips must have matching material and length`);
  await page.screenshot({ path: `tmp/gate-seal/${name}.png` });
};
try {
  if (!process.argv.includes('--mobile-only')) {
  const page = await init({ viewport: { width: 1440, height: 900 } });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(250);
  await checkRestingStart(page);
  assert.equal(await page.getByRole('button', { name: 'Open Sesame?', exact: true }).count(), 1);
  for (const [label, season] of (process.argv.includes('--motion-only') ? [] : process.argv.includes('--winter-only') ? [['Winter', 'winter']]
    : [['Monochrome', 'default'], ['Fall', 'fall'], ['Spring', 'spring'], ['Winter', 'winter']])) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForFunction(season => [...document.querySelector('.archive-viewport').classList]
      .some(name => name === `theme-${season}` || name === `theme-${season}-light`), season);
    await idle(page);
    for (const light of [false, true]) {
      const appearance = page.getByRole('switch', { name: 'Light appearance' });
      if ((await appearance.getAttribute('aria-checked') === 'true') !== light) await appearance.click();
      const theme = `${season}${light ? '-light' : ''}`;
      await page.waitForFunction(theme => document.querySelector('.archive-viewport').classList.contains(`theme-${theme}`), theme);
      await idle(page); await page.mouse.move(5, 5); await page.waitForTimeout(100);
      await checkAnchor(page, theme);
      console.log(`${theme}: anchored`);
    }
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(200);
  await moveToSeal(page);
  await page.waitForTimeout(1000);
  assert(await pose(page) > 10 && await pose(page) < 90, 'Heavy stone accelerates gradually');
  const revealing = await page.locator('.cinematic-contour-dissolve').evaluate(canvas => ({
    visibility: canvas.style.visibility, source: canvas.dataset.dissolveSource,
    progress: Number(canvas.dataset.dissolveProgress),
  }));
  assert.equal(revealing.visibility, 'visible', 'The chapter contour begins before the wheel finishes');
  assert.equal(revealing.source, 'seal');
  assert(revealing.progress > 0 && revealing.progress < .58);
  assert.equal(await page.locator(root).getAttribute('data-chapter'), 'intro', 'The reversible reveal does not commit early');
  assert.equal(await page.locator('.gate-seal-stone').count(), 0, 'The gate must not use a foreground control sprite');
  assert.equal(await page.locator('.gate-seal-control[data-contour-visual]').count(), 0, 'The seal must not be masked with the text');
  assert.equal(await page.locator('.gateway-living-layer > .gate-seal-painted-face').count(), 1, 'The background layer owns the native painted mechanism');
  assert.equal(await page.locator('.text-brush-wash').count(), 0, 'Hovering the gate cannot add a paintbrush highlight');
  await page.screenshot({ path: 'tmp/gate-seal/turning.png' });
  await page.mouse.move(5, 5);
  assert.equal(await page.locator(entry).getAttribute('data-seal-phase'), 'returning');
  await page.waitForTimeout(1400);
  assert.equal(await page.locator(root).getAttribute('data-chapter'), 'intro', 'Short hover must not navigate');
  assert(Math.min(await pose(page), 360 - await pose(page)) < .01);
  assert.equal(await page.locator('.cinematic-contour-dissolve').evaluate(canvas => canvas.style.visibility), 'hidden', 'A cancelled turn removes its entire reveal');
  await moveToSeal(page);
  await page.waitForTimeout(1200);
  await page.keyboard.press('Escape');
  await page.mouse.move(5, 5); await page.waitForTimeout(1400);
  assert.equal(await page.locator(root).getAttribute('data-chapter'), 'intro', 'Escape cancels entry');
  await page.evaluate(async () => {
    const { getGateSealPose } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
    const entry = document.querySelector('.gate-seal-entry');
    window.gateCompletion = null;
    window.gateHandoff = [];
    const { subscribeThemeContourTransition } = await import('/prerak-portfolio/src/state/themeContourTransitionStore.js');
    const unsubscribe = subscribeThemeContourTransition(state => {
      if (state.active && state.kind === 'chapter') window.gateHandoff.push({ progress: state.progress, flight: state.linearProgress, duration: state.duration });
      if (!state.active && window.gateHandoff.length) unsubscribe();
    });
    const observer = new MutationObserver(() => {
      if (entry.dataset.sealPhase === 'unlocked') {
        window.gateCompletion = { time: performance.now(), angle: getGateSealPose().angle };
        observer.disconnect();
      }
    });
    observer.observe(entry, { attributes: true, attributeFilter: ['data-seal-phase'] });
  });
  const started = await page.evaluate(() => performance.now());
  await moveToSeal(page);
  await page.waitForTimeout(2650);
  assert.equal(await page.locator(root).getAttribute('data-chapter'), 'intro', 'No entry before the three-second dwell');
  await page.waitForFunction(() => window.gateCompletion);
  const completed = await page.evaluate(() => window.gateCompletion);
  assert(completed.time - started >= 2980 && completed.time - started < 3800, `Dwell timing ${completed.time - started}ms`);
  assert.equal(completed.angle, 180, 'Exact half-turn at unlock');
  console.log(`Half-turn locked in ${(completed.time - started).toFixed(0)}ms`);
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  const handoff = await page.evaluate(() => window.gateHandoff[0]);
  assert.equal(handoff.progress, .58, 'The committed chapter cannot restart the reveal at zero');
  assert.equal(handoff.flight, 0, 'Navigation retains its complete orbital flight');
  assert(Math.abs(handoff.duration - 1260) < .001, 'Only the remaining dissolve time runs after unlock');
  await idle(page);
  await home(page);
  await moveToSeal(page);
  await page.waitForTimeout(600);
  await page.getByRole('button', { name: 'Fall', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.cinematic-contour-dissolve')?.dataset.sealRendering === 'background-dissolve');
  assert.equal(await page.locator('.text-contour-ghosts .gate-seal-control').count(), 0, 'Theme transitions cannot produce ghost seal fragments');
  await page.screenshot({ path: 'tmp/gate-seal/theme-transition.png' });
  await page.mouse.move(5, 5); await idle(page); await page.waitForTimeout(3200);
  assert.equal(await page.locator(root).getAttribute('data-chapter'), 'intro', 'Theme change cancels pending unlock');
  await page.getByRole('button', { name: 'Open Sesame?', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  await idle(page); await page.close();
  }
  for (const [width, height] of [[390, 844], [844, 390], [320, 568]]) {
    const mobile = await init({ viewport: { width, height }, isMobile: true, hasTouch: true });
    await checkAnchor(mobile, `${width}x${height}`);
    if (width === 390) {
      await mobile.emulateMedia({ reducedMotion: 'no-preference' });
      await mobile.waitForTimeout(250);
      await mobile.evaluate(() => {
        window.gateTouchEvents = [];
        for (const type of ['pointerdown', 'pointerup', 'pointercancel', 'lostpointercapture']) {
          document.addEventListener(type, event => window.gateTouchEvents.push({ type, target: event.target.className, pointer: event.pointerType,
            x: event.clientX, y: event.clientY, phase: document.querySelector('.gate-seal-entry').dataset.sealPhase }), true);
        }
      });
      const client = await mobile.context().newCDPSession(mobile);
      const box = await mobile.locator(seal).boundingBox();
      const touch = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touch] });
      await mobile.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'turning');
      await mobile.waitForTimeout(600);
      await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await mobile.waitForTimeout(3300);
      assert.equal(await mobile.locator(root).getAttribute('data-chapter'), 'intro', 'A short touch cannot become an accidental click-to-enter');
      const nextBox = await mobile.locator(seal).boundingBox();
      await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: nextBox.x + nextBox.width / 2, y: nextBox.y + nextBox.height / 2 }] });
      await mobile.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'turning');
      await mobile.waitForTimeout(3150);
      await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await mobile.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
      await idle(mobile); await client.detach();
    } else {
      await mobile.getByRole('button', { name: 'Open Sesame?', exact: true }).click();
      await mobile.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
    }
    await mobile.close();
  }
  assert.deepEqual(errors, []);
  console.log(process.argv.includes('--mobile-only') ? 'PASS: portrait/landscape anchors, reduced-motion activation, short-touch cancellation, and three-second touch hold.'
    : `PASS: ${process.argv.includes('--motion-only') ? 'motion checks' : 'appearance checks'}, portrait/landscape anchors, overlapping dissolve, continuous handoff, exact three-second half-turn, early release, Escape, theme interruption, keyboard, reduced motion, and touch hold.`);
} catch (error) {
  for (const page of browser.contexts().flatMap(context => context.pages())) {
    console.log(JSON.stringify(await page.locator(root).evaluate(async node => ({ dataset: { ...node.dataset }, classes: node.className,
      gate: document.querySelector('.gate-seal-entry')?.dataset.sealPhase, touch: window.gateTouchEvents,
      pose: (await import('/prerak-portfolio/src/state/gateSealTurnStore.js')).getGateSealPose(),
      transition: (await import('/prerak-portfolio/src/state/themeContourTransitionStore.js')).getThemeContourTransition().active,
      motion: (await import('/prerak-portfolio/src/state/spatialMotionStore.js')).getSpatialMotion().scenePosition,
      canvases: [...document.querySelectorAll('.cinematic-contour-dissolve')].map(canvas => ({ data: { ...canvas.dataset }, visibility: canvas.style.visibility })) })), null, 2));
    await page.screenshot({ path: 'tmp/gate-seal/failure.png' });
  }
  console.log({ errors });
  throw error;
} finally { await browser.close(); }
