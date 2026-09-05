import { useCallback, useEffect, useRef, useState } from 'react';
import { publishSpatialMotion } from '../state/spatialMotionStore.js';
import {
  CHAPTER_NAVIGATION_BASE_DURATION_MS,
  CHAPTER_NAVIGATION_DURATION_PER_CHAPTER_MS,
  CHAPTER_NAVIGATION_MAX_DURATION_MS,
  SCROLL_CHAPTER_DWELL_STRENGTH,
  shapeBoundaryDwellProgress,
} from '../utils/cinematicTiming.js';
import {
  cinematicScrollEase,
  createCinematicScroller,
} from '../utils/cinematicScroll.js';
import { clamp } from '../utils/weather.js';

const MOTION_EPSILON = 0.000015;
const VELOCITY_EPSILON = 0.002;
const MAX_FRAME_DELTA_MS = 40;

function shapeScenePosition(rawScenePosition, chapterCount) {
  const lastChapter = Math.max(0, chapterCount - 1);
  const clampedPosition = clamp(rawScenePosition, 0, lastChapter);
  if (clampedPosition >= lastChapter) return lastChapter;

  const chapter = Math.floor(clampedPosition);
  const localProgress = clampedPosition - chapter;
  return chapter + shapeBoundaryDwellProgress(
    localProgress,
    SCROLL_CHAPTER_DWELL_STRENGTH,
  );
}

function getMaxScroll() {
  return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

function getNarrativeState(chapterCount, maxScroll, scrollY) {
  const progress = clamp(scrollY / maxScroll, 0, 1);
  const rawScenePosition = progress * Math.max(0, chapterCount - 1);
  const scenePosition = shapeScenePosition(rawScenePosition, chapterCount);
  return {
    progress,
    scenePosition,
    activeIndex: Math.min(chapterCount - 1, Math.max(0, Math.round(scenePosition))),
  };
}

export function useSpatialNarrative(chapterCount) {
  const initialState = getNarrativeState(chapterCount, getMaxScroll(), window.scrollY);
  const [activeIndex, setActiveIndex] = useState(initialState.activeIndex);
  const activeIndexRef = useRef(initialState.activeIndex);
  const scrollerRef = useRef(null);
  const maxScrollRef = useRef(1);
  const frameRef = useRef(0);
  const previousFrameRef = useRef({
    timestamp: 0,
    scrollY: window.scrollY,
    scenePosition: initialState.scenePosition,
    direction: 1,
  });

  useEffect(() => {
    let disposed = false;
    const scroller = createCinematicScroller();
    scrollerRef.current = scroller;

    const updateMetrics = () => {
      maxScrollRef.current = getMaxScroll();
      scroller.resize();
    };

    const publishFrame = (timestamp) => {
      if (disposed) return;
      scroller.raf(timestamp);

      const previous = previousFrameRef.current;
      const elapsed = previous.timestamp
        ? Math.min(MAX_FRAME_DELTA_MS, Math.max(1, timestamp - previous.timestamp))
        : 1000 / 60;
      const scrollY = Number.isFinite(scroller.animatedScroll)
        ? scroller.animatedScroll
        : window.scrollY;
      const next = getNarrativeState(chapterCount, maxScrollRef.current, scrollY);
      const scrollDelta = scrollY - previous.scrollY;
      const direction = Math.abs(scrollDelta) > 0.01
        ? (scrollDelta > 0 ? 1 : -1)
        : previous.direction;
      const velocity = (next.scenePosition - previous.scenePosition)
        / Math.max(0.001, elapsed / 1000);
      const atBoundary = Math.abs(next.scenePosition - Math.round(next.scenePosition))
        < MOTION_EPSILON;
      const settled = atBoundary
        && Math.abs(velocity) < VELOCITY_EPSILON
        && !scroller.isScrolling;

      previousFrameRef.current = {
        timestamp,
        scrollY,
        scenePosition: next.scenePosition,
        direction,
      };
      publishSpatialMotion({
        ...next,
        direction,
        velocity: settled ? 0 : velocity,
        settled,
        timestamp,
      });

      if (next.activeIndex !== activeIndexRef.current) {
        activeIndexRef.current = next.activeIndex;
        setActiveIndex(next.activeIndex);
      }
      frameRef.current = window.requestAnimationFrame(publishFrame);
    };

    const scrollTrack = document.querySelector('.archive-scroll-track');
    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(updateMetrics);
    if (scrollTrack) resizeObserver?.observe(scrollTrack);

    updateMetrics();
    scroller.scrollTo(window.scrollY, { immediate: true, force: true });
    frameRef.current = window.requestAnimationFrame(publishFrame);
    window.addEventListener('resize', updateMetrics, { passive: true });
    window.visualViewport?.addEventListener('resize', updateMetrics);
    document.fonts?.ready.then(() => {
      if (!disposed) updateMetrics();
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateMetrics);
      window.visualViewport?.removeEventListener('resize', updateMetrics);
      scroller.destroy();
      if (scrollerRef.current === scroller) scrollerRef.current = null;
    };
  }, [chapterCount]);

  const goToChapter = useCallback((index, behavior = 'smooth') => {
    const safeIndex = clamp(index, 0, Math.max(0, chapterCount - 1));
    const maxScroll = getMaxScroll();
    const ratio = chapterCount <= 1 ? 0 : safeIndex / (chapterCount - 1);
    const targetY = ratio * maxScroll;
    const scroller = scrollerRef.current;
    if (!scroller) {
      window.scrollTo({ top: targetY, behavior: behavior === 'auto' ? 'auto' : 'smooth' });
      return;
    }

    const chapterSpan = maxScroll / Math.max(1, chapterCount - 1);
    const chapterDistance = Math.abs(targetY - scroller.animatedScroll)
      / Math.max(1, chapterSpan);
    const duration = Math.min(
      CHAPTER_NAVIGATION_MAX_DURATION_MS,
      CHAPTER_NAVIGATION_BASE_DURATION_MS
        + chapterDistance * CHAPTER_NAVIGATION_DURATION_PER_CHAPTER_MS,
    );
    scroller.scrollTo(targetY, {
      immediate: behavior === 'auto',
      duration: duration / 750,
      easing: cinematicScrollEase,
      force: true,
      lock: false,
      userData: { source: 'chapter-navigation', chapter: safeIndex },
    });
  }, [chapterCount]);

  return { activeIndex, goToChapter };
}
