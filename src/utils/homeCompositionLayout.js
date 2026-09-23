const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const HOME_COMPACT_QUERY = '(max-width: 1100px), (max-height: 700px)';
export const NAV_COMPACT_QUERY = '(max-width: 760px), (max-height: 500px)';

// Landmarks shared by the eight authored Home paintings, in source-image space.
export function getHomeCompositionLayout(projection, width, height, headerBottom = 80) {
  const x = value => projection.left + value * projection.width;
  const y = value => projection.top + value * projection.height;
  const compact = width <= 1100 || height <= 700;
  const landscape = compact && width / height > 1.45;
  const top = headerBottom + (compact ? 10 : 22);
  const gateTop = y(.258);
  const skyBottom = Math.max(top + 58, gateTop - 16);
  const skyHeight = landscape ? Math.max(72, Math.min(130, height - 244)) : skyBottom - top;
  const sky = { left: compact ? 20 : x(.252), top, width: landscape ? width * .3 : compact ? width - 40 : x(.574) - x(.252), height: skyHeight };
  const waterLeft = Math.max(width * .27, x(.335));
  const waterRight = Math.min(width * .66, x(.665));
  const water = { left: waterLeft, top: y(.852), width: waterRight - waterLeft, height: Math.max(62, height - 32 - y(.852)) };
  return {
    compact, sky, water,
    roleSize: Math.min(compact ? 24 : 28, Math.max(16, Math.floor(skyHeight / 3.36))),
    mottoWidth: clamp(sky.width * .31, 130, 170),
    gate: { left: x(.5), top: y(.8) + 12 },
    tight: skyHeight < 120,
  };
}
