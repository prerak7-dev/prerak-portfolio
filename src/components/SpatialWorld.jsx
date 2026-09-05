import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getCinematicAssets } from '../data/cinematicAssets.js';
import { createAssetPath } from '../security/contentSecurity.js';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { FRAME_INTERVAL_120_HZ, toggleCachedClass } from '../utils/motionPerformance.js';

const MAX_PARTICLE_PIXEL_RATIO = 0.78;
const MIN_PARTICLE_QUALITY = 0.62;
const QUALITY_SAMPLE_FRAMES = 72;
const QUALITY_ADJUST_COOLDOWN_MS = 1800;
const CAMERA_RESPONSE_MS = 470;

const PARTICLE_PROFILES = Object.freeze({
  default: { mode: 0, size: 29, opacity: 0.4, alphaCutoff: 0.25, density: 1.12, saturation: 0.38, brightness: 0.96, tint: 0xb8ad95 },
  spring: { mode: 1, size: 29, opacity: 0.45, alphaCutoff: 0.09, density: 1.15, saturation: 0.58, brightness: 0.96, tint: 0xd0dcc3 },
  fall: { mode: 2, size: 29, opacity: 0.46, alphaCutoff: 0.09, density: 1.13, saturation: 0.65, brightness: 0.98, tint: 0xd2a17a },
  winter: { mode: 3, size: 29, opacity: 0.44, alphaCutoff: 0.07, density: 1.18, saturation: 0.25, brightness: 1.04, tint: 0xe7f0f2 },
});

const PARTICLE_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBaseSize;
  uniform float uThemeMode;
  uniform float uIntensity;
  attribute float aSize;
  attribute float aSeed;
  attribute float aSprite;
  varying float vRotation;
  varying float vSeed;
  varying float vSprite;
  varying float vDepthFade;

  const float TAU = 6.28318530718;

  float wrap(float value, float radius) {
    return mod(value + radius, radius * 2.0) - radius;
  }

  void main() {
    vec3 animated = position;
    float phase = aSeed * TAU;
    float speed = 0.72 + uIntensity * 0.28;
    float rotation = phase;

    if (uThemeMode < 0.5) {
      animated.x = wrap(position.x + uTime * (0.18 + aSeed * 0.24) * speed, 10.0);
      animated.y += sin(uTime * 0.42 + phase + position.x * 0.24) * (0.1 + aSeed * 0.24);
      animated.z += sin(uTime * 0.18 + phase) * 0.22;
      rotation += uTime * (0.08 + aSeed * 0.18);
    } else if (uThemeMode < 1.5) {
      animated.x = wrap(position.x + uTime * (0.12 + aSeed * 0.22) * speed + sin(uTime * 0.58 + phase) * 0.55, 10.0);
      animated.y = wrap(position.y - uTime * (0.035 + aSeed * 0.055) * speed + sin(uTime * 0.74 + phase + position.x * 0.31) * (0.22 + aSeed * 0.42), 6.8);
      animated.z += cos(uTime * 0.38 + phase) * 0.42;
      rotation += uTime * (0.42 + aSeed * 1.12) + sin(uTime * 0.72 + phase) * 0.8;
    } else if (uThemeMode < 2.5) {
      animated.x = wrap(position.x + uTime * (0.22 + aSeed * 0.32) * speed + sin(uTime * 0.47 + phase) * (0.48 + aSeed * 0.7), 10.0);
      animated.y = wrap(position.y - uTime * (0.12 + aSeed * 0.2) * speed + cos(uTime * 0.61 + phase) * 0.38, 6.8);
      animated.z += sin(uTime * 0.55 + phase + position.y * 0.2) * 0.58;
      rotation += uTime * (0.68 + aSeed * 1.55) + sin(uTime * 0.9 + phase) * 1.05;
    } else {
      animated.x = wrap(position.x + uTime * (0.035 + aSeed * 0.08) * speed + sin(uTime * (0.28 + aSeed * 0.34) + phase) * (0.24 + aSeed * 0.52), 10.0);
      animated.y = wrap(position.y - uTime * (0.1 + aSeed * 0.14) * speed, 6.8);
      animated.z += cos(uTime * 0.36 + phase) * 0.32;
      rotation += uTime * (0.06 + aSeed * 0.22);
    }

    vRotation = rotation;
    vSeed = aSeed;
    vSprite = aSprite;
    vec4 viewPosition = modelViewMatrix * vec4(animated, 1.0);
    float viewDepth = -viewPosition.z;
    float perspective = clamp(5.5 / max(1.0, viewDepth), 0.46, 1.18);
    vDepthFade = 1.0 - smoothstep(9.0, 22.0, viewDepth);
    gl_PointSize = uBaseSize * aSize * uPixelRatio * perspective;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const PARTICLE_FRAGMENT_SHADER = `
  uniform sampler2D uAtlas;
  uniform float uOpacity;
  uniform float uAlphaCutoff;
  uniform float uIntensity;
  uniform float uDensity;
  uniform float uSaturation;
  uniform float uBrightness;
  uniform vec3 uTint;
  varying float vRotation;
  varying float vSeed;
  varying float vSprite;
  varying float vDepthFade;

  mat2 rotate2d(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    float visibleFraction = clamp((0.16 + uIntensity * 0.23) * uDensity, 0.14, 0.62);
    if (vSeed > visibleFraction) discard;

    vec2 localUv = rotate2d(vRotation) * (gl_PointCoord - 0.5) + 0.5;
    if (localUv.x < 0.0 || localUv.x > 1.0 || localUv.y < 0.0 || localUv.y > 1.0) discard;

    float sprite = floor(vSprite);
    float column = mod(sprite, 4.0);
    float row = floor(sprite / 4.0);
    vec2 atlasUv = (vec2(column, row) + localUv) * 0.25;
    vec4 texel = texture2D(uAtlas, atlasUv);
    float luminance = dot(texel.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 graded = mix(vec3(luminance), texel.rgb, uSaturation);
    graded = mix(graded, graded * uTint, 0.24) * uBrightness;
    float alphaVariation = 0.76 + 0.24 * sin(vSeed * 93.7);
    float depthOpacity = mix(0.46, 1.0, vDepthFade);
    float alpha = smoothstep(uAlphaCutoff, min(0.98, uAlphaCutoff + 0.24), texel.a)
      * uOpacity
      * alphaVariation
      * depthOpacity;
    if (alpha < 0.009) discard;
    gl_FragColor = vec4(graded, alpha);
  }
`;

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createParticleGeometry(count = 320) {
  const random = seededRandom(4817);
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);
  const sprites = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (random() - 0.5) * 20;
    positions[index * 3 + 1] = (random() - 0.5) * 13.6;
    positions[index * 3 + 2] = -2.5 - random() * 15.5;
    sizes[index] = 0.46 + random() * 0.72;
    seeds[index] = random();
    sprites[index] = Math.floor(random() * 16);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute('aSprite', new THREE.BufferAttribute(sprites, 1));
  return geometry;
}

function createFallbackTexture() {
  const texture = new THREE.DataTexture(new Uint8Array([255, 255, 255, 0]), 1, 1);
  texture.needsUpdate = true;
  return texture;
}

function configureTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function measureRefreshInterval(sampleCount = 24) {
  if (document.hidden) return Promise.resolve(FRAME_INTERVAL_120_HZ * 2);
  return new Promise((resolve) => {
    const samples = [];
    let previous = 0;

    const sample = (timestamp) => {
      if (previous) samples.push(timestamp - previous);
      previous = timestamp;
      if (samples.length < sampleCount) {
        window.requestAnimationFrame(sample);
        return;
      }

      const stableSamples = samples
        .filter((interval) => interval > 3 && interval < 25)
        .sort((a, b) => a - b);
      const sampleIndex = Math.floor(stableSamples.length * 0.3);
      resolve(stableSamples[sampleIndex] || FRAME_INTERVAL_120_HZ * 2);
    };

    window.requestAnimationFrame(sample);
  });
}

async function loadThemeTexture(loader, themeId) {
  const url = createAssetPath(import.meta.env.BASE_URL, getCinematicAssets(themeId).particles);
  try {
    return configureTexture(await loader.loadAsync(url));
  } catch (error) {
    return createFallbackTexture();
  }
}

function applyProfile(material, textures, themeId) {
  const profile = PARTICLE_PROFILES[themeId] || PARTICLE_PROFILES.default;
  material.uniforms.uAtlas.value = textures[themeId] || textures.__fallback;
  material.uniforms.uBaseSize.value = profile.size;
  material.uniforms.uThemeMode.value = profile.mode;
  material.uniforms.uOpacity.value = profile.opacity;
  material.uniforms.uAlphaCutoff.value = profile.alphaCutoff;
  material.uniforms.uDensity.value = profile.density;
  material.uniforms.uSaturation.value = profile.saturation;
  material.uniforms.uBrightness.value = profile.brightness;
  material.uniforms.uTint.value.setHex(profile.tint);
}

export function SpatialWorld({ theme, atmospherePower, onReady }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ scenePosition: 0, velocity: 0, theme, atmospherePower });
  const readyRef = useRef(onReady);

  useEffect(() => {
    stateRef.current.theme = theme;
    stateRef.current.atmospherePower = atmospherePower;
  }, [theme, atmospherePower]);

  useEffect(() => subscribeSpatialMotion(({ scenePosition, velocity }) => {
    stateRef.current.scenePosition = scenePosition;
    stateRef.current.velocity = velocity;
  }), []);

  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    let frameId = 0;
    let renderer;
    let resizeObserver;
    let resizeHandler;
    let geometry;
    let material;
    let textures = {};
    let textureLoader;
    let visibilityHandler;
    const texturePromises = new Map();
    const pointer = { x: 0, y: 0 };

    const onPointerMove = (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };

    const initialize = async () => {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      });
      const basePixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PARTICLE_PIXEL_RATIO);
      let qualityScale = 1;
      let pixelRatio = basePixelRatio;
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = 'spatial-world-canvas';
      renderer.domElement.setAttribute('aria-hidden', 'true');
      mount.appendChild(renderer.domElement);

      textureLoader = new THREE.TextureLoader();
      textures.__fallback = createFallbackTexture();
      const ensureThemeTexture = (themeId) => {
        if (textures[themeId]) return Promise.resolve(textures[themeId]);
        if (texturePromises.has(themeId)) return texturePromises.get(themeId);
        const pending = loadThemeTexture(textureLoader, themeId).then((texture) => {
          texturePromises.delete(themeId);
          if (disposed) {
            texture.dispose();
            return textures.__fallback;
          }
          textures[themeId] = texture;
          renderer?.initTexture(texture);
          return texture;
        });
        texturePromises.set(themeId, pending);
        return pending;
      };

      await ensureThemeTexture(stateRef.current.theme);
      if (disposed) {
        Object.values(textures).forEach((texture) => texture.dispose());
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 40);
      camera.position.set(0, 0, 5.5);
      geometry = createParticleGeometry();
      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: pixelRatio },
          uBaseSize: { value: PARTICLE_PROFILES.default.size },
          uThemeMode: { value: PARTICLE_PROFILES.default.mode },
          uIntensity: { value: 1 },
          uAtlas: { value: textures.default },
          uOpacity: { value: PARTICLE_PROFILES.default.opacity },
          uAlphaCutoff: { value: PARTICLE_PROFILES.default.alphaCutoff },
          uDensity: { value: PARTICLE_PROFILES.default.density },
          uSaturation: { value: PARTICLE_PROFILES.default.saturation },
          uBrightness: { value: PARTICLE_PROFILES.default.brightness },
          uTint: { value: new THREE.Color(PARTICLE_PROFILES.default.tint) },
        },
        vertexShader: PARTICLE_VERTEX_SHADER,
        fragmentShader: PARTICLE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.NormalBlending,
      });

      const particleField = new THREE.Points(geometry, material);
      particleField.frustumCulled = false;
      scene.add(particleField);
      applyProfile(material, textures, stateRef.current.theme);

      const resize = () => {
        if (!renderer) return;
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        material.uniforms.uPixelRatio.value = pixelRatio;
      };
      resizeHandler = resize;
      resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
      resizeObserver?.observe(mount);
      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      resize();

      Object.values(textures).forEach((texture) => renderer.initTexture(texture));
      renderer.compile(scene, camera);
      renderer.render(scene, camera);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      readyRef.current?.();
      const startTime = performance.now();
      let currentTheme = stateRef.current.theme;
      let refreshInterval = FRAME_INTERVAL_120_HZ * 2;
      let previousFrameTime = 0;
      let lastParticleRenderTime = 0;
      let lastQualityAdjustment = startTime;
      let stableQualityWindows = 0;
      let constrainedQualityWindows = 0;
      let frameIntervals = [];

      const setQualityMarkers = () => {
        const tier = qualityScale < 0.74
          ? 'low'
          : qualityScale < 0.9
            ? 'balanced'
            : 'high';
        toggleCachedClass(document.documentElement, 'motion-quality-balanced', tier === 'balanced');
        toggleCachedClass(document.documentElement, 'motion-quality-low', tier === 'low');
        document.documentElement.dataset.motionQuality = tier;
        document.documentElement.dataset.motionScale = qualityScale.toFixed(2);
      };

      const applyQualityScale = (nextScale) => {
        const clampedScale = THREE.MathUtils.clamp(nextScale, MIN_PARTICLE_QUALITY, 1);
        if (Math.abs(clampedScale - qualityScale) < 0.005) return;
        qualityScale = clampedScale;
        pixelRatio = basePixelRatio * qualityScale;
        renderer.setPixelRatio(pixelRatio);
        material.uniforms.uPixelRatio.value = pixelRatio;
        setQualityMarkers();
        resize();
      };

      setQualityMarkers();
      measureRefreshInterval().then((measuredInterval) => {
        if (disposed) return;
        refreshInterval = measuredInterval;
        document.documentElement.dataset.displayHz = String(Math.round(1000 / measuredInterval));
      });

      const updateAdaptiveQuality = (timestamp, frameInterval) => {
        frameIntervals.push(frameInterval);
        if (frameIntervals.length < QUALITY_SAMPLE_FRAMES) return;

        const droppedFrames = frameIntervals.filter(
          (interval) => interval > refreshInterval * 1.55,
        ).length;
        const droppedRatio = droppedFrames / frameIntervals.length;
        const sortedIntervals = [...frameIntervals].sort((a, b) => a - b);
        const p90 = sortedIntervals[Math.floor(sortedIntervals.length * 0.9)];
        const median = sortedIntervals[Math.floor(sortedIntervals.length * 0.5)];
        document.documentElement.dataset.motionFps = String(Math.round(1000 / Math.max(1, median)));
        document.documentElement.dataset.motionP90Ms = p90.toFixed(1);
        document.documentElement.dataset.motionDropped = droppedRatio.toFixed(2);
        frameIntervals = [];

        if (timestamp - lastQualityAdjustment < QUALITY_ADJUST_COOLDOWN_MS) return;
        if (droppedRatio > 0.12 || p90 > refreshInterval * 1.55) {
          constrainedQualityWindows += 1;
          stableQualityWindows = 0;
          if (constrainedQualityWindows >= 2) {
            applyQualityScale(qualityScale - 0.1);
            constrainedQualityWindows = 0;
            lastQualityAdjustment = timestamp;
          }
          return;
        }
        constrainedQualityWindows = 0;

        if (droppedRatio < 0.025 && p90 < refreshInterval * 1.18 && qualityScale < 1) {
          stableQualityWindows += 1;
          if (stableQualityWindows >= 4) {
            applyQualityScale(qualityScale + 0.04);
            stableQualityWindows = 0;
            lastQualityAdjustment = timestamp;
          }
        } else {
          stableQualityWindows = 0;
        }
      };

      const animate = (timestamp) => {
        frameId = 0;
        if (disposed || document.hidden) return;

        const frameInterval = previousFrameTime
          ? Math.min(50, Math.max(1, timestamp - previousFrameTime))
          : refreshInterval;
        previousFrameTime = timestamp;
        const runtime = stateRef.current;
        const displayHz = Math.max(60, 1000 / Math.max(1, refreshInterval));
        const isTransitioning = Math.abs(
          runtime.scenePosition - Math.round(runtime.scenePosition)
        ) > 0.001 || Math.abs(runtime.velocity || 0) > 0.01;
        if (isTransitioning) {
          updateAdaptiveQuality(timestamp, frameInterval);
          frameId = window.requestAnimationFrame(animate);
          return;
        }
        const particleTargetHz = Math.min(60, displayHz);
        const particleFrameInterval = 1000 / particleTargetHz;
        if (
          lastParticleRenderTime
          && timestamp - lastParticleRenderTime < particleFrameInterval - 0.4
        ) {
          updateAdaptiveQuality(timestamp, frameInterval);
          frameId = window.requestAnimationFrame(animate);
          return;
        }
        lastParticleRenderTime = timestamp;

        const intensity = THREE.MathUtils.clamp(Number(runtime.atmospherePower) || 1, 0.35, 1.7);
        if (runtime.theme !== currentTheme) {
          currentTheme = runtime.theme;
          applyProfile(material, textures, currentTheme);
          if (!textures[currentTheme]) {
            const requestedTheme = currentTheme;
            ensureThemeTexture(requestedTheme).then(() => {
              if (!disposed && stateRef.current.theme === requestedTheme) {
                applyProfile(material, textures, requestedTheme);
              }
            });
          }
        }

        material.uniforms.uTime.value = reduceMotion ? 0 : (timestamp - startTime) * 0.001;
        if (material.uniforms.uIntensity.value !== intensity) {
          material.uniforms.uIntensity.value = intensity;
        }
        const cameraTargetX = reduceMotion ? 0 : pointer.x * 0.2;
        const cameraTargetY = reduceMotion ? 0 : -pointer.y * 0.12;
        const cameraResponse = 1 - Math.exp(-frameInterval / CAMERA_RESPONSE_MS);
        camera.position.x += (cameraTargetX - camera.position.x) * cameraResponse;
        camera.position.y += (cameraTargetY - camera.position.y) * cameraResponse;
        camera.lookAt(camera.position.x * 0.1, camera.position.y * 0.1, -5);
        particleField.rotation.y = reduceMotion ? 0 : runtime.scenePosition * 0.004;
        renderer.render(scene, camera);
        updateAdaptiveQuality(timestamp, frameInterval);
        frameId = window.requestAnimationFrame(animate);
      };

      visibilityHandler = () => {
        if (document.hidden) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
          previousFrameTime = 0;
          lastParticleRenderTime = 0;
          frameIntervals = [];
          constrainedQualityWindows = 0;
          stableQualityWindows = 0;
          return;
        }
        if (!frameId) frameId = window.requestAnimationFrame(animate);
      };
      document.addEventListener('visibilitychange', visibilityHandler);
      frameId = window.requestAnimationFrame(animate);
    };

    initialize();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler);
      geometry?.dispose();
      material?.dispose();
      Object.values(textures).forEach((texture) => texture.dispose());
      renderer?.dispose();
      renderer?.domElement.remove();
      toggleCachedClass(document.documentElement, 'motion-quality-balanced', false);
      toggleCachedClass(document.documentElement, 'motion-quality-low', false);
      delete document.documentElement.dataset.motionQuality;
      delete document.documentElement.dataset.motionScale;
      delete document.documentElement.dataset.motionDropped;
    };
  }, []);

  return <div ref={mountRef} className="spatial-world" aria-hidden="true" />;
}
