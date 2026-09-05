import { THEME_CONTOUR_TRANSITION_DURATION_MS } from '../utils/cinematicTiming.js';

export const spatialStyles = `
  @font-face {
    font-family: "Morrison";
    src: url("./fonts/Morrison-Regular.otf?v=1.0.0") format("opentype");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "Elounda";
    src: url("./fonts/Elounda-Regular.otf?v=1.0.0") format("opentype");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "Sekaiwo";
    src: url("./fonts/Sekaiwo-Regular.otf?v=1.0.0") format("opentype");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  :root {
    color-scheme: dark;
    font-family: "Barlow Condensed", "Arial Narrow", sans-serif;
    background: #080806;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  * {
    box-sizing: border-box;
    letter-spacing: 0;
  }

  html {
    min-width: 320px;
    background: #080806;
    scrollbar-width: none;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    overflow-x: hidden;
    background: #080806;
  }

  body.archive-dialog-open {
    overflow: hidden;
  }

  button,
  a,
  input {
    font: inherit;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  button {
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  html.theme-contour-transition-active :is(
    .chapter-rail,
    .spatial-hud,
    .spatial-lore-guide,
    .seasonal-vines-living-layer
  ) {
    animation: themeAssetHandoff ${THEME_CONTOUR_TRANSITION_DURATION_MS}ms linear both;
  }

  @keyframes themeAssetHandoff {
    0%, 72% { opacity: 1; }
    86% { opacity: .82; }
    100% { opacity: 1; }
  }

  html.theme-watercolor-transition::view-transition-group(root) {
    animation-duration: 1750ms;
    animation-timing-function: cubic-bezier(.2, .66, .18, 1);
    pointer-events: none;
  }

  html.theme-watercolor-transition::view-transition-old(root) {
    animation: themeWatercolorRetreat 1750ms cubic-bezier(.2, .66, .18, 1) both;
    pointer-events: none;
  }

  html.theme-watercolor-transition::view-transition-new(root) {
    -webkit-mask-image:
      radial-gradient(circle, #000 0 54%, rgba(0,0,0,.92) 62%, rgba(0,0,0,.38) 75%, transparent 100%),
      radial-gradient(circle, #000 0 57%, rgba(0,0,0,.9) 67%, rgba(0,0,0,.34) 80%, transparent 100%),
      radial-gradient(circle, #000 0 52%, rgba(0,0,0,.92) 64%, rgba(0,0,0,.4) 78%, transparent 100%),
      radial-gradient(circle, #000 0 58%, rgba(0,0,0,.9) 68%, rgba(0,0,0,.32) 82%, transparent 100%),
      radial-gradient(circle, #000 0 55%, rgba(0,0,0,.92) 65%, rgba(0,0,0,.36) 80%, transparent 100%);
    mask-image:
      radial-gradient(circle, #000 0 54%, rgba(0,0,0,.92) 62%, rgba(0,0,0,.38) 75%, transparent 100%),
      radial-gradient(circle, #000 0 57%, rgba(0,0,0,.9) 67%, rgba(0,0,0,.34) 80%, transparent 100%),
      radial-gradient(circle, #000 0 52%, rgba(0,0,0,.92) 64%, rgba(0,0,0,.4) 78%, transparent 100%),
      radial-gradient(circle, #000 0 58%, rgba(0,0,0,.9) 68%, rgba(0,0,0,.32) 82%, transparent 100%),
      radial-gradient(circle, #000 0 55%, rgba(0,0,0,.92) 65%, rgba(0,0,0,.36) 80%, transparent 100%);
    -webkit-mask-position: 8% 58%, 34% 20%, 56% 72%, 78% 31%, 94% 66%;
    mask-position: 8% 58%, 34% 20%, 56% 72%, 78% 31%, 94% 66%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    animation: themeWatercolorReveal 1750ms cubic-bezier(.2, .66, .18, 1) both;
    pointer-events: none;
  }

  @keyframes themeWatercolorReveal {
    0% {
      -webkit-mask-size: 0 0, 0 0, 0 0, 0 0, 0 0;
      mask-size: 0 0, 0 0, 0 0, 0 0, 0 0;
      opacity: .22;
    }
    34% {
      -webkit-mask-size: 118% 168%, 76% 108%, 38% 54%, 0 0, 0 0;
      mask-size: 118% 168%, 76% 108%, 38% 54%, 0 0, 0 0;
    }
    62% {
      -webkit-mask-size: 210% 288%, 172% 242%, 138% 196%, 92% 132%, 46% 68%;
      mask-size: 210% 288%, 172% 242%, 138% 196%, 92% 132%, 46% 68%;
      opacity: .82;
    }
    82% {
      -webkit-mask-size: 286% 390%, 254% 350%, 222% 306%, 190% 264%, 154% 218%;
      mask-size: 286% 390%, 254% 350%, 222% 306%, 190% 264%, 154% 218%;
    }
    100% {
      -webkit-mask-size: 390% 530%, 370% 510%, 350% 480%, 330% 456%, 310% 430%;
      mask-size: 390% 530%, 370% 510%, 350% 480%, 330% 456%, 310% 430%;
      opacity: 1;
    }
  }

  @keyframes themeWatercolorRetreat {
    0%, 24% { opacity: 1; transform: scale(1); }
    70% { opacity: .58; transform: scale(1.006); }
    100% { opacity: 0; transform: scale(1.012); }
  }

  .archive-app {
    --font-engraved: "Barlow Condensed", "Agency FB", "Arial Narrow", sans-serif;
    --font-display: "Morrison", "Barlow Condensed", "Agency FB", "Arial Narrow", sans-serif;
    --font-body: var(--font-engraved);
    --font-inscription: var(--font-display);
    --font-navigation: "Elounda", var(--font-display);
    --font-lore: "Sekaiwo", var(--font-navigation);
    --surface-text-shadow: 0 -1px 0 rgba(0, 0, 0, .96), 0 1px 0 rgba(255, 237, 199, .26), 0 2px 6px rgba(0, 0, 0, .74);
    --active-material-filter: brightness(1.28) saturate(1.08);
    --bg: #080806;
    --ink: #fffaf1;
    --muted: #e4dac9;
    --faint: #c7baa5;
    --accent: #f0cf8a;
    --accent-rgb: 240, 207, 138;
    --mountain: #34312d;
    --surface: rgba(17, 16, 14, 0.68);
    --surface-strong: rgba(11, 10, 9, 0.9);
    --panel-ink: #fffaf1;
    --panel-muted: #ddd1be;
    --line: rgba(228, 200, 149, 0.24);
    --line-strong: rgba(228, 200, 149, 0.58);
    --parchment: #d6c7a6;
    --parchment-ink: #fffaf1;
    --danger: #e59467;
    --world-mix: rgba(8, 8, 6, .32);
    --watercolor-pigment-rgb: 176, 151, 108;
    --celestial-primary-rgb: 255, 224, 154;
    --celestial-secondary-rgb: 172, 190, 218;
    --celestial-drift-duration: 13s;
    position: relative;
    min-height: 100vh;
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--ink);
  }

  .archive-app.theme-fall {
    --surface-text-shadow: 0 -1px 0 rgba(20, 3, 7, .98), 0 1px 0 rgba(255, 215, 181, .24), 0 2px 7px rgba(20, 3, 7, .76);
    --active-material-filter: brightness(1.24) saturate(.96);
    --bg: #0f0b0a;
    --ink: #fff5ed;
    --muted: #e5d4ca;
    --faint: #c4ae9f;
    --accent: #e8bd93;
    --accent-rgb: 232, 189, 147;
    --mountain: #3d2d2a;
    --surface: rgba(29, 20, 18, 0.74);
    --surface-strong: rgba(18, 13, 12, 0.93);
    --panel-ink: #fff5ed;
    --panel-muted: #dec9be;
    --line: rgba(190, 145, 106, 0.27);
    --line-strong: rgba(190, 145, 106, 0.62);
    --parchment: #b99e82;
    --parchment-ink: #fff5ed;
    --world-mix: rgba(61, 45, 42, .24);
    --watercolor-pigment-rgb: 145, 107, 80;
    --celestial-primary-rgb: 239, 193, 140;
    --celestial-secondary-rgb: 183, 112, 100;
    --celestial-drift-duration: 10.5s;
  }

  .archive-app.theme-spring {
    --surface-text-shadow: 0 -1px 0 rgba(0, 16, 11, .98), 0 1px 0 rgba(219, 244, 204, .24), 0 2px 7px rgba(0, 18, 12, .74);
    --active-material-filter: brightness(1.24) saturate(.95);
    --bg: #08100e;
    --ink: #f7fff3;
    --muted: #d9e1d7;
    --faint: #b6c4b7;
    --accent: #d5e4be;
    --accent-rgb: 213, 228, 190;
    --mountain: #334b43;
    --surface: rgba(19, 31, 28, 0.72);
    --surface-strong: rgba(12, 21, 19, 0.93);
    --panel-ink: #f7fff3;
    --panel-muted: #d3ddd2;
    --line: rgba(165, 190, 151, 0.25);
    --line-strong: rgba(165, 190, 151, 0.6);
    --parchment: #b9c0a8;
    --parchment-ink: #f7fff3;
    --world-mix: rgba(51, 75, 67, .2);
    --watercolor-pigment-rgb: 111, 132, 103;
    --celestial-primary-rgb: 220, 231, 197;
    --celestial-secondary-rgb: 129, 177, 157;
    --celestial-drift-duration: 15s;
  }

  .archive-app.theme-winter {
    --surface-text-shadow: 0 -1px 0 rgba(3, 13, 18, .96), 0 1px 0 rgba(255, 255, 255, .24), 0 2px 7px rgba(3, 13, 18, .72);
    --active-material-filter: brightness(1.2) contrast(1.02);
    --bg: #071015;
    --ink: #fbfeff;
    --muted: #deedf3;
    --faint: #bad0da;
    --accent: #e6f7ff;
    --accent-rgb: 230, 247, 255;
    --mountain: #263f4d;
    --surface: rgba(207, 220, 225, 0.78);
    --surface-strong: rgba(221, 231, 234, 0.93);
    --panel-ink: #fbfeff;
    --panel-muted: #d8e8ef;
    --line: rgba(230, 247, 255, 0.3);
    --line-strong: rgba(230, 247, 255, 0.68);
    --parchment: #b9cbd1;
    --parchment-ink: #fbfeff;
    --world-mix: rgba(38, 63, 77, .28);
    --watercolor-pigment-rgb: 151, 177, 188;
    --celestial-primary-rgb: 239, 252, 255;
    --celestial-secondary-rgb: 123, 190, 255;
    --celestial-drift-duration: 17s;
  }

  .theme-winter .chapter-rail-list button.active,
  .theme-winter .archive-header-actions .archive-header-primary,
  .theme-winter .project-action-row a {
    color: #f4f7f8;
  }

  .archive-app.theme-winter .intro-gate-cta,
  .archive-app.theme-winter .intro-gate-cta:hover { color: var(--ink); }

  .theme-winter .chapter-heading p,
  .theme-winter .chapter-heading > span {
    text-shadow: 0 1px 1px rgba(255, 255, 255, .76), 0 0 7px rgba(235, 245, 248, .48);
  }

  .archive-app,
  .archive-app * {
    font-family: var(--font-engraved) !important;
  }

  .archive-scroll-track {
    position: relative;
    z-index: 0;
    pointer-events: none;
  }

  .archive-scroll-marker {
    position: absolute;
    left: 0;
    width: 1px;
    height: 1px;
  }

  .archive-viewport {
    position: fixed;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    overflow: clip;
    isolation: isolate;
    background: var(--bg);
    color: var(--ink);
  }

  .cinematic-environment {
    --cinematic-pointer-mid-x: 0px;
    --cinematic-pointer-mid-y: 0px;
    --cinematic-pointer-foreground-x: 0px;
    --cinematic-pointer-foreground-y: 0px;
    --cores-pointer-x: 0px;
    --cores-pointer-y: 0px;
    --cores-scroll-x: 0px;
    --cores-scroll-y: 0px;
    --systems-pointer-x: 0px;
    --systems-pointer-y: 0px;
    --systems-scroll-x: 0px;
    --systems-scroll-y: 0px;
    --chronology-pointer-x: 0px;
    --chronology-pointer-y: 0px;
    --chronology-scroll-x: 0px;
    --chronology-scroll-y: 0px;
    --field-pointer-x: 0px;
    --field-pointer-y: 0px;
    --field-scroll-x: 0px;
    --field-scroll-y: 0px;
    --surface-pointer-x: 0px;
    --surface-pointer-y: 0px;
    --surface-scroll-x: 0px;
    --surface-scroll-y: 0px;
    --gateway-vegetation-scroll-y: 0%;
    --gateway-vegetation-scale: 1.025;
    --gateway-atmosphere-opacity: 1;
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    background: #050504;
    perspective: 1600px;
  }

  .cinematic-image-stage {
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(100vw, 177.7778vh);
    aspect-ratio: 16 / 9;
    transform: translate(-50%, -50%) translate3d(var(--environment-parallax-x), var(--environment-parallax-y), 0);
    transform-origin: 50% 56%;
    transform-style: preserve-3d;
  }

  .environment-plate {
    position: absolute;
    inset: 0;
    transform-origin: 50% 55%;
    transition: none;
    backface-visibility: hidden;
    contain: layout paint style;
  }

  .cinematic-environment .cinematic-atmosphere-field {
    opacity: var(--gateway-atmosphere-opacity);
  }

  .environment-plate.is-motion-active { will-change: opacity, transform; }

  .environment-plate img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: 50% 50%;
    user-select: none;
  }

  .environment-living-layer {
    --living-x-a: -.2%;
    --living-y-a: .14%;
    --living-x-b: .24%;
    --living-y-b: -.16%;
    --living-scale-a: 1.018;
    --living-scale-b: 1.033;
    position: absolute;
    inset: -1.8%;
    transform-origin: 50% 55%;
    animation: cinematic-plate-breath 30s cubic-bezier(.45, 0, .55, 1) infinite;
    backface-visibility: hidden;
    will-change: transform;
  }

  .environment-plate:not(.is-motion-active) .environment-living-layer,
  .environment-plate:not(.is-motion-active) .environment-living-layer img {
    animation-play-state: paused;
  }

  .gateway-living-layer {
    --living-x-a: -.08%;
    --living-y-a: .14%;
    --living-x-b: .08%;
    --living-y-b: -.2%;
    --living-scale-a: 1.017;
    --living-scale-b: 1.027;
    transform-origin: 50% 62%;
    translate: var(--cinematic-pointer-mid-x) var(--cinematic-pointer-mid-y);
  }

  .gateway-vegetation-plate {
    z-index: 2;
    contain: paint;
    transform-origin: 50% 82%;
  }

  .gateway-vegetation-living-layer {
    inset: -2.4%;
    transform: scale(var(--gateway-vegetation-scale));
    transform-origin: 50% 100%;
    translate:
      var(--cinematic-pointer-foreground-x)
      calc(var(--cinematic-pointer-foreground-y) + var(--gateway-vegetation-scroll-y));
    animation: none;
    will-change: transform, translate;
  }

  .gateway-vegetation-living-layer img {
    transform-origin: 50% 100%;
    animation: gateway-vegetation-wind 13.5s cubic-bezier(.45, 0, .55, 1) infinite;
    filter:
      saturate(.96)
      contrast(1.025);
    will-change: transform;
  }

  @keyframes gateway-vegetation-wind {
    0%, 100% { transform: translate3d(-.08%, .04%, 0) skewX(-.08deg) scale(1.008, 1.003); }
    34% { transform: translate3d(.1%, -.05%, 0) skewX(.12deg) scale(1.012, 1.007); }
    68% { transform: translate3d(-.03%, -.02%, 0) skewX(-.04deg) scale(1.006, 1.01); }
  }

  .seasonal-vines-plate {
    z-index: 7;
    contain: paint;
    transform-origin: 50% 100%;
  }

  .seasonal-vines-living-layer {
    inset: -1.7%;
    transform-origin: 50% 100%;
    translate:
      var(--cinematic-pointer-foreground-x)
      var(--cinematic-pointer-foreground-y);
    animation: none;
    will-change: transform, translate;
  }

  .seasonal-vines-living-layer img {
    transform-origin: 50% 100%;
    animation: seasonal-vines-breathe 17s cubic-bezier(.45, 0, .55, 1) infinite;
    will-change: transform;
  }

  .cinematic-environment.theme-fall .seasonal-vines-living-layer img {
    filter:
      saturate(.7)
      brightness(.82)
      contrast(1.045);
  }

  .cinematic-environment.theme-spring .seasonal-vines-living-layer img {
    filter:
      saturate(.64)
      brightness(.8)
      contrast(1.035);
  }

  @keyframes seasonal-vines-breathe {
    0%, 100% { transform: translate3d(-.08%, .05%, 0) skewX(-.06deg) scale(1.006, 1.002); }
    31% { transform: translate3d(.06%, -.04%, 0) skewX(.09deg) scale(1.01, 1.006); }
    67% { transform: translate3d(-.03%, -.02%, 0) skewX(-.03deg) scale(1.004, 1.009); }
  }

  .cores-plate .environment-living-layer {
    --living-x-a: -.2%;
    --living-y-a: .12%;
    --living-x-b: .26%;
    --living-y-b: -.16%;
    transform-origin: 50% 68%;
    translate:
      calc(var(--cores-pointer-x) + var(--cores-scroll-x))
      calc(var(--cores-pointer-y) + var(--cores-scroll-y));
  }

  .systems-plate .environment-living-layer {
    --living-x-a: -.24%;
    --living-y-a: .08%;
    --living-x-b: .3%;
    --living-y-b: -.19%;
    transform-origin: 72% 47%;
    translate:
      calc(var(--systems-pointer-x) + var(--systems-scroll-x))
      calc(var(--systems-pointer-y) + var(--systems-scroll-y));
  }

  .chronology-plate .environment-living-layer {
    --living-x-a: -.27%;
    --living-y-a: -.1%;
    --living-x-b: .22%;
    --living-y-b: .18%;
    transform-origin: 44% 39%;
    translate:
      calc(var(--chronology-pointer-x) + var(--chronology-scroll-x))
      calc(var(--chronology-pointer-y) + var(--chronology-scroll-y));
  }

  .field-plate .environment-living-layer {
    --living-x-a: -.14%;
    --living-y-a: .18%;
    --living-x-b: .28%;
    --living-y-b: -.14%;
    transform-origin: 21% 43%;
    translate:
      calc(var(--field-pointer-x) + var(--field-scroll-x))
      calc(var(--field-pointer-y) + var(--field-scroll-y));
  }

  .surface-plate .environment-living-layer {
    --living-x-a: .24%;
    --living-y-a: .11%;
    --living-x-b: -.22%;
    --living-y-b: -.16%;
    transform-origin: 70% 39%;
    translate:
      calc(var(--surface-pointer-x) + var(--surface-scroll-x))
      calc(var(--surface-pointer-y) + var(--surface-scroll-y));
  }

  :is(.cores-plate, .systems-plate, .chronology-plate, .field-plate, .surface-plate) .environment-living-layer {
    will-change: transform, translate;
  }

  @keyframes cinematic-plate-breath {
    0%, 100% {
      transform: translate3d(var(--living-x-a), var(--living-y-a), 0) scale(var(--living-scale-a));
    }
    50% {
      transform: translate3d(var(--living-x-b), var(--living-y-b), 0) scale(var(--living-scale-b));
    }
  }

  .gateway-sequence-plate {
    z-index: 1;
    contain: paint;
  }
  .gateway-sequence-canvas {
    width: 100%;
    height: 100%;
    display: block;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
  .gateway-sequence-preloads {
    position: absolute;
    inset: 0;
    pointer-events: none;
    visibility: hidden;
  }
  .gateway-sequence-preloads img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
  .cores-plate { z-index: 2; }
  .systems-plate { z-index: 3; }
  .chronology-plate { z-index: 4; }
  .field-plate { z-index: 5; }
  .surface-plate { z-index: 6; }

  .cinematic-environment.theme-fall .gateway-sequence-canvas,
  .cinematic-environment.theme-fall :is(.cores-plate, .systems-plate, .chronology-plate, .field-plate, .surface-plate) .environment-living-layer > img {
    filter: saturate(.64) hue-rotate(5deg) brightness(1) contrast(.97);
  }

  .cinematic-environment.theme-spring .gateway-sequence-canvas,
  .cinematic-environment.theme-spring :is(.cores-plate, .systems-plate, .chronology-plate, .field-plate, .surface-plate) .environment-living-layer > img {
    filter: saturate(.58) hue-rotate(-6deg) brightness(1.015) contrast(.97);
  }

  .cinematic-environment.theme-fall .gateway-vegetation-living-layer img {
    filter:
      saturate(.7)
      brightness(.93)
      contrast(1.015);
  }

  .cinematic-environment.theme-spring .gateway-vegetation-living-layer img {
    filter:
      saturate(.66)
      brightness(.92)
      contrast(1.015);
  }

  .cinematic-atmosphere-field {
    position: absolute;
    inset: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 1;
    contain: strict;
  }

  .cinematic-gateway-name-layer {
    position: absolute;
    inset: 0;
    z-index: 13;
    overflow: hidden;
    pointer-events: none;
    perspective: 1600px;
  }

  .gateway-name-plate {
    z-index: 1;
    contain: layout paint style;
  }

  .gateway-name-living-layer {
    container-type: size;
  }

  .cinematic-contour-dissolve {
    position: absolute;
    inset: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
    contain: strict;
  }

  .cinematic-contour-dissolve.boot-contour-dissolve {
    position: fixed;
    inset: 0;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
  }

  html.motion-quality-low .environment-transition-veil > i { display: none; }

  .environment-transition-veil {
    position: absolute;
    inset: -12%;
    z-index: 7;
    overflow: hidden;
    isolation: isolate;
    opacity: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse at 12% 54%, rgba(var(--watercolor-pigment-rgb), .38), transparent 24%),
      radial-gradient(ellipse at 35% 23%, rgba(var(--watercolor-pigment-rgb), .28), transparent 19%),
      radial-gradient(ellipse at 56% 68%, rgba(var(--watercolor-pigment-rgb), .3), transparent 26%),
      radial-gradient(ellipse at 80% 30%, rgba(var(--watercolor-pigment-rgb), .32), transparent 22%),
      radial-gradient(ellipse at 92% 74%, rgba(var(--watercolor-pigment-rgb), .26), transparent 18%),
      radial-gradient(ellipse at 50% 54%, transparent 26%, rgba(0, 0, 0, .24) 70%, rgba(0, 0, 0, .44) 100%);
    mix-blend-mode: soft-light;
    transform: scale(calc(.97 + var(--transition-pulse) * .045));
    transform-origin: 50% 55%;
    transition: none;
  }

  .environment-transition-veil::before,
  .environment-transition-veil::after {
    content: "";
    position: absolute;
    inset: 4%;
    opacity: calc(var(--transition-pulse) * .72);
    background:
      radial-gradient(circle at 8% 61%, rgba(var(--watercolor-pigment-rgb), .62) 0 1px, transparent 2px),
      radial-gradient(circle at 17% 47%, rgba(var(--watercolor-pigment-rgb), .52) 0 2px, transparent 3px),
      radial-gradient(circle at 29% 20%, rgba(var(--watercolor-pigment-rgb), .56) 0 1px, transparent 2px),
      radial-gradient(circle at 43% 75%, rgba(var(--watercolor-pigment-rgb), .48) 0 2px, transparent 3px),
      radial-gradient(circle at 65% 57%, rgba(var(--watercolor-pigment-rgb), .58) 0 1px, transparent 2px),
      radial-gradient(circle at 79% 27%, rgba(var(--watercolor-pigment-rgb), .52) 0 2px, transparent 3px),
      radial-gradient(circle at 93% 69%, rgba(var(--watercolor-pigment-rgb), .58) 0 1px, transparent 2px);
    background-size: 17% 21%, 23% 19%, 19% 27%, 29% 23%, 21% 31%, 25% 18%, 16% 24%;
    transform: scale(calc(.86 + var(--transition-pulse) * .3)) rotate(calc(var(--travel-direction) * .35deg));
    transform-origin: 50% 54%;
  }

  .environment-transition-veil::after {
    inset: -2%;
    opacity: calc(var(--transition-pulse) * .42);
    filter: blur(1.2px);
    transform: scale(calc(.78 + var(--transition-pulse) * .42)) rotate(calc(var(--travel-direction) * -.5deg));
  }

  .environment-transition-veil > i {
    position: absolute;
    display: block;
    width: clamp(80px, 11vw, 210px);
    aspect-ratio: 1;
    border-radius: 48% 52% 58% 42% / 51% 44% 56% 49%;
    opacity: calc(var(--transition-pulse) * .54);
    background: radial-gradient(circle at 46% 44%, rgba(var(--watercolor-pigment-rgb), .56), rgba(var(--watercolor-pigment-rgb), .18) 56%, transparent 74%);
    filter: blur(2px);
    transform: scale(calc(.28 + var(--transition-pulse) * 1.1)) rotate(calc(var(--travel-direction) * 7deg));
  }

  .environment-transition-veil > i:nth-child(1) { left: 11%; top: 42%; }
  .environment-transition-veil > i:nth-child(2) { left: 47%; top: 17%; width: clamp(62px, 8vw, 154px); }
  .environment-transition-veil > i:nth-child(3) { right: 8%; bottom: 14%; width: clamp(70px, 9vw, 170px); }

  .transition-idle .environment-transition-veil { opacity: 0; }

  .environment-volumetrics {
    display: none;
  }

  .environment-volumetrics::before {
    content: "";
    position: absolute;
    inset: -12%;
    background:
      radial-gradient(ellipse at 70% 40%, rgba(var(--accent-rgb), .1), transparent 26%),
      radial-gradient(ellipse at 22% 54%, rgba(var(--watercolor-pigment-rgb), .08), transparent 32%);
    filter: blur(18px);
    opacity: .64;
    transform-origin: 56% 47%;
    animation: cinematic-atmosphere-drift 48s cubic-bezier(.45, 0, .55, 1) infinite;
  }

  @keyframes cinematic-volumetric-breath {
    0%, 100% { opacity: .64; }
    50% { opacity: .78; }
  }

  @keyframes cinematic-atmosphere-drift {
    0%, 100% { transform: translate3d(-.5%, .25%, 0) scale(1.01); opacity: .48; }
    50% { transform: translate3d(.65%, -.3%, 0) scale(1.035); opacity: .7; }
  }

  .environment-vignette {
    position: absolute;
    inset: -2px;
    z-index: 9;
    background:
      linear-gradient(90deg, rgba(2,2,2,.72) 0%, transparent 30%, transparent 73%, rgba(2,2,2,.58) 100%),
      linear-gradient(180deg, rgba(0,0,0,.55) 0%, transparent 27%, transparent 68%, rgba(0,0,0,.72) 100%);
    box-shadow: inset 0 0 15vw rgba(0,0,0,.48);
  }

  .archive-color-grade {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(var(--accent-rgb), .025), transparent 44%, rgba(0,0,0,.1));
    mix-blend-mode: soft-light;
    opacity: .5;
  }

  .theme-fall .archive-color-grade,
  .theme-spring .archive-color-grade,
  .theme-winter .archive-color-grade { background-color: transparent; }

  .spatial-world {
    position: absolute;
    inset: 0;
    z-index: 2;
  }

  .spatial-world-canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .archive-grain {
    display: none;
  }

  .archive-header {
    position: absolute;
    z-index: 8;
    top: 22px;
    left: 28px;
    right: 28px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0;
  }

  .archive-identity {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    padding: 0 0 11px;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }

  .archive-identity .profile-avatar {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border: 0;
    border-radius: 50%;
    filter: none;
    box-shadow: 0 9px 22px rgba(0, 0, 0, .42);
  }

  .theme-fall .archive-identity .profile-avatar,
  .theme-spring .archive-identity .profile-avatar,
  .theme-winter .archive-identity .profile-avatar { filter: none; }

  .archive-identity span {
    display: grid;
    gap: 2px;
  }

  .archive-identity strong {
    font-family: "Arial Narrow", "Segoe UI", sans-serif;
    font-size: 19.87px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .archive-identity small {
    color: var(--muted);
    font-family: Consolas, monospace;
    font-size: 12.42px;
    text-transform: uppercase;
  }

  .archive-header-actions {
    display: flex;
    align-items: center;
    gap: 7px;
    padding-bottom: 10px;
  }

  .archive-header-actions a {
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    border: 1px solid var(--line);
    background: rgba(5, 5, 4, 0.28);
    color: var(--ink);
    font-size: 14.9px;
    text-transform: uppercase;
    transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
  }

  .archive-header-actions a:hover {
    border-color: var(--line-strong);
    background: rgba(var(--accent-rgb), 0.1);
  }

  .archive-header-actions .archive-header-primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #0a0907;
  }

  .chapter-rail {
    position: absolute;
    z-index: 9;
    left: 24px;
    top: 50%;
    width: 112px;
    transform: translateY(-50%);
    transition: width 400ms cubic-bezier(.2,.8,.2,1), transform 400ms cubic-bezier(.2,.8,.2,1);
  }

  .chapter-rail-list {
    display: grid;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    overflow: hidden;
    transition: opacity 240ms ease, transform 400ms cubic-bezier(.2,.8,.2,1);
  }

  .chapter-rail-list button {
    position: relative;
    width: 100%;
    min-height: 52px;
    display: grid;
    grid-template-columns: 25px 1fr;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    border: 0;
    border-bottom: 1px solid var(--line);
    background: rgba(6, 6, 5, 0.36);
    color: var(--muted);
    cursor: pointer;
    text-align: left;
    transition: background 180ms ease, color 180ms ease;
  }

  .chapter-rail-list button:last-child { border-bottom: 0; }
  .chapter-rail-list button:hover { background: rgba(var(--accent-rgb), 0.09); color: var(--ink); }

  .chapter-rail-list button.active {
    background: var(--accent);
    color: #090806;
  }

  .chapter-rail-list button.active::after {
    content: "";
    position: absolute;
    right: -8px;
    top: calc(50% - 7px);
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 8px solid var(--accent);
  }

  .chapter-rail-list span {
    font-family: Consolas, monospace;
    font-size: 12.42px;
  }

  .chapter-rail-list strong {
    font-size: 12.42px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .chapter-collapse {
    position: absolute;
    left: 100%;
    top: 0;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .chapter-rail.is-collapsed { width: 0; }
  .chapter-rail.is-collapsed .chapter-rail-list { opacity: 0; transform: translateX(-120px); pointer-events: none; }
  .chapter-scroll-arrow { display: none; }

  .triangle-pointer {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    transition: transform 380ms cubic-bezier(.2,.8,.2,1);
  }

  .triangle-pointer.right { border-width: 6px 0 6px 9px; border-color: transparent transparent transparent currentColor; }
  .triangle-pointer.left { border-width: 6px 9px 6px 0; border-color: transparent currentColor transparent transparent; }
  .triangle-pointer.down { border-width: 9px 6px 0; border-color: currentColor transparent transparent; }
  .triangle-pointer.up { border-width: 0 6px 9px; border-color: transparent transparent currentColor; }

  .chapter-collapse:focus-visible,
  .hud-collapse:focus-visible,
  .lore-toggle:focus-visible {
    outline: 0;
  }

  .chapter-collapse:focus-visible .triangle-pointer,
  .hud-collapse:focus-visible .triangle-pointer,
  .lore-toggle:focus-visible .triangle-pointer {
    filter: drop-shadow(0 0 4px var(--accent));
    transform: scale(1.22);
  }

  .archive-scene-stack {
    position: absolute;
    inset: 0;
    z-index: 5;
    pointer-events: none;
  }

  .archive-scene {
    position: absolute;
    inset: 94px 386px 160px 152px;
    opacity: var(--scene-opacity);
    transform:
      translate3d(var(--scene-shift-x), var(--scene-shift), 0)
      scale(var(--scene-scale));
    transform-origin: 50% 54%;
    transform-style: flat;
    pointer-events: none;
    visibility: hidden;
    backface-visibility: hidden;
    contain: layout style;
  }

  .archive-scene::before {
    display: none;
  }

  .archive-scene.active {
    pointer-events: auto;
  }

  .archive-scene.active .chapter-heading { animation: none; }
  .archive-scene.active .project-spatial-grid,
  .archive-scene.active .spatial-timeline,
  .archive-scene.active .personal-spatial-grid,
  .archive-scene.active .contact-transmission { animation: none; }

  .archive-scene.near {
    visibility: visible;
    will-change: opacity, transform;
  }

  .chapter-content {
    height: 100%;
    min-height: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 14px;
  }

  .chapter-heading {
    min-width: 0;
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 30px;
    padding-bottom: 12px;
    border-bottom: 0;
  }

  .chapter-heading > div { min-width: 0; }

  .chapter-heading p,
  .chapter-heading > span {
    margin: 0 0 6px;
    color: var(--accent);
    font-family: Consolas, monospace;
    font-size: 12.42px;
    text-transform: uppercase;
  }

  .chapter-heading h2 {
    max-width: 780px;
    margin: 0;
    font-family: "Arial Narrow", "Segoe UI", sans-serif;
    font-size: 37.26px;
    line-height: 1.04;
    font-weight: 650;
    text-transform: uppercase;
  }

  .chapter-heading > span {
    flex: 0 0 auto;
    color: var(--muted);
    text-align: right;
  }

  .intro-chapter-content {
    --intro-gate-center-x: 50.5%;
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .intro-gate-name {
    --intro-name-size: max(3.5vw, 6.25vh);
    --intro-name-size: 5.95cqh;
    --intro-name-buried-shift: 145%;
    --intro-gate-edge-y: 30.12%;
    --intro-first-shift: 0%;
    --intro-last-shift: 0%;
    position: absolute;
    inset: 0;
    z-index: 2;
    margin: 0;
    color: color-mix(in srgb, var(--ink) 78%, var(--mountain));
    clip-path: polygon(
      0 0,
      100% 0,
      100% 33.8%,
      62.2% 33.8%,
      50.92% var(--intro-gate-edge-y),
      50.08% var(--intro-gate-edge-y),
      37.8% 33.8%,
      0 33.8%
    );
    pointer-events: none;
    text-transform: uppercase;
  }

  .intro-name-word {
    position: absolute;
    bottom: calc(100% - var(--intro-gate-edge-y));
    height: .9em;
    overflow: hidden;
    padding: 0 4px;
    font-family: var(--font-display);
    font-size: var(--intro-name-size);
    font-weight: 700;
    line-height: .92;
    -webkit-text-stroke: 1px rgba(0, 0, 0, .22);
    text-shadow:
      0 -1px 0 rgba(255, 255, 255, .24),
      0 2px 1px rgba(0, 0, 0, .88),
      0 10px 16px rgba(0, 0, 0, .54);
    filter: contrast(1.04) saturate(.72);
    opacity: 1;
    contain: paint;
  }

  .intro-name-first {
    right: 50.08%;
    text-align: right;
    transform: matrix(.987, -.161, -.035, .999, 0, 0);
    transform-origin: 100% 100%;
  }

  .intro-name-last {
    left: 50.92%;
    text-align: left;
    transform: matrix(.987, .161, .035, .999, 0, 0);
    transform-origin: 0 100%;
  }

  @media (max-width: 760px) {
    .intro-gate-name {
      --intro-name-size: 4.15cqh;
    }
  }

  .intro-name-word > span {
    display: block;
    position: relative;
    isolation: isolate;
    opacity: 1;
    transform: translate3d(0, var(--intro-name-buried-shift), 0);
    transform-origin: 50% 100%;
    backface-visibility: hidden;
    will-change: transform;
  }

  .intro-gate-name.is-active .intro-name-first > span {
    animation: gateNameEmerge 1050ms cubic-bezier(.2,.76,.18,1) 140ms both;
  }

  .intro-gate-name.is-active .intro-name-last > span {
    animation: gateNameEmerge 1050ms cubic-bezier(.2,.76,.18,1) 700ms both;
  }

  .intro-gate-name.is-scroll-controlled .intro-name-word > span {
    animation: none !important;
  }

  .intro-gate-name.is-scroll-controlled .intro-name-first > span {
    transform: translate3d(0, var(--intro-first-shift), 0);
  }

  .intro-gate-name.is-scroll-controlled .intro-name-last > span {
    transform: translate3d(0, var(--intro-last-shift), 0);
  }

  .intro-gate-name.is-scroll-controlled.is-return-waiting .intro-name-word > span {
    animation: none !important;
    transform: translate3d(0, var(--intro-name-buried-shift), 0);
  }

  .intro-gate-name.is-scroll-controlled.is-return-revealing .intro-name-first > span {
    animation: gateNameEmerge 940ms cubic-bezier(.2,.76,.18,1) 100ms both !important;
  }

  .intro-gate-name.is-scroll-controlled.is-return-revealing .intro-name-last > span {
    animation: gateNameEmerge 940ms cubic-bezier(.2,.76,.18,1) 520ms both !important;
  }

  .intro-copy-stage {
    --intro-copy-exit-x: 0px;
    --intro-copy-exit-y: 0px;
    position: absolute;
    z-index: 3;
    top: 20%;
    left: clamp(38px, 4.2vw, 74px);
    width: min(340px, 26vw);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    pointer-events: auto;
    transform: translate3d(var(--intro-copy-exit-x), var(--intro-copy-exit-y), 0);
    will-change: transform;
  }

  .intro-coordinate {
    flex: 0 0 auto;
    margin: 0 0 14px;
    min-height: 1.25em;
    color: var(--accent);
    font-family: Consolas, monospace;
    font-size: 13.66px;
  }

  .intro-role {
    flex: 0 0 auto;
    width: 100%;
    margin: 0;
    min-height: 2.44em;
    font-family: Georgia, serif;
    font-size: 27px;
    line-height: 1.18;
    color: var(--ink);
  }

  .intro-summary {
    flex: 0 0 auto;
    max-width: 100%;
    margin: 14px 0 0;
    min-height: 3.1em;
    color: var(--muted);
    font-size: 18px;
    line-height: 1.45;
  }

  .intro-caret {
    width: 7px;
    height: 7px;
    display: inline-block;
    margin-left: 7px;
    background: var(--accent);
    transform: rotate(45deg);
    vertical-align: .14em;
    animation: loreBlink 800ms steps(1, end) infinite;
  }

  .intro-actions {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    flex: 0 0 auto;
    margin-top: 14px;
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, 14px, 0);
    transition: opacity 420ms ease, transform 620ms cubic-bezier(.16,.8,.2,1), visibility 0ms linear 620ms;
  }

  .intro-chapter-content.is-copy-complete .intro-actions {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: 100ms, 100ms, 0ms;
  }

  .intro-actions a,
  .intro-gate-cta,
  .project-action-row a,
  .project-action-row button {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 18px;
    border: 1px solid var(--line-strong);
    background: rgba(5, 5, 4, 0.42);
    color: var(--ink);
    cursor: pointer;
    font-size: 14.9px;
    font-weight: 650;
    text-transform: uppercase;
    transition: background 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .intro-gate-cta,
  .project-action-row a {
    background: var(--accent);
    border-color: var(--accent);
    color: #090806;
  }

  .intro-actions a:hover,
  .intro-gate-cta:hover,
  .project-action-row a:hover,
  .project-action-row button:hover { transform: translateY(-2px); }

  .intro-gate-entry {
    --intro-gate-scroll-opacity: 1;
    --intro-gate-scroll-scale: 1;
    position: absolute;
    top: 77.2%;
    left: var(--intro-gate-center-x);
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    isolation: isolate;
    transform: translate3d(-50%, 18px, 0) scale(.94);
    transform-origin: 50% 50%;
    transition:
      opacity 520ms ease,
      transform 780ms cubic-bezier(.16, .8, .2, 1),
      visibility 0ms linear 780ms;
  }

  .intro-chapter-content.is-copy-complete .intro-gate-entry {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translate3d(-50%, 0, 0) scale(1);
    transition-delay: 720ms, 640ms, 0ms;
  }

  .intro-gate-scroll-shell {
    position: relative;
    z-index: 2;
    display: grid;
    place-items: center;
    transform:
      translate3d(
        var(--intro-gate-counter-x, 0px),
        var(--intro-gate-counter-y, 0px),
        0
      );
    transform-origin: 50% 50%;
    will-change: transform;
  }

  .intro-gate-cta {
    position: relative;
    z-index: 2;
    min-width: 180px;
    letter-spacing: .02em;
    opacity: var(--intro-gate-scroll-opacity);
    scale: var(--intro-gate-scroll-scale);
    transform-origin: 50% 50%;
    will-change: opacity, scale;
  }

  .intro-status {
    width: auto;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 12px;
    flex: 0 0 auto;
    margin-top: 14px;
    color: var(--faint);
    font-family: Consolas, monospace;
    font-size: 11.18px;
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, 10px, 0);
    transition: opacity 420ms ease, transform 620ms cubic-bezier(.16,.8,.2,1), visibility 0ms linear 620ms;
  }

  .intro-chapter-content.is-copy-complete .intro-status {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: 240ms, 240ms, 0ms;
  }

  .intro-status i { height: 1px; background: var(--line); }

  .projects-chapter-content {
    grid-template-rows: auto auto minmax(0, 1fr);
  }

  .scrollable-tab-shell { min-width: 0; }
  .embedded-tab-arrow { display: none; }

  .project-switcher,
  .personal-switcher {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border: 0;
    background: var(--surface-image) center 54% / cover no-repeat;
    box-shadow: none;
  }

  .project-switcher button,
  .personal-switcher button {
    min-width: 0;
    min-height: 46px;
    display: grid;
    grid-template-columns: 30px 1fr;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border: 0;
    border-right: 1px solid var(--line);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    text-align: left;
    transition: background 180ms ease, color 180ms ease;
  }

  .project-switcher button:last-child,
  .personal-switcher button:last-child { border-right: 0; }
  .project-switcher button:hover,
  .personal-switcher button:hover { background: rgba(var(--accent-rgb), 0.08); color: var(--ink); }
  .project-switcher button.active,
  .personal-switcher button.active { background: var(--accent); color: #090806; }
  .project-switcher span,
  .personal-switcher span { font-family: Consolas, monospace; font-size: 12.42px; }
  .project-switcher strong,
  .personal-switcher strong { overflow: hidden; font-size: 14.9px; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }

  .project-spatial-grid {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(300px, 0.7fr);
    gap: 14px;
    animation: chapterMaterialize 1100ms cubic-bezier(.16,.76,.22,1) both;
  }

  .project-evidence-panel,
  .project-topology-preview,
  .timeline-focus-card,
  .personal-feature,
  .personal-collection-copy {
    min-width: 0;
    min-height: 0;
    border: 1px solid var(--line);
    background: var(--surface);
    color: var(--panel-ink);
    backdrop-filter: blur(16px);
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.28);
  }

  .project-evidence-panel {
    display: grid;
    grid-template-rows: auto auto auto minmax(0, 1fr);
    gap: 10px;
    padding: 18px 20px;
    overflow: visible;
  }

  .project-overline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    color: var(--panel-muted);
    font-family: Consolas, monospace;
    font-size: 12.42px;
    text-transform: uppercase;
  }

  .project-overline span { color: var(--accent); }
  .project-overline em { overflow: hidden; font-style: normal; text-overflow: ellipsis; white-space: nowrap; }

  .project-evidence-panel h3 {
    margin: 0;
    font-family: "Arial Narrow", "Segoe UI", sans-serif;
    font-size: 33.53px;
    line-height: 1;
    text-transform: uppercase;
  }

  .project-summary {
    margin: 0;
    color: var(--panel-muted);
    font-size: 17.39px;
    line-height: 1.45;
  }

  .project-proof-grid {
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-content: stretch;
    gap: 1px;
    margin: 0;
    background: var(--line);
    border: 1px solid var(--line);
  }

  .project-proof-grid div {
    min-width: 0;
    padding: 10px 11px;
    background: var(--surface-strong);
  }

  .project-proof-grid dt {
    margin-bottom: 5px;
    color: var(--accent);
    font-family: Consolas, monospace;
    font-size: 11.18px;
    text-transform: uppercase;
  }

  .project-proof-grid dd {
    margin: 0;
    color: var(--panel-ink);
    font-size: 13.66px;
    line-height: 1.36;
  }

  .project-action-row { display: flex; gap: 8px; }
  .project-action-row a,
  .project-action-row button { min-height: 36px; padding: 0 14px; font-size: 12.42px; }
  .project-action-row button { color: var(--panel-ink); }

  .project-topology-preview {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    padding: 16px;
    overflow: hidden;
  }

  .topology-heading { display: grid; gap: 4px; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
  .topology-heading span { color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .topology-heading strong { font-size: 16.15px; text-transform: uppercase; }

  .project-topology-preview ol {
    min-height: 0;
    display: grid;
    align-content: center;
    gap: 0;
    margin: 0;
    padding: 6px 0;
    list-style: none;
  }

  .project-topology-preview li {
    position: relative;
    display: grid;
    grid-template-columns: 34px 1fr;
    align-items: center;
    min-height: 29px;
    border-bottom: 1px solid var(--line);
    color: var(--panel-ink);
  }

  .project-topology-preview li:last-child { border-bottom: 0; }
  .project-topology-preview li span { color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; }
  .project-topology-preview li strong { font-size: 12.42px; font-weight: 600; text-transform: uppercase; }

  .compact-stack {
    display: grid;
    gap: 6px;
    padding-top: 9px;
    border-top: 1px solid var(--line);
  }

  .compact-stack div { min-width: 0; display: grid; grid-template-columns: 105px 1fr; gap: 8px; }
  .compact-stack span { color: var(--accent); font-family: Consolas, monospace; font-size: 9.94px; text-transform: uppercase; }
  .compact-stack p { overflow: hidden; margin: 0; color: var(--panel-muted); font-size: 9.94px; text-overflow: ellipsis; white-space: nowrap; }

  .timeline-chapter-content {
    grid-template-rows: auto minmax(0, 1fr) auto;
  }

  .spatial-timeline {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
    grid-template-rows: 28px minmax(0, 1fr);
    gap: 10px 20px;
  }

  .timeline-axis {
    grid-column: 1;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    color: var(--muted);
    font-family: Consolas, monospace;
    font-size: 11.18px;
  }

  .timeline-axis i {
    height: 1px;
    background: var(--line-strong);
  }

  .timeline-waypoints {
    grid-column: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .timeline-waypoints button {
    position: relative;
    min-width: 0;
    display: grid;
    grid-template-rows: auto 1fr auto auto;
    align-items: end;
    padding: 17px;
    border: 1px solid var(--line);
    background: rgba(7, 7, 6, 0.4);
    color: var(--muted);
    cursor: pointer;
    text-align: left;
    overflow: hidden;
    transition: border-color 220ms ease, background 220ms ease, transform 260ms cubic-bezier(.2,.8,.2,1);
  }

  .timeline-waypoints button::before {
    content: "";
    position: absolute;
    inset: auto -30% 18% 35%;
    height: 1px;
    background: var(--line);
    transform: rotate(-18deg);
  }

  .timeline-waypoints button:hover { border-color: var(--line-strong); transform: translateY(-3px); }
  .timeline-waypoints button.active { background: rgba(var(--accent-rgb), 0.16); border-color: var(--accent); color: var(--ink); }
  .timeline-waypoints button > span { align-self: start; color: var(--accent); font-family: Consolas, monospace; font-size: 13.66px; }
  .timeline-waypoints button > i { width: 54px; height: 54px; align-self: center; justify-self: center; border: 1px solid var(--line-strong); border-radius: 50%; background: var(--mountain); box-shadow: inset 0 0 0 8px rgba(0,0,0,.16); }
  .timeline-waypoints button strong { position: relative; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 22.36px; line-height: 1; text-transform: uppercase; }
  .timeline-waypoints button small { position: relative; margin-top: 7px; color: var(--muted); font-size: 12.42px; line-height: 1.25; }

  .timeline-focus-card {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 22px;
    animation: chapterMaterialize 1100ms cubic-bezier(.16,.76,.22,1) both;
  }

  .timeline-focus-card > p { margin: 0 0 10px; color: var(--accent); font-family: Consolas, monospace; font-size: 12.42px; text-transform: uppercase; }
  .timeline-focus-card h3 { margin: 0; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 33.53px; line-height: 1; text-transform: uppercase; }
  .timeline-focus-card > strong { margin-top: 7px; color: var(--panel-muted); font-family: Georgia, serif; font-size: 17.39px; font-weight: 400; }
  .timeline-focus-card > span { margin-top: 14px; color: var(--panel-muted); font-size: 14.9px; line-height: 1.46; }
  .timeline-focus-card ul { display: grid; gap: 7px; margin: 14px 0 0; padding: 0; list-style: none; }
  .timeline-focus-card li { position: relative; padding-left: 14px; font-size: 12.42px; line-height: 1.42; }
  .timeline-focus-card li::before { content: ""; position: absolute; left: 0; top: 5px; width: 6px; height: 1px; background: var(--accent); }

  .professional-stack-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .professional-stack-strip div { min-width: 0; padding: 8px 10px; background: rgba(7,7,6,.72); }
  .professional-stack-strip span { display: block; margin-bottom: 4px; color: var(--accent); font-family: Consolas, monospace; font-size: 9.94px; text-transform: uppercase; }
  .professional-stack-strip p { overflow: hidden; margin: 0; color: var(--muted); font-size: 9.94px; text-overflow: ellipsis; white-space: nowrap; }

  .personal-chapter-content { grid-template-rows: auto auto minmax(0, 1fr); }

  .personal-spatial-grid {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1.32fr) minmax(300px, .68fr);
    gap: 14px;
  }

  .personal-feature {
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    overflow: hidden;
    animation: mediaRelocate 900ms cubic-bezier(.16,.76,.22,1) both;
  }

  .personal-feature-art { min-height: 0; overflow: hidden; background: #090908; }
  .personal-feature-art img,
  .personal-feature-art video { width: 100%; height: 100%; display: block; object-fit: cover; }

  .field-note-placeholder {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 190px;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 8px;
    color: var(--ink);
    overflow: hidden;
    background:
      linear-gradient(150deg, transparent 0 38%, rgba(var(--accent-rgb), .24) 38.2% 38.8%, transparent 39% 100%),
      linear-gradient(22deg, var(--mountain), #080807 64%);
  }

  .field-note-placeholder::before,
  .field-note-placeholder::after {
    content: "";
    position: absolute;
    border: 1px solid rgba(var(--accent-rgb), .35);
    transform: rotate(34deg);
  }

  .field-note-placeholder::before { width: 210px; height: 210px; }
  .field-note-placeholder::after { width: 110px; height: 110px; }
  .field-note-placeholder span { position: relative; z-index: 1; font-family: Consolas, monospace; font-size: 12.42px; }
  .field-note-placeholder i { position: relative; z-index: 1; width: 1px; height: 48px; background: var(--accent); }
  .field-note-placeholder strong { position: relative; z-index: 1; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 28.57px; text-transform: uppercase; }
  .field-note-placeholder small { position: relative; z-index: 1; color: var(--muted); font-size: 11.18px; text-transform: uppercase; }

  .personal-feature-caption { display: grid; grid-template-columns: 130px 1fr; gap: 14px; padding: 12px 15px; border-top: 0; }
  .personal-feature-caption span { color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .personal-feature-caption p { margin: 0; color: var(--panel-muted); font-size: 12.42px; line-height: 1.4; }

  .personal-collection-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 19px;
  }

  .personal-collection-copy > p { margin: 0; color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .personal-collection-copy h3 { margin: 8px 0 0; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 31.05px; line-height: 1; text-transform: uppercase; }
  .personal-collection-copy > span { margin-top: 12px; color: var(--panel-muted); font-size: 14.9px; line-height: 1.48; }

  .personal-media-index { display: grid; gap: 5px; margin-top: 16px; }
  .personal-media-index button { min-width: 0; display: grid; grid-template-columns: 30px 1fr; align-items: center; gap: 7px; min-height: 35px; padding: 0 9px; border: 1px solid var(--line); background: transparent; color: var(--panel-muted); cursor: pointer; text-align: left; }
  .personal-media-index button:hover,
  .personal-media-index button.active { background: rgba(var(--accent-rgb), .14); border-color: var(--accent); color: var(--panel-ink); }
  .personal-media-index span { color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; }
  .personal-media-index strong { overflow: hidden; font-size: 11.18px; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }

  .contact-chapter-content { grid-template-rows: auto minmax(0, 1fr); }

  .contact-transmission {
    width: min(900px, 88%);
    align-self: center;
    justify-self: center;
  }

  .contact-transmission > p { max-width: 620px; margin: 0; color: var(--muted); font-family: Georgia, serif; font-size: 22.36px; line-height: 1.45; }
  .contact-email { display: block; width: max-content; max-width: 100%; margin-top: 18px; color: var(--ink); font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 44.71px; line-height: 1; text-transform: uppercase; border-bottom: 1px solid var(--accent); overflow-wrap: anywhere; }

  .contact-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin-top: 30px; border: 1px solid var(--line); background: var(--line); }
  .contact-grid a { min-width: 0; display: grid; grid-template-columns: 30px 1fr; grid-template-rows: auto auto; gap: 4px 8px; padding: 18px; background: var(--surface); transition: background 180ms ease, transform 180ms ease; }
  .contact-grid a:hover { background: rgba(var(--accent-rgb), .18); transform: translateY(-3px); }
  .contact-grid span { grid-row: 1 / span 2; color: var(--accent); font-family: Consolas, monospace; font-size: 12.42px; }
  .contact-grid strong { font-size: 17.39px; text-transform: uppercase; }
  .contact-grid small { color: var(--muted); font-size: 11.18px; }

  .spatial-hud {
    position: absolute;
    z-index: 11;
    right: 24px;
    bottom: 22px;
    width: 344px;
    border: 1px solid var(--line-strong);
    background: var(--surface-strong);
    color: var(--panel-ink);
    backdrop-filter: blur(18px);
    transition: transform 420ms cubic-bezier(.2,.8,.2,1), opacity 220ms ease;
  }

  .hud-collapse {
    position: absolute;
    right: 0;
    bottom: 100%;
    width: 34px;
    height: 28px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    color: var(--accent);
    cursor: pointer;
  }

  .spatial-hud-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    max-height: 320px;
    padding: 12px;
    overflow: hidden;
    transition: max-height 420ms cubic-bezier(.2,.8,.2,1), padding 420ms cubic-bezier(.2,.8,.2,1), opacity 180ms ease;
  }

  .spatial-hud.is-collapsed { transform: translateY(calc(100% + 22px)); }
  .spatial-hud.is-collapsed .spatial-hud-content { max-height: 0; padding-top: 0; padding-bottom: 0; opacity: 0; }

  .hud-coordinate { display: grid; grid-template-columns: 1fr auto; gap: 3px 10px; padding-bottom: 8px; border-bottom: 1px solid var(--line); }
  .hud-coordinate span,
  .hud-coordinate small { font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .hud-coordinate span { color: var(--accent); }
  .hud-coordinate strong { grid-row: 1 / span 2; grid-column: 2; align-self: center; font-size: 14.9px; text-transform: uppercase; }
  .hud-coordinate small { color: var(--panel-muted); }

  .hud-theme-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 3px; }
  .hud-theme-row button { min-width: 0; min-height: 32px; display: flex; align-items: center; justify-content: center; gap: 5px; padding: 0 4px; border: 1px solid var(--line); background: transparent; color: var(--panel-muted); cursor: pointer; }
  .hud-theme-row button.active { border-color: var(--accent); color: var(--panel-ink); background: rgba(var(--accent-rgb), .13); }
  .hud-theme-row button span { overflow: hidden; font-size: 9.94px; text-overflow: ellipsis; text-transform: uppercase; }
  .theme-swatch { flex: 0 0 auto; width: 8px; height: 8px; border-radius: 50%; background: #716c63; }
  .theme-swatch.fall { background: #491523; }
  .theme-swatch.spring { background: #0b5948; }
  .theme-swatch.winter { background: #263f4d; }

  .hud-atmosphere-row {
    min-height: 32px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 0 9px;
    border: 1px solid var(--line);
  }
  .hud-atmosphere-row span { color: var(--panel-muted); font-size: 9.94px; text-transform: uppercase; }
  .hud-atmosphere-row strong { color: var(--accent); font-size: 11.18px; text-align: right; text-transform: uppercase; }

  .hud-intensity { display: grid; grid-template-columns: 80px 1fr; align-items: center; gap: 8px; color: var(--panel-muted); font-size: 11.18px; text-transform: uppercase; }
  .hud-intensity input { width: 100%; accent-color: var(--accent); }

  .spatial-lore-guide {
    position: absolute;
    z-index: 12;
    left: 24px;
    bottom: 22px;
    width: min(500px, calc(100vw - 410px));
    min-height: 92px;
    display: flex;
    align-items: center;
    padding-left: 66px;
    transition: width 440ms cubic-bezier(.2,.8,.2,1), transform 440ms cubic-bezier(.2,.8,.2,1);
  }

  .lore-medallion {
    position: absolute;
    left: 0;
    z-index: 2;
    width: 84px;
    height: 84px;
    display: grid;
    place-items: center;
    border: 3px double var(--accent);
    border-radius: 50%;
    background: var(--mountain);
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,.42);
  }

  .lore-medallion img {
    width: 112%;
    height: 112%;
    object-fit: cover;
    object-position: 50% 28%;
    filter: none;
  }

  .lore-parchment {
    width: 100%;
    min-height: 72px;
    display: flex;
    align-items: center;
    padding: 13px 42px 13px 30px;
    border: 2px solid var(--accent);
    border-left-width: 0;
    background: var(--parchment);
    color: var(--parchment-ink);
    box-shadow: 0 12px 35px rgba(0,0,0,.36);
    clip-path: polygon(0 8%, 97% 0, 100% 12%, 99% 88%, 96% 100%, 0 94%);
    transition: opacity 220ms ease, transform 440ms cubic-bezier(.2,.8,.2,1);
  }

  .lore-parchment p { margin: 0; font-family: Georgia, serif; font-size: 14.9px; line-height: 1.42; }
  .lore-caret { display: inline-block; width: 1px; height: 1em; margin-left: 2px; background: currentColor; vertical-align: -2px; animation: loreBlink 800ms steps(1,end) infinite; }

  .lore-toggle {
    position: absolute;
    right: 13px;
    top: calc(50% - 18px);
    z-index: 3;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    color: var(--parchment-ink);
    cursor: pointer;
  }

  .spatial-lore-guide.is-collapsed { width: 84px; padding-left: 0; }
  .spatial-lore-guide.is-collapsed .lore-parchment { opacity: 0; transform: translateX(-26px) scaleX(.72); pointer-events: none; }
  .spatial-lore-guide.is-collapsed .lore-toggle { right: -31px; color: var(--accent); }

  .archive-progress {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 25px;
    width: 260px;
    display: grid;
    grid-template-columns: 24px 1fr 28px;
    align-items: center;
    gap: 9px;
    transform: translateX(-50%);
    color: var(--muted);
    font-family: Consolas, monospace;
    font-size: 11.18px;
  }

  .archive-progress div { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; }
  .archive-progress i { height: 2px; background: var(--line); transition: background 240ms ease; }
  .archive-progress i.active { background: var(--accent); }
  .archive-progress strong { font-weight: 400; text-align: right; }

  .architecture-dialog-backdrop {
    position: absolute;
    inset: 0;
    z-index: 30;
    display: grid;
    place-items: center;
    padding: 28px;
    background: rgba(3, 3, 2, .78);
    backdrop-filter: blur(12px);
    animation: dialogFade 220ms ease both;
  }

  .architecture-dialog {
    width: min(1120px, 92vw);
    max-height: 88vh;
    overflow-y: auto;
    border: 1px solid var(--line-strong);
    background: var(--surface-strong);
    color: var(--panel-ink);
    box-shadow: 0 35px 110px rgba(0,0,0,.55);
    animation: dialogEnter 420ms cubic-bezier(.2,.8,.2,1) both;
    scrollbar-color: var(--accent) transparent;
  }

  .architecture-dialog > header { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 16px 20px; border-bottom: 1px solid var(--line); background: var(--surface-strong); }
  .architecture-dialog header p { margin: 0 0 4px; color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .architecture-dialog header h2 { margin: 0; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 29.81px; text-transform: uppercase; }

  .dialog-close { flex: 0 0 auto; width: 38px; height: 38px; position: relative; border: 1px solid var(--line); background: transparent; cursor: pointer; }
  .dialog-close span::before,
  .dialog-close span::after { content: ""; position: absolute; left: 9px; right: 9px; top: 18px; height: 1px; background: currentColor; }
  .dialog-close span::before { transform: rotate(45deg); }
  .dialog-close span::after { transform: rotate(-45deg); }

  .architecture-dialog-summary { max-width: 760px; margin: 18px 20px 0; color: var(--panel-muted); font-family: Georgia, serif; font-size: 17.39px; line-height: 1.45; }

  .architecture-case-study {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    margin: 18px 20px 0;
    border: 1px solid var(--line);
    background: var(--line);
  }
  .architecture-case-study div { min-width: 0; padding: 11px 12px; background: var(--surface-strong); }
  .architecture-case-study dt { margin-bottom: 5px; color: var(--accent); font-family: Consolas, monospace; font-size: 9.94px; text-transform: uppercase; }
  .architecture-case-study dd { margin: 0; color: var(--panel-muted); font-size: 11.18px; line-height: 1.42; }

  .architecture-step-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin: 18px 20px; border: 1px solid var(--line); background: var(--line); }
  .architecture-step-grid article { min-width: 0; min-height: 132px; display: grid; grid-template-columns: 25px 1fr; grid-template-rows: auto 1fr; gap: 6px 8px; padding: 13px; background: var(--surface-strong); }
  .architecture-step-grid article > span { grid-row: 1 / span 2; color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; }
  .architecture-step-grid h3 { margin: 0; font-size: 13.66px; text-transform: uppercase; }
  .architecture-step-grid p { margin: 0; color: var(--panel-muted); font-size: 12.42px; line-height: 1.42; }

  .architecture-placement,
  .architecture-notes { margin: 0 20px 20px; padding: 14px; border: 1px solid var(--line); }
  .architecture-placement > span { display: block; margin-bottom: 10px; color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .architecture-placement > div { display: flex; flex-wrap: wrap; gap: 8px; }
  .architecture-placement strong { font-size: 12.42px; font-weight: 600; }
  .architecture-notes { display: grid; grid-template-columns: minmax(200px,.6fr) 1.4fr; gap: 16px; }
  .architecture-notes code { align-self: start; padding: 10px; border: 1px solid var(--line); color: var(--accent); font-size: 12.42px; overflow-wrap: anywhere; }
  .architecture-notes ul { display: grid; gap: 5px; margin: 0; padding: 0; list-style: none; }
  .architecture-notes li { position: relative; padding-left: 13px; color: var(--panel-muted); font-size: 12.42px; line-height: 1.4; }
  .architecture-notes li::before { content: ""; position: absolute; left: 0; top: 6px; width: 6px; height: 1px; background: var(--accent); }

  .architecture-stack-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; margin: 0 20px 20px; border: 1px solid var(--line); background: var(--line); }
  .architecture-stack-grid div { min-width: 0; padding: 11px; background: var(--surface-strong); }
  .architecture-stack-grid span { display: block; margin-bottom: 6px; color: var(--accent); font-family: Consolas, monospace; font-size: 9.94px; text-transform: uppercase; }
  .architecture-stack-grid p { margin: 0; color: var(--panel-muted); font-size: 9.94px; line-height: 1.4; }

  /* Cinematic, diegetic content surfaces */
  .project-switcher,
  .personal-switcher {
    border: 0;
    background: var(--surface-image) center 54% / cover no-repeat;
    box-shadow: none;
    filter: drop-shadow(0 15px 18px rgba(0,0,0,.24));
  }

  .project-switcher button,
  .personal-switcher button {
    position: relative;
    overflow: hidden;
  }

  .project-switcher button::before,
  .personal-switcher button::before {
    content: "";
    position: absolute;
    inset: auto 10px 5px;
    height: 1px;
    background: var(--accent);
    opacity: 0;
    transform: scaleX(.3);
    transition: opacity 220ms ease, transform 320ms cubic-bezier(.2,.8,.2,1);
  }

  .project-switcher button.active::before,
  .personal-switcher button.active::before { opacity: .8; transform: scaleX(1); }

  .project-spatial-grid {
    position: relative;
    grid-template-columns: minmax(0, 1.14fr) minmax(320px, .86fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 18px;
    overflow: hidden;
  }

  .project-artifact-stage {
    position: relative;
    grid-column: 1;
    grid-row: 1;
    min-height: 0;
    overflow: hidden;
    pointer-events: none;
    isolation: isolate;
    z-index: 3;
  }

  .project-artifact-stage::before {
    content: "";
    position: absolute;
    left: 5%;
    right: 8%;
    bottom: 4%;
    height: 28%;
    z-index: -1;
    background: radial-gradient(ellipse at center, rgba(0,0,0,.82), transparent 68%);
    filter: blur(8px);
    transform: perspective(500px) rotateX(64deg);
  }

  .project-artifact-stage img {
    position: absolute;
    left: 82%;
    top: 3%;
    width: min(52%, 370px);
    height: 29%;
    max-height: none;
    object-fit: contain;
    transform: translateX(-50%);
    transform-origin: 50% 50%;
    filter: drop-shadow(0 22px 28px rgba(0,0,0,.64));
    animation: artifactArrival 1300ms cubic-bezier(.16,.76,.22,1) both;
  }

  .project-artifact-stage.artifact-plugin img { left: 82%; top: -2%; width: min(34%, 205px); height: 40%; }
  .project-artifact-stage.artifact-telemetry img { left: 80%; top: 0; width: min(44%, 270px); height: 34%; }
  .project-artifact-stage > span {
    position: absolute;
    right: 18px;
    top: 11px;
    left: auto;
    bottom: auto;
    z-index: 2;
    color: var(--accent);
    font-family: Consolas, monospace;
    font-size: 9.94px;
    text-transform: uppercase;
    text-shadow: 0 2px 8px #000;
  }
  .artifact-orbit { display: none; }

  .project-evidence-panel {
    position: relative;
    grid-column: 1;
    grid-row: 1;
    z-index: 2;
    gap: 7px;
    padding: 14px 24px 15px;
    border: 0;
    clip-path: polygon(1% 0, 98% 0, 100% 4%, 99.3% 96%, 96% 100%, 2% 99%, 0 95%, .5% 4%);
    background: var(--surface-image) 50% 56% / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .project-evidence-panel::after {
    display: none;
  }

  .project-evidence-panel h3 { max-width: 52%; }
  .project-evidence-panel > .project-summary { max-width: 65%; }

  .project-evidence-panel > .project-summary {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .project-proof-grid dd {
    display: -webkit-box;
    overflow: hidden;
    font-size: 12.42px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .project-proof-grid,
  .project-action-row { position: relative; z-index: 4; }
  .project-proof-grid { align-self: start; }

  .project-topology-preview {
    position: relative;
    grid-column: 2;
    grid-row: 1 / span 2;
    padding: 22px 22px 19px;
    border: 0;
    clip-path: polygon(3% 0, 99% 1%, 100% 95%, 96% 100%, 1% 99%, 0 5%);
    background: var(--surface-image) 78% 48% / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .project-topology-preview::after,
  .timeline-focus-card::after,
  .personal-collection-copy::after {
    display: none;
  }

  .project-proof-grid {
    border: 0;
    background: transparent;
    gap: 10px;
  }

  .project-proof-grid div {
    background: transparent;
    border: 0;
  }

  .theme-winter .project-proof-grid div { background: transparent; }

  .timeline-waypoints { gap: 18px; }

  .timeline-waypoints button {
    border: 0;
    clip-path: polygon(3% 0, 97% 1%, 100% 5%, 99% 96%, 95% 100%, 1% 98%, 0 4%);
    background: var(--surface-image) 68% 48% / cover no-repeat;
    box-shadow: none;
    filter: drop-shadow(0 20px 18px rgba(0,0,0,.34));
  }

  .timeline-waypoints button:nth-child(2) { background-position: center, 88% 50%; }
  .timeline-waypoints button::before {
    inset: 14% auto 18% 50%;
    width: 1px;
    height: auto;
    background: linear-gradient(var(--line-strong), transparent);
    transform: none;
  }
  .timeline-waypoints button:hover { filter: brightness(1.06) drop-shadow(0 24px 20px rgba(0,0,0,.38)); transform: translateY(-5px) scale(1.015); }
  .timeline-waypoints button.active {
    background: var(--surface-image) 82% 48% / cover no-repeat;
    box-shadow: none;
    filter: brightness(1.1) drop-shadow(0 28px 24px rgba(0,0,0,.42));
  }
  .timeline-waypoints button > i {
    position: relative;
    border: 0;
    background:
      radial-gradient(circle at 34% 28%, rgba(255,255,255,.24), transparent 24%),
      radial-gradient(circle, var(--accent), var(--mountain) 68%);
    box-shadow: inset 0 0 0 5px rgba(0,0,0,.32), inset 0 0 0 7px var(--line-strong), 0 10px 22px rgba(0,0,0,.42);
  }
  .timeline-waypoints button > i::after {
    content: "";
    position: absolute;
    inset: 31%;
    border: 1px solid rgba(0,0,0,.48);
    transform: rotate(45deg);
  }

  .timeline-focus-card {
    position: relative;
    padding: 26px 30px;
    border: 0;
    clip-path: polygon(2% 0, 98% 1%, 100% 5%, 99% 95%, 96% 100%, 1% 98%, 0 4%);
    background: var(--surface-image) 91% 44% / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .professional-stack-strip {
    border: 0;
    gap: 8px;
    background: transparent;
  }

  .professional-stack-strip div {
    background: var(--surface-image) center / cover no-repeat;
    filter: drop-shadow(0 10px 12px rgba(0,0,0,.24));
  }

  .personal-feature {
    border: 0;
    clip-path: polygon(1% 0, 98% 0, 100% 4%, 99% 97%, 96% 100%, 2% 99%, 0 95%, .5% 4%);
    background: var(--surface-image) center / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .field-note-placeholder {
    isolation: isolate;
    background: #070706;
  }

  .field-note-placeholder::before {
    inset: 0;
    width: auto;
    height: auto;
    z-index: -1;
    border: 0;
    background-image:
      linear-gradient(90deg, rgba(0,0,0,.62), rgba(0,0,0,.05) 56%, rgba(0,0,0,.36)),
      var(--field-image);
    background-position: center, var(--field-position);
    background-size: cover, 150% auto;
    filter: none;
    transform: none;
  }
  .field-note-placeholder::after {
    display: none;
  }
  .field-note-placeholder span,
  .field-note-placeholder i,
  .field-note-placeholder strong,
  .field-note-placeholder small {
    text-shadow: 0 2px 14px #000, 0 1px 2px #000;
  }

  .personal-collection-copy {
    position: relative;
    border: 0;
    clip-path: polygon(3% 0, 99% 1%, 100% 95%, 96% 100%, 1% 99%, 0 5%);
    background: var(--surface-image) 78% 58% / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .personal-media-index button {
    border-inline: 0;
    background: rgba(0,0,0,.12);
  }

  .contact-grid {
    border: 0;
    gap: 12px;
    background: transparent;
  }

  .contact-grid a {
    position: relative;
    border: 0;
    clip-path: polygon(3% 0, 98% 1%, 100% 6%, 98% 95%, 94% 100%, 1% 97%, 0 5%);
    background: var(--surface-image) center 58% / cover no-repeat;
    box-shadow: none;
    filter: none;
  }
  .contact-grid a:hover { background: var(--surface-image) center 58% / cover no-repeat; filter: brightness(1.08); }

  .architecture-dialog {
    border: 0;
    clip-path: polygon(2% 0, 98% 0, 100% 3%, 100% 96%, 98% 100%, 2% 100%, 0 97%, 0 3%);
    background: var(--surface-image) center / cover no-repeat;
    box-shadow: none;
    filter: none;
  }

  .architecture-dialog > header,
  .architecture-case-study div,
  .architecture-step-grid article,
  .architecture-stack-grid div { background: transparent; }
  .architecture-dialog > header,
  .architecture-case-study,
  .architecture-step-grid,
  .architecture-notes,
  .architecture-stack-grid { border: 0; }
  .architecture-case-study,
  .architecture-step-grid,
  .architecture-stack-grid { gap: 12px; background: transparent; }

  /* Material-first quality pass */
  .archive-identity strong,
  .intro-chapter-content h1,
  .chapter-heading h2,
  .project-evidence-panel h3,
  .topology-heading strong,
  .timeline-waypoints button strong,
  .timeline-focus-card h3,
  .personal-collection-copy h3,
  .field-note-placeholder strong,
  .contact-email,
  .contact-grid strong,
  .architecture-dialog header h2,
  .architecture-step-grid h3 {
    font-family: var(--font-display);
  }

  .archive-identity small,
  .chapter-rail-list span,
  .chapter-rail-list strong,
  .project-switcher span,
  .personal-switcher span,
  .intro-coordinate,
  .intro-status,
  .chapter-heading p,
  .chapter-heading > span,
  .project-switcher,
  .personal-switcher,
  .project-overline,
  .project-proof-grid dt,
  .topology-heading span,
  .project-topology-preview li span,
  .compact-stack span,
  .timeline-axis,
  .timeline-waypoints button > span,
  .timeline-focus-card > p,
  .professional-stack-strip span,
  .personal-feature-caption span,
  .field-note-placeholder span,
  .personal-collection-copy > p,
  .personal-media-index span,
  .contact-grid span,
  .hud-coordinate span,
  .hud-coordinate small,
  .archive-progress,
  .architecture-dialog header p,
  .architecture-case-study dt,
  .architecture-step-grid article > span,
  .architecture-placement > span,
  .architecture-stack-grid span {
    font-family: var(--font-inscription);
  }

  button,
  .archive-header-actions a,
  .intro-actions a,
  .intro-gate-cta,
  .project-action-row a {
    font-family: var(--font-inscription);
  }

  .archive-header-actions a,
  .intro-actions a,
  .intro-gate-cta,
  .project-action-row a,
  .project-action-row button,
  .dialog-close {
    border: 0;
    clip-path: polygon(4% 0, 96% 1%, 100% 12%, 97% 94%, 91% 100%, 3% 97%, 0 84%, 1% 9%);
    background: var(--surface-image) center / 220% 220% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    filter: drop-shadow(0 10px 11px rgba(0, 0, 0, .34));
    text-shadow: var(--surface-text-shadow);
  }

  .theme-winter .spatial-hud {
    background:
      linear-gradient(rgba(221, 231, 234, .34), rgba(207, 220, 225, .24)),
      var(--surface-image) center / 112% 112% no-repeat;
  }

  .project-evidence-panel,
  .project-topology-preview,
  .timeline-waypoints button,
  .timeline-focus-card,
  .personal-feature,
  .personal-collection-copy,
  .contact-grid a {
    isolation: isolate;
    backface-visibility: hidden;
  }

  .archive-scene.active .project-evidence-panel,
  .archive-scene.active .project-topology-preview,
  .archive-scene.active .timeline-waypoints button,
  .archive-scene.active .timeline-focus-card,
  .archive-scene.active .personal-feature,
  .archive-scene.active .personal-collection-copy,
  .archive-scene.active .contact-grid a {
    filter:
      drop-shadow(0 24px 20px rgba(0, 0, 0, .44))
      drop-shadow(0 5px 4px rgba(0, 0, 0, .34));
  }

  .project-evidence-panel::after,
  .project-topology-preview::after,
  .timeline-waypoints button::after,
  .timeline-focus-card::after,
  .personal-feature::after,
  .personal-collection-copy::after,
  .contact-grid a::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    display: block;
    pointer-events: none;
    background:
      linear-gradient(142deg, rgba(255, 255, 255, .14), transparent 9% 72%, rgba(0, 0, 0, .28)),
      linear-gradient(180deg, transparent 68%, rgba(0, 0, 0, .2));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, .12),
      inset 0 -10px 22px rgba(0, 0, 0, .16);
    opacity: .62;
  }

  .project-evidence-panel > *,
  .project-topology-preview > *,
  .timeline-waypoints button > *,
  .timeline-focus-card > *,
  .personal-feature > *,
  .personal-collection-copy > *,
  .contact-grid a > * {
    position: relative;
    z-index: 2;
  }

  .archive-header-actions .archive-header-primary,
  .intro-gate-cta,
  .project-action-row a {
    border: 0;
    background: var(--surface-image) center / 190% 190% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 12px 13px rgba(0, 0, 0, .38));
  }

  .archive-header-actions a:hover,
  .intro-actions a:hover,
  .intro-gate-cta:hover,
  .project-action-row a:hover,
  .project-action-row button:hover {
    background: var(--surface-image) center / 190% 190% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 14px 14px rgba(0, 0, 0, .4));
  }

  .intro-status {
    width: auto;
    grid-template-columns: auto auto;
    gap: 18px;
    color: var(--muted);
  }

  .intro-status i { display: none; }

  .chapter-rail { width: 124px; }

  .chapter-rail-list {
    gap: 8px;
    border: 0;
    overflow: visible;
  }

  .chapter-rail-list button {
    min-height: 50px;
    border: 0;
    background: var(--surface-image) center / 230% 230% no-repeat;
    color: var(--panel-muted);
    clip-path: polygon(3% 0, 96% 2%, 100% 12%, 98% 91%, 92% 100%, 2% 97%, 0 86%, 1% 8%);
    filter: drop-shadow(0 10px 10px rgba(0, 0, 0, .34));
    text-shadow: var(--surface-text-shadow);
    transition: color 260ms ease, filter 360ms ease, transform 420ms cubic-bezier(.16,.76,.22,1);
  }

  .chapter-rail-list button:hover {
    background: var(--surface-image) center / 215% 215% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.12) drop-shadow(0 13px 12px rgba(0, 0, 0, .4));
    transform: translateX(4px);
  }

  .chapter-rail-list button.active {
    background: var(--surface-image) center / 195% 195% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 15px 14px rgba(0, 0, 0, .46));
    transform: translateX(8px) scale(1.025);
  }

  .chapter-rail-list button.active::after { display: none; }

  .project-switcher,
  .personal-switcher {
    gap: 10px;
    background: transparent;
    filter: none;
  }

  .project-switcher button,
  .personal-switcher button,
  .personal-media-index button {
    border: 0;
    background: var(--surface-image) center / 230% 230% no-repeat;
    color: var(--panel-muted);
    clip-path: polygon(3% 0, 97% 2%, 100% 13%, 97% 94%, 92% 100%, 2% 97%, 0 85%, 1% 8%);
    filter: drop-shadow(0 9px 9px rgba(0, 0, 0, .3));
    text-shadow: var(--surface-text-shadow);
    transition: color 260ms ease, filter 360ms ease, transform 420ms cubic-bezier(.16,.76,.22,1);
  }

  .project-switcher button::before,
  .personal-switcher button::before { display: none; }

  .project-switcher button:hover,
  .personal-switcher button:hover,
  .personal-media-index button:hover {
    background: var(--surface-image) center / 210% 210% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.12) drop-shadow(0 12px 11px rgba(0, 0, 0, .36));
    transform: translateY(-2px);
  }

  .project-switcher button.active,
  .personal-switcher button.active,
  .personal-media-index button.active {
    background: var(--surface-image) center / 190% 190% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 14px 13px rgba(0, 0, 0, .42));
    transform: translateY(-3px) scale(1.012);
  }

  .project-evidence-panel,
  .project-topology-preview,
  .timeline-waypoints button,
  .timeline-focus-card,
  .personal-feature,
  .personal-collection-copy,
  .contact-grid a,
  .architecture-dialog {
    background: var(--surface-image) center / 112% 112% no-repeat;
    color: var(--panel-ink);
    text-shadow: var(--surface-text-shadow);
  }

  .project-evidence-panel {
    gap: 9px;
    padding: clamp(24px, 2.2vw, 34px) clamp(26px, 2.5vw, 38px) clamp(22px, 2vw, 31px);
  }

  .project-action-row {
    position: absolute;
    z-index: 7;
    left: clamp(26px, 2.5vw, 38px);
    bottom: clamp(22px, 2vw, 31px);
    width: max-content;
  }

  .project-overline { max-width: 55%; }
  .project-evidence-panel h3 { max-width: 53%; }
  .project-evidence-panel > .project-summary { max-width: 60%; }

  .project-artifact-stage img {
    left: 79%;
    top: 4%;
    width: min(47%, 340px);
    max-height: 31%;
  }

  .project-artifact-stage.artifact-plugin img { left: 80%; top: 1%; }
  .project-artifact-stage.artifact-telemetry img { left: 79%; top: 2%; }
  .project-artifact-stage > span { display: none; }

  .project-proof-grid {
    gap: 11px 18px;
  }

  .project-proof-grid div { padding: 5px 0; }

  .project-topology-preview {
    padding: clamp(25px, 2.1vw, 34px);
    background-size: 116% 116%;
  }

  .topology-heading,
  .compact-stack {
    border: 0;
  }

  .project-topology-preview ol { gap: 5px; padding-block: 12px; }

  .project-topology-preview li {
    min-height: 29px;
    border: 0;
  }

  .project-topology-preview li span,
  .compact-stack span,
  .project-proof-grid dt { color: var(--accent); }

  .timeline-axis {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }

  .timeline-axis i,
  .timeline-waypoints button::before { display: none; }

  .timeline-waypoints button {
    padding: clamp(38px, 3.2vw, 52px) clamp(20px, 1.8vw, 28px) clamp(48px, 4vw, 64px);
    background-size: 126% 126%;
    transition: color 260ms ease, filter 420ms ease, transform 460ms cubic-bezier(.16,.76,.22,1);
  }

  .timeline-waypoints button:hover {
    background: var(--surface-image) center / 121% 121% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.08) drop-shadow(0 24px 20px rgba(0, 0, 0, .38));
  }

  .timeline-waypoints button.active {
    background: var(--surface-image) center / 116% 116% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 28px 24px rgba(0, 0, 0, .42));
  }

  .timeline-waypoints button strong { font-size: 19.87px; }
  .timeline-waypoints button small { max-width: 94%; margin-bottom: 3px; }

  .timeline-focus-card {
    padding: clamp(29px, 2.6vw, 42px);
    background-size: 112% 112%;
  }

  .professional-stack-strip {
    gap: 9px;
    border: 0;
    background: transparent;
  }

  .professional-stack-strip div {
    padding: 10px 13px;
    background: var(--surface-image) center / 180% 180% no-repeat;
    color: var(--panel-ink);
    text-shadow: var(--surface-text-shadow);
    clip-path: polygon(2% 0, 98% 2%, 100% 91%, 94% 100%, 1% 97%);
  }

  .personal-feature {
    gap: 11px;
    padding: 18px;
    background-size: 108% 108%;
  }

  .personal-feature-art {
    clip-path: polygon(1% 0, 99% 1%, 100% 95%, 97% 100%, 0 98%);
  }

  .personal-feature-caption { padding: 2px 10px 7px; }
  .field-note-placeholder i { display: none; }

  .personal-collection-copy {
    padding: clamp(27px, 2.5vw, 40px);
    background-size: 114% 114%;
  }

  .personal-media-index { gap: 8px; }

  .contact-email { border: 0; }

  .contact-grid {
    gap: 12px;
    border: 0;
    background: transparent;
  }

  .contact-grid a {
    padding: 22px 24px;
    background-size: 145% 145%;
  }

  .spatial-hud {
    width: 360px;
    border: 0;
    clip-path: none;
    border-radius: 5px 9px 4px 7px;
    background: var(--surface-image) center / 112% 112% no-repeat, var(--surface-strong);
    color: var(--panel-ink);
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
    isolation: isolate;
    text-shadow: var(--surface-text-shadow);
  }

  .spatial-hud-content {
    gap: 12px;
    padding: 22px 28px 20px;
  }

  .hud-collapse {
    right: 14px;
    bottom: calc(100% - 7px);
    color: var(--panel-ink);
    text-shadow: var(--surface-text-shadow);
  }

  .spatial-hud.is-collapsed .hud-collapse {
    bottom: 0;
    transform: translateY(-100%);
  }

  .hud-coordinate {
    gap: 4px 12px;
    padding-bottom: 2px;
    border: 0;
  }

  .hud-coordinate span { color: var(--accent); }

  .hud-theme-row { gap: 8px; }

  .hud-theme-row button {
    min-height: 34px;
    border: 0;
    clip-path: polygon(4% 0, 97% 2%, 100% 12%, 97% 95%, 4% 100%, 0 88%, 1% 7%);
    background: var(--surface-image) center / 250% 250% no-repeat;
    color: var(--panel-muted);
    filter: drop-shadow(0 7px 7px rgba(0, 0, 0, .28));
  }

  .hud-theme-row button.active {
    border: 0;
    background: var(--surface-image) center / 195% 195% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 9px 9px rgba(0, 0, 0, .34));
  }

  .theme-swatch {
    width: 9px;
    height: 9px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .38);
  }

  .hud-atmosphere-row {
    min-height: 26px;
    padding: 0;
    border: 0;
  }

  .hud-intensity { grid-template-columns: 72px 1fr; }

  .hud-intensity input {
    height: 7px;
    appearance: none;
    border-radius: 7px;
    background: rgba(0, 0, 0, .32);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, .42), 0 1px 0 rgba(255, 255, 255, .12);
  }

  .hud-intensity input::-webkit-slider-thumb {
    width: 17px;
    height: 17px;
    appearance: none;
    border: 0;
    border-radius: 50%;
    background: var(--surface-image) center / 320% 320% no-repeat;
    filter: var(--active-material-filter);
    box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
  }

  .hud-intensity input::-moz-range-thumb {
    width: 17px;
    height: 17px;
    border: 0;
    border-radius: 50%;
    background: var(--surface-image) center / 320% 320% no-repeat;
    filter: var(--active-material-filter);
    box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
  }

  .spatial-lore-guide {
    width: min(530px, calc(100vw - 430px));
    min-height: 102px;
    padding-left: 76px;
  }

  .lore-medallion {
    width: 90px;
    height: 90px;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    filter: none;
    overflow: visible;
    isolation: isolate;
  }

  .lore-medallion::before,
  .lore-medallion::after {
    content: none;
  }

  .lore-avatar-figure {
    position: absolute;
    left: 50%;
    bottom: 0;
    z-index: 3;
    width: 110%;
    aspect-ratio: 1;
    transform: translate3d(-50%, 0, 0);
    transform-origin: 50% 100%;
    animation: loreAvatarFloat 8.4s cubic-bezier(.45, 0, .55, 1) infinite;
    transition: transform 620ms cubic-bezier(.16, .76, .22, 1);
  }

  .lore-medallion img {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    max-width: none;
    border-radius: 0;
    object-fit: contain;
    object-position: 50% 50%;
    opacity: .94;
    clip-path: none;
    -webkit-mask-image: none;
    mask-image: none;
    filter:
      contrast(1.02)
      drop-shadow(0 7px 7px rgba(0, 0, 0, .46))
      drop-shadow(0 0 3px rgba(235, 232, 220, .09));
    transition: filter 620ms ease, opacity 620ms ease;
  }

  .lore-avatar-contour-field {
    position: absolute;
    inset: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: .98;
  }

  .lore-parchment {
    min-height: 88px;
    padding: 18px 52px 18px 35px;
    border: 0;
    background: var(--surface-image) center / 112% 112% no-repeat, var(--surface-strong);
    color: var(--panel-ink);
    filter: none;
    box-shadow: 0 20px 32px rgba(0, 0, 0, .34);
    clip-path: none;
    border-radius: 3px 8px 4px 6px;
    isolation: isolate;
    backface-visibility: hidden;
    text-shadow: var(--surface-text-shadow);
  }

  .lore-parchment p {
    font-family: var(--font-body);
    font-size: 16.15px;
    line-height: 1.5;
  }

  .lore-caret {
    width: 6px;
    height: 6px;
    margin-left: 7px;
    background: var(--accent);
    transform: rotate(45deg);
    animation: lorePulse 1200ms ease-in-out infinite;
    vertical-align: 1px;
  }

  .lore-toggle { color: var(--panel-ink); }
  .spatial-lore-guide.is-collapsed { width: 94px; }
  .spatial-lore-guide.is-collapsed .lore-toggle { color: var(--accent); }

  .archive-progress {
    width: auto;
    grid-template-columns: 1fr;
    gap: 0;
  }

  .archive-progress > span,
  .archive-progress > strong { display: none; }

  .archive-progress div {
    display: flex;
    gap: 9px;
  }

  .archive-progress i {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .22);
    box-shadow: 0 3px 7px rgba(0, 0, 0, .36);
    transition: background 420ms ease, transform 420ms cubic-bezier(.16,.76,.22,1);
  }

  .archive-progress i.active {
    background: var(--accent);
    transform: scale(1.24);
  }

  .architecture-dialog {
    background-size: 106% 106%;
    text-shadow: var(--surface-text-shadow);
  }

  .architecture-dialog > header,
  .architecture-placement,
  .architecture-notes,
  .architecture-notes code,
  .dialog-close { border: 0; }

  .timeline-focus-card li::before,
  .architecture-notes li::before {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  @keyframes lorePulse {
    0%, 100% { opacity: .34; transform: rotate(45deg) scale(.76); }
    50% { opacity: 1; transform: rotate(45deg) scale(1); }
  }

  @keyframes loreAvatarFloat {
    0%, 100% { transform: translate3d(-50%, 0, 0); }
    50% { transform: translate3d(-50%, -1.5px, 0); }
  }

  /* Weight is applied after component rules so fine print cannot fall back to thin cuts. */
  .archive-app { font-weight: 600; }
  .archive-app :is(p, li, dd, small, span, em, code) { font-weight: 600; }
  .archive-app :is(button, a, dt, label, .chapter-heading > span, .project-summary, .timeline-focus-card > span, .personal-collection-copy > span) { font-weight: 600; }
  .archive-app :is(h1, h2, h3, strong) { font-weight: 700; }

  @keyframes gateNameEmerge {
    0% {
      transform: translate3d(0, var(--intro-name-buried-shift), 0);
    }
    72% {
      transform: translate3d(0, -3%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes artifactArrival {
    0% { opacity: 0; transform: translateX(-50%) translate3d(18px, 30px, -80px) rotateY(-7deg) scale(.93); }
    58% { opacity: .92; transform: translateX(-50%) translate3d(-3px, -3px, 8px) rotateY(1deg) scale(1.012); }
    100% { opacity: 1; transform: translateX(-50%) translate3d(0, 0, 0) rotateY(0) scale(1); }
  }

  @keyframes headingPhaseIn {
    0% { opacity: 0; transform: translate3d(-24px, 13px, -45px); }
    62% { opacity: .96; transform: translate3d(2px, -1px, 3px); }
    100% { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  @keyframes spatialDockIn {
    0% { opacity: 0; transform: perspective(1100px) translate3d(0, 32px, -92px) rotateX(3deg) scale(.975); }
    58% { opacity: .95; transform: perspective(1100px) translate3d(0, -2px, 5px) rotateX(-.4deg) scale(1.005); }
    100% { opacity: 1; transform: perspective(1100px) translate3d(0, 0, 0) rotateX(0) scale(1); }
  }

  @keyframes chapterMaterialize {
    from { opacity: 0; transform: translateY(14px) scale(.985); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes mediaRelocate {
    0% { opacity: .2; transform: translateX(24px) rotateY(-2deg) scale(.985); }
    100% { opacity: 1; transform: translateX(0) rotateY(0); }
  }

  @keyframes mobileHeadingPhaseIn {
    0% { opacity: 0; transform: translateY(14px); }
    68% { opacity: .96; transform: translateY(-1px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes mobileDockIn {
    0% { opacity: 0; transform: translateY(24px) scale(.985); }
    68% { opacity: .97; transform: translateY(-2px) scale(1.003); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes mobileArtifactArrival {
    0% { opacity: 0; transform: translateX(-50%) translateY(18px) scale(.96); }
    68% { opacity: .96; transform: translateX(-50%) translateY(-2px) scale(1.008); }
    100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  }

  @keyframes mobileMaterialize {
    from { opacity: 0; transform: translateY(12px) scale(.99); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes mobileRelocate {
    from { opacity: .28; transform: translateX(16px) scale(.99); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }

  @keyframes dialogFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes dialogEnter { from { opacity: 0; transform: translateY(30px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes loreBlink { 50% { opacity: 0; } }

  @media (min-width: 761px) {
    .archive-viewport.rail-expanded .archive-scene { left: 176px; }
    .archive-viewport.rail-collapsed .archive-scene { left: 96px; }
    .archive-viewport.rail-expanded .archive-scene.scene-intro,
    .archive-viewport.rail-collapsed .archive-scene.scene-intro { inset: 0; }
    .archive-scene { transition: left 520ms cubic-bezier(.16,.76,.22,1); }

    .chapter-rail-list span { font-size: 13.66px; }
    .chapter-rail-list strong { font-size: 13.2px; }
    .hud-coordinate span,
    .hud-coordinate small { font-size: 12.42px; }
    .hud-coordinate strong { font-size: 17.39px; }
    .hud-theme-row button span { font-size: 11.18px; }
    .hud-atmosphere-row span { font-size: 11.18px; }
    .hud-atmosphere-row strong,
    .hud-intensity { font-size: 12.42px; }

    .project-evidence-panel {
      grid-template-rows: repeat(5, auto);
      align-content: center;
      gap: 12px;
      padding: clamp(28px, 3.8vh, 42px) clamp(38px, 3.5vw, 56px);
    }
    .project-overline { font-size: 14.9px; }
    .project-evidence-panel h3 { font-size: clamp(37.26px, 2.35vw, 43.47px); }
    .project-summary { font-size: 19.87px; line-height: 1.5; }
    .project-evidence-panel > .project-summary { -webkit-line-clamp: 4; }
    .project-proof-grid { align-content: center; gap: 10px 18px; }
    .project-proof-grid div { padding: 8px 10px; }
    .project-proof-grid dt { font-size: 13.05px; }
    .project-proof-grid dd { font-size: 14.9px; line-height: 1.42; -webkit-line-clamp: 4; }
    .project-action-row a,
    .project-action-row button { min-height: 40px; padding-inline: 18px; font-size: 14.29px; }

    .project-topology-preview { padding: clamp(34px, 3vw, 46px); }
    .topology-heading span { font-size: 13.05px; }
    .topology-heading strong { font-size: 18.63px; }
    .project-topology-preview li span { font-size: 12.42px; }
    .project-topology-preview li strong { font-size: 14.29px; }
    .compact-stack span,
    .compact-stack p { font-size: 11.8px; }

    .timeline-waypoints button {
      align-content: center;
      justify-items: center;
      padding-inline: clamp(28px, 2.6vw, 42px);
      text-align: center;
    }
    .timeline-waypoints button > span { font-size: 15.53px; }
    .timeline-waypoints button strong { font-size: 23.6px; }
    .timeline-waypoints button small { font-size: 14.29px; line-height: 1.38; }
    .timeline-focus-card { padding: clamp(36px, 3.5vw, 54px); }
    .timeline-focus-card > p { font-size: 14.9px; }
    .timeline-focus-card h3 { font-size: clamp(37.26px, 2.3vw, 42.23px); }
    .timeline-focus-card > strong { font-size: 19.87px; }
    .timeline-focus-card > span { font-size: 17.39px; line-height: 1.52; }
    .timeline-focus-card li { font-size: 14.29px; line-height: 1.48; }
    .professional-stack-strip div { padding: 12px 14px; }
    .professional-stack-strip span,
    .professional-stack-strip p { font-size: 11.8px; }

    .personal-feature { padding: 24px; }
    .personal-feature-caption { gap: 18px; padding: 12px 16px 14px; }
    .personal-feature-caption span,
    .personal-feature-caption p { font-size: 14.29px; line-height: 1.45; }
    .personal-collection-copy { padding: clamp(36px, 3.5vw, 54px); }
    .personal-collection-copy > p { font-size: 13.66px; }
    .personal-collection-copy h3 { font-size: 37.26px; }
    .personal-collection-copy > span { font-size: 17.39px; line-height: 1.52; }
    .personal-media-index button { min-height: 40px; padding-inline: 12px; }
    .personal-media-index span,
    .personal-media-index strong { font-size: 13.05px; }

    .contact-grid a { min-height: 116px; align-content: center; padding: 28px 32px; }
    .contact-grid strong { font-size: 19.87px; }
    .contact-grid small { font-size: 13.05px; }
  }

  @media (min-width: 1401px) and (min-height: 821px) {
    .project-evidence-panel {
      padding-bottom: clamp(74px, 6vh, 88px);
    }
  }

  @media (min-width: 1051px) and (max-width: 1250px),
    (max-height: 820px) and (min-width: 1051px) and (max-width: 1650px) {
    .project-spatial-grid { overflow: visible; }
    .project-action-row {
      top: 50%;
      right: auto;
      bottom: auto;
      left: calc(100% + 16px);
      width: 156px;
      flex-direction: column;
      transform: translateY(-50%);
    }
    .project-action-row a,
    .project-action-row button { width: 100%; }
  }

  @media (min-width: 761px) and (max-width: 1250px) {
    .project-spatial-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .project-topology-preview { display: none; }

    .timeline-waypoints {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .timeline-waypoints button {
      padding: 24px 28px 31px;
    }

    .timeline-waypoints button > i {
      width: 44px;
      height: 44px;
    }
  }

  @media (max-width: 1050px) {
    .archive-scene { inset: 94px 82px 160px 128px; }
    .chapter-rail { left: 14px; width: 100px; }
    .project-spatial-grid { grid-template-columns: minmax(0, 1fr); }
    .personal-spatial-grid { grid-template-columns: minmax(0, 1.18fr) minmax(265px, .82fr); }
    .spatial-lore-guide { left: 16px; width: min(430px, calc(100vw - 390px)); }
    .spatial-hud { right: 16px; width: 326px; }
    .chapter-heading h2 { font-size: 33.53px; }
    .intro-copy-stage {
      top: 23%;
      left: 20px;
      width: min(280px, 27vw);
    }
  }

  @media (min-width: 761px) and (max-width: 900px) {
    .intro-copy-stage {
      top: 22%;
      left: 14px;
      width: 22vw;
    }
    .intro-coordinate { font-size: 10px; }
    .intro-role { font-size: 22px; }
    .intro-summary { font-size: 15px; line-height: 1.4; }
    .intro-actions { flex-direction: column; align-items: flex-start; }
    .intro-status { display: none; }
  }

  @media (max-width: 760px) {
    :root { font-size: 18.63px; }
    .archive-scene.active .chapter-heading { animation: none; }
    .archive-scene.active .project-spatial-grid,
    .archive-scene.active .spatial-timeline,
    .archive-scene.active .personal-spatial-grid,
    .archive-scene.active .contact-transmission { animation: none; }
    .project-artifact-stage img { animation: mobileArtifactArrival 1300ms cubic-bezier(.16,.76,.22,1) both; }
    .timeline-focus-card { animation: mobileMaterialize 1150ms cubic-bezier(.16,.76,.22,1) both; }
    .personal-feature { animation: mobileRelocate 1050ms cubic-bezier(.16,.76,.22,1) both; }
    .archive-header { top: 10px; left: 12px; right: 12px; height: 52px; }
    .archive-identity .profile-avatar { width: 36px; height: 36px; }
    .archive-identity small { display: none; }
    .archive-identity strong { font-size: 16.15px; }
    .archive-header-actions { gap: 4px; }
    .archive-header-actions a { min-height: 30px; padding: 0 10px; font-size: 11.18px; }

    .chapter-rail,
    .chapter-rail.is-collapsed {
      left: 8px;
      right: 8px;
      top: 69px;
      width: auto;
      height: 52px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) 28px;
      align-items: stretch;
      transform: none;
    }

    .chapter-collapse { display: none; }
    .chapter-scroll-arrow {
      display: grid;
      place-items: center;
      border: 0;
      clip-path: polygon(4% 0, 96% 2%, 100% 13%, 97% 94%, 4% 100%, 0 86%);
      background: var(--surface-image) center / 260% 260% no-repeat;
      color: var(--panel-ink);
      filter: drop-shadow(0 7px 7px rgba(0, 0, 0, .32));
    }

    .chapter-rail-list,
    .chapter-rail.is-collapsed .chapter-rail-list {
      display: flex;
      min-width: 0;
      overflow-x: auto;
      overflow-y: hidden;
      opacity: 1;
      transform: none;
      pointer-events: auto;
      scrollbar-width: none;
      scroll-snap-type: x proximity;
    }

    .chapter-rail-list::-webkit-scrollbar { display: none; }
    .chapter-rail-list button { flex: 0 0 116px; min-height: 50px; grid-template-columns: 22px 1fr; scroll-snap-align: start; border: 0; }
    .chapter-rail-list button.active::after { display: none; }

    .archive-scene { inset: 130px 12px 112px; }
    .chapter-heading { align-items: start; gap: 12px; padding-bottom: 8px; }
    .chapter-heading h2 { font-size: 26.08px; line-height: 1.08; }
    .chapter-heading > span { display: none; }
    .chapter-heading p { margin-bottom: 4px; font-size: 9.94px; }

    .intro-chapter-content { width: 100%; height: 100%; padding: 0; }
    .intro-copy-stage {
      top: 33%;
      left: 3%;
      right: auto;
      width: 94%;
    }
    .intro-coordinate { margin-bottom: 12px; font-size: 9.94px; }
    .intro-role { margin-top: 12px; font-size: 22.36px; }
    .intro-summary { max-width: 92%; min-height: 4.26em; margin-top: 12px; font-size: 16.15px; line-height: 1.42; }
    .intro-actions { flex-wrap: wrap; margin-top: 17px; }
    .intro-actions a,
    .intro-gate-cta { min-height: 38px; padding: 0 12px; font-size: 11.18px; }
    .intro-gate-entry { top: 77.5%; }
    .intro-status { display: none; }

    .projects-chapter-content,
    .personal-chapter-content { gap: 8px; }
    .project-switcher,
    .personal-switcher { display: flex; overflow-x: auto; scrollbar-width: none; }
    .scrollable-tab-shell {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) 28px;
      min-width: 0;
    }
    .embedded-tab-arrow {
      display: grid;
      place-items: center;
      min-width: 0;
      border: 0;
      clip-path: polygon(4% 0, 96% 2%, 100% 13%, 97% 94%, 4% 100%, 0 86%);
      background: var(--surface-image) center / 260% 260% no-repeat;
      color: var(--panel-ink);
      filter: drop-shadow(0 7px 7px rgba(0, 0, 0, .3));
      cursor: pointer;
    }
    .project-switcher::-webkit-scrollbar,
    .personal-switcher::-webkit-scrollbar { display: none; }
    .project-switcher button,
    .personal-switcher button { flex: 0 0 150px; min-height: 42px; padding: 6px 8px; }
    .project-spatial-grid,
    .personal-spatial-grid { grid-template-columns: minmax(0, 1fr); gap: 8px; }
    .project-spatial-grid { grid-template-rows: 112px minmax(0, 1fr); }
    .project-artifact-stage { min-height: 112px; overflow: hidden; }
    .project-artifact-stage img { top: auto; right: auto; bottom: -24%; left: 50%; width: min(78%, 430px); max-height: 168%; }
    .project-artifact-stage.artifact-plugin img { top: auto; bottom: -43%; left: 50%; width: min(42%, 210px); max-height: 188%; }
    .project-artifact-stage.artifact-telemetry img { top: auto; bottom: -24%; left: 50%; width: min(58%, 310px); max-height: 158%; }
    .project-artifact-stage > span { left: 4px; bottom: 3px; font-size: 8.69px; }
    .project-topology-preview { display: none; }
    .project-evidence-panel { grid-row: 2; gap: 7px; padding: 20px 19px 18px; clip-path: polygon(0 0, 96% 0, 100% 10%, 100% 100%, 4% 100%, 0 90%); background-size: 110% 110%; }
    .project-evidence-panel h3,
    .project-evidence-panel > .project-summary { max-width: 100%; }
    .project-evidence-panel h3 { font-size: 24.84px; }
    .project-summary { font-size: 13.66px; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .project-proof-grid { grid-template-columns: 1fr 1fr; }
    .project-proof-grid > div:nth-child(n+3) { display: none; }
    .project-proof-grid div { padding: 8px; }
    .project-proof-grid dd { font-size: 11.18px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
    .project-action-row {
      top: 8px;
      right: 8px;
      bottom: auto;
      left: auto;
      width: 128px;
      flex-direction: column;
      transform: none;
    }
    .project-action-row a,
    .project-action-row button { width: 100%; flex: 0 0 auto; padding: 0 7px; font-size: 9.94px; }

    .timeline-chapter-content { gap: 8px; }
    .spatial-timeline { grid-template-columns: 1fr; grid-template-rows: 20px 142px minmax(0, 1fr); gap: 7px; }
    .timeline-axis { grid-column: 1; font-size: 8.69px; }
    .timeline-waypoints { grid-column: 1; grid-row: 2; gap: 7px; }
    .timeline-waypoints button { padding: 9px; grid-template-rows: auto 1fr auto; }
    .timeline-waypoints button > i { width: 34px; height: 34px; }
    .timeline-waypoints button strong { font-size: 14.9px; }
    .timeline-waypoints button small { display: none; }
    .timeline-focus-card { grid-column: 1; grid-row: 3; justify-content: flex-start; padding: 18px 19px; overflow: hidden; background-size: 110% 110%; }
    .timeline-focus-card > p { margin-bottom: 5px; font-size: 9.94px; }
    .timeline-focus-card h3 { font-size: 22.36px; }
    .timeline-focus-card > strong { margin-top: 4px; font-size: 13.66px; }
    .timeline-focus-card > span { margin-top: 7px; font-size: 11.18px; line-height: 1.32; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
    .timeline-focus-card ul { gap: 3px; margin-top: 7px; }
    .timeline-focus-card li { font-size: 9.94px; line-height: 1.3; }
    .timeline-focus-card li:nth-child(n+2) { display: none; }
    .professional-stack-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); max-height: 58px; overflow: hidden; }
    .professional-stack-strip div:nth-child(n+3) { display: none; }

    .personal-feature { min-height: 0; padding: 13px; }
    .personal-spatial-grid { grid-template-rows: minmax(0, 1.05fr) minmax(150px, .95fr); }
    .field-note-placeholder { min-height: 130px; }
    .field-note-placeholder strong { font-size: 22.36px; }
    .personal-feature-caption { grid-template-columns: 78px 1fr; gap: 7px; padding: 8px; }
    .personal-feature-caption span,
    .personal-feature-caption p { font-size: 9.94px; }
    .personal-collection-copy { padding: 19px; justify-content: flex-start; background-size: 110% 110%; }
    .personal-collection-copy h3 { margin-top: 4px; font-size: 21.11px; }
    .personal-collection-copy > span { margin-top: 6px; font-size: 11.18px; line-height: 1.33; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .personal-media-index { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3px; margin-top: 8px; }
    .personal-media-index button { grid-template-columns: 20px 1fr; min-height: 30px; padding: 0 5px; }
    .personal-media-index strong { font-size: 8.69px; }

    .contact-transmission { width: 100%; align-self: start; padding-top: 7vh; }
    .contact-transmission > p { font-size: 17.39px; }
    .contact-email { margin-top: 14px; font-size: 27.32px; }
    .contact-grid { grid-template-columns: 1fr; margin-top: 18px; }
    .contact-grid a { padding: 12px; }

    .spatial-hud { right: 10px; bottom: 14px; width: min(326px, calc(100vw - 20px)); }
    .spatial-lore-guide { left: 10px; bottom: 78px; width: 78px; min-height: 78px; padding-left: 0; }
    .spatial-lore-guide.is-collapsed { width: 78px; height: 78px; min-height: 78px; }
    .spatial-lore-guide .lore-medallion {
      top: 50%;
      left: 0;
      width: 76px;
      height: 76px;
      transform: translateY(-50%);
    }
    .spatial-lore-guide .lore-parchment { position: absolute; left: 58px; width: calc(100vw - 78px); opacity: 0; transform: translateX(-26px); pointer-events: none; }
    .spatial-lore-guide .lore-toggle { right: -28px; color: var(--accent); }
    .spatial-lore-guide:not(.is-collapsed) { bottom: 78px; width: calc(100vw - 20px); padding-left: 58px; }
    .spatial-lore-guide:not(.is-collapsed) .lore-parchment { opacity: 1; transform: none; pointer-events: auto; padding-left: 24px; }
    .spatial-lore-guide:not(.is-collapsed) .lore-toggle { right: 10px; color: var(--parchment-ink); }
    .archive-progress { bottom: 18px; width: 170px; }

    .architecture-dialog-backdrop { padding: 8px; }
    .architecture-dialog { width: 100%; max-height: 96vh; }
    .architecture-dialog > header { padding: 12px; }
    .architecture-dialog header h2 { font-size: 23.6px; }
    .architecture-dialog-summary { margin: 12px 12px 0; font-size: 13.66px; }
    .architecture-case-study { grid-template-columns: 1fr; margin: 12px 12px 0; }
    .architecture-step-grid { grid-template-columns: 1fr; margin: 12px; }
    .architecture-step-grid article { min-height: 0; }
    .architecture-placement,
    .architecture-notes { margin: 0 12px 12px; }
    .architecture-notes { grid-template-columns: 1fr; }
    .architecture-stack-grid { grid-template-columns: 1fr 1fr; margin: 0 12px 12px; }
  }

  @media (min-width: 761px) and (max-width: 1050px) {
    .archive-viewport.rail-expanded .archive-scene { left: 158px; }
    .archive-viewport.rail-collapsed .archive-scene { left: 76px; }
    .project-spatial-grid {
      padding-right: 150px;
      overflow: hidden;
    }
    .project-action-row {
      top: 50%;
      right: 0;
      bottom: auto;
      left: auto;
      width: 136px;
      flex-direction: column;
      transform: translateY(-50%);
    }
    .project-action-row a,
    .project-action-row button { width: 100%; }
  }

  @media (max-height: 820px) and (min-width: 761px) {
    .archive-scene { top: 84px; bottom: 100px; }
    .spatial-lore-guide,
    .spatial-hud { bottom: 8px; }

    .project-spatial-grid { grid-template-columns: minmax(0, 1fr); }
    .project-topology-preview { display: none; }
    .project-evidence-panel {
      gap: 8px;
      padding: 22px 34px;
    }
    .project-evidence-panel > .project-summary,
    .project-proof-grid dd { -webkit-line-clamp: 2; }
    .project-proof-grid { gap: 6px 14px; }
    .project-proof-grid div { padding: 4px 8px; }

    .timeline-focus-card { padding: 16px 28px; }
    .timeline-focus-card > p { margin-bottom: 4px; }
    .timeline-focus-card > strong { margin-top: 4px; }
    .timeline-focus-card > span {
      display: -webkit-box;
      flex: 0 0 auto;
      margin-top: 7px;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .timeline-focus-card ul { gap: 5px; margin-top: 8px; }
    .professional-stack-strip div { padding: 5px 10px; }
    .personal-collection-copy { padding: 24px 34px; }
    .personal-collection-copy h3 { margin-top: 4px; }
    .personal-collection-copy > span { margin-top: 8px; }
    .personal-media-index { margin-top: 8px; }
  }

  @media (max-height: 680px) and (min-width: 761px) {
    .archive-scene { top: 86px; bottom: 86px; }
    .chapter-heading h2 { font-size: 31.05px; }
    .chapter-heading { padding-bottom: 8px; }
    .intro-copy-stage { top: 20%; width: min(340px, 26vw); }
    .spatial-lore-guide { bottom: 12px; }
    .spatial-hud { bottom: 12px; }
    .archive-progress { bottom: 15px; }
  }

  /* Case studies are staged directly against the planetary systems plate. */
  .project-spatial-grid.project-case-layout {
    position: relative;
    min-width: 0;
    min-height: 0;
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(118px, auto) auto minmax(108px, 1fr);
    gap: clamp(8px, 1.2vh, 12px);
    padding: 0;
    overflow: visible;
    isolation: isolate;
  }

  .project-identity-copy {
    grid-column: 1;
    grid-row: 1;
    align-self: center;
    z-index: 5;
    width: min(48%, 590px);
    padding: 0;
    color: var(--ink);
    text-shadow: 0 3px 16px rgba(0, 0, 0, .82), var(--surface-text-shadow);
    pointer-events: none;
  }

  .project-identity-copy .project-overline {
    max-width: none;
    justify-content: flex-start;
    gap: 13px;
    color: var(--muted);
    font-size: clamp(12.42px, .82vw, 14.9px);
  }

  .project-identity-copy .project-overline span { color: var(--accent); }
  .project-identity-copy .project-overline em {
    overflow: visible;
    text-overflow: clip;
    white-space: normal;
  }

  .project-identity-copy h3 {
    max-width: 100%;
    margin: 8px 0 0;
    color: var(--ink);
    font-size: clamp(34.77px, 2.6vw, 47.2px);
    line-height: .96;
    text-transform: uppercase;
  }

  .project-identity-copy .project-summary {
    max-width: 100%;
    margin-top: 9px;
    color: var(--muted);
    font-size: clamp(16.77px, 1.08vw, 18.63px);
    line-height: 1.34;
  }

  .archive-app.theme-winter .project-identity-copy {
    color: #050505;
    text-shadow:
      0 1px 0 rgba(255, 255, 255, .96),
      0 0 11px rgba(238, 247, 250, .92),
      0 0 26px rgba(229, 241, 246, .64);
  }

  .archive-app.theme-winter .project-identity-copy :is(h3, .project-summary, .project-overline) {
    color: #050505;
  }

  .project-case-layout .project-artifact-stage {
    position: absolute;
    top: -5px;
    right: 174px;
    left: 48%;
    z-index: 3;
    width: auto;
    height: 116px;
    min-height: 0;
    overflow: visible;
    opacity: .92;
  }

  .project-case-layout .project-artifact-stage::before {
    left: 16%;
    right: 16%;
    bottom: -3px;
    height: 25px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .78), transparent 70%);
    filter: blur(7px);
    transform: perspective(420px) rotateX(68deg);
  }

  .project-case-layout .project-artifact-stage img,
  .project-case-layout .project-artifact-stage.artifact-plugin img,
  .project-case-layout .project-artifact-stage.artifact-telemetry img {
    top: 0;
    left: 50%;
    width: min(78%, 290px);
    height: 112px;
    max-height: none;
    opacity: .94;
    object-fit: contain;
  }

  .project-case-layout .project-artifact-stage.artifact-plugin img {
    top: -3px;
    width: min(48%, 174px);
  }

  .project-case-layout .project-artifact-stage.artifact-telemetry img {
    width: min(64%, 224px);
  }

  .project-case-layout .project-action-row {
    position: absolute;
    top: 4px;
    right: 0;
    bottom: auto;
    left: auto;
    z-index: 8;
    width: 158px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    transform: none;
  }

  .project-case-layout .project-action-row a,
  .project-case-layout .project-action-row button {
    width: 100%;
    min-height: 39px;
    padding-inline: 12px;
    font-size: 12.42px;
  }

  .project-case-layout .project-proof-grid {
    position: relative;
    grid-column: 1;
    grid-row: 2;
    z-index: 6;
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: stretch;
    gap: clamp(8px, 1vw, 15px);
    margin: 0;
    padding: 0;
    overflow: visible;
    border: 0;
    background: transparent;
  }

  .project-case-layout .project-proof-grid > div,
  .project-flowchart button {
    position: relative;
    border: 0;
    background: var(--surface-image) var(--slab-position, 50% 50%) / 182% 182% no-repeat;
    color: var(--panel-ink);
    clip-path: polygon(3% 0, 97% 1%, 100% 8%, 98% 94%, 93% 100%, 4% 98%, 0 91%, 1% 6%);
    text-shadow: var(--surface-text-shadow);
    filter: drop-shadow(0 13px 10px rgba(0, 0, 0, .42));
    isolation: isolate;
  }

  .project-case-layout .project-proof-grid > div {
    display: block;
    min-width: 0;
    min-height: 145px;
    padding: clamp(11px, 1vw, 15px) clamp(12px, 1.15vw, 17px);
    overflow: hidden;
    transition: filter 360ms ease, transform 420ms cubic-bezier(.16, .76, .22, 1);
  }

  .project-case-layout .project-proof-grid > div:nth-child(1) { --slab-position: 21% 46%; --proof-rest-transform: rotate(-.18deg); transform: var(--proof-rest-transform); }
  .project-case-layout .project-proof-grid > div:nth-child(2) { --slab-position: 44% 52%; --proof-rest-transform: translateY(2px) rotate(.12deg); transform: var(--proof-rest-transform); }
  .project-case-layout .project-proof-grid > div:nth-child(3) { --slab-position: 68% 48%; --proof-rest-transform: translateY(-1px) rotate(-.1deg); transform: var(--proof-rest-transform); }
  .project-case-layout .project-proof-grid > div:nth-child(4) { --slab-position: 86% 54%; --proof-rest-transform: translateY(2px) rotate(.16deg); transform: var(--proof-rest-transform); }

  .project-case-layout .project-proof-grid > div::before,
  .project-flowchart button::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      linear-gradient(142deg, rgba(255, 255, 255, .17), transparent 11% 70%, rgba(0, 0, 0, .28)),
      linear-gradient(180deg, transparent 62%, rgba(0, 0, 0, .2));
    box-shadow:
      inset 0 2px 1px rgba(255, 255, 255, .13),
      inset 0 -9px 18px rgba(0, 0, 0, .18);
    opacity: .66;
  }

  .project-case-layout .project-proof-grid > div:hover {
    filter: brightness(1.06) drop-shadow(0 17px 13px rgba(0, 0, 0, .48));
    transform: translateY(-4px);
  }

  .project-case-layout .project-proof-grid > div:nth-child(n + 3) { display: block; }

  .project-case-layout .project-proof-grid dt {
    position: relative;
    z-index: 2;
    margin-bottom: 7px;
    color: var(--accent);
    font-size: clamp(12.42px, .72vw, 13.05px);
    letter-spacing: 0;
  }

  .project-case-layout .project-proof-grid dd {
    position: relative;
    z-index: 2;
    display: block;
    overflow: visible;
    margin: 0;
    color: var(--panel-ink);
    font-size: clamp(13.05px, .76vw, 14.29px);
    line-height: 1.28;
    -webkit-box-orient: initial;
    -webkit-line-clamp: initial;
  }

  .project-topology-stage {
    position: relative;
    grid-column: 1;
    grid-row: 3;
    z-index: 4;
    min-width: 0;
    min-height: 0;
    display: grid;
    align-items: end;
    overflow: visible;
    isolation: isolate;
    perspective: 1100px;
  }

  .project-topology-stage::before {
    content: "";
    position: absolute;
    right: 10%;
    bottom: -12px;
    left: 10%;
    height: 78px;
    z-index: -2;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .58), rgba(0, 0, 0, .22) 44%, transparent 72%);
    filter: blur(9px);
    transform: perspective(760px) rotateX(65deg) scaleX(.96);
    transform-origin: 50% 100%;
    pointer-events: none;
  }

  .project-topology-stage .topology-heading {
    position: absolute;
    top: 0;
    left: 1.5%;
    z-index: 5;
    display: grid;
    gap: 2px;
    max-width: 34%;
    padding: 0;
    border: 0;
    color: var(--ink);
    text-shadow: 0 3px 12px rgba(0, 0, 0, .76), var(--surface-text-shadow);
  }

  .project-topology-stage .topology-heading span {
    color: var(--accent);
    font-size: 11.8px;
  }

  .project-topology-stage .topology-heading strong {
    color: var(--ink);
    font-size: 16.15px;
    line-height: 1.05;
  }

  .archive-app.theme-winter .project-topology-stage .topology-heading,
  .archive-app.theme-winter .project-topology-stage .topology-heading :is(span, strong) {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .94), 0 0 10px rgba(239, 248, 251, .9);
  }

  .project-topology-stage .compact-stack {
    position: absolute;
    top: 0;
    right: 1.5%;
    z-index: 5;
    width: min(58%, 670px);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    padding: 0;
    border: 0;
    pointer-events: none;
  }

  .project-topology-stage .compact-stack div {
    min-width: 0;
    display: block;
  }

  .project-topology-stage .compact-stack span {
    display: block;
    margin-bottom: 2px;
    color: var(--accent);
    font-size: 9.94px;
  }

  .project-topology-stage .compact-stack p {
    overflow: hidden;
    margin: 0;
    color: var(--muted);
    font-size: 9.94px;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 2px 8px rgba(0, 0, 0, .78);
  }

  .archive-app.theme-winter .project-topology-stage .compact-stack :is(span, p) {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .94), 0 0 9px rgba(239, 248, 251, .86);
  }

  .project-flowchart {
    --flow-gap: clamp(14px, 1.55vw, 25px);
    position: relative;
    align-self: end;
    justify-self: center;
    width: min(79%, 930px);
    min-height: 78px;
    display: grid;
    grid-template-columns: repeat(var(--flow-count), minmax(70px, 1fr));
    gap: var(--flow-gap);
    margin: 0 0 54px;
    padding: 0;
    overflow: visible;
    list-style: none;
    transform: perspective(980px) rotateX(48deg) translateY(10px);
    transform-origin: 50% 100%;
    transform-style: preserve-3d;
  }

  .project-flowchart li {
    position: relative;
    z-index: 2;
    min-width: 0;
    display: flex;
    transform-style: preserve-3d;
    animation: topologyNodeSettle 780ms cubic-bezier(.16, .76, .22, 1) both;
    animation-delay: calc(120ms + var(--flow-index) * 70ms);
  }

  .project-flowchart li::before {
    content: "";
    position: absolute;
    right: 7%;
    bottom: -11px;
    left: 7%;
    height: 22px;
    z-index: -2;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .68), transparent 72%);
    filter: blur(5px);
    transform: translateZ(-10px);
  }

  .project-flowchart li:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    left: calc(100% - 2px);
    width: calc(var(--flow-gap) + 5px);
    height: 12px;
    z-index: -1;
    background: linear-gradient(90deg, var(--mountain), var(--accent) 58%, var(--mountain));
    clip-path: polygon(0 35%, 72% 35%, 72% 0, 100% 50%, 72% 100%, 72% 65%, 0 65%);
    filter: drop-shadow(0 4px 3px rgba(0, 0, 0, .56));
    transform: translateY(-50%) translateZ(-4px);
  }

  .project-flowchart button {
    width: 100%;
    min-height: 84px;
    display: grid;
    align-content: center;
    gap: 5px;
    padding: 10px 8px;
    cursor: pointer;
    transform: translateZ(0);
    transform-style: preserve-3d;
    transition: filter 360ms ease, transform 420ms cubic-bezier(.16, .76, .22, 1);
  }

  .project-flowchart li:nth-child(2n) button { --slab-position: 72% 48%; }
  .project-flowchart li:nth-child(3n) button { --slab-position: 32% 62%; }

  .project-flowchart button:hover,
  .project-flowchart button:focus-visible {
    filter: brightness(1.1) drop-shadow(0 18px 12px rgba(0, 0, 0, .5));
    transform: translate3d(0, -5px, 17px);
  }

  .project-flowchart button span,
  .project-flowchart button strong {
    position: relative;
    z-index: 2;
  }

  .project-flowchart button span {
    color: var(--accent);
    font-size: 10.56px;
    line-height: 1;
  }

  .project-flowchart button strong {
    color: var(--panel-ink);
    font-size: clamp(11.18px, .66vw, 12.42px);
    line-height: 1.05;
    text-transform: uppercase;
  }

  @keyframes topologyNodeSettle {
    from { opacity: 0; transform: translate3d(0, 18px, -34px); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  @media (min-width: 761px) {
    .archive-viewport .archive-scene.scene-projects {
      right: clamp(20px, 2.4vw, 38px);
    }
  }

  @media (min-width: 761px) and (max-width: 1050px) {
    .project-spatial-grid.project-case-layout {
      padding-right: 0;
      overflow: visible;
    }

    .project-identity-copy { width: 47%; }
    .project-case-layout .project-artifact-stage { right: 150px; left: 47%; }
    .project-case-layout .project-action-row { width: 140px; }
    .project-case-layout .project-proof-grid dd { font-size: 11.8px; }
    .project-flowchart { width: 84%; }
  }

  @media (min-width: 761px) and (max-width: 900px) {
    .archive-viewport .archive-scene.scene-projects { right: 14px; }
    .project-identity-copy { width: calc(100% - 154px); }
    .project-case-layout .project-artifact-stage { display: none; }
    .project-case-layout .project-proof-grid {
      grid-template-columns: repeat(4, minmax(195px, 1fr));
      overflow-x: auto;
      overscroll-behavior-x: contain;
      scrollbar-width: none;
    }
    .project-case-layout .project-proof-grid::-webkit-scrollbar { display: none; }
    .project-topology-stage { overflow-x: auto; scrollbar-width: none; }
    .project-topology-stage::-webkit-scrollbar { display: none; }
    .project-flowchart { width: 690px; min-width: 690px; justify-self: start; }
    .project-topology-stage .compact-stack { display: none; }
  }

  @media (max-width: 760px) {
    .project-spatial-grid.project-case-layout {
      grid-template-rows: minmax(92px, auto) 132px minmax(92px, 1fr);
      gap: 7px;
      padding: 0;
      overflow: visible;
    }

    .project-identity-copy {
      width: 100%;
      padding-right: 118px;
    }

    .project-identity-copy .project-overline { gap: 7px; font-size: 9.94px; }
    .project-identity-copy h3 { margin-top: 4px; font-size: 24.84px; }
    .project-identity-copy .project-summary {
      display: -webkit-box;
      margin-top: 5px;
      overflow: hidden;
      font-size: 11.8px;
      line-height: 1.24;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

    .project-case-layout .project-artifact-stage { display: none; }
    .project-case-layout .project-action-row {
      top: 0;
      right: 0;
      width: 110px;
      gap: 5px;
    }
    .project-case-layout .project-action-row a,
    .project-case-layout .project-action-row button {
      min-height: 32px;
      padding: 0 6px;
      font-size: 9.32px;
    }

    .project-case-layout .project-proof-grid {
      width: 100%;
      max-width: 100%;
      grid-template-columns: repeat(4, minmax(210px, 74vw));
      gap: 8px;
      padding: 1px 0 7px;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x proximity;
      scroll-padding-inline: 10px;
      scroll-behavior: smooth;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x pinch-zoom;
      cursor: grab;
      scrollbar-width: none;
    }
    .project-case-layout .project-proof-grid:active { cursor: grabbing; }
    .project-case-layout .project-proof-grid::-webkit-scrollbar { display: none; }
    .project-case-layout .project-proof-grid > div,
    .project-case-layout .project-proof-grid > div:nth-child(n + 3) {
      display: block;
      min-height: 122px;
      padding: 10px 11px;
      scroll-snap-align: start;
      transform: none;
    }
    .project-case-layout .project-proof-grid dt { margin-bottom: 4px; font-size: 9.94px; }
    .project-case-layout .project-proof-grid dd { font-size: 10.56px; line-height: 1.22; }

    .project-topology-stage {
      min-height: 92px;
      padding-top: 19px;
      overflow-x: auto;
      overflow-y: hidden;
      overscroll-behavior-x: contain;
      scrollbar-width: none;
    }
    .project-topology-stage::-webkit-scrollbar { display: none; }
    .project-topology-stage .topology-heading {
      position: absolute;
      top: 0;
      left: 0;
      max-width: 72vw;
    }
    .project-topology-stage .topology-heading span { font-size: 8.69px; }
    .project-topology-stage .topology-heading strong { font-size: 11.18px; }
    .project-topology-stage .compact-stack { display: none; }
    .project-flowchart {
      --flow-gap: 10px;
      width: max(640px, calc(var(--flow-count) * 94px));
      min-width: max(640px, calc(var(--flow-count) * 94px));
      min-height: 62px;
      justify-self: start;
      grid-template-columns: repeat(var(--flow-count), minmax(80px, 1fr));
      margin-bottom: -6px;
      transform: perspective(720px) rotateX(48deg) translateY(6px);
    }
    .project-flowchart button { min-height: 61px; padding: 7px 6px; }
    .project-flowchart button span { font-size: 8.69px; }
    .project-flowchart button strong { font-size: 9.32px; }
  }

  @media (max-height: 680px) and (min-width: 761px) {
    .project-spatial-grid.project-case-layout {
      grid-template-rows: minmax(88px, auto) auto minmax(82px, 1fr);
      gap: 6px;
    }
    .project-identity-copy h3 { font-size: 31.05px; }
    .project-identity-copy .project-summary {
      display: -webkit-box;
      overflow: hidden;
      font-size: 13.66px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .project-case-layout .project-proof-grid > div { min-height: 104px; padding: 8px 10px; }
    .project-case-layout .project-proof-grid dt { margin-bottom: 3px; font-size: 9.94px; }
    .project-case-layout .project-proof-grid dd { font-size: 10.56px; line-height: 1.18; }
    .project-flowchart button { min-height: 58px; }
    .project-topology-stage .compact-stack { display: none; }
  }

  /* The topology shares the systems plate coordinate space, preserving its spatial anchor at every aspect ratio. */
  .cinematic-systems-overlay {
    position: absolute;
    inset: 0;
    z-index: 6;
    overflow: hidden;
    pointer-events: none;
    perspective: 1600px;
  }

  .cinematic-systems-overlay .cinematic-image-stage {
    pointer-events: none;
  }

  .systems-overlay-plate {
    z-index: 1;
    pointer-events: none;
  }

  .archive-viewport.theme-default {
    --topology-rope-dark: #261d13;
    --topology-rope-mid: #756044;
    --topology-rope-light: #c3a370;
  }

  .archive-viewport.theme-fall {
    --topology-rope-dark: #32160f;
    --topology-rope-mid: #8d462b;
    --topology-rope-light: #d28a45;
  }

  .archive-viewport.theme-spring {
    --topology-rope-dark: #142419;
    --topology-rope-mid: #4f7458;
    --topology-rope-light: #a2bd84;
  }

  .archive-viewport.theme-winter {
    --topology-rope-dark: #1e2930;
    --topology-rope-mid: #65757e;
    --topology-rope-light: #d8e0e3;
  }

  .cinematic-systems-overlay .project-topology-stage {
    position: absolute;
    top: 55.1%;
    left: 26.35%;
    width: 47.3%;
    height: 23.7%;
    min-width: 0;
    min-height: 0;
    display: block;
    overflow: visible;
    isolation: isolate;
    perspective: none;
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage::before {
    content: none;
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading {
    position: absolute;
    top: 1.5%;
    left: 1.2%;
    z-index: 5;
    max-width: 30%;
    display: grid;
    gap: 2px;
    padding: 0;
    color: var(--ink);
    text-shadow: 0 3px 12px rgba(0, 0, 0, .9), var(--surface-text-shadow);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading span {
    color: var(--accent);
    font-size: clamp(9px, .58vw, 12px);
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading strong {
    color: var(--ink);
    font-size: clamp(11px, .78vw, 16px);
    line-height: 1.08;
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack {
    position: absolute;
    top: 105%;
    right: 6%;
    left: 6%;
    z-index: 5;
    width: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(12px, 1.3vw, 24px);
    padding: clamp(5px, .48vw, 9px) clamp(14px, 1.4vw, 26px);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack div {
    min-width: 0;
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack span,
  .cinematic-systems-overlay .project-topology-stage .compact-stack p {
    display: block;
    overflow: hidden;
    margin: 0;
    color: var(--ink);
    font-size: clamp(11.5px, .74vw, 14.5px);
    font-weight: 700;
    line-height: 1.12;
    text-overflow: ellipsis;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .96), var(--surface-text-shadow);
    white-space: nowrap;
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack span {
    margin-bottom: 2px;
    color: var(--accent);
  }

  .cinematic-systems-overlay .project-flowchart {
    --flow-gap: clamp(10px, .86vw, 16px);
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    min-width: 0;
    height: 72%;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(var(--flow-count), minmax(0, 1fr));
    align-items: end;
    gap: var(--flow-gap);
    margin: 0;
    padding: 0;
    overflow: visible;
    list-style: none;
    transform: none;
    transform-style: flat;
  }

  .cinematic-systems-overlay .project-flowchart::before {
    content: none;
  }

  .cinematic-systems-overlay .project-flowchart li {
    position: relative;
    z-index: 2;
    min-width: 0;
    height: 100%;
    display: grid;
    align-items: end;
    opacity: 1;
    transform: none;
    transform-style: flat;
    animation: topologyNodeFloat 5s ease-in-out calc(var(--flow-index) * -.43s) infinite;
  }

  .cinematic-systems-overlay .project-flowchart li::before {
    content: "";
    position: absolute;
    right: 9%;
    bottom: -5%;
    left: 9%;
    height: 13%;
    z-index: -3;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .78), rgba(0, 0, 0, .28) 48%, transparent 74%);
    filter: blur(4px);
    transform: scaleX(.92);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-flowchart li:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 18%;
    left: 64%;
    width: calc(72% + var(--flow-gap));
    height: clamp(48px, 3.6vw, 66px);
    z-index: 1;
    border: 0;
    border-radius: 0;
    background: var(--topology-rope-image) center / 100% 100% no-repeat;
    box-shadow: none;
    clip-path: none;
    filter: brightness(1.24) drop-shadow(0 4px 3px rgba(0, 0, 0, .72));
    transform: none;
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-flowchart button {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 96%;
    min-height: 0;
    display: grid;
    align-content: center;
    justify-items: center;
    gap: clamp(3px, .32vw, 6px);
    padding: 23% 17% 19%;
    overflow: visible;
    border: 0;
    background: var(--topology-slab-image) center / 100% 100% no-repeat;
    color: #ece5d6;
    clip-path: none;
    cursor: pointer;
    filter: drop-shadow(0 12px 8px rgba(0, 0, 0, .52));
    text-shadow: 0 1px 1px rgba(0, 0, 0, .96);
    transform: translate3d(0, 0, 0);
    transform-style: flat;
    transition: filter 320ms ease, transform 380ms cubic-bezier(.16, .76, .22, 1);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage.is-interactive .project-flowchart button {
    pointer-events: auto;
  }

  .cinematic-systems-overlay .project-flowchart button::before,
  .cinematic-systems-overlay .project-flowchart button::after { content: none; }

  .cinematic-systems-overlay .project-flowchart button:hover,
  .cinematic-systems-overlay .project-flowchart button:focus-visible {
    filter: brightness(1.1) drop-shadow(0 20px 13px rgba(0, 0, 0, .6));
    transform: translate3d(0, -7px, 0) scale(1.045);
  }

  .cinematic-systems-overlay .project-flowchart button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -8px;
  }

  .cinematic-systems-overlay .project-flowchart button span,
  .cinematic-systems-overlay .project-flowchart button strong {
    position: relative;
    z-index: 4;
    max-width: 100%;
    overflow-wrap: anywhere;
    text-align: center;
  }

  .cinematic-systems-overlay .project-flowchart button span {
    color: var(--accent);
    font-size: clamp(9px, .58vw, 11px);
    font-weight: 700;
    line-height: 1;
  }

  .cinematic-systems-overlay .project-flowchart button strong {
    color: #eee7d8;
    font-size: clamp(11px, .72vw, 15px);
    font-weight: 700;
    line-height: 1.06;
    text-transform: uppercase;
  }

  .archive-viewport.theme-winter .cinematic-systems-overlay .project-topology-stage :is(.topology-heading, .topology-heading span, .topology-heading strong, .compact-stack span, .compact-stack p) {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .98), 0 0 9px rgba(239, 248, 251, .88);
  }

  .archive-viewport.theme-winter .cinematic-systems-overlay .project-flowchart button {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .96), 0 0 5px rgba(255, 255, 255, .84);
  }

  .archive-viewport.theme-winter .cinematic-systems-overlay .project-flowchart button :is(span, strong) {
    color: #050505;
  }

  @keyframes topologyNodeFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -5px; }
  }

  @media (max-width: 760px) {
    .cinematic-systems-overlay .project-topology-stage {
      top: 54.8%;
      left: 50%;
      width: 100vw;
      height: 24.5%;
      overflow-x: auto;
      overflow-y: visible;
      scroll-snap-type: x proximity;
      scroll-padding-inline: 14px;
      scroll-behavior: smooth;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x pinch-zoom;
      cursor: grab;
      scrollbar-width: none;
      transform: translateX(-50%);
      pointer-events: auto;
    }

    .cinematic-systems-overlay .project-topology-stage:active { cursor: grabbing; }
    .cinematic-systems-overlay .project-topology-stage::-webkit-scrollbar { display: none; }
    .cinematic-systems-overlay .project-topology-stage .compact-stack { display: none; }
    .cinematic-systems-overlay .project-topology-stage .topology-heading {
      position: sticky;
      left: 16px;
      max-width: 240px;
    }

    .cinematic-systems-overlay .project-flowchart {
      --flow-gap: 8px;
      right: auto;
      width: max(660px, calc(var(--flow-count) * 96px));
      min-width: max(660px, calc(var(--flow-count) * 96px));
      height: 72%;
      grid-template-columns: repeat(var(--flow-count), minmax(84px, 1fr));
      padding-inline: 14px;
    }

    .cinematic-systems-overlay .project-flowchart li {
      scroll-snap-align: center;
      scroll-snap-stop: normal;
    }

    .cinematic-systems-overlay .project-flowchart button {
      padding: 22% 17% 18%;
    }

    .cinematic-systems-overlay .project-flowchart button span { font-size: 8px; }
    .cinematic-systems-overlay .project-flowchart button strong { font-size: 9px; }
  }

  /* Time-driven case-study choreography shared by the scene copy and table topology. */
  .case-type-caret {
    display: inline-block;
    width: .07em;
    height: .82em;
    margin-left: .08em;
    background: currentColor;
    box-shadow: 0 0 7px color-mix(in srgb, currentColor 52%, transparent);
    vertical-align: -.02em;
    animation: caseCaretBlink 720ms steps(1, end) infinite;
  }

  .case-study-heading > div > p,
  .case-study-heading h2,
  .case-study-heading > span,
  .project-identity-copy .project-overline,
  .project-identity-copy h3,
  .project-identity-copy .project-summary,
  .project-topology-stage .topology-heading span,
  .project-topology-stage .topology-heading strong {
    min-height: 1em;
  }

  .projects-chapter-content:not(.is-sequence-active) .case-study-heading,
  .projects-chapter-content:not(.is-sequence-active) .project-switcher-shell {
    visibility: hidden;
  }

  .projects-chapter-content:not(.is-sequence-active) .project-switcher button {
    opacity: 0;
    transform: translate3d(0, 12px, 0) scale(.76);
  }

  .projects-chapter-content.is-sequence-active .project-switcher button {
    animation: caseTabEnter 820ms cubic-bezier(.16, .82, .2, 1) var(--case-tab-enter-delay) backwards;
    transform-origin: 50% 50%;
    will-change: opacity, transform;
  }

  .project-case-layout.case-sequence-idle :is(
    .project-identity-copy,
    .project-artifact-stage,
    .project-action-row,
    .project-proof-grid > div
  ) {
    opacity: 0;
    pointer-events: none;
  }

  .project-case-layout.case-sequence-entering .project-identity-copy,
  .project-case-layout.case-sequence-visible .project-identity-copy,
  .project-case-layout.case-sequence-exiting .project-identity-copy {
    opacity: 1;
  }

  .project-case-layout.case-sequence-entering :is(.project-artifact-stage, .project-action-row) {
    animation: caseIdentitySupportEnter 980ms cubic-bezier(.16, .82, .2, 1) var(--case-artifact-enter-delay) both;
    will-change: opacity, transform;
  }

  .project-case-layout.case-sequence-visible :is(.project-artifact-stage, .project-action-row) {
    opacity: 1;
    filter: none;
    transform: none;
  }

  .project-case-layout.case-sequence-exiting :is(.project-artifact-stage, .project-action-row) {
    animation: caseIdentitySupportExit 720ms cubic-bezier(.5, 0, .84, .18) var(--case-artifact-exit-delay) both;
    pointer-events: none;
    will-change: opacity, transform;
  }

  .scene-projects .project-case-layout .project-proof-grid > div {
    --proof-float-delay: -1.1s;
    translate: 0 0;
    will-change: opacity, transform, translate;
  }

  .scene-projects .project-case-layout .project-proof-grid > div:nth-child(2) { --proof-float-delay: -2.4s; }
  .scene-projects .project-case-layout .project-proof-grid > div:nth-child(3) { --proof-float-delay: -.5s; }
  .scene-projects .project-case-layout .project-proof-grid > div:nth-child(4) { --proof-float-delay: -3.2s; }

  .project-case-layout.case-sequence-idle .project-proof-grid > div {
    transform: translate3d(155px, 12px, 0) scale(.91);
  }

  .project-case-layout.case-sequence-entering .project-proof-grid > div {
    animation:
      caseProofEnter 900ms cubic-bezier(.12, .82, .18, 1) var(--proof-enter-delay) both,
      proofSlabFloat 5.4s ease-in-out var(--proof-float-delay) infinite;
  }

  .project-case-layout.case-sequence-visible .project-proof-grid > div {
    opacity: 1;
    transform: var(--proof-rest-transform);
    animation: proofSlabFloat 5.4s ease-in-out var(--proof-float-delay) infinite;
  }

  .project-case-layout.case-sequence-exiting .project-proof-grid > div {
    animation:
      caseProofExit 760ms cubic-bezier(.52, 0, .88, .22) var(--proof-exit-delay) both,
      proofSlabFloat 5.4s ease-in-out var(--proof-float-delay) infinite;
    pointer-events: none;
  }

  .scene-projects .project-case-layout.case-sequence-visible .project-proof-grid > div:hover {
    scale: 1.025;
    filter: brightness(1.07) drop-shadow(0 17px 13px rgba(0, 0, 0, .48));
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-idle .topology-heading {
    visibility: hidden;
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading span,
  .cinematic-systems-overlay .project-topology-stage .topology-heading strong {
    display: block;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-idle .project-flowchart li {
    opacity: 0;
    transform: translate3d(-175px, 12px, 0) scale(.9);
    animation: none;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-entering .project-flowchart li {
    animation:
      caseTopologyEnter 1050ms cubic-bezier(.12, .82, .18, 1) var(--case-topology-enter-delay) both,
      topologyNodeFloat 5s ease-in-out calc(var(--flow-index) * -.43s) infinite;
    will-change: opacity, transform, translate;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-visible .project-flowchart li {
    opacity: 1;
    transform: none;
    animation: topologyNodeFloat 5s ease-in-out calc(var(--flow-index) * -.43s) infinite;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-exiting .project-flowchart li {
    animation:
      caseTopologyExit 900ms cubic-bezier(.52, 0, .88, .22) var(--case-topology-exit-delay) both,
      topologyNodeFloat 5s ease-in-out calc(var(--flow-index) * -.43s) infinite;
    pointer-events: none;
    will-change: opacity, transform, translate;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-idle .compact-stack div {
    opacity: 0;
    transform: translate3d(0, 38px, 0) scale(.94);
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-entering .compact-stack div {
    animation: caseStackEnter 720ms cubic-bezier(.12, .82, .18, 1) var(--stack-enter-delay) both;
    will-change: opacity, transform;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-visible .compact-stack div {
    opacity: 1;
    filter: none;
    transform: none;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-exiting .compact-stack div {
    animation: caseStackExit 650ms cubic-bezier(.52, 0, .88, .22) var(--stack-exit-delay) both;
    will-change: opacity, transform;
  }

  @keyframes caseCaretBlink {
    0%, 46% { opacity: 1; }
    47%, 100% { opacity: 0; }
  }

  @keyframes caseTabEnter {
    0% { opacity: 0; transform: translate3d(0, 15px, -70px) scale(.72); }
    64% { opacity: 1; transform: translate3d(0, -2px, 4px) scale(1.018); }
    100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes caseIdentitySupportEnter {
    0% { opacity: 0; clip-path: inset(0 50%); transform: translate3d(0, 18px, -85px) scale(.8); }
    66% { opacity: 1; clip-path: inset(0 0); transform: translate3d(0, -2px, 4px) scale(1.012); }
    100% { opacity: 1; clip-path: inset(0 0); transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes caseIdentitySupportExit {
    0% { opacity: 1; clip-path: inset(0 0); transform: translate3d(0, 0, 0) scale(1); }
    100% { opacity: 0; clip-path: inset(0 50%); transform: translate3d(0, -10px, 75px) scale(1.16); }
  }

  @keyframes caseProofEnter {
    0% { opacity: 0; transform: translate3d(175px, 14px, 0) scale(.9) rotate(1.8deg); }
    68% { opacity: 1; transform: translate3d(-5px, -2px, 0) scale(1.012); }
    100% { opacity: 1; transform: var(--proof-rest-transform); }
  }

  @keyframes caseProofExit {
    0% { opacity: 1; transform: var(--proof-rest-transform); }
    100% { opacity: 0; transform: translate3d(-175px, -12px, 0) scale(.9) rotate(-1.8deg); }
  }

  @keyframes caseTopologyEnter {
    0% { opacity: 0; transform: translate3d(-185px, 13px, 0) scale(.88); }
    68% { opacity: 1; transform: translate3d(5px, -2px, 0) scale(1.012); }
    100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes caseTopologyExit {
    0% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
    100% { opacity: 0; transform: translate3d(185px, -10px, 0) scale(.9); }
  }

  @keyframes caseStackEnter {
    0% { opacity: 0; transform: translate3d(0, 42px, 0) scale(.94); }
    70% { opacity: 1; transform: translate3d(0, -3px, 0) scale(1.008); }
    100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes caseStackExit {
    0% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
    100% { opacity: 0; transform: translate3d(0, -42px, 0) scale(.94); }
  }

  @keyframes proofSlabFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -4px; }
  }

  @media (min-width: 761px) {
    .cinematic-systems-overlay .project-topology-stage .topology-heading {
      top: auto;
      right: auto;
      bottom: 74%;
      left: 50%;
      width: max-content;
      max-width: 88%;
      justify-items: center;
      text-align: center;
      transform: translateX(-50%);
    }

    .archive-scene.scene-projects .projects-chapter-content {
      width: min(100%, 1260px);
      justify-self: center;
    }

    .scene-projects .project-switcher-shell {
      width: min(66%, 650px);
      justify-self: start;
    }

    .scene-projects .project-switcher button {
      grid-template-columns: 24px minmax(0, 1fr);
      min-height: 42px;
      padding-inline: 9px;
    }

    .project-case-layout .project-action-row {
      top: 46px;
    }

    .project-case-layout .project-proof-grid > div {
      min-height: 116px;
      padding: clamp(9px, .78vw, 12px) clamp(11px, .92vw, 14px);
    }
  }

  @media (min-width: 1051px) {
    .archive-viewport.rail-expanded .archive-scene.scene-projects {
      left: clamp(210px, 15vw, 268px);
      right: clamp(72px, 6.5vw, 124px);
    }

    .archive-viewport.rail-collapsed .archive-scene.scene-projects {
      left: clamp(126px, 10vw, 176px);
      right: clamp(72px, 6.5vw, 124px);
    }
  }

  /* Theme-matched physical interface materials. Icon-only collapse controls remain unframed. */
  .archive-viewport :is(
    .archive-header-actions a,
    .intro-actions a,
    .intro-gate-cta,
    .project-action-row a,
    .project-action-row button,
    .chapter-rail-list button,
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button,
    .chapter-scroll-arrow,
    .embedded-tab-arrow,
    .dialog-close
  ) {
    border: 0;
    border-radius: 0;
    background: var(--control-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    clip-path: none;
    filter: drop-shadow(0 9px 8px rgba(0, 0, 0, .42));
    text-shadow: var(--surface-text-shadow);
    transition:
      color 240ms ease,
      filter 320ms ease,
      transform 420ms cubic-bezier(.16, .76, .22, 1);
  }

  .archive-viewport :is(
    .archive-header-actions a,
    .intro-actions a,
    .intro-gate-cta,
    .project-action-row a,
    .project-action-row button,
    .chapter-rail-list button,
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button,
    .chapter-scroll-arrow,
    .embedded-tab-arrow,
    .dialog-close
  ):hover {
    background: var(--control-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.1) drop-shadow(0 13px 10px rgba(0, 0, 0, .5));
  }

  .archive-viewport :is(
    .chapter-rail-list button,
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button
  ).active {
    background: var(--control-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.2) saturate(1.08) drop-shadow(0 15px 12px rgba(0, 0, 0, .56));
  }

  .archive-viewport.theme-winter :is(
    .archive-header-actions a,
    .intro-actions a,
    .intro-gate-cta,
    .project-action-row a,
    .project-action-row button,
    .chapter-rail-list button,
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button,
    .chapter-scroll-arrow,
    .embedded-tab-arrow,
    .dialog-close
  ) {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .92), 0 0 3px rgba(255, 255, 255, .78);
  }

  .chapter-rail-list {
    gap: 9px;
    border: 0;
    background: transparent;
    overflow: visible;
  }

  .chapter-rail-list button {
    padding-inline: 11px;
  }

  .project-switcher,
  .personal-switcher {
    gap: clamp(7px, .72vw, 11px);
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .project-switcher button,
  .personal-switcher button {
    padding-inline: clamp(12px, 1vw, 17px);
  }

  .archive-viewport .spatial-hud {
    border: 0;
    border-radius: 0;
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    clip-path: none;
    filter: drop-shadow(0 22px 24px rgba(0, 0, 0, .55));
    backdrop-filter: none;
  }

  .spatial-hud-content {
    gap: 12px;
    padding: 34px 39px 35px;
  }

  .hud-coordinate,
  .hud-atmosphere-row {
    border: 0;
  }

  .hud-theme-row {
    gap: 7px;
  }

  .hud-theme-row button {
    min-height: 36px;
    padding-inline: 8px;
  }

  .archive-viewport .lore-parchment {
    min-height: 158px;
    border: 0;
    border-radius: 0;
    background: var(--lore-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    clip-path: none;
    filter: drop-shadow(0 18px 18px rgba(0, 0, 0, .48));
    text-shadow: var(--surface-text-shadow);
  }

  .archive-viewport.theme-winter .lore-parchment {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .96), 0 0 3px rgba(255, 255, 255, .84);
  }

  .archive-viewport .spatial-lore-guide {
    position: fixed;
  }

  .archive-viewport .lore-toggle:disabled {
    opacity: 0;
    pointer-events: none;
  }

  .archive-viewport .spatial-lore-guide.is-opening .lore-toggle {
    opacity: 0;
    pointer-events: none;
  }

  @media (min-width: 761px) {
    .archive-viewport .spatial-lore-guide {
      --lore-open-width: min(568px, calc(100vw - 430px));
      left: 24px;
      bottom: 22px;
      width: var(--lore-open-width);
      height: 158px;
      min-height: 158px;
      padding-left: 76px;
      transform: translate3d(0, 0, 0);
      transition:
        bottom 760ms cubic-bezier(.16, .76, .22, 1),
        width 720ms cubic-bezier(.16, .76, .22, 1),
        height 720ms cubic-bezier(.16, .76, .22, 1),
        min-height 720ms cubic-bezier(.16, .76, .22, 1),
        padding-left 720ms cubic-bezier(.16, .76, .22, 1);
    }

    .archive-viewport .spatial-lore-guide .lore-medallion {
      top: 50%;
      transform: translate3d(0, -50%, 0) scale(1);
      transition: transform 720ms cubic-bezier(.16, .76, .22, 1);
    }

    .archive-viewport .spatial-lore-guide .lore-parchment {
      position: absolute;
      top: 50%;
      left: 76px;
      width: calc(var(--lore-open-width) - 76px);
      opacity: 1;
      visibility: visible;
      transform: translate3d(0, -50%, 0) scaleX(1);
      transform-origin: 0 50%;
      transition:
        opacity 360ms ease 120ms,
        transform 760ms cubic-bezier(.16, .76, .22, 1),
        visibility 0ms linear 0ms;
      will-change: opacity, transform;
    }

    .archive-viewport .spatial-lore-guide.is-collapsed {
      bottom: 22px;
      width: 94px;
      height: 158px;
      min-height: 158px;
      padding-left: 0;
    }

    .archive-viewport .spatial-lore-guide.is-collapsed .lore-medallion {
      transform: translate3d(0, -50%, 0) scale(1);
    }

    .archive-viewport .spatial-lore-guide.is-collapsed .lore-parchment {
      opacity: 0;
      visibility: hidden;
      transform: translate3d(-48px, -50%, 0) scaleX(.04);
      pointer-events: none;
      transition:
        opacity 180ms ease,
        transform 620ms cubic-bezier(.32, 0, .2, 1),
        visibility 0ms linear 620ms;
    }
  }

  @media (min-width: 761px) and (max-width: 1050px) {
    .archive-viewport .spatial-lore-guide {
      --lore-open-width: min(468px, calc(100vw - 390px));
      left: 16px;
    }

    .archive-viewport .spatial-lore-guide.is-collapsed {
      left: 16px;
    }
  }

  @media (min-width: 761px) and (max-height: 820px) {
    .archive-viewport .spatial-lore-guide,
    .archive-viewport .spatial-lore-guide.is-collapsed {
      bottom: 8px;
    }
  }

  .archive-viewport :is(.timeline-waypoints button, .contact-grid a) {
    border: 0;
    border-radius: 0;
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    clip-path: none;
    filter: drop-shadow(0 17px 15px rgba(0, 0, 0, .46));
    text-shadow: var(--surface-text-shadow);
  }

  .archive-viewport :is(.timeline-waypoints button, .contact-grid a):hover {
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.08) drop-shadow(0 21px 18px rgba(0, 0, 0, .54));
  }

  .archive-viewport .timeline-waypoints button.active {
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.16) saturate(1.06) drop-shadow(0 23px 19px rgba(0, 0, 0, .58));
  }

  .archive-viewport.theme-winter :is(.timeline-waypoints button, .contact-grid a),
  .archive-viewport.theme-winter .timeline-waypoints button.active {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .94), 0 0 4px rgba(255, 255, 255, .72);
  }

  /* Cloth inscriptions sit above the physical stone controls and stay pinned while the fabric breathes. */
  .archive-viewport {
    --fabric-ink: #241f1a;
    --fabric-muted: #5f5548;
    --fabric-accent: #6c5636;
    --fabric-nail-dark: #211a12;
    --fabric-nail-mid: #8a7654;
    --fabric-nail-light: #e2c88e;
    --fabric-text-shadow: 0 1px 0 rgba(255, 250, 235, .62), 0 0 1px rgba(22, 18, 14, .38);
    --fabric-surface-filter: brightness(.98) contrast(1.04) saturate(.72);
    --fabric-light-angle: 112deg;
    --fabric-light-high: rgba(224, 184, 118, .32);
    --fabric-light-low: rgba(12, 8, 5, .52);
    --fabric-contact-shadow: drop-shadow(0 2px 2px rgba(0, 0, 0, .46)) drop-shadow(2px 6px 8px rgba(0, 0, 0, .3));
    --fabric-edge-light: rgba(209, 158, 86, .18);
    --fabric-opacity: .95;
    --rope-surface-filter: brightness(1.28) contrast(1.05) saturate(.72);
  }

  .archive-viewport.theme-fall {
    --fabric-ink: #3c2118;
    --fabric-muted: #6b4a3a;
    --fabric-accent: #8a4f2f;
    --fabric-nail-dark: #32150d;
    --fabric-nail-mid: #9b5b33;
    --fabric-nail-light: #edb36d;
    --fabric-surface-filter: brightness(1.01) contrast(1.03) saturate(.86);
    --fabric-light-angle: 118deg;
    --fabric-light-high: rgba(255, 174, 92, .34);
    --fabric-light-low: rgba(52, 15, 7, .5);
    --fabric-contact-shadow: drop-shadow(0 2px 2px rgba(31, 8, 3, .42)) drop-shadow(3px 7px 9px rgba(25, 6, 2, .28));
    --fabric-edge-light: rgba(244, 125, 55, .18);
    --fabric-opacity: .96;
    --rope-surface-filter: brightness(1.2) contrast(1.04) saturate(.9);
  }

  .archive-viewport.theme-spring {
    --fabric-ink: #243526;
    --fabric-muted: #53644f;
    --fabric-accent: #516747;
    --fabric-nail-dark: #172117;
    --fabric-nail-mid: #647154;
    --fabric-nail-light: #d4d3a1;
    --fabric-surface-filter: brightness(1.03) contrast(1.02) saturate(.78);
    --fabric-light-angle: 104deg;
    --fabric-light-high: rgba(236, 240, 185, .32);
    --fabric-light-low: rgba(18, 30, 17, .42);
    --fabric-contact-shadow: drop-shadow(0 2px 2px rgba(7, 15, 7, .4)) drop-shadow(2px 6px 8px rgba(7, 13, 6, .26));
    --fabric-edge-light: rgba(198, 218, 143, .18);
    --fabric-opacity: .95;
    --rope-surface-filter: brightness(1.24) contrast(1.03) saturate(.78);
  }

  .archive-viewport.theme-winter {
    --fabric-ink: #050505;
    --fabric-muted: #171717;
    --fabric-accent: #050505;
    --fabric-nail-dark: #20282d;
    --fabric-nail-mid: #71808a;
    --fabric-nail-light: #f5fbfd;
    --fabric-text-shadow: 0 1px 0 rgba(255, 255, 255, .96), 0 0 3px rgba(255, 255, 255, .72);
    --fabric-surface-filter: brightness(1.04) contrast(1.02) saturate(.54);
    --fabric-light-angle: 98deg;
    --fabric-light-high: rgba(255, 255, 255, .48);
    --fabric-light-low: rgba(85, 106, 118, .3);
    --fabric-contact-shadow: drop-shadow(0 2px 2px rgba(21, 30, 36, .36)) drop-shadow(2px 6px 8px rgba(18, 27, 33, .22));
    --fabric-edge-light: rgba(237, 249, 255, .28);
    --fabric-opacity: .97;
    --rope-surface-filter: brightness(1.2) contrast(1.03) saturate(.58);
  }

  .fabric-mounted {
    --fabric-inset-x: 9%;
    --fabric-inset-top: 12%;
    --fabric-inset-bottom: 9%;
    --fabric-surface-image: var(--fabric-card-image);
    --fabric-fit: contain;
    --fabric-flow-x: var(--fabric-card-x, 0px);
    --fabric-flow-y: var(--fabric-card-y, 0px);
    --fabric-flow-rx: var(--fabric-card-rx, 0deg);
    --fabric-flow-ry: var(--fabric-card-ry, 0deg);
    --fabric-flow-skew: var(--fabric-card-skew, 0deg);
    --fabric-flow-depth: var(--fabric-card-depth, 0px);
    --fabric-alt-x: var(--fabric-card-alt-x, 0px);
    --fabric-alt-y: var(--fabric-card-alt-y, 0px);
    --fabric-alt-rx: var(--fabric-card-alt-rx, 0deg);
    --fabric-alt-ry: var(--fabric-card-alt-ry, 0deg);
    --fabric-alt-skew: var(--fabric-card-alt-skew, 0deg);
    --fabric-alt-depth: var(--fabric-card-alt-depth, 0px);
    --fabric-flow-transform: var(--fabric-card-motion, translate3d(0, 0, 0));
    --fabric-alternate-transform: var(--fabric-card-alt-motion, translate3d(0, 0, 0));
    --fabric-local-x: 0px;
    --fabric-local-skew: 0deg;
    --fabric-rest-angle: 0deg;
    --fabric-flip: 1;
    position: relative;
    isolation: isolate;
    overflow: visible;
  }

  .archive-viewport .fabric-mounted:is(.fabric-control, .fabric-panel, .fabric-compact, .fabric-topology, .fabric-ribbon)::before,
  .archive-viewport .fabric-mounted:is(.fabric-control, .fabric-panel, .fabric-compact, .fabric-topology, .fabric-ribbon)::after {
    content: "" !important;
    position: absolute;
    inset: var(--fabric-inset-top) var(--fabric-inset-x) var(--fabric-inset-bottom);
    display: block !important;
    pointer-events: none;
  }

  .archive-viewport .fabric-mounted:is(.fabric-control, .fabric-panel, .fabric-compact, .fabric-topology, .fabric-ribbon)::before {
    z-index: 0;
    background-image:
      linear-gradient(var(--fabric-light-angle), var(--fabric-light-high) 0%, transparent 36%, var(--fabric-light-low) 100%),
      var(--fabric-surface-image);
    background-position: center, center top;
    background-repeat: no-repeat;
    background-size: 100% 100%, var(--fabric-fit);
    background-blend-mode: soft-light, normal;
    -webkit-mask-image: var(--fabric-surface-image);
    mask-image: var(--fabric-surface-image);
    -webkit-mask-position: center top;
    mask-position: center top;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: var(--fabric-fit);
    mask-size: var(--fabric-fit);
    clip-path: none;
    filter: var(--fabric-surface-filter) var(--fabric-contact-shadow) drop-shadow(-1px -1px 1px var(--fabric-edge-light));
    box-shadow: none;
    opacity: var(--fabric-opacity);
    transform-origin: 50% 3%;
    rotate: var(--fabric-rest-angle);
    scale: var(--fabric-flip) 1;
    transform:
      perspective(960px)
      var(--fabric-flow-transform)
      translate3d(var(--fabric-local-x), 0, 1px)
      skewX(var(--fabric-local-skew));
    transition: filter 240ms ease;
  }

  .archive-viewport .fabric-mounted:is(.fabric-control, .fabric-panel, .fabric-compact, .fabric-topology, .fabric-ribbon)::after {
    z-index: 1;
    background:
      radial-gradient(circle at 3.2% 7%, var(--fabric-nail-light) 0 1px, var(--fabric-nail-mid) 1.4px 3px, var(--fabric-nail-dark) 3.5px 5px, transparent 5.8px),
      radial-gradient(circle at 96.8% 7%, var(--fabric-nail-light) 0 1px, var(--fabric-nail-mid) 1.4px 3px, var(--fabric-nail-dark) 3.5px 5px, transparent 5.8px),
      radial-gradient(ellipse at 50% 2%, rgba(0, 0, 0, .48) 0, transparent 58%);
    filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, .9));
    box-shadow: none;
    opacity: 1;
  }

  .archive-scene.near .fabric-mounted::before,
  .archive-header .fabric-mounted::before,
  .chapter-rail .fabric-mounted::before,
  .spatial-hud.fabric-mounted::before,
  .spatial-lore-guide .fabric-mounted::before {
    will-change: transform;
  }

  .fabric-mounted > * {
    position: relative;
    z-index: 2;
  }

  .fabric-mounted > :is(h3, p, strong, dd, code),
  .fabric-mounted.timeline-focus-card > span,
  .fabric-mounted.personal-collection-copy > span {
    color: var(--fabric-ink);
    text-shadow: var(--fabric-text-shadow);
  }

  .project-case-layout .project-proof-grid > .fabric-mounted dd {
    color: var(--fabric-ink);
    font-weight: 700;
    text-shadow: var(--fabric-text-shadow);
  }

  .project-case-layout .project-proof-grid > .fabric-mounted dt {
    color: var(--fabric-accent);
    font-weight: 700;
    text-shadow: var(--fabric-text-shadow);
  }

  .archive-app:is(.theme-default, .theme-fall) .project-identity-copy .project-summary {
    color: var(--ink);
  }

  .fabric-mounted > small { color: var(--fabric-muted); }

  .fabric-mounted > :is(dt, span:first-child),
  .fabric-compact > span {
    color: var(--fabric-accent);
  }

  .fabric-control {
    --fabric-inset-x: 9%;
    --fabric-inset-top: 15%;
    --fabric-inset-bottom: 11%;
    --fabric-fit: cover;
    --fabric-surface-image: var(--fabric-ribbon-image);
    --fabric-flow-x: var(--fabric-ribbon-x, 0px);
    --fabric-flow-y: var(--fabric-ribbon-y, 0px);
    --fabric-flow-rx: var(--fabric-ribbon-rx, 0deg);
    --fabric-flow-ry: var(--fabric-ribbon-ry, 0deg);
    --fabric-flow-skew: var(--fabric-ribbon-skew, 0deg);
    --fabric-flow-depth: var(--fabric-ribbon-depth, 0px);
    --fabric-alt-x: var(--fabric-ribbon-alt-x, 0px);
    --fabric-alt-y: var(--fabric-ribbon-alt-y, 0px);
    --fabric-alt-rx: var(--fabric-ribbon-alt-rx, 0deg);
    --fabric-alt-ry: var(--fabric-ribbon-alt-ry, 0deg);
    --fabric-alt-skew: var(--fabric-ribbon-alt-skew, 0deg);
    --fabric-alt-depth: var(--fabric-ribbon-alt-depth, 0px);
    --fabric-flow-transform: var(--fabric-ribbon-motion, translate3d(0, 0, 0));
    --fabric-alternate-transform: var(--fabric-ribbon-alt-motion, translate3d(0, 0, 0));
    color: var(--fabric-ink) !important;
    text-shadow: var(--fabric-text-shadow) !important;
  }

  .fabric-control:hover::before,
  .fabric-control:focus-visible::before,
  .fabric-control.active::before {
    --fabric-duration: 5.8s;
    filter: var(--fabric-surface-filter) brightness(1.06) var(--fabric-contact-shadow) drop-shadow(-1px -1px 1px var(--fabric-edge-light));
  }

  .fabric-panel {
    --fabric-inset-x: 9%;
    --fabric-inset-top: 12%;
    --fabric-inset-bottom: 9%;
    --fabric-fit: contain;
    --fabric-surface-image: var(--fabric-card-image);
    border: 0;
    background: var(--panel-slab-image) center / 100% 100% no-repeat;
  }

  .fabric-ribbon {
    --fabric-inset-x: 8%;
    --fabric-inset-top: 13%;
    --fabric-inset-bottom: 9%;
    --fabric-fit: cover;
    --fabric-surface-image: var(--fabric-ribbon-image);
    --fabric-flow-x: var(--fabric-ribbon-x, 0px);
    --fabric-flow-y: var(--fabric-ribbon-y, 0px);
    --fabric-flow-rx: var(--fabric-ribbon-rx, 0deg);
    --fabric-flow-ry: var(--fabric-ribbon-ry, 0deg);
    --fabric-flow-skew: var(--fabric-ribbon-skew, 0deg);
    --fabric-flow-depth: var(--fabric-ribbon-depth, 0px);
    --fabric-alt-x: var(--fabric-ribbon-alt-x, 0px);
    --fabric-alt-y: var(--fabric-ribbon-alt-y, 0px);
    --fabric-alt-rx: var(--fabric-ribbon-alt-rx, 0deg);
    --fabric-alt-ry: var(--fabric-ribbon-alt-ry, 0deg);
    --fabric-alt-skew: var(--fabric-ribbon-alt-skew, 0deg);
    --fabric-alt-depth: var(--fabric-ribbon-alt-depth, 0px);
    --fabric-flow-transform: var(--fabric-ribbon-motion, translate3d(0, 0, 0));
    --fabric-alternate-transform: var(--fabric-ribbon-alt-motion, translate3d(0, 0, 0));
    min-height: 64px;
    padding: 14px 24px;
    border: 0;
    background: var(--control-slab-image) center / 100% 100% no-repeat;
  }

  .fabric-compact {
    --fabric-inset-x: 8%;
    --fabric-inset-top: 14%;
    --fabric-inset-bottom: 10%;
    --fabric-fit: cover;
    --fabric-surface-image: var(--fabric-ribbon-image);
    --fabric-flow-x: var(--fabric-ribbon-x, 0px);
    --fabric-flow-y: var(--fabric-ribbon-y, 0px);
    --fabric-flow-rx: var(--fabric-ribbon-rx, 0deg);
    --fabric-flow-ry: var(--fabric-ribbon-ry, 0deg);
    --fabric-flow-skew: var(--fabric-ribbon-skew, 0deg);
    --fabric-flow-depth: var(--fabric-ribbon-depth, 0px);
    --fabric-alt-x: var(--fabric-ribbon-alt-x, 0px);
    --fabric-alt-y: var(--fabric-ribbon-alt-y, 0px);
    --fabric-alt-rx: var(--fabric-ribbon-alt-rx, 0deg);
    --fabric-alt-ry: var(--fabric-ribbon-alt-ry, 0deg);
    --fabric-alt-skew: var(--fabric-ribbon-alt-skew, 0deg);
    --fabric-alt-depth: var(--fabric-ribbon-alt-depth, 0px);
    --fabric-flow-transform: var(--fabric-ribbon-motion, translate3d(0, 0, 0));
    --fabric-alternate-transform: var(--fabric-ribbon-alt-motion, translate3d(0, 0, 0));
    position: relative;
    isolation: isolate;
    padding: 13px 18px !important;
    border: 0 !important;
    background: var(--control-slab-image) center / 100% 100% no-repeat !important;
    filter: drop-shadow(0 7px 10px rgba(0, 0, 0, .28));
  }

  .fabric-mounted:nth-child(2n) {
    --fabric-flip: -1;
    --fabric-rest-angle: .08deg;
    --fabric-flow-x: var(--fabric-alt-x);
    --fabric-flow-y: var(--fabric-alt-y);
    --fabric-flow-rx: var(--fabric-alt-rx);
    --fabric-flow-ry: var(--fabric-alt-ry);
    --fabric-flow-skew: var(--fabric-alt-skew);
    --fabric-flow-depth: var(--fabric-alt-depth);
    --fabric-flow-transform: var(--fabric-alternate-transform);
  }

  .fabric-mounted:nth-child(3n) { --fabric-rest-angle: -.12deg; }
  .project-case-layout .project-proof-grid > .fabric-mounted,
  .architecture-case-study > .fabric-mounted,
  .architecture-step-grid > .fabric-mounted,
  .architecture-placement.fabric-mounted,
  .architecture-notes.fabric-mounted,
  .architecture-stack-grid > .fabric-mounted {
    border: 0;
    background: var(--panel-slab-image) center / 100% 100% no-repeat;
    filter: drop-shadow(0 10px 16px rgba(0, 0, 0, .28));
  }

  .project-case-layout .project-proof-grid > .fabric-mounted {
    --fabric-inset-x: 10%;
    --fabric-inset-top: 14%;
    --fabric-inset-bottom: 10%;
    --fabric-fit: cover;
    padding: clamp(18px, 1.45vw, 26px) clamp(29px, 2vw, 38px);
  }

  .project-case-layout .project-proof-grid > .fabric-mounted:nth-child(n + 3),
  .architecture-step-grid > .fabric-mounted:nth-child(3n),
  .timeline-waypoints > .fabric-mounted:nth-child(3n),
  .contact-grid > .fabric-mounted:nth-child(3n) {
    --fabric-surface-image: var(--fabric-panel-image);
  }

  .timeline-waypoints .fabric-mounted,
  .timeline-focus-card.fabric-mounted,
  .personal-collection-copy.fabric-mounted,
  .contact-grid .fabric-mounted {
    --fabric-inset-x: 9%;
    --fabric-inset-top: 12%;
    --fabric-inset-bottom: 9%;
  }

  .archive-viewport :is(
    .spatial-hud,
    .timeline-focus-card,
    .personal-collection-copy,
    .architecture-placement,
    .architecture-notes
  ).fabric-panel {
    --fabric-surface-image: var(--fabric-panel-image);
    --fabric-flow-x: var(--fabric-panel-x, 0px);
    --fabric-flow-y: var(--fabric-panel-y, 0px);
    --fabric-flow-rx: var(--fabric-panel-rx, 0deg);
    --fabric-flow-ry: var(--fabric-panel-ry, 0deg);
    --fabric-flow-skew: var(--fabric-panel-skew, 0deg);
    --fabric-flow-depth: var(--fabric-panel-depth, 0px);
    --fabric-alt-x: var(--fabric-panel-alt-x, 0px);
    --fabric-alt-y: var(--fabric-panel-alt-y, 0px);
    --fabric-alt-rx: var(--fabric-panel-alt-rx, 0deg);
    --fabric-alt-ry: var(--fabric-panel-alt-ry, 0deg);
    --fabric-alt-skew: var(--fabric-panel-alt-skew, 0deg);
    --fabric-alt-depth: var(--fabric-panel-alt-depth, 0px);
    --fabric-flow-transform: var(--fabric-panel-motion, translate3d(0, 0, 0));
    --fabric-alternate-transform: var(--fabric-panel-alt-motion, translate3d(0, 0, 0));
  }

  .archive-viewport .spatial-hud.fabric-mounted {
    --fabric-inset-x: 8%;
    --fabric-inset-top: 10%;
    --fabric-inset-bottom: 8%;
    position: fixed;
    top: auto;
    right: clamp(10px, 1.7vw, 26px);
    bottom: clamp(14px, 2vw, 26px);
    left: auto;
  }

  .archive-viewport .spatial-hud > .hud-collapse {
    position: absolute;
    left: auto;
  }

  .archive-viewport .lore-parchment.fabric-mounted {
    --fabric-inset-x: 7%;
    --fabric-inset-top: 10%;
    --fabric-inset-bottom: 7%;
    --fabric-surface-image: var(--fabric-ribbon-image);
    --fabric-flow-x: var(--fabric-ribbon-x, 0px);
    --fabric-flow-y: var(--fabric-ribbon-y, 0px);
    --fabric-flow-rx: var(--fabric-ribbon-rx, 0deg);
    --fabric-flow-ry: var(--fabric-ribbon-ry, 0deg);
    --fabric-flow-skew: var(--fabric-ribbon-skew, 0deg);
    --fabric-flow-depth: var(--fabric-ribbon-depth, 0px);
    --fabric-alt-x: var(--fabric-ribbon-alt-x, 0px);
    --fabric-alt-y: var(--fabric-ribbon-alt-y, 0px);
    --fabric-alt-rx: var(--fabric-ribbon-alt-rx, 0deg);
    --fabric-alt-ry: var(--fabric-ribbon-alt-ry, 0deg);
    --fabric-alt-skew: var(--fabric-ribbon-alt-skew, 0deg);
    --fabric-alt-depth: var(--fabric-ribbon-alt-depth, 0px);
    --fabric-flow-transform: var(--fabric-ribbon-motion, translate3d(0, 0, 0));
    --fabric-alternate-transform: var(--fabric-ribbon-alt-motion, translate3d(0, 0, 0));
  }

  /* The pipeline is a suspended vertical chain of landscape slabs with two independent rope strands. */
  .cinematic-systems-overlay .project-topology-stage {
    top: 47.5%;
    left: 33.5%;
    width: 33%;
    height: 36.5%;
    overflow: visible;
    transform: none;
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading {
    top: 8%;
    left: 50%;
    width: 100%;
    max-width: 100%;
    text-align: center;
    transform: translateX(-50%);
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack {
    top: 103%;
    right: -28%;
    left: -28%;
    gap: clamp(8px, .8vw, 14px);
    padding: 0;
  }

  .cinematic-systems-overlay .project-flowchart {
    --topology-node-height: clamp(72px, 7.1vh, 88px);
    --topology-rope-span: clamp(46px, 5vh, 60px);
    --topology-airflow: 0;
    top: 25%;
    right: auto;
    bottom: auto;
    left: 50%;
    width: min(92%, 520px);
    height: 71%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 6px clamp(22px, 2vw, 34px) 36px;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    scroll-snap-type: y proximity;
    scrollbar-width: none;
    touch-action: pan-y pinch-zoom;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage.is-interactive .project-flowchart {
    pointer-events: auto;
  }

  .cinematic-systems-overlay .project-flowchart::-webkit-scrollbar { display: none; }

  .cinematic-systems-overlay .project-flowchart li {
    flex: 0 0 calc(var(--topology-node-height) + var(--topology-rope-span));
    width: 100%;
    height: calc(var(--topology-node-height) + var(--topology-rope-span));
    min-height: 0;
    display: block;
    scroll-snap-align: start;
    scroll-snap-stop: normal;
  }

  .cinematic-systems-overlay .project-flowchart li:last-child {
    flex-basis: var(--topology-node-height);
    height: var(--topology-node-height);
  }

  .cinematic-systems-overlay .project-flowchart li::before {
    right: 8%;
    bottom: calc(var(--topology-rope-span) - 8px);
    left: 8%;
    height: 14px;
  }

  .cinematic-systems-overlay .project-flowchart li:not(:last-child)::after { content: none; }

  .cinematic-systems-overlay .project-flowchart button.fabric-topology {
    --fabric-inset-x: 10%;
    --fabric-inset-top: 15%;
    --fabric-inset-bottom: 11%;
    --fabric-surface-image: var(--fabric-ribbon-image);
    --fabric-fit: cover;
    --fabric-flow-x: var(--fabric-ribbon-x, 0px);
    --fabric-flow-y: var(--fabric-ribbon-y, 0px);
    --fabric-flow-rx: var(--fabric-ribbon-rx, 0deg);
    --fabric-flow-ry: var(--fabric-ribbon-ry, 0deg);
    --fabric-flow-skew: var(--fabric-ribbon-skew, 0deg);
    --fabric-flow-depth: var(--fabric-ribbon-depth, 0px);
    --fabric-alt-x: var(--fabric-ribbon-alt-x, 0px);
    --fabric-alt-y: var(--fabric-ribbon-alt-y, 0px);
    --fabric-alt-rx: var(--fabric-ribbon-alt-rx, 0deg);
    --fabric-alt-ry: var(--fabric-ribbon-alt-ry, 0deg);
    --fabric-alt-skew: var(--fabric-ribbon-alt-skew, 0deg);
    --fabric-alt-depth: var(--fabric-ribbon-alt-depth, 0px);
    --fabric-flow-transform: var(--fabric-ribbon-motion, translate3d(0, 0, 0));
    --fabric-alternate-transform: var(--fabric-ribbon-alt-motion, translate3d(0, 0, 0));
    position: relative;
    z-index: 3;
    width: 100%;
    height: var(--topology-node-height);
    min-height: 0;
    grid-template-columns: auto 1fr;
    align-content: center;
    align-items: center;
    justify-items: start;
    gap: clamp(10px, 1.1vw, 18px);
    padding: 15px 15%;
    overflow: visible;
    background: var(--topology-slab-image) center / 100% 100% no-repeat;
  }

  .cinematic-systems-overlay .project-flowchart button.fabric-topology > :is(span, strong) {
    max-width: 100%;
    color: var(--fabric-ink);
    font-size: clamp(11px, .72vw, 14px);
    text-align: left;
    text-shadow: var(--fabric-text-shadow);
  }

  .cinematic-systems-overlay .project-flowchart button.fabric-topology > span {
    color: var(--fabric-accent);
  }

  .topology-rope-pair {
    position: absolute;
    top: calc(var(--topology-node-height) - 13px);
    left: 50%;
    z-index: 2;
    width: 58%;
    height: calc(var(--topology-rope-span) + 26px);
    transform: translateX(-50%);
    pointer-events: none;
  }

  .topology-rope-pair img {
    position: absolute;
    top: 50%;
    z-index: 2;
    width: calc(var(--topology-rope-span) + 34px);
    height: clamp(28px, 2.1vw, 34px);
    object-fit: fill;
    opacity: .96;
    filter: var(--rope-surface-filter) drop-shadow(0 3px 5px rgba(0, 0, 0, .42));
    transform: translate(-50%, -50%) rotate(90deg) skewY(var(--rope-scroll-twist, 0deg));
    transform-origin: 50% 50%;
    animation: topologyRopeAir 4.7s ease-in-out calc(var(--flow-index) * -.31s) infinite;
  }

  .topology-rope-pair img:first-child { left: 28%; }
  .topology-rope-pair img:last-child { left: 72%; animation-delay: calc(-1.8s + var(--flow-index) * -.31s); }

  .project-flowchart .fabric-mounted::before {
    --fabric-local-x: var(--topology-fabric-shift, 0px);
    --fabric-local-skew: var(--topology-fabric-skew, 0deg);
  }

  @keyframes topologyRopeAir {
    0%, 100% { translate: 0 0; scale: 1 1; }
    36% { translate: 1px -1px; scale: 1.018 .985; }
    68% { translate: -1px 1px; scale: .992 1.012; }
  }

  @media (max-width: 760px) {
    .fabric-control {
      --fabric-inset-x: 8%;
      --fabric-inset-top: 13%;
      --fabric-inset-bottom: 10%;
    }

    .cinematic-systems-overlay .project-topology-stage {
      top: 53.5%;
      left: 50%;
      width: min(92vw, 430px);
      height: 32%;
      overflow: visible;
      transform: translateX(-50%);
    }

    .cinematic-systems-overlay .project-topology-stage .topology-heading {
      position: absolute;
      left: 50%;
      max-width: 92%;
    }

    .cinematic-systems-overlay .project-flowchart {
      --topology-node-height: 62px;
      --topology-rope-span: 42px;
      top: 25%;
      width: 96%;
      min-width: 0;
      height: 73%;
      padding: 4px 20px 28px;
      overflow-x: hidden;
      overflow-y: auto;
      scroll-snap-type: y proximity;
      touch-action: pan-y pinch-zoom;
    }

    .cinematic-systems-overlay .project-flowchart button.fabric-topology {
      min-height: 0;
      padding: 10px 15%;
    }

    .cinematic-systems-overlay .project-flowchart button.fabric-topology > :is(span, strong) {
      font-size: 10px;
    }

    .topology-rope-pair img { height: 26px; }
  }

  @media (max-height: 820px) and (min-width: 761px) {
    .cinematic-systems-overlay .project-topology-stage .topology-heading {
      top: 50%;
    }

    .cinematic-systems-overlay .project-flowchart {
      top: 63%;
      height: 33%;
    }
  }

  /* Retire the legacy fabric layer. The final parchment skin is restored below. */
  .archive-viewport .fabric-mounted::before,
  .archive-viewport .fabric-mounted::after {
    content: none !important;
    display: none !important;
    background: none !important;
    filter: none !important;
    transform: none !important;
  }

  .archive-viewport .fabric-mounted > *,
  .archive-viewport .fabric-mounted > :is(h3, p, strong, dd, code, small),
  .archive-viewport .fabric-mounted.timeline-focus-card > span,
  .archive-viewport .fabric-mounted.personal-collection-copy > span,
  .archive-viewport .project-case-layout .project-proof-grid > .fabric-mounted :is(dt, dd),
  .archive-viewport .project-flowchart button.fabric-topology > :is(span, strong) {
    color: var(--ink);
    text-shadow: var(--surface-text-shadow);
  }

  .archive-viewport .fabric-mounted > :is(dt, span:first-child),
  .archive-viewport .fabric-compact > span,
  .archive-viewport .project-case-layout .project-proof-grid > .fabric-mounted dt,
  .archive-viewport .project-flowchart button.fabric-topology > span {
    color: var(--accent);
  }

  .archive-viewport .fabric-control {
    color: var(--ink) !important;
    text-shadow: var(--surface-text-shadow) !important;
  }

  .archive-viewport .project-identity-copy :is(h3, .project-summary) {
    color: var(--ink) !important;
    text-shadow: var(--surface-text-shadow) !important;
  }

  .archive-viewport .project-identity-copy .project-overline,
  .archive-viewport .project-flowchart button > span,
  .archive-viewport .compact-stack span {
    color: var(--accent) !important;
    text-shadow: var(--surface-text-shadow) !important;
  }

  .archive-viewport .project-flowchart button > strong,
  .archive-viewport .topology-heading :is(span, strong),
  .archive-viewport .compact-stack p {
    color: var(--ink) !important;
    text-shadow: var(--surface-text-shadow) !important;
  }

  .archive-viewport .spatial-hud.fabric-panel {
    width: min(360px, calc(100vw - 20px));
    min-height: 0;
    aspect-ratio: 8 / 5;
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
  }

  .archive-viewport .lore-parchment.fabric-panel {
    background: var(--lore-slab-image) center / 100% 100% no-repeat;
  }

  .archive-viewport.theme-winter :is(
    .intro-gate-cta,
    .archive-header-actions a,
    .chapter-rail-list button,
    .project-action-row a,
    .project-action-row button,
    .timeline-waypoints button,
    .contact-grid a,
    .lore-parchment,
    .chapter-heading,
    .chapter-heading p,
    .chapter-heading span,
    .project-identity-copy,
    .project-summary,
    .topology-heading,
    .compact-stack
  ) {
    color: var(--ink) !important;
    text-shadow: var(--surface-text-shadow) !important;
  }

  /* Keep painted controls in the same visual depth plane as the environments. */
  .archive-viewport {
    --painted-slab-rest-filter:
      drop-shadow(0 4px 5px rgba(16, 14, 11, .18));
    --painted-slab-hover-filter:
      brightness(1.025)
      drop-shadow(0 6px 7px rgba(16, 14, 11, .22));
    --painted-slab-active-filter:
      brightness(1.045)
      drop-shadow(0 7px 8px rgba(16, 14, 11, .25));
  }

  .archive-viewport :is(
    .fabric-control,
    .fabric-panel,
    .fabric-mounted,
    .project-flowchart button,
    .timeline-waypoints button,
    .contact-grid a,
    .professional-stack-strip div
  ) {
    filter: var(--painted-slab-rest-filter) !important;
  }

  /* A single generated scroll is nine-sliced so torn edges and rolled ends keep
     their proportions on compact tabs, cards, and the two guide surfaces. */
  .archive-viewport .fabric-mounted {
    --parchment-image: var(--control-slab-image);
    isolation: isolate;
    overflow: visible;
    clip-path: none !important;
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  .archive-viewport .fabric-panel {
    --parchment-image: var(--panel-slab-image);
  }

  .archive-viewport .project-flowchart .fabric-topology {
    --parchment-image: var(--topology-slab-image);
  }

  .archive-viewport .spatial-hud.fabric-panel {
    --parchment-image: var(--wayfinder-slab-image);
    background: transparent !important;
  }

  .archive-viewport .lore-parchment.fabric-panel {
    --parchment-image: var(--lore-slab-image);
    background: transparent !important;
  }

  .archive-viewport .fabric-mounted::after {
    content: "" !important;
    display: block !important;
    position: absolute;
    inset: -3px -7px;
    z-index: -1;
    border: 13px solid transparent;
    border-inline-width: 24px;
    border-image-source: var(--parchment-image);
    border-image-slice: 176 224 170 224 fill;
    border-image-width: 1;
    border-image-outset: 0;
    border-image-repeat: stretch;
    background: none !important;
    filter: none !important;
    pointer-events: none;
    transform: translateZ(0) !important;
    transform-origin: 50% 12%;
  }

  .archive-viewport :is(
    .chapter-scroll-arrow,
    .embedded-tab-arrow,
    .dialog-close,
    .hud-theme-row button,
    .personal-media-index button
  ).fabric-mounted::after {
    inset: -2px -4px;
    border-width: 8px 14px;
  }

  .archive-viewport :is(
    .project-proof-grid > .fabric-mounted,
    .timeline-focus-card,
    .personal-collection-copy,
    .contact-grid > .fabric-mounted,
    .architecture-dialog .fabric-panel
  )::after {
    inset: -5px -9px;
    border-width: 17px 29px;
  }

  .archive-viewport :is(.spatial-hud, .lore-parchment).fabric-mounted::after {
    inset: -7px -11px;
    border-width: 22px 36px;
  }

  /* Keep the collapsed Wayfinder pointer inside the viewport while its painted
     slab remains fully tucked below the frame. */
  .archive-viewport .spatial-hud.fabric-mounted.is-collapsed {
    transform: translateY(calc(100% - 6px));
  }

  .archive-viewport .spatial-hud.fabric-mounted.is-collapsed::after {
    opacity: 0;
  }

  .archive-viewport .spatial-hud.fabric-mounted.is-collapsed .hud-collapse {
    right: 14px;
    bottom: calc(100% - 7px);
    transform: none;
  }

  .archive-viewport .fabric-mounted:hover::after,
  .archive-viewport .fabric-mounted:focus-visible::after,
  .archive-viewport .fabric-mounted.active::after {
    filter: brightness(1.035) saturate(1.02) !important;
  }

  .archive-viewport :is(
    .fabric-control,
    .fabric-mounted,
    .project-flowchart button,
    .timeline-waypoints button,
    .contact-grid a
  ):hover {
    filter: var(--painted-slab-hover-filter) !important;
  }

  .archive-viewport :is(
    .fabric-control,
    .timeline-waypoints button
  ).active {
    filter: var(--painted-slab-active-filter) !important;
  }

  .archive-viewport :is(
    .fabric-control,
    .project-flowchart button,
    .timeline-waypoints button,
    .contact-grid a
  ):focus-visible {
    outline: 0;
    filter: var(--painted-slab-active-filter) !important;
  }

  .archive-viewport .chapter-rail-list button.active {
    transform: translateX(3px) scale(1.008);
  }

  .archive-viewport :is(
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button
  ).active {
    transform: translateY(-1px) scale(1.005);
  }

  /* Fine pigment granulation on display lettering; body copy stays fully solid. */
  .archive-viewport :is(
    .intro-name-word > span,
    .intro-role,
    .chapter-heading h2,
    .project-identity-copy h3,
    .timeline-focus-card h3,
    .personal-collection-copy h3,
    .field-note-placeholder strong,
    .architecture-dialog header h2
  ) {
    -webkit-mask-image: var(--text-distress-mask);
    mask-image: var(--text-distress-mask);
    -webkit-mask-position: 47% 51%;
    mask-position: 47% 51%;
    -webkit-mask-repeat: repeat;
    mask-repeat: repeat;
    -webkit-mask-size: 560px 112px;
    mask-size: 560px 112px;
  }

  .archive-viewport .intro-name-word > span {
    -webkit-mask-position: 43% 49%;
    mask-position: 43% 49%;
    -webkit-mask-size: 760px 152px;
    mask-size: 760px 152px;
  }

  .archive-viewport :is(.intro-role, .field-note-placeholder strong) {
    -webkit-mask-position: 67% 56%;
    mask-position: 67% 56%;
    -webkit-mask-size: 470px 94px;
    mask-size: 470px 94px;
  }

  /* Navigation and guidance float as celestial inscriptions instead of painted
     parchment. Content cards keep their physical surfaces. */
  .archive-viewport .chapter-rail,
  .archive-viewport :is(.celestial-control, .celestial-panel) {
    border: 0 !important;
    border-image: none !important;
    border-radius: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    clip-path: none !important;
    backdrop-filter: none !important;
  }

  .archive-viewport .chapter-rail {
    filter: none !important;
  }

  .archive-viewport :is(.celestial-control, .celestial-panel) {
    position: relative;
    isolation: isolate;
    overflow: visible;
    color: var(--ink) !important;
    filter: none !important;
    text-shadow:
      0 2px 5px rgba(0, 0, 0, .94),
      0 0 12px rgba(var(--celestial-primary-rgb), .2) !important;
  }

  .archive-viewport :is(.celestial-control, .celestial-panel) > * {
    position: relative;
    z-index: 2;
  }

  .archive-viewport :is(.celestial-control, .celestial-panel).fabric-mounted::before,
  .archive-viewport :is(.celestial-control, .celestial-panel).fabric-mounted::after {
    content: "" !important;
    display: block !important;
    position: absolute;
    border: 0 !important;
    border-image: none !important;
    background-color: transparent !important;
    pointer-events: none;
    transform: translateZ(0) !important;
  }

  .archive-viewport .celestial-control.fabric-mounted::before {
    inset: -10px -13px !important;
    z-index: 1;
    background-image:
      radial-gradient(circle at 6% 62%, rgba(var(--celestial-primary-rgb), 1) 0 1.1px, rgba(var(--celestial-primary-rgb), .34) 1.8px, transparent 3.2px),
      radial-gradient(circle at 22% 14%, rgba(var(--celestial-secondary-rgb), .92) 0 .8px, rgba(var(--celestial-secondary-rgb), .24) 1.55px, transparent 2.8px),
      radial-gradient(circle at 38% 84%, rgba(var(--celestial-primary-rgb), .78) 0 .7px, transparent 2.45px),
      radial-gradient(circle at 57% 42%, rgba(var(--celestial-primary-rgb), .94) 0 .9px, rgba(var(--celestial-primary-rgb), .22) 1.6px, transparent 2.85px),
      radial-gradient(circle at 73% 74%, rgba(var(--celestial-secondary-rgb), .72) 0 .65px, transparent 2.35px),
      radial-gradient(circle at 86% 9%, rgba(var(--celestial-primary-rgb), .82) 0 .75px, transparent 2.5px),
      radial-gradient(circle at 96% 55%, rgba(var(--celestial-secondary-rgb), .9) 0 .8px, rgba(var(--celestial-secondary-rgb), .2) 1.5px, transparent 2.7px) !important;
    background-size: 100% 100% !important;
    background-position: 0 0 !important;
    background-repeat: no-repeat !important;
    opacity: .62;
    filter:
      drop-shadow(0 0 2px rgba(var(--celestial-primary-rgb), .9))
      drop-shadow(0 0 6px rgba(var(--celestial-secondary-rgb), .38)) !important;
    mix-blend-mode: screen;
    -webkit-mask-image: radial-gradient(ellipse at center, #000 0 48%, rgba(0, 0, 0, .78) 67%, transparent 90%);
    mask-image: radial-gradient(ellipse at center, #000 0 48%, rgba(0, 0, 0, .78) 67%, transparent 90%);
    animation: celestialDustDrift var(--celestial-drift-duration) linear infinite;
  }

  .archive-viewport .celestial-control.fabric-mounted::after {
    inset: -8px -18px !important;
    z-index: 0;
    background: radial-gradient(ellipse at center,
      rgba(var(--celestial-primary-rgb), .2) 0,
      rgba(var(--celestial-secondary-rgb), .08) 38%,
      transparent 74%) !important;
    opacity: .32;
    filter: blur(7px) !important;
    transition: opacity 480ms ease, scale 620ms cubic-bezier(.16, .76, .22, 1);
  }

  .archive-viewport .celestial-panel.fabric-mounted::before {
    inset: -20px -26px !important;
    z-index: 1;
    background-image:
      radial-gradient(circle at 3% 48%, rgba(var(--celestial-primary-rgb), .82) 0 .8px, transparent 2.7px),
      radial-gradient(circle at 9% 82%, rgba(var(--celestial-secondary-rgb), .72) 0 .7px, transparent 2.4px),
      radial-gradient(circle at 16% 19%, rgba(var(--celestial-primary-rgb), 1) 0 1.1px, rgba(var(--celestial-primary-rgb), .3) 2px, transparent 3.5px),
      radial-gradient(circle at 27% 66%, rgba(var(--celestial-secondary-rgb), .9) 0 .9px, rgba(var(--celestial-secondary-rgb), .22) 1.7px, transparent 3px),
      radial-gradient(circle at 35% 7%, rgba(var(--celestial-primary-rgb), .7) 0 .65px, transparent 2.3px),
      radial-gradient(circle at 43% 91%, rgba(var(--celestial-primary-rgb), .88) 0 .8px, transparent 2.8px),
      radial-gradient(circle at 51% 37%, rgba(var(--celestial-secondary-rgb), .68) 0 .65px, transparent 2.25px),
      radial-gradient(circle at 62% 74%, rgba(var(--celestial-primary-rgb), 1) 0 1px, rgba(var(--celestial-primary-rgb), .26) 1.85px, transparent 3.3px),
      radial-gradient(circle at 69% 16%, rgba(var(--celestial-secondary-rgb), .84) 0 .8px, transparent 2.75px),
      radial-gradient(circle at 77% 51%, rgba(var(--celestial-primary-rgb), .72) 0 .7px, transparent 2.45px),
      radial-gradient(circle at 86% 88%, rgba(var(--celestial-secondary-rgb), .92) 0 .85px, rgba(var(--celestial-secondary-rgb), .2) 1.6px, transparent 2.9px),
      radial-gradient(circle at 93% 27%, rgba(var(--celestial-primary-rgb), .96) 0 .9px, rgba(var(--celestial-primary-rgb), .24) 1.7px, transparent 3.1px),
      radial-gradient(circle at 98% 67%, rgba(var(--celestial-secondary-rgb), .62) 0 .6px, transparent 2.2px) !important;
    background-size: 100% 100% !important;
    background-position: 0 0 !important;
    background-repeat: no-repeat !important;
    opacity: .68;
    filter:
      drop-shadow(0 0 2px rgba(var(--celestial-primary-rgb), .92))
      drop-shadow(0 0 8px rgba(var(--celestial-secondary-rgb), .42)) !important;
    mix-blend-mode: screen;
    -webkit-mask-image: radial-gradient(ellipse at center, #000 0 42%, rgba(0, 0, 0, .86) 64%, transparent 92%);
    mask-image: radial-gradient(ellipse at center, #000 0 42%, rgba(0, 0, 0, .86) 64%, transparent 92%);
    animation: celestialDustDrift var(--celestial-drift-duration) linear infinite;
  }

  .archive-viewport .celestial-panel.fabric-mounted::after {
    inset: -14px -24px !important;
    z-index: 0;
    background:
      radial-gradient(ellipse at 42% 48%, rgba(0, 0, 0, .5) 0 22%, transparent 66%),
      radial-gradient(ellipse at center, rgba(var(--celestial-primary-rgb), .18), rgba(var(--celestial-secondary-rgb), .06) 48%, transparent 78%) !important;
    opacity: .78;
    filter: blur(11px) !important;
  }

  .archive-viewport .celestial-control:is(:hover, :focus-visible)::before,
  .archive-viewport .celestial-control:is(.active, [aria-selected="true"], [aria-pressed="true"])::before {
    opacity: .92;
    filter:
      drop-shadow(0 0 3px rgba(var(--celestial-primary-rgb), 1))
      drop-shadow(0 0 10px rgba(var(--celestial-secondary-rgb), .68)) !important;
  }

  .archive-viewport .celestial-control:is(:hover, :focus-visible)::after,
  .archive-viewport .celestial-control:is(.active, [aria-selected="true"], [aria-pressed="true"])::after {
    opacity: .82;
    scale: 1.08;
  }

  .archive-viewport .celestial-control:is(.active, [aria-selected="true"], [aria-pressed="true"]) {
    color: rgb(var(--celestial-primary-rgb)) !important;
    filter: drop-shadow(0 0 8px rgba(var(--celestial-primary-rgb), .28)) !important;
  }

  .archive-viewport :is(.chapter-rail-list, .project-switcher, .personal-switcher) button.celestial-control,
  .archive-viewport .hud-theme-row button.celestial-control,
  .archive-viewport .personal-media-index button.celestial-control {
    background: transparent !important;
  }

  .archive-viewport .spatial-hud.celestial-panel {
    --wayfinder-cosmic-x: 50%;
    --wayfinder-cosmic-y: 50%;
    --wayfinder-cosmic-opacity: .82;
    --wayfinder-scene-light-x: 8%;
    --wayfinder-scene-light-y: 40%;
    background: transparent !important;
    color: var(--ink) !important;
    filter: none !important;
  }

  .archive-viewport .spatial-hud.celestial-panel.fabric-mounted::before {
    content: none !important;
    display: none !important;
  }

  .archive-viewport .spatial-hud.celestial-panel.fabric-mounted::after {
    inset: -32px -44px !important;
    z-index: 0;
    background:
      radial-gradient(circle at var(--wayfinder-cosmic-x) var(--wayfinder-cosmic-y), rgba(var(--celestial-primary-rgb), .12) 0 3%, rgba(var(--celestial-secondary-rgb), .055) 16%, transparent 38%),
      radial-gradient(circle at var(--wayfinder-scene-light-x) var(--wayfinder-scene-light-y), rgba(var(--celestial-primary-rgb), .15) 0 4%, rgba(var(--celestial-primary-rgb), .045) 24%, transparent 52%),
      radial-gradient(ellipse 52% 68% at 44% 51%, rgba(0, 0, 0, .66) 0 24%, rgba(0, 0, 0, .34) 48%, transparent 78%),
      radial-gradient(ellipse at 68% 34%, rgba(var(--celestial-secondary-rgb), .075), rgba(var(--celestial-primary-rgb), .03) 46%, transparent 82%) !important;
    opacity: var(--wayfinder-cosmic-opacity) !important;
    filter: blur(13px) saturate(1.08) !important;
    animation: wayfinderNebulaBreathe 9.5s ease-in-out infinite;
    transform: translateZ(0) !important;
  }

  .archive-viewport .wayfinder-cosmic-field {
    position: absolute !important;
    inset: -44px -58px -42px !important;
    z-index: 1 !important;
    width: calc(100% + 116px);
    height: calc(100% + 86px);
    display: block;
    pointer-events: none;
    opacity: var(--wayfinder-cosmic-opacity);
    filter: saturate(1.08) contrast(1.045);
    mix-blend-mode: screen;
    transform: translateZ(0);
    transform-origin: 50% 50%;
    -webkit-mask-image:
      radial-gradient(ellipse 69% 82% at 16% 48%, #000 0 46%, rgba(0, 0, 0, .78) 70%, transparent 100%),
      radial-gradient(ellipse 62% 76% at 73% 28%, rgba(0, 0, 0, .88) 0 42%, rgba(0, 0, 0, .58) 72%, transparent 100%),
      radial-gradient(ellipse 54% 64% at 61% 86%, rgba(0, 0, 0, .74) 0 38%, transparent 100%);
    mask-image:
      radial-gradient(ellipse 69% 82% at 16% 48%, #000 0 46%, rgba(0, 0, 0, .78) 70%, transparent 100%),
      radial-gradient(ellipse 62% 76% at 73% 28%, rgba(0, 0, 0, .88) 0 42%, rgba(0, 0, 0, .58) 72%, transparent 100%),
      radial-gradient(ellipse 54% 64% at 61% 86%, rgba(0, 0, 0, .74) 0 38%, transparent 100%);
    transition: opacity 520ms ease, filter 620ms ease;
  }

  .archive-viewport .spatial-hud.celestial-panel:is(:hover, :focus-within) .wayfinder-cosmic-field {
    filter: saturate(1.14) contrast(1.07) brightness(1.07);
  }

  .archive-viewport .spatial-hud.celestial-panel.is-collapsed .wayfinder-cosmic-field {
    visibility: hidden;
    opacity: 0;
  }

  /* One continuous filament field traces each navigation group. Individual
     controls no longer carry independent particle halos. */
  .archive-viewport :is(.chapter-rail, .scrollable-tab-shell, .spatial-hud) {
    --boundary-field-opacity: .84;
    isolation: isolate;
    overflow: visible;
  }

  .archive-viewport .scrollable-tab-shell {
    position: relative;
  }

  .archive-viewport .boundary-filament-field {
    position: absolute !important;
    z-index: 4 !important;
    display: block;
    pointer-events: none;
    opacity: var(--boundary-field-opacity, .84);
    filter: saturate(1.08) contrast(1.04) brightness(1.01);
    mix-blend-mode: screen;
    transform: translateZ(0);
    transform-origin: 50% 50%;
    -webkit-mask-image: none !important;
    mask-image: none !important;
    transition:
      opacity 640ms cubic-bezier(.16, .76, .22, 1),
      filter 760ms cubic-bezier(.16, .76, .22, 1);
  }

  .archive-viewport .boundary-filament-field.boundary-filament-wayfinder {
    inset: -34px -42px !important;
    width: calc(100% + 84px) !important;
    height: calc(100% + 68px) !important;
  }

  .archive-viewport .boundary-filament-field.boundary-filament-rail {
    inset: -26px -32px !important;
    width: calc(100% + 64px) !important;
    height: calc(100% + 52px) !important;
  }

  .archive-viewport .boundary-filament-field.boundary-filament-tabs {
    inset: -16px -22px !important;
    width: calc(100% + 44px) !important;
    height: calc(100% + 32px) !important;
  }

  .archive-viewport :is(.chapter-rail, .scrollable-tab-shell, .spatial-hud)
    > :not(.boundary-filament-field) {
    position: relative;
    z-index: 2;
  }

  .archive-viewport :is(.chapter-rail, .scrollable-tab-shell, .spatial-hud)
    .celestial-control.fabric-mounted::before,
  .archive-viewport :is(.chapter-rail, .scrollable-tab-shell, .spatial-hud)
    .celestial-control.fabric-mounted::after {
    content: none !important;
    display: none !important;
  }

  .archive-viewport .spatial-hud.celestial-panel.fabric-mounted::after {
    inset: -18px -24px !important;
    z-index: -1;
    background: radial-gradient(
      ellipse 68% 76% at 48% 50%,
      rgba(0, 0, 0, .64) 0 27%,
      rgba(0, 0, 0, .28) 55%,
      transparent 82%
    ) !important;
    opacity: .86 !important;
    filter: blur(9px) !important;
    animation: none !important;
  }

  .archive-viewport :is(.chapter-rail, .scrollable-tab-shell, .spatial-hud):is(:hover, :focus-within)
    > .boundary-filament-field {
    opacity: min(1, calc(var(--boundary-field-opacity, .84) + .055));
    filter: saturate(1.12) contrast(1.07) brightness(1.08);
  }

  .archive-viewport :is(.chapter-rail, .spatial-hud).is-collapsed
    > .boundary-filament-field {
    visibility: hidden;
    opacity: 0;
  }

  .archive-viewport .spatial-hud.celestial-panel .spatial-hud-content {
    padding: 25px 30px 27px;
    filter: drop-shadow(0 3px 7px rgba(0, 0, 0, .9));
  }

  .archive-viewport .lore-parchment.celestial-panel,
  .archive-viewport.theme-winter .lore-parchment.celestial-panel {
    background: transparent !important;
    color: var(--ink) !important;
    filter: none !important;
    text-shadow:
      0 2px 5px rgba(0, 0, 0, .98),
      0 0 14px rgba(var(--celestial-primary-rgb), .24) !important;
  }

  .archive-viewport :is(.spatial-hud, .lore-parchment).celestial-panel.is-collapsed::before,
  .archive-viewport :is(.spatial-hud, .lore-parchment).celestial-panel.is-collapsed::after,
  .archive-viewport .spatial-hud.celestial-panel.is-collapsed::before,
  .archive-viewport .spatial-hud.celestial-panel.is-collapsed::after {
    opacity: 0 !important;
  }

  .archive-viewport.theme-fall :is(.celestial-control, .celestial-panel).fabric-mounted::before {
    animation-name: celestialEmberRise;
  }

  .archive-viewport.theme-spring :is(.celestial-control, .celestial-panel).fabric-mounted::before {
    animation-name: celestialSporeOrbit;
    animation-timing-function: ease-in-out;
  }

  .archive-viewport.theme-winter :is(.celestial-control, .celestial-panel).fabric-mounted::before {
    animation-name: celestialIceDrift;
    animation-timing-function: ease-in-out;
  }

  @keyframes celestialDustDrift {
    0%, 100% { translate: 0 0; rotate: 0deg; opacity: .46; }
    48% { translate: 4px -6px; rotate: .3deg; opacity: .72; }
  }

  @keyframes celestialEmberRise {
    0%, 100% { translate: 0 5px; rotate: -.2deg; opacity: .4; }
    44% { translate: -2px -9px; rotate: .35deg; opacity: .82; }
  }

  @keyframes celestialSporeOrbit {
    0%, 100% { translate: -2px 2px; rotate: -.35deg; opacity: .5; }
    25% { translate: 3px -5px; rotate: .2deg; opacity: .68; }
    50% { translate: 6px 1px; rotate: .45deg; opacity: .78; }
    75% { translate: -3px 5px; rotate: -.15deg; opacity: .62; }
  }

  @keyframes celestialIceDrift {
    0%, 100% { translate: -3px -3px; rotate: -.2deg; opacity: .42; }
    52% { translate: 5px 6px; rotate: .25deg; opacity: .74; }
  }

  @keyframes wayfinderNebulaBreathe {
    0%, 100% { scale: .992; }
    42% { scale: 1.018; }
    72% { scale: 1.004; }
  }

  /* Shared scene-prop treatment: atmospheric tracer light replaces image-backed UI. */
  .archive-app {
    --tracer-veil: rgba(10, 9, 7, .34);
    --tracer-veil-edge: rgba(10, 9, 7, .08);
  }

  .archive-app.theme-fall {
    --tracer-veil: rgba(30, 8, 8, .35);
    --tracer-veil-edge: rgba(30, 8, 8, .08);
  }

  .archive-app.theme-spring {
    --tracer-veil: rgba(4, 21, 17, .34);
    --tracer-veil-edge: rgba(4, 21, 17, .07);
  }

  .archive-app.theme-winter {
    --tracer-veil: rgba(5, 15, 22, .32);
    --tracer-veil-edge: rgba(5, 15, 22, .06);
  }

  .scene-prop-tracer-field {
    position: absolute;
    inset: 0;
    z-index: 31;
    width: 100%;
    height: 100%;
    pointer-events: none;
    contain: strict;
    mix-blend-mode: screen;
    filter: saturate(1.06) contrast(1.05);
  }

  .archive-viewport :is(.tracer-slab, .tracer-action, .tracer-control, .tracer-shell) {
    isolation: isolate;
    border: 0 !important;
    border-image: none !important;
    border-radius: 0 !important;
    background-image: none !important;
    box-shadow: none !important;
    clip-path: none !important;
  }

  .archive-viewport :is(.tracer-slab, .tracer-action, .tracer-control) {
    position: relative;
  }

  .archive-viewport :is(.tracer-slab, .tracer-action, .tracer-control, .tracer-shell)::before,
  .archive-viewport :is(.tracer-slab, .tracer-action, .tracer-control, .tracer-shell)::after {
    content: none !important;
    display: none !important;
    background: none !important;
  }

  .archive-viewport .tracer-slab {
    background:
      radial-gradient(ellipse 88% 82% at 50% 49%, var(--tracer-veil), var(--tracer-veil-edge) 62%, transparent 100%) !important;
    color: var(--panel-ink) !important;
    text-shadow: var(--surface-text-shadow) !important;
    filter: drop-shadow(0 10px 12px rgba(0, 0, 0, .28)) !important;
  }

  .archive-viewport .tracer-compact {
    background:
      radial-gradient(ellipse 92% 78% at 50% 50%, var(--tracer-veil), transparent 100%) !important;
  }

  .archive-viewport .tracer-action {
    background: transparent !important;
    color: var(--ink) !important;
    text-shadow:
      var(--surface-text-shadow),
      0 0 10px rgba(var(--accent-rgb), .18) !important;
    filter: drop-shadow(0 5px 8px rgba(0, 0, 0, .48)) !important;
    transition:
      color 260ms ease,
      filter 320ms ease,
      text-shadow 320ms ease,
      transform 420ms cubic-bezier(.16, .76, .22, 1) !important;
  }

  .archive-viewport .tracer-action:is(:hover, :focus-visible) {
    color: var(--accent) !important;
    filter: drop-shadow(0 7px 11px rgba(0, 0, 0, .54)) brightness(1.08) !important;
    text-shadow:
      var(--surface-text-shadow),
      0 0 14px rgba(var(--accent-rgb), .42) !important;
    transform: translateY(-2px);
  }

  .archive-viewport .tracer-action:focus-visible,
  .archive-viewport .tracer-control:focus-visible,
  .archive-viewport .tracer-slab:focus-visible {
    outline: 1px solid rgba(var(--accent-rgb), .7) !important;
    outline-offset: 5px !important;
  }

  .archive-viewport .archive-header-actions :is(a, button).tracer-action,
  .archive-viewport .intro-actions .tracer-action,
  .archive-viewport .intro-gate-cta.tracer-action,
  .archive-viewport .project-action-row .tracer-action {
    border: 0 !important;
    background: transparent !important;
    color: var(--ink) !important;
  }

  .archive-viewport.theme-winter .intro-gate-cta.tracer-action {
    color: #050505 !important;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .86), 0 0 5px rgba(255, 255, 255, .58) !important;
  }

  .archive-viewport .spatial-hud.tracer-shell,
  .archive-viewport .spatial-hud.tracer-shell.celestial-panel {
    position: absolute !important;
    background: transparent !important;
    border: 0 !important;
    filter: drop-shadow(0 14px 18px rgba(0, 0, 0, .56)) !important;
  }

  .archive-viewport .spatial-hud.tracer-shell .spatial-hud-content {
    background:
      radial-gradient(ellipse 94% 90% at 52% 50%, var(--tracer-veil), rgba(0, 0, 0, .08) 70%, transparent 100%);
  }

  .archive-viewport .lore-parchment.tracer-slab,
  .archive-viewport.theme-winter .lore-parchment.tracer-slab {
    background:
      radial-gradient(ellipse 94% 86% at 50% 50%, var(--tracer-veil), var(--tracer-veil-edge) 72%, transparent 100%) !important;
    color: var(--ink) !important;
    border: 0 !important;
    box-shadow: none !important;
    clip-path: none !important;
    filter: drop-shadow(0 12px 15px rgba(0, 0, 0, .46)) !important;
    text-shadow:
      var(--surface-text-shadow),
      0 0 10px rgba(var(--accent-rgb), .14) !important;
  }

  .archive-viewport .architecture-dialog.tracer-shell {
    background:
      radial-gradient(ellipse 92% 94% at 50% 48%, rgba(3, 8, 12, .9), rgba(2, 5, 8, .7) 64%, rgba(1, 3, 5, .42) 82%, transparent 100%) !important;
    border: 0 !important;
    box-shadow: none !important;
    clip-path: none !important;
    color: var(--panel-ink) !important;
    filter: drop-shadow(0 32px 48px rgba(0, 0, 0, .68)) !important;
  }

  .archive-viewport .architecture-dialog.tracer-shell > header,
  .archive-viewport .architecture-dialog.tracer-shell :is(.architecture-case-study, .architecture-step-grid, .architecture-stack-grid) {
    border: 0 !important;
    background: transparent !important;
  }

  .archive-viewport .project-artifact-stage {
    display: none !important;
  }

  .archive-viewport .project-case-layout .project-proof-grid > .tracer-slab,
  .archive-viewport .architecture-dialog .tracer-slab,
  .archive-viewport .timeline-waypoints > .tracer-slab,
  .archive-viewport .timeline-focus-card.tracer-slab,
  .archive-viewport .personal-collection-copy.tracer-slab,
  .archive-viewport .personal-feature-caption.tracer-slab,
  .archive-viewport .contact-grid > .tracer-slab {
    background:
      radial-gradient(ellipse 90% 86% at 50% 50%, var(--tracer-veil), var(--tracer-veil-edge) 66%, transparent 100%) !important;
    border: 0 !important;
    box-shadow: none !important;
    clip-path: none !important;
  }

  .archive-viewport .cinematic-systems-overlay .project-flowchart button.tracer-topology,
  .archive-viewport .project-flowchart button.tracer-topology {
    background:
      radial-gradient(ellipse 92% 82% at 50% 50%, var(--tracer-veil), var(--tracer-veil-edge) 68%, transparent 100%) !important;
    border: 0 !important;
    box-shadow: none !important;
    clip-path: none !important;
    color: var(--panel-ink) !important;
    filter: drop-shadow(0 13px 11px rgba(0, 0, 0, .34)) !important;
  }

  .archive-viewport .project-flowchart button.tracer-topology > :is(span, strong),
  .archive-viewport .project-case-layout .project-proof-grid > .tracer-slab :is(dt, dd) {
    color: inherit !important;
    text-shadow: var(--surface-text-shadow) !important;
  }

  .archive-viewport .project-flowchart button.tracer-topology > span,
  .archive-viewport .project-case-layout .project-proof-grid > .tracer-slab dt {
    color: var(--accent) !important;
  }

  /* Navigation and content now share the scene itself as their only surface. */
  .archive-viewport :is(
    .chapter-rail,
    .chapter-rail-list,
    .chapter-rail-list button,
    .spatial-hud.tracer-shell,
    .spatial-hud.tracer-shell .spatial-hud-content
  ) {
    border-color: transparent !important;
    background: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }

  .archive-viewport .spatial-hud.tracer-shell {
    filter: none !important;
  }

  .archive-viewport .spatial-hud.tracer-shell::before,
  .archive-viewport .spatial-hud.tracer-shell::after {
    content: none !important;
    display: none !important;
  }

  .archive-viewport :is(
    .tracer-slab,
    .tracer-slab.tracer-compact,
    .project-flowchart button.tracer-topology,
    .cinematic-systems-overlay .project-flowchart button.tracer-topology
  ) {
    border-color: transparent !important;
    background: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }

  .archive-viewport :is(
    .tracer-slab,
    .project-flowchart button.tracer-topology
  )::before,
  .archive-viewport :is(
    .tracer-slab,
    .project-flowchart button.tracer-topology
  )::after {
    content: none !important;
    display: none !important;
  }

  @media (max-width: 760px) {
    .scene-prop-tracer-field {
      filter: saturate(1.03) contrast(1.03);
    }
  }

  @media (max-width: 760px) {
    .chapter-rail-list {
      gap: 6px;
      overflow-x: auto;
      overflow-y: hidden;
    }

    .chapter-rail-list button {
      padding-inline: 10px;
    }

    .spatial-hud-content {
      padding: 24px 26px 26px;
    }

    .archive-viewport .spatial-hud.celestial-panel {
      right: 10px;
      bottom: 12px;
      width: min(286px, calc(100vw - 96px));
      aspect-ratio: 8 / 5;
    }

    .archive-viewport:has(.spatial-hud.celestial-panel:not(.is-collapsed))
      .spatial-lore-guide:not(.is-collapsed) {
      bottom: calc(clamp(170px, 50vw, 214px) + 18px);
    }

    .archive-viewport .lore-parchment {
      min-height: 128px;
      padding: 20px 44px 20px 30px;
    }

    .archive-viewport .celestial-control.fabric-mounted::before {
      inset: -7px -9px !important;
      background-size: 100% 100% !important;
    }

    .archive-viewport .celestial-panel.fabric-mounted::before {
      inset: -13px -16px !important;
      opacity: .5;
    }

    .archive-viewport .spatial-lore-guide {
      transition:
        bottom 620ms cubic-bezier(.16, .76, .22, 1),
        width 620ms cubic-bezier(.16, .76, .22, 1),
        padding-left 620ms cubic-bezier(.16, .76, .22, 1);
    }

    .archive-viewport .timeline-waypoints button {
      padding: 12px 10px;
    }

    .archive-viewport :is(
      .intro-role,
      .chapter-heading h2,
      .project-identity-copy h3,
      .timeline-focus-card h3,
      .personal-collection-copy h3,
      .field-note-placeholder strong,
      .architecture-dialog header h2
    ) {
      -webkit-mask-size: 420px 84px;
      mask-size: 420px 84px;
    }
  }

  /* The guide stays anchored while its complete visual footprint is reduced by 20%. */
  .archive-viewport .spatial-lore-guide {
    scale: .8;
    transform-origin: left bottom;
  }

  .archive-viewport .lore-avatar-image.is-current {
    animation: loreAvatarStateIn 720ms cubic-bezier(.16, .76, .22, 1) both;
  }

  .archive-viewport .lore-avatar-image.is-leaving {
    z-index: 1;
    animation: loreAvatarStateOut 720ms cubic-bezier(.32, 0, .2, 1) both;
  }

  @keyframes loreAvatarStateIn {
    from { opacity: 0; transform: translate3d(-3px, 2px, 0) scale(.985); }
    to { opacity: .88; transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes loreAvatarStateOut {
    from { opacity: .88; transform: translate3d(0, 0, 0) scale(1); }
    to { opacity: 0; transform: translate3d(3px, -1px, 0) scale(1.012); }
  }

  /* Celestial chapter markers follow the painted planet geometry. */
  .archive-viewport .chapter-celestial-marker {
    position: relative;
    display: grid;
    place-items: center;
    width: 24px;
    aspect-ratio: 1;
    flex: 0 0 auto;
    isolation: isolate;
  }

  .archive-viewport .chapter-celestial-marker img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: rotate(var(--chapter-asset-rotation, 0deg));
    filter:
      drop-shadow(0 2px 4px rgba(0, 0, 0, .76))
      drop-shadow(0 0 5px rgba(var(--celestial-primary-rgb), .28));
  }

  .archive-viewport .chapter-celestial-marker .theme-asset-crossfade {
    position: absolute;
    inset: 0;
    display: block;
    isolation: isolate;
  }

  .archive-viewport .chapter-celestial-marker .theme-asset-crossfade-layer {
    position: absolute;
    inset: 0;
    display: block;
  }

  .archive-viewport .chapter-celestial-marker .theme-asset-crossfade-layer.is-current {
    z-index: 2;
    animation: celestialThemeAssetIn 880ms cubic-bezier(.16, .76, .22, 1) both;
  }

  .archive-viewport .chapter-celestial-marker .theme-asset-crossfade-layer.is-leaving {
    z-index: 1;
    animation: celestialThemeAssetOut 880ms cubic-bezier(.32, 0, .2, 1) both;
  }

  @keyframes celestialThemeAssetIn {
    from { opacity: 0; filter: blur(.65px); }
    to { opacity: 1; filter: blur(0); }
  }

  @keyframes celestialThemeAssetOut {
    from { opacity: 1; filter: blur(0); }
    to { opacity: 0; filter: blur(.65px); }
  }

  @media (min-width: 761px) {
    .archive-viewport .chapter-rail.is-orbit-rail,
    .archive-viewport .chapter-rail.is-orbit-rail.is-collapsed {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100dvh !important;
      transform: none !important;
      opacity: 0;
      overflow: visible !important;
      pointer-events: none;
      z-index: 12;
      transition: opacity 720ms cubic-bezier(.16, .76, .22, 1);
    }

    .archive-viewport .chapter-rail.is-orbit-rail.is-orbit-ready {
      opacity: 1;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list,
    .archive-viewport .chapter-rail.is-orbit-rail.is-collapsed .chapter-rail-list {
      position: absolute !important;
      inset: 0 !important;
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      opacity: 1;
      overflow: visible !important;
      transform: none !important;
      pointer-events: none;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 286px !important;
      height: 52px !important;
      min-height: 52px !important;
      display: block !important;
      padding: 0 !important;
      border: 0 !important;
      opacity: 1;
      overflow: visible !important;
      pointer-events: auto;
      filter: none !important;
      transform: translate3d(
        calc(var(--chapter-tab-x, 62vw) - 50%),
        calc(var(--chapter-tab-y, 20vh) - 50%),
        0
      ) !important;
      transition:
        color 360ms ease,
        opacity 520ms cubic-bezier(.16, .76, .22, 1) !important;
      will-change: transform;
    }

    .archive-viewport .chapter-rail.is-orbit-rail.is-collapsed .chapter-rail-list {
      opacity: 0;
      pointer-events: none;
    }

    .archive-viewport .chapter-rail.is-orbit-rail.is-collapsed .chapter-rail-list button {
      opacity: 0;
      pointer-events: none;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button:hover,
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button.active {
      background: transparent !important;
      transform: translate3d(
        calc(var(--chapter-tab-x, 62vw) - 50%),
        calc(var(--chapter-tab-y, 20vh) - 50%),
        0
      ) !important;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button::before,
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button::after {
      content: none !important;
      display: none !important;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-celestial-marker {
      position: absolute !important;
      left: 50%;
      top: 50%;
      z-index: 3;
      width: 42px;
      transform: translate3d(
        calc(-50% + var(--chapter-marker-offset-x, 0px)),
        calc(-50% + var(--chapter-marker-offset-y, 0px)),
        0
      );
      animation: chapterCelestialOrbit var(--chapter-orbit-duration, 8.2s) cubic-bezier(.45, .03, .55, .97) infinite;
      animation-delay: calc(var(--chapter-item-index) * -1.13s);
      animation-direction: var(--chapter-orbit-direction, normal);
      transition:
        width 460ms cubic-bezier(.16, .76, .22, 1),
        filter 460ms ease;
      will-change: transform;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-celestial-marker::before,
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-celestial-marker::after {
      content: "";
      position: absolute;
      pointer-events: none;
      border-radius: 50%;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-celestial-marker::before {
      inset: -23%;
      z-index: -1;
      background: radial-gradient(
        circle,
        rgba(var(--celestial-primary-rgb), .25) 0 18%,
        rgba(var(--celestial-secondary-rgb), .1) 44%,
        transparent 72%
      );
      filter: blur(5px);
      opacity: .56;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-celestial-marker::after {
      inset: -9%;
      z-index: 2;
      border: 1px solid rgba(var(--celestial-primary-rgb), .24);
      box-shadow:
        0 0 7px rgba(var(--celestial-primary-rgb), .16),
        inset 0 0 6px rgba(var(--celestial-secondary-rgb), .1);
      opacity: 0;
      transform: scale(.92);
      transition: opacity 420ms ease, transform 520ms cubic-bezier(.16, .76, .22, 1);
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button.active .chapter-celestial-marker::after {
      opacity: .7;
      animation: chapterCelestialContour 8.4s ease-in-out infinite;
      animation-delay: calc(var(--chapter-item-index) * -910ms);
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button.active .chapter-celestial-marker::before {
      animation: chapterCelestialHalo 6.8s ease-in-out infinite;
      animation-delay: calc(var(--chapter-item-index) * -740ms);
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-celestial-marker img {
      will-change: transform;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button.active .chapter-celestial-marker img {
      animation: chapterCelestialDrift 7.2s ease-in-out infinite;
      animation-delay: calc(var(--chapter-item-index) * -820ms);
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button:is(:hover, :focus-visible) .chapter-celestial-marker,
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button.active .chapter-celestial-marker {
      width: 49px;
      filter: brightness(1.08) saturate(1.06);
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list strong {
      position: absolute !important;
      left: 50%;
      top: 50%;
      z-index: 2;
      width: 156px;
      color: var(--ink);
      opacity: var(--chapter-label-opacity, 1);
      text-align: var(--chapter-label-align, center);
      text-wrap: balance;
      line-height: 1.05;
      transform: translate3d(
        calc(-50% + var(--chapter-label-offset-x, 108px)),
        calc(-50% + var(--chapter-label-offset-y, 0px)),
        0
      );
      transition:
        color 340ms ease,
        text-shadow 420ms ease;
      text-shadow:
        0 2px 5px rgba(0, 0, 0, .96),
        0 0 9px rgba(var(--celestial-primary-rgb), .2) !important;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button.active strong {
      color: rgb(var(--celestial-primary-rgb));
      text-shadow:
        0 2px 5px rgba(0, 0, 0, .96),
        0 0 12px rgba(var(--celestial-primary-rgb), .4) !important;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-collapse {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 32px;
      height: 32px;
      z-index: 5;
      pointer-events: auto;
      transform: translate3d(
        calc(var(--chapter-collapse-x, 68vw) - 50%),
        calc(var(--chapter-collapse-y, 72vh) - 50%),
        0
      ) !important;
      transition: opacity 420ms ease, filter 420ms ease !important;
    }

    .archive-viewport .chapter-rail.is-orbit-rail .chapter-collapse:hover,
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-collapse:focus-visible {
      filter: drop-shadow(0 0 7px rgba(var(--celestial-primary-rgb), .68));
    }
  }

  @keyframes chapterCelestialOrbit {
    0%, 100% {
      transform: translate3d(
        calc(-50% + var(--chapter-marker-offset-x, 0px)),
        calc(-50% + var(--chapter-marker-offset-y, 0px)),
        0
      ) scale(.985);
    }
    24% {
      transform: translate3d(
        calc(-50% + var(--chapter-marker-offset-x, 0px) + var(--chapter-orbit-forward-x, 5px)),
        calc(-50% + var(--chapter-marker-offset-y, 0px) + var(--chapter-orbit-forward-y, 0px)),
        0
      ) scale(1.008);
    }
    51% {
      transform: translate3d(
        calc(-50% + var(--chapter-marker-offset-x, 0px) + var(--chapter-orbit-lift-x, 0px)),
        calc(-50% + var(--chapter-marker-offset-y, 0px) + var(--chapter-orbit-lift-y, -3px)),
        0
      ) scale(1.022);
    }
    76% {
      transform: translate3d(
        calc(-50% + var(--chapter-marker-offset-x, 0px) + var(--chapter-orbit-back-x, -4px)),
        calc(-50% + var(--chapter-marker-offset-y, 0px) + var(--chapter-orbit-back-y, 0px)),
        0
      ) scale(.998);
    }
  }

  @keyframes chapterCelestialDrift {
    0%, 100% {
      transform: rotate(var(--chapter-asset-rotation, 0deg)) translate3d(0, 0, 0) scale(.985);
    }
    48% {
      transform: rotate(calc(var(--chapter-asset-rotation, 0deg) + 2deg)) translate3d(0, -2px, 0) scale(1.025);
    }
  }

  @keyframes chapterCelestialHalo {
    0%, 100% { opacity: .46; transform: scale(.94); }
    52% { opacity: .84; transform: scale(1.08); }
  }

  @keyframes chapterCelestialContour {
    0%, 100% { transform: rotate(-3deg) scale(.97); }
    46% { transform: rotate(3deg) scale(1.035); }
  }

  @media (max-width: 760px) {
    .archive-viewport .chapter-celestial-marker {
      width: 22px;
    }

    .archive-viewport .chapter-rail-list button.active .chapter-celestial-marker img {
      animation: chapterCelestialDrift 7.2s ease-in-out infinite;
      animation-delay: calc(var(--chapter-item-index) * -820ms);
    }

    .archive-viewport .chapter-rail-list button.active .chapter-celestial-marker {
      width: 25px;
    }
  }

  /* Cores is a visual interlude between the threshold and the evidence. */
  .archive-viewport .archive-scene.scene-cores {
    inset: 100px 8% 200px 8%;
  }

  .cores-chapter-content {
    position: relative;
    width: min(100%, 820px);
    height: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    padding: 16px 20px 28px;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--muted) transparent;
    pointer-events: auto;
    overflow-wrap: anywhere;
  }

  .cores-heading {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    opacity: 0;
    transform: translate3d(-18px, 12px, 0) scale(.985);
    text-shadow:
      0 3px 8px rgba(0, 0, 0, .96),
      0 0 18px rgba(var(--celestial-primary-rgb), .2);
    transition:
      opacity 1100ms cubic-bezier(.16, .76, .22, 1) 180ms,
      transform 1400ms cubic-bezier(.16, .76, .22, 1) 120ms;
  }

  .cores-heading p {
    margin: 0 0 8px;
    color: var(--accent);
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .cores-heading h2 {
    max-width: 600px;
    margin: 0;
    color: var(--ink);
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 700;
    line-height: 1.12;
    min-height: 2.24em;
    text-transform: uppercase;
    -webkit-mask-image: var(--text-distress-mask);
    mask-image: var(--text-distress-mask);
    -webkit-mask-size: 620px 124px;
    mask-size: 620px 124px;
  }

  .cores-heading > span {
    display: block;
    margin-top: 13px;
    color: var(--muted);
    font-size: 17px;
    font-weight: 600;
  }

  .cores-pillar-list {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(18px, 2.2vw, 34px);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .cores-pillar-list li {
    min-width: 0;
    opacity: 0;
    transform: translate3d(0, 22px, 0);
    text-shadow: 0 2px 7px rgba(0, 0, 0, .98);
    transition:
      opacity 900ms cubic-bezier(.16, .76, .22, 1) calc(740ms + var(--core-index) * 170ms),
      transform 1200ms cubic-bezier(.16, .76, .22, 1) calc(680ms + var(--core-index) * 170ms);
  }

  .cores-pillar-list li > span {
    display: block;
    color: var(--accent);
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 700;
  }

  .cores-pillar-list strong {
    display: block;
    margin-top: 4px;
    color: var(--ink);
    font-family: var(--font-display);
    font-size: 22px;
    text-transform: uppercase;
  }

  .cores-pillar-list small {
    display: block;
    margin-top: 7px;
    color: var(--muted);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
  }

  .cores-continue {
    position: relative !important;
    flex-shrink: 0;
    max-width: 100%;
    white-space: normal;
    min-height: 40px;
    padding: 0 14px;
    opacity: 0;
    pointer-events: auto;
    transform: translate3d(0, 16px, 0);
    transition:
      opacity 800ms ease 1320ms,
      transform 1100ms cubic-bezier(.16, .76, .22, 1) 1240ms !important;
  }

  .cores-chapter-content.is-active .cores-heading,
  .cores-chapter-content.is-active .cores-pillar-list li,
  .cores-chapter-content.is-active .cores-continue {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  /* Mirror the lower scene controls and reverse the guide's internal reading order. */
  .archive-viewport .spatial-lore-guide {
    left: auto !important;
    right: 24px;
    padding-left: 0;
    padding-right: 76px;
    transform-origin: right bottom;
  }

  .archive-viewport .spatial-lore-guide .lore-medallion {
    left: auto;
    right: 0;
  }

  .archive-viewport .spatial-lore-guide .lore-parchment {
    left: auto;
    right: 76px;
    padding-right: 6px;
    transform-origin: 100% 50%;
  }

  .archive-viewport .spatial-lore-guide .lore-toggle {
    left: 13px;
    right: auto;
  }

  .archive-viewport .spatial-lore-guide.is-collapsed {
    padding-left: 0;
    padding-right: 0;
  }

  .archive-viewport .spatial-lore-guide.is-collapsed .lore-toggle {
    left: -31px;
    right: auto;
  }

  .archive-viewport .spatial-hud.tracer-shell,
  .archive-viewport .spatial-hud.tracer-shell.celestial-panel {
    left: 24px !important;
    right: auto !important;
  }

  @media (min-width: 761px) {
    .archive-viewport .spatial-lore-guide .lore-parchment {
      left: auto;
      right: 76px;
    }

    .archive-viewport .spatial-lore-guide.is-collapsed .lore-parchment {
      transform: translate3d(48px, -50%, 0) scaleX(.04);
    }
  }

  @media (min-width: 761px) and (max-width: 1050px) {
    .archive-viewport .spatial-lore-guide,
    .archive-viewport .spatial-lore-guide.is-collapsed {
      left: auto !important;
      right: 16px;
    }

    .archive-viewport .spatial-hud.tracer-shell,
    .archive-viewport .spatial-hud.tracer-shell.celestial-panel {
      left: 16px !important;
      right: auto !important;
    }
  }

  @media (max-width: 760px) {
    .archive-viewport .archive-scene.scene-cores {
      inset: 100px 12px 180px;
    }

    .cores-chapter-content {
      gap: 24px;
      padding: 12px 12px 24px;
    }

    .cores-heading {
      width: 100%;
    }

    .cores-heading h2 {
      max-width: 360px;
      font-size: 34px;
    }

    .cores-heading > span { font-size: 14px; }

    .cores-pillar-list {
      width: 100%;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .cores-pillar-list strong { font-size: 17px; }
    .cores-pillar-list small { display: block; }

    .cores-continue {
      align-self: flex-start;
    }

    .archive-viewport .spatial-hud.tracer-shell,
    .archive-viewport .spatial-hud.tracer-shell.celestial-panel {
      left: 10px !important;
      right: auto !important;
    }

    .archive-viewport .spatial-lore-guide,
    .archive-viewport .spatial-lore-guide.is-collapsed {
      left: auto !important;
      right: 10px;
      padding-left: 0;
      padding-right: 0;
      transform-origin: right bottom;
    }

    .archive-viewport .spatial-lore-guide:not(.is-collapsed) {
      padding-left: 0;
      padding-right: 58px;
    }

    .archive-viewport .spatial-lore-guide .lore-medallion {
      left: auto;
      right: 0;
    }

    .archive-viewport .spatial-lore-guide .lore-parchment {
      left: auto;
      right: 58px;
      padding: 20px 4px 20px 44px;
      transform: translateX(26px);
      transform-origin: 100% 50%;
    }

    .archive-viewport .spatial-lore-guide:not(.is-collapsed) .lore-parchment {
      transform: none;
    }

    .archive-viewport .spatial-lore-guide .lore-toggle {
      left: -28px;
      right: auto;
    }

    .archive-viewport .spatial-lore-guide:not(.is-collapsed) .lore-toggle {
      left: 10px;
      right: auto;
    }
  }

  /* Geometric display copy carries a slow atmospheric response from the
     active scene. The light blooms in place, with no sweep across the glyphs. */
  .archive-app :is(
    .archive-identity strong,
    .archive-header-actions a span,
    .intro-coordinate,
    .intro-status span,
    .intro-actions a span,
    .intro-gate-cta span,
    .chapter-rail-list button strong,
    .chapter-heading p,
    .chapter-heading h2,
    .chapter-heading > span,
    .cores-heading p,
    .cores-heading h2,
    .cores-heading > span,
    .cores-pillar-list li > span,
    .cores-pillar-list strong,
    .cores-continue,
    .project-switcher button span,
    .project-switcher button strong,
    .project-overline span,
    .project-overline em,
    .project-identity-copy h3,
    .project-proof-grid dt,
    .project-action-row a span,
    .project-action-row button span,
    .topology-heading span,
    .topology-heading strong,
    .project-flowchart button > span,
    .project-flowchart button > strong,
    .compact-stack span,
    .hud-coordinate span,
    .hud-coordinate strong,
    .hud-coordinate small,
    .hud-theme-row button span,
    .hud-atmosphere-row span,
    .hud-atmosphere-row strong,
    .hud-intensity > span,
    .timeline-axis,
    .timeline-waypoints button > span,
    .timeline-waypoints button strong,
    .personal-switcher button,
    .contact-email,
    .contact-grid span,
    .contact-grid strong,
    .architecture-dialog header p,
    .architecture-dialog header h2,
    .architecture-case-study dt,
    .architecture-step-grid article > span,
    .architecture-step-grid h3,
    .architecture-stack-grid span,
    .scenic-text
  ) {
    font-family: var(--font-display) !important;
    font-style: normal;
    font-synthesis: none;
  }

  .scenic-text {
    --scenic-seed: 0;
    position: relative;
    isolation: isolate;
    text-shadow:
      0 1px 1px rgba(0, 0, 0, .84),
      0 0 1px rgba(var(--celestial-primary-rgb), .18);
    filter: brightness(1);
    animation: scenicTextAtmosphere calc(7.4s + var(--scenic-seed) * 420ms) ease-in-out infinite;
    animation-delay: calc(var(--scenic-seed) * -760ms);
  }

  .archive-app .chapter-rail-list button strong {
    font-family: var(--font-navigation) !important;
    font-weight: 400;
  }

  .archive-app .archive-viewport .chapter-rail .chapter-rail-list button :is(strong, .chapter-celestial-marker) {
    scale: .5;
    transition: scale 480ms cubic-bezier(.16, .76, .22, 1), color 340ms ease, filter 460ms ease;
  }

  .archive-app .archive-viewport .chapter-rail .chapter-rail-list button.active :is(strong, .chapter-celestial-marker) {
    scale: 1;
  }

  @media (min-width: 761px) {
    .archive-app .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button:not(.active) .chapter-celestial-marker {
      width: 42px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .archive-app .archive-viewport .chapter-rail .chapter-rail-list button :is(strong, .chapter-celestial-marker) {
      transition: none;
    }
  }

  .archive-app :is(
    .hud-coordinate span,
    .hud-coordinate strong,
    .hud-coordinate small,
    .hud-theme-row button span,
    .hud-atmosphere-row span,
    .hud-atmosphere-row strong,
    .hud-intensity > span
  ) {
    font-family: var(--font-navigation) !important;
  }

  .archive-app .lore-parchment p {
    font-family: var(--font-lore) !important;
  }

  @media (min-width: 761px) {
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list strong.scenic-text {
      animation:
        chapterLabelOrbit var(--chapter-orbit-duration, 8.2s) cubic-bezier(.45, .03, .55, .97) infinite,
        scenicTextAtmosphere calc(7.4s + var(--scenic-seed) * 420ms) ease-in-out infinite;
      animation-delay:
        calc(var(--chapter-item-index) * -1.13s),
        calc(var(--scenic-seed) * -760ms);
      animation-direction: var(--chapter-orbit-direction, normal), normal;
    }
  }

  @keyframes chapterLabelOrbit {
    0%, 100% {
      transform: translate3d(
        calc(-50% + var(--chapter-label-offset-x, 108px)),
        calc(-50% + var(--chapter-label-offset-y, 0px)),
        0
      );
    }
    24% {
      transform: translate3d(
        calc(-50% + var(--chapter-label-offset-x, 108px) + var(--chapter-orbit-forward-x, 5px)),
        calc(-50% + var(--chapter-label-offset-y, 0px) + var(--chapter-orbit-forward-y, 0px)),
        0
      );
    }
    51% {
      transform: translate3d(
        calc(-50% + var(--chapter-label-offset-x, 108px) + var(--chapter-orbit-lift-x, 0px)),
        calc(-50% + var(--chapter-label-offset-y, 0px) + var(--chapter-orbit-lift-y, -3px)),
        0
      );
    }
    76% {
      transform: translate3d(
        calc(-50% + var(--chapter-label-offset-x, 108px) + var(--chapter-orbit-back-x, -4px)),
        calc(-50% + var(--chapter-label-offset-y, 0px) + var(--chapter-orbit-back-y, 0px)),
        0
      );
    }
  }

  @keyframes scenicTextAtmosphere {
    0%, 100% {
      filter: brightness(1) saturate(.98);
      text-shadow:
        0 1px 1px rgba(0, 0, 0, .84),
        0 0 1px rgba(var(--celestial-primary-rgb), .16);
    }
    42% {
      filter: brightness(1.025) saturate(1.01);
      text-shadow:
        0 1px 1px rgba(0, 0, 0, .82),
        0 0 4px rgba(var(--celestial-primary-rgb), .2),
        0 0 11px rgba(var(--celestial-secondary-rgb), .08);
    }
    56% {
      filter: brightness(1.07) saturate(1.035);
      text-shadow:
        0 1px 1px rgba(0, 0, 0, .78),
        0 0 7px rgba(var(--celestial-primary-rgb), .3),
        0 0 18px rgba(var(--celestial-secondary-rgb), .13);
    }
    72% {
      filter: brightness(1.018) saturate(1);
      text-shadow:
        0 1px 1px rgba(0, 0, 0, .82),
        0 0 3px rgba(var(--celestial-primary-rgb), .2);
    }
  }

  /* Home copy follows a quiet orbital path in the open space beside the gate. */
  .archive-viewport .intro-copy-stage {
    top: calc(12% + 88px);
    width: min(470px, 34vw);
  }

  .archive-viewport .intro-coordinate {
    max-width: 100%;
    margin: 0;
    min-height: 1.2em;
    color: rgb(var(--celestial-primary-rgb));
    font-family: var(--font-navigation);
    font-size: clamp(13px, .92vw, 16px);
    font-weight: 700;
    line-height: 1.25;
    text-shadow:
      0 1px 2px rgba(0, 0, 0, .88),
      0 0 12px rgba(var(--celestial-primary-rgb), .22);
  }

  .archive-viewport .intro-manifesto {
    width: max-content;
    max-width: 100%;
    display: grid;
    gap: 7px;
    margin: 0 0 46px;
  }

  .archive-viewport .intro-manifesto-line {
    width: max-content;
    display: flex;
    align-items: center;
    transform: translate3d(calc(var(--manifesto-index) * 22px), 0, 0);
  }

  .archive-viewport .intro-role-orbit {
    position: relative;
    isolation: isolate;
    width: 100%;
    display: grid;
    gap: 0;
    margin: 0 0 44px;
    padding: 0;
  }

  .archive-viewport .intro-role-orbit::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -10%;
    left: -15%;
    width: 92%;
    height: 120%;
    border-left: 1px solid rgba(var(--celestial-primary-rgb), .34);
    border-radius: 50%;
    opacity: .8;
    filter: drop-shadow(0 0 7px rgba(var(--celestial-primary-rgb), .2));
    transform: rotate(-11deg);
    transform-origin: 50% 50%;
    animation: introRoleOrbit 8.5s ease-in-out infinite;
    pointer-events: none;
  }

  .archive-viewport .intro-role {
    width: max-content;
    max-width: 100%;
    min-height: 1em;
    display: flex;
    align-items: center;
    gap: 0;
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(28px, 2.25vw, 36px);
    font-weight: 700;
    line-height: .94;
    color: var(--ink);
    text-transform: uppercase;
    text-shadow:
      0 2px 3px rgba(0, 0, 0, .86),
      0 0 14px rgba(var(--celestial-primary-rgb), .12);
  }

  .archive-viewport .intro-role-wonderer,
  .archive-viewport .intro-role-storyteller { transform: none; }

  .archive-viewport .intro-actions {
    min-height: 42px;
    margin-top: 0;
  }

  .archive-viewport .intro-actions a {
    min-width: 190px;
    justify-content: flex-start;
  }

  .archive-viewport .intro-chapter-content.is-resume-visible .intro-actions {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: 0ms;
  }

  .archive-viewport .intro-chapter-content:not(.is-resume-complete) .intro-actions a {
    pointer-events: none;
  }

  .archive-viewport .intro-status {
    width: min(390px, 100%);
    min-height: 3.5em;
    display: block;
    margin-top: 40px;
    color: var(--muted);
    font-family: var(--font-lore);
    font-size: clamp(13px, .95vw, 16px);
    font-weight: 650;
    line-height: 1.36;
    text-transform: none;
    text-wrap: balance;
  }

  .archive-viewport .intro-chapter-content.is-status-visible .intro-status {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: 0ms;
  }

  .archive-viewport .intro-scroll-arrow {
    display: inline-block;
    min-height: 0;
    color: inherit;
    font: inherit;
    line-height: inherit;
    vertical-align: baseline;
    filter: drop-shadow(0 0 7px rgba(var(--celestial-primary-rgb), .5));
    animation: introScrollDrift 1.9s cubic-bezier(.45, 0, .2, 1) infinite;
  }

  .archive-viewport .intro-scroll-cue {
    display: inline-flex;
    align-items: baseline;
    gap: .18em;
    color: inherit;
    font: inherit;
    white-space: nowrap;
  }

  .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button:focus-visible {
    outline: 0;
  }

  .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button:focus-visible .chapter-celestial-marker::after {
    opacity: .9;
    transform: scale(1.08);
  }

  @keyframes introRoleOrbit {
    0%, 100% { opacity: .56; transform: rotate(-11deg) scale(.99); }
    50% { opacity: .88; transform: rotate(-10.2deg) scale(1.015); }
  }

  @keyframes introScrollDrift {
    0%, 100% { opacity: .58; transform: translate3d(0, -2px, 0); }
    52% { opacity: 1; transform: translate3d(0, 5px, 0); }
  }

  @media (min-width: 761px) and (max-width: 1050px) {
    .archive-viewport .intro-copy-stage {
      top: calc(13% + 88px);
      width: min(390px, 40vw);
    }

    .archive-viewport .intro-role {
      font-size: clamp(27px, 3vw, 32px);
    }

    .archive-viewport .intro-role-wonderer,
    .archive-viewport .intro-role-storyteller { transform: none; }
  }

  @media (max-width: 760px) {
    .archive-viewport .intro-copy-stage {
      top: 30%;
      left: 3%;
      z-index: 14;
      width: 94%;
    }

    .archive-viewport .intro-coordinate {
      font-size: 11px;
    }

    .archive-viewport .intro-manifesto {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }

    .archive-viewport .intro-manifesto-line {
      display: inline;
      transform: none;
    }

    .archive-viewport .intro-manifesto-line:not(:last-child)::after { content: " "; }
    .archive-viewport .intro-role-orbit {
      gap: 0;
      margin-bottom: 26px;
      padding: 0;
    }

    .archive-viewport .intro-role {
      font-size: clamp(27px, 7.5vw, 31px);
    }

    .archive-viewport .intro-role-wonderer,
    .archive-viewport .intro-role-storyteller { transform: none; }

    .archive-viewport .intro-status {
      display: block;
      width: min(320px, 94%);
      min-height: 4em;
      margin-top: 26px;
      font-size: 11px;
    }
  }

  .archive-viewport.experience-concealed > :is(
    .archive-header,
    .chapter-rail,
    .spatial-hud,
    .spatial-lore-guide,
    .archive-progress
  ) {
    opacity: 0;
    pointer-events: none;
  }

  .archive-viewport.experience-visible > :is(
    .archive-header,
    .chapter-rail,
    .spatial-hud,
    .spatial-lore-guide,
    .archive-progress
  ) {
    animation: archiveUiEnter 920ms cubic-bezier(.16, .82, .24, 1) both;
  }

  .archive-viewport.experience-visible > .archive-header {
    --archive-entry-x: 0px;
    --archive-entry-y: -18px;
    animation-delay: 120ms;
  }

  .archive-viewport.experience-visible > .chapter-rail {
    --archive-entry-x: -22px;
    --archive-entry-y: 0px;
    animation-delay: 280ms;
  }

  .archive-viewport.experience-visible > .archive-progress {
    --archive-entry-x: 0px;
    --archive-entry-y: 14px;
    animation-delay: 430ms;
  }

  .archive-viewport.experience-visible > .spatial-hud {
    --archive-entry-x: 18px;
    --archive-entry-y: 14px;
    animation-delay: 590ms;
  }

  .archive-viewport.experience-visible > .spatial-lore-guide {
    --archive-entry-x: -14px;
    --archive-entry-y: 12px;
    animation-delay: 780ms;
  }

  @keyframes archiveUiEnter {
    0% {
      opacity: 0;
      translate: var(--archive-entry-x, 0px) var(--archive-entry-y, 12px);
    }
    46% { opacity: .58; }
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .environment-transition-veil { display: none; }

    :is(.cores-plate, .systems-plate, .chronology-plate, .field-plate, .surface-plate) .environment-living-layer {
      translate: 0 0 !important;
    }

    .scenic-text { animation: none; }
  }
`;
