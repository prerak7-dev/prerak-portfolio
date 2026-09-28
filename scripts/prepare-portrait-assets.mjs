import { createRequire } from 'node:module';
import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(process.env.ASSET_NODE_MODULES || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const sharp = require('sharp');
const root = process.cwd();
const directory = path.join(root, 'NewPortraitBackgrounds');
const manifest = JSON.parse(await readFile(path.join(directory, 'generated-scenes.json'), 'utf8'));
for (const asset of manifest.assets) {
  const name = `${asset.theme}-${asset.mode}-${asset.scene}.png`;
  const original = path.join(directory, name);
  try { await access(original); } catch { await copyFile(asset.source, original); }
  const metadata = await sharp(original).metadata();
  if (metadata.height < metadata.width * 1.7) throw new Error(`Not portrait artwork: ${name}`);
  const output = path.join(root, 'public/cinematic/painted-v1', asset.theme, asset.mode, 'portrait');
  await mkdir(output, { recursive: true });
  // Runtime encoding only: preserve the entire newly authored composition.
  await sharp(original).webp({ quality: 90, effort: 6 }).toFile(path.join(output, `${asset.scene}.webp`));
  asset.original = name;
  asset.width = metadata.width;
  asset.height = metadata.height;
}
await writeFile(path.join(directory, 'generated-scenes.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${manifest.assets.length} original portrait paintings without cropping.`);
