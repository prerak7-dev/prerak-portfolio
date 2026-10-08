export async function retryAssetLoad(load, {
  loaded = result => Boolean(result?.loaded),
  delays = [160, 480],
  wait = delay => new Promise(resolve => setTimeout(resolve, delay)),
} = {}) {
  let result;
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    result = await load();
    if (loaded(result) || attempt === delays.length) return result;
    await wait(delays[attempt]);
  }
  return result;
}
