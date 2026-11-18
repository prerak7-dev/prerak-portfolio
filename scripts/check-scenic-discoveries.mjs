import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium, devices } = require('playwright');
const sharp = require('sharp');
const server = await chromium.launchServer({ headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' } : {}) });
const browser = await chromium.connect(server.wsEndpoint());
const output = 'tmp/scenic-discoveries', errors = [];
await mkdir(output, { recursive: true });

async function open(theme = 'default-light', options = {}) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', ...options });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(theme => localStorage.setItem('aegis-theme', theme), theme);
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const seen = new WeakSet();
    window.discoveryGraphics = [];
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      const gl = original.call(this, type, ...args);
      if (!gl || !/webgl/.test(type) || seen.has(gl)) return gl;
      seen.add(gl);
      window.discoveryGraphics.push({ gl, canvas: this });
      if (this.matches('.cinematic-environment > .cinematic-contour-dissolve')) {
        const canvas = this, draw = gl.drawElements.bind(gl);
        window.compareDiscoveryPixels = () => new Promise(resolve => { window.nextDiscoveryComparison = resolve; });
        gl.drawElements = (...args) => {
          draw(...args);
          if (!window.nextDiscoveryComparison) return;
          const resolve = window.nextDiscoveryComparison;
          window.nextDiscoveryComparison = null;
          const program = gl.getParameter(gl.CURRENT_PROGRAM), location = gl.getUniformLocation(program, 'uDiscoveryCount');
          const count = gl.getUniform(program, location), active = canvas.toDataURL();
          const projection = gl.getUniform(program, gl.getUniformLocation(program, 'uProjection'));
          const viewport = gl.getUniform(program, gl.getUniformLocation(program, 'uViewport'));
          const scene = { intro: 0, cores: 1, projects: 2, professional: 3, education: 3, personal: 4, contact: 5 }[document.querySelector('.archive-viewport').dataset.chapter];
          const selectors = ['.gateway-sequence-preloads img[data-frame-index="0"]', '.cores-plate .environment-living-layer img',
            '.systems-plate .environment-living-layer img', '.chronology-plate .environment-living-layer img',
            '.field-plate .environment-living-layer img', '.surface-plate .environment-living-layer img'];
          const base = document.createElement('canvas'); base.width = canvas.width; base.height = canvas.height;
          const baseContext = base.getContext('2d');
          baseContext.scale(base.width / viewport[0], base.height / viewport[1]);
          baseContext.drawImage(document.querySelector(selectors[scene]), ...projection);
          // Compare the same painted pose with only the discovery switched off.
          gl.uniform1i(location, 0); gl.clear(gl.COLOR_BUFFER_BIT); draw(...args);
          const resting = canvas.toDataURL();
          gl.uniform1i(location, count); gl.clear(gl.COLOR_BUFFER_BIT); draw(...args);
          resolve({ active, resting, base: base.toDataURL() });
        };
      }
      return gl;
    };
  });
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4187/prerak-portfolio/');
  await page.waitForFunction(() => !document.querySelector('#boot-loader')
    && document.querySelector('.chapter-rail')?.dataset.entryPhase === 'complete', null, { timeout: 60000 });
  return page;
}

async function enable(page) {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForFunction(() => document.querySelector('.cinematic-contour-dissolve')?.dataset.actorState === 'looping');
  await page.waitForFunction(() => !document.querySelector('.scenic-discoveries').inert);
}

async function sample(page) {
  return page.evaluate(async () => {
    const { scenicDiscoveryField } = await import('/prerak-portfolio/src/state/scenicDiscoveryStore.js');
    return scenicDiscoveryField.sample(performance.now());
  });
}

async function clear(page) {
  await page.mouse.move(1, 1);
  await page.evaluate(async () => (await import('/prerak-portfolio/src/state/scenicDiscoveryStore.js')).scenicDiscoveryField.clear());
}

async function visiblePixels(page, label) {
  const frames = await page.evaluate(() => window.compareDiscoveryPixels());
  const pixels = image => sharp(Buffer.from(image.split(',')[1], 'base64')).ensureAlpha().raw().toBuffer();
  const active = await pixels(frames.active), resting = await pixels(frames.resting);
  const base = await pixels(frames.base);
  let changed = 0;
  for (let i = 0; i < active.length; i += 4) {
    const a = active[i + 3] / 255, b = resting[i + 3] / 255;
    let difference = 0;
    for (let channel = 0; channel < 3; channel++) difference += Math.abs(
      active[i + channel] * a + base[i + channel] * (1 - a)
      - resting[i + channel] * b - base[i + channel] * (1 - b));
    if (difference > 40) changed++;
  }
  assert(changed > 60, `${label}: ink must visibly contrast with the composited painting (${changed})`);
  const contexts = await page.evaluate(() => window.discoveryGraphics.filter(entry => !entry.gl.isContextLost()).length);
  assert(contexts <= 5, `${label}: stay within the existing mobile graphics budget`);
  console.log(`${label}: ${changed} painted pixels respond, ${contexts} live graphics contexts.`);
}

async function point(page, kind, scene = 0) {
  return page.evaluate(async ({ kind, scene }) => {
    const { getScenicDiscoveries, findScenicDiscovery } = await import('/prerak-portfolio/src/utils/scenicDiscoveries.js');
    const { usesPortraitArtwork, getSceneCoverProjection } = await import('/prerak-portfolio/src/data/cinematicViewport.js');
    const { readSceneImageProjection } = await import('/prerak-portfolio/src/utils/cinematicGeometryRenderer.js');
    const { PIGMENT_SCENE_SELECTORS } = await import('/prerak-portfolio/src/data/livingPigmentArt.js');
    const targets = getScenicDiscoveries(scene, usesPortraitArtwork());
    const p = readSceneImageProjection(document.querySelector(PIGMENT_SCENE_SELECTORS[scene]), getSceneCoverProjection(innerWidth, innerHeight), innerWidth);
    const touchControls = matchMedia('(pointer: coarse)').matches
      ? [...document.querySelectorAll('a,button,[role="tab"],.scenic-text,h1,h2,h3,p')].filter(node => !node.matches('.scenic-discovery')
        && (!node.closest('.archive-scene') || node.closest('.archive-scene').classList.contains('active'))
        && node.checkVisibility({ checkVisibilityCSS: true })).map(node => ({ bounds: node.getBoundingClientRect(),
          padding: node.matches('a,button,[role="tab"]') ? 8 : 20 })) : [];
    for (const target of targets.filter(target => target.kind === kind)) {
      const [cx, cy, rx, ry] = target.region;
      const candidates = [target.anchor];
      const regions = target.kind === 3 || target.kind === 5 ? [target.region, target.art] : [target.region];
      for (const [x0, y0, sx, sy] of regions) {
        for (let y = -.92; y <= .93; y += .08) for (let x = -.92; x <= .93; x += .08) candidates.push([x0 + x * sx, y0 + y * sy]);
      }
      candidates.sort((a, b) => Math.hypot((a[0] - cx) / rx, (a[1] - cy) / ry) - Math.hypot((b[0] - cx) / rx, (b[1] - cy) / ry));
      for (const [u, v] of candidates) {
        const x = p.left + u * p.width, y = p.top + v * p.height;
        if (x < 25 || x > innerWidth - 25 || y < 25 || y > innerHeight - 25 || findScenicDiscovery(targets, u, v)?.kind !== kind) continue;
        // Chrome expands nearby links and selectable text for fingers. Use a
        // real patch of painting, not a mouse-sized gap against the headline.
        if (touchControls.some(({ bounds: rect, padding }) => x > rect.left - padding && x < rect.right + padding
          && y > rect.top - padding && y < rect.bottom + padding)) continue;
        const element = document.elementFromPoint(x, y);
        if (!element?.closest('.archive-viewport')) continue;
        if (element?.closest('a,button,input,textarea,select,[role="tab"],[role="dialog"],h1,h2,h3,p,.scenic-text,.contour-content,.archive-header,.spatial-hud,.spatial-lore-guide,.gate-seal-entry')) continue;
        return { x, y };
      }
    }
    return null;
  }, { kind, scene });
}

try {
  if (!process.argv.includes('--themes-only')) {
  if (!process.argv.includes('--mobile-only')) {
  const page = await open();
  await enable(page);
  if (!process.argv.includes('--field-only')) {
  for (const kind of [3, 2, 1, 4, 5]) {
    await clear(page);
    const hit = await point(page, kind);
    assert(hit, `Discovery ${kind} needs an unobstructed desktop target`);
    if (kind === 2) await page.mouse.click(hit.x, hit.y);
    else await page.mouse.move(hit.x, hit.y);
    await page.waitForFunction(kind => document.querySelector('.scenic-discoveries').dataset.lastDiscovery === String(kind), kind);
    await page.waitForTimeout(1100);
    assert((await sample(page)).some(pulse => pulse.kind === kind && pulse.strength > .7));
    await visiblePixels(page, `Home discovery ${kind}`);
    await page.screenshot({ path: `${output}/desktop-${kind}.png` });
    assert(Number(await page.locator('.cinematic-contour-dissolve').getAttribute('data-discovery-strength')) > .7);
  }
  await clear(page);
  await page.getByRole('tab', { name: 'Home', exact: true }).hover();
  await page.waitForTimeout(1200);
  assert.deepEqual(await sample(page), [], 'Navigation labels do not trigger the scene behind them');
  const compass = page.getByRole('button', { name: "Find the traveler's compass" });
  await compass.focus(); await page.keyboard.press('Enter');
  assert((await sample(page)).some(pulse => pulse.kind === 3));
  await page.keyboard.press('Escape'); await page.waitForTimeout(600);
  assert.deepEqual(await sample(page), [], 'Escape gently retires the discovery');
  await clear(page);
  await page.getByRole('button', { name: 'Stir the water' }).focus();
  await page.keyboard.press('Space');
  assert((await sample(page)).some(pulse => pulse.kind === 2));
  await page.getByRole('switch', { name: 'Light appearance' }).click();
  await page.waitForFunction(() => document.querySelector('.archive-viewport').classList.contains('theme-default')
    && !document.documentElement.classList.contains('theme-contour-transition-active'));
  assert.deepEqual(await sample(page), []);
  assert.equal(await page.locator('.ink-fireworks-field').count(), 0);
  }

  if (!process.argv.includes('--home-only')) for (const [label, scene, id] of [['Cores', 1, 'cores'], ['Case Studies', 2, 'projects'], ['Experience', 3, 'professional'],
    ['Education', 3, 'education'], ['Field Notes', 4, 'personal'], ['Contact', 5, 'contact']]) {
    if (process.argv.includes('--field-only') && scene < 4) continue;
    await page.getByRole('tab', { name: label, exact: true }).click();
    await page.waitForFunction(id => document.querySelector('.archive-viewport').dataset.chapter === id
      && document.querySelector('.archive-viewport').classList.contains('chapter-settled')
      && document.querySelector('.archive-viewport').dataset.chapterCopyPhase === 'idle'
      && !document.documentElement.classList.contains('theme-contour-transition-active'), id);
    await page.waitForFunction(() => !document.querySelector('.scenic-discoveries').inert);
    const kind = scene === 3 || scene === 5 ? 5 : 1;
    const hit = await point(page, kind, scene);
    assert(hit, `${label} needs an unobstructed celestial target`);
    await page.mouse.move(hit.x, hit.y);
    await page.waitForTimeout(2000);
    assert((await sample(page)).some(pulse => pulse.kind === kind && pulse.strength > .7), label);
    await visiblePixels(page, label);
    await page.screenshot({ path: `${output}/${label.replaceAll(' ', '-')}.png` });
    await clear(page);
  }
  await page.context().close();
  console.log(process.argv.includes('--field-only') ? 'PASS cropped Field Notes and Contact subjects.'
    : process.argv.includes('--home-only') ? 'PASS Home: five discoveries, keyboard, theme cancellation and no fireworks.'
      : 'PASS desktop: five discoveries, keyboard, all chapters, theme cancellation and no fireworks.');
  }

  if (!process.argv.includes('--home-only')) for (const [name, options] of [['portrait', devices['Pixel 7']],
    ['landscape', { ...devices['Pixel 7'], viewport: { width: 839, height: 412 }, screen: { width: 839, height: 412 } }]]) {
    if (process.argv.includes('--landscape-only') && name !== 'landscape') continue;
    const mobile = await open('spring', options);
    await enable(mobile);
    await mobile.evaluate(async () => {
      window.discoveryInputTrace = [];
      const root = document.querySelector('.archive-viewport');
      for (const type of ['pointerdown', 'pointerup', 'pointercancel', 'pointermove']) root.addEventListener(type, event => {
        window.discoveryInputTrace.push({ type, button: event.button, primary: event.isPrimary, pointer: event.pointerId,
          x: event.clientX, y: event.clientY, target: event.target.className, settled: root.classList.contains('chapter-settled') });
      }, true);
      const { subscribeSpatialMotion } = await import('/prerak-portfolio/src/state/spatialMotionStore.js');
      subscribeSpatialMotion(motion => window.discoveryInputTrace.push({ motion: { ...motion } }));
    });
    const hit = await point(mobile, 2);
    assert(hit, `${name} has tappable water`);
    await mobile.touchscreen.tap(hit.x, hit.y);
    await mobile.waitForTimeout(1200);
    assert((await sample(mobile)).some(pulse => pulse.kind === 2 && pulse.strength > .7));
    await visiblePixels(mobile, name);
    await mobile.screenshot({ path: `${output}/${name}.png` });
    await clear(mobile);
    const client = await mobile.context().newCDPSession(mobile);
    const moon = await point(mobile, 1);
    assert(moon, `${name} has a touch-discoverable moon`);
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [moon] });
    await mobile.waitForTimeout(1100);
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    assert((await sample(mobile)).some(pulse => pulse.kind === 1));
    await mobile.waitForTimeout(800);
    await visiblePixels(mobile, `${name} celestial tide`);
    await mobile.screenshot({ path: `${output}/${name}-1.png` });
    await clear(mobile);
    for (const kind of [3, 4, 5]) {
      const landmark = await point(mobile, kind);
      assert(landmark, `${name}: discovery ${kind} has a reachable touch target`);
      await mobile.evaluate(landmark => window.discoveryInputTrace.push({ requestedTap: landmark }), landmark);
      await mobile.touchscreen.tap(landmark.x, landmark.y);
      await mobile.waitForTimeout(1500);
      assert((await sample(mobile)).some(pulse => pulse.kind === kind && pulse.strength > .7));
      await visiblePixels(mobile, `${name} discovery ${kind}`);
      await mobile.screenshot({ path: `${output}/${name}-${kind}.png` });
      await clear(mobile);
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [hit] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: hit.x, y: hit.y - 65 }] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await mobile.waitForTimeout(1000);
    assert.deepEqual(await sample(mobile), [], 'Scrolling cannot activate a discovery');
    await client.detach();
    await mobile.context().close();
    console.log(`PASS ${name}: real touch, no intercepted scrolling.`);
  }
  const reduced = await open('winter-light');
  assert.equal(await reduced.locator('.scenic-discoveries').evaluate(node => getComputedStyle(node).display), 'none');
  await reduced.mouse.click(600, 800); await reduced.waitForTimeout(1200);
  assert.deepEqual(await sample(reduced), []);
  await reduced.context().close();
  }
  if (process.argv.includes('--themes-only')) for (const theme of ['default', 'default-light', 'spring', 'spring-light', 'fall', 'fall-light', 'winter', 'winter-light']) {
    const themed = await open(theme);
    await enable(themed);
    for (const kind of [1, 3, 4, 5]) {
      await clear(themed);
      const hit = await point(themed, kind);
      assert(hit, `${theme} discovery ${kind}`);
      await themed.mouse.click(hit.x, hit.y);
      await themed.waitForTimeout(1800);
      await visiblePixels(themed, `${theme} discovery ${kind}`);
      await themed.screenshot({ path: `${output}/theme-${theme}-${kind}.png` });
    }
    await themed.context().close();
  }
  assert.deepEqual(errors, []);
  console.log(process.argv.includes('--themes-only') ? 'PASS all eight light/dark palettes and browser errors.' : 'PASS reduced motion and browser errors.');
} catch (error) {
  console.error(error, errors); process.exitCode = 1;
  for (const context of browser.contexts()) for (const page of context.pages()) {
    console.log(await page.locator('.archive-viewport').evaluate(root => ({ data: { ...root.dataset }, className: root.className,
      discoveries: { ...root.querySelector('.scenic-discoveries')?.dataset }, canvas: { ...root.querySelector('.cinematic-contour-dissolve')?.dataset } })).catch(() => null));
    console.log(await page.evaluate(() => window.discoveryInputTrace));
    await page.screenshot({ path: `${output}/failure.png` }).catch(() => {});
  }
} finally {
  if (process.platform === 'win32') {
    server.process().kill('SIGKILL'); await new Promise(resolve => setTimeout(resolve, 250)); process.exit(process.exitCode || 0);
  } else await server.close();
}
