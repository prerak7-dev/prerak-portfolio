import { useSyncExternalStore } from 'react';
import { subscribeArtworkOrientation, usesPortraitArtwork } from '../data/cinematicViewport.js';

export function usePortraitArtwork() {
  return useSyncExternalStore(subscribeArtworkOrientation, usesPortraitArtwork, () => false);
}
