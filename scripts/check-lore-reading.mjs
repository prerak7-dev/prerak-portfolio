import { createRequire } from 'node:module';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForTimeout(10000);
  await page.locator('.chapter-rail-list button').filter({ hasText: 'Cores' }).click({ force: true });
  await page.mouse.move(500, 100);
  const guide = page.locator('.spatial-lore-guide');
  await page.waitForFunction(() => document.querySelector('.lore-parchment p')?.textContent.includes('Three suns'));
  await page.waitForFunction(() => document.querySelector('.spatial-lore-guide')?.classList.contains('is-collapsed'), { timeout: 25000 });
  await page.getByRole('button', { name: 'Expand lore guide' }).click({ force: true });
  if (await guide.evaluate(node => node.classList.contains('is-collapsed'))) throw new Error('Reopen failed');
  console.log(JSON.stringify({ errors, autoHide: true, reopen: true }));
  if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
