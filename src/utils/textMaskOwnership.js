const masks = new WeakMap();
const PROPERTIES = ['mask-image', 'mask-size', 'mask-position', 'mask-repeat', 'mask-origin', 'mask-clip'];

// Theme, chapter, and local-content dissolves may finish in either order.
// Removing an older layer must not uncover a newer chapter mid-entry.
export function claimTextMask(node, owner, image) {
  let entry = masks.get(node);
  if (!entry) {
    entry = { base: PROPERTIES.map(key => [key, node.style.getPropertyValue(key), node.style.getPropertyPriority(key)]), layers: new Map() };
    masks.set(node, entry);
  }
  entry.layers.set(owner, image);
  node.style.setProperty('mask-image', image, 'important');
  node.style.setProperty('mask-repeat', 'no-repeat');
  node.style.setProperty('mask-origin', 'border-box');
  node.style.setProperty('mask-clip', 'no-clip');
}

export function releaseTextMask(node, owner) {
  const entry = masks.get(node);
  if (!entry || !entry.layers.delete(owner)) return;
  if (entry.layers.size) {
    node.style.setProperty('mask-image', [...entry.layers.values()].at(-1), 'important');
  } else {
    entry.base.forEach(([key, value, priority]) => {
      if (value) node.style.setProperty(key, value, priority);
      else node.style.removeProperty(key);
    });
    masks.delete(node);
  }
}
