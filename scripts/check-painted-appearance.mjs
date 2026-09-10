import { createRequire } from 'node:module';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForTimeout(11000);
    const hud = page.getByRole('complementary', { name: 'Theme selector' });
    await page.screenshot({ path: `painted-home-dark-${width}.png` });
    await hud.getByRole('switch', { name: 'Light appearance' }).click({ force: true });
    await page.waitForTimeout(2500);
    for (const name of ['Monochrome', 'Fall', 'Spring', 'Winter']) {
      await hud.getByRole('button', { name, exact: true }).click({ force: true });
      await page.waitForTimeout(2200);
      await page.mouse.move(width / 2, 30);
      await page.screenshot({ path: `painted-home-${name}-${width}.png` });
      for (const chapter of ['Cores', 'Case Studies', 'Experience', 'Education', 'Field Notes', 'Contact', 'Home']) {
        await page.locator('.chapter-rail-list button').filter({ hasText: chapter }).click({ force: true });
        await page.waitForTimeout(650);
        if (chapter === 'Cores' || chapter === 'Case Studies') {
          await page.screenshot({ path: `painted-${chapter.replaceAll(' ', '-')}-${name}-${width}.png` });
        }
      }
    }
    console.log(JSON.stringify({ width, errors, images: await page.locator('.cinematic-environment img').evaluateAll(nodes => nodes.map(n => ({ src: n.getAttribute('src'), ready: n.complete && n.naturalWidth > 0 }))) }));
    if (errors.length) process.exitCode = 1;
    await page.close();
  }
} finally { await browser.close(); }
