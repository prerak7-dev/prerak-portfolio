function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function cinematicSmootherStep(value) {
  const progress = clamp(value);
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

function revealBetween(scenePosition, start, duration) {
  const progress = clamp((scenePosition - start) / duration);
  return progress - (0.14 * Math.sin(Math.PI * 2 * progress)) / (Math.PI * 2);
}

// The names finish dropping behind the roofline at 0.28. Hold the closed gate
// for a beat before opening so the two actions read as one deliberate sequence.
const GATEWAY_OPEN_START = 0.31;
const GATEWAY_OPEN_END = 0.84;

export function getCinematicSceneReveals(scenePosition) {
  const position = Number.isFinite(scenePosition) ? scenePosition : 0;
  return Object.freeze({
    gatewayProgress: revealBetween(
      position,
      GATEWAY_OPEN_START,
      GATEWAY_OPEN_END - GATEWAY_OPEN_START,
    ),
    coresMix: revealBetween(position, 0.56, 0.44),
    systemsMix: revealBetween(position, 1, 1),
    chronologyMix: revealBetween(position, 2, 1),
    fieldMix: revealBetween(position, 4, 1),
    surfaceMix: revealBetween(position, 5, 1),
  });
}

export function getCinematicAtmosphereTransition(scenePosition) {
  const position = clamp(Number.isFinite(scenePosition) ? scenePosition : 0, 0, 6);
  const reveals = getCinematicSceneReveals(position);

  if (position < 1) {
    return Object.freeze({ fromIndex: 0, toIndex: 1, mix: reveals.coresMix });
  }
  if (position < 2) {
    return Object.freeze({ fromIndex: 1, toIndex: 2, mix: reveals.systemsMix });
  }
  if (position < 3) {
    return Object.freeze({ fromIndex: 2, toIndex: 3, mix: reveals.chronologyMix });
  }
  if (position < 4) {
    return Object.freeze({ fromIndex: 3, toIndex: 3, mix: 0 });
  }
  if (position < 5) {
    return Object.freeze({ fromIndex: 3, toIndex: 4, mix: reveals.fieldMix });
  }
  if (position < 6) {
    return Object.freeze({ fromIndex: 4, toIndex: 5, mix: reveals.surfaceMix });
  }
  return Object.freeze({ fromIndex: 5, toIndex: 5, mix: 0 });
}
