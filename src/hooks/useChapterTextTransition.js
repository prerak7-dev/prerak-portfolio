import { useLayoutEffect, useRef, useState } from 'react';
import { getSceneCoverProjection } from '../data/cinematicViewport.js';
import { getCinematicGeometryAsset } from '../data/cinematicAssets.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import { createTextContourRenderer } from '../utils/textContourRenderer.js';
import { findTextTargets } from '../utils/textTargets.js';
import { claimTextMask, releaseTextMask } from '../utils/textMaskOwnership.js';
import { beginTracerContourTransition, maskTracerContourTransition, finishTracerContourTransition } from '../utils/tracerContourTransition.js';
import { homeTextChoreography, TEXT_ENTRY_MS } from '../utils/textChoreography.js';

const COPY_SCOPE = '.archive-scene-stack, .lore-parchment';
const SCENE_INDICES = [0, 1, 2, 3, 3, 4, 5];

// Chapter identity changes only between exit and entry, while the DOM is gated.
// This also covers native scrolling, which does not publish a scene transition.
export function useChapterTextTransition(ref, activeIndex, enabled, theme) {
  const [copy, setCopy] = useState({ index: activeIndex, phase: 'loading', initial: true });
  const latest = useRef({ activeIndex, theme });
  latest.current = { activeIndex, theme };
  const rendererRef = useRef(null);
  const identityHandoffRef = useRef(false);
  const tracerOwner = useRef(Symbol('chapter-tracers'));

  useLayoutEffect(() => {
    if (enabled && copy.phase !== 'exiting' && activeIndex !== copy.index) {
      setCopy(current => ({ ...current, phase: 'exiting', initial: false }));
    }
  }, [activeIndex, enabled, copy]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !enabled || copy.phase === 'idle') return undefined;
    let disposed = false;
    let frame = 0;
    let progress = 0;
    let resource;
    let elapsed = 0;
    let identityOrigin;
    let identityMaskKey;
    const homeEntry = copy.index === 0 && copy.phase !== 'exiting';
    const identity = root.querySelector('.archive-identity');
    const role = root.querySelector('.intro-role-orbit');
    const stagedNodes = {
      role: [...root.querySelectorAll('.intro-role-orbit, .intro-actions')],
      motto: [...root.querySelectorAll('.intro-manifesto, .intro-gate-entry, .lore-parchment')],
    };
    const revealStagedNodes = () => Object.values(stagedNodes).flat().forEach(node => node.removeAttribute('data-home-awaiting'));
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
        if (identityHandoffRef.current && identity) {
          identity.style.visibility = 'hidden';
          identity.style.removeProperty('transform');
        }
        setCopy({ index: latest.current.activeIndex, phase: 'entering', initial: false });
      } else {
        identityHandoffRef.current = false;
        identity?.style.removeProperty('visibility');
        identity?.style.removeProperty('transform');
        revealStagedNodes();
        if (homeEntry) root.dataset.homeIntroStage = 'complete';
        finishTracerContourTransition(root, tracerOwner.current);
        root.dataset.chapterCopyReady = 'true';
        setCopy(current => ({ ...current, phase: 'idle', initial: false }));
      }
    };
    const measureIdentity = () => {
      if (!homeEntry || !copy.initial || !identity || !role) return;
      identity.style.removeProperty('transform');
      const dock = identity.getBoundingClientRect();
      const origin = role.getBoundingClientRect();
      identityOrigin = { x: Math.min(origin.left, innerWidth - dock.width - 12) - dock.left, y: origin.top - dock.top };
      identityHandoffRef.current = true;
      identityMaskKey = null;
    };
    const maskIdentity = timing => {
      if (!identityOrigin) return;
      const key = `${timing.identityAtHeader}:${timing.identityDirection}`;
      if (key === identityMaskKey && saved.has(identity)) return;
      // Change position only behind the fully dissolved incoming face.
      identity.style.transform = timing.identityAtHeader ? '' : `translate3d(${identityOrigin.x}px, ${identityOrigin.y}px, 0)`;
      const rect = identity.getBoundingClientRect();
      saved.set(identity, true);
      identity.dataset.chapterTextMask = 'true';
      claimTextMask(identity, maskOwner, rendererRef.current.mask(rect, timing.identityDirection, 1, 1, 'identity'));
      identityMaskKey = key;
    };
    const draw = () => {
      const renderer = rendererRef.current;
      renderer.draw(progress);
      if (!homeEntry) return;
      const timing = homeTextChoreography(elapsed, copy.initial);
      for (const channel of ['identity', 'role', 'motto']) renderer.draw(timing[channel], channel);
      root.dataset.homeIntroStage = timing.stage;
      for (const [channel, nodes] of Object.entries(stagedNodes)) {
        nodes.forEach(node => node.toggleAttribute('data-home-awaiting', timing[channel] === 0));
      }
      maskIdentity(timing);
    };
    const maskTargets = () => {
      const renderer = rendererRef.current;
      const targets = findTextTargets(root).filter(node => !(identityHandoffRef.current && node.closest('.archive-identity')));
      if (!identityOrigin && identityHandoffRef.current && identity) targets.push(identity);
      for (const node of targets) {
        if ((!copy.initial && node !== identity && !node.closest(COPY_SCOPE)) || saved.has(node)) continue;
        if (node.closest('.archive-scene[aria-hidden="true"]')) continue;
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        saved.set(node, true);
        node.dataset.chapterTextMask = 'true';
        const sx = rect.width / (node.offsetWidth || rect.width);
        const sy = rect.height / (node.offsetHeight || rect.height);
        const channel = !homeEntry || node === identity ? 'default'
          : node.closest('.intro-role-orbit, .intro-actions') ? 'role'
            : node.closest('.intro-manifesto, .intro-gate-entry, .lore-parchment') ? 'motto' : 'default';
        claimTextMask(node, maskOwner, renderer.mask(rect, copy.phase === 'exiting' ? 'outgoing' : 'incoming', sx, sy, channel));
      }
    };
    const configure = () => {
      const width = innerWidth;
      const height = innerHeight;
      rendererRef.current.configure(resource.image,
        getSceneCoverProjection(width, height, resource.image.naturalWidth / resource.image.naturalHeight),
        getTracerSceneField(latest.current.theme, SCENE_INDICES[copy.index]), width, height);
      measureIdentity();
      draw();
      maskTargets();
      if (identityHandoffRef.current) identity?.style.removeProperty('visibility');
      maskTracerContourTransition(root, tracerOwner.current, rendererRef.current);
    };
    let resizeRequest = 0;
    const resize = async () => {
      if (!resource || disposed) return;
      const request = ++resizeRequest;
      try {
        const loaded = await loadCinematicGeometryField(getCinematicGeometryAsset(latest.current.theme, SCENE_INDICES[copy.index], 0));
        if (disposed || request !== resizeRequest) return;
        resource = loaded;
      } catch { return; }
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
        const loaded = await loadCinematicGeometryField(getCinematicGeometryAsset(latest.current.theme, SCENE_INDICES[copy.index], 0));
        if (copy.initial) await document.fonts.ready;
        if (disposed) return;
        resource = loaded;
        rendererRef.current ??= createTextContourRenderer();
        configure();
        root.dataset.chapterCopyReady = 'true';
        const duration = copy.phase === 'exiting' ? 650 : homeEntry ? homeTextChoreography(0, copy.initial).duration : TEXT_ENTRY_MS;
        const started = performance.now();
        const tick = now => {
          elapsed = now - started;
          progress = Math.min(1, elapsed / (copy.phase === 'exiting' ? 650 : TEXT_ENTRY_MS));
          draw();
          root.dataset.chapterCopyProgress = progress.toFixed(3);
          if (elapsed < duration) frame = requestAnimationFrame(tick);
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
      if (identityOrigin && (!identityHandoffRef.current || reduced.matches)) {
        identity.style.removeProperty('transform');
      }
      if (copy.phase === 'exiting' || reduced.matches) {
        revealStagedNodes();
      }
      delete root.dataset.chapterCopyProgress;
    };
  }, [ref, enabled, copy.index, copy.phase, copy.initial]);

  useLayoutEffect(() => {
    const root = ref.current;
    return () => {
      const identity = root?.querySelector('.archive-identity');
      identity?.style.removeProperty('transform');
      identity?.style.removeProperty('visibility');
      finishTracerContourTransition(root, tracerOwner.current);
      rendererRef.current?.dispose(); rendererRef.current = null;
    };
  }, [ref]);
  return copy;
}
