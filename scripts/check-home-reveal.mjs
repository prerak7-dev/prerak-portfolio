import { createRequire } from 'node:module';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForTimeout(12000);
  for (const name of ['Fall', 'Spring', 'Winter', 'Monochrome']) {
    await page.getByRole('complementary', { name: 'Theme selector' })
      .getByRole('button', { name, exact: true }).click();
    await page.waitForTimeout(5500);
    if (await page.getByRole('complementary', { name: 'Theme selector' })
      .getByRole('button', { name, exact: true }).getAttribute('aria-pressed') !== 'true') {
      throw new Error(`Theme did not settle: ${name}`);
    }
  }
  for (const label of ['Cores', 'Home']) {
    await page.locator('.chapter-rail-list button').filter({ hasText: label }).click({ force: true });
    await page.waitForTimeout(4500);
  }
  await page.screenshot({ path: 'home-reveal-final.png' });
  console.log(JSON.stringify({ errors, home: await page.locator('.gateway-static-plate').evaluate(node => ({
    opacity: getComputedStyle(node).opacity,
    visibility: getComputedStyle(node).visibility,
    images: node.querySelectorAll('img').length,
  })) }));
  if (errors.length) process.exitCode = 1;
} finally {
  await browser.close();
}
