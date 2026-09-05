import { flushSync } from 'react-dom';

const TRANSITION_CLASS = 'theme-watercolor-transition';
let activeTransition = null;

function supportsWatercolorTransition() {
  return typeof document !== 'undefined'
    && typeof document.startViewTransition === 'function'
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function startWatercolorViewTransition(update) {
  if (!supportsWatercolorTransition()) {
    update();
    return null;
  }

  const previousTransition = activeTransition;
  activeTransition = null;
  previousTransition?.skipTransition?.();
  document.documentElement.classList.add(TRANSITION_CLASS);

  let transition;
  try {
    transition = document.startViewTransition(() => {
      flushSync(update);
    });
  } catch (error) {
    document.documentElement.classList.remove(TRANSITION_CLASS);
    update();
    return null;
  }

  activeTransition = transition;
  const clearTransition = () => {
    if (activeTransition !== transition) return;
    activeTransition = null;
    document.documentElement.classList.remove(TRANSITION_CLASS);
  };
  transition.finished.then(clearTransition, clearTransition);
  return transition;
}
