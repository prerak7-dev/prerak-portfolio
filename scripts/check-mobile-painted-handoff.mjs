import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium, devices } = require('playwright'), sharp = require('sharp');
const server = await chromium.launchServer({ headless: true, args: ['--max-active-webgl-contexts=8'],
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint());
const output = 'tmp/mobile-painted-handoff', errors = [], warnings = [];
await mkdir(output, { recursive: true });

async function auditGraphics(page) {
  await page.addInitScript(() => {
    localStorage.setItem('aegis-theme', 'default-light');
    window.graphicsAudit = { contexts: [], peak: 0, poses: [] };
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      const gl = original.call(this, type, ...args), audit = window.graphicsAudit;
      if (!gl || !/webgl/.test(type) || audit.contexts.some(entry => entry.gl === gl)) return gl;
      const entry = { gl, canvas: this, lost: false };
      audit.contexts.push(entry);
      audit.peak = Math.max(audit.peak, audit.contexts.filter(item => !item.gl.isContextLost()).length);
      this.addEventListener('webglcontextlost', () => { entry.lost = true; });
      if (this.matches('.cinematic-environment > .cinematic-contour-dissolve')) {
        const canvas = this, draw = gl.drawElements.bind(gl), locations = new WeakMap();
        window.captureMovingPainting = () => new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Background stopped presenting frames')), 5000);
          window.captureNextPainting = image => { clearTimeout(timeout); resolve(image); };
        });
        gl.drawElements = (...args) => {
          const program = gl.getParameter(gl.CURRENT_PROGRAM);
          if (!locations.has(program)) locations.set(program, gl.getUniformLocation(program, 'uActorTime'));
          const time = gl.getUniform(program, locations.get(program));
          draw(...args);
          audit.poses.push({ time, speed: Number(canvas.dataset.actorSpeed), state: canvas.dataset.actorState });
          if (window.captureNextPainting) {
            const capture = window.captureNextPainting;
            window.captureNextPainting = null;
            capture({ png: canvas.toDataURL(), time, width: canvas.width, height: canvas.height });
          }
        };
      }
      return gl;
    };
  });
}

async function settled(page, chapter) {
  await page.waitForFunction(chapter => {
    const root = document.querySelector('.archive-viewport'), canvas = document.querySelector('.cinematic-environment > .cinematic-contour-dissolve');
    return root.dataset.chapter === chapter && root.dataset.chapterCopyPhase === 'idle'
      && root.classList.contains('chapter-settled') && canvas.dataset.actorState === 'looping'
      && !document.documentElement.classList.contains('theme-contour-transition-active');
  }, chapter, { timeout: 45000 });
}

async function moving(page, label) {
  await page.waitForTimeout(1200);
  const first = await page.evaluate(() => window.captureMovingPainting());
  await page.waitForTimeout(1400);
  const next = await page.evaluate(() => window.captureMovingPainting());
  assert(next.time > first.time + .3, `${label}: the live loop must advance after the dissolve`);
  const pixels = async png => sharp(Buffer.from(png.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
  const a = await pixels(first.png), b = await pixels(next.png);
  let changed = 0;
  for (let i = 0; i < a.length; i += 4) if (Math.min(a[i + 3], b[i + 3]) > 100
    && Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) > 18) changed++;
  assert(changed > 10, `${label}: actual background pixels must still animate`);
  const audit = await page.evaluate(() => ({
    peak: window.graphicsAudit.peak,
    active: window.graphicsAudit.contexts.filter(entry => !entry.gl.isContextLost()).length,
    lostBackground: window.graphicsAudit.contexts.some(entry => entry.canvas.matches('.cinematic-environment > .cinematic-contour-dissolve') && entry.lost),
    bakers: window.graphicsAudit.contexts.filter(entry => entry.canvas.dataset.contourBaker && !entry.gl.isContextLost()).length,
  }));
  assert(!audit.lostBackground, `${label}: the background renderer cannot be evicted`);
  assert(audit.peak <= 7 && audit.active <= 5 && audit.bakers === 1, `${label}: mobile context budget: ${JSON.stringify(audit)}`);
  console.log(`${label}: ${changed} moving pixels, ${audit.active} live contexts, peak ${audit.peak}`);
}

try {
  for (const landscape of process.argv.includes('--landscape-only') ? [true] : [false, true]) {
    const context = await browser.newContext({ ...devices['Pixel 7'], reducedMotion: 'no-preference',
      ...(landscape ? { viewport: { width: 839, height: 412 }, screen: { width: 839, height: 412 } } : {}) });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.stack));
    page.on('console', message => {
      if (/Too many active WebGL|Shader Error|WebGLProgram.*error/i.test(message.text())) warnings.push(message.text());
    });
    await auditGraphics(page);
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForFunction(() => !document.querySelector('#boot-loader')
      && document.querySelector('.archive-viewport')?.dataset.homeIntroStage === 'complete', null, { timeout: 60000 });
    const orientation = landscape ? 'landscape' : 'portrait';
    await moving(page, `${orientation}-home`);
    for (const [label, id] of [['Cores', 'cores'], ['Experience', 'professional'], ['Education', 'education'],
      ['Field Notes', 'personal'], ['Contact', 'contact'], ['Case Studies', 'projects'], ['Home', 'intro']]) {
      const tab = page.getByRole('tab', { name: label, exact: true, includeHidden: true });
      for (let step = 0; landscape && await tab.getAttribute('aria-hidden') === 'true' && step < 8; step++) {
        const forward = await tab.evaluate(node => {
          const tabs = [...node.parentElement.querySelectorAll('[role="tab"]')];
          return tabs.indexOf(node) > tabs.findIndex(tab => tab.getAttribute('aria-hidden') !== 'true');
        });
        await page.getByRole('button', { name: forward ? 'Next chapters' : 'Previous chapters', exact: true }).tap();
        await page.waitForTimeout(500);
      }
      await tab.scrollIntoViewIfNeeded();
      await tab.tap();
      await settled(page, id);
      await moving(page, `${orientation}-${id}`);
      if (id === 'education') {
        for (const theme of ['default', 'default-light']) {
          await page.getByRole('switch', { name: 'Light appearance' }).tap();
          await page.waitForFunction(theme => document.querySelector('.archive-app').classList.contains(`theme-${theme}`)
            && !document.documentElement.classList.contains('theme-contour-transition-active'), theme, { timeout: 45000 });
          await moving(page, `${orientation}-${id}-${theme}`);
        }
      }
    }
    const poses = await page.evaluate(() => window.graphicsAudit.poses);
    assert(poses.length > 120, 'Cover actual rendered frames, not just a running JavaScript timer');
    for (let i = 1; i < poses.length; i++) {
      const delta = poses[i].time - poses[i - 1].time;
      assert(delta >= -.0001 && delta <= .081, `Painted phase cannot snap or reverse at a handoff: ${delta}`);
      assert(poses[i].speed >= .399 && poses[i].speed <= 1.601);
      assert(Math.abs(poses[i].speed - poses[i - 1].speed) < .1, 'Navigation speed must ease instead of flip');
    }
    assert(poses.some(pose => pose.speed > 1.02), 'Forward navigation gently accelerates the ongoing loop');
    assert(poses.some(pose => pose.speed < .98), 'Reverse navigation gently slows the ongoing loop');
    await page.screenshot({ path: `${output}/${orientation}.png` });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.querySelector('.cinematic-environment > .cinematic-contour-dissolve').dataset.actorState === 'reduced-motion');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await moving(page, `${orientation}-resumed`);
    await context.close();
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
  console.log('PASS: touch navigation and light/dark dissolves retain live painted pixels within an eight-context mobile limit; phase and velocity remain continuous.');
} catch (error) {
  console.error(error); console.error(errors); console.error(warnings); process.exitCode = 1;
  for (const context of browser.contexts()) for (const page of context.pages()) {
    console.log(await page.locator('.cinematic-environment > .cinematic-contour-dissolve').evaluate(canvas => ({ ...canvas.dataset })).catch(() => ({})));
    await page.screenshot({ path: `${output}/failure.png` }).catch(() => {});
  }
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL'); await new Promise(resolve => setTimeout(resolve, 250)); process.exit(process.exitCode || 0);
  } else await server.close();
}
