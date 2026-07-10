import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import backgroundPortrait from '../content/background-portrait.jpg';
import loreGuidePersona from '../content/lore-guide-persona.png';

const baseUrl = import.meta.env.BASE_URL;

const profile = {
  name: 'Prerak Pandey',
  title: 'Backend / Full-Stack Engineer',
  tagline: 'building game-technology systems',
  location: 'Chicago, IL · Open to Amsterdam / relocation',
  email: 'prerak.pandey7@gmail.com',
  github: 'https://github.com/prerak7-dev',
  linkedin: 'https://www.linkedin.com/in/prerak-pandey',
  resume: `${baseUrl}Prerak_Pandey_Resume.pdf`,
  photo: `${baseUrl}profile-photo.png`,
};

const sectors = [
  { id: 'hero', label: 'Intro', title: 'Backend + Game Tech', note: 'positioning' },
  { id: 'tab-content', label: 'Content', title: 'Tabbed Portfolio', note: 'selected view' },
  { id: 'contact', label: 'Contact', title: 'Next Step', note: 'links' },
];

const projects = [
  {
    number: '01',
    title: 'Aegis Animation Pipeline',
    eyebrow: 'Java / Spring Boot / Redis / Kafka',
    summary:
      'A backend animation-processing pipeline that ingests mocap, coordinates long-running work through asynchronous services, validates output, and publishes Unreal-importable JSON overlays.',
    tags: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'JSON', 'Validation'],
    bullets: [
      'Kafka-separated ingestion, processing, validation, and publishing flow.',
      'Redis-backed job state for progress tracking, retries, and fault isolation.',
      'JSON overlay output designed for Unreal procedural-animation import.',
      'Built as a game-tech portfolio system for online-service architecture credibility.',
    ],
  },
  {
    number: '02',
    title: 'Aegis Motion Plugin',
    eyebrow: 'Unreal Engine C++ / Editor Tooling',
    summary:
      'A curve-driven Unreal Engine plugin for procedural animation authoring, runtime pose driving, data-asset workflows, and debug visualization.',
    tags: ['Unreal C++', 'Data Assets', 'Editor Tools', 'Animation Curves', 'Blueprint API'],
    bullets: [
      'Procedural motion driver using authored data assets and animation curves.',
      'Runtime smoothing, action playback, debug overlays, and editor-first iteration.',
      'Designed to connect backend-generated animation data to Unreal workflows.',
      'Portfolio centerpiece for technical animation and tools engineering storytelling.',
    ],
  },
];

const pipelineSteps = [
  ['Data Sources', 'Mocap · BVH · JSON · client/CMS data'],
  ['Ingest Service', 'Validation, normalization, job creation'],
  ['Kafka Topics', 'Async message boundaries between services'],
  ['Processors', 'Curve generation and overlay shaping'],
  ['Redis State', 'Progress, metadata, retry/fault isolation'],
  ['JSON Overlays', 'Unreal-ready procedural animation output'],
  ['Unreal Import', 'Data assets, curves, runtime driver'],
];

const stackGroups = [
  ['Backend & Services', ['Java', 'Spring Boot', 'C#', '.NET', 'Node.js', 'REST APIs', 'GraphQL']],
  ['Cloud & Delivery', ['AWS', 'S3', 'Cognito', 'IAM', 'Lambda', 'Docker', 'Git', 'CI/CD']],
  ['Game Tech', ['Unreal Engine C++', 'Anim Blueprints', 'Mocap', 'Data Assets', 'Editor Tools']],
  ['Data & DevOps', ['Kafka', 'Redis', 'SQL/PostgreSQL', 'MySQL', 'Logging', 'Monitoring']],
];

const professionalTimeline = [
  {
    meta: 'Jul 2021 - Apr 2024 / Des Plaines, IL',
    title: 'Web Application Developer',
    subtitle: 'Americaneagle.com',
    body:
      'Built and maintained enterprise Sitecore and headless web applications for insurance, nonprofit, medical/scientific, and data-sector clients across CMS integrations, cloud services, CI/CD deployments, reporting tools, and client delivery.',
    bullets: [
      'Worked across backend services, frontend integration, QA cycles, deployments, and stakeholder-facing delivery.',
      'Translated ambiguous client requirements into maintainable implementation plans and production releases.',
    ],
  },
  {
    meta: 'Dec 2017 - May 2021 / Mahwah, NJ',
    title: 'Student Data Analyst',
    subtitle: 'Ramapo College of New Jersey',
    body:
      'Analyzed academic and non-academic data to support advising allocation, reporting, and student-success planning while automating recurring reporting workflows.',
    bullets: [
      'Built a practical foundation in data cleaning, analysis, reporting, and operational communication.',
      'Turned institutional data into recommendations that could be used by advising and planning teams.',
    ],
  },
];

const educationTimeline = [
  {
    meta: '2017 - 2021 / Mahwah, NJ',
    title: 'Ramapo College of New Jersey',
    subtitle: 'Applied computing, analytics, and systems foundation',
    body:
      'Developed the academic base for software engineering, data analysis, reporting workflows, and technical communication while working in a student data role.',
    bullets: [
      'Combined coursework with hands-on institutional data analysis and recurring reporting responsibilities.',
      'Built the habits that now show up in backend design: clarity, traceability, and practical delivery.',
    ],
  },
  {
    meta: 'Ongoing',
    title: 'Independent Technical Study',
    subtitle: 'Backend systems, game technology, and production tooling',
    body:
      'Continues building portfolio systems around async services, cloud delivery, Unreal tooling, procedural animation, and content pipeline architecture.',
    bullets: [
      'Uses portfolio projects to connect service architecture with game-production workflows.',
      'Focuses on production-adjacent systems that are visible, explainable, and extensible.',
    ],
  },
];

const personalProjects = [
  {
    meta: 'Photography',
    title: 'Visual Field Notes',
    subtitle: 'Composition, light, cities, landscapes',
    body:
      'A personal practice for noticing detail, framing atmosphere, and building a sharper eye for environments and visual storytelling.',
    bullets: ['Street, travel, portrait, and landscape-oriented collections.', 'Useful creative muscle for game worlds, mood, and presentation.'],
    media: [
      {
        type: 'photo',
        src: '',
        alt: 'City light and architectural framing study',
        meta: 'Photo / Urban study',
        caption: 'A placeholder slot for a city, street, or architecture frame with notes about light, texture, and composition.',
      },
      {
        type: 'photo',
        src: '',
        alt: 'Landscape atmosphere and depth study',
        meta: 'Photo / Landscape',
        caption: 'A place to collect outdoor compositions, weather, mountain silhouettes, skyline layers, or wide environmental shots.',
      },
      {
        type: 'video',
        src: '',
        poster: '',
        alt: 'Short motion study from a photo walk',
        meta: 'Video / Motion note',
        caption: 'A short clip slot for movement, ambient detail, camera tests, or environmental reference gathered during a walk.',
      },
    ],
  },
  {
    meta: 'Writing',
    title: 'Essays, Notes, and Narrative Sketches',
    subtitle: 'Reflection, technical storytelling, creative work',
    body:
      'Writing as a way to clarify ideas, document experiences, and shape technical or personal material into something readable and memorable.',
    bullets: ['Short-form reflective writing and project narratives.', 'A bridge between engineering detail and human context.'],
    media: [
      {
        type: 'photo',
        src: '',
        alt: 'Writing desk, draft, or notebook image',
        meta: 'Photo / Draft context',
        caption: 'A visual cover slot for an essay, notebook scan, workspace image, or thematic reference connected to a piece of writing.',
      },
      {
        type: 'photo',
        src: '',
        alt: 'Narrative sketch or essay cover image',
        meta: 'Photo / Essay cover',
        caption: 'A caption space for the idea behind a personal essay, technical reflection, project narrative, or creative sketch.',
      },
      {
        type: 'video',
        src: '',
        poster: '',
        alt: 'Reading, voice note, or process clip',
        meta: 'Video / Process',
        caption: 'A video slot for a reading excerpt, process note, recorded thought, or short context clip around a written piece.',
      },
    ],
  },
  {
    meta: 'Travel / Adventure',
    title: 'Experience-Led Exploration',
    subtitle: 'Places, movement, and perspective',
    body:
      'Travel and adventure experiences feed the portfolio world-building sensibility: routes, weather, terrain, culture, and the feeling of moving through a place.',
    bullets: ['Designed to expand into location-specific stories, galleries, or field logs.', 'Pairs naturally with photography and writing sections.'],
    media: [
      {
        type: 'photo',
        src: '',
        alt: 'Route, trail, or destination field image',
        meta: 'Photo / Field log',
        caption: 'A slot for travel memories, trail references, city routes, or the first image in a location-specific adventure note.',
      },
      {
        type: 'video',
        src: '',
        poster: '',
        alt: 'Adventure movement or travel atmosphere clip',
        meta: 'Video / Movement',
        caption: 'A clip slot for road movement, weather, terrain, arrival moments, or ambient details from a trip.',
      },
      {
        type: 'photo',
        src: '',
        alt: 'Culture, food, people, or place detail',
        meta: 'Photo / Place detail',
        caption: 'A caption area for the small details that make a place memorable: textures, signs, rituals, meals, or quiet moments.',
      },
    ],
  },
];

const heroTabs = [
  {
    id: 'portfolio',
    label: 'Portfolio Projects',
    kicker: '01 / Systems',
    summary: 'Selected technical portfolio work with backend architecture, async processing, and Unreal-facing game-technology context.',
    blocks: [{ type: 'projects' }, { type: 'architecture' }, { type: 'stack' }],
  },
  {
    id: 'professional',
    label: 'Professional Timeline',
    kicker: '02 / Work',
    summary: 'A detailed professional track from data analysis into production web engineering and client-facing delivery.',
    blocks: [{ type: 'timeline', eyebrow: 'Professional timeline', title: 'Production web engineering plus data-analysis roots.', items: professionalTimeline }],
  },
  {
    id: 'education',
    label: 'Education Timeline',
    kicker: '03 / Learning',
    summary: 'Academic foundation and ongoing technical study behind the engineering, data, and game-technology work.',
    blocks: [{ type: 'timeline', eyebrow: 'Education timeline', title: 'Academic foundation, self-directed study, and technical growth.', items: educationTimeline }],
  },
  {
    id: 'personal',
    label: 'Personal Projects',
    kicker: '04 / Outside Work',
    summary: 'Creative and exploratory projects that shape the visual, narrative, and experiential side of the portfolio.',
    blocks: [{ type: 'personal', eyebrow: 'Personal projects', title: 'Photography, writing, travel, and adventure experiences.' }],
  },
];

const weatherCodes = {
  0: ['Clear', 'clear'], 1: ['Mainly clear', 'clear'], 2: ['Partly cloudy', 'cloud'], 3: ['Overcast', 'cloud'],
  45: ['Fog', 'fog'], 48: ['Rime fog', 'fog'],
  51: ['Light drizzle', 'drizzle'], 53: ['Drizzle', 'drizzle'], 55: ['Dense drizzle', 'rain'],
  56: ['Freezing drizzle', 'snow'], 57: ['Dense freezing drizzle', 'snow'],
  61: ['Slight rain', 'rain'], 63: ['Rain', 'rain'], 65: ['Heavy rain', 'heavy-rain'],
  66: ['Freezing rain', 'snow'], 67: ['Heavy freezing rain', 'snow'],
  71: ['Slight snow', 'snow'], 73: ['Snow', 'snow'], 75: ['Heavy snow', 'heavy-snow'], 77: ['Snow grains', 'snow'],
  80: ['Rain showers', 'rain'], 81: ['Rain showers', 'rain'], 82: ['Violent rain showers', 'heavy-rain'],
  85: ['Snow showers', 'snow'], 86: ['Heavy snow showers', 'heavy-snow'],
  95: ['Thunderstorm', 'storm'], 96: ['Thunderstorm with hail', 'storm'], 99: ['Heavy thunderstorm with hail', 'storm'],
};

const weatherNames = {
  clear: 'Clear glow',
  cloud: 'Cloud cover',
  fog: 'Fog',
  drizzle: 'Drizzle',
  rain: 'Rain',
  'heavy-rain': 'Heavy rain',
  storm: 'Lightning',
  snow: 'Snow',
  'heavy-snow': 'Heavy snow',
};

const manualWeatherCycle = ['snow', 'rain', 'storm', 'cloud', 'clear'];

async function resolveWeatherLocation(latitude, longitude, fallbackTimezone) {
  const coordinateLabel = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Location lookup failed');
    const data = await response.json();
    const locality = data.locality || data.city || data.principalSubdivision;
    const region = data.principalSubdivisionCode || data.principalSubdivision;
    const country = data.countryCode || data.countryName;
    return [locality, region, country].filter(Boolean).filter((value, index, values) => values.indexOf(value) === index).join(', ') || coordinateLabel;
  } catch (error) {
    return fallbackTimezone && fallbackTimezone !== 'auto' ? coordinateLabel : coordinateLabel;
  }
}

function getTimeProfile(date = new Date()) {
  const hour = date.getHours() + date.getMinutes() / 60;
  if (hour >= 5 && hour < 9) return { key: 'dawn', label: 'Dawn' };
  if (hour >= 9 && hour < 17) return { key: 'day', label: 'Day' };
  if (hour >= 17 && hour < 20.5) return { key: 'dusk', label: 'Dusk' };
  return { key: 'night', label: 'Night' };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function Mark() {
  return (
    <div className="mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

function SketchArrow({ direction = 'right' }) {
  return (
    <svg className={`sketch-pointer ${direction}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path className="sketch-pointer-shadow" d="M4.7 3.4c.9-.8 2.2-.7 3.1.1l8 7.5c.7.7.7 1.8 0 2.5l-8 7.1c-.9.8-2.3.8-3.1-.1-.8-.9-.7-2.2.2-3l6-5.3-6.1-5.7c-.9-.8-1-2.2-.1-3.1Zm-1.2 6.8c.7-.6 1.7-.6 2.3 0l2.1 1.9-2.1 1.9c-.7.6-1.7.6-2.3 0-.6-.7-.6-1.7.1-2.3l.2-.2-.2-.2c-.7-.6-.7-1.6-.1-2.3Z" />
      <path d="M4 2.7c.9-.8 2.2-.7 3.1.1l8.6 8c.8.7.8 1.9 0 2.6l-8.6 7.7c-.9.8-2.3.7-3.1-.2-.8-.9-.7-2.2.2-3l6.5-5.8-6.5-6.1c-.9-.8-.9-2.2-.2-3.1Zm-1.3 6.8c.7-.6 1.7-.6 2.4 0l2.7 2.4-2.7 2.4c-.7.6-1.8.5-2.4-.2-.6-.7-.5-1.8.2-2.4l.3-.2-.3-.3c-.7-.6-.8-1.7-.2-2.4Z" />
    </svg>
  );
}

function ProfileAvatar() {
  return <img src={profile.photo} alt={profile.name} className="profile-avatar" />;
}

function Chip({ children }) {
  return <span className="chip">{children}</span>;
}

function useLiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

function usePageProgress() {
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

function useBrowserZoomLock() {
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

function useActiveSector() {
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

function useTiltCard() {
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

function WorldBackdrop({ mode, weather, weatherPower, activeSector, scrollProgress, timeProfile, fallTheme, springTheme, winterTheme }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0.55, y: 0.45, down: false });
  const keysRef = useRef(new Set());
  const refs = useRef({ mode, weather, weatherPower, activeSector, scrollProgress, timeProfile, fallTheme, springTheme, winterTheme });

  useEffect(() => {
    refs.current = { mode, weather, weatherPower, activeSector, scrollProgress, timeProfile, fallTheme, springTheme, winterTheme };
  }, [mode, weather, weatherPower, activeSector, scrollProgress, timeProfile, fallTheme, springTheme, winterTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    const particles = [];
    const stars = [];
    let particleSignature = '';
    const player = { x: width * 0.2, y: height * 0.68, vx: 0, vy: 0, spin: 0, trail: [] };
    const palette = {
      dawn: ['#020202', '#181818', '#f7f7f7'],
      day: ['#050505', '#222222', '#ffffff'],
      dusk: ['#010101', '#121212', '#eeeeee'],
      night: ['#000000', '#0c0c0c', '#ffffff'],
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      resetParticles(true);
      for (let i = 0; i < 120; i += 1) stars.push({ x: Math.random() * width, y: Math.random() * height * 0.72, r: Math.random() * 1.6 + 0.2, a: Math.random() * 0.72 + 0.12 });
    }

    function getParticleSignature() {
      return `${refs.current.weather}:${Math.round(refs.current.weatherPower * 20)}`;
    }

    function getParticleCount() {
      const kind = refs.current.weather;
      const countScale = kind === 'fog' || kind === 'cloud' ? 0.6 : (kind === 'heavy-rain' || kind === 'heavy-snow' || kind === 'storm' ? 1.35 : 1);
      return Math.floor((reduceMotion ? 50 : 160) * refs.current.weatherPower * countScale);
    }

    function resetParticles(fillViewport = false) {
      particles.length = 0;
      particleSignature = getParticleSignature();
      const count = getParticleCount();
      for (let i = 0; i < count; i += 1) particles.push(makeParticle(Math.random() * width, fillViewport ? Math.random() * height : -28));
    }

    function makeParticle(x = Math.random() * width, y = -30) {
      const kind = refs.current.weather;
      const snow = kind === 'snow' || kind === 'heavy-snow';
      const heavy = kind === 'heavy-rain' || kind === 'heavy-snow' || kind === 'storm';
      const fog = kind === 'fog' || kind === 'cloud';
      const clear = kind === 'clear';
      return {
        x,
        y,
        r: fog ? Math.random() * 34 + 18 : clear ? Math.random() * 1.8 + 0.4 : snow ? Math.random() * (heavy ? 2.7 : 2) + 0.8 : Math.random() * (heavy ? 1.9 : 1.3) + 0.5,
        vx: fog ? Math.random() * 0.46 - 0.23 : clear ? Math.random() * 0.5 - 0.25 : snow ? Math.random() * 1.1 - 0.55 : Math.random() * (heavy ? 4.6 : 3.1) - (heavy ? 2.3 : 1.55),
        vy: fog ? Math.random() * 0.18 + 0.02 : clear ? Math.random() * 0.35 + 0.08 : snow ? Math.random() * (heavy ? 2.1 : 1.5) + 0.6 : Math.random() * (heavy ? 6.4 : 4.6) + (kind === 'drizzle' ? 2.2 : 3.4),
        life: Math.random() * 100,
        a: fog ? Math.random() * 0.08 + (kind === 'fog' ? 0.08 : 0.045) : clear ? Math.random() * 0.22 + 0.08 : snow ? Math.random() * 0.48 + 0.22 : Math.random() * (heavy ? 0.56 : 0.42) + 0.16,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    function groundY(x) {
      const isSnow = refs.current.mode === 'snowboard';
      const base = height * (isSnow ? 0.845 : 0.865);
      const wave = isSnow ? Math.sin(x * 0.0055) * 18 + Math.sin(x * 0.014) * 8 : Math.sin(x * 0.006) * 8;
      return base + wave;
    }

    function drawBackground(t) {
      const fall = refs.current.fallTheme;
      const spring = refs.current.springTheme;
      const winter = refs.current.winterTheme;
      const [top, mid, accent] = winter ? ['#f8fdff', '#bdeeff', '#ffffff'] : spring ? ['#edfdf7', '#70c9e8', '#0b6b4f'] : fall ? ['#f7d39d', '#f08a2e', '#ffe36f'] : (palette[refs.current.timeProfile.key] || palette.night);
      const pointer = pointerRef.current;
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, top);
      bg.addColorStop(0.54, mid);
      bg.addColorStop(1, winter ? '#e8f7ff' : spring ? '#0b3028' : fall ? '#421321' : '#000000');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const orbX = width * (0.68 + (pointer.x - 0.5) * 0.07);
      const orbY = height * (0.25 + (pointer.y - 0.5) * 0.05);
      const orb = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, width * 0.48);
      orb.addColorStop(0, winter ? 'rgba(90,150,184,.82)' : spring || fall ? `${accent}4b` : 'rgba(255,255,255,.86)');
      orb.addColorStop(0.18, winter ? 'rgba(90,150,184,.5)' : spring ? 'rgba(5,92,65,.28)' : fall ? 'rgba(73,19,35,.38)' : 'rgba(255,255,255,.64)');
      orb.addColorStop(0.44, winter ? 'rgba(90,150,184,.28)' : spring ? 'rgba(5,92,65,.12)' : fall ? 'rgba(73,19,35,.2)' : 'rgba(255,255,255,.36)');
      orb.addColorStop(1, winter ? 'rgba(90,150,184,0)' : spring ? 'rgba(5,92,65,0)' : fall ? 'rgba(73,19,35,0)' : 'rgba(255,255,255,0)');
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      const alphaMod = refs.current.timeProfile.key === 'day' ? 0.23 : 1;
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.fillStyle = winter ? `rgba(255,255,255,${star.a * 0.42})` : spring ? `rgba(246,255,255,${star.a * alphaMod})` : fall ? `rgba(255,242,178,${star.a * alphaMod})` : `rgba(255,255,255,${star.a * alphaMod})`;
        ctx.arc(star.x + (pointer.x - 0.5) * 22, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      drawHud(orbX, orbY, t);
      drawTrack(t);
    }

    function drawHud(cx, cy, t) {
      const fall = refs.current.fallTheme;
      const spring = refs.current.springTheme;
      const winter = refs.current.winterTheme;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.00013);
      ctx.shadowColor = winter ? 'rgba(90,150,184,.98)' : spring ? 'rgba(3,92,60,.76)' : fall ? 'rgba(73,19,35,.82)' : 'rgba(255,255,255,1)';
      ctx.shadowBlur = winter ? 42 : spring ? 18 : fall ? 16 : 104;
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.strokeStyle = winter ? `rgba(90,150,184,${0.9 - i * 0.065})` : spring ? `rgba(3,92,60,${0.56 - i * 0.06})` : fall ? `rgba(73,19,35,${0.62 - i * 0.064})` : `rgba(255,255,255,${1 - i * 0.032})`;
        ctx.lineWidth = fall || spring || winter ? 1.65 : 3.9;
        ctx.arc(0, 0, 90 + i * 48, Math.PI * 0.08, Math.PI * (1.65 - i * 0.05));
        ctx.stroke();
      }
      for (let i = 0; i < 16; i += 1) {
        ctx.rotate(Math.PI / 8);
        ctx.beginPath();
        ctx.moveTo(132, 0);
        ctx.lineTo(170, 0);
        ctx.strokeStyle = winter ? 'rgba(90,150,184,.86)' : spring ? 'rgba(2,71,49,.46)' : fall ? 'rgba(43,12,24,.5)' : 'rgba(255,255,255,1)';
        ctx.lineWidth = fall || spring || winter ? 1.45 : 2.8;
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawPortraitLayerMask() {
      const fall = refs.current.fallTheme;
      const spring = refs.current.springTheme;
      const winter = refs.current.winterTheme;
      const maskX = width * 0.82;
      const maskY = height * 0.22;
      const mask = ctx.createRadialGradient(maskX, maskY, 0, maskX, maskY, Math.max(width, height) * 0.46);
      if (winter) {
        mask.addColorStop(0, 'rgba(248,253,255,.68)');
        mask.addColorStop(0.42, 'rgba(189,238,255,.34)');
        mask.addColorStop(0.78, 'rgba(255,255,255,.1)');
      } else if (spring) {
        mask.addColorStop(0, 'rgba(237,253,247,.64)');
        mask.addColorStop(0.42, 'rgba(112,201,232,.34)');
        mask.addColorStop(0.78, 'rgba(17,119,86,.1)');
      } else if (fall) {
        mask.addColorStop(0, 'rgba(247,211,157,.72)');
        mask.addColorStop(0.42, 'rgba(247,211,157,.42)');
        mask.addColorStop(0.78, 'rgba(247,211,157,.12)');
      } else {
        mask.addColorStop(0, 'rgba(0,0,0,.98)');
        mask.addColorStop(0.5, 'rgba(0,0,0,.88)');
        mask.addColorStop(0.8, 'rgba(10,10,10,.46)');
      }
      mask.addColorStop(1, 'rgba(2,7,13,0)');
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = mask;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    function drawEnvironment(t) {
      if (refs.current.mode === 'snowboard') drawMountains(t);
      else drawPitch(t);
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 18) ctx.lineTo(x, groundY(x));
      ctx.lineTo(width, height);
      ctx.closePath();
      const grd = ctx.createLinearGradient(0, height * 0.62, 0, height);
      if (refs.current.mode === 'snowboard') {
        grd.addColorStop(0, 'rgba(190,245,255,.15)');
        grd.addColorStop(1, 'rgba(7,19,29,.94)');
      } else {
        grd.addColorStop(0, 'rgba(64,214,153,.13)');
        grd.addColorStop(1, 'rgba(6,21,14,.94)');
      }
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.strokeStyle = 'rgba(34,211,238,.28)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    function drawMountains(t) {
      const pointer = pointerRef.current;
      const layers = refs.current.winterTheme ? [
        [height * 0.48, 130, '#dff7ff', 0.48, 0.5],
        [height * 0.58, 96, '#9ed8f2', 0.7, 1.1],
        [height * 0.67, 72, '#5a96b8', 0.9, 1.7],
      ] : refs.current.springTheme ? [
        [height * 0.48, 130, '#70c9e8', 0.46, 0.5],
        [height * 0.58, 96, '#2fb986', 0.68, 1.1],
        [height * 0.67, 72, '#0b5948', 0.92, 1.7],
      ] : refs.current.fallTheme ? [
        [height * 0.48, 130, '#f47c23', 0.58, 0.5],
        [height * 0.58, 96, '#a33a31', 0.76, 1.1],
        [height * 0.67, 72, '#491323', 0.96, 1.7],
      ] : [
        [height * 0.48, 130, '#4a4a4a', 0.58, 0.5],
        [height * 0.58, 96, '#2a2a2a', 0.78, 1.1],
        [height * 0.67, 72, '#080808', 0.95, 1.7],
      ];
      layers.forEach(([base, amp, color, alpha, mult]) => {
        ctx.beginPath();
        ctx.moveTo(-120, height);
        for (let x = -120; x <= width + 140; x += 90) {
          const px = x + (pointer.x - 0.5) * 42 * mult;
          const peak = base - Math.abs(Math.sin((x + t * 0.018) * 0.006)) * amp;
          ctx.lineTo(px, peak);
          ctx.lineTo(px + 48, base + Math.sin(x * 0.04) * 7);
        }
        ctx.lineTo(width + 140, height);
        ctx.closePath();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    function drawPitch(t) {
      ctx.save();
      ctx.strokeStyle = 'rgba(34,211,238,.11)';
      ctx.lineWidth = 1;
      for (let x = -180; x < width + 180; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x + Math.sin(t * 0.0008) * 20, height * 0.66);
        ctx.lineTo(x + width * 0.14, height);
        ctx.stroke();
      }
      for (let y = height * 0.72; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.sin(y * 0.05 + t * 0.002) * 4);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(251,191,36,.2)';
      ctx.beginPath();
      ctx.arc(width * 0.78, height * 0.76, 74, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function drawTrack(t) {
      const y = height * 0.18;
      const x0 = width * 0.13;
      const x1 = width * 0.87;
      ctx.save();
      const fall = refs.current.fallTheme;
      const spring = refs.current.springTheme;
      const winter = refs.current.winterTheme;
      ctx.globalAlpha = spring || fall || winter ? 0.55 : 1;
      ctx.strokeStyle = winter ? 'rgba(90,150,184,.68)' : spring ? 'rgba(3,92,60,.42)' : fall ? 'rgba(73,19,35,.42)' : 'rgba(255,255,255,.94)';
      ctx.lineWidth = spring || fall || winter ? 2.2 : 3.8;
      ctx.setLineDash([9, 18]);
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.bezierCurveTo(width * 0.28, y - 40, width * 0.44, y + 44, width * 0.55, y + 5);
      ctx.bezierCurveTo(width * 0.7, y - 42, width * 0.8, y + 52, x1, y + 8);
      ctx.stroke();
      ctx.setLineDash([]);
      sectors.forEach((sector, index) => {
        const p = sectors.length === 1 ? 0 : index / (sectors.length - 1);
        const x = x0 + (x1 - x0) * p;
        const yy = y + Math.sin(p * Math.PI * 3 + t * 0.0008) * 22;
        const active = index === refs.current.activeSector;
        ctx.beginPath();
        ctx.fillStyle = active
          ? winter ? 'rgba(90,150,184,1)' : spring ? 'rgba(3,92,60,.94)' : fall ? 'rgba(73,19,35,.94)' : 'rgba(255,255,255,1)'
          : winter ? 'rgba(90,150,184,.68)' : spring ? 'rgba(3,92,60,.42)' : fall ? 'rgba(73,19,35,.38)' : 'rgba(255,255,255,.94)';
        if (!spring && !fall && !winter) ctx.fillStyle = active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.94)';
        ctx.arc(x, yy, !spring && !fall && !winter ? (active ? 10.5 : 7) : (active ? 8.5 : 5.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = active
          ? winter ? 'rgba(90,150,184,.84)' : spring ? 'rgba(3,92,60,.58)' : fall ? 'rgba(73,19,35,.56)' : 'rgba(255,255,255,.72)'
          : winter ? 'rgba(90,150,184,.42)' : spring ? 'rgba(3,92,60,.25)' : fall ? 'rgba(73,19,35,.22)' : 'rgba(255,255,255,.56)';
        if (!spring && !fall && !winter) {
          ctx.strokeStyle = active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.76)';
          ctx.lineWidth = active ? 3.2 : 2.2;
        }
        ctx.arc(x, yy, !spring && !fall && !winter ? (active ? 42 + Math.sin(t * 0.004) * 5 : 24) : (active ? 34 + Math.sin(t * 0.004) * 4 : 19), 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();
    }

    function drawWeather() {
      const kind = refs.current.weather;
      const snow = kind === 'snow' || kind === 'heavy-snow';
      const rain = kind === 'rain' || kind === 'heavy-rain' || kind === 'storm' || kind === 'drizzle';
      const fog = kind === 'fog' || kind === 'cloud';
      const clear = kind === 'clear';
      const heavy = kind === 'heavy-rain' || kind === 'heavy-snow' || kind === 'storm';
      const fall = refs.current.fallTheme;
      const spring = refs.current.springTheme;
      const winter = refs.current.winterTheme;
      ctx.save();
      ctx.globalCompositeOperation = fog ? 'source-over' : 'lighter';
      if (kind === 'storm') {
        const now = performance.now();
        const flash = Math.max(0, Math.sin(now * 0.006) - 0.91) * 6.8 + Math.max(0, Math.sin(now * 0.017 + 1.8) - 0.965) * 8;
        if (flash > 0) {
          const boltColor = winter ? '90,150,184' : spring ? '184,245,95' : fall ? '255,238,72' : '255,255,255';
          ctx.fillStyle = winter ? `rgba(255,255,255,${flash * 0.16})` : spring ? `rgba(236,255,247,${flash * 0.14})` : fall ? `rgba(255,230,132,${flash * 0.14})` : `rgba(255,255,255,${flash * 0.18})`;
          ctx.fillRect(0, 0, width, height);
          const boltSeed = Math.floor(now / 720);
          const baseX = width * (0.28 + ((boltSeed * 37) % 46) / 100);
          const sway = Math.sin(boltSeed * 12.9898) * 34;
          const points = [{ x: baseX + sway, y: -20 }];
          const segments = 8;
          for (let i = 1; i <= segments; i += 1) {
            const drift = Math.sin(boltSeed * 4.7 + i * 1.94) * 48 + Math.cos(now * 0.001 + i) * 12;
            points.push({
              x: baseX + sway * 0.4 + drift,
              y: (height * 0.62 * i) / segments,
            });
          }
          const drawBolt = (alpha, lineWidth, blur) => {
            ctx.save();
            ctx.shadowColor = `rgba(${boltColor},${alpha})`;
            ctx.shadowBlur = blur;
            ctx.strokeStyle = `rgba(${boltColor},${alpha})`;
            ctx.lineWidth = lineWidth;
            ctx.lineJoin = 'miter';
            ctx.lineCap = 'round';
            ctx.beginPath();
            points.forEach((point, index) => {
              if (index === 0) ctx.moveTo(point.x, point.y);
              else ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
            ctx.restore();
          };
          drawBolt(Math.min(1, flash * 0.56), 9, 34);
          drawBolt(Math.min(1, flash * 0.86), 4.2, 18);
          drawBolt(1, 1.35, 4);
          for (let i = 2; i < points.length - 1; i += 2) {
            const branchEndX = points[i].x + (i % 4 === 0 ? -1 : 1) * (46 + i * 8);
            const branchEndY = points[i].y + 42 + Math.sin(boltSeed + i) * 18;
            ctx.save();
            ctx.shadowColor = `rgba(${boltColor},${Math.min(1, flash * 0.7)})`;
            ctx.shadowBlur = 14;
            ctx.strokeStyle = `rgba(${boltColor},${Math.min(1, flash * 0.72)})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo((points[i].x + branchEndX) * 0.5 + Math.sin(i) * 16, (points[i].y + branchEndY) * 0.5);
            ctx.lineTo(branchEndX, branchEndY);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      particles.forEach((p) => {
        const pointer = pointerRef.current;
        const influence = pointer.down ? 1.55 : 0.86;
        p.life += 0.03;
        p.x += p.vx * influence + (pointer.x - 0.5) * (fog ? 0.45 : snow ? 1.1 : rain ? 3.4 : 0.8);
        p.y += p.vy * influence;
        if (snow) p.x += Math.sin(p.life + p.y * 0.02) * 0.75;
        if (fog) p.x += Math.sin(p.life * 0.7 + p.y * 0.004) * 0.25;
        if (clear) p.y += Math.sin(p.life + p.x * 0.02) * 0.05;
        if (p.y > height + 26 || p.x < -90 || p.x > width + 90) Object.assign(p, makeParticle(Math.random() * width, -28));
        if (fog) {
          const cloudAlpha = p.a * (kind === 'cloud' ? 0.72 : 1);
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          grd.addColorStop(0, winter ? `rgba(255,255,255,${cloudAlpha})` : spring ? `rgba(236,255,247,${cloudAlpha})` : fall ? `rgba(255,228,180,${cloudAlpha})` : `rgba(210,230,238,${cloudAlpha})`);
          grd.addColorStop(1, 'rgba(210,230,238,0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.r * 1.9, p.r * 0.58, Math.sin(p.pulse) * 0.25, 0, Math.PI * 2);
          ctx.fill();
        } else if (clear) {
          const sparkle = p.a * (0.45 + Math.sin(p.life * 2 + p.pulse) * 0.25);
          ctx.beginPath();
          ctx.fillStyle = winter ? `rgba(90,150,184,${sparkle})` : spring ? `rgba(184,245,95,${sparkle})` : fall ? `rgba(255,232,96,${sparkle})` : `rgba(103,232,249,${sparkle})`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (snow) {
          ctx.beginPath();
          ctx.fillStyle = winter ? `rgba(255,255,255,${p.a})` : spring ? `rgba(246,255,255,${p.a})` : fall ? `rgba(232,211,168,${p.a})` : `rgba(226,251,255,${p.a})`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = winter ? `rgba(90,150,184,${p.a})` : spring ? `rgba(80,210,238,${p.a})` : fall ? `rgba(198,132,67,${p.a})` : `rgba(255,255,255,${p.a})`;
          ctx.lineWidth = kind === 'drizzle' ? Math.max(0.7, p.r * 0.7) : p.r;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          const len = kind === 'drizzle' ? 18 : heavy ? 48 : 32;
          ctx.lineTo(p.x - 18 - (pointer.x - 0.5) * 18, p.y - len);
          ctx.stroke();
        }
      });
      ctx.restore();
    }

    function drawSnowboarder(t, x, y) {
      const slope = (groundY(x + 14) - groundY(x - 14)) / 28;
      const angle = Math.atan(slope);
      player.trail.push({ x: x - 26, y: y + 6, life: 1, s: 10 + Math.abs(Math.sin(t * 0.002)) * 8 });
      player.trail = player.trail.filter((p) => (p.life -= 0.025) > 0).slice(-80);
      ctx.save();
      player.trail.forEach((p) => {
        ctx.globalAlpha = p.life * 0.34;
        ctx.fillStyle = 'rgba(185,246,255,.7)';
        ctx.beginPath();
        ctx.ellipse(p.x - (1 - p.life) * 86, p.y + Math.sin(t * 0.01 + p.x) * 7, p.s * (1.2 - p.life), p.s * 0.34, -0.18, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.restore();

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.shadowColor = 'rgba(34,211,238,.85)';
      ctx.shadowBlur = 24;
      ctx.strokeStyle = '#c8fbff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-58, 15);
      ctx.quadraticCurveTo(0, 30, 62, 12);
      ctx.stroke();
      ctx.fillStyle = 'rgba(34,211,238,.18)';
      ctx.beginPath();
      ctx.ellipse(0, 16, 60, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#e8fbff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-14, -5); ctx.lineTo(-24, 13);
      ctx.moveTo(10, -4); ctx.lineTo(26, 12);
      ctx.stroke();
      ctx.strokeStyle = '#80ecff';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-3, -38); ctx.lineTo(-12, -7); ctx.lineTo(13, -3);
      ctx.stroke();
      ctx.strokeStyle = '#e7fbff';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-8, -30); ctx.lineTo(-38, -8);
      ctx.moveTo(4, -31); ctx.lineTo(35, -20);
      ctx.stroke();
      ctx.fillStyle = '#04131d';
      ctx.beginPath();
      ctx.arc(-6, -52, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(34,211,238,.95)';
      ctx.fillRect(-16, -54, 20, 5);
      ctx.restore();
    }

    function drawSoccer(t, x, y) {
      player.spin += 0.04 + refs.current.scrollProgress * 0.02;
      player.trail.push({ x, y, life: 1, s: 20 });
      player.trail = player.trail.filter((p) => (p.life -= 0.032) > 0).slice(-82);
      player.trail.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(34,211,238,${p.life * 0.16})`;
        ctx.arc(p.x - (1 - p.life) * 80, p.y + 23, p.s * p.life, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(player.spin);
      ctx.shadowColor = 'rgba(34,211,238,.9)';
      ctx.shadowBlur = 26;
      ctx.fillStyle = '#f6fbff';
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#06121a';
      ctx.lineWidth = 3.2;
      for (let i = 0; i < 6; i += 1) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(26, 0);
        ctx.stroke();
      }
      ctx.fillStyle = '#04131d';
      ctx.beginPath();
      for (let i = 0; i < 5; i += 1) {
        const a = -Math.PI / 2 + i * (Math.PI * 2 / 5);
        ctx.lineTo(Math.cos(a) * 11, Math.sin(a) * 11);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function frame(now) {
      if (particleSignature !== getParticleSignature()) resetParticles(true);
      const t = now;
      drawBackground(t);
      drawMountains(t);
      drawPortraitLayerMask();
      drawWeather();
      raf = window.requestAnimationFrame(frame);
    }

    function pointerMove(event) {
      pointerRef.current.x = clamp(event.clientX / width, 0, 1);
      pointerRef.current.y = clamp(event.clientY / height, 0, 1);
    }
    function keyDown(event) {
      keysRef.current.add(event.code);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) event.preventDefault();
    }
    function keyUp(event) {
      keysRef.current.delete(event.code);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', pointerMove, { passive: true });
    window.addEventListener('pointerdown', () => { pointerRef.current.down = true; });
    window.addEventListener('pointerup', () => { pointerRef.current.down = false; });
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    raf = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="world-backdrop" aria-hidden="true" />;
}


function WorldForeground({ mode, weather, weatherPower, scrollProgress }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0.55, y: 0.45 });
  const keysRef = useRef(new Set());
  const refs = useRef({ mode, weather, weatherPower, scrollProgress });

  useEffect(() => {
    refs.current = { mode, weather, weatherPower, scrollProgress };
  }, [mode, weather, weatherPower, scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let lastNow = performance.now();
    let smoothedProgress = refs.current.scrollProgress;
    const player = {
      x: width * 0.2,
      y: height * 0.84,
      vx: 0,
      vy: 0,
      spin: 0,
      angle: 0,
      lean: 0,
      squash: 1,
      trail: [],
      sparks: [],
    };
    const spray = [];

    const lerp = (a, b, t) => a + (b - a) * t;
    const ease = (speed, dt) => 1 - Math.exp(-speed * dt);
    const smoothStep = (value) => value * value * (3 - 2 * value);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      player.y = groundY(player.x);
      spray.length = 0;
      const count = Math.floor(96 * refs.current.weatherPower);
      for (let i = 0; i < count; i += 1) {
        spray.push({
          x: Math.random() * width,
          y: height * (0.81 + Math.random() * 0.18),
          r: Math.random() * 2 + 0.45,
          a: Math.random() * 0.24 + 0.09,
          vx: Math.random() * 1.2 - 0.6,
          drift: Math.random() * Math.PI * 2,
        });
      }
    }

    function groundY(x) {
      const isSnow = refs.current.mode === 'snowboard';
      const base = height * (isSnow ? 0.855 : 0.875);
      const wave = isSnow
        ? Math.sin(x * 0.0047) * 15 + Math.sin(x * 0.012) * 7
        : Math.sin(x * 0.0056) * 7;
      return base + wave;
    }

    function drawForegroundHill() {
      const isSnow = refs.current.mode === 'snowboard';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 14) ctx.lineTo(x, groundY(x));
      ctx.lineTo(width, height);
      ctx.closePath();
      const grd = ctx.createLinearGradient(0, height * 0.78, 0, height);
      if (isSnow) {
        grd.addColorStop(0, 'rgba(225,253,255,0.98)');
        grd.addColorStop(0.1, 'rgba(159,228,243,0.98)');
        grd.addColorStop(0.42, 'rgba(23,70,91,1)');
        grd.addColorStop(1, 'rgba(1,5,9,1)');
      } else {
        grd.addColorStop(0, 'rgba(96,236,183,0.96)');
        grd.addColorStop(0.16, 'rgba(30,106,74,0.98)');
        grd.addColorStop(0.52, 'rgba(5,29,18,1)');
        grd.addColorStop(1, 'rgba(1,8,6,1)');
      }
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.strokeStyle = isSnow ? 'rgba(236,254,255,.92)' : 'rgba(130,255,201,.72)';
      ctx.lineWidth = 2.2;
      ctx.stroke();
    }

    function drawPremiumSpray(t, dt, speed) {
      const snow = refs.current.weather === 'snow';
      const wind = (pointerRef.current.x - 0.5) * (snow ? 0.45 : 1.5);
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      spray.forEach((p) => {
        p.drift += dt * 1.1;
        p.x += p.vx + wind + Math.sin(p.drift) * 0.12;
        p.y += snow ? -0.05 + Math.sin(t * 0.001 + p.x) * 0.04 : -0.18;
        if (p.x < -32 || p.x > width + 32 || p.y < height * 0.72) {
          p.x = Math.random() * width;
          p.y = height * (0.84 + Math.random() * 0.14);
        }
        ctx.beginPath();
        ctx.fillStyle = snow ? `rgba(226,251,255,${p.a})` : `rgba(78,220,255,${p.a * 0.72})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const lineCount = Math.min(14, Math.floor(Math.abs(speed) / 70));
      for (let i = 0; i < lineCount; i += 1) {
        const offset = i * 14 + Math.sin(t * 0.002 + i) * 18;
        const y = groundY(player.x) - 10 - i * 1.8;
        ctx.strokeStyle = refs.current.mode === 'snowboard' ? 'rgba(225,253,255,.14)' : 'rgba(103,232,249,.13)';
        ctx.lineWidth = 1 + i * 0.03;
        ctx.beginPath();
        ctx.moveTo(player.x - 170 - offset, y + Math.sin(i) * 8);
        ctx.lineTo(player.x - 60 - offset * 0.25, y - 8);
        ctx.stroke();
      }
      ctx.restore();
    }

    function emitContactParticles(x, y, speed, dt) {
      const amount = Math.min(5, Math.floor(Math.abs(speed) / 180));
      for (let i = 0; i < amount; i += 1) {
        player.sparks.push({
          x: x - 22 + Math.random() * 14,
          y: y + 14 + Math.random() * 8,
          vx: -Math.random() * (2.5 + Math.abs(speed) * 0.006),
          vy: -Math.random() * 1.8,
          life: 1,
          r: Math.random() * 2.2 + 0.5,
        });
      }
      player.sparks = player.sparks.filter((p) => {
        p.life -= dt * 1.8;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += dt * 4;
        return p.life > 0;
      }).slice(-120);
    }

    function drawContactParticles() {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      player.sparks.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = refs.current.mode === 'snowboard'
          ? `rgba(226,251,255,${p.life * 0.55})`
          : `rgba(251,191,36,${p.life * 0.45})`;
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    function drawSnowboarder(t, x, y, angle, speed, dt) {
      const speed01 = clamp(Math.abs(speed) / 920, 0, 1);
      player.trail.push({ x: x - 28, y: y + 7, life: 1, s: 10 + speed01 * 24 });
      player.trail = player.trail.filter((p) => (p.life -= dt * 1.25) > 0).slice(-92);

      ctx.save();
      player.trail.forEach((p) => {
        ctx.globalAlpha = p.life * 0.46;
        ctx.fillStyle = 'rgba(205,251,255,.86)';
        ctx.beginPath();
        ctx.ellipse(p.x - (1 - p.life) * (95 + speed01 * 80), p.y + Math.sin(t * 0.01 + p.x) * 6, p.s * (1.12 - p.life), p.s * 0.32, -0.18, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      const blurSteps = 3;
      for (let i = blurSteps; i > 0; i -= 1) {
        ctx.save();
        ctx.globalAlpha = 0.06 * i * speed01;
        ctx.translate(-i * 14, i * 2);
        ctx.scale(1 + i * 0.025, 1);
        ctx.strokeStyle = '#b6f9ff';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(-62, 15);
        ctx.quadraticCurveTo(0, 31, 66, 12);
        ctx.stroke();
        ctx.restore();
      }
      ctx.shadowColor = 'rgba(34,211,238,.95)';
      ctx.shadowBlur = 28;
      ctx.strokeStyle = '#d9fdff';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(-62, 15);
      ctx.quadraticCurveTo(0, 31, 66, 12);
      ctx.stroke();
      ctx.fillStyle = 'rgba(34,211,238,.22)';
      ctx.beginPath();
      ctx.ellipse(0, 16, 64, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#effcff';
      ctx.lineWidth = 6.5;
      ctx.beginPath();
      ctx.moveTo(-14, -5); ctx.lineTo(-25, 13);
      ctx.moveTo(10, -4); ctx.lineTo(28, 12);
      ctx.stroke();
      ctx.strokeStyle = '#8ff2ff';
      ctx.lineWidth = 8.5;
      ctx.beginPath();
      ctx.moveTo(-3, -39); ctx.lineTo(-12, -7); ctx.lineTo(14, -3);
      ctx.stroke();
      ctx.strokeStyle = '#f0feff';
      ctx.lineWidth = 5.5;
      ctx.beginPath();
      ctx.moveTo(-8, -31); ctx.lineTo(-40 - speed01 * 10, -8);
      ctx.moveTo(4, -32); ctx.lineTo(36, -20 - speed01 * 8);
      ctx.stroke();
      ctx.fillStyle = '#04131d';
      ctx.beginPath();
      ctx.arc(-6, -53, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(34,211,238,.98)';
      ctx.fillRect(-17, -55, 22, 5.5);
      ctx.restore();
    }

    function drawSoccer(t, x, y, speed, dt) {
      const speed01 = clamp(Math.abs(speed) / 1000, 0, 1);
      player.spin += speed * dt * 0.011 + 0.012;
      player.squash = lerp(player.squash, 1 + Math.abs(player.vy) * 0.0015, ease(8, dt));
      player.trail.push({ x, y, life: 1, s: 20 + speed01 * 18 });
      player.trail = player.trail.filter((p) => (p.life -= dt * 1.35) > 0).slice(-82);
      player.trail.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(34,211,238,${p.life * 0.2})`;
        ctx.arc(p.x - (1 - p.life) * (76 + speed01 * 82), p.y + 22, p.s * p.life, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(player.spin);
      ctx.scale(1 + speed01 * 0.08, Math.max(0.88, 1 / player.squash));
      ctx.shadowColor = 'rgba(34,211,238,.95)';
      ctx.shadowBlur = 28;
      ctx.fillStyle = '#f6fbff';
      ctx.beginPath();
      ctx.arc(0, 0, 31, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#06121a';
      ctx.lineWidth = 3.4;
      for (let i = 0; i < 6; i += 1) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(27, 0);
        ctx.stroke();
      }
      ctx.fillStyle = '#04131d';
      ctx.beginPath();
      for (let i = 0; i < 5; i += 1) {
        const a = -Math.PI / 2 + i * (Math.PI * 2 / 5);
        ctx.lineTo(Math.cos(a) * 12, Math.sin(a) * 12);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function frame(now) {
      const dt = Math.min(0.034, Math.max(0.001, (now - lastNow) / 1000));
      lastNow = now;
      ctx.clearRect(0, 0, width, height);

      const keys = keysRef.current;
      let manual = 0;
      if (keys.has('ArrowRight') || keys.has('KeyD')) manual += 1;
      if (keys.has('ArrowLeft') || keys.has('KeyA')) manual -= 1;
      smoothedProgress = lerp(smoothedProgress, refs.current.scrollProgress, ease(7.5, dt));
      const easedProgress = smoothStep(smoothedProgress);
      const targetX = width * (0.14 + easedProgress * 0.72) + (pointerRef.current.x - 0.5) * 34 + manual * width * 0.04;
      const oldX = player.x;
      player.x = lerp(player.x, targetX, ease(6.4, dt));
      player.vx = lerp(player.vx, (player.x - oldX) / dt, ease(9, dt));

      const isJumping = keys.has('Space') || keys.has('ArrowUp') || keys.has('KeyW');
      const jumpArc = isJumping ? Math.sin(now * 0.009) * 30 - 28 : Math.sin(now * 0.0022) * 4;
      const targetY = groundY(player.x) + jumpArc;
      const oldY = player.y;
      player.y = lerp(player.y, targetY, ease(isJumping ? 10 : 12, dt));
      player.vy = lerp(player.vy, (player.y - oldY) / dt, ease(8, dt));

      const slope = (groundY(player.x + 22) - groundY(player.x - 22)) / 44;
      const targetAngle = Math.atan(slope) + clamp(player.vx / 2400, -0.18, 0.18);
      player.angle = lerp(player.angle, targetAngle, ease(8, dt));

      emitContactParticles(player.x, player.y, player.vx, dt);
      drawPremiumSpray(now, dt, player.vx);
      drawForegroundHill();
      drawContactParticles();
      if (refs.current.mode === 'snowboard') drawSnowboarder(now, player.x, player.y, player.angle, player.vx, dt);
      else drawSoccer(now, player.x, player.y - 10, player.vx, dt);
      raf = window.requestAnimationFrame(frame);
    }

    function pointerMove(event) {
      pointerRef.current.x = clamp(event.clientX / width, 0, 1);
      pointerRef.current.y = clamp(event.clientY / height, 0, 1);
    }
    function keyDown(event) {
      keysRef.current.add(event.code);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) event.preventDefault();
    }
    function keyUp(event) { keysRef.current.delete(event.code); }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', pointerMove, { passive: true });
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    raf = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="world-foreground" aria-hidden="true" />;
}
function FloatingHud({ weather, setWeather, weatherPower, setWeatherPower, activeSector, liveWeather, timeProfile, weatherStatus, weatherError, onUseLiveWeather, onInteract, fallTheme, setFallTheme, springTheme, setSpringTheme, winterTheme, setWinterTheme }) {
  const [collapsed, setCollapsed] = useState(false);
  const weatherLabel = liveWeather?.condition || `Manual ${weatherNames[weather] || weather}`;
  const nextManualWeather = () => {
    onInteract?.();
    const index = manualWeatherCycle.indexOf(weather);
    const safeIndex = index === -1 ? 0 : index;
    setWeather(manualWeatherCycle[(safeIndex + 1) % manualWeatherCycle.length]);
  };
  const previousManualWeather = () => {
    onInteract?.();
    const index = manualWeatherCycle.indexOf(weather);
    const safeIndex = index === -1 ? 0 : index;
    setWeather(manualWeatherCycle[(safeIndex - 1 + manualWeatherCycle.length) % manualWeatherCycle.length]);
  };
  const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <aside className={`floating-hud ${collapsed ? 'collapsed' : ''}`} aria-label="Exploration controls">
      <button
        type="button"
        className="overlay-collapse-button hud-collapse-button"
        aria-label={collapsed ? 'Expand explorer HUD' : 'Collapse explorer HUD'}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((value) => !value)}
      >
        <SketchArrow direction={collapsed ? 'up' : 'down'} />
      </button>
      <div className="hud-content" aria-hidden={collapsed}>
      <div className="hud-status">
        <span>Explorer HUD</span>
        <strong>{sectors[activeSector]?.label || 'Intro'} sector</strong>
        <small>{timeProfile.label} · {weatherLabel}</small>
      </div>
      <div className="hud-row">
        <button className={fallTheme ? 'active fall-weather-button' : 'fall-weather-button'} onClick={() => { onInteract?.(); setFallTheme((value) => !value); setSpringTheme(false); setWinterTheme(false); }}>Fall</button>
        <button className={springTheme ? 'active spring-weather-button' : 'spring-weather-button'} onClick={() => { onInteract?.(); setSpringTheme((value) => !value); setFallTheme(false); setWinterTheme(false); }}>Spring</button>
        <button className={winterTheme ? 'active winter-weather-button' : 'winter-weather-button'} onClick={() => { onInteract?.(); setWinterTheme((value) => !value); setFallTheme(false); setSpringTheme(false); }}>Winter</button>
      </div>
      <div className="hud-row particle-cycle-row" aria-label="Weather particle selector">
        <button type="button" className="particle-arrow" aria-label="Previous weather particle" onClick={previousManualWeather}>&lt;</button>
        <button type="button" className="particle-label" aria-label="Current weather particle" onClick={nextManualWeather}>{weatherNames[weather] || weather}</button>
        <button type="button" className="particle-arrow" aria-label="Next weather particle" onClick={nextManualWeather}>&gt;</button>
      </div>
      <div className="hud-row">
        <button onClick={() => { onInteract?.(); onUseLiveWeather(); }}>{weatherStatus === 'loading' ? 'Syncing…' : 'Live local weather'}</button>
      </div>
      <label className="intensity-control"><span>Atmosphere</span><input type="range" min="0.35" max="1.7" step="0.05" value={weatherPower} onChange={(e) => { onInteract?.(); setWeatherPower(Number(e.target.value)); }} /></label>
      <small className="hud-note">{liveWeather ? `${Math.round(liveWeather.temp)}° · wind ${Math.round(liveWeather.wind)} km/h · ${liveWeather.location}` : weatherError || `${timeLabel} local browser time · weather optional`}</small>
      </div>
    </aside>
  );
}

function LoreGuide({ activeSector, activeContentTab, hudInteracted }) {
  const [collapsed, setCollapsed] = useState(false);
  const activeSectorId = sectors[activeSector]?.id || 'hero';
  const tabId = activeContentTab?.id || 'portfolio';
  const targetDialog = useMemo(() => {
    if (!hudInteracted) {
      return {
        label: '',
        title: '',
        lines: [
          'I see you have stumbled upon my lore! I am not an AI here to assist you, but just a mere persona of myself to give you some tips on navigating my lore.',
          'Start with the Explorer HUD on the bottom right. Try a season button, cycle the particle arrows, or move the Atmosphere slider.',
        ],
      };
    }

    if (activeSectorId === 'hero') {
      return {
        label: 'Intro',
        title: 'The opening marker.',
        lines: ['Use Start exploring to jump into the tabbed lore, or use the left Explore panel to move between Intro, Content, and Contact.'],
      };
    }
    if (activeSectorId === 'contact') {
      return {
        label: 'Contact',
        title: 'Exit routes unlocked.',
        lines: ['You are in the contact zone now. Use the links here when you want the practical exits: resume, GitHub, LinkedIn, or email.'],
      };
    }
    if (tabId === 'portfolio') {
      return {
        label: 'Portfolio',
        title: 'Systems layer.',
        lines: ['Scan the project cards first, then move through Architecture and Technical Stack to see how the systems connect.'],
      };
    }
    if (tabId === 'professional') {
      return {
        label: 'Professional',
        title: 'Timeline controls.',
        lines: ['Click a timeline card to zoom it forward. Click outside the timeline to settle it back into place.'],
      };
    }
    if (tabId === 'education') {
      return {
        label: 'Education',
        title: 'Academic trail.',
        lines: ['Use the same card-click behavior to inspect each academic milestone without leaving the timeline.'],
      };
    }
    if (tabId === 'personal') {
      return {
        label: 'Personal',
        title: 'Media swap trick.',
        lines: ['Switch between Photography, Writing, and Travel. Pick a side media card to swap it into the main display.'],
      };
    }

    return {
      label: 'Lore Guide',
      title: 'Keep exploring.',
      lines: ['Use the tabs, timeline cards, media swaps, and side navigation to move through the lore at your own pace.'],
    };
  }, [activeSectorId, hudInteracted, tabId]);
  const [displayDialog, setDisplayDialog] = useState(targetDialog);
  const [dialogPhase, setDialogPhase] = useState('entering');
  const [typedCharCount, setTypedCharCount] = useState(0);
  const targetKey = `${targetDialog.label}-${targetDialog.title}-${targetDialog.lines.join('|')}`;
  const displayKey = `${displayDialog.label}-${displayDialog.title}-${displayDialog.lines.join('|')}`;
  const displayText = displayDialog.lines.join('\n');
  const typedLines = useMemo(() => {
    let remaining = typedCharCount;
    return displayDialog.lines.map((line) => {
      const visibleCount = Math.max(0, Math.min(line.length, remaining));
      remaining -= line.length + 1;
      return line.slice(0, visibleCount);
    });
  }, [displayDialog.lines, typedCharCount]);
  const activeTypedLine = useMemo(() => {
    let consumed = 0;
    for (let index = 0; index < displayDialog.lines.length; index += 1) {
      const lineEnd = consumed + displayDialog.lines[index].length;
      if (typedCharCount <= lineEnd) return index;
      consumed = lineEnd + 1;
    }
    return Math.max(0, displayDialog.lines.length - 1);
  }, [displayDialog.lines, typedCharCount]);

  useEffect(() => {
    if (targetKey === displayKey) return undefined;
    setDialogPhase('exiting');
    const swapTimer = window.setTimeout(() => {
      setDisplayDialog(targetDialog);
      setDialogPhase('entering');
    }, 210);
    return () => window.clearTimeout(swapTimer);
  }, [displayKey, targetDialog, targetKey]);

  useEffect(() => {
    setTypedCharCount(0);
    const totalChars = displayText.length;
    const typeTimer = window.setInterval(() => {
      setTypedCharCount((value) => {
        if (value >= totalChars) {
          window.clearInterval(typeTimer);
          return value;
        }
        return value + 1;
      });
    }, 18);
    return () => window.clearInterval(typeTimer);
  }, [displayKey, displayText]);

  return (
    <aside className={`lore-guide ${collapsed ? 'collapsed' : ''}`} aria-label="Lore navigation guide">
      <button
        type="button"
        className="lore-guide-toggle"
        aria-label={collapsed ? 'Expand lore guide' : 'Collapse lore guide'}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((value) => !value)}
      >
        <SketchArrow direction={collapsed ? 'right' : 'left'} />
      </button>
      <div className="lore-guide-face" aria-hidden="true">
        <img src={loreGuidePersona} alt="" />
      </div>
      <div className={`lore-guide-copy ${dialogPhase}`} key={displayKey}>
        {displayDialog.label && <span>{displayDialog.label}</span>}
        {displayDialog.title && <strong>{displayDialog.title}</strong>}
        {typedLines.map((line, index) => (
          <p key={`${displayDialog.lines[index]}-${index}`}>
            {line}
            {index === activeTypedLine && <span className="lore-type-caret" aria-hidden="true" />}
          </p>
        ))}
      </div>
    </aside>
  );
}

function MissionMap({ activeSector, activeContentTab }) {
  const [collapsed, setCollapsed] = useState(false);
  const mapSectors = sectors.map((sector) => (
    sector.id === 'tab-content'
      ? { ...sector, label: activeContentTab.label, title: activeContentTab.label, note: activeContentTab.kicker }
      : sector
  ));
  return (
    <aside className={`mission-map ${collapsed ? 'collapsed' : ''}`} aria-label="Portfolio sector map">
      <button
        type="button"
        className="overlay-collapse-button map-collapse-button"
        aria-label={collapsed ? 'Expand side navigation' : 'Collapse side navigation'}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((value) => !value)}
      >
        <SketchArrow direction={collapsed ? 'right' : 'left'} />
      </button>
      <div className="mission-map-content" aria-hidden={collapsed}>
        <strong>Explore</strong>
        {mapSectors.map((sector, index) => (
          <a key={sector.id} href={`#${sector.id}`} className={activeSector === index ? 'active' : ''}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <em>{sector.label}</em>
          </a>
        ))}
      </div>
    </aside>
  );
}

function SectorHeader({ eyebrow, title, children }) {
  return (
    <div className="section-heading split">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card panel-card" data-tilt>
      <div className="card-glow" />
      <div className="project-topline"><span>{project.number}</span><em>{project.eyebrow}</em></div>
      <div className="project-visual" aria-hidden="true">
        {['mocap', 'ingest', 'kafka', 'redis', 'json', 'unreal'].map((node, index) => (
          <div className="flow-node" key={node}><span>{node}</span>{index < 5 && <em>→</em>}</div>
        ))}
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="chip-row">{project.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
      <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
    </article>
  );
}

function ProfileTabs({ tabs, activeTabId, onTabChange }) {
  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  return (
    <section className="profile-tabs" aria-label="Portfolio content tabs">
      <div className="profile-tab-list" role="tablist" aria-label="Portfolio content categories">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            id={`profile-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab.id === tab.id}
            aria-controls="tab-content"
            className={activeTab.id === tab.id ? 'active' : ''}
            onClick={() => onTabChange(tab.id)}
          >
            <span>{tab.kicker}</span>
            <strong>{tab.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function TimelineGrid({ items }) {
  const timelineItems = useMemo(() => normalizeTimelineItems(items), [items]);
  const [activeIndex, setActiveIndex] = useState(null);
  const timelineRef = useRef(null);
  const bounds = useMemo(() => getTimelineBounds(timelineItems), [timelineItems]);

  useEffect(() => {
    setActiveIndex((index) => (index == null ? null : Math.min(index, Math.max(0, timelineItems.length - 1))));
  }, [timelineItems.length]);

  useEffect(() => {
    if (activeIndex == null) return undefined;
    const clearOnOutsidePointer = (event) => {
      if (!timelineRef.current?.contains(event.target)) setActiveIndex(null);
    };
    document.addEventListener('pointerdown', clearOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', clearOnOutsidePointer);
  }, [activeIndex]);

  if (!timelineItems.length) return null;

  return (
    <div ref={timelineRef} className="date-timeline-system">
      <div className="date-timeline-rail" aria-label="Interactive date timeline infographic">
        <div className="date-timeline-trunk" aria-hidden="true" />
        <span className="date-timeline-boundary start">{bounds.startLabel}</span>
        <span className="date-timeline-boundary end">{bounds.endLabel}</span>
        {timelineItems.map((item, index) => {
          const start = positionOnTimeline(item.startDate, bounds);
          const end = positionOnTimeline(item.endDate, bounds);
          const point = Math.min(86, Math.max(14, (start + end) / 2));
          const side = index % 2 === 0 ? 'left' : 'right';
          return (
            <button
              key={`${item.meta}-${item.title}`}
              type="button"
              className={`date-timeline-node ${side} ${index === activeIndex ? 'active' : ''}`}
              style={{ '--timeline-y': `${point}%`, '--node-color': item.color }}
              aria-label={`Zoom details for ${item.title}, ${item.rangeLabel}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span className="date-timeline-branch" aria-hidden="true" />
              <span className="date-timeline-orb">
                <em>{item.shortStart}</em>
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
              <span className="date-timeline-icon">
                <TimelineMaterialIcon name={item.icon} />
              </span>
              <span className="date-timeline-detail-copy">
                <span className="date-timeline-detail-meta">{item.rangeLabel}</span>
                <span className="date-timeline-detail-body">{item.body}</span>
                {item.bullets?.length > 0 && (
                  <span className="date-timeline-detail-list">
                    {item.bullets.map((bullet) => (
                      <span key={bullet}>{bullet}</span>
                    ))}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimelineMaterialIcon({ name }) {
  const paths = {
    work: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2Zm-6 0h-4V4h4v2Z',
    analytics: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM8 17H6v-7h2v7Zm5 0h-2V7h2v10Zm5 0h-2v-4h2v4Z',
    code: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z',
    school: 'M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 13.5L5 12.69V16c0 1.1 3.13 3 7 3s7-1.9 7-3v-3.31l-7 3.81Z',
    menu_book: 'M21 4.5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5C10.55 4.4 8.45 4 6.5 4S2.45 4.4 1 5.5v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 19.95 5.05 19.5 6.5 19.5c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V5.5c-.6-.45-1.25-.75-2-1Z',
    extension: 'M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11Z',
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={paths[name] || paths.work} />
    </svg>
  );
}

const monthNumbers = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function parseTimelinePoint(value, isEnd = false) {
  const clean = String(value || '').trim();
  if (!clean || /ongoing|present|current/i.test(clean)) return null;
  const monthMatch = clean.match(/^([A-Za-z]{3,})\s+(\d{4})$/);
  if (monthMatch) {
    const month = monthNumbers[monthMatch[1].slice(0, 3).toLowerCase()] ?? 0;
    return new Date(Number(monthMatch[2]), month + (isEnd ? 1 : 0), isEnd ? 0 : 1);
  }
  const yearMatch = clean.match(/^(\d{4})$/);
  if (yearMatch) return new Date(Number(yearMatch[1]), isEnd ? 11 : 0, isEnd ? 31 : 1);
  return null;
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatTimelineDate(date) {
  return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

function normalizeTimelineItems(items) {
  let previousEnd = null;
  const timelineColors = ['#ef4444', '#0891b2', '#f97316', '#a3e635', '#f8c84e', '#9ca3af'];
  return items.map((item, index) => {
    const dateText = String(item.meta || '').split('/')[0].trim();
    const ongoing = /ongoing|present|current/i.test(dateText);
    const [startText, endText] = dateText.includes(' - ') ? dateText.split(' - ') : [dateText, dateText];
    const inferredStart = previousEnd ? addMonths(previousEnd, 1) : new Date(new Date().getFullYear(), 0, 1);
    const startDate = parseTimelinePoint(startText) || inferredStart;
    const endDate = ongoing ? new Date() : (parseTimelinePoint(endText, true) || startDate);
    previousEnd = endDate;
    return {
      ...item,
      sourceIndex: index,
      startDate,
      endDate,
      rangeLabel: ongoing ? `${formatTimelineDate(startDate)} - Present` : dateText,
      shortStart: startDate.getFullYear(),
      icon: getTimelineIconName(item),
      color: timelineColors[index % timelineColors.length],
    };
  }).sort((a, b) => a.startDate - b.startDate);
}

function getTimelineIconName(item) {
  const text = `${item.title} ${item.subtitle}`.toLowerCase();
  if (text.includes('data') || text.includes('analyst') || text.includes('analytics')) return 'analytics';
  if (text.includes('college') || text.includes('education') || text.includes('academic')) return 'school';
  if (text.includes('study') || text.includes('learning')) return 'menu_book';
  if (text.includes('developer') || text.includes('application') || text.includes('software')) return 'code';
  if (text.includes('tool') || text.includes('backend') || text.includes('system')) return 'extension';
  return 'work';
}

function getTimelineBounds(items) {
  const start = new Date(Math.min(...items.map((item) => item.startDate.getTime())));
  const end = new Date(Math.max(...items.map((item) => item.endDate.getTime())));
  start.setMonth(0, 1);
  end.setMonth(11, 31);
  return {
    start,
    end,
    startLabel: String(start.getFullYear()),
    endLabel: end.getFullYear() === new Date().getFullYear() ? 'Present' : String(end.getFullYear()),
  };
}

function positionOnTimeline(date, bounds) {
  const total = bounds.end.getTime() - bounds.start.getTime();
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, ((date.getTime() - bounds.start.getTime()) / total) * 100));
}

function PersonalProjectTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeProject = personalProjects[activeIndex] || personalProjects[0];
  const mediaItems = activeProject.media || [];
  const activeMedia = mediaItems[activeMediaIndex] || mediaItems[0];

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [activeIndex]);

  return (
    <div className="personal-subtabs">
      <div className="personal-subtab-list" role="tablist" aria-label="Personal project categories">
        {personalProjects.map((item, index) => (
          <button
            key={item.meta}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item.meta}</strong>
          </button>
        ))}
      </div>
      <article className="personal-subtab-panel panel-card" data-tilt>
        <div className="personal-subtab-heading">
          <p>{activeProject.meta}</p>
          <h3>{activeProject.title}</h3>
          <span>{activeProject.subtitle}</span>
        </div>
        <p className="personal-subtab-body">{activeProject.body}</p>
        <PersonalMediaExperience
          project={activeProject}
          mediaItems={mediaItems}
          activeMedia={activeMedia}
          activeMediaIndex={activeMediaIndex}
          onSelect={setActiveMediaIndex}
        />
      </article>
    </div>
  );
}

function PersonalMediaExperience({ project, mediaItems, activeMedia, activeMediaIndex, onSelect }) {
  const projectKey = project.meta.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const featuredRef = useRef(null);
  const sideCardRefs = useRef(new Map());
  const unselectedMedia = mediaItems
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index !== activeMediaIndex);

  const handleSelect = (index) => {
    if (index === activeMediaIndex) return;
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      onSelect(index);
      return;
    }
    if (typeof document !== 'undefined' && document.startViewTransition && !reduceMotion) {
      document.startViewTransition(() => {
        flushSync(() => onSelect(index));
      });
      return;
    }
    animateMediaSwap(index);
  };

  const animateMediaSwap = (index) => {
    const previousIndex = activeMediaIndex;
    const featuredNode = featuredRef.current;
    const selectedNode = sideCardRefs.current.get(index);

    if (!featuredNode || !selectedNode || typeof document === 'undefined') {
      onSelect(index);
      return;
    }

    const featuredRect = featuredNode.getBoundingClientRect();
    const selectedRect = selectedNode.getBoundingClientRect();
    const featuredClone = createSwapClone(featuredNode, featuredRect);
    const selectedClone = createSwapClone(selectedNode, selectedRect);

    flushSync(() => onSelect(index));

    requestAnimationFrame(() => {
      const featuredTarget = featuredRef.current?.getBoundingClientRect();
      const sideTarget = sideCardRefs.current.get(previousIndex)?.getBoundingClientRect();
      animateSwapClone(selectedClone, selectedRect, featuredTarget);
      animateSwapClone(featuredClone, featuredRect, sideTarget || selectedRect);
    });
  };

  if (!activeMedia) return null;

  return (
    <div className="personal-media-experience" aria-label={`${project.meta} media and captions`}>
      <figure
        ref={featuredRef}
        className="personal-featured-media"
        style={{ viewTransitionName: `personal-media-${projectKey}-${activeMediaIndex}` }}
      >
        <PersonalMediaAsset item={activeMedia} index={activeMediaIndex} featured />
        <figcaption>
          <span>{activeMedia.meta}</span>
          <strong>{activeMedia.alt}</strong>
          <p>{activeMedia.caption}</p>
        </figcaption>
      </figure>
      <div className="personal-media-feed" role="list" aria-label={`${project.meta} selectable media`}>
        {unselectedMedia.map(({ item, index }) => (
          <button
            key={`${project.meta}-${item.meta}-${index}`}
            ref={(node) => {
              if (node) sideCardRefs.current.set(index, node);
              else sideCardRefs.current.delete(index);
            }}
            style={{ viewTransitionName: `personal-media-${projectKey}-${index}` }}
            type="button"
            role="listitem"
            className="personal-media-card"
            aria-pressed="false"
            onClick={() => handleSelect(index)}
          >
            <span className="personal-media-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="personal-media-thumb" aria-hidden="true">
              <PersonalMediaAsset item={item} index={index} compact />
            </span>
            <span className="personal-media-copy">
              <em>{item.meta}</em>
              <strong>{item.alt}</strong>
              <span>{item.caption}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function createSwapClone(node, rect) {
  const clone = node.cloneNode(true);
  clone.classList.add('personal-swap-clone');
  Object.assign(clone.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: '0',
    pointerEvents: 'none',
    transformOrigin: 'top left',
    viewTransitionName: 'none',
  });
  document.body.appendChild(clone);
  return clone;
}

function animateSwapClone(clone, fromRect, targetRect) {
  if (!clone || !targetRect) {
    clone?.remove();
    return;
  }

  const duration = 640;
  const deltaX = targetRect.left - fromRect.left;
  const deltaY = targetRect.top - fromRect.top;
  const scaleX = targetRect.width / Math.max(fromRect.width, 1);
  const scaleY = targetRect.height / Math.max(fromRect.height, 1);
  clone.animate(
    [
      { opacity: 1, transform: 'translate(0, 0) scale(1, 1)' },
      { opacity: .98, transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})` },
    ],
    { duration, easing: 'cubic-bezier(.2,.78,.16,1)', fill: 'forwards' },
  );

  window.setTimeout(() => {
    clone.remove();
  }, duration + 80);
}

function PersonalMediaAsset({ item, index, compact = false, featured = false }) {
  const isVideo = item.type === 'video';

  if (item.src) {
    return isVideo ? (
      <video
        src={item.src}
        poster={item.poster || undefined}
        controls={featured}
        muted={compact}
        preload="metadata"
        aria-label={item.alt}
      />
    ) : (
      <img src={item.src} alt={compact ? '' : item.alt} loading="lazy" />
    );
  }

  return (
    <span className={`personal-media-placeholder ${compact ? 'compact' : ''}`} aria-label={compact ? undefined : item.alt}>
      <span>{isVideo ? 'Video' : 'Photo'} {String(index + 1).padStart(2, '0')}</span>
      <strong>{compact ? item.type : item.alt}</strong>
    </span>
  );
}

function ArchitectureSection() {
  return (
    <section className="tabbed-subsection architecture-panel panel-card" data-tilt>
      <SectorHeader eyebrow="Architecture narrative" title="From motion data to Unreal-ready procedural animation JSON." />
      <div className="pipeline">{pipelineSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
  );
}

function StackSection() {
  return (
    <section className="tabbed-subsection stack-section">
      <SectorHeader eyebrow="Technical stack" title="Backend reliability, cloud delivery, game tooling, and data workflows.">Positioned for online-services expectations - scalable services, cloud delivery, caching, messaging, and clean interfaces - while keeping the Aegis portfolio clearly relevant to game production and content pipelines.</SectorHeader>
      <div className="stack-grid">{stackGroups.map(([title, items]) => <article key={title} className="panel-card" data-tilt><h3>{title}</h3><div>{items.map((item) => <Chip key={item}>{item}</Chip>)}</div></article>)}</div>
    </section>
  );
}

function TabContentBlock({ block, tab }) {
  if (block.type === 'projects') {
    return (
      <section className="tabbed-subsection">
        <SectorHeader eyebrow="Featured portfolio systems" title="">Backend architecture, async systems thinking, game-tech context, and production-ready communication.</SectorHeader>
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
      </section>
    );
  }

  if (block.type === 'architecture') return <ArchitectureSection />;
  if (block.type === 'stack') return <StackSection />;

  if (block.type === 'timeline') {
    return (
      <section className="tabbed-subsection">
        <SectorHeader eyebrow={block.eyebrow} title={block.title}>{tab.summary}</SectorHeader>
        <TimelineGrid items={block.items} />
      </section>
    );
  }

  if (block.type === 'personal') {
    return (
      <section className="tabbed-subsection">
        <SectorHeader eyebrow={block.eyebrow} title={block.title}>{tab.summary}</SectorHeader>
        <PersonalProjectTabs />
      </section>
    );
  }

  return null;
}

function TabbedContent({ tab }) {
  return (
    <div className="tab-pane" data-active-tab={tab.id}>
      <div className="tab-pane-header">
        <div>
          <p>{tab.kicker}</p>
          <h2>{tab.label}</h2>
        </div>
        <span>{tab.summary}</span>
      </div>
      <div className="tab-pane-body">
        {tab.blocks.map((block, index) => (
          <TabContentBlock key={`${tab.id}-${block.type}-${index}`} block={block} tab={tab} />
        ))}
      </div>
    </div>
  );
}

function applyWeatherToScene(kind, setMode, setWeather, setWeatherPower) {
  if (kind === 'snow' || kind === 'heavy-snow') {
    setMode('snowboard');
    setWeather(kind);
    setWeatherPower(kind === 'heavy-snow' ? 1.62 : 1.28);
  } else if (kind === 'rain' || kind === 'heavy-rain' || kind === 'drizzle' || kind === 'storm') {
    setMode('soccer');
    setWeather(kind);
    setWeatherPower(kind === 'storm' ? 1.75 : kind === 'heavy-rain' ? 1.58 : kind === 'drizzle' ? 0.92 : 1.2);
  } else if (kind === 'fog' || kind === 'cloud') {
    setMode('soccer');
    setWeather(kind);
    setWeatherPower(kind === 'fog' ? 1.35 : 0.98);
  } else {
    setMode('soccer');
    setWeather('clear');
    setWeatherPower(0.72);
  }
}

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
          <div className="hero-actions"><a className="primary-action" href="#tab-content">Start exploring →</a><a href={profile.resume} download>Download Resume</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div>
        </div>
      </section>

      <section id="tab-content" className="sector section-wrap tab-content" role="tabpanel" aria-labelledby={`profile-tab-${activeContentTab.id}`}>
        <ProfileTabs tabs={heroTabs} activeTabId={activeTabId} onTabChange={setActiveTabId} />
        <TabbedContent tab={activeContentTab} />
      </section>

      {false && (
        <>
      <section className="shortcut-rail" aria-label="Discoverable portfolio shortcuts">
        {sectors.slice(1).map((sector, index) => (
          <a key={sector.id} href={`#${sector.id}`} className="shortcut-card panel-card" data-tilt><span>{String(index + 1).padStart(2, '0')} · {sector.label}</span><strong>{sector.title}</strong><em>{sector.note} →</em></a>
        ))}
      </section>

      <section id="projects" className="sector section-wrap">
        <SectorHeader eyebrow="Featured portfolio systems" title="">Backend architecture, async systems thinking, game-tech context, and production-ready communication.</SectorHeader>
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
      </section>

      <section id="architecture" className="sector section-wrap architecture-panel panel-card" data-tilt>
        <SectorHeader eyebrow="Architecture narrative" title="From motion data to Unreal-ready procedural animation JSON." />
        <div className="pipeline">{pipelineSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="experience" className="sector section-wrap">
        <SectorHeader eyebrow="Experience" title="Production web engineering plus data-analysis roots." />
        <div className="experience-grid">
          <article className="experience-card panel-card" data-tilt><p>Jul 2021 – Apr 2024 · Des Plaines, IL</p><h3>Web Application Developer</h3><h4>Americaneagle.com</h4><p>Built and maintained enterprise Sitecore and headless web applications across insurance, nonprofit, medical/scientific, and data-sector clients. Worked across CMS integrations, cloud services, CI/CD deployments, reporting tools, and client-facing delivery.</p></article>
          <article className="experience-card panel-card" data-tilt><p>Dec 2017 – May 2021 · Mahwah, NJ</p><h3>Student Data Analyst</h3><h4>Ramapo College of New Jersey</h4><p>Analyzed academic and non-academic data to support advising allocation, reporting, and student-success planning. Automated recurring reporting workflows and translated institutional data into actionable insights.</p></article>
        </div>
      </section>

      <section id="stack" className="sector section-wrap stack-section">
        <SectorHeader eyebrow="Technical stack" title="Backend reliability, cloud delivery, game tooling, and data workflows.">Positioned for online-services expectations — scalable services, cloud delivery, caching, messaging, and clean interfaces — while keeping the Aegis portfolio clearly relevant to game production and content pipelines.</SectorHeader>
        <div className="stack-grid">{stackGroups.map(([title, items]) => <article key={title} className="panel-card" data-tilt><h3>{title}</h3><div>{items.map((item) => <Chip key={item}>{item}</Chip>)}</div></article>)}</div>
      </section>

        </>
      )}

      <footer id="contact" className="sector footer-shell panel-card" data-tilt>
        <div><ProfileAvatar /><h2>Let’s build online systems and game technology that scale.</h2><p>{profile.location}</p></div>
        <div className="contact-links"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div>
      </footer>
      <div className="scroll-finish-spacer" aria-hidden="true" />
    </main>
  );
}

const styles = `
:root{color-scheme:dark;font-size:80%;--bg:#02070d;--panel:rgba(5,13,22,.76);--line:rgba(133,239,255,.18);--cyan:#22d3ee;--cyan2:#67e8f9;--gold:#fbbf24;--text:#f8fafc;--muted:#9fb0c7;--radius:32px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-width:320px;background:var(--bg);color:var(--text)}a{color:inherit;text-decoration:none}button,input{font:inherit}button{cursor:pointer}.site{position:relative;min-height:92vh;overflow:hidden;background:#02070d}.world-backdrop{position:fixed;inset:0;z-index:0;display:block;background:#02070d}.world-foreground{position:fixed;inset:0;z-index:18;display:block;pointer-events:none;filter:drop-shadow(0 0 18px rgba(34,211,238,.22))}.foreground-fade{position:fixed;left:0;right:0;bottom:0;height:17vh;z-index:17;pointer-events:none;background:linear-gradient(to bottom,rgba(2,7,13,0) 0%,rgba(2,7,13,.08) 42%,rgba(2,7,13,.34) 74%,rgba(2,7,13,.9) 100%);backdrop-filter:blur(.7px);mask-image:linear-gradient(to bottom,transparent 0,#000 42%,#000 100%)}.ambient-grid{pointer-events:none;position:fixed;inset:0;z-index:2;opacity:.78;background:linear-gradient(rgba(34,211,238,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.035) 1px,transparent 1px),radial-gradient(circle at 80% 20%,rgba(34,211,238,.14),transparent 28rem);background-size:72px 72px,72px 72px,auto;mask-image:linear-gradient(to bottom,#000 0%,#000 84%,transparent 100%)}.site:after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(2,7,13,.92) 0%,rgba(2,7,13,.46) 42%,rgba(2,7,13,.2) 100%),linear-gradient(to bottom,rgba(2,7,13,.28),rgba(2,7,13,.05) 42%,rgba(2,7,13,.92))}.nav-shell{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:50;display:flex;align-items:center;justify-content:space-between;gap:20px;width:min(1240px,calc(100% - 28px));padding:12px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(0,0,0,.6);backdrop-filter:blur(22px);box-shadow:0 24px 90px rgba(0,0,0,.42)}.brand{display:flex;align-items:center;gap:12px;min-width:max-content}.brand strong{display:block;letter-spacing:.18em;text-transform:uppercase;font-size:.82rem}.brand small{display:block;margin-top:2px;color:var(--muted);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase}.nav-shell nav{display:flex;gap:clamp(12px,2.4vw,30px);color:#dbeafe;font-size:.92rem}.nav-shell nav a{opacity:.84;transition:.2s}.nav-shell nav a:hover{color:var(--cyan);opacity:1}.nav-cta{border:1px solid rgba(251,191,36,.36);background:rgba(251,191,36,.1);color:#fde68a;padding:11px 18px;border-radius:999px;font-weight:900;white-space:nowrap}.mark{position:relative;width:38px;height:42px;filter:drop-shadow(0 0 15px rgba(34,211,238,.65));flex:0 0 auto}.mark i{position:absolute;bottom:2px;left:50%;width:4px;height:40px;border-radius:999px;background:linear-gradient(#fef3c7,#22d3ee);transform:translateX(-50%)}.mark i:nth-child(2){left:28%;height:32px;transform:rotate(-25deg)}.mark i:nth-child(3){left:72%;height:32px;transform:rotate(25deg)}.panel-card{position:relative;border:1px solid var(--line);background:linear-gradient(145deg,rgba(7,17,27,.82),rgba(3,8,14,.68));border-radius:var(--radius);box-shadow:0 28px 90px rgba(0,0,0,.38);backdrop-filter:blur(22px);overflow:hidden;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .16s ease,border-color .2s ease,opacity .28s ease;will-change:transform,opacity}.panel-card:before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(34,211,238,.16),transparent 42%);opacity:.78;pointer-events:none}.sector,.shortcut-rail{position:relative;z-index:8;width:min(1080px,calc(100% - 120px));margin:0 auto}.hero-sector{min-height:100vh;display:grid;grid-template-columns:minmax(0,.96fr) minmax(260px,.48fr);gap:20px;align-items:end;padding:118px 0 58px}.hero-copy{padding:clamp(22px,4vw,42px)}.eyebrow{margin:0 0 16px;color:var(--cyan);font-size:.78rem;font-weight:1000;letter-spacing:.22em;text-transform:uppercase}.hero-copy h1{margin:0;font-size:clamp(3.6rem,8.4vw,7.4rem);line-height:.82;letter-spacing:-.09em;text-transform:uppercase;text-shadow:0 0 28px rgba(103,232,249,.12)}.hero-copy h2{margin:26px 0 0;max-width:780px;font-size:clamp(1.45rem,2.6vw,2.55rem);line-height:1.05;letter-spacing:-.055em}.hero-copy h2 span,.footer-shell h2{color:var(--gold)}.hero-lede{margin:24px 0 0;max-width:720px;color:#d8e4f5;font-size:1.06rem;line-height:1.78}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.hero-actions a{border:1px solid rgba(133,239,255,.24);background:rgba(8,20,31,.78);padding:14px 18px;border-radius:17px;font-weight:1000}.hero-actions .primary-action{border:0;background:linear-gradient(135deg,#67e8f9,#22d3ee);color:#021018;box-shadow:0 0 38px rgba(34,211,238,.28)}.metrics-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:28px}.metrics-row span{border:1px solid rgba(133,239,255,.16);background:rgba(0,0,0,.28);border-radius:18px;padding:14px}.metrics-row strong{display:block}.metrics-row small{display:block;margin-top:4px;color:var(--muted)}.exploration-note{align-self:end;padding:24px}.exploration-note strong{display:block;color:#fde68a;font-size:1.25rem}.exploration-note p,.exploration-note small{display:block;color:#cbd5e1;line-height:1.65;margin:10px 0 0}.floating-hud{position:fixed;right:18px;bottom:18px;z-index:45;width:min(280px,calc(100% - 36px));border:1px solid rgba(133,239,255,.2);border-radius:24px;background:rgba(0,0,0,.5);backdrop-filter:blur(22px);box-shadow:0 22px 80px rgba(0,0,0,.46);padding:14px}.hud-status span{display:block;color:var(--cyan2);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:1000}.hud-status strong{display:block;margin-top:5px}.hud-status small,.hud-note{display:block;color:#cbd5e1;line-height:1.45}.hud-row{display:flex;gap:8px;margin-top:10px}.hud-row button{flex:1;border:1px solid rgba(133,239,255,.2);border-radius:999px;background:rgba(6,15,24,.82);color:#e0f7ff;padding:9px 10px;font-weight:900}.hud-row button.active{border-color:rgba(34,211,238,.8);background:rgba(34,211,238,.16);box-shadow:0 0 18px rgba(34,211,238,.2)}.intensity-control{display:flex;align-items:center;gap:10px;margin-top:12px;color:#dbeafe;font-weight:900}.intensity-control input{width:100%;accent-color:var(--cyan)}.hud-note{margin-top:10px}.mission-map{position:fixed;left:12px;top:50%;transform:translateY(-50%) scale(.9);transform-origin:left center;z-index:44;display:grid;gap:8px;padding:11px;border:1px solid rgba(133,239,255,.18);border-radius:26px;background:rgba(0,0,0,.42);backdrop-filter:blur(18px)}.mission-map strong{display:block;justify-self:start;color:#fde68a;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;padding:0 4px 4px}.mission-map a{display:grid;grid-template-columns:34px auto;align-items:center;gap:8px;min-width:128px;padding:6px;border:1px solid rgba(133,239,255,.12);border-radius:14px;background:rgba(4,12,20,.7);position:relative}.mission-map a span{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(133,239,255,.16);border-radius:50%;font-size:.75rem;font-weight:1000}.mission-map a em{font-style:normal;white-space:nowrap;color:#dffbff;opacity:.88}.mission-map a.active{background:rgba(251,191,36,.12);border-color:rgba(251,191,36,.35)}.mission-map a.active span{border-color:rgba(251,191,36,.4);color:#fde68a}.mission-map a.active em{color:#fde68a}.profile-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid rgba(133,239,255,.4);box-shadow:0 0 0 2px rgba(4,12,20,.8),0 0 18px rgba(34,211,238,.18);flex:0 0 auto}.shortcut-rail{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-top:-20px;margin-bottom:42px}.shortcut-card{padding:18px;min-height:128px}.shortcut-card span{display:block;color:var(--cyan);font-size:.72rem;text-transform:uppercase;letter-spacing:.16em;font-weight:1000}.shortcut-card strong{display:block;margin-top:10px;font-size:1.1rem;line-height:1.2}.shortcut-card em{display:block;margin-top:14px;color:#fde68a;font-style:normal;font-weight:1000}.section-wrap{padding:62px 0;scroll-margin-top:120px}.section-heading{margin-bottom:28px}.section-heading.split{display:grid;grid-template-columns:1fr minmax(280px,440px);gap:30px;align-items:end}.section-heading h2{margin:0;font-size:clamp(1.8rem,3.3vw,3.15rem);line-height:.96;letter-spacing:-.06em}.section-heading p:not(.eyebrow){margin:0;color:#cbd5e1;line-height:1.72}.project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.project-card{padding:24px}.card-glow{position:absolute;inset:auto -20% -40% auto;width:60%;height:70%;background:radial-gradient(circle,rgba(34,211,238,.18),transparent 60%);pointer-events:none}.project-topline{display:flex;align-items:center;gap:12px}.project-topline span{display:grid;place-items:center;width:48px;height:48px;border:1px solid rgba(251,191,36,.36);border-radius:16px;color:#fde68a;font-weight:1000}.project-topline em{color:var(--cyan);font-style:normal;text-transform:uppercase;letter-spacing:.12em;font-size:.76rem;font-weight:1000}.project-visual{margin:20px 0;min-height:155px;border:1px solid rgba(133,239,255,.14);border-radius:26px;background:radial-gradient(circle at 50% 40%,rgba(34,211,238,.15),transparent 55%),rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:18px}.flow-node{display:flex;align-items:center;gap:8px}.flow-node span{display:grid;place-items:center;min-width:72px;min-height:54px;border:1px solid rgba(133,239,255,.22);border-radius:16px;color:#dffbff;text-transform:uppercase;font-weight:1000;font-size:.72rem}.flow-node em{color:var(--cyan);font-style:normal}.project-card h3{margin:0;font-size:clamp(1.45rem,2.1vw,2.05rem);letter-spacing:-.04em}.project-card p{color:#d4e3f3;line-height:1.7}.chip-row{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.chip{display:inline-flex;align-items:center;border:1px solid rgba(133,239,255,.17);border-radius:999px;background:rgba(3,10,17,.74);color:#e6fbff;padding:8px 11px;font-size:.82rem;font-weight:850}.project-card ul{margin:18px 0 0;padding:0;list-style:none;display:grid;gap:10px;color:#cbd5e1}.project-card li:before{content:"✓";color:var(--cyan);margin-right:8px}.architecture-panel{padding:38px;border-radius:38px}.pipeline{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px}.pipeline article{position:relative;border:1px solid rgba(133,239,255,.15);background:rgba(0,0,0,.28);border-radius:24px;padding:18px;min-height:190px}.pipeline article:not(:last-child):after{content:"→";position:absolute;right:-13px;top:50%;transform:translateY(-50%);color:var(--cyan);font-weight:1000;z-index:3}.pipeline span{color:var(--gold);font-weight:1000}.pipeline h3{font-size:1rem}.pipeline p{color:#afc2d7;line-height:1.5;font-size:.9rem}.experience-grid,.stack-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.experience-card,.stack-grid article{padding:24px}.experience-card>p:first-child{margin:0;color:var(--gold);font-weight:900}.experience-card h3{margin:14px 0 4px;font-size:1.7rem}.experience-card h4{margin:0;color:var(--cyan)}.experience-card p:last-child{color:#cbd5e1;line-height:1.72}.stack-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.stack-grid h3{margin:0 0 16px;color:#dffbff}.stack-grid div{display:flex;flex-wrap:wrap;gap:8px}.footer-shell{z-index:8;display:flex;align-items:flex-start;justify-content:space-between;gap:26px;margin:62px auto 20px;padding:32px}.footer-shell>div:first-child{display:grid;justify-items:start;gap:10px}.footer-shell h2{margin:4px 0 0;font-size:clamp(1.8rem,3vw,3rem);letter-spacing:-.045em}.footer-shell p{color:#cbd5e1}.scroll-finish-spacer{position:relative;z-index:3;height:min(42vh,420px)}.contact-links{display:grid;gap:10px;min-width:min(420px,100%)}.contact-links a{border:1px solid rgba(133,239,255,.17);background:rgba(0,0,0,.28);border-radius:18px;padding:14px 16px}@media (max-width:1180px){.mission-map{display:none}.sector,.shortcut-rail{width:min(100% - 44px,1040px)}.hero-sector{grid-template-columns:1fr}.shortcut-rail{grid-template-columns:repeat(2,minmax(0,1fr))}.project-grid,.experience-grid{grid-template-columns:1fr}.stack-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline article:not(:last-child):after{display:none}}@media (max-width:760px){:root{font-size:85%}.world-foreground{z-index:7;opacity:.65}.nav-shell{align-items:flex-start;border-radius:28px}.nav-shell nav{display:none}.nav-cta{display:none}.sector,.shortcut-rail{width:min(100% - 22px,1240px)}.hero-sector{padding-top:120px}.hero-copy{padding:28px 20px}.hero-copy h1{font-size:clamp(3.4rem,18vw,6rem)}.metrics-row,.stack-grid,.section-heading.split,.shortcut-rail{grid-template-columns:1fr}.floating-hud{position:relative;right:auto;bottom:auto;width:min(100% - 22px,1240px);height:auto;margin:0 auto 30px;z-index:22;border-radius:28px}.floating-hud .hud-status strong,.floating-hud .hud-status small,.floating-hud .hud-row,.floating-hud .intensity-control,.floating-hud .hud-note{opacity:1;visibility:visible;max-height:220px}.footer-shell{display:block}.contact-links{margin-top:20px}.project-card{padding:18px}.project-visual{justify-content:flex-start}.flow-node span{min-width:62px}}:is(.panel-card,.nav-shell,.nav-cta,.hero-actions a,.metrics-row span,.floating-hud,.hud-row button,.mission-map,.mission-map a,.mission-map a span,.profile-avatar,.shortcut-card,.project-card,.project-topline span,.project-visual,.flow-node span,.chip,.architecture-panel,.pipeline article,.experience-card,.stack-grid article,.footer-shell,.contact-links a){border-radius:0!important;clip-path:polygon(0 0,calc(100% - var(--fold,18px)) 0,100% var(--fold,18px),100% 100%,0 100%)}.profile-avatar{object-fit:cover}.mark i{border-radius:0!important}.nav-shell{--fold:22px}.panel-card,.floating-hud,.mission-map{--fold:24px}.hud-row button,.chip,.nav-cta,.hero-actions a,.contact-links a{--fold:12px}`;

const portraitStyles = `
.portrait-background{
  position:fixed;
  top:-22px;
  right:-138px;
  z-index:3;
  width:min(64vw,827px);
  height:min(74vh,774px);
  pointer-events:none;
  opacity:.72;
  mix-blend-mode:normal;
  filter:contrast(1.04) brightness(.96);
  mask-image:
    radial-gradient(ellipse at 58% 42%,#000 0%,rgba(0,0,0,.98) 46%,rgba(0,0,0,.72) 65%,rgba(0,0,0,.22) 82%,transparent 96%),
    linear-gradient(90deg,transparent 0%,rgba(0,0,0,.08) 8%,rgba(0,0,0,.62) 24%,#000 34%,#000 72%,transparent 100%),
    linear-gradient(180deg,transparent 0%,#000 14%,#000 66%,rgba(0,0,0,.36) 84%,transparent 100%);
  mask-composite:intersect;
  -webkit-mask-image:
    radial-gradient(ellipse at 58% 42%,#000 0%,rgba(0,0,0,.98) 46%,rgba(0,0,0,.72) 65%,rgba(0,0,0,.22) 82%,transparent 96%),
    linear-gradient(90deg,transparent 0%,rgba(0,0,0,.08) 8%,rgba(0,0,0,.62) 24%,#000 34%,#000 72%,transparent 100%),
    linear-gradient(180deg,transparent 0%,#000 14%,#000 66%,rgba(0,0,0,.36) 84%,transparent 100%);
  -webkit-mask-composite:source-in, source-in;
}
.portrait-background:after{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(ellipse at 100% 100%,rgba(2,7,13,0) 0%,rgba(2,7,13,.16) 46%,rgba(2,7,13,.82) 90%,rgba(2,7,13,1) 100%),
    linear-gradient(90deg,rgba(2,7,13,.88) 0%,rgba(2,7,13,.56) 12%,rgba(2,7,13,.16) 26%,rgba(2,7,13,0) 42%,rgba(2,7,13,0) 100%);
}
.portrait-background img{
  width:100%;
  height:100%;
  object-fit:contain;
  object-position:right top;
  transform-origin:center;
}
@media (max-width:760px){
  .portrait-background{
    top:-12px;
    right:-120px;
    width:min(83vw,528px);
    height:min(53vh,493px);
    opacity:.52;
  }
}
`;

const typeStyles = `
@import url("https://fonts.cdnfonts.com/css/soria");
:root{
  --display-font:"Soria","Georgia","Times New Roman",serif;
  --body-font:"Soria","Georgia","Times New Roman",serif;
  --hud-fit-scale:1;
  --map-fit-scale:.9;
  --lore-frame:#2a1710;
  --lore-ring:#8f5b2e;
  --lore-paper:#e5d2ae;
  --lore-paper-hi:rgba(255,255,255,.34);
  --lore-paper-line:rgba(79,47,25,.045);
  --lore-ink:#372016;
  --lore-heading:#24130d;
  --lore-accent:#6c2d1e;
  --lore-face-bg:#120806;
  --lore-avatar-filter:sepia(.16) saturate(1.05) contrast(1.08) brightness(.9);
  --lore-avatar-tint:color-mix(in srgb,var(--lore-ring) 26%,transparent);
  --lore-avatar-tint-strength:.14;
  font-size:88.2%;
  font-family:var(--body-font);
}
body,
button,
input,
a,
p,
small,
strong,
em,
span,
li{
  font-family:var(--body-font);
  font-weight:500;
}
.hero-copy h1,
.hero-copy h2,
.section-heading h2,
.project-card h3,
.footer-shell h2{
  font-family:var(--display-font);
  font-weight:600;
  font-stretch:normal;
  text-transform:uppercase;
  letter-spacing:.01em;
  line-height:1.02;
}
.hero-copy h1{
  font-size:clamp(3.45rem,7vw,6.85rem);
  letter-spacing:.005em;
  max-width:980px;
}
.hero-copy h2{
  font-size:clamp(1.35rem,2.25vw,2.15rem);
  letter-spacing:.01em;
  line-height:1.12;
  max-width:760px;
}
.section-heading h2{
  font-size:clamp(1.8rem,3.05vw,3.1rem);
  line-height:1.08;
}
.eyebrow,
.shortcut-card span,
.project-topline em,
.mission-map strong,
.hud-status span,
.brand strong,
.brand small{
  font-family:var(--display-font);
  font-weight:600;
  letter-spacing:.05em;
}
.hero-lede,
.project-card p,
.experience-card p,
.section-heading p,
.pipeline p{
  font-family:var(--body-font);
  font-weight:500;
  letter-spacing:.008em;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme){
  --bg:#000;
  --panel:rgba(14,14,14,.88);
  --line:rgba(255,255,255,.18);
  --cyan:#f5f5f5;
  --cyan2:#fff;
  --gold:#d9d9d9;
  --text:#f4f4f4;
  --muted:#a6a6a6;
  --lore-frame:#181818;
  --lore-ring:#d7d7d7;
  --lore-paper:#e0e0dc;
  --lore-paper-hi:rgba(255,255,255,.46);
  --lore-paper-line:rgba(0,0,0,.055);
  --lore-ink:#1f1f1f;
  --lore-heading:#080808;
  --lore-accent:#5a5a5a;
  --lore-face-bg:#050505;
  --lore-avatar-filter:grayscale(1) contrast(1.14) brightness(.9);
  --lore-avatar-tint:color-mix(in srgb,var(--lore-ring) 18%,transparent);
  --lore-avatar-tint-strength:.08;
  background:
    radial-gradient(circle at 76% 16%,rgba(255,255,255,.18),transparent 30rem),
    radial-gradient(circle at 18% 82%,rgba(96,96,96,.22),transparent 32rem),
    radial-gradient(circle at 50% 22%,rgba(255,255,255,.06),transparent 38rem),
    #000;
  color:var(--text);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme):after{
  background:
    linear-gradient(90deg,rgba(0,0,0,.97) 0%,rgba(18,18,18,.7) 42%,rgba(42,42,42,.22) 100%),
    linear-gradient(to bottom,rgba(255,255,255,.08),rgba(8,8,8,.06) 40%,rgba(0,0,0,.96));
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .ambient-grid{
  opacity:.72;
  background:
    linear-gradient(rgba(255,255,255,.034) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.026) 1px,transparent 1px),
    radial-gradient(circle at 80% 20%,rgba(255,255,255,.18),transparent 29rem);
  background-size:72px 72px,72px 72px,auto;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .portrait-background{
  opacity:.8;
  filter:contrast(1.12) brightness(1.02) grayscale(.1);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .panel-card,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .floating-hud,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .nav-shell{
  border-color:rgba(255,255,255,.16);
  background:linear-gradient(145deg,rgba(24,24,24,.88),rgba(2,2,2,.86));
  box-shadow:0 28px 90px rgba(0,0,0,.66),0 0 34px rgba(255,255,255,.08);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .panel-card:before{
  background:radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(255,255,255,.12),transparent 44%);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .world-foreground{
  filter:drop-shadow(0 0 24px rgba(255,255,255,.24));
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h1,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h2,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .section-heading h2,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card h3,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .footer-shell h2{
  color:#f2fbf8;
  background:none;
  -webkit-text-fill-color:currentColor;
  text-shadow:0 2px 10px rgba(0,0,0,.7),0 0 24px rgba(255,255,255,.14);
  filter:none;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h2 span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .eyebrow,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .shortcut-card span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-topline em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-status span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map strong,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .shortcut-card em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .brand strong,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .brand small{
  color:#d9d9d9;
  text-shadow:0 0 16px rgba(255,255,255,.16);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-topline span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card>p:first-child,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card h4,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .flow-node em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card li:before,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline article:after{
  color:#f2fbf8;
  border-color:rgba(255,255,255,.28);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-lede,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .section-heading p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card li,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-note,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-status small{
  color:#d2d2d2;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .nav-cta,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-actions a,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-row button,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .chip,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .contact-links a,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .metrics-row span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a{
  border-color:rgba(255,255,255,.18);
  background:rgba(18,18,18,.78);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-visual,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline article,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .flow-node span{
  border-color:rgba(255,255,255,.2);
  background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.12),transparent 55%),rgba(0,0,0,.26);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .chip,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .contact-links a{
  border-color:rgba(255,255,255,.2);
  background:rgba(18,18,18,.78);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .card-glow{
  background:radial-gradient(circle,rgba(255,255,255,.14),transparent 62%);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-actions .primary-action,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-row button.active{
  border-color:rgba(255,255,255,.76);
  background:linear-gradient(135deg,#fff,#d8d8d8 54%,#4f4f4f);
  color:#050505;
  box-shadow:0 0 30px rgba(255,255,255,.28),0 0 18px rgba(255,255,255,.12);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a span{
  border-color:rgba(255,255,255,.92);
  color:#fff;
  background:rgba(255,255,255,.24);
  box-shadow:0 0 44px rgba(255,255,255,.68), inset 0 0 22px rgba(255,255,255,.28);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a.active span{
  color:#050505;
  background:#fff;
  border-color:rgba(255,255,255,1);
  box-shadow:0 0 68px rgba(255,255,255,1),0 0 0 4px rgba(255,255,255,.34);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a.active em{
  color:#fff;
}
.site.fall-theme{
  --bg:#16090d;
  --panel:rgba(55,24,25,.78);
  --line:rgba(232,211,168,.24);
  --cyan:#c68443;
  --cyan2:#e8d3a8;
  --gold:#d89a45;
  --text:#fff5df;
  --muted:#d9c7a5;
  --lore-frame:#491323;
  --lore-ring:#d89a45;
  --lore-paper:#f0d6a4;
  --lore-paper-hi:rgba(255,245,218,.38);
  --lore-paper-line:rgba(96,39,24,.055);
  --lore-ink:#3a1714;
  --lore-heading:#2b1218;
  --lore-accent:#8b3f24;
  --lore-face-bg:#16090d;
  --lore-avatar-filter:sepia(.34) saturate(1.18) hue-rotate(-10deg) contrast(1.08) brightness(.9);
  --lore-avatar-tint:color-mix(in srgb,var(--lore-ring) 34%,transparent);
  --lore-avatar-tint-strength:.18;
  background:#16090d;
  color:var(--text);
}
.site.fall-theme:after{
  background:
    linear-gradient(90deg,rgba(66,19,33,.7) 0%,rgba(126,50,31,.28) 44%,rgba(240,138,46,.08) 100%),
    linear-gradient(to bottom,rgba(247,211,157,.05),rgba(126,50,31,.06) 42%,rgba(66,19,33,.86));
}
.site.fall-theme .ambient-grid{
  opacity:.58;
  background:
    linear-gradient(rgba(255,227,111,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,227,111,.03) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(255,227,111,.2),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.fall-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(22,9,13,0) 0%,rgba(22,9,13,.1) 42%,rgba(55,24,25,.38) 74%,rgba(22,9,13,.94) 100%);
}
.site.fall-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.fall-theme .panel-card,
.site.fall-theme .floating-hud,
.site.fall-theme .mission-map,
.site.fall-theme .nav-shell{
  border-color:rgba(232,211,168,.24);
  background:linear-gradient(145deg,rgba(89,37,31,.78),rgba(32,13,17,.74));
  box-shadow:0 28px 90px rgba(44,12,12,.44);
}
.site.fall-theme .nav-cta,
.site.fall-theme .hero-actions a,
.site.fall-theme .hud-row button,
.site.fall-theme .chip,
.site.fall-theme .contact-links a,
.site.fall-theme .metrics-row span,
.site.fall-theme .mission-map a{
  border-color:rgba(232,211,168,.22);
  background:rgba(86,37,31,.56);
  color:#fff1d2;
}
.site.fall-theme .hud-row button.active,
.site.fall-theme .fall-weather-button.active,
.site.fall-theme .hero-actions .primary-action{
  border-color:rgba(216,154,69,.72);
  background:linear-gradient(135deg,#e8d3a8,#c68443);
  color:#2b1218;
  box-shadow:0 0 30px rgba(198,132,67,.28);
}
.site.fall-theme .eyebrow,
.site.fall-theme .shortcut-card span,
.site.fall-theme .project-topline em,
.site.fall-theme .hud-status span,
.site.fall-theme .mission-map a.active em,
.site.fall-theme .mission-map a.active span{
  color:#e8d3a8;
}
.site.fall-theme .mission-map a span{
  border-color:rgba(73,19,35,.72);
  color:#e8d3a8;
  background:rgba(73,19,35,.2);
  box-shadow:0 0 18px rgba(73,19,35,.42), inset 0 0 14px rgba(73,19,35,.18);
}
.site.fall-theme .mission-map a.active span{
  border-color:rgba(73,19,35,.98);
  color:#fff1d2;
  background:#491323;
  box-shadow:0 0 30px rgba(73,19,35,.8), 0 0 0 2px rgba(73,19,35,.24);
}
.site.fall-theme .mission-map a.active{
  border-color:rgba(73,19,35,.58);
  background:rgba(73,19,35,.18);
}
.site.fall-theme .section-heading p,
.site.fall-theme .hero-lede,
.site.fall-theme .project-card p,
.site.fall-theme .experience-card p:last-child,
.site.fall-theme .pipeline p{
  color:#eadfc8;
}
.site.spring-theme{
  --bg:#071d1b;
  --panel:rgba(10,45,39,.78);
  --line:rgba(190,255,236,.24);
  --cyan:#50d2ee;
  --cyan2:#ecfff7;
  --gold:#b8f55f;
  --text:#f6fffd;
  --muted:#bfe7dc;
  --lore-frame:#0a4a3f;
  --lore-ring:#b8f55f;
  --lore-paper:#d9f6dd;
  --lore-paper-hi:rgba(255,255,255,.42);
  --lore-paper-line:rgba(10,74,63,.052);
  --lore-ink:#10342f;
  --lore-heading:#06221f;
  --lore-accent:#1f8d7a;
  --lore-face-bg:#071d1b;
  --lore-avatar-filter:sepia(.26) saturate(1.08) hue-rotate(72deg) contrast(1.07) brightness(.9);
  --lore-avatar-tint:color-mix(in srgb,var(--lore-accent) 38%,transparent);
  --lore-avatar-tint-strength:.2;
  background:#071d1b;
  color:var(--text);
}
.site.spring-theme:after{
  background:
    linear-gradient(90deg,rgba(5,30,36,.76) 0%,rgba(17,119,86,.28) 44%,rgba(112,201,232,.1) 100%),
    linear-gradient(to bottom,rgba(237,253,247,.08),rgba(47,185,134,.08) 42%,rgba(7,29,27,.88));
}
.site.spring-theme .ambient-grid{
  opacity:.62;
  background:
    linear-gradient(rgba(184,245,95,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(80,210,238,.035) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(184,245,95,.22),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.spring-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(7,29,27,0) 0%,rgba(7,29,27,.1) 42%,rgba(10,69,57,.38) 74%,rgba(7,29,27,.94) 100%);
}
.site.spring-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.spring-theme .panel-card,
.site.spring-theme .floating-hud,
.site.spring-theme .mission-map,
.site.spring-theme .nav-shell{
  border-color:rgba(190,255,236,.24);
  background:linear-gradient(145deg,rgba(12,74,63,.78),rgba(5,28,34,.74));
  box-shadow:0 28px 90px rgba(3,24,25,.42);
}
.site.spring-theme .nav-cta,
.site.spring-theme .hero-actions a,
.site.spring-theme .hud-row button,
.site.spring-theme .chip,
.site.spring-theme .contact-links a,
.site.spring-theme .metrics-row span,
.site.spring-theme .mission-map a{
  border-color:rgba(190,255,236,.24);
  background:rgba(8,67,61,.56);
  color:#ecfff7;
}
.site.spring-theme .hud-row button.active,
.site.spring-theme .spring-weather-button.active,
.site.spring-theme .hero-actions .primary-action{
  border-color:rgba(184,245,95,.76);
  background:linear-gradient(135deg,#ecfff7,#b8f55f 48%,#50d2ee);
  color:#06251f;
  box-shadow:0 0 30px rgba(184,245,95,.32);
}
.site.spring-theme .eyebrow,
.site.spring-theme .shortcut-card span,
.site.spring-theme .project-topline em,
.site.spring-theme .hud-status span,
.site.spring-theme .mission-map a.active em,
.site.spring-theme .mission-map a.active span{
  color:#b8f55f;
}
.site.spring-theme .mission-map a span{
  border-color:rgba(3,92,60,.64);
  color:#0b6b4f;
  background:rgba(3,92,60,.12);
  box-shadow:0 0 18px rgba(3,92,60,.32), inset 0 0 14px rgba(3,92,60,.14);
}
.site.spring-theme .mission-map a.active span{
  border-color:rgba(236,255,247,.95);
  color:#ecfff7;
  background:#035c3c;
  box-shadow:0 0 28px rgba(3,92,60,.72), 0 0 0 2px rgba(236,255,247,.2);
}
.site.spring-theme .mission-map a.active{
  border-color:rgba(3,92,60,.52);
  background:rgba(3,92,60,.14);
}
.site.spring-theme .section-heading p,
.site.spring-theme .hero-lede,
.site.spring-theme .project-card p,
.site.spring-theme .experience-card p:last-child,
.site.spring-theme .pipeline p{
  color:#d9f5ec;
}
.site.winter-theme{
  --bg:#e8f7ff;
  --panel:rgba(232,247,255,.78);
  --line:rgba(91,161,199,.28);
  --cyan:#5a96b8;
  --cyan2:#5a96b8;
  --gold:#5a96b8;
  --text:#050505;
  --muted:#050505;
  --lore-frame:#4d7f9c;
  --lore-ring:#5a96b8;
  --lore-paper:#f0fbff;
  --lore-paper-hi:rgba(255,255,255,.72);
  --lore-paper-line:rgba(77,127,156,.065);
  --lore-ink:#050505;
  --lore-heading:#050505;
  --lore-accent:#315e76;
  --lore-face-bg:#d7edf8;
  --lore-avatar-filter:sepia(.18) saturate(.96) hue-rotate(158deg) contrast(1.08) brightness(.94);
  --lore-avatar-tint:color-mix(in srgb,var(--lore-ring) 42%,transparent);
  --lore-avatar-tint-strength:.2;
  background:#e8f7ff;
  color:var(--text);
}
.site.winter-theme:after{
  background:
    linear-gradient(90deg,rgba(248,253,255,.62) 0%,rgba(189,238,255,.22) 48%,rgba(111,190,230,.12) 100%),
    linear-gradient(to bottom,rgba(255,255,255,.22),rgba(189,238,255,.1) 44%,rgba(181,226,247,.72));
}
.site.winter-theme .ambient-grid{
  opacity:.56;
  background:
    linear-gradient(rgba(91,161,199,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(255,255,255,.54),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.winter-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(232,247,255,0) 0%,rgba(232,247,255,.14) 42%,rgba(181,226,247,.42) 74%,rgba(210,239,252,.94) 100%);
}
.site.winter-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.winter-theme .panel-card,
.site.winter-theme .floating-hud,
.site.winter-theme .mission-map,
.site.winter-theme .nav-shell{
  border-color:rgba(91,161,199,.28);
  background:linear-gradient(145deg,rgba(248,253,255,.82),rgba(177,225,247,.72));
  box-shadow:0 28px 90px rgba(91,161,199,.22),0 0 34px rgba(255,255,255,.32);
}
.site.winter-theme .nav-cta,
.site.winter-theme .hero-actions a,
.site.winter-theme .hud-row button,
.site.winter-theme .chip,
.site.winter-theme .contact-links a,
.site.winter-theme .metrics-row span,
.site.winter-theme .mission-map a{
  border-color:rgba(91,161,199,.28);
  background:rgba(248,253,255,.64);
  color:#050505;
}
.site.winter-theme .hud-row button.active,
.site.winter-theme .winter-weather-button.active,
.site.winter-theme .hero-actions .primary-action{
  border-color:rgba(90,150,184,.9);
  background:linear-gradient(135deg,#fff,#dff7ff 42%,#5a96b8);
  color:#050505;
  box-shadow:0 0 34px rgba(90,150,184,.58);
}
.site.winter-theme .eyebrow,
.site.winter-theme .shortcut-card span,
.site.winter-theme .project-topline em,
.site.winter-theme .hud-status span,
.site.winter-theme .mission-map strong,
.site.winter-theme .mission-map a.active em,
.site.winter-theme .mission-map a.active span{
  color:#050505;
}
.site.winter-theme .hero-copy h1,
.site.winter-theme .hero-copy h2,
.site.winter-theme .hero-copy h2 span,
.site.winter-theme .section-heading h2,
.site.winter-theme .project-card h3,
.site.winter-theme .footer-shell h2,
.site.winter-theme .nav-shell nav,
.site.winter-theme .nav-shell nav a,
.site.winter-theme .brand strong,
.site.winter-theme .brand small,
.site.winter-theme .metrics-row small,
.site.winter-theme .stack-grid h3,
.site.winter-theme .experience-card h4,
.site.winter-theme .pipeline span,
.site.winter-theme .project-topline span,
.site.winter-theme .shortcut-card strong,
.site.winter-theme .shortcut-card em,
.site.winter-theme .project-card li,
.site.winter-theme .project-card ul,
.site.winter-theme .chip,
.site.winter-theme .flow-node span,
.site.winter-theme .flow-node em,
.site.winter-theme .project-visual,
.site.winter-theme .experience-card>p:first-child,
.site.winter-theme .footer-shell p,
.site.winter-theme .contact-links a{
  color:#050505;
}
.site.winter-theme .mission-map a span{
  border-color:rgba(90,150,184,.88);
  color:#050505;
  background:rgba(255,255,255,.52);
  box-shadow:0 0 22px rgba(90,150,184,.58), inset 0 0 14px rgba(255,255,255,.48);
}
.site.winter-theme .mission-map a.active span{
  border-color:rgba(90,150,184,1);
  color:#fff;
  background:#5a96b8;
  box-shadow:0 0 38px rgba(90,150,184,.92),0 0 0 2px rgba(255,255,255,.72);
}
.site.winter-theme .mission-map a.active{
  border-color:rgba(90,150,184,.78);
  background:rgba(255,255,255,.7);
}
.site.winter-theme .section-heading p,
.site.winter-theme .hero-lede,
.site.winter-theme .project-card p,
.site.winter-theme .experience-card p:last-child,
.site.winter-theme .pipeline p,
.site.winter-theme .hud-status small,
.site.winter-theme .hud-note,
.site.winter-theme .brand small,
.site.winter-theme .mission-map a em,
.site.winter-theme .metrics-row small,
.site.winter-theme .project-card li{
  color:#050505;
}
@media (max-width:760px){
  :root{
    font-size:93.71%;
  }
}
`;

const foldStyles = `
:is(.project-visual,.architecture-panel,.project-card,.experience-card,.stack-grid article,.footer-shell,.floating-hud,.mission-map,.nav-shell){
  position:relative;
}
:is(.panel-card,.nav-shell,.floating-hud,.mission-map,.project-card,.project-visual,.architecture-panel,.experience-card,.stack-grid article,.footer-shell)::after{
  content:"";
  position:absolute;
  top:0;
  right:0;
  width:var(--fold,18px);
  height:var(--fold,18px);
  clip-path:polygon(0 0,100% 100%,0 100%);
  background:linear-gradient(135deg,rgba(255,255,255,.28),rgba(103,232,249,.2) 42%,rgba(2,7,13,.58) 100%);
  border-left:1px solid rgba(133,239,255,.32);
  border-bottom:1px solid rgba(133,239,255,.24);
  box-shadow:-6px 6px 18px rgba(0,0,0,.24);
  pointer-events:none;
  z-index:4;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) :is(.panel-card,.nav-shell,.floating-hud,.mission-map,.project-card,.project-visual,.architecture-panel,.experience-card,.stack-grid article,.footer-shell)::after{
  background:linear-gradient(135deg,rgba(255,255,255,.32),rgba(118,118,118,.24) 42%,rgba(2,2,2,.6) 100%);
  border-left:1px solid rgba(255,255,255,.26);
  border-bottom:1px solid rgba(255,255,255,.2);
}
:is(.nav-cta,.hero-actions a,.metrics-row span,.hud-row button,.mission-map a,.mission-map a span,.shortcut-card,.project-topline span,.flow-node span,.chip,.contact-links a){
  clip-path:none!important;
}
:is(.nav-cta,.hero-actions a,.metrics-row span,.hud-row button,.mission-map a,.mission-map a span,.shortcut-card,.project-topline span,.flow-node span,.chip,.contact-links a)::after{
  content:none!important;
}
`;

const layoutRestoreStyles = `
.hero-sector{
  min-height:auto!important;
  padding-top:96px!important;
  padding-bottom:28px!important;
}
.section-wrap{
  padding-top:64px!important;
  padding-bottom:64px!important;
}
.scroll-finish-spacer{
  height:0!important;
}
.footer-shell{
  margin-bottom:0!important;
}
.floating-hud{
  position:fixed!important;
  right:18px!important;
  bottom:18px!important;
  left:auto!important;
  top:auto!important;
  width:min(340px,calc(100% - 36px))!important;
  height:auto!important;
  margin:0!important;
  z-index:45!important;
  transform:scale(var(--hud-fit-scale,1))!important;
  transform-origin:right bottom!important;
}
.floating-hud .hud-note{
  white-space:nowrap!important;
}
.lore-guide{
  position:fixed!important;
  left:20px!important;
  bottom:22px!important;
  z-index:46!important;
  display:block!important;
  width:min(520px,calc(100% - 40px))!important;
  min-height:104px!important;
  padding:0 42px 0 78px!important;
  border:0!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  transition:opacity .34s ease,transform .34s cubic-bezier(.2,.78,.16,1),width .34s cubic-bezier(.2,.78,.16,1),padding .34s cubic-bezier(.2,.78,.16,1)!important;
}
.lore-guide-toggle{
  position:absolute!important;
  top:50%!important;
  right:52px!important;
  display:grid!important;
  place-items:center!important;
  width:34px!important;
  height:34px!important;
  border:0!important;
  background:transparent!important;
  color:var(--lore-accent)!important;
  padding:0!important;
  z-index:4!important;
  transform:translateY(-50%)!important;
}
.lore-guide-face{
  position:absolute;
  left:0;
  top:50%;
  width:104px;
  height:104px;
  overflow:hidden;
  border:3px solid var(--lore-frame);
  background:var(--lore-face-bg);
  border-radius:50%;
  transform:translateY(-50%);
  box-shadow:0 0 0 3px var(--lore-ring),0 9px 0 rgba(0,0,0,.22),0 18px 36px rgba(0,0,0,.46);
  z-index:3;
}
.lore-guide-face:before{
  content:"";
  position:absolute;
  inset:0;
  z-index:2;
  background:var(--lore-avatar-tint);
  mix-blend-mode:color;
  opacity:var(--lore-avatar-tint-strength);
  pointer-events:none;
}
.lore-guide-face:after{
  content:"";
  position:absolute;
  inset:0;
  z-index:3;
  background:
    radial-gradient(circle at 28% 22%,color-mix(in srgb,var(--lore-ring) 26%,transparent),transparent 34%),
    linear-gradient(135deg,rgba(255,255,255,.18),transparent 32%),
    repeating-linear-gradient(-10deg,color-mix(in srgb,var(--lore-ring) 14%,transparent) 0 1px,transparent 1px 9px);
  mix-blend-mode:screen;
  opacity:.5;
  pointer-events:none;
}
.lore-guide-face img{
  position:relative;
  z-index:1;
  width:116%;
  height:116%;
  object-fit:cover;
  object-position:50% 34%;
  transform:translate(-6%,-5%) scale(1.06);
  filter:var(--lore-avatar-filter);
}
.lore-guide-copy{
  display:grid;
  gap:5px;
  min-width:0;
  min-height:92px;
  padding:14px 60px 14px 42px;
  border:3px solid var(--lore-frame);
  background:
    linear-gradient(180deg,var(--lore-paper-hi),transparent 38%),
    repeating-linear-gradient(0deg,var(--lore-paper-line) 0 1px,transparent 1px 5px),
    var(--lore-paper);
  box-shadow:0 0 0 2px var(--lore-ring),0 10px 0 rgba(0,0,0,.22),0 20px 42px rgba(0,0,0,.36);
  color:var(--lore-ink);
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);
  transform-origin:18px 50%;
  animation:loreDialogPop .34s cubic-bezier(.19,1,.22,1) both;
}
.lore-guide-copy > span{
  color:var(--lore-accent);
  font-size:.58rem;
  font-weight:900;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.lore-guide-copy strong{
  display:block;
  color:var(--lore-heading);
  font-size:.8rem;
  letter-spacing:.02em;
  line-height:1.1;
}
.lore-guide-copy p{
  margin:0;
  min-height:1.05em;
  color:var(--lore-ink);
  font-size:.76rem;
  line-height:1.38;
  opacity:1;
  transform:none;
}
.lore-guide-copy.exiting{
  animation:loreDialogOut .2s ease both;
}
.lore-guide-copy.exiting p{
  animation:loreTextOut .18s ease both;
}
.lore-type-caret{
  display:inline-block;
  width:7px;
  height:1em;
  margin-left:2px;
  vertical-align:-.13em;
  background:var(--lore-accent);
  animation:loreCaretBlink .78s steps(1,end) infinite;
}
.lore-guide.collapsed{
  width:48px!important;
  height:48px!important;
  min-height:48px!important;
  grid-template-columns:1fr!important;
  padding:6px!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.lore-guide.collapsed .lore-guide-face,
.lore-guide.collapsed .lore-guide-copy{
  opacity:0!important;
  pointer-events:none!important;
  transform:translateX(-10px) scale(.92)!important;
}
.lore-guide.collapsed .lore-guide-toggle{
  inset:6px!important;
  width:36px!important;
  height:36px!important;
  color:var(--text)!important;
  transform:none!important;
}
@keyframes loreDialogPop{
  0%{opacity:0;transform:translateX(-12px) scale(.84) rotate(-1.8deg)}
  68%{opacity:1;transform:translateX(2px) scale(1.025) rotate(.5deg)}
  100%{opacity:1;transform:translateX(0) scale(1) rotate(0)}
}
@keyframes loreDialogOut{
  0%{opacity:1;transform:translateX(0) scale(1)}
  100%{opacity:0;transform:translateX(-10px) scale(.92)}
}
@keyframes loreTextOut{
  0%{opacity:1;transform:translateY(0) scale(1)}
  100%{opacity:0;transform:translateY(-4px) scale(.98)}
}
@keyframes loreCaretBlink{
  0%,48%{opacity:1}
  49%,100%{opacity:0}
}
.mission-map{
  position:fixed!important;
  left:12px!important;
  top:50%!important;
  right:auto!important;
  bottom:auto!important;
  width:auto!important;
  transform:translateY(-50%) scale(var(--map-fit-scale,.9))!important;
  transform-origin:left center!important;
  display:grid!important;
  gap:8px!important;
  padding:11px!important;
  clip-path:none!important;
}
.mission-map::after,
.mission-map a::after,
.mission-map a span::after,
.shortcut-card::after,
.profile-avatar::after,
.lore-guide::after{
  content:none!important;
}
.profile-avatar{
  width:72.5px!important;
  height:72.5px!important;
  border-radius:50%!important;
  clip-path:circle(50% at 50% 50%)!important;
  aspect-ratio:1/1!important;
  overflow:hidden!important;
  border:1px solid rgba(133,239,255,.55)!important;
  box-shadow:0 0 0 2px rgba(4,12,20,.8),0 0 18px rgba(34,211,238,.18)!important;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .profile-avatar{
  border-color:rgba(255,255,255,.62)!important;
  box-shadow:0 0 0 2px rgba(0,0,0,.82),0 0 20px rgba(255,255,255,.22)!important;
}
.nav-shell,
.brand{
  overflow:visible!important;
}
.nav-shell{
  height:60px!important;
  min-height:60px!important;
  padding-top:7px!important;
  padding-bottom:7px!important;
  align-items:center!important;
  clip-path:none!important;
  border:0!important;
}
.brand{
  position:relative!important;
  min-height:45px!important;
  padding-left:90px!important;
}
.brand .profile-avatar{
  position:absolute!important;
  left:0!important;
  top:50%!important;
  transform:translateY(-50%)!important;
  z-index:3!important;
}
.nav-shell::after{
  content:none!important;
}
.nav-cta{
  padding-top:9px!important;
  padding-bottom:9px!important;
  line-height:1!important;
}
@media (max-width:760px){
  .lore-guide{
    left:11px!important;
    bottom:11px!important;
    width:min(390px,calc(100% - 22px))!important;
    min-height:86px!important;
    padding:0 38px 0 58px!important;
  }
  .lore-guide-face{
    width:78px;
    height:78px;
  }
  .lore-guide-copy p{
    font-size:.68rem;
  }
  .lore-guide-copy{
    min-height:78px;
    padding:11px 48px 11px 32px;
  }
  .lore-guide-toggle{
    right:38px!important;
    width:30px!important;
    height:30px!important;
  }
}
.mission-map a{
  min-width:128px!important;
  padding:6px!important;
  display:grid!important;
  grid-template-columns:34px auto!important;
  gap:8px!important;
  clip-path:none!important;
}
.mission-map a span{
  width:34px!important;
  height:34px!important;
  clip-path:none!important;
}
.shortcut-rail{
  position:relative!important;
  z-index:8!important;
  width:min(1080px,calc(100% - 120px))!important;
  margin:-20px auto 42px!important;
  display:grid!important;
  grid-template-columns:repeat(5,minmax(0,1fr))!important;
  gap:14px!important;
}
.shortcut-card{
  min-height:128px!important;
  padding:18px!important;
  clip-path:none!important;
}
@media (max-width:1180px){
  .shortcut-rail{
    width:min(100% - 44px,1040px)!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
  }
}
@media (max-width:760px){
  .hero-sector{
    padding-top:92px!important;
    padding-bottom:24px!important;
  }
  .shortcut-rail{
    width:min(100% - 22px,1240px)!important;
    grid-template-columns:1fr!important;
  }
}
`;

const tabStyles = `
.overlay-collapse-button{
  position:absolute;
  z-index:12;
  display:grid;
  place-items:center;
  width:34px;
  height:34px;
  border:0;
  border-radius:0;
  background:transparent;
  color:var(--cyan2);
  font-weight:1000;
  line-height:1;
  box-shadow:none;
  clip-path:none!important;
  transition:transform .34s cubic-bezier(.2,.78,.16,1),color .22s ease,filter .22s ease,opacity .22s ease;
}
.overlay-collapse-button::after{
  content:none!important;
}
.overlay-collapse-button:hover{
  color:color-mix(in srgb,var(--cyan2) 84%,white);
  filter:drop-shadow(0 0 8px color-mix(in srgb,var(--cyan) 40%,transparent));
}
.sketch-pointer{
  width:22px;
  height:22px;
  overflow:visible;
  fill:currentColor;
  stroke:none;
  transform-origin:50% 50%;
  filter:drop-shadow(1px 1.5px 0 rgba(0,0,0,.28));
  transition:transform .38s cubic-bezier(.2,.78,.16,1);
}
.sketch-pointer path{
  vector-effect:non-scaling-stroke;
}
.sketch-pointer-shadow{
  fill:rgba(0,0,0,.24);
  transform:translate(1.1px,1.3px);
}
.sketch-pointer.left{
  transform:rotate(180deg);
}
.sketch-pointer.down{
  transform:rotate(90deg);
}
.sketch-pointer.up{
  transform:rotate(-90deg);
}
.hud-collapse-button{
  top:10px;
  right:10px;
}
.map-collapse-button{
  top:8px;
  right:-17px;
}
.hud-content{
  padding-right:36px;
  opacity:1;
  transform:translateY(0) scale(1);
  transform-origin:right bottom;
  max-height:360px;
  overflow:hidden;
  transition:opacity .28s ease,transform .34s cubic-bezier(.2,.78,.16,1),max-height .34s cubic-bezier(.2,.78,.16,1);
}
.particle-cycle-row{
  display:grid!important;
  grid-template-columns:40px minmax(0,1fr) 40px;
  gap:6px!important;
}
.particle-cycle-row button{
  min-width:0;
  box-shadow:none!important;
}
.particle-cycle-row .particle-arrow{
  flex:0 0 40px;
  padding:9px 0!important;
  border-color:rgba(133,239,255,.18)!important;
  background:rgba(0,0,0,.28)!important;
  color:#dffbff!important;
}
.particle-cycle-row .particle-label{
  text-align:center;
  border-color:rgba(133,239,255,.18)!important;
  background:rgba(6,15,24,.58)!important;
  color:#e0f7ff!important;
}
.particle-cycle-row .particle-arrow:hover,
.particle-cycle-row .particle-label:hover{
  border-color:rgba(255,255,255,.34)!important;
  background:rgba(255,255,255,.1)!important;
}
.mission-map-content{
  display:grid;
  gap:8px;
  opacity:1;
  transform:translateX(0) scale(1);
  transform-origin:left center;
  max-width:180px;
  max-height:240px;
  overflow:hidden;
  transition:opacity .28s ease,transform .34s cubic-bezier(.2,.78,.16,1),max-width .34s cubic-bezier(.2,.78,.16,1),max-height .34s cubic-bezier(.2,.78,.16,1);
}
.floating-hud,
.mission-map{
  transition:width .34s cubic-bezier(.2,.78,.16,1),min-width .34s cubic-bezier(.2,.78,.16,1),height .34s cubic-bezier(.2,.78,.16,1),min-height .34s cubic-bezier(.2,.78,.16,1),padding .34s cubic-bezier(.2,.78,.16,1),transform .34s cubic-bezier(.2,.78,.16,1),opacity .28s ease,background .28s ease,border-color .28s ease,box-shadow .28s ease;
}
.floating-hud.collapsed{
  width:48px!important;
  height:48px!important;
  min-height:48px!important;
  padding:6px!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.floating-hud.collapsed::after{
  display:none!important;
}
.floating-hud.collapsed .hud-content{
  opacity:0!important;
  transform:translateY(10px) scale(.92)!important;
  max-height:0!important;
  pointer-events:none!important;
}
.floating-hud.collapsed .hud-collapse-button{
  top:6px!important;
  right:6px!important;
  width:36px!important;
  height:36px!important;
}
.mission-map.collapsed{
  width:48px!important;
  min-width:48px!important;
  height:48px!important;
  min-height:48px!important;
  padding:6px!important;
  gap:0!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.mission-map.collapsed::after{
  display:none!important;
}
.mission-map.collapsed .mission-map-content{
  opacity:0!important;
  transform:translateX(-10px) scale(.92)!important;
  max-width:0!important;
  max-height:0!important;
  pointer-events:none!important;
}
.mission-map.collapsed .map-collapse-button{
  top:6px!important;
  right:6px!important;
  width:36px!important;
  height:36px!important;
}
.floating-hud.collapsed .hud-collapse-button,
.mission-map.collapsed .map-collapse-button,
.floating-hud.collapsed .hud-collapse-button:hover,
.mission-map.collapsed .map-collapse-button:hover{
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
}
.floating-hud.collapsed .sketch-pointer,
.mission-map.collapsed .sketch-pointer,
.lore-guide.collapsed .sketch-pointer{
  width:24px;
  height:24px;
  filter:drop-shadow(0 0 8px color-mix(in srgb,var(--cyan) 36%,transparent)) drop-shadow(1px 1px 0 rgba(0,0,0,.28));
}
.tab-content{
  display:grid;
  gap:0;
  padding-top:28px!important;
}
.tab-pane{
  position:relative;
  display:grid;
  gap:38px;
  margin:0;
  padding:36px 34px 34px;
  border:1px solid rgba(255,255,255,.18);
  border-top-color:rgba(255,255,255,.13);
  background:
    linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018)),
    rgba(0,0,0,.28);
  box-shadow:0 24px 88px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.06);
  clip-path:none;
  overflow:hidden;
}
.tab-pane:before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:3px;
  background:linear-gradient(90deg,var(--gold),rgba(255,255,255,.44),transparent);
  opacity:.82;
}
.tab-pane-header{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:minmax(230px,.4fr) minmax(0,1fr);
  gap:34px;
  align-items:end;
  padding:0 0 26px;
  border-bottom:1px solid rgba(255,255,255,.14);
}
.tab-pane-header p{
  margin:0 0 8px;
  color:var(--gold);
  font-size:.74rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.tab-pane-header h2{
  margin:0;
  color:#f2fbf8;
  font-size:clamp(1.7rem,2.9vw,3rem);
  line-height:1.02;
  text-transform:uppercase;
}
.tab-pane-header span{
  color:#d2d2d2;
  line-height:1.64;
}
.tab-pane-body{
  position:relative;
  z-index:2;
  display:grid;
  gap:52px;
}
.tabbed-subsection{
  display:grid;
  gap:30px;
}
.tabbed-subsection .section-heading{
  margin-bottom:0;
}
.tab-content .project-grid,
.tab-content .experience-grid,
.tab-content .stack-grid{
  gap:30px;
}
.tab-content .project-card,
.tab-content .experience-card,
.tab-content .stack-grid article{
  padding:32px;
}
.tab-content .project-visual{
  margin:26px 0;
}
.tab-content .chip-row{
  gap:10px;
  margin:24px 0;
}
.tab-content .project-card ul{
  gap:14px;
  margin-top:24px;
}
.tab-content .architecture-panel{
  padding:44px;
}
.tab-content .architecture-panel{
  margin-top:0;
}
.tab-content .experience-card p:not(:first-child){
  color:#cbd5e1;
  line-height:1.72;
}
.tab-content .experience-card ul{
  display:grid;
  gap:12px;
  margin:20px 0 0;
  padding:0;
  list-style:none;
  color:#cbd5e1;
}
.tab-content .experience-card li:before{
  content:"/";
  color:var(--cyan);
  margin-right:8px;
}
.date-timeline-system{
  --sketch-accent:var(--cyan);
  --sketch-ink:#6f7374;
  --sketch-paper:rgba(248,249,244,.22);
  display:grid;
  gap:24px;
}
.date-timeline-controls{
  display:grid;
  grid-template-columns:42px minmax(0,1fr) 42px;
  gap:14px;
  align-items:stretch;
}
.date-timeline-controls button{
  border:2px solid color-mix(in srgb,var(--sketch-ink) 72%,transparent);
  border-radius:48% 52% 45% 55%/54% 46% 56% 44%;
  background:color-mix(in srgb,var(--sketch-paper) 58%,transparent);
  color:#101414;
  font-weight:1000;
  box-shadow:3px 4px 0 rgba(0,0,0,.14);
  clip-path:none!important;
}
.date-timeline-controls button:hover{
  border-color:var(--sketch-accent);
  background:color-mix(in srgb,var(--sketch-accent) 10%,rgba(255,255,255,.28));
}
.date-timeline-controls div{
  min-width:0;
  border:2px solid color-mix(in srgb,var(--sketch-ink) 68%,transparent);
  border-radius:10px 7px 12px 8px/8px 12px 7px 10px;
  background:
    repeating-linear-gradient(0deg,transparent 0 17px,rgba(111,115,116,.055) 18px 19px),
    color-mix(in srgb,var(--sketch-paper) 54%,transparent);
  padding:15px 18px;
  box-shadow:5px 6px 0 rgba(0,0,0,.12);
}
.date-timeline-controls span{
  display:block;
  color:var(--sketch-accent);
  font-size:.72rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.date-timeline-controls strong{
  display:block;
  margin-top:5px;
  color:#101414;
  font-size:clamp(1.1rem,1.8vw,1.55rem);
  line-height:1.04;
  text-transform:uppercase;
}
.date-timeline-rail{
  position:relative;
  min-height:650px;
  border:3px solid color-mix(in srgb,var(--sketch-ink) 76%,transparent);
  border-radius:12px 7px 14px 8px/8px 13px 7px 12px;
  background:
    linear-gradient(90deg,rgba(111,115,116,.025) 0 2px,transparent 2px 78px),
    repeating-linear-gradient(0deg,transparent 0 54px,rgba(111,115,116,.035) 55px 57px,transparent 58px 116px),
    radial-gradient(circle at 48% 8%,color-mix(in srgb,var(--sketch-accent) 6%,transparent),transparent 26%),
    var(--sketch-paper);
  box-shadow:8px 10px 0 rgba(0,0,0,.08);
  overflow:visible;
}
.date-timeline-rail:before{
  content:"";
  position:absolute;
  inset:30px 28px;
  opacity:.62;
  background:
    repeating-linear-gradient(180deg,color-mix(in srgb,var(--sketch-ink) 70%,transparent) 0 12px,transparent 13px 30px);
  background-position:left center;
  background-repeat:no-repeat;
  background-size:3px 100%;
  pointer-events:none;
}
.date-timeline-rail:after{
  content:"";
  position:absolute;
  left:12%;
  right:12%;
  bottom:28px;
  height:4px;
  border-top:4px solid color-mix(in srgb,var(--sketch-ink) 72%,transparent);
  border-radius:50%;
  transform:rotate(-.8deg);
  pointer-events:none;
}
.date-timeline-trunk{
  position:absolute;
  left:50%;
  top:52px;
  bottom:58px;
  width:28px;
  border-left:6px solid color-mix(in srgb,var(--sketch-ink) 82%,transparent);
  border-right:3px dashed color-mix(in srgb,var(--sketch-ink) 44%,transparent);
  border-radius:48% 52% 50% 50%;
  background:transparent;
  box-shadow:3px 0 0 color-mix(in srgb,var(--sketch-accent) 18%,transparent);
  transform:translateX(-50%) rotate(-1.3deg);
}
.date-timeline-trunk:before,
.date-timeline-trunk:after{
  content:"";
  position:absolute;
  left:50%;
  width:112px;
  height:0;
  border-top:3px dashed color-mix(in srgb,var(--sketch-ink) 46%,transparent);
  background:transparent;
  transform-origin:left center;
}
.date-timeline-trunk:before{
  top:31%;
  transform:rotate(-24deg);
}
.date-timeline-trunk:after{
  top:67%;
  transform:rotate(24deg);
}
.date-timeline-boundary{
  position:absolute;
  color:color-mix(in srgb,var(--sketch-ink) 84%,#111);
  font-size:.72rem;
  font-weight:1000;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.date-timeline-boundary.start{
  top:18px;
  left:50%;
  transform:translateX(calc(-100% - 22px));
}
.date-timeline-boundary.end{
  right:50%;
  bottom:18px;
  transform:translateX(calc(100% + 22px));
}
.date-timeline-node{
  position:absolute;
  top:var(--timeline-y);
  width:min(240px,32%);
  border:0;
  background:transparent;
  color:#cbd5e1;
  padding:0;
  clip-path:none!important;
  overflow:visible;
  transform:translateY(-50%);
  cursor:pointer;
}
.date-timeline-node.active{
  z-index:4;
}
.date-timeline-node.left{
  left:calc(50% - min(280px,38%));
  text-align:right;
}
.date-timeline-node.right{
  right:calc(50% - min(280px,38%));
  text-align:left;
}
.date-timeline-branch{
  position:absolute;
  top:50%;
  width:clamp(44px,8vw,94px);
  height:0;
  border-top:4px solid color-mix(in srgb,var(--node-color) 58%,var(--sketch-ink));
  border-radius:50%;
  background:transparent;
  transform:translateY(-50%);
}
.date-timeline-node.left .date-timeline-branch{
  left:100%;
  transform:translateY(-50%) rotate(3.5deg);
}
.date-timeline-node.right .date-timeline-branch{
  right:100%;
  transform:translateY(-50%) rotate(-3.5deg);
}
.date-timeline-orb{
  position:relative;
  display:grid;
  align-content:center;
  justify-items:center;
  width:100%;
  aspect-ratio:1/1;
  max-width:230px;
  margin-inline:auto;
  border:4px solid color-mix(in srgb,var(--node-color) 56%,var(--sketch-ink));
  border-radius:49% 51% 46% 54%/52% 47% 53% 48%;
  background:
    radial-gradient(circle at 36% 28%,rgba(255,255,255,.18),transparent 24%),
    color-mix(in srgb,var(--node-color) 42%,rgba(255,255,255,.18));
  color:#101414;
  padding:28px;
  box-shadow:7px 8px 0 rgba(0,0,0,.12),inset 0 0 0 2px rgba(255,255,255,.3);
  transition:transform .2s ease,box-shadow .2s ease,filter .2s ease;
}
.date-timeline-orb:before,
.date-timeline-orb:after{
  content:"";
  position:absolute;
  inset:8px;
  border:2px solid color-mix(in srgb,var(--sketch-ink) 52%,transparent);
  border-radius:52% 48% 50% 50%/47% 53% 49% 51%;
  transform:rotate(-4deg);
  pointer-events:none;
}
.date-timeline-orb:after{
  inset:15px;
  border-style:dashed;
  opacity:.36;
  transform:rotate(5deg);
}
.date-timeline-node.left .date-timeline-orb{
  transform:rotate(-1.4deg);
}
.date-timeline-node.right .date-timeline-orb{
  transform:rotate(1.2deg);
}
.date-timeline-orb em{
  position:relative;
  z-index:1;
  display:block;
  color:inherit;
  font-style:normal;
  font-size:clamp(1.45rem,3vw,2.35rem);
  font-weight:1000;
  letter-spacing:.02em;
}
.date-timeline-orb em:after{
  content:"";
  display:block;
  width:70%;
  max-width:120px;
  margin:10px auto 9px;
  border-top:3px dotted color-mix(in srgb,var(--sketch-ink) 52%,transparent);
}
.date-timeline-orb strong{
  position:relative;
  z-index:1;
  display:block;
  color:inherit;
  font-size:clamp(.78rem,1.4vw,1.05rem);
  line-height:1.14;
  text-transform:uppercase;
}
.date-timeline-orb small{
  position:relative;
  z-index:1;
  display:block;
  max-width:170px;
  margin-top:8px;
  color:rgba(16,20,20,.72);
  font-size:.72rem;
  line-height:1.32;
}
.date-timeline-icon{
  position:absolute;
  display:grid;
  place-items:center;
  right:-8px;
  bottom:8%;
  width:62px;
  height:62px;
  border:3px solid color-mix(in srgb,var(--sketch-ink) 58%,transparent);
  border-radius:46% 54% 51% 49%/52% 46% 54% 48%;
  background:color-mix(in srgb,var(--node-color) 24%,rgba(255,255,255,.5));
  box-shadow:4px 5px 0 rgba(0,0,0,.14);
  transform:rotate(4deg);
}
.date-timeline-node.left .date-timeline-icon{
  right:auto;
  left:-8px;
  transform:rotate(-5deg);
}
.date-timeline-icon svg{
  width:32px;
  height:32px;
  fill:color-mix(in srgb,var(--node-color) 72%,#000);
}
.date-timeline-node:hover .date-timeline-orb,
.date-timeline-node:focus-visible .date-timeline-orb{
  filter:saturate(1.08);
  box-shadow:8px 10px 0 rgba(0,0,0,.16),0 0 0 6px color-mix(in srgb,var(--node-color) 22%,transparent),inset 0 0 0 2px rgba(255,255,255,.38);
}
.date-timeline-node.left:hover .date-timeline-orb,
.date-timeline-node.left:focus-visible .date-timeline-orb{
  transform:rotate(-1.4deg) scale(1.04);
}
.date-timeline-node.right:hover .date-timeline-orb,
.date-timeline-node.right:focus-visible .date-timeline-orb{
  transform:rotate(1.2deg) scale(1.04);
}
.date-timeline-detail-copy{
  position:absolute;
  top:50%;
  display:block;
  width:min(300px,34vw);
  border:2px solid color-mix(in srgb,var(--sketch-ink) 70%,transparent);
  border-radius:8px 13px 7px 11px/12px 7px 13px 8px;
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 14%,rgba(255,255,255,.22)),rgba(255,255,255,.16)),
    var(--sketch-paper);
  box-shadow:6px 7px 0 rgba(0,0,0,.08);
  color:#252a2b;
  padding:12px 14px;
  text-align:left;
  transform:translateY(-50%);
  pointer-events:auto;
  cursor:pointer;
  transform-origin:center;
  transition:transform .22s ease,box-shadow .22s ease,background .22s ease,border-color .22s ease;
}
.date-timeline-detail-copy:before{
  content:"";
  position:absolute;
  top:50%;
  width:48px;
  border-top:4px solid color-mix(in srgb,var(--node-color) 58%,var(--sketch-accent));
  border-radius:50%;
  opacity:.72;
}
.date-timeline-node.left .date-timeline-detail-copy{
  left:calc(100% + clamp(58px,8vw,118px));
  transform:translateY(-50%) rotate(1.1deg);
}
.date-timeline-node.left.active .date-timeline-detail-copy{
  z-index:5;
  border-color:color-mix(in srgb,var(--node-color) 76%,var(--sketch-ink));
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 22%,rgba(255,255,255,.34)),rgba(255,255,255,.24)),
    var(--sketch-paper);
  box-shadow:16px 18px 0 rgba(0,0,0,.16),0 0 0 8px color-mix(in srgb,var(--node-color) 18%,transparent),0 24px 54px rgba(0,0,0,.18);
  transform:translateY(-50%) rotate(1.1deg) scale(1.5);
}
.date-timeline-node.left .date-timeline-detail-copy:before{
  left:-52px;
  transform:rotate(-7deg);
}
.date-timeline-node.right .date-timeline-detail-copy{
  right:calc(100% + clamp(58px,8vw,118px));
  text-align:right;
  transform:translateY(-50%) rotate(-1.1deg);
}
.date-timeline-node.right.active .date-timeline-detail-copy{
  z-index:5;
  border-color:color-mix(in srgb,var(--node-color) 76%,var(--sketch-ink));
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 22%,rgba(255,255,255,.34)),rgba(255,255,255,.24)),
    var(--sketch-paper);
  box-shadow:16px 18px 0 rgba(0,0,0,.16),0 0 0 8px color-mix(in srgb,var(--node-color) 18%,transparent),0 24px 54px rgba(0,0,0,.18);
  transform:translateY(-50%) rotate(-1.1deg) scale(1.5);
}
.date-timeline-node.right .date-timeline-detail-copy:before{
  right:-52px;
  transform:rotate(7deg);
}
.date-timeline-detail-meta{
  display:block;
  color:color-mix(in srgb,var(--node-color) 70%,#111);
  font-size:.72rem;
  font-weight:1000;
  letter-spacing:.02em;
  text-transform:uppercase;
}
.date-timeline-detail-body{
  display:block;
  margin-top:8px;
  color:inherit;
  font-size:.84rem;
  font-weight:800;
  line-height:1.45;
}
.date-timeline-detail-list{
  display:grid;
  gap:5px;
  margin-top:9px;
}
.date-timeline-detail-list span{
  display:block;
  color:inherit;
  font-size:.76rem;
  font-weight:800;
  line-height:1.35;
  opacity:.82;
}
.date-timeline-detail-list span:before{
  content:"~";
  margin-right:6px;
  color:color-mix(in srgb,var(--node-color) 70%,#111);
  font-weight:1000;
}
.site.winter-theme .tab-content .project-card p,
.site.winter-theme .tab-content .project-card ul,
.site.winter-theme .tab-content .project-card li,
.site.winter-theme .tab-content .experience-card p,
.site.winter-theme .tab-content .experience-card ul,
.site.winter-theme .tab-content .experience-card li,
.site.winter-theme .tab-content .section-heading p:not(.eyebrow),
.site.winter-theme .tab-content .stack-grid article,
.site.winter-theme .tab-content .stack-grid h3,
.site.winter-theme .tab-pane-header span,
.site.winter-theme .date-timeline-controls button,
.site.winter-theme .date-timeline-controls strong,
.site.winter-theme .date-timeline-boundary{
  color:#050505;
}
.site.winter-theme .date-timeline-controls div,
.site.winter-theme .date-timeline-rail{
  border-color:rgba(90,150,184,.28);
}
.site.winter-theme .date-timeline-controls button{
  border-color:rgba(90,150,184,.28);
  background:rgba(255,255,255,.58);
}
.site.fall-theme .date-timeline-system{
  --sketch-accent:#d89a45;
}
.site.spring-theme .date-timeline-system{
  --sketch-accent:#2fb986;
}
.site.winter-theme .date-timeline-system{
  --sketch-accent:#5a96b8;
  --sketch-paper:rgba(244,250,252,.2);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-node{
  --node-color:#f2fbf8!important;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-orb{
  color:#050505;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-orb small{
  color:rgba(5,5,5,.72);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-icon svg{
  fill:#2b2b2b;
}
.site.fall-theme .date-timeline-node{
  --node-color:#d89a45!important;
}
.site.spring-theme .date-timeline-node{
  --node-color:#2fb986!important;
}
.site.winter-theme .date-timeline-node{
  --node-color:#5a96b8!important;
}
.site.winter-theme .date-timeline-trunk,
.site.winter-theme .date-timeline-branch{
  background:rgba(90,150,184,.34);
}
.site.winter-theme .date-timeline-orb{
  color:#050505;
}
.site.winter-theme .date-timeline-orb small{
  color:rgba(5,5,5,.72);
}
.site.winter-theme .date-timeline-detail-copy,
.site.winter-theme .date-timeline-detail-meta,
.site.winter-theme .date-timeline-detail-list span:before{
  color:#050505;
}
.site.winter-theme .tab-pane{
  border-color:rgba(90,150,184,.28);
  background:linear-gradient(180deg,rgba(255,255,255,.72),rgba(232,247,255,.48));
}
.site.winter-theme .profile-tab-list{
  border-color:rgba(90,150,184,.28);
  background:linear-gradient(180deg,rgba(255,255,255,.82),rgba(232,247,255,.58));
}
.site.winter-theme .profile-tab-list button.active{
  background:linear-gradient(180deg,rgba(255,255,255,.92),rgba(232,247,255,.72));
  box-shadow:inset 0 3px 0 #5a96b8;
}
.site.winter-theme .profile-tab-list button.active:after{
  background:rgba(238,248,255,.96);
}
.site.winter-theme .tab-pane-header h2,
.site.winter-theme .tab-pane-header span{
  color:#050505;
}
@media (max-width:760px){
  .tab-pane{
    padding:22px;
    gap:28px;
  }
  .tab-pane-header{
    grid-template-columns:1fr;
    gap:18px;
    padding-bottom:20px;
  }
  .tab-pane-body{
    gap:36px;
  }
  .tabbed-subsection{
    gap:24px;
  }
  .tab-content .project-grid,
  .tab-content .experience-grid,
  .tab-content .stack-grid{
    gap:22px;
  }
  .tab-content .project-card,
  .tab-content .experience-card,
  .tab-content .stack-grid article{
    padding:24px;
  }
  .date-timeline-rail{
    min-height:620px;
  }
  .date-timeline-node{
    width:38%;
  }
  .date-timeline-detail-copy{
    width:36vw;
    padding:10px;
    font-size:.72rem;
  }
  .date-timeline-node.left .date-timeline-detail-copy{
    left:calc(100% + 18px);
  }
  .date-timeline-node.right .date-timeline-detail-copy{
    right:calc(100% + 18px);
  }
  .date-timeline-detail-body{
    font-size:.72rem;
    line-height:1.3;
  }
  .date-timeline-detail-list{
    display:none;
  }
  .date-timeline-orb{
    padding:20px;
  }
  .date-timeline-orb em{
    font-size:1.45rem;
  }
  .date-timeline-orb strong{
    font-size:.68rem;
  }
  .date-timeline-icon{
    width:48px;
    height:48px;
  }
  .date-timeline-icon svg{
    width:25px;
    height:25px;
  }
}
.personal-subtabs{
  display:grid;
  grid-template-columns:minmax(180px,.28fr) minmax(0,1fr);
  gap:28px;
  align-items:stretch;
}
.personal-subtab-list{
  display:grid;
  align-content:start;
  gap:12px;
}
.personal-subtab-list button{
  position:relative;
  display:grid;
  gap:7px;
  border:1px solid rgba(255,255,255,.16);
  background:
    linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.015)),
    rgba(0,0,0,.2);
  color:var(--text);
  padding:16px 16px 15px;
  text-align:left;
  clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);
  transition:background .2s ease,border-color .2s ease,transform .2s ease;
}
.personal-subtab-list button:hover{
  border-color:rgba(255,255,255,.32);
  background:rgba(255,255,255,.09);
  transform:translateX(4px);
}
.personal-subtab-list button.active{
  border-color:color-mix(in srgb,var(--gold) 62%,rgba(255,255,255,.2));
  background:
    linear-gradient(135deg,color-mix(in srgb,var(--gold) 18%,transparent),rgba(255,255,255,.035)),
    rgba(0,0,0,.26);
  box-shadow:inset 4px 0 0 var(--gold),0 12px 34px rgba(0,0,0,.18);
}
.personal-subtab-list button span{
  color:var(--gold);
  font-size:.68rem;
  letter-spacing:.1em;
}
.personal-subtab-list button strong{
  font-size:1rem;
  line-height:1.1;
}
.personal-subtab-panel{
  display:grid;
  gap:24px;
  min-height:320px;
  padding:34px;
  clip-path:none!important;
}
.personal-subtab-heading{
  display:grid;
  gap:10px;
  max-width:760px;
}
.personal-subtab-heading p{
  margin:0;
  color:var(--gold);
  font-size:.74rem;
  letter-spacing:.12em;
  text-transform:uppercase;
}
.personal-subtab-heading h3{
  margin:0;
  color:#f2fbf8;
  font-size:clamp(1.85rem,3.2vw,3.3rem);
  line-height:.96;
  text-transform:uppercase;
}
.personal-subtab-heading span,
.personal-subtab-body{
  color:#d2d2d2;
  line-height:1.72;
}
.personal-subtab-body{
  max-width:820px;
  margin:0;
  font-size:1.02rem;
}
.personal-media-experience{
  display:grid;
  grid-template-columns:minmax(0,1.1fr) minmax(260px,.62fr);
  gap:22px;
  align-items:start;
}
.personal-featured-media{
  position:sticky;
  top:106px;
  display:grid;
  margin:0;
  border:1px solid rgba(255,255,255,.14);
  background:
    linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),
    rgba(0,0,0,.18);
  overflow:hidden;
  clip-path:polygon(0 0,calc(100% - 26px) 0,100% 26px,100% 100%,0 100%);
  box-shadow:0 26px 70px rgba(0,0,0,.18);
}
.personal-featured-media:before{
  content:"";
  position:absolute;
  inset:14px;
  border:1px solid rgba(255,255,255,.12);
  pointer-events:none;
  z-index:2;
}
.personal-featured-media > img,
.personal-featured-media > video,
.personal-featured-media > .personal-media-placeholder{
  width:100%;
  height:clamp(320px,44vw,540px);
}
.personal-featured-media img,
.personal-featured-media video,
.personal-media-thumb img,
.personal-media-thumb video{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
}
.personal-featured-media figcaption{
  display:grid;
  gap:9px;
  padding:22px 24px 24px;
  color:#d8e4f5;
  line-height:1.55;
}
.personal-featured-media figcaption span,
.personal-media-copy em,
.personal-media-placeholder span{
  color:var(--gold);
  font-size:.72rem;
  font-style:normal;
  font-weight:1000;
  letter-spacing:.12em;
  text-transform:uppercase;
}
.personal-featured-media figcaption strong{
  color:#f8fafc;
  font-size:clamp(1.35rem,2.4vw,2.25rem);
  line-height:1.04;
  text-transform:uppercase;
}
.personal-featured-media figcaption p{
  margin:0;
}
.personal-media-feed{
  display:grid;
  grid-template-columns:minmax(0,1fr);
  gap:12px;
}
::view-transition-group(*){
  animation-duration:.58s;
  animation-timing-function:cubic-bezier(.2,.78,.16,1);
}
::view-transition-old(*),
::view-transition-new(*){
  animation-duration:.58s;
  animation-timing-function:cubic-bezier(.2,.78,.16,1);
  mix-blend-mode:normal;
}
.personal-swap-clone{
  z-index:9999!important;
  box-sizing:border-box;
  filter:drop-shadow(0 24px 46px rgba(0,0,0,.34));
  will-change:transform,opacity;
}
.personal-media-card{
  position:relative;
  display:grid;
  grid-template-columns:auto 92px minmax(0,1fr);
  gap:14px;
  align-items:stretch;
  width:100%;
  border:1px solid rgba(255,255,255,.12);
  background:
    linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.012)),
    rgba(0,0,0,.16);
  color:var(--text);
  padding:10px;
  text-align:left;
  overflow:hidden;
  clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);
  transition:translate .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease;
  will-change:translate;
}
.personal-media-card:hover{
  border-color:color-mix(in srgb,var(--gold) 58%,rgba(255,255,255,.18));
  background:
    linear-gradient(135deg,color-mix(in srgb,var(--gold) 14%,transparent),rgba(255,255,255,.03)),
    rgba(0,0,0,.24);
  translate:-5px 0;
  box-shadow:0 18px 42px rgba(0,0,0,.16);
}
.personal-media-index{
  display:grid;
  place-items:center;
  width:34px;
  color:var(--gold);
  font-weight:1000;
  font-size:.72rem;
  letter-spacing:.08em;
}
.personal-media-thumb{
  position:relative;
  display:block;
  min-height:92px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(0,0,0,.2);
  overflow:hidden;
}
.personal-media-copy{
  display:grid;
  align-content:center;
  gap:7px;
  min-width:0;
}
.personal-media-copy strong{
  color:#f8fafc;
  line-height:1.15;
  text-transform:uppercase;
}
.personal-media-copy span{
  color:#d8e4f5;
  line-height:1.45;
  font-size:.9rem;
}
.personal-media-placeholder{
  display:grid;
  align-content:center;
  justify-items:start;
  gap:12px;
  padding:28px;
  color:#f8fafc;
  background:
    linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.015)),
    radial-gradient(circle at 22% 18%,color-mix(in srgb,var(--gold) 18%,transparent),transparent 36%),
    repeating-linear-gradient(-12deg,rgba(255,255,255,.055) 0 1px,transparent 1px 18px),
    rgba(0,0,0,.24);
}
.personal-media-placeholder strong{
  max-width:560px;
  font-size:clamp(1.35rem,2.6vw,2.25rem);
  line-height:1.04;
  text-transform:uppercase;
}
.personal-media-placeholder.compact{
  width:100%;
  height:100%;
  min-height:92px;
  justify-items:center;
  text-align:center;
  padding:12px;
}
.personal-media-placeholder.compact span{
  font-size:.58rem;
}
.personal-media-placeholder.compact strong{
  font-size:.8rem;
}
.profile-tabs{
  position:relative;
  z-index:3;
  width:100%;
  max-width:none;
  margin:0;
  padding:0;
}
.profile-tab-list{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:0;
  border:1px solid rgba(255,255,255,.18);
  border-bottom:0;
  background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.18));
  box-shadow:0 18px 70px rgba(0,0,0,.22);
}
.profile-tab-list button{
  position:relative;
  min-height:74px;
  border:0;
  border-right:1px solid rgba(255,255,255,.12);
  border-bottom:1px solid rgba(255,255,255,.13);
  background:rgba(0,0,0,.18);
  color:var(--text);
  padding:14px 16px 13px;
  text-align:left;
  clip-path:none;
  transition:background .2s ease,color .2s ease,box-shadow .2s ease;
}
.profile-tab-list button:last-child{
  border-right:0;
}
.profile-tab-list button:hover{
  background:rgba(255,255,255,.12);
}
.profile-tab-list button.active{
  border-bottom-color:transparent;
  background:
    linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),
    rgba(0,0,0,.28);
  box-shadow:inset 0 3px 0 var(--gold);
}
.profile-tab-list button.active:after{
  content:"";
  position:absolute;
  left:0;
  right:0;
  bottom:-1px;
  height:1px;
  background:rgba(8,14,20,.98);
}
.profile-tab-list button span{
  display:block;
  color:var(--gold);
  font-size:.66rem;
  letter-spacing:.07em;
  text-transform:uppercase;
}
.profile-tab-list button strong{
  display:block;
  margin-top:8px;
  font-size:.96rem;
  line-height:1.1;
}
.profile-tab-panel{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:minmax(190px,.34fr) minmax(0,1fr);
  gap:16px;
  margin-top:14px;
  padding-top:16px;
  border-top:1px solid rgba(255,255,255,.13);
}
.profile-tab-intro p,
.profile-tab-section h4,
.profile-tab-item p{
  margin:0;
  color:var(--gold);
  font-size:.72rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.profile-tab-intro h3{
  margin:9px 0 10px;
  font-size:clamp(1.25rem,2vw,1.8rem);
  line-height:1.06;
  letter-spacing:.01em;
  text-transform:uppercase;
}
.profile-tab-intro span,
.profile-tab-item span,
.profile-tab-item li{
  color:#d2d2d2;
  line-height:1.45;
  font-size:.92rem;
}
.profile-tab-sections{
  display:grid;
  gap:14px;
}
.profile-tab-section h4{
  margin-bottom:10px;
}
.profile-tab-items{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px;
}
.profile-tab-item{
  display:grid;
  gap:6px;
  padding:0 0 10px 12px;
  border-left:1px solid rgba(255,255,255,.22);
  border-bottom:1px solid rgba(255,255,255,.1);
}
.profile-tab-item h5{
  margin:0;
  color:#f2fbf8;
  font-size:1rem;
  line-height:1.16;
}
.profile-tab-item strong{
  color:var(--cyan2);
  font-size:.84rem;
}
.profile-tab-item ul{
  display:grid;
  gap:6px;
  margin:3px 0 0;
  padding:0;
  list-style:none;
}
.profile-tab-item li:before{
  content:"/";
  color:var(--gold);
  margin-right:7px;
}
.site.fall-theme .profile-tab-list,
.site.spring-theme .profile-tab-list{
  border-color:var(--line);
  background:rgba(255,255,255,.06);
}
.site.fall-theme .profile-tab-list button,
.site.spring-theme .profile-tab-list button{
  border-right-color:var(--line);
  border-bottom-color:var(--line);
  background:rgba(255,255,255,.04);
}
.site.fall-theme .profile-tab-list button.active,
.site.spring-theme .profile-tab-list button.active{
  border-bottom-color:transparent;
  background:rgba(255,255,255,.12);
}
.site.fall-theme .profile-tab-list button.active:after,
.site.spring-theme .profile-tab-list button.active:after{
  background:rgba(8,14,20,.98);
}
.site.winter-theme .profile-tab-list button,
.site.winter-theme .personal-subtab-list button,
.site.winter-theme .personal-subtab-heading h3,
.site.winter-theme .personal-subtab-heading span,
.site.winter-theme .personal-subtab-body,
.site.winter-theme .personal-media-placeholder,
.site.winter-theme .personal-featured-media figcaption,
.site.winter-theme .personal-featured-media figcaption strong,
.site.winter-theme .personal-media-copy,
.site.winter-theme .personal-media-copy strong,
.site.winter-theme .personal-media-copy span,
.site.winter-theme .profile-tab-intro span,
.site.winter-theme .profile-tab-item span,
.site.winter-theme .profile-tab-item li,
.site.winter-theme .profile-tab-item h5,
.site.winter-theme .profile-tab-item strong{
  color:#050505;
}
@media (max-width:1180px){
  .profile-tabs{
    max-width:none;
  }
  .profile-tab-list{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .profile-tab-panel{
    grid-template-columns:1fr;
  }
  .personal-media-experience{
    grid-template-columns:1fr;
  }
  .personal-featured-media{
    position:relative;
    top:auto;
  }
}
@media (max-width:760px){
  .profile-tabs{
    margin:0;
    padding:0;
  }
  .profile-tab-list{
    grid-template-columns:1fr;
  }
  .profile-tab-items{
    grid-template-columns:1fr;
  }
  .personal-subtabs{
    grid-template-columns:1fr;
  }
  .personal-subtab-list{
    grid-template-columns:1fr;
  }
  .personal-subtab-panel{
    padding:24px;
  }
  .personal-featured-media > img,
  .personal-featured-media > video,
  .personal-featured-media > .personal-media-placeholder{
    height:clamp(260px,72vw,360px);
  }
  .personal-featured-media figcaption{
    padding:18px;
  }
  .personal-media-card{
    grid-template-columns:auto 74px minmax(0,1fr);
    gap:10px;
  }
  .personal-media-thumb,
  .personal-media-placeholder.compact{
    min-height:74px;
  }
  .personal-media-copy span{
    display:none;
  }
  .profile-tab-list button{
    min-height:62px;
  }
}
`;

