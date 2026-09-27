// Let the text layer capture the outgoing face before React commits new copy.
export function changeTextContent(update, selector = '.archive-scene.active', { key = selector, shouldUpdate = () => true } = {}) {
  return new Promise(resolve => {
    const apply = () => { if (shouldUpdate()) update(); };
    const event = new CustomEvent('text-contour-change', { cancelable: true, detail: { update: apply, selector, key, shouldUpdate, complete: resolve } });
    if (window.dispatchEvent(event)) { apply(); resolve(); }
  });
}
