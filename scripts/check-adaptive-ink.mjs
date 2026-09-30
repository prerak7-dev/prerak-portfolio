import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
await mkdir('tmp/adaptive-ink', { recursive: true });
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && !root.dataset.textContentPhase
    && !document.documentElement.classList.contains('theme-contour-transition-active');
});
const init = async page => {
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
  await idle(page);
};
const check = async (page, name) => {
  await page.waitForTimeout(180);
  const result = await page.evaluate(() => {
    const root = document.querySelector('.archive-viewport');
    const visible = [...root.querySelectorAll('.material-text')].filter(node => {
      const rect = node.getBoundingClientRect(), style = getComputedStyle(node);
      return node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.bottom <= innerHeight
        && style.visibility !== 'hidden' && !node.closest('[aria-hidden="true"], [data-reading-hidden], [data-home-awaiting]');
    });
    return { adapted: visible.filter(node => node.dataset.adaptiveInk).length, total: visible.length,
      refresh: root.dataset.inkRefresh, material: visible.map(node => ({
        text: node.textContent.slice(0, 40), color: getComputedStyle(node).color,
        hasWash: node.style.getPropertyValue('--ink-wash-images').includes('data:image'),
      })) };
  });
  await page.screenshot({ path: `tmp/adaptive-ink/${name}.png` });
  assert(result.adapted > 5, `${name}: expected adaptive text`);
  assert(result.adapted / result.total > .8, `${name}: ${result.adapted}/${result.total} targets prepared`);
  const labels = await page.locator('.chapter-rail-list button strong.material-text').evaluateAll(nodes => nodes.map(node => {
    const style = getComputedStyle(node);
    const label = node.getBoundingClientRect(), button = node.closest('button').getBoundingClientRect();
    return { text: node.textContent, weight: style.fontWeight, synthesis: style.fontSynthesis,
      shadow: style.textShadow, stroke: style.webkitTextStrokeWidth,
      fits: label.left >= button.left - 1 && label.right <= button.right + 1 };
  }));
  assert(labels.length >= 3);
  for (const label of labels) {
    assert.equal(label.weight, '700', `${name}: ${label.text}`);
    assert.equal(label.synthesis, 'weight', `${name}: ${label.text} must render a genuinely heavier face`);
    assert.equal(label.shadow, 'none');
    assert.equal(label.stroke, '0px');
    assert(label.fits, `${name}: ${label.text} must fit its hit box`);
  }
  console.log(`${name}: ${result.adapted}/${result.total} visible targets`);
};
try {
  if (!process.argv.includes('--motion-only')) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await init(page);
  for (const [label, season] of [['Monochrome', 'default'], ['Fall', 'fall'], ['Spring', 'spring'], ['Winter', 'winter']]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForFunction(season => [...document.querySelector('.archive-viewport').classList]
      .some(name => name === `theme-${season}` || name === `theme-${season}-light`), season);
    await idle(page);
    for (const light of [false, true]) {
      const appearance = page.getByRole('switch', { name: 'Light appearance' });
      if ((await appearance.getAttribute('aria-checked') === 'true') !== light) await appearance.click();
      const theme = `${season}${light ? '-light' : ''}`;
      await page.waitForFunction(theme => document.querySelector('.archive-viewport').classList.contains(`theme-${theme}`), theme);
      await idle(page);
      await page.mouse.move(0, 890);
      await check(page, theme);
    }
  }
  for (const [label, chapter] of [['Cores', 'cores'], ['Case Studies', 'projects'], ['Experience', 'professional'], ['Education', 'education'], ['Field Notes', 'personal'], ['Contact', 'contact']]) {
    await page.getByRole('tab', { name: label, exact: true }).click();
    await page.waitForFunction(chapter => document.querySelector('.archive-viewport').dataset.chapter === chapter, chapter);
    await idle(page);
    await check(page, chapter);
    if (chapter === 'projects') {
      const unchanged = await page.locator('.archive-identity').evaluate(node => node.innerHTML);
      await page.getByRole('button', { name: 'Plugin', exact: true }).click();
      await idle(page);
      assert.equal(await page.locator('.archive-identity').evaluate(node => node.innerHTML), unchanged, 'Tab selection must not repaint unrelated identity');
    }
  }
  await page.waitForTimeout(1000);
  const count = await page.locator('.archive-viewport').getAttribute('data-ink-refresh');
  await page.waitForTimeout(1200);
  assert.equal(await page.locator('.archive-viewport').getAttribute('data-ink-refresh'), count, 'No idle contrast loop');
  await page.emulateMedia({ forcedColors: 'active' });
  await page.waitForTimeout(100);
  assert.equal(await page.locator('[data-adaptive-ink]').count(), 0);
  await page.close();
  for (const [width, height] of [[390, 844], [844, 390]]) {
    const mobile = await browser.newPage({ viewport: { width, height }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    await init(mobile);
    await check(mobile, `${width}x${height}`);
    assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await mobile.close();
  }
  }
  const motion = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await init(motion);
  await motion.emulateMedia({ reducedMotion: 'no-preference' });
  await motion.getByRole('button', { name: 'Fall', exact: true }).click();
  await motion.waitForFunction(() => document.querySelector('.text-contour-ghosts [data-adaptive-ink]'));
  assert(await motion.locator('.text-contour-ghosts').evaluate(node => node.style.maskImage.includes('text-contour')));
  const outgoingLabel = motion.locator('.text-contour-ghosts strong').filter({ hasText: /^Home$/ }).first();
  assert.equal(await outgoingLabel.evaluate(node => getComputedStyle(node).fontWeight), '700');
  assert.equal(await outgoingLabel.evaluate(node => getComputedStyle(node).fontSynthesis), 'weight', 'Dissolving labels must retain their bold face');
  await motion.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('theme-fall'));
  await idle(motion);
  await motion.locator('.intro-role').first().hover();
  await motion.waitForFunction(() => document.querySelector('.text-brush-wash'));
  const pigments = await motion.evaluate(() => ({
    hover: document.querySelector('.text-brush-wash').style.getPropertyValue('--brush-pigment').trim(),
    ink: document.querySelector('.intro-role').style.getPropertyValue('--adaptive-ink-paper').trim(),
  }));
  assert.equal(pigments.hover, pigments.ink, 'Hover paint must support the locally selected ink');
  await motion.mouse.move(0, 890);
  await motion.getByRole('tab', { name: 'Cores', exact: true }).click({ force: true });
  await motion.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores');
  await idle(motion);
  await motion.waitForTimeout(1000);
  const settled = await motion.locator('.archive-viewport').getAttribute('data-ink-refresh');
  await motion.waitForTimeout(1200);
  assert.equal(await motion.locator('.archive-viewport').getAttribute('data-ink-refresh'), settled, 'Ambient animation must not resample contrast');
  await motion.close();
  assert.deepEqual(errors, []);
  console.log(process.argv.includes('--motion-only') ? 'PASS: contour masks, hover pigment, and zero idle refreshes during ambient motion.'
    : 'PASS: eight appearances, all chapters, scoped tab changes, mobile orientations, forced colors, contour masks, hover pigment, and zero idle refreshes.');
} finally { await browser.close(); }
