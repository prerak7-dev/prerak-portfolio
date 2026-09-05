import Lenis from 'lenis';

const NESTED_SCROLL_SELECTOR = [
  '[data-lenis-prevent]',
  '[data-lenis-prevent-wheel]',
  '[role="dialog"]',
].join(',');

export const CINEMATIC_SCROLL_OPTIONS = Object.freeze({
  autoRaf: false,
  autoResize: true,
  smoothWheel: true,
  syncTouch: false,
  overscroll: false,
  stopInertiaOnNavigate: true,
  lerp: 0.28,
  wheelMultiplier: 1,
  touchMultiplier: 1,
});

export function cinematicScrollEase(value) {
  const progress = Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
  return progress - (0.18 * Math.sin(Math.PI * 2 * progress)) / (Math.PI * 2);
}

export function createCinematicScroller() {
  return new Lenis({
    ...CINEMATIC_SCROLL_OPTIONS,
    prevent: (node) => Boolean(node?.closest?.(NESTED_SCROLL_SELECTOR)),
  });
}
