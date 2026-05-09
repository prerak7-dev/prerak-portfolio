import { useEffect, useMemo, useRef, useState } from 'react';

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
  { id: 'hero', label: 'Signal', title: 'Backend + Game Tech', note: 'positioning' },
  { id: 'projects', label: 'Projects', title: 'Aegis Systems', note: 'pipeline + plugin' },
  { id: 'architecture', label: 'Architecture', title: 'Mocap → JSON → Unreal', note: 'service flow' },
  { id: 'experience', label: 'Experience', title: 'Production Engineering', note: 'professional history' },
  { id: 'stack', label: 'Stack', title: 'Technical Depth', note: 'tools and platforms' },
  { id: 'contact', label: 'Contact', title: 'Next Step', note: 'links' },
];

const projects = [
  {
    number: '01',
    title: 'Aegis AAA Animation Pipeline',
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

const weatherCodes = {
  0: ['Clear', 'clear'], 1: ['Mainly clear', 'clear'], 2: ['Partly cloudy', 'cloud'], 3: ['Overcast', 'cloud'],
  45: ['Fog', 'fog'], 48: ['Rime fog', 'fog'],
  51: ['Light drizzle', 'rain'], 53: ['Drizzle', 'rain'], 55: ['Dense drizzle', 'rain'],
  56: ['Freezing drizzle', 'snow'], 57: ['Dense freezing drizzle', 'snow'],
  61: ['Slight rain', 'rain'], 63: ['Rain', 'rain'], 65: ['Heavy rain', 'rain'],
  66: ['Freezing rain', 'snow'], 67: ['Heavy freezing rain', 'snow'],
  71: ['Slight snow', 'snow'], 73: ['Snow', 'snow'], 75: ['Heavy snow', 'snow'], 77: ['Snow grains', 'snow'],
  80: ['Rain showers', 'rain'], 81: ['Rain showers', 'rain'], 82: ['Violent rain showers', 'rain'],
  85: ['Snow showers', 'snow'], 86: ['Heavy snow showers', 'snow'],
  95: ['Thunderstorm', 'storm'], 96: ['Thunderstorm with hail', 'storm'], 99: ['Heavy thunderstorm with hail', 'storm'],
};

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

function WorldBackdrop({ mode, weather, weatherPower, activeSector, scrollProgress, timeProfile }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0.55, y: 0.45, down: false });
  const keysRef = useRef(new Set());
  const refs = useRef({ mode, weather, weatherPower, activeSector, scrollProgress, timeProfile });

  useEffect(() => {
    refs.current = { mode, weather, weatherPower, activeSector, scrollProgress, timeProfile };
  }, [mode, weather, weatherPower, activeSector, scrollProgress, timeProfile]);

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
    const player = { x: width * 0.2, y: height * 0.68, vx: 0, vy: 0, spin: 0, trail: [] };
    const palette = {
      dawn: ['#06111c', '#102839', '#f8ba72'],
      day: ['#03111d', '#0b2e44', '#8eeeff'],
      dusk: ['#060916', '#181b35', '#f59e0b'],
      night: ['#02070d', '#071420', '#22d3ee'],
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
      particles.length = 0;
      stars.length = 0;
      const count = Math.floor((reduceMotion ? 50 : 160) * refs.current.weatherPower);
      for (let i = 0; i < count; i += 1) particles.push(makeParticle(Math.random() * width, Math.random() * height));
      for (let i = 0; i < 120; i += 1) stars.push({ x: Math.random() * width, y: Math.random() * height * 0.72, r: Math.random() * 1.6 + 0.2, a: Math.random() * 0.72 + 0.12 });
    }

    function makeParticle(x = Math.random() * width, y = -30) {
      const snow = refs.current.weather === 'snow';
      return {
        x,
        y,
        r: snow ? Math.random() * 2 + 0.8 : Math.random() * 1.3 + 0.5,
        vx: snow ? Math.random() * 1.1 - 0.55 : Math.random() * 3.1 - 1.55,
        vy: snow ? Math.random() * 1.5 + 0.6 : Math.random() * 4.6 + 3.4,
        life: Math.random() * 100,
        a: snow ? Math.random() * 0.48 + 0.22 : Math.random() * 0.42 + 0.16,
      };
    }

    function groundY(x) {
      const isSnow = refs.current.mode === 'snowboard';
      const base = height * (isSnow ? 0.845 : 0.865);
      const wave = isSnow ? Math.sin(x * 0.0055) * 18 + Math.sin(x * 0.014) * 8 : Math.sin(x * 0.006) * 8;
      return base + wave;
    }

    function drawBackground(t) {
      const [top, mid, accent] = palette[refs.current.timeProfile.key] || palette.night;
      const pointer = pointerRef.current;
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, top);
      bg.addColorStop(0.54, mid);
      bg.addColorStop(1, '#02070d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const orbX = width * (0.68 + (pointer.x - 0.5) * 0.07);
      const orbY = height * (0.25 + (pointer.y - 0.5) * 0.05);
      const orb = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, width * 0.48);
      orb.addColorStop(0, `${accent}4b`);
      orb.addColorStop(0.34, 'rgba(34,211,238,.12)');
      orb.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      const alphaMod = refs.current.timeProfile.key === 'day' ? 0.23 : 1;
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(220,251,255,${star.a * alphaMod})`;
        ctx.arc(star.x + (pointer.x - 0.5) * 22, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      drawHud(orbX, orbY, t);
      drawEnvironment(t);
      drawTrack(t);
    }

    function drawHud(cx, cy, t) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.00013);
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34,211,238,${0.22 - i * 0.032})`;
        ctx.lineWidth = 1;
        ctx.arc(0, 0, 90 + i * 48, Math.PI * 0.08, Math.PI * (1.65 - i * 0.05));
        ctx.stroke();
      }
      for (let i = 0; i < 16; i += 1) {
        ctx.rotate(Math.PI / 8);
        ctx.beginPath();
        ctx.moveTo(132, 0);
        ctx.lineTo(170, 0);
        ctx.strokeStyle = 'rgba(34,211,238,.14)';
        ctx.stroke();
      }
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
      const layers = [
        [height * 0.48, 130, '#12354b', 0.5, 0.5],
        [height * 0.58, 96, '#0b2639', 0.75, 1.1],
        [height * 0.67, 72, '#061724', 0.94, 1.7],
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
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = 'rgba(34,211,238,.22)';
      ctx.lineWidth = 2;
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
        ctx.fillStyle = active ? 'rgba(251,191,36,.88)' : 'rgba(34,211,238,.34)';
        ctx.arc(x, yy, active ? 7 : 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = active ? 'rgba(251,191,36,.42)' : 'rgba(34,211,238,.18)';
        ctx.arc(x, yy, active ? 28 + Math.sin(t * 0.004) * 3 : 16, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();
    }

    function drawWeather() {
      const snow = refs.current.weather === 'snow';
      ctx.save();
      ctx.globalCompositeOperation = snow ? 'screen' : 'lighter';
      particles.forEach((p) => {
        const pointer = pointerRef.current;
        const influence = pointer.down ? 1.55 : 0.86;
        p.life += 0.03;
        p.x += p.vx * influence + (pointer.x - 0.5) * (snow ? 1.1 : 3.4);
        p.y += p.vy * influence;
        if (snow) p.x += Math.sin(p.life + p.y * 0.02) * 0.75;
        if (p.y > height + 26 || p.x < -90 || p.x > width + 90) Object.assign(p, makeParticle(Math.random() * width, -28));
        if (snow) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(226,251,255,${p.a})`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = `rgba(78,220,255,${p.a})`;
          ctx.lineWidth = p.r;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 18 - (pointer.x - 0.5) * 18, p.y - 32);
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
      const t = now;
      drawBackground(t);
      drawWeather();
      const keys = keysRef.current;
      let manual = 0;
      if (keys.has('ArrowRight') || keys.has('KeyD')) manual += 0.06;
      if (keys.has('ArrowLeft') || keys.has('KeyA')) manual -= 0.06;
      const targetX = width * (0.14 + refs.current.scrollProgress * 0.72) + (pointerRef.current.x - 0.5) * 32 + manual * width;
      player.x += (targetX - player.x) * 0.055;
      const jump = (keys.has('Space') || keys.has('ArrowUp') || keys.has('KeyW')) ? Math.sin(t * 0.01) * 36 - 24 : Math.sin(t * 0.0025) * 5;
      const y = groundY(player.x) + jump;
      if (refs.current.mode === 'snowboard') drawSnowboarder(t, player.x, y);
      else drawSoccer(t, player.x, y - 10);
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

function FloatingHud({ mode, setMode, weather, setWeather, weatherPower, setWeatherPower, activeSector, liveWeather, timeProfile, weatherStatus, weatherError, onUseLiveWeather }) {
  const weatherLabel = liveWeather?.condition || (weather === 'snow' ? 'Manual snow' : 'Manual energy-rain');
  const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <aside className="floating-hud" aria-label="Exploration controls">
      <div className="hud-status">
        <span>Explorer layer</span>
        <strong>{sectors[activeSector]?.label || 'Signal'} sector</strong>
        <small>{timeProfile.label} · {weatherLabel}</small>
      </div>
      <div className="hud-row">
        <button className={mode === 'snowboard' ? 'active' : ''} onClick={() => setMode('snowboard')}>Snowboard</button>
        <button className={mode === 'soccer' ? 'active' : ''} onClick={() => setMode('soccer')}>Soccer</button>
      </div>
      <div className="hud-row">
        <button className={weather === 'snow' ? 'active' : ''} onClick={() => setWeather(weather === 'snow' ? 'streaks' : 'snow')}>{weather === 'snow' ? 'Snow' : 'Energy rain'}</button>
        <button onClick={onUseLiveWeather}>{weatherStatus === 'loading' ? 'Syncing…' : 'Live local weather'}</button>
      </div>
      <label className="intensity-control"><span>Atmosphere</span><input type="range" min="0.35" max="1.7" step="0.05" value={weatherPower} onChange={(e) => setWeatherPower(Number(e.target.value))} /></label>
      <small className="hud-note">{liveWeather ? `${Math.round(liveWeather.temp)}° · wind ${Math.round(liveWeather.wind)} km/h · ${liveWeather.location}` : weatherError || `${timeLabel} local browser time · weather optional`}</small>
    </aside>
  );
}

function MissionMap({ activeSector }) {
  return (
    <aside className="mission-map" aria-label="Portfolio sector map">
      <strong>Explore</strong>
      {sectors.map((sector, index) => (
        <a key={sector.id} href={`#${sector.id}`} className={activeSector === index ? 'active' : ''}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <em>{sector.label}</em>
        </a>
      ))}
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

function applyWeatherToScene(kind, setMode, setWeather, setWeatherPower) {
  if (kind === 'snow') {
    setMode('snowboard');
    setWeather('snow');
    setWeatherPower(1.32);
  } else if (kind === 'rain' || kind === 'storm') {
    setMode('soccer');
    setWeather('streaks');
    setWeatherPower(kind === 'storm' ? 1.6 : 1.22);
  } else {
    setWeather('streaks');
    setWeatherPower(0.85);
  }
}

export default function App() {
  const now = useLiveClock();
  const timeProfile = useMemo(() => getTimeProfile(now), [now]);
  const scrollProgress = usePageProgress();
  const activeSector = useActiveSector();
  const [mode, setMode] = useState('snowboard');
  const [weather, setWeather] = useState('snow');
  const [weatherPower, setWeatherPower] = useState(1);
  const [weatherStatus, setWeatherStatus] = useState('idle');
  const [weatherError, setWeatherError] = useState('');
  const [liveWeather, setLiveWeather] = useState(null);
  useTiltCard();

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
        const next = {
          condition,
          kind,
          temp: current.temperature_2m ?? 0,
          wind: current.wind_speed_10m ?? 0,
          location: data.timezone || 'local timezone',
          code: current.weather_code,
        };
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
    <main className={`site ${mode} ${timeProfile.key}`}>
      <style>{styles}</style>
      <WorldBackdrop mode={mode} weather={weather} weatherPower={weatherPower} activeSector={activeSector} scrollProgress={scrollProgress} timeProfile={timeProfile} />
      <WorldForeground mode={mode} weather={weather} weatherPower={weatherPower} scrollProgress={scrollProgress} />
      <div className="foreground-fade" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <header className="nav-shell">
        <a className="brand" href="#hero"><ProfileAvatar /><span><strong>{profile.name}</strong><small>Engineer · Builder · Problem Solver</small></span></a>
        <nav>{sectors.slice(1).map((sector) => <a key={sector.id} href={`#${sector.id}`}>{sector.label}</a>)}</nav>
        <a className="nav-cta" href={profile.resume} download>Download CV</a>
      </header>

      <MissionMap activeSector={activeSector} />
      <FloatingHud mode={mode} setMode={setMode} weather={weather} setWeather={setWeather} weatherPower={weatherPower} setWeatherPower={setWeatherPower} activeSector={activeSector} liveWeather={liveWeather} timeProfile={timeProfile} weatherStatus={weatherStatus} weatherError={weatherError} onUseLiveWeather={useLiveWeather} />

      <section id="hero" className="sector hero-sector">
        <div className="hero-copy panel-card" data-tilt>
          <p className="eyebrow">// Backend · Game Tech · Data Systems</p>
          <h1>{profile.name}</h1>
          <h2><span>{profile.title}</span> {profile.tagline}</h2>
          <p className="hero-lede">I build reliable backend services, content pipelines, and developer-facing tools that connect cloud-native engineering with game-production workflows. For Guerrilla-facing work, I lead with scalable Java / Spring Boot service architecture, async job orchestration, and observability-minded design, while using Aegis to show how those systems connect to animation and content creation workflows.</p>
          <div className="hero-actions"><a className="primary-action" href="#projects">Start exploring →</a><a href={profile.resume} download>Download Resume</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div>
          <div className="metrics-row"><span><strong>Java</strong><small>Spring Boot services</small></span><span><strong>Kafka</strong><small>Async pipelines</small></span><span><strong>Redis</strong><small>Job state</small></span><span><strong>Unreal</strong><small>Tooling context</small></span></div>
        </div>
        <div className="exploration-note panel-card" data-tilt>
          <strong>Simple exploration layer</strong>
          <p>Scroll or use the sector map. The rider travels with the portfolio.</p>
          <small>Keyboard: Alt + ↑ / ↓ jumps between sections. WASD or arrows add a subtle interaction.</small>
        </div>
      </section>

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

      <footer id="contact" className="sector footer-shell panel-card" data-tilt>
        <div><ProfileAvatar /><h2>Let’s build online systems and game technology that scale.</h2><p>{profile.location}</p></div>
        <div className="contact-links"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div>
      </footer>
      <div className="scroll-finish-spacer" aria-hidden="true" />
    </main>
  );
}

const styles = `
:root{color-scheme:dark;font-size:80%;--bg:#02070d;--panel:rgba(5,13,22,.76);--line:rgba(133,239,255,.18);--cyan:#22d3ee;--cyan2:#67e8f9;--gold:#fbbf24;--text:#f8fafc;--muted:#9fb0c7;--radius:32px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-width:320px;background:var(--bg);color:var(--text)}a{color:inherit;text-decoration:none}button,input{font:inherit}button{cursor:pointer}.site{position:relative;min-height:92vh;overflow:hidden;background:#02070d}.world-backdrop{position:fixed;inset:0;z-index:0;display:block;background:#02070d}.world-foreground{position:fixed;inset:0;z-index:18;display:block;pointer-events:none;filter:drop-shadow(0 0 18px rgba(34,211,238,.22))}.foreground-fade{position:fixed;left:0;right:0;bottom:0;height:17vh;z-index:17;pointer-events:none;background:linear-gradient(to bottom,rgba(2,7,13,0) 0%,rgba(2,7,13,.08) 42%,rgba(2,7,13,.34) 74%,rgba(2,7,13,.9) 100%);backdrop-filter:blur(.7px);mask-image:linear-gradient(to bottom,transparent 0,#000 42%,#000 100%)}.ambient-grid{pointer-events:none;position:fixed;inset:0;z-index:2;opacity:.78;background:linear-gradient(rgba(34,211,238,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.035) 1px,transparent 1px),radial-gradient(circle at 80% 20%,rgba(34,211,238,.14),transparent 28rem);background-size:72px 72px,72px 72px,auto;mask-image:linear-gradient(to bottom,#000 0%,#000 84%,transparent 100%)}.site:after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(2,7,13,.92) 0%,rgba(2,7,13,.46) 42%,rgba(2,7,13,.2) 100%),linear-gradient(to bottom,rgba(2,7,13,.28),rgba(2,7,13,.05) 42%,rgba(2,7,13,.92))}.nav-shell{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:50;display:flex;align-items:center;justify-content:space-between;gap:20px;width:min(1240px,calc(100% - 28px));padding:12px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(0,0,0,.6);backdrop-filter:blur(22px);box-shadow:0 24px 90px rgba(0,0,0,.42)}.brand{display:flex;align-items:center;gap:12px;min-width:max-content}.brand strong{display:block;letter-spacing:.18em;text-transform:uppercase;font-size:.82rem}.brand small{display:block;margin-top:2px;color:var(--muted);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase}.nav-shell nav{display:flex;gap:clamp(12px,2.4vw,30px);color:#dbeafe;font-size:.92rem}.nav-shell nav a{opacity:.84;transition:.2s}.nav-shell nav a:hover{color:var(--cyan);opacity:1}.nav-cta{border:1px solid rgba(251,191,36,.36);background:rgba(251,191,36,.1);color:#fde68a;padding:11px 18px;border-radius:999px;font-weight:900;white-space:nowrap}.mark{position:relative;width:38px;height:42px;filter:drop-shadow(0 0 15px rgba(34,211,238,.65));flex:0 0 auto}.mark i{position:absolute;bottom:2px;left:50%;width:4px;height:40px;border-radius:999px;background:linear-gradient(#fef3c7,#22d3ee);transform:translateX(-50%)}.mark i:nth-child(2){left:28%;height:32px;transform:rotate(-25deg)}.mark i:nth-child(3){left:72%;height:32px;transform:rotate(25deg)}.panel-card{position:relative;border:1px solid var(--line);background:linear-gradient(145deg,rgba(7,17,27,.82),rgba(3,8,14,.68));border-radius:var(--radius);box-shadow:0 28px 90px rgba(0,0,0,.38);backdrop-filter:blur(22px);overflow:hidden;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .16s ease,border-color .2s ease,opacity .28s ease;will-change:transform,opacity}.panel-card:before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(34,211,238,.16),transparent 42%);opacity:.78;pointer-events:none}.sector,.shortcut-rail{position:relative;z-index:8;width:min(1080px,calc(100% - 120px));margin:0 auto}.hero-sector{min-height:100vh;display:grid;grid-template-columns:minmax(0,.96fr) minmax(260px,.48fr);gap:20px;align-items:end;padding:118px 0 58px}.hero-copy{padding:clamp(22px,4vw,42px)}.eyebrow{margin:0 0 16px;color:var(--cyan);font-size:.78rem;font-weight:1000;letter-spacing:.22em;text-transform:uppercase}.hero-copy h1{margin:0;font-size:clamp(3.6rem,8.4vw,7.4rem);line-height:.82;letter-spacing:-.09em;text-transform:uppercase;text-shadow:0 0 28px rgba(103,232,249,.12)}.hero-copy h2{margin:26px 0 0;max-width:780px;font-size:clamp(1.45rem,2.6vw,2.55rem);line-height:1.05;letter-spacing:-.055em}.hero-copy h2 span,.footer-shell h2{color:var(--gold)}.hero-lede{margin:24px 0 0;max-width:720px;color:#d8e4f5;font-size:1.06rem;line-height:1.78}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.hero-actions a{border:1px solid rgba(133,239,255,.24);background:rgba(8,20,31,.78);padding:14px 18px;border-radius:17px;font-weight:1000}.hero-actions .primary-action{border:0;background:linear-gradient(135deg,#67e8f9,#22d3ee);color:#021018;box-shadow:0 0 38px rgba(34,211,238,.28)}.metrics-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:28px}.metrics-row span{border:1px solid rgba(133,239,255,.16);background:rgba(0,0,0,.28);border-radius:18px;padding:14px}.metrics-row strong{display:block}.metrics-row small{display:block;margin-top:4px;color:var(--muted)}.exploration-note{align-self:end;padding:24px}.exploration-note strong{display:block;color:#fde68a;font-size:1.25rem}.exploration-note p,.exploration-note small{display:block;color:#cbd5e1;line-height:1.65;margin:10px 0 0}.floating-hud{position:fixed;right:18px;bottom:18px;z-index:45;width:min(280px,calc(100% - 36px));border:1px solid rgba(133,239,255,.2);border-radius:24px;background:rgba(0,0,0,.5);backdrop-filter:blur(22px);box-shadow:0 22px 80px rgba(0,0,0,.46);padding:14px}.hud-status span{display:block;color:var(--cyan2);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:1000}.hud-status strong{display:block;margin-top:5px}.hud-status small,.hud-note{display:block;color:#cbd5e1;line-height:1.45}.hud-row{display:flex;gap:8px;margin-top:10px}.hud-row button{flex:1;border:1px solid rgba(133,239,255,.2);border-radius:999px;background:rgba(6,15,24,.82);color:#e0f7ff;padding:9px 10px;font-weight:900}.hud-row button.active{border-color:rgba(34,211,238,.8);background:rgba(34,211,238,.16);box-shadow:0 0 18px rgba(34,211,238,.2)}.intensity-control{display:flex;align-items:center;gap:10px;margin-top:12px;color:#dbeafe;font-weight:900}.intensity-control input{width:100%;accent-color:var(--cyan)}.hud-note{margin-top:10px}.mission-map{position:fixed;left:12px;top:50%;transform:translateY(-50%) scale(.9);transform-origin:left center;z-index:44;display:grid;gap:8px;padding:11px;border:1px solid rgba(133,239,255,.18);border-radius:26px;background:rgba(0,0,0,.42);backdrop-filter:blur(18px)}.mission-map strong{display:block;justify-self:start;color:#fde68a;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;padding:0 4px 4px}.mission-map a{display:grid;grid-template-columns:34px auto;align-items:center;gap:8px;min-width:128px;padding:6px;border:1px solid rgba(133,239,255,.12);border-radius:14px;background:rgba(4,12,20,.7);position:relative}.mission-map a span{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(133,239,255,.16);border-radius:50%;font-size:.75rem;font-weight:1000}.mission-map a em{font-style:normal;white-space:nowrap;color:#dffbff;opacity:.88}.mission-map a.active{background:rgba(251,191,36,.12);border-color:rgba(251,191,36,.35)}.mission-map a.active span{border-color:rgba(251,191,36,.4);color:#fde68a}.mission-map a.active em{color:#fde68a}.profile-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid rgba(133,239,255,.4);box-shadow:0 0 0 2px rgba(4,12,20,.8),0 0 18px rgba(34,211,238,.18);flex:0 0 auto}.shortcut-rail{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-top:-20px;margin-bottom:42px}.shortcut-card{padding:18px;min-height:128px}.shortcut-card span{display:block;color:var(--cyan);font-size:.72rem;text-transform:uppercase;letter-spacing:.16em;font-weight:1000}.shortcut-card strong{display:block;margin-top:10px;font-size:1.1rem;line-height:1.2}.shortcut-card em{display:block;margin-top:14px;color:#fde68a;font-style:normal;font-weight:1000}.section-wrap{padding:62px 0;scroll-margin-top:120px}.section-heading{margin-bottom:28px}.section-heading.split{display:grid;grid-template-columns:1fr minmax(280px,440px);gap:30px;align-items:end}.section-heading h2{margin:0;font-size:clamp(1.8rem,3.3vw,3.15rem);line-height:.96;letter-spacing:-.06em}.section-heading p:not(.eyebrow){margin:0;color:#cbd5e1;line-height:1.72}.project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.project-card{padding:24px}.card-glow{position:absolute;inset:auto -20% -40% auto;width:60%;height:70%;background:radial-gradient(circle,rgba(34,211,238,.18),transparent 60%);pointer-events:none}.project-topline{display:flex;align-items:center;gap:12px}.project-topline span{display:grid;place-items:center;width:48px;height:48px;border:1px solid rgba(251,191,36,.36);border-radius:16px;color:#fde68a;font-weight:1000}.project-topline em{color:var(--cyan);font-style:normal;text-transform:uppercase;letter-spacing:.12em;font-size:.76rem;font-weight:1000}.project-visual{margin:20px 0;min-height:155px;border:1px solid rgba(133,239,255,.14);border-radius:26px;background:radial-gradient(circle at 50% 40%,rgba(34,211,238,.15),transparent 55%),rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:18px}.flow-node{display:flex;align-items:center;gap:8px}.flow-node span{display:grid;place-items:center;min-width:72px;min-height:54px;border:1px solid rgba(133,239,255,.22);border-radius:16px;color:#dffbff;text-transform:uppercase;font-weight:1000;font-size:.72rem}.flow-node em{color:var(--cyan);font-style:normal}.project-card h3{margin:0;font-size:clamp(1.45rem,2.1vw,2.05rem);letter-spacing:-.04em}.project-card p{color:#d4e3f3;line-height:1.7}.chip-row{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.chip{display:inline-flex;align-items:center;border:1px solid rgba(133,239,255,.17);border-radius:999px;background:rgba(3,10,17,.74);color:#e6fbff;padding:8px 11px;font-size:.82rem;font-weight:850}.project-card ul{margin:18px 0 0;padding:0;list-style:none;display:grid;gap:10px;color:#cbd5e1}.project-card li:before{content:"✓";color:var(--cyan);margin-right:8px}.architecture-panel{padding:38px;border-radius:38px}.pipeline{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px}.pipeline article{position:relative;border:1px solid rgba(133,239,255,.15);background:rgba(0,0,0,.28);border-radius:24px;padding:18px;min-height:190px}.pipeline article:not(:last-child):after{content:"→";position:absolute;right:-13px;top:50%;transform:translateY(-50%);color:var(--cyan);font-weight:1000;z-index:3}.pipeline span{color:var(--gold);font-weight:1000}.pipeline h3{font-size:1rem}.pipeline p{color:#afc2d7;line-height:1.5;font-size:.9rem}.experience-grid,.stack-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.experience-card,.stack-grid article{padding:24px}.experience-card>p:first-child{margin:0;color:var(--gold);font-weight:900}.experience-card h3{margin:14px 0 4px;font-size:1.7rem}.experience-card h4{margin:0;color:var(--cyan)}.experience-card p:last-child{color:#cbd5e1;line-height:1.72}.stack-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.stack-grid h3{margin:0 0 16px;color:#dffbff}.stack-grid div{display:flex;flex-wrap:wrap;gap:8px}.footer-shell{z-index:8;display:flex;align-items:flex-start;justify-content:space-between;gap:26px;margin:62px auto 20px;padding:32px}.footer-shell>div:first-child{display:grid;justify-items:start;gap:10px}.footer-shell h2{margin:4px 0 0;font-size:clamp(1.8rem,3vw,3rem);letter-spacing:-.045em}.footer-shell p{color:#cbd5e1}.scroll-finish-spacer{position:relative;z-index:3;height:min(42vh,420px)}.contact-links{display:grid;gap:10px;min-width:min(420px,100%)}.contact-links a{border:1px solid rgba(133,239,255,.17);background:rgba(0,0,0,.28);border-radius:18px;padding:14px 16px}@media (max-width:1180px){.mission-map{display:none}.sector,.shortcut-rail{width:min(100% - 44px,1040px)}.hero-sector{grid-template-columns:1fr}.shortcut-rail{grid-template-columns:repeat(2,minmax(0,1fr))}.project-grid,.experience-grid{grid-template-columns:1fr}.stack-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline article:not(:last-child):after{display:none}}@media (max-width:760px){:root{font-size:85%}.world-foreground{z-index:7;opacity:.65}.nav-shell{align-items:flex-start;border-radius:28px}.nav-shell nav{display:none}.nav-cta{display:none}.sector,.shortcut-rail{width:min(100% - 22px,1240px)}.hero-sector{padding-top:120px}.hero-copy{padding:28px 20px}.hero-copy h1{font-size:clamp(3.4rem,18vw,6rem)}.metrics-row,.stack-grid,.section-heading.split,.shortcut-rail{grid-template-columns:1fr}.floating-hud{position:relative;right:auto;bottom:auto;width:min(100% - 22px,1240px);height:auto;margin:0 auto 30px;z-index:22;border-radius:28px}.floating-hud .hud-status strong,.floating-hud .hud-status small,.floating-hud .hud-row,.floating-hud .intensity-control,.floating-hud .hud-note{opacity:1;visibility:visible;max-height:220px}.footer-shell{display:block}.contact-links{margin-top:20px}.project-card{padding:18px}.project-visual{justify-content:flex-start}.flow-node span{min-width:62px}}`;
