import { useLayoutEffect, useRef, useState } from 'react';
import { subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { NAV_COMPACT_QUERY } from '../utils/homeCompositionLayout.js';
import { createRailEntranceKeyframes, RAIL_ENTRANCE_MS, RAIL_ENTRANCE_STAGGER_MS } from '../utils/chapterRailEntrance.js';

export function useChapterRailEntrance({ railRef, itemRefs, ready }) {
  const [phase, setPhase] = useState('waiting');
  const completed = useRef(false);

  useLayoutEffect(() => {
    if (!ready || completed.current) return undefined;
    const rail = railRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let started = false;
    let frame = 0;
    let animations = [];
    const cancel = () => {
      cancelAnimationFrame(frame);
      animations.forEach(animation => animation.cancel());
      animations = [];
    };
    const finish = () => {
      if (disposed || completed.current) return;
      completed.current = true;
      cancel();
      setPhase('complete');
    };
    const start = () => {
      frame = 0;
      if (disposed || started || completed.current) return;
      if (reduced.matches) { finish(); return; }
      started = true;
      const compact = matchMedia(NAV_COMPACT_QUERY).matches;
      const frames = createRailEntranceKeyframes(compact);
      const list = rail.querySelector('.chapter-rail-list').getBoundingClientRect();
      const visible = itemRefs.current.map(item => {
        const rect = item.getBoundingClientRect();
        const center = rect.x + rect.width / 2;
        return !compact || (center >= list.left && center <= list.right);
      });
      const startedAt = document.timeline.currentTime;
      // Individual translate leaves the chapter flight's transform untouched.
      animations = itemRefs.current.map((item, index) => {
        const animation = item.animate(visible[index] ? frames : frames.map(frame => ({ ...frame, opacity: 0 })), {
          duration: RAIL_ENTRANCE_MS, delay: index * RAIL_ENTRANCE_STAGGER_MS,
          fill: 'both', easing: 'linear',
        });
        animation.id = 'chapter-rail-entrance';
        animation.startTime = startedAt;
        return animation;
      });
      const duration = RAIL_ENTRANCE_MS + (itemRefs.current.length - 1) * RAIL_ENTRANCE_STAGGER_MS;
      rail.querySelectorAll('.chapter-collapse, .chapter-scroll-arrow').forEach(control => {
        const animation = control.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 360, delay: duration - 360, fill: 'both', easing: 'ease-out',
        });
        animation.startTime = startedAt;
        animations.push(animation);
      });
      setPhase('entering');
      Promise.all(animations.map(animation => animation.finished)).then(finish).catch(() => {});
    };
    const unsubscribe = subscribeThemeContourTransition(transition => {
      cancelAnimationFrame(frame);
      if (transition.active) {
        if (started) finish();
      } else if (!started && !completed.current) frame = requestAnimationFrame(start);
    });
    const resize = () => { if (started) finish(); };
    const preference = () => { if (reduced.matches) finish(); };
    window.addEventListener('resize', resize, { passive: true });
    reduced.addEventListener('change', preference);
    return () => {
      disposed = true;
      unsubscribe();
      cancel();
      window.removeEventListener('resize', resize);
      reduced.removeEventListener('change', preference);
      // An interrupted intro must never replay or retain an offset on return.
      if (started && !completed.current) {
        completed.current = true;
        setPhase('complete');
      }
    };
  }, [ready, railRef, itemRefs]);

  return phase;
}
