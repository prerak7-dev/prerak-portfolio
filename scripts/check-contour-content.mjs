import { createRequire } from 'node:module';
const require = createRequire('C:/Users/prera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const [width,height] of [[1440,900],[390,667],[768,1024]]) {
    const page = await browser.newPage({ viewport: {width,height}, reducedMotion: 'reduce' });
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4187/prerak-portfolio/');
    await page.waitForTimeout(10000);
    await page.screenshot({path:`content-home-${width}.png`});
    for (const label of ['Cores','Case Studies']) {
      await page.locator('.chapter-rail-list button').filter({hasText:label}).click({force:true});
      await page.waitForTimeout(2000);
      await page.screenshot({path:`content-${label.replace(' ','-')}-${width}.png`});
      console.log({width,label,errors,bounds:await page.locator('.contour-content.is-present').evaluateAll(nodes=>nodes.map(n=>{
        const r=n.getBoundingClientRect(); const f=n.querySelector('.contour-focus').getBoundingClientRect(); const foot=n.querySelector('footer').getBoundingClientRect();
        const children=[...n.querySelector('.contour-focus').children].map(c=>c.getBoundingClientRect());
        return {x:r.x,y:r.y,w:r.width,h:r.height,overflow:n.scrollHeight>n.clientHeight+2,bodyOverFooter:children.some(c=>c.bottom>foot.top), bodyHeight:f.height};
      }))});
      if (width === 390 && label === 'Case Studies') {
        const overflow = [];
        for (let i=0;i<70;i++) {
          const result = await page.locator('.contour-projects .contour-focus').evaluate(n=>{
            const footer=n.parentElement.querySelector('footer').getBoundingClientRect();
            return {text:n.innerText,overlap:[...n.children].some(c=>c.getBoundingClientRect().bottom>footer.top-2)};
          });
          if(result.overlap) overflow.push(result);
          const next=page.getByRole('button',{name:'Next project detail',exact:true});
          if(await next.isDisabled()) break;
          await next.click();
          await page.waitForTimeout(30);
        }
        console.log('All mobile detail steps',overflow);
      }
    }
    await page.close();
  }
} finally {await browser.close();}
