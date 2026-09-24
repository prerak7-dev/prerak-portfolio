import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const output = 'tmp/navigation-orientation';
await mkdir(output, { recursive: true });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle');
  await page.getByRole('tab', { name: 'Cores', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => {
    const root = document.querySelector('.archive-viewport');
    return root.dataset.chapter === 'cores' && root.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled');
  });
  for (const [width, height] of [[390,844], [844,390], [768,1024], [1024,768], [820,1180], [1180,820], [1024,1366], [1366,1024], [390,844]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(300);
    const result = await page.evaluate(async () => {
      const rail = document.querySelector('.chapter-rail');
      const list = rail.querySelector('.chapter-rail-list');
      const nodes = [...list.querySelectorAll('[role="tab"]')];
      const rects = nodes.map(node => node.getBoundingClientRect().toJSON());
      const selected = list.querySelector('[aria-selected="true"]').getBoundingClientRect();
      const bounds = list.getBoundingClientRect();
      const x = rects[0].x;
      await new Promise(resolve => setTimeout(resolve, 180));
      return {
        layout: rail.dataset.layout,
        orbit: rail.classList.contains('is-orbit-ready'),
        transforms: nodes.map(node => getComputedStyle(node).transform),
        rects,
        drift: Math.abs(nodes[0].getBoundingClientRect().x - x),
        selectedVisible: selected.left >= bounds.left - 1 && selected.right <= bounds.right + 1,
        contentTop: document.querySelector('.contour-content').getBoundingClientRect().top,
        railBottom: rail.getBoundingClientRect().bottom,
      };
    });
    assert.equal(result.layout, 'compact', `${width}x${height}: wrong layout`);
    assert.equal(result.orbit, false);
    assert(result.transforms.every(value => value === 'none'));
    assert(result.rects.every(rect => Math.abs(rect.y - result.rects[0].y) < .5));
    result.rects.slice(1).forEach((rect, index) => assert(rect.left >= result.rects[index].right));
    assert(result.drift < 1 && result.selectedVisible, 'Rotation lost the selected tab or reintroduced orbital motion');
    assert(result.contentTop >= result.railBottom - 1, 'Compact rail overlaps chapter content');
    await page.screenshot({ path: `${output}/${width}x${height}.png` });
    console.log(JSON.stringify({ width, height, layout: result.layout, selectedVisible: result.selectedVisible }));
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
