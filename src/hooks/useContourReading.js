import { useLayoutEffect } from 'react';
import { changeTextContent } from '../utils/changeTextContent.js';
import { measureReadingBlocks, paginateReadingBlocks } from '../utils/readingPages.js';

// Reading gestures advance a stationary passage under the same contour mask.
// Native scroll offsets change only between the outgoing and incoming faces.
export function useContourReading(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    let lastWheel = 0;
    let wheelDirection = 0;
    let touch;
    const pending = new WeakSet();
    const readers = new Map();
    const surface = target => target.closest('[data-contour-reading]');
    const showPage = (node, reader, index) => {
      reader.index = Math.max(0, Math.min(reader.pages.length - 1, index));
      const page = reader.pages[reader.index];
      const fits = reader.pages.length === 1 && page.end <= node.clientHeight;
      const top = fits ? 0 : page.start;
      const end = fits ? node.clientHeight : page.end - top;
      node.style.setProperty('--reading-tail', fits ? '0px' : `${node.clientHeight}px`);
      node.style.setProperty('--reading-clip-bottom', `${Math.max(0, node.clientHeight - end)}px`);
      node.dataset.readingPage = String(reader.index);
      node.dataset.readingPages = String(reader.pages.length);
      node.dataset.readingVisibleHeight = String(end);
      for (const block of reader.blocks) {
        const hidden = block.bottom <= top || block.top >= top + end;
        block.node.toggleAttribute('data-reading-hidden', hidden);
        block.node.inert = hidden;
      }
      node.scrollTo({ top, behavior: 'instant' });
    };
    const refresh = node => {
      const signature = `${node.clientWidth}:${node.clientHeight}:${node.textContent}`;
      const previous = readers.get(node);
      if (previous?.signature === signature || !node.clientHeight) return previous;
      // Remove the old clipping before measuring a new project/category or size.
      for (const child of node.children) { child.removeAttribute('data-reading-hidden'); child.inert = false; }
      const blocks = measureReadingBlocks(node);
      const pages = paginateReadingBlocks(blocks, node.clientHeight);
      const reader = { signature, blocks, pages, index: 0 };
      readers.set(node, reader);
      showPage(node, reader, previous?.text === node.textContent ? previous.index : 0);
      reader.text = node.textContent;
      return reader;
    };
    const observer = new ResizeObserver(entries => entries.forEach(({ target }) => refresh(target)));
    const scan = () => {
      for (const node of readers.keys()) if (!node.isConnected) { observer.unobserve(node); readers.delete(node); }
      root.querySelectorAll('[data-contour-reading]').forEach(node => {
        if (!readers.has(node)) observer.observe(node);
        refresh(node);
      });
    };
    const mutations = new MutationObserver(scan);
    mutations.observe(root, { subtree: true, childList: true, characterData: true });
    root.addEventListener('contour-reading-refresh', scan);
    scan();
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) { readers.forEach(reader => { reader.signature = ''; }); scan(); } });
    const advance = (node, direction, edge) => {
      if (!node || pending.has(node)) return;
      const reader = refresh(node);
      if (!reader) return;
      const index = edge === 'start' ? 0 : edge === 'end' ? reader.pages.length - 1
        : Math.max(0, Math.min(reader.pages.length - 1, reader.index + direction));
      if (index === reader.index) return;
      pending.add(node);
      changeTextContent(() => {
        if (node.isConnected && readers.get(node) === reader) showPage(node, reader, index);
      }, node)
        .finally(() => pending.delete(node));
    };
    const wheel = event => {
      const node = surface(event.target);
      if (!node || Number(node.dataset.readingPages) < 2 || Math.abs(event.deltaY) < Math.abs(event.deltaX) || event.ctrlKey) return;
      event.preventDefault();
      const now = performance.now();
      const direction = Math.sign(event.deltaY);
      const fresh = now - lastWheel > 180 || direction !== wheelDirection;
      lastWheel = now; wheelDirection = direction;
      if (fresh) advance(node, direction);
    };
    const key = event => {
      const node = surface(event.target);
      if (!node || event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
      const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? 1 : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0;
      if (!direction && !['Home', 'End'].includes(event.key)) return;
      if (event.key === ' ' && event.target.closest('button, a')) return;
      event.preventDefault();
      advance(node, event.shiftKey ? -direction : direction, event.key === 'Home' ? 'start' : event.key === 'End' ? 'end' : undefined);
    };
    const start = event => {
      const node = surface(event.target);
      touch = node && event.touches.length === 1 ? { node, y: event.touches[0].clientY, moved: false } : null;
    };
    const move = event => {
      if (!touch || Number(touch.node.dataset.readingPages) < 2) return;
      event.preventDefault();
      const delta = touch.y - event.touches[0].clientY;
      if (!touch.moved && Math.abs(delta) >= 28) { touch.moved = true; advance(touch.node, Math.sign(delta)); }
    };
    const end = () => { if (touch) touch.endedAt = performance.now(); };
    const click = event => {
      if (touch?.moved && performance.now() - touch.endedAt < 350) { event.preventDefault(); event.stopPropagation(); }
      touch = null;
    };
    root.addEventListener('wheel', wheel, { passive: false });
    root.addEventListener('keydown', key);
    root.addEventListener('touchstart', start, { passive: true });
    root.addEventListener('touchmove', move, { passive: false });
    root.addEventListener('touchend', end, { passive: true });
    root.addEventListener('touchcancel', end, { passive: true });
    root.addEventListener('click', click, true);
    return () => {
      disposed = true; observer.disconnect(); mutations.disconnect();
      root.removeEventListener('contour-reading-refresh', scan);
      readers.forEach((reader, node) => {
        node.style.removeProperty('--reading-tail'); node.style.removeProperty('--reading-clip-bottom');
        delete node.dataset.readingVisibleHeight; delete node.dataset.readingPage; delete node.dataset.readingPages;
        reader.blocks.forEach(block => { block.node.removeAttribute('data-reading-hidden'); block.node.inert = false; });
      });
      root.removeEventListener('wheel', wheel); root.removeEventListener('keydown', key);
      root.removeEventListener('touchstart', start); root.removeEventListener('touchmove', move);
      root.removeEventListener('touchend', end); root.removeEventListener('touchcancel', end);
      root.removeEventListener('click', click, true);
    };
  }, [ref]);
}
