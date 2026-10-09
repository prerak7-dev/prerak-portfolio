import { memo, useEffect, useRef } from 'react';
import { getSceneCoverProjection, usesPortraitArtwork } from '../data/cinematicViewport.js';
import { getCinematicGeometryAsset } from '../data/cinematicAssets.js';
import { getSwarmScenePalette } from '../data/swarmScenePalettes.js';
import { getTracerSceneBlend } from '../data/tracerSceneFields.js';
import { getCelestialTracerBudget, getCelestialTracerFocus } from '../data/celestialTracerFocus.js';
import { PIGMENT_SCENE_SELECTORS } from '../data/livingPigmentArt.js';
import { getSpatialMotion, subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { createTracerAnimation } from '../utils/tracerAnimation.js';
import { loadCinematicGeometryField } from '../utils/cinematicGeometryField.js';
import { getCelestialTracerGeometry } from '../utils/celestialTracers.js';
import { drawGeometryContourPassage, drawGeometryStreamlines, readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';

const MAX_PIXEL_RATIO = 1.15;

export const CinematicAtmosphereField = memo(function CinematicAtmosphereField({ theme = 'default' }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);
  const animationRef = useRef(null);

  useEffect(() => {
    themeRef.current = theme;
    animationRef.current?.invalidate();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!context) return undefined;
    const resources = new Map();
    const motion = { ...getSpatialMotion() };
    const projectionNodes = new Array(PIGMENT_SCENE_SELECTORS.length).fill(null);
    let disposed = false, animation, cinematicTime = 0, flowSpeed = 1;
    let width = 1, height = 1, renderedPixelRatio = 0;
    let fallbackProjection = { left: 0, top: 0, width: 1, height: 1, viewportWidth: 1 };

    const requestResource = filename => {
      const existing = resources.get(filename);
      if (existing !== undefined) return existing;
      resources.set(filename, null);
      loadCinematicGeometryField(filename).then(resource => {
        if (!disposed) { resources.set(filename, resource); animation?.invalidate(); }
      }).catch(() => { if (!disposed) resources.set(filename, false); });
      return null;
    };
    const unsubscribe = subscribeSpatialMotion(next => {
      Object.assign(motion, next); animation?.invalidate();
    });
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      if (Math.abs(canvas.width - width * ratio) < 1 && Math.abs(canvas.height - height * ratio) < 1
        && Math.abs(renderedPixelRatio - ratio) < .01) return;
      renderedPixelRatio = ratio;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      fallbackProjection = getSceneCoverProjection(width, height);
    };
    const projection = sceneIndex => {
      let image = projectionNodes[sceneIndex];
      if (!image?.isConnected) {
        image = document.querySelector(PIGMENT_SCENE_SELECTORS[sceneIndex]);
        projectionNodes[sceneIndex] = image;
      }
      return readSceneImageProjection(image, fallbackProjection, width);
    };

    const drawBody = (sceneIndex, weight, blend, role, time, quality, portrait, budget) => {
      if (weight < .002) return;
      const field = requestResource(getCinematicGeometryAsset(themeRef.current, sceneIndex, 0, { portrait }));
      const geometry = getCelestialTracerGeometry(field, sceneIndex, portrait);
      if (!geometry?.streamlines.length) return;
      const focus = getCelestialTracerFocus(sceneIndex, portrait), pose = projection(sceneIndex);
      const palette = getSwarmScenePalette(themeRef.current, sceneIndex, 'tabs');
      // Clip stroke thickness and tracer heads too, not just their centerlines.
      // The shoreline cap prevents a sun's lower rim from marking the water.
      context.save();
      context.beginPath();
      context.rect(0, 0, width, Math.max(0, pose.top + focus.maxY * pose.height));
      context.clip();
      const band = focus.band * 1.42;
      const cx = pose.left + focus.centerX * pose.width, cy = pose.top + focus.centerY * pose.height;
      context.beginPath();
      for (const radius of [1 + band, 1 - band]) {
        const rx = focus.radiusX * pose.width * radius, ry = focus.radiusY * pose.height * radius;
        context.moveTo(cx + rx, cy);
        context.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        context.closePath();
      }
      context.clip('evenodd');
      const passage = blend.mix > .001 && blend.mix < .999;
      const baseBudget = passage ? Math.max(3, budget - 2) : budget;
      drawGeometryStreamlines({ context, geometry, palette, projection: pose, weight, time,
        power: 1.2, quality, clipWidth: width, clipHeight: height,
        maxVisibleCount: baseBudget, densityScale: .7, alphaScale: 1.3,
        widthScale: 1, trailScale: 1.15, headFrequency: 4 });
      if (passage) drawGeometryContourPassage({ context, geometry, field: role === 'from' ? blend.from : blend.to,
        palette, projection: pose, progress: blend.mix, role, time, power: .72 * weight, quality,
        clipWidth: width, clipHeight: height, maxVisibleCount: 2 });
      context.restore();
    };

    const draw = ({ delta: elapsed }) => {
      const root = document.documentElement;
      const quality = root.classList.contains('motion-quality-low') ? .62
        : root.classList.contains('motion-quality-balanced') ? .82 : 1;
      const targetSpeed = 1 + Math.min(.26, Math.abs(motion.velocity) * .028);
      flowSpeed += (targetSpeed - flowSpeed) * (1 - Math.exp(-elapsed * 2.4));
      cinematicTime += elapsed * flowSpeed;
      const blend = getTracerSceneBlend(themeRef.current, motion.scenePosition);
      const portrait = usesPortraitArtwork(), budget = getCelestialTracerBudget(width, height);
      context.clearRect(0, 0, width, height);
      drawBody(blend.fromIndex, 1 - blend.mix, blend, 'from', cinematicTime, quality, portrait, budget);
      if (blend.toIndex !== blend.fromIndex) {
        drawBody(blend.toIndex, blend.mix, blend, 'to', cinematicTime, quality, portrait, budget);
      }
      canvas.dataset.tracerBudget = String(budget);
      canvas.dataset.tracerScope = 'primary-celestial';
      canvas.dataset.tracerBody = getCelestialTracerFocus(blend.mix < .5 ? blend.fromIndex : blend.toIndex, portrait).name;
    };
    const observer = new ResizeObserver(() => { resize(); animation?.invalidate(); });
    observer.observe(canvas); resize();
    animation = createTracerAnimation(draw); animationRef.current = animation;
    return () => {
      disposed = true; animation.dispose(); animationRef.current = null;
      observer.disconnect(); unsubscribe();
    };
  }, []);

  return <canvas ref={canvasRef} className="cinematic-atmosphere-field" aria-hidden="true" />;
});
