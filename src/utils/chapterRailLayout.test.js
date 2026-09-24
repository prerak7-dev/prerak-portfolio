import test from 'node:test';
import assert from 'node:assert/strict';
import { createRailJourney, interpolateRailLayout, separateRailItems, railItemsOverlap } from './chapterRailLayout.js';

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

test('flights stay within the viewport and arrive with continuous velocity and acceleration', () => {
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
      const journey = createRailJourney(from, to, bounds);
      const frames = [];
      for (let frame=0;frame<=120;frame++) {
        const items = journey(frame/120);
        frames.push(items);
        for (const item of items) {
          assert(item.x >= bounds.left - .1 && item.x + item.width <= bounds.right + .1, `${width}: contour outside horizontal bounds at ${frame}`);
          assert(item.y >= bounds.top - .1 && item.y + item.height <= bounds.bottom + .1, `${height}: contour outside vertical bounds`);
        }
      }
      from.forEach((point, i) => {
        const distance = Math.hypot(to[i].x - point.x, to[i].y - point.y);
        const steps = frames.slice(1).map((items, f) => ({ x: items[i].x - frames[f][i].x, y: items[i].y - frames[f][i].y }));
        assert(steps.reduce((sum, step) => sum + Math.hypot(step.x, step.y), 0) <= distance * 1.4 + .001, 'Orbit made an unnecessary extra turn');
        for (const step of [steps[0], steps.at(-1)]) assert(Math.hypot(step.x, step.y) < distance * .00003 + .001, 'Abrupt departure or arrival');
        const accelerations = steps.slice(1).map((step, f) => ({ x: step.x - steps[f].x, y: step.y - steps[f].y }));
        accelerations.forEach((acceleration, f) => {
          assert(Math.hypot(acceleration.x, acceleration.y) < distance * .002 + .001, 'Velocity discontinuity');
          if (f) assert(Math.hypot(acceleration.x - accelerations[f - 1].x, acceleration.y - accelerations[f - 1].y) < distance * .0002 + .001, 'Acceleration discontinuity');
        });
      });
      assert.deepEqual(interpolateRailLayout(from,to,1,bounds),to);
      assert.deepEqual(journey(1), to);
    }
  }
});

test('crossing flights may overlap without repelling or stopping one another', () => {
  const bounds = { left: 16, right: 1000, top: 82, bottom: 822 };
  const from = [{ x: 100, y: 200, width: 100, height: 44 }, { x: 700, y: 200, width: 100, height: 44 }];
  const to = [from[1], from[0]];
  const journey = createRailJourney(from, to, bounds);
  assert(railItemsOverlap(...journey(.5)), 'Flights should cross freely');
  assert(journey(.5)[0].y > 390, 'Missing orbital sweep');
  assert(journey(.6)[0].x > journey(.4)[0].x + 150, 'Flight hesitated at the crossing');
  assert.deepEqual(journey(0), from);
  assert.deepEqual(journey(1), to);
});

test('satellites travel a true elliptical orbit with tangential departure', () => {
  const bounds = { left: 16, right: 1100, top: 82, bottom: 822 };
  const from = [{ x: 200, y: 200, width: 100, height: 44 }];
  const to = [{ ...from[0], x: 800 }];
  const journey = createRailJourney(from, to, bounds);
  const minorRadius = journey(.5)[0].y - 200;
  assert(minorRadius > 190);
  for (let frame = 1; frame < 120; frame++) {
    const point = journey(frame / 120)[0];
    const ellipse = ((point.x - 500) / 300) ** 2 + ((point.y - 200) / minorRadius) ** 2;
    assert(Math.abs(ellipse - 1) < .000001, 'Satellite left its elliptical orbit');
  }
  const departure = journey(.1)[0];
  assert(departure.y - 200 > (departure.x - 200) * 10, 'Departure should sweep tangentially around the orbit');
});

test('the rail bends throughout the handoff without a straight transit-lane plateau', () => {
  const bounds = { left: 16, right: 1424, top: 82, bottom: 822 };
  const from = Array.from({ length: 7 }, (_, i) => ({ x: 900 + i * i * 5, y: 100 + i * 65, width: 130, height: 44 }));
  const to = from.map((item, i) => ({ ...item, x: 180 + i * 170, y: 670 + Math.sin(i * .7) * 30 }));
  for (const t of [.25, .4, .5, .6, .75]) {
    const a = interpolateRailLayout(from, to, t, bounds);
    const b = interpolateRailLayout(from, to, t + .01, bounds);
    for (const axis of ['x', 'y']) {
      assert(a.reduce((sum, point, i) => sum + Math.abs(point[axis] - b[i][axis]), 0) > 1, `${axis} froze during the contour morph at ${t}`);
    }
    const reverse = interpolateRailLayout(to, from, 1 - t, bounds);
    a.forEach((point, i) => assert(Math.hypot(point.x - reverse[i].x, point.y - reverse[i].y) < .001));
  }
});
