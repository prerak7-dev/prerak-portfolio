import { useEffect, useState } from 'react';
import { preloadImageUrl } from '../utils/preloadAssets.js';

export function useDecodedPaintingSource(source, imageRef) {
  const [displayedSource, setDisplayedSource] = useState(source);
  useEffect(() => {
    let cancelled = false;
    const image = imageRef.current;
    const loaded = () => {
      if (!cancelled && image?.getAttribute('src') === source && image.naturalWidth) setDisplayedSource(source);
    };
    const load = async () => {
      const decoded = await preloadImageUrl(source, 'high');
      if (cancelled || !decoded) return;
      setDisplayedSource(source);
      const image = imageRef.current;
      // A failed initial DOM request needs to be reassigned after its cached
      // preload recovers, even when React's source string has not changed.
      if (image?.getAttribute('src') === source && !image.naturalWidth) image.src = source;
    };
    load();
    image?.addEventListener('load', loaded);
    window.addEventListener('online', load);
    return () => { cancelled = true; image?.removeEventListener('load', loaded); window.removeEventListener('online', load); };
  }, [source, imageRef]);
  return displayedSource;
}
