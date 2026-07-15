const motionState = {
  progress: 0,
  scenePosition: 0,
  activeIndex: 0,
  direction: 1,
};

const listeners = new Set();

export function getSpatialMotion() {
  return motionState;
}

export function publishSpatialMotion(next) {
  motionState.progress = next.progress;
  motionState.scenePosition = next.scenePosition;
  motionState.activeIndex = next.activeIndex;
  motionState.direction = next.direction;

  listeners.forEach((listener) => listener(motionState));
}

export function subscribeSpatialMotion(listener) {
  listeners.add(listener);
  listener(motionState);
  return () => listeners.delete(listener);
}
