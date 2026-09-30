import { useLayoutEffect } from 'react';
import { TEXT_MATERIALS } from '../data/textMaterials.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { chooseReadableInk, inkRgb, sampleInkField, stabilizeInkWash, washOpacity } from '../utils/adaptiveInk.js';
import { mergeBrushLines } from '../utils/textBrushGeometry.js';

const IMAGES = {
  intro: '.gateway-sequence-preloads img', cores: '.cores-plate img', projects: '.systems-plate img',
  professional: '.chronology-plate img', education: '.chronology-plate img', personal: '.field-plate img', contact: '.surface-plate img',
};
const EXCLUDED = '.text-brush-layer, .text-contour-ghosts, .cinematic-environment, .spatial-world, svg';
const rgb = color => `rgb(${color.join(' ')})`;
const registeredWashes = new Set();
const washProperty = index => {
  const name = `--adaptive-wash-${index}`;
  if (!registeredWashes.has(name)) {
    try { CSS.registerProperty({ name, syntax: '<number>', inherits: false, initialValue: '0' }); }
    catch { /* HMR may leave the property registered from the previous module. */ }
    registeredWashes.add(name);
  }
  return name;
};

export function useAdaptiveTextContrast(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const fields = new Map();
    const pendingFields = new Set();
    const pigments = new Map();
    const applied = new Map();
    const forced = matchMedia('(forced-colors: active)');
    const crossFade = CSS.supports('background-image', 'cross-fade(url("") 50%, transparent)') ? 'standard'
      : CSS.supports('background-image', '-webkit-cross-fade(url(""), url(""), .5)') ? 'webkit' : null;
    const blendWashes = crossFade && typeof CSS.registerProperty === 'function';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return undefined;
    let frame = 0;
    let disposed = false;
    let refreshCount = 0;
    let settleTimer = 0;
    let scrollingUntil = 0;
    const brush = new Image();
    brush.src = `${import.meta.env.BASE_URL}cinematic/painted-v1/ui/loader-brush.webp`;

    const pigmentFor = (color, opacity) => {
      const alpha = Math.ceil(opacity * 100) / 100;
      const key = `${color}:${alpha}`;
      if (pigments.has(key)) return pigments.get(key);
      canvas.width = 160; canvas.height = 32;
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = alpha;
      context.drawImage(brush, 0, -14, 160, 60);
      context.globalAlpha = 1;
      context.globalCompositeOperation = 'source-in';
      context.fillStyle = rgb(color);
      context.fillRect(0, 0, 160, 32);
      context.globalCompositeOperation = 'source-over';
      const image = `url("${canvas.toDataURL()}")`;
      if (pigments.size >= 40) pigments.delete(pigments.keys().next().value);
      pigments.set(key, image);
      return image;
    };

    const fieldFor = image => {
      const key = image.currentSrc;
      if (fields.has(key)) return fields.get(key);
      if (pendingFields.has(key)) return null;
      // One small readback per decoded painting, never the animated WebGL canvas.
      const scale = Math.min(1, 320 / Math.max(image.naturalWidth, image.naturalHeight));
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      pendingFields.add(key);
      // Let the browser resize the bitmap asynchronously before touching the 2D canvas.
      createImageBitmap(image, { resizeWidth: width, resizeHeight: height, resizeQuality: 'low' }).then(bitmap => {
        if (disposed) { bitmap.close(); return; }
        canvas.width = width; canvas.height = height;
        context.drawImage(bitmap, 0, 0); bitmap.close();
        const field = { width, height, pixels: context.getImageData(0, 0, width, height).data };
        if (fields.size >= 6) fields.delete(fields.keys().next().value);
        fields.set(key, field); schedule();
      }).catch(() => { /* Authored ink remains usable if image readback is unavailable. */ })
        .finally(() => pendingFields.delete(key));
      return null;
    };
    const clear = node => {
      node.removeAttribute('data-adaptive-ink');
      node.removeAttribute('data-ink-blend');
      for (let index = 0; index < (applied.get(node)?.opacities.length || 0); index++) node.style.removeProperty(`--adaptive-wash-${index}`);
      for (const property of ['--type-ink-color', '--adaptive-ink-paper', '--ink-wash-images', '--ink-wash-sizes', '--ink-wash-positions', '--ink-wash-clips', '--ink-wash-repeats', '--ink-wash-blends', '--ink-wash-transition']) node.style.removeProperty(property);
      applied.delete(node);
    };
    const refresh = () => {
      frame = 0;
      if (disposed || forced.matches || !brush.complete || !brush.naturalWidth) return;
      const image = root.querySelector(IMAGES[root.dataset.chapter] || IMAGES.intro);
      if (!image?.complete || !image.naturalWidth) return;
      // Keep outgoing pigment frozen with its painting; prepare the next face on entry.
      if (root.dataset.chapterCopyPhase === 'exiting' || root.dataset.textContentPhase === 'exiting') return;
      const theme = [...root.classList].find(name => name.startsWith('theme-'))?.slice(6) || 'default';
      const season = theme.replace('-light', '');
      const palette = TEXT_MATERIALS[theme] || TEXT_MATERIALS.default;
      const opposite = TEXT_MATERIALS[theme.endsWith('-light') ? season : `${season}-light`];
      let field;
      try { field = fieldFor(image); } catch { return; }
      if (!field) return;
      const projection = readSceneImageProjection(image, null, innerWidth);
      if (!projection) return;
      const sceneKey = `${image.currentSrc}:${theme}:${Object.values(projection).map(Math.round).join(':')}`;
      const sampleLines = line => {
        const samples = [];
        const columns = Math.max(2, Math.ceil(line.width / 12));
        for (let row = 0; row < 3; row++) {
          for (let column = 0; column < columns; column++) {
            samples.push(sampleInkField(field, projection, line.left + (column + .5) / columns * line.width, line.top + (row + .5) / 3 * line.height));
          }
        }
        return samples;
      };
      const candidates = [...root.querySelectorAll('.material-text, .theme-icon-row button, .lore-toggle, .chapter-scroll-arrow')];
      const range = document.createRange();
      const measurements = candidates.flatMap(node => {
        if (node.closest(`${EXCLUDED}, [aria-hidden="true"], [data-reading-hidden], [hidden]`)) return [];
        if (!node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return [];
        const rect = node.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1 || rect.bottom < 0 || rect.top > innerHeight) return [];
        const style = getComputedStyle(node);
        if (style.visibility === 'hidden' || style.display === 'none') return [];
        const kind = node.matches('[aria-pressed="true"], .contour-eyebrow') ? 'accent' : node.dataset.textMaterial === 'display-ink' ? 'face' : 'ink';
        const identity = `${theme}:${kind}:${node.textContent}`;
        const key = `${sceneKey}:${identity}:${[rect.left, rect.top, rect.width, rect.height].map(Math.round).join(':')}`;
        const previous = applied.get(node);
        if (previous?.key === key) return [];
        // A compositor-driven flight must not trigger new contrast decisions at
        // arbitrary intermediate poses. The moving flag schedules the final pose.
        if (previous?.identity === identity && (performance.now() < scrollingUntil
          || node.closest('.chapter-rail[data-moving="true"]'))) return [];
        const icon = !node.matches('.material-text');
        range.selectNodeContents(node);
        const lines = icon ? [{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }]
          : mergeBrushLines([...range.getClientRects()].filter(line => line.bottom > 0 && line.top < innerHeight));
        return lines.length ? [{ node, rect, kind, key, identity, previous, icon, lines, samples: lines.map(sampleLines) }] : [];
      });
      const paintStart = performance.now();
      let painted = 0;
      for (const { node, rect, kind, key, identity, previous, icon, lines, samples } of measurements) {
        if (painted && performance.now() - paintStart > 6) { schedule(); break; }
        const continuing = previous?.identity === identity;
        const choice = continuing ? previous.choice : chooseReadableInk(samples.flat(), inkRgb(palette[kind]), inkRgb(opposite[kind]),
          inkRgb(TEXT_MATERIALS[`${season}-light`].halo), inkRgb(TEXT_MATERIALS[season].halo));
        // New content/theme ink is prepared under its existing contour mask.
        // Only subsequent backing adjustments blend; no extra text animation.
        if (continuing && blendWashes) node.dataset.inkBlend = '';
        else node.removeAttribute('data-ink-blend');
        node.style.setProperty('--type-ink-color', rgb(choice.ink));
        node.style.setProperty('--adaptive-ink-paper', rgb(choice.paper));
        node.dataset.adaptiveInk = icon ? 'control' : 'text';
        const images = [], sizes = [], positions = [], opacities = [], transitions = [];
        const sx = rect.width / (node.offsetWidth || rect.width);
        const sy = rect.height / (node.offsetHeight || rect.height);
        lines.forEach((line, index) => {
          const opacity = stabilizeInkWash(washOpacity(samples[index], choice.ink, choice.paper),
            continuing && previous.opacities.length === lines.length ? previous.opacities[index] : undefined);
          opacities.push(opacity);
          const left = Math.max(rect.left, line.left), top = Math.max(rect.top, line.top);
          const right = Math.min(rect.right, line.left + line.width), bottom = Math.min(rect.bottom, line.top + line.height);
          if (blendWashes) {
            const property = washProperty(index);
            node.style.setProperty(property, String(opacity));
            transitions.push(`${property} 700ms cubic-bezier(.22, .61, .36, 1)`);
            const pigment = pigmentFor(choice.paper, 1);
            images.push(crossFade === 'standard' ? `cross-fade(${pigment} calc(var(${property}) * 100%), transparent)`
              : `-webkit-cross-fade(${pigmentFor(choice.paper, 0)}, ${pigment}, var(${property}))`);
          } else images.push(pigmentFor(choice.paper, opacity));
          sizes.push(`${(right - left) / sx}px ${(bottom - top) / sy}px`);
          positions.push(`${(left - rect.left) / sx}px ${(top - rect.top) / sy}px`);
        });
        for (let index = lines.length; index < (previous?.opacities.length || 0); index++) node.style.removeProperty(`--adaptive-wash-${index}`);
        node.style.setProperty('--ink-wash-transition', transitions.join(',') || 'none');
        node.style.setProperty('--ink-wash-images', images.join(',') || 'none');
        node.style.setProperty('--ink-wash-sizes', sizes.join(',') || '100% 100%');
        node.style.setProperty('--ink-wash-positions', positions.join(',') || '0 0');
        for (const [property, value] of [['clips', 'border-box'], ['repeats', 'no-repeat'], ['blends', 'normal']]) {
          node.style.setProperty(`--ink-wash-${property}`, images.map(() => value).join(',') || value);
        }
        applied.set(node, { key, identity, choice, opacities });
        painted++;
      }
      for (const node of applied.keys()) if (!node.isConnected) applied.delete(node);
      // Regression checks verify this counter remains unchanged while idle.
      root.dataset.inkRefresh = String(++refreshCount);
    };
    // Layout hooks place chapter copy in the first frame. Sample its final boxes
    // after that paint, avoiding stale mobile positions and forced layout work.
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(() => { frame = requestAnimationFrame(refresh); });
    };
    const observer = new MutationObserver(records => {
      if (records.some(record => !record.target.closest?.(EXCLUDED)
        && (record.type !== 'attributes' || record.oldValue !== record.target.getAttribute(record.attributeName)))) schedule();
    });
    observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeOldValue: true,
      attributeFilter: ['class', 'data-text-material', 'data-reading-hidden', 'aria-hidden', 'aria-selected', 'aria-pressed', 'data-chapter', 'data-chapter-copy-phase', 'data-chapter-copy-ready', 'data-text-content-phase', 'data-home-intro-stage', 'data-home-awaiting', 'data-moving'] });
    const settle = () => {
      scrollingUntil = performance.now() + 140;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(schedule, 150);
    };
    const preference = () => { if (forced.matches) [...applied.keys()].forEach(clear); else schedule(); };
    root.addEventListener('load', schedule, true);
    root.addEventListener('scroll', settle, true);
    root.addEventListener('contour-reading-refresh', schedule);
    window.addEventListener('resize', schedule);
    forced.addEventListener('change', preference);
    document.fonts.ready.then(schedule);
    brush.onload = schedule;
    schedule();
    return () => {
      disposed = true; brush.onload = null; cancelAnimationFrame(frame); clearTimeout(settleTimer); observer.disconnect();
      root.removeEventListener('load', schedule, true);
      root.removeEventListener('scroll', settle, true);
      root.removeEventListener('contour-reading-refresh', schedule);
      window.removeEventListener('resize', schedule); forced.removeEventListener('change', preference);
      [...applied.keys()].forEach(clear); delete root.dataset.inkRefresh;
    };
  }, [ref]);
}
