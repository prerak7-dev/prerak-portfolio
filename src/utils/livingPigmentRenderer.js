import * as THREE from 'three';
import { CONTOUR_HANDOFF_GLSL, CONTOUR_NOISE_GLSL } from './contourDissolveShader.js';
import { createPigmentSeeds, MAX_PIGMENT_QUIET_RECTS, PIGMENT_COMPACT_COUNT, PIGMENT_DESKTOP_COUNT } from './livingPigmentMotion.js';
import { getPigmentSubjects } from '../data/livingPigmentArt.js';

const VERTEX_SHADER = `
  attribute vec2 aPaintingUv, aCenter, aRadius, aLocal;
  attribute vec4 aSeed, aLoop;
  uniform sampler2D uGeometry;
  uniform vec4 uProjection;
  uniform vec2 uViewport;
  uniform float uTime, uTravel;
  varying vec2 vSprite, vPaintingUv, vContourUv, vScreen;
  varying float vTile;
  void main() {
    float phase = clamp(uTravel, 0., 1.);
    float angle = uTime * aLoop.y + aLoop.w + phase * aLoop.z;
    float c = cos(angle), s = sin(angle);
    vec2 surface = aLocal;
    if (aLoop.x > .5 && aLoop.x < 2.5) {
      surface = vec2(aLocal.x * c - aLocal.y * s, aLocal.x * s + aLocal.y * c);
    } else if (aLoop.x > 2.5) {
      surface += vec2(sin(angle + aLocal.x * 6.) * .035, sin(angle * 2. + aLocal.x * 8.) * .08);
    } else {
      surface += vec2(sin(angle + aLocal.y * 2.) * .022, sin(angle) * .035);
    }
    vec2 anchoredUv = aCenter + surface * aRadius;
    vec2 origin = uProjection.xy + anchoredUv * uProjection.zw;
    float idleDrift = aLoop.x > 1.5 && aLoop.x < 2.5 ? .12 : 1.;
    vec2 flow = texture2D(uGeometry, vec2(anchoredUv.x, 1. - anchoredUv.y)).rg * 2. - 1.;
    flow /= max(.18, length(flow));
    float theta = aSeed.x * 6.283185 + phase * (1.2 + aSeed.y * .7);
    float reach = phase * phase * (18. + aSeed.z * 58.);
    vec2 lift = vec2(cos(theta), sin(theta)) * reach;
    lift.x += sin(uTime * .22 + aSeed.x * 9.) * (1. + aSeed.y * 3.) * idleDrift;
    lift.y -= phase * (8. + aSeed.w * 34.);
    lift += flow * phase * (12. + aSeed.y * 16.);
    lift += vec2(cos(uTime * .17 + aSeed.w * 7.), sin(uTime * .19 + aSeed.z * 6.)) * (2.5 + aSeed.y * 5.) * idleDrift;
    float size = aSeed.z > .97 ? 7. : 2. + aSeed.z * aSeed.z * 4.6;
    size *= .75 + min(uViewport.x, uViewport.y) / 1600.;
    float turn = aSeed.w * 6.283185 + sin(uTime * .21 + aSeed.x * 8.) * .3 + phase * 1.3;
    vec2 card = position.xy * size;
    vec2 turned = vec2(cos(turn) * card.x - sin(turn) * card.y, sin(turn) * card.x + cos(turn) * card.y);
    vec2 point = origin + lift + turned;
    vSprite = uv; vPaintingUv = aLoop.x > .5 && aLoop.x < 1.5 ? anchoredUv : aPaintingUv;
    vContourUv = (point - uProjection.xy) / uProjection.zw;
    vScreen = point;
    vTile = aSeed.w < .70 ? floor(aSeed.x * 4.) : aSeed.w < .9 ? 4. + floor(aSeed.x * 4.) : 8. + floor(aSeed.x * 8.);
    gl_Position = vec4(point.x / uViewport.x * 2. - 1., 1. - point.y / uViewport.y * 2., 0., 1.);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uPainting, uGeometry, uSprites;
  uniform vec2 uSource;
  uniform float uSourceReach, uOriginFocus, uProgress, uTransition, uRole, uOpacity;
  uniform vec4 uQuietRects[${MAX_PIGMENT_QUIET_RECTS}];
  uniform int uQuietCount;
  varying vec2 vSprite, vPaintingUv, vContourUv, vScreen;
  varying float vTile;
  ${CONTOUR_NOISE_GLSL}
  void main() {
    vec2 spriteUv = vec2((mod(vTile, 4.) + mix(.01, .99, vSprite.x)) / 4.,
      1. - (floor(vTile / 4.) + mix(.01, .99, vSprite.y)) / 4.);
    vec4 stamp = texture2D(uSprites, spriteUv);
    if (stamp.a < .01) discard;
    float quiet = 1.;
    for (int i = 0; i < ${MAX_PIGMENT_QUIET_RECTS}; i++) {
      if (i >= uQuietCount) break;
      vec4 rect = uQuietRects[i];
      vec2 margin = min(vScreen - rect.xy, rect.zw - vScreen);
      quiet *= 1. - smoothstep(-12., 0., min(margin.x, margin.y));
    }
    if (quiet < .002) discard;
    vec2 local = vContourUv;
    vec4 geometry = texture2D(uGeometry, vec2(local.x, 1. - local.y));
    ${CONTOUR_HANDOFF_GLSL}
    float coverage = mix(1., mix(1. - handoff, handoff, uRole), uTransition);
    vec3 native = texture2D(uPainting, vec2(vPaintingUv.x, 1. - vPaintingUv.y)).rgb;
    float grain = dot(stamp.rgb, vec3(.213, .715, .072));
    float alpha = stamp.a * quiet * coverage * uOpacity * .30;
    if (alpha < .002) discard;
    gl_FragColor = vec4(native * (.96 + grain * .08), alpha);
    #include <colorspace_fragment>
  }
`;

export function buildLivingPigmentGeometry(sceneIndex, portrait, count) {
  const seeds = createPigmentSeeds(sceneIndex, portrait, count);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([-.5, -.5, 0, .5, -.5, 0, -.5, .5, 0, .5, .5, 0], 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 1, 1], 2));
  geometry.setIndex([0, 1, 2, 2, 1, 3]);
  geometry.setAttribute('aPaintingUv', new THREE.InstancedBufferAttribute(seeds.position, 2));
  geometry.setAttribute('aCenter', new THREE.InstancedBufferAttribute(seeds.center, 2));
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds.seed, 4));
  geometry.setAttribute('aRadius', new THREE.InstancedBufferAttribute(seeds.radius, 2));
  geometry.setAttribute('aLocal', new THREE.InstancedBufferAttribute(seeds.local, 2));
  geometry.setAttribute('aLoop', new THREE.InstancedBufferAttribute(seeds.loop, 4));
  geometry.instanceCount = seeds.count;
  return geometry;
}

function texture(image, color = false) {
  const result = new THREE.Texture(image);
  result.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  result.minFilter = result.magFilter = THREE.LinearFilter;
  result.generateMipmaps = false; result.needsUpdate = true;
  return result;
}

export function createLivingPigmentRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(), camera = new THREE.Camera();
  const entries = new Map(), geometries = new Map();
  let sprites, width = 1, height = 1;
  const disposeEntry = entry => { scene.remove(entry.mesh); entry.painting.dispose(); entry.flow.dispose(); entry.material.dispose(); };
  return {
    resize(w, h) {
      width = w; height = h;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35, Math.sqrt(1800000 / (w * h)));
      renderer.setPixelRatio(ratio); renderer.setSize(w, h, false);
    },
    setAtlas(image) {
      sprites?.dispose(); sprites = texture(image); renderer.initTexture(sprites);
      entries.forEach(entry => { entry.material.uniforms.uSprites.value = sprites; });
    },
    prepare(key, sceneIndex, portrait, painting, flowImage, field) {
      if (entries.has(key) || !sprites) return;
      const compact = width <= 1100 || height <= 500;
      const count = compact ? PIGMENT_COMPACT_COUNT : PIGMENT_DESKTOP_COUNT;
      const geometryKey = `${sceneIndex}:${portrait}:${compact}`;
      if (!geometries.has(geometryKey)) geometries.set(geometryKey, buildLivingPigmentGeometry(sceneIndex, portrait, count));
      const paintingTexture = texture(painting, true), flow = texture(flowImage);
      const material = new THREE.ShaderMaterial({ vertexShader: VERTEX_SHADER, fragmentShader: FRAGMENT_SHADER,
        uniforms: { uPainting: { value: paintingTexture }, uGeometry: { value: flow }, uSprites: { value: sprites },
          uProjection: { value: new THREE.Vector4() }, uViewport: { value: new THREE.Vector2(width, height) },
          uTime: { value: 0 }, uTravel: { value: 0 }, uProgress: { value: 0 }, uRole: { value: 0 },
          uTransition: { value: 0 }, uOpacity: { value: 0 },
          uSource: { value: new THREE.Vector2(...field.source) }, uSourceReach: { value: field.sourceReach },
          uOriginFocus: { value: field.motif === 'gateway' ? 1 : 0 },
          uQuietCount: { value: 0 }, uQuietRects: { value: Array.from({ length: MAX_PIGMENT_QUIET_RECTS }, () => new THREE.Vector4()) } },
        transparent: true, depthTest: false, depthWrite: false, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometries.get(geometryKey), material);
      mesh.frustumCulled = false; mesh.visible = false;
      scene.add(mesh); entries.set(key, { mesh, material, painting: paintingTexture, flow, sceneIndex });
      renderer.initTexture(paintingTexture); renderer.initTexture(flow); renderer.compile(scene, camera);
    },
    draw(layers, time, quietRects, quality = 1, entrance = 1) {
      entries.forEach(entry => { entry.mesh.visible = false; });
      let count = 0;
      for (const layer of layers) {
        const entry = entries.get(layer.key);
        if (!entry) continue;
        const u = entry.material.uniforms, p = layer.projection;
        entry.mesh.visible = true;
        entry.mesh.geometry.instanceCount = Math.round(entry.mesh.geometry.getAttribute('aPaintingUv').count * quality);
        count += entry.mesh.geometry.instanceCount;
        u.uViewport.value.set(width, height); u.uProjection.value.set(p.left, p.top, p.width, p.height);
        u.uTime.value = time; u.uProgress.value = layer.progress; u.uTravel.value = layer.travel;
        u.uRole.value = layer.role; u.uTransition.value = Number(layer.transitioning);
        u.uOpacity.value = entrance * (layer.opacity ?? 1) * (layer.transitioning ? .92 : .82);
        u.uQuietCount.value = quietRects.length;
        quietRects.forEach((rect, i) => u.uQuietRects.value[i].set(rect.left, rect.top, rect.right, rect.bottom));
        entries.delete(layer.key); entries.set(layer.key, entry);
      }
      renderer.render(scene, camera);
      canvas.dataset.pigmentParticles = String(count);
      canvas.dataset.pigmentDrawCalls = String(renderer.info.render.calls);
      canvas.dataset.pigmentQuietRects = String(quietRects.length);
      canvas.dataset.pigmentLoopTime = time.toFixed(4);
      canvas.dataset.pigmentSubjects = [...new Set(layers.flatMap(layer => getPigmentSubjects(layer.sceneIndex).map(subject => subject.name)))].join(',');
      while (entries.size > 4) { const [key, entry] = entries.entries().next().value; disposeEntry(entry); entries.delete(key); }
    },
    clear() { renderer.clear(); },
    dispose() { entries.forEach(disposeEntry); geometries.forEach(geometry => geometry.dispose()); sprites?.dispose(); renderer.dispose(); },
  };
}
