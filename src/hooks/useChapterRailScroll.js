import { useCallback, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import { NAV_COMPACT_QUERY, NAV_LANDSCAPE_QUERY } from '../utils/homeCompositionLayout.js';
import { CHAPTER_RAIL_SCROLL_STEP, getChapterRailCapacity } from '../utils/chapterRailScroll.js';

export function useChapterRailScroll({ listRef, activeIndex, itemCount }) {
  const controllerRef = useRef(null);
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const portrait = matchMedia(NAV_COMPACT_QUERY);
    const landscape = matchMedia(NAV_LANDSCAPE_QUERY);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let scroller;
    let dragged = false;
    let dragEndedAt = 0;
    const reveal = (immediate = false) => {
      if (!scroller) return;
      if (portrait.matches) {
        const tab = list.querySelectorAll('[role="tab"]')[activeRef.current];
        scroller.scrollTo(tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, { immediate });
      } else {
        const count = getChapterRailCapacity(innerHeight, itemCount, landscape.matches);
        const position = scroller.targetScroll / CHAPTER_RAIL_SCROLL_STEP;
        const target = Math.max(activeRef.current - count + 1, Math.min(activeRef.current, position));
        scroller.scrollTo(target * CHAPTER_RAIL_SCROLL_STEP, { immediate });
      }
    };
    const resize = () => {
      scroller?.destroy();
      const count = getChapterRailCapacity(innerHeight, itemCount, landscape.matches);
      list.style.setProperty('--chapter-scroll-range', `${landscape.matches ? (itemCount - count) * CHAPTER_RAIL_SCROLL_STEP : 0}px`);
      list.scrollLeft = 0;
      scroller = new Lenis({
        wrapper: list, content: list, orientation: 'horizontal', gestureOrientation: 'both',
        smoothWheel: !reduced.matches, syncTouch: landscape.matches, lerp: .28,
        syncTouchLerp: .16, touchInertiaExponent: 1.3, overscroll: false, autoRaf: true,
        virtualScroll: ({ event, deltaX, deltaY }) => {
          if (event.type === 'touchstart') dragged = false;
          if (event.type === 'touchmove' && Math.hypot(deltaX, deltaY) > 3) dragged = true;
          if (event.type === 'touchend') dragEndedAt = performance.now();
          if (reduced.matches && event.type === 'wheel') {
            event.preventDefault();
            scroller.scrollTo(scroller.targetScroll + (Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY), { immediate: true });
            return false;
          }
          return portrait.matches || landscape.matches;
        },
      });
      controllerRef.current = { scroller, reveal, reduced };
      reveal(true);
    };
    const click = event => {
      if (dragged && performance.now() - dragEndedAt < 300) { event.preventDefault(); event.stopPropagation(); dragged = false; }
    };
    const observe = new ResizeObserver(resize);
    observe.observe(list);
    list.addEventListener('click', click, true);
    window.addEventListener('resize', resize);
    reduced.addEventListener('change', resize);
    resize();
    return () => {
      scroller?.destroy(); controllerRef.current = null;
      observe.disconnect(); list.removeEventListener('click', click, true);
      window.removeEventListener('resize', resize); reduced.removeEventListener('change', resize);
    };
  }, [itemCount, listRef]);

  useLayoutEffect(() => { controllerRef.current?.reveal(controllerRef.current.reduced.matches); }, [activeIndex]);
  return useCallback(direction => {
    const controller = controllerRef.current;
    if (!controller) return;
    const distance = matchMedia(NAV_COMPACT_QUERY).matches ? Math.max(160, listRef.current.clientWidth * .7) : CHAPTER_RAIL_SCROLL_STEP;
    controller.scroller.scrollTo(controller.scroller.targetScroll + direction * distance, { immediate: controller.reduced.matches });
  }, [listRef]);
}
