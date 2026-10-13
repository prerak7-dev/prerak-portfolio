import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const server = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint());
const errors = [], atlasRequests = [];
const output = 'tmp/seal-without-fireworks';
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
await mkdir(output, { recursive: true });

async function open(theme, viewport = { width: 1440, height: 900 }, options = {}) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce', ...options });
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (request.url().includes('seasonal-swirl-elements')) atlasRequests.push(request.url());
  });
  await page.addInitScript(theme => {
    localStorage.setItem('aegis-theme', theme);
    window.fireworksMounted = false;
    new MutationObserver(() => {
      window.fireworksMounted ||= Boolean(document.querySelector('.ink-fireworks-field'));
    }).observe(document, { childList: true, subtree: true });
  }, theme);
  await page.goto(url);
  await page.waitForFunction(() => !document.querySelector('#boot-loader')
    && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete'
    && document.querySelector('.chapter-rail')?.dataset.entryPhase === 'complete', null, { timeout: 60000 });
  return page;
}

async function enable(page) {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForFunction(() => Boolean(document.querySelector('.gate-seal-painted-face')?.dataset.sealPrepared));
}

async function hover(page) {
  const box = await page.locator('.gate-seal-control').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForFunction(() => document.querySelector('.gate-seal-entry').dataset.sealPhase === 'turning');
}

async function checkTurning(page) {
  await page.waitForFunction(() => Number(document.querySelector('.gate-seal-painted-face')?.dataset.sealAngle) > 10);
  const state = await page.evaluate(() => ({
    chapter: document.querySelector('.archive-viewport').dataset.chapter,
    source: document.querySelector('.cinematic-contour-dissolve').dataset.dissolveSource,
    visibility: document.querySelector('.cinematic-contour-dissolve').style.visibility,
  }));
  assert.equal(state.chapter, 'intro');
  assert.equal(state.source, 'seal');
  assert.equal(state.visibility, 'visible');
  assert.equal(await page.locator('.ink-fireworks-field').count(), 0);
}

async function reset(page) {
  await page.waitForFunction(async () => {
    const { getGateSealPose } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
    const pose = getGateSealPose();
    return !pose.moving && pose.angle < .00001;
  });
  assert.equal(await page.locator('.archive-viewport').getAttribute('data-chapter'), 'intro');
}

async function finish(page) {
  assert.equal(await page.evaluate(() => window.fireworksMounted), false, 'Fireworks must never mount, including transition ghosts');
  await page.context().close();
}

try {
  const themes = process.argv.includes('--quick') ? ['default', 'spring-light']
    : ['default', 'default-light', 'fall', 'fall-light', 'spring', 'spring-light', 'winter', 'winter-light'];
  for (const theme of themes) {
    const page = await open(theme);
    await enable(page);
    await hover(page);
    await checkTurning(page);
    await page.mouse.move(5, 5);
    await reset(page);
    console.log(`PASS ${theme}: seal rotates, contour dissolve follows, release rewinds without fireworks.`);
    await finish(page);
  }

  const completed = await open('spring-light');
  await enable(completed);
  await completed.evaluate(async () => {
    const { getGateSealPose } = await import('/prerak-portfolio/src/state/gateSealTurnStore.js');
    new MutationObserver(() => {
      if (document.querySelector('.gate-seal-entry')?.dataset.sealPhase === 'unlocked') window.unlockedAngle = getGateSealPose().angle;
    }).observe(document.querySelector('.gate-seal-entry'), { attributes: true, attributeFilter: ['data-seal-phase'] });
  });
  await hover(completed);
  await completed.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  assert.equal(await completed.evaluate(() => window.unlockedAngle), 180);
  await finish(completed);
  console.log('PASS desktop full hold: exact half-turn still unlocks Cores.');

  for (const [width, height] of [[390, 844], [844, 390]]) {
    const page = await open('spring', { width, height }, { isMobile: true, hasTouch: true });
    await enable(page);
    const client = await page.context().newCDPSession(page);
    const box = await page.locator('.gate-seal-control').boundingBox();
    const press = () => client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }] });
    await press();
    await checkTurning(page);
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await reset(page);
    await page.screenshot({ path: `${output}/${width}x${height}.png` });
    await press();
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await client.detach();
    await finish(page);
    console.log(`PASS ${width}x${height}: touch cancellation and full hold work without fireworks.`);
  }

  const reduced = await open('winter-light');
  await reduced.getByRole('button', { name: 'Open Sesame?', exact: true }).click();
  await reduced.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  await finish(reduced);
  assert.deepEqual(atlasRequests, [], 'Removed fireworks must not download their sprite sheet');
  assert.deepEqual(errors, []);
  console.log('PASS: no fireworks canvas or sprite requests; desktop, touch and reduced-motion seal entry preserved.');
} catch (error) {
  console.error(error, { errors, atlasRequests });
  process.exitCode = 1;
  for (const context of browser.contexts()) for (const page of context.pages()) {
    await page.screenshot({ path: `${output}/failure.png` }).catch(() => {});
  }
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL');
    await new Promise(resolve => setTimeout(resolve, 250));
    process.exit(process.exitCode || 0);
  } else await server.close();
}
