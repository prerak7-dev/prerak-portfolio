const styleValueCache = new WeakMap();
const classValueCache = new WeakMap();

function getNodeCache(cache, node) {
  let values = cache.get(node);
  if (!values) {
    values = new Map();
    cache.set(node, values);
  }
  return values;
}

export const FRAME_INTERVAL_120_HZ = 1000 / 120;

export function setCachedStyleProperty(node, property, value) {
  if (!node) return false;
  const serialized = String(value);
  const values = getNodeCache(styleValueCache, node);
  if (values.get(property) === serialized) return false;
  values.set(property, serialized);
  node.style.setProperty(property, serialized);
  return true;
}

export function setCachedInlineStyle(node, property, value) {
  if (!node) return false;
  const cacheKey = `inline:${property}`;
  const serialized = String(value);
  const values = getNodeCache(styleValueCache, node);
  if (values.get(cacheKey) === serialized) return false;
  values.set(cacheKey, serialized);
  node.style[property] = serialized;
  return true;
}

export function toggleCachedClass(node, className, enabled) {
  if (!node) return false;
  const values = getNodeCache(classValueCache, node);
  const hasClass = node.classList.contains(className);
  if (values.get(className) === enabled && hasClass === enabled) return false;
  values.set(className, enabled);
  node.classList.toggle(className, enabled);
  return true;
}
