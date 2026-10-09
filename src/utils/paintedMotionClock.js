import { gateSealDissolveProgress } from './gateSealMotion.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function paintedMotionSample(motion, transition, seal) {
  if (transition.active) {
    const direction = transition.kind === 'chapter'
      ? Math.sign((transition.targetSceneIndex ?? transition.sceneIndex) - transition.sceneIndex) : 0;
    return { key: `passage:${transition.token}`, position: direction * transition.progress };
  }
  if (motion.scenePosition < .00001 && seal?.dissolving && seal.angle > .00001) {
    return { key: 'seal', position: gateSealDissolveProgress(seal.angle) };
  }
  return { key: 'scroll', position: motion.scenePosition };
}

// Navigation changes the pace, not the pose. Integrate a damped, always-forward
// clock so ending or reversing a gesture cannot reset an angle or flip its sign.
export function createPaintedMotionClock() {
  let time = 0, speed = 1, previous;
  return {
    advance(delta, sample) {
      const dt = clamp(Number.isFinite(delta) ? delta : 0, 0, .05);
      const rate = previous?.key === sample.key && dt > 0
        ? clamp((sample.position - previous.position) / dt, -2, 2) : 0;
      previous = sample;
      const target = 1 + rate * .3;
      const response = .65;
      const decay = Math.exp(-dt / response);
      time += target * dt + (speed - target) * response * (1 - decay);
      speed = target + (speed - target) * decay;
      return { time, speed };
    },
  };
}
