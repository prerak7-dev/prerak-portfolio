import { useLayoutEffect, useRef } from 'react';
import { CHAPTER_RAIL_STAGES } from '../data/chapterRailCelestialData.js';
import { cinematicSmootherStep, getCinematicSceneReveals } from '../data/cinematicSceneTimeline.js';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { subscribeThemeContourTransition } from '../state/themeContourTransitionStore.js';
import { readSceneImageProjection } from '../utils/cinematicGeometryRenderer.js';
import { setCachedStyleProperty, toggleCachedClass } from '../utils/motionPerformance.js';
import { NAV_COMPACT_QUERY, NAV_LANDSCAPE_QUERY } from '../utils/homeCompositionLayout.js';
import { createRailJourney, interpolateRailLayout, separateRailItems } from '../utils/chapterRailLayout.js';

const DEG_TO_RAD = Math.PI / 180;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
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

export function useChapterRailChoreography({ itemCount, itemRefs, railRef, railWindow }) {
  const windowRef = useRef(railWindow);
  windowRef.current = railWindow;
  const invalidateRef = useRef(null);
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail || itemCount < 1) return undefined;

    let scenePosition = 0;
    let frame = 0;
    let disposed = false;
    let navigation = null;
    let renderedItems = [];
    let flights = [];
    const compactQuery = window.matchMedia(NAV_COMPACT_QUERY);
    const landscapeQuery = window.matchMedia(NAV_LANDSCAPE_QUERY);
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let labelSizes = [];
    const projectionNodes = new Map();
    const cancelFlights = () => {
      flights.forEach(flight => flight.cancel());
      flights = [];
    };

    const readStageImage = (selector) => {
      const cached = projectionNodes.get(selector);
      if (cached?.isConnected) return cached;
      const node = document.querySelector(selector);
      if (node) projectionNodes.set(selector, node);
      return node;
    };

    const readStageProjection = (stage, fallback) => readSceneImageProjection(
      readStageImage(stage.selector), fallback, window.innerWidth,
    );

    const render = () => {
      frame = 0;
      const isDesktop = !compactQuery.matches;
      toggleCachedClass(rail, 'is-orbit-ready', isDesktop);
      rail.dataset.layout = isDesktop ? 'contour' : 'compact';
      const windowed = isDesktop && landscapeQuery.matches && windowRef.current.count < itemCount;
      const visibleStart = windowed ? windowRef.current.start : 0;
      const visibleCount = windowed ? windowRef.current.count : itemCount;
      rail.dataset.windowed = String(windowed);
      rail.dataset.visibleStart = String(visibleStart);
      rail.dataset.visibleCount = String(visibleCount);
      itemRefs.current.forEach((item, index) => {
        const hidden = index < visibleStart || index >= visibleStart + visibleCount;
        if (item.inert !== hidden) {
          item.style.visibility = hidden ? 'hidden' : '';
          item.inert = hidden;
          if (hidden) item.setAttribute('aria-hidden', 'true'); else item.removeAttribute('aria-hidden');
        }
      });
      if (!isDesktop) {
        cancelFlights();
        if (navigation) { navigation.journey = null; navigation.items = []; }
        rail.dataset.moving = 'false';
        return;
      }
      if (!labelSizes.length) labelSizes = itemRefs.current.map(item => {
        const label = item?.querySelector('strong');
        return { width: label?.offsetWidth || 120, height: label?.offsetHeight || 24 };
      });

      const fallback = createFallbackProjection();
      const transition = navigation
        ? { fromIndex: navigation.target, toIndex: navigation.target, mix: navigation.progress }
        : getStageTransition(scenePosition);
      rail.dataset.motionProgress = transition.mix.toFixed(4);
      rail.dataset.motionSource = navigation ? 'chapter' : 'scroll';
      const landscape = landscapeQuery.matches;
      const bounds = { left: landscape ? innerWidth * .62 : 16, right: innerWidth - 16, top: windowed ? 122 : 82, bottom: innerHeight - (landscape ? 96 : 78) };
      const markerSize = landscapeQuery.matches ? 19.2 : 24;
      const markerCenter = 6 + markerSize / 2;
      const layout = stageIndex => {
        const source = CHAPTER_RAIL_STAGES[stageIndex];
        const projection = readStageProjection(source, fallback);
        const stage = resolveStage(source, projection);
        const sizes = labelSizes.slice(visibleStart, visibleStart + visibleCount);
        const fitsRow = sizes.reduce((sum, size) => sum + size.width + markerSize + 26, -6) <= bounds.right - bounds.left;
        const axis = !landscape && (stageIndex === 1 || stageIndex === 6) && fitsRow ? 'x' : 'y';
        const routes = new Map();
        for (let i = 0; i < visibleCount; i++) for (let j = i + 1; j < visibleCount; j++) routes.set(`${i}:${j}`, { axis, sign: -1 });
        const anchors = sizes.map((size, index) => {
          const point = projectStagePoint(stage, index, visibleCount, projection);
          return { x: point.x - markerCenter, y: point.y - 22, width: size.width + markerSize + 20, height: 44 };
        });
        if (landscape) {
          const left = Math.min(...anchors.map(point => point.x));
          const span = Math.max(1, Math.max(...anchors.map(point => point.x)) - left);
          const available = Math.max(0, bounds.right - bounds.left - Math.max(...anchors.map(point => point.width)));
          anchors.forEach((point, index) => {
            const contour = (point.x - left) / span;
            const sceneAnchor = clamp(point.x / innerWidth);
            point.x = bounds.left + (contour * .55 + sceneAnchor * .45) * available;
            point.y = bounds.top + index / Math.max(1, visibleCount - 1) * (bounds.bottom - bounds.top - 44);
          });
        }
        if (axis === 'x') {
          const top = Math.min(...anchors.map(point => point.y));
          const bottom = Math.max(...anchors.map(point => point.y + point.height));
          const shift = Math.max(0, bounds.top - top) + Math.min(0, bounds.bottom - bottom);
          anchors.forEach(point => { point.y += shift; });
        }
        const visible = separateRailItems(anchors, bounds, 6, routes);
        return labelSizes.map((_, index) => visible[clamp(index - visibleStart, 0, visibleCount - 1)]);
      };
      const from = navigation?.items.length === itemCount ? navigation.items : layout(transition.fromIndex);
      const to = layout(transition.toIndex);
      let buttons;
      let baseButtons;
      let flightDrift;
      if (navigation) {
        if (!navigation.journey) {
          cancelFlights();
          navigation.items = from;
          navigation.destination = to;
          navigation.journey = createRailJourney(from, to, bounds);
        }
        const progress = reducedQuery.matches ? 1 : clamp((transition.mix - navigation.segmentStart) / (1 - navigation.segmentStart || 1));
        const follow = cinematicSmootherStep(progress);
        const drift = to.map((item, index) => ({
          x: (item.x - navigation.destination[index].x) * follow,
          y: (item.y - navigation.destination[index].y) * follow,
        }));
        buttons = navigation.journey(progress).map((item, index) => ({
          ...item,
          x: item.x + drift[index].x,
          y: item.y + drift[index].y,
        }));
        if (!flights.length && navigation.startedAt && !reducedQuery.matches && progress < 1) {
          // Animate the long flight on the compositor; JS only tracks the small
          // drift of the painting underneath it. A busy dissolve cannot stall it.
          const poses = Array.from({ length: 121 }, (_, index) => navigation.journey(index / 120));
          flights = itemRefs.current.map((item, index) => {
            const flight = item.animate(poses.map((pose, frameIndex) => ({
              offset: frameIndex / 120,
              transform: `translate3d(${pose[index].x}px, ${pose[index].y}px, 0)`,
            })), { duration: navigation.duration * (1 - navigation.segmentStart), fill: 'both', easing: 'linear' });
            flight.id = 'chapter-rail-flight';
            flight.startTime = navigation.startedAt + navigation.duration * navigation.segmentStart;
            return flight;
          });
        }
        if (flights.length) { baseButtons = from; flightDrift = drift; }
      } else {
        cancelFlights();
        buttons = interpolateRailLayout(from, to, transition.mix, bounds);
      }
      const moving = transition.mix > 0 && transition.mix < 1;
      if (rail.dataset.moving !== String(moving)) rail.dataset.moving = String(moving);
      renderedItems = buttons;
      (baseButtons || buttons).forEach(({ x, y, width }, index) => {
        const item = itemRefs.current[index];
        setCachedStyleProperty(item, '--chapter-tab-x', `${x.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-tab-y', `${y.toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-drift-x', `${(flightDrift?.[index].x || 0).toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-drift-y', `${(flightDrift?.[index].y || 0).toFixed(2)}px`);
        setCachedStyleProperty(item, '--chapter-tab-width', `${width}px`);
        setCachedStyleProperty(item, '--chapter-label-opacity', '1');
      });

      const finalPoint = renderedItems[itemCount - 1];
      if (finalPoint) {
        setCachedStyleProperty(rail, '--chapter-collapse-x', `${(finalPoint.x + markerCenter).toFixed(2)}px`);
        setCachedStyleProperty(rail, '--chapter-collapse-y', `${(finalPoint.y + 76).toFixed(2)}px`);
      }
      // The painted plate keeps drifting after scroll settles. Read its live
      // projection so the satellites remain attached to that moving contour.
      if (!reducedQuery.matches && !document.hidden) scheduleRender();
    };

    const scheduleRender = () => {
      if (!frame && !disposed) frame = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (disposed) return;
      if (navigation) {
        navigation.items = itemRefs.current.map(item => {
          const { x, y, width, height } = item.getBoundingClientRect();
          return { x, y, width, height };
        });
        navigation.segmentStart = navigation.progress;
        navigation.journey = null;
      }
      labelSizes = [];
      renderedItems = [];
      projectionNodes.clear();
      scheduleRender();
    };
    invalidateRef.current = handleResize;

    const unsubscribe = subscribeSpatialMotion((motion) => {
      scenePosition = motion.scenePosition;
      scheduleRender();
    });
    const unsubscribeNavigation = subscribeThemeContourTransition((transition) => {
      if (transition.active && transition.kind === 'chapter'
        && Number.isInteger(transition.targetChapterIndex)) {
        if (navigation?.token !== transition.token) {
          // Snapshot the visible pose before the scroll position jumps under the dissolve.
          navigation = {
            token: transition.token,
            target: transition.targetChapterIndex,
            items: renderedItems.slice(),
            progress: 0,
            segmentStart: 0,
          };
        }
        navigation.progress = transition.linearProgress;
        navigation.startedAt = transition.startedAt;
        navigation.duration = transition.duration;
      } else {
        navigation = null;
      }
      scheduleRender();
    });

    window.addEventListener('resize', handleResize, { passive: true });
    window.visualViewport?.addEventListener('resize', handleResize, { passive: true });
    compactQuery.addEventListener?.('change', handleResize);
    reducedQuery.addEventListener?.('change', handleResize);
    document.addEventListener('visibilitychange', scheduleRender);
    document.fonts.ready.then(handleResize);

    return () => {
      disposed = true;
      invalidateRef.current = null;
      unsubscribe();
      unsubscribeNavigation();
      cancelFlights();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      compactQuery.removeEventListener?.('change', handleResize);
      reducedQuery.removeEventListener?.('change', handleResize);
      document.removeEventListener('visibilitychange', scheduleRender);
      rail.classList.remove('is-orbit-ready');
    };
  }, [itemCount, itemRefs, railRef]);
  useLayoutEffect(() => { invalidateRef.current?.(); }, [railWindow.start, railWindow.count]);
}
