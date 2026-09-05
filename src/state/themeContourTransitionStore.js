import {
  shapeCenterDwellProgress,
  THEME_CONTOUR_CENTER_DWELL,
  THEME_CONTOUR_TRANSITION_DURATION_MS,
} from '../utils/cinematicTiming.js';

// Apply the live theme while the dissolve is still in progress, not only at
// the very end. Commit earlier so homepage CSS surface backgrounds are swapped
// before the contour dissolve finishes and avoid a late snap on the intro chapter.
const THEME_APPLY_PROGRESS = 0.22;
const THEME_COMMIT_FRAMES = 1;

const transitionState = {
  active: false,
  token: 0,
  fromTheme: 'default',
  toTheme: 'default',
  sceneIndex: 0,
  gatewayFrameIndex: 0,
  progress: 0,
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
  gatewayFrameIndex = 0,
  fromImage,
  toImage,
  geometryImage,
  applyTheme,
  onComplete,
  duration = THEME_CONTOUR_TRANSITION_DURATION_MS,
}) {
  if (animationFrame) window.cancelAnimationFrame(animationFrame);
  activeCompletion = null;

  const token = transitionState.token + 1;
  Object.assign(transitionState, {
    active: true,
    token,
    fromTheme,
    toTheme,
    sceneIndex,
    gatewayFrameIndex,
    progress: 0,
    fromImage,
    toImage,
    geometryImage,
  });
  activeCompletion = onComplete;
  publish();

  let startTime = 0;
  let themeApplied = false;
  let themeCommitSettled = false;
  let completionTimer = 0;

  const settleThemeCommit = () => {
    if (themeApplied || transitionState.token !== token) return;
    themeApplied = true;

    const commitPromise = applyTheme ? applyTheme() : Promise.resolve();
    const fallbackPromise = new Promise((resolve) => {
      window.setTimeout(resolve, 120);
    });

    Promise.race([commitPromise, fallbackPromise]).catch(() => {
      // Keep the visual passage usable even when an optional handoff callback
      // declines to resolve.
    }).finally(() => {
      if (transitionState.token !== token) return;
      themeCommitSettled = true;
      if (completionTimer) window.clearTimeout(completionTimer);
      completionTimer = window.setTimeout(() => {
        if (transitionState.token !== token) return;
        finishTransition(token);
      }, duration + 80);
    });
  };

  const animate = (timestamp) => {
    if (transitionState.token !== token) return;
    if (!startTime) startTime = timestamp;
    const rawProgress = Math.min(1, Math.max(0, (timestamp - startTime) / duration));
    if (!themeApplied && rawProgress >= THEME_APPLY_PROGRESS) {
      settleThemeCommit();
    }
    transitionState.progress = shapeCenterDwellProgress(
      rawProgress,
      THEME_CONTOUR_CENTER_DWELL,
    );
    publish();
    // Only finish when the transition has naturally reached the end. The
    // commit settling schedules a completion timer; finishing immediately
    // when the theme commit settles causes the visual dissolve to snap.
    if (rawProgress >= 1) {
      if (completionTimer) window.clearTimeout(completionTimer);
      finishTransition(token);
      return;
    }
    animationFrame = window.requestAnimationFrame(animate);
  };

  animationFrame = window.requestAnimationFrame(animate);
  return token;
}
