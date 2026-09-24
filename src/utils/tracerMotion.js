export function sampleTracerPoint(points, position, closed = false) {
  if (!points.length) return null;
  const index = closed
    ? ((position % points.length) + points.length) % points.length
    : Math.max(0, Math.min(points.length - 1, position));
  const start = Math.floor(index);
  const end = closed ? (start + 1) % points.length : Math.min(points.length - 1, start + 1);
  const mix = index - start;
  return {
    x: points[start].x + (points[end].x - points[start].x) * mix,
    y: points[start].y + (points[end].y - points[start].y) * mix,
  };
}

export function sampleMotionHistory(path, motionCycle, historySpan, sampleCount) {
  if (!path.length) return [];
  const points = [];
  for (let index = sampleCount - 1; index >= 0; index--) {
    const age = index / Math.max(1, sampleCount - 1);
    const progress = .5 - Math.cos((motionCycle - historySpan * age) * Math.PI) * .5;
    points.push(sampleTracerPoint(path, progress * (path.length - 1)));
  }
  return points;
}
