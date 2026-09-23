import { TEXT_TARGET_SELECTOR } from '../data/textMaterials.js';

export function findTextTargets(root) {
  const candidates = [...root.querySelectorAll(TEXT_TARGET_SELECTOR)].filter(node =>
    node.textContent.trim() && !node.matches('.theme-switcher button, .lore-toggle')
    && !node.querySelector('img, canvas, svg, button, h1, h2, h3, p')
    && !(node.matches('span') && node.querySelector('strong, small'))
    && !node.closest('.cinematic-environment, .spatial-world, [aria-hidden="true"] svg'));
  const eligible = new Set(candidates);
  return candidates.filter(node => {
    for (let parent = node.parentElement; parent && parent !== root; parent = parent.parentElement) {
      if (eligible.has(parent)) return false;
    }
    return true;
  });
}
