import { useLayoutEffect, useRef, useState } from 'react';
import { getCinematicGeometryAsset } from '../data/cinematicAssets.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import { createTextContourRenderer } from '../utils/textContourRenderer.js';
import { findTextTargets } from '../utils/textTargets.js';
import { claimTextMask, releaseTextMask } from '../utils/textMaskOwnership.js';
import { beginTracerContourTransition, maskTracerContourTransition, finishTracerContourTransition } from '../utils/tracerContourTransition.js';

const COPY_SCOPE = '.archive-scene-stack, .lore-parchment';
const SCENE_INDICES = [0, 1, 2, 3, 3, 4, 5];

// Chapter identity changes only between exit and entry, while the DOM is gated.
// This also covers native scrolling, which does not publish a scene transition.
export function useChapterTextTransition(ref, activeIndex, enabled, theme) {
  const [copy, setCopy] = useState({ index: activeIndex, phase: 'loading', initial: true });
  const latest = useRef({ activeIndex, theme });
  latest.current = { activeIndex, theme };
  const rendererRef = useRef(null);
  const tracerOwner = useRef(Symbol('chapter-tracers'));

  useLayoutEffect(() => {
    if (enabled && copy.phase === 'idle' && activeIndex !== copy.index) {
      setCopy(current => ({ ...current, phase: 'exiting' }));
    }
  }, [activeIndex, enabled, copy]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !enabled || copy.phase === 'idle') return undefined;
    let disposed = false;
    let frame = 0;
    let progress = 0;
    let resource;
    const saved = new Map();
    const maskOwner = Symbol('chapter');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const restoreMasks = () => {
      saved.forEach((_, node) => {
        releaseTextMask(node, maskOwner);
        delete node.dataset.chapterTextMask;
      });
      saved.clear();
    };
    const finish = () => {
      if (disposed) return;
      if (copy.phase === 'exiting') {
        // Gate before React commits the replacement, not one animation frame later.
        delete root.dataset.chapterCopyReady;
        setCopy({ index: latest.current.activeIndex, phase: 'entering', initial: false });
      } else {
        finishTracerContourTransition(root, tracerOwner.current);
        root.dataset.chapterCopyReady = 'true';
        setCopy(current => ({ ...current, phase: 'idle', initial: false }));
      }
    };
    const maskTargets = () => {
      const renderer = rendererRef.current;
      for (const node of findTextTargets(root)) {
        if ((!copy.initial && !node.closest(COPY_SCOPE)) || saved.has(node)) continue;
        if (node.closest('.archive-scene[aria-hidden="true"]')) continue;
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        saved.set(node, true);
        node.dataset.chapterTextMask = 'true';
        const sx = rect.width / (node.offsetWidth || rect.width);
        const sy = rect.height / (node.offsetHeight || rect.height);
        claimTextMask(node, maskOwner, renderer.mask(rect, copy.phase === 'exiting' ? 'outgoing' : 'incoming', sx, sy));
      }
    };
    const configure = () => {
      const width = innerWidth;
      const height = innerHeight;
      const cover = Math.max(width, height * 16 / 9);
      rendererRef.current.configure(resource.image, {
        left: (width - cover) / 2, top: (height - cover * 9 / 16) / 2,
        width: cover, height: cover * 9 / 16,
      }, getTracerSceneField(latest.current.theme, SCENE_INDICES[copy.index]), width, height);
      rendererRef.current.draw(progress);
      maskTargets();
      maskTracerContourTransition(root, tracerOwner.current, rendererRef.current);
    };
    const resize = () => {
      if (!resource || disposed) return;
      restoreMasks();
      configure();
    };
    const preference = () => { if (reduced.matches) { cancelAnimationFrame(frame); finish(); } };
    const observer = new MutationObserver(() => { if (resource && !disposed) maskTargets(); });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    const start = async () => {
      if (reduced.matches) { finish(); return; }
      beginTracerContourTransition(root, tracerOwner.current, copy.phase === 'exiting' ? 'outgoing' : 'incoming');
      try {
        resource = await loadCinematicGeometryField(getCinematicGeometryAsset(latest.current.theme, SCENE_INDICES[copy.index], 0));
        if (disposed) return;
        rendererRef.current ??= createTextContourRenderer();
        configure();
        root.dataset.chapterCopyReady = 'true';
        const duration = copy.phase === 'exiting' ? 650 : 1100;
        const started = performance.now();
        const tick = now => {
          progress = Math.min(1, (now - started) / duration);
          rendererRef.current.draw(progress);
          root.dataset.chapterCopyProgress = progress.toFixed(3);
          if (progress < 1) frame = requestAnimationFrame(tick);
          else finish();
        };
        frame = requestAnimationFrame(tick);
      } catch {
        // Content remains accessible when WebGL or an asset is unavailable.
        finish();
      }
    };
    start();
    window.addEventListener('resize', resize);
    reduced.addEventListener('change', preference);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      reduced.removeEventListener('change', preference);
      restoreMasks();
      delete root.dataset.chapterCopyProgress;
    };
  }, [ref, enabled, copy.index, copy.phase, copy.initial]);

  useLayoutEffect(() => {
    const root = ref.current;
    return () => {
      finishTracerContourTransition(root, tracerOwner.current);
      rendererRef.current?.dispose(); rendererRef.current = null;
    };
  }, [ref]);
  return copy;
}
