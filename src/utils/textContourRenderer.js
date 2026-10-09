import * as THREE from 'three';
import { getSceneCoverProjection } from '../data/cinematicViewport.js';
import { CONTOUR_HANDOFF_GLSL, CONTOUR_NOISE_GLSL } from './contourDissolveShader.js';
import { getTracerSceneField } from '../data/tracerSceneFields.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const bakedFields = new Map();
let fieldBaker;
let clients = 0;
const fieldKey = (image, projection, source, width, height) => JSON.stringify([
  image.currentSrc || image.src, source.seed, width, height,
  projection.left, projection.top, projection.width, projection.height,
]);
const smooth = value => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };

function svgElement(name, attributes, parent) {
  const node = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  parent?.append(node);
  return node;
}

// All text, hover and rail controllers share one GPU baker. Their live masks
// are SVG, so retaining a WebGL context per controller wastes mobile slots.
function createFieldBaker() {
  const canvas = document.createElement('canvas');
  canvas.dataset.contourBaker = 'shared';
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, preserveDrawingBuffer: true, powerPreference: 'low-power' });
  renderer.setClearColor(0xffffff, 0);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    transparent: true,
    extensions: { derivatives: true },
    uniforms: {
      uGeometry: { value: null }, uViewport: { value: new THREE.Vector2() },
      uProjection: { value: new THREE.Vector4() }, uSource: { value: new THREE.Vector2() },
      uSourceReach: { value: .72 }, uOriginFocus: { value: 0 }, uProgress: { value: 0 }, uInvert: { value: 0 },
    },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
    fragmentShader: `
      uniform sampler2D uGeometry;
      uniform vec2 uViewport;
      uniform vec4 uProjection;
      uniform vec2 uSource;
      uniform float uSourceReach, uOriginFocus, uProgress, uInvert;
      varying vec2 vUv;
      ${CONTOUR_NOISE_GLSL}
      void main() {
        vec2 viewportPixel = vec2(vUv.x * uViewport.x, (1.0 - vUv.y) * uViewport.y);
        vec2 local = (viewportPixel - uProjection.xy) / uProjection.zw;
        vec4 geometry = texture2D(uGeometry, vec2(clamp(local.x, 0., 1.), 1. - clamp(local.y, 0., 1.)));
        ${CONTOUR_HANDOFF_GLSL}
        // Wet blooms spread along the scene's painted tangents from many origins.
        vec2 bloomSpace = viewportPixel / 76.0 + flow * (broadWash - .5) * .42;
        vec2 cell = floor(bloomSpace);
        float bloomDistance = 2.0;
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 neighbor = cell + vec2(float(x), float(y));
            vec2 seed = neighbor + .18 + .64 * vec2(hash21(neighbor + uSource * 17.), hash21(neighbor + 43.7));
            vec2 delta = bloomSpace - seed;
            vec2 contourDelta = vec2(dot(delta, flow) * .8, dot(delta, crossFlow) * 1.18);
            bloomDistance = min(bloomDistance, length(contourDelta));
          }
        }
        float order = clamp(bloomDistance * .94 + (1. - pigment) * .13
          + (brushLoad - .5) * .16 + (bristle - .5) * .055
          + (contourOrder - contourLift) * .12, 0., 1.);
        gl_FragColor = vec4(1., 1., 1., .08 + order * .84);
      }
    `,
  });
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(geometry, material));
  const camera = new THREE.Camera();
  renderer.compile(scene, camera);
  let texture;
  return {
    bake(image, projection, sourceField, width, height) {
      if (renderer.getContext().isContextLost()) throw new Error('Contour baker is awaiting graphics recovery');
      texture?.dispose();
      texture = new THREE.Texture(image);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
      const scale = Math.min(1, 480 / Math.max(width, height));
      renderer.setSize(Math.ceil(width * scale), Math.ceil(height * scale), false);
      const u = material.uniforms;
      u.uGeometry.value = texture;
      u.uViewport.value.set(width, height);
      u.uProjection.value.set(projection.left, projection.top, projection.width, projection.height);
      u.uSource.value.set(...sourceField.source);
      u.uSourceReach.value = sourceField.sourceReach;
      u.uOriginFocus.value = sourceField.motif === 'gateway' ? 1 : 0;
      u.uProgress.value = .5;
      renderer.render(scene, camera);
      return canvas.toDataURL();
    },
    dispose() {
      texture?.dispose(); material.dispose(); geometry.dispose(); renderer.dispose(); renderer.forceContextLoss();
    },
  };
}

function bakeField(image, projection, sourceField, width, height) {
  const key = fieldKey(image, projection, sourceField, width, height);
  if (bakedFields.has(key)) return bakedFields.get(key);
  fieldBaker ??= createFieldBaker();
  const field = fieldBaker.bake(image, projection, sourceField, width, height);
  bakedFields.set(key, field);
  if (bakedFields.size > 16) bakedFields.delete(bakedFields.keys().next().value);
  return field;
}

// Frames update alpha-transfer values, never read pixels or encode PNGs.
export function createTextContourRenderer() {
  clients++;
  let disposed = false;
  const prefix = `text-contour-${crypto.randomUUID()}`;
  const svg = svgElement('svg', { width: 0, height: 0, 'aria-hidden': 'true' });
  svg.style.cssText = 'position:absolute;pointer-events:none;overflow:hidden';
  const defs = svgElement('defs', {}, svg);
  const channels = new Map();
  const channelFunctions = channel => {
    if (!channels.has(channel)) channels.set(channel, ['incoming', 'outgoing'].map((direction, index) => {
      const filter = svgElement('filter', { id: `${prefix}-${channel}-${direction}-filter`, filterUnits: 'objectBoundingBox', primitiveUnits: 'objectBoundingBox', x: 0, y: 0, width: 1, height: 1, 'color-interpolation-filters': 'sRGB' }, defs);
      const transfer = svgElement('feComponentTransfer', { x: 0, y: 0, width: 1, height: 1 }, filter);
      return svgElement('feFuncA', { type: 'linear', slope: index ? 16 : -16, intercept: index ? 1 : 0 }, transfer);
    }));
    return channels.get(channel);
  };
  document.body.append(svg);
  let field;
  let viewport;
  let maskIndex = 0;
  return {
    configure(image, projection, sourceField, width, height) {
      viewport = { width, height };
      defs.querySelectorAll('mask, pattern').forEach(node => node.remove());
      field = bakeField(image, projection, sourceField, width, height);
    },
    draw(progress, channel = 'default', incomingProgress = progress) {
      const functions = channelFunctions(channel);
      const front = -.08 + smooth((progress - .015) / .97) * 1.16;
      const intercept = 16 * front + .5;
      const incomingFront = -.08 + smooth((incomingProgress - .015) / .97) * 1.16;
      functions[0].setAttribute('intercept', 16 * incomingFront + .5);
      functions[1].setAttribute('intercept', 1 - intercept);
    },
    mask(rect, direction = 'incoming', scaleX = 1, scaleY = 1, channel = 'default') {
      channelFunctions(channel);
      const id = `${prefix}-mask-${++maskIndex}`;
      const mask = svgElement('mask', { id, maskUnits: 'userSpaceOnUse', x: -4, y: -4, width: rect.width / scaleX + 8, height: rect.height / scaleY + 8, 'mask-type': 'alpha' }, defs);
      const width = viewport.width / scaleX;
      const height = viewport.height / scaleY;
      const pattern = svgElement('pattern', { id: `${id}-field`, patternUnits: 'userSpaceOnUse', x: -rect.left / scaleX, y: -rect.top / scaleY, width, height }, defs);
      svgElement('image', {
        href: field, x: 0, y: 0,
        width, height,
        preserveAspectRatio: 'none',
      }, pattern);
      svgElement('rect', { x: -4, y: -4, width: rect.width / scaleX + 8, height: rect.height / scaleY + 8, fill: `url(#${id}-field)`, filter: `url(#${prefix}-${channel}-${direction}-filter)` }, mask);
      return `url("#${id}")`;
    },
    releaseMask(mask) {
      const id = mask?.match(/#([^"')]+)/)?.[1];
      if (!id?.startsWith(`${prefix}-mask-`)) return;
      defs.querySelector(`#${id}`)?.remove();
      defs.querySelector(`#${id}-field`)?.remove();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      svg.remove();
      if (--clients === 0) { fieldBaker?.dispose(); fieldBaker = null; }
    },
  };
}

export function warmChapterTextField(image, theme, sceneIndex) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const projection = getSceneCoverProjection(width, height, image.naturalWidth / image.naturalHeight);
  const source = getTracerSceneField(theme, sceneIndex);
  if (bakedFields.has(fieldKey(image, projection, source, width, height))) return;
  try {
    bakeField(image, projection, source, width, height);
  } catch {
    // Live SVG fields remain usable while a lost baker context recovers.
  }
}
