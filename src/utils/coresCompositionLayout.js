const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// The three sun crowns in the authored landscape and native portrait paintings.
export const CORE_SUN_CROWNS = Object.freeze({
  landscape: [{ x: .20, y: .638 }, { x: .50, y: .556 }, { x: .80, y: .586 }],
  portrait: [{ x: .195, y: .657 }, { x: .502, y: .610 }, { x: .802, y: .657 }],
});

export function getCoresCompositionLayout(projection, width, height, { portrait, contentTop }) {
  const short = height <= (portrait ? 680 : 500);
  const margin = portrait || short ? 20 : 48;
  const labelWidth = portrait ? Math.min(144, width / 3 - 12) : short ? 136 : 196;
  const labelHeight = short ? 44 : 60;
  const crownGap = short ? 14 : portrait ? 24 : 40;
  const anchors = CORE_SUN_CROWNS[portrait ? 'portrait' : 'landscape'].map(point => ({
    left: clamp(projection.left + point.x * projection.width - labelWidth / 2, 10, width - labelWidth - 10),
    top: projection.top + point.y * projection.height - labelHeight / 2 - crownGap,
    width: labelWidth, height: labelHeight,
  }));
  const titleTop = Math.min(...anchors.map(anchor => anchor.top));
  const heading = {
    left: margin, top: contentTop,
    width: portrait ? width - margin * 2 : short ? width * .45 - margin : Math.min(400, width * .32),
    height: short ? 50 : portrait ? 88 : 130,
  };
  const detailWidth = portrait ? Math.min(400, width - margin * 2) : short ? Math.min(360, width * .5 - 128) : Math.min(460, width * .36);
  const detailTop = portrait ? heading.top + heading.height + (short ? 6 : 14)
    : short ? contentTop : contentTop + 56;
  const detail = {
    left: portrait ? (width - detailWidth) / 2 : short ? width * .5 : width * .57 - detailWidth / 2,
    top: detailTop, width: detailWidth,
    height: Math.max(44, titleTop - detailTop - (short ? 4 : 24)),
  };
  return { anchors, heading, detail, short,
    footer: { left: short && !portrait ? 16 : margin, top: height - (portrait || short ? 72 : 100) },
  };
}
