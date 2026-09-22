import * as THREE from 'three';
import { CONTOUR_HANDOFF_GLSL, CONTOUR_NOISE_GLSL } from './contourDissolveShader.js';

// A small alpha field masks real, selectable DOM text; no glyphs are rasterized.
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
        gl_FragColor = vec4(1., 1., 1., mix(handoff, 1. - handoff, uInvert));
      }
    `,
  });
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(geometry, material));
  const camera = new THREE.Camera();
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
    },
    draw(progress) {
      if (renderer.getContext().isContextLost()) throw new Error('Text contour context lost');
      material.uniforms.uProgress.value = progress;
      material.uniforms.uInvert.value = 0;
      renderer.render(scene, camera);
      const incoming = canvas.toDataURL();
      material.uniforms.uInvert.value = 1;
      renderer.render(scene, camera);
      return { incoming, outgoing: canvas.toDataURL() };
    },
    dispose() {
      texture?.dispose(); material.dispose(); geometry.dispose(); renderer.dispose(); renderer.forceContextLoss();
    },
  };
}
