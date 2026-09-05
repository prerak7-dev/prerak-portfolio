import { memo, useEffect, useRef } from 'react';
import {
  GATEWAY_FRAME_COUNT,
  getCinematicGeometryAsset,
} from '../data/cinematicAssets.js';
import { getCinematicSceneReveals } from '../data/cinematicSceneTimeline.js';
import { getSwarmScenePalette } from '../data/swarmScenePalettes.js';
import { getTracerSceneBlend } from '../data/tracerSceneFields.js';
import { getSpatialMotion, subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import {
  getFocusedCinematicStreamlines,
  loadCinematicGeometryField,
} from '../utils/cinematicGeometryField.js';
import {
  drawGeometryContourPassage,
  drawGeometryStreamlines,
  readSceneImageProjection,
} from '../utils/cinematicGeometryRenderer.js';

const MAX_PIXEL_RATIO = 1.15;
const GATEWAY_GEOMETRY_STRIDE = 3;
const SCENE_PROJECTION_SELECTORS = Object.freeze([
  '.gateway-sequence-preloads img[data-frame-index="0"]',
  '.cores-plate .environment-living-layer img',
  '.systems-plate .environment-living-layer img',
  '.chronology-plate .environment-living-layer img',
  '.field-plate .environment-living-layer img',
  '.surface-plate .environment-living-layer img',
]);

const INTRO_PLANET = Object.freeze({
  centerX: 0.879,
  centerY: 0.154,
  radius: 0.272,
  startAngle: 0.78,
  endAngle: 3.56,
});
const introGeometryCache = new WeakMap();

function isIntroPathwayPoint(point) {
  if (point.y < 0.67) return false;
  const pathwayProgress = clampUnit((point.y - 0.67) / 0.33);
  const pathwayHalfWidth = 0.022 + pathwayProgress * 0.128;
  return Math.abs(point.x - 0.5) < pathwayHalfWidth;
}

function getIntroGeometryWithoutPathway(geometry) {
  if (!geometry) return geometry;
  if (introGeometryCache.has(geometry)) return introGeometryCache.get(geometry);

  const streamlines = [];
  geometry.streamlines.forEach((streamline) => {
    let segment = [];
    let segmentIndex = 0;
    const commitSegment = () => {
      if (segment.length >= 4) {
        streamlines.push(Object.freeze({
          ...streamline,
          phase: (streamline.phase + segmentIndex * 0.137) % 1,
          points: Object.freeze(segment),
        }));
        segmentIndex += 1;
      }
      segment = [];
    };

    streamline.points.forEach((point) => {
      if (isIntroPathwayPoint(point)) {
        commitSegment();
      } else {
        segment.push(point);
      }
    });
    commitSegment();
  });

  const filteredGeometry = Object.freeze({
    ...geometry,
    streamlines: Object.freeze(streamlines),
  });
  introGeometryCache.set(geometry, filteredGeometry);
  return filteredGeometry;
}

function clampUnit(value) {
  return Math.min(1, Math.max(0, value));
}

function smootherStep(value) {
  const progress = clampUnit(value);
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

function getIntroPlanetFocus(frameProgress) {
  // Gateway frames are baked with this camera transform. Reusing it here lets
  // focused seeds land on the exact painted limb in every generated frame.
  const dolly = smootherStep((frameProgress - 0.06) / 0.94);
  const zoom = 1 + 1.05 * dolly;
  return Object.freeze({
    centerX: 0.5 + (INTRO_PLANET.centerX - 0.5) * zoom,
    centerY: 0.57 + (INTRO_PLANET.centerY - 0.57) * zoom - 0.012 * dolly,
    radiusX: INTRO_PLANET.radius * zoom,
    radiusY: INTRO_PLANET.radius * (16 / 9) * zoom,
    startAngle: INTRO_PLANET.startAngle,
    endAngle: INTRO_PLANET.endAngle,
    band: 0.105,
    count: 58,
  });
}

function drawGeometryScene({
  context,
  geometry,
  palette,
  projection,
  weight,
  time,
  power,
  quality,
}) {
  if (!geometry || weight < 0.002) return;
  drawGeometryStreamlines({
    context,
    geometry,
    palette,
    projection,
    weight,
    time,
    power,
    quality,
    densityScale: 1.08,
    alphaScale: 1.62,
    widthScale: 1.2,
    trailScale: 1.38,
  });
}

export const CinematicAtmosphereField = memo(function CinematicAtmosphereField({ theme = 'default' }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!context) return undefined;

    const resources = new Map();
    const motion = { ...getSpatialMotion() };
    const projectionNodes = new Array(SCENE_PROJECTION_SELECTORS.length).fill(null);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let frame = 0;
    let previousTimestamp = 0;
    let cinematicTime = 0;
    let flowSpeed = 1;
    let lastRenderedTimestamp = 0;
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
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      if (
        Math.abs(canvas.width - width * pixelRatio) < 1
        && Math.abs(canvas.height - height * pixelRatio) < 1
        && Math.abs(renderedPixelRatio - pixelRatio) < 0.01
      ) return;
      renderedPixelRatio = pixelRatio;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const stageWidth = Math.max(width, height * 16 / 9);
      const stageHeight = stageWidth * 9 / 16;
      fallbackProjection = {
        left: (width - stageWidth) / 2,
        top: (height - stageHeight) / 2,
        width: stageWidth,
        height: stageHeight,
        viewportWidth: width,
      };
    };

    const getProjectionNode = (sceneIndex) => {
      if (sceneIndex === 0) {
        return document.querySelector(SCENE_PROJECTION_SELECTORS[0]);
      }
      const cached = projectionNodes[sceneIndex];
      if (cached?.isConnected) return cached;
      const node = document.querySelector(SCENE_PROJECTION_SELECTORS[sceneIndex]);
      projectionNodes[sceneIndex] = node;
      return node;
    };

    const readProjection = (sceneIndex) => readSceneImageProjection(
      getProjectionNode(sceneIndex),
      fallbackProjection,
      width,
    );

    const visitSceneGeometry = (sceneIndex, weight, visit) => {
      if (weight < 0.002) return;
      if (sceneIndex !== 0) {
        visit(
          requestResource(getCinematicGeometryAsset(themeRef.current, sceneIndex)),
          weight,
          { sceneIndex },
        );
        return;
      }

      const { gatewayProgress } = getCinematicSceneReveals(motion.scenePosition);
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
      [
        { frameIndex: currentFrame, frameWeight: 1 - frameMix },
        { frameIndex: nextFrame, frameWeight: frameMix },
      ].forEach(({ frameIndex, frameWeight }) => {
        if (frameWeight < 0.002) return;
        visit(
          getIntroGeometryWithoutPathway(
            requestResource(getCinematicGeometryAsset(themeRef.current, 0, frameIndex)),
          ),
          weight * frameWeight,
          { sceneIndex: 0, frameIndex },
        );
      });
    };

    const drawSceneIndex = ({ sceneIndex, palette, projection, weight, time, power, quality }) => {
      visitSceneGeometry(sceneIndex, weight, (geometry, geometryWeight) => {
        drawGeometryScene({
          context,
          geometry,
          palette,
          projection,
          weight: geometryWeight,
          time,
          power,
          quality,
        });
      });
    };

    const drawIntroPlanetContourScene = ({
      palette,
      projection,
      gatewayProgress,
      weight,
      time,
      quality,
    }) => {
      const contourExit = 1 - smootherStep((gatewayProgress - 0.24) / 0.3);
      const visibility = Math.pow(Math.max(0, 1 - gatewayProgress), 0.48) * contourExit;
      if (weight * visibility < 0.004) return;
      visitSceneGeometry(0, weight * visibility, (geometry, geometryWeight, metadata) => {
        if (!geometry || !Number.isFinite(metadata?.frameIndex)) return;
        const frameProgress = metadata.frameIndex / (GATEWAY_FRAME_COUNT - 1);
        const focus = getIntroPlanetFocus(frameProgress);
        const streamlines = getFocusedCinematicStreamlines(
          geometry,
          focus,
          `intro-planet-${metadata.frameIndex}`,
        );
        drawGeometryStreamlines({
          context,
          geometry,
          streamlines,
          palette,
          projection,
          weight: geometryWeight,
          time,
          power: 1.42,
          quality,
          densityScale: 1.12,
          alphaScale: 1.2,
          widthScale: 1.06,
          trailScale: 1.52,
          maxVisibleCount: 48,
          headFrequency: 5,
          cinematicEmphasis: 1.14,
          clipWidth: width,
          clipHeight: height,
        });
      });
    };

    const drawPassageSceneIndex = ({
      sceneIndex,
      field,
      palette,
      projection,
      progress,
      role,
      time,
      power,
      quality,
    }) => {
      visitSceneGeometry(sceneIndex, 1, (geometry, geometryWeight) => {
        if (!geometry) return;
        drawGeometryContourPassage({
          context,
          geometry,
          field,
          palette,
          projection,
          progress,
          role,
          time,
          power: power * geometryWeight,
          quality,
          clipWidth: width,
          clipHeight: height,
        });
      });
    };

    const draw = (timestamp = 0) => {
      const root = document.documentElement;
      const quality = root.classList.contains('motion-quality-low')
        ? 0.62
        : root.classList.contains('motion-quality-balanced')
          ? 0.82
          : 1;
      const displayHz = Math.max(60, Number(root.dataset.displayHz) || 60);
      const isTransitioning = Math.abs(
        motion.scenePosition - Math.round(motion.scenePosition)
      ) > 0.001 || Math.abs(motion.velocity) > 0.01;
      // While transitioning (user is actively scrolling), continue to render
      // at a reduced quality instead of skipping frames entirely. Skipping
      // frames can leave the render loop dormant if the motion settling
      // signals are slightly noisy; this keeps tracers and animated text
      // responsive during scroll-based navigation.
      let renderQuality = quality;
      if (isTransitioning && !reducedMotion) {
        renderQuality = Math.max(0.5, quality * 0.66);
      }
      const idleTargetHz = renderQuality < 0.7
        ? 24
        : renderQuality < 0.9
          ? Math.min(36, displayHz)
          : Math.min(60, displayHz);
      const ambientTargetHz = idleTargetHz;
      const targetInterval = 1000 / ambientTargetHz;
      if (
        !reducedMotion
        && lastRenderedTimestamp
        && timestamp - lastRenderedTimestamp < targetInterval - 0.4
      ) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastRenderedTimestamp = timestamp;
      const elapsed = previousTimestamp
        ? Math.min(0.05, Math.max(0.001, (timestamp - previousTimestamp) / 1000))
        : 1 / 60;
      previousTimestamp = timestamp;
      const targetFlowSpeed = 1 + Math.min(0.26, Math.abs(motion.velocity) * 0.028);
      flowSpeed += (targetFlowSpeed - flowSpeed) * (1 - Math.exp(-elapsed * 2.4));
      cinematicTime += elapsed * flowSpeed;
      const time = cinematicTime;
      const fieldBlend = getTracerSceneBlend(themeRef.current, motion.scenePosition);
      const fromPalette = getSwarmScenePalette(themeRef.current, fieldBlend.fromIndex, 'tabs');
      const toPalette = getSwarmScenePalette(themeRef.current, fieldBlend.toIndex, 'tabs');
      const power = 1.32;
      const fromProjection = readProjection(fieldBlend.fromIndex);
      const toProjection = fieldBlend.toIndex === fieldBlend.fromIndex
        ? fromProjection
        : readProjection(fieldBlend.toIndex);
      const { gatewayProgress } = getCinematicSceneReveals(motion.scenePosition);

      context.clearRect(0, 0, width, height);
      drawSceneIndex({
        sceneIndex: fieldBlend.fromIndex,
        palette: fromPalette,
        projection: fromProjection,
        weight: 1 - fieldBlend.mix,
        time,
        power,
        quality: renderQuality,
      });
      if (fieldBlend.fromIndex === 0) {
        drawIntroPlanetContourScene({
          palette: fromPalette,
          projection: fromProjection,
          gatewayProgress,
          weight: 1 - fieldBlend.mix,
          time,
          quality: renderQuality,
        });
      }
      if (fieldBlend.toIndex !== fieldBlend.fromIndex) {
        drawSceneIndex({
          sceneIndex: fieldBlend.toIndex,
          palette: toPalette,
          projection: toProjection,
          weight: fieldBlend.mix,
          time,
          power,
          quality: renderQuality,
        });
        if (fieldBlend.toIndex === 0) {
          drawIntroPlanetContourScene({
            palette: toPalette,
            projection: toProjection,
            gatewayProgress,
            weight: fieldBlend.mix,
            time,
            quality: renderQuality,
          });
        }

        const isGatewayPassage = fieldBlend.fromIndex === 0 && fieldBlend.toIndex === 1;
        if (!isGatewayPassage && fieldBlend.mix > 0.001 && fieldBlend.mix < 0.999) {
          drawPassageSceneIndex({
            sceneIndex: fieldBlend.fromIndex,
            field: fieldBlend.from,
            palette: fromPalette,
            projection: fromProjection,
            progress: fieldBlend.mix,
            role: 'from',
            time,
            power: 0.92,
            quality: renderQuality,
          });
          drawPassageSceneIndex({
            sceneIndex: fieldBlend.toIndex,
            field: fieldBlend.to,
            palette: toPalette,
            projection: toProjection,
            progress: fieldBlend.mix,
            role: 'to',
            time,
            power: 0.96,
            quality: renderQuality,
          });
        }
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

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
    };
  }, []);

  return <canvas ref={canvasRef} className="cinematic-atmosphere-field" aria-hidden="true" />;
});
