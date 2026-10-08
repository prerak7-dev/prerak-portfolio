import { gateSealLandmark } from './gateSealMotion.js';

export const GATE_SEAL_TIP_REACH = 1.18;
export const GATE_SEAL_ART_EXTENT = 1.36;
const TIP_HALF_WIDTH = .10;
const TIP_SHOULDER = .94;
const smooth = (low, high, value) => {
  const t = Math.max(0, Math.min(1, (value - low) / (high - low)));
  return t * t * (3 - 2 * t);
};

function sealEdgeWear(x, y) {
  const xx = x * x, yy = y * y;
  return .006 + .012 * (.5 + .5 * Math.sin(xx * 9 + yy * 7) * Math.sin(xx * 21 - yy * 13))
    + .004 * (.5 + .5 * Math.sin(xx * 41 + yy * 27));
}

function sealEdgeFeather(x, y) {
  return .008 + .008 * (.5 + .5 * Math.sin(x * x * 27 + y * y * 19));
}

export function gateSealCircleCoverage(x, y) {
  const feather = sealEdgeFeather(x, y);
  return 1 - smooth(-feather, feather, Math.hypot(x, y) - .985 + sealEdgeWear(x, y));
}

function sealProfileCoverage(x, y, reach, halfWidth, shoulder, organic = false) {
  const major = Math.max(Math.abs(x), Math.abs(y)), minor = Math.min(Math.abs(x), Math.abs(y));
  const width = halfWidth * Math.max(0, Math.min(1, (reach - major) / (reach - shoulder)));
  const tip = Math.max(major - reach, minor - width);
  const circle = Math.hypot(x, y) - .985 + (organic ? sealEdgeWear(x, y) : 0);
  const feather = organic ? sealEdgeFeather(x, y) : .015;
  return 1 - smooth(-feather, feather, Math.min(circle, tip));
}

export function gateSealShapeCoverage(x, y) {
  return sealProfileCoverage(x, y, GATE_SEAL_TIP_REACH, TIP_HALF_WIDTH, TIP_SHOULDER, true);
}

export function gateSealFootprintCoverage(x, y) {
  return sealProfileCoverage(x, y, 1.32, .16, .86);
}

export function gateSealTipMirrorWeight(x, y) {
  return y > Math.abs(x) ? smooth(.97, 1, Math.hypot(x, y)) : 0;
}

export const GATE_SEAL_SHAPE_GLSL = `
  float sealEdgeWear(vec2 point) {
    vec2 squared = point * point;
    return .006 + .012 * (.5 + .5 * sin(squared.x * 9. + squared.y * 7.) * sin(squared.x * 21. - squared.y * 13.))
      + .004 * (.5 + .5 * sin(squared.x * 41. + squared.y * 27.));
  }
  float sealEdgeFeather(vec2 point) {
    return .008 + .008 * (.5 + .5 * sin(point.x * point.x * 27. + point.y * point.y * 19.));
  }
  float sealCircleCoverage(vec2 point) {
    float feather = sealEdgeFeather(point);
    return 1. - smoothstep(-feather, feather, length(point) - .985 + sealEdgeWear(point));
  }
  float sealShapeCoverage(vec2 point) {
    vec2 axes = abs(point);
    float major = max(axes.x, axes.y), minor = min(axes.x, axes.y);
    float width = ${TIP_HALF_WIDTH} * clamp((${GATE_SEAL_TIP_REACH} - major) / ${GATE_SEAL_TIP_REACH - TIP_SHOULDER}, 0., 1.);
    float tip = max(major - ${GATE_SEAL_TIP_REACH}, minor - width);
    float feather = sealEdgeFeather(point);
    return 1. - smoothstep(-feather, feather, min(length(point) - .985 + sealEdgeWear(point), tip));
  }
  float sealFootprintCoverage(vec2 point) {
    vec2 axes = abs(point);
    float major = max(axes.x, axes.y), minor = min(axes.x, axes.y);
    float width = .16 * clamp((1.32 - major) / .46, 0., 1.);
    float tip = max(major - 1.32, minor - width);
    return 1. - smoothstep(-.015, .015, min(length(point) - .985, tip));
  }
  float sealTipMirrorWeight(vec2 point) {
    return point.y > abs(point.x) ? smoothstep(.97, 1., length(point)) : 0.;
  }
`;

// Cache two tiny native-paint layers: the complete turning mechanism and a
// repair of its old pointed-tip footprints. The gate itself is never repainted.
export function prepareGateSealArtwork(image, portrait, size = 192) {
  const landmark = gateSealLandmark(portrait);
  const diameter = image.naturalWidth * landmark.diameter * GATE_SEAL_ART_EXTENT;
  const face = document.createElement('canvas'), backing = document.createElement('canvas');
  face.width = face.height = backing.width = backing.height = size;
  const context = face.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, image.naturalWidth * landmark.x - diameter / 2,
    image.naturalHeight * landmark.y - diameter / 2, diameter, diameter, 0, 0, size, size);
  const source = context.getImageData(0, 0, size, size);
  const painting = context.createImageData(size, size), repair = context.createImageData(size, size);
  const shift = Math.round(size * .28 / (2 * GATE_SEAL_ART_EXTENT));
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const offset = (y * size + x) * 4;
    const nx = (x + .5 - size / 2) / (size / 2) * GATE_SEAL_ART_EXTENT;
    const ny = (y + .5 - size / 2) / (size / 2) * GATE_SEAL_ART_EXTENT;
    const shape = gateSealShapeCoverage(nx, ny);
    const cleanup = Math.max(0, gateSealFootprintCoverage(nx, ny) - gateSealCircleCoverage(nx, ny));
    const mirrorWeight = gateSealTipMirrorWeight(nx, ny);
    const mirrored = ((size - y - 1) * size + x) * 4;
    const vertical = Math.abs(ny) > Math.abs(nx);
    const sample = direction => {
      const sx = Math.max(0, Math.min(size - 1, x + (vertical ? direction * shift : 0)));
      const sy = Math.max(0, Math.min(size - 1, y + (vertical ? 0 : direction * shift)));
      return (sy * size + sx) * 4;
    };
    const left = sample(-1), right = sample(1);
    for (let channel = 0; channel < 3; channel++) {
      // Only the protruding lower tip borrows the upper tip's native paint.
      // The disk, carved cross, central diamond and ring stay untouched.
      painting.data[offset + channel] = source.data[offset + channel]
        + (source.data[mirrored + channel] - source.data[offset + channel]) * mirrorWeight;
      repair.data[offset + channel] = (source.data[left + channel] + source.data[right + channel]) / 2;
    }
    painting.data[offset + 3] = (source.data[offset + 3]
      + (source.data[mirrored + 3] - source.data[offset + 3]) * mirrorWeight) * shape;
    repair.data[offset + 3] = 255 * cleanup;
  }
  context.putImageData(painting, 0, 0);
  backing.getContext('2d').putImageData(repair, 0, 0);
  return { face, backing };
}
