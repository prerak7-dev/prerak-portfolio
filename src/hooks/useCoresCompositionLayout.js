import { useLayoutEffect } from 'react';
import { usePortraitArtwork } from './usePortraitArtwork.js';
import { getSceneCoverProjection } from '../data/cinematicViewport.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { getCoresCompositionLayout } from '../utils/coresCompositionLayout.js';
import { createTracerAnimation } from '../utils/tracerAnimation.js';
import { setCachedStyleProperty } from '../utils/motionPerformance.js';
import { NAV_COMPACT_QUERY } from '../utils/homeCompositionLayout.js';

export function useCoresCompositionLayout(ref, isActive) {
  const portrait = usePortraitArtwork();
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !isActive) return undefined;
    const labels = [...node.querySelectorAll('.core-sun')];
    const heading = node.querySelector('.cores-chapter-heading');
    const detail = node.querySelector('.core-detail');
    const footer = node.querySelector('footer');
    const viewport = node.closest('.archive-viewport');
    const image = document.querySelector('.cores-plate img');
    const header = document.querySelector('.archive-header');
    const rail = document.querySelector('.chapter-rail');
    const lore = document.querySelector('.spatial-lore-guide');
    let contentTop;
    let loreBottom;
    let loreScale;
    const readChrome = () => {
      const compact = matchMedia(NAV_COMPACT_QUERY).matches;
      const bottom = (compact ? rail : header)?.getBoundingClientRect().bottom || 80;
      contentTop = bottom + (innerHeight <= 680 ? 12 : 24);
      const loreBounds = lore?.getBoundingClientRect();
      loreBottom = loreBounds?.bottom || innerHeight;
      loreScale = loreBounds?.height / lore?.offsetHeight || 1;
    };
    const place = (element, area) => Object.entries(area).forEach(([key, value]) =>
      setCachedStyleProperty(element, `--core-${key}`, `${value.toFixed(2)}px`));
    const measure = () => {
      const projection = readSceneImageProjection(image, getSceneCoverProjection(innerWidth, innerHeight), innerWidth);
      const layout = getCoresCompositionLayout(projection, innerWidth, innerHeight, { portrait, contentTop });
      node.dataset.short = String(layout.short);
      node.dataset.portrait = String(portrait);
      layout.anchors.forEach((anchor, index) => place(labels[index], anchor));
      place(heading, layout.heading);
      place(detail, layout.detail);
      place(footer, layout.footer);
      // Fixed-position lore lives inside a scaled guide, unlike the scene labels.
      setCachedStyleProperty(viewport, '--core-lore-bottom', `${((loreBottom - layout.anchors[2].top + 24) / loreScale).toFixed(2)}px`);
      setCachedStyleProperty(viewport, '--core-lore-height', `${(Math.max(60, layout.anchors[2].top - contentTop - 40) / loreScale).toFixed(2)}px`);
    };
    readChrome();
    measure();
    const animation = createTracerAnimation(measure);
    const resize = () => { readChrome(); animation.invalidate(); };
    const observer = new ResizeObserver(resize);
    if (header) observer.observe(header);
    if (rail) observer.observe(rail);
    if (lore) observer.observe(lore);
    window.addEventListener('resize', resize, { passive: true });
    image?.addEventListener('load', resize);
    return () => {
      animation.dispose(); observer.disconnect();
      window.removeEventListener('resize', resize);
      image?.removeEventListener('load', resize);
      setCachedStyleProperty(viewport, '--core-lore-bottom', '');
      setCachedStyleProperty(viewport, '--core-lore-height', '');
    };
  }, [ref, isActive, portrait]);
}
