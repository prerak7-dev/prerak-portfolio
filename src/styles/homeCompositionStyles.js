import { HOME_COMPACT_QUERY, NAV_COMPACT_QUERY, NAV_LANDSCAPE_QUERY } from '../utils/homeCompositionLayout.js';

export const homeCompositionStyles = `
  .archive-viewport .archive-header { z-index: 40; pointer-events: none; }
  .archive-header :is(button, a) { pointer-events: auto; }
  .archive-viewport .chapter-rail .chapter-rail-list { scroll-snap-type: none !important; scroll-behavior: auto !important; }
  .archive-app .archive-viewport .chapter-rail .chapter-rail-list button strong { scale: 1 !important; }
  .archive-app .lore-parchment p { font-size: 24.225px; line-height: 1.45; }
  .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list strong {
    width: max-content; max-width: 156px; padding: 10px 0; white-space: nowrap;
    pointer-events: auto; cursor: pointer;
  }
  .archive-viewport .chapter-rail.is-orbit-rail .chapter-celestial-marker { pointer-events: auto; cursor: pointer; }
  .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button { pointer-events: auto; }
  .archive-viewport .chapter-rail.is-orbit-rail.is-collapsed .chapter-rail-list :is(strong, .chapter-celestial-marker) { pointer-events: none; }
  @media (orientation: landscape), (min-width: 1101px) and (pointer: fine) {
  .archive-app .archive-viewport .chapter-rail[data-layout="contour"] {
    position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important;
    padding: 0; transform: none !important; pointer-events: none;
  }
  .archive-app .archive-viewport .chapter-rail[data-layout="contour"] .chapter-rail-list {
    position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important;
    display: block !important; overflow: visible !important; transform: none !important; pointer-events: none;
  }
  .archive-app .archive-viewport .chapter-rail.is-orbit-ready .chapter-rail-list button {
    position: absolute !important; inset: 0 auto auto 0 !important;
    width: var(--chapter-tab-width, 160px) !important;
    height: 44px !important; min-height: 44px !important;
    display: flex !important; align-items: center; justify-content: flex-start;
    gap: 8px; padding: 0 6px !important;
    transform: translate3d(var(--chapter-tab-x, 0px), var(--chapter-tab-y, 0px), 0);
    translate: var(--chapter-drift-x, 0px) var(--chapter-drift-y, 0px);
    transition: none !important;
  }
  @media ${NAV_LANDSCAPE_QUERY} {
    .archive-app .archive-viewport .chapter-rail.is-orbit-ready[data-layout="contour"] .chapter-celestial-marker {
      width: 19.2px !important; height: 19.2px !important; flex-basis: 19.2px;
    }
    .archive-app .archive-viewport .chapter-rail[data-scrollable="true"] .chapter-rail-list {
      overflow-x: auto !important; overflow-y: hidden !important; scrollbar-width: none;
      overscroll-behavior: contain; opacity: 1;
    }
    .archive-app .archive-viewport .chapter-rail[data-scrollable="true"] .chapter-rail-list::after {
      content: ''; display: block; width: calc(100% + var(--chapter-scroll-range, 0px)); height: 1px; pointer-events: none;
    }
    .archive-app .archive-viewport .chapter-rail[data-scrollable="true"] .chapter-rail-list button {
      position: fixed !important; touch-action: none;
      clip-path: var(--chapter-tab-clip, none) !important;
    }
    .archive-app .archive-viewport .chapter-rail[data-scrollable="true"] .chapter-rail-list button:not([aria-hidden="true"]) { opacity: 1; pointer-events: auto; }
    .archive-app .archive-viewport .chapter-rail[data-layout="contour"] .chapter-collapse { display: none; }
    .archive-app .archive-viewport .chapter-rail[data-scrollable="true"] .chapter-scroll-arrow {
      display: grid; place-items: center; position: absolute; top: var(--mobile-nav-top, 70px);
      width: 44px; height: 44px; padding: 0; pointer-events: auto; z-index: 5;
    }
    .archive-app .archive-viewport .chapter-rail[data-scrollable="true"] .chapter-scroll-arrow.previous { left: auto; right: 56px; }
    .archive-app .archive-viewport .chapter-rail[data-scrollable="true"] .chapter-scroll-arrow.next { left: auto; right: 12px; }
  }
  .archive-app .archive-viewport .chapter-rail.is-orbit-ready .chapter-celestial-marker {
    position: relative !important; inset: auto !important;
    width: 24px !important; height: 24px !important; flex: 0 0 24px;
    scale: 1 !important; transform: none !important; animation: none !important; transition: none !important;
  }
  .archive-app .archive-viewport .chapter-rail.is-orbit-ready .chapter-rail-list strong {
    position: relative !important; inset: auto !important; flex: none;
    width: max-content; max-width: none; padding: 0;
    font-size: 16px; line-height: 1.2; text-align: left; white-space: nowrap;
    transform: none !important; animation: none !important;
  }
  }
  .archive-app .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button > * { pointer-events: none; }
  .archive-app .archive-viewport .chapter-rail.is-orbit-ready.is-collapsed .chapter-rail-list button { pointer-events: none; }

  .archive-viewport .home-composition .intro-copy-stage {
    inset: 0; width: 100%; height: 100%; display: block; pointer-events: none;
  }
  .archive-viewport .home-composition .intro-copy-stage > * {
    position: absolute; margin: 0; padding: 0; max-width: none;
  }
  .archive-viewport .home-composition .intro-manifesto {
    left: var(--home-sky-left); top: var(--home-sky-top);
    width: var(--home-motto-width); gap: 6px;
  }
  .archive-viewport .home-composition .intro-manifesto-line { font-size: 16px; line-height: 1.25; }
  .archive-viewport .home-composition .intro-manifesto-line { transform: translateX(calc(var(--manifesto-index) * 12px)); }
  .archive-viewport .home-composition .intro-role-orbit {
    left: calc(var(--home-sky-left) + var(--home-motto-width) + 24px); top: var(--home-sky-top);
    width: calc(var(--home-sky-width) - var(--home-motto-width) - 24px);
  }
  .archive-viewport .home-composition .intro-role-orbit::before { display: none; }
  .archive-viewport .home-composition .intro-copy-stage .intro-role {
    width: 100%; min-height: 0; font-size: var(--home-role-size, 28px); line-height: 1.12; overflow-wrap: normal;
  }
  .archive-viewport .home-composition .intro-actions {
    left: var(--home-water-left); top: var(--home-water-top); width: 170px;
  }
  .archive-viewport .home-composition .intro-actions a { pointer-events: auto; padding: 8px 0; min-height: 44px; font-size: 17px; }
  .archive-viewport .home-composition .intro-gate-entry { left: var(--home-gate-left); top: var(--home-gate-top); }
  .home-beat-controls { display: none; }

  @media ${HOME_COMPACT_QUERY} {
    .archive-viewport { --mobile-header-top: max(10px, env(safe-area-inset-top)); --mobile-nav-top: calc(var(--mobile-header-top) + 60px); --mobile-dock-bottom: calc(18px + env(safe-area-inset-bottom)); }
    .archive-viewport .archive-header { position: fixed; top: var(--mobile-header-top); left: max(12px, env(safe-area-inset-left)); right: max(12px, env(safe-area-inset-right)); height: 52px; gap: 12px; }
    .archive-viewport .archive-identity { flex: 1; gap: 8px; padding: 0; }
    .archive-viewport .archive-identity .profile-avatar { flex: none; width: 36px; height: 36px; }
    .archive-viewport .archive-identity strong { font-size: 18px; line-height: 1.1; }
    .archive-viewport .archive-identity small { display: none; }
    .archive-viewport .archive-header-actions { flex: none; padding: 0; gap: 8px; }
    .archive-viewport .archive-header-actions a { min-height: 44px; padding: 0 4px; font-size: 15px; }
  }
  @media ${NAV_COMPACT_QUERY} {
    .archive-viewport .chapter-rail.is-orbit-rail,
    .archive-viewport .chapter-rail.is-orbit-rail.is-collapsed {
      position: fixed !important; inset: var(--mobile-nav-top) 8px auto !important;
      width: calc(100% - 16px) !important; height: 52px !important;
      display: block !important;
      opacity: 1; z-index: 30; pointer-events: auto; padding: 0 34px; transform: none !important;
    }
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-collapse { display: none; }
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list,
    .archive-viewport .chapter-rail.is-orbit-rail.is-collapsed .chapter-rail-list {
      position: static !important; inset: auto !important; display: flex !important; align-items: center;
      width: 100% !important; height: 52px !important; overflow-x: auto !important; overflow-y: hidden !important;
      scrollbar-width: none; gap: 4px; opacity: 1; transform: none !important; pointer-events: auto;
      overscroll-behavior-x: contain; touch-action: pan-x; scroll-padding-inline: 8px;
    }
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button,
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button.active,
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list button:hover {
      position: relative !important; inset: auto !important; width: auto !important;
      height: 48px !important; min-height: 48px !important; flex: none; display: flex !important;
      align-items: center; justify-content: center; gap: 3px; padding: 0 7px !important;
      opacity: 1; pointer-events: auto; transform: none !important; background: transparent !important;
      transition: none !important;
    }
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-celestial-marker {
      position: relative !important; inset: auto !important; flex: none; width: 19.2px !important;
      height: 19.2px !important; scale: 1 !important; transform: none !important; animation: none !important;
    }
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-rail-list strong.scenic-text {
      position: relative !important; inset: auto !important; width: max-content; padding: 0;
      font-size: 16px; line-height: 1.2; transform: none !important; transform-origin: left center;
      animation: none !important; opacity: 1; pointer-events: auto;
    }
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-scroll-arrow {
      display: grid; place-items: center; position: absolute; top: 4px;
      width: 32px; height: 44px; z-index: 3; padding: 0; pointer-events: auto;
    }
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-scroll-arrow.previous { left: 0; }
    .archive-viewport .chapter-rail.is-orbit-rail .chapter-scroll-arrow.next { right: 0; }
  }
  @media ${HOME_COMPACT_QUERY} {
    .archive-viewport .home-composition .intro-copy-stage {
      inset: 76px 20px 190px; width: auto; height: auto; display: flex;
      flex-direction: column; justify-content: flex-start; gap: 16px;
      overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin;
      pointer-events: auto;
    }
    .archive-viewport .home-composition .intro-copy-stage > * {
      position: relative; inset: auto; width: 100%; height: auto;
      max-height: none; display: block; flex: none;
    }
    .archive-viewport .home-composition .intro-manifesto { display: flex; flex-wrap: wrap; gap: 0 6px; }
    .archive-viewport .home-composition .intro-manifesto-line { transform: none; font-size: 16px; }
    .archive-viewport .home-composition .intro-role-orbit { display: grid; }
    .archive-viewport .home-composition .intro-copy-stage .intro-role { font-size: 24px; line-height: 1.08; }
    .archive-viewport .home-composition .intro-copy-stage .intro-status { font-size: 16px; line-height: 1.3; }
    .archive-viewport .home-composition .intro-actions a { font-size: 18px; }
    .archive-viewport .home-composition .intro-gate-entry {
      top: auto; bottom: calc(136px + env(safe-area-inset-bottom)); left: auto; right: 14px;
      width: 158px; transform: none !important;
    }
    .archive-viewport .home-composition .intro-gate-cta { width: 158px; min-width: 0; min-height: 44px; padding: 4px 6px; font-size: 16px; }
    .archive-viewport .spatial-hud.theme-switcher {
      position: fixed; inset: auto auto var(--mobile-dock-bottom) max(10px, env(safe-area-inset-left));
      padding: 9px 11px; transform: none !important; translate: none; animation: none; transition: none;
    }
    .archive-viewport .archive-progress { display: none; }
    .archive-viewport .theme-switcher .theme-icon-row { gap: 0; }
    .archive-viewport .theme-switcher .theme-icon-row button { width: 44px; height: 44px; min-width: 44px; }
    .archive-viewport .theme-switcher .appearance-toggle { margin-left: 6px; }
    .archive-viewport .theme-icon-row button:first-child .theme-icon-tooltip { left: 0; transform: none; }
    .home-beat-controls {
      position: absolute; display: flex; align-items: center; justify-content: flex-end;
      pointer-events: auto;
      top: auto; bottom: calc(136px + env(safe-area-inset-bottom)); left: 12px; right: auto; gap: 0; z-index: 3;
      transform: none;
    }
    .home-beat-controls button { display: grid; place-items: center; width: 44px; height: 44px; background: none; border: 0; padding: 6px; color: var(--ink); cursor: pointer; }
    .home-beat-controls button:disabled { opacity: .25; cursor: default; }
    .home-beat-controls button:focus-visible { outline: 2px solid var(--accent); }
    .home-beat-controls svg { width: 20px; height: 20px; }
    .home-beat-controls span { font: 13px/1 var(--font-navigation); min-width: 34px; text-align: center; }
    .archive-app .archive-viewport .spatial-lore-guide,
    .archive-app .archive-viewport .spatial-lore-guide.is-collapsed {
      position: fixed; inset: 0 !important; width: 100%; height: 100%; min-height: 0;
      padding: 0; scale: 1; transform: none !important; translate: none; animation: none; pointer-events: none;
    }
    .archive-app .archive-viewport .spatial-lore-guide .lore-medallion {
      position: absolute; left: auto; right: max(12px, env(safe-area-inset-right)); top: auto; bottom: var(--mobile-dock-bottom);
      width: 64px; height: 64px; transform: none;
    }
    .archive-app .archive-viewport .spatial-lore-guide .lore-toggle {
      position: absolute; inset: auto max(12px, env(safe-area-inset-right)) var(--mobile-dock-bottom) auto;
      width: 64px; height: 64px; transform: none; pointer-events: auto;
    }
    .archive-app .archive-viewport .spatial-lore-guide .lore-toggle .triangle-pointer { position: absolute; left: 0; top: 26px; }
    .archive-app .archive-viewport .spatial-lore-guide .lore-parchment {
      position: absolute; left: auto; right: max(20px, env(safe-area-inset-right)); top: calc(var(--mobile-header-top) + 72px); bottom: calc(var(--mobile-dock-bottom) + 82px);
      width: min(440px, calc(100% - 40px)); max-height: none; min-height: 0; height: auto;
      display: block;
      padding: 6px 8px 12px; overflow: auto; overscroll-behavior: contain;
      scrollbar-width: thin; transform: none; clip-path: none;
    }
    .archive-app .archive-viewport .spatial-lore-guide .lore-parchment p { font-size: 19.38px; line-height: 1.45; }
    .archive-app .archive-viewport:has(.spatial-lore-guide:not(.is-collapsed)) .archive-scene-stack {
      opacity: 0; visibility: hidden; pointer-events: none;
    }
    .archive-app .archive-viewport:has(.spatial-lore-guide:not(.is-collapsed)) .archive-scene-stack * {
      visibility: hidden !important; pointer-events: none !important;
    }
    .archive-viewport .contour-content { overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; gap: 10px; }
    .archive-viewport .contour-content .contour-focus { flex: 1 0 auto; min-height: min-content; padding-block: 12px; }
    .archive-viewport .contour-content footer { padding-block: 4px; }
    .archive-viewport .contour-content h2 { font-size: 30px; }
    .archive-viewport .contour-content h3 { font-size: 25px; }
    .archive-viewport .contour-content p { font-size: 19px; }
    .archive-viewport .case-focus-modes button { width: 44px; }
    .archive-viewport .case-focus-modes button span { display: none; }
  }
  @media ${NAV_COMPACT_QUERY} {
    .archive-viewport .home-composition .intro-copy-stage { top: calc(var(--mobile-nav-top) + 64px); bottom: calc(var(--mobile-dock-bottom) + 90px); }
    .archive-app .archive-viewport .spatial-lore-guide .lore-parchment { top: calc(var(--mobile-nav-top) + 64px); }
  }
  @media ${NAV_LANDSCAPE_QUERY} {
    .archive-viewport .home-composition .intro-copy-stage { top: calc(var(--mobile-header-top) + 72px); right: calc(38% + 16px); bottom: calc(var(--mobile-dock-bottom) + 138px); }
    .archive-viewport .home-composition .intro-gate-entry { left: 20px; right: auto; bottom: calc(var(--mobile-dock-bottom) + 78px); }
  }
  @media (max-height: 700px) {
    .archive-viewport .contour-content { gap: 4px; }
    .archive-viewport .contour-content h2 { font-size: 24px; }
    .archive-viewport .contour-content h3 { font-size: 21px; margin-bottom: 6px; }
    .archive-viewport .contour-content p { font-size: 17px; line-height: 1.3; }
    .archive-viewport .contour-content .contour-focus { padding-block: 6px; }
    .archive-viewport .home-composition .intro-copy-stage .intro-status { font-size: 14px; line-height: 1.3; }
  }
  @media (max-width: 360px) {
    .archive-viewport .theme-switcher .theme-icon-row button { width: 36px; min-width: 36px; padding: 6px; }
    .archive-viewport .archive-identity strong { font-size: 15px; }
    .archive-viewport .archive-header-actions { gap: 4px; }
    .archive-viewport .archive-header-actions a { font-size: 13px; }
  }
  @media (max-height: 500px) and (min-width: 600px) {
    .archive-viewport .contour-content { display: flex; flex-direction: column; gap: 12px; }
    .archive-viewport .contour-content .contour-focus { justify-content: flex-start; padding: 0; }
    .archive-viewport .contour-content .contour-eyebrow { margin-bottom: 4px; font-size: 13px; }
    .archive-viewport .contour-content p { font-size: 16px; line-height: 1.25; }
    .archive-viewport .contour-cores > header { grid-column: 1; grid-row: 1; }
    .archive-viewport .contour-cores > article { grid-column: 2; grid-row: 1; }
    .archive-viewport .contour-cores > footer { grid-column: 1 / -1; grid-row: 2; }
    .archive-viewport .contour-projects { grid-template-rows: 30px 1fr 44px; }
    .archive-viewport .contour-projects > header { grid-column: 1; grid-row: 1; }
    .archive-viewport .contour-projects > nav { grid-column: 1; grid-row: 2; align-self: start; }
    .archive-viewport .contour-projects .case-focus-modes { grid-column: 1; grid-row: 3; }
    .archive-viewport .contour-projects > article { grid-column: 2; grid-row: 1 / 3; }
    .archive-viewport .contour-projects > footer { grid-column: 2; grid-row: 3; }
    .archive-viewport .contour-projects .contour-project-tabs { gap: 0; }
    .archive-viewport .contour-projects .contour-project-tabs button { padding-inline: 6px; }
  }
`;
