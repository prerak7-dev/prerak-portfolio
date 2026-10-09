import { memo, useEffect, useRef } from 'react';
import { getCinematicGeometryAsset, getCinematicSceneAsset } from '../data/cinematicAssets.js';
import { getSceneCoverProjection, usesPortraitArtwork } from '../data/cinematicViewport.js';
import { LIVING_PIGMENT_ATLAS, PIGMENT_SCENE_SELECTORS } from '../data/livingPigmentArt.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';
import { createAssetPath } from '../security/contentSecurity.js';
import { getSpatialMotion, subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { getThemeContourTransition, registerContourPaintingPreparer, subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { getGateSealPose, subscribeGateSealTurn } from '../state/gateSealTurnStore.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { pigmentQuietRects, resolvePigmentPassage } from '../utils/livingPigmentMotion.js';
import { createLivingPigmentRenderer } from '../utils/livingPigmentRenderer.js';
import { preloadImageUrl } from '../utils/preloadAssets.js';
import { findTextTargets } from '../utils/textTargets.js';
import { createTracerAnimation } from '../utils/tracerAnimation.js';
import { retryAssetLoad } from '../utils/assetLoadRetry.js';
import { createPaintedMotionClock, paintedMotionSample } from '../utils/paintedMotionClock.js';

const asset = filename => createAssetPath(import.meta.env.BASE_URL, filename);
const smooth = t => { const p = Math.max(0, Math.min(1, t)); return p * p * p * (p * (p * 6 - 15) + 10); };
const mixProjection = (from, to, progress) => Object.fromEntries(['left', 'top', 'width', 'height'].map(key => [key, from[key] + (to[key] - from[key]) * progress]));

export const LivingPigmentField = memo(function LivingPigmentField({ theme, ready }) {
  const canvasRef = useRef(null);
  const latest = useRef({ theme, ready });
  latest.current = { theme, ready };

  useEffect(() => {
    const canvas = canvasRef.current, root = canvas.closest('.archive-viewport');
    let renderer;
    try { renderer = createLivingPigmentRenderer(canvas); } catch (error) {
      canvas.dataset.pigmentError = error.message;
      return undefined;
    }
    let disposed = false, animation, width = 1, height = 1, atlasReady = false;
    let quietNodes = [], quietDirty = true, quietScanAt = -1, quietRects = [];
    let frozenOutgoing = null, incomingOrigin = null, entranceAt = null, lastMeasure = -1;
    let drawnFrames = 0;
    const loopClock = createPaintedMotionClock();
    const motion = { ...getSpatialMotion() }, transition = { ...getThemeContourTransition() };
    const resources = new Map(), lastProjections = new Map();
    const retryAt = new Map();
    const projection = index => readSceneImageProjection(root.querySelector(PIGMENT_SCENE_SELECTORS[index]), getSceneCoverProjection(width, height), width);
    const resourceKey = (appearance, sceneIndex, portrait) => `${appearance}:${sceneIndex}:${portrait}:${width <= 1100 || height <= 500}`;
    const request = (appearance, sceneIndex, portrait) => {
      const key = resourceKey(appearance, sceneIndex, portrait);
      if (resources.get(key) === false && performance.now() >= retryAt.get(key)) resources.delete(key);
      if (!resources.has(key)) {
        resources.set(key, null);
        Promise.all([
          preloadImageUrl(asset(getCinematicSceneAsset(appearance, sceneIndex, 0, { portrait }))),
          retryAssetLoad(() => loadCinematicGeometryField(getCinematicGeometryAsset(appearance, sceneIndex, 0, { portrait })).catch(() => null),
            { loaded: field => Boolean(field?.image) }),
        ]).then(([image, field]) => {
          if (disposed || !resources.has(key)) return;
          resources.set(key, image && field?.image ? { image, field, firstDraw: null } : false);
          if (!image || !field?.image) retryAt.set(key, performance.now() + 5000);
          animation?.invalidate();
        }).catch(() => { if (!disposed) { resources.set(key, false); retryAt.set(key, performance.now() + 5000); } });
      }
      const resource = resources.get(key);
      if (resource && atlasReady) renderer.prepare(key, sceneIndex, portrait, resource.image, resource.field.image, getTracerSceneField(appearance, sceneIndex, { portrait }));
      return { key, resource };
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      renderer.resize(width, height); quietDirty = true;
      frozenOutgoing = incomingOrigin = null; lastProjections.clear();
      animation?.invalidate();
    };
    const hide = state => {
      if (canvas.style.visibility !== 'hidden') { renderer.clear(); canvas.style.visibility = 'hidden'; }
      canvas.dataset.pigmentState = state;
    };
    const measureQuiet = time => {
      // Text exclusion is a soft, padded boundary, not an animation. Sampling
      // it at display cadence forces expensive layout during every passage.
      if (time - lastMeasure < .12) return;
      lastMeasure = time;
      if (quietDirty || time - quietScanAt > .5) {
        quietNodes = [...findTextTargets(root), ...root.querySelectorAll('.archive-header, .theme-switcher, .lore-toggle, .lore-avatar')]
          .filter(node => !node.closest('.archive-scene[aria-hidden="true"], .cinematic-environment, .spatial-world'));
        quietDirty = false; quietScanAt = time;
      }
      quietRects = pigmentQuietRects(quietNodes.filter(node => node.isConnected && node.checkVisibility({ checkVisibilityCSS: true }))
        .map(node => node.getBoundingClientRect()), width, height);
    };
    const draw = ({ time, delta, timestamp, reducedMotion }) => {
      const seal = getGateSealPose(timestamp);
      const loop = loopClock.advance(delta, paintedMotionSample(motion, transition, seal));
      canvas.dataset.pigmentReady = String(latest.current.ready);
      canvas.dataset.pigmentAtlasReady = String(atlasReady);
      if (disposed || !latest.current.ready || reducedMotion || !atlasReady) { entranceAt = null; hide(reducedMotion ? 'reduced-motion' : 'loading'); return; }
      entranceAt ??= time;
      const portrait = usesPortraitArtwork();
      const layers = resolvePigmentPassage(latest.current.theme, motion, transition, seal);
      if (!layers.length) { hide('loading'); return; }
      const prepared = layers.map(layer => {
        const { key, resource } = request(layer.theme, layer.sceneIndex, portrait);
        let pose = projection(layer.sceneIndex);
        if (transition.active && layer.role === 0 && frozenOutgoing) pose = frozenOutgoing;
        if (transition.active && layer.role === 1 && incomingOrigin) pose = mixProjection(incomingOrigin, pose, smooth(transition.linearProgress));
        lastProjections.set(layer.sceneIndex, pose);
        if (resource) { resources.delete(key); resources.set(key, resource); }
        if (resource) resource.firstDraw ??= time;
        return { ...layer, key, projection: pose, opacity: resource ? smooth((time - resource.firstDraw) / .8) : 0 };
      });
      measureQuiet(time);
      const quality = document.documentElement.classList.contains('motion-quality-low') ? .48
        : document.documentElement.classList.contains('motion-quality-balanced') ? .72 : 1;
      renderer.draw(prepared, loop.time, quietRects, quality, smooth((time - entranceAt) / 1.6));
      canvas.style.visibility = 'visible';
      canvas.dataset.pigmentState = layers.some(layer => layer.transitioning) ? 'passage' : 'reading';
      canvas.dataset.pigmentScenes = layers.map(layer => layer.sceneIndex).join(',');
      canvas.dataset.pigmentThemes = layers.map(layer => layer.theme).join(',');
      canvas.dataset.pigmentProgress = layers[0].progress.toFixed(6);
      canvas.dataset.pigmentDirection = String(motion.direction);
      canvas.dataset.pigmentFrame = String(++drawnFrames);
      while (resources.size > 8) {
        const key = resources.keys().next().value;
        resources.delete(key); retryAt.delete(key);
      }
    };
    const unsubscribeMotion = subscribeSpatialMotion(next => { Object.assign(motion, next); animation?.invalidate(); });
    const unsubscribeTransition = subscribeThemeContourTransition(next => {
      if (next.active && next.token !== transition.token && next.fromTheme !== 'boot') {
        frozenOutgoing = lastProjections.get(next.sceneIndex) || projection(next.sceneIndex);
        incomingOrigin = next.initialProgress > 0 ? lastProjections.get(next.targetSceneIndex) : null;
      }
      if (!next.active) frozenOutgoing = incomingOrigin = null;
      if (next.token !== transition.token || next.active !== transition.active) quietDirty = true;
      Object.assign(transition, next); animation?.invalidate();
    });
    const unsubscribeSeal = subscribeGateSealTurn(() => animation?.invalidate());
    const unregisterPreparer = registerContourPaintingPreparer(async ({ toImage, toTheme, targetSceneIndex }) => {
      if (!atlasReady || disposed) return;
      const portrait = toImage.naturalHeight > toImage.naturalWidth;
      const key = resourceKey(toTheme, targetSceneIndex, portrait);
      const field = await loadCinematicGeometryField(getCinematicGeometryAsset(toTheme, targetSceneIndex, 0, { portrait })).catch(() => null);
      if (disposed || !field?.image) return;
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (disposed) return;
      renderer.prepare(key, targetSceneIndex, portrait, toImage, field.image, getTracerSceneField(toTheme, targetSceneIndex, { portrait }));
      if (!resources.get(key)) resources.set(key, { image: toImage, field, firstDraw: null });
    });
    const mutation = new MutationObserver(() => { quietDirty = true; animation?.invalidate(); });
    mutation.observe(root, { childList: true, subtree: true, characterData: true });
    const observer = new ResizeObserver(resize);
    observer.observe(canvas); resize();
    hide('loading');
    animation = createTracerAnimation(draw);
    preloadImageUrl(asset(LIVING_PIGMENT_ATLAS)).then(image => {
      if (disposed || !image) return;
      renderer.setAtlas(image); atlasReady = true;
      request(latest.current.theme, 0, usesPortraitArtwork());
      request(latest.current.theme, 1, usesPortraitArtwork());
      animation.invalidate();
    });
    return () => {
      disposed = true; animation.dispose(); observer.disconnect(); mutation.disconnect();
      unsubscribeMotion(); unsubscribeTransition(); unsubscribeSeal(); unregisterPreparer(); renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="living-pigment-field" aria-hidden="true" />;
});
