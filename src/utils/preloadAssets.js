function loadImage(url, decode) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = decode ? 'sync' : 'async';

    const finish = async (loaded) => {
      if (loaded && decode) {
        try {
          await image.decode();
        } catch (error) {
          // The load event still confirms the resource is locally available.
        }
      }
      resolve({ image, loaded });
    };

    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = url;
  });
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
      const result = await loadImage(resolveUrl(item.filename), item.decode);
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
