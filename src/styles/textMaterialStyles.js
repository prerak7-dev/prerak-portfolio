import { TEXT_MATERIALS } from '../data/textMaterials.js';

export const textMaterialStyles = `
  ${Object.entries(TEXT_MATERIALS).map(([theme, tokens]) => `
    .archive-app.theme-${theme} {
      ${Object.entries(tokens).filter(([key]) => key !== 'name').map(([key, value]) => `--type-${key}: ${value};`).join('\n')}
    }
  `).join('\n')}

  .archive-app .archive-viewport .material-text {
    --type-ink-color: var(--type-ink);
    --type-pigment-cover: 56%;
    --type-ink-load: 90%;
    --type-fiber-scale: 1;
    -webkit-mask-image: none;
    mask-image: none;
  }
  .archive-app .archive-viewport .material-text[data-text-material="display-ink"] {
    --type-ink-color: var(--type-face);
    --type-pigment-cover: 0%;
    --type-ink-load: 60%;
    --type-fiber-scale: 1.6;
  }
  .archive-app .archive-viewport .material-text,
  .archive-app .archive-viewport .material-text :is(span, strong, em, small, a, p) {
    color: var(--type-ink-color) !important;
    -webkit-text-fill-color: currentColor !important;
    -webkit-text-stroke: 0;
    text-shadow: none !important;
    filter: none !important;
    letter-spacing: 0;
    font-synthesis: none;
  }
  .archive-app .archive-viewport :is(.contour-eyebrow, [aria-pressed="true"], .chapter-rail-list .active strong).material-text {
    --type-ink-color: var(--type-accent);
  }
  .archive-app .archive-viewport .chapter-rail .chapter-rail-list button strong.material-text {
    --type-ink-color: var(--type-ink);
  }
  .archive-app .archive-viewport .chapter-rail .chapter-rail-list button.active strong.material-text {
    --type-ink-color: var(--type-accent);
  }
  /* Static pigment layers leave the alpha mask exclusively to contour dissolves. */
  @supports ((background-clip: text) or (-webkit-background-clip: text)) and (color: color-mix(in srgb, white, transparent)) {
    .archive-app .archive-viewport .material-text,
    .archive-app .archive-viewport .material-text :is(span, strong, em, small, a, p) {
      -webkit-text-fill-color: transparent !important;
      background-color: transparent;
      background-image:
        linear-gradient(color-mix(in srgb, currentColor var(--type-pigment-cover), transparent), color-mix(in srgb, currentColor var(--type-pigment-cover), transparent)),
        url('${import.meta.env.BASE_URL}cinematic/ui/watercolor-paper-fiber-overlay-v1.webp'),
        radial-gradient(ellipse at 18% 32%, currentColor 0%, transparent 52%),
        radial-gradient(ellipse at 82% 74%, currentColor 0%, transparent 46%),
        linear-gradient(var(--type-angle), currentColor 4%, color-mix(in srgb, currentColor var(--type-ink-load), transparent) 29%, currentColor 47%, color-mix(in srgb, currentColor var(--type-ink-load), transparent) 68%, currentColor 93%);
      background-size: 100% 100%, calc(var(--type-grain) * var(--type-fiber-scale)) auto, 73% 100%, 89% 100%, 100% 100%;
      background-position: 0 0, 0 0, 0 0, 100% 0, 0 0;
      background-repeat: no-repeat, repeat, no-repeat, no-repeat, no-repeat;
      background-blend-mode: normal, multiply, normal, normal, normal;
      background-clip: text;
      -webkit-background-clip: text;
    }
    .archive-app .archive-viewport .material-text:has(> .scenic-text) {
      background: none;
      text-shadow: none !important;
    }
  }
  .archive-app .archive-viewport .material-text :is(svg, .intro-caret, .lore-caret) {
    -webkit-text-fill-color: currentColor !important;
  }
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
    .archive-app .archive-viewport .material-text :is(span, strong, em, small, a, p),
    .archive-app .archive-viewport .material-text * {
      background: none !important; -webkit-text-fill-color: CanvasText !important;
      color: CanvasText !important; filter: none !important; text-shadow: none !important; -webkit-text-stroke: 0 !important;
    }
  }
`;
