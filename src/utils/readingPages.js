// Prefer complete records. Only a record taller than the reading window can
// break, and then only between measured text lines, never through a glyph.
export function paginateReadingBlocks(blocks, height) {
  const pages = [];
  let page;
  const append = unit => {
    if (!page || unit.bottom - page.start > height + .5) {
      page = { start: unit.top, end: unit.bottom };
      pages.push(page);
    } else page.end = Math.max(page.end, unit.bottom);
  };
  for (const block of blocks) {
    if (block.bottom - block.top <= height + .5) append(block);
    else {
      page = null;
      for (const line of block.lines) append(line);
      page = null;
    }
  }
  return pages.length ? pages : [{ start: 0, end: 0 }];
}

export function measureReadingBlocks(node) {
  const origin = node.getBoundingClientRect().top - node.scrollTop;
  return [...node.children].map(block => {
    const rect = block.getBoundingClientRect();
    const lines = [];
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      for (const line of range.getClientRects()) if (line.width && line.height) {
        const top = line.top - origin - 1;
        const bottom = line.bottom - origin + 1;
        const heading = Boolean(walker.currentNode.parentElement.closest('h1, h2, h3, h4, .contour-eyebrow'));
        const same = lines.find(value => Math.abs(value.top - top) < 3);
        if (same) same.bottom = Math.max(same.bottom, bottom);
        else lines.push({ top, bottom, heading });
      }
    }
    lines.sort((a, b) => a.top - b.top);
    const headings = lines.filter(line => line.heading);
    if (headings.length > 1 && headings.at(-1).bottom - headings[0].top <= node.clientHeight) {
      const heading = { top: headings[0].top, bottom: headings.at(-1).bottom };
      for (let index = lines.length - 1; index >= 0; index--) if (lines[index].heading) lines.splice(index, 1);
      lines.unshift(heading);
    }
    return {
      node: block,
      top: Math.max(0, Math.min(rect.top - origin, lines[0]?.top ?? Infinity)),
      bottom: Math.max(rect.bottom - origin, lines.at(-1)?.bottom ?? 0),
      lines,
    };
  }).filter(block => block.bottom > block.top);
}
