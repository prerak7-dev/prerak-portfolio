import { useCallback, useEffect, useRef, useState } from 'react';

export const CASE_STUDY_TIMING = Object.freeze({
  sectionHeadingDelay: 120,
  tabsDelay: 1150,
  tabStagger: 180,
  initialProjectDelay: 2450,
  identityDelay: 0,
  proofDelay: 1900,
  proofStagger: 170,
  topologyHeadingDelay: 3450,
  topologySlabsDelay: 4200,
  stackDelay: 5300,
  stackStagger: 180,
  projectEnterDuration: 6500,
  projectExitDuration: 2300,
  identityExitDelay: 780,
  proofExitDelay: 650,
  proofExitStagger: 130,
  topologyHeadingExitDelay: 500,
  topologySlabsExitDelay: 300,
  stackExitDelay: 0,
  stackExitStagger: 120,
});

const INITIAL_SEQUENCE = Object.freeze({
  selectedIndex: 0,
  displayedIndex: 0,
  phase: 'idle',
  entryDelay: CASE_STUDY_TIMING.initialProjectDelay,
  cycle: 0,
});

function motionDuration(duration) {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : duration;
}

export function useCaseStudySequence(active, itemCount) {
  const [sequence, setSequence] = useState(INITIAL_SEQUENCE);
  const sequenceRef = useRef(INITIAL_SEQUENCE);
  const activeRef = useRef(active);
  const pendingIndexRef = useRef(0);
  const timersRef = useRef(new Set());

  const updateSequence = useCallback((updater) => {
    setSequence((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      sequenceRef.current = next;
      return next;
    });
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  const schedule = useCallback((callback, delay) => {
    const timer = window.setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, motionDuration(delay));
    timersRef.current.add(timer);
  }, []);

  const scheduleVisible = useCallback((entryDelay) => {
    schedule(() => {
      if (!activeRef.current) return;
      updateSequence((current) => (
        current.phase === 'entering' ? { ...current, phase: 'visible' } : current
      ));
    }, entryDelay + CASE_STUDY_TIMING.projectEnterDuration);
  }, [schedule, updateSequence]);

  useEffect(() => {
    activeRef.current = active;
    clearTimers();

    if (!active) {
      updateSequence((current) => ({ ...current, phase: 'idle' }));
      return clearTimers;
    }

    const targetIndex = pendingIndexRef.current;
    updateSequence((current) => ({
      ...current,
      selectedIndex: targetIndex,
      displayedIndex: targetIndex,
      phase: 'entering',
      entryDelay: CASE_STUDY_TIMING.initialProjectDelay,
      cycle: current.cycle + 1,
    }));
    scheduleVisible(CASE_STUDY_TIMING.initialProjectDelay);
    return clearTimers;
  }, [active, clearTimers, scheduleVisible, updateSequence]);

  const selectProject = useCallback((index) => {
    const safeIndex = Math.min(Math.max(0, index), Math.max(0, itemCount - 1));
    const current = sequenceRef.current;

    if (current.phase === 'exiting') {
      pendingIndexRef.current = safeIndex;
      updateSequence({ ...current, selectedIndex: safeIndex });
      return;
    }
    if (safeIndex === current.displayedIndex && current.phase !== 'exiting') {
      pendingIndexRef.current = safeIndex;
      updateSequence({ ...current, selectedIndex: safeIndex });
      return;
    }

    pendingIndexRef.current = safeIndex;
    clearTimers();

    if (!activeRef.current) {
      updateSequence({
        ...current,
        selectedIndex: safeIndex,
        displayedIndex: safeIndex,
        phase: 'idle',
      });
      return;
    }

    updateSequence({ ...current, selectedIndex: safeIndex, phase: 'exiting' });
    schedule(() => {
      if (!activeRef.current) return;
      const targetIndex = pendingIndexRef.current;
      updateSequence((latest) => ({
        ...latest,
        selectedIndex: targetIndex,
        displayedIndex: targetIndex,
        phase: 'entering',
        entryDelay: 0,
        cycle: latest.cycle + 1,
      }));
      scheduleVisible(0);
    }, CASE_STUDY_TIMING.projectExitDuration);
  }, [clearTimers, itemCount, schedule, scheduleVisible, updateSequence]);

  return { ...sequence, selectProject };
}
