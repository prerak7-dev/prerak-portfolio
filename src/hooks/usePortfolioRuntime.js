import { useEffect, useState } from 'react';
import { sectors } from '../data/portfolioData.js';
import { clamp } from '../utils/weather.js';

export function useLiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

export function usePageProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(clamp(window.scrollY / max, 0, 1));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return progress;
}

export function useBrowserZoomLock() {
  useEffect(() => {
    const update = () => {
      const viewport = window.visualViewport || window;
      const viewportWidth = viewport.width || window.innerWidth;
      const viewportHeight = viewport.height || window.innerHeight;
      const margin = 18;
      const hud = document.querySelector('.floating-hud');
      const map = document.querySelector('.mission-map');
      const hudScale = hud
        ? Math.min(1, (viewportWidth - margin * 2) / hud.offsetWidth, (viewportHeight - margin * 2) / hud.offsetHeight)
        : 1;
      const mapScale = map
        ? Math.min(0.9, (viewportWidth - margin * 2) / map.offsetWidth, (viewportHeight - margin * 2) / map.offsetHeight)
        : 0.9;
      document.documentElement.style.setProperty('--hud-fit-scale', String(clamp(hudScale, 0.42, 1)));
      document.documentElement.style.setProperty('--map-fit-scale', String(clamp(mapScale, 0.42, 0.9)));
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);
    const timer = window.setInterval(update, 400);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
      window.clearInterval(timer);
    };
  }, []);
}

export function useActiveSector() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const update = () => {
      const checkpoint = window.innerHeight * 0.44;
      let next = 0;
      sectors.forEach((sector, index) => {
        const el = document.getElementById(sector.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= checkpoint) next = index;
      });
      setActive(next);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return active;
}

export function useTiltCard() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('[data-tilt]'));
    const cleanups = cards.map((card) => {
      const move = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      };
      const leave = () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      return () => {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}
