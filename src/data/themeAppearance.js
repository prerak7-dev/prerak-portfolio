export const SEASONS = Object.freeze(['default', 'fall', 'spring', 'winter']);
export const APPEARANCE_IDS = Object.freeze(SEASONS.flatMap(season => [season, `${season}-light`]));

const PAINTED_SCENES = Object.freeze(['home', 'cores', 'systems', 'chronology', 'field', 'surface']);

export function hasPaintedScene(theme, scene) {
  return APPEARANCE_IDS.includes(theme) && PAINTED_SCENES.includes(scene);
}

export function getSeason(theme = 'default') {
  const season = theme.replace(/-light$/, '');
  return SEASONS.includes(season) ? season : 'default';
}

export function isLightAppearance(theme = '') {
  return theme.endsWith('-light');
}

export function appearanceId(season, light) {
  return `${getSeason(season)}${light ? '-light' : ''}`;
}

export function paintedAsset(theme, name) {
  return `cinematic/painted-v1/${getSeason(theme)}/${isLightAppearance(theme) ? 'light' : 'dark'}/${name}.webp`;
}
