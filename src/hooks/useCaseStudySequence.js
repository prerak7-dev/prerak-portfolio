import { useCallback, useState } from 'react';
import { changeTextContent } from '../utils/changeTextContent.js';

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

export function useCaseStudySequence(active, itemCount) {
  const [sequence, setSequence] = useState({ selectedIndex: 0, displayedIndex: 0, cycle: 0 });
  const selectProject = useCallback(index => {
    const safeIndex = Math.min(Math.max(0, index), Math.max(0, itemCount - 1));
    changeTextContent(() => setSequence(current => ({
      selectedIndex: safeIndex, displayedIndex: safeIndex, cycle: current.cycle + 1,
    })), '.contour-projects');
  }, [itemCount]);
  return { ...sequence, phase: active ? 'visible' : 'idle', entryDelay: 0, selectProject };
}
