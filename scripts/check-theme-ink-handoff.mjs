import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const server = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint());
const errors = [], output = 'tmp/theme-ink-handoff';
await mkdir(output, { recursive: true });

async function settled(page, theme) {
  await page.waitForFunction(theme => {
    const root = document.querySelector('.archive-viewport');
    return root?.classList.contains(`theme-${theme}`) && root.dataset.chapterCopyPhase === 'idle'
      && root.classList.contains('chapter-settled') && !document.documentElement.classList.contains('theme-contour-transition-active');
  }, theme, { timeout: 45000 });
  await page.mouse.move(2, 300);
  await page.waitForTimeout(800);
}

async function checkInk(page, theme) {
  const result = await page.evaluate(theme => {
    const nodes = [...document.querySelectorAll('.archive-viewport [data-adaptive-ink]')].filter(node =>
      !node.closest('.text-contour-ghosts, [aria-hidden="true"], [data-reading-hidden]')
      && node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
      && node.getBoundingClientRect().top < innerHeight && node.getBoundingClientRect().bottom > 0);
    const image = document.querySelector('.cores-plate img');
    return { count: nodes.length, wrong: nodes.filter(node => node.dataset.inkTheme !== theme || node.dataset.inkPainting !== image.currentSrc)
      .map(node => ({ text: node.textContent, theme: node.dataset.inkTheme, painting: node.dataset.inkPainting })),
      labels: nodes.filter(node => node.matches('.chapter-rail-list strong')).map(node => ({ text: node.textContent,
        ink: node.style.getPropertyValue('--type-ink-color'), paper: node.style.getPropertyValue('--adaptive-ink-paper') })) };
  }, theme);
  assert(result.count >= 8, `${theme}: meaningful visible text coverage`);
  assert.deepEqual(result.wrong, [], `${theme}: text must sample the matching decoded painting`);
  return result.labels;
}

async function checkBrush(page, theme) {
  const target = page.getByRole('tab', { name: 'Cores', exact: true });
  await target.hover();
  await page.waitForFunction(theme => [...document.querySelectorAll('.text-brush-wash')].some(node => node.dataset.brushTheme === theme), theme);
  await page.waitForTimeout(650);
  const colors = await page.evaluate(() => ({
    expected: document.querySelector('.chapter-rail-list [aria-selected="true"] [data-adaptive-ink]')?.style.getPropertyValue('--adaptive-ink-paper').trim(),
    strokes: [...document.querySelectorAll('.text-brush-wash')].map(node => node.style.getPropertyValue('--brush-pigment').trim()),
  }));
  assert(colors.expected && colors.strokes.includes(colors.expected), `${theme}: hover pigment must match the current adaptive paper`);
  assert(colors.strokes.length <= 3, 'Hover layers remain bounded');
}

try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.stack));
    await page.addInitScript(() => localStorage.setItem('aegis-theme', 'default-light'));
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => !document.querySelector('#boot-loader')
      && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.getByRole('tab', { name: 'Cores', exact: true }).click();
    await settled(page, 'default-light');
    // Reproduce the decode interval: the displayed image is complete but is
    // not yet the resource React requested for the incoming appearance.
    await page.evaluate(() => {
      const image = document.querySelector('.cores-plate img');
      image.dataset.src += '#pending-painting';
      const probe = document.createElement('p');
      probe.id = 'ink-handoff-probe'; probe.className = 'material-text';
      probe.textContent = 'Incoming ink';
      probe.style.cssText = 'position:fixed;left:30px;top:180px;width:160px;height:40px';
      document.querySelector('.archive-viewport').append(probe);
    });
    await page.waitForTimeout(350);
    assert.equal(await page.locator('#ink-handoff-probe').getAttribute('data-adaptive-ink'), null,
      'An outgoing decoded painting must not seed incoming adaptive pigment');
    await page.evaluate(() => {
      const image = document.querySelector('.cores-plate img');
      image.dataset.src = image.dataset.src.replace('#pending-painting', '');
      image.dispatchEvent(new Event('load'));
    });
    await page.waitForFunction(() => document.querySelector('#ink-handoff-probe').dataset.inkTheme === 'default-light');
    await page.locator('#ink-handoff-probe').evaluate(node => node.remove());
    for (const [label, season] of [['Monochrome', 'default'], ['Fall', 'fall'], ['Spring', 'spring'], ['Winter', 'winter']]) {
      await page.getByRole('button', { name: label, exact: true }).click();
      await settled(page, `${season}-light`);
      const initial = await checkInk(page, `${season}-light`);
      await checkBrush(page, `${season}-light`);
      for (const theme of [season, `${season}-light`]) {
        await page.getByRole('switch', { name: 'Light appearance' }).click();
        await settled(page, theme);
        const labels = await checkInk(page, theme);
        await checkBrush(page, theme);
        // Parallax can deepen an authored pigment for contrast. Its paper and
        // light/dark polarity must still return to the incoming appearance.
        if (theme.endsWith('-light')) assert.deepEqual(labels.map(({ text, paper }) => ({ text, paper })),
          initial.map(({ text, paper }) => ({ text, paper })), 'A round trip must restore the same label paper');
      }
      await page.screenshot({ path: `${output}/${viewport.width}-${season}.png` });
      console.log(`${viewport.width}px ${season}: repeated light/dark text and brush handoffs passed`);
    }
    await page.mouse.move(2, 300);
    await page.waitForTimeout(1200);
    const refreshes = await page.locator('.archive-viewport').getAttribute('data-ink-refresh');
    await page.waitForTimeout(1000);
    assert.equal(await page.locator('.archive-viewport').getAttribute('data-ink-refresh'), refreshes, 'No idle contrast sampling loop');
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: all seasonal appearances restore matching text and brush pigments across repeated switches on desktop and portrait.');
} catch (error) {
  console.error(error); process.exitCode = 1;
  console.error(errors);
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL'); await new Promise(resolve => setTimeout(resolve, 250)); process.exit(process.exitCode || 0);
  } else await server.close();
}
