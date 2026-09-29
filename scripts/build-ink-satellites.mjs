import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const sharp = require('sharp');
const sourceDirectory = process.argv[2];
assert(sourceDirectory, 'Pass the directory containing the generated source PNGs');
const manifest = JSON.parse(await readFile(new URL('./cinematic-source/satellite-ink-v2.json', import.meta.url)));
for (const entry of manifest.entries) {
  const source = resolve(sourceDirectory, entry.source);
  assert((await sharp(source).metadata()).hasAlpha, `${entry.source} has no generated alpha`);
  const destination = fileURLToPath(new URL(`../public/${entry.output}`, import.meta.url));
  await mkdir(dirname(destination), { recursive: true });
  await sharp(source).resize(128, 128).webp({ lossless: true }).toFile(destination);
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let transparent = 0;
  for (let pixel = 3; pixel < data.length; pixel += 4) if (data[pixel] < 16) transparent++;
  assert(transparent / (info.width * info.height) > .6, `${entry.source} is too solid`);
  assert(data[((Math.floor(info.height / 2) * info.width + Math.floor(info.width / 2)) * 4) + 3] < 16, 'Satellite center must be transparent');
  console.log(`${entry.season}/${entry.mode}: ${(100 * transparent / (info.width * info.height)).toFixed(1)}% transparent`);
}
