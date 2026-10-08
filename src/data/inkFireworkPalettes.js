import { TEXT_MATERIALS } from './textMaterials.js';

const rgb = hex => [1, 3, 5].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16));

// Falling leaves use the painting's warm foliage pigment instead of white
// heading ink. Other appearances keep their established three-color material.
export const SEASONAL_PIGMENT_OVERRIDES = Object.freeze({
  fall: Object.freeze(['#e8b36f', '#ab693f', '#d8975d']),
});

export const INK_FIREWORK_PALETTES = Object.freeze(Object.fromEntries(
  Object.entries(TEXT_MATERIALS).map(([theme, material]) => [theme,
    Object.freeze((SEASONAL_PIGMENT_OVERRIDES[theme] || [material.face, material.fold, material.accent]).map(hex => Object.freeze(rgb(hex))))]),
));
