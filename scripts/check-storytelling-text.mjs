import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
await mkdir('tmp/storytelling-text', { recursive: true });
const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled') && !root.dataset.textContentPhase
    && !document.querySelector('.text-contour-ghosts') && !document.documentElement.matches('.theme-contour-transition-active, .theme-assets-preparing');
});
try {
  for (const [width, height] of [[1440, 900], [390, 844], [844, 390], [568, 320]]) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: width < 1000, hasTouch: width < 1000 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await idle(page);
    const navStyle = await page.evaluate(() => {
      const heading = getComputedStyle(document.querySelector('.archive-identity strong'));
      const label = getComputedStyle(document.querySelector('.chapter-rail-list strong'));
      return { size: label.fontSize, heading: [heading.fontFamily, heading.fontWeight, heading.color, heading.backgroundImage], label: [label.fontFamily, label.fontWeight, label.color, label.backgroundImage] };
    });
    assert.equal(navStyle.size, '12px');
    assert.deepEqual(navStyle.label, navStyle.heading, 'Navigation labels do not share the header material');
    const guide = page.locator('.spatial-lore-guide');
    if ((await guide.getAttribute('class')).includes('is-collapsed')) {
      await page.getByRole('button', { name: 'Expand lore guide', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'entering');
      assert(await page.locator('.lore-parchment p').evaluate(node => node.style.maskImage.includes('text-contour')));
      await idle(page);
    }
    const lore = await page.locator('.lore-parchment').evaluate(node => {
      const rect = node.getBoundingClientRect();
      const p = node.querySelector('p'); const text = p.getBoundingClientRect();
      const avatar = document.querySelector('.lore-medallion').getBoundingClientRect();
      return { rect: rect.toJSON(), text: text.toJSON(), avatar: avatar.toJSON(), align: getComputedStyle(p).textAlign, transform: getComputedStyle(node).transform };
    });
    assert.equal(lore.align, 'left');
    assert.equal(lore.transform, 'none');
    assert(lore.rect.top >= 70 && lore.rect.bottom <= lore.avatar.top + 1, JSON.stringify(lore));
    assert(lore.text.left >= lore.rect.left && lore.text.right <= lore.rect.right + 1);
    await page.screenshot({ path: `tmp/storytelling-text/lore-${width}.png` });
    await page.getByRole('button', { name: 'Collapse lore guide', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
    assert.equal(await page.locator('.lore-parchment').getAttribute('aria-hidden'), 'false', 'Lore collapsed before its contour exit');
    await idle(page);
    await page.getByRole('tab', { name: 'Case Studies', exact: true }).click({ force: true });
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'projects');
    await idle(page);
    const list = page.locator('.contour-projects .contour-reading-list');
    assert(await list.evaluate(node => node.clientHeight >= 64 && node.clientWidth >= 130), 'The reading passage has no usable space');
    await page.getByRole('button', { name: 'Evidence', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.contour-reading-list[data-mode="Evidence"]'));
    await idle(page);
    assert(await list.locator('.contour-record').evaluateAll(nodes => nodes.every(node => node.dataset.category === 'Evidence')));
    const initialTop = await list.evaluate(node => node.scrollTop);
    await list.focus();
    await page.keyboard.press('PageDown');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
    assert.equal(await list.evaluate(node => node.scrollTop), initialTop, 'Reading text moved before dissolving out');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'entering');
    const during = await list.evaluate(node => ({ top: node.scrollTop, masks: [...node.querySelectorAll('.material-text')].filter(text => text.style.maskImage.includes('text-contour')).length }));
    assert(during.top > initialTop + 20 && during.masks > 0, JSON.stringify(during));
    await idle(page);
    await page.getByRole('button', { name: 'Topology', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.contour-reading-list[data-mode="Topology"]'));
    await idle(page);
    assert.equal(await list.getAttribute('data-reading-page'), '0', 'Changing modes retained an unrelated reading position');
    assert(await list.locator('.contour-record').evaluateAll(nodes => nodes.every(node => ['Topology', 'Anim Blueprint', 'Implementation', 'Debug'].includes(node.dataset.category))));
    await page.getByRole('button', { name: 'Evidence', exact: true }).click();
    await list.focus();
    await page.keyboard.press('PageDown');
    await page.waitForFunction(() => document.querySelector('.contour-reading-list[data-mode="Evidence"]'));
    await idle(page);
    assert.equal(await list.getAttribute('data-reading-page'), '0', 'An outgoing-page gesture skipped the incoming details');
    const oldTitle = await list.locator('h3').first().textContent();
    await page.getByRole('button', { name: 'Plugin', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
    assert.equal(await list.locator('h3').first().textContent(), oldTitle, 'Project copy changed before its exit');
    await idle(page);
    assert.notEqual(await list.locator('h3').first().textContent(), oldTitle);
    assert.equal(await list.getAttribute('data-mode'), 'Overview');
    assert.equal(await list.getAttribute('data-reading-page'), '0');
    await page.screenshot({ path: `tmp/storytelling-text/projects-${width}.png` });
    await page.getByRole('button', { name: 'Topology', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.contour-reading-list[data-mode="Topology"]'));
    await idle(page);
    const wheelStart = await list.evaluate(node => node.scrollTop);
    const box = await list.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, 140);
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
    assert.equal(await list.evaluate(node => node.scrollTop), wheelStart);
    await idle(page);
    assert(await list.evaluate((node, start) => node.scrollTop > start, wheelStart));
    if (width < 1000) {
      const cdp = await page.context().newCDPSession(page);
      const x = box.x + box.width / 2; const y = box.y + Math.min(70, box.height - 8);
      const before = await list.evaluate(node => node.scrollTop);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - 40 }] });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
      assert.equal(await list.evaluate(node => node.scrollTop), before);
      await idle(page);
      assert(await list.evaluate((node, before) => node.scrollTop > before, before));
    }
    // A second request during the dissolve must wait, not fall through to a snap.
    await page.getByRole('button', { name: 'Pipeline', exact: true }).click();
    await page.getByRole('button', { name: 'Telemetry', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.contour-project-tabs button:last-child').getAttribute('aria-pressed') === 'true');
    await idle(page);
    await page.getByRole('button', { name: 'Plugin', exact: true }).click();
    await page.getByRole('button', { name: 'Stack', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.contour-project-tabs button:nth-child(2)').getAttribute('aria-pressed') === 'true'
      && document.querySelector('.contour-reading-list[data-mode="Stack"]'));
    await idle(page);
    assert(await list.locator('.contour-record').evaluateAll(nodes => nodes.every(node => node.dataset.category === 'Stack')));
    assert.equal(await list.getAttribute('data-reading-page'), '0');
    await page.getByRole('button', { name: 'Pipeline', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
    await page.getByRole('button', { name: 'Spring', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('theme-spring'));
    await page.waitForFunction(() => document.querySelector('.contour-project-tabs button:first-child').getAttribute('aria-pressed') === 'true');
    await idle(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.getByRole('button', { name: 'Plugin', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Plugin', exact: true }).getAttribute('aria-pressed'), 'true');
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, height, lore: 'aligned', reading: 'contour exit/entry', queuedChanges: 'passed', errors }));
    await page.close();
  }
} finally { await browser.close(); }
