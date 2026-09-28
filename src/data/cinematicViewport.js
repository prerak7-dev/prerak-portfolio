export const PORTRAIT_ARTWORK_QUERY = '(max-width: 1100px) and (orientation: portrait)';
let portraitMedia;

function media() {
  if (typeof window === 'undefined' || !window.matchMedia) return null;
  portraitMedia ??= window.matchMedia(PORTRAIT_ARTWORK_QUERY);
  return portraitMedia;
}

export function usesPortraitArtwork() {
  return media()?.matches ?? false;
}

export function subscribeArtworkOrientation(listener) {
  const query = media();
  query?.addEventListener('change', listener);
  return () => query?.removeEventListener('change', listener);
}

export function getSceneAspectRatio(portrait = usesPortraitArtwork()) {
  return portrait ? 1 / 2 : 16 / 9;
}

export function getSceneCoverProjection(width, height, aspect = getSceneAspectRatio()) {
  const stageWidth = Math.max(width, height * aspect);
  const stageHeight = stageWidth / aspect;
  return { left: (width - stageWidth) / 2, top: (height - stageHeight) / 2,
    width: stageWidth, height: stageHeight, viewportWidth: width };
}
