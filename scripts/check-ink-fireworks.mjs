import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
const field = '.ink-fireworks-field:not([data-tracer-outgoing])';
const palettesOnly = process.argv.includes('--palettes-only');
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
await mkdir('tmp/ink-fireworks', { recursive: true });

async function open(theme, viewport = { width: 1440, height: 900 }, options = {}) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce', ...options });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /shader|WebGLProgram/i.test(message.text())) errors.push(message.text()); });
  await page.addInitScript(theme => localStorage.setItem('aegis-theme', theme), theme);
  await page.goto(url);
  await page.waitForFunction(() => !document.querySelector('#boot-loader') && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  return page;
}
async function enable(page) {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(250);
  await page.waitForFunction(() => Number(document.querySelector('.ink-fireworks-field:not([data-tracer-outgoing])').dataset.inkVertices) > 0);
  await page.waitForFunction(() => document.querySelector('.ink-fireworks-field:not([data-tracer-outgoing])').dataset.inkSpritesReady === 'true');
  await page.waitForFunction(() => document.querySelector('.ink-fireworks-field:not([data-tracer-outgoing])').dataset.inkFieldReady === 'true');
  assert.equal(await page.locator(field).getAttribute('data-ink-state'), 'idle', 'Loading cannot automatically start fireworks');
}
async function hover(page) {
  const box = await page.locator('.gate-seal-control').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'turning');
}
async function clock(page) {
  return page.locator(field).evaluate(canvas => ({ elapsed: Number(canvas.dataset.inkElapsed), angle: Number(canvas.dataset.inkAngle),
    wheel: Number(document.querySelector('.gate-seal-painted-face').dataset.sealAngle), state: canvas.dataset.inkState, frame: canvas.dataset.inkFrame }));
}
async function metrics(page) {
  const result = await page.locator(field).evaluate(canvas => ({ png: canvas.toDataURL(), elapsed: canvas.dataset.inkElapsed,
    theme: canvas.dataset.inkTheme, elementType: canvas.dataset.inkElementType, elements: Number(canvas.dataset.inkElements),
    pixels: canvas.width * canvas.height, vertices: Number(canvas.dataset.inkVertices), contours: Number(canvas.dataset.inkContourLines),
    pointerEvents: getComputedStyle(canvas).pointerEvents, scrollWidth: document.documentElement.scrollWidth, width: innerWidth }));
  const pixels = await sharp(Buffer.from(result.png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
  delete result.png;
  let painted = 0, textured = 0;
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] > 12) painted++;
    if (pixels[index] > 12 && pixels[index] < 190) textured++;
  }
  return { ...result, painted, textured };
}
async function reset(page) {
  await page.mouse.move(5, 5);
  await page.waitForFunction(async () => {
    const { getGateSealPose } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
    const pose = getGateSealPose(); return !pose.moving && pose.angle < .00001;
  });
  await page.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'idle');
  await page.waitForFunction(() => document.querySelector('.ink-fireworks-field:not([data-tracer-outgoing])').dataset.inkState === 'idle');
}
try {
  const appearances = process.argv.includes('--quick') ? ['default', 'winter-light']
    : ['default', 'default-light', 'fall', 'fall-light', 'spring', 'spring-light', 'winter', 'winter-light'];
  for (const theme of appearances) {
    const page = await open(theme);
    await enable(page);
    // Pixel encoding can outlast the hold on software GPUs; photograph a held pose.
    await page.evaluate(async () => {
      const { getGateSealPose, settleGateSeal } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
      const pose = getGateSealPose(); settleGateSeal(90, pose.theme, pose.portrait);
    });
    await page.waitForTimeout(100);
    const timing = await clock(page);
    assert(Math.abs(timing.angle - timing.wheel) < .001, 'Ink and stone must share the same frame: ' + JSON.stringify(timing));
    assert(timing.elapsed > 950 && timing.elapsed < 1700, 'The ink score must share the three-second hold: ' + JSON.stringify(timing));
    const result = await metrics(page);
    assert.equal(result.theme, theme);
    assert.equal(result.elementType, theme.startsWith('fall') ? 'leaves' : theme.startsWith('spring') ? 'flowers' : theme.startsWith('winter') ? 'snow' : 'dust');
    assert(result.elements > 100 && result.elements < 512);
    assert(result.contours > 0, 'Generated strokes must traverse the painted scene contours');
    assert(result.painted > 500 && result.textured > result.painted * .8, 'Visible, textured pigment: ' + JSON.stringify(result));
    assert(result.pixels <= 3020000 && result.vertices < 24000 && result.pointerEvents === 'none' && result.scrollWidth <= result.width);
    await page.screenshot({ path: 'tmp/ink-fireworks/' + theme + '.png' });
    const released = await clock(page);
    await page.evaluate(async () => {
      const { getGateSealPose, driveGateSeal } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
      const { createGateSealTurn } = await import('/prerak-portfolio/src/utils/gateSealMotion.js');
      const pose = getGateSealPose(); driveGateSeal(createGateSealTurn(pose.angle, 0, 0, 1100), pose.theme, pose.portrait);
    });
    await page.mouse.move(5, 5); await page.waitForTimeout(750);
    const returning = await clock(page);
    assert(returning.elapsed < released.elapsed, 'Leaving must rewind the ink: ' + JSON.stringify({ released, returning }));
    assert(Math.abs(returning.angle - returning.wheel) < .001);
    await reset(page);
    assert.equal((await metrics(page)).painted, 0, 'Rewind cannot leave pigment behind');
    const frame = (await clock(page)).frame;
    await page.waitForTimeout(100);
    assert.equal((await clock(page)).frame, frame, 'No idle render loop');
    if (!palettesOnly) {
      await hover(page); await page.waitForTimeout(1100);
      const turning = await clock(page);
      await page.mouse.move(5, 5);
      assert(Math.abs(turning.angle - turning.wheel) < .001, 'Live hover shares the stone frame');
      assert(turning.elapsed > 950 && turning.elapsed < 1700, 'Live hover shares the three-second hold');
      await page.waitForTimeout(750);
      const rewound = await clock(page);
      assert(rewound.elapsed < turning.elapsed && Math.abs(rewound.angle - rewound.wheel) < .001, 'Live release rewinds both paintings together');
      await reset(page);
    }
    console.log(theme + ': ' + result.painted + ' pigment pixels, shared clock, clean rewind, no idle frames');
    if (theme === 'default') {
      const snapshots = [];
      for (const angle of [0, 45, 90, 135]) {
        await page.evaluate(async angle => {
          const { settleGateSeal, getGateSealPose } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
          const { theme, portrait } = getGateSealPose(); settleGateSeal(angle, theme, portrait);
        }, angle);
        await page.waitForTimeout(70);
        const box = await page.locator('.gate-seal-control').boundingBox();
        const shot = await page.screenshot({ clip: { x: box.x - 12, y: box.y - 12, width: box.width + 24, height: box.height + 24 } });
        snapshots.push({ input: await sharp(shot).resize(320, 320, { kernel: 'nearest' }).png().toBuffer(), left: snapshots.length * 320, top: 0 });
      }
      await sharp({ create: { width: 1280, height: 320, channels: 4, background: '#222' } }).composite(snapshots).png().toFile('tmp/ink-fireworks/seal-turns.png');
    }
    await page.close();
  }
  if (!palettesOnly) {
  const complete = await open('fall'); await enable(complete);
  await complete.evaluate(() => {
    window.inkMaximum = 0;
    const canvas = document.querySelector('.ink-fireworks-field:not([data-tracer-outgoing])');
    new MutationObserver(() => { window.inkMaximum = Math.max(window.inkMaximum, Number(canvas.dataset.inkElapsed)); })
      .observe(canvas, { attributes: true, attributeFilter: ['data-ink-elapsed'] });
  });
  await hover(complete);
  await complete.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  assert.equal(await complete.evaluate(() => window.inkMaximum), 3000, 'Both animations must finish at the exact half-turn');
  await complete.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle');
  assert.equal(await complete.locator('.ink-fireworks-field[data-tracer-outgoing]').count(), 0);
  await complete.close();
  const interrupted = await open('fall'); await enable(interrupted); await hover(interrupted);
  await interrupted.waitForTimeout(1300);
  await interrupted.getByRole('button', { name: 'Winter', exact: true }).click();
  await interrupted.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('theme-winter'));
  await interrupted.waitForFunction(() => !document.documentElement.classList.contains('theme-contour-transition-active'));
  assert.equal(await interrupted.locator('.ink-fireworks-field[data-tracer-outgoing]').count(), 0);
  assert.equal((await metrics(interrupted)).painted, 0, 'No stale ink after a theme handoff');
  await interrupted.close();
  const resumed = await open('spring'); await enable(resumed); await hover(resumed);
  await resumed.waitForTimeout(1650); await resumed.mouse.move(5, 5); await resumed.waitForTimeout(450);
  const before = await clock(resumed);
  const handoff = await resumed.evaluate(async () => {
    const { getGateSealPose } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
    const before = getGateSealPose().angle;
    document.querySelector('.gate-seal-control').dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse' }));
    return { before, after: getGateSealPose().angle, phase: document.querySelector('.gate-seal-entry').dataset.sealPhase };
  });
  await hover(resumed); await resumed.waitForTimeout(50);
  const after = await clock(resumed);
  assert(before.elapsed > 200 && after.elapsed > 200 && handoff.phase === 'turning' && handoff.before > 0
    && Math.abs(handoff.after - handoff.before) < .5,
  'Re-entry must preserve the actual interrupted pose: ' + JSON.stringify({ before, after, handoff }));
  await reset(resumed); await resumed.close();
  for (const [width, height] of [[390, 844], [844, 390]]) {
    const page = await open('spring', { width, height }, { isMobile: true, hasTouch: true }); await enable(page);
    const client = await page.context().newCDPSession(page);
    const box = await page.locator('.gate-seal-control').boundingBox();
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }] });
    await page.waitForTimeout(1550);
    assert((await metrics(page)).painted > 100);
    await page.screenshot({ path: 'tmp/ink-fireworks/' + width + 'x' + height + '.png' });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForFunction(() => document.querySelector('.ink-fireworks-field:not([data-tracer-outgoing])').dataset.inkState === 'idle');
    assert.equal((await metrics(page)).painted, 0);
    await client.detach(); await page.close();
  }
  const reduced = await open('winter-light', { width: 390, height: 844 });
  assert.equal(await reduced.locator(field).getAttribute('data-ink-state'), 'skipped');
  assert.equal(await reduced.locator(field).evaluate(canvas => canvas.width * canvas.height), 0);
  await reduced.getByRole('button', { name: 'Open Sesame?', exact: true }).click();
  await reduced.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  await reduced.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: GPU ink, rotating cross, hover clock, rewind, re-entry, exact completion, contour handoff, touch, reduced motion.');
} catch (error) {
  for (const page of browser.contexts().flatMap(context => context.pages())) {
    console.log(await page.locator(field).evaluate(canvas => ({ data: { ...canvas.dataset }, chapter: document.querySelector('.archive-viewport').dataset.chapter })));
    await page.screenshot({ path: 'tmp/ink-fireworks/failure.png' });
  }
  console.log({ errors });
  throw error;
} finally { await browser.close(); }
