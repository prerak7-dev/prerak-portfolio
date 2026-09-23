// Let the text layer capture the outgoing face before React commits new copy.
export function changeTextContent(update, selector = '.archive-scene.active') {
  const event = new CustomEvent('text-contour-change', { cancelable: true, detail: { update, selector } });
  if (window.dispatchEvent(event)) update();
}
