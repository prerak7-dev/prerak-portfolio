import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import loreGuidePersona from '../../content/lore-guide-persona.webp';
import {
  projectArchitectures,
  spatialChapters,
  spatialPortfolio,
  spatialThemes,
} from '../data/spatialPortfolioData.js';
import { getCinematicAssets } from '../data/cinematicAssets.js';
import { createAssetPath, createMailtoHref, getSafeLinkProps } from '../security/contentSecurity.js';
import { CASE_STUDY_TIMING, useCaseStudySequence } from '../hooks/useCaseStudySequence.js';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import { CinematicEnvironment } from './CinematicEnvironment.jsx';
import { ProfileAvatar } from './primitives.jsx';
import { SpatialWorld } from './SpatialWorld.jsx';

const FIELD_POSITIONS = {
  photography: '18% 48%',
  writing: '51% 76%',
  travel: '76% 58%',
};
const SCENE_RENDER_RADIUS = 0.56;
const INTRO_GATE_SETTLE_MS = 1320;
const LORE_TEXT_REVEAL_DELAY_MS = 620;
const INTRO_COPY_EXIT_START = 0.19;
const INTRO_COPY_EXIT_RANGE = 0.22;
const INTRO_GATE_EXIT_START = INTRO_COPY_EXIT_START + INTRO_COPY_EXIT_RANGE + 0.01;
const INTRO_GATE_EXIT_RANGE = 0.1;

function smoothUnit(value) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function sceneStyle(index, scenePosition) {
  const distance = index - scenePosition;
  const absoluteDistance = Math.abs(distance);
  const focusRadius = 0.14;
  const passageRadius = 0.52;
  const proximity = Math.max(0, Math.min(1, (passageRadius - absoluteDistance) / (passageRadius - focusRadius)));
  const visibility = proximity * proximity * proximity * (proximity * (proximity * 6 - 15) + 10);
  const precise = (value, precision = 1000) => Math.round(value * precision) / precision;
  return {
    '--scene-opacity': precise(visibility, 10000),
    '--scene-shift': `${precise(Math.max(-90, Math.min(90, distance * 115)))}px`,
    '--scene-shift-x': `${precise(Math.max(-70, Math.min(70, distance * 85)))}px`,
    '--scene-scale': precise(0.975 + visibility * 0.025, 10000),
    '--scene-reveal': precise(visibility, 10000),
  };
}

function TrianglePointer({ direction = 'right' }) {
  return <span className={`triangle-pointer ${direction}`} aria-hidden="true" />;
}

function useTypewriter(text, speed = 14, enabled = true, delay = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!enabled || !text) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return undefined;
    }
    let timer = 0;
    const delayTimer = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setCount((value) => {
          if (value >= text.length) {
            window.clearInterval(timer);
            return value;
          }
          return value + 1;
        });
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(delayTimer);
      window.clearInterval(timer);
    };
  }, [delay, enabled, speed, text]);

  return enabled ? text.slice(0, count) : '';
}

function useTypewriterSequence(parts, speed = 14, enabled = true, delay = 0) {
  const fullText = parts.join('');
  const typedText = useTypewriter(fullText, speed, enabled, delay);
  let offset = 0;
  let activeSegment = -1;
  const segments = parts.map((part, index) => {
    const segment = typedText.slice(offset, offset + part.length);
    offset += part.length;
    if (activeSegment === -1 && typedText.length < offset) activeSegment = index;
    return segment;
  });

  return { activeSegment, isComplete: typedText.length === fullText.length, segments };
}

function useReversibleTypewriterSequence(parts, {
  phase,
  enterDelay = 0,
  exitDelay = 0,
  enterSpeed = 8,
  exitSpeed = 4,
}) {
  const fullText = parts.join('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let delayTimer = 0;
    let interval = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (phase === 'idle') {
      setCount(0);
      return undefined;
    }
    if (phase === 'visible') {
      setCount(fullText.length);
      return undefined;
    }

    const entering = phase === 'entering';
    if (entering) setCount(0);
    const target = entering ? fullText.length : 0;
    const delay = entering ? enterDelay : exitDelay;
    const speed = entering ? enterSpeed : exitSpeed;

    delayTimer = window.setTimeout(() => {
      if (reducedMotion) {
        setCount(target);
        return;
      }
      interval = window.setInterval(() => {
        setCount((current) => {
          const next = entering
            ? Math.min(target, current + 1)
            : Math.max(target, current - 1);
          if (next === target) window.clearInterval(interval);
          return next;
        });
      }, speed);
    }, reducedMotion ? 0 : delay);

    return () => {
      window.clearTimeout(delayTimer);
      window.clearInterval(interval);
    };
  }, [enterDelay, enterSpeed, exitDelay, exitSpeed, fullText, phase]);

  let offset = 0;
  const segments = parts.map((part) => {
    const segment = fullText.slice(0, count).slice(offset, offset + part.length);
    offset += part.length;
    return segment;
  });
  const activeSegment = phase === 'exiting'
    ? Math.max(0, segments.reduce((latest, segment, index) => (segment ? index : latest), 0))
    : Math.max(0, parts.findIndex((_, index) => count < parts.slice(0, index + 1).join('').length));
  const isAnimating = (phase === 'entering' && count < fullText.length)
    || (phase === 'exiting' && count > 0);

  return { activeSegment, isAnimating, segments };
}

function CaseTypeCaret({ activeSegment, index, isAnimating }) {
  return isAnimating && activeSegment === index
    ? <span className="case-type-caret" aria-hidden="true" />
    : null;
}

function caseStudyTimingStyle(entryDelay = 0) {
  return {
    '--case-artifact-enter-delay': `${entryDelay + CASE_STUDY_TIMING.identityDelay + 320}ms`,
    '--case-artifact-exit-delay': `${CASE_STUDY_TIMING.identityExitDelay}ms`,
    '--case-topology-enter-delay': `${entryDelay + CASE_STUDY_TIMING.topologySlabsDelay}ms`,
    '--case-topology-exit-delay': `${CASE_STUDY_TIMING.topologySlabsExitDelay}ms`,
  };
}

function ChapterRail({ activeIndex, collapsed, onCollapsedChange, onSelect }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 760px)').matches) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const list = listRef.current;
      const activeTab = list?.querySelector('[role="tab"][aria-selected="true"]');
      if (!list || !activeTab) return;
      const target = activeTab.offsetLeft - (list.clientWidth - activeTab.offsetWidth) / 2;
      list.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex]);

  const scrollTabs = (direction) => {
    listRef.current?.scrollBy({ left: direction * Math.max(180, listRef.current.clientWidth * 0.7), behavior: 'smooth' });
  };

  return (
    <nav className={`chapter-rail ${collapsed ? 'is-collapsed' : ''}`} aria-label="Portfolio chapters">
      <button
        type="button"
        className="chapter-collapse"
        aria-label={collapsed ? 'Expand chapter navigation' : 'Collapse chapter navigation'}
        aria-expanded={!collapsed}
        onClick={() => onCollapsedChange(!collapsed)}
      >
        <TrianglePointer direction={collapsed ? 'right' : 'left'} />
      </button>
      <button type="button" className="chapter-scroll-arrow previous" aria-label="Previous chapters" onClick={() => scrollTabs(-1)}>
        <TrianglePointer direction="left" />
      </button>
      <div ref={listRef} className="chapter-rail-list" role="tablist" aria-label="Spatial portfolio chapters">
        {spatialChapters.map((chapter, index) => (
          <button
            key={chapter.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => onSelect(index)}
          >
            <span>{chapter.index}</span>
            <strong>{chapter.navLabel}</strong>
          </button>
        ))}
      </div>
      <button type="button" className="chapter-scroll-arrow next" aria-label="Next chapters" onClick={() => scrollTabs(1)}>
        <TrianglePointer direction="right" />
      </button>
    </nav>
  );
}

function ScrollableTabStrip({ activeIndex, className, label, children }) {
  const listRef = useRef(null);

  const scrollTabs = (direction) => {
    listRef.current?.scrollBy({ left: direction * Math.max(150, listRef.current.clientWidth * 0.72), behavior: 'smooth' });
  };

  useEffect(() => {
    if (!window.matchMedia('(max-width: 760px)').matches) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const list = listRef.current;
      const activeTab = list?.querySelector('[role="tab"][aria-selected="true"]');
      if (!list || !activeTab) return;
      const target = activeTab.offsetLeft - (list.clientWidth - activeTab.offsetWidth) / 2;
      list.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex]);

  return (
    <div className={`scrollable-tab-shell ${className}-shell`}>
      <button type="button" className="embedded-tab-arrow previous" aria-label={`Previous ${label}`} onClick={() => scrollTabs(-1)}>
        <TrianglePointer direction="left" />
      </button>
      <div ref={listRef} className={className} role="tablist" aria-label={label}>{children}</div>
      <button type="button" className="embedded-tab-arrow next" aria-label={`Next ${label}`} onClick={() => scrollTabs(1)}>
        <TrianglePointer direction="right" />
      </button>
    </div>
  );
}

function ArchiveHeader({ profile, onIntro }) {
  return (
    <header className="archive-header">
      <button type="button" className="archive-identity" onClick={onIntro} aria-label="Return to introduction">
        <ProfileAvatar />
        <span>
          <strong>{profile.name}</strong>
          <small>Backend / Game Technology</small>
        </span>
      </button>
      <div className="archive-header-actions">
        <a href={profile.github} {...getSafeLinkProps(profile.github)}>GitHub</a>
        <a className="archive-header-primary" href={profile.resume} download>Resume</a>
      </div>
    </header>
  );
}

function SpatialHud({ activeIndex, theme, onThemeChange, atmospherePower, onAtmospherePowerChange, onThemeChosen }) {
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(max-width: 1120px), (max-height: 780px)').matches);
  const activeTheme = spatialThemes.find((item) => item.id === theme) || spatialThemes[0];

  return (
    <aside className={`spatial-hud ${collapsed ? 'is-collapsed' : ''}`} aria-label="Scene wayfinder">
      <button
        type="button"
        className="hud-collapse"
        aria-label={collapsed ? 'Expand explorer HUD' : 'Collapse explorer HUD'}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((value) => !value)}
      >
        <TrianglePointer direction={collapsed ? 'up' : 'down'} />
      </button>
      <div className="spatial-hud-content">
        <div className="hud-coordinate">
          <span>Wayfinder</span>
          <strong>{spatialChapters[activeIndex].navLabel}</strong>
          <small>{activeTheme.label} passage</small>
        </div>
        <div className="hud-theme-row" role="group" aria-label="Environment theme">
          {spatialThemes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={theme === item.id ? 'active' : ''}
              aria-pressed={theme === item.id}
              title={item.label}
              onClick={() => {
                onThemeChosen();
                onThemeChange(item.id);
              }}
            >
              <i className={`theme-swatch ${item.id}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="hud-atmosphere-row">
          <span>Air and weather</span>
          <strong>{activeTheme.atmosphere}</strong>
        </div>
        <label className="hud-intensity">
          <span>Presence</span>
          <input
            type="range"
            min="0.35"
            max="1.7"
            step="0.05"
            value={atmospherePower}
            onChange={(event) => {
              onAtmospherePowerChange(Number(event.target.value));
            }}
          />
        </label>
      </div>
    </aside>
  );
}

function LoreGuide({ activeIndex, introGuideReady, themePromptCompleted, theme }) {
  const [collapsed, setCollapsed] = useState(true);
  const [textAnimationReady, setTextAnimationReady] = useState(false);

  useEffect(() => {
    if (!introGuideReady) {
      setCollapsed(true);
      setTextAnimationReady(false);
      return undefined;
    }

    setCollapsed(false);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(
      () => setTextAnimationReady(true),
      reducedMotion ? 0 : LORE_TEXT_REVEAL_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [introGuideReady]);

  const message = !introGuideReady
    ? ''
    : themePromptCompleted
      ? spatialChapters[activeIndex].guide
      : 'Before I guide you through my work, start with the Wayfinder. Switch between Monochrome, Fall, Spring, and Winter, then choose the atmosphere you want to carry through my portfolio.';
  const typed = useTypewriter(message, 14, textAnimationReady);
  const guideState = !introGuideReady ? 'is-awaiting' : textAnimationReady ? 'is-ready' : 'is-opening';

  return (
    <aside className={`spatial-lore-guide ${collapsed ? 'is-collapsed' : ''} ${guideState} theme-${theme}`} aria-label="Lore navigation guide">
      <div className="lore-medallion" aria-hidden="true"><img src={loreGuidePersona} alt="" /></div>
      <div className="lore-parchment" aria-hidden={collapsed}><p>{typed}{textAnimationReady && <span className="lore-caret" aria-hidden="true" />}</p></div>
      <button
        type="button"
        className="lore-toggle"
        aria-label={!introGuideReady ? 'Lore guide waiting for introduction' : collapsed ? 'Expand lore guide' : 'Collapse lore guide'}
        aria-expanded={!collapsed}
        disabled={!introGuideReady}
        onClick={() => setCollapsed((value) => !value)}
      >
        <TrianglePointer direction={collapsed ? 'right' : 'left'} />
      </button>
    </aside>
  );
}

function ChapterHeading({ chapter, signal }) {
  return (
    <div className="chapter-heading">
      <div>
        <p>Chapter {chapter.index}: {chapter.eyebrow}</p>
        <h2>{chapter.title}</h2>
      </div>
      {signal && <span>{signal}</span>}
    </div>
  );
}

function CaseStudyChapterHeading({ isActive }) {
  const chapter = spatialChapters[1];
  const copy = [
    `Chapter ${chapter.index}: ${chapter.eyebrow}`,
    chapter.title,
    'Repositories, decisions, outcomes',
  ];
  const { activeSegment, isComplete, segments } = useTypewriterSequence(
    copy,
    10,
    isActive,
    CASE_STUDY_TIMING.sectionHeadingDelay,
  );
  const caret = (index) => (
    isActive && !isComplete && activeSegment === index
      ? <span className="case-type-caret" aria-hidden="true" />
      : null
  );

  return (
    <div className="chapter-heading case-study-heading">
      <div>
        <p aria-label={copy[0]}>{segments[0]}{caret(0)}</p>
        <h2 aria-label={copy[1]}>{segments[1]}{caret(1)}</h2>
      </div>
      <span aria-label={copy[2]}>{segments[2]}{caret(2)}</span>
    </div>
  );
}

function IntroChapter({ isActive, profile, onEnter, onGuideReady }) {
  const nameStageRef = useRef(null);
  const copyStageRef = useRef(null);
  const gateEntryRef = useRef(null);
  const nameMotionRef = useRef({
    controlled: false,
    first: -1,
    last: -1,
    scale: -1,
    x: '',
    y: '',
    copyX: '',
    copyY: '',
    gateOpacity: -1,
    gateScale: -1,
    gateCounterX: '',
    gateCounterY: '',
  });
  const nameParts = profile.name.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  const copy = [
    'Chicago: the path begins here',
    'Backend / Full-Stack Engineer',
    'building game-technology systems.',
    'Reliable services, content pipelines, Unreal tooling, and telemetry systems designed to make complex production workflows observable and usable.',
  ];
  const { activeSegment, isComplete, segments } = useTypewriterSequence(copy, 14, isActive, 1900);
  const caret = (index) => (
    isActive && !isComplete && activeSegment === index
      ? <span className="intro-caret" aria-hidden="true" />
      : null
  );

  useEffect(() => {
    if (!isActive || !isComplete) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(onGuideReady, reducedMotion ? 0 : INTRO_GATE_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [isActive, isComplete, onGuideReady]);

  useLayoutEffect(() => subscribeSpatialMotion(({ progress, scenePosition }) => {
    const node = nameStageRef.current;
    const copyNode = copyStageRef.current;
    const gateEntryNode = gateEntryRef.current;
    if (!node) return;

    const rawIntroPosition = Math.max(
      0,
      Math.min(1, progress * Math.max(1, spatialChapters.length - 1)),
    );
    const runtime = nameMotionRef.current;

    if (!runtime.controlled && rawIntroPosition > 0.003) {
      runtime.controlled = true;
      node.classList.add('is-scroll-controlled');
    }
    if (!runtime.controlled) return;

    // Preserve the entrance's 53% stagger: first name retreats, then surname follows.
    const firstExit = smoothUnit(rawIntroPosition / 0.16);
    const lastExit = smoothUnit((rawIntroPosition - 0.085) / 0.16);
    if (
      firstExit !== runtime.first
      && (firstExit === 0 || firstExit === 1 || Math.abs(firstExit - runtime.first) > 0.001)
    ) {
      runtime.first = firstExit;
      node.style.setProperty('--intro-first-shift', `${(firstExit * 125).toFixed(3)}%`);
    }
    if (
      lastExit !== runtime.last
      && (lastExit === 0 || lastExit === 1 || Math.abs(lastExit - runtime.last) > 0.001)
    ) {
      runtime.last = lastExit;
      node.style.setProperty('--intro-last-shift', `${(lastExit * 125).toFixed(3)}%`);
    }

    const gatewayProgress = smoothUnit(scenePosition / 0.82);
    const gateScale = 1.005 + gatewayProgress * 0.24;
    const gateX = Math.sin(scenePosition * 0.72) * 0.34;
    const gateY = Math.cos(scenePosition * 0.54) * 0.1 - gatewayProgress * 0.7;
    if (Math.abs(gateScale - runtime.scale) > 0.0001) {
      runtime.scale = gateScale;
      node.style.setProperty('--intro-gate-scale', gateScale.toFixed(5));
    }
    const nextX = `${gateX.toFixed(4)}%`;
    if (nextX !== runtime.x) {
      runtime.x = nextX;
      node.style.setProperty('--intro-gate-x', nextX);
    }
    const nextY = `${gateY.toFixed(4)}%`;
    if (nextY !== runtime.y) {
      runtime.y = nextY;
      node.style.setProperty('--intro-gate-y', nextY);
    }

    const sceneShiftX = Math.max(-70, Math.min(70, -scenePosition * 85));
    const sceneShiftY = Math.max(-90, Math.min(90, -scenePosition * 115));

    if (copyNode) {
      const copyExit = smoothUnit((rawIntroPosition - INTRO_COPY_EXIT_START) / INTRO_COPY_EXIT_RANGE);
      const travelVw = window.innerWidth <= 760 ? 108 : 48;
      const copyX = `calc(${(-sceneShiftX).toFixed(3)}px + ${(copyExit * travelVw).toFixed(3)}vw)`;
      const copyY = `${(-sceneShiftY).toFixed(3)}px`;
      if (copyX !== runtime.copyX) {
        runtime.copyX = copyX;
        copyNode.style.setProperty('--intro-copy-exit-x', copyX);
      }
      if (copyY !== runtime.copyY) {
        runtime.copyY = copyY;
        copyNode.style.setProperty('--intro-copy-exit-y', copyY);
      }
    }

    if (gateEntryNode) {
      const gateExit = smoothUnit((rawIntroPosition - INTRO_GATE_EXIT_START) / INTRO_GATE_EXIT_RANGE);
      const gateOpacity = Math.pow(1 - gateExit, 1.15);
      const gateScale = 1 + gateExit * 0.28;
      if (Math.abs(gateOpacity - runtime.gateOpacity) > 0.001) {
        runtime.gateOpacity = gateOpacity;
        gateEntryNode.style.setProperty('--intro-gate-scroll-opacity', gateOpacity.toFixed(4));
      }
      if (Math.abs(gateScale - runtime.gateScale) > 0.001) {
        runtime.gateScale = gateScale;
        gateEntryNode.style.setProperty('--intro-gate-scroll-scale', gateScale.toFixed(4));
      }
      const gateCounterX = `${(-sceneShiftX).toFixed(3)}px`;
      const gateCounterY = `${(-sceneShiftY).toFixed(3)}px`;
      if (gateCounterX !== runtime.gateCounterX) {
        runtime.gateCounterX = gateCounterX;
        gateEntryNode.style.setProperty('--intro-gate-counter-x', gateCounterX);
      }
      if (gateCounterY !== runtime.gateCounterY) {
        runtime.gateCounterY = gateCounterY;
        gateEntryNode.style.setProperty('--intro-gate-counter-y', gateCounterY);
      }
      gateEntryNode.style.pointerEvents = gateExit > 0.08 ? 'none' : 'auto';
    }
  }), []);

  return (
    <div className={`intro-chapter-content ${isActive ? 'is-active' : ''} ${isComplete ? 'is-copy-complete' : ''}`} aria-live="off">
      <h1 ref={nameStageRef} className="intro-gate-name" aria-label={profile.name}>
        <span className="intro-name-word intro-name-first" aria-hidden="true"><span>{firstName}</span></span>
        <span className="intro-name-word intro-name-last" aria-hidden="true"><span>{lastName}</span></span>
      </h1>
      <div ref={copyStageRef} className="intro-copy-stage">
        <p className="intro-coordinate" aria-label={copy[0]}>{segments[0]}{caret(0)}</p>
        <p className="intro-role" aria-label={`${copy[1]} ${copy[2]}`}>
          <span>{segments[1]}{caret(1)}</span>
          <br />
          <span>{segments[2]}{caret(2)}</span>
        </p>
        <p className="intro-summary" aria-label={copy[3]}>{segments[3]}{caret(3)}</p>
        <div className="intro-actions">
          <a href={profile.resume} download>Download resume</a>
        </div>
        <div className="intro-status" aria-hidden="true">
          <span>Three crafted systems</span>
          <span>Scroll to walk the path</span>
        </div>
      </div>
      <div className="intro-gate-entry">
        <div ref={gateEntryRef} className="intro-gate-scroll-shell">
          <span className="intro-gate-backlight" aria-hidden="true" />
          <button className="intro-gate-cta" type="button" onClick={onEnter}>Enter the archive</button>
        </div>
      </div>
    </div>
  );
}

function CompactStack({ entryDelay, project }) {
  const groups = spatialPortfolio.projectStacks[project.architectureKey] || [];
  return (
    <div className="compact-stack" aria-label={`${project.title} technical stack`}>
      {groups.slice(0, 3).map(([title, items], index) => (
        <div
          key={title}
          style={{
            '--stack-enter-delay': `${entryDelay + CASE_STUDY_TIMING.stackDelay + index * CASE_STUDY_TIMING.stackStagger}ms`,
            '--stack-exit-delay': `${CASE_STUDY_TIMING.stackExitDelay + (2 - index) * CASE_STUDY_TIMING.stackExitStagger}ms`,
          }}
        >
          <span>{title}</span>
          <p>{items.slice(0, 4).join(' / ')}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectTopology({
  cycle,
  entryDelay,
  isInteractive,
  onOpenArchitecture,
  project,
  sequencePhase,
  theme,
}) {
  const architecture = projectArchitectures[project.architectureKey];
  const assets = getCinematicAssets(theme);
  const slab = createAssetPath(import.meta.env.BASE_URL, assets.topologySlab);
  const rope = createAssetPath(import.meta.env.BASE_URL, assets.topologyRope);
  const topologyCopy = ['System topology', architecture.label];
  const { activeSegment, isAnimating, segments } = useReversibleTypewriterSequence(topologyCopy, {
    phase: sequencePhase,
    enterDelay: entryDelay + CASE_STUDY_TIMING.topologyHeadingDelay,
    exitDelay: CASE_STUDY_TIMING.topologyHeadingExitDelay,
    enterSpeed: 9,
    exitSpeed: 4,
  });
  const controlsEnabled = isInteractive && sequencePhase === 'visible';

  return (
    <aside
      className={`project-topology-stage case-sequence-${sequencePhase} ${controlsEnabled ? 'is-interactive' : ''}`}
      style={{
        ...caseStudyTimingStyle(entryDelay),
        '--topology-slab-image': `url("${slab}")`,
        '--topology-rope-image': `url("${rope}")`,
      }}
      aria-label={`${architecture.label} flowchart`}
      aria-hidden={!controlsEnabled}
      {...(!controlsEnabled ? { inert: '' } : {})}
    >
      <div className="topology-heading">
        <span aria-label={topologyCopy[0]}>
          {segments[0]}
          <CaseTypeCaret activeSegment={activeSegment} index={0} isAnimating={isAnimating} />
        </span>
        <strong aria-label={topologyCopy[1]}>
          {segments[1]}
          <CaseTypeCaret activeSegment={activeSegment} index={1} isAnimating={isAnimating} />
        </strong>
      </div>
      <ol className="project-flowchart" key={`${project.title}-${cycle}`} style={{ '--flow-count': architecture.steps.length }}>
        {architecture.steps.map(([title, description], index) => (
          <li key={title} style={{ '--flow-index': index }}>
            <button
              type="button"
              title={description}
              aria-label={`${String(index + 1).padStart(2, '0')}. ${title}: ${description}`}
              onClick={onOpenArchitecture}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
            </button>
          </li>
        ))}
      </ol>
      <CompactStack entryDelay={entryDelay} project={project} />
    </aside>
  );
}

function ProjectIdentityCopy({ entryDelay, project, sequencePhase }) {
  const copy = [project.number, project.eyebrow, project.title, project.summary];
  const { activeSegment, isAnimating, segments } = useReversibleTypewriterSequence(copy, {
    phase: sequencePhase,
    enterDelay: entryDelay + CASE_STUDY_TIMING.identityDelay,
    exitDelay: CASE_STUDY_TIMING.identityExitDelay,
    enterSpeed: 7,
    exitSpeed: 3,
  });
  const caret = (index) => (
    <CaseTypeCaret activeSegment={activeSegment} index={index} isAnimating={isAnimating} />
  );

  return (
    <header className="project-identity-copy" aria-live="off">
      <div className="project-overline">
        <span aria-label={copy[0]}>{segments[0]}{caret(0)}</span>
        <em aria-label={copy[1]}>{segments[1]}{caret(1)}</em>
      </div>
      <h3 aria-label={copy[2]}>{segments[2]}{caret(2)}</h3>
      <p className="project-summary" aria-label={copy[3]}>{segments[3]}{caret(3)}</p>
    </header>
  );
}

function ProjectsChapter({
  cycle,
  displayedProjectIndex,
  entryDelay,
  isActive,
  onOpenArchitecture,
  onProjectChange,
  selectedProjectIndex,
  sequencePhase,
  theme,
}) {
  const project = spatialPortfolio.projects[displayedProjectIndex];
  const proof = project.caseStudy.filter(([label]) => ['Problem', 'Role', 'Decision', 'Result'].includes(label));
  const artifact = createAssetPath(
    import.meta.env.BASE_URL,
    getCinematicAssets(theme).artifacts[project.architectureKey],
  );

  return (
    <div
      className={`chapter-content projects-chapter-content ${isActive ? 'is-sequence-active' : ''}`}
      style={caseStudyTimingStyle(entryDelay)}
    >
      <CaseStudyChapterHeading isActive={isActive} />
      <ScrollableTabStrip activeIndex={selectedProjectIndex} className="project-switcher" label="Engineering case studies">
        {spatialPortfolio.projects.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={index === selectedProjectIndex}
            className={index === selectedProjectIndex ? 'active' : ''}
            style={{
              '--case-tab-enter-delay': `${CASE_STUDY_TIMING.tabsDelay + index * CASE_STUDY_TIMING.tabStagger}ms`,
            }}
            onClick={() => onProjectChange(index)}
          >
            <span>{item.number}</span>
            <strong>{item.title.replace('Aegis ', '')}</strong>
          </button>
        ))}
      </ScrollableTabStrip>
      <div
        className={`project-spatial-grid project-case-layout case-sequence-${sequencePhase}`}
        key={`${project.title}-${cycle}`}
        aria-busy={sequencePhase !== 'visible'}
        {...(sequencePhase !== 'visible' ? { inert: '' } : {})}
      >
        <ProjectIdentityCopy entryDelay={entryDelay} project={project} sequencePhase={sequencePhase} />
        <div className={`project-artifact-stage artifact-${project.architectureKey}`} aria-hidden="true">
          <div className="artifact-orbit artifact-orbit-outer" />
          <div className="artifact-orbit artifact-orbit-inner" />
          <img src={artifact} alt="" draggable="false" />
          <span>{project.number} / physical system model</span>
        </div>
        <dl className="project-proof-grid">
          {proof.map(([label, text], index) => (
            <div
              key={label}
              style={{
                '--proof-enter-delay': `${entryDelay + CASE_STUDY_TIMING.proofDelay + index * CASE_STUDY_TIMING.proofStagger}ms`,
                '--proof-exit-delay': `${CASE_STUDY_TIMING.proofExitDelay + (proof.length - 1 - index) * CASE_STUDY_TIMING.proofExitStagger}ms`,
              }}
            >
              <dt>{label}</dt><dd>{text}</dd>
            </div>
          ))}
        </dl>
        <div className="project-action-row">
          <a href={project.actions[0].href} {...getSafeLinkProps(project.actions[0].href)}>View repository</a>
          <button type="button" onClick={onOpenArchitecture}>Open topology</button>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDialog({ project, onClose }) {
  const closeRef = useRef(null);
  const architecture = projectArchitectures[project.architectureKey];
  const stackGroups = spatialPortfolio.projectStacks[project.architectureKey] || [];

  useEffect(() => {
    const previousFocus = document.activeElement;
    document.body.classList.add('archive-dialog-open');
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('archive-dialog-open');
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="architecture-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="architecture-dialog" role="dialog" aria-modal="true" aria-labelledby="architecture-dialog-title">
        <header>
          <div><p>{project.number} / Developer topology</p><h2 id="architecture-dialog-title">{project.title}</h2></div>
          <button ref={closeRef} type="button" className="dialog-close" aria-label="Close architecture" onClick={onClose}><span aria-hidden="true" /></button>
        </header>
        <p className="architecture-dialog-summary">{architecture.description}</p>
        <dl className="architecture-case-study">
          {project.caseStudy.map(([label, text]) => (
            <div key={label}><dt>{label}</dt><dd>{text}</dd></div>
          ))}
        </dl>
        <div className="architecture-step-grid">
          {architecture.steps.map(([title, text], index) => (
            <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        {architecture.placement && (
          <div className="architecture-placement">
            <span>Recommended Anim Blueprint placement</span>
            <div>{architecture.placement.map((step, index) => <strong key={step}>{step}{index < architecture.placement.length - 1 ? '  >' : ''}</strong>)}</div>
          </div>
        )}
        <div className="architecture-notes">
          {architecture.command && <code>{architecture.command}</code>}
          <ul>{architecture.notes.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
        <div className="architecture-stack-grid" aria-label={`${project.title} technical stack`}>
          {stackGroups.map(([title, items]) => (
            <div key={title}><span>{title}</span><p>{items.join(' / ')}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TimelineChapter({ chapterIndex, items, selectedIndex, onSelect, showStack = false }) {
  const selected = items[selectedIndex] || items[0];
  const bounds = items.map((item) => item.meta.split('/')[0].trim());

  return (
    <div className="chapter-content timeline-chapter-content">
      <ChapterHeading chapter={spatialChapters[chapterIndex]} signal={chapterIndex === 2 ? 'Production craft and growth' : 'Study, practice, continuation'} />
      <div className="spatial-timeline">
        <div className="timeline-axis" aria-hidden="true"><span>{bounds[bounds.length - 1]}</span><i /><span>{bounds[0]}</span></div>
        <div className="timeline-waypoints" role="tablist" aria-label={`${spatialChapters[chapterIndex].navLabel} timeline`}>
          {items.map((item, index) => (
            <button
              key={`${item.meta}-${item.title}`}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              className={index === selectedIndex ? 'active' : ''}
              onClick={() => onSelect(index)}
            >
              <span>{item.meta.split('/')[0].trim()}</span>
              <i />
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </button>
          ))}
        </div>
        <article className="timeline-focus-card" key={selected.title}>
          <p>{selected.meta}</p>
          <h3>{selected.title}</h3>
          <strong>{selected.subtitle}</strong>
          <span>{selected.body}</span>
          <ul>{selected.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </article>
      </div>
      {showStack && (
        <div className="professional-stack-strip">
          {spatialPortfolio.stackGroups.map(([title, stack]) => (
            <div key={title}><span>{title}</span><p>{stack.slice(0, 5).join(' / ')}</p></div>
          ))}
        </div>
      )}
    </div>
  );
}

function MediaArtwork({ item, index, title, theme }) {
  if (item.src && item.type === 'video') {
    return <video controls preload="metadata" poster={item.poster || undefined} aria-label={item.alt}><source src={item.src} /></video>;
  }
  if (item.src) return <img src={item.src} alt={item.alt} />;
  const collectionKey = title.toLowerCase().includes('writing')
    ? 'writing'
    : title.toLowerCase().includes('travel') || title.toLowerCase().includes('adventure')
      ? 'travel'
      : 'photography';
  const filename = getCinematicAssets(theme).field;
  const position = FIELD_POSITIONS[collectionKey];
  const artworkStyle = {
    '--field-image': `url("${createAssetPath(import.meta.env.BASE_URL, filename)}")`,
    '--field-position': position,
  };
  return (
    <div className={`field-note-placeholder field-${collectionKey}`} style={artworkStyle} aria-label={item.alt}>
      <span>{String(index + 1).padStart(2, '0')}</span>
      <i />
      <strong>{title}</strong>
      <small>Curated field plate</small>
    </div>
  );
}

function PersonalChapter({ activeCollectionIndex, onCollectionChange, theme }) {
  const [activeMediaByCollection, setActiveMediaByCollection] = useState([0, 0, 0]);
  const collection = spatialPortfolio.personalProjects[activeCollectionIndex];
  const activeMediaIndex = activeMediaByCollection[activeCollectionIndex] || 0;
  const activeMedia = collection.media[activeMediaIndex] || collection.media[0];

  const selectMedia = (index) => {
    setActiveMediaByCollection((current) => current.map((value, collectionIndex) => (
      collectionIndex === activeCollectionIndex ? index : value
    )));
  };

  return (
    <div className="chapter-content personal-chapter-content">
      <ChapterHeading chapter={spatialChapters[4]} signal="Photography, essays, journeys" />
      <ScrollableTabStrip activeIndex={activeCollectionIndex} className="personal-switcher" label="Personal collections">
        {spatialPortfolio.personalProjects.map((item, index) => (
          <button key={item.meta} type="button" role="tab" aria-selected={index === activeCollectionIndex} className={index === activeCollectionIndex ? 'active' : ''} onClick={() => onCollectionChange(index)}>
            <span>0{index + 1}</span><strong>{item.meta}</strong>
          </button>
        ))}
      </ScrollableTabStrip>
      <div className="personal-spatial-grid">
        <article className="personal-feature" key={`${collection.meta}-${activeMediaIndex}`}>
          <div className="personal-feature-art"><MediaArtwork item={activeMedia} index={activeMediaIndex} title={collection.meta} theme={theme} /></div>
          <div className="personal-feature-caption"><span>{activeMedia.meta}</span><p>{activeMedia.caption}</p></div>
        </article>
        <aside className="personal-collection-copy">
          <p>{collection.subtitle}</p>
          <h3>{collection.title}</h3>
          <span>{collection.body}</span>
          <div className="personal-media-index">
            {collection.media.map((item, index) => (
              <button key={`${item.meta}-${index}`} type="button" className={index === activeMediaIndex ? 'active' : ''} aria-pressed={index === activeMediaIndex} onClick={() => selectMedia(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span><strong>{item.meta}</strong>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ContactChapter({ profile }) {
  return (
    <div className="chapter-content contact-chapter-content">
      <ChapterHeading chapter={spatialChapters[5]} signal="Chicago, Amsterdam, or remote" />
      <div className="contact-transmission">
        <p>Open to backend, platform, online-services, tools, and game-technology conversations.</p>
        <a className="contact-email" href={createMailtoHref(profile.email)}>{profile.email}</a>
        <div className="contact-grid">
          <a href={profile.github} {...getSafeLinkProps(profile.github)}><span>01</span><strong>GitHub</strong><small>Source and repositories</small></a>
          <a href={profile.linkedin} {...getSafeLinkProps(profile.linkedin)}><span>02</span><strong>LinkedIn</strong><small>Professional record</small></a>
          <a href={profile.resume} download><span>03</span><strong>Resume</strong><small>PDF / current</small></a>
        </div>
      </div>
    </div>
  );
}

function ArchiveProgress({ activeIndex }) {
  const valueRef = useRef(null);

  useLayoutEffect(() => subscribeSpatialMotion(({ progress }) => {
    if (valueRef.current) {
      valueRef.current.textContent = String(Math.round(progress * 100)).padStart(3, '0');
    }
  }), []);

  return (
    <div className="archive-progress" aria-hidden="true">
      <span>{spatialChapters[activeIndex].index}</span>
      <div>{spatialChapters.map((chapter, index) => <i key={chapter.id} className={index <= activeIndex ? 'active' : ''} />)}</div>
      <strong ref={valueRef}>000</strong>
    </div>
  );
}

const MemoArchiveHeader = memo(ArchiveHeader);
const MemoChapterRail = memo(ChapterRail);
const MemoLoreGuide = memo(LoreGuide);
const MemoSpatialHud = memo(SpatialHud);
const MemoArchitectureDialog = memo(ArchitectureDialog);

export function SpatialExperience({
  profile,
  activeIndex,
  goToChapter,
  theme,
  setTheme,
  atmospherePower,
  setAtmospherePower,
  experienceVisible,
  onWorldReady,
  onEnvironmentReady,
}) {
  const [themePromptCompleted, setThemePromptCompleted] = useState(false);
  const [introGuideReady, setIntroGuideReady] = useState(false);
  const [activeProfessionalIndex, setActiveProfessionalIndex] = useState(0);
  const [activeEducationIndex, setActiveEducationIndex] = useState(0);
  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0);
  const [architectureProject, setArchitectureProject] = useState(null);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const sceneRefs = useRef([]);
  const projectsActive = experienceVisible && activeIndex === 1;
  const {
    cycle: projectCycle,
    displayedIndex: displayedProjectIndex,
    entryDelay: projectEntryDelay,
    phase: projectSequencePhase,
    selectedIndex: selectedProjectIndex,
    selectProject,
  } = useCaseStudySequence(projectsActive, spatialPortfolio.projects.length);
  const handleIntro = useCallback(() => goToChapter(0), [goToChapter]);
  const handleIntroGuideReady = useCallback(() => setIntroGuideReady(true), []);
  const handleThemeChosen = useCallback(() => setThemePromptCompleted(true), []);
  const handleArchitectureClose = useCallback(() => setArchitectureProject(null), []);
  const handleArchitectureOpen = useCallback(() => {
    setArchitectureProject(spatialPortfolio.projects[displayedProjectIndex]);
  }, [displayedProjectIndex]);

  const scenes = useMemo(() => [
    <IntroChapter isActive={experienceVisible && activeIndex === 0} profile={profile} onEnter={() => goToChapter(1)} onGuideReady={handleIntroGuideReady} />,
    <ProjectsChapter
      cycle={projectCycle}
      displayedProjectIndex={displayedProjectIndex}
      entryDelay={projectEntryDelay}
      isActive={projectsActive}
      onProjectChange={selectProject}
      onOpenArchitecture={handleArchitectureOpen}
      selectedProjectIndex={selectedProjectIndex}
      sequencePhase={projectSequencePhase}
      theme={theme}
    />,
    <TimelineChapter chapterIndex={2} items={spatialPortfolio.professionalTimeline} selectedIndex={activeProfessionalIndex} onSelect={setActiveProfessionalIndex} showStack />,
    <TimelineChapter chapterIndex={3} items={spatialPortfolio.educationTimeline} selectedIndex={activeEducationIndex} onSelect={setActiveEducationIndex} />,
    <PersonalChapter activeCollectionIndex={activeCollectionIndex} onCollectionChange={setActiveCollectionIndex} theme={theme} />,
    <ContactChapter profile={profile} />,
  ], [activeCollectionIndex, activeEducationIndex, activeIndex, activeProfessionalIndex, displayedProjectIndex, experienceVisible, goToChapter, handleArchitectureOpen, handleIntroGuideReady, profile, projectCycle, projectEntryDelay, projectSequencePhase, projectsActive, selectProject, selectedProjectIndex, theme]);
  const systemsOverlay = useMemo(() => (
    <ProjectTopology
      cycle={projectCycle}
      entryDelay={projectEntryDelay}
      isInteractive={projectsActive}
      onOpenArchitecture={handleArchitectureOpen}
      project={spatialPortfolio.projects[displayedProjectIndex]}
      sequencePhase={projectSequencePhase}
      theme={theme}
    />
  ), [displayedProjectIndex, handleArchitectureOpen, projectCycle, projectEntryDelay, projectSequencePhase, projectsActive, theme]);
  const environmentStyle = useMemo(() => {
    const visualAssets = getCinematicAssets(theme);
    return {
      '--surface-image': `url("${createAssetPath(import.meta.env.BASE_URL, visualAssets.surface)}")`,
      '--control-slab-image': `url("${createAssetPath(import.meta.env.BASE_URL, visualAssets.controlSlab)}")`,
      '--wayfinder-slab-image': `url("${createAssetPath(import.meta.env.BASE_URL, visualAssets.wayfinderSlab)}")`,
      '--lore-slab-image': `url("${createAssetPath(import.meta.env.BASE_URL, visualAssets.loreSlab)}")`,
      '--text-distress-mask': `url("${createAssetPath(import.meta.env.BASE_URL, 'cinematic/ui/text-distress-mask.png')}")`,
    };
  }, [theme]);

  useLayoutEffect(() => subscribeSpatialMotion(({ scenePosition }) => {
    sceneRefs.current.forEach((node, index) => {
      if (!node) return;
      const isNear = Math.abs(index - scenePosition) < SCENE_RENDER_RADIUS;
      node.classList.toggle('near', isNear);
      if (!isNear) return;
      const styles = sceneStyle(index, scenePosition);
      Object.entries(styles).forEach(([name, value]) => {
        node.style.setProperty(name, String(value));
      });
    });
  }), []);

  return (
    <div className={`archive-viewport theme-${theme} rail-${railCollapsed ? 'collapsed' : 'expanded'}`} style={environmentStyle}>
      <CinematicEnvironment theme={theme} onReady={onEnvironmentReady} systemsOverlay={systemsOverlay} />
      <div className="archive-color-grade" aria-hidden="true" />
      <SpatialWorld theme={theme} atmospherePower={atmospherePower} onReady={onWorldReady} />
      <div className="archive-grain" aria-hidden="true" />
      <MemoArchiveHeader profile={profile} onIntro={handleIntro} />
      <MemoChapterRail activeIndex={activeIndex} collapsed={railCollapsed} onCollapsedChange={setRailCollapsed} onSelect={goToChapter} />
      <main className="archive-scene-stack" aria-live="polite">
        {scenes.map((scene, index) => (
          <section
            key={spatialChapters[index].id}
            ref={(node) => { sceneRefs.current[index] = node; }}
            className={`archive-scene scene-${spatialChapters[index].id} ${index === 0 ? 'near' : ''} ${index === activeIndex ? 'active' : ''}`}
            style={sceneStyle(index, index === 0 ? 0 : -1)}
            aria-hidden={index !== activeIndex}
            {...(index !== activeIndex ? { inert: '' } : {})}
          >
            {scene}
          </section>
        ))}
      </main>
      <MemoLoreGuide activeIndex={activeIndex} introGuideReady={introGuideReady} themePromptCompleted={themePromptCompleted} theme={theme} />
      <MemoSpatialHud
        activeIndex={activeIndex}
        theme={theme}
        onThemeChange={setTheme}
        atmospherePower={atmospherePower}
        onAtmospherePowerChange={setAtmospherePower}
        onThemeChosen={handleThemeChosen}
      />
      <ArchiveProgress activeIndex={activeIndex} />
      {architectureProject && <MemoArchitectureDialog project={architectureProject} onClose={handleArchitectureClose} />}
    </div>
  );
}
