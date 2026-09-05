import { memo, useEffect, useRef } from 'react';
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

const MAX_PIXEL_RATIO = 0.64;
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
  boot: Object.freeze([0.32, 0, 0.48, 1.1]),
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
  uniform float uProgress;
  uniform float uEnvelope;
  uniform vec4 uOutgoingGrade;
  uniform vec4 uIncomingGrade;
  uniform vec3 uPigment;
  uniform float uApplyGrade;
  varying vec2 vUv;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float watercolorNoise(vec2 point) {
    vec2 cell = floor(point);
    vec2 fraction = fract(point);
    vec2 blend = fraction * fraction * (3.0 - 2.0 * fraction);
    float lower = mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), blend.x);
    float upper = mix(
      hash21(cell + vec2(0.0, 1.0)),
      hash21(cell + vec2(1.0, 1.0)),
      blend.x
    );
    return mix(lower, upper, blend.y);
  }

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
    vec4 sceneColor = texture2D(uScene, sampleUv);
    vec4 incomingColor = texture2D(uIncomingScene, incomingSampleUv);
    vec4 geometry = texture2D(uGeometry, sampleUv);
    vec2 flow = geometry.rg * 2.0 - 1.0;
    flow /= max(0.18, length(flow));
    float energy = geometry.b;
    float pigment = clamp(geometry.a * 0.64 + energy * 0.36, 0.0, 1.0);

    float flowPresence = smoothstep(0.0, 0.12, uProgress);
    float edgePresence = flowPresence * (1.0 - smoothstep(0.9, 1.0, uProgress));
    float flowTravel = sin(uProgress * 3.14159265);
    float broadWash = watercolorNoise(
      local * 5.2 + uSource * 9.7 + flow * uProgress * 1.35
    );
    float brokenWash = watercolorNoise(
      local * 13.4
        + flow * (1.8 + uProgress * 2.1)
        + vec2(uSource.y, -uSource.x) * 7.1
    );
    float paperFiber = watercolorNoise(
      local * vec2(47.0, 103.0) + flow * 3.2 + uSource * 19.0
    );
    vec2 bleedPosition = local
      + flow * (broadWash - 0.5) * (0.035 + energy * 0.026)
      - flow * flowTravel * (0.009 + energy * 0.012);

    float bloomSide = uSource.x < 0.5 ? 1.0 : -1.0;
    vec2 secondBloom = clamp(
      uSource + vec2(bloomSide * 0.24, 0.13),
      vec2(0.08),
      vec2(0.92)
    );
    vec2 thirdBloom = clamp(
      uSource + vec2(-bloomSide * 0.17, -0.22),
      vec2(0.08),
      vec2(0.92)
    );
    float reach = max(0.2, uSourceReach);
    float primaryOrder = distance(bleedPosition, uSource) / reach;
    float secondOrder = distance(bleedPosition, secondBloom) / (reach * 0.84) + 0.14;
    float thirdOrder = distance(bleedPosition, thirdBloom) / (reach * 0.76) + 0.28;
    float bloomOrder = min(primaryOrder, min(secondOrder, thirdOrder));
    vec2 bloomDelta = bleedPosition - uSource;
    float bloomAngle = atan(bloomDelta.y, bloomDelta.x);
    float edgeFlourish = sin(bloomAngle * 3.0 + broadWash * 4.8) * 0.032
      + sin(bloomAngle * 7.0 - brokenWash * 5.4) * 0.014;
    float contourOrder = clamp(
      bloomOrder * 0.68
        + (1.0 - pigment) * 0.2
        + (broadWash - 0.5) * 0.13
        + edgeFlourish,
      0.0,
      1.0
    );
    float paintProgress = smoothstep(0.015, 0.985, uProgress);
    float contourLift = smoothstep(0.14, 0.84, pigment) * 0.155 * flowPresence;
    float wetEdgeWidth = mix(
      0.014,
      0.052 + brokenWash * 0.04 + energy * 0.014,
      flowPresence
    );
    float edgeDistance = abs(paintProgress + contourLift - contourOrder);
    float wetEdge = 1.0 - smoothstep(
      wetEdgeWidth * 0.28,
      wetEdgeWidth * 1.72,
      edgeDistance
    );
    float handoff = smoothstep(
      contourOrder - wetEdgeWidth,
      contourOrder + wetEdgeWidth,
      paintProgress + contourLift
    );
    handoff = clamp(
      handoff * flowPresence + (paperFiber - 0.5) * wetEdge * edgePresence * 0.075,
      0.0,
      1.0
    );

    vec3 gradedScene = sceneColor.rgb;
    vec3 gradedIncoming = incomingColor.rgb;
    if (uApplyGrade > 0.5) {
      gradedScene = applyCssGrade(sceneColor.rgb, uOutgoingGrade);
      gradedIncoming = applyCssGrade(incomingColor.rgb, uIncomingGrade);
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
    const sceneTextures = new Map();
    const geometryTextures = new Map();
    const projectionNodes = new Array(SCENE_PROJECTION_SELECTORS.length).fill(null);
    const motion = { ...getSpatialMotion() };
    const gatewayTransition = { ...getGatewayTransition() };
    const themeTransition = { ...getThemeContourTransition() };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        uProgress: { value: 0 },
        uEnvelope: { value: 0 },
        uOutgoingGrade: { value: new THREE.Vector4(...initialGrade) },
        uIncomingGrade: { value: new THREE.Vector4(...initialGrade) },
        uPigment: { value: new THREE.Vector3(...initialPigment) },
        uApplyGrade: { value: 0 },
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
      if (existing !== undefined) return existing;
      resources.set(filename, null);
      loadCinematicGeometryField(filename)
        .then((resource) => {
          if (disposed) return;
          resources.set(filename, resource);
          scheduleDraw();
        })
        .catch(() => {
          if (!disposed) resources.set(filename, false);
        });
      return null;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      const qualityScale = root.classList.contains('motion-quality-low')
        ? 0.75
        : root.classList.contains('motion-quality-balanced')
          ? 0.86
          : 1;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO) * qualityScale;
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      if (
        Math.abs(canvas.width - width * pixelRatio) < 1
        && Math.abs(canvas.height - height * pixelRatio) < 1
        && Math.abs(renderedPixelRatio - pixelRatio) < 0.01
      ) return;
      renderedPixelRatio = pixelRatio;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      material.uniforms.uViewport.value.set(width, height);
      const stageWidth = Math.max(width, height * 16 / 9);
      const stageHeight = stageWidth * 9 / 16;
      fallbackProjection = {
        left: (width - stageWidth) / 2,
        top: (height - stageHeight) / 2,
        width: stageWidth,
        height: stageHeight,
        viewportWidth: width,
      };
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
      return cached.texture;
    };

    const clear = () => {
      canvas.style.visibility = 'hidden';
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

    const draw = () => {
      frame = 0;
      if (disposed || reducedMotion) {
        clear();
        return;
      }

      const themeTransitionActive = Boolean(
        themeTransition.active
        && themeTransition.fromImage
        && themeTransition.toImage
        && themeTransition.geometryImage,
      );
      let progress;
      let outgoingImage;
      let incomingImage;
      let geometryImage;
      let sourceField;
      let outgoingTheme;
      let incomingTheme;
      let envelope;

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
      } else {
        const { transition, blend, gatewayFrameIndex } = resolveTransition();
        progress = transition.mix;
        if (
          blend.fromIndex === blend.toIndex
          || progress <= 0.00001
          || progress >= 0.99999
        ) {
          clear();
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
          clear();
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
      ) {
        clear();
        return;
      }

      const outgoingTexture = getSceneTexture(outgoingImage);
      const incomingTexture = getSceneTexture(incomingImage);
      if (!geometryTextures.has(geometryImage)) {
        geometryTextures.set(geometryImage, createTexture(geometryImage));
      }

      resize();
      let projection;
      let incomingProjection;
      if (themeTransitionActive) {
        if (themeTransitionProjectionToken !== themeTransition.token) {
          themeTransitionProjection = null;
          themeTransitionProjectionToken = themeTransition.token;
        }
        const liveSceneImage = getProjectionNode(themeTransition.sceneIndex);
        themeTransitionProjection = readSceneImageProjection(
          liveSceneImage,
          themeTransitionProjection || fallbackProjection,
          width,
        );
        projection = themeTransitionProjection;
        incomingProjection = themeTransitionProjection;
      } else {
        projection = readSceneImageProjection(outgoingImage, fallbackProjection, width);
        incomingProjection = readSceneImageProjection(
          incomingImage,
          fallbackProjection,
          width,
        );
      }
      const source = sourceField?.source || [0.5, 0.5];
      applyThemeGrades(outgoingTheme, incomingTheme, progress);
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
      material.uniforms.uSourceReach.value = Math.max(0.25, sourceField?.sourceReach || 0.72);
      material.uniforms.uProgress.value = progress;
      material.uniforms.uEnvelope.value = envelope;
      // The CSS-filtered live plates and this canvas must use the same grade.
      // Without it, a chapter dissolve briefly exposes an ungraded source image
      // before the settled background takes over.
      material.uniforms.uApplyGrade.value = 1;
      canvas.style.visibility = 'visible';

      renderer.render(scene, camera);
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
      Object.assign(themeTransition, next);
      if (!next.active) {
        themeTransitionProjection = null;
        themeTransitionProjectionToken = -1;
      }
      scheduleDraw();
    });
    const observer = new ResizeObserver(() => {
      resize();
      scheduleDraw();
    });
    observer.observe(canvas);
    resize();
    clear();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      unsubscribe();
      unsubscribeGateway();
      unsubscribeThemeTransition();

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
