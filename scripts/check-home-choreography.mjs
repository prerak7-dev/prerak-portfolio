import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
await mkdir('tmp/home-choreography', { recursive: true });
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
try {
  const viewports = process.argv.includes('--interruption-only') ? [] : [[1440, 900], [390, 844], [320, 568], [844, 390], [568, 320]];
  for (const [width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: width < 1000, hasTouch: width < 1000 });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'identity');
    const origin = await page.evaluate(() => {
      const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
      return { identity: rect('.archive-identity'), role: rect('.intro-role-orbit'), header: rect('.archive-header'),
        roleHidden: document.querySelector('.intro-role-orbit').hasAttribute('data-home-awaiting'),
        mottoHidden: document.querySelector('.intro-manifesto').hasAttribute('data-home-awaiting') };
    });
    assert(Math.abs(origin.identity.top - origin.role.top) < 1, `${width}: identity did not start at the role`);
    assert(origin.identity.top > origin.header.bottom, `${width}: identity began at the header`);
    assert(origin.roleHidden && origin.mottoHidden);
    await page.evaluate(() => {
      window.identityPositions = [];
      const alpha = node => {
        const id = node?.style.maskImage.match(/#([^"\)]+)/)?.[1];
        const mask = id && document.getElementById(id);
        const filterId = mask?.querySelector('rect')?.getAttribute('filter').match(/#([^\)]+)/)?.[1];
        const filter = filterId && document.getElementById(filterId);
        return filter ? { id: filterId, intercept: filter.querySelector('feFuncA').getAttribute('intercept') } : null;
      };
      const sample = () => {
        const node = document.querySelector('.archive-identity');
        const box = node.getBoundingClientRect();
        window.identityPositions.push({ x: box.x, y: box.y, animations: node.getAnimations().length,
          stage: document.querySelector('.archive-viewport').dataset.homeIntroStage,
          identity: alpha(node), role: alpha(document.querySelector('.intro-role.material-text')) });
        window.identitySample = requestAnimationFrame(sample);
      };
      sample();
    });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `tmp/home-choreography/${width}-identity.png` });
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.homeIntroStage === 'complete');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle');
    const final = await page.evaluate(() => {
      const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
      return { identity: rect('.archive-identity'), header: rect('.archive-header'), motto: rect('.intro-manifesto'),
        font: getComputedStyle(document.querySelector('.intro-manifesto-line')).fontSize,
        iconSizes: [...document.querySelectorAll('.theme-icon-row svg')].map(node => node.getBoundingClientRect().width),
        transform: document.querySelector('.archive-identity').style.transform,
        masks: document.querySelectorAll('[data-chapter-text-mask]').length,
        hidden: document.querySelectorAll('[data-home-awaiting]').length };
    });
    assert.equal(final.transform, ''); assert.equal(final.masks, 0); assert.equal(final.hidden, 0);
    const positions = await page.evaluate(() => { cancelAnimationFrame(window.identitySample); return window.identityPositions; });
    assert(positions.some(position => position.stage === 'identity-exit'), 'No contour exit rendered');
    assert(positions.some(position => position.stage === 'role'), 'No synchronized role entry rendered');
    for (const position of positions) {
      assert.equal(position.animations, 0, 'Identity retained a motion animation');
      const near = box => Math.abs(position.x - box.x) < 1 && Math.abs(position.y - box.y) < 1;
      assert(near(origin.identity) || near(final.identity), `${width}: identity glided between its two reveal positions`);
      if (position.stage === 'identity-exit') {
        assert(near(origin.identity), 'Identity moved before its contour exit finished');
        assert(position.identity?.id.includes('identity-outgoing-filter'));
      }
      if (position.stage === 'role') {
        assert(near(final.identity), 'Identity did not reveal at the header');
        assert(position.identity?.id.includes('identity-incoming-filter'));
        assert(position.role, 'Role did not have a contour entry mask');
        assert.equal(position.identity.intercept, position.role.intercept, 'Header identity and role did not reveal together');
      }
    }
    assert(final.identity.top >= final.header.top && final.identity.bottom <= final.header.bottom + 1);
    assert.equal(final.font, '18.4px');
    assert(final.iconSizes.every(size => size === 20));
    if (width > 1100) assert(final.motto.left < 180 && final.motto.top > 160 && final.motto.bottom < height * .44);
    await page.screenshot({ path: `tmp/home-choreography/${width}-complete.png` });
    console.log(JSON.stringify({ width, height, choreography: 'passed', final }));
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url);
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'identity-exit');
  await page.getByRole('tab', { name: 'Cores', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'exiting');
  for (const selector of ['.intro-manifesto', '.intro-gate-entry', '.lore-parchment']) {
    assert(await page.locator(selector).evaluate(node => node.hasAttribute('data-home-awaiting')), `Unrevealed Home text flashed during interruption: ${selector}`);
  }
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores' && document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle');
  assert.equal(await page.locator('.archive-identity').evaluate(node => node.style.transform), '');
  await page.getByRole('tab', { name: 'Home', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.homeIntroStage === 'role');
  assert.equal(await page.locator('.archive-identity').evaluate(node => node.style.transform), '');
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle');
  await page.reload();
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'identity-exit');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle');
  assert.equal(await page.locator('[data-home-awaiting]').count(), 0);
  assert.equal(await page.locator('.archive-identity').evaluate(node => node.style.transform), '');
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ interruption: 'passed', reducedMotion: 'passed', errors }));
} finally { await browser.close(); }
