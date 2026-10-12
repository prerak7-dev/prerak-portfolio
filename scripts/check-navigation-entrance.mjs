import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium, devices } = require('playwright');
const server = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint());
const output = 'tmp/navigation-entrance', errors = [];
await mkdir(output, { recursive: true });

async function open(options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference', ...options });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.stack));
  await page.addInitScript(() => {
    localStorage.setItem('aegis-theme', 'default-light');
    window.entranceAudit = [];
    const sample = now => {
      const root = document.querySelector('.archive-viewport'), rail = document.querySelector('.chapter-rail');
      if (root && rail) window.entranceAudit.push({ now, home: root.dataset.homeIntroStage,
        copy: root.dataset.chapterCopyPhase, chapter: root.dataset.chapter, entry: rail.dataset.entryPhase,
        hidden: getComputedStyle(rail).visibility === 'hidden' || Number(getComputedStyle(rail).opacity) === 0,
        inert: rail.inert,
      });
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  return page;
}

const complete = page => page.waitForFunction(() => document.querySelector('.chapter-rail')?.dataset.entryPhase === 'complete', null, { timeout: 60000 });
const entryCount = page => page.evaluate(() => entranceAudit.filter((sample, index) => sample.entry === 'entering' && entranceAudit[index - 1]?.entry !== 'entering').length);

try {
  for (const [name, options] of [
    ['desktop', {}],
    ['portrait', { ...devices['Pixel 7'] }],
    ['landscape', { ...devices['Pixel 7'], viewport: { width: 839, height: 412 }, screen: { width: 839, height: 412 } }],
  ]) {
    const page = await open(options);
    await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'motto', null, { timeout: 60000 });
    assert.equal(await page.locator('.chapter-rail').getAttribute('data-entry-phase'), 'waiting');
    await page.waitForFunction(() => document.querySelector('.chapter-rail')?.dataset.entryPhase === 'entering');
    await page.waitForTimeout(500);
    const frames = await page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'chapter-rail-entrance')
      .map(animation => ({ frames: animation.effect.getKeyframes().length, translate: getComputedStyle(animation.effect.target).translate })));
    assert.equal(frames.length, 7, 'Every label and satellite should enter as one button');
    assert(frames.every(frame => frame.frames === 121 && frame.translate !== 'none' && frame.translate !== '0px'));
    await page.screenshot({ path: `${output}/${name}-entering.png` });
    await complete(page);
    const audit = await page.evaluate(() => entranceAudit);
    const before = audit.filter(sample => sample.home !== 'complete');
    assert(before.length > 30 && before.every(sample => sample.entry === 'waiting' && sample.hidden && sample.inert), 'Navigation appeared before the Home content finished');
    assert(audit.filter(sample => sample.entry === 'entering').every(sample => sample.home === 'complete' && sample.copy === 'idle' && sample.inert));
    assert.equal(await entryCount(page), 1);
    assert(await page.locator('.chapter-rail').evaluate(rail => !rail.inert));
    assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'chapter-rail-entrance').length), 0);
    await page.screenshot({ path: `${output}/${name}-complete.png` });
    const select = async label => {
      const tab = page.getByRole('tab', { name: label, exact: true });
      if (name === 'desktop') await tab.click(); else await tab.tap();
    };
    await select('Cores');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores'
      && document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle'
      && document.querySelector('.archive-viewport').classList.contains('chapter-settled')
      && !document.documentElement.classList.contains('theme-contour-transition-active'), null, { timeout: 45000 });
    await select('Home');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'intro'
      && document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle'
      && document.querySelector('.archive-viewport').classList.contains('chapter-settled')
      && !document.documentElement.classList.contains('theme-contour-transition-active'), null, { timeout: 45000 });
    await page.getByRole('switch', { name: 'Light appearance' }).click();
    await page.waitForFunction(() => document.querySelector('.archive-app').classList.contains('theme-default')
      && !document.documentElement.classList.contains('theme-contour-transition-active'), null, { timeout: 45000 });
    assert.equal(await entryCount(page), 1, 'Returning Home and switching themes must not replay the initial entrance');
    assert.equal(await page.locator('.chapter-rail').getAttribute('data-entry-phase'), 'complete');
    console.log(`PASS ${name}: Home finishes first, seven orbital entrances, no replay on chapter/theme changes.`);
    await page.context().close();
  }

  const reduced = await open({ ...devices['Pixel 7'], reducedMotion: 'reduce' });
  await complete(reduced);
  assert.equal(await entryCount(reduced), 0);
  assert.equal(await reduced.locator('.archive-viewport').getAttribute('data-chapter-copy-phase'), 'idle');
  assert(await reduced.locator('.chapter-rail').evaluate(rail => !rail.inert));
  await reduced.context().close();

  const interrupted = await open({ ...devices['Pixel 7'] });
  await interrupted.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'role', null, { timeout: 60000 });
  await interrupted.evaluate(() => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) / 6));
  await complete(interrupted);
  assert.equal(await interrupted.locator('.archive-viewport').getAttribute('data-chapter'), 'cores');
  assert.equal(await entryCount(interrupted), 1);
  await interrupted.context().close();

  const rotate = await open({ ...devices['Pixel 7'] });
  await rotate.waitForFunction(() => document.querySelector('.chapter-rail')?.dataset.entryPhase === 'entering', null, { timeout: 60000 });
  await rotate.setViewportSize({ width: 839, height: 412 });
  await complete(rotate);
  await rotate.waitForTimeout(200);
  assert.equal(await rotate.locator('.chapter-rail').getAttribute('data-layout'), 'contour');
  assert.equal(await rotate.evaluate(() => document.getAnimations().filter(animation => animation.id === 'chapter-rail-entrance').length), 0);
  await rotate.context().close();
  assert.deepEqual(errors, []);
  console.log('PASS: reduced motion, early scrolling and rotation cannot strand or restart navigation.');
} catch (error) {
  console.error(error); console.error(errors); process.exitCode = 1;
  for (const context of browser.contexts()) for (const page of context.pages()) {
    console.log(await page.evaluate(() => entranceAudit.slice(-5)).catch(() => []));
    await page.screenshot({ path: `${output}/failure.png` }).catch(() => {});
  }
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL'); await new Promise(resolve => setTimeout(resolve, 250)); process.exit(process.exitCode || 0);
  } else await server.close();
}
