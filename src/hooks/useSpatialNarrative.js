import { useCallback, useEffect, useRef, useState } from 'react';
import { publishSpatialMotion } from '../state/spatialMotionStore.js';
import { clamp } from '../utils/weather.js';

const CHAPTER_HOLD_FRACTION = 0.2;
const SCROLL_RESPONSE_MS = 215;
const SETTLE_EPSILON = 0.0001;
const INITIAL_MOTION = Object.freeze({ progress: 0, scenePosition: 0, activeIndex: 0, direction: 1 });

function smootherStep(value) {
  const t = clamp(value, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function shapeScenePosition(rawScenePosition, chapterCount) {
  const lastChapter = Math.max(0, chapterCount - 1);
  const clampedPosition = clamp(rawScenePosition, 0, lastChapter);
  if (clampedPosition >= lastChapter) return lastChapter;

  const chapter = Math.floor(clampedPosition);
  const localProgress = clampedPosition - chapter;
  if (localProgress <= CHAPTER_HOLD_FRACTION) return chapter;
  if (localProgress >= 1 - CHAPTER_HOLD_FRACTION) return chapter + 1;

  const travelProgress = (localProgress - CHAPTER_HOLD_FRACTION) / (1 - CHAPTER_HOLD_FRACTION * 2);
  return chapter + smootherStep(travelProgress);
}

function getNarrativeState(chapterCount, maxScroll) {
  const progress = clamp(window.scrollY / maxScroll, 0, 1);
  const rawScenePosition = progress * Math.max(0, chapterCount - 1);
  const scenePosition = shapeScenePosition(rawScenePosition, chapterCount);
  return {
    progress,
    scenePosition,
    activeIndex: Math.min(chapterCount - 1, Math.max(0, Math.round(scenePosition))),
  };
}

export function useSpatialNarrative(chapterCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastScrollY = useRef(0);
  const frameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const maxScrollRef = useRef(1);
  const stateRef = useRef(INITIAL_MOTION);
  const targetRef = useRef(INITIAL_MOTION);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderFrame = (timestamp) => {
      frameRef.current = 0;
      const current = stateRef.current;
      const target = targetRef.current;
      const elapsed = lastFrameTimeRef.current
        ? Math.min(64, Math.max(1, timestamp - lastFrameTimeRef.current))
        : 16.67;
      lastFrameTimeRef.current = timestamp;
      const response = reduceMotion ? 1 : 1 - Math.exp(-elapsed / SCROLL_RESPONSE_MS);
      const progressDelta = target.progress - current.progress;
      const sceneDelta = target.scenePosition - current.scenePosition;
      const settled = Math.abs(progressDelta) < SETTLE_EPSILON && Math.abs(sceneDelta) < SETTLE_EPSILON;
      const progress = settled ? target.progress : current.progress + progressDelta * response;
      const scenePosition = settled ? target.scenePosition : current.scenePosition + sceneDelta * response;
      const next = {
        progress,
        scenePosition,
        activeIndex: Math.min(chapterCount - 1, Math.max(0, Math.round(scenePosition))),
        direction: target.direction,
      };

      stateRef.current = next;
      publishSpatialMotion(next);

      if (next.activeIndex !== activeIndexRef.current) {
        activeIndexRef.current = next.activeIndex;
        setActiveIndex(next.activeIndex);
      }

      if (!settled) frameRef.current = window.requestAnimationFrame(renderFrame);
    };

    const readScrollTarget = () => {
      const next = getNarrativeState(chapterCount, maxScrollRef.current);
      const scrollY = window.scrollY;
      const previousScrollY = lastScrollY.current;
      const direction = scrollY > previousScrollY
        ? 1
        : scrollY < previousScrollY
          ? -1
          : targetRef.current.direction;
      lastScrollY.current = scrollY;
      targetRef.current = { ...next, direction };
      if (!frameRef.current) {
        lastFrameTimeRef.current = 0;
        frameRef.current = window.requestAnimationFrame(renderFrame);
      }
    };

    const updateScrollMetrics = () => {
      maxScrollRef.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      readScrollTarget();
    };

    lastScrollY.current = window.scrollY;
    updateScrollMetrics();
    window.addEventListener('scroll', readScrollTarget, { passive: true });
    window.addEventListener('resize', updateScrollMetrics);
    return () => {
      window.removeEventListener('scroll', readScrollTarget);
      window.removeEventListener('resize', updateScrollMetrics);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      lastFrameTimeRef.current = 0;
    };
  }, [chapterCount]);

  const goToChapter = useCallback((index, behavior = 'smooth') => {
    const safeIndex = clamp(index, 0, Math.max(0, chapterCount - 1));
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = chapterCount <= 1 ? 0 : safeIndex / (chapterCount - 1);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: ratio * maxScroll, behavior: reduceMotion ? 'auto' : behavior });
  }, [chapterCount]);

  return { activeIndex, goToChapter };
}
