import { memo, useEffect, useRef } from 'react';
import { Orbit, Waves, Compass, Mountain, Sparkles } from 'lucide-react';
import { PIGMENT_SCENE_SELECTORS } from '../data/livingPigmentArt.js';
import { getSceneCoverProjection } from '../data/cinematicViewport.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { discoveryContext, findScenicDiscovery, getScenicDiscoveries, isScenicTap } from '../utils/scenicDiscoveries.js';
import { scenicDiscoveryField } from '../state/scenicDiscoveryStore.js';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { subscribeGateSealTurn } from '../state/gateSealTurnStore.js';

const SCENE_BY_CHAPTER = { intro: 0, cores: 1, projects: 2, professional: 3, education: 3, personal: 4, contact: 5 };
const QUIET_CONTENT = 'a,button,input,textarea,select,[role="tab"],[role="dialog"],h1,h2,h3,p,.scenic-text,.contour-content,.archive-header,.spatial-hud,.spatial-lore-guide,.gate-seal-entry';
const ICONS = [null, Orbit, Waves, Compass, Mountain, Sparkles];

const styles = `
  .scenic-discoveries { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
  .scenic-discovery { position: absolute; width: 44px; height: 44px; padding: 10px;
    transform: translate(-50%, -50%); border: 0; border-radius: 50%; background: transparent;
    color: var(--ink); pointer-events: none; opacity: 0; }
  .scenic-discovery:focus-visible { opacity: 1; outline: 2px solid var(--ink); outline-offset: 3px;
    background: var(--bg); pointer-events: auto; }
  .scenic-discovery svg { width: 24px; height: 24px; }
  @media (prefers-reduced-motion: reduce) { .scenic-discoveries { display: none; } }
`;

export const ScenicDiscoveries = memo(function ScenicDiscoveries({ theme, chapter, ready, portrait }) {
  const ref = useRef(null), triggerRef = useRef(null);
  const sceneIndex = SCENE_BY_CHAPTER[chapter] ?? 0;
  const targets = getScenicDiscoveries(sceneIndex, portrait);

  useEffect(() => {
    const layer = ref.current, root = layer.closest('.archive-viewport');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const context = discoveryContext(sceneIndex, theme, portrait);
    let dwell = 0, hovered = null, press = null, placementFrame = 0;
    const available = () => ready && !reduced.matches && !document.hidden
      && root.classList.contains('chapter-settled') && root.dataset.chapterCopyPhase === 'idle'
      && (chapter !== 'intro' || root.dataset.homeIntroStage === 'complete')
      && !document.documentElement.classList.contains('theme-contour-transition-active');
    const cancelDwell = () => { clearTimeout(dwell); dwell = 0; hovered = null; };
    const interrupt = () => { cancelDwell(); press = null; scenicDiscoveryField.release(performance.now()); };
    const measure = () => readSceneImageProjection(root.querySelector(PIGMENT_SCENE_SELECTORS[sceneIndex]),
      getSceneCoverProjection(innerWidth, innerHeight), innerWidth);
    const locate = event => {
      if (!available() || event.target.closest(QUIET_CONTENT) || document.getSelection()?.type === 'Range') return null;
      const p = measure(), x = (event.clientX - p.left) / p.width, y = (event.clientY - p.top) / p.height;
      const target = findScenicDiscovery(targets, x, y);
      return target ? { target, point: { x, y } } : null;
    };
    const trigger = hit => {
      if (!hit || !available()) return;
      if (scenicDiscoveryField.trigger(hit.target, hit.point, context, performance.now())) {
        layer.dataset.lastDiscovery = String(hit.target.kind);
        layer.dataset.discoveries = String(Number(layer.dataset.discoveries || 0) + 1);
      }
    };
    triggerRef.current = target => trigger({ target, point: { x: target.anchor[0], y: target.anchor[1] } });
    const arm = hit => {
      if (hit?.target.id === hovered) return;
      cancelDwell();
      if (!hit || hit.target.kind === 2) return;
      hovered = hit.target.id;
      dwell = setTimeout(() => { dwell = 0; trigger(hit); }, 450);
    };
    const move = event => {
      if (press && Math.hypot(event.clientX - press.x, event.clientY - press.y) >= 10) {
        press = null; cancelDwell(); return;
      }
      if (event.buttons && !press) { cancelDwell(); return; }
      if (event.pointerType !== 'touch') arm(locate(event));
    };
    const down = event => {
      if (event.button !== 0 || !event.isPrimary) return;
      const hit = locate(event);
      if (!hit) return;
      press = { x: event.clientX, y: event.clientY, time: performance.now(), hit, id: event.pointerId };
      if (event.pointerType === 'touch') arm(hit);
    };
    const up = event => {
      if (press?.id === event.pointerId && isScenicTap(press, { x: event.clientX, y: event.clientY }, performance.now() - press.time)) trigger(press.hit);
      press = null;
      if (event.pointerType === 'touch') cancelDwell();
    };
    const place = () => {
      placementFrame = 0;
      const p = measure();
      layer.inert = !available();
      [...layer.querySelectorAll('button')].forEach((button, index) => {
        const [u, v] = targets[index].anchor;
        const x = p.left + u * p.width, y = p.top + v * p.height;
        const [cx, cy, rx, ry] = targets[index].region;
        // A partly cropped subject still needs a complete keyboard focus ring.
        button.style.left = `${Math.max(22, Math.min(innerWidth - 22, x))}px`;
        button.style.top = `${Math.max(22, Math.min(innerHeight - 22, y))}px`;
        button.hidden = p.left + (cx + rx) * p.width <= 0 || p.left + (cx - rx) * p.width >= innerWidth
          || p.top + (cy + ry) * p.height <= 0 || p.top + (cy - ry) * p.height >= innerHeight;
      });
    };
    const schedulePlacement = () => { if (!placementFrame) placementFrame = requestAnimationFrame(place); };
    const observer = new MutationObserver(schedulePlacement);
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'data-chapter-copy-phase', 'data-home-intro-stage'] });
    const resize = () => { interrupt(); schedulePlacement(); };
    const visibility = () => { if (document.hidden || reduced.matches) scenicDiscoveryField.clear(); interrupt(); schedulePlacement(); };
    const escape = event => { if (event.key === 'Escape') interrupt(); };
    const unsubMotion = subscribeSpatialMotion(motion => { if (!motion.settled) interrupt(); schedulePlacement(); });
    const unsubTheme = subscribeThemeContourTransition(transition => { if (transition.active) interrupt(); schedulePlacement(); });
    const unsubSeal = subscribeGateSealTurn(() => interrupt());
    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerdown', down, { passive: true });
    root.addEventListener('pointerup', up, { passive: true });
    root.addEventListener('pointercancel', interrupt);
    root.addEventListener('pointerleave', cancelDwell);
    root.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('blur', interrupt);
    window.addEventListener('keydown', escape);
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', visibility);
    schedulePlacement();
    return () => {
      interrupt(); triggerRef.current = null; cancelAnimationFrame(placementFrame); observer.disconnect();
      unsubMotion(); unsubTheme(); unsubSeal();
      root.removeEventListener('pointermove', move); root.removeEventListener('pointerdown', down);
      root.removeEventListener('pointerup', up); root.removeEventListener('pointercancel', interrupt);
      root.removeEventListener('pointerleave', cancelDwell); root.removeEventListener('wheel', interrupt);
      window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('blur', interrupt); window.removeEventListener('keydown', escape);
      reduced.removeEventListener('change', visibility);
    };
  }, [theme, chapter, ready, portrait, sceneIndex]);

  return <div ref={ref} className="scenic-discoveries" aria-label="Painted scene discoveries">
    <style>{styles}</style>
    {targets.map(target => {
      const Icon = ICONS[target.kind];
      return <button key={target.id} className="scenic-discovery" type="button" aria-label={target.label}
        title={target.label} onClick={() => triggerRef.current?.(target)}><Icon aria-hidden="true" /></button>;
    })}
  </div>;
});
