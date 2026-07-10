import { useEffect, useMemo, useState } from 'react';
import backgroundPortrait from '../content/background-portrait.jpg';
import { heroTabs, profile, sectors, weatherCodes } from './data/portfolioData.js';
import { createMailtoHref, getSafeLinkProps } from './security/contentSecurity.js';
import { FloatingHud, LoreGuide, MissionMap, ProfileTabs, TabbedContent } from './components/PortfolioSections.jsx';
import { ProfileAvatar } from './components/primitives.jsx';
import { WorldBackdrop } from './components/WorldScene.jsx';
import { useActiveSector, useBrowserZoomLock, useLiveClock, usePageProgress, useTiltCard } from './hooks/usePortfolioRuntime.js';
import { applyWeatherToScene } from './utils/scene.js';
import { getTimeProfile, resolveWeatherLocation } from './utils/weather.js';
import { foldStyles, layoutRestoreStyles, portraitStyles, styles, tabStyles, typeStyles } from './styles/appStyles.js';









export default function App() {
  const now = useLiveClock();
  const timeProfile = useMemo(() => getTimeProfile(now), [now]);
  const [sceneTimeProfile, setSceneTimeProfile] = useState(null);
  const activeTimeProfile = sceneTimeProfile || timeProfile;
  const scrollProgress = usePageProgress();
  const activeSector = useActiveSector();
  const [mode, setMode] = useState('snowboard');
  const [weather, setWeather] = useState('snow');
  const [weatherPower, setWeatherPower] = useState(1);
  const [fallTheme, setFallTheme] = useState(false);
  const [springTheme, setSpringTheme] = useState(false);
  const [winterTheme, setWinterTheme] = useState(false);
  const [hudInteracted, setHudInteracted] = useState(false);
  const [weatherStatus, setWeatherStatus] = useState('idle');
  const [weatherError, setWeatherError] = useState('');
  const [liveWeather, setLiveWeather] = useState(null);
  const [activeTabId, setActiveTabId] = useState(heroTabs[0].id);
  const activeContentTab = heroTabs.find((tab) => tab.id === activeTabId) || heroTabs[0];
  useTiltCard();
  useBrowserZoomLock();

  useEffect(() => {
    const onKey = (event) => {
      if (!event.altKey) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const next = sectors[Math.min(sectors.length - 1, activeSector + 1)];
        document.getElementById(next.id)?.scrollIntoView({ behavior: 'smooth' });
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prev = sectors[Math.max(0, activeSector - 1)];
        document.getElementById(prev.id)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSector]);

  async function useLiveWeather() {
    if (!('geolocation' in navigator)) {
      setWeatherError('Live weather needs browser geolocation support.');
      setWeatherStatus('error');
      return;
    }
    setWeatherStatus('loading');
    setWeatherError('');
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,precipitation,rain,snowfall,cloud_cover,is_day&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather request failed');
        const data = await response.json();
        const current = data.current || {};
        const [condition, kind] = weatherCodes[current.weather_code] || ['Current weather', 'clear'];
        const locationLabel = await resolveWeatherLocation(latitude, longitude, data.timezone);
        const next = {
          condition,
          kind,
          temp: current.temperature_2m ?? 0,
          wind: current.wind_speed_10m ?? 0,
          location: locationLabel,
          code: current.weather_code,
        };
        const weatherTime = current.time ? getTimeProfile(new Date(current.time)) : null;
        setSceneTimeProfile(weatherTime || (current.is_day === 0 ? { key: 'night', label: 'Night' } : current.is_day === 1 ? { key: 'day', label: 'Day' } : null));
        setLiveWeather(next);
        setWeatherStatus('synced');
        applyWeatherToScene(kind, setMode, setWeather, setWeatherPower);
      } catch (error) {
        setWeatherStatus('error');
        setWeatherError('Live weather could not be loaded. The scene still uses local time.');
      }
    }, () => {
      setWeatherStatus('error');
      setWeatherError('Location permission was not granted. Manual ambience remains active.');
    }, { enableHighAccuracy: false, timeout: 10_000, maximumAge: 30 * 60 * 1000 });
  }

  return (
    <main className={`site ${mode} ${activeTimeProfile.key} ${fallTheme ? 'fall-theme' : ''} ${springTheme ? 'spring-theme' : ''} ${winterTheme ? 'winter-theme' : ''}`}>
      <style>{styles}</style>
      <style>{portraitStyles}</style>
      <style>{typeStyles}</style>
      <style>{foldStyles}</style>
      <style>{layoutRestoreStyles}</style>
      <style>{tabStyles}</style>
      <WorldBackdrop mode={mode} weather={weather} weatherPower={weatherPower} activeSector={activeSector} scrollProgress={scrollProgress} timeProfile={activeTimeProfile} fallTheme={fallTheme} springTheme={springTheme} winterTheme={winterTheme} />
      <div className="portrait-background" aria-hidden="true">
        <img src={backgroundPortrait} alt="" />
      </div>
      <div className="ambient-grid" aria-hidden="true" />
      <header className="nav-shell">
        <a className="brand" href="#hero"><ProfileAvatar /><span><strong>{profile.name}</strong><small>Engineer · Builder · Problem Solver</small></span></a>
        <a className="nav-cta" href={profile.resume} download>Download CV</a>
      </header>

      <MissionMap activeSector={activeSector} activeContentTab={activeContentTab} />
      <FloatingHud weather={weather} setWeather={setWeather} weatherPower={weatherPower} setWeatherPower={setWeatherPower} activeSector={activeSector} liveWeather={liveWeather} timeProfile={activeTimeProfile} weatherStatus={weatherStatus} weatherError={weatherError} onUseLiveWeather={useLiveWeather} onInteract={() => setHudInteracted(true)} fallTheme={fallTheme} setFallTheme={setFallTheme} springTheme={springTheme} setSpringTheme={setSpringTheme} winterTheme={winterTheme} setWinterTheme={setWinterTheme} />
      <LoreGuide activeSector={activeSector} activeContentTab={activeContentTab} hudInteracted={hudInteracted} />

      <section id="hero" className="sector hero-sector">
        <div className="hero-copy">
          <p className="eyebrow">// Backend · Game Tech · Data Systems</p>
          <h1>{profile.name}</h1>
          <h2><span>{profile.title}</span> {profile.tagline}</h2>
          <p className="hero-lede">I build reliable backend services, content pipelines, and developer-facing tools that connect cloud-native engineering with game-production workflows.</p>
          <div className="hero-actions"><a className="primary-action" href="#tab-content">Start exploring →</a><a href={profile.resume} download>Download Resume</a><a href={profile.github} {...getSafeLinkProps(profile.github)}>GitHub</a></div>
        </div>
      </section>

      <section id="tab-content" className="sector section-wrap tab-content" role="tabpanel" aria-labelledby={`profile-tab-${activeContentTab.id}`}>
        <ProfileTabs tabs={heroTabs} activeTabId={activeTabId} onTabChange={setActiveTabId} />
        <TabbedContent tab={activeContentTab} />
      </section>

      <footer id="contact" className="sector footer-shell panel-card" data-tilt>
        <div><ProfileAvatar /><h2>Let’s build online systems and game technology that scale.</h2><p>{profile.location}</p></div>
        <div className="contact-links"><a href={createMailtoHref(profile.email)}>{profile.email}</a><a href={profile.linkedin} {...getSafeLinkProps(profile.linkedin)}>LinkedIn</a><a href={profile.github} {...getSafeLinkProps(profile.github)}>GitHub</a></div>
      </footer>
      <div className="scroll-finish-spacer" aria-hidden="true" />
    </main>
  );
}
