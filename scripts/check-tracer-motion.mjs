import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const baseline = process.argv.includes('--baseline');
const reports = [];
const beginAudit = page => page.evaluate(() => {
  window.tracerAudit = { active: true, raf: [], draws: {} };
});
const finishAudit = page => page.evaluate(() => {
  const audit = window.tracerAudit;
  audit.active = false;
  const interval = audit.raf.slice(1).map((t,i) => t - audit.raf[i]).sort((a,b) => a-b);
  return { frames: audit.raf.length, p95: interval[Math.floor(interval.length * .95)], canvases: Object.entries(audit.draws).map(([name, draws]) => ({ name, frames: draws.length, coverage: draws.length / audit.raf.length })) };
});
function checkAtmosphere(report) {
  const atmosphere = report.canvases.find(canvas => canvas.name === 'cinematic-atmosphere-field');
  assert(atmosphere?.coverage > .9, `Background tracers skipped frames: ${JSON.stringify(report)}`);
}
await mkdir('tmp/tracer-motion', { recursive: true });
try {
  for (const [width, height] of [[1440,900], [390,844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.tracerAudit = { active: false, raf: [], draws: {} };
      const clear = CanvasRenderingContext2D.prototype.clearRect;
      CanvasRenderingContext2D.prototype.clearRect = function (...args) {
        const name = this.canvas.className;
        if (window.tracerAudit.active && /cinematic-atmosphere-field|lore-avatar-contour-field|boundary-filament-field/.test(name)) {
          (window.tracerAudit.draws[name] ||= []).push(performance.now());
        }
        return clear.apply(this, args);
      };
      const frame = now => {
        if (window.tracerAudit.active) window.tracerAudit.raf.push(now);
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle');
    await page.waitForTimeout(500);
    for (const quality of ['high', 'low']) {
      await page.evaluate(quality => {
        document.documentElement.classList.remove('motion-quality-low', 'motion-quality-balanced');
        if (quality === 'low') document.documentElement.classList.add('motion-quality-low');
        window.tracerAudit = { active: true, raf: [], draws: {} };
      }, quality);
      await page.waitForTimeout(1800);
      const report = await finishAudit(page);
      reports.push({ width, height, quality, ...report });
      console.log(JSON.stringify(reports.at(-1)));
      if (!baseline) {
        assert(report.canvases.length >= 2, 'Tracer layers missing');
        report.canvases.forEach(canvas => assert(canvas.coverage > .9, `${canvas.name} skipped animation frames`));
      }
    }
    await page.screenshot({ path: `tmp/tracer-motion/${baseline ? 'before' : 'after'}-${width}.png` });
    if (!baseline) {
      await beginAudit(page);
      await page.getByRole('tab', { name: 'Cores', exact: true }).click({ force: true });
      await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapter === 'cores');
      await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle');
      const chapter = await finishAudit(page);
      checkAtmosphere(chapter);
      reports.push({ width, height, phase: 'chapter', ...chapter });
      console.log(JSON.stringify(reports.at(-1)));

      await beginAudit(page);
      await page.mouse.move(width - 4, height * .6);
      for (let step = 0; step < 8; step++) {
        await page.mouse.wheel(0, height / 5);
        await page.waitForTimeout(60);
      }
      await page.waitForTimeout(800);
      const scroll = await finishAudit(page);
      checkAtmosphere(scroll);
      reports.push({ width, height, phase: 'scroll', ...scroll });
      console.log(JSON.stringify(reports.at(-1)));

      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => document.querySelector('.archive-viewport')?.dataset.chapterCopyPhase === 'idle');
      await page.waitForTimeout(1500);
      await beginAudit(page);
      await page.waitForTimeout(400);
      const reduced = await finishAudit(page);
      assert(reduced.canvases.every(canvas => canvas.frames <= 2), `Reduced motion kept animating: ${JSON.stringify(reduced)}`);

      await beginAudit(page);
      await page.setViewportSize({ width: width - 10, height });
      await page.waitForTimeout(300);
      const resized = await finishAudit(page);
      assert(resized.canvases.some(canvas => canvas.name === 'cinematic-atmosphere-field'), 'Reduced-motion resize did not redraw tracers');
      const visiblePixels = await page.locator('.cinematic-atmosphere-field').evaluate(canvas => {
        const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        let visible = 0;
        for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 80) visible++;
        return visible;
      });
      assert(visiblePixels > 100, 'Reduced-motion tracers were blank after resize');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.waitForTimeout(100);
      await beginAudit(page);
      await page.waitForTimeout(500);
      const resumed = await finishAudit(page);
      checkAtmosphere(resumed);
      reports.push({ width, height, phase: 'reduced-motion', idleDraws: reduced.canvases, resizedVisiblePixels: visiblePixels, resumedCoverage: resumed.canvases });
      console.log(JSON.stringify(reports.at(-1)));
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
  await writeFile(`tmp/tracer-motion/${baseline ? 'before' : 'after'}.json`, JSON.stringify(reports, null, 2));
} finally { await browser.close(); }
