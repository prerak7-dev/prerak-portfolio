import { getCelestialTracerFocus } from '../data/celestialTracerFocus.js';
import { getFocusedCinematicStreamlines } from './cinematicGeometryField.js';

const cache = new WeakMap();

export function getCelestialTracerGeometry(geometry, sceneIndex, portrait = false) {
  if (!geometry) return null;
  let entries = cache.get(geometry);
  if (!entries) { entries = new Map(); cache.set(geometry, entries); }
  const key = `primary-celestial:${sceneIndex}:${portrait}`;
  if (!entries.has(key)) entries.set(key, Object.freeze({
    ...geometry,
    streamlines: getFocusedCinematicStreamlines(geometry, getCelestialTracerFocus(sceneIndex, portrait), key),
  }));
  return entries.get(key);
}
