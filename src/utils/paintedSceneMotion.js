const CHAPTER_PAINTINGS = [0, 1, 2, 3, 3, 4, 5];

export function limitPaintedScenePosition(requested, previous, available) {
  if (!available) return requested;
  if (requested > previous) {
    for (let chapter = Math.floor(previous) + 1; chapter <= Math.ceil(requested); chapter++) {
      if (!available[CHAPTER_PAINTINGS[chapter]]) return Math.max(previous, chapter - 1);
    }
  } else {
    for (let chapter = Math.ceil(previous) - 1; chapter >= Math.floor(requested); chapter--) {
      if (!available[CHAPTER_PAINTINGS[chapter]]) return Math.min(previous, chapter + 1);
    }
  }
  return requested;
}

// Only delayed loads need catch-up. Normal scrolling retains its exact existing
// timing, and explicit chapter/theme dissolves already own their image handoff.
export function createPaintedMotionGate(initialPosition) {
  let position = initialPosition, catchingUp = false;
  return {
    update(requested, available, elapsedMs, explicitTransition = false) {
      if (explicitTransition || !available) {
        catchingUp = false;
        return position = requested;
      }
      const target = limitPaintedScenePosition(requested, position, available);
      catchingUp ||= target !== requested;
      if (!catchingUp) return position = requested;
      const delta = Math.min(40, Math.max(0, elapsedMs));
      const distance = target - position;
      const step = Math.min(Math.abs(distance) * (1 - Math.exp(-delta / 160)), delta * .0032);
      position += Math.sign(distance) * step;
      if (Math.abs(target - position) < .00001) {
        position = target;
        catchingUp = target !== requested;
      }
      return position;
    },
  };
}
