import { isLightAppearance } from '../data/themeAppearance.js';

const vignetteStrength = theme => theme === 'boot' || isLightAppearance(theme) ? 0 : 1;

export function getThemeVignetteOpacity(theme, transition) {
  if (!transition?.active) return vignetteStrength(theme);
  const progress = Math.max(0, Math.min(1, Number.isFinite(transition.progress) ? transition.progress : 0));
  const from = vignetteStrength(transition.fromTheme);
  const to = vignetteStrength(transition.toTheme);
  return from + (to - from) * progress;
}
