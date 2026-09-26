import test from 'node:test';
import assert from 'node:assert/strict';
import { paginateReadingBlocks } from './readingPages.js';

test('records move as whole blocks instead of being cut at a pixel interval', () => {
  const blocks = [{ top: 0, bottom: 80 }, { top: 104, bottom: 194 }, { top: 218, bottom: 280 }];
  assert.deepEqual(paginateReadingBlocks(blocks, 200), [{ start: 0, end: 194 }, { start: 218, end: 280 }]);
  assert.deepEqual(paginateReadingBlocks(blocks, 100), blocks.map(({ top, bottom }) => ({ start: top, end: bottom })));
});

test('oversized passages split only at full line boundaries without losing lines', () => {
  const lines = Array.from({ length: 12 }, (_, index) => ({ top: index * 24, bottom: index * 24 + 20 }));
  const pages = paginateReadingBlocks([{ top: 0, bottom: 284, lines }], 90);
  assert.equal(pages.length, 4);
  for (const page of pages) assert(page.end - page.start <= 90);
  for (const line of lines) assert.equal(pages.filter(page => line.top >= page.start && line.bottom <= page.end).length, 1);
});

test('short passages and parallel Home blocks remain fully visible', () => {
  assert.deepEqual(paginateReadingBlocks([{ top: 0, bottom: 100 }, { top: 0, bottom: 80 }], 120), [{ start: 0, end: 100 }]);
  assert.deepEqual(paginateReadingBlocks([], 120), [{ start: 0, end: 0 }]);
});
