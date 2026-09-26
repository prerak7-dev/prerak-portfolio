import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const [width, height] of [[1440, 900], [390, 844], [844, 390], [568, 320]]) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: width < 1000, hasTouch: width < 1000, reducedMotion: 'reduce' });
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle' && document.querySelector('.archive-viewport').classList.contains('chapter-settled'));
    let checked = 0;
    const checkReader = async (selector, label) => {
        const list = page.locator(selector);
        const count = Number(await list.getAttribute('data-reading-pages'));
        const seen = new Set();
        let expected = 0;
        for (let index = 0; index < count; index++) {
          const audit = await list.evaluate(node => {
            const box = node.getBoundingClientRect();
            const bottom = box.top + Number(node.dataset.readingVisibleHeight);
            const visible = []; const clipped = []; let total = 0;
            [...node.children].forEach((block, blockIndex) => {
              const hidden = block.hasAttribute('data-reading-hidden');
              const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
              let textIndex = 0;
              while (walker.nextNode()) {
                if (!walker.currentNode.textContent.trim()) continue;
                const range = document.createRange(); range.selectNodeContents(walker.currentNode);
                [...range.getClientRects()].forEach((rect, lineIndex) => {
                  if (!rect.width || !rect.height) return;
                  total++;
                  if (!hidden && rect.bottom > box.top + 1 && rect.top < bottom - 1) {
                    visible.push(`${blockIndex}:${textIndex}:${lineIndex}`);
                    if (rect.top < box.top - 1.5 || rect.bottom > bottom + 1.5) clipped.push({ text: walker.currentNode.textContent, top: rect.top - box.top, bottom: rect.bottom - bottom });
                  }
                });
                textIndex++;
              }
            });
            return { visible, clipped, total, page: node.dataset.readingPage, height: node.clientHeight, top: node.scrollTop, visibleHeight: node.dataset.readingVisibleHeight };
          });
          assert.equal(Number(audit.page), index);
          assert.deepEqual(audit.clipped, [], `${width} ${label}/${index}: clipped text lines ${JSON.stringify(audit)}`);
          audit.visible.forEach(key => seen.add(key)); expected = audit.total; checked++;
          if (index + 1 < count) {
            await list.focus(); await page.keyboard.press('PageDown');
            await page.waitForFunction(({ selector, index }) => Number(document.querySelector(selector).dataset.readingPage) === index, { selector, index: index + 1 });
          }
        }
        assert.equal(seen.size, expected, `${width} ${label}: text was lost between pages`);
    };
    const collapse = page.getByRole('button', { name: 'Collapse lore guide' });
    if (await collapse.count()) await collapse.click();
    await checkReader('.intro-copy-stage', 'Home');
    await page.getByRole('button', { name: 'Expand lore guide' }).click();
    await checkReader('.lore-parchment', 'Lore');
    await page.getByRole('button', { name: 'Collapse lore guide' }).click();
    await page.getByRole('tab', { name: 'Cores', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'cores' && document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle');
    await checkReader('.contour-cores .contour-reading-list', 'Cores');
    if (!await page.getByRole('tab', { name: 'Case Studies', exact: true }).count()) {
      await page.getByRole('button', { name: 'Next chapters', exact: true }).click();
    }
    await page.getByRole('tab', { name: 'Case Studies', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.chapter === 'projects' && document.querySelector('.archive-viewport').classList.contains('chapter-settled'));
    for (const project of ['Pipeline', 'Plugin', 'Telemetry']) {
      await page.getByRole('button', { name: project, exact: true }).click();
      for (const mode of ['Overview', 'Evidence', 'Topology', 'Stack']) {
        await page.getByRole('button', { name: mode, exact: true }).click();
        await page.waitForFunction(mode => document.querySelector('.contour-projects .contour-reading-list').dataset.mode === mode, mode);
        await checkReader('.contour-projects .contour-reading-list', `${project}/${mode}`);
      }
    }
    console.log(JSON.stringify({ width, height, pagesChecked: checked, clippedOrMissingLines: 0 }));
    await page.close();
  }
} finally { await browser.close(); }
