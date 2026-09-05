const TAU = Math.PI * 2;

export const GATEWAY_DISSOLVE_START = 0.06;
export const GATEWAY_DISSOLVE_END = 0.94;

export function gatewayDissolveProgress(handoff) {
  return clampUnit((handoff - GATEWAY_DISSOLVE_START)
    / (GATEWAY_DISSOLVE_END - GATEWAY_DISSOLVE_START));
}

export function gatewayBackingProgress(handoff) {
  // Finish the live plate before the dissolve's final eight-percent release.
  const progress = clampUnit((gatewayDissolveProgress(handoff) - 0.72) / 0.2);
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

export const THEME_CONTOUR_TRANSITION_DURATION_MS = 3000;
export const THEME_CONTOUR_CENTER_DWELL = 0.45;
export const BOOT_CONTOUR_TRANSITION_DURATION_MS = 2600;

// Lowers velocity near each chapter without introducing a dead scroll zone.
// The scene still responds to every input delta, then travels decisively through
// the middle of a transition.
export const SCROLL_CHAPTER_DWELL_STRENGTH = 0.18;

export const CHAPTER_NAVIGATION_BASE_DURATION_MS = 2600;
export const CHAPTER_NAVIGATION_DURATION_PER_CHAPTER_MS = 2500;
export const CHAPTER_NAVIGATION_MAX_DURATION_MS = 9000;
export const CHAPTER_NAVIGATION_CENTER_DWELL = 0.82;

function clampUnit(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

export function shapeCenterDwellProgress(value, strength) {
  const progress = clampUnit(value);
  const safeStrength = Math.min(0.98, Math.max(0, Number.isFinite(strength) ? strength : 0));
  return progress + (safeStrength * Math.sin(TAU * progress)) / TAU;
}

export function shapeBoundaryDwellProgress(value, strength) {
  const progress = clampUnit(value);
  const safeStrength = Math.min(0.92, Math.max(0, Number.isFinite(strength) ? strength : 0));
  return progress - (safeStrength * Math.sin(TAU * progress)) / TAU;
}

export function shapeChapterNavigationProgress(value, chapterDistance) {
  const progress = clampUnit(value);
  if (progress === 0 || progress === 1) return progress;

  const segmentCount = Math.max(
    1,
    Math.round(Number.isFinite(chapterDistance) ? chapterDistance : 1),
  );
  const segmentPosition = progress * segmentCount;
  const segmentIndex = Math.min(segmentCount - 1, Math.floor(segmentPosition));
  const segmentProgress = segmentPosition - segmentIndex;
  return (
    segmentIndex
    + shapeCenterDwellProgress(segmentProgress, CHAPTER_NAVIGATION_CENTER_DWELL)
  ) / segmentCount;
}
