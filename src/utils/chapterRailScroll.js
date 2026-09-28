import { SplineCurve, Vector2 } from 'three';

export const CHAPTER_RAIL_SCROLL_STEP = 160;

export function getChapterRailCapacity(height, itemCount, landscape, width = Infinity) {
  return landscape ? Math.min(itemCount, Math.max(2, Math.floor((height - 172) / 50)),
    Math.max(2, Math.floor((width - 116) / 124))) : itemCount;
}

export function getRailEdgeReveal(position, count) {
  return Math.max(0, Math.min(1, 1 + position / .65, 1 + (count - 1 - position) / .65));
}

// Fit the entire painted contour, not individual buttons. Dense source samples
// retain curvature even when a short landscape viewport can show only two tabs.
export function fitScrollableRail(samples, sizes, count, offset, bounds, axis) {
  const maxWidth = Math.max(...sizes.map(size => size.width));
  const maxHeight = Math.max(...sizes.map(size => size.height));
  const minX = Math.min(...samples.map(point => point.x));
  const minY = Math.min(...samples.map(point => point.y));
  const rangeX = Math.max(...samples.map(point => point.x)) - minX;
  const rangeY = Math.max(...samples.map(point => point.y)) - minY;
  const spaceX = Math.max(1, bounds.right - bounds.left - maxWidth);
  const spaceY = Math.max(1, bounds.bottom - bounds.top - maxHeight);
  const spanX = Math.min(spaceX, Math.max(rangeX, axis === 'x' ? (maxWidth + 6) * (count - 1) : 0));
  const spanY = Math.min(spaceY, Math.max(rangeY, axis === 'y' ? (maxHeight + 6) * (count - 1) : 0));
  const left = Math.max(bounds.left, Math.min(bounds.right - maxWidth - spanX, minX));
  const top = Math.max(bounds.top, Math.min(bounds.bottom - maxHeight - spanY, minY));
  const points = samples.map((point, index) => new Vector2(
    left + (axis === 'x' ? index / (samples.length - 1) : (point.x - minX) / (rangeX || 1)) * spanX,
    top + (axis === 'y' ? index / (samples.length - 1) : (point.y - minY) / (rangeY || 1)) * spanY,
  ));
  const padded = [points[0].clone().multiplyScalar(2).sub(points[1]), ...points,
    points.at(-1).clone().multiplyScalar(2).sub(points.at(-2))];
  const curve = new SplineCurve(padded);
  const sample = progress => curve.getPoint((1 + progress * (points.length - 1)) / (points.length + 1));
  return sizes.map((size, index) => {
    const progress = (index - offset) / (count - 1);
    const edge = Math.max(0, Math.min(1, progress));
    const point = sample(edge);
    if (progress !== edge) {
      const tangent = curve.getTangent((1 + edge * (points.length - 1)) / (points.length + 1));
      const distance = (progress - edge) * (axis === 'x' ? spanX / Math.max(.01, tangent.x) : spanY / Math.max(.01, tangent.y));
      point.addScaledVector(tangent, distance);
    }
    return { ...size, x: point.x, y: point.y };
  });
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
