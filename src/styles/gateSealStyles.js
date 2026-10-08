export const gateSealStyles = `
  .archive-app .archive-viewport .home-composition .intro-gate-entry.gate-seal-entry {
    position: absolute; left: calc(var(--gate-seal-x, 50%) - 100px); top: var(--gate-seal-y, 55%);
    right: auto; bottom: auto; width: 200px; height: 0; margin: 0; padding: 0;
    transform: none !important; translate: none !important; scale: 1;
    pointer-events: none; z-index: 15;
  }
  .archive-app .archive-viewport .home-composition .gate-seal-entry:not([data-seal-placed]) { visibility: hidden; }
  .archive-app .archive-viewport .gate-seal-control {
    position: absolute; left: calc(50% - var(--gate-seal-target) / 2); top: calc(var(--gate-seal-target) / -2);
    width: var(--gate-seal-target); height: var(--gate-seal-target); min-width: 48px; min-height: 48px;
    display: grid; place-items: center; padding: 0; margin: 0; border: 0; border-radius: 50%;
    background: none; box-shadow: none; appearance: none; cursor: pointer; pointer-events: auto;
    touch-action: none; user-select: none; -webkit-tap-highlight-color: transparent;
    transform: none; transition: none; overflow: visible;
  }
  .archive-app .archive-viewport .gate-seal-control:focus-visible {
    outline: 2px solid var(--type-accent); outline-offset: 3px;
  }
  .archive-app .archive-viewport .home-composition .gate-seal-entry .intro-gate-scroll-shell {
    position: absolute; inset: calc(var(--gate-seal-target) / 2 + 2px) 0 auto;
    width: 100%; height: 44px; will-change: auto;
  }
  .archive-app .archive-viewport .home-composition .gate-seal-entry .intro-gate-cta {
    width: max-content; min-width: 140px; max-width: 200px; height: 44px; min-height: 44px;
    padding: 6px 10px; margin: 0; font-size: 18px; line-height: 1.2;
    letter-spacing: 0; text-align: center; white-space: nowrap; pointer-events: auto;
    transform: none !important; scale: 1; will-change: auto;
  }
  .archive-app .archive-viewport .home-composition .gate-seal-entry .intro-gate-cta:focus-visible {
    outline: 2px solid var(--type-accent); outline-offset: 2px;
  }
  .archive-app .archive-viewport .gate-seal-status {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0;
  }
  @media (max-width: 700px), (max-height: 500px) {
    .archive-app .archive-viewport .home-composition .gate-seal-entry .intro-gate-cta { font-size: 16px; }
  }
  @media (forced-colors: active) {
    .archive-app .archive-viewport .gate-seal-control { outline: 2px solid ButtonText; }
    .archive-app .archive-viewport .gate-seal-entry .intro-gate-cta { color: ButtonText; }
  }
`;
