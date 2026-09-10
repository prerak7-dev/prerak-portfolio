import { createRequire } from 'node:module';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(process.env.ASSET_NODE_MODULES || 'C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const sharp = require('sharp');
const root = process.cwd();
const input = path.join(root, 'NewHomeBackgrounds');
const output = path.join(root, 'public/cinematic/painted-v1');
const imagePath = stamp => path.join(input, `Codex Image Sep 9, 2026, ${stamp} PM.png`);
const seasons = ['default', 'fall', 'spring', 'winter'];
const homes = {
  default: ['11_49_35', '11_51_54'], fall: ['11_52_13', '11_52_25'],
  spring: ['11_52_30', '11_52_37'], winter: ['11_52_43', '11_52_50'],
};
for (const season of seasons) {
  for (const [row, mode] of ['light', 'dark'].entries()) {
    const dir = path.join(output, season, mode);
    await mkdir(dir, { recursive: true });
    await sharp(imagePath(homes[season][row])).webp({ quality: 94, effort: 6 }).toFile(path.join(dir, 'home.webp'));
    for (const [kind, stamp] of [['avatar', '11_52_07'], ['satellite', '11_52_19']]) {
      const source = imagePath(stamp);
      const { width, height, hasAlpha } = await sharp(source).metadata();
      if (!hasAlpha) throw new Error(`${kind} must preserve original transparency`);
      const col = seasons.indexOf(season);
      const left = Math.round(col * width / 4), top = Math.round(row * height / 2);
      const tile = { left, top, width: Math.round((col + 1) * width / 4) - left, height: Math.round((row + 1) * height / 2) - top };
      // Grid extraction only: preserve the artist's cutout and natural padding.
      await sharp(source).extract(tile).resize(448, 448, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 95, alphaQuality: 100 }).toFile(path.join(dir, `${kind}.webp`));
    }
  }
}
const manifest = JSON.parse(await readFile(path.join(input, 'generated-scenes.json'), 'utf8'));
for (const asset of manifest.assets) {
  if (!asset.source) throw new Error(`Missing ${asset.theme}/${asset.scene}`);
  await sharp(path.join(manifest.generatedDirectory, asset.source)).resize(1672, 941, { fit: 'fill' }).webp({ quality: 94, effort: 6 })
    .toFile(path.join(output, asset.theme, 'light', `${asset.scene}.webp`));
}
console.log('Prepared 28 paintings and 16 alpha-preserving UI cutouts.');
