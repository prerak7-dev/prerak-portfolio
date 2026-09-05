const pendingImageLoads = new Map();
const pendingAssetFetches = new Map();
const decodedImageCache = new Map();
const MAX_DECODED_IMAGE_CACHE = 36;

function retainDecodedImage(url, image) {
  decodedImageCache.delete(url);
  decodedImageCache.set(url, image);
  while (decodedImageCache.size > MAX_DECODED_IMAGE_CACHE) {
    const oldestUrl = decodedImageCache.keys().next().value;
    decodedImageCache.delete(oldestUrl);
  }
}

function requestAsset(url, priority = 'auto') {
  if (pendingAssetFetches.has(url)) return pendingAssetFetches.get(url);
  const pending = fetch(url, { cache: 'default', priority })
    .then((response) => ({ image: null, loaded: response.ok }))
    .catch(() => ({ image: null, loaded: false }));
  pendingAssetFetches.set(url, pending);
  pending.finally(() => pendingAssetFetches.delete(url));
  return pending;
}

function requestImage(url, priority = 'auto') {
  const cached = decodedImageCache.get(url);
  if (cached) {
    retainDecodedImage(url, cached);
    return Promise.resolve({ image: cached, loaded: true });
  }
  if (pendingImageLoads.has(url)) return pendingImageLoads.get(url);
  const pending = new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = priority;
    image.onload = () => {
      retainDecodedImage(url, image);
      resolve({ image, loaded: true });
    };
    image.onerror = () => resolve({ image, loaded: false });
    image.src = url;
  });
  pendingImageLoads.set(url, pending);
  pending.finally(() => pendingImageLoads.delete(url));
  return pending;
}

async function loadImage(url, decode, priority = 'auto') {
  if (!decode) return requestAsset(url, priority);
  const result = await requestImage(url, priority);
  if (result.loaded && decode) {
    try {
      await result.image.decode();
    } catch (error) {
      // The load event still confirms that the resource is locally available.
    }
  }
  return result;
}

export async function preloadImageUrl(url, priority = 'auto') {
  const result = await loadImage(url, true, priority);
  return result.loaded ? result.image : null;
}

export async function preloadAssetManifest(manifest, resolveUrl, onProgress, concurrency = 6) {
  const retainedImages = new Array(manifest.length);
  let cursor = 0;
  let completed = 0;

  const worker = async () => {
    while (cursor < manifest.length) {
      const index = cursor;
      cursor += 1;
      const item = manifest[index];
      const result = await loadImage(resolveUrl(item.filename), item.decode, item.priority);
      retainedImages[index] = item.decode ? result.image : null;
      completed += 1;
      onProgress?.(completed / manifest.length, item.filename);
    }
  };

  await Promise.all(Array.from(
    { length: Math.min(concurrency, manifest.length) },
    () => worker(),
  ));

  return retainedImages;
}

export async function preloadImageUrls(urls, concurrency = 4) {
  const retainedImages = new Array(urls.length);
  let cursor = 0;

  const worker = async () => {
    while (cursor < urls.length) {
      const index = cursor;
      cursor += 1;
      const result = await loadImage(urls[index], true, 'high');
      retainedImages[index] = result.image;
    }
  };

  await Promise.all(Array.from(
    { length: Math.min(concurrency, urls.length) },
    () => worker(),
  ));

  return retainedImages;
}
