export function mergeBrushLines(rects) {
  const lines = [];
  for (const rect of [...rects].filter(rect => rect.width > 1 && rect.height > 1).sort((a, b) => a.top - b.top || a.left - b.left)) {
    const center = rect.top + rect.height / 2;
    const line = lines.find(candidate => Math.abs(candidate.top + candidate.height / 2 - center) < Math.min(candidate.height, rect.height) * .35);
    if (line) {
      line.right = Math.max(line.right, rect.right);
      line.bottom = Math.max(line.bottom, rect.bottom);
      line.left = Math.min(line.left, rect.left);
      line.top = Math.min(line.top, rect.top);
      line.width = line.right - line.left;
      line.height = line.bottom - line.top;
    } else lines.push({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height });
  }
  return lines;
}

export function getBrushTarget(element, root) {
  if (!(element instanceof Element) || !root.contains(element)) return null;
  const target = element.closest('button, a, [role="tab"]') || element.closest('.material-text');
  if (!target || target.closest('[inert], [aria-hidden="true"], [data-reading-hidden], [data-home-awaiting]') || target.matches(':disabled')) return null;
  if (!target.matches('.material-text') && !target.querySelector('.material-text')) return null;
  const text = target.matches('.material-text') ? [target] : [...target.querySelectorAll('.material-text')];
  if (text.some(node => node.style.getPropertyPriority('mask-image') === 'important')) return null;
  return target;
}

export function measureBrushLines(target, root) {
  if (!target.isConnected || target.closest('[inert], [aria-hidden="true"], [data-reading-hidden], [data-home-awaiting]')) return [];
  const clip = { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
  for (let node = target; node; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (style.visibility === 'hidden' || Number(style.opacity) < .02 || style.display === 'none') return [];
    if (/(auto|scroll|hidden|clip)/.test(`${style.overflowX} ${style.overflowY}`)) {
      const bounds = node.getBoundingClientRect();
      clip.left = Math.max(clip.left, bounds.left);
      clip.right = Math.min(clip.right, bounds.right);
      clip.top = Math.max(clip.top, bounds.top);
      clip.bottom = Math.min(clip.bottom, node.hasAttribute('data-reading-visible-height')
        ? Math.min(bounds.bottom, bounds.top + Number(node.dataset.readingVisibleHeight)) : bounds.bottom);
    }
    if (node === root) break;
  }
  const rects = [];
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent.trim() || node.parentElement.closest('[aria-hidden="true"], [data-reading-hidden], svg')) continue;
    const style = getComputedStyle(node.parentElement);
    if (style.visibility === 'hidden' || style.display === 'none') continue;
    range.selectNodeContents(node);
    rects.push(...range.getClientRects());
  }
  return mergeBrushLines(rects).flatMap(rect => {
    if (rect.bottom <= clip.top || rect.top >= clip.bottom || rect.right <= clip.left || rect.left >= clip.right) return [];
    const left = Math.max(clip.left, rect.left - 13);
    const top = Math.max(clip.top, rect.top - 5);
    const right = Math.min(clip.right, rect.right + 13);
    const bottom = Math.min(clip.bottom, rect.bottom + 5);
    return [{ left, top, width: right - left, height: bottom - top }];
  });
}
