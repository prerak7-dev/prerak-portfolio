import { useEffect, useRef } from 'react';
import { sectors } from '../data/portfolioData.js';
import { clamp } from '../utils/weather.js';

export function WorldBackdrop({ mode, weather, weatherPower, activeSector, scrollProgress, timeProfile, fallTheme, springTheme, winterTheme }) {
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
      drawSpatialConstellation(t);
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

    function drawSpatialConstellation(t) {
      const fall = refs.current.fallTheme;
      const spring = refs.current.springTheme;
      const winter = refs.current.winterTheme;
      const pointer = pointerRef.current;
      const ink = winter ? '90,150,184' : spring ? '11,89,72' : fall ? '73,19,35' : '245,245,245';
      const accent = winter ? '255,255,255' : spring ? '184,245,95' : fall ? '255,227,111' : '255,255,255';
      const originX = width * (0.52 + (pointer.x - 0.5) * 0.04);
      const originY = height * (0.5 + (pointer.y - 0.5) * 0.035);
      const focal = Math.min(width, height) * 1.08;
      const spin = t * 0.00032;

      const project = (point) => {
        const scale = focal / (focal + point.z);
        return {
          x: originX + point.x * scale,
          y: originY + point.y * scale,
          scale,
        };
      };

      const rotateY = (point, angle) => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
          x: point.x * cos - point.z * sin,
          y: point.y,
          z: point.x * sin + point.z * cos,
        };
      };

      const cubePoints = (size, center, angle) => {
        const half = size / 2;
        return [
          [-half, -half, -half], [half, -half, -half], [half, half, -half], [-half, half, -half],
          [-half, -half, half], [half, -half, half], [half, half, half], [-half, half, half],
        ].map(([x, y, z]) => {
          const rotated = rotateY({ x, y, z }, angle);
          return { x: rotated.x + center.x, y: rotated.y + center.y, z: rotated.z + center.z };
        });
      };

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let z = -340; z <= 440; z += 80) {
        const a = project({ x: -width * 0.38, y: height * 0.16, z });
        const b = project({ x: width * 0.38, y: height * 0.16, z });
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${ink},${0.09 + Math.max(0, a.scale - 0.55) * 0.08})`;
        ctx.lineWidth = Math.max(0.4, a.scale * 1.2);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (let x = -420; x <= 420; x += 70) {
        const a = project({ x, y: height * 0.16, z: -340 });
        const b = project({ x, y: height * 0.16, z: 440 });
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${ink},.07)`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      [
        { size: 165, center: { x: -210, y: -50, z: 10 }, speed: 1 },
        { size: 118, center: { x: 220, y: 28, z: -70 }, speed: -1.35 },
        { size: 82, center: { x: 45, y: -172, z: 90 }, speed: 1.8 },
      ].forEach((cube, cubeIndex) => {
        const points = cubePoints(cube.size, cube.center, spin * cube.speed + cubeIndex);
        ctx.strokeStyle = `rgba(${cubeIndex === 0 ? accent : ink},${cubeIndex === 0 ? 0.34 : 0.22})`;
        ctx.lineWidth = cubeIndex === 0 ? 1.8 : 1.25;
        edges.forEach(([from, to]) => {
          const a = project(points[from]);
          const b = project(points[to]);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        });
        points.forEach((point) => {
          const p = project(point);
          ctx.beginPath();
          ctx.fillStyle = `rgba(${accent},${0.16 * p.scale})`;
          ctx.arc(p.x, p.y, Math.max(1.4, 3.5 * p.scale), 0, Math.PI * 2);
          ctx.fill();
        });
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


export function WorldForeground({ mode, weather, weatherPower, scrollProgress }) {
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
