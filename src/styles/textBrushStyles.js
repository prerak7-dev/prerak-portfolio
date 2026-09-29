export const textBrushStyles = `
  .archive-viewport { --brush-pigment: color-mix(in srgb, var(--type-accent) 32%, var(--type-shade)); }
  .archive-viewport[class*="-light"] { --brush-pigment: color-mix(in srgb, var(--type-accent) 17%, var(--type-halo)); }
  .archive-viewport .text-brush-layer {
    position: absolute; inset: 0; z-index: 4; overflow: hidden; pointer-events: none;
    contain: strict;
  }
  .archive-viewport .text-brush-wash {
    position: absolute; inset: 0; pointer-events: none;
  }
  .archive-viewport .text-brush-wash > i {
    position: absolute; display: block; pointer-events: none; opacity: .92;
    background-color: var(--brush-pigment);
    background-image: url('${import.meta.env.BASE_URL}cinematic/ui/watercolor-paper-fiber-overlay-v1.webp');
    background-size: var(--brush-grain) auto; background-blend-mode: multiply;
    mask: url('${import.meta.env.BASE_URL}cinematic/painted-v1/ui/loader-brush.webp') center / 100% 190% no-repeat;
  }
  @media (any-hover: hover) {
    .archive-viewport .material-text { pointer-events: auto; }
  }
  @media (forced-colors: active) {
    .archive-viewport .text-brush-layer { display: none; }
  }
`;
