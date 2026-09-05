import { memo, useEffect, useRef } from 'react';
import {
  GATEWAY_FRAME_COUNT,
  getCinematicGeometryAsset,
} from '../data/cinematicAssets.js';
import { getCinematicSceneReveals } from '../data/cinematicSceneTimeline.js';
import { getSwarmScenePalette } from '../data/swarmScenePalettes.js';
import { getTracerSceneBlend } from '../data/tracerSceneFields.js';
import { getSpatialMotion, subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import {
  drawGeometryStreamlines,
  readSceneImageProjection,
} from '../utils/cinematicGeometryRenderer.js';
import { setCachedStyleProperty } from '../utils/motionPerformance.js';

const MAX_PIXEL_RATIO = 1.2;
const POINTER_EASE = 4.2;
const GATEWAY_GEOMETRY_STRIDE = 3;
const SCENE_PROJECTION_SELECTORS = Object.freeze([
  '.gateway-sequence-preloads img[data-frame-index="0"]',
  '.cores-plate .environment-living-layer img',
  '.systems-plate .environment-living-layer img',
  '.chronology-plate .environment-living-layer img',
  '.field-plate .environment-living-layer img',
  '.surface-plate .environment-living-layer img',
]);

const VARIANT_RENDERING = Object.freeze({
  wayfinder: Object.freeze({ density: 1.36, alpha: 2.08, width: 1.5, trail: 1.36 }),
  rail: Object.freeze({ density: 1.32, alpha: 1.96, width: 1.42, trail: 1.32 }),
  tabs: Object.freeze({ density: 1.28, alpha: 1.84, width: 1.36, trail: 1.28 }),
});

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function createPointerState() {
  return {
    x: -10000,
    y: -10000,
    targetX: -10000,
    targetY: -10000,
    energy: 0,
    inside: false,
    phase: 0,
  };
}

export const BoundaryFilamentField = memo(function BoundaryFilamentField({
  theme = 'default',
  intensity = 1,
  collapsed = false,
  enabled = true,
  sceneIndex,
  variant = 'tabs',
  className = '',
}) {
  const canvasRef = useRef(null);
  const intensityRef = useRef(intensity);

  useEffect(() => {
    intensityRef.current = intensity;
    const parent = canvasRef.current?.parentElement;
    const normalized = clamp((intensity - 0.35) / 1.35);
    setCachedStyleProperty(parent, '--boundary-field-opacity', (0.78 + normalized * 0.16).toFixed(3));
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!context) return undefined;
    if (collapsed || !enabled) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return undefined;
    }

    const resources = new Map();
    const motion = { ...getSpatialMotion() };
    const pointer = createPointerState();
    const fixedSceneIndex = Number.isFinite(sceneIndex) ? Math.round(sceneIndex) : null;
    const renderConfig = VARIANT_RENDERING[variant] || VARIANT_RENDERING.tabs;
    const projectionNodes = new Array(SCENE_PROJECTION_SELECTORS.length).fill(null);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let frame = 0;
    let previousTime = 0;
    let lastRenderedTime = 0;
    let width = 1;
    let height = 1;
    let renderedPixelRatio = 0;
    let fallbackProjection = { left: 0, top: 0, width: 1, height: 1, viewportWidth: 1 };

    const requestResource = (filename) => {
      const existing = resources.get(filename);
      if (existing !== undefined) return existing;
      resources.set(filename, null);
      loadCinematicGeometryField(filename)
        .then((resource) => {
          if (!disposed) resources.set(filename, resource);
        })
        .catch(() => {
          if (!disposed) resources.set(filename, false);
        });
      return null;
    };

    const unsubscribe = subscribeSpatialMotion((next) => {
      Object.assign(motion, next);
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth <= 760 ? 1 : MAX_PIXEL_RATIO,
      );
      const nextWidth = Math.max(1, rect.width);
      const nextHeight = Math.max(1, rect.height);
      if (
        Math.abs(nextWidth - width) < 0.25
        && Math.abs(nextHeight - height) < 0.25
        && Math.abs(pixelRatio - renderedPixelRatio) < 0.01
      ) return;
      width = nextWidth;
      height = nextHeight;
      renderedPixelRatio = pixelRatio;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const viewportWidth = Math.max(1, window.innerWidth);
      const viewportHeight = Math.max(1, window.innerHeight);
      const stageWidth = Math.max(viewportWidth, viewportHeight * 16 / 9);
      const stageHeight = stageWidth * 9 / 16;
      fallbackProjection = {
        left: (viewportWidth - stageWidth) / 2,
        top: (viewportHeight - stageHeight) / 2,
        width: stageWidth,
        height: stageHeight,
        viewportWidth,
      };
    };

    const getProjectionNode = (activeSceneIndex) => {
      if (activeSceneIndex === 0) {
        return document.querySelector(SCENE_PROJECTION_SELECTORS[0]);
      }
      const cached = projectionNodes[activeSceneIndex];
      if (cached?.isConnected) return cached;
      const node = document.querySelector(SCENE_PROJECTION_SELECTORS[activeSceneIndex]);
      projectionNodes[activeSceneIndex] = node;
      return node;
    };

    const readProjection = (activeSceneIndex) => readSceneImageProjection(
      getProjectionNode(activeSceneIndex),
      fallbackProjection,
      window.innerWidth,
    );

    const drawResource = ({
      activeSceneIndex,
      activeFrameIndex = 0,
      palette,
      field,
      projection,
      weight,
      time,
      power,
      quality,
      localOffset,
    }) => {
      if (weight < 0.002) return;
      const filename = getCinematicGeometryAsset(theme, activeSceneIndex, activeFrameIndex);
      const geometry = requestResource(filename);
      if (!geometry) return;
      drawGeometryStreamlines({
        context,
        geometry,
        palette,
        projection,
        localOffset,
        pointer,
        clipWidth: width,
        clipHeight: height,
        weight,
        time,
        power,
        quality,
        densityScale: renderConfig.density,
        alphaScale: renderConfig.alpha,
        widthScale: renderConfig.width,
        trailScale: renderConfig.trail,
      });
    };

    const drawScene = ({ activeSceneIndex, field, weight, time, power, quality, localOffset }) => {
      if (weight < 0.002) return;
      const palette = getSwarmScenePalette(theme, activeSceneIndex, variant);
      const projection = readProjection(activeSceneIndex);
      if (activeSceneIndex !== 0) {
        drawResource({
          activeSceneIndex,
          palette,
          field,
          projection,
          weight,
          time,
          power,
          quality,
          localOffset,
        });
        return;
      }

      const position = fixedSceneIndex ?? motion.scenePosition;
      const { gatewayProgress } = getCinematicSceneReveals(position);
      const framePosition = gatewayProgress * (GATEWAY_FRAME_COUNT - 1);
      const currentFrame = Math.floor(framePosition / GATEWAY_GEOMETRY_STRIDE)
        * GATEWAY_GEOMETRY_STRIDE;
      const nextFrame = Math.min(
        GATEWAY_FRAME_COUNT - 1,
        currentFrame + GATEWAY_GEOMETRY_STRIDE,
      );
      const frameMix = nextFrame === currentFrame
        ? 0
        : (framePosition - currentFrame) / (nextFrame - currentFrame);
      drawResource({
        activeSceneIndex,
        activeFrameIndex: currentFrame,
        palette,
        field,
        projection,
        weight: weight * (1 - frameMix),
        time,
        power,
        quality,
        localOffset,
      });
      if (nextFrame !== currentFrame && frameMix > 0.002) {
        drawResource({
          activeSceneIndex,
          activeFrameIndex: nextFrame,
          palette,
          field,
          projection,
          weight: weight * frameMix,
          time,
          power,
          quality,
          localOffset,
        });
      }
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;
      if (pointer.x < -9000) {
        pointer.x = nextX;
        pointer.y = nextY;
      }
      pointer.targetX = nextX;
      pointer.targetY = nextY;
      pointer.energy = Math.min(0.3, pointer.energy + 0.075);
      pointer.inside = true;
    };

    const handlePointerLeave = () => {
      pointer.inside = false;
    };

    const draw = (timestamp = 0) => {
      const root = document.documentElement;
      const quality = root.classList.contains('motion-quality-low')
        ? 0.6
        : root.classList.contains('motion-quality-balanced')
          ? 0.8
          : 1;
      const isNarrativeTransition = Math.abs(
        motion.scenePosition - Math.round(motion.scenePosition)
      ) > 0.001 || Math.abs(motion.velocity) > 0.01;
      const renderQuality = isNarrativeTransition ? Math.min(0.56, quality) : quality;
      const targetHz = isNarrativeTransition
        ? 15
        : renderQuality < 0.7
          ? 45
          : renderQuality < 0.9
            ? 60
            : 120;
      const targetInterval = 1000 / targetHz;
      if (
        !reducedMotion
        && lastRenderedTime
        && timestamp - lastRenderedTime < targetInterval - 0.4
      ) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastRenderedTime = timestamp;
      const elapsed = previousTime
        ? Math.min(0.05, Math.max(0.001, (timestamp - previousTime) / 1000))
        : 1 / 60;
      previousTime = timestamp;
      const pointerEase = 1 - Math.exp(-elapsed * POINTER_EASE);
      pointer.x += (pointer.targetX - pointer.x) * pointerEase;
      pointer.y += (pointer.targetY - pointer.y) * pointerEase;
      pointer.energy += ((pointer.inside ? 0.18 : 0) - pointer.energy)
        * (1 - Math.exp(-elapsed * 2.3));
      pointer.phase += elapsed * 0.68;

      const normalized = clamp((intensityRef.current - 0.35) / 1.35);
      const power = 0.82 + normalized * 0.42;
      const time = timestamp / 1000;
      const canvasRect = canvas.getBoundingClientRect();
      const localOffset = { left: canvasRect.left, top: canvasRect.top };
      const position = fixedSceneIndex ?? motion.scenePosition;
      const blend = getTracerSceneBlend(theme, position);

      context.clearRect(0, 0, width, height);
      drawScene({
        activeSceneIndex: blend.fromIndex,
        field: blend.from,
        weight: 1 - blend.mix,
        time,
        power,
        quality: renderQuality,
        localOffset,
      });
      if (blend.toIndex !== blend.fromIndex) {
        drawScene({
          activeSceneIndex: blend.toIndex,
          field: blend.to,
          weight: blend.mix,
          time,
          power,
          quality: renderQuality,
          localOffset,
        });
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    parent.addEventListener('pointermove', handlePointerMove, { passive: true });
    parent.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(0);
    });
    observer.observe(canvas);
    resize();
    draw(0);

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      unsubscribe();
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [collapsed, enabled, sceneIndex, theme, variant]);

  const classes = [
    'boundary-filament-field',
    `boundary-filament-${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return <canvas ref={canvasRef} className={classes} aria-hidden="true" />;
});

export const WayfinderCosmicField = memo(function WayfinderCosmicField(props) {
  return <BoundaryFilamentField {...props} variant="wayfinder" className="wayfinder-cosmic-field" />;
});
