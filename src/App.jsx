import { useCallback, useEffect, useRef, useState } from 'react';
import { CinematicContourDissolve } from './components/CinematicContourDissolve.jsx';
import { SpatialExperience } from './components/SpatialExperience.jsx';
import {
  getCinematicAssets,
  getCriticalPreloadManifest,
  getCinematicGeometryAsset,
  getCinematicSceneAsset,
  getThemeWarmPreloadManifest,
  GATEWAY_COMPACT_MEDIA_QUERY,
  GATEWAY_FRAME_COUNT,
  GATEWAY_GEOMETRY_KEYFRAME_INDICES,
} from './data/cinematicAssets.js';
import { chapterCelestialSources } from './data/chapterRailCelestialData.js';
import { loreAvatarSources } from './data/loreAvatarData.js';
import { profile } from './data/portfolioData.js';
import { spatialChapters, spatialThemes } from './data/spatialPortfolioData.js';
import { useSpatialNarrative } from './hooks/useSpatialNarrative.js';
import { createAssetPath } from './security/contentSecurity.js';
import { getGatewayTransition } from './state/gatewayTransitionStore.js';
import { startThemeContourTransition } from './state/themeContourTransitionStore.js';
import { spatialStyles } from './styles/spatialStyles.js';
import { BOOT_CONTOUR_TRANSITION_DURATION_MS } from './utils/cinematicTiming.js';
import { loadCinematicGeometryField } from './utils/cinematicGeometryField.js';
import { preloadAssetManifest, preloadImageUrls, preloadImageUrl } from './utils/preloadAssets.js';

const themeIds = new Set(spatialThemes.map((theme) => theme.id));
const CHAPTER_SCROLL_DISTANCE_VH = 400;
const backgroundPreloads = new Map();
const geometryPreloads = new Map();
const CHAPTER_SCENE_INDICES = Object.freeze([0, 1, 2, 3, 3, 4, 5]);

function resolveAsset(filename) {
  return createAssetPath(import.meta.env.BASE_URL, filename);
}

function isCompactViewport() {
  return window.matchMedia(GATEWAY_COMPACT_MEDIA_QUERY).matches;
}

function preloadTheme(theme, compact = isCompactViewport()) {
  const key = `${theme}:warm:${compact ? 'compact' : 'full'}`;
  if (backgroundPreloads.has(key)) return backgroundPreloads.get(key);
  // Keep the deferred cache small. Gateway frames and contour fields are
  // streamed on demand, so a theme click never competes with a 24-frame
  // decode/upload burst on the main thread.
  const manifest = getThemeWarmPreloadManifest(theme, { compact }).filter(({ filename }) => (
    !filename.includes('/gateway/') && !filename.includes('/geometry/')
  ));
  const pending = preloadAssetManifest(manifest, resolveAsset, null, 2)
    .then(() => undefined);
  backgroundPreloads.set(key, pending);
  return pending;
}

function waitForIdleSlice(timeout = 180) {
  return new Promise((resolve) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(resolve, { timeout });
    } else {
      window.setTimeout(resolve, 0);
    }
  });
}

function preloadThemeGeometry(theme, onProgress = null) {
  const key = `${theme}:geometry`;
  if (geometryPreloads.has(key)) return geometryPreloads.get(key);
  const assets = getCinematicAssets(theme);
  const filenames = [...new Set([
    ...GATEWAY_GEOMETRY_KEYFRAME_INDICES
      .map((index) => assets.geometry.gatewayFrames[index]),
    assets.geometry.cores,
    assets.geometry.systems,
    assets.geometry.chronology,
    assets.geometry.field,
    assets.geometry.surface,
  ].filter(Boolean))];
  const pending = (async () => {
    for (let index = 0; index < filenames.length; index += 1) {
      await waitForIdleSlice();
      try {
        await loadCinematicGeometryField(filenames[index]);
      } catch (error) {
        // A missing atmosphere field should not block access to the portfolio.
      }
      onProgress?.((index + 1) / filenames.length);
    }
  })();
  geometryPreloads.set(key, pending);
  return pending;
}

function preloadFonts() {
  return document.fonts?.ready || Promise.resolve();
}

function requestIdleWork(callback, timeout = 1600, delay = 0) {
  let workId = 0;
  let cancelled = false;
  const schedule = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === 'function') {
      workId = window.requestIdleCallback(callback, { timeout });
    } else {
      workId = window.setTimeout(callback, Math.min(timeout, 500));
    }
  };
  const delayId = delay ? window.setTimeout(schedule, delay) : 0;
  if (!delay) schedule();
  return () => {
    cancelled = true;
    if (delayId) window.clearTimeout(delayId);
    if (!workId) return;
    if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(workId);
    else window.clearTimeout(workId);
  };
}
function readPreference(key, allowedValues, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return allowedValues.has(value) ? value : fallback;
  } catch (error) {
    return fallback;
  }
}

function storePreference(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    // Local preferences are optional; the experience works without storage.
  }
}

export default function App() {
  const { activeIndex, goToChapter } = useSpatialNarrative(spatialChapters.length);
  const [theme, setTheme] = useState(() => readPreference('aegis-theme', themeIds, 'default'));
  const [atmospherePower, setAtmospherePower] = useState(1);
  const [worldReady, setWorldReady] = useState(false);
  const [environmentReady, setEnvironmentReady] = useState(false);
  const [cinematicReady, setCinematicReady] = useState(false);
  const [minimumLoadTimeMet, setMinimumLoadTimeMet] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [bootContourMounted, setBootContourMounted] = useState(true);
  const bootProgressRef = useRef(0);

  const bootTargetRef = useRef(0);
  const bootIntervalRef = useRef(0);
  const preloadedImagesRef = useRef([]);
  const bootContourImagesRef = useRef([]);
  const bootTransitionStartedRef = useRef(false);
  const initialThemeRef = useRef(theme);
  const themeRequestRef = useRef(0);
  const themeTransitionBusyRef = useRef(false);
  const bootStartedAtRef = useRef(performance.now());

  useEffect(() => {
    storePreference('aegis-theme', theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    const compactViewport = isCompactViewport();
    const manifest = getCriticalPreloadManifest(initialThemeRef.current, {
      compact: compactViewport,
    });
    const bootContourAssets = [
      getCinematicSceneAsset('default', 0, 0, { compact: compactViewport }),
      getCinematicSceneAsset(initialThemeRef.current, 0, 0, { compact: compactViewport }),
      getCinematicGeometryAsset('default', 0, 0),
    ].map(resolveAsset);
    const interfaceAssets = [
      ...chapterCelestialSources,
      ...loreAvatarSources,
      profile.photo,
    ].filter(Boolean);
    const minimumTimer = window.setTimeout(() => setMinimumLoadTimeMet(true), 900);
    const cancelIdleTasks = [];
    const loader = document.getElementById('boot-loader');
    const progressElement = document.getElementById('boot-progress');
    const progressTrack = document.getElementById('boot-progress-track');
    bootIntervalRef.current = window.setInterval(() => {
      const target = Math.min(97, bootTargetRef.current);
      if (bootProgressRef.current < target) {
        bootProgressRef.current = Math.min(
          target,
          bootProgressRef.current + Math.max(1, Math.ceil((target - bootProgressRef.current) * 0.16)),
        );
      }
      if (progressElement) progressElement.textContent = String(bootProgressRef.current).padStart(3, '0');
      if (progressElement && progressElement.previousElementSibling) {
        const progress = bootProgressRef.current;
        progressElement.previousElementSibling.textContent = progress < 28
          ? 'Tracing the passage'
          : progress < 66
            ? 'Awakening the gate'
            : progress < 92
              ? 'Binding the constellations'
              : 'The archive is ready';
      }
      progressTrack?.setAttribute('aria-valuenow', String(bootProgressRef.current));
      loader?.style.setProperty('--boot-progress', (bootProgressRef.current / 100).toFixed(3));
    }, 80);

    Promise.all([
      preloadAssetManifest(
        manifest,
        resolveAsset,
        (ratio) => {
          bootTargetRef.current = Math.max(bootTargetRef.current, Math.round(ratio * 72));
        },
        6,
      ),
      preloadImageUrls(bootContourAssets, 3),
      preloadImageUrls(interfaceAssets, 4),
      preloadThemeGeometry(initialThemeRef.current, (ratio) => {
        bootTargetRef.current = Math.max(
          bootTargetRef.current,
          Math.round(72 + ratio * 20),
        );
      }),
      preloadFonts(),
    ]).then(([images, bootContourImages, interfaceImages]) => {
      if (cancelled) return;
      bootContourImagesRef.current = bootContourImages;
      preloadedImagesRef.current = [
        ...images,
        ...bootContourImages,
        ...interfaceImages,
      ].filter(Boolean);
      bootTargetRef.current = 94;
      setEnvironmentReady(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimer);
      window.clearInterval(bootIntervalRef.current);
      cancelIdleTasks.forEach((cancel) => cancel());
    };
  }, []);

  useEffect(() => {
    if (!worldReady || !environmentReady || !cinematicReady || !minimumLoadTimeMet) return undefined;
    if (bootTransitionStartedRef.current) return undefined;
    bootTransitionStartedRef.current = true;
    window.clearInterval(bootIntervalRef.current);
    const loader = document.getElementById('boot-loader');
    const progressElement = document.getElementById('boot-progress');
    const progressTrack = document.getElementById('boot-progress-track');
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [fromImage, toImage, geometryImage] = bootContourImagesRef.current;
    let startTimer = 0;
    let coverFrame = 0;
    let coverFrameInner = 0;
    let removalTimer = 0;
    bootTargetRef.current = 100;
    bootProgressRef.current = 100;
    if (progressElement) progressElement.textContent = '100';
    progressTrack?.setAttribute('aria-valuenow', '100');
    loader?.style.setProperty('--boot-progress', '1');
    document.documentElement.dataset.bootMs = String(Math.round(performance.now() - bootStartedAtRef.current));

    const completeBoot = () => {
      root.classList.remove('boot-contour-transition-active');
      loader?.classList.add('is-complete');
      setExperienceVisible(true);
      setBootContourMounted(false);
      removalTimer = window.setTimeout(() => {
        loader?.remove();
        preloadedImagesRef.current = [];
        bootContourImagesRef.current = [];
      }, 720);
    };

    if (reduceMotion || !fromImage || !toImage || !geometryImage) {
      completeBoot();
      return () => window.clearTimeout(removalTimer);
    }

    loader?.classList.add('is-transitioning');
    startTimer = window.setTimeout(() => {
      root.classList.add('boot-contour-transition-active');
      startThemeContourTransition({
        fromTheme: 'boot',
        toTheme: initialThemeRef.current,
        sceneIndex: 0,
        gatewayFrameIndex: 0,
        fromImage,
        toImage,
        geometryImage,
        duration: BOOT_CONTOUR_TRANSITION_DURATION_MS,
        onComplete: completeBoot,
      });
      coverFrame = window.requestAnimationFrame(() => {
        coverFrameInner = window.requestAnimationFrame(() => {
          loader?.classList.add('is-canvas-covered');
        });
      });
    }, 420);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(removalTimer);
      window.cancelAnimationFrame(coverFrame);
      window.cancelAnimationFrame(coverFrameInner);
      root.classList.remove('boot-contour-transition-active');
    };
  }, [cinematicReady, environmentReady, minimumLoadTimeMet, worldReady]);

  const handleWorldReady = useCallback(() => {
    bootTargetRef.current = Math.max(bootTargetRef.current, 97);
    setWorldReady(true);
  }, []);
  const handleCinematicReady = useCallback(() => {
    bootTargetRef.current = Math.max(bootTargetRef.current, 96);
    setCinematicReady(true);
  }, []);
  const handleThemeChange = useCallback((nextTheme) => {
    if (
      !themeIds.has(nextTheme)
      || nextTheme === theme
      || themeTransitionBusyRef.current
    ) return;
    themeTransitionBusyRef.current = true;
    const requestId = themeRequestRef.current + 1;
    themeRequestRef.current = requestId;
    document.documentElement.classList.add('theme-assets-preparing');
    const compactViewport = isCompactViewport();
    const sceneIndex = CHAPTER_SCENE_INDICES[activeIndex] ?? 0;
    const gatewayFrameIndex = Math.round(
      getGatewayTransition().progress * (GATEWAY_FRAME_COUNT - 1),
    );
    const fromSceneFilename = getCinematicSceneAsset(
      theme,
      sceneIndex,
      gatewayFrameIndex,
      { compact: compactViewport },
    );
    const toSceneFilename = getCinematicSceneAsset(
      nextTheme,
      sceneIndex,
      gatewayFrameIndex,
      { compact: compactViewport },
    );
    const geometryFilename = getCinematicGeometryAsset(theme, sceneIndex, gatewayFrameIndex);
    const nearbySceneFilenames = new Set();
    if (sceneIndex === 0) {
      const gatewayFrameIndices = [
        Math.max(0, gatewayFrameIndex - 1),
        gatewayFrameIndex,
        Math.min(GATEWAY_FRAME_COUNT - 1, gatewayFrameIndex + 1),
      ];
      gatewayFrameIndices.forEach((frameIndex) => {
        nearbySceneFilenames.add(
          getCinematicSceneAsset(nextTheme, sceneIndex, frameIndex, { compact: compactViewport }),
        );
      });
    }
    const nextThemeAssets = getCinematicAssets(nextTheme);
    const nextThemeSeasonalVines = nextThemeAssets.seasonalVines
      ? resolveAsset(nextThemeAssets.seasonalVines)
      : null;

    Promise.all([
      preloadImageUrl(resolveAsset(fromSceneFilename), 'high'),
      preloadImageUrl(resolveAsset(toSceneFilename), 'high'),
      preloadImageUrl(resolveAsset(geometryFilename), 'high'),
      preloadImageUrls(
        [...nearbySceneFilenames]
          .filter((filename) => filename !== toSceneFilename)
          .map(resolveAsset),
        2,
      ),
      nextThemeSeasonalVines ? preloadImageUrl(nextThemeSeasonalVines, 'high') : Promise.resolve(null),
    ]).then(([fromImage, toImage, geometryImage]) => {
      if (themeRequestRef.current !== requestId) return;
      document.documentElement.classList.remove('theme-assets-preparing');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion || !fromImage || !toImage || !geometryImage) {
        setTheme(nextTheme);
        themeTransitionBusyRef.current = false;
      } else {
        document.documentElement.classList.add('theme-contour-transition-active');
        startThemeContourTransition({
          fromTheme: theme,
          toTheme: nextTheme,
          sceneIndex,
          gatewayFrameIndex,
          fromImage,
          toImage,
          geometryImage,
          applyTheme: () => new Promise((resolve) => {
            setTheme(nextTheme);
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(resolve);
            });
          }),
          onComplete: () => {
            document.documentElement.classList.remove('theme-contour-transition-active');
            themeTransitionBusyRef.current = false;
          },
        });
      }
      requestIdleWork(() => preloadTheme(nextTheme, compactViewport), 3200, 1600);
    }).catch(() => {
      if (themeRequestRef.current !== requestId) return;
      document.documentElement.classList.remove('theme-assets-preparing');
      setTheme(nextTheme);
      themeTransitionBusyRef.current = false;
    });
  }, [activeIndex, theme]);
  const trackHeight = 100 + (spatialChapters.length - 1) * CHAPTER_SCROLL_DISTANCE_VH;

  return (
    <div className={`archive-app theme-${theme}`}>
      <style>{spatialStyles}</style>
      {bootContourMounted && (
        <CinematicContourDissolve theme={theme} className="boot-contour-dissolve" />
      )}
      <SpatialExperience
        profile={profile}
        activeIndex={activeIndex}
        goToChapter={goToChapter}
        theme={theme}
        setTheme={handleThemeChange}
        atmospherePower={atmospherePower}
        setAtmospherePower={setAtmospherePower}
        experienceVisible={experienceVisible}
        onEnvironmentReady={handleCinematicReady}
        onWorldReady={handleWorldReady}
      />
      <div className="archive-scroll-track" style={{ height: `${trackHeight}vh` }} aria-hidden="true">
        {spatialChapters.map((chapter, index) => (
          <span
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            className="archive-scroll-marker"
            style={{ top: `${index * CHAPTER_SCROLL_DISTANCE_VH}vh` }}
          />
        ))}
      </div>
    </div>
  );
}
