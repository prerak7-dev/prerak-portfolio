const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const ease = value => { const t = clamp(value, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); };

export function interpolateRailLayout(from, to, progress, bounds) {
  if (progress <= 0) return from;
  if (progress >= 1) return to;
  if (from.every((point, index) => Math.hypot(point.x - to[index].x, point.y - to[index].y) < .02)) return to;
  const rowSpan = from.reduce((sum, item) => sum + item.height + 6, -6);
  const rows = rowSpan <= bounds.bottom - bounds.top;
  const axis = rows ? 'y' : 'x';
  const cross = rows ? 'x' : 'y';
  const dimension = rows ? 'height' : 'width';
  const span = from.reduce((sum, item) => sum + item[dimension] + 6, -6);
  const center = from.reduce((sum, item, index) => sum + item[axis] + to[index][axis] + item[dimension], 0) / (2 * from.length);
  let lane = clamp(center - span / 2, rows ? bounds.top : bounds.left, (rows ? bounds.bottom : bounds.right) - span);
  return from.map((start, index) => {
    const end = to[index];
    const point = { ...end };
    // First establish separated lanes, travel across them, then settle on the
    // destination curve. No frame-dependent collision constraints can release.
    point[axis] = progress < .5
      ? start[axis] + (lane - start[axis]) * ease(progress / .22)
      : lane + (end[axis] - lane) * ease((progress - .78) / .22);
    point[cross] = start[cross] + (end[cross] - start[cross]) * ease((progress - .22) / .56);
    lane += start[dimension] + 6;
    return point;
  });
}

export function railItemsOverlap(a, b, gap = 6) {
  return a.x < b.x + b.width + gap && b.x < a.x + a.width + gap
    && a.y < b.y + b.height + gap && b.y < a.y + a.height + gap;
}

// Resolve complete button rectangles, never the label independently of its marker.
export function separateRailItems(anchors, bounds, gap = 6, routes = new Map()) {
  const items = anchors.map(item => ({ ...item }));
  const contain = item => {
    item.x = clamp(item.x, bounds.left, bounds.right - item.width);
    item.y = clamp(item.y, bounds.top, bounds.bottom - item.height);
  };
  items.forEach(contain);
  for (let pass = 0; pass < 100; pass++) {
    let overlaps = false;
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        if (!railItemsOverlap(a, b, gap - .01)) continue;
        overlaps = true;
        const dx = a.x + a.width / 2 - b.x - b.width / 2;
        const dy = a.y + a.height / 2 - b.y - b.height / 2;
        const pushX = (a.width + b.width) / 2 + gap - Math.abs(dx);
        const pushY = (a.height + b.height) / 2 + gap - Math.abs(dy);
        const key = `${i}:${j}`;
        if (!routes.has(key)) {
          const axis = pushX < pushY ? 'x' : 'y';
          routes.set(key, { axis, sign: (axis === 'x' ? dx : dy) > 0 ? 1 : -1 });
        }
        const { axis, sign } = routes.get(key);
        const extent = axis === 'x' ? (a.width + b.width) / 2 : (a.height + b.height) / 2;
        const shift = (extent + gap - sign * (axis === 'x' ? dx : dy) + .02) / 2;
        a[axis] += sign * shift;
        b[axis] -= sign * shift;
        contain(a); contain(b);
      }
    }
    if (!overlaps) return items;
  }
  // Very short windows can leave no feasible contour-local arrangement.
  // Pack deterministic rows instead of allowing ambiguous pointer targets.
  let x = bounds.left;
  let y = bounds.top;
  let rowHeight = 0;
  for (const item of items) {
    if (x + item.width > bounds.right) { x = bounds.left; y += rowHeight + gap; rowHeight = 0; }
    item.x = x; item.y = y;
    x += item.width + gap;
    rowHeight = Math.max(rowHeight, item.height);
  }
  return items;
}
