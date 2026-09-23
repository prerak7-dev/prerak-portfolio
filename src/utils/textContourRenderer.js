import * as THREE from 'three';
import { CONTOUR_HANDOFF_GLSL, CONTOUR_NOISE_GLSL } from './contourDissolveShader.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const smooth = value => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };

function svgElement(name, attributes, parent) {
  const node = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  parent?.append(node);
  return node;
}

// Bake the painted flow once. Frames update two shared alpha-transfer values,
// never read pixels, encode PNGs, or replace CSS images in the animation loop.
export function createTextContourRenderer() {
  const canvas = document.createElement('canvas');
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
        float order = clamp(contourOrder - contourLift - (bristle - .5) * .022, 0., 1.);
        gl_FragColor = vec4(1., 1., 1., .08 + order * .84);
      }
    `,
  });
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(geometry, material));
  const camera = new THREE.Camera();
  renderer.compile(scene, camera);
  const prefix = `text-contour-${crypto.randomUUID()}`;
  const svg = svgElement('svg', { width: 0, height: 0, 'aria-hidden': 'true' });
  svg.style.cssText = 'position:absolute;pointer-events:none;overflow:hidden';
  const defs = svgElement('defs', {}, svg);
  const functions = [];
  ['incoming', 'outgoing'].forEach((direction, index) => {
    const filter = svgElement('filter', { id: `${prefix}-${direction}-filter`, filterUnits: 'objectBoundingBox', primitiveUnits: 'objectBoundingBox', x: 0, y: 0, width: 1, height: 1, 'color-interpolation-filters': 'sRGB' }, defs);
    const transfer = svgElement('feComponentTransfer', { x: 0, y: 0, width: 1, height: 1 }, filter);
    functions.push(svgElement('feFuncA', { type: 'linear', slope: index ? 16 : -16, intercept: index ? 1 : 0 }, transfer));
  });
  document.body.append(svg);
  let field;
  let viewport;
  let maskIndex = 0;
  let texture;
  return {
    configure(image, projection, sourceField, width, height) {
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
      field = canvas.toDataURL();
      viewport = { width, height };
      defs.querySelectorAll('mask, pattern').forEach(node => node.remove());
    },
    draw(progress) {
      const front = -.08 + smooth((progress - .015) / .97) * 1.16;
      const intercept = 16 * front + .5;
      functions[0].setAttribute('intercept', intercept);
      functions[1].setAttribute('intercept', 1 - intercept);
    },
    mask(rect, direction = 'incoming', scaleX = 1, scaleY = 1) {
      const id = `${prefix}-mask-${++maskIndex}`;
      const mask = svgElement('mask', { id, maskUnits: 'userSpaceOnUse', x: -4, y: -4, width: rect.width / scaleX + 8, height: rect.height / scaleY + 8, 'mask-type': 'alpha' }, defs);
      const pattern = svgElement('pattern', { id: `${id}-field`, patternUnits: 'userSpaceOnUse', x: -rect.left / scaleX, y: -rect.top / scaleY, width: viewport.width / scaleX, height: viewport.height / scaleY }, defs);
      svgElement('image', {
        href: field, x: 0, y: 0,
        width: viewport.width / scaleX, height: viewport.height / scaleY,
        preserveAspectRatio: 'none',
      }, pattern);
      svgElement('rect', { x: -4, y: -4, width: rect.width / scaleX + 8, height: rect.height / scaleY + 8, fill: `url(#${id}-field)`, filter: `url(#${prefix}-${direction}-filter)` }, mask);
      return `url("#${id}")`;
    },
    dispose() {
      svg.remove();
      texture?.dispose(); material.dispose(); geometry.dispose(); renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
