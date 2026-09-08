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

// Let the names clear the roofline before the static Home painting dissolves.

export function getCinematicSceneReveals(scenePosition) {
  const position = Number.isFinite(scenePosition) ? scenePosition : 0;
  return Object.freeze({
    gatewayProgress: 0,
    coresMix: revealBetween(position, 0.28, 0.72),
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
