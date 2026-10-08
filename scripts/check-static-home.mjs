import { createRequire } from 'node:module';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForTimeout(11000);
    await page.screenshot({ path: `static-home-${width}.png` });
    await page.evaluate(() => scrollTo(0, (document.documentElement.scrollHeight-innerHeight)/6*.62));
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `static-home-dissolve-${width}.png` });
    console.log(JSON.stringify({ width, errors, state: await page.evaluate(() => ({
      gateImages: document.querySelectorAll('.gateway-sequence-preloads img').length,
      gateCanvas: !!document.querySelector('.gateway-sequence-canvas'),
      contourVisible: [...document.querySelectorAll('canvas')].filter(n => n.className.includes('contour')).map(n=>getComputedStyle(n).visibility),
      frames: performance.getEntriesByType('resource').filter(n=>/gateway.*frame-/.test(n.name)).map(n=>n.name.split('/').at(-1)),
    })) }));
    await page.close();
  }
} finally { await browser.close(); }
