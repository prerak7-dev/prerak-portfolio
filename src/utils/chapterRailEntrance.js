import { createRailJourney } from './chapterRailLayout.js';

export const RAIL_ENTRANCE_MS = 1800;
export const RAIL_ENTRANCE_STAGGER_MS = 60;

export function createRailEntranceKeyframes(compact = false) {
  const destination = [{ x: 0, y: 0, width: 0, height: 0 }];
  const origin = [{ ...destination[0], x: compact ? 0 : -140, y: compact ? -18 : 70 }];
  const bounds = compact
    ? { left: -18, right: 18, top: -24, bottom: 8 }
    : { left: -200, right: 120, top: -150, bottom: 150 };
  const journey = createRailJourney(origin, destination, bounds);
  return Array.from({ length: 121 }, (_, index) => {
    const offset = index / 120;
    const { x, y } = journey(offset)[0];
    const reveal = Math.min(1, offset / .38);
    return {
      offset,
      translate: `${x}px ${y}px`,
      opacity: reveal * reveal * (3 - 2 * reveal),
    };
  });
}
