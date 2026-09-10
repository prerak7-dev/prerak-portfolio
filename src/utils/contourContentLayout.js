const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Source-image landmarks: gate edge, three-sun horizon, and the planet limb.
// Project these through the same cover transform as the painted background.
export function getContourContentBounds(chapter, projection, width, height) {
  const compact = width <= 760;
  const margin = compact ? 22 : 44;
  const top = compact ? (chapter === 'intro' ? Math.max(200, height * .34) : 146) : 112;
  const bottom = Math.max(top + 120, height - (compact ? (chapter === 'intro' ? 230 : 192) : 178));
  const x = value => projection.left + value * projection.width;
  const y = value => projection.top + value * projection.height;
  let left = margin;
  let right = width - margin;
  let edge = bottom;
  if (!compact) {
    if (chapter === 'intro') right = clamp(x(.365) - 24, margin + 240, width * .4);
    if (chapter === 'cores') {
      left = clamp(x(.12), margin, width * .18);
      right = Math.min(width - margin, x(.7));
      edge = clamp(y(.49) - 20, top + 300, bottom);
    }
    if (chapter === 'projects') {
      // Stay left of the closest point of the curved limb, not its bounding box.
      right = clamp(x(.64) - 32, margin + 390, width - 270);
    }
  }
  return { left, top, width: Math.max(180, right - left), height: Math.max(180, edge - top), compact };
}
