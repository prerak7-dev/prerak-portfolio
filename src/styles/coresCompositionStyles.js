export const coresCompositionStyles = `
  .archive-app .archive-viewport .contour-cores {
    position: absolute; inset: 0; width: 100%; height: 100%;
    display: block; margin: 0; padding: 0; overflow: visible; pointer-events: none;
  }
  .archive-app .archive-viewport .contour-cores :is(.cores-chapter-heading, .core-detail, .core-sun, footer) {
    position: absolute; left: var(--core-left); top: var(--core-top);
    width: var(--core-width); height: var(--core-height); margin: 0;
  }
  .archive-app .archive-viewport .cores-chapter-heading h2 { font-size: 36px; line-height: 1.15; }
  .archive-app .archive-viewport .cores-chapter-heading .cores-chapter-subtitle { font-size: 20px; line-height: 1.3; margin-top: 8px; }
  .archive-app .archive-viewport .core-suns { position: absolute; inset: 0; pointer-events: none; }
  .archive-app .archive-viewport .contour-cores .core-sun {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px; padding: 0 2px; min-height: 44px; pointer-events: auto;
    background: none; border: 0; text-decoration: none; white-space: nowrap;
  }
  .archive-app .archive-viewport .core-sun-name {
    font-family: var(--font-display) !important; font-size: 30px; font-weight: 600;
    line-height: 1.15; text-transform: uppercase; letter-spacing: 0;
  }
  .archive-app .archive-viewport .core-sun-ordinal {
    font: 13px/1 var(--font-navigation); opacity: .7;
  }
  .archive-app .archive-viewport .core-sun::after {
    content: ''; position: absolute; top: calc(100% - 3px); left: calc(50% - 18px);
    width: 36px; height: 3px; background: var(--type-accent); visibility: hidden;
    mask: url('${import.meta.env.BASE_URL}cinematic/painted-v1/ui/loader-brush.webp') center / 100% 100% no-repeat;
  }
  .archive-app .archive-viewport .core-sun:is(:hover, :focus-visible, [aria-expanded="true"])::after { visibility: visible; }
  .archive-app .archive-viewport .core-sun:focus-visible { outline: 1px solid var(--type-accent); outline-offset: 4px; }
  .archive-app .archive-viewport .core-detail { display: flex; flex-direction: column; gap: 12px; pointer-events: auto; }
  .archive-app .archive-viewport .core-detail:empty { pointer-events: none; }
  .archive-app .archive-viewport .core-detail .core-detail-ordinal { font: 16px/1.2 var(--font-navigation); color: var(--accent); }
  .archive-app .archive-viewport .core-detail .core-detail-copy { font: 26px/1.5 var(--font-navigation); margin: 0; overflow-wrap: normal; }
  .archive-app .archive-viewport .contour-cores footer { width: auto; height: 44px; padding: 0; pointer-events: auto; }
  .archive-app .archive-viewport .contour-cores footer button { padding: 0; }
  .archive-app .archive-viewport .contour-cores[data-portrait="true"] .cores-chapter-heading h2 { font-size: 28px; }
  .archive-app .archive-viewport .contour-cores[data-portrait="true"] .cores-chapter-subtitle { font-size: 18px; }
  .archive-app .archive-viewport .contour-cores[data-portrait="true"] .core-sun-name { font-size: 22px; }
  .archive-app .archive-viewport .contour-cores[data-portrait="true"] .core-detail { text-align: center; gap: 8px; }
  .archive-app .archive-viewport .contour-cores[data-portrait="true"] .core-detail-copy { font-size: 21px; line-height: 1.45; }
  .archive-app .archive-viewport .contour-cores[data-short="true"] .cores-chapter-heading .contour-eyebrow,
  .archive-app .archive-viewport .contour-cores[data-short="true"] :is(.core-sun-ordinal, .core-detail-ordinal) { display: none; }
  .archive-app .archive-viewport .contour-cores[data-short="true"] .cores-chapter-heading h2 { font-size: 22px; line-height: 1.1; }
  .archive-app .archive-viewport .contour-cores[data-short="true"] .cores-chapter-subtitle { font-size: 15px; margin-top: 4px; }
  .archive-app .archive-viewport .contour-cores[data-short="true"] .core-detail-copy { font-size: 16px; line-height: 1.25; }
  .archive-app .archive-viewport .contour-cores[data-short="true"] .core-sun-name { font-size: 22px; }
  @media (max-width: 360px) {
    .archive-app .archive-viewport .contour-cores[data-portrait="true"] .core-sun-name { font-size: 18px; }
  }
  @media (max-width: 700px) and (orientation: landscape) {
    .archive-app .archive-viewport .contour-cores footer button { width: 44px; justify-content: center; }
    .archive-app .archive-viewport .contour-cores footer span { display: none; }
    .archive-app .archive-viewport .contour-cores[data-short="true"] .cores-chapter-heading h2 { font-size: 20px; }
  }
  @media (min-width: 1200px) and (min-height: 600px) {
    .archive-app .archive-viewport[data-chapter="cores"] .spatial-lore-guide .lore-parchment {
      bottom: var(--core-lore-bottom, 45vh); width: min(340px, 20vw);
      max-height: var(--core-lore-height, 200px);
    }
  }
`;
