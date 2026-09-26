import { useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';
import { TEXT_DISPLAY_SELECTOR } from '../data/textMaterials.js';
import { findTextTargets } from '../utils/textTargets.js';
import { claimTextMask, releaseTextMask } from '../utils/textMaskOwnership.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';
import { subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { createTextContourRenderer } from '../utils/textContourRenderer.js';
import { getCinematicGeometryAsset } from '../data/cinematicAssets.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import { beginTracerContourTransition, maskTracerContourTransition, finishTracerContourTransition } from '../utils/tracerContourTransition.js';

const SCENE_IMAGES = ['.gateway-sequence-preloads img', '.cores-plate img', '.systems-plate img', '.chronology-plate img', '.field-plate img', '.surface-plate img'];
const APPEARANCE_PROPERTIES = ['display', 'box-sizing', 'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'text-transform', 'text-align', 'text-indent', 'white-space', 'word-spacing', 'word-break', 'overflow-wrap', 'color', '-webkit-text-fill-color', '-webkit-text-stroke', 'text-shadow', 'background-image', 'background-size', 'background-position', 'background-repeat', 'background-blend-mode', 'background-clip', '-webkit-background-clip', 'filter', 'padding', 'margin', 'vertical-align', 'text-decoration', 'gap', 'align-items', 'justify-content'];
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
      const bottom = parent.hasAttribute('data-reading-visible-height') ? Math.min(clip.bottom, clip.top + Number(parent.dataset.readingVisibleHeight)) : clip.bottom;
      bounds.top = Math.max(bounds.top, clip.top); bounds.bottom = Math.min(bounds.bottom, bottom);
    }
  }
  return bounds.right > bounds.left && bounds.bottom > bounds.top ? bounds : null;
}

const visible = (node, root) => Boolean(visibleBounds(node, root));
const withinScope = (node, scope) => !scope || (typeof scope === 'string' ? node.closest(scope) : scope.contains(node));

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
    let localPhase = null;
    let localChange = null;
    let loading = false;
    const pendingChanges = new Map();
    const ghosts = new Map();
    const savedMasks = new Map();
    const maskOwner = Symbol('theme-content');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const scan = () => {
      scanFrame = 0;
      targets = findTextTargets(root);
      targets.forEach(node => {
        if (!node.classList.contains('material-text')) node.classList.add('material-text');
        node.dataset.textMaterial = node.matches(TEXT_DISPLAY_SELECTOR) ? 'display-ink' : 'ink';
      });
      if (transition?.active && renderer && (layer || localPhase)) applyLiveMask();
    };
    const scheduleScan = () => { if (!disposed && !scanFrame) scanFrame = requestAnimationFrame(scan); };
    scan();
    const observer = new MutationObserver(records => {
      if (localPhase) scan();
      else if (records.some(record => record.type !== 'attributes' || record.target.matches('.archive-scene, .lore-parchment, .spatial-lore-guide, .contour-content'))) scheduleScan();
      runNextChange();
    });
    observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'aria-hidden', 'data-chapter-copy-phase'] });
    const appearanceObserver = new MutationObserver(scheduleScan);
    appearanceObserver.observe(root, { attributes: true, attributeFilter: ['class'] });

    const restore = () => {
      finishTracerContourTransition(root, maskOwner);
      layer?.remove(); layer = null;
      savedMasks.forEach((_, node) => releaseTextMask(node, maskOwner));
      savedMasks.clear();
      ghosts.clear();
      delete root.dataset.textDissolving;
      delete root.dataset.textContentPhase;
    };
    const snapshot = () => {
      layer = document.createElement('div');
      layer.className = 'text-contour-ghosts';
      layer.setAttribute('aria-hidden', 'true');
      layer.inert = true;
      for (const node of targets) {
        if (node.hasAttribute('data-chapter-text-mask')) continue;
        if (!withinScope(node, localScope)) continue;
        if (transition.kind === 'chapter' && node.closest('.chapter-rail')) continue;
        const bounds = visibleBounds(node, root);
        if (!bounds) continue;
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const clone = node.cloneNode(true);
        freezeAppearance(node, clone);
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `position:absolute;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;`;
        wrapper.style.clipPath = `inset(${Math.max(0, bounds.top - rect.top)}px ${Math.max(0, rect.right - bounds.right)}px ${Math.max(0, rect.bottom - bounds.bottom)}px ${Math.max(0, bounds.left - rect.left)}px)`;
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
        && withinScope(node, localScope)
        && !(transition.kind === 'chapter' && node.closest('.chapter-rail')))
        .map(node => ({ node, rect: node.getBoundingClientRect(), ...layoutBox(node) }));
      for (const { node, rect, width, height } of measurements) {
        if (!rect.width || !rect.height) continue;
        savedMasks.set(node, true);
        const sx = rect.width / (width || rect.width);
        const sy = rect.height / (height || rect.height);
        node.closest('.contour-focus')?.setAttribute('data-contour-revealed', 'true');
        claimTextMask(node, maskOwner, localPhase === 'exiting' ? 'linear-gradient(transparent, transparent)' : renderer.mask(rect, 'incoming', sx, sy));
      }
    }
    const paint = state => {
      renderer.draw(state.progress);
      root.dataset.textDissolving = state.kind;
    };
    const unsubscribe = subscribeThemeContourTransition(state => {
      if ((localPhase || loading) && !state.active) return;
      if (state.active && (localPhase || loading)) {
        if (localChange && !localChange.updated && !pendingChanges.has(localChange.selector)) pendingChanges.set(localChange.selector, localChange);
        else localChange?.complete?.();
        localChange = null; localPhase = null; loading = false;
        cancelAnimationFrame(localFrame); localScope = null; localRequest++;
        restore();
        delete root.dataset.textContentPhase;
      }
      transition = state;
      if (!state.active || reduced.matches || !state.geometryImage || state.fromTheme === 'boot') { restore(); queueMicrotask(runNextChange); return; }
      if (state.kind === 'chapter') {
        if (token !== state.token) {
          restore(); token = state.token;
          beginTracerContourTransition(root, maskOwner, 'hold');
        }
        return;
      }
      if (failedToken === state.token) return;
      try {
        if (token !== state.token) {
          restore(); token = state.token; scan();
          renderer ??= createTextContourRenderer();
          configure(state); snapshot(); applyLiveMask();
          beginTracerContourTransition(root, maskOwner, 'crossfade');
          maskTracerContourTransition(root, maskOwner, renderer);
        }
        paint(state);
      } catch {
        // WebGL/readback failure must never leave invisible or unusable text.
        failedToken = state.token;
        restore(); renderer?.dispose(); renderer = null;
      }
    });
    async function runNextChange() {
      if (disposed || loading || transition?.active || !pendingChanges.size || root.dataset.chapterCopyPhase !== 'idle') return;
      const change = pendingChanges.values().next().value;
      pendingChanges.delete(change.selector);
      localChange = change;
      if (reduced.matches) { change.update(); change.complete?.(); localChange = null; queueMicrotask(runNextChange); return; }
      loading = true;
      const request = ++localRequest;
      const theme = [...root.classList].find(name => name.startsWith('theme-'))?.slice(6) || 'default';
      const chapter = ['intro', 'cores', 'projects', 'professional', 'education', 'personal', 'contact'].indexOf(root.dataset.chapter);
      const sceneIndex = [0, 1, 2, 3, 3, 4, 5][Math.max(0, chapter)];
      const complete = () => {
        restore(); localScope = null; localPhase = null; localChange = null; loading = false;
        transition = null;
        change.complete?.();
        queueMicrotask(runNextChange);
      };
      try {
        const resource = await loadCinematicGeometryField(getCinematicGeometryAsset(theme, sceneIndex, 0));
        if (disposed || request !== localRequest) return;
        if (reduced.matches) { change.update(); change.updated = true; complete(); return; }
        loading = false;
        transition = { active: true, kind: 'content', fromTheme: theme, sceneIndex, geometryImage: resource.image, progress: 0 };
        localScope = change.selector;
        localPhase = 'exiting';
        restore(); scan(); renderer ??= createTextContourRenderer();
        configure(transition); snapshot(); applyLiveMask(); paint(transition);
        root.dataset.textContentPhase = 'exiting';
        let start = performance.now();
        const tick = now => {
          if (disposed || request !== localRequest) return;
          transition.progress = Math.max(0, Math.min(1, (now - start) / (localPhase === 'exiting' ? 420 : 720)));
          paint(transition);
          if (transition.progress >= 1 && localPhase === 'exiting') {
            // Commit only after the old face is gone; mask the new DOM before paint.
            layer?.remove(); layer = null; ghosts.clear();
            savedMasks.forEach((_, node) => releaseTextMask(node, maskOwner)); savedMasks.clear();
            flushSync(change.update); change.updated = true;
            root.dispatchEvent(new Event('contour-reading-refresh'));
            localPhase = 'entering'; transition.progress = 0;
            renderer.draw(0); scan(); applyLiveMask();
            root.dataset.textContentPhase = 'entering';
            start = now + 60;
          } else if (transition.progress >= 1) {
            delete root.dataset.textContentPhase; complete(); return;
          }
          localFrame = requestAnimationFrame(tick);
        };
        localFrame = requestAnimationFrame(tick);
      } catch {
        if (request !== localRequest) return;
        if (!change.updated) change.update();
        delete root.dataset.textContentPhase; complete();
      }
    }
    const changeContent = event => {
      if (reduced.matches) return;
      event.preventDefault();
      pendingChanges.get(event.detail.selector)?.complete?.();
      pendingChanges.set(event.detail.selector, event.detail);
      runNextChange();
    };
    window.addEventListener('text-contour-change', changeContent);
    const warmup = window.setTimeout(() => {
      try { if (!disposed && !reduced.matches) renderer ??= createTextContourRenderer(); } catch { /* The live DOM is the fallback. */ }
    }, 100);
    const resize = () => {
      if (transition?.active && (layer || localPhase)) {
        failedToken = transition.token;
        localRequest++; cancelAnimationFrame(localFrame); localScope = null;
        if (transition.kind === 'content') {
          if (localChange && !localChange.updated) localChange.update();
          localChange?.complete?.(); localChange = null; localPhase = null;
          transition.active = false;
          delete root.dataset.textContentPhase;
        }
        restore();
        queueMicrotask(runNextChange);
      }
    };
    const preference = () => { if (reduced.matches) { resize(); restore(); } };
    window.addEventListener('resize', resize);
    reduced.addEventListener('change', preference);
    return () => {
      disposed = true; observer.disconnect(); appearanceObserver.disconnect(); unsubscribe(); cancelAnimationFrame(scanFrame);
      localRequest++; cancelAnimationFrame(localFrame); clearTimeout(warmup);
      localChange?.complete?.(); pendingChanges.forEach(change => change.complete?.()); pendingChanges.clear();
      window.removeEventListener('text-contour-change', changeContent);
      window.removeEventListener('resize', resize); reduced.removeEventListener('change', preference);
      restore(); renderer?.dispose();
      targets.forEach(node => { node.classList.remove('material-text'); delete node.dataset.textMaterial; });
    };
  }, [ref]);
}
