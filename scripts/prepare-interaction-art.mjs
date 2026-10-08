import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const sharp = require('sharp');
const root = process.argv[2];
assert(root, 'Pass the directory containing the two generated PNGs');
const source = resolve('scripts/cinematic-source/generated');
const destination = resolve('public/cinematic/painted-v1/ui');
await mkdir(source, { recursive: true }); await mkdir(destination, { recursive: true });
const seal = resolve(root, 'exec-13a24085-e598-4d48-8da4-9ec6353fa57c.png');
const brush = resolve(root, 'exec-4d542537-dd7e-49bc-b594-c068d31ebaae.png');
for (const file of [seal, brush]) assert((await sharp(file).metadata()).hasAlpha, 'Generated artwork must have genuine alpha');
await copyFile(seal, resolve(source, 'gate-carved-cross-v2.png'));
await copyFile(brush, resolve(source, 'ink-contour-brushes-v1.png'));
await sharp(seal).trim({ threshold: 8 }).resize(384, 384, { fit: 'contain', background: '#00000000' })
  .webp({ quality: 94, alphaQuality: 100 }).toFile(resolve(destination, 'gate-carved-cross-v2.webp'));
// Pack complete generated ribbons into uniform lanes without cropping their tails.
const ranges = [[20, 279], [295, 440], [466, 665], [671, 870]];
const metadata = await sharp(brush).metadata();
const layers = [];
for (let index = 0; index < ranges.length; index++) {
  const [top, bottom] = ranges[index];
  const tile = await sharp(brush).extract({ left: 0, top, width: metadata.width, height: bottom - top + 1 })
    .resize(2048, 236, { fit: 'fill' }).extend({ top: 10, bottom: 10, left: 0, right: 0, background: '#00000000' }).png().toBuffer();
  layers.push({ input: tile, left: 0, top: index * 256 });
}
await sharp({ create: { width: 2048, height: 1024, channels: 4, background: '#00000000' } }).composite(layers)
  .webp({ quality: 92, alphaQuality: 100 }).toFile(resolve(destination, 'ink-contour-brushes-v1.webp'));
console.log('Prepared transparent carved seal and four-lane generated brush atlas.');
