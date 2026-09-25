const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const ease = value => { const t = clamp(value, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); };

export function interpolateRailLayout(from, to, progress, bounds) {
  return createRailJourney(from, to, bounds)(progress);
}

export function createRailJourney(from, to, bounds) {
  // Choose one orbital direction for the entire constellation. Per-tab choices
  // can send Home around the opposite side of the scene from its neighbours.
  let inwardSweep = 0;
  let fallbackDirection = 0;
  from.forEach((a, index) => {
    const b = to[index];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const centerX = (bounds.left + bounds.right - Math.max(a.width, b.width)) / 2;
    const centerY = (bounds.top + bounds.bottom - Math.max(a.height, b.height)) / 2;
    inwardSweep += -dy * (centerX - (a.x + b.x) / 2) + dx * (centerY - (a.y + b.y) / 2);
    if (!fallbackDirection && Math.hypot(dx, dy) >= .02) fallbackDirection = Math.sign(dx || -dy);
  });
  const direction = Math.abs(inwardSweep) > .001 ? Math.sign(inwardSweep) : fallbackDirection;
  const bends = from.map((a, index) => {
    const b = to[index];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy);
    if (distance < .02) return { x: 0, y: 0 };
    const normal = { x: -dy / distance, y: dx / distance };
    const sweep = Math.min(220, distance * .36) * (.9 + .1 * Math.sin(index / Math.max(1, from.length - 1) * Math.PI));
    const bend = { x: normal.x * direction * sweep, y: normal.y * direction * sweep };
    // Each satellite follows half an ellipse around the midpoint of its journey.
    // Limit its minor radius analytically, so the orbit never needs a mid-flight
    // viewport clamp or collision correction.
    let scale = 1;
    for (const axis of ['x', 'y']) {
      if (Math.abs(bend[axis]) < .001) continue;
      const low = axis === 'x' ? bounds.left : bounds.top;
      const high = axis === 'x' ? bounds.right - Math.max(a.width, b.width) : bounds.bottom - Math.max(a.height, b.height);
      const middle = (a[axis] + b[axis]) / 2;
      const reach = bend[axis] > 0 ? high - middle : middle - low;
      const halfSpan = (b[axis] - a[axis]) / 2;
      const clearance = Math.sqrt(Math.max(0, reach * reach - halfSpan * halfSpan));
      scale = Math.min(scale, clearance / Math.abs(bend[axis]));
    }
    return { x: bend.x * clamp(scale, 0, 1), y: bend.y * clamp(scale, 0, 1) };
  });
  return progress => {
    if (progress <= 0) return from;
    if (progress >= 1) return to;
    const angle = Math.PI * ease(progress);
    const t = (1 - Math.cos(angle)) / 2;
    const arc = Math.sin(angle);
    return from.map((a, index) => ({
      ...to[index],
      x: a.x + (to[index].x - a.x) * t + bends[index].x * arc,
      y: a.y + (to[index].y - a.y) * t + bends[index].y * arc,
    }));
  };
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
  // On narrow viewports preserve one ordered curve, not a wrapped grid whose
  // end jumps back across the screen during the next contour morph.
  const span = items.reduce((sum, item) => sum + item.height + gap, -gap);
  if (span <= bounds.bottom - bounds.top) {
    const centerY = items.reduce((sum, item) => sum + item.y + item.height / 2, 0) / items.length;
    let y = clamp(centerY - span / 2, bounds.top, bounds.bottom - span);
    return items.map(item => {
      const point = { ...item, y };
      y += item.height + gap;
      return point;
    });
  }
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
