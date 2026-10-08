import { memo, useEffect, useRef } from 'react';
import { getSceneCoverProjection, usesPortraitArtwork } from '../data/cinematicViewport.js';
import { getCinematicGeometryAsset } from '../data/cinematicAssets.js';
import { SEASONAL_SWIRL_ART } from '../data/interactionArt.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import { createAssetPath } from '../security/contentSecurity.js';
import { preloadImageUrl } from '../utils/preloadAssets.js';
import { createInkFireworkScore, INK_FIREWORK_DURATION_MS } from '../utils/inkFireworks.js';
import { createInkFireworksRenderer } from '../utils/inkFireworksRenderer.js';
import { gateSealStoryProgress, projectGateSeal } from '../utils/gateSealMotion.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { getGateSealPose, subscribeGateSealTurn } from '../state/gateSealTurnStore.js';

export const InkFireworks = memo(function InkFireworks({ ready = false, theme = 'default' }) {
  const canvasRef = useRef(null);
  const controllerRef = useRef(null);
  const latest = useRef({ ready, theme });
  latest.current = { ready, theme };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const root = canvas.closest('.archive-viewport');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let renderer, spriteArt, sceneField, fieldRequest = '', configured = '', frame = 0, disposed = false, failed = false;
    let width = 1, height = 1, origin = { x: 0, y: 0 };
    const clear = (reason = 'idle') => {
      cancelAnimationFrame(frame); frame = 0;
      renderer?.clear();
      canvas.dataset.inkState = reason;
      canvas.dataset.inkElapsed = '0';
      canvas.dataset.inkAngle = '0';
      canvas.style.visibility = 'hidden';
    };
    const readOrigin = () => {
      const image = root.querySelector('.gateway-sequence-preloads img');
      const portrait = image?.naturalHeight > image?.naturalWidth;
      return projectGateSeal(readSceneImageProjection(image, getSceneCoverProjection(width, height, portrait ? .5 : 1672 / 941), width), portrait);
    };
    const prepare = () => {
      if (disposed || failed || !latest.current.ready || root.dataset.chapter !== 'intro') return;
      if (reduced.matches) { clear('skipped'); return; }
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      const portrait = usesPortraitArtwork();
      const filename = getCinematicGeometryAsset(latest.current.theme, 0, 0);
      if (fieldRequest !== filename) {
        fieldRequest = filename; sceneField = null;
        loadCinematicGeometryField(filename).then(resource => {
          if (disposed || fieldRequest !== filename) return;
          sceneField = resource;
          canvas.dataset.inkFieldReady = 'true';
          if (getGateSealPose().angle === 0) { configured = ''; prepare(); }
        }).catch(() => {});
      }
      const key = `${latest.current.theme}:${width}:${height}:${portrait}:${Boolean(sceneField)}`;
      if (configured.startsWith(`${latest.current.theme}:${width}:${height}:${portrait}:`) && getGateSealPose().angle > 0) return;
      if (configured === key) return;
      try {
        if (!renderer) {
          renderer = createInkFireworksRenderer(canvas);
          if (spriteArt) renderer.setSpriteAtlas(spriteArt);
        }
        origin = readOrigin();
        const image = root.querySelector('.gateway-sequence-preloads img');
        const contours = sceneField ? { streamlines: sceneField.streamlines,
          projection: readSceneImageProjection(image, getSceneCoverProjection(width, height, portrait ? .5 : 1672 / 941), width) } : null;
        const score = createInkFireworkScore(width, height, latest.current.theme, portrait, origin, contours);
        renderer.prepare(score, width, height, latest.current.theme);
        canvas.dataset.inkContourLines = String(score.flatMap(burst => burst.strands).filter(stroke => stroke.followsContour).length);
        configured = key;
        canvas.dataset.inkTheme = latest.current.theme;
        clear();
      } catch { failed = true; clear('unavailable'); }
    };
    const draw = now => {
      frame = 0;
      if (disposed) return;
      const pose = getGateSealPose(now);
      if (document.hidden || reduced.matches || !latest.current.ready || root.dataset.chapter !== 'intro'
        || pose.theme !== latest.current.theme || (!pose.moving && pose.angle <= .00001)) {
        if (!document.hidden && !reduced.matches && pose.angle === 0) prepare();
        clear(reduced.matches ? 'skipped' : 'idle'); return;
      }
      prepare();
      if (!renderer || failed) return;
      const anchor = readOrigin();
      const elapsed = gateSealStoryProgress(pose.angle) * INK_FIREWORK_DURATION_MS;
      renderer.draw(elapsed, anchor.x - origin.x, anchor.y - origin.y);
      canvas.style.visibility = 'visible';
      const phase = root.querySelector('.gate-seal-entry')?.dataset.sealPhase;
      canvas.dataset.inkState = phase && phase !== 'idle' ? phase
        : pose.moving ? (pose.velocity < 0 ? 'returning' : 'turning') : 'held';
      canvas.dataset.inkElapsed = elapsed.toFixed(3);
      canvas.dataset.inkAngle = String(pose.angle);
      canvas.dataset.inkFrame = String(Number(canvas.dataset.inkFrame || 0) + 1);
      if (pose.moving) schedule();
    };
    const schedule = () => { if (!disposed && !frame && !document.hidden) frame = requestAnimationFrame(draw); };
    const resize = () => { configured = ''; prepare(); schedule(); };
    const visibility = () => { if (document.hidden) clear(); else schedule(); };
    const paintingLoaded = event => { if (event.target.matches?.('.gateway-sequence-preloads img')) resize(); };
    const unsubscribe = subscribeGateSealTurn(schedule);
    const observer = new MutationObserver(() => {
      if (root.dataset.chapter !== 'intro') clear(); else { prepare(); schedule(); }
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-chapter'] });
    preloadImageUrl(createAssetPath(import.meta.env.BASE_URL, SEASONAL_SWIRL_ART), 'auto').then(image => {
      if (!disposed && image) { spriteArt = image; renderer?.setSpriteAtlas(image); }
    });
    controllerRef.current = { prepare, schedule };
    window.addEventListener('resize', resize, { passive: true });
    root.addEventListener('load', paintingLoaded, true);
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', resize);
    prepare();
    return () => {
      disposed = true; clear(); unsubscribe(); observer.disconnect(); renderer?.dispose(); controllerRef.current = null;
      window.removeEventListener('resize', resize); root.removeEventListener('load', paintingLoaded, true);
      document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', resize);
    };
  }, []);
  useEffect(() => { controllerRef.current?.prepare(); controllerRef.current?.schedule(); }, [ready, theme]);
  return <canvas ref={canvasRef} className="ink-fireworks-field" width={0} height={0} data-ink-state="idle" aria-hidden="true" />;
});
