import * as THREE from 'three';
import { getSeason } from '../data/themeAppearance.js';
import { SEASONAL_SWIRL_SEASONS, SEASONAL_SWIRL_ELEMENTS } from '../data/interactionArt.js';

export const SWIRL_PATH_SAMPLES = 96;

const VERTEX_SHADER = `
  attribute float aPath, aReach, aSeed, aSize, aTile, aOpacity;
  attribute vec3 aColor, aTiming;
  uniform sampler2D uPaths;
  uniform vec2 uPathSize, uViewport, uAnchor;
  uniform float uStory, uSeason;
  varying vec2 vSprite;
  varying vec3 vColor;
  varying float vOpacity, vTile;
  float ease(float value) {
    float t = clamp(value, 0., 1.);
    return t*t*t*(t*(t*6.-15.)+10.);
  }
  vec4 pathPose(float progress) {
    float step = clamp(progress, 0., 1.) * (uPathSize.x - 1.);
    float first = floor(step);
    vec4 from = texture2D(uPaths, vec2((first + .5) / uPathSize.x, (aPath + .5) / uPathSize.y));
    vec4 to = texture2D(uPaths, vec2((min(first + 1., uPathSize.x - 1.) + .5) / uPathSize.x, (aPath + .5) / uPathSize.y));
    return mix(from, to, fract(step));
  }
  void main() {
    float age = uStory - aTiming.x;
    float progress = aReach * ease(age / aTiming.y);
    vec4 path = pathPose(progress);
    vec2 tangent = path.zw / max(.001, length(path.zw));
    vec2 normal = vec2(-tangent.y, tangent.x);
    float breeze = sin(progress * 13. + aSeed) * sin(progress * 3.14159) * 2.4;
    vec2 center = path.xy + uAnchor + normal * breeze;
    float flutter = sin(max(0., age) / 240. + aSeed);
    float angle = atan(tangent.y, tangent.x) + aSeed + flutter * .48;
    float size = aSize * (uSeason < .5 ? .72 : uSeason > 2.5 ? .92 : 1.);
    vec2 card = position.xy * size * vec2(.78 + flutter * .18, 1.);
    vec2 turned = vec2(cos(angle) * card.x - sin(angle) * card.y,
      sin(angle) * card.x + cos(angle) * card.y);
    vec2 point = center + turned;
    float settle = 1. - ease((age - aTiming.y - 380.) / 1000.) * .48;
    float launch = 1. - ease((age - aTiming.y) / 700.);
    vOpacity = aOpacity * ease(age / 150.) * (aTiming.z < .5 ? launch : settle);
    vSprite = uv; vTile = aTile; vColor = aColor;
    gl_Position = vec4(point.x / uViewport.x * 2. - 1., 1. - point.y / uViewport.y * 2., 0., 1.);
  }
`;
const FRAGMENT_SHADER = `
  uniform sampler2D uSprites;
  uniform float uSeason;
  varying vec2 vSprite;
  varying vec3 vColor;
  varying float vOpacity, vTile;
  void main() {
    if (vOpacity < .001) discard;
    vec2 spriteUv = vec2((vTile + mix(.008, .992, vSprite.x)) / 4.,
      1. - (uSeason + mix(.008, .992, vSprite.y)) / 4.);
    vec4 painted = texture2D(uSprites, spriteUv);
    float alpha = painted.a * vOpacity;
    if (alpha < .002) discard;
    float grain = dot(painted.rgb, vec3(.213, .715, .072));
    gl_FragColor = vec4(vColor * (.56 + grain * .44), alpha);
    #include <colorspace_fragment>
  }
`;

export function buildSeasonalSwirlGeometry(score, width = 1440, height = 900) {
  const strokes = score.flatMap(burst => [burst.launch, ...burst.strands]);
  const paths = new Float32Array(SWIRL_PATH_SAMPLES * strokes.length * 4);
  const values = { aPath: [], aReach: [], aSeed: [], aSize: [], aTile: [], aOpacity: [], aColor: [], aTiming: [] };
  const scale = Math.min(width, height) / 900;
  const color = new THREE.Color();
  strokes.forEach((stroke, pathIndex) => {
    const curve = new THREE.CatmullRomCurve3(stroke.points.map(point => new THREE.Vector3(point.x, point.y, 0)));
    for (let sample = 0; sample < SWIRL_PATH_SAMPLES; sample++) {
      const t = sample / (SWIRL_PATH_SAMPLES - 1);
      const point = curve.getPoint(t), tangent = curve.getTangent(t);
      const offset = (pathIndex * SWIRL_PATH_SAMPLES + sample) * 4;
      paths.set([point.x, point.y, tangent.x, tangent.y], offset);
    }
    const count = stroke.opacity < .4 ? 1 : stroke.kind === 0 ? 3 : stroke.followsContour ? 3 : 2;
    color.setRGB(...stroke.color.map(channel => channel / 255), THREE.SRGBColorSpace);
    for (let slot = 0; slot < count; slot++) {
      const variation = (stroke.seed * .137 + slot * .61803398875) % 1;
      values.aPath.push(pathIndex);
      values.aReach.push(count === 1 ? .9 : .54 + slot / (count - 1) * .46);
      values.aSeed.push(stroke.seed + slot * 2.399963);
      values.aSize.push(Math.max(11, scale * (stroke.width > 3 ? 23 : 17) * (.84 + variation * .32)));
      values.aTile.push(Math.floor(variation * 4));
      values.aOpacity.push(Math.min(.64, stroke.opacity * 1.08) * (.80 + variation * .20));
      values.aColor.push(color.r, color.g, color.b);
      values.aTiming.push(stroke.birth + slot * 100 + variation * 100, stroke.duration * (.88 + variation * .12), stroke.kind);
    }
  });
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([-.5, -.5, 0, .5, -.5, 0, -.5, .5, 0, .5, .5, 0], 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 1, 1], 2));
  geometry.setIndex([0, 1, 2, 2, 1, 3]);
  for (const [name, array] of Object.entries(values)) {
    geometry.setAttribute(name, new THREE.InstancedBufferAttribute(new Float32Array(array), name === 'aColor' || name === 'aTiming' ? 3 : 1));
  }
  geometry.instanceCount = values.aPath.length;
  const pathTexture = new THREE.DataTexture(paths, SWIRL_PATH_SAMPLES, strokes.length, THREE.RGBAFormat, THREE.FloatType);
  pathTexture.minFilter = pathTexture.magFilter = THREE.NearestFilter;
  pathTexture.generateMipmaps = false; pathTexture.needsUpdate = true;
  return { geometry, pathTexture, pathCount: strokes.length };
}

export function createInkFireworksRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  let sprites = new THREE.DataTexture(new Uint8Array([255, 255, 255, 0]), 1, 1), paths;
  sprites.needsUpdate = true;
  const material = new THREE.ShaderMaterial({ vertexShader: VERTEX_SHADER, fragmentShader: FRAGMENT_SHADER,
    uniforms: { uViewport: { value: new THREE.Vector2(1, 1) }, uAnchor: { value: new THREE.Vector2() },
      uStory: { value: -1 }, uSeason: { value: 0 }, uSprites: { value: sprites }, uPaths: { value: null },
      uPathSize: { value: new THREE.Vector2(1, 1) } },
    transparent: true, depthTest: false, depthWrite: false, side: THREE.DoubleSide });
  const scene = new THREE.Scene(), camera = new THREE.Camera();
  const mesh = new THREE.Mesh(new THREE.BufferGeometry(), material);
  mesh.frustumCulled = false; scene.add(mesh);
  return {
    prepare(score, width, height, theme) {
      const pixelRatio = Math.min(2, window.devicePixelRatio || 1, Math.sqrt(3000000 / (width * height)));
      renderer.setPixelRatio(pixelRatio); renderer.setSize(width, height, false);
      material.uniforms.uViewport.value.set(width, height);
      mesh.geometry.dispose(); paths?.dispose();
      const prepared = buildSeasonalSwirlGeometry(score, width, height);
      mesh.geometry = prepared.geometry; paths = prepared.pathTexture;
      material.uniforms.uPaths.value = paths;
      material.uniforms.uPathSize.value.set(SWIRL_PATH_SAMPLES, prepared.pathCount);
      const season = SEASONAL_SWIRL_SEASONS.indexOf(getSeason(theme));
      material.uniforms.uSeason.value = season;
      material.uniforms.uStory.value = -1;
      renderer.initTexture(paths); renderer.compile(scene, camera); renderer.render(scene, camera); renderer.clear();
      canvas.dataset.inkVertices = String(mesh.geometry.instanceCount * 4);
      canvas.dataset.inkElements = String(mesh.geometry.instanceCount);
      canvas.dataset.inkElementType = SEASONAL_SWIRL_ELEMENTS[season];
    },
    setSpriteAtlas(image) {
      sprites.dispose(); sprites = new THREE.Texture(image);
      sprites.minFilter = sprites.magFilter = THREE.LinearFilter; sprites.generateMipmaps = false; sprites.needsUpdate = true;
      material.uniforms.uSprites.value = sprites; renderer.initTexture(sprites);
      canvas.dataset.inkSpritesReady = 'true';
    },
    draw(elapsed, offsetX = 0, offsetY = 0) {
      material.uniforms.uStory.value = elapsed;
      material.uniforms.uAnchor.value.set(offsetX, offsetY);
      renderer.render(scene, camera);
    },
    clear() { renderer.clear(); },
    dispose() { mesh.geometry.dispose(); paths?.dispose(); material.dispose(); sprites.dispose(); renderer.dispose(); renderer.forceContextLoss(); },
  };
}
