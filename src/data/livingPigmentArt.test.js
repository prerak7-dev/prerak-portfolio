import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { LIVING_PIGMENT_ATLAS } from './livingPigmentArt.js';

test('the generated pigment material has a persisted master, exact prompt and portable runtime asset', async () => {
  const provenance = JSON.parse(await readFile('scripts/cinematic-source/living-pigment-art-v1.json', 'utf8'));
  assert.equal(provenance.generator, 'built-in image_gen');
  assert.equal(provenance.transparentBackground, true);
  assert(provenance.prompt.length > 500);
  assert.equal(provenance.runtime, `public/${LIVING_PIGMENT_ATLAS}`);
  assert((await stat(provenance.master)).size > 10000);
  assert((await stat(provenance.runtime)).size > 10000);
});
