import test from 'node:test';
import assert from 'node:assert/strict';
import { interpolateRailLayout, separateRailItems, railItemsOverlap } from './chapterRailLayout.js';

test('rail packing keeps complete targets separate inside the viewport', () => {
  for (const [width, height] of [[1440, 900], [1366, 650], [768, 1024], [1024, 500]]) {
    const bounds = { left: 16, right: width - 16, top: 82, bottom: height - 78 };
    for (let frame = 0; frame < 100; frame++) {
      const items = separateRailItems(Array.from({ length: 7 }, (_, index) => ({
        x: width * (.15 + .8 * Math.sin((index + frame) * .2)),
        y: height * (.15 + .8 * Math.cos((index + frame) * .2)),
        width: 100 + index * 10, height: 44,
      })), bounds);
      for (const [i, a] of items.entries()) {
        assert(a.x >= bounds.left && a.x + a.width <= bounds.right + .01);
        assert(a.y >= bounds.top && a.y + a.height <= bounds.bottom + .01);
        for (const b of items.slice(i + 1)) assert(!railItemsOverlap(a, b, 5.9));
      }
    }
  }
});

test('lane journeys remain disjoint and settle exactly on their curves in both directions', () => {
  for (const [width, height] of [[1440,900], [1366,650], [768,1024]]) {
    const bounds = { left:16, right:width-16, top:82, bottom:height-78 };
    const sizes = [110,113,174,157,153,164,135];
    const layouts = [false, true].flatMap(horizontal => [0, .25, .5].map(offset => {
      const routes = new Map();
      const axis = horizontal && sizes.reduce((a,b)=>a+b+6,-6) <= width-32 ? 'x' : 'y';
      for(let i=0;i<7;i++) for(let j=i+1;j<7;j++) routes.set(`${i}:${j}`, {axis,sign:-1});
      return separateRailItems(sizes.map((size,i)=>({
        x: horizontal ? width*(.12+i*.1) : width*(.15+offset)+Math.sin(i*.4)*50,
        y: horizontal ? height*(.35+offset)+Math.sin(i*.7)*10 : 85+i*(height-210)/7,
        width:size, height:44,
      })), bounds, 6, routes);
    }));
    for (const from of layouts) for (const to of layouts) {
      for (let frame=0;frame<=120;frame++) {
        const items=interpolateRailLayout(from,to,frame/120,bounds);
        for(let i=0;i<7;i++) for(let j=i+1;j<7;j++) assert(!railItemsOverlap(items[i],items[j],5.8), `${width}: frame ${frame}, ${i}/${j}`);
      }
      assert.deepEqual(interpolateRailLayout(from,to,1,bounds),to);
    }
  }
});
