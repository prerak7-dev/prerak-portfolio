const gatewayTransitionState = {
  progress: 0,
  handoff: 0,
  direction: 1,
};

const listeners = new Set();

function clamp(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

export function getGatewayTransition() {
  return gatewayTransitionState;
}

export function publishGatewayTransition(next) {
  const progress = clamp(next.progress);
  const handoff = clamp(next.handoff);
  const direction = next.direction < 0 ? -1 : 1;
  if (
    Math.abs(progress - gatewayTransitionState.progress) < 0.00001
    && Math.abs(handoff - gatewayTransitionState.handoff) < 0.00001
    && direction === gatewayTransitionState.direction
  ) return;

  gatewayTransitionState.progress = progress;
  gatewayTransitionState.handoff = handoff;
  gatewayTransitionState.direction = direction;
  listeners.forEach((listener) => listener(gatewayTransitionState));
}

export function subscribeGatewayTransition(listener) {
  listeners.add(listener);
  listener(gatewayTransitionState);
  return () => listeners.delete(listener);
}
