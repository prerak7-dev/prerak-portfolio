export const styles = `
:root{color-scheme:dark;font-size:92%;--bg:#02070d;--panel:rgba(5,13,22,.76);--line:rgba(133,239,255,.18);--cyan:#22d3ee;--cyan2:#67e8f9;--gold:#fbbf24;--text:#f8fafc;--muted:#9fb0c7;--radius:32px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-width:320px;background:var(--bg);color:var(--text)}a{color:inherit;text-decoration:none}button,input{font:inherit}button{cursor:pointer}.site{position:relative;min-height:92vh;overflow:hidden;background:#02070d}.world-backdrop{position:fixed;inset:0;z-index:0;display:block;background:#02070d}.world-foreground{position:fixed;inset:0;z-index:18;display:block;pointer-events:none;filter:drop-shadow(0 0 18px rgba(34,211,238,.22))}.foreground-fade{position:fixed;left:0;right:0;bottom:0;height:17vh;z-index:17;pointer-events:none;background:linear-gradient(to bottom,rgba(2,7,13,0) 0%,rgba(2,7,13,.08) 42%,rgba(2,7,13,.34) 74%,rgba(2,7,13,.9) 100%);backdrop-filter:blur(.7px);mask-image:linear-gradient(to bottom,transparent 0,#000 42%,#000 100%)}.ambient-grid{pointer-events:none;position:fixed;inset:0;z-index:2;opacity:.78;background:linear-gradient(rgba(34,211,238,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.035) 1px,transparent 1px),radial-gradient(circle at 80% 20%,rgba(34,211,238,.14),transparent 28rem);background-size:72px 72px,72px 72px,auto;mask-image:linear-gradient(to bottom,#000 0%,#000 84%,transparent 100%)}.site:after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(2,7,13,.92) 0%,rgba(2,7,13,.46) 42%,rgba(2,7,13,.2) 100%),linear-gradient(to bottom,rgba(2,7,13,.28),rgba(2,7,13,.05) 42%,rgba(2,7,13,.92))}.nav-shell{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:50;display:flex;align-items:center;justify-content:space-between;gap:20px;width:min(1240px,calc(100% - 28px));padding:12px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(0,0,0,.6);backdrop-filter:blur(22px);box-shadow:0 24px 90px rgba(0,0,0,.42)}.brand{display:flex;align-items:center;gap:12px;min-width:max-content}.brand strong{display:block;letter-spacing:.18em;text-transform:uppercase;font-size:.82rem}.brand small{display:block;margin-top:2px;color:var(--muted);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase}.nav-shell nav{display:flex;gap:clamp(12px,2.4vw,30px);color:#dbeafe;font-size:.92rem}.nav-shell nav a{opacity:.84;transition:.2s}.nav-shell nav a:hover{color:var(--cyan);opacity:1}.nav-cta{border:1px solid rgba(251,191,36,.36);background:rgba(251,191,36,.1);color:#fde68a;padding:11px 18px;border-radius:999px;font-weight:900;white-space:nowrap}.mark{position:relative;width:38px;height:42px;filter:drop-shadow(0 0 15px rgba(34,211,238,.65));flex:0 0 auto}.mark i{position:absolute;bottom:2px;left:50%;width:4px;height:40px;border-radius:999px;background:linear-gradient(#fef3c7,#22d3ee);transform:translateX(-50%)}.mark i:nth-child(2){left:28%;height:32px;transform:rotate(-25deg)}.mark i:nth-child(3){left:72%;height:32px;transform:rotate(25deg)}.panel-card{position:relative;border:1px solid var(--line);background:linear-gradient(145deg,rgba(7,17,27,.82),rgba(3,8,14,.68));border-radius:var(--radius);box-shadow:0 28px 90px rgba(0,0,0,.38);backdrop-filter:blur(22px);overflow:hidden;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .16s ease,border-color .2s ease,opacity .28s ease;will-change:transform,opacity}.panel-card:before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(34,211,238,.16),transparent 42%);opacity:.78;pointer-events:none}.sector,.shortcut-rail{position:relative;z-index:8;width:min(1080px,calc(100% - 120px));margin:0 auto}.hero-sector{min-height:100vh;display:grid;grid-template-columns:minmax(0,.96fr) minmax(260px,.48fr);gap:20px;align-items:end;padding:118px 0 58px}.hero-copy{padding:clamp(22px,4vw,42px)}.eyebrow{margin:0 0 16px;color:var(--cyan);font-size:.78rem;font-weight:1000;letter-spacing:.22em;text-transform:uppercase}.hero-copy h1{margin:0;font-size:clamp(3.6rem,8.4vw,7.4rem);line-height:.82;letter-spacing:-.09em;text-transform:uppercase;text-shadow:0 0 28px rgba(103,232,249,.12)}.hero-copy h2{margin:26px 0 0;max-width:780px;font-size:clamp(1.45rem,2.6vw,2.55rem);line-height:1.05;letter-spacing:-.055em}.hero-copy h2 span,.footer-shell h2{color:var(--gold)}.hero-lede{margin:24px 0 0;max-width:720px;color:#d8e4f5;font-size:1.06rem;line-height:1.78}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.hero-actions a{border:1px solid rgba(133,239,255,.24);background:rgba(8,20,31,.78);padding:14px 18px;border-radius:17px;font-weight:1000}.hero-actions .primary-action{border:0;background:linear-gradient(135deg,#67e8f9,#22d3ee);color:#021018;box-shadow:0 0 38px rgba(34,211,238,.28)}.metrics-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:28px}.metrics-row span{border:1px solid rgba(133,239,255,.16);background:rgba(0,0,0,.28);border-radius:18px;padding:14px}.metrics-row strong{display:block}.metrics-row small{display:block;margin-top:4px;color:var(--muted)}.exploration-note{align-self:end;padding:24px}.exploration-note strong{display:block;color:#fde68a;font-size:1.25rem}.exploration-note p,.exploration-note small{display:block;color:#cbd5e1;line-height:1.65;margin:10px 0 0}.floating-hud{position:fixed;right:18px;bottom:18px;z-index:45;width:min(280px,calc(100% - 36px));border:1px solid rgba(133,239,255,.2);border-radius:24px;background:rgba(0,0,0,.5);backdrop-filter:blur(22px);box-shadow:0 22px 80px rgba(0,0,0,.46);padding:14px}.hud-status span{display:block;color:var(--cyan2);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:1000}.hud-status strong{display:block;margin-top:5px}.hud-status small,.hud-note{display:block;color:#cbd5e1;line-height:1.45}.hud-row{display:flex;gap:8px;margin-top:10px}.hud-row button{flex:1;border:1px solid rgba(133,239,255,.2);border-radius:999px;background:rgba(6,15,24,.82);color:#e0f7ff;padding:9px 10px;font-weight:900}.hud-row button.active{border-color:rgba(34,211,238,.8);background:rgba(34,211,238,.16);box-shadow:0 0 18px rgba(34,211,238,.2)}.intensity-control{display:flex;align-items:center;gap:10px;margin-top:12px;color:#dbeafe;font-weight:900}.intensity-control input{width:100%;accent-color:var(--cyan)}.hud-note{margin-top:10px}.mission-map{position:fixed;left:12px;top:50%;transform:translateY(-50%) scale(.9);transform-origin:left center;z-index:44;display:grid;gap:8px;padding:11px;border:1px solid rgba(133,239,255,.18);border-radius:26px;background:rgba(0,0,0,.42);backdrop-filter:blur(18px)}.mission-map strong{display:block;justify-self:start;color:#fde68a;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;padding:0 4px 4px}.mission-map a{display:grid;grid-template-columns:34px auto;align-items:center;gap:8px;min-width:128px;padding:6px;border:1px solid rgba(133,239,255,.12);border-radius:14px;background:rgba(4,12,20,.7);position:relative}.mission-map a span{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(133,239,255,.16);border-radius:50%;font-size:.75rem;font-weight:1000}.mission-map a em{font-style:normal;white-space:nowrap;color:#dffbff;opacity:.88}.mission-map a.active{background:rgba(251,191,36,.12);border-color:rgba(251,191,36,.35)}.mission-map a.active span{border-color:rgba(251,191,36,.4);color:#fde68a}.mission-map a.active em{color:#fde68a}.profile-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid rgba(133,239,255,.4);box-shadow:0 0 0 2px rgba(4,12,20,.8),0 0 18px rgba(34,211,238,.18);flex:0 0 auto}.shortcut-rail{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-top:-20px;margin-bottom:42px}.shortcut-card{padding:18px;min-height:128px}.shortcut-card span{display:block;color:var(--cyan);font-size:.72rem;text-transform:uppercase;letter-spacing:.16em;font-weight:1000}.shortcut-card strong{display:block;margin-top:10px;font-size:1.1rem;line-height:1.2}.shortcut-card em{display:block;margin-top:14px;color:#fde68a;font-style:normal;font-weight:1000}.section-wrap{padding:62px 0;scroll-margin-top:120px}.section-heading{margin-bottom:28px}.section-heading.split{display:grid;grid-template-columns:1fr minmax(280px,440px);gap:30px;align-items:end}.section-heading h2{margin:0;font-size:clamp(1.8rem,3.3vw,3.15rem);line-height:.96;letter-spacing:-.06em}.section-heading p:not(.eyebrow){margin:0;color:#cbd5e1;line-height:1.72}.project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.project-card{padding:24px}.card-glow{position:absolute;inset:auto -20% -40% auto;width:60%;height:70%;background:radial-gradient(circle,rgba(34,211,238,.18),transparent 60%);pointer-events:none}.project-topline{display:flex;align-items:center;gap:12px}.project-topline span{display:grid;place-items:center;width:48px;height:48px;border:1px solid rgba(251,191,36,.36);border-radius:16px;color:#fde68a;font-weight:1000}.project-topline em{color:var(--cyan);font-style:normal;text-transform:uppercase;letter-spacing:.12em;font-size:.76rem;font-weight:1000}.project-visual{margin:20px 0;min-height:155px;border:1px solid rgba(133,239,255,.14);border-radius:26px;background:radial-gradient(circle at 50% 40%,rgba(34,211,238,.15),transparent 55%),rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:18px}.flow-node{display:flex;align-items:center;gap:8px}.flow-node span{display:grid;place-items:center;min-width:72px;min-height:54px;border:1px solid rgba(133,239,255,.22);border-radius:16px;color:#dffbff;text-transform:uppercase;font-weight:1000;font-size:.72rem}.flow-node em{color:var(--cyan);font-style:normal}.project-card h3{margin:0;font-size:clamp(1.45rem,2.1vw,2.05rem);letter-spacing:-.04em}.project-card p{color:#d4e3f3;line-height:1.7}.chip-row{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.chip{display:inline-flex;align-items:center;border:1px solid rgba(133,239,255,.17);border-radius:999px;background:rgba(3,10,17,.74);color:#e6fbff;padding:8px 11px;font-size:.82rem;font-weight:850}.project-card ul{margin:18px 0 0;padding:0;list-style:none;display:grid;gap:10px;color:#cbd5e1}.project-card li:before{content:"✓";color:var(--cyan);margin-right:8px}.architecture-panel{padding:38px;border-radius:38px}.pipeline{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px}.pipeline article{position:relative;border:1px solid rgba(133,239,255,.15);background:rgba(0,0,0,.28);border-radius:24px;padding:18px;min-height:190px}.pipeline article:not(:last-child):after{content:"→";position:absolute;right:-13px;top:50%;transform:translateY(-50%);color:var(--cyan);font-weight:1000;z-index:3}.pipeline span{color:var(--gold);font-weight:1000}.pipeline h3{font-size:1rem}.pipeline p{color:#afc2d7;line-height:1.5;font-size:.9rem}.experience-grid,.stack-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.experience-card,.stack-grid article{padding:24px}.experience-card>p:first-child{margin:0;color:var(--gold);font-weight:900}.experience-card h3{margin:14px 0 4px;font-size:1.7rem}.experience-card h4{margin:0;color:var(--cyan)}.experience-card p:last-child{color:#cbd5e1;line-height:1.72}.stack-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.stack-grid h3{margin:0 0 16px;color:#dffbff}.stack-grid div{display:flex;flex-wrap:wrap;gap:8px}.footer-shell{z-index:8;display:flex;align-items:flex-start;justify-content:space-between;gap:26px;margin:62px auto 20px;padding:32px}.footer-shell>div:first-child{display:grid;justify-items:start;gap:10px}.footer-shell h2{margin:4px 0 0;font-size:clamp(1.8rem,3vw,3rem);letter-spacing:-.045em}.footer-shell p{color:#cbd5e1}.scroll-finish-spacer{position:relative;z-index:3;height:min(42vh,420px)}.contact-links{display:grid;gap:10px;min-width:min(420px,100%)}.contact-links a{border:1px solid rgba(133,239,255,.17);background:rgba(0,0,0,.28);border-radius:18px;padding:14px 16px}@media (max-width:1180px){.mission-map{display:none}.sector,.shortcut-rail{width:min(100% - 44px,1040px)}.hero-sector{grid-template-columns:1fr}.shortcut-rail{grid-template-columns:repeat(2,minmax(0,1fr))}.project-grid,.experience-grid{grid-template-columns:1fr}.stack-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline article:not(:last-child):after{display:none}}@media (max-width:760px){:root{font-size:85%}.world-foreground{z-index:7;opacity:.65}.nav-shell{align-items:flex-start;border-radius:28px}.nav-shell nav{display:none}.nav-cta{display:none}.sector,.shortcut-rail{width:min(100% - 22px,1240px)}.hero-sector{padding-top:120px}.hero-copy{padding:28px 20px}.hero-copy h1{font-size:clamp(3.4rem,18vw,6rem)}.metrics-row,.stack-grid,.section-heading.split,.shortcut-rail{grid-template-columns:1fr}.floating-hud{position:relative;right:auto;bottom:auto;width:min(100% - 22px,1240px);height:auto;margin:0 auto 30px;z-index:22;border-radius:28px}.floating-hud .hud-status strong,.floating-hud .hud-status small,.floating-hud .hud-row,.floating-hud .intensity-control,.floating-hud .hud-note{opacity:1;visibility:visible;max-height:220px}.footer-shell{display:block}.contact-links{margin-top:20px}.project-card{padding:18px}.project-visual{justify-content:flex-start}.flow-node span{min-width:62px}}:is(.panel-card,.nav-shell,.nav-cta,.hero-actions a,.metrics-row span,.floating-hud,.hud-row button,.mission-map,.mission-map a,.mission-map a span,.profile-avatar,.shortcut-card,.project-card,.project-topline span,.project-visual,.flow-node span,.chip,.architecture-panel,.pipeline article,.experience-card,.stack-grid article,.footer-shell,.contact-links a){border-radius:0!important;clip-path:polygon(0 0,calc(100% - var(--fold,18px)) 0,100% var(--fold,18px),100% 100%,0 100%)}.profile-avatar{object-fit:cover}.mark i{border-radius:0!important}.nav-shell{--fold:22px}.panel-card,.floating-hud,.mission-map{--fold:24px}.hud-row button,.chip,.nav-cta,.hero-actions a,.contact-links a{--fold:12px}`;

export const portraitStyles = `
.portrait-background{
  position:fixed;
  top:-22px;
  right:-138px;
  z-index:3;
  width:min(64vw,827px);
  height:min(74vh,774px);
  pointer-events:none;
  opacity:.72;
  mix-blend-mode:normal;
  filter:contrast(1.04) brightness(.96);
  mask-image:
    radial-gradient(ellipse at 58% 42%,#000 0%,rgba(0,0,0,.98) 46%,rgba(0,0,0,.72) 65%,rgba(0,0,0,.22) 82%,transparent 96%),
    linear-gradient(90deg,transparent 0%,rgba(0,0,0,.08) 8%,rgba(0,0,0,.62) 24%,#000 34%,#000 72%,transparent 100%),
    linear-gradient(180deg,transparent 0%,#000 14%,#000 66%,rgba(0,0,0,.36) 84%,transparent 100%);
  mask-composite:intersect;
  -webkit-mask-image:
    radial-gradient(ellipse at 58% 42%,#000 0%,rgba(0,0,0,.98) 46%,rgba(0,0,0,.72) 65%,rgba(0,0,0,.22) 82%,transparent 96%),
    linear-gradient(90deg,transparent 0%,rgba(0,0,0,.08) 8%,rgba(0,0,0,.62) 24%,#000 34%,#000 72%,transparent 100%),
    linear-gradient(180deg,transparent 0%,#000 14%,#000 66%,rgba(0,0,0,.36) 84%,transparent 100%);
  -webkit-mask-composite:source-in, source-in;
}
.portrait-background:after{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(ellipse at 100% 100%,rgba(2,7,13,0) 0%,rgba(2,7,13,.16) 46%,rgba(2,7,13,.82) 90%,rgba(2,7,13,1) 100%),
    linear-gradient(90deg,rgba(2,7,13,.88) 0%,rgba(2,7,13,.56) 12%,rgba(2,7,13,.16) 26%,rgba(2,7,13,0) 42%,rgba(2,7,13,0) 100%);
}
.portrait-background img{
  width:100%;
  height:100%;
  object-fit:contain;
  object-position:right top;
  transform-origin:center;
}
@media (max-width:760px){
  .portrait-background{
    top:-12px;
    right:-120px;
    width:min(83vw,528px);
    height:min(53vh,493px);
    opacity:.52;
  }
}
`;

export const typeStyles = `
@import url("https://fonts.cdnfonts.com/css/soria");
:root{
  --display-font:"Soria","Georgia","Times New Roman",serif;
  --body-font:"Soria","Georgia","Times New Roman",serif;
  --hud-fit-scale:1;
  --map-fit-scale:.9;
  --lore-frame:#2a1710;
  --lore-ring:#8f5b2e;
  --lore-paper:#e5d2ae;
  --lore-paper-hi:rgba(255,255,255,.34);
  --lore-paper-line:rgba(79,47,25,.045);
  --lore-ink:#372016;
  --lore-heading:#24130d;
  --lore-accent:#6c2d1e;
  --lore-face-bg:#120806;
  --lore-avatar-filter:sepia(.18) saturate(1.04) contrast(1.12) brightness(.76);
  --lore-avatar-tint:#2a1710;
  --lore-avatar-tint-strength:.28;
  font-size:88.2%;
  font-family:var(--body-font);
}
body,
button,
input,
a,
p,
small,
strong,
em,
span,
li{
  font-family:var(--body-font);
  font-weight:500;
}
.hero-copy h1,
.hero-copy h2,
.section-heading h2,
.project-card h3,
.footer-shell h2{
  font-family:var(--display-font);
  font-weight:600;
  font-stretch:normal;
  text-transform:uppercase;
  letter-spacing:.01em;
  line-height:1.02;
}
.hero-copy h1{
  font-size:clamp(3.45rem,7vw,6.85rem);
  letter-spacing:.005em;
  max-width:980px;
}
.hero-copy h2{
  font-size:clamp(1.35rem,2.25vw,2.15rem);
  letter-spacing:.01em;
  line-height:1.12;
  max-width:760px;
}
.section-heading h2{
  font-size:clamp(1.8rem,3.05vw,3.1rem);
  line-height:1.08;
}
.eyebrow,
.shortcut-card span,
.project-topline em,
.mission-map strong,
.hud-status span,
.brand strong,
.brand small{
  font-family:var(--display-font);
  font-weight:600;
  letter-spacing:.05em;
}
.hero-lede,
.project-card p,
.experience-card p,
.section-heading p,
.pipeline p{
  font-family:var(--body-font);
  font-weight:500;
  letter-spacing:.008em;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme){
  --bg:#000;
  --panel:rgba(14,14,14,.88);
  --line:rgba(255,255,255,.18);
  --cyan:#f5f5f5;
  --cyan2:#fff;
  --gold:#d9d9d9;
  --text:#f4f4f4;
  --muted:#a6a6a6;
  --lore-frame:#181818;
  --lore-ring:#d7d7d7;
  --lore-paper:#e0e0dc;
  --lore-paper-hi:rgba(255,255,255,.46);
  --lore-paper-line:rgba(0,0,0,.055);
  --lore-ink:#1f1f1f;
  --lore-heading:#080808;
  --lore-accent:#5a5a5a;
  --lore-face-bg:#050505;
  --lore-avatar-filter:grayscale(1) contrast(1.22) brightness(.72);
  --lore-avatar-tint:#080808;
  --lore-avatar-tint-strength:.32;
  background:
    radial-gradient(circle at 76% 16%,rgba(255,255,255,.18),transparent 30rem),
    radial-gradient(circle at 18% 82%,rgba(96,96,96,.22),transparent 32rem),
    radial-gradient(circle at 50% 22%,rgba(255,255,255,.06),transparent 38rem),
    #000;
  color:var(--text);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme):after{
  background:
    linear-gradient(90deg,rgba(0,0,0,.97) 0%,rgba(18,18,18,.7) 42%,rgba(42,42,42,.22) 100%),
    linear-gradient(to bottom,rgba(255,255,255,.08),rgba(8,8,8,.06) 40%,rgba(0,0,0,.96));
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .ambient-grid{
  opacity:.72;
  background:
    linear-gradient(rgba(255,255,255,.034) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.026) 1px,transparent 1px),
    radial-gradient(circle at 80% 20%,rgba(255,255,255,.18),transparent 29rem);
  background-size:72px 72px,72px 72px,auto;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .portrait-background{
  opacity:.8;
  filter:contrast(1.12) brightness(1.02) grayscale(.1);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .panel-card,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .floating-hud,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .nav-shell{
  border-color:rgba(255,255,255,.16);
  background:linear-gradient(145deg,rgba(24,24,24,.88),rgba(2,2,2,.86));
  box-shadow:0 28px 90px rgba(0,0,0,.66),0 0 34px rgba(255,255,255,.08);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .panel-card:before{
  background:radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(255,255,255,.12),transparent 44%);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .world-foreground{
  filter:drop-shadow(0 0 24px rgba(255,255,255,.24));
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h1,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h2,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .section-heading h2,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card h3,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .footer-shell h2{
  color:#f2fbf8;
  background:none;
  -webkit-text-fill-color:currentColor;
  text-shadow:0 2px 10px rgba(0,0,0,.7),0 0 24px rgba(255,255,255,.14);
  filter:none;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h2 span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .eyebrow,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .shortcut-card span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-topline em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-status span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map strong,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .shortcut-card em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .brand strong,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .brand small{
  color:#d9d9d9;
  text-shadow:0 0 16px rgba(255,255,255,.16);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-topline span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card>p:first-child,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card h4,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .flow-node em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card li:before,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline article:after{
  color:#f2fbf8;
  border-color:rgba(255,255,255,.28);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-lede,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .section-heading p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card li,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-note,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-status small{
  color:#d2d2d2;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .nav-cta,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-actions a,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-row button,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .chip,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .contact-links a,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .metrics-row span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a{
  border-color:rgba(255,255,255,.18);
  background:rgba(18,18,18,.78);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-visual,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline article,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .flow-node span{
  border-color:rgba(255,255,255,.2);
  background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.12),transparent 55%),rgba(0,0,0,.26);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .chip,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .contact-links a{
  border-color:rgba(255,255,255,.2);
  background:rgba(18,18,18,.78);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .card-glow{
  background:radial-gradient(circle,rgba(255,255,255,.14),transparent 62%);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-actions .primary-action,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-row button.active{
  border-color:rgba(255,255,255,.76);
  background:linear-gradient(135deg,#fff,#d8d8d8 54%,#4f4f4f);
  color:#050505;
  box-shadow:0 0 30px rgba(255,255,255,.28),0 0 18px rgba(255,255,255,.12);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a span{
  border-color:rgba(255,255,255,.92);
  color:#fff;
  background:rgba(255,255,255,.24);
  box-shadow:0 0 44px rgba(255,255,255,.68), inset 0 0 22px rgba(255,255,255,.28);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a.active span{
  color:#050505;
  background:#fff;
  border-color:rgba(255,255,255,1);
  box-shadow:0 0 68px rgba(255,255,255,1),0 0 0 4px rgba(255,255,255,.34);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a.active em{
  color:#fff;
}
.site.fall-theme{
  --bg:#16090d;
  --panel:rgba(55,24,25,.78);
  --line:rgba(232,211,168,.24);
  --cyan:#c68443;
  --cyan2:#e8d3a8;
  --gold:#d89a45;
  --text:#fff5df;
  --muted:#d9c7a5;
  --lore-frame:#491323;
  --lore-ring:#d89a45;
  --lore-paper:#f0d6a4;
  --lore-paper-hi:rgba(255,245,218,.38);
  --lore-paper-line:rgba(96,39,24,.055);
  --lore-ink:#3a1714;
  --lore-heading:#2b1218;
  --lore-accent:#8b3f24;
  --lore-face-bg:#16090d;
  --lore-avatar-filter:sepia(.42) saturate(1.18) hue-rotate(-18deg) contrast(1.14) brightness(.74);
  --lore-avatar-tint:#491323;
  --lore-avatar-tint-strength:.38;
  background:#16090d;
  color:var(--text);
}
.site.fall-theme:after{
  background:
    linear-gradient(90deg,rgba(66,19,33,.7) 0%,rgba(126,50,31,.28) 44%,rgba(240,138,46,.08) 100%),
    linear-gradient(to bottom,rgba(247,211,157,.05),rgba(126,50,31,.06) 42%,rgba(66,19,33,.86));
}
.site.fall-theme .ambient-grid{
  opacity:.58;
  background:
    linear-gradient(rgba(255,227,111,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,227,111,.03) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(255,227,111,.2),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.fall-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(22,9,13,0) 0%,rgba(22,9,13,.1) 42%,rgba(55,24,25,.38) 74%,rgba(22,9,13,.94) 100%);
}
.site.fall-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.fall-theme .panel-card,
.site.fall-theme .floating-hud,
.site.fall-theme .mission-map,
.site.fall-theme .nav-shell{
  border-color:rgba(232,211,168,.24);
  background:linear-gradient(145deg,rgba(89,37,31,.78),rgba(32,13,17,.74));
  box-shadow:0 28px 90px rgba(44,12,12,.44);
}
.site.fall-theme .panel-card:before{
  background:
    radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(198,132,67,.2),rgba(73,19,35,.12) 34%,transparent 46%);
}
.site.fall-theme .card-glow{
  background:radial-gradient(circle,rgba(198,132,67,.22),rgba(73,19,35,.1) 46%,transparent 64%);
}
.site.fall-theme :is(.project-visual,.pipeline article,.flow-node span,.project-case-study div,.project-actions a,.plugin-placement-card,.plugin-debug-card,.telemetry-scaling-card,.plugin-placement-flow strong,.plugin-debug-card code){
  border-color:rgba(232,211,168,.18);
  background:rgba(73,19,35,.22);
}
.site.fall-theme .project-visual{
  background:
    radial-gradient(circle at 50% 40%,rgba(198,132,67,.18),rgba(73,19,35,.08) 54%,transparent 68%),
    rgba(73,19,35,.22);
}
.site.fall-theme :is(.flow-node span,.project-actions a,.plugin-placement-flow strong){
  color:#fff1d2;
}
.site.fall-theme .project-detail-list{
  border-color:rgba(232,211,168,.18);
  background:rgba(73,19,35,.24);
}
.site.fall-theme .project-detail-list button{
  border-right-color:rgba(232,211,168,.14);
  background:rgba(55,24,25,.2);
}
.site.fall-theme .project-detail-list button:hover{
  background:rgba(198,132,67,.12);
}
.site.fall-theme .project-detail-list button.active{
  background:
    linear-gradient(180deg,rgba(216,154,69,.18),rgba(73,19,35,.1)),
    rgba(55,24,25,.36);
  box-shadow:inset 0 3px 0 #d89a45;
}
.site.fall-theme .project-detail-list button span{
  border-color:rgba(232,211,168,.24);
}
.site.fall-theme .project-detail-list button strong{
  color:#fff5df;
}
.site.fall-theme :is(.project-case-study dd,.plugin-placement-card p,.plugin-debug-card p,.telemetry-scaling-card p,.plugin-debug-card li,.telemetry-scaling-card li){
  color:#eadfc8;
}
.site.fall-theme .nav-cta,
.site.fall-theme .hero-actions a,
.site.fall-theme .hud-row button,
.site.fall-theme .chip,
.site.fall-theme .contact-links a,
.site.fall-theme .metrics-row span,
.site.fall-theme .mission-map a{
  border-color:rgba(232,211,168,.22);
  background:rgba(86,37,31,.56);
  color:#fff1d2;
}
.site.fall-theme .hud-row button.active,
.site.fall-theme .fall-weather-button.active,
.site.fall-theme .hero-actions .primary-action{
  border-color:rgba(216,154,69,.72);
  background:linear-gradient(135deg,#e8d3a8,#c68443);
  color:#2b1218;
  box-shadow:0 0 30px rgba(198,132,67,.28);
}
.site.fall-theme .eyebrow,
.site.fall-theme .shortcut-card span,
.site.fall-theme .project-topline em,
.site.fall-theme .hud-status span,
.site.fall-theme .mission-map a.active em,
.site.fall-theme .mission-map a.active span{
  color:#e8d3a8;
}
.site.fall-theme .mission-map a span{
  border-color:rgba(73,19,35,.72);
  color:#e8d3a8;
  background:rgba(73,19,35,.2);
  box-shadow:0 0 18px rgba(73,19,35,.42), inset 0 0 14px rgba(73,19,35,.18);
}
.site.fall-theme .mission-map a.active span{
  border-color:rgba(73,19,35,.98);
  color:#fff1d2;
  background:#491323;
  box-shadow:0 0 30px rgba(73,19,35,.8), 0 0 0 2px rgba(73,19,35,.24);
}
.site.fall-theme .mission-map a.active{
  border-color:rgba(73,19,35,.58);
  background:rgba(73,19,35,.18);
}
.site.fall-theme .section-heading p,
.site.fall-theme .hero-lede,
.site.fall-theme .project-card p,
.site.fall-theme .experience-card p:last-child,
.site.fall-theme .pipeline p{
  color:#eadfc8;
}
.site.spring-theme{
  --bg:#071d1b;
  --panel:rgba(10,45,39,.78);
  --line:rgba(190,255,236,.24);
  --cyan:#50d2ee;
  --cyan2:#ecfff7;
  --gold:#b8f55f;
  --text:#f6fffd;
  --muted:#bfe7dc;
  --lore-frame:#0a4a3f;
  --lore-ring:#b8f55f;
  --lore-paper:#d9f6dd;
  --lore-paper-hi:rgba(255,255,255,.42);
  --lore-paper-line:rgba(10,74,63,.052);
  --lore-ink:#10342f;
  --lore-heading:#06221f;
  --lore-accent:#1f8d7a;
  --lore-face-bg:#071d1b;
  --lore-avatar-filter:sepia(.34) saturate(1.14) hue-rotate(78deg) contrast(1.12) brightness(.74);
  --lore-avatar-tint:#0b5948;
  --lore-avatar-tint-strength:.36;
  background:#071d1b;
  color:var(--text);
}
.site.spring-theme:after{
  background:
    linear-gradient(90deg,rgba(5,30,36,.76) 0%,rgba(17,119,86,.28) 44%,rgba(112,201,232,.1) 100%),
    linear-gradient(to bottom,rgba(237,253,247,.08),rgba(47,185,134,.08) 42%,rgba(7,29,27,.88));
}
.site.spring-theme .ambient-grid{
  opacity:.62;
  background:
    linear-gradient(rgba(184,245,95,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(80,210,238,.035) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(184,245,95,.22),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.spring-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(7,29,27,0) 0%,rgba(7,29,27,.1) 42%,rgba(10,69,57,.38) 74%,rgba(7,29,27,.94) 100%);
}
.site.spring-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.spring-theme .panel-card,
.site.spring-theme .floating-hud,
.site.spring-theme .mission-map,
.site.spring-theme .nav-shell{
  border-color:rgba(190,255,236,.24);
  background:linear-gradient(145deg,rgba(12,74,63,.78),rgba(5,28,34,.74));
  box-shadow:0 28px 90px rgba(3,24,25,.42);
}
.site.spring-theme .nav-cta,
.site.spring-theme .hero-actions a,
.site.spring-theme .hud-row button,
.site.spring-theme .chip,
.site.spring-theme .contact-links a,
.site.spring-theme .metrics-row span,
.site.spring-theme .mission-map a{
  border-color:rgba(190,255,236,.24);
  background:rgba(8,67,61,.56);
  color:#ecfff7;
}
.site.spring-theme .hud-row button.active,
.site.spring-theme .spring-weather-button.active,
.site.spring-theme .hero-actions .primary-action{
  border-color:rgba(184,245,95,.76);
  background:linear-gradient(135deg,#ecfff7,#b8f55f 48%,#50d2ee);
  color:#06251f;
  box-shadow:0 0 30px rgba(184,245,95,.32);
}
.site.spring-theme .eyebrow,
.site.spring-theme .shortcut-card span,
.site.spring-theme .project-topline em,
.site.spring-theme .hud-status span,
.site.spring-theme .mission-map a.active em,
.site.spring-theme .mission-map a.active span{
  color:#b8f55f;
}
.site.spring-theme .mission-map a span{
  border-color:rgba(3,92,60,.64);
  color:#0b6b4f;
  background:rgba(3,92,60,.12);
  box-shadow:0 0 18px rgba(3,92,60,.32), inset 0 0 14px rgba(3,92,60,.14);
}
.site.spring-theme .mission-map a.active span{
  border-color:rgba(236,255,247,.95);
  color:#ecfff7;
  background:#035c3c;
  box-shadow:0 0 28px rgba(3,92,60,.72), 0 0 0 2px rgba(236,255,247,.2);
}
.site.spring-theme .mission-map a.active{
  border-color:rgba(3,92,60,.52);
  background:rgba(3,92,60,.14);
}
.site.spring-theme .section-heading p,
.site.spring-theme .hero-lede,
.site.spring-theme .project-card p,
.site.spring-theme .experience-card p:last-child,
.site.spring-theme .pipeline p{
  color:#d9f5ec;
}
.site.winter-theme{
  --bg:#e8f7ff;
  --panel:rgba(232,247,255,.78);
  --line:rgba(91,161,199,.28);
  --cyan:#5a96b8;
  --cyan2:#5a96b8;
  --gold:#5a96b8;
  --text:#050505;
  --muted:#050505;
  --lore-frame:#4d7f9c;
  --lore-ring:#5a96b8;
  --lore-paper:#f0fbff;
  --lore-paper-hi:rgba(255,255,255,.72);
  --lore-paper-line:rgba(77,127,156,.065);
  --lore-ink:#050505;
  --lore-heading:#050505;
  --lore-accent:#315e76;
  --lore-face-bg:#d7edf8;
  --lore-avatar-filter:sepia(.2) saturate(1.02) hue-rotate(164deg) contrast(1.12) brightness(.78);
  --lore-avatar-tint:#5a96b8;
  --lore-avatar-tint-strength:.36;
  background:#e8f7ff;
  color:var(--text);
}
.site.winter-theme:after{
  background:
    linear-gradient(90deg,rgba(248,253,255,.62) 0%,rgba(189,238,255,.22) 48%,rgba(111,190,230,.12) 100%),
    linear-gradient(to bottom,rgba(255,255,255,.22),rgba(189,238,255,.1) 44%,rgba(181,226,247,.72));
}
.site.winter-theme .ambient-grid{
  opacity:.56;
  background:
    linear-gradient(rgba(91,161,199,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(255,255,255,.54),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.winter-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(232,247,255,0) 0%,rgba(232,247,255,.14) 42%,rgba(181,226,247,.42) 74%,rgba(210,239,252,.94) 100%);
}
.site.winter-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.winter-theme .panel-card,
.site.winter-theme .floating-hud,
.site.winter-theme .mission-map,
.site.winter-theme .nav-shell{
  border-color:rgba(91,161,199,.28);
  background:linear-gradient(145deg,rgba(248,253,255,.82),rgba(177,225,247,.72));
  box-shadow:0 28px 90px rgba(91,161,199,.22),0 0 34px rgba(255,255,255,.32);
}
.site.winter-theme .nav-cta,
.site.winter-theme .hero-actions a,
.site.winter-theme .hud-row button,
.site.winter-theme .chip,
.site.winter-theme .contact-links a,
.site.winter-theme .metrics-row span,
.site.winter-theme .mission-map a{
  border-color:rgba(91,161,199,.28);
  background:rgba(248,253,255,.64);
  color:#050505;
}
.site.winter-theme .hud-row button.active,
.site.winter-theme .winter-weather-button.active,
.site.winter-theme .hero-actions .primary-action{
  border-color:rgba(90,150,184,.9);
  background:linear-gradient(135deg,#fff,#dff7ff 42%,#5a96b8);
  color:#050505;
  box-shadow:0 0 34px rgba(90,150,184,.58);
}
.site.winter-theme .eyebrow,
.site.winter-theme .shortcut-card span,
.site.winter-theme .project-topline em,
.site.winter-theme .hud-status span,
.site.winter-theme .mission-map strong,
.site.winter-theme .mission-map a.active em,
.site.winter-theme .mission-map a.active span{
  color:#050505;
}
.site.winter-theme .hero-copy h1,
.site.winter-theme .hero-copy h2,
.site.winter-theme .hero-copy h2 span,
.site.winter-theme .section-heading h2,
.site.winter-theme .project-card h3,
.site.winter-theme .footer-shell h2,
.site.winter-theme .nav-shell nav,
.site.winter-theme .nav-shell nav a,
.site.winter-theme .brand strong,
.site.winter-theme .brand small,
.site.winter-theme .metrics-row small,
.site.winter-theme .stack-grid h3,
.site.winter-theme .experience-card h4,
.site.winter-theme .pipeline span,
.site.winter-theme .project-topline span,
.site.winter-theme .shortcut-card strong,
.site.winter-theme .shortcut-card em,
.site.winter-theme .project-card li,
.site.winter-theme .project-card ul,
.site.winter-theme .chip,
.site.winter-theme .flow-node span,
.site.winter-theme .flow-node em,
.site.winter-theme .project-visual,
.site.winter-theme .experience-card>p:first-child,
.site.winter-theme .footer-shell p,
.site.winter-theme .contact-links a{
  color:#050505;
}
.site.winter-theme .mission-map a span{
  border-color:rgba(90,150,184,.88);
  color:#050505;
  background:rgba(255,255,255,.52);
  box-shadow:0 0 22px rgba(90,150,184,.58), inset 0 0 14px rgba(255,255,255,.48);
}
.site.winter-theme .mission-map a.active span{
  border-color:rgba(90,150,184,1);
  color:#fff;
  background:#5a96b8;
  box-shadow:0 0 38px rgba(90,150,184,.92),0 0 0 2px rgba(255,255,255,.72);
}
.site.winter-theme .mission-map a.active{
  border-color:rgba(90,150,184,.78);
  background:rgba(255,255,255,.7);
}
.site.winter-theme .section-heading p,
.site.winter-theme .hero-lede,
.site.winter-theme .project-card p,
.site.winter-theme .experience-card p:last-child,
.site.winter-theme .pipeline p,
.site.winter-theme .hud-status small,
.site.winter-theme .hud-note,
.site.winter-theme .brand small,
.site.winter-theme .mission-map a em,
.site.winter-theme .metrics-row small,
.site.winter-theme .project-card li{
  color:#050505;
}
@media (max-width:760px){
  :root{
    font-size:93.71%;
  }
}
`;

export const foldStyles = `
:is(.project-visual,.architecture-panel,.project-card,.experience-card,.stack-grid article,.footer-shell,.floating-hud,.mission-map,.nav-shell){
  position:relative;
}
:is(.panel-card,.nav-shell,.floating-hud,.mission-map,.project-card,.project-visual,.architecture-panel,.experience-card,.stack-grid article,.footer-shell)::after{
  content:"";
  position:absolute;
  top:0;
  right:0;
  width:var(--fold,18px);
  height:var(--fold,18px);
  clip-path:polygon(0 0,100% 100%,0 100%);
  background:linear-gradient(135deg,rgba(255,255,255,.28),rgba(103,232,249,.2) 42%,rgba(2,7,13,.58) 100%);
  border-left:1px solid rgba(133,239,255,.32);
  border-bottom:1px solid rgba(133,239,255,.24);
  box-shadow:-6px 6px 18px rgba(0,0,0,.24);
  pointer-events:none;
  z-index:4;
}
.site.fall-theme :is(.panel-card,.nav-shell,.floating-hud,.mission-map,.project-card,.project-visual,.architecture-panel,.experience-card,.stack-grid article,.footer-shell)::after{
  background:linear-gradient(135deg,rgba(240,214,164,.32),rgba(198,132,67,.2) 42%,rgba(73,19,35,.62) 100%);
  border-left:1px solid rgba(232,211,168,.24);
  border-bottom:1px solid rgba(198,132,67,.2);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) :is(.panel-card,.nav-shell,.floating-hud,.mission-map,.project-card,.project-visual,.architecture-panel,.experience-card,.stack-grid article,.footer-shell)::after{
  background:linear-gradient(135deg,rgba(255,255,255,.32),rgba(118,118,118,.24) 42%,rgba(2,2,2,.6) 100%);
  border-left:1px solid rgba(255,255,255,.26);
  border-bottom:1px solid rgba(255,255,255,.2);
}
:is(.nav-cta,.hero-actions a,.metrics-row span,.hud-row button,.mission-map a,.mission-map a span,.shortcut-card,.project-topline span,.flow-node span,.chip,.contact-links a){
  clip-path:none!important;
}
:is(.nav-cta,.hero-actions a,.metrics-row span,.hud-row button,.mission-map a,.mission-map a span,.shortcut-card,.project-topline span,.flow-node span,.chip,.contact-links a)::after{
  content:none!important;
}
`;

export const layoutRestoreStyles = `
.hero-sector{
  min-height:auto!important;
  padding-top:96px!important;
  padding-bottom:28px!important;
}
.section-wrap{
  padding-top:64px!important;
  padding-bottom:64px!important;
}
.scroll-finish-spacer{
  height:0!important;
}
.footer-shell{
  margin-bottom:0!important;
}
.floating-hud{
  position:fixed!important;
  right:18px!important;
  bottom:18px!important;
  left:auto!important;
  top:auto!important;
  width:min(340px,calc(100% - 36px))!important;
  height:auto!important;
  margin:0!important;
  z-index:45!important;
  transform:scale(var(--hud-fit-scale,1))!important;
  transform-origin:right bottom!important;
}
.floating-hud .hud-note{
  white-space:nowrap!important;
}
.lore-guide{
  position:fixed!important;
  left:20px!important;
  bottom:22px!important;
  z-index:46!important;
  display:block!important;
  width:min(520px,calc(100% - 40px))!important;
  min-height:104px!important;
  padding:0 42px 0 78px!important;
  border:0!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  transition:opacity .34s ease,transform .34s cubic-bezier(.2,.78,.16,1),width .34s cubic-bezier(.2,.78,.16,1),padding .34s cubic-bezier(.2,.78,.16,1)!important;
}
.lore-guide-toggle{
  position:absolute!important;
  top:50%!important;
  right:52px!important;
  display:grid!important;
  place-items:center!important;
  width:34px!important;
  height:34px!important;
  border:0!important;
  background:transparent!important;
  color:var(--lore-accent)!important;
  padding:0!important;
  z-index:4!important;
  transform:translateY(-50%)!important;
}
.lore-guide-face{
  position:absolute;
  left:0;
  top:50%;
  width:104px;
  height:104px;
  overflow:hidden;
  border:3px solid var(--lore-frame);
  background:var(--lore-face-bg);
  border-radius:50%;
  transform:translateY(-50%);
  box-shadow:0 0 0 3px var(--lore-ring),0 9px 0 rgba(0,0,0,.22),0 18px 36px rgba(0,0,0,.46);
  z-index:3;
}
.lore-guide-face:before{
  content:"";
  position:absolute;
  inset:0;
  z-index:2;
  background:var(--lore-avatar-tint);
  mix-blend-mode:color;
  opacity:var(--lore-avatar-tint-strength);
  pointer-events:none;
}
.lore-guide-face:after{
  content:"";
  position:absolute;
  inset:0;
  z-index:3;
  background:
    radial-gradient(circle at 28% 22%,color-mix(in srgb,var(--lore-ring) 26%,transparent),transparent 34%),
    linear-gradient(135deg,rgba(255,255,255,.18),transparent 32%),
    repeating-linear-gradient(-10deg,color-mix(in srgb,var(--lore-ring) 14%,transparent) 0 1px,transparent 1px 9px);
  mix-blend-mode:screen;
  opacity:.5;
  pointer-events:none;
}
.lore-guide-face img{
  position:relative;
  z-index:1;
  width:116%;
  height:116%;
  object-fit:cover;
  object-position:50% 34%;
  transform:translate(-6%,-5%) scale(1.06);
  filter:var(--lore-avatar-filter);
}
.lore-guide-copy{
  display:grid;
  gap:5px;
  min-width:0;
  min-height:92px;
  padding:14px 60px 14px 42px;
  border:3px solid var(--lore-frame);
  background:
    linear-gradient(180deg,var(--lore-paper-hi),transparent 38%),
    repeating-linear-gradient(0deg,var(--lore-paper-line) 0 1px,transparent 1px 5px),
    var(--lore-paper);
  box-shadow:0 0 0 2px var(--lore-ring),0 10px 0 rgba(0,0,0,.22),0 20px 42px rgba(0,0,0,.36);
  color:var(--lore-ink);
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);
  transform-origin:18px 50%;
  animation:loreDialogPop .34s cubic-bezier(.19,1,.22,1) both;
}
.lore-guide-copy p{
  margin:0;
  min-height:1.05em;
  color:var(--lore-ink);
  font-size:.76rem;
  line-height:1.38;
  opacity:1;
  transform:none;
}
.lore-guide-copy.exiting{
  animation:loreDialogOut .2s ease both;
}
.lore-guide-copy.exiting p{
  animation:loreTextOut .18s ease both;
}
.lore-type-caret{
  display:inline-block;
  width:7px;
  height:1em;
  margin-left:2px;
  vertical-align:-.13em;
  background:var(--lore-accent);
  animation:loreCaretBlink .78s steps(1,end) infinite;
}
.lore-guide.collapsed{
  width:48px!important;
  height:48px!important;
  min-height:48px!important;
  grid-template-columns:1fr!important;
  padding:6px!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.lore-guide.collapsed .lore-guide-face,
.lore-guide.collapsed .lore-guide-copy{
  opacity:0!important;
  pointer-events:none!important;
  transform:translateX(-10px) scale(.92)!important;
}
.lore-guide.collapsed .lore-guide-toggle{
  inset:6px!important;
  width:36px!important;
  height:36px!important;
  color:var(--text)!important;
  transform:none!important;
}
@keyframes loreDialogPop{
  0%{opacity:0;transform:translateX(-12px) scale(.84) rotate(-1.8deg)}
  68%{opacity:1;transform:translateX(2px) scale(1.025) rotate(.5deg)}
  100%{opacity:1;transform:translateX(0) scale(1) rotate(0)}
}
@keyframes loreDialogOut{
  0%{opacity:1;transform:translateX(0) scale(1)}
  100%{opacity:0;transform:translateX(-10px) scale(.92)}
}
@keyframes loreTextOut{
  0%{opacity:1;transform:translateY(0) scale(1)}
  100%{opacity:0;transform:translateY(-4px) scale(.98)}
}
@keyframes loreCaretBlink{
  0%,48%{opacity:1}
  49%,100%{opacity:0}
}
.mission-map{
  position:fixed!important;
  left:12px!important;
  top:50%!important;
  right:auto!important;
  bottom:auto!important;
  width:auto!important;
  transform:translateY(-50%) scale(var(--map-fit-scale,.9))!important;
  transform-origin:left center!important;
  display:grid!important;
  gap:8px!important;
  padding:11px!important;
  clip-path:none!important;
}
.mission-map::after,
.mission-map a::after,
.mission-map a span::after,
.shortcut-card::after,
.profile-avatar::after,
.lore-guide::after{
  content:none!important;
}
.profile-avatar{
  width:72.5px!important;
  height:72.5px!important;
  border-radius:50%!important;
  clip-path:circle(50% at 50% 50%)!important;
  aspect-ratio:1/1!important;
  overflow:hidden!important;
  border:1px solid rgba(133,239,255,.55)!important;
  box-shadow:0 0 0 2px rgba(4,12,20,.8),0 0 18px rgba(34,211,238,.18)!important;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .profile-avatar{
  border-color:rgba(255,255,255,.62)!important;
  box-shadow:0 0 0 2px rgba(0,0,0,.82),0 0 20px rgba(255,255,255,.22)!important;
}
.nav-shell,
.brand{
  overflow:visible!important;
}
.nav-shell{
  height:60px!important;
  min-height:60px!important;
  padding-top:7px!important;
  padding-bottom:7px!important;
  align-items:center!important;
  clip-path:none!important;
  border:0!important;
}
.brand{
  position:relative!important;
  min-height:45px!important;
  padding-left:90px!important;
}
.brand .profile-avatar{
  position:absolute!important;
  left:0!important;
  top:50%!important;
  transform:translateY(-50%)!important;
  z-index:3!important;
}
.nav-shell::after{
  content:none!important;
}
.nav-cta{
  padding-top:9px!important;
  padding-bottom:9px!important;
  line-height:1!important;
}
@media (max-width:760px){
  .lore-guide{
    left:11px!important;
    bottom:11px!important;
    width:min(390px,calc(100% - 22px))!important;
    min-height:86px!important;
    padding:0 38px 0 58px!important;
  }
  .lore-guide-face{
    width:78px;
    height:78px;
  }
  .lore-guide-copy p{
    font-size:.68rem;
  }
  .lore-guide-copy{
    min-height:78px;
    padding:11px 48px 11px 32px;
  }
  .lore-guide-toggle{
    right:38px!important;
    width:30px!important;
    height:30px!important;
  }
}
.mission-map a{
  min-width:128px!important;
  padding:6px!important;
  display:grid!important;
  grid-template-columns:34px auto!important;
  gap:8px!important;
  clip-path:none!important;
}
.mission-map a span{
  width:34px!important;
  height:34px!important;
  clip-path:none!important;
}
.shortcut-rail{
  position:relative!important;
  z-index:8!important;
  width:min(1080px,calc(100% - 120px))!important;
  margin:-20px auto 42px!important;
  display:grid!important;
  grid-template-columns:repeat(5,minmax(0,1fr))!important;
  gap:14px!important;
}
.shortcut-card{
  min-height:128px!important;
  padding:18px!important;
  clip-path:none!important;
}
@media (max-width:1180px){
  .shortcut-rail{
    width:min(100% - 44px,1040px)!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
  }
}
@media (max-width:760px){
  .hero-sector{
    padding-top:92px!important;
    padding-bottom:24px!important;
  }
  .shortcut-rail{
    width:min(100% - 22px,1240px)!important;
    grid-template-columns:1fr!important;
  }
}
`;

export const tabStyles = `
.overlay-collapse-button{
  position:absolute;
  z-index:12;
  display:grid;
  place-items:center;
  width:34px;
  height:34px;
  border:0;
  border-radius:0;
  background:transparent;
  color:var(--cyan2);
  font-weight:1000;
  line-height:1;
  box-shadow:none;
  clip-path:none!important;
  transition:transform .34s cubic-bezier(.2,.78,.16,1),color .22s ease,filter .22s ease,opacity .22s ease;
}
.overlay-collapse-button::after{
  content:none!important;
}
.overlay-collapse-button:hover{
  color:color-mix(in srgb,var(--cyan2) 84%,white);
  filter:drop-shadow(0 0 8px color-mix(in srgb,var(--cyan) 40%,transparent));
}
.sketch-pointer{
  width:22px;
  height:22px;
  overflow:visible;
  fill:currentColor;
  stroke:none;
  transform-origin:50% 50%;
  filter:drop-shadow(1px 1.5px 0 rgba(0,0,0,.28));
  transition:transform .38s cubic-bezier(.2,.78,.16,1);
}
.sketch-pointer path{
  vector-effect:non-scaling-stroke;
}
.sketch-pointer-shadow{
  fill:rgba(0,0,0,.24);
  transform:translate(1.1px,1.3px);
}
.sketch-pointer.left{
  transform:rotate(180deg);
}
.sketch-pointer.down{
  transform:rotate(90deg);
}
.sketch-pointer.up{
  transform:rotate(-90deg);
}
.hud-collapse-button{
  top:8px;
  right:8px;
}
.map-collapse-button{
  top:8px;
  right:-17px;
}
.hud-content{
  padding-right:0;
  opacity:1;
  transform:translateY(0) scale(1);
  transform-origin:right bottom;
  max-height:360px;
  overflow:hidden;
  transition:opacity .28s ease,transform .34s cubic-bezier(.2,.78,.16,1),max-height .34s cubic-bezier(.2,.78,.16,1);
}
.particle-cycle-row{
  display:grid!important;
  grid-template-columns:40px minmax(0,1fr) 40px;
  gap:6px!important;
}
.particle-cycle-row button{
  min-width:0;
  box-shadow:none!important;
}
.particle-cycle-row .particle-arrow{
  flex:0 0 40px;
  padding:9px 0!important;
  border-color:rgba(133,239,255,.18)!important;
  background:rgba(0,0,0,.28)!important;
  color:#dffbff!important;
}
.particle-cycle-row .particle-label{
  text-align:center;
  border-color:rgba(133,239,255,.18)!important;
  background:rgba(6,15,24,.58)!important;
  color:#e0f7ff!important;
}
.particle-cycle-row .particle-arrow:hover,
.particle-cycle-row .particle-label:hover{
  border-color:rgba(255,255,255,.34)!important;
  background:rgba(255,255,255,.1)!important;
}
.mission-map-content{
  display:grid;
  gap:8px;
  opacity:1;
  transform:translateX(0) scale(1);
  transform-origin:left center;
  max-width:180px;
  max-height:240px;
  overflow:hidden;
  transition:opacity .28s ease,transform .34s cubic-bezier(.2,.78,.16,1),max-width .34s cubic-bezier(.2,.78,.16,1),max-height .34s cubic-bezier(.2,.78,.16,1);
}
.floating-hud,
.mission-map{
  transition:width .34s cubic-bezier(.2,.78,.16,1),min-width .34s cubic-bezier(.2,.78,.16,1),height .34s cubic-bezier(.2,.78,.16,1),min-height .34s cubic-bezier(.2,.78,.16,1),padding .34s cubic-bezier(.2,.78,.16,1),transform .34s cubic-bezier(.2,.78,.16,1),opacity .28s ease,background .28s ease,border-color .28s ease,box-shadow .28s ease;
}
.floating-hud.collapsed{
  width:48px!important;
  height:48px!important;
  min-height:48px!important;
  padding:6px!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.floating-hud.collapsed::after{
  display:none!important;
}
.floating-hud.collapsed .hud-content{
  opacity:0!important;
  transform:translateY(10px) scale(.92)!important;
  max-height:0!important;
  pointer-events:none!important;
}
.floating-hud.collapsed .hud-collapse-button{
  top:6px!important;
  right:6px!important;
  width:36px!important;
  height:36px!important;
}
.mission-map.collapsed{
  width:48px!important;
  min-width:48px!important;
  height:48px!important;
  min-height:48px!important;
  padding:6px!important;
  gap:0!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.mission-map.collapsed::after{
  display:none!important;
}
.mission-map.collapsed .mission-map-content{
  opacity:0!important;
  transform:translateX(-10px) scale(.92)!important;
  max-width:0!important;
  max-height:0!important;
  pointer-events:none!important;
}
.mission-map.collapsed .map-collapse-button{
  top:6px!important;
  right:6px!important;
  width:36px!important;
  height:36px!important;
}
.floating-hud.collapsed .hud-collapse-button,
.mission-map.collapsed .map-collapse-button,
.floating-hud.collapsed .hud-collapse-button:hover,
.mission-map.collapsed .map-collapse-button:hover{
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
}
.floating-hud.collapsed .sketch-pointer,
.mission-map.collapsed .sketch-pointer,
.lore-guide.collapsed .sketch-pointer{
  width:24px;
  height:24px;
  filter:drop-shadow(0 0 8px color-mix(in srgb,var(--cyan) 36%,transparent)) drop-shadow(1px 1px 0 rgba(0,0,0,.28));
}
.tab-content{
  display:grid;
  gap:0;
  padding-top:28px!important;
}
.tab-pane{
  position:relative;
  display:grid;
  gap:38px;
  margin:0;
  padding:36px 34px 34px;
  border:1px solid rgba(255,255,255,.18);
  border-top-color:rgba(255,255,255,.13);
  background:
    linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018)),
    rgba(0,0,0,.28);
  box-shadow:0 24px 88px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.06);
  clip-path:none;
  overflow:hidden;
}
.tab-pane:before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:3px;
  background:linear-gradient(90deg,var(--gold),rgba(255,255,255,.44),transparent);
  opacity:.82;
}
.tab-pane-header{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:minmax(230px,.4fr) minmax(0,1fr);
  gap:34px;
  align-items:end;
  padding:0 0 26px;
  border-bottom:1px solid rgba(255,255,255,.14);
}
.tab-pane-header p{
  margin:0 0 8px;
  color:var(--gold);
  font-size:.74rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.tab-pane-header h2{
  margin:0;
  color:#f2fbf8;
  font-size:clamp(1.7rem,2.9vw,3rem);
  line-height:1.02;
  text-transform:uppercase;
}
.tab-pane-header span{
  color:#d2d2d2;
  line-height:1.64;
}
.tab-pane-body{
  position:relative;
  z-index:2;
  display:grid;
  gap:52px;
}
.tabbed-subsection{
  display:grid;
  gap:30px;
}
.tabbed-subsection .section-heading{
  margin-bottom:0;
}
.tab-content .project-grid,
.tab-content .experience-grid,
.tab-content .stack-grid{
  gap:30px;
}
.tab-content .project-grid{
  grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr));
}
.project-detail-tabs{
  display:grid;
  gap:0;
}
.project-detail-list{
  position:relative;
  z-index:3;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));
  align-items:stretch;
  border:1px solid rgba(255,255,255,.16);
  border-bottom:0;
  background:rgba(0,0,0,.24);
}
.project-detail-list button{
  display:grid;
  grid-template-columns:auto minmax(0,1fr);
  grid-template-areas:"num title" "num meta";
  gap:4px 10px;
  align-items:center;
  min-height:74px;
  padding:14px 16px;
  border:0;
  border-right:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.025);
  color:var(--text);
  text-align:left;
  clip-path:none!important;
}
.project-detail-list button:last-child{
  border-right:0;
}
.project-detail-list button:hover{
  background:rgba(255,255,255,.06);
}
.project-detail-list button.active{
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--cyan) 14%,rgba(255,255,255,.06)),rgba(255,255,255,.025)),
    rgba(0,0,0,.2);
  box-shadow:inset 0 3px 0 var(--gold);
}
.project-detail-list button span{
  grid-area:num;
  display:grid;
  place-items:center;
  width:34px;
  height:34px;
  border:1px solid rgba(133,239,255,.22);
  color:var(--gold);
  font-weight:1000;
}
.project-detail-list button strong{
  grid-area:title;
  min-width:0;
  color:#f2fbf8;
  font-size:.86rem;
  line-height:1.1;
  text-transform:uppercase;
}
.project-detail-list button em{
  grid-area:meta;
  min-width:0;
  color:var(--muted);
  font-size:.66rem;
  font-style:normal;
  line-height:1.25;
}
.project-detail-panel{
  display:grid;
  padding-top:0;
}
.project-detail-panel .project-card{
  border-top-color:rgba(255,255,255,.16);
}
.tab-content .project-card,
.tab-content .experience-card,
.tab-content .stack-grid article{
  padding:32px;
}
.project-stack-section{
  gap:24px;
}
.project-stack-grid{
  grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));
}
.tab-content .project-visual{
  margin:26px 0;
}
.tab-content .chip-row{
  gap:10px;
  margin:24px 0;
}
.tab-content .project-card ul{
  gap:14px;
  margin-top:24px;
}
.project-case-study{
  display:grid;
  gap:10px;
  margin:24px 0 0;
}
.project-case-study div{
  display:grid;
  grid-template-columns:minmax(76px,.28fr) minmax(0,1fr);
  gap:12px;
  padding:11px 12px;
  border:1px solid rgba(133,239,255,.14);
  background:rgba(0,0,0,.2);
}
.project-case-study dt{
  color:var(--gold);
  font-size:.67rem;
  font-weight:900;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.project-case-study dd{
  margin:0;
  color:#d4e3f3;
  font-size:.84rem;
  line-height:1.48;
}
.project-actions{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:24px;
}
.project-actions a{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:38px;
  padding:10px 13px;
  border:1px solid rgba(133,239,255,.22);
  background:rgba(4,12,20,.7);
  color:#e6fbff;
  font-size:.78rem;
  font-weight:900;
  letter-spacing:.05em;
  text-transform:uppercase;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);
}
.project-actions a:hover{
  border-color:color-mix(in srgb,var(--cyan2) 72%,white);
  color:var(--cyan2);
  filter:drop-shadow(0 0 8px color-mix(in srgb,var(--cyan) 30%,transparent));
}
.tab-content .architecture-panel{
  padding:44px;
  scroll-margin-top:132px;
}
.tab-content .architecture-panel{
  margin-top:0;
}
.architecture-system{
  scroll-margin-top:132px;
}
.plugin-architecture-panel,
.telemetry-architecture-panel{
  display:grid;
  gap:30px;
}
.plugin-workflow,
.telemetry-workflow{
  grid-template-columns:repeat(6,minmax(0,1fr));
}
.plugin-architecture-details,
.telemetry-architecture-details{
  display:grid;
  grid-template-columns:minmax(260px,.9fr) minmax(280px,1.1fr);
  gap:18px;
}
.plugin-placement-card,
.plugin-debug-card,
.telemetry-scaling-card{
  border:1px solid rgba(133,239,255,.15);
  background:rgba(0,0,0,.24);
  padding:22px;
  color:#d4e3f3;
}
.plugin-placement-card > span,
.plugin-debug-card > span,
.telemetry-scaling-card > span{
  display:block;
  color:var(--gold);
  font-size:.72rem;
  font-weight:1000;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.plugin-placement-flow{
  display:grid;
  gap:8px;
  margin:18px 0;
}
.plugin-placement-flow div{
  display:grid;
  gap:8px;
}
.plugin-placement-flow strong{
  display:block;
  border:1px solid rgba(133,239,255,.18);
  background:rgba(4,12,20,.68);
  color:#e6fbff;
  padding:12px 14px;
  text-align:center;
  text-transform:uppercase;
  font-size:.78rem;
}
.plugin-placement-flow em{
  color:var(--cyan);
  font-style:normal;
  font-weight:1000;
  text-align:center;
}
.plugin-placement-card p,
.plugin-debug-card p,
.telemetry-scaling-card p{
  margin:12px 0 0;
  color:#cbd5e1;
  line-height:1.6;
}
.plugin-debug-card code{
  display:block;
  margin-top:16px;
  padding:12px 14px;
  border:1px solid rgba(133,239,255,.18);
  background:rgba(0,0,0,.36);
  color:var(--cyan2);
  white-space:normal;
}
.plugin-debug-card ul,
.telemetry-scaling-card ul{
  display:grid;
  gap:9px;
  margin:18px 0 0;
  padding:0;
  list-style:none;
}
.plugin-debug-card li,
.telemetry-scaling-card li{
  color:#cbd5e1;
  line-height:1.45;
}
.plugin-debug-card li:before,
.telemetry-scaling-card li:before{
  content:"/";
  color:var(--cyan);
  margin-right:8px;
  font-weight:1000;
}
.tab-content .experience-card p:not(:first-child){
  color:#cbd5e1;
  line-height:1.72;
}
.tab-content .experience-card ul{
  display:grid;
  gap:12px;
  margin:20px 0 0;
  padding:0;
  list-style:none;
  color:#cbd5e1;
}
.tab-content .experience-card li:before{
  content:"/";
  color:var(--cyan);
  margin-right:8px;
}
.date-timeline-system{
  --sketch-accent:var(--cyan);
  --sketch-ink:#6f7374;
  --sketch-paper:rgba(248,249,244,.22);
  display:grid;
  gap:24px;
}
.date-timeline-controls{
  display:grid;
  grid-template-columns:42px minmax(0,1fr) 42px;
  gap:14px;
  align-items:stretch;
}
.date-timeline-controls button{
  border:2px solid color-mix(in srgb,var(--sketch-ink) 72%,transparent);
  border-radius:48% 52% 45% 55%/54% 46% 56% 44%;
  background:color-mix(in srgb,var(--sketch-paper) 58%,transparent);
  color:#101414;
  font-weight:1000;
  box-shadow:3px 4px 0 rgba(0,0,0,.14);
  clip-path:none!important;
}
.date-timeline-controls button:hover{
  border-color:var(--sketch-accent);
  background:color-mix(in srgb,var(--sketch-accent) 10%,rgba(255,255,255,.28));
}
.date-timeline-controls div{
  min-width:0;
  border:2px solid color-mix(in srgb,var(--sketch-ink) 68%,transparent);
  border-radius:10px 7px 12px 8px/8px 12px 7px 10px;
  background:
    repeating-linear-gradient(0deg,transparent 0 17px,rgba(111,115,116,.055) 18px 19px),
    color-mix(in srgb,var(--sketch-paper) 54%,transparent);
  padding:15px 18px;
  box-shadow:5px 6px 0 rgba(0,0,0,.12);
}
.date-timeline-controls span{
  display:block;
  color:var(--sketch-accent);
  font-size:.72rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.date-timeline-controls strong{
  display:block;
  margin-top:5px;
  color:#101414;
  font-size:clamp(1.1rem,1.8vw,1.55rem);
  line-height:1.04;
  text-transform:uppercase;
}
.date-timeline-rail{
  position:relative;
  min-height:650px;
  border:3px solid color-mix(in srgb,var(--sketch-ink) 76%,transparent);
  border-radius:12px 7px 14px 8px/8px 13px 7px 12px;
  background:
    linear-gradient(90deg,rgba(111,115,116,.025) 0 2px,transparent 2px 78px),
    repeating-linear-gradient(0deg,transparent 0 54px,rgba(111,115,116,.035) 55px 57px,transparent 58px 116px),
    radial-gradient(circle at 48% 8%,color-mix(in srgb,var(--sketch-accent) 6%,transparent),transparent 26%),
    var(--sketch-paper);
  box-shadow:8px 10px 0 rgba(0,0,0,.08);
  overflow:visible;
}
.date-timeline-rail:before{
  content:"";
  position:absolute;
  inset:30px 28px;
  opacity:.62;
  background:
    repeating-linear-gradient(180deg,color-mix(in srgb,var(--sketch-ink) 70%,transparent) 0 12px,transparent 13px 30px);
  background-position:left center;
  background-repeat:no-repeat;
  background-size:3px 100%;
  pointer-events:none;
}
.date-timeline-rail:after{
  content:"";
  position:absolute;
  left:12%;
  right:12%;
  bottom:28px;
  height:4px;
  border-top:4px solid color-mix(in srgb,var(--sketch-ink) 72%,transparent);
  border-radius:50%;
  transform:rotate(-.8deg);
  pointer-events:none;
}
.date-timeline-trunk{
  position:absolute;
  left:50%;
  top:52px;
  bottom:58px;
  width:28px;
  border-left:6px solid color-mix(in srgb,var(--sketch-ink) 82%,transparent);
  border-right:3px dashed color-mix(in srgb,var(--sketch-ink) 44%,transparent);
  border-radius:48% 52% 50% 50%;
  background:transparent;
  box-shadow:3px 0 0 color-mix(in srgb,var(--sketch-accent) 18%,transparent);
  transform:translateX(-50%) rotate(-1.3deg);
}
.date-timeline-trunk:before,
.date-timeline-trunk:after{
  content:"";
  position:absolute;
  left:50%;
  width:112px;
  height:0;
  border-top:3px dashed color-mix(in srgb,var(--sketch-ink) 46%,transparent);
  background:transparent;
  transform-origin:left center;
}
.date-timeline-trunk:before{
  top:31%;
  transform:rotate(-24deg);
}
.date-timeline-trunk:after{
  top:67%;
  transform:rotate(24deg);
}
.date-timeline-boundary{
  position:absolute;
  color:color-mix(in srgb,var(--sketch-ink) 84%,#111);
  font-size:.72rem;
  font-weight:1000;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.date-timeline-boundary.start{
  top:18px;
  left:50%;
  transform:translateX(calc(-100% - 22px));
}
.date-timeline-boundary.end{
  right:50%;
  bottom:18px;
  transform:translateX(calc(100% + 22px));
}
.date-timeline-node{
  position:absolute;
  top:var(--timeline-y);
  width:min(240px,32%);
  border:0;
  background:transparent;
  color:#cbd5e1;
  padding:0;
  clip-path:none!important;
  overflow:visible;
  transform:translateY(-50%);
  cursor:pointer;
}
.date-timeline-node.active{
  z-index:4;
}
.date-timeline-node.left{
  left:calc(50% - min(280px,38%));
  text-align:right;
}
.date-timeline-node.right{
  right:calc(50% - min(280px,38%));
  text-align:left;
}
.date-timeline-branch{
  position:absolute;
  top:50%;
  width:clamp(44px,8vw,94px);
  height:0;
  border-top:4px solid color-mix(in srgb,var(--node-color) 58%,var(--sketch-ink));
  border-radius:50%;
  background:transparent;
  transform:translateY(-50%);
}
.date-timeline-node.left .date-timeline-branch{
  left:100%;
  transform:translateY(-50%) rotate(3.5deg);
}
.date-timeline-node.right .date-timeline-branch{
  right:100%;
  transform:translateY(-50%) rotate(-3.5deg);
}
.date-timeline-orb{
  position:relative;
  display:grid;
  align-content:center;
  justify-items:center;
  width:100%;
  aspect-ratio:1/1;
  max-width:230px;
  margin-inline:auto;
  border:4px solid color-mix(in srgb,var(--node-color) 56%,var(--sketch-ink));
  border-radius:49% 51% 46% 54%/52% 47% 53% 48%;
  background:
    radial-gradient(circle at 36% 28%,rgba(255,255,255,.18),transparent 24%),
    color-mix(in srgb,var(--node-color) 42%,rgba(255,255,255,.18));
  color:#101414;
  padding:28px;
  box-shadow:7px 8px 0 rgba(0,0,0,.12),inset 0 0 0 2px rgba(255,255,255,.3);
  transition:transform .2s ease,box-shadow .2s ease,filter .2s ease;
}
.date-timeline-orb:before,
.date-timeline-orb:after{
  content:"";
  position:absolute;
  inset:8px;
  border:2px solid color-mix(in srgb,var(--sketch-ink) 52%,transparent);
  border-radius:52% 48% 50% 50%/47% 53% 49% 51%;
  transform:rotate(-4deg);
  pointer-events:none;
}
.date-timeline-orb:after{
  inset:15px;
  border-style:dashed;
  opacity:.36;
  transform:rotate(5deg);
}
.date-timeline-node.left .date-timeline-orb{
  transform:rotate(-1.4deg);
}
.date-timeline-node.right .date-timeline-orb{
  transform:rotate(1.2deg);
}
.date-timeline-orb em{
  position:relative;
  z-index:1;
  display:block;
  color:inherit;
  font-style:normal;
  font-size:clamp(1.45rem,3vw,2.35rem);
  font-weight:1000;
  letter-spacing:.02em;
}
.date-timeline-orb em:after{
  content:"";
  display:block;
  width:70%;
  max-width:120px;
  margin:10px auto 9px;
  border-top:3px dotted color-mix(in srgb,var(--sketch-ink) 52%,transparent);
}
.date-timeline-orb strong{
  position:relative;
  z-index:1;
  display:block;
  color:inherit;
  font-size:clamp(.78rem,1.4vw,1.05rem);
  line-height:1.14;
  text-transform:uppercase;
}
.date-timeline-orb small{
  position:relative;
  z-index:1;
  display:block;
  max-width:170px;
  margin-top:8px;
  color:rgba(16,20,20,.72);
  font-size:.72rem;
  line-height:1.32;
}
.date-timeline-icon{
  position:absolute;
  display:grid;
  place-items:center;
  right:-8px;
  bottom:8%;
  width:62px;
  height:62px;
  border:3px solid color-mix(in srgb,var(--sketch-ink) 58%,transparent);
  border-radius:46% 54% 51% 49%/52% 46% 54% 48%;
  background:color-mix(in srgb,var(--node-color) 24%,rgba(255,255,255,.5));
  box-shadow:4px 5px 0 rgba(0,0,0,.14);
  transform:rotate(4deg);
}
.date-timeline-node.left .date-timeline-icon{
  right:auto;
  left:-8px;
  transform:rotate(-5deg);
}
.date-timeline-icon svg{
  width:32px;
  height:32px;
  fill:color-mix(in srgb,var(--node-color) 72%,#000);
}
.date-timeline-node:hover .date-timeline-orb,
.date-timeline-node:focus-visible .date-timeline-orb{
  filter:saturate(1.08);
  box-shadow:8px 10px 0 rgba(0,0,0,.16),0 0 0 6px color-mix(in srgb,var(--node-color) 22%,transparent),inset 0 0 0 2px rgba(255,255,255,.38);
}
.date-timeline-node.left:hover .date-timeline-orb,
.date-timeline-node.left:focus-visible .date-timeline-orb{
  transform:rotate(-1.4deg) scale(1.04);
}
.date-timeline-node.right:hover .date-timeline-orb,
.date-timeline-node.right:focus-visible .date-timeline-orb{
  transform:rotate(1.2deg) scale(1.04);
}
.date-timeline-detail-copy{
  position:absolute;
  top:50%;
  display:block;
  width:min(300px,34vw);
  border:2px solid color-mix(in srgb,var(--sketch-ink) 70%,transparent);
  border-radius:8px 13px 7px 11px/12px 7px 13px 8px;
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 14%,rgba(255,255,255,.22)),rgba(255,255,255,.16)),
    var(--sketch-paper);
  box-shadow:6px 7px 0 rgba(0,0,0,.08);
  color:#252a2b;
  padding:12px 14px;
  text-align:left;
  transform:translateY(-50%);
  pointer-events:auto;
  cursor:pointer;
  transform-origin:center;
  transition:transform .22s ease,box-shadow .22s ease,background .22s ease,border-color .22s ease;
}
.date-timeline-detail-copy:before{
  content:"";
  position:absolute;
  top:50%;
  width:48px;
  border-top:4px solid color-mix(in srgb,var(--node-color) 58%,var(--sketch-accent));
  border-radius:50%;
  opacity:.72;
}
.date-timeline-node.left .date-timeline-detail-copy{
  left:calc(100% + clamp(58px,8vw,118px));
  transform:translateY(-50%) rotate(1.1deg);
}
.date-timeline-node.left.active .date-timeline-detail-copy{
  z-index:5;
  border-color:color-mix(in srgb,var(--node-color) 76%,var(--sketch-ink));
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 22%,rgba(255,255,255,.34)),rgba(255,255,255,.24)),
    var(--sketch-paper);
  box-shadow:16px 18px 0 rgba(0,0,0,.16),0 0 0 8px color-mix(in srgb,var(--node-color) 18%,transparent),0 24px 54px rgba(0,0,0,.18);
  transform:translateY(-50%) rotate(1.1deg) scale(1.5);
}
.date-timeline-node.left .date-timeline-detail-copy:before{
  left:-52px;
  transform:rotate(-7deg);
}
.date-timeline-node.right .date-timeline-detail-copy{
  right:calc(100% + clamp(58px,8vw,118px));
  text-align:right;
  transform:translateY(-50%) rotate(-1.1deg);
}
.date-timeline-node.right.active .date-timeline-detail-copy{
  z-index:5;
  border-color:color-mix(in srgb,var(--node-color) 76%,var(--sketch-ink));
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 22%,rgba(255,255,255,.34)),rgba(255,255,255,.24)),
    var(--sketch-paper);
  box-shadow:16px 18px 0 rgba(0,0,0,.16),0 0 0 8px color-mix(in srgb,var(--node-color) 18%,transparent),0 24px 54px rgba(0,0,0,.18);
  transform:translateY(-50%) rotate(-1.1deg) scale(1.5);
}
.date-timeline-node.right .date-timeline-detail-copy:before{
  right:-52px;
  transform:rotate(7deg);
}
.date-timeline-detail-meta{
  display:block;
  color:color-mix(in srgb,var(--node-color) 70%,#111);
  font-size:.72rem;
  font-weight:1000;
  letter-spacing:.02em;
  text-transform:uppercase;
}
.date-timeline-detail-body{
  display:block;
  margin-top:8px;
  color:inherit;
  font-size:.84rem;
  font-weight:800;
  line-height:1.45;
}
.date-timeline-detail-list{
  display:grid;
  gap:5px;
  margin-top:9px;
}
.date-timeline-detail-list span{
  display:block;
  color:inherit;
  font-size:.76rem;
  font-weight:800;
  line-height:1.35;
  opacity:.82;
}
.date-timeline-detail-list span:before{
  content:"~";
  margin-right:6px;
  color:color-mix(in srgb,var(--node-color) 70%,#111);
  font-weight:1000;
}
.site.winter-theme .tab-content .project-card p,
.site.winter-theme .tab-content .project-card ul,
.site.winter-theme .tab-content .project-card li,
.site.winter-theme .project-case-study dd,
.site.winter-theme .project-actions a,
.site.winter-theme .project-detail-list button,
.site.winter-theme .project-detail-list button strong,
.site.winter-theme .project-detail-list button em,
.site.winter-theme .plugin-placement-card,
.site.winter-theme .plugin-debug-card,
.site.winter-theme .telemetry-scaling-card,
.site.winter-theme .plugin-placement-card p,
.site.winter-theme .plugin-debug-card p,
.site.winter-theme .plugin-debug-card li,
.site.winter-theme .telemetry-scaling-card p,
.site.winter-theme .telemetry-scaling-card li,
.site.winter-theme .plugin-placement-flow strong,
.site.winter-theme .tab-content .experience-card p,
.site.winter-theme .tab-content .experience-card ul,
.site.winter-theme .tab-content .experience-card li,
.site.winter-theme .tab-content .section-heading p:not(.eyebrow),
.site.winter-theme .tab-content .stack-grid article,
.site.winter-theme .tab-content .stack-grid h3,
.site.winter-theme .tab-pane-header span,
.site.winter-theme .date-timeline-controls button,
.site.winter-theme .date-timeline-controls strong,
.site.winter-theme .date-timeline-boundary{
  color:#050505;
}
.site.winter-theme .date-timeline-controls div,
.site.winter-theme .date-timeline-rail{
  border-color:rgba(90,150,184,.28);
}
.site.winter-theme .project-case-study div,
.site.winter-theme .project-actions a{
  border-color:rgba(5,5,5,.18);
  background:rgba(255,255,255,.44);
}
.site.winter-theme .project-detail-list{
  border-color:rgba(5,5,5,.18);
  background:rgba(255,255,255,.34);
}
.site.winter-theme .project-detail-list button{
  border-color:rgba(5,5,5,.14);
  background:rgba(255,255,255,.28);
}
.site.winter-theme .project-detail-list button.active{
  background:rgba(255,255,255,.58);
}
.site.winter-theme .plugin-placement-card,
.site.winter-theme .plugin-debug-card,
.site.winter-theme .telemetry-scaling-card,
.site.winter-theme .plugin-placement-flow strong,
.site.winter-theme .plugin-debug-card code{
  border-color:rgba(5,5,5,.18);
  background:rgba(255,255,255,.44);
}
.site.winter-theme .date-timeline-controls button{
  border-color:rgba(90,150,184,.28);
  background:rgba(255,255,255,.58);
}
.site.fall-theme .date-timeline-system{
  --sketch-accent:#d89a45;
}
.site.spring-theme .date-timeline-system{
  --sketch-accent:#2fb986;
}
.site.winter-theme .date-timeline-system{
  --sketch-accent:#5a96b8;
  --sketch-paper:rgba(244,250,252,.2);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-node{
  --node-color:#f2fbf8!important;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-orb{
  color:#050505;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-orb small{
  color:rgba(5,5,5,.72);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-icon svg{
  fill:#2b2b2b;
}
.site.fall-theme .date-timeline-node{
  --node-color:#d89a45!important;
}
.site.spring-theme .date-timeline-node{
  --node-color:#2fb986!important;
}
.site.winter-theme .date-timeline-node{
  --node-color:#5a96b8!important;
}
.site.winter-theme .date-timeline-trunk,
.site.winter-theme .date-timeline-branch{
  background:rgba(90,150,184,.34);
}
.site.winter-theme .date-timeline-orb{
  color:#050505;
}
.site.winter-theme .date-timeline-orb small{
  color:rgba(5,5,5,.72);
}
.site.winter-theme .date-timeline-detail-copy,
.site.winter-theme .date-timeline-detail-meta,
.site.winter-theme .date-timeline-detail-list span:before{
  color:#050505;
}
.site.winter-theme .tab-pane{
  border-color:rgba(90,150,184,.28);
  background:linear-gradient(180deg,rgba(255,255,255,.72),rgba(232,247,255,.48));
}
.site.winter-theme .profile-tab-list{
  border-color:rgba(90,150,184,.28);
  background:linear-gradient(180deg,rgba(255,255,255,.82),rgba(232,247,255,.58));
}
.site.winter-theme .profile-tab-list button.active{
  background:linear-gradient(180deg,rgba(255,255,255,.92),rgba(232,247,255,.72));
  box-shadow:inset 0 3px 0 #5a96b8;
}
.site.winter-theme .profile-tab-list button.active:after{
  background:rgba(238,248,255,.96);
}
.site.winter-theme .tab-pane-header h2,
.site.winter-theme .tab-pane-header span{
  color:#050505;
}
@media (max-width:760px){
  .tab-pane{
    padding:22px;
    gap:28px;
    max-width:100%;
    min-width:0;
    overflow:visible;
  }
  .tab-pane-header{
    grid-template-columns:1fr;
    gap:18px;
    padding-bottom:20px;
  }
  .tab-pane-body{
    gap:36px;
  }
  .tabbed-subsection{
    gap:24px;
    min-width:0;
  }
  .project-detail-tabs,
  .project-detail-panel,
  .project-detail-panel .project-card,
  .tab-content .project-card,
  .tab-content .experience-card,
  .tab-content .stack-grid article,
  .tab-content .architecture-panel,
  .project-case-study,
  .plugin-architecture-details,
  .telemetry-architecture-details{
    max-width:100%;
    min-width:0;
  }
  .tab-content .project-grid,
  .tab-content .experience-grid,
  .tab-content .stack-grid{
    gap:22px;
  }
  .tab-content .project-card,
  .tab-content .experience-card,
  .tab-content .stack-grid article{
    padding:24px;
  }
  .project-detail-list{
    grid-template-columns:none;
    grid-auto-flow:column;
    grid-auto-columns:minmax(190px,72vw);
    overflow-x:auto;
    overflow-y:hidden;
    scroll-snap-type:x proximity;
    scroll-padding-inline:40px;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
  }
  .project-detail-list::-webkit-scrollbar{
    display:none;
  }
  .project-detail-list button{
    scroll-snap-align:start;
    min-width:0;
    overflow-wrap:anywhere;
  }
  .project-case-study div,
  .plugin-architecture-details,
  .telemetry-architecture-details{
    grid-template-columns:1fr;
  }
  .project-actions a,
  .chip,
  .flow-node span,
  .plugin-placement-flow strong,
  .plugin-debug-card code{
    white-space:normal;
    overflow-wrap:anywhere;
    word-break:break-word;
  }
  .date-timeline-rail{
    min-height:1120px;
    overflow:hidden;
    padding-inline:8px;
  }
  .date-timeline-node{
    left:50% !important;
    right:auto !important;
    width:min(78vw,300px);
    max-width:calc(100% - 22px);
    text-align:center !important;
    transform:translate(-50%,-50%);
  }
  .date-timeline-node.left,
  .date-timeline-node.right{
    left:50% !important;
    right:auto !important;
  }
  .date-timeline-node.active{
    transform:translate(-50%,-50%);
  }
  .date-timeline-branch{
    display:none;
  }
  .date-timeline-detail-copy{
    position:relative;
    top:auto;
    left:auto !important;
    right:auto !important;
    width:min(72vw,280px);
    margin:14px auto 0;
    padding:13px;
    font-size:.8rem;
    text-align:left !important;
    transform:none !important;
    overflow-wrap:anywhere;
  }
  .date-timeline-detail-copy:before{
    display:none;
  }
  .date-timeline-node.left.active .date-timeline-detail-copy,
  .date-timeline-node.right.active .date-timeline-detail-copy{
    transform:scale(1.08) !important;
    transform-origin:center top;
  }
  .date-timeline-detail-body{
    font-size:.78rem;
    line-height:1.38;
  }
  .date-timeline-detail-list{
    display:grid;
  }
  .date-timeline-orb{
    width:132px;
    max-width:132px;
    padding:18px;
    margin-inline:auto;
  }
  .date-timeline-orb em{
    font-size:1.45rem;
  }
  .date-timeline-orb strong{
    font-size:.68rem;
  }
  .date-timeline-icon{
    position:relative;
    right:auto;
    left:auto !important;
    bottom:auto;
    width:48px;
    height:48px;
    margin:-24px auto 0;
    transform:rotate(3deg) !important;
  }
  .date-timeline-icon svg{
    width:25px;
    height:25px;
  }
}
.personal-subtabs{
  display:grid;
  grid-template-columns:minmax(180px,.28fr) minmax(0,1fr);
  gap:28px;
  align-items:stretch;
}
.personal-subtab-list{
  display:grid;
  align-content:start;
  gap:12px;
}
.personal-subtab-list button{
  position:relative;
  display:grid;
  gap:7px;
  border:1px solid rgba(255,255,255,.16);
  background:
    linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.015)),
    rgba(0,0,0,.2);
  color:var(--text);
  padding:16px 16px 15px;
  text-align:left;
  clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);
  transition:background .2s ease,border-color .2s ease,transform .2s ease;
}
.personal-subtab-list button:hover{
  border-color:rgba(255,255,255,.32);
  background:rgba(255,255,255,.09);
  transform:translateX(4px);
}
.personal-subtab-list button.active{
  border-color:color-mix(in srgb,var(--gold) 62%,rgba(255,255,255,.2));
  background:
    linear-gradient(135deg,color-mix(in srgb,var(--gold) 18%,transparent),rgba(255,255,255,.035)),
    rgba(0,0,0,.26);
  box-shadow:inset 4px 0 0 var(--gold),0 12px 34px rgba(0,0,0,.18);
}
.personal-subtab-list button span{
  color:var(--gold);
  font-size:.68rem;
  letter-spacing:.1em;
}
.personal-subtab-list button strong{
  font-size:1rem;
  line-height:1.1;
}
.personal-subtab-panel{
  display:grid;
  gap:24px;
  min-height:320px;
  padding:34px;
  clip-path:none!important;
}
.personal-subtab-heading{
  display:grid;
  gap:10px;
  max-width:760px;
}
.personal-subtab-heading p{
  margin:0;
  color:var(--gold);
  font-size:.74rem;
  letter-spacing:.12em;
  text-transform:uppercase;
}
.personal-subtab-heading h3{
  margin:0;
  color:#f2fbf8;
  font-size:clamp(1.85rem,3.2vw,3.3rem);
  line-height:.96;
  text-transform:uppercase;
}
.personal-subtab-heading span,
.personal-subtab-body{
  color:#d2d2d2;
  line-height:1.72;
}
.personal-subtab-body{
  max-width:820px;
  margin:0;
  font-size:1.02rem;
}
.personal-media-experience{
  display:grid;
  grid-template-columns:minmax(0,1.1fr) minmax(260px,.62fr);
  gap:22px;
  align-items:start;
}
.personal-featured-media{
  position:sticky;
  top:106px;
  display:grid;
  margin:0;
  border:1px solid rgba(255,255,255,.14);
  background:
    linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),
    rgba(0,0,0,.18);
  overflow:hidden;
  clip-path:polygon(0 0,calc(100% - 26px) 0,100% 26px,100% 100%,0 100%);
  box-shadow:0 26px 70px rgba(0,0,0,.18);
}
.personal-featured-media:before{
  content:"";
  position:absolute;
  inset:14px;
  border:1px solid rgba(255,255,255,.12);
  pointer-events:none;
  z-index:2;
}
.personal-featured-media > img,
.personal-featured-media > video,
.personal-featured-media > .personal-media-placeholder{
  width:100%;
  height:clamp(320px,44vw,540px);
}
.personal-featured-media img,
.personal-featured-media video,
.personal-media-thumb img,
.personal-media-thumb video{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
}
.personal-featured-media figcaption{
  display:grid;
  gap:9px;
  padding:22px 24px 24px;
  color:#d8e4f5;
  line-height:1.55;
}
.personal-featured-media figcaption span,
.personal-media-copy em,
.personal-media-placeholder span{
  color:var(--gold);
  font-size:.72rem;
  font-style:normal;
  font-weight:1000;
  letter-spacing:.12em;
  text-transform:uppercase;
}
.personal-featured-media figcaption strong{
  color:#f8fafc;
  font-size:clamp(1.35rem,2.4vw,2.25rem);
  line-height:1.04;
  text-transform:uppercase;
}
.personal-featured-media figcaption p{
  margin:0;
}
.personal-media-feed{
  display:grid;
  grid-template-columns:minmax(0,1fr);
  gap:12px;
}
::view-transition-group(*){
  animation-duration:.58s;
  animation-timing-function:cubic-bezier(.2,.78,.16,1);
}
::view-transition-old(*),
::view-transition-new(*){
  animation-duration:.58s;
  animation-timing-function:cubic-bezier(.2,.78,.16,1);
  mix-blend-mode:normal;
}
.personal-swap-clone{
  z-index:9999!important;
  box-sizing:border-box;
  filter:drop-shadow(0 24px 46px rgba(0,0,0,.34));
  will-change:transform,opacity;
}
.personal-media-card{
  position:relative;
  display:grid;
  grid-template-columns:auto 92px minmax(0,1fr);
  gap:14px;
  align-items:stretch;
  width:100%;
  border:1px solid rgba(255,255,255,.12);
  background:
    linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.012)),
    rgba(0,0,0,.16);
  color:var(--text);
  padding:10px;
  text-align:left;
  overflow:hidden;
  clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);
  transition:translate .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease;
  will-change:translate;
}
.personal-media-card:hover{
  border-color:color-mix(in srgb,var(--gold) 58%,rgba(255,255,255,.18));
  background:
    linear-gradient(135deg,color-mix(in srgb,var(--gold) 14%,transparent),rgba(255,255,255,.03)),
    rgba(0,0,0,.24);
  translate:-5px 0;
  box-shadow:0 18px 42px rgba(0,0,0,.16);
}
.personal-media-index{
  display:grid;
  place-items:center;
  width:34px;
  color:var(--gold);
  font-weight:1000;
  font-size:.72rem;
  letter-spacing:.08em;
}
.personal-media-thumb{
  position:relative;
  display:block;
  min-height:92px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(0,0,0,.2);
  overflow:hidden;
}
.personal-media-copy{
  display:grid;
  align-content:center;
  gap:7px;
  min-width:0;
}
.personal-media-copy strong{
  color:#f8fafc;
  line-height:1.15;
  text-transform:uppercase;
}
.personal-media-copy span{
  color:#d8e4f5;
  line-height:1.45;
  font-size:.9rem;
}
.personal-media-placeholder{
  display:grid;
  align-content:center;
  justify-items:start;
  gap:12px;
  padding:28px;
  color:#f8fafc;
  background:
    linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.015)),
    radial-gradient(circle at 22% 18%,color-mix(in srgb,var(--gold) 18%,transparent),transparent 36%),
    repeating-linear-gradient(-12deg,rgba(255,255,255,.055) 0 1px,transparent 1px 18px),
    rgba(0,0,0,.24);
}
.personal-media-placeholder strong{
  max-width:560px;
  font-size:clamp(1.35rem,2.6vw,2.25rem);
  line-height:1.04;
  text-transform:uppercase;
}
.personal-media-placeholder.compact{
  width:100%;
  height:100%;
  min-height:92px;
  justify-items:center;
  text-align:center;
  padding:12px;
}
.personal-media-placeholder.compact span{
  font-size:.58rem;
}
.personal-media-placeholder.compact strong{
  font-size:.8rem;
}
.profile-tabs{
  position:relative;
  z-index:3;
  width:100%;
  max-width:none;
  margin:0;
  padding:0;
}
.profile-tab-list{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:0;
  border:1px solid rgba(255,255,255,.18);
  border-bottom:0;
  background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.18));
  box-shadow:0 18px 70px rgba(0,0,0,.22);
}
.profile-tab-list button{
  position:relative;
  min-height:74px;
  border:0;
  border-right:1px solid rgba(255,255,255,.12);
  border-bottom:1px solid rgba(255,255,255,.13);
  background:rgba(0,0,0,.18);
  color:var(--text);
  padding:14px 16px 13px;
  text-align:left;
  clip-path:none;
  transition:background .2s ease,color .2s ease,box-shadow .2s ease;
}
.profile-tab-list button:last-child{
  border-right:0;
}
.profile-tab-list button:hover{
  background:rgba(255,255,255,.12);
}
.profile-tab-list button.active{
  border-bottom-color:transparent;
  background:
    linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),
    rgba(0,0,0,.28);
  box-shadow:inset 0 3px 0 var(--gold);
}
.profile-tab-list button.active:after{
  content:"";
  position:absolute;
  left:0;
  right:0;
  bottom:-1px;
  height:1px;
  background:rgba(8,14,20,.98);
}
.profile-tab-list button span{
  display:block;
  color:var(--gold);
  font-size:.66rem;
  letter-spacing:.07em;
  text-transform:uppercase;
}
.profile-tab-list button strong{
  display:block;
  margin-top:8px;
  font-size:.96rem;
  line-height:1.1;
}
.profile-tab-panel{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:minmax(190px,.34fr) minmax(0,1fr);
  gap:16px;
  margin-top:14px;
  padding-top:16px;
  border-top:1px solid rgba(255,255,255,.13);
}
.profile-tab-intro p,
.profile-tab-section h4,
.profile-tab-item p{
  margin:0;
  color:var(--gold);
  font-size:.72rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.profile-tab-intro h3{
  margin:9px 0 10px;
  font-size:clamp(1.25rem,2vw,1.8rem);
  line-height:1.06;
  letter-spacing:.01em;
  text-transform:uppercase;
}
.profile-tab-intro span,
.profile-tab-item span,
.profile-tab-item li{
  color:#d2d2d2;
  line-height:1.45;
  font-size:.92rem;
}
.profile-tab-sections{
  display:grid;
  gap:14px;
}
.profile-tab-section h4{
  margin-bottom:10px;
}
.profile-tab-items{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px;
}
.profile-tab-item{
  display:grid;
  gap:6px;
  padding:0 0 10px 12px;
  border-left:1px solid rgba(255,255,255,.22);
  border-bottom:1px solid rgba(255,255,255,.1);
}
.profile-tab-item h5{
  margin:0;
  color:#f2fbf8;
  font-size:1rem;
  line-height:1.16;
}
.profile-tab-item strong{
  color:var(--cyan2);
  font-size:.84rem;
}
.profile-tab-item ul{
  display:grid;
  gap:6px;
  margin:3px 0 0;
  padding:0;
  list-style:none;
}
.profile-tab-item li:before{
  content:"/";
  color:var(--gold);
  margin-right:7px;
}
.site.fall-theme .profile-tab-list,
.site.spring-theme .profile-tab-list{
  border-color:var(--line);
  background:rgba(255,255,255,.06);
}
.site.fall-theme .profile-tab-list button,
.site.spring-theme .profile-tab-list button{
  border-right-color:var(--line);
  border-bottom-color:var(--line);
  background:rgba(255,255,255,.04);
}
.site.fall-theme .profile-tab-list button.active,
.site.spring-theme .profile-tab-list button.active{
  border-bottom-color:transparent;
  background:rgba(255,255,255,.12);
}
.site.fall-theme .profile-tab-list button.active:after,
.site.spring-theme .profile-tab-list button.active:after{
  background:rgba(8,14,20,.98);
}
.site.winter-theme .profile-tab-list button,
.site.winter-theme .personal-subtab-list button,
.site.winter-theme .personal-subtab-heading h3,
.site.winter-theme .personal-subtab-heading span,
.site.winter-theme .personal-subtab-body,
.site.winter-theme .personal-media-placeholder,
.site.winter-theme .personal-featured-media figcaption,
.site.winter-theme .personal-featured-media figcaption strong,
.site.winter-theme .personal-media-copy,
.site.winter-theme .personal-media-copy strong,
.site.winter-theme .personal-media-copy span,
.site.winter-theme .profile-tab-intro span,
.site.winter-theme .profile-tab-item span,
.site.winter-theme .profile-tab-item li,
.site.winter-theme .profile-tab-item h5,
.site.winter-theme .profile-tab-item strong{
  color:#050505;
}
@media (max-width:1180px){
  .profile-tabs{
    max-width:none;
  }
  .plugin-workflow,
  .telemetry-workflow{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .plugin-architecture-details,
  .telemetry-architecture-details{
    grid-template-columns:1fr;
  }
  .profile-tab-list{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .profile-tab-panel{
    grid-template-columns:1fr;
  }
  .personal-media-experience{
    grid-template-columns:1fr;
  }
  .personal-featured-media{
    position:relative;
    top:auto;
  }
}
@media (max-width:760px){
  .project-detail-tabs,
  .profile-tabs,
  .personal-subtabs{
    position:relative;
    max-width:100%;
    min-width:0;
  }
  .project-detail-tabs:before,
  .project-detail-tabs:after,
  .profile-tabs:before,
  .profile-tabs:after,
  .personal-subtabs:before,
  .personal-subtabs:after{
    position:absolute;
    top:18px;
    z-index:8;
    display:grid;
    place-items:center;
    width:34px;
    height:44px;
    border:1px solid color-mix(in srgb,var(--gold) 40%,rgba(255,255,255,.18));
    background:
      linear-gradient(180deg,color-mix(in srgb,var(--panel) 88%,transparent),rgba(0,0,0,.28)),
      color-mix(in srgb,var(--bg) 70%,transparent);
    color:var(--gold);
    font-size:1.55rem;
    font-weight:1000;
    line-height:1;
    pointer-events:none;
    box-shadow:0 12px 32px rgba(0,0,0,.28);
  }
  .project-detail-tabs:before,
  .profile-tabs:before,
  .personal-subtabs:before{
    content:"‹";
    left:0;
    clip-path:polygon(0 0,100% 0,calc(100% - 10px) 100%,0 100%);
  }
  .project-detail-tabs:after,
  .profile-tabs:after,
  .personal-subtabs:after{
    content:"›";
    right:0;
    clip-path:polygon(10px 0,100% 0,100% 100%,0 100%);
  }
  .profile-tabs{
    margin:0;
    padding:0;
  }
  .plugin-workflow,
  .telemetry-workflow{
    grid-template-columns:1fr;
  }
  .plugin-placement-card,
  .plugin-debug-card,
  .telemetry-scaling-card{
    padding:18px;
  }
  .profile-tab-list{
    grid-template-columns:none;
    grid-auto-flow:column;
    grid-auto-columns:minmax(168px,64vw);
    overflow-x:auto;
    overflow-y:hidden;
    scroll-snap-type:x proximity;
    scroll-padding-inline:40px;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
  }
  .profile-tab-list::-webkit-scrollbar{
    display:none;
  }
  .profile-tab-list button{
    scroll-snap-align:start;
    min-width:0;
    overflow-wrap:anywhere;
  }
  .profile-tab-items{
    grid-template-columns:1fr;
  }
  .personal-subtabs{
    grid-template-columns:1fr;
  }
  .personal-subtab-list{
    grid-template-columns:none;
    grid-auto-flow:column;
    grid-auto-columns:minmax(170px,64vw);
    overflow-x:auto;
    overflow-y:hidden;
    scroll-snap-type:x proximity;
    scroll-padding-inline:40px;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
  }
  .personal-subtab-list::-webkit-scrollbar{
    display:none;
  }
  .personal-subtab-list button{
    scroll-snap-align:start;
    min-width:0;
    overflow-wrap:anywhere;
  }
  .personal-subtab-panel{
    padding:24px;
  }
  .personal-featured-media > img,
  .personal-featured-media > video,
  .personal-featured-media > .personal-media-placeholder{
    height:clamp(260px,72vw,360px);
  }
  .personal-featured-media figcaption{
    padding:18px;
  }
  .personal-media-card{
    grid-template-columns:auto 74px minmax(0,1fr);
    gap:10px;
  }
  .personal-media-thumb,
  .personal-media-placeholder.compact{
    min-height:74px;
  }
  .personal-media-copy span{
    display:none;
  }
  .profile-tab-list button{
    min-height:62px;
  }
}
`;

export const dimensionalStyles = `
.site{
  --dimension-ink:var(--cyan2);
  --dimension-accent:var(--gold);
  --dimension-shadow:rgba(0,0,0,.66);
  --dimension-glass:color-mix(in srgb,var(--panel) 74%,transparent);
  --dimension-code:#e9fbff;
}
.site.fall-theme{
  --dimension-ink:#491323;
  --dimension-accent:#ffe36f;
  --dimension-shadow:rgba(43,12,24,.42);
  --dimension-code:#32101c;
}
.site.spring-theme{
  --dimension-ink:#0b5948;
  --dimension-accent:#b8f55f;
  --dimension-shadow:rgba(5,48,38,.38);
  --dimension-code:#07382e;
}
.site.winter-theme{
  --dimension-ink:#5a96b8;
  --dimension-accent:#f8fdff;
  --dimension-shadow:rgba(73,112,140,.28);
  --dimension-code:#111;
}
.site:before{
  content:"project://aegis  async pipeline  unreal driver  telemetry.signal  proof > presentation";
  position:fixed;
  left:-8vw;
  top:18vh;
  z-index:2;
  width:122vw;
  color:color-mix(in srgb,var(--dimension-ink) 26%,transparent);
  font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",monospace;
  font-size:clamp(1.5rem,4.2vw,5.8rem);
  font-weight:900;
  letter-spacing:.18em;
  line-height:1.7;
  text-transform:uppercase;
  opacity:.18;
  transform:rotate(-8deg) translateZ(0);
  pointer-events:none;
  text-shadow:0 0 28px color-mix(in srgb,var(--dimension-ink) 32%,transparent);
}
.hero-sector{
  align-items:center;
  perspective:1400px;
  min-height:112vh;
}
.hero-copy{
  position:relative;
  z-index:2;
  transform-style:preserve-3d;
}
.hero-copy:before{
  content:"";
  position:absolute;
  inset:clamp(6px,1vw,18px) auto auto clamp(0px,1vw,18px);
  width:min(38vw,460px);
  height:min(38vw,460px);
  border:1px solid color-mix(in srgb,var(--dimension-ink) 18%,transparent);
  background:
    linear-gradient(90deg,color-mix(in srgb,var(--dimension-ink) 12%,transparent) 1px,transparent 1px),
    linear-gradient(color-mix(in srgb,var(--dimension-ink) 12%,transparent) 1px,transparent 1px);
  background-size:32px 32px;
  transform:translate3d(-28px,-42px,-90px) rotateX(62deg) rotateZ(-12deg);
  opacity:.42;
  pointer-events:none;
}
.hero-copy h1{
  max-width:1020px;
  text-shadow:
    0 1px 0 color-mix(in srgb,var(--dimension-ink) 34%,transparent),
    0 18px 45px var(--dimension-shadow),
    0 0 42px color-mix(in srgb,var(--dimension-ink) 22%,transparent);
}
.hero-copy h2{
  max-width:820px;
}
.hero-signal-strip{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:26px;
  max-width:760px;
}
.hero-signal-strip span{
  display:inline-grid;
  place-items:center;
  min-height:34px;
  border:1px solid color-mix(in srgb,var(--dimension-ink) 24%,transparent);
  background:color-mix(in srgb,var(--panel) 64%,transparent);
  color:var(--dimension-code);
  padding:8px 12px;
  font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",monospace;
  font-size:.72rem;
  font-weight:900;
  letter-spacing:.04em;
  text-transform:lowercase;
  transform:skewX(-7deg);
  box-shadow:8px 10px 0 color-mix(in srgb,var(--dimension-shadow) 54%,transparent);
}
.hero-dimensional-stage{
  position:relative;
  z-index:4;
  min-height:min(68vh,620px);
  display:grid;
  align-content:center;
  justify-items:center;
  perspective:1200px;
  transform-style:preserve-3d;
}
.dimension-field{
  position:relative;
  width:min(44vw,560px);
  aspect-ratio:1;
  transform-style:preserve-3d;
  animation:dimensionFloat 8s ease-in-out infinite;
}
.dimension-ring,
.dimension-grid-plane,
.dimension-core,
.dimension-node{
  position:absolute;
  transform-style:preserve-3d;
}
.dimension-ring{
  inset:9%;
  border:1px solid color-mix(in srgb,var(--dimension-ink) 46%,transparent);
  border-radius:50%;
  box-shadow:
    inset 0 0 34px color-mix(in srgb,var(--dimension-ink) 12%,transparent),
    0 0 44px color-mix(in srgb,var(--dimension-ink) 18%,transparent);
}
.ring-a{transform:rotateX(66deg) rotateZ(12deg);}
.ring-b{inset:18%;transform:rotateY(72deg) rotateX(14deg);}
.ring-c{inset:27%;transform:rotateX(74deg) rotateY(28deg) rotateZ(92deg);}
.dimension-grid-plane{
  left:8%;
  right:8%;
  bottom:2%;
  height:38%;
  background:
    linear-gradient(90deg,color-mix(in srgb,var(--dimension-ink) 14%,transparent) 1px,transparent 1px),
    linear-gradient(color-mix(in srgb,var(--dimension-ink) 12%,transparent) 1px,transparent 1px);
  background-size:28px 28px;
  border:1px solid color-mix(in srgb,var(--dimension-ink) 18%,transparent);
  transform:rotateX(72deg) translateZ(-78px);
  opacity:.62;
}
.dimension-core{
  inset:31%;
  display:grid;
  place-items:center;
  align-content:center;
  gap:8px;
  padding:24px;
  border:1px solid color-mix(in srgb,var(--dimension-accent) 52%,transparent);
  background:
    radial-gradient(circle at 50% 20%,color-mix(in srgb,var(--dimension-accent) 22%,transparent),transparent 48%),
    linear-gradient(145deg,color-mix(in srgb,var(--panel) 92%,transparent),rgba(0,0,0,.18));
  color:var(--dimension-code);
  text-align:center;
  clip-path:polygon(10% 0,100% 0,90% 100%,0 100%);
  box-shadow:
    0 28px 80px var(--dimension-shadow),
    0 0 0 1px color-mix(in srgb,var(--dimension-ink) 16%,transparent),
    inset 0 0 42px color-mix(in srgb,var(--dimension-ink) 12%,transparent);
  transform:translateZ(92px) rotateX(3deg);
}
.dimension-core span,
.dimension-core em,
.dimension-console,
.dimension-node small,
.dimension-node em{
  font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",monospace;
}
.dimension-core span{
  color:var(--dimension-accent);
  font-size:.68rem;
  font-weight:1000;
  letter-spacing:.08em;
}
.dimension-core strong{
  max-width:180px;
  color:var(--text);
  font-size:clamp(1.05rem,2vw,1.55rem);
  line-height:1;
  text-transform:uppercase;
}
.dimension-core em{
  color:var(--muted);
  font-size:.7rem;
  font-style:normal;
}
.dimension-node{
  display:grid;
  gap:4px;
  min-width:142px;
  padding:12px 13px;
  border:1px solid color-mix(in srgb,var(--dimension-ink) 34%,transparent);
  background:
    linear-gradient(145deg,color-mix(in srgb,var(--panel) 78%,transparent),rgba(0,0,0,.18));
  color:var(--dimension-code);
  box-shadow:14px 18px 42px var(--dimension-shadow);
  clip-path:polygon(0 0,calc(100% - 13px) 0,100% 13px,100% 100%,0 100%);
  backdrop-filter:blur(18px);
}
.dimension-node small{
  color:var(--dimension-accent);
  font-size:.64rem;
  font-weight:1000;
}
.dimension-node strong{
  color:var(--text);
  font-size:.9rem;
  text-transform:uppercase;
}
.dimension-node em{
  color:var(--muted);
  font-size:.68rem;
  font-style:normal;
}
.dimension-node.front{left:50%;top:2%;transform:translateX(-50%) translateZ(150px) rotateX(-5deg);}
.dimension-node.right{right:-4%;top:42%;transform:translateZ(80px) rotateY(-22deg);}
.dimension-node.back{left:50%;bottom:0;transform:translateX(-50%) translateZ(-82px) rotateX(6deg);}
.dimension-node.left{left:-5%;top:42%;transform:translateZ(74px) rotateY(22deg);}
.dimension-console{
  width:min(100%,520px);
  margin-top:18px;
  display:grid;
  gap:8px;
  border:1px solid color-mix(in srgb,var(--dimension-ink) 28%,transparent);
  background:linear-gradient(90deg,color-mix(in srgb,var(--panel) 82%,transparent),rgba(0,0,0,.2));
  color:var(--dimension-code);
  padding:16px 18px;
  box-shadow:12px 14px 0 color-mix(in srgb,var(--dimension-shadow) 58%,transparent);
  transform:rotateX(8deg) translateZ(20px);
}
.dimension-console span,
.dimension-console em{
  color:var(--dimension-accent);
  font-size:.72rem;
  font-style:normal;
}
.dimension-console strong{
  color:var(--text);
  font-size:.82rem;
  line-height:1.45;
}
.tab-content{
  perspective:1300px;
  transform-style:preserve-3d;
}
.profile-tabs{
  transform-style:preserve-3d;
  transform:translateZ(38px);
}
.profile-tab-list{
  box-shadow:
    0 24px 70px var(--dimension-shadow),
    inset 0 1px 0 color-mix(in srgb,var(--dimension-accent) 24%,transparent);
}
.profile-tab-list button{
  transform-style:preserve-3d;
}
.profile-tab-list button.active{
  transform:translateY(-8px) translateZ(34px);
}
.tab-pane{
  transform-style:preserve-3d;
  box-shadow:
    0 42px 120px var(--dimension-shadow),
    0 0 0 1px color-mix(in srgb,var(--dimension-ink) 16%,transparent);
}
.tab-pane:before{
  background:
    radial-gradient(circle at 18% 10%,color-mix(in srgb,var(--dimension-ink) 16%,transparent),transparent 30%),
    repeating-linear-gradient(115deg,color-mix(in srgb,var(--dimension-ink) 8%,transparent) 0 1px,transparent 1px 18px);
}
.tab-pane-header{
  transform:translateZ(26px);
}
.tab-pane-header p:before{
  content:"project://";
  margin-right:6px;
  color:var(--dimension-accent);
}
.project-detail-panel,
.personal-subtab-panel,
.date-timeline-system,
.stack-grid article,
.architecture-panel{
  transform-style:preserve-3d;
}
.project-card,
.architecture-panel,
.personal-subtab-panel,
.stack-grid article,
.experience-card{
  box-shadow:
    0 32px 90px var(--dimension-shadow),
    0 0 0 1px color-mix(in srgb,var(--dimension-ink) 13%,transparent);
}
.project-card:hover,
.architecture-panel:hover,
.personal-subtab-panel:hover,
.stack-grid article:hover{
  border-color:color-mix(in srgb,var(--dimension-accent) 54%,var(--line));
}
.project-visual{
  perspective:900px;
  transform-style:preserve-3d;
  background:
    radial-gradient(circle at 50% 44%,color-mix(in srgb,var(--dimension-ink) 24%,transparent),transparent 58%),
    linear-gradient(135deg,rgba(255,255,255,.035),rgba(0,0,0,.28));
}
.flow-node{
  transform:translateZ(22px) rotateY(-8deg);
}
.flow-node:nth-child(even){
  transform:translateZ(44px) rotateY(8deg);
}
.flow-node span{
  box-shadow:8px 10px 0 color-mix(in srgb,var(--dimension-shadow) 52%,transparent);
}
.date-timeline-rail{
  box-shadow:
    inset 0 0 70px color-mix(in srgb,var(--dimension-ink) 8%,transparent),
    0 34px 100px var(--dimension-shadow);
}
.date-timeline-node{
  transform-style:preserve-3d;
}
.date-timeline-node.left{
  transform:translateY(-50%) rotateY(-9deg);
}
.date-timeline-node.right{
  transform:translateY(-50%) rotateY(9deg);
}
.date-timeline-node.active{
  transform:translateY(-50%) translateZ(90px) scale(1.03);
}
.personal-media-experience{
  perspective:1200px;
}
.personal-featured-media{
  transform:translateZ(34px) rotateY(-3deg);
  box-shadow:0 34px 110px var(--dimension-shadow);
}
.personal-media-card{
  transform-style:preserve-3d;
}
.personal-media-card:hover{
  transform:translateX(-4px) translateZ(24px) rotateY(-4deg);
}
.footer-shell{
  perspective:900px;
  transform-style:preserve-3d;
}
.footer-shell:before{
  background:
    radial-gradient(circle at var(--mx,50%) var(--my,10%),color-mix(in srgb,var(--dimension-accent) 18%,transparent),transparent 42%),
    repeating-linear-gradient(90deg,color-mix(in srgb,var(--dimension-ink) 7%,transparent) 0 1px,transparent 1px 22px);
}
@keyframes dimensionFloat{
  0%,100%{transform:rotateX(59deg) rotateZ(-13deg) translate3d(0,0,0);}
  50%{transform:rotateX(65deg) rotateZ(-7deg) translate3d(0,-16px,26px);}
}
@media (prefers-reduced-motion:reduce){
  .dimension-field{
    animation:none;
  }
}
@media (max-width:1180px){
  .hero-sector{
    min-height:auto;
    padding-bottom:36px;
  }
  .hero-dimensional-stage{
    min-height:520px;
  }
  .dimension-field{
    width:min(82vw,520px);
  }
}
@media (max-width:760px){
  .site:before{
    top:22vh;
    font-size:2rem;
    opacity:.1;
  }
  .hero-sector{
    gap:24px;
  }
  .hero-copy:before{
    width:78vw;
    height:78vw;
    transform:translate3d(-18px,-16px,-90px) rotateX(66deg) rotateZ(-12deg);
  }
  .hero-signal-strip{
    gap:8px;
  }
  .hero-signal-strip span{
    font-size:.66rem;
    min-height:30px;
    padding:7px 9px;
  }
  .hero-dimensional-stage{
    min-height:420px;
    width:100%;
  }
  .dimension-field{
    width:min(88vw,390px);
  }
  .dimension-node{
    min-width:112px;
    padding:9px 10px;
  }
  .dimension-node em{
    display:none;
  }
  .dimension-core{
    padding:16px;
  }
  .dimension-console{
    width:calc(100% - 22px);
    transform:none;
  }
  .profile-tab-list button.active,
  .tab-pane-header,
  .project-card,
  .architecture-panel,
  .personal-subtab-panel,
  .stack-grid article,
  .experience-card,
  .personal-featured-media{
    transform:none;
  }
  .date-timeline-node.left,
  .date-timeline-node.right,
  .date-timeline-node.active{
    transform:translate(-50%,-50%);
  }
}
`;
