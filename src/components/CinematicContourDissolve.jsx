import { memo, useEffect, useRef } from 'react';
import { getSceneCoverProjection } from '../data/cinematicViewport.js';
import * as THREE from 'three';
import {
  GATEWAY_FRAME_COUNT,
  getCinematicGeometryAsset,
} from '../data/cinematicAssets.js';
import { getCinematicAtmosphereTransition } from '../data/cinematicSceneTimeline.js';
import { getTracerSceneBlend, getTracerSceneField } from '../data/tracerSceneFields.js';
import {
  getGatewayTransition,
  subscribeGatewayTransition,
} from '../state/gatewayTransitionStore.js';
import { getSpatialMotion, subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import {
  getThemeContourTransition,
  subscribeThemeContourTransition,
} from '../state/themeContourTransitionStore.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { gatewayDissolveProgress } from '../utils/cinematicTiming.js';
import { CONTOUR_NOISE_GLSL, CONTOUR_HANDOFF_GLSL } from '../utils/contourDissolveShader.js';
import { gateSealFaceBounds, gateSealDissolveProgress } from '../utils/gateSealMotion.js';
import { GATE_SEAL_SHAPE_GLSL, GATE_SEAL_ART_EXTENT } from '../utils/gateSealArtwork.js';
import { getGateSealPose, subscribeGateSealTurn } from '../state/gateSealTurnStore.js';
import { retryAssetLoad } from '../utils/assetLoadRetry.js';
import { isPaintingReady } from '../utils/paintingReadiness.js';

const MAX_PIXEL_RATIO = 2;
const MAX_RENDER_PIXELS = 2560 * 1440;
const MAX_SCENE_TEXTURES = 6;
const MAX_GEOMETRY_TEXTURES = 12;
const DISSOLVE_ENTRY_RAMP = 0.1;
const DISSOLVE_EXIT_RAMP = 0.08;
// The gate already owns the opening and closing choreography. Restrict the
// watercolor pass to its central handoff so it reads as pigment moving through
// the threshold rather than a second transition competing with the doors.
const SCENE_PROJECTION_SELECTORS = Object.freeze([
  '.gateway-sequence-preloads img[data-frame-index="0"]',
  '.cores-plate .environment-living-layer img',
  '.systems-plate .environment-living-layer img',
  '.chronology-plate .environment-living-layer img',
  '.field-plate .environment-living-layer img',
  '.surface-plate .environment-living-layer img',
]);
const THEME_GRADES = Object.freeze({
  // saturation, hue rotation (radians), brightness, contrast
  boot: Object.freeze([0, 0, 1, 1]),
  default: Object.freeze([1, 0, 1, 1]),
  fall: Object.freeze([0.64, THREE.MathUtils.degToRad(5), 1, 0.97]),
  spring: Object.freeze([0.58, THREE.MathUtils.degToRad(-6), 1.015, 0.97]),
  winter: Object.freeze([1, 0, 1, 1]),
});
const THEME_PIGMENTS = Object.freeze({
  boot: Object.freeze([0.43, 0.4, 0.35]),
  default: Object.freeze([0.72, 0.68, 0.6]),
  fall: Object.freeze([0.66, 0.38, 0.25]),
  spring: Object.freeze([0.4, 0.58, 0.49]),
  winter: Object.freeze([0.5, 0.67, 0.75]),
});

function smootherStep(value) {
  const progress = Math.min(1, Math.max(0, value));
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

function clampUnit(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

function dissolveEnvelope(progress) {
  const entering = smootherStep(progress / DISSOLVE_ENTRY_RAMP);
  const leaving = smootherStep((1 - progress) / DISSOLVE_EXIT_RAMP);
  return Math.min(entering, leaving);
}

const VERTEX_SHADER = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uScene;
  uniform sampler2D uIncomingScene;
  uniform sampler2D uGeometry;
  uniform vec2 uViewport;
  uniform vec4 uProjection;
  uniform vec4 uIncomingProjection;
  uniform vec2 uSource;
  uniform float uSourceReach;
  uniform float uOriginFocus;
  uniform float uProgress;
  uniform float uEnvelope;
  uniform vec4 uOutgoingGrade;
  uniform vec4 uIncomingGrade;
  uniform vec3 uPigment;
  uniform float uApplyGrade;
  uniform float uRevealLiveScene;
  uniform vec4 uOutgoingSeal;
  uniform vec4 uIncomingSeal;
  uniform vec2 uSealAngles;
  varying vec2 vUv;

  ${CONTOUR_NOISE_GLSL}
  ${GATE_SEAL_SHAPE_GLSL}

  vec3 linearToCssSpace(vec3 color) {
    vec3 safeColor = max(color, vec3(0.0));
    vec3 lower = safeColor * 12.92;
    vec3 upper = 1.055 * pow(safeColor, vec3(1.0 / 2.4)) - 0.055;
    return mix(lower, upper, step(vec3(0.0031308), safeColor));
  }

  vec3 cssSpaceToLinear(vec3 color) {
    vec3 safeColor = max(color, vec3(0.0));
    vec3 lower = safeColor / 12.92;
    vec3 upper = pow((safeColor + 0.055) / 1.055, vec3(2.4));
    return mix(lower, upper, step(vec3(0.04045), safeColor));
  }

  vec3 cssHueRotate(vec3 color, float angle) {
    float cosine = cos(angle);
    float sine = sin(angle);
    return vec3(
      dot(color, vec3(
        0.213 + cosine * 0.787 - sine * 0.213,
        0.715 - cosine * 0.715 - sine * 0.715,
        0.072 - cosine * 0.072 + sine * 0.928
      )),
      dot(color, vec3(
        0.213 - cosine * 0.213 + sine * 0.143,
        0.715 + cosine * 0.285 + sine * 0.140,
        0.072 - cosine * 0.072 - sine * 0.283
      )),
      dot(color, vec3(
        0.213 - cosine * 0.213 - sine * 0.787,
        0.715 - cosine * 0.715 + sine * 0.715,
        0.072 + cosine * 0.928 + sine * 0.072
      ))
    );
  }

  vec3 applyCssGrade(vec3 linearColor, vec4 grade) {
    vec3 color = linearToCssSpace(linearColor);
    float luminance = dot(color, vec3(0.213, 0.715, 0.072));
    color = mix(vec3(luminance), color, grade.x);
    color = cssHueRotate(color, grade.y);
    color *= grade.z;
    color = (color - 0.5) * grade.w + 0.5;
    return cssSpaceToLinear(clamp(color, 0.0, 1.0));
  }

  vec2 turnedSeal(vec2 local, vec4 bounds, float angle) {
    vec2 offset = (local - bounds.xy) / bounds.zw;
    float cosine = cos(angle), sine = sin(angle);
    return bounds.xy + vec2(cosine * offset.x + sine * offset.y,
      -sine * offset.x + cosine * offset.y) * bounds.zw;
  }

  vec4 paintedScene(sampler2D painting, vec2 local, vec4 bounds, float angle) {
    vec4 original = texture2D(painting, vec2(local.x, 1.0 - local.y));
    if (bounds.z <= 0.0) return original;
    vec2 offset = (local - bounds.xy) / bounds.zw;
    if (max(abs(offset.x), abs(offset.y)) > ${GATE_SEAL_ART_EXTENT}) return original;
    vec2 turned = turnedSeal(local, bounds, angle);
    vec2 turnedOffset = (turned - bounds.xy) / bounds.zw;
    float coverage = sealShapeCoverage(turnedOffset);
    float clean = max(0., sealFootprintCoverage(offset) - sealCircleCoverage(offset));
    if (max(coverage, clean) <= 0.) return original;
    vec2 repairOffset = abs(offset.y) > abs(offset.x) ? vec2(bounds.z * .28, 0.) : vec2(0., bounds.w * .28);
    vec4 left = texture2D(painting, vec2(local.x - repairOffset.x, 1. - local.y + repairOffset.y));
    vec4 right = texture2D(painting, vec2(local.x + repairOffset.x, 1. - local.y - repairOffset.y));
    vec4 backing = mix(original, (left + right) * .5, clean);
    vec4 carving = texture2D(painting, vec2(turned.x, 1. - turned.y));
    vec2 mirrored = bounds.xy + vec2(turnedOffset.x, -turnedOffset.y) * bounds.zw;
    vec4 upperTip = texture2D(painting, vec2(mirrored.x, 1. - mirrored.y));
    carving = mix(carving, upperTip, sealTipMirrorWeight(turnedOffset));
    float reliefLight = 1. - abs(sin(angle)) * .04 * clamp(.5 + (offset.x + offset.y) / ${4 * GATE_SEAL_ART_EXTENT}, 0., 1.);
    carving.rgb = cssSpaceToLinear(linearToCssSpace(carving.rgb) * reliefLight);
    return mix(backing, carving, coverage);
  }

  void main() {
    vec2 viewportPixel = vec2(vUv.x * uViewport.x, (1.0 - vUv.y) * uViewport.y);
    vec2 local = (viewportPixel - uProjection.xy) / uProjection.zw;
    vec2 incomingLocal = (viewportPixel - uIncomingProjection.xy) / uIncomingProjection.zw;
    float sceneCoverage = step(0.0, local.x)
      * step(local.x, 1.0)
      * step(0.0, local.y)
      * step(local.y, 1.0);
    float incomingCoverage = step(0.0, incomingLocal.x)
      * step(incomingLocal.x, 1.0)
      * step(0.0, incomingLocal.y)
      * step(incomingLocal.y, 1.0);
    if (max(sceneCoverage, incomingCoverage) < 0.001) discard;

    vec2 sampleUv = vec2(clamp(local.x, 0.0, 1.0), 1.0 - clamp(local.y, 0.0, 1.0));
    vec2 incomingSampleUv = vec2(
      clamp(incomingLocal.x, 0.0, 1.0),
      1.0 - clamp(incomingLocal.y, 0.0, 1.0)
    );
    vec4 sceneColor = paintedScene(uScene, vec2(sampleUv.x, 1.0 - sampleUv.y), uOutgoingSeal, uSealAngles.x);
    vec4 incomingColor = paintedScene(uIncomingScene, vec2(incomingSampleUv.x, 1.0 - incomingSampleUv.y), uIncomingSeal, uSealAngles.y);
    vec4 geometry = texture2D(uGeometry, sampleUv);
    ${CONTOUR_HANDOFF_GLSL}

    vec3 gradedScene = sceneColor.rgb;
    vec3 gradedIncoming = incomingColor.rgb;
    if (uApplyGrade > 0.5) {
      gradedScene = applyCssGrade(sceneColor.rgb, uOutgoingGrade);
      gradedIncoming = applyCssGrade(incomingColor.rgb, uIncomingGrade);
    }

    // Reveal the final live painting, including its native framing and grading.
    if (uRevealLiveScene > 0.5) {
      gl_FragColor = vec4(gradedScene, sceneColor.a * sceneCoverage * (1.0 - handoff));
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      return;
    }

    float sceneWeight = (1.0 - handoff) * sceneColor.a * sceneCoverage;
    float incomingWeight = handoff * incomingColor.a * incomingCoverage;
    float totalWeight = sceneWeight + incomingWeight;
    if (totalWeight < 0.001) discard;

    vec3 composed = (
      gradedScene * sceneWeight + gradedIncoming * incomingWeight
    ) / totalWeight;
    float composedLuminance = dot(composed, vec3(0.2126, 0.7152, 0.0722));
    float pigmentLuminance = max(0.08, dot(uPigment, vec3(0.2126, 0.7152, 0.0722)));
    vec3 luminousPigment = uPigment * (composedLuminance / pigmentLuminance);
    float edgeDeposit = wetEdge * edgePresence * (0.28 + paperFiber * 0.72);
    composed = mix(composed, luminousPigment, edgeDeposit * 0.045);
    composed += vec3(edgeDeposit * (0.004 + brokenWash * 0.008));
    gl_FragColor = vec4(composed, clamp(totalWeight, 0.0, 1.0) * uEnvelope);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;



function createTexture(image, colorTexture = false) {
  const texture = new THREE.Texture(image);
  texture.colorSpace = colorTexture ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

export const CinematicContourDissolve = memo(function CinematicContourDissolve({
  theme = 'default',
  className = '',
}) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        premultipliedAlpha: true,
      });
    } catch (error) {
      return undefined;
    }

    const resources = new Map();
    const resourceRetryAt = new Map();
    const sceneTextures = new Map();
    const geometryTextures = new Map();
    const projectionNodes = new Array(SCENE_PROJECTION_SELECTORS.length).fill(null);
    const motion = { ...getSpatialMotion() };
    const gatewayTransition = { ...getGatewayTransition() };
    const themeTransition = { ...getThemeContourTransition() };
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedQuery.matches;
    const initialGrade = THEME_GRADES[themeRef.current] || THEME_GRADES.default;
    const initialPigment = THEME_PIGMENTS[themeRef.current] || THEME_PIGMENTS.default;
    let disposed = false;
    let frame = 0;
    let width = 1;
    let height = 1;
    let renderedPixelRatio = 0;
    let gatewayTransitionPending = motion.scenePosition < 1;
    let fallbackProjection = { left: 0, top: 0, width: 1, height: 1, viewportWidth: 1 };
    let themeTransitionProjection = null;
    let themeTransitionProjectionToken = -1;
    let themeSealPose = getGateSealPose();
    let sealPreview = null;
    let preparedSealTexture = null;
    let preparedSealVersion = -1;

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = true;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uScene: { value: null },
        uIncomingScene: { value: null },
        uGeometry: { value: null },
        uViewport: { value: new THREE.Vector2(1, 1) },
        uProjection: { value: new THREE.Vector4(0, 0, 1, 1) },
        uIncomingProjection: { value: new THREE.Vector4(0, 0, 1, 1) },
        uSource: { value: new THREE.Vector2(0.5, 0.5) },
        uSourceReach: { value: 0.72 },
        uOriginFocus: { value: 0 },
        uProgress: { value: 0 },
        uEnvelope: { value: 0 },
        uOutgoingGrade: { value: new THREE.Vector4(...initialGrade) },
        uIncomingGrade: { value: new THREE.Vector4(...initialGrade) },
        uPigment: { value: new THREE.Vector3(...initialPigment) },
        uApplyGrade: { value: 0 },
        uRevealLiveScene: { value: 0 },
        uOutgoingSeal: { value: new THREE.Vector4() },
        uIncomingSeal: { value: new THREE.Vector4() },
        uSealAngles: { value: new THREE.Vector2() },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const requestResource = (filename) => {
      const existing = resources.get(filename);
      if (existing !== undefined && (existing !== false || performance.now() < resourceRetryAt.get(filename))) {
        resources.delete(filename); resources.set(filename, existing);
        return existing;
      }
      resources.set(filename, null);
      retryAssetLoad(() => loadCinematicGeometryField(filename).catch(() => null), { loaded: value => Boolean(value?.image) })
        .then((resource) => {
          if (disposed) return;
          resources.set(filename, resource || false);
          if (resource) { resourceRetryAt.delete(filename); scheduleDraw(); }
          else resourceRetryAt.set(filename, performance.now() + 5000);
          while (resources.size > MAX_GEOMETRY_TEXTURES) {
            const oldest = resources.keys().next().value;
            resources.delete(oldest); resourceRetryAt.delete(oldest);
          }
        })
        .catch(() => {
          if (!disposed) { resources.set(filename, false); resourceRetryAt.set(filename, performance.now() + 5000); }
        });
      return null;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      // Particle quality changes must never resize the background mid-dissolve.
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_PIXEL_RATIO,
        Math.sqrt(MAX_RENDER_PIXELS / (width * height)),
      );
      if (
        Math.abs(canvas.width - width * pixelRatio) < 1
        && Math.abs(canvas.height - height * pixelRatio) < 1
        && Math.abs(renderedPixelRatio - pixelRatio) < 0.01
      ) return;
      renderedPixelRatio = pixelRatio;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      material.uniforms.uViewport.value.set(width, height);
      fallbackProjection = getSceneCoverProjection(width, height);
      themeTransitionProjection = null;
    };

    const getProjectionNode = (sceneIndex) => {
      if (sceneIndex === 0) {
        const canvas = document.querySelector('.gateway-sequence-canvas');
        const frameIndex = Number.parseInt(canvas?.dataset.frameIndex || '0', 10);
        return document.querySelector(
          `.gateway-sequence-preloads img[data-frame-index="${frameIndex}"]`,
        );
      }
      const cached = projectionNodes[sceneIndex];
      if (cached?.isConnected) return cached;
      const node = document.querySelector(SCENE_PROJECTION_SELECTORS[sceneIndex]);
      projectionNodes[sceneIndex] = node;
      return node;
    };

    const getSceneTexture = (image) => {
      const source = image.currentSrc || image.src;
      const cached = sceneTextures.get(image);
      if (!cached) {
        const texture = createTexture(image, true);
        sceneTextures.set(image, { source, texture });
        return texture;
      }
      if (cached.source !== source) {
        cached.source = source;
        cached.texture.needsUpdate = true;
      }
      sceneTextures.delete(image); sceneTextures.set(image, cached);
      return cached.texture;
    };
    const trimTextures = () => {
      const activeTextures = new Set([
        material.uniforms.uScene.value,
        material.uniforms.uIncomingScene.value,
        material.uniforms.uGeometry.value,
      ]);
      for (const key of sceneTextures.keys()) {
        if (sceneTextures.size <= MAX_SCENE_TEXTURES) break;
        if (activeTextures.has(sceneTextures.get(key).texture)) continue;
        sceneTextures.get(key).texture.dispose(); sceneTextures.delete(key);
      }
      for (const key of geometryTextures.keys()) {
        if (geometryTextures.size <= MAX_GEOMETRY_TEXTURES) break;
        if (activeTextures.has(geometryTextures.get(key))) continue;
        geometryTextures.get(key).dispose(); geometryTextures.delete(key);
      }
      canvas.dataset.sceneTextures = String(sceneTextures.size);
      canvas.dataset.geometryTextures = String(geometryTextures.size);
    };

    const prepareGatePainting = () => {
      if (className.includes('boot-contour-dissolve') || document.hidden) return;
      const image = getProjectionNode(0);
      if (!image?.complete || !image.naturalWidth) return;
      const texture = getSceneTexture(image);
      if (texture === preparedSealTexture && texture.version === preparedSealVersion) return;
      // Upload and compile while the gate is resting, not on its first hover.
      renderer.initTexture(texture);
      material.uniforms.uScene.value = texture;
      material.uniforms.uIncomingScene.value = texture;
      material.uniforms.uGeometry.value = texture;
      renderer.compile(scene, camera);
      preparedSealTexture = texture;
      preparedSealVersion = texture.version;
      const incoming = getProjectionNode(1);
      if (incoming?.complete && incoming.naturalWidth) renderer.initTexture(getSceneTexture(incoming));
      requestResource(getCinematicGeometryAsset(themeRef.current, 0, 0));
      trimTextures();
      canvas.dataset.sealPrepared = image.currentSrc || image.src;
    };

    const clear = (reason = 'idle') => {
      canvas.style.visibility = 'hidden';
      canvas.dataset.sealState = reason;
      delete canvas.dataset.sealRendering;
      delete canvas.dataset.dissolveSource;
      delete canvas.dataset.dissolveProgress;
      renderer.clear();
    };

    const applyThemeGrades = (outgoingTheme, incomingTheme, progress = 0) => {
      const outgoingGrade = THEME_GRADES[outgoingTheme] || THEME_GRADES.default;
      const incomingGrade = THEME_GRADES[incomingTheme] || THEME_GRADES.default;
      const outgoingPigment = THEME_PIGMENTS[outgoingTheme] || THEME_PIGMENTS.default;
      const incomingPigment = THEME_PIGMENTS[incomingTheme] || THEME_PIGMENTS.default;
      material.uniforms.uOutgoingGrade.value.set(...outgoingGrade);
      material.uniforms.uIncomingGrade.value.set(...incomingGrade);
      material.uniforms.uPigment.value.set(
        THREE.MathUtils.lerp(outgoingPigment[0], incomingPigment[0], progress),
        THREE.MathUtils.lerp(outgoingPigment[1], incomingPigment[1], progress),
        THREE.MathUtils.lerp(outgoingPigment[2], incomingPigment[2], progress),
      );
    };

    const resolveTransition = () => {
      if (motion.scenePosition < 1) gatewayTransitionPending = true;
      if (
        gatewayTransitionPending
        && motion.scenePosition >= 1
        && gatewayTransition.handoff >= 0.99999
      ) {
        gatewayTransitionPending = false;
      }

      if (gatewayTransitionPending) {
        const gatewayProgress = clampUnit(gatewayTransition.progress);
        return {
          transition: {
            fromIndex: 0,
            toIndex: 1,
            mix: gatewayDissolveProgress(gatewayTransition.handoff),
          },
          blend: getTracerSceneBlend(themeRef.current, 0),
          gatewayFrameIndex: Math.round(gatewayProgress * (GATEWAY_FRAME_COUNT - 1)),
        };
      }

      const transition = getCinematicAtmosphereTransition(motion.scenePosition);
      return {
        transition,
        blend: getTracerSceneBlend(themeRef.current, motion.scenePosition),
        gatewayFrameIndex: 0,
      };
    };

    const draw = (now = performance.now()) => {
      frame = 0;
      if (disposed || reducedMotion) {
        clear('reduced-motion');
        return;
      }

      const themeTransitionActive = Boolean(
        themeTransition.active
        && themeTransition.fromImage
        && themeTransition.toImage
        && themeTransition.geometryImage,
      );
      // The top-level loader canvas owns this reveal. A second copy underneath
      // would reveal another dissolve instead of the final painting.
      if (themeTransitionActive && themeTransition.fromTheme === 'boot'
        && !className.includes('boot-contour-dissolve')) {
        clear();
        return;
      }
      let progress;
      let outgoingImage;
      let incomingImage;
      let geometryImage;
      let sourceField;
      let outgoingTheme;
      let incomingTheme;
      let envelope;
      const sealPose = getGateSealPose(now);
      if (!themeTransitionActive && sealPose.dissolving && sealPose.moving
        && sealPose.theme === themeRef.current && motion.scenePosition < .00001
        && !document.hidden) scheduleDraw();
      const sealPreviewActive = !themeTransitionActive && sealPose.dissolving
        && sealPose.theme === themeRef.current && motion.scenePosition < .00001
        && sealPose.angle > .00001 && !className.includes('boot-contour-dissolve');
      const continuingSeal = themeTransitionActive && themeTransition.kind === 'chapter'
        && themeTransition.sceneIndex === 0 && themeTransition.targetSceneIndex === 1
        && themeTransition.initialProgress > 0 && sealPreview?.theme === themeTransition.fromTheme;

      if (themeTransitionActive) {
        progress = themeTransition.progress;
        outgoingImage = themeTransition.fromImage;
        incomingImage = themeTransition.toImage;
        geometryImage = themeTransition.geometryImage;
        sourceField = getTracerSceneField(
          themeTransition.fromTheme,
          themeTransition.sceneIndex,
        );
        outgoingTheme = themeTransition.fromTheme;
        incomingTheme = themeTransition.toTheme;
        envelope = 1;
        // keep using the main watercolor material during theme transitions
      } else if (sealPreviewActive) {
        const geometryResource = requestResource(getCinematicGeometryAsset(themeRef.current, 0, 0));
        if (!geometryResource?.image) { clear('geometry-loading'); return; }
        progress = gateSealDissolveProgress(sealPose.angle);
        outgoingImage = getProjectionNode(0);
        incomingImage = getProjectionNode(1);
        geometryImage = geometryResource.image;
        sourceField = getTracerSceneField(themeRef.current, 0);
        outgoingTheme = incomingTheme = themeRef.current;
        envelope = 1;
      } else {
        const { transition, blend, gatewayFrameIndex } = resolveTransition();
        progress = transition.mix;
        if (
          blend.fromIndex === blend.toIndex
          || progress <= 0.00001
          || progress >= 0.99999
        ) {
          if (blend.fromIndex === 0 && !themeTransition.active) prepareGatePainting();
          sealPreview = null;
          clear('idle');
          return;
        }
        outgoingImage = getProjectionNode(blend.fromIndex);
        incomingImage = getProjectionNode(blend.toIndex);
        const filename = getCinematicGeometryAsset(
          themeRef.current,
          blend.fromIndex,
          gatewayFrameIndex,
        );
        const geometryResource = requestResource(filename);
        if (!geometryResource?.image) {
          clear('geometry-loading');
          return;
        }
        geometryImage = geometryResource.image;
        sourceField = blend.from;
        outgoingTheme = themeRef.current;
        incomingTheme = themeRef.current;
        envelope = dissolveEnvelope(progress);
      }

      if (
        !outgoingImage?.complete
        || !outgoingImage.naturalWidth
        || !incomingImage?.complete
        || !incomingImage.naturalWidth
        || (!themeTransitionActive && outgoingImage.dataset?.src && !isPaintingReady(outgoingImage))
        || (!themeTransitionActive && incomingImage.dataset?.src && !isPaintingReady(incomingImage))
      ) {
        clear('painting-loading');
        return;
      }

      const outgoingTexture = getSceneTexture(outgoingImage);
      const incomingTexture = getSceneTexture(incomingImage);
      if (!geometryTextures.has(geometryImage)) {
        geometryTextures.set(geometryImage, createTexture(geometryImage));
      }
      const geometryTexture = geometryTextures.get(geometryImage);
      geometryTextures.delete(geometryImage); geometryTextures.set(geometryImage, geometryTexture);

      let projection;
      let incomingProjection;
      const carriesSealPreview = continuingSeal && sealPreview.theme === outgoingTheme;
      if (themeTransitionActive) {
        if (themeTransitionProjectionToken !== themeTransition.token) {
          themeTransitionProjection = null;
          themeTransitionProjectionToken = themeTransition.token;
        }
        const liveSceneImage = outgoingTheme === 'boot'
          ? document.getElementById('boot-gateway-frame')
          : getProjectionNode(themeTransition.sceneIndex);
        if (!themeTransitionProjection) {
          themeTransitionProjection = carriesSealPreview ? sealPreview.outgoingProjection : readSceneImageProjection(
            liveSceneImage,
            themeTransitionProjection || fallbackProjection,
            width,
          );
        }
        projection = themeTransitionProjection;
        incomingProjection = readSceneImageProjection(
          getProjectionNode(themeTransition.targetSceneIndex), fallbackProjection, width,
        );
        if (carriesSealPreview) {
          const follow = smootherStep(themeTransition.linearProgress);
          incomingProjection = { ...incomingProjection };
          for (const key of ['left', 'top', 'width', 'height']) {
            incomingProjection[key] = THREE.MathUtils.lerp(sealPreview.incomingProjection[key], incomingProjection[key], follow);
          }
        }
      } else {
        projection = readSceneImageProjection(outgoingImage, fallbackProjection, width);
        incomingProjection = readSceneImageProjection(
          incomingImage,
          fallbackProjection,
          width,
        );
        if (sealPreviewActive) sealPreview = { theme: outgoingTheme, outgoingProjection: projection, incomingProjection };
        else sealPreview = null;
      }
      const source = sourceField?.source || [0.5, 0.5];
      applyThemeGrades(outgoingTheme, incomingTheme, progress);
      const outgoingIsHome = themeTransitionActive
        ? themeTransition.sceneIndex === 0
        : sealPreviewActive || sourceField?.motif === 'gateway';
      const incomingIsHome = themeTransitionActive
        ? (themeTransition.targetSceneIndex ?? themeTransition.sceneIndex) === 0
        : incomingImage === getProjectionNode(0);
      const setSealBounds = (uniform, image, enabled) => {
        if (!enabled) { uniform.value.set(0, 0, 0, 0); return; }
        const bounds = gateSealFaceBounds(image.naturalHeight > image.naturalWidth);
        uniform.value.set(bounds.x, bounds.y, bounds.radiusX, bounds.radiusY);
      };
      const outgoingPose = themeTransitionActive ? themeSealPose : sealPose;
      const outgoingAngle = outgoingIsHome && outgoingPose.theme === outgoingTheme ? outgoingPose.angle : 0;
      const incomingAngle = incomingIsHome && sealPose.theme === incomingTheme ? sealPose.angle : 0;
      setSealBounds(material.uniforms.uOutgoingSeal, outgoingImage, outgoingIsHome);
      setSealBounds(material.uniforms.uIncomingSeal, incomingImage, incomingIsHome);
      material.uniforms.uSealAngles.value.set(THREE.MathUtils.degToRad(outgoingAngle), THREE.MathUtils.degToRad(incomingAngle));
      // Authored watercolor plates already contain their final lighting. Match
      // the live DOM's unfiltered art instead of reapplying the legacy grade.
      if ((outgoingIsHome || outgoingImage.src.includes('/painted-v1/')) && outgoingTheme !== 'boot') {
        material.uniforms.uOutgoingGrade.value.set(1, 0, 1, 1);
      }
      if (incomingIsHome || incomingImage.src.includes('/painted-v1/')) {
        material.uniforms.uIncomingGrade.value.set(1, 0, 1, 1);
      }
      // Explicit handoffs compose both decoded snapshots for the entire passage.
      // The store releases this cover only after the native painting is ready.
      material.uniforms.uRevealLiveScene.value = incomingIsHome && outgoingTheme === 'boot' ? 1 : 0;
      material.uniforms.uScene.value = outgoingTexture;
      material.uniforms.uIncomingScene.value = incomingTexture;
      material.uniforms.uGeometry.value = geometryTextures.get(geometryImage);
      material.uniforms.uProjection.value.set(
        projection.left,
        projection.top,
        projection.width,
        projection.height,
      );
      material.uniforms.uIncomingProjection.value.set(
        incomingProjection.left,
        incomingProjection.top,
        incomingProjection.width,
        incomingProjection.height,
      );
      material.uniforms.uSource.value.set(source[0], source[1]);
      material.uniforms.uOriginFocus.value = sourceField?.motif === 'gateway' ? 1 : 0;
      material.uniforms.uSourceReach.value = Math.max(0.25, sourceField?.sourceReach || 0.72);
      material.uniforms.uProgress.value = progress;
      material.uniforms.uEnvelope.value = envelope;
      // The CSS-filtered live plates and this canvas must use the same grade.
      // Without it, a chapter dissolve briefly exposes an ungraded source image
      // before the settled background takes over.
      material.uniforms.uApplyGrade.value = 1;
      canvas.style.visibility = 'visible';
      canvas.dataset.sealState = 'rendering';

      renderer.render(scene, camera);
      trimTextures();
      canvas.dataset.sealRendering = 'background-dissolve';
      canvas.dataset.dissolveSource = sealPreviewActive ? 'seal' : themeTransitionActive ? themeTransition.kind : 'scroll';
      canvas.dataset.dissolveProgress = progress.toFixed(5);
    };

    const scheduleDraw = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(draw);
    };

    const unsubscribe = subscribeSpatialMotion((next) => {
      Object.assign(motion, next);
      const resolved = resolveTransition();
      requestResource(getCinematicGeometryAsset(
        themeRef.current,
        resolved.transition.fromIndex,
        resolved.gatewayFrameIndex,
      ));
      scheduleDraw();
    });
    const unsubscribeGateway = subscribeGatewayTransition((next) => {
      Object.assign(gatewayTransition, next);
      if (!gatewayTransitionPending && motion.scenePosition >= 1) return;
      requestResource(getCinematicGeometryAsset(
        themeRef.current,
        0,
        Math.round(clampUnit(next.progress) * (GATEWAY_FRAME_COUNT - 1)),
      ));
      scheduleDraw();
    });
    const unsubscribeThemeTransition = subscribeThemeContourTransition((next) => {
      if (next.active && next.token !== themeTransition.token) themeSealPose = getGateSealPose();
      Object.assign(themeTransition, next);
      if (!next.active) {
        themeTransitionProjection = null;
        themeTransitionProjectionToken = -1;
      }
      scheduleDraw();
    });
    const unsubscribeSeal = subscribeGateSealTurn(scheduleDraw);
    const sceneRoot = canvas.parentElement;
    const paintingLoaded = event => {
      if (event.target.matches?.(SCENE_PROJECTION_SELECTORS.join(','))) scheduleDraw();
    };
    sceneRoot.addEventListener('load', paintingLoaded, true);
    const preference = () => { reducedMotion = reducedQuery.matches; scheduleDraw(); };
    reducedQuery.addEventListener('change', preference);
    const observer = new ResizeObserver(() => {
      resize();
      scheduleDraw();
    });
    observer.observe(canvas);
    resize();
    clear();
    scheduleDraw();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      unsubscribe();
      unsubscribeGateway();
      unsubscribeThemeTransition();
      unsubscribeSeal();
      sceneRoot.removeEventListener('load', paintingLoaded, true);
      reducedQuery.removeEventListener('change', preference);

      sceneTextures.forEach(({ texture }) => texture.dispose());
      geometryTextures.forEach((texture) => texture.dispose());
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`cinematic-contour-dissolve ${className}`.trim()}
      aria-hidden="true"
    />
  );
});
