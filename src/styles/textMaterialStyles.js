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
  .archive-viewport[data-text-dissolving] .contour-content { transition: none; }
  .archive-viewport .contour-focus[data-contour-revealed="true"]:not(.is-leaving) { animation: none; }
  .archive-app .material-text.scenic-text { animation-name: none; }
  @media (min-width: 1101px) and (min-height: 701px) {
    .archive-app .archive-viewport .chapter-rail.is-orbit-rail .material-text.scenic-text {
      animation-name: chapterLabelOrbit;
    }
  }
  .text-contour-ghosts { position: fixed; inset: 0; z-index: 90; pointer-events: none; overflow: hidden; }
  .text-contour-ghosts * { pointer-events: none !important; }
  @media (forced-colors: active) {
    .archive-app .archive-viewport .material-text,
    .archive-app .archive-viewport .material-text * {
      background: none !important; -webkit-text-fill-color: CanvasText !important;
      color: CanvasText !important; filter: none !important; text-shadow: none !important; -webkit-text-stroke: 0 !important;
    }
  }
`;
