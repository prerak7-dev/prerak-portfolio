import { useCallback, useEffect, useRef, useState } from 'react';
import { SpatialExperience } from './components/SpatialExperience.jsx';
import { getCompletePreloadManifest } from './data/cinematicAssets.js';
import { profile } from './data/portfolioData.js';
import { spatialChapters, spatialThemes } from './data/spatialPortfolioData.js';
import { useSpatialNarrative } from './hooks/useSpatialNarrative.js';
import { createAssetPath } from './security/contentSecurity.js';
import { spatialStyles } from './styles/spatialStyles.js';
import { preloadAssetManifest } from './utils/preloadAssets.js';

const themeIds = new Set(spatialThemes.map((theme) => theme.id));
const CHAPTER_SCROLL_DISTANCE_VH = 400;
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
  const bootProgressRef = useRef(0);
  const bootTargetRef = useRef(0);
  const bootIntervalRef = useRef(0);
  const preloadedImagesRef = useRef([]);
  const initialThemeRef = useRef(theme);

  useEffect(() => {
    storePreference('aegis-theme', theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    const manifest = getCompletePreloadManifest(initialThemeRef.current);
    const minimumTimer = window.setTimeout(() => setMinimumLoadTimeMet(true), 1500);
    const progressElement = document.getElementById('boot-progress');
    bootIntervalRef.current = window.setInterval(() => {
      const target = Math.min(97, bootTargetRef.current);
      if (bootProgressRef.current < target) {
        bootProgressRef.current = Math.min(
          target,
          bootProgressRef.current + Math.max(1, Math.ceil((target - bootProgressRef.current) * 0.16)),
        );
      }
      if (progressElement) progressElement.textContent = String(bootProgressRef.current).padStart(3, '0');
    }, 80);

    preloadAssetManifest(
      manifest,
      (filename) => createAssetPath(import.meta.env.BASE_URL, filename),
      (ratio) => {
        bootTargetRef.current = Math.max(bootTargetRef.current, Math.round(ratio * 92));
      },
    ).then((images) => {
      if (cancelled) return;
      preloadedImagesRef.current = images;
      bootTargetRef.current = 94;
      setEnvironmentReady(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimer);
      window.clearInterval(bootIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!worldReady || !environmentReady || !cinematicReady || !minimumLoadTimeMet) return undefined;
    window.clearInterval(bootIntervalRef.current);
    const loader = document.getElementById('boot-loader');
    const progressElement = document.getElementById('boot-progress');
    bootTargetRef.current = 100;
    bootProgressRef.current = 100;
    if (progressElement) progressElement.textContent = '100';
    loader?.classList.add('is-complete');
    const revealTimer = window.setTimeout(() => setExperienceVisible(true), 760);
    const removalTimer = window.setTimeout(() => loader?.remove(), 980);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(removalTimer);
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
  const trackHeight = 100 + (spatialChapters.length - 1) * CHAPTER_SCROLL_DISTANCE_VH;

  return (
    <div className={`archive-app theme-${theme}`}>
      <style>{spatialStyles}</style>
      <SpatialExperience
        profile={profile}
        activeIndex={activeIndex}
        goToChapter={goToChapter}
        theme={theme}
        setTheme={setTheme}
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
