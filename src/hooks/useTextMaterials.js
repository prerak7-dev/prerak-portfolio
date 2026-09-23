import { useLayoutEffect } from 'react';
import { TEXT_RELIEF_SELECTOR } from '../data/textMaterials.js';
import { findTextTargets } from '../utils/textTargets.js';
import { claimTextMask, releaseTextMask } from '../utils/textMaskOwnership.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';
import { subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { createTextContourRenderer } from '../utils/textContourRenderer.js';
import { getCinematicGeometryAsset } from '../data/cinematicAssets.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';

const SCENE_IMAGES = ['.gateway-sequence-preloads img', '.cores-plate img', '.systems-plate img', '.chronology-plate img', '.field-plate img', '.surface-plate img'];
const APPEARANCE_PROPERTIES = ['display', 'box-sizing', 'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'text-transform', 'text-align', 'text-indent', 'white-space', 'word-spacing', 'word-break', 'overflow-wrap', 'color', '-webkit-text-fill-color', '-webkit-text-stroke', 'text-shadow', 'background-image', 'background-size', 'background-position', 'background-blend-mode', 'background-clip', '-webkit-background-clip', 'filter', 'padding', 'margin', 'vertical-align', 'text-decoration', 'gap', 'align-items', 'justify-content'];
APPEARANCE_PROPERTIES.push('opacity', 'text-wrap-mode', 'text-wrap-style', 'flex-direction', 'flex-wrap', 'align-self', 'flex-grow', 'flex-shrink', 'flex-basis');
APPEARANCE_PROPERTIES.push('background-color', 'border', 'border-radius', 'appearance', 'outline', 'box-shadow');

function layoutBox(node) {
  const style = getComputedStyle(node);
  const size = axis => {
    const value = parseFloat(style[axis]);
    if (!Number.isFinite(value)) return axis === 'width' ? node.offsetWidth : node.offsetHeight;
    const sides = axis === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
    return value + (style.boxSizing === 'border-box' ? 0 : sides.reduce((sum, side) => sum + parseFloat(style[`padding${side}`]) + parseFloat(style[`border${side}Width`]), 0));
  };
  return { width: size('width'), height: size('height') };
}

function visibleBounds(node, root) {
  if (!node.getClientRects().length) return null;
  const rect = node.getBoundingClientRect();
  const bounds = { left: Math.max(0, rect.left), top: Math.max(0, rect.top), right: Math.min(innerWidth, rect.right), bottom: Math.min(innerHeight, rect.bottom) };
  for (let parent = node; parent && parent !== root; parent = parent.parentElement) {
    const style = getComputedStyle(parent);
    if (style.visibility === 'hidden' || Number(style.opacity) < .02 || parent.getAttribute('aria-hidden') === 'true') return null;
    if (parent !== node && /(auto|scroll|hidden|clip)/.test(`${style.overflowX} ${style.overflowY}`)) {
      const clip = parent.getBoundingClientRect();
      bounds.left = Math.max(bounds.left, clip.left); bounds.right = Math.min(bounds.right, clip.right);
      bounds.top = Math.max(bounds.top, clip.top); bounds.bottom = Math.min(bounds.bottom, clip.bottom);
    }
  }
  return bounds.right > bounds.left && bounds.bottom > bounds.top ? bounds : null;
}

const visible = (node, root) => Boolean(visibleBounds(node, root));

function freezeAppearance(source, clone) {
  const originals = [source, ...source.querySelectorAll('*')];
  const copies = [clone, ...clone.querySelectorAll('*')];
  originals.forEach((original, index) => {
    const copy = copies[index];
    const style = getComputedStyle(original);
    for (const property of APPEARANCE_PROPERTIES) copy.style.setProperty(property, style.getPropertyValue(property), 'important');
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
    let scanFrame = 0;
    let disposed = false;
    let transition = null;
    let localFrame = 0;
    let localScope = null;
    let localRequest = 0;
    const ghosts = new Map();
    const savedMasks = new Map();
    const maskOwner = Symbol('theme-content');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const scan = () => {
      scanFrame = 0;
      targets = findTextTargets(root);
      targets.forEach(node => {
        if (!node.classList.contains('material-text')) node.classList.add('material-text');
        node.dataset.textMaterial = node.matches(TEXT_RELIEF_SELECTOR) ? 'relief' : 'ink';
      });
      if (layer && transition?.active) applyLiveMask();
    };
    const scheduleScan = () => { if (!disposed && !scanFrame) scanFrame = requestAnimationFrame(scan); };
    scan();
    const observer = new MutationObserver(records => {
      if (records.some(record => record.type !== 'attributes' || record.target.matches('.archive-scene, .lore-parchment, .spatial-lore-guide, .contour-content'))) scheduleScan();
    });
    observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'aria-hidden'] });
    const appearanceObserver = new MutationObserver(scheduleScan);
    appearanceObserver.observe(root, { attributes: true, attributeFilter: ['class'] });

    const restore = () => {
      layer?.remove(); layer = null;
      savedMasks.forEach((_, node) => releaseTextMask(node, maskOwner));
      savedMasks.clear();
      ghosts.clear();
      delete root.dataset.textDissolving;
    };
    const snapshot = () => {
      layer = document.createElement('div');
      layer.className = 'text-contour-ghosts';
      layer.setAttribute('aria-hidden', 'true');
      layer.inert = true;
      for (const node of targets) {
        if (node.hasAttribute('data-chapter-text-mask')) continue;
        if (localScope && !node.closest(localScope)) continue;
        if (transition.kind === 'chapter' && node.closest('.chapter-rail')) continue;
        const bounds = visibleBounds(node, root);
        if (!bounds) continue;
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const clone = node.cloneNode(true);
        freezeAppearance(node, clone);
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `position:absolute;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;`;
        if (bounds.top > rect.top || bounds.bottom < rect.bottom) wrapper.style.clipPath = `inset(${Math.max(0, bounds.top - rect.top)}px 0 ${Math.max(0, rect.bottom - bounds.bottom)}px 0)`;
        const { width, height } = layoutBox(node);
        const overrides = { position: 'absolute', inset: '0 auto auto 0', margin: '0', 'box-sizing': 'border-box', width: `${width + .02}px`, height: `${height}px`, 'min-width': '0', 'min-height': '0', 'max-width': 'none', 'max-height': 'none', scale: 'none', translate: 'none', rotate: 'none', transform: `scale(${rect.width / width},${rect.height / height})`, 'transform-origin': '0 0', 'mask-image': 'none' };
        for (const [key, value] of Object.entries(overrides)) clone.style.setProperty(key, value, 'important');
        wrapper.append(clone); layer.append(wrapper);
        ghosts.set(node, { wrapper, clone });
      }
      document.body.append(layer);
      layer.style.maskImage = renderer.mask({ left: 0, top: 0, width: innerWidth, height: innerHeight }, 'outgoing');
    };
    const configure = state => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cover = Math.max(width, height * 16 / 9);
      const projection = readSceneImageProjection(root.querySelector(SCENE_IMAGES[state.sceneIndex]), { left: (width - cover) / 2, top: (height - cover * 9 / 16) / 2, width: cover, height: cover * 9 / 16 }, width);
      renderer.configure(state.geometryImage, projection, getTracerSceneField(state.fromTheme, state.sceneIndex), width, height);
    };
    function applyLiveMask() {
      const measurements = targets.filter(node => !savedMasks.has(node) && !node.hasAttribute('data-chapter-text-mask') && visible(node, root)
        && (!localScope || node.closest(localScope))
        && !(transition.kind === 'chapter' && node.closest('.chapter-rail')))
        .map(node => ({ node, rect: node.getBoundingClientRect(), ...layoutBox(node) }));
      for (const { node, rect, width, height } of measurements) {
        if (!rect.width || !rect.height) continue;
        savedMasks.set(node, true);
        const sx = rect.width / (width || rect.width);
        const sy = rect.height / (height || rect.height);
        node.closest('.contour-focus')?.setAttribute('data-contour-revealed', 'true');
        claimTextMask(node, maskOwner, renderer.mask(rect, 'incoming', sx, sy));
      }
    }
    const paint = state => {
      renderer.draw(state.progress);
      root.dataset.textDissolving = state.kind;
    };
    const unsubscribe = subscribeThemeContourTransition(state => {
      if (localScope && !state.active) return;
      if (state.active) { cancelAnimationFrame(localFrame); localScope = null; localRequest++; }
      transition = state;
      if (!state.active || state.kind === 'chapter' || reduced.matches || !state.geometryImage || state.fromTheme === 'boot') { restore(); return; }
      if (failedToken === state.token) return;
      try {
        if (token !== state.token) {
          restore(); token = state.token; scan();
          renderer ??= createTextContourRenderer();
          configure(state); snapshot(); applyLiveMask();
        }
        paint(state);
      } catch {
        // WebGL/readback failure must never leave invisible or unusable text.
        failedToken = state.token;
        restore(); renderer?.dispose(); renderer = null;
      }
    });
    const changeContent = async event => {
      if (transition?.active || reduced.matches) return;
      event.preventDefault();
      const request = ++localRequest;
      const theme = [...root.classList].find(name => name.startsWith('theme-'))?.slice(6) || 'default';
      const chapter = ['intro', 'cores', 'projects', 'professional', 'education', 'personal', 'contact'].indexOf(root.dataset.chapter);
      const sceneIndex = [0, 1, 2, 3, 3, 4, 5][Math.max(0, chapter)];
      let updated = false;
      try {
        const resource = await loadCinematicGeometryField(getCinematicGeometryAsset(theme, sceneIndex, 0));
        if (disposed) return;
        if (request !== localRequest || transition?.active) { event.detail.update(); return; }
        transition = { active: true, kind: 'content', fromTheme: theme, sceneIndex, geometryImage: resource.image, progress: 0 };
        localScope = event.detail.selector;
        restore(); scan(); renderer ??= createTextContourRenderer();
        configure(transition); snapshot(); applyLiveMask(); paint(transition);
        event.detail.update(); updated = true;
        const start = performance.now();
        const tick = now => {
          if (disposed || request !== localRequest) return;
          transition.progress = Math.min(1, (now - start) / 850);
          paint(transition);
          if (transition.progress < 1) localFrame = requestAnimationFrame(tick);
          else { transition.active = false; restore(); localScope = null; }
        };
        localFrame = requestAnimationFrame(tick);
      } catch {
        if (!updated) event.detail.update();
        restore(); localScope = null;
        if (transition) transition.active = false;
      }
    };
    window.addEventListener('text-contour-change', changeContent);
    const warmup = window.setTimeout(() => {
      try { if (!disposed && !reduced.matches) renderer ??= createTextContourRenderer(); } catch { /* The live DOM is the fallback. */ }
    }, 100);
    const resize = () => {
      if (transition?.active && layer) {
        failedToken = transition.token;
        localRequest++; cancelAnimationFrame(localFrame); localScope = null;
        if (transition.kind === 'content') transition.active = false;
        restore();
      }
    };
    const preference = () => { if (reduced.matches) { resize(); restore(); } };
    window.addEventListener('resize', resize);
    reduced.addEventListener('change', preference);
    return () => {
      disposed = true; observer.disconnect(); appearanceObserver.disconnect(); unsubscribe(); cancelAnimationFrame(scanFrame);
      localRequest++; cancelAnimationFrame(localFrame); clearTimeout(warmup);
      window.removeEventListener('text-contour-change', changeContent);
      window.removeEventListener('resize', resize); reduced.removeEventListener('change', preference);
      restore(); renderer?.dispose();
      targets.forEach(node => { node.classList.remove('material-text'); delete node.dataset.textMaterial; });
    };
  }, [ref]);
}
