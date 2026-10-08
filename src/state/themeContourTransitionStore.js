import {
  shapeCenterDwellProgress,
  THEME_CONTOUR_CENTER_DWELL,
  THEME_CONTOUR_TRANSITION_DURATION_MS,
} from '../utils/cinematicTiming.js';

// Apply the live theme while the dissolve is still in progress, not only at
// the very end. Commit earlier so homepage CSS surface backgrounds are swapped
// before the contour dissolve finishes and avoid a late snap on the intro chapter.
const THEME_APPLY_PROGRESS = 0.22;
const MAX_TRANSITION_FRAME_MS = 40;

const transitionState = {
  active: false,
  token: 0,
  fromTheme: 'default',
  toTheme: 'default',
  sceneIndex: 0,
  targetSceneIndex: 0,
  targetChapterIndex: null,
  kind: 'theme',
  gatewayFrameIndex: 0,
  progress: 0,
  initialProgress: 0,
  linearProgress: 0,
  startedAt: 0,
  duration: THEME_CONTOUR_TRANSITION_DURATION_MS,
  fromImage: null,
  toImage: null,
  geometryImage: null,
};

const listeners = new Set();
let animationFrame = 0;
let activeCompletion = null;

function publish() {
  listeners.forEach((listener) => listener(transitionState));
}

function finishTransition(token) {
  if (transitionState.token !== token) return;
  transitionState.active = false;
  transitionState.progress = 1;
  transitionState.linearProgress = 1;
  transitionState.fromImage = null;
  transitionState.toImage = null;
  transitionState.geometryImage = null;
  animationFrame = 0;
  publish();
  const completion = activeCompletion;
  activeCompletion = null;
  completion?.();
}

export function getThemeContourTransition() {
  return transitionState;
}

export function subscribeThemeContourTransition(listener) {
  listeners.add(listener);
  listener(transitionState);
  return () => listeners.delete(listener);
}

export function startThemeContourTransition({
  fromTheme,
  toTheme,
  sceneIndex,
  targetSceneIndex = sceneIndex,
  targetChapterIndex = null,
  kind = 'theme',
  applyProgress = THEME_APPLY_PROGRESS,
  gatewayFrameIndex = 0,
  fromImage,
  toImage,
  geometryImage,
  applyTheme,
  onComplete,
  isReadyToReveal,
  duration = THEME_CONTOUR_TRANSITION_DURATION_MS,
  initialProgress = 0,
}) {
  if (animationFrame) window.cancelAnimationFrame(animationFrame);
  activeCompletion = null;

  const token = transitionState.token + 1;
  const startProgress = Math.min(1, Math.max(0, Number.isFinite(initialProgress) ? initialProgress : 0));
  const remainingDuration = Math.max(1, duration * (1 - startProgress));
  Object.assign(transitionState, {
    active: true,
    token,
    fromTheme,
    toTheme,
    sceneIndex,
    targetSceneIndex,
    targetChapterIndex,
    kind,
    gatewayFrameIndex,
    progress: startProgress,
    initialProgress: startProgress,
    linearProgress: 0,
    startedAt: 0,
    duration: remainingDuration,
    fromImage,
    toImage,
    geometryImage,
  });
  activeCompletion = onComplete;
  publish();

  let startTime = 0;
  let previousTime = 0;
  let elapsedTime = 0;
  let themeApplied = false;

  const settleThemeCommit = () => {
    if (themeApplied || transitionState.token !== token) return;
    themeApplied = true;

    Promise.resolve(applyTheme?.()).catch(() => {
      // The decoded canvas remains the visual fallback while the DOM settles.
    });
  };

  const animate = (timestamp) => {
    if (transitionState.token !== token) return;
    if (!startTime) startTime = timestamp;
    if (previousTime) elapsedTime += Math.min(MAX_TRANSITION_FRAME_MS, Math.max(0, timestamp - previousTime));
    previousTime = timestamp;
    transitionState.startedAt = startTime;
    const rawProgress = Math.min(1, elapsedTime / remainingDuration);
    const previousProgress = transitionState.linearProgress;
    transitionState.linearProgress = rawProgress;
    if (!themeApplied && rawProgress >= applyProgress) {
      settleThemeCommit();
    }
    transitionState.progress = startProgress + (1 - startProgress) * shapeCenterDwellProgress(
      rawProgress,
      THEME_CONTOUR_CENTER_DWELL,
    );
    if (previousProgress < 1) publish();
    // Keep the final snapshot covering a delayed DOM painting. Never release
    // the contour canvas merely because its animation clock has expired.
    if (rawProgress >= 1 && (!isReadyToReveal || isReadyToReveal())) {
      finishTransition(token);
      return;
    }
    animationFrame = window.requestAnimationFrame(animate);
  };

  animationFrame = window.requestAnimationFrame(animate);
  return token;
}
