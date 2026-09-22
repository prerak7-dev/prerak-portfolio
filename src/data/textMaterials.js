// Cut-paper faces, pigment at the cut edge, and a restrained impression for prose.
export const TEXT_MATERIALS = Object.freeze({
  default: { name: 'Silver graphite', face: '#fcfaf2', fold: '#bfc6c9', edge: '#89989f', ink: '#eeeee9', accent: '#e4ca8d', light: '#ffffff', shade: '#080d12', halo: '#080b10', grain: '310px', angle: '158deg' },
  'default-light': { name: 'Graphite impression', face: '#626970', fold: '#253139', edge: '#344047', ink: '#27333b', accent: '#765923', light: '#ffffff', shade: '#bbc0c1', halo: '#f4f4ef', grain: '310px', angle: '158deg' },
  fall: { name: 'Copper leaf', face: '#fff0db', fold: '#d7ad91', edge: '#aa6950', ink: '#f2e7dc', accent: '#efbe91', light: '#fff8e6', shade: '#28120f', halo: '#150d0c', grain: '240px', angle: '145deg' },
  'fall-light': { name: 'Burnished copper', face: '#8a5f49', fold: '#49302d', edge: '#78432c', ink: '#453332', accent: '#86451e', light: '#fff7e6', shade: '#c6b5a7', halo: '#f9f1e8', grain: '240px', angle: '145deg' },
  spring: { name: 'Petal porcelain', face: '#fff2f7', fold: '#d7bbce', edge: '#9c758f', ink: '#f0e9ef', accent: '#ebbdcf', light: '#fffaff', shade: '#211323', halo: '#120e19', grain: '360px', angle: '170deg' },
  'spring-light': { name: 'Rose ink', face: '#85667e', fold: '#413247', edge: '#84516d', ink: '#3d3442', accent: '#80394f', light: '#fffaff', shade: '#c7b9c2', halo: '#f8f4f6', grain: '360px', angle: '170deg' },
  winter: { name: 'Glacial paper', face: '#f6fdff', fold: '#b0d2e3', edge: '#6a9dbd', ink: '#eaf2f5', accent: '#bbdfed', light: '#ffffff', shade: '#101d2a', halo: '#07121d', grain: '190px', angle: '150deg' },
  'winter-light': { name: 'Glacier etching', face: '#5e7a8c', fold: '#233c4f', edge: '#345e7e', ink: '#253b4b', accent: '#285575', light: '#ffffff', shade: '#b6c6cf', halo: '#f3f8fb', grain: '190px', angle: '150deg' },
});

export const TEXT_TARGET_SELECTOR = [
  'h1', 'h2', 'h3', 'h4', 'p', 'strong', 'small', 'em', 'dt', 'dd', 'code',
  'button', 'a', 'li', '.intro-status', '.chapter-heading > span',
  '.timeline-focus-card > span', '.personal-collection-copy > span',
  '.focus-pager > span', '.home-beat-controls > span', '.timeline-axis > span',
].join(',');

export const TEXT_RELIEF_SELECTOR = 'h1, h2, h3, h4, .intro-role, .archive-identity strong, .field-note-placeholder strong';
