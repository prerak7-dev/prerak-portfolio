import { useLayoutEffect, useState } from 'react';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { getHomeCompositionLayout, HOME_COMPACT_QUERY } from '../utils/homeCompositionLayout.js';
import { setCachedStyleProperty } from '../utils/motionPerformance.js';

export function useHomeCompositionLayout(ref) {
  const [compact, setCompact] = useState(() => window.matchMedia(HOME_COMPACT_QUERY).matches);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const image = document.querySelector('.gateway-sequence-preloads img');
      const header = document.querySelector('.archive-header');
      const coverWidth = Math.max(width, height * 1672 / 941);
      const projection = readSceneImageProjection(image, { left: (width - coverWidth) / 2, top: (height - coverWidth * 941 / 1672) / 2, width: coverWidth, height: coverWidth * 941 / 1672 }, width);
      const layout = getHomeCompositionLayout(projection, width, height, header?.getBoundingClientRect().bottom ?? 80);
      for (const area of ['sky', 'water', 'gate']) {
        for (const [key, value] of Object.entries(layout[area])) {
          setCachedStyleProperty(node, `--home-${area}-${key}`, `${value.toFixed(2)}px`);
          if (area === 'sky') setCachedStyleProperty(node.closest('.archive-viewport'), `--home-${area}-${key}`, `${value.toFixed(2)}px`);
        }
      }
      setCachedStyleProperty(node, '--home-motto-width', `${layout.mottoWidth}px`);
      setCachedStyleProperty(node, '--home-role-size', `${layout.roleSize}px`);
      node.dataset.tight = String(layout.tight);
      setCompact(current => current === layout.compact ? current : layout.compact);
    };
    const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    const header = document.querySelector('.archive-header');
    if (header) observer.observe(header);
    const unsubscribe = subscribeSpatialMotion(schedule);
    document.fonts.ready.then(schedule);
    window.addEventListener('resize', schedule, { passive: true });
    measure();
    return () => { disposed = true; unsubscribe(); observer.disconnect(); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); };
  }, [ref]);
  return compact;
}
