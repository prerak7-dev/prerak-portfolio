import { SplineCurve, Vector2 } from 'three';

export const CHAPTER_RAIL_SCROLL_STEP = 160;

export function getChapterRailCapacity(height, itemCount, landscape) {
  return landscape ? Math.min(itemCount, Math.max(2, Math.floor((height - 172) / 50))) : itemCount;
}

// Padded tangents let tabs enter and leave the same authored curve continuously.
export function scrollRailAlongCurve(slots, sizes, offset) {
  const points = slots.map(({ x, y }) => new Vector2(x, y));
  const first = points[0];
  const last = points.at(-1);
  const startTangent = points[1].clone().sub(first);
  const endTangent = last.clone().sub(points.at(-2));
  const curve = new SplineCurve([
    first.clone().sub(startTangent), ...points, last.clone().add(endTangent),
  ]);
  return sizes.map((size, index) => {
    const position = index - offset;
    const point = position < 0 ? first.clone().addScaledVector(startTangent, position)
      : position > points.length - 1 ? last.clone().addScaledVector(endTangent, position - points.length + 1)
        : curve.getPoint((position + 1) / (points.length + 1));
    return { ...size, x: point.x, y: point.y };
  });
}
