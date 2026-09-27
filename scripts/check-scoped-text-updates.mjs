import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
const panel = '.contour-projects .contour-reading-list';
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled')
    && !root.dataset.textContentPhase && !document.querySelector('.text-contour-ghosts')
    && !document.documentElement.matches('.theme-contour-transition-active, .theme-assets-preparing');
});
async function startAudit(page, scope = panel) {
  await page.evaluate(scope => {
    const root = document.querySelector('.archive-viewport');
    const stable = [...document.querySelectorAll('.archive-header, .chapter-rail, .contour-projects > header, .contour-project-tabs, .case-focus-modes, .contour-projects > footer')]
      .flatMap(node => [node, ...node.querySelectorAll('*')]);
    const text = stable.map(node => node.textContent);
    const audit = { outsideMasks: [], outsideGhosts: [], exits: 0, rewritten: false, detached: false, frame: 0, phase: '' };
    const sample = () => {
      const phase = root.dataset.textContentPhase;
      if (phase === 'exiting' && audit.phase !== phase) audit.exits++;
      audit.phase = phase;
      audit.detached ||= stable.some(node => !node.isConnected);
      audit.rewritten ||= stable.some((node, index) => node.textContent !== text[index]);
      for (const node of root.querySelectorAll('.material-text')) {
        if (node.style.maskImage && !node.closest(scope)) audit.outsideMasks.push(node.textContent);
      }
      const allowed = new Set([...root.querySelectorAll(`${scope} .material-text`)].map(node => node.textContent));
      for (const node of document.querySelectorAll('.text-contour-ghosts > div > *')) {
        if (!allowed.has(node.textContent)) audit.outsideGhosts.push(node.textContent);
      }
      audit.frame = requestAnimationFrame(sample);
    };
    window.scopedTextAudit = audit; sample();
  }, scope);
}
async function finishAudit(page, expectedExits) {
  await idle(page);
  await page.waitForTimeout(100);
  await idle(page);
  const audit = await page.evaluate(() => {
    const audit = window.scopedTextAudit;
    cancelAnimationFrame(audit.frame);
    return audit;
  });
  assert.equal(audit.exits, expectedExits, JSON.stringify(audit));
  assert.deepEqual(audit.outsideMasks, [], 'Unchanged content received a dissolve mask');
  assert.deepEqual(audit.outsideGhosts, [], 'Unchanged content was captured for replay');
  assert.equal(audit.rewritten, false, 'A static heading or tab label was rewritten');
  assert.equal(audit.detached, false, 'Static navigation or controls were remounted');
}
await mkdir('tmp/scoped-text-updates', { recursive: true });
try {
  for (const [width, height] of [[1440, 900], [390, 844], [844, 390]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', isMobile: width < 1000, hasTouch: width < 1000 });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto(url); await idle(page);
    await page.getByRole('tab', { name: 'Case Studies', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'projects');
    await idle(page);
    const collapse = page.getByRole('button', { name: 'Collapse lore guide', exact: true });
    if (await collapse.count()) await collapse.click();
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await idle(page);
    const click = label => page.getByRole('button', { name: label, exact: true }).click();

    await startAudit(page);
    await click('Pipeline'); await click('Overview');
    await finishAudit(page, 0);

    await startAudit(page);
    await click('Evidence'); await click('Evidence'); await click('Evidence');
    await finishAudit(page, 1);
    assert.equal(await page.locator(panel).getAttribute('data-mode'), 'Evidence');

    await startAudit(page);
    await page.locator(panel).focus(); await page.keyboard.press('PageDown');
    await finishAudit(page, 1);
    const readingPage = await page.locator(panel).getAttribute('data-reading-page');
    assert.notEqual(readingPage, '0');
    await startAudit(page);
    await click('Evidence'); await click('Pipeline');
    await finishAudit(page, 0);
    assert.equal(await page.locator(panel).getAttribute('data-reading-page'), readingPage, 'Reselecting a tab reset reading progress');

    // A gesture queued on the outgoing project must not animate the incoming panel again.
    await startAudit(page);
    await click('Plugin');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
    await page.locator(panel).focus(); await page.keyboard.press('Home');
    await finishAudit(page, 1);
    assert.equal(await page.locator(panel).getAttribute('data-reading-page'), '0');
    assert.equal(await page.locator(panel).getAttribute('data-mode'), 'Overview');

    await startAudit(page);
    await click('Pipeline'); await click('Telemetry'); await click('Stack');
    await page.waitForFunction(() => document.querySelector('.contour-project-tabs button:last-child').getAttribute('aria-pressed') === 'true'
      && document.querySelector('.contour-reading-list[data-mode="Stack"]'));
    await finishAudit(page, 3);

    await startAudit(page);
    await click('Plugin'); await click('Stack');
    await finishAudit(page, 2);
    assert.equal(await page.locator(panel).getAttribute('data-mode'), 'Stack', 'A currently selected mode was lost after the queued project reset');
    await page.screenshot({ path: `tmp/scoped-text-updates/tabs-${width}.png` });

    if (width === 1440) {
      await startAudit(page, '.lore-parchment');
      await click('Expand lore guide'); await finishAudit(page, 1);
      await startAudit(page, '.lore-parchment');
      await click('Collapse lore guide'); await finishAudit(page, 1);
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await startAudit(page);
    await click('Plugin'); await click('Stack'); await finishAudit(page, 0);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, height, scopedMasks: true, stableControls: true, redundantRequestsSkipped: true, readingProgressRetained: true, queuedSelections: true, errors }));
    await page.close();
  }
} finally { await browser.close(); }
