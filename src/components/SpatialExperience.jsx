import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  projectArchitectures,
  spatialChapters,
  spatialPortfolio,
  spatialThemes,
} from '../data/spatialPortfolioData.js';
import { CINEMATIC_ASSET_GEOMETRY, getCinematicAssets } from '../data/cinematicAssets.js';
import { getChapterCelestialAsset } from '../data/chapterRailCelestialData.js';
import { getLoreAvatarState } from '../data/loreAvatarData.js';
import { createAssetPath, createMailtoHref, getSafeLinkProps } from '../security/contentSecurity.js';
import { CASE_STUDY_TIMING, useCaseStudySequence } from '../hooks/useCaseStudySequence.js';
import { useChapterRailChoreography } from '../hooks/useChapterRailChoreography.js';
import {
  getGatewayTransition,
  subscribeGatewayTransition,
} from '../state/gatewayTransitionStore.js';
import {
  getCinematicReadiness,
  subscribeCinematicReadiness,
} from '../state/cinematicReadinessStore.js';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';
import {
  setCachedInlineStyle,
  setCachedStyleProperty,
  toggleCachedClass,
} from '../utils/motionPerformance.js';
import { CinematicEnvironment } from './CinematicEnvironment.jsx';
import { LoreAvatarContourField } from './LoreAvatarContourField.jsx';
import { ProfileAvatar } from './primitives.jsx';
import { SpatialWorld } from './SpatialWorld.jsx';
import { BoundaryFilamentField, WayfinderCosmicField } from './WayfinderCosmicField.jsx';
const FIELD_POSITIONS = {
  photography: '18% 48%',
  writing: '51% 76%',
  travel: '76% 58%',
};
const CORE_PILLARS = Object.freeze([
  Object.freeze({ index: 'I', title: 'Services', detail: 'Reliable backends and asynchronous content pipelines' }),
  Object.freeze({ index: 'II', title: 'Unreal', detail: 'Production tooling and procedural runtime systems' }),
  Object.freeze({ index: 'III', title: 'Telemetry', detail: 'Observable systems and actionable operational evidence' }),
]);
const SCENE_RENDER_RADIUS = 0.86;
const INTRO_GATE_SETTLE_MS = 1320;
const LORE_TEXT_REVEAL_DELAY_MS = 620;
const INTRO_NAME_EXIT_START = 0.035;
const INTRO_NAME_EXIT_STAGGER = 0.125;
const INTRO_NAME_EXIT_RANGE = 0.11;
const INTRO_NAME_BURIED_SHIFT = 145;
const INTRO_GATE_CLOSED_EPSILON = 0.0005;
const INTRO_COPY_EXIT_START = 0.19;
const INTRO_COPY_EXIT_RANGE = 0.22;
const INTRO_GATE_EXIT_START = INTRO_COPY_EXIT_START + INTRO_COPY_EXIT_RANGE + 0.01;
const INTRO_GATE_EXIT_RANGE = 0.1;
const INTRO_NARRATION_PARTS = Object.freeze([
  'Imagine.',
  'Achieve.',
  'Inspire.',
  'Tequilla!',
  'Full-Stack Engineer,',
  'Wonderer,',
  'Story Teller',
  'Download resume',
  '...OR dare to waste a part of your precious life to know this awesome guy and SCROLL',
]);
const INTRO_NARRATION_ENTER_SPEEDS = Object.freeze([56, 54, 54, 60, 34, 34, 34, 38, 23]);
const INTRO_NARRATION_ENTER_PAUSES = Object.freeze([520, 620, 680, 1150, 620, 430, 980, 760, 0]);
const INTRO_NARRATION_EXIT_SPEEDS = Object.freeze([12, 12, 12, 12, 10, 10, 10, 10, 9]);
const INTRO_NARRATION_EXIT_PAUSES = Object.freeze([0, 70, 70, 90, 80, 90, 110, 90, 80]);
function smoothUnit(value) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function sceneStyle(index, scenePosition) {
  const distance = index - scenePosition;
  const absoluteDistance = Math.abs(distance);
  const focusRadius = 0.22;
  const passageRadius = 0.82;
  const proximity = Math.max(0, Math.min(1, (passageRadius - absoluteDistance) / (passageRadius - focusRadius)));
  const visibility = proximity * proximity * proximity * (proximity * (proximity * 6 - 15) + 10);
  const precise = (value, precision = 1000) => Math.round(value * precision) / precision;
  return {
    '--scene-opacity': precise(visibility, 10000),
    '--scene-shift': `${precise(Math.max(-58, Math.min(58, distance * 72)))}px`,
    '--scene-shift-x': `${precise(Math.max(-38, Math.min(38, distance * 48)))}px`,
    '--scene-scale': precise(0.988 + visibility * 0.012, 10000),
    '--scene-reveal': precise(visibility, 10000),
  };
}

function TrianglePointer({ direction = 'right' }) {
  return <span className={`triangle-pointer ${direction}`} aria-hidden="true" />;
}

function ScenicText({ as: Element = 'span', children, className = '', ...props }) {
  return (
    <Element
      {...props}
      className={`scenic-text ${className}`.trim()}
    >
      {children}
    </Element>
  );
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

function useNarratedTypewriterSequence(parts, {
  enabled,
  enterDelay = 0,
  enterSpeeds,
  enterPauses,
  exitDelay = 0,
  exitSpeeds,
  exitPauses,
}) {
  const fullText = useMemo(() => parts.join(''), [parts]);
  const boundaries = useMemo(() => {
    let length = 0;
    return parts.map((part) => {
      length += part.length;
      return length;
    });
  }, [parts]);
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    let cancelled = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = enabled ? fullText.length : 0;
    const entering = enabled;

    if (reducedMotion) {
      countRef.current = target;
      setCount(target);
      return undefined;
    }
    if (countRef.current === target) return undefined;

    const findSegment = (characterIndex) => {
      const index = boundaries.findIndex((boundary) => characterIndex < boundary);
      return index < 0 ? boundaries.length - 1 : index;
    };
    const punctuationPause = (character) => {
      if (/[.!?]/.test(character)) return 150;
      if (/[,;:]/.test(character)) return 80;
      return 0;
    };
    const initialDelay = entering && countRef.current === 0 ? enterDelay : exitDelay;
    let nextStepAt = performance.now() + initialDelay;

    const tick = (timestamp) => {
      if (cancelled) return;
      let current = countRef.current;
      let changed = false;
      let steps = 0;

      while (timestamp >= nextStepAt && current !== target && steps < 4) {
        if (entering) {
          const next = Math.min(target, current + 1);
          const characterIndex = next - 1;
          const segmentIndex = findSegment(characterIndex);
          const segmentPause = next === boundaries[segmentIndex]
            ? (enterPauses[segmentIndex] || 0)
            : 0;
          nextStepAt += (enterSpeeds[segmentIndex] || 36)
            + punctuationPause(fullText[characterIndex])
            + segmentPause;
          current = next;
        } else {
          const characterIndex = current - 1;
          const segmentIndex = findSegment(characterIndex);
          const previousBoundary = segmentIndex > 0 ? boundaries[segmentIndex - 1] : 0;
          const next = Math.max(target, current - 1);
          const segmentPause = next === previousBoundary
            ? (exitPauses[segmentIndex] || 0)
            : 0;
          nextStepAt += (exitSpeeds[segmentIndex] || 10) + segmentPause;
          current = next;
        }
        changed = true;
        steps += 1;
      }

      if (changed) {
        countRef.current = current;
        setCount(current);
      }
      if (current !== target) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [boundaries, enabled, enterDelay, enterPauses, enterSpeeds, exitDelay, exitPauses, exitSpeeds, fullText]);

  let offset = 0;
  const visibleText = fullText.slice(0, count);
  const segments = parts.map((part) => {
    const segment = visibleText.slice(offset, offset + part.length);
    offset += part.length;
    return segment;
  });
  const exactBoundary = boundaries.indexOf(count);
  const activeSegment = exactBoundary >= 0
    ? exactBoundary
    : Math.max(0, boundaries.findIndex((boundary) => count < boundary));
  const isAnimating = enabled ? count < fullText.length : count > 0;

  return {
    activeSegment,
    count,
    isAnimating,
    isComplete: count === fullText.length,
    segments,
  };
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

function ThemeAssetCrossfade({ src, alt = '', className = '', width, height }) {
  const sourceRef = useRef(src);
  const [currentSource, setCurrentSource] = useState(src);
  const [leavingSource, setLeavingSource] = useState(null);

  useEffect(() => {
    const previousSource = sourceRef.current;
    if (previousSource === src) return undefined;

    let cancelled = false;
    let cleanupTimer = 0;
    const candidate = new Image();
    const reveal = () => {
      if (cancelled) return;
      sourceRef.current = src;
      setLeavingSource(previousSource);
      setCurrentSource(src);
      cleanupTimer = window.setTimeout(() => {
        if (!cancelled) setLeavingSource(null);
      }, 880);
    };

    candidate.src = src;
    if (candidate.complete && candidate.naturalWidth) {
      candidate.decode?.().catch(() => undefined).finally(reveal);
    } else {
      candidate.addEventListener('load', reveal, { once: true });
      candidate.addEventListener('error', reveal, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(cleanupTimer);
      candidate.removeEventListener('load', reveal);
      candidate.removeEventListener('error', reveal);
    };
  }, [src]);

  return (
    <span className={`theme-asset-crossfade ${className}`.trim()} aria-hidden="true">
      {leavingSource && (
        <span className="theme-asset-crossfade-layer is-leaving">
          <img src={leavingSource} alt="" width={width} height={height} draggable="false" decoding="async" />
        </span>
      )}
      <span key={currentSource} className="theme-asset-crossfade-layer is-current">
        <img src={currentSource} alt={alt} width={width} height={height} draggable="false" decoding="async" />
      </span>
    </span>
  );
}

function ChapterRail({ activeIndex, collapsed, intensity, onCollapsedChange, onSelect, theme }) {
  const listRef = useRef(null);
  const railRef = useRef(null);
  const itemRefs = useRef([]);
  const celestialAsset = getChapterCelestialAsset(theme);

  useChapterRailChoreography({
    itemCount: spatialChapters.length,
    itemRefs,
    railRef,
  });

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
    <nav
      ref={railRef}
      className={`chapter-rail is-orbit-rail ${collapsed ? 'is-collapsed' : ''}`}
      aria-label="Portfolio chapters"
      style={{ '--chapter-atmosphere-power': intensity }}
    >
      <button
        type="button"
        className="chapter-collapse"
        aria-label={collapsed ? 'Expand chapter navigation' : 'Collapse chapter navigation'}
        aria-expanded={!collapsed}
        onClick={() => onCollapsedChange(!collapsed)}
      >
        <TrianglePointer direction={collapsed ? 'right' : 'left'} />
      </button>
      <button type="button" className="chapter-scroll-arrow previous tracer-control celestial-control" aria-label="Previous chapters" onClick={() => scrollTabs(-1)}>
        <TrianglePointer direction="left" />
      </button>
      <div ref={listRef} className="chapter-rail-list" role="tablist" aria-label="Spatial portfolio chapters">
        {spatialChapters.map((chapter, index) => (
          <button
            key={chapter.id}
            ref={(node) => { itemRefs.current[index] = node; }}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={chapter.navLabel}
            className={`tracer-control celestial-control ${index === activeIndex ? 'active' : ''}`}
            style={{
              '--chapter-asset-rotation': `${index * 47 - 68}deg`,
              '--chapter-item-index': index,
              '--chapter-orbit-duration': `${7.4 + index * 0.58}s`,
              '--chapter-orbit-direction': index % 2 === 0 ? 'normal' : 'reverse',
            }}
            onClick={() => onSelect(index)}
            >
            <span className="chapter-celestial-marker" aria-hidden="true">
              <ThemeAssetCrossfade src={celestialAsset} width="320" height="320" />
            </span>
            <ScenicText as="strong" style={{ '--scenic-seed': index }}>{chapter.navLabel}</ScenicText>
          </button>
        ))}
      </div>
      <button type="button" className="chapter-scroll-arrow next tracer-control celestial-control" aria-label="Next chapters" onClick={() => scrollTabs(1)}>
        <TrianglePointer direction="right" />
      </button>
    </nav>
  );
}

function ScrollableTabStrip({
  activeIndex,
  className,
  enabled = true,
  label,
  children,
  sceneIndex = 1,
  theme = 'default',
}) {
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
    <div className={`scrollable-tab-shell ${className}-shell`} data-lenis-prevent>
      <BoundaryFilamentField
        enabled={enabled}
        sceneIndex={sceneIndex}
        theme={theme}
        variant="tabs"
      />
      <button type="button" className="embedded-tab-arrow previous tracer-control celestial-control" aria-label={`Previous ${label}`} onClick={() => scrollTabs(-1)}>
        <TrianglePointer direction="left" />
      </button>
      <div ref={listRef} className={className} role="tablist" aria-label={label}>{children}</div>
      <button type="button" className="embedded-tab-arrow next tracer-control celestial-control" aria-label={`Next ${label}`} onClick={() => scrollTabs(1)}>
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
          <ScenicText as="strong">{profile.name}</ScenicText>
          <small>Backend / Game Technology</small>
        </span>
      </button>
      <div className="archive-header-actions">
        <a className="tracer-action" data-tracer-prop="action" href={profile.github} {...getSafeLinkProps(profile.github)}><span>GitHub</span></a>
        <a className="archive-header-primary tracer-action" data-tracer-prop="action" href={profile.resume} download><span>Resume</span></a>
      </div>
    </header>
  );
}

function SpatialHud({ activeIndex, theme, onThemeChange, atmospherePower, onAtmospherePowerChange, onThemeChosen }) {
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(max-width: 1120px), (max-height: 780px)').matches);
  const activeTheme = spatialThemes.find((item) => item.id === theme) || spatialThemes[0];

  return (
    <aside className={`spatial-hud tracer-shell celestial-panel ${collapsed ? 'is-collapsed' : ''}`} aria-label="Scene wayfinder">
      <WayfinderCosmicField
        theme={theme}
        intensity={atmospherePower}
        collapsed={collapsed}
      />
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
              className={`tracer-control celestial-control ${theme === item.id ? 'active' : ''}`}
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
  const chapterId = spatialChapters[activeIndex]?.id || 'intro';
  const avatarState = getLoreAvatarState(theme, chapterId);
  const avatarSourceRef = useRef(avatarState.src);
  const [currentAvatar, setCurrentAvatar] = useState(avatarState.src);
  const [leavingAvatar, setLeavingAvatar] = useState(null);

  useEffect(() => {
    const previousAvatar = avatarSourceRef.current;
    if (previousAvatar === avatarState.src) return undefined;

    avatarSourceRef.current = avatarState.src;
    setLeavingAvatar(previousAvatar);
    setCurrentAvatar(avatarState.src);
    const timer = window.setTimeout(() => setLeavingAvatar(null), 760);
    return () => window.clearTimeout(timer);
  }, [avatarState.src]);

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
      ? spatialChapters[activeIndex]?.guide || spatialChapters[0].guide
      : 'Before I guide you through my work, start with the Wayfinder. Switch between Monochrome, Fall, Spring, and Winter, then choose the atmosphere you want to carry through my portfolio.';
  const typed = useTypewriter(message, 14, textAnimationReady);
  const guideState = !introGuideReady ? 'is-awaiting' : textAnimationReady ? 'is-ready' : 'is-opening';

  return (
    <aside className={`spatial-lore-guide ${collapsed ? 'is-collapsed' : ''} ${guideState} theme-${theme}`} data-avatar-mood={avatarState.mood} aria-label="Lore navigation guide">
      <div className="lore-medallion" aria-hidden="true">
        <div className="lore-avatar-figure">
          {leavingAvatar && <img className="lore-avatar-image is-leaving" src={leavingAvatar} alt="" />}
          <img key={currentAvatar} className="lore-avatar-image is-current" src={currentAvatar} alt="" />
          <LoreAvatarContourField theme={theme} imageSrc={currentAvatar} />
        </div>
      </div>
      <div className="lore-parchment tracer-slab" data-tracer-prop="lore" aria-hidden={collapsed}><p>{typed}{textAnimationReady && <span className="lore-caret" aria-hidden="true" />}</p></div>
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
        <ScenicText as="h2">{chapter.title}</ScenicText>
      </div>
      {signal && <span>{signal}</span>}
    </div>
  );
}

function CaseStudyChapterHeading({ isActive }) {
  const chapter = spatialChapters[2];
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
        <ScenicText as="h2" aria-label={copy[1]}>{segments[1]}{caret(1)}</ScenicText>
      </div>
      <span aria-label={copy[2]}>{segments[2]}{caret(2)}</span>
    </div>
  );
}

function IntroGateName({ isActive, name }) {
  const nameStageRef = useRef(null);
  const [isScrollControlled, setIsScrollControlled] = useState(false);
  const [returnPhase, setReturnPhase] = useState('idle');
  const nameMotionRef = useRef({
    controlled: false,
    first: -1,
    last: -1,
    returnPhase: 'idle',
  });
  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  useLayoutEffect(() => {
    const runtime = nameMotionRef.current;
    const updateReturnPhase = (nextPhase) => {
      if (runtime.returnPhase === nextPhase) return;
      runtime.returnPhase = nextPhase;
      setReturnPhase(nextPhase);
    };
    const setNameShift = (node, first, last) => {
      runtime.first = first;
      runtime.last = last;
      node.style.setProperty('--intro-first-shift', `${(first * INTRO_NAME_BURIED_SHIFT).toFixed(3)}%`);
      node.style.setProperty('--intro-last-shift', `${(last * INTRO_NAME_BURIED_SHIFT).toFixed(3)}%`);
    };
    const holdBehindClosedGate = (node) => {
      updateReturnPhase('waiting');
      if (runtime.first !== 1 || runtime.last !== 1) setNameShift(node, 1, 1);
    };
    const beginReturnReveal = () => {
      if (runtime.returnPhase === 'waiting') updateReturnPhase('revealing');
    };

    const applySpatialMotion = ({ progress, direction }) => {
      const node = nameStageRef.current;
      if (!node) return;
      const rawIntroPosition = Math.max(
        0,
        Math.min(1, progress * Math.max(1, spatialChapters.length - 1)),
      );

      // Let the timed entrance finish before scroll takes ownership. Scroll
      // control starts from the fully revealed pose, so there is no handoff snap.
      if (!runtime.controlled && rawIntroPosition >= INTRO_NAME_EXIT_START) {
        runtime.controlled = true;
        setNameShift(node, 0, 0);
        setIsScrollControlled(true);
      }
      if (!runtime.controlled) return;

      const gateway = getGatewayTransition();
      if (direction < 0) {
        if (gateway.progress > INTRO_GATE_CLOSED_EPSILON) {
          holdBehindClosedGate(node);
          return;
        }
        beginReturnReveal();
        if (runtime.returnPhase === 'revealing') return;
      } else if (runtime.returnPhase !== 'idle') {
        updateReturnPhase('idle');
      }

      const firstExit = smoothUnit(
        (rawIntroPosition - INTRO_NAME_EXIT_START) / INTRO_NAME_EXIT_RANGE,
      );
      const lastExit = smoothUnit(
        (rawIntroPosition - INTRO_NAME_EXIT_START - INTRO_NAME_EXIT_STAGGER)
          / INTRO_NAME_EXIT_RANGE,
      );
      const firstChanged = firstExit !== runtime.first
        && (firstExit === 0 || firstExit === 1 || Math.abs(firstExit - runtime.first) > 0.001);
      const lastChanged = lastExit !== runtime.last
        && (lastExit === 0 || lastExit === 1 || Math.abs(lastExit - runtime.last) > 0.001);
      if (firstChanged || lastChanged) {
        setNameShift(
          node,
          firstChanged ? firstExit : runtime.first,
          lastChanged ? lastExit : runtime.last,
        );
      }
    };

    const applyGatewayTransition = (gateway) => {
      const node = nameStageRef.current;
      if (!node || !runtime.controlled || gateway.direction >= 0) return;
      if (gateway.progress > INTRO_GATE_CLOSED_EPSILON) {
        holdBehindClosedGate(node);
        return;
      }
      beginReturnReveal();
    };

    const unsubscribeSpatial = subscribeSpatialMotion(applySpatialMotion);
    const unsubscribeGateway = subscribeGatewayTransition(applyGatewayTransition);
    return () => {
      unsubscribeSpatial();
      unsubscribeGateway();
    };
  }, []);

  return (
    <h1
      ref={nameStageRef}
      className={`intro-gate-name ${isActive ? 'is-active' : ''} ${isScrollControlled ? 'is-scroll-controlled' : ''} is-return-${returnPhase}`}
      aria-label={name}
      aria-hidden={isActive ? undefined : true}
    >
      <span className="intro-name-word intro-name-first" aria-hidden="true">
        <ScenicText>{firstName}</ScenicText>
      </span>
      <span className="intro-name-word intro-name-last" aria-hidden="true">
        <ScenicText>{lastName}</ScenicText>
      </span>
    </h1>
  );
}

function IntroChapter({ isActive, profile, onEnter, onGuideReady }) {
  const copyStageRef = useRef(null);
  const gateEntryRef = useRef(null);
  const nameMotionRef = useRef({
    copyX: '',
    copyY: '',
    gateOpacity: -1,
    gateScale: -1,
    gateCounterX: '',
    gateCounterY: '',
  });
  const copy = INTRO_NARRATION_PARTS;
  const {
    activeSegment,
    isAnimating,
    isComplete,
    segments,
  } = useNarratedTypewriterSequence(copy, {
    enabled: isActive,
    enterDelay: 1900,
    enterSpeeds: INTRO_NARRATION_ENTER_SPEEDS,
    enterPauses: INTRO_NARRATION_ENTER_PAUSES,
    exitDelay: 80,
    exitSpeeds: INTRO_NARRATION_EXIT_SPEEDS,
    exitPauses: INTRO_NARRATION_EXIT_PAUSES,
  });
  const resumeVisible = segments[7].length > 0;
  const resumeComplete = segments[7].length === copy[7].length;
  const statusVisible = segments[8].length > 0;
  const statusComplete = segments[8].length === copy[8].length;
  const scrollCueStart = copy[8].lastIndexOf('SCROLL');
  const statusLead = segments[8].slice(0, scrollCueStart);
  const statusCue = segments[8].slice(scrollCueStart);
  const caret = (index) => (
    isAnimating && activeSegment === index
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
    const copyNode = copyStageRef.current;
    const gateEntryNode = gateEntryRef.current;

    const rawIntroPosition = Math.max(
      0,
      Math.min(1, progress * Math.max(1, spatialChapters.length - 1)),
    );
    const runtime = nameMotionRef.current;

    const sceneShiftX = Math.max(-70, Math.min(70, -scenePosition * 85));
    const sceneShiftY = Math.max(-90, Math.min(90, -scenePosition * 115));

    if (copyNode) {
      const copyExit = smoothUnit((rawIntroPosition - INTRO_COPY_EXIT_START) / INTRO_COPY_EXIT_RANGE);
      const travelVw = window.innerWidth <= 760 ? 108 : 48;
      const copyX = `calc(${(-sceneShiftX).toFixed(3)}px - ${(copyExit * travelVw).toFixed(3)}vw)`;
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
      setCachedInlineStyle(gateEntryNode, 'pointerEvents', gateExit > 0.08 ? 'none' : 'auto');
    }
  }), []);

  return (
    <div className={`intro-chapter-content ${isActive ? 'is-active' : ''} ${isComplete ? 'is-copy-complete' : ''} ${resumeVisible ? 'is-resume-visible' : ''} ${resumeComplete ? 'is-resume-complete' : ''} ${statusVisible ? 'is-status-visible' : ''}`} aria-live="off">
      <div ref={copyStageRef} className="intro-copy-stage">
        <div className="intro-manifesto" aria-label={copy.slice(0, 4).join(' ')}>
          {copy.slice(0, 4).map((phrase, index) => (
            <p
              className={`intro-coordinate intro-manifesto-line ${segments[index] ? 'has-copy' : ''}`}
              key={phrase}
              style={{ '--manifesto-index': index }}
            >
              <span>{segments[index]}{caret(index)}</span>
            </p>
          ))}
        </div>
        <div className="intro-role-orbit" aria-label={`${copy[4]} ${copy[5]} ${copy[6]}`}>
          <p className="intro-role intro-role-engineer"><ScenicText>{segments[4]}{caret(4)}</ScenicText></p>
          <p className="intro-role intro-role-wonderer"><ScenicText>{segments[5]}{caret(5)}</ScenicText></p>
          <p className="intro-role intro-role-storyteller"><ScenicText>{segments[6]}{caret(6)}</ScenicText></p>
        </div>
        <div className="intro-actions">
          <a
            aria-disabled={!resumeComplete}
            aria-label={copy[7]}
            className="tracer-action"
            data-tracer-prop="action"
            href={profile.resume}
            download
            onClick={(event) => { if (!resumeComplete) event.preventDefault(); }}
            tabIndex={resumeComplete ? 0 : -1}
          ><span>{segments[7]}{caret(7)}</span></a>
        </div>
        <div className="intro-status" aria-label={`${copy[8]} down`}>
          <span>{statusLead}{statusCue && <span className="intro-scroll-cue">{statusCue}{statusComplete && <span className="intro-scroll-arrow" aria-hidden="true">&#8595;</span>}</span>}{caret(8)}</span>
        </div>
      </div>
      <div ref={gateEntryRef} className="intro-gate-entry">
        <div className="intro-gate-scroll-shell">
          <button className="intro-gate-cta tracer-action" data-tracer-prop="action" type="button" onClick={onEnter}><span>Enter the archive</span></button>
        </div>
      </div>
    </div>
  );
}

function CoresChapter({ isActive, onContinue }) {
  const chapter = spatialChapters[1];
  const heading = useTypewriterSequence(
    [`Chapter ${chapter.index}: ${chapter.eyebrow}`, chapter.title],
    18,
    isActive,
    220,
  );

  return (
    <div
      className={`chapter-content cores-chapter-content ${isActive ? 'is-active' : ''}`}
      role="region"
      aria-label="Cores content"
      tabIndex={isActive ? 0 : -1}
      data-lenis-prevent
    >
      <header className="cores-heading" aria-live="off">
        <p aria-label={`Chapter ${chapter.index}: ${chapter.eyebrow}`}>{heading.segments[0]}</p>
        <ScenicText as="h2" aria-label={chapter.title}>{heading.segments[1]}</ScenicText>
        <span>Three disciplines held in one orbit.</span>
      </header>
      <ol className="cores-pillar-list" aria-label="Engineering cores">
        {CORE_PILLARS.map((core, index) => (
          <li key={core.title} style={{ '--core-index': index }}>
            <span>{core.index}</span>
            <strong>{core.title}</strong>
            <small>{core.detail}</small>
          </li>
        ))}
      </ol>
      <button type="button" className="cores-continue tracer-action" onClick={onContinue}>
        Continue to case studies
      </button>
    </div>
  );
}

function CompactStack({ entryDelay, project }) {
  const groups = spatialPortfolio.projectStacks[project.architectureKey] || [];
  return (
    <div className="compact-stack" aria-label={`${project.title} technical stack`}>
      {groups.slice(0, 3).map(([title, items], index) => (
        <div
          className="tracer-slab tracer-compact"
          data-tracer-prop="compact"
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
  const airflowResetRef = useRef(0);
  const lastScrollRef = useRef({ time: 0, top: 0 });
  const architecture = projectArchitectures[project.architectureKey];
  const assets = getCinematicAssets(theme);
  const rope = createAssetPath(import.meta.env.BASE_URL, assets.topologyRope);
  const ropeGeometry = CINEMATIC_ASSET_GEOMETRY.topologyRope;
  const topologyCopy = ['System topology', architecture.label];
  const { activeSegment, isAnimating, segments } = useReversibleTypewriterSequence(topologyCopy, {
    phase: sequencePhase,
    enterDelay: entryDelay + CASE_STUDY_TIMING.topologyHeadingDelay,
    exitDelay: CASE_STUDY_TIMING.topologyHeadingExitDelay,
    enterSpeed: 9,
    exitSpeed: 4,
  });
  const controlsEnabled = isInteractive && sequencePhase === 'visible';

  const handleTopologyScroll = useCallback((event) => {
    const scroller = event.currentTarget;
    const now = performance.now();
    const previous = lastScrollRef.current;
    const elapsed = Math.max(16, now - previous.time);
    const distance = scroller.scrollTop - previous.top;
    const airflow = Math.max(-12, Math.min(12, (distance / elapsed) * 34));
    lastScrollRef.current = { time: now, top: scroller.scrollTop };
    setCachedStyleProperty(scroller, '--rope-scroll-twist', `${(airflow * 0.1).toFixed(2)}deg`);
    window.clearTimeout(airflowResetRef.current);
    airflowResetRef.current = window.setTimeout(() => {
      setCachedStyleProperty(scroller, '--rope-scroll-twist', '0deg');
    }, 180);
  }, []);

  useEffect(() => () => window.clearTimeout(airflowResetRef.current), []);

  return (
    <aside
      className={`project-topology-stage case-sequence-${sequencePhase} ${controlsEnabled ? 'is-interactive' : ''}`}
      style={{
        ...caseStudyTimingStyle(entryDelay),
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
        <ScenicText as="strong" aria-label={topologyCopy[1]}>
          {segments[1]}
          <CaseTypeCaret activeSegment={activeSegment} index={1} isAnimating={isAnimating} />
        </ScenicText>
      </div>
      <ol
        className="project-flowchart"
        data-lenis-prevent
        key={`${project.title}-${cycle}`}
        style={{ '--flow-count': architecture.steps.length }}
        onScroll={handleTopologyScroll}
      >
        {architecture.steps.map(([title, description], index) => (
          <li key={title} style={{ '--flow-index': index }}>
            <button
              type="button"
              className="tracer-slab tracer-topology"
              data-tracer-prop="topology"
              title={description}
              aria-label={`${String(index + 1).padStart(2, '0')}. ${title}: ${description}`}
              onClick={onOpenArchitecture}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <ScenicText as="strong" style={{ '--scenic-seed': index }}>{title}</ScenicText>
            </button>
            {index < architecture.steps.length - 1 && (
              <span className="topology-rope-pair" aria-hidden="true">
                <img src={rope} alt="" width={ropeGeometry.width} height={ropeGeometry.height} draggable="false" />
                <img src={rope} alt="" width={ropeGeometry.width} height={ropeGeometry.height} draggable="false" />
              </span>
            )}
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
      <ScenicText as="h3" aria-label={copy[2]}>{segments[2]}{caret(2)}</ScenicText>
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
  return (
    <div
      className={`chapter-content projects-chapter-content ${isActive ? 'is-sequence-active' : ''}`}
      style={caseStudyTimingStyle(entryDelay)}
    >
      <CaseStudyChapterHeading isActive={isActive} />
      <ScrollableTabStrip activeIndex={selectedProjectIndex} className="project-switcher" enabled={isActive} label="Engineering case studies" sceneIndex={2} theme={theme}>
        {spatialPortfolio.projects.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={index === selectedProjectIndex}
            className={`tracer-control celestial-control ${index === selectedProjectIndex ? 'active' : ''}`}
            style={{
              '--case-tab-enter-delay': `${CASE_STUDY_TIMING.tabsDelay + index * CASE_STUDY_TIMING.tabStagger}ms`,
            }}
            onClick={() => onProjectChange(index)}
          >
            <span>{item.number}</span>
            <ScenicText as="strong" style={{ '--scenic-seed': index }}>{item.title.replace('Aegis ', '')}</ScenicText>
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
        <dl className="project-proof-grid">
          {proof.map(([label, text], index) => (
            <div
              className="tracer-slab"
              data-tracer-prop="slab"
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
          <a className="tracer-action" data-tracer-prop="action" href={project.actions[0].href} {...getSafeLinkProps(project.actions[0].href)}><span>View repository</span></a>
          <button className="tracer-action" data-tracer-prop="action" type="button" onClick={onOpenArchitecture}><span>Open topology</span></button>
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
      <section className="architecture-dialog tracer-shell" data-tracer-prop="slab" data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="architecture-dialog-title">
        <header>
          <div><p>{project.number} / Developer topology</p><h2 id="architecture-dialog-title">{project.title}</h2></div>
          <button ref={closeRef} type="button" className="dialog-close tracer-action" data-tracer-prop="action" aria-label="Close architecture" onClick={onClose}><span aria-hidden="true" /></button>
        </header>
        <p className="architecture-dialog-summary">{architecture.description}</p>
        <dl className="architecture-case-study">
          {project.caseStudy.map(([label, text]) => (
            <div className="tracer-slab" data-tracer-prop="slab" key={label}><dt>{label}</dt><dd>{text}</dd></div>
          ))}
        </dl>
        <div className="architecture-step-grid">
          {architecture.steps.map(([title, text], index) => (
            <article className="tracer-slab" data-tracer-prop="slab" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        {architecture.placement && (
          <div className="architecture-placement tracer-slab" data-tracer-prop="slab">
            <span>Recommended Anim Blueprint placement</span>
            <div>{architecture.placement.map((step, index) => <strong key={step}>{step}{index < architecture.placement.length - 1 ? '  >' : ''}</strong>)}</div>
          </div>
        )}
        <div className="architecture-notes tracer-slab" data-tracer-prop="slab">
          {architecture.command && <code>{architecture.command}</code>}
          <ul>{architecture.notes.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
        <div className="architecture-stack-grid" aria-label={`${project.title} technical stack`}>
          {stackGroups.map(([title, items]) => (
            <div className="tracer-slab" data-tracer-prop="slab" key={title}><span>{title}</span><p>{items.join(' / ')}</p></div>
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
      <ChapterHeading chapter={spatialChapters[chapterIndex]} signal={chapterIndex === 3 ? 'Production craft and growth' : 'Study, practice, continuation'} />
      <div className="spatial-timeline">
        <div className="timeline-axis" aria-hidden="true"><span>{bounds[bounds.length - 1]}</span><i /><span>{bounds[0]}</span></div>
        <div className="timeline-waypoints" role="tablist" aria-label={`${spatialChapters[chapterIndex].navLabel} timeline`}>
          {items.map((item, index) => (
            <button
              key={`${item.meta}-${item.title}`}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              className={`tracer-slab ${index === selectedIndex ? 'active' : ''}`}
              data-tracer-prop="slab"
              onClick={() => onSelect(index)}
            >
              <span>{item.meta.split('/')[0].trim()}</span>
              <i />
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </button>
          ))}
        </div>
        <article className="timeline-focus-card tracer-slab" data-tracer-prop="slab" key={selected.title}>
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
            <div className="tracer-slab tracer-compact" data-tracer-prop="compact" key={title}><span>{title}</span><p>{stack.slice(0, 5).join(' / ')}</p></div>
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
      <ChapterHeading chapter={spatialChapters[5]} signal="Photography, essays, journeys" />
      <ScrollableTabStrip activeIndex={activeCollectionIndex} className="personal-switcher" label="Personal collections" sceneIndex={5} theme={theme}>
        {spatialPortfolio.personalProjects.map((item, index) => (
          <button key={item.meta} type="button" role="tab" aria-selected={index === activeCollectionIndex} className={`tracer-control celestial-control ${index === activeCollectionIndex ? 'active' : ''}`} onClick={() => onCollectionChange(index)}>
            <span>0{index + 1}</span><strong>{item.meta}</strong>
          </button>
        ))}
      </ScrollableTabStrip>
      <div className="personal-spatial-grid">
        <article className="personal-feature" key={`${collection.meta}-${activeMediaIndex}`}>
          <div className="personal-feature-art"><MediaArtwork item={activeMedia} index={activeMediaIndex} title={collection.meta} theme={theme} /></div>
          <div className="personal-feature-caption tracer-slab" data-tracer-prop="slab"><span>{activeMedia.meta}</span><p>{activeMedia.caption}</p></div>
        </article>
        <aside className="personal-collection-copy tracer-slab" data-tracer-prop="slab">
          <p>{collection.subtitle}</p>
          <h3>{collection.title}</h3>
          <span>{collection.body}</span>
          <div className="personal-media-index">
            {collection.media.map((item, index) => (
              <button key={`${item.meta}-${index}`} type="button" className={`tracer-control celestial-control ${index === activeMediaIndex ? 'active' : ''}`} aria-pressed={index === activeMediaIndex} onClick={() => selectMedia(index)}>
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
      <ChapterHeading chapter={spatialChapters[6]} signal="Chicago, Amsterdam, or remote" />
      <div className="contact-transmission">
        <p>Open to backend, platform, online-services, tools, and game-technology conversations.</p>
        <a className="contact-email" href={createMailtoHref(profile.email)}>{profile.email}</a>
        <div className="contact-grid">
          <a className="tracer-slab" data-tracer-prop="slab" href={profile.github} {...getSafeLinkProps(profile.github)}><span>01</span><strong>GitHub</strong><small>Source and repositories</small></a>
          <a className="tracer-slab" data-tracer-prop="slab" href={profile.linkedin} {...getSafeLinkProps(profile.linkedin)}><span>02</span><strong>LinkedIn</strong><small>Professional record</small></a>
          <a className="tracer-slab" data-tracer-prop="slab" href={profile.resume} download><span>03</span><strong>Resume</strong><small>PDF / current</small></a>
        </div>
      </div>
    </div>
  );
}

function ArchiveProgress({ activeIndex }) {
  const valueRef = useRef(null);
  const lastValueRef = useRef('000');

  useLayoutEffect(() => subscribeSpatialMotion(({ progress }) => {
    const nextValue = String(Math.round(progress * 100)).padStart(3, '0');
    if (!valueRef.current || nextValue === lastValueRef.current) return;
    lastValueRef.current = nextValue;
    valueRef.current.textContent = nextValue;
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
  onChapterSelect = goToChapter,
  chapterNavigationActive = false,
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
  const [architectureProject, setArchitectureProject] = useState(null);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [cinematicReadiness, setCinematicReadiness] = useState(() => ({
    ...getCinematicReadiness(),
  }));
  const sceneRefs = useRef([]);
  const viewportRef = useRef(null);
  const displayedContentIndex = cinematicReadiness.readyIndex;
  const chapterIsSettled = experienceVisible && cinematicReadiness.settled && !chapterNavigationActive;
  const projectsActive = chapterIsSettled && displayedContentIndex === 2;
  const projectsInteractive = projectsActive && chapterIsSettled && activeIndex === 2;

  useEffect(() => subscribeCinematicReadiness((next) => {
    setCinematicReadiness({ ...next });
  }), []);

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
    <IntroChapter isActive={chapterIsSettled && displayedContentIndex === 0} profile={profile} onEnter={() => goToChapter(1)} onGuideReady={handleIntroGuideReady} />,
    <CoresChapter isActive={chapterIsSettled && displayedContentIndex === 1} onContinue={() => goToChapter(2)} />,
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
    null,
    null,
    null,
    null,
  ], [chapterIsSettled, displayedContentIndex, displayedProjectIndex, goToChapter, handleArchitectureOpen, handleIntroGuideReady, profile, projectCycle, projectEntryDelay, projectSequencePhase, projectsActive, selectProject, selectedProjectIndex, theme]);
  const systemsOverlay = useMemo(() => (
    <ProjectTopology
      cycle={projectCycle}
      entryDelay={projectEntryDelay}
      isInteractive={projectsInteractive}
      onOpenArchitecture={handleArchitectureOpen}
      project={spatialPortfolio.projects[displayedProjectIndex]}
      sequencePhase={projectSequencePhase}
      theme={theme}
    />
  ), [displayedProjectIndex, handleArchitectureOpen, projectCycle, projectEntryDelay, projectSequencePhase, projectsInteractive, theme]);
  const environmentStyle = useMemo(() => {
    const visualAssets = getCinematicAssets(theme);
    return {
      '--surface-image': `url("${createAssetPath(import.meta.env.BASE_URL, visualAssets.surface)}")`,
      '--text-distress-mask': `url("${createAssetPath(import.meta.env.BASE_URL, 'cinematic/ui/text-distress-mask.png')}")`,
    };
  }, [theme]);

  useLayoutEffect(() => subscribeSpatialMotion(({ scenePosition }) => {
    sceneRefs.current.forEach((node, index) => {
      if (!node) return;
      const isNear = Math.abs(index - scenePosition) < SCENE_RENDER_RADIUS;
      toggleCachedClass(node, 'near', isNear);
      if (!isNear) return;
      const styles = sceneStyle(index, scenePosition);
      Object.entries(styles).forEach(([name, value]) => {
        setCachedStyleProperty(node, name, value);
      });
    });
  }), []);

  return (
    <div ref={viewportRef} className={`archive-viewport theme-${theme} rail-${railCollapsed ? 'collapsed' : 'expanded'} ${experienceVisible ? 'experience-visible' : 'experience-concealed'} ${chapterIsSettled ? 'chapter-settled' : 'chapter-transitioning'}`} style={environmentStyle}>
      <CinematicEnvironment
        theme={theme}
        onReady={onEnvironmentReady}
        gatewayOverlay={<IntroGateName isActive={experienceVisible && !chapterNavigationActive && activeIndex === 0} name={profile.name} />}
        systemsOverlay={systemsOverlay}
      />
      <div className="archive-color-grade" aria-hidden="true" />
      <SpatialWorld theme={theme} atmospherePower={atmospherePower} onReady={onWorldReady} />
      <div className="archive-grain" aria-hidden="true" />
      <MemoArchiveHeader profile={profile} onIntro={handleIntro} />
      <MemoChapterRail
        activeIndex={activeIndex}
        collapsed={railCollapsed}
        intensity={atmospherePower}
        onCollapsedChange={setRailCollapsed}
        onSelect={onChapterSelect}
        theme={theme}
      />
      <main className="archive-scene-stack" aria-live="polite">
        {scenes.map((scene, index) => (
          <section
            key={spatialChapters[index].id}
            ref={(node) => { sceneRefs.current[index] = node; }}
            className={`archive-scene scene-${spatialChapters[index].id} ${index === activeIndex ? 'near' : ''} ${chapterIsSettled && index === displayedContentIndex ? 'active content-ready' : ''}`}
            style={sceneStyle(index, index === 0 ? 0 : -1)}
            aria-hidden={!chapterIsSettled || index !== displayedContentIndex}
            {...(!chapterIsSettled || index !== displayedContentIndex ? { inert: '' } : {})}
          >
            {scene}
          </section>
        ))}
      </main>
      <MemoLoreGuide activeIndex={displayedContentIndex >= 0 ? displayedContentIndex : 0} introGuideReady={introGuideReady} themePromptCompleted={themePromptCompleted} theme={theme} />
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
