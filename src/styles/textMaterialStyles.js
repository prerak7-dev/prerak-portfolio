import { TEXT_MATERIALS } from '../data/textMaterials.js';

export const textMaterialStyles = `
  ${Object.entries(TEXT_MATERIALS).map(([theme, tokens]) => `
    .archive-app.theme-${theme} {
      ${Object.entries(tokens).filter(([key]) => key !== 'name').map(([key, value]) => `--type-${key}: ${value};`).join('\n')}
    }
  `).join('\n')}

  .archive-app .archive-viewport .material-text,
  .archive-app .archive-viewport .material-text :is(span, strong, em, small, a, p) {
    color: var(--type-ink) !important;
    -webkit-text-fill-color: currentColor !important;
    text-shadow: 0 .5px .4px var(--type-shade), 0 0 2px var(--type-halo) !important;
    letter-spacing: 0;
    font-synthesis: none;
  }
  .archive-app .archive-viewport .material-text {
    -webkit-mask-image: none;
    mask-image: none;
  }
  .archive-app .archive-viewport .material-text[data-text-material="relief"],
  .archive-app .archive-viewport .material-text[data-text-material="relief"] > .scenic-text {
    color: var(--type-face) !important;
    -webkit-text-fill-color: transparent !important;
    background-image: url('${import.meta.env.BASE_URL}cinematic/ui/watercolor-paper-fiber-overlay-v1.webp'),
      linear-gradient(var(--type-angle), var(--type-face) 8%, var(--type-face) 35%, var(--type-fold) 52%, var(--type-face) 76%);
    background-size: var(--type-grain) auto, 100% 100%;
    background-blend-mode: soft-light, normal;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-stroke: .2px var(--type-edge);
    text-shadow: none !important;
    filter: drop-shadow(0 -.5px .2px var(--type-light))
      drop-shadow(.6px 1px .2px var(--type-edge))
      drop-shadow(1px 2.4px 1.3px var(--type-shade));
  }
  .archive-app .archive-viewport .material-text[data-text-material="relief"]:has(> .scenic-text) {
    background: none;
    filter: none;
    -webkit-text-stroke: 0;
  }
  .archive-app .archive-viewport .material-text :is(svg, .intro-caret, .lore-caret) { -webkit-text-fill-color: currentColor !important; }
  .archive-app .archive-viewport :is(.contour-eyebrow, [aria-pressed="true"], .chapter-rail-list .active strong).material-text {
    color: var(--type-accent) !important;
    text-shadow: 0 1px .5px var(--type-shade), 0 0 2px var(--type-halo) !important;
  }
  .archive-app .archive-viewport .lore-parchment .material-text {
    text-shadow: 0 .6px .7px var(--type-shade), 0 0 3px var(--type-halo) !important;
  }
  .archive-app .archive-viewport .chapter-rail .chapter-rail-list button strong.material-text {
    color: var(--type-ink) !important;
    text-shadow: 0 .6px .5px var(--type-shade), 0 0 2px var(--type-halo) !important;
  }
  .archive-app .archive-viewport .chapter-rail .chapter-rail-list button.active strong.material-text { color: var(--type-accent) !important; }
  .archive-app .archive-viewport .material-text,
  .archive-app .archive-viewport .material-text *,
  .archive-app .archive-viewport .scenic-text {
    animation: none !important; transition: none !important;
  }
  .archive-app .archive-identity > span { display: grid; align-content: center; }
  .archive-app .archive-identity strong { display: block; }
  .archive-app .archive-viewport .archive-scene { transform: none !important; opacity: 1; transition: none !important; }
  .archive-app .archive-viewport .archive-scene[aria-hidden="true"] { display: none; }
  .archive-app .archive-viewport .archive-scene[aria-hidden="false"] { visibility: visible; }
  .archive-app .archive-viewport:not([data-chapter-copy-ready]) :is(.archive-scene-stack, .lore-parchment) {
    opacity: 0 !important;
  }
  .archive-app .archive-viewport[data-chapter-copy-initial="true"]:not([data-chapter-copy-ready])
    :is(.archive-header, .chapter-rail strong, .archive-progress, .theme-icon-tooltip) {
    opacity: 0 !important;
  }
  .archive-app .archive-viewport :is(.archive-header, .chapter-rail, .spatial-lore-guide, .archive-progress,
    .intro-copy-stage, .intro-actions, .intro-status, .intro-gate-entry, .intro-gate-scroll-shell,
    .contour-content, .contour-focus, .chapter-heading, .timeline-focus-card, .personal-feature, .lore-parchment) {
    animation: none !important; transition: none !important; translate: none !important;
  }
  .archive-app .archive-viewport :is(.intro-copy-stage, .intro-actions, .intro-status, .contour-content, .contour-focus, .lore-parchment) {
    transform: none !important;
  }
  .archive-app .archive-viewport .intro-gate-scroll-shell { opacity: 1; transform: none; }
  .archive-app .archive-viewport .intro-caret,
  .archive-app .archive-viewport .case-type-caret,
  .archive-app .archive-viewport .lore-caret { display: none; }
  .text-contour-ghosts { position: fixed; inset: 0; z-index: 90; pointer-events: none; overflow: hidden; }
  .text-contour-ghosts * { pointer-events: none !important; }
  .archive-app .archive-viewport :is(.cinematic-atmosphere-field, .boundary-filament-field, .scene-prop-tracer-field, .wayfinder-cosmic-field, .lore-avatar-contour-field) {
    mix-blend-mode: normal; filter: none;
  }
  .archive-viewport .contour-content { overflow: hidden; }
  .archive-viewport .contour-reading-list {
    position: relative; min-height: 0; flex: 1; overflow-y: auto; overscroll-behavior: contain;
    scrollbar-width: thin; padding: 2px 8px 6px 2px;
  }
  .archive-viewport .contour-record { margin: 0 0 24px; }
  .archive-viewport .contour-record:last-child { margin-bottom: 0; }
  .archive-viewport .contour-record h3 { margin-bottom: 8px; }
  @media (max-height: 500px) and (min-width: 600px) {
    .archive-viewport .contour-cores .contour-reading-list { grid-column: 2; grid-row: 1; }
    .archive-viewport .contour-projects .contour-reading-list { grid-column: 2; grid-row: 1 / 3; }
  }
  @media (forced-colors: active) {
    .archive-app .archive-viewport .material-text,
    .archive-app .archive-viewport .material-text * {
      background: none !important; -webkit-text-fill-color: CanvasText !important;
      color: CanvasText !important; filter: none !important; text-shadow: none !important; -webkit-text-stroke: 0 !important;
    }
  }
`;
