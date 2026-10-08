import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const require = createRequire(process.env.PLAYWRIGHT_PACKAGE || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const sharp = require('sharp');
const manifest = JSON.parse(await readFile(new URL('./cinematic-source/gate-stone-seal-v1.json', import.meta.url)));
assert(process.argv[2], 'Pass the directory containing the generated PNG');
const source = resolve(process.argv[2], manifest.source);
assert((await sharp(source).metadata()).hasAlpha, 'The generated seal must have genuine alpha');
const destination = resolve('public', manifest.output);
await mkdir(dirname(destination), { recursive: true });
await sharp(source).trim({ threshold: 8 }).resize(256, 256, { fit: 'contain', background: '#00000000' }).webp({ quality: 90, alphaQuality: 100 }).toFile(destination);
const { data, info } = await sharp(destination).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
assert.equal(data[3], 0, 'Outside of the stone must remain transparent');
assert(data[(Math.floor(info.height / 2) * info.width + Math.floor(info.width / 2)) * 4 + 3] > 250, 'The stone must remain solid');
console.log(destination);
