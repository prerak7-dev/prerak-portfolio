import { useLayoutEffect, useRef } from 'react';
import { usePortraitArtwork } from '../hooks/usePortraitArtwork.js';
import { getSceneCoverProjection } from '../data/cinematicViewport.js';
import { getThemeContourTransition, subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { setCachedStyleProperty } from '../utils/motionPerformance.js';
import { createGateSealTurn, GATE_SEAL_ANGLE, GATE_SEAL_HOLD_MS, projectGateSeal } from '../utils/gateSealMotion.js';
import { driveGateSeal, getGateSealPose, registerGateSealReturn, settleGateSeal } from '../state/gateSealTurnStore.js';

export function GateSealEntry({ isActive, theme, onEnter }) {
  const entryRef = useRef(null);
  const statusRef = useRef(null);
  const controller = useRef(null);
  const enterRef = useRef(onEnter);
  enterRef.current = onEnter;
  const portrait = usePortraitArtwork();

  useLayoutEffect(() => {
    const entry = entryRef.current;
    const root = entry.closest('.archive-viewport');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, frame = 0, commitFrame = 0;
    let timer = 0, operation = 0;
    let phase = 'idle', latched = false, touchClickUntil = 0;
    const restWaiters = new Set();
    const resolveRest = () => { restWaiters.forEach(resolve => resolve()); restWaiters.clear(); };
    const setPhase = next => {
      phase = next; entry.dataset.sealPhase = next;
      if (next === 'idle') resolveRest();
      const status = next === 'turning' ? 'Turning the stone seal.' : next === 'unlocked' ? 'Gate unlocked. Entering Cores.' : '';
      if (statusRef.current.textContent !== status) statusRef.current.textContent = status;
    };
    const available = () => isActive && !disposed && !document.hidden
      && root.dataset.chapter === 'intro' && root.dataset.chapterCopyPhase === 'idle'
      && !getThemeContourTransition().active && !entry.closest('[inert], [data-home-awaiting]')
      && entry.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
    const stop = () => {
      operation++;
      const pose = getGateSealPose();
      clearTimeout(timer); timer = 0;
      settleGateSeal(pose.angle, theme, portrait, pose.dissolving);
      cancelAnimationFrame(commitFrame); commitFrame = 0;
      return pose;
    };
    const run = (target, duration, done) => {
      const pose = stop();
      const turn = createGateSealTurn(pose.angle, pose.velocity, target, duration);
      const token = operation;
      if (!reduced.matches) driveGateSeal(turn, theme, portrait, undefined, true);
      timer = setTimeout(() => {
        if (disposed || token !== operation) return;
        timer = 0;
        settleGateSeal(target, theme, portrait, !reduced.matches && target > 0);
        done();
      }, duration);
    };
    const cancel = (immediate = false) => {
      latched = false;
      if (immediate || !available() || reduced.matches) {
        stop(); settleGateSeal(0, theme, portrait); setPhase('idle');
      } else if (phase === 'turning') {
        setPhase('returning');
        run(0, 1100, () => setPhase('idle'));
      }
    };
    const begin = (automatic = false) => {
      if (!available() || phase === 'unlocked') return;
      latched ||= automatic;
      if (phase === 'turning') return;
      // Explicit activation is immediate for reduced-motion readers. Hover/hold
      // still uses the full dwell, without rotating the artwork in that mode.
      if (automatic && reduced.matches) {
        stop(); setPhase('unlocked'); enterRef.current(); return;
      }
      setPhase('turning');
      run(GATE_SEAL_ANGLE, GATE_SEAL_HOLD_MS, () => {
        if (!available()) { cancel(true); return; }
        setPhase('unlocked');
        // Lock the exact half-turn, then continue the reveal already in progress.
        commitFrame = requestAnimationFrame(() => {
          commitFrame = 0;
          if (available() && phase === 'unlocked') enterRef.current();
        });
      });
    };
    const unregisterReturn = registerGateSealReturn(() => {
      if (!getGateSealPose().dissolving || phase === 'idle' || phase === 'unlocked') return Promise.resolve();
      return new Promise(resolve => { restWaiters.add(resolve); cancel(); });
    });
    const measure = () => {
      frame = 0;
      if (disposed || !isActive || document.hidden) return;
      const image = root.querySelector('.gateway-sequence-preloads img');
      const projection = readSceneImageProjection(image, getSceneCoverProjection(innerWidth, innerHeight, portrait ? .5 : 16 / 9), innerWidth);
      const seal = projectGateSeal(projection, portrait);
      const parent = entry.parentElement.getBoundingClientRect();
      for (const [key, value] of Object.entries({ x: seal.x - parent.left, y: seal.y - parent.top, diameter: seal.diameter, target: seal.target })) {
        setCachedStyleProperty(entry, `--gate-seal-${key}`, `${value.toFixed(3)}px`);
      }
      entry.dataset.sealPlaced = 'true';
      // Share the scene's cached projection; only this anchored control follows
      // ambient movement. The surrounding text layout is never rewritten.
      if (!reduced.matches) frame = requestAnimationFrame(measure);
    };
    const schedule = () => { if (!frame && !disposed && isActive) frame = requestAnimationFrame(measure); };
    const interrupt = () => cancel(true);
    const resize = () => { interrupt(); schedule(); };
    const visibility = () => { if (document.hidden) { interrupt(); cancelAnimationFrame(frame); frame = 0; } else schedule(); };
    const escape = event => { if (event.key === 'Escape' && (phase === 'turning' || phase === 'returning')) cancel(); };
    let transitionToken = -1;
    const unsubscribe = subscribeThemeContourTransition(transition => {
      if (transition.active && transition.token !== transitionToken) {
        transitionToken = transition.token;
        // Leave a completed disc locked while it dissolves out. Any unrelated
        // navigation/theme request invalidates the pending automatic entry.
        if (phase === 'unlocked') { stop(); setPhase('unlocked'); }
        else { latched = false; stop(); setPhase('idle'); }
      } else if (!transition.active) schedule();
    });
    controller.current = {
      hover: event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') begin(); },
      leave: () => { if (!latched && phase === 'turning') cancel(); },
      press: event => {
        if (event.pointerType === 'mouse' || !event.isPrimary || !available()) return;
        event.preventDefault(); touchClickUntil = performance.now() + GATE_SEAL_HOLD_MS + 1000;
        event.currentTarget.setPointerCapture(event.pointerId); begin();
      },
      move: event => {
        if (event.pointerType === 'mouse' || phase !== 'turning') return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) cancel();
      },
      release: event => {
        if (event.pointerType === 'mouse') return;
        touchClickUntil = performance.now() + 600;
        if (phase === 'turning') cancel();
      },
      cancel: () => { if (phase !== 'unlocked') cancel(); },
      activate: event => {
        if (event.currentTarget.classList.contains('gate-seal-control') && event.detail && performance.now() < touchClickUntil) return;
        begin(true);
      },
    };
    setPhase('idle'); settleGateSeal(0, theme, portrait);
    measure();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('blur', interrupt);
    window.addEventListener('keydown', escape);
    root.addEventListener('load', schedule, true);
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', resize);
    return () => {
      disposed = true; stop(); cancelAnimationFrame(frame); unsubscribe(); unregisterReturn(); resolveRest(); controller.current = null;
      window.removeEventListener('resize', resize); window.removeEventListener('blur', interrupt); window.removeEventListener('keydown', escape);
      root.removeEventListener('load', schedule, true); document.removeEventListener('visibilitychange', visibility);
      reduced.removeEventListener('change', resize);
    };
  }, [isActive, theme, portrait]);

  return (
    <div ref={entryRef} className="intro-gate-entry gate-seal-entry" data-brush-hover="off">
      <button className="gate-seal-control" type="button" disabled={!isActive}
        aria-label="Open gate to Cores. Hold for three seconds or activate."
        onPointerEnter={event => controller.current?.hover(event)} onPointerLeave={() => controller.current?.leave()}
        onPointerDown={event => controller.current?.press(event)} onPointerMove={event => controller.current?.move(event)}
        onPointerUp={event => controller.current?.release(event)} onPointerCancel={() => controller.current?.cancel()}
        onLostPointerCapture={() => controller.current?.cancel()} onClick={event => controller.current?.activate(event)} />
      <div className="intro-gate-scroll-shell">
        <button className="intro-gate-cta tracer-action" data-tracer-prop="action" type="button" disabled={!isActive} onClick={event => controller.current?.activate(event)}>
          <span className="scenic-text">Open Sesame?</span>
        </button>
      </div>
      <span className="gate-seal-status" ref={statusRef} role="status" aria-live="polite" />
    </div>
  );
}
