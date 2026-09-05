import { useLayoutEffect } from 'react';
import { CHAPTER_RAIL_STAGES } from '../data/chapterRailCelestialData.js';
import { getCinematicSceneReveals } from '../data/cinematicSceneTimeline.js';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { setCachedStyleProperty, toggleCachedClass } from '../utils/motionPerformance.js';

const DEG_TO_RAD = Math.PI / 180;
const ITEM_STAGGER = 0.024;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smootherStep(value) {
  const progress = clamp(value);
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function createFallbackProjection() {
  const viewportWidth = Math.max(1, window.innerWidth);
  const viewportHeight = Math.max(1, window.innerHeight);
  const width = Math.max(viewportWidth, viewportHeight * 16 / 9);
  const height = width * 9 / 16;
  return {
    left: (viewportWidth - width) / 2,
    top: (viewportHeight - height) / 2,
    width,
    height,
    viewportWidth,
  };
}

function pointYAtAngle(orbit, projection, angle) {
  return projection.top
    + (orbit.center.y + Math.sin(angle * DEG_TO_RAD) * orbit.radius.y) * projection.height;
}

function angleAtProjectedY(orbit, projection, projectedY, referenceAngle) {
  const centerY = projection.top + orbit.center.y * projection.height;
  const radiusY = Math.max(1, orbit.radius.y * projection.height);
  const normalizedY = clamp((projectedY - centerY) / radiusY, -1, 1);
  const primary = Math.asin(normalizedY) / DEG_TO_RAD;
  const secondary = 180 - primary;
  const candidates = [];
  [-360, 0, 360].forEach((turn) => {
    candidates.push(primary + turn, secondary + turn);
  });
  return candidates.reduce((closest, candidate) => (
    Math.abs(candidate - referenceAngle) < Math.abs(closest - referenceAngle)
      ? candidate
      : closest
  ));
}

function resolveVisibleOrbit(orbit, projection) {
  const viewportHeight = Math.max(1, window.innerHeight);
  const safeTop = clamp(viewportHeight * 0.11, 78, 116);
  const safeBottom = viewportHeight - clamp(viewportHeight * 0.12, 90, 140);
  let startAngle = orbit.startAngle;
  let endAngle = orbit.endAngle;

  const projectedStartY = pointYAtAngle(orbit, projection, startAngle);
  if (projectedStartY < safeTop) {
    const adjustedStart = angleAtProjectedY(orbit, projection, safeTop, startAngle);
    const shift = clamp(adjustedStart - startAngle, -22, 22);
    startAngle += shift;
    endAngle += shift;
  }

  if (pointYAtAngle(orbit, projection, endAngle) > safeBottom) {
    endAngle = angleAtProjectedY(orbit, projection, safeBottom, endAngle);
  }

  return { ...orbit, startAngle, endAngle };
}

function projectOrbitPoint(orbit, index, itemCount, projection) {
  const progress = itemCount > 1 ? index / (itemCount - 1) : 0.5;
  const angle = lerp(orbit.startAngle, orbit.endAngle, progress) * DEG_TO_RAD;
  const normalizedX = orbit.center.x + Math.cos(angle) * orbit.radius.x;
  const normalizedY = orbit.center.y + Math.sin(angle) * orbit.radius.y;
  return {
    x: projection.left + normalizedX * projection.width,
    y: projection.top + normalizedY * projection.height,
  };
}

function projectNormalizedPoint(point, projection) {
  return {
    x: projection.left + point.x * projection.width,
    y: projection.top + point.y * projection.height,
  };
}

function projectPathPoint(points, index, itemCount, projection) {
  const progress = itemCount > 1 ? index / (itemCount - 1) : 0.5;
  const pathPosition = progress * Math.max(0, points.length - 1);
  const pointIndex = Math.min(points.length - 1, Math.floor(pathPosition));
  const nextIndex = Math.min(points.length - 1, pointIndex + 1);
  const mix = pathPosition - pointIndex;
  return projectNormalizedPoint({
    x: lerp(points[pointIndex].x, points[nextIndex].x, mix),
    y: lerp(points[pointIndex].y, points[nextIndex].y, mix),
  }, projection);
}

function resolveStage(stage, projection) {
  return stage.orbit
    ? { ...stage, orbit: resolveVisibleOrbit(stage.orbit, projection) }
    : stage;
}

function projectStagePoint(stage, index, itemCount, projection) {
  return stage.orbit
    ? projectOrbitPoint(stage.orbit, index, itemCount, projection)
    : projectPathPoint(stage.points, index, itemCount, projection);
}

function getStageMotion(stage, index) {
  const magnitude = Math.hypot(stage.labelDirection.x, stage.labelDirection.y) || 1;
  const inward = {
    x: stage.labelDirection.x / magnitude,
    y: stage.labelDirection.y / magnitude,
  };
  const outward = { x: -inward.x, y: -inward.y };
  const tangent = { x: -inward.y, y: inward.x };
  const orbitPolarity = index % 2 === 0 ? 1 : -1;
  const orbitAmplitude = 4.8 + (index % 3) * 0.9;
  const orbitLift = 2.2 + (index % 2) * 0.7;
  const markerDistance = stage.markerDistance ?? 22;

  return {
    label: {
      x: inward.x * stage.labelDistance,
      y: inward.y * stage.labelDistance,
    },
    marker: {
      x: outward.x * markerDistance,
      y: outward.y * markerDistance,
    },
    orbitForward: {
      x: tangent.x * orbitAmplitude * orbitPolarity,
      y: tangent.y * orbitAmplitude * orbitPolarity,
    },
    orbitBack: {
      x: tangent.x * orbitAmplitude * -0.82 * orbitPolarity,
      y: tangent.y * orbitAmplitude * -0.82 * orbitPolarity,
    },
    orbitLift: {
      x: outward.x * orbitLift,
      y: outward.y * orbitLift,
    },
  };
}

function getStageTransition(scenePosition) {
  const position = clamp(Number.isFinite(scenePosition) ? scenePosition : 0, 0, 6);
  const reveals = getCinematicSceneReveals(position);

  if (position < 1) return { fromIndex: 0, toIndex: 1, mix: reveals.coresMix };
  if (position < 2) return { fromIndex: 1, toIndex: 2, mix: reveals.systemsMix };
  if (position < 3) return { fromIndex: 2, toIndex: 3, mix: reveals.chronologyMix };
  if (position < 4) return { fromIndex: 3, toIndex: 3, mix: 0 };
  if (position < 5) return { fromIndex: 4, toIndex: 5, mix: reveals.fieldMix };
  if (position < 6) return { fromIndex: 5, toIndex: 6, mix: reveals.surfaceMix };
  return { fromIndex: 6, toIndex: 6, mix: 0 };
}

export function useChapterRailChoreography({ itemCount, itemRefs, railRef }) {
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail || itemCount < 1) return undefined;

    let scenePosition = 0;
    let frame = 0;
    let chronologyProjection = null;
    const compactQuery = window.matchMedia('(max-width: 760px)');
    const projectionNodes = new Map();

    const readStageImage = (selector) => {
      const cached = projectionNodes.get(selector);
      if (cached?.isConnected) return cached;
      const node = document.querySelector(selector);
      if (node) projectionNodes.set(selector, node);
      return node;
    };

    const readStageProjection = (stage, fallback) => {
      const liveProjection = readSceneImageProjection(
        readStageImage(stage.selector),
        fallback,
        window.innerWidth,
      );
      const isChronologyStage = stage.id === 'professional' || stage.id === 'education';
      if (!isChronologyStage) return liveProjection;
      if (!chronologyProjection && scenePosition >= 1.92) chronologyProjection = liveProjection;
      return chronologyProjection ?? liveProjection;
    };

    const render = () => {
      frame = 0;
      const isDesktop = !compactQuery.matches;
      toggleCachedClass(rail, 'is-orbit-ready', isDesktop);
      if (!isDesktop) return;

      const fallback = createFallbackProjection();
      const transition = getStageTransition(scenePosition);
      const fromStageSource = CHAPTER_RAIL_STAGES[transition.fromIndex];
      const toStageSource = CHAPTER_RAIL_STAGES[transition.toIndex];
      const fromProjection = readStageProjection(fromStageSource, fallback);
      const toProjection = transition.toIndex === transition.fromIndex
        ? fromProjection
        : readStageProjection(toStageSource, fallback);
      const fromStage = resolveStage(fromStageSource, fromProjection);
      const toStage = resolveStage(toStageSource, toProjection);
      const staggerSpan = Math.max(0.5, 1 - ITEM_STAGGER * (itemCount - 1));
      const points = [];

      itemRefs.current.slice(0, itemCount).forEach((item, index) => {
        if (!item) return;
        const itemMix = transition.fromIndex === transition.toIndex
          ? 0
          : smootherStep((transition.mix - ITEM_STAGGER * index) / staggerSpan);
        const fromPoint = projectStagePoint(fromStage, index, itemCount, fromProjection);
        const toPoint = projectStagePoint(toStage, index, itemCount, toProjection);
        const fromMotion = getStageMotion(fromStage, index);
        const toMotion = getStageMotion(toStage, index);
        const x = lerp(fromPoint.x, toPoint.x, itemMix);
        const y = lerp(fromPoint.y, toPoint.y, itemMix);
        const labelOffsetX = lerp(fromMotion.label.x, toMotion.label.x, itemMix);
        const labelOffsetY = lerp(fromMotion.label.y, toMotion.label.y, itemMix);
        const markerOffsetX = lerp(fromMotion.marker.x, toMotion.marker.x, itemMix);
        const markerOffsetY = lerp(fromMotion.marker.y, toMotion.marker.y, itemMix);
        const orbitForwardX = lerp(fromMotion.orbitForward.x, toMotion.orbitForward.x, itemMix);
        const orbitForwardY = lerp(fromMotion.orbitForward.y, toMotion.orbitForward.y, itemMix);
        const orbitBackX = lerp(fromMotion.orbitBack.x, toMotion.orbitBack.x, itemMix);
        const orbitBackY = lerp(fromMotion.orbitBack.y, toMotion.orbitBack.y, itemMix);
        const orbitLiftX = lerp(fromMotion.orbitLift.x, toMotion.orbitLift.x, itemMix);
        const orbitLiftY = lerp(fromMotion.orbitLift.y, toMotion.orbitLift.y, itemMix);
        const labelAlign = itemMix < 0.5
          ? (fromStage.labelAlign ?? 'center')
          : (toStage.labelAlign ?? 'center');
        const crossing = Math.sin(Math.PI * itemMix);
        const labelOpacity = 1 - 0.88 * crossing * crossing * crossing * crossing;

        points[index] = { x, y };
        setCachedStyleProperty(item, '--chapter-tab-x', `${x.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-tab-y', `${y.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-label-offset-x', `${labelOffsetX.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-label-offset-y', `${labelOffsetY.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-marker-offset-x', `${markerOffsetX.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-marker-offset-y', `${markerOffsetY.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-orbit-forward-x', `${orbitForwardX.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-orbit-forward-y', `${orbitForwardY.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-orbit-back-x', `${orbitBackX.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-orbit-back-y', `${orbitBackY.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-orbit-lift-x', `${orbitLiftX.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-orbit-lift-y', `${orbitLiftY.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-label-align', labelAlign);
        setCachedStyleProperty(item, '--chapter-label-opacity', labelOpacity.toFixed(4));
        setCachedStyleProperty(item, '--chapter-orbit-progress', itemMix.toFixed(4));
      });

      const finalPoint = points[itemCount - 1];
      if (finalPoint) {
        setCachedStyleProperty(rail, '--chapter-collapse-x', `${finalPoint.x.toFixed(2)}px`);
        setCachedStyleProperty(rail, '--chapter-collapse-y', `${(finalPoint.y + 54).toFixed(2)}px`);
      }
    };

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      chronologyProjection = null;
      projectionNodes.clear();
      scheduleRender();
    };

    const unsubscribe = subscribeSpatialMotion((motion) => {
      scenePosition = motion.scenePosition;
      scheduleRender();
    });

    window.addEventListener('resize', handleResize, { passive: true });
    window.visualViewport?.addEventListener('resize', handleResize, { passive: true });
    compactQuery.addEventListener?.('change', handleResize);

    return () => {
      unsubscribe();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      compactQuery.removeEventListener?.('change', handleResize);
      rail.classList.remove('is-orbit-ready');
    };
  }, [itemCount, itemRefs, railRef]);
}
