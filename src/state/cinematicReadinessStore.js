const cinematicReadinessState = {
  readyIndex: -1,
  settled: false,
};

const listeners = new Set();

export function getCinematicReadiness() {
  return cinematicReadinessState;
}

export function publishCinematicReadiness({ readyIndex, settled }) {
  const nextReadyIndex = Number.isInteger(readyIndex)
    ? readyIndex
    : cinematicReadinessState.readyIndex;
  const nextSettled = Boolean(settled);
  if (
    nextReadyIndex === cinematicReadinessState.readyIndex
    && nextSettled === cinematicReadinessState.settled
  ) return;

  cinematicReadinessState.readyIndex = nextReadyIndex;
  cinematicReadinessState.settled = nextSettled;
  listeners.forEach((listener) => listener(cinematicReadinessState));
}

export function subscribeCinematicReadiness(listener) {
  listeners.add(listener);
  listener(cinematicReadinessState);
  return () => listeners.delete(listener);
}
