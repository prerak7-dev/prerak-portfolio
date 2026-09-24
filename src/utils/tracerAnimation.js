// Keep animation cadence independent of drawing quality. Reduced motion renders
// only when invalidated; hidden tabs resume without advancing the simulation.
export function createTracerAnimation(draw, host = window) {
  const reduced = host.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let previous = null;
  let time = 0;
  let disposed = false;

  const invalidate = () => {
    if (!disposed && !host.document.hidden && !frame) frame = host.requestAnimationFrame(tick);
  };
  const tick = timestamp => {
    frame = 0;
    if (disposed || host.document.hidden) return;
    const delta = previous === null || reduced.matches ? 0 : Math.min(.05, Math.max(0, (timestamp - previous) / 1000));
    previous = timestamp;
    time += delta;
    draw({ timestamp, time, delta, reducedMotion: reduced.matches });
    if (!reduced.matches) invalidate();
  };
  const reset = () => {
    host.cancelAnimationFrame(frame);
    frame = 0;
    previous = null;
    invalidate();
  };
  host.document.addEventListener('visibilitychange', reset);
  reduced.addEventListener('change', reset);
  invalidate();
  return {
    invalidate,
    dispose() {
      disposed = true;
      host.cancelAnimationFrame(frame);
      host.document.removeEventListener('visibilitychange', reset);
      reduced.removeEventListener('change', reset);
    },
  };
}
