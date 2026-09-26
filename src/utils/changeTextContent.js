// Let the text layer capture the outgoing face before React commits new copy.
export function changeTextContent(update, selector = '.archive-scene.active') {
  return new Promise(resolve => {
    const event = new CustomEvent('text-contour-change', { cancelable: true, detail: { update, selector, complete: resolve } });
    if (window.dispatchEvent(event)) { update(); resolve(); }
  });
}
