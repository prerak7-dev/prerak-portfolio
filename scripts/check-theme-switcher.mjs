import { createRequire } from 'node:module';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
    await page.locator('.theme-switcher').waitFor({ state: 'visible' });
    await page.waitForTimeout(10000);
    const panel = page.getByRole('complementary', { name: 'Theme selector' });
    if (await panel.getByRole('button').count() !== 4) throw new Error('Expected four theme icons');
    if (await panel.locator('input').count()) throw new Error('Slider still present');
    for (const name of ['Fall', 'Spring', 'Winter', 'Monochrome']) {
      await panel.getByRole('button', { name, exact: true }).click();
      await page.waitForTimeout(1800);
      if (await panel.getByRole('button', { name, exact: true }).getAttribute('aria-pressed') !== 'true') throw new Error('Theme selection failed: '+name);
    }
    await page.screenshot({ path: `theme-switcher-${width}.png` });
    console.log({ width, errors, panel: await panel.boundingBox(), texture: await page.locator('.theme-switcher-wash').evaluate(n=>getComputedStyle(n).backgroundImage), arrow: await page.locator('.lore-toggle').innerHTML() });
    await page.close();
  }
} finally { await browser.close(); }
