import { useEffect, useLayoutEffect, useRef } from 'react';
import { CinematicAtmosphereField } from './CinematicAtmosphereField.jsx';
import { CinematicContourDissolve } from './CinematicContourDissolve.jsx';
import {
  CINEMATIC_ASSET_GEOMETRY,
  getCinematicAssets,
  GATEWAY_COMPACT_MEDIA_QUERY,
  GATEWAY_FRAME_COUNT,
} from '../data/cinematicAssets.js';
import {
  getCinematicAtmosphereTransition,
  getCinematicSceneReveals,
} from '../data/cinematicSceneTimeline.js';
import { createAssetPath } from '../security/contentSecurity.js';
import {
  getGatewayTransition,
  publishGatewayTransition,
} from '../state/gatewayTransitionStore.js';
import { publishCinematicReadiness } from '../state/cinematicReadinessStore.js';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import {
  setCachedInlineStyle,
  setCachedStyleProperty,
  toggleCachedClass,
} from '../utils/motionPerformance.js';
import { preloadImageUrl } from '../utils/preloadAssets.js';
import { gatewayBackingProgress, GATEWAY_DISSOLVE_END } from '../utils/cinematicTiming.js';

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smootherStep(value) {
  const t = clamp(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

const GATEWAY_FRAME_EPSILON = 0.0005;
const SECTION_PARALLAX_PROFILES = Object.freeze([
  Object.freeze({ key: 'cores', center: 1, pointerX: -8.2, pointerY: -4.8, scrollX: -7, scrollY: -3.8 }),
  Object.freeze({ key: 'systems', center: 2, pointerX: -7.5, pointerY: -4.2, scrollX: -6, scrollY: -3.4 }),
  Object.freeze({ key: 'chronology', center: 3.5, pointerX: -9, pointerY: -5, scrollX: 8, scrollY: -4.4 }),
  Object.freeze({ key: 'field', center: 5, pointerX: -10.5, pointerY: -5.8, scrollX: -9, scrollY: 4.8 }),
  Object.freeze({ key: 'surface', center: 6, pointerX: -8.5, pointerY: -4.6, scrollX: 7.5, scrollY: -4 }),
]);
function paintLayerOpacity(progress) {
  return smootherStep(progress / 0.46);
}

function holdUntilPainted(progress, fadeStart = 0.64) {
  return 1 - smootherStep((progress - fadeStart) / (1 - fadeStart));
}

function assetPath(filename) {
  return createAssetPath(import.meta.env.BASE_URL, filename);
}

function plateTransform({ x = 0, y = 0, depth = 0, scale = 1 }) {
  return `translate3d(${x.toFixed(4)}%, ${y.toFixed(4)}%, ${depth.toFixed(2)}px) scale(${scale.toFixed(5)})`;
}

function setPlateStyle(node, opacity, transform) {
  if (!node) return;
  const visible = opacity > 0.0005;
  setCachedInlineStyle(node, 'visibility', visible ? 'visible' : 'hidden');
  setCachedInlineStyle(node, 'opacity', visible ? opacity.toFixed(5) : '0');
  toggleCachedClass(node, 'is-motion-active', visible);
  if (visible) setCachedInlineStyle(node, 'transform', transform);
}

function setSectionPointerParallax(node, pointer) {
  SECTION_PARALLAX_PROFILES.forEach(({ key, pointerX, pointerY }) => {
    setCachedStyleProperty(node, `--${key}-pointer-x`, `${(pointer.currentX * pointerX).toFixed(2)}px`);
    setCachedStyleProperty(node, `--${key}-pointer-y`, `${(pointer.currentY * pointerY).toFixed(2)}px`);
  });
}

function setSectionScrollParallax(node, scenePosition) {
  SECTION_PARALLAX_PROFILES.forEach(({ key, center, scrollX, scrollY }) => {
    const localPosition = clamp(scenePosition - center, -1, 1);
    setCachedStyleProperty(node, `--${key}-scroll-x`, `${(localPosition * scrollX).toFixed(2)}px`);
    setCachedStyleProperty(node, `--${key}-scroll-y`, `${(localPosition * scrollY).toFixed(2)}px`);
  });
}

function EnvironmentPlate({ filename, className, plateRef, imageRef, eager = false }) {
  const { width, height } = CINEMATIC_ASSET_GEOMETRY.scene;
  const source = assetPath(filename);
  return (
    <div ref={plateRef} className={`environment-plate ${className}`} aria-hidden="true">
      <div className="environment-living-layer">
        <img
          ref={imageRef}
          src={eager ? source : undefined}
          data-src={source}
          alt=""
          width={width}
          height={height}
          draggable="false"
          decoding="async"
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : 'low'}
        />
      </div>
    </div>
  );
}

function createGatewayFrameRenderer(canvas, firstImage) {
  if (!canvas || !firstImage?.naturalWidth) return null;
  canvas.width = firstImage.naturalWidth;
  canvas.height = firstImage.naturalHeight;
  canvas.dataset.frameIndex = '0';
  canvas.dataset.framePosition = '0.0000';

  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    desynchronized: true,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
  });

  if (!gl) {
    const context = canvas.getContext('2d', { alpha: false, desynchronized: true });
    canvas.dataset.renderer = '2d';
    return {
      render(framePosition, currentImage, nextImage) {
        const currentIndex = Math.floor(framePosition);
        if (!context || !currentImage?.naturalWidth || !nextImage?.naturalWidth) return false;
        context.globalAlpha = 1;
        context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
        const blend = framePosition - currentIndex;
        if (blend > GATEWAY_FRAME_EPSILON && nextImage !== currentImage) {
          context.globalAlpha = blend;
          context.drawImage(nextImage, 0, 0, canvas.width, canvas.height);
          context.globalAlpha = 1;
        }
        canvas.dataset.frameIndex = String(Math.round(framePosition));
        canvas.dataset.framePosition = framePosition.toFixed(4);
        return true;
      },
      dispose() {},
    };
  }

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };
  const vertexShader = compileShader(gl.VERTEX_SHADER, `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
      vUv = (aPosition + 1.0) * 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    uniform sampler2D uCurrent;
    uniform sampler2D uNext;
    uniform float uBlend;
    varying vec2 vUv;
    void main() {
      gl_FragColor = mix(texture2D(uCurrent, vUv), texture2D(uNext, vUv), uBlend);
    }
  `);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const positionLocation = gl.getAttribLocation(program, 'aPosition');
  const blendLocation = gl.getUniformLocation(program, 'uBlend');
  const currentLocation = gl.getUniformLocation(program, 'uCurrent');
  const nextLocation = gl.getUniformLocation(program, 'uNext');

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.uniform1i(currentLocation, 0);
  gl.uniform1i(nextLocation, 1);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.viewport(0, 0, canvas.width, canvas.height);

  const textures = new Map();
  const textureOrder = [];
  const MAX_CACHED_GATEWAY_TEXTURES = 4;

  const getTexture = (index, image) => {
    if (!image?.naturalWidth) return null;
    const cached = textures.get(index);
    if (cached?.image === image) return cached.texture;
    if (cached) gl.deleteTexture(cached.texture);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    textures.set(index, { image, texture });
    const existingOrder = textureOrder.indexOf(index);
    if (existingOrder >= 0) textureOrder.splice(existingOrder, 1);
    textureOrder.push(index);
    while (textureOrder.length > MAX_CACHED_GATEWAY_TEXTURES) {
      const oldestIndex = textureOrder.shift();
      const oldest = textures.get(oldestIndex);
      if (oldest) gl.deleteTexture(oldest.texture);
      textures.delete(oldestIndex);
    }
    return texture;
  };

  canvas.dataset.renderer = 'webgl';

  return {
    render(framePosition, currentImage, nextImage) {
      const currentIndex = Math.floor(framePosition);
      const nextIndex = currentImage === nextImage ? currentIndex : currentIndex + 1;
      const currentTexture = getTexture(currentIndex, currentImage);
      const nextTexture = getTexture(nextIndex, nextImage);
      if (!currentTexture || !nextTexture) return false;
      canvas.dataset.frameIndex = String(Math.round(framePosition));
      canvas.dataset.framePosition = framePosition.toFixed(4);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, currentTexture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, nextTexture);
      gl.uniform1f(blendLocation, framePosition - currentIndex);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return true;
    },
    dispose() {
      textures.forEach(({ texture }) => gl.deleteTexture(texture));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

function GatewaySequence({ canvasRef, filenames, imageRefs, plateRef, initialFrameIndex = 0 }) {
  const { width, height } = CINEMATIC_ASSET_GEOMETRY.scene;
  const firstFrame = Math.min(
    GATEWAY_FRAME_COUNT - 1,
    Math.max(0, Math.floor(initialFrameIndex)),
  );
  const lastInitialFrame = Math.min(GATEWAY_FRAME_COUNT - 1, firstFrame + 1);
  return (
    <div ref={plateRef} className="environment-plate gateway-sequence-plate" aria-hidden="true">
      <div className="environment-living-layer gateway-living-layer">
        <canvas ref={canvasRef} className="gateway-sequence-canvas" aria-hidden="true" />
        <div className="gateway-sequence-preloads" aria-hidden="true">
          {filenames.map((filename, frameIndex) => (
            (() => {
              const source = assetPath(filename);
              const isInitialFrame = frameIndex >= firstFrame && frameIndex <= lastInitialFrame;
              return (
                <img
                  key={filename}
                  ref={(node) => { imageRefs.current[frameIndex] = node; }}
                  src={isInitialFrame ? source : undefined}
                  data-src={source}
                  alt=""
                  width={width}
                  height={height}
                  draggable="false"
                  decoding="async"
                  loading={isInitialFrame ? 'eager' : 'lazy'}
                  fetchpriority={isInitialFrame ? 'high' : 'low'}
                  data-frame-index={frameIndex}
                />
              );
            })()
          ))}
        </div>
      </div>
    </div>
  );
}

function SeasonalVines({ filename, imageRef, plateRef }) {
  if (!filename) return null;
  const { width, height } = CINEMATIC_ASSET_GEOMETRY.scene;
  return (
    <div ref={plateRef} className="environment-plate seasonal-vines-plate" aria-hidden="true">
      <div className="environment-living-layer seasonal-vines-living-layer">
        <img
          ref={imageRef}
          src={assetPath(filename)}
          alt=""
          width={width}
          height={height}
          draggable="false"
          decoding="async"
          loading="eager"
          fetchpriority="high"
        />
      </div>
    </div>
  );
}

function decodeImage(image) {
  if (!image) return Promise.resolve();
  const waitForLoad = image.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });

  return waitForLoad.then(async () => {
    if (!image.naturalWidth) return;
    try {
      await image.decode();
    } catch (error) {
      // A successful load is sufficient when a browser declines an explicit decode.
    }
  });
}

export function CinematicEnvironment({
  theme,
  onReady,
  gatewayOverlay = null,
  systemsOverlay = null,
}) {
  const assets = getCinematicAssets(theme);
  const compactGatewayRef = useRef(window.matchMedia(GATEWAY_COMPACT_MEDIA_QUERY).matches);
  const gatewayFilenames = compactGatewayRef.current
    ? assets.gatewayCompactFrames
    : assets.gatewayFrames;
  const coresFilename = compactGatewayRef.current ? assets.coresCompact : assets.cores;
  const rootRef = useRef(null);
  const gatewayOverlayRootRef = useRef(null);
  const overlayRootRef = useRef(null);
  const gatewayPlateRef = useRef(null);
  const seasonalVinesPlateRef = useRef(null);
  const seasonalVinesImageRef = useRef(null);
  const gatewayOverlayPlateRef = useRef(null);
  const coresPlateRef = useRef(null);
  const systemsPlateRef = useRef(null);
  const systemsOverlayPlateRef = useRef(null);
  const chronologyPlateRef = useRef(null);
  const fieldPlateRef = useRef(null);
  const surfacePlateRef = useRef(null);
  const coresImageRef = useRef(null);
  const systemsImageRef = useRef(null);
  const chronologyImageRef = useRef(null);
  const fieldImageRef = useRef(null);
  const surfaceImageRef = useRef(null);
  const gatewayCanvasRef = useRef(null);
  const imageRefs = useRef([]);
  const initialGatewayFrameIndex = Math.round(
    getGatewayTransition().progress * (GATEWAY_FRAME_COUNT - 1),
  );

  useEffect(() => {
    let cancelled = false;
    const images = [
      ...imageRefs.current,
      seasonalVinesImageRef.current,
      coresImageRef.current,
      systemsImageRef.current,
      chronologyImageRef.current,
      fieldImageRef.current,
      surfaceImageRef.current,
    ].filter(Boolean);
    Promise.all(images.map(decodeImage)).then(() => {
      if (cancelled) return;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (!cancelled) onReady?.();
        });
      });
    });
    return () => { cancelled = true; };
  }, [
    coresFilename,
    gatewayFilenames,
    assets.seasonalVines,
    onReady,
  ]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const pointer = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };
    let frame = 0;

    const applyPointer = (node, includeSections = false) => {
      if (!node) return;
      setCachedStyleProperty(node, '--cinematic-pointer-mid-x', `${(-pointer.currentX * 4.2).toFixed(2)}px`);
      setCachedStyleProperty(node, '--cinematic-pointer-mid-y', `${(-pointer.currentY * 2.6).toFixed(2)}px`);
      setCachedStyleProperty(node, '--cinematic-pointer-foreground-x', `${(-pointer.currentX * 18).toFixed(2)}px`);
      setCachedStyleProperty(node, '--cinematic-pointer-foreground-y', `${(-pointer.currentY * 9).toFixed(2)}px`);
      if (includeSections) setSectionPointerParallax(node, pointer);
    };

    const settle = () => {
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.075;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.075;
      applyPointer(rootRef.current, true);
      applyPointer(gatewayOverlayRootRef.current);

      const unsettled = Math.abs(pointer.targetX - pointer.currentX) > 0.001
        || Math.abs(pointer.targetY - pointer.currentY) > 0.001;
      frame = unsettled ? window.requestAnimationFrame(settle) : 0;
    };

    const scheduleSettle = () => {
      if (!frame) frame = window.requestAnimationFrame(settle);
    };

    const handlePointerMove = (event) => {
      pointer.targetX = clamp((event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2, -1, 1);
      pointer.targetY = clamp((event.clientY / Math.max(1, window.innerHeight) - 0.5) * 2, -1, 1);
      scheduleSettle();
    };

    const handlePointerLeave = (event) => {
      if (event.relatedTarget) return;
      pointer.targetX = 0;
      pointer.targetY = 0;
      scheduleSettle();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerLeave, { passive: true });
    applyPointer(rootRef.current, true);
    applyPointer(gatewayOverlayRootRef.current);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    const gatewayFrameReady = imageRefs.current.map((image) => Boolean(
      image?.complete && image.naturalWidth,
    ));
    imageRefs.current.forEach((image, frameIndex) => {
      if (!image) return;
      image.dataset.frameIndex = String(frameIndex);
    });
    const requestedSceneImages = new Set();
    const requestedGatewayFrames = new Set();
    const sectionImageRefs = [
      null,
      coresImageRef,
      systemsImageRef,
      chronologyImageRef,
      fieldImageRef,
      surfaceImageRef,
    ];
    let cancelled = false;
    let gatewayAnimationFrame = 0;
    let gatewayRenderer = null;
    let gatewayCanvasVisible = false;
    const initialGatewayTransition = getGatewayTransition();
    let gatewayTargetFramePosition = 0;
    let gatewayVisualFramePosition = initialGatewayTransition.progress * (GATEWAY_FRAME_COUNT - 1);
    let gatewayVisualHandoff = initialGatewayTransition.handoff;
    let gatewayHandoffTarget = 0;
    let gatewayCoresMix = 0;
    let gatewaySystemsMix = 0;
    let gatewayTransitionPulse = 0;
    let gatewayScenePosition = 0;
    let gatewayTravelDirection = 1;
    let readinessFrame = 0;
    let readinessConfirmFrame = 0;
    let pendingReadyChapter = -1;

    const cancelReadiness = () => {
      window.cancelAnimationFrame(readinessFrame);
      window.cancelAnimationFrame(readinessConfirmFrame);
      readinessFrame = 0;
      readinessConfirmFrame = 0;
      pendingReadyChapter = -1;
    };

    const setGatewayCanvasVisible = (isVisible) => {
      const canvas = gatewayCanvasRef.current;
      if (!canvas || gatewayCanvasVisible === isVisible) return;
      gatewayCanvasVisible = isVisible;
      canvas.style.visibility = isVisible ? 'visible' : 'hidden';
    };
    setGatewayCanvasVisible(false);

    const isImageReady = (imageRef) => {
      const image = imageRef?.current;
      return Boolean(
        image?.complete
        && image.naturalWidth
        && image.getAttribute('src') === image.dataset.src,
      );
    };

    const updateChapterReadiness = () => {
      const nearestChapter = Math.round(gatewayScenePosition);
      const atChapterBoundary = Math.abs(gatewayScenePosition - nearestChapter) <= 0.015;
      if (!atChapterBoundary) {
        cancelReadiness();
        publishCinematicReadiness({ settled: false });
        return;
      }

      const reveals = getCinematicSceneReveals(gatewayScenePosition);
      const gatewayFrameZeroReady = gatewayFrameReady[0];
      let visualReady = false;

      switch (nearestChapter) {
        case 0:
          visualReady = gatewayFrameZeroReady
            && gatewayVisualFramePosition <= GATEWAY_FRAME_EPSILON
            && gatewayVisualHandoff <= GATEWAY_FRAME_EPSILON;
          break;
        case 1:
          visualReady = gatewayVisualHandoff >= GATEWAY_DISSOLVE_END
            && isImageReady(coresImageRef);
          break;
        case 2:
          visualReady = reveals.systemsMix >= 0.999
            && isImageReady(systemsImageRef);
          break;
        case 3:
          visualReady = reveals.chronologyMix >= 0.999
            && isImageReady(chronologyImageRef);
          break;
        case 4:
          visualReady = isImageReady(chronologyImageRef);
          break;
        case 5:
          visualReady = reveals.fieldMix >= 0.999
            && isImageReady(fieldImageRef);
          break;
        case 6:
          visualReady = reveals.surfaceMix >= 0.999
            && isImageReady(surfaceImageRef);
          break;
        default:
          visualReady = false;
      }

      if (!visualReady) {
        cancelReadiness();
        publishCinematicReadiness({ settled: false });
        return;
      }
      if (pendingReadyChapter === nearestChapter) return;
      cancelReadiness();
      pendingReadyChapter = nearestChapter;
      readinessFrame = window.requestAnimationFrame(() => {
        readinessConfirmFrame = window.requestAnimationFrame(() => {
          if (!cancelled && pendingReadyChapter === nearestChapter) {
            publishCinematicReadiness({ readyIndex: nearestChapter, settled: true });
          }
        });
      });
    };

    publishCinematicReadiness({ settled: false });

    const ensureSceneImage = (sceneIndex) => {
      if (sceneIndex < 1 || sceneIndex >= sectionImageRefs.length) return;
      const image = sectionImageRefs[sceneIndex].current;
      const source = image?.dataset.src;
      if (!image || !source || image.getAttribute('src') === source) return;
      const requestKey = `${sceneIndex}:${source}`;
      if (requestedSceneImages.has(requestKey)) return;
      requestedSceneImages.add(requestKey);
      preloadImageUrl(source, 'high').then((decodedImage) => {
        if (cancelled || !decodedImage || image.dataset.src !== source) return;
        image.src = source;
        decodeImage(image).then(() => {
          if (!cancelled) updateChapterReadiness();
        });
      });
    };

    const markGatewayFrameReady = (image, frameIndex) => {
      if (cancelled || !image?.naturalWidth || gatewayFrameReady[frameIndex]) return;
      gatewayFrameReady[frameIndex] = true;
      scheduleGatewayFrame();
    };

    const ensureGatewayFrame = (requestedIndex, priority = 'high') => {
      const frameIndex = Math.min(
        GATEWAY_FRAME_COUNT - 1,
        Math.max(0, Math.round(requestedIndex)),
      );
      const image = imageRefs.current[frameIndex];
      const source = image?.dataset.src;
      if (!image || !source || gatewayFrameReady[frameIndex]) return;

      const requestKey = `${frameIndex}:${source}`;
      if (requestedGatewayFrames.has(requestKey)) return;
      requestedGatewayFrames.add(requestKey);

      const load = image.getAttribute('src') === source
        ? Promise.resolve(image)
        : preloadImageUrl(source, priority).then((decodedImage) => {
          if (!decodedImage || cancelled || image.dataset.src !== source) return null;
          image.src = source;
          return image;
        });

      load
        .then((readyImage) => readyImage && decodeImage(readyImage))
        .then(() => markGatewayFrameReady(image, frameIndex));
    };

    const scheduleGatewayFrame = () => {
      if (!gatewayAnimationFrame && !cancelled) {
        gatewayAnimationFrame = window.requestAnimationFrame(commitGatewayFrame);
      }
    };

    const renderGatewayFrames = (framePosition) => {
      const currentIndex = Math.floor(framePosition);
      const nextIndex = Math.min(GATEWAY_FRAME_COUNT - 1, currentIndex + 1);
      const blend = framePosition - currentIndex;
      ensureGatewayFrame(currentIndex);
      ensureGatewayFrame(nextIndex);
      if (!gatewayFrameReady[currentIndex]) return gatewayVisualFramePosition;

      const hasAdjacentFrame = nextIndex === currentIndex || gatewayFrameReady[nextIndex];
      const renderBlend = hasAdjacentFrame ? blend : 0;
      if (!gatewayRenderer) {
        gatewayRenderer = createGatewayFrameRenderer(
          gatewayCanvasRef.current,
          imageRefs.current[currentIndex],
        );
      }
      const rendered = gatewayRenderer?.render(
        currentIndex + renderBlend,
        imageRefs.current[currentIndex],
        hasAdjacentFrame ? imageRefs.current[nextIndex] : imageRefs.current[currentIndex],
      );
      if (rendered) setGatewayCanvasVisible(true);
      return rendered ? (hasAdjacentFrame ? framePosition : currentIndex) : gatewayVisualFramePosition;
    };

    imageRefs.current.forEach((image, frameIndex) => {
      if (image?.getAttribute('src') === image.dataset.src) ensureGatewayFrame(frameIndex);
    });
    const initialFrameIndex = Math.floor(gatewayVisualFramePosition);
    ensureGatewayFrame(initialFrameIndex);
    ensureGatewayFrame(Math.min(GATEWAY_FRAME_COUNT - 1, initialFrameIndex + 1));

    const updateGatewayPlateMotion = () => {
      const root = rootRef.current;
      if (!root) return;
      const visualProgress = gatewayVisualFramePosition / Math.max(1, GATEWAY_FRAME_COUNT - 1);
      const coordinatedCoresMix = gatewayVisualHandoff;
      const gatewayScale = 1.005 + visualProgress * 0.24 + coordinatedCoresMix * 0.19;
      const gatewayPassage = Math.sin(coordinatedCoresMix * Math.PI);
      const seasonalVinesOpacity = assets.seasonalVines
        ? 0.72 * (1 - gatewayPassage * 0.58) * (1 - gatewayTransitionPulse * 0.08)
        : 0;
      const coresBackingOpacity = gatewayBackingProgress(coordinatedCoresMix);

      toggleCachedClass(root, 'gateway-passage-active', coordinatedCoresMix > 0.001 && coordinatedCoresMix < 0.999);
      setCachedStyleProperty(root, '--gateway-passage', gatewayPassage.toFixed(4));
      setCachedStyleProperty(root, '--gateway-vegetation-scroll-y', `${(-visualProgress * 1.25).toFixed(4)}%`);
      setCachedStyleProperty(root, '--gateway-vegetation-scale', (1.025 + visualProgress * 0.075).toFixed(5));

      const gatewayTransform = plateTransform({
        x: -coordinatedCoresMix * gatewayTravelDirection * 0.7,
        y: -visualProgress * 0.7,
        depth: coordinatedCoresMix * 82,
        scale: gatewayScale,
      });
      setPlateStyle(gatewayPlateRef.current, 1 - coordinatedCoresMix, gatewayTransform);
      setPlateStyle(gatewayOverlayPlateRef.current, 1 - coordinatedCoresMix, gatewayTransform);
      setPlateStyle(
        coresPlateRef.current,
        coresBackingOpacity * holdUntilPainted(gatewaySystemsMix),
        plateTransform({
          x: (1 - coordinatedCoresMix) * gatewayTravelDirection * 1.35
            - gatewaySystemsMix * gatewayTravelDirection * 0.28,
          y: (1 - coordinatedCoresMix) * 0.42 - gatewaySystemsMix * 0.18,
          depth: (1 - coordinatedCoresMix) * -78 + gatewaySystemsMix * 20,
          scale: 1.1 - coordinatedCoresMix * 0.075 + gatewaySystemsMix * 0.022,
        }),
      );
      setPlateStyle(
        seasonalVinesPlateRef.current,
        seasonalVinesOpacity,
        plateTransform({
          x: Math.sin(gatewayScenePosition * 0.82) * 0.22,
          y: -Math.min(4, Math.max(0, gatewayScenePosition)) * 0.035,
          depth: 26,
          scale: 1.035 + gatewayTransitionPulse * 0.012,
        }),
      );
    };

    function commitGatewayFrame() {
      gatewayAnimationFrame = 0;
      gatewayVisualFramePosition = renderGatewayFrames(gatewayTargetFramePosition);

      const visualProgress = gatewayVisualFramePosition / Math.max(1, GATEWAY_FRAME_COUNT - 1);
      const gateReadiness = smootherStep((visualProgress - 0.56) / 0.44);
      gatewayHandoffTarget = Math.min(gatewayCoresMix, gateReadiness);
      gatewayVisualHandoff = gatewayHandoffTarget;
      publishGatewayTransition({
        progress: visualProgress,
        handoff: gatewayVisualHandoff,
        direction: gatewayTravelDirection,
      });
      updateGatewayPlateMotion();
      updateChapterReadiness();
    }

    const applyMotion = ({ scenePosition, direction }) => {
      const root = rootRef.current;
      if (!root) return;

      const atmosphereTransition = getCinematicAtmosphereTransition(scenePosition);
      ensureSceneImage(atmosphereTransition.fromIndex);
      ensureSceneImage(atmosphereTransition.toIndex);
      if (scenePosition - Math.floor(scenePosition) > 0.68) {
        ensureSceneImage(Math.min(5, atmosphereTransition.toIndex + 1));
      }

      const travelDirection = direction > 0 ? 1 : -1;
      const {
        gatewayProgress,
        coresMix,
        systemsMix,
        chronologyMix,
        fieldMix,
        surfaceMix,
      } = getCinematicSceneReveals(scenePosition);
      const gatewayFrameTarget = gatewayProgress * (GATEWAY_FRAME_COUNT - 1);

      const transitionPulse = Math.max(
        Math.sin(coresMix * Math.PI),
        Math.sin(systemsMix * Math.PI),
        Math.sin(chronologyMix * Math.PI),
        Math.sin(fieldMix * Math.PI),
        Math.sin(surfaceMix * Math.PI),
      );
      const parallaxX = Math.sin(scenePosition * 0.72) * 0.34;
      const parallaxY = Math.cos(scenePosition * 0.54) * 0.1;
      gatewayTargetFramePosition = gatewayFrameTarget;
      gatewayCoresMix = coresMix;
      gatewaySystemsMix = systemsMix;
      gatewayTransitionPulse = transitionPulse;
      gatewayScenePosition = scenePosition;
      gatewayTravelDirection = travelDirection;
      ensureGatewayFrame(Math.floor(gatewayFrameTarget));
      ensureGatewayFrame(Math.ceil(gatewayFrameTarget));
      if (travelDirection < 0) ensureGatewayFrame(Math.floor(gatewayFrameTarget) - 1, 'auto');
      commitGatewayFrame();

      toggleCachedClass(root, 'direction-forward', travelDirection > 0);
      toggleCachedClass(root, 'direction-backward', travelDirection < 0);
      toggleCachedClass(root, 'transition-active', transitionPulse > 0.001);
      toggleCachedClass(root, 'transition-idle', transitionPulse <= 0.001);
      setCachedStyleProperty(root, '--environment-parallax-x', `${parallaxX.toFixed(4)}%`);
      setCachedStyleProperty(root, '--environment-parallax-y', `${parallaxY.toFixed(4)}%`);
      setCachedStyleProperty(root, '--transition-pulse', transitionPulse.toFixed(4));
      setCachedStyleProperty(root, '--gateway-atmosphere-opacity', (1 - transitionPulse * 0.76).toFixed(4));
      setCachedStyleProperty(root, '--travel-direction', String(travelDirection));
      setSectionScrollParallax(root, scenePosition);
      if (gatewayOverlayRootRef.current) {
        setCachedStyleProperty(gatewayOverlayRootRef.current, '--environment-parallax-x', `${parallaxX.toFixed(4)}%`);
        setCachedStyleProperty(gatewayOverlayRootRef.current, '--environment-parallax-y', `${parallaxY.toFixed(4)}%`);
      }
      if (overlayRootRef.current) {
        const projectDistance = Math.abs(2 - scenePosition);
        const projectProximity = clamp((0.52 - projectDistance) / (0.52 - 0.14));
        const projectReveal = smootherStep(projectProximity);
        setCachedStyleProperty(overlayRootRef.current, '--environment-parallax-x', `${parallaxX.toFixed(4)}%`);
        setCachedStyleProperty(overlayRootRef.current, '--environment-parallax-y', `${parallaxY.toFixed(4)}%`);
        setCachedStyleProperty(overlayRootRef.current, '--project-scene-reveal', projectReveal.toFixed(4));
      }

      setPlateStyle(
        systemsPlateRef.current,
        paintLayerOpacity(systemsMix) * holdUntilPainted(chronologyMix),
        plateTransform({
          x: (1 - systemsMix) * travelDirection * 0.52 - chronologyMix * travelDirection * 0.12,
          y: (1 - systemsMix) * 0.16 - chronologyMix * 0.08,
          depth: (1 - systemsMix) * -28 + chronologyMix * 10,
          scale: 1.034 - systemsMix * 0.026 + chronologyMix * 0.012,
        }),
      );
      setPlateStyle(
        systemsOverlayPlateRef.current,
        paintLayerOpacity(systemsMix) * holdUntilPainted(chronologyMix),
        plateTransform({
          x: (1 - systemsMix) * travelDirection * 0.52 - chronologyMix * travelDirection * 0.12,
          y: (1 - systemsMix) * 0.16 - chronologyMix * 0.08,
          depth: (1 - systemsMix) * -28 + chronologyMix * 10,
          scale: 1.034 - systemsMix * 0.026 + chronologyMix * 0.012,
        }),
      );
      setPlateStyle(
        chronologyPlateRef.current,
        paintLayerOpacity(chronologyMix) * holdUntilPainted(fieldMix),
        plateTransform({
          x: (1 - chronologyMix) * travelDirection * 0.24 - fieldMix * travelDirection * 0.1,
          y: (1 - chronologyMix) * 0.1 - fieldMix * 0.07,
          depth: (1 - chronologyMix) * -20 + fieldMix * 9,
          scale: 1.026 - chronologyMix * 0.019 + fieldMix * 0.011,
        }),
      );
      setPlateStyle(
        fieldPlateRef.current,
        paintLayerOpacity(fieldMix) * holdUntilPainted(surfaceMix),
        plateTransform({
          x: (1 - fieldMix) * travelDirection * 0.24 - surfaceMix * travelDirection * 0.1,
          y: (1 - fieldMix) * 0.1 - surfaceMix * 0.07,
          depth: (1 - fieldMix) * -20 + surfaceMix * 9,
          scale: 1.026 - fieldMix * 0.019 + surfaceMix * 0.011,
        }),
      );
      setPlateStyle(
        surfacePlateRef.current,
        paintLayerOpacity(surfaceMix),
        plateTransform({
          x: (1 - surfaceMix) * travelDirection * 0.22,
          y: (1 - surfaceMix) * 0.09,
          depth: (1 - surfaceMix) * -18,
          scale: 1.024 - surfaceMix * 0.017,
        }),
      );
      updateChapterReadiness();
    };

    const unsubscribe = subscribeSpatialMotion(applyMotion);
    return () => {
      cancelled = true;
      cancelReadiness();
      if (gatewayAnimationFrame) window.cancelAnimationFrame(gatewayAnimationFrame);
      gatewayRenderer?.dispose();
      unsubscribe();
    };
  }, [gatewayFilenames, theme]);

  return (
    <>
      <div
        ref={rootRef}
        className={`cinematic-environment theme-${theme} direction-forward transition-idle`}
        aria-hidden="true"
      >
        <div className="cinematic-image-stage">
          <GatewaySequence
            canvasRef={gatewayCanvasRef}
            filenames={gatewayFilenames}
            imageRefs={imageRefs}
            plateRef={gatewayPlateRef}
            initialFrameIndex={initialGatewayFrameIndex}
          />
          <EnvironmentPlate
            filename={coresFilename}
            className="cores-plate"
            plateRef={coresPlateRef}
            imageRef={coresImageRef}
            eager
          />
          <EnvironmentPlate
            filename={assets.systems}
            className="systems-plate"
            plateRef={systemsPlateRef}
            imageRef={systemsImageRef}
            eager
          />
          <EnvironmentPlate
            filename={assets.chronology}
            className="chronology-plate"
            plateRef={chronologyPlateRef}
            imageRef={chronologyImageRef}
            eager
          />
          <EnvironmentPlate
            filename={assets.field}
            className="field-plate"
            plateRef={fieldPlateRef}
            imageRef={fieldImageRef}
            eager
          />
          <EnvironmentPlate
            filename={assets.surface}
            className="surface-plate"
            plateRef={surfacePlateRef}
            imageRef={surfaceImageRef}
            eager
          />
          <SeasonalVines
            filename={assets.seasonalVines}
            imageRef={seasonalVinesImageRef}
            plateRef={seasonalVinesPlateRef}
          />
        </div>
        <CinematicContourDissolve theme={theme} />
        <div className="environment-volumetrics" />
        <div className="environment-vignette" />
      </div>
      <CinematicAtmosphereField theme={theme} />
      {gatewayOverlay && (
        <div ref={gatewayOverlayRootRef} className={`cinematic-gateway-name-layer theme-${theme}`}>
          <div className="cinematic-image-stage">
            <div ref={gatewayOverlayPlateRef} className="environment-plate gateway-name-plate">
              <div className="environment-living-layer gateway-living-layer gateway-name-living-layer">
                {gatewayOverlay}
              </div>
            </div>
          </div>
        </div>
      )}
      {systemsOverlay && (
        <div ref={overlayRootRef} className={`cinematic-systems-overlay theme-${theme}`}>
          <div className="cinematic-image-stage">
            <div ref={systemsOverlayPlateRef} className="environment-plate systems-overlay-plate">
              {systemsOverlay}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
