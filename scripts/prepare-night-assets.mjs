import { createRequire } from 'node:module';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(process.env.ASSET_NODE_MODULES || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const sharp = require('sharp');
const manifest = JSON.parse(await readFile('NewHomeBackgrounds/generated-night-scenes.json', 'utf8'));
for (const asset of manifest.assets) {
  const source = path.join(manifest.generatedDirectory, asset.source);
  const dir = path.join('public/cinematic/painted-v1', asset.theme, asset.theme === 'ui' ? '' : 'dark');
  await mkdir(dir, { recursive: true });
  let image = sharp(source);
  if (asset.theme === 'ui') {
    if (!(await image.metadata()).hasAlpha) throw new Error('The brush stroke requires genuine transparency.');
    image = image.resize({ width: 1536 });
  } else {
    image = image.resize(1672, 941, { fit: 'fill' });
  }
  await image.webp({ quality: 94, alphaQuality: 100, effort: 6 }).toFile(path.join(dir, `${asset.scene}.webp`));
}
console.log(`Prepared ${manifest.assets.length} night paintings / loader assets.`);
