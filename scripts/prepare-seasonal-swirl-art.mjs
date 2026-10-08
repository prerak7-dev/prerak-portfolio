import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const sharp = require('sharp');
const manifest = JSON.parse(await readFile(new URL('./cinematic-source/seasonal-swirl-art-v1.json', import.meta.url)));
assert(process.argv[2], 'Pass the generated sprite-sheet PNG');
const source = resolve(process.argv[2]);
const metadata = await sharp(source).metadata();
assert(metadata.hasAlpha && metadata.width === metadata.height, 'The atlas must be square and have genuine alpha');
const master = resolve('scripts/cinematic-source', manifest.source);
await mkdir(dirname(master), { recursive: true }); await copyFile(source, master);
const destination = resolve(manifest.output);
await mkdir(dirname(destination), { recursive: true });
await sharp(source).resize(1024, 1024).webp({ quality: 94, alphaQuality: 100 }).toFile(destination);
const { data, info } = await sharp(destination).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
assert(data[3] < 8, 'The atlas must not contain an opaque paper background');
for (let row = 0; row < 4; row++) for (let column = 0; column < 4; column++) {
  let coverage = 0;
  for (let y = row * 256; y < (row + 1) * 256; y++) for (let x = column * 256; x < (column + 1) * 256; x++) {
    coverage += Number(data[(y * info.width + x) * 4 + 3] > 16);
  }
  assert(coverage > 1000 && coverage < 256 * 256 * .8, `Cell ${row},${column} must contain a separate painted element`);
}
console.log(destination);
