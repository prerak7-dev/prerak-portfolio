export const adaptiveInkStyles = `
  .archive-app .archive-viewport [data-adaptive-ink] {
    --type-pigment-cover: 94% !important;
    --type-ink-load: 100% !important;
  }
  .archive-app .archive-viewport [data-adaptive-ink][data-ink-blend] {
    transition: var(--ink-wash-transition, none) !important;
  }
  .archive-app .archive-viewport [data-adaptive-ink="control"],
  .archive-app .archive-viewport [data-adaptive-ink="control"] svg {
    color: var(--type-ink-color) !important;
    text-shadow: none !important;
  }
  .archive-app .archive-viewport .material-text :is(span, strong, em, small, a, p) {
    --ink-wash-images: none; --ink-wash-sizes: auto; --ink-wash-positions: 0 0;
    --ink-wash-clips: border-box; --ink-wash-repeats: no-repeat; --ink-wash-blends: normal;
  }
  .archive-app .archive-viewport [data-adaptive-ink="control"] {
    background-image: var(--ink-wash-images, none) !important;
    background-size: var(--ink-wash-sizes, auto) !important;
    background-position: var(--ink-wash-positions, 0 0) !important;
    background-repeat: no-repeat !important;
  }
  @media (forced-colors: active) {
    .archive-app .archive-viewport [data-adaptive-ink] {
      background: none !important; color: CanvasText !important;
      -webkit-text-fill-color: CanvasText !important;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .archive-app .archive-viewport [data-adaptive-ink][data-ink-blend] {
      transition: none !important;
    }
  }
`;
