const listeners = new Set();
let returnToRest = null;
const state = { theme: 'default', portrait: false, turn: null, startedAt: 0, angle: 0, dissolving: false };

export function getGateSealPose(now = performance.now()) {
  const elapsed = Math.max(0, now - state.startedAt);
  const pose = state.turn?.sample(elapsed) || { angle: state.angle, velocity: 0 };
  return { ...pose, theme: state.theme, portrait: state.portrait, dissolving: state.dissolving, moving: Boolean(state.turn && elapsed < state.turn.duration) };
}

export function driveGateSeal(turn, theme, portrait, startedAt = performance.now(), dissolving = false) {
  Object.assign(state, { turn, theme, portrait, startedAt, dissolving });
  listeners.forEach(listener => listener());
}

export function settleGateSeal(angle, theme, portrait, dissolving = false) {
  Object.assign(state, { angle, theme, portrait, turn: null, dissolving });
  listeners.forEach(listener => listener());
}

export function subscribeGateSealTurn(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function registerGateSealReturn(handler) {
  returnToRest = handler;
  return () => { if (returnToRest === handler) returnToRest = null; };
}

export function returnGateSealToRest() {
  return returnToRest?.() || Promise.resolve();
}
