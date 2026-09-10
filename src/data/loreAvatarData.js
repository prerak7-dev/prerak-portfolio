import { APPEARANCE_IDS, paintedAsset } from './themeAppearance.js';
import { createAssetPath } from '../security/contentSecurity.js';

const AVATARS_BY_THEME = Object.freeze(Object.fromEntries(APPEARANCE_IDS.map(theme => {
  const src = createAssetPath(import.meta.env.BASE_URL, paintedAsset(theme, 'avatar'));
  return [theme, Object.freeze({ kind: src, noble: src, heroic: src })];
})));

const MOOD_BY_CHAPTER = Object.freeze({
  intro: 'kind',
  cores: 'noble',
  projects: 'heroic',
  professional: 'noble',
  education: 'noble',
  personal: 'heroic',
  contact: 'kind',
});

export const loreAvatarSources = Object.freeze(
  [...new Set(Object.values(AVATARS_BY_THEME).flatMap((avatars) => Object.values(avatars)))],
);

export function getLoreAvatarState(theme, chapterId) {
  const resolvedTheme = AVATARS_BY_THEME[theme] ? theme : 'default';
  const mood = MOOD_BY_CHAPTER[chapterId] || 'kind';
  return Object.freeze({
    mood,
    src: AVATARS_BY_THEME[resolvedTheme][mood],
    theme: resolvedTheme,
  });
}
