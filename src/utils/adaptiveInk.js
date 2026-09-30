const linear = Array.from({ length: 256 }, (_, value) => {
  const channel = value / 255;
  return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
});

export const INK_CONTRAST = 4.8;
export const inkLuminance = rgb => .2126 * linear[rgb[0]] + .7152 * linear[rgb[1]] + .0722 * linear[rgb[2]];
export const inkContrast = (a, b) => (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
export const inkRgb = hex => hex.match(/[a-f\d]{2}/gi).map(channel => parseInt(channel, 16));

// Preserve the authored pigment until it fails, then deepen that same hue.
// Only cross to the opposite pigment when the original polarity cannot work.
export function contrastingInk(background, preferred, opposite, target = INK_CONTRAST) {
  if (inkContrast(inkLuminance(preferred), background) >= target) return preferred;
  const endpoint = inkLuminance(preferred) > background ? 255 : 0;
  const feasible = inkContrast(endpoint === 255 ? 1 : 0, background) >= target;
  const base = feasible ? preferred : opposite;
  const edge = feasible ? endpoint : 255 - endpoint;
  if (inkContrast(inkLuminance(base), background) >= target) return base;
  // Near middle gray neither black nor white reaches 4.8; choose the better one.
  if (inkContrast(edge === 255 ? 1 : 0, background) < target) {
    return inkContrast(1, background) > inkContrast(0, background) ? [255, 255, 255] : [0, 0, 0];
  }
  let low = 0;
  let high = 1;
  for (let step = 0; step < 9; step++) {
    const amount = (low + high) / 2;
    const color = base.map(channel => Math.round(channel + (edge - channel) * amount));
    if (inkContrast(inkLuminance(color), background) >= target) high = amount;
    else low = amount;
  }
  return base.map(channel => Math.round(channel + (edge - channel) * high));
}

export function washOpacity(samples, ink, paper, target = INK_CONTRAST) {
  const foreground = inkLuminance(ink);
  const lighten = inkLuminance(paper) > foreground;
  let worst;
  for (const sample of samples) {
    if (inkContrast(foreground, inkLuminance(sample)) >= target) continue;
    worst = worst ? worst.map((channel, index) => (lighten ? Math.min : Math.max)(channel, sample[index])) : sample;
  }
  if (!worst) return 0;
  // A conservative RGB envelope needs one solve per line, not one per pixel.
  let low = 0;
  let high = 1;
  for (let step = 0; step < 8; step++) {
    const alpha = (low + high) / 2;
    const mixed = worst.map((channel, index) => Math.round(channel * (1 - alpha) + paper[index] * alpha));
    if (inkContrast(foreground, inkLuminance(mixed)) >= target) high = alpha;
    else low = alpha;
  }
  return high;
}

export function chooseReadableInk(samples, preferred, opposite, lightPaper, darkPaper) {
  const light = inkLuminance(preferred) > inkLuminance(opposite) ? preferred : opposite;
  const dark = light === preferred ? opposite : preferred;
  const options = [[light, dark, darkPaper, 255], [dark, light, lightPaper, 0]].flatMap(([color, other, paper, edge]) =>
    [0, .35, .65].map(depth => {
      const pigment = color.map(channel => Math.round(channel + (edge - channel) * depth));
      const ink = contrastingInk(inkLuminance(paper), pigment, other);
      return { ink, paper, opacity: washOpacity(samples, ink, paper), preferred: color === preferred, depth };
    }));
  // Small changes in the painting must not keep flipping the reading polarity.
  const cost = option => option.opacity + (option.preferred ? 0 : .12) + option.depth * .16;
  return options.sort((a, b) => cost(a) - cost(b))[0];
}

// Keep a passage's pigment for its lifetime. Moving across a light/dark boundary
// changes only the supporting wash, never the polarity of the letters themselves.
export function stabilizeInkWash(opacity, previous) {
  const padded = opacity < .02 ? 0 : Math.min(1, opacity + .08);
  if (previous == null) return padded;
  // Retain a little extra paint until the backdrop changes meaningfully. The
  // retained value still covers the newly required contrast, including at zero.
  return previous >= opacity && Math.abs(padded - previous) < .08 ? previous : padded;
}

export function sampleInkField(field, projection, x, y) {
  const column = Math.max(0, Math.min(field.width - 1, Math.floor((x - projection.left) / projection.width * field.width)));
  const row = Math.max(0, Math.min(field.height - 1, Math.floor((y - projection.top) / projection.height * field.height)));
  const index = (row * field.width + column) * 4;
  return [...field.pixels.subarray(index, index + 3)];
}
