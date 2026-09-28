import { getCinematicGeometryAsset } from '../data/cinematicAssets.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';
import { loadCinematicGeometryField } from './cinematicGeometryField.js';
import { createTextContourRenderer } from './textContourRenderer.js';
import { claimTextMask, releaseTextMask } from './textMaskOwnership.js';

const SCENES = [0, 1, 2, 3, 3, 4, 5];

export function createChapterRailEdgeMasks(nodes) {
  const owner = Symbol('rail-edges');
  let renderer;
  let key;
  let latest;
  let disposed = false;
  let masks = [];
  let previous = [];
  const clear = () => nodes.forEach(node => {
    releaseTextMask(node, owner);
    node.style.removeProperty('opacity');
  });
  const paint = () => latest.reveals.forEach((reveal, index) => {
    if (previous[index] === reveal) return;
    previous[index] = reveal;
    if (reveal === 1) {
      releaseTextMask(nodes[index], owner);
      nodes[index].style.removeProperty('opacity');
    } else if (masks[index]) {
      renderer.draw(reveal, `rail-${index}`);
      claimTextMask(nodes[index], owner, masks[index]);
      nodes[index].style.removeProperty('opacity');
    } else {
      nodes[index].style.setProperty('opacity', String(reveal), 'important');
    }
  });
  return {
    update(theme, chapter, projection, items, reveals) {
      latest = { items, reveals };
      const width = innerWidth;
      const height = innerHeight;
      const nextKey = `${theme}:${chapter}:${width}:${height}:${items.map(item => item.width).join(',')}`;
      if (key !== nextKey) {
        key = nextKey;
        masks = [];
        previous = [];
        clear();
        const scene = SCENES[chapter];
        loadCinematicGeometryField(getCinematicGeometryAsset(theme, scene)).then(resource => {
          if (disposed || key !== nextKey || !resource) return;
          renderer ||= createTextContourRenderer();
          renderer.configure(resource.image, projection, getTracerSceneField(theme, scene), width, height);
          masks = latest.items.map((item, index) => renderer.mask({
            left: item.x, top: item.y, width: item.width, height: item.height,
          }, 'incoming', 1, 1, `rail-${index}`));
          previous = [];
          paint();
        }).catch(error => {
          // Keep navigation usable if a device cannot allocate another GL context.
          console.warn('Rail contour mask unavailable', error);
        });
      }
      paint();
    },
    reset() { if (key == null) return; key = null; masks = []; previous = []; clear(); },
    dispose() { disposed = true; clear(); renderer?.dispose(); },
  };
}
