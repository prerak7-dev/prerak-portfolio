export function isPaintingReady(image, source = image?.dataset?.src, base = globalThis.document?.baseURI) {
  if (!image?.complete || !image.naturalWidth || !source) return false;
  const displayed = image.currentSrc || image.src;
  if (!displayed) return false;
  try {
    return new URL(displayed, base).href === new URL(source, base).href;
  } catch {
    return false;
  }
}
