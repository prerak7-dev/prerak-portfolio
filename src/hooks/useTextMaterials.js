import { useLayoutEffect } from 'react';
import { TEXT_RELIEF_SELECTOR, TEXT_TARGET_SELECTOR } from '../data/textMaterials.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';
import { subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { createTextContourRenderer } from '../utils/textContourRenderer.js';

const SCENE_IMAGES = ['.gateway-sequence-preloads img', '.cores-plate img', '.systems-plate img', '.chronology-plate img', '.field-plate img', '.surface-plate img'];
const MASK_PROPERTIES = ['mask-image', 'mask-size', 'mask-position', 'mask-repeat', 'mask-origin', 'mask-clip'];

function visible(node, root) {
  if (!node.getClientRects().length) return false;
  for (let parent = node; parent && parent !== root; parent = parent.parentElement) {
    const style = getComputedStyle(parent);
    if (style.visibility === 'hidden' || Number(style.opacity) < .02 || parent.getAttribute('aria-hidden') === 'true') return false;
  }
  return true;
}

function freezeAppearance(source, clone) {
  const originals = [source, ...source.querySelectorAll('*')];
  const copies = [clone, ...clone.querySelectorAll('*')];
  originals.forEach((original, index) => {
    const copy = copies[index];
    const style = getComputedStyle(original);
    for (const property of style) copy.style.setProperty(property, style.getPropertyValue(property), 'important');
    copy.removeAttribute('id');
    copy.removeAttribute('href');
    copy.removeAttribute('aria-live');
    copy.style.setProperty('animation', 'none', 'important');
    copy.style.setProperty('transition', 'none', 'important');
  });
}

export function useTextMaterials(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    let targets = [];
    let renderer;
    let layer;
    let token = -1;
    let failedToken = -1;
    let lastDraw = 0;
    let scanFrame = 0;
    let disposed = false;
    let transition = null;
    let lastMasks = null;
    const ghosts = new Map();
    const savedMasks = new Map();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const scan = () => {
      scanFrame = 0;
      const candidates = [...root.querySelectorAll(TEXT_TARGET_SELECTOR)].filter(node =>
        node.textContent.trim() && !node.matches('.theme-switcher button, .lore-toggle')
        && !node.querySelector('img, canvas, button, h1, h2, h3, p')
        && !node.closest('.cinematic-environment, .spatial-world, [aria-hidden="true"] svg'));
      const eligible = new Set(candidates);
      targets = candidates.filter(node => {
        for (let parent = node.parentElement; parent && parent !== root; parent = parent.parentElement) {
          if (eligible.has(parent)) return false;
        }
        return true;
      });
      targets.forEach(node => {
        if (!node.classList.contains('material-text')) node.classList.add('material-text');
        node.dataset.textMaterial = node.matches(TEXT_RELIEF_SELECTOR) ? 'relief' : 'ink';
      });
      if (lastMasks && layer && transition?.active) applyLiveMask();
    };
    const scheduleScan = () => { if (!disposed && !scanFrame) scanFrame = requestAnimationFrame(scan); };
    scan();
    const observer = new MutationObserver(() => {
      if (transition?.active && layer) scan(); else scheduleScan();
    });
    observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class'] });

    const restore = () => {
      layer?.remove(); layer = null;
      savedMasks.forEach((properties, node) => properties.forEach(([name, value, priority]) => {
        if (value) node.style.setProperty(name, value, priority); else node.style.removeProperty(name);
      }));
      savedMasks.clear();
      ghosts.clear(); lastMasks = null;
      root.style.removeProperty('--text-contour-incoming');
      delete root.dataset.textDissolving;
    };
    const snapshot = () => {
      layer = document.createElement('div');
      layer.className = 'text-contour-ghosts';
      layer.setAttribute('aria-hidden', 'true');
      layer.inert = true;
      for (const node of targets) {
        if (!visible(node, root)) continue;
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const clone = node.cloneNode(true);
        freezeAppearance(node, clone);
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `position:absolute;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;`;
        const width = node.offsetWidth || rect.width;
        const height = node.offsetHeight || rect.height;
        const overrides = { position: 'absolute', inset: '0 auto auto 0', margin: '0', width: `${width}px`, height: `${height}px`, 'min-width': '0', 'max-width': 'none', 'max-height': 'none', scale: 'none', translate: 'none', rotate: 'none', transform: `scale(${rect.width / width},${rect.height / height})`, 'transform-origin': '0 0', 'mask-image': 'none' };
        for (const [key, value] of Object.entries(overrides)) clone.style.setProperty(key, value, 'important');
        wrapper.append(clone); layer.append(wrapper);
        ghosts.set(node, { wrapper, clone });
      }
      document.body.append(layer);
    };
    const configure = state => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cover = Math.max(width, height * 16 / 9);
      const projection = readSceneImageProjection(root.querySelector(SCENE_IMAGES[state.sceneIndex]), { left: (width - cover) / 2, top: (height - cover * 9 / 16) / 2, width: cover, height: cover * 9 / 16 }, width);
      renderer.configure(state.geometryImage, projection, getTracerSceneField(state.fromTheme, state.sceneIndex), width, height);
    };
    function applyLiveMask() {
      const measurements = targets.filter(node => visible(node, root)).map(node => ({ node, rect: node.getBoundingClientRect(), width: node.offsetWidth, height: node.offsetHeight }));
      for (const { node, rect, width, height } of measurements) {
        if (!rect.width || !rect.height) continue;
        if (!savedMasks.has(node)) savedMasks.set(node, MASK_PROPERTIES.map(name => [name, node.style.getPropertyValue(name), node.style.getPropertyPriority(name)]));
        const sx = rect.width / (width || rect.width);
        const sy = rect.height / (height || rect.height);
        const ghost = ghosts.get(node);
        if (transition?.kind === 'theme' && ghost) {
          // Keep both material faces registered while the painting gently moves.
          ghost.wrapper.style.left = `${rect.left}px`;
          ghost.wrapper.style.top = `${rect.top}px`;
          ghost.clone.style.setProperty('transform', `scale(${sx},${sy})`, 'important');
        }
        node.closest('.contour-focus')?.setAttribute('data-contour-revealed', 'true');
        node.style.setProperty('mask-image', 'var(--text-contour-incoming)', 'important');
        node.style.setProperty('mask-size', `${window.innerWidth / sx}px ${window.innerHeight / sy}px`);
        node.style.setProperty('mask-position', `${-rect.left / sx}px ${-rect.top / sy}px`);
        node.style.setProperty('mask-repeat', 'no-repeat');
        node.style.setProperty('mask-origin', 'border-box');
        node.style.setProperty('mask-clip', 'no-clip');
      }
    }
    const paint = state => {
      lastMasks = renderer.draw(state.progress);
      layer.style.maskImage = `url("${lastMasks.outgoing}")`;
      layer.style.maskSize = '100% 100%';
      root.style.setProperty('--text-contour-incoming', `url("${lastMasks.incoming}")`);
      applyLiveMask();
      root.dataset.textDissolving = state.kind;
    };
    const unsubscribe = subscribeThemeContourTransition(state => {
      transition = state;
      if (!state.active || reduced.matches || !state.geometryImage || state.fromTheme === 'boot') { restore(); return; }
      if (failedToken === state.token) return;
      try {
        if (token !== state.token) {
          restore(); token = state.token; scan();
          renderer ??= createTextContourRenderer();
          configure(state); snapshot(); lastDraw = 0;
        }
        const now = performance.now();
        if (now - lastDraw < 32 && state.progress < .999) return;
        paint(state); lastDraw = now;
      } catch {
        // WebGL/readback failure must never leave invisible or unusable text.
        failedToken = state.token;
        restore(); renderer?.dispose(); renderer = null;
      }
    });
    const resize = () => {
      if (transition?.active && layer) { failedToken = transition.token; restore(); }
    };
    const preference = () => { if (reduced.matches) restore(); };
    window.addEventListener('resize', resize);
    reduced.addEventListener('change', preference);
    return () => {
      disposed = true; observer.disconnect(); unsubscribe(); cancelAnimationFrame(scanFrame);
      window.removeEventListener('resize', resize); reduced.removeEventListener('change', preference);
      restore(); renderer?.dispose();
      targets.forEach(node => { node.classList.remove('material-text'); delete node.dataset.textMaterial; });
    };
  }, [ref]);
}
