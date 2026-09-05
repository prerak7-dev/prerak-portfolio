import defaultHeroic from '../../content/lore-guide/default-heroic-v2.webp';
import defaultKind from '../../content/lore-guide/default-kind-v2.webp';
import defaultNoble from '../../content/lore-guide/default-noble-v2.webp';
import fallHeroic from '../../content/lore-guide/fall-heroic-v2.webp';
import fallKind from '../../content/lore-guide/fall-kind-v2.webp';
import fallNoble from '../../content/lore-guide/fall-noble-v2.webp';
import springHeroic from '../../content/lore-guide/spring-heroic-v2.webp';
import springKind from '../../content/lore-guide/spring-kind-v2.webp';
import springNoble from '../../content/lore-guide/spring-noble-v2.webp';
import winterHeroic from '../../content/lore-guide/winter-heroic-v2.webp';
import winterKind from '../../content/lore-guide/winter-kind-v2.webp';
import winterNoble from '../../content/lore-guide/winter-noble-v2.webp';

const AVATARS_BY_THEME = Object.freeze({
  default: Object.freeze({ kind: defaultKind, noble: defaultNoble, heroic: defaultHeroic }),
  fall: Object.freeze({ kind: fallKind, noble: fallNoble, heroic: fallHeroic }),
  spring: Object.freeze({ kind: springKind, noble: springNoble, heroic: springHeroic }),
  winter: Object.freeze({ kind: winterKind, noble: winterNoble, heroic: winterHeroic }),
});

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
  Object.values(AVATARS_BY_THEME).flatMap((avatars) => Object.values(avatars)),
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
