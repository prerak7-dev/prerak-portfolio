const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const ease = value => { const t = clamp(value, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); };

export function interpolateRailLayout(from, to, progress, bounds) {
  if (progress <= 0) return from;
  if (progress >= 1) return to;
  if (from.every((point, index) => Math.hypot(point.x - to[index].x, point.y - to[index].y) < .02)) return to;
  const mix = ease(progress);
  const center = item => ({ x: item.x + item.width / 2, y: item.y + item.height / 2 });
  const origin = from.map(center);
  const destination = to.map(center);
  const points = [{ x: 0, y: 0 }];
  // Morph the contour's connected tangents, rather than sending each tab through
  // a horizontal/vertical transit lane. The rail remains one continuous curve.
  for (let index = 1; index < from.length; index++) {
    const a = { x: origin[index].x - origin[index - 1].x, y: origin[index].y - origin[index - 1].y };
    const b = { x: destination[index].x - destination[index - 1].x, y: destination[index].y - destination[index - 1].y };
    const angle = Math.atan2(a.y, a.x);
    const turn = Math.atan2(a.x * b.y - a.y * b.x, a.x * b.x + a.y * b.y);
    const heading = angle + turn * mix;
    const clearance = direction => {
      const x = (to[index].width + to[index - 1].width) / 2 + 6;
      const y = (to[index].height + to[index - 1].height) / 2 + 6;
      return Math.pow(2 / (Math.pow(Math.abs(Math.cos(direction)) / x, 12)
        + Math.pow(Math.abs(Math.sin(direction)) / y, 12)), 1 / 12);
    };
    const spacing = Math.hypot(a.x, a.y) / clearance(angle) * (1 - mix)
      + Math.hypot(b.x, b.y) / clearance(angle + turn) * mix;
    const length = clearance(heading) * spacing;
    points.push({ x: points[index - 1].x + Math.cos(heading) * length, y: points[index - 1].y + Math.sin(heading) * length });
  }
  // Spread along the whole curve when rotating labels need more room. One shared
  // scale preserves curvature and ordering without collision-solver jitter.
  let spread = 1;
  for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
    const dx = Math.abs(points[j].x - points[i].x);
    const dy = Math.abs(points[j].y - points[i].y);
    spread = Math.max(spread, Math.min(
      ((to[i].width + to[j].width) / 2 + 6) / Math.max(.001, dx),
      ((to[i].height + to[j].height) / 2 + 6) / Math.max(.001, dy),
    ));
  }
  const average = list => list.reduce((sum, point) => ({ x: sum.x + point.x / list.length, y: sum.y + point.y / list.length }), { x: 0, y: 0 });
  const a = average(origin);
  const b = average(destination);
  const pivot = average(points);
  const items = points.map((point, index) => ({
    ...to[index],
    x: a.x * (1 - mix) + b.x * mix + (point.x - pivot.x) * spread - to[index].width / 2,
    y: a.y * (1 - mix) + b.y * mix + (point.y - pivot.y) * spread - to[index].height / 2,
  }));
  return containRailLayout(items, bounds);
}

export function containRailLayout(items, bounds) {
  const left = Math.min(...items.map(item => item.x));
  const right = Math.max(...items.map(item => item.x + item.width));
  const top = Math.min(...items.map(item => item.y));
  const bottom = Math.max(...items.map(item => item.y + item.height));
  const shiftX = Math.max(0, bounds.left - left) + Math.min(0, bounds.right - right);
  const shiftY = Math.max(0, bounds.top - top) + Math.min(0, bounds.bottom - bottom);
  return items.map(item => ({ ...item, x: item.x + shiftX, y: item.y + shiftY }));
}

export function createRailJourney(from, to, bounds) {
  const samples = [{ distance: 0, items: from }];
  for (let index = 1; index <= 128; index++) {
    const items = interpolateRailLayout(from, to, index / 128, bounds);
    const previous = samples.at(-1);
    const distance = Math.max(...items.map((item, i) => Math.hypot(item.x - previous.items[i].x, item.y - previous.items[i].y)));
    samples.push({ distance: previous.distance + distance, items });
  }
  // Parameterize by actual travel distance, so turning a wide label around the
  // contour cannot cause a velocity spike at a particular curve orientation.
  return progress => {
    if (progress <= 0) return from;
    if (progress >= 1) return to;
    const distance = ease(progress) * samples.at(-1).distance;
    let index = 1;
    while (index < samples.length - 1 && samples[index].distance < distance) index++;
    const a = samples[index - 1];
    const b = samples[index];
    const mix = (distance - a.distance) / Math.max(.0001, b.distance - a.distance);
    return interpolateRailLayout(from, to, (index - 1 + mix) / 128, bounds);
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
