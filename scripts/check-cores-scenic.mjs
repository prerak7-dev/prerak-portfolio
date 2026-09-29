import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/';
const output = 'tmp/scenic-cores';
const errors = [];
await mkdir(output, { recursive: true });

const idle = page => page.waitForFunction(() => {
  const root = document.querySelector('.archive-viewport');
  return root?.dataset.chapterCopyPhase === 'idle' && root.classList.contains('chapter-settled')
    && !root.dataset.textContentPhase && !root.dataset.textDissolving && !document.querySelector('.text-contour-ghosts')
    && !document.documentElement.classList.contains('theme-contour-transition-active');
});
const chapter = async (page, name, id) => {
  await page.getByRole('tab', { name, exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(id => document.querySelector('.archive-viewport')?.dataset.chapter === id, id);
  await idle(page);
};
const enter = async page => {
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url);
  await page.waitForFunction(() => !document.querySelector('#boot-loader')
    && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete');
  await chapter(page, 'Cores', 'cores');
};
const details = page => page.locator('.archive-viewport .core-detail-copy');
const selected = async (page, index) => {
  await page.waitForFunction(index => document.querySelector(`#core-sun-${index}`)?.getAttribute('aria-expanded') === 'true', index);
  await idle(page);
};
const inspect = async page => {
  const result = await page.evaluate(() => {
    const box = node => node.getBoundingClientRect().toJSON();
    const scene = document.querySelector('.archive-viewport .contour-cores');
    const buttons = [...scene.querySelectorAll('.core-sun')];
    const heading = scene.querySelector('.cores-chapter-heading');
    const detail = scene.querySelector('.core-detail');
    const tab = getComputedStyle(document.querySelector('.contour-project-tabs button'));
    const lore = getComputedStyle(document.querySelector('.lore-parchment p'));
    return {
      labels: buttons.map(node => ({ box: box(node), text: box(node.querySelector('.core-sun-name')), overflow: node.scrollWidth - node.clientWidth })),
      heading: box(heading), headingOverflow: heading.scrollHeight - heading.clientHeight,
      detail: box(detail), detailOverflow: detail.scrollHeight - detail.clientHeight,
      font: [lore.fontFamily, lore.fontWeight], tabFont: [tab.fontFamily, tab.fontWeight],
      detailText: detail.textContent, image: document.querySelector('.cores-plate img').currentSrc,
      lore: document.querySelector('.lore-toggle').getAttribute('aria-expanded') === 'true' ? box(document.querySelector('.lore-parchment')) : null,
    };
  });
  const { width, height } = page.viewportSize();
  assert.deepEqual(result.font, result.tabFont, 'Lore must match the rendered Case Studies tab font');
  assert(result.headingOverflow <= 1, `Heading overflows at ${width}x${height}: ${JSON.stringify(result)}`);
  assert(result.detailOverflow <= 1, `Details overflow at ${width}x${height}: ${JSON.stringify(result)}`);
  const separate = (a, b) => a.right <= b.left + 1 || b.right <= a.left + 1 || a.bottom <= b.top + 1 || b.bottom <= a.top + 1;
  assert(separate(result.heading, result.detail), 'Heading overlaps details');
  for (const [index, { box, text, overflow }] of result.labels.entries()) {
    assert(box.left >= 0 && box.right <= width + 1 && box.top >= 0 && box.bottom <= height, 'Title outside viewport');
    assert(box.height >= 44 && overflow <= 1 && text.width <= box.width + 1, `Title does not fit: ${JSON.stringify(result.labels[index])}`);
    assert(separate(box, result.detail), 'Details overlap a sun title');
    result.labels.slice(index + 1).forEach(other => assert(separate(box, other.box), 'Sun hit boxes overlap'));
  }
  if (result.lore && width >= 1200 && height >= 600) {
    assert(result.lore.top >= 80, 'Lore crosses the header');
    assert(separate(result.lore, result.detail), 'Lore crosses the core details');
    result.labels.forEach(({ box }) => assert(separate(result.lore, box), 'Lore crosses a sun title'));
  }
  return result;
};

try {
  for (const [width, height] of [[1440, 900], [390, 844], [320, 568], [844, 390], [568, 320], [768, 1024]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width < 1000 });
    await enter(page);
    for (let index = 0; index < 3; index++) {
      await page.locator(`#core-sun-${index}`).click();
      await selected(page, index);
      await inspect(page);
    }
    if (width >= 1200 && await page.locator('.lore-toggle').getAttribute('aria-expanded') === 'false') {
      await page.locator('.lore-toggle').click();
      await idle(page);
      await inspect(page);
    }
    const path = `${output}/${width}x${height}.png`;
    await page.screenshot({ path });
    const stats = await sharp(path).stats();
    assert(stats.channels.some(channel => channel.stdev > 20), 'Blank scene');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('.core-detail').textContent);
    console.log(JSON.stringify({ width, height, layout: 'pass' }));
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await enter(page);
  await page.locator('#core-sun-0').hover();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'entering');
  assert(await details(page).evaluate(node => getComputedStyle(node).maskImage.includes('text-contour-')), 'Missing contour entry');
  await selected(page, 0);
  await page.mouse.move(500, 100);
  assert.match(await details(page).innerText(), /Reliable backends/, 'Details disappear when leaving the title');
  await page.locator('#core-sun-1').hover();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').dataset.textContentPhase === 'exiting');
  const outgoing = await page.locator('.text-contour-ghosts').innerText();
  assert.match(outgoing, /Reliable backends/);
  assert(!/Three cores|One connected practice|Case studies|SERVICES/i.test(outgoing), 'Unchanged text was rewritten');
  await page.locator('#core-sun-2').hover();
  await selected(page, 2);
  assert.match(await details(page).innerText(), /Observable systems/, 'Rapid hover did not keep the latest selection');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('.core-detail').textContent);
  await idle(page);
  await page.locator('#core-sun-1').focus();
  await selected(page, 1);
  assert.match(await details(page).innerText(), /Production tooling/);

  await page.locator('#core-sun-0').hover();
  await chapter(page, 'Case Studies', 'projects');
  await page.mouse.move(500, 100);
  await chapter(page, 'Cores', 'cores');
  assert.equal(await page.locator('.core-detail').textContent(), '', 'Stale hover survived a chapter change');
  await page.locator('#core-sun-2').hover();
  await selected(page, 2);
  for (const name of ['Winter', 'Spring', 'Fall', 'Monochrome']) {
    await page.getByRole('button', { name, exact: true }).click();
    await idle(page);
    for (let mode = 0; mode < 2; mode++) {
      await page.getByRole('switch', { name: 'Light appearance' }).click();
      await idle(page);
      await inspect(page);
      assert.match(await details(page).innerText(), /Observable systems/, 'Theme change lost the selected core');
    }
  }
  for (const [width, height] of [[1200, 600], [1920, 1080], [390, 844], [844, 390], [320, 568], [568, 320]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(450);
    await inspect(page);
  }
  assert.deepEqual(errors, []);
  console.log('PASS: scoped contour reveals, rapid hover, keyboard dismissal, chapter interruption, all appearances, and rotation');
  await page.close();
} finally {
  await browser.close();
}
