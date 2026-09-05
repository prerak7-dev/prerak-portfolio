import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, 'public');
const outputRoot = path.join(projectRoot, 'dist');
const themes = ['default', 'fall', 'spring', 'winter'];
const sceneNames = ['cores', 'systems', 'chronology', 'field', 'surface'];
const runtimeCinematicFiles = new Set(['cinematic/ui/text-distress-mask.png']);
runtimeCinematicFiles.add('cinematic/ui/boot-celestial-v1.webp');
runtimeCinematicFiles.add('cinematic/default/ui/control-slab-gate-watercolor-v10.webp');
runtimeCinematicFiles.add('cinematic/spring/ui/control-slab-gate-watercolor-v10.webp');

for (const theme of themes) {
  for (let frame = 0; frame < 24; frame += 1) {
    const name = `frame-${String(frame).padStart(2, '0')}.webp`;
    runtimeCinematicFiles.add(`cinematic/${theme}/gateway/cosmic-frames-v9/${name}`);
    runtimeCinematicFiles.add(`cinematic/${theme}/gateway/cosmic-frames-v9-compact/${name}`);
    runtimeCinematicFiles.add(`cinematic/${theme}/geometry/gateway/cosmic-frames-v9/${name}`);
  }

  runtimeCinematicFiles.add(`cinematic/${theme}/particles-watercolor.webp`);
  runtimeCinematicFiles.add(`cinematic/${theme}/topology-rope-segment-watercolor-v2.webp`);
  runtimeCinematicFiles.add(`cinematic/${theme}/cores-compact.webp`);
  sceneNames.forEach((scene) => {
    runtimeCinematicFiles.add(`cinematic/${theme}/${scene}.webp`);
    runtimeCinematicFiles.add(`cinematic/${theme}/geometry/${scene}-flow.webp`);
  });
}

runtimeCinematicFiles.add('cinematic/fall/seasonal-vines-watercolor-v1.webp');
runtimeCinematicFiles.add('cinematic/spring/seasonal-vines-watercolor-v1.webp');

function normalizePath(value) {
  return value.split(path.sep).join('/');
}

function shouldCopy(relativePath) {
  const normalized = normalizePath(relativePath);
  return !normalized.startsWith('cinematic/') || runtimeCinematicFiles.has(normalized);
}

let copiedFiles = 0;
let copiedBytes = 0;

async function copyRuntimeTree(relativeDirectory = '') {
  const sourceDirectory = path.join(sourceRoot, relativeDirectory);
  const entries = await readdir(sourceDirectory, { withFileTypes: true });

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) {
      await copyRuntimeTree(relativePath);
      continue;
    }
    if (!entry.isFile() || !shouldCopy(relativePath)) continue;

    const sourcePath = path.join(sourceRoot, relativePath);
    const outputPath = path.join(outputRoot, relativePath);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await copyFile(sourcePath, outputPath);
    const file = await stat(sourcePath);
    copiedFiles += 1;
    copiedBytes += file.size;
  }
}

await copyRuntimeTree();

const runtimeMegabytes = (copiedBytes / (1024 * 1024)).toFixed(1);
console.log(`Copied ${copiedFiles} runtime public assets (${runtimeMegabytes} MB); legacy source generations were excluded.`);
