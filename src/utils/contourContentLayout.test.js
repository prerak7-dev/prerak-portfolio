import test from 'node:test';
import assert from 'node:assert/strict';
import { getContourContentBounds } from './contourContentLayout.js';

test('content safe areas remain inside phone, tablet and desktop viewports', () => {
  for (const [width,height] of [[360,640],[390,667],[768,1024],[1440,900],[1920,1080]]) {
    const imageWidth = Math.max(width,height*16/9);
    const projection = {left:(width-imageWidth)/2,top:(height-imageWidth*9/16)/2,width:imageWidth,height:imageWidth*9/16};
    for (const chapter of ['intro','cores','projects']) {
      const bounds = getContourContentBounds(chapter,projection,width,height);
      assert.ok(bounds.left>=0);
      assert.ok(bounds.top>=0);
      assert.ok(bounds.left+bounds.width<=width);
      assert.ok(bounds.top+bounds.height<=height-100);
    }
  }
});

test('desktop project content stays left of the painted planetary limb', () => {
  const bounds = getContourContentBounds('projects',{left:0,top:0,width:1600,height:900},1600,900);
  assert.ok(bounds.left+bounds.width<1600*.64);
});
