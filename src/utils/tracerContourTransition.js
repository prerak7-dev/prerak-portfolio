import { claimTextMask, releaseTextMask } from './textMaskOwnership.js';

const transitions = new WeakMap();
const TRACERS = 'canvas.cinematic-atmosphere-field, canvas.boundary-filament-field, canvas.lore-avatar-contour-field, canvas.scene-prop-tracer-field';
const HIDDEN_MASK = 'linear-gradient(transparent, transparent)';

// Keep the outgoing pixels before React commits a new palette or scene. The
// text renderer owns both masks and their clock; tracers need no extra shader.
export function beginTracerContourTransition(root, owner, phase) {
  let transition = transitions.get(root);
  if (!transition) {
    transition = { owner, phase, maskOwner: Symbol('tracer-contours'), layers: [] };
    for (const canvas of root.querySelectorAll(TRACERS)) {
      if (canvas.dataset.tracerOutgoing || !canvas.width || !canvas.height) continue;
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) continue;
      const ghost = canvas.cloneNode(false);
      ghost.removeAttribute('id');
      ghost.dataset.tracerOutgoing = 'true';
      ghost.style.pointerEvents = 'none';
      const context = ghost.getContext('2d');
      if (!context) continue;
      context.drawImage(canvas, 0, 0);
      canvas.before(ghost);
      transition.layers.push({ canvas, ghost });
    }
    transitions.set(root, transition);
  }
  transition.owner = owner;
  transition.phase = phase;
  for (const { canvas, ghost } of transition.layers) {
    canvas.dataset.tracerDissolve = phase;
    claimTextMask(canvas, transition.maskOwner, HIDDEN_MASK);
    ghost.style.visibility = phase === 'incoming' ? 'hidden' : 'visible';
  }
}

export function maskTracerContourTransition(root, owner, renderer) {
  const transition = transitions.get(root);
  if (!transition || transition.owner !== owner) return;
  for (const { canvas, ghost } of transition.layers) {
    if (!canvas.isConnected) continue;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const sx = rect.width / (canvas.offsetWidth || rect.width);
    const sy = rect.height / (canvas.offsetHeight || rect.height);
    if (transition.phase === 'incoming' || transition.phase === 'crossfade') {
      claimTextMask(canvas, transition.maskOwner, renderer.mask(rect, 'incoming', sx, sy));
    }
    if (transition.phase === 'outgoing' || transition.phase === 'crossfade') {
      claimTextMask(ghost, transition.maskOwner, renderer.mask(rect, 'outgoing', sx, sy));
    }
  }
}

export function finishTracerContourTransition(root, owner) {
  const transition = transitions.get(root);
  // Finishing an earlier theme must not uncover a chapter that is still entering.
  if (!transition || transition.owner !== owner) return;
  for (const { canvas, ghost } of transition.layers) {
    releaseTextMask(canvas, transition.maskOwner);
    releaseTextMask(ghost, transition.maskOwner);
    delete canvas.dataset.tracerDissolve;
    ghost.remove();
  }
  transitions.delete(root);
}
