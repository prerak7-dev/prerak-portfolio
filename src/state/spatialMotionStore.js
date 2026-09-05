const motionState = {
  progress: 0,
  scenePosition: 0,
  activeIndex: 0,
  direction: 1,
  velocity: 0,
  settled: true,
  timestamp: 0,
};

const listeners = new Set();

export function getSpatialMotion() {
  return motionState;
}

export function publishSpatialMotion(next) {
  const nextVelocity = next.velocity || 0;
  const nextSettled = Boolean(next.settled);
  const nextTimestamp = next.timestamp || motionState.timestamp;
  if (
    Math.abs(next.progress - motionState.progress) < 0.000002
    && Math.abs(next.scenePosition - motionState.scenePosition) < 0.000002
    && next.activeIndex === motionState.activeIndex
    && next.direction === motionState.direction
    && Math.abs(nextVelocity - motionState.velocity) < 0.0002
    && nextSettled === motionState.settled
  ) return;

  motionState.progress = next.progress;
  motionState.scenePosition = next.scenePosition;
  motionState.activeIndex = next.activeIndex;
  motionState.direction = next.direction;
  motionState.velocity = nextVelocity;
  motionState.settled = nextSettled;
  motionState.timestamp = nextTimestamp;

  listeners.forEach((listener) => listener(motionState));
}

export function subscribeSpatialMotion(listener) {
  listeners.add(listener);
  listener(motionState);
  return () => listeners.delete(listener);
}
