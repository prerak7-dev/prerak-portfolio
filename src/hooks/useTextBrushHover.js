import { useLayoutEffect } from 'react';
import { getCinematicGeometryAsset } from '../data/cinematicAssets.js';
import { getSceneCoverProjection } from '../data/cinematicViewport.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';
import { subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import { createTextContourRenderer } from '../utils/textContourRenderer.js';
import { getBrushTarget, measureBrushLines } from '../utils/textBrushGeometry.js';

const SCENE_INDEX = { intro: 0, cores: 1, projects: 2, professional: 3, education: 3, personal: 4, contact: 5 };
const ENTRY_MS = 560;
const EXIT_MS = 360;

export function useTextBrushHover(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const layer = document.createElement('div');
    layer.className = 'text-brush-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.inert = true;
    root.append(layer);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const forced = matchMedia('(forced-colors: active)');
    const strokes = [];
    let renderer;
    let configured = '';
    let pending;
    let wanted;
    let focused;
    let pointer;
    let transitioning = false;
    let disposed = false;
    let frame = 0;
    let warmup = 0;
    let request = 0;

    const scene = () => {
      const theme = [...root.classList].find(name => name.startsWith('theme-'))?.slice(6) || 'default';
      const index = SCENE_INDEX[root.dataset.chapter] ?? 0;
      return { theme, index, key: `${theme}:${index}:${innerWidth}:${innerHeight}` };
    };
    const blocked = () => transitioning || forced.matches || root.classList.contains('experience-concealed')
      || root.dataset.chapterCopyPhase !== 'idle' || (root.dataset.chapter === 'intro' && root.dataset.homeIntroStage !== 'complete');
    const remove = stroke => {
      stroke.node.remove();
      renderer?.releaseMask(stroke.mask);
      strokes.splice(strokes.indexOf(stroke), 1);
    };
    const clear = () => { [...strokes].forEach(remove); cancelAnimationFrame(frame); frame = 0; };
    const position = stroke => {
      const lines = measureBrushLines(stroke.target, root);
      const signature = JSON.stringify(lines);
      if (stroke.signature === signature) return lines.length;
      stroke.signature = signature;
      stroke.anchor = stroke.target.getBoundingClientRect();
      stroke.node.style.transform = '';
      // The paint has no live text children, so it cannot enter text snapshots or reading pagination.
      while (stroke.node.children.length > lines.length) stroke.node.lastChild.remove();
      lines.forEach((rect, index) => {
        const mark = stroke.node.children[index] || stroke.node.appendChild(document.createElement('i'));
        mark.style.cssText = `left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;`;
      });
      return lines.length;
    };
    const animate = now => {
      frame = 0;
      let running = false;
      for (const stroke of [...strokes]) {
        const elapsed = Math.min(1, (now - stroke.started) / (stroke.to ? ENTRY_MS : EXIT_MS));
        stroke.progress = reduced.matches ? stroke.to : stroke.from + (stroke.to - stroke.from) * elapsed;
        if (stroke.to && !stroke.target.isConnected) { remove(stroke); continue; }
        if (stroke.target.closest('.chapter-rail')) {
          const rect = stroke.target.getBoundingClientRect();
          stroke.node.style.transform = `translate(${rect.left - stroke.anchor.left}px, ${rect.top - stroke.anchor.top}px)`;
        }
        renderer?.draw(stroke.progress, stroke.channel);
        if (!stroke.to && stroke.progress <= 0) { remove(stroke); continue; }
        // Only moving navigation labels need tracking after the pigment has settled.
        running ||= !reduced.matches && (elapsed < 1 || (stroke.to && stroke.target.closest('.chapter-rail')));
      }
      if (running) frame = requestAnimationFrame(animate);
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(animate); };
    const flow = (stroke, to) => {
      stroke.from = stroke.progress;
      stroke.to = to;
      stroke.started = performance.now();
      if (reduced.matches && !to) remove(stroke);
      else wake();
    };
    const prepare = () => {
      const state = scene();
      if (configured === state.key || reduced.matches || forced.matches) return Promise.resolve();
      if (pending?.key === state.key) return pending.promise;
      const promise = loadCinematicGeometryField(getCinematicGeometryAsset(state.theme, state.index)).then(resource => {
        if (disposed || state.key !== scene().key || transitioning) return;
        clear();
        renderer ??= createTextContourRenderer();
        renderer.configure(resource.image, getSceneCoverProjection(innerWidth, innerHeight, resource.image.naturalWidth / resource.image.naturalHeight),
          getTracerSceneField(state.theme, state.index), innerWidth, innerHeight);
        configured = state.key;
      }).catch(() => {
        // A static painted edge is still usable without WebGL.
        if (!disposed && state.key === scene().key) { clear(); renderer?.dispose(); renderer = null; configured = state.key; }
      }).finally(() => { if (pending?.promise === promise) pending = null; });
      pending = { key: state.key, promise };
      return promise;
    };
    const select = async target => {
      if (blocked()) target = null;
      if (wanted === target) return;
      wanted = target;
      const ticket = ++request;
      strokes.filter(stroke => stroke.to && stroke.target !== target).forEach(stroke => flow(stroke, 0));
      if (!target) return;
      const existing = strokes.find(stroke => stroke.target === target);
      if (existing) { flow(existing, 1); return; }
      await prepare();
      if (disposed || ticket !== request || blocked() || !target.isConnected) return;
      if (strokes.length >= 3) remove(strokes[0]);
      const channel = ['hover-0', 'hover-1', 'hover-2'].find(name => !strokes.some(stroke => stroke.channel === name));
      const node = document.createElement('div');
      node.className = 'text-brush-wash';
      const style = getComputedStyle(root);
      const ink = target.matches('[data-adaptive-ink]') ? target : target.querySelector('[data-adaptive-ink]');
      node.style.setProperty('--brush-pigment', (ink && getComputedStyle(ink).getPropertyValue('--adaptive-ink-paper')) || style.getPropertyValue('--brush-pigment'));
      node.style.setProperty('--brush-grain', style.getPropertyValue('--type-grain'));
      const mask = !reduced.matches && renderer ? renderer.mask({ left: 0, top: 0, width: innerWidth, height: innerHeight }, 'incoming', 1, 1, channel) : null;
      if (mask) { node.style.maskImage = mask; renderer.draw(0, channel); }
      const stroke = { target, node, mask, channel, progress: 0, from: 0, to: 1, started: performance.now() };
      if (!position(stroke)) { renderer?.releaseMask(mask); wanted = null; return; }
      strokes.push(stroke);
      layer.append(node);
      wake();
    };
    const refresh = () => {
      const hovered = pointer ? getBrushTarget(document.elementFromPoint(pointer.x, pointer.y), root) : null;
      select(hovered || focused);
      for (const stroke of [...strokes]) if (stroke.to && !position(stroke)) remove(stroke);
      if (strokes.length) wake();
    };
    const onPointer = event => {
      if (event.pointerType === 'touch') return;
      pointer = { x: event.clientX, y: event.clientY };
      select(getBrushTarget(event.target, root) || focused);
    };
    const leave = () => { pointer = null; select(focused); };
    const focus = event => {
      focused = event.target.matches(':focus-visible') ? getBrushTarget(event.target, root) : null;
      if (focused) select(focused);
    };
    const blur = () => { focused = null; refresh(); };
    const scheduleWarmup = () => {
      clearTimeout(warmup);
      if (!blocked()) warmup = setTimeout(() => { prepare().then(refresh); }, 120);
    };
    const unsubscribe = subscribeThemeContourTransition(state => {
      const wasTransitioning = transitioning;
      transitioning = state.active;
      if (transitioning && !wasTransitioning) select(null);
      if (!transitioning && wasTransitioning) scheduleWarmup();
    });
    const observer = new MutationObserver(() => {
      if (blocked()) select(null);
      else { refresh(); scheduleWarmup(); }
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'data-chapter', 'data-chapter-copy-phase', 'data-home-intro-stage', 'data-text-content-phase'] });
    const changeContent = event => {
      const scope = event.detail.selector;
      if (wanted && (typeof scope === 'string' ? wanted.closest(scope) : scope?.contains(wanted))) select(null);
    };
    const resize = () => { request++; wanted = null; clear(); configured = ''; scheduleWarmup(); };
    const preference = () => { resize(); refresh(); };
    root.addEventListener('pointerover', onPointer);
    root.addEventListener('pointermove', onPointer);
    root.addEventListener('pointerleave', leave);
    root.addEventListener('focusin', focus);
    root.addEventListener('focusout', blur);
    root.addEventListener('scroll', refresh, true);
    root.addEventListener('contour-reading-refresh', refresh);
    window.addEventListener('text-contour-change', changeContent);
    window.addEventListener('resize', resize);
    window.addEventListener('blur', leave);
    reduced.addEventListener('change', preference);
    forced.addEventListener('change', preference);
    scheduleWarmup();
    return () => {
      disposed = true; request++; clearTimeout(warmup); clear(); observer.disconnect(); unsubscribe();
      root.removeEventListener('pointerover', onPointer);
      root.removeEventListener('pointermove', onPointer);
      root.removeEventListener('pointerleave', leave);
      root.removeEventListener('focusin', focus);
      root.removeEventListener('focusout', blur);
      root.removeEventListener('scroll', refresh, true);
      root.removeEventListener('contour-reading-refresh', refresh);
      window.removeEventListener('text-contour-change', changeContent);
      window.removeEventListener('resize', resize);
      window.removeEventListener('blur', leave);
      reduced.removeEventListener('change', preference);
      forced.removeEventListener('change', preference);
      renderer?.dispose(); layer.remove();
    };
  }, [ref]);
}
