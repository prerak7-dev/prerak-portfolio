import { useLayoutEffect } from 'react';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { getContourContentBounds } from '../utils/contourContentLayout.js';
import { setCachedStyleProperty } from '../utils/motionPerformance.js';

const selectors = { intro: '.gateway-sequence-preloads img', cores: '.cores-plate img', projects: '.systems-plate img' };

export function useContourContentLayout(ref, chapter, enabled = true) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const image = document.querySelector(selectors[chapter]);
      const coverWidth = Math.max(width, height * 16 / 9);
      const projection = readSceneImageProjection(image, { left: (width-coverWidth)/2, top: (height-coverWidth*9/16)/2, width: coverWidth, height: coverWidth*9/16 }, width);
      const bounds = getContourContentBounds(chapter, projection, width, height);
      for (const key of ['left', 'top', 'width', 'height']) setCachedStyleProperty(node, `--content-${key}`, `${bounds[key].toFixed(1)}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const unsubscribe = subscribeSpatialMotion(() => { if (enabled) schedule(); });
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    window.addEventListener('resize', schedule, { passive: true });
    measure();
    return () => { unsubscribe(); observer.disconnect(); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); };
  }, [ref, chapter, enabled]);
}
