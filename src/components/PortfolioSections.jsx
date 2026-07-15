import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import loreGuidePersona from '../../content/lore-guide-persona.webp';
import {
  developerPipelineSteps,
  manualWeatherCycle,
  personalProjects,
  pluginAnimPlacement,
  pluginDebugChecks,
  pluginWorkflowSteps,
  projects,
  projectStacks,
  sectors,
  stackGroups,
  telemetryArchitectureSteps,
  telemetryScaleNotes,
  weatherNames,
} from '../data/portfolioData.js';
import { getSafeLinkProps } from '../security/contentSecurity.js';
import { Chip, ProfileAvatar, SketchArrow } from './primitives.jsx';
import { getTimelineBounds, normalizeTimelineItems, positionOnTimeline } from '../utils/timeline.js';

export function DimensionalHeroStage({ activeContentTab }) {
  const activeLabel = activeContentTab?.label || 'Engineering Case Studies';
  const activeKicker = activeContentTab?.kicker || '01 / Systems';
  const stageNodes = [
    { label: 'pipeline', value: 'async services', depth: 'front' },
    { label: 'plugin', value: 'unreal runtime', depth: 'right' },
    { label: 'telemetry', value: 'signals -> decisions', depth: 'back' },
    { label: 'timeline', value: 'proof over polish', depth: 'left' },
  ];

  return (
    <aside className="hero-dimensional-stage" aria-label="3D portfolio system map">
      <div className="dimension-field" aria-hidden="true">
        <span className="dimension-ring ring-a" />
        <span className="dimension-ring ring-b" />
        <span className="dimension-ring ring-c" />
        <span className="dimension-grid-plane" />
        <div className="dimension-core">
          <span>project://aegis</span>
          <strong>{activeLabel}</strong>
          <em>{activeKicker}</em>
        </div>
        {stageNodes.map((node, index) => (
          <span key={node.label} className={`dimension-node ${node.depth}`}>
            <small>{String(index + 1).padStart(2, '0')}</small>
            <strong>{node.label}</strong>
            <em>{node.value}</em>
          </span>
        ))}
      </div>
      <div className="dimension-console">
        <span>initialise(lore)</span>
        <strong>{'{ systems: readable, evidence: direct, world: interactive }'}</strong>
        <em>scroll.depth += content.proof</em>
      </div>
    </aside>
  );
}

export function FloatingHud({ weather, setWeather, weatherPower, setWeatherPower, activeSector, liveWeather, timeProfile, weatherStatus, weatherError, onUseLiveWeather, onInteract, fallTheme, setFallTheme, springTheme, setSpringTheme, winterTheme, setWinterTheme }) {
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

export function LoreGuide({ activeSector, activeContentTab, hudInteracted }) {
  const [collapsed, setCollapsed] = useState(false);
  const activeSectorId = sectors[activeSector]?.id || 'hero';
  const tabId = activeContentTab?.id || 'portfolio';
  const targetDialog = useMemo(() => {
    if (!hudInteracted) {
      return {
        lines: [
          'I see you have stumbled upon my lore! I am not an AI here to assist you, but just a mere persona of myself to give you some tips on navigating my lore.',
          'Start with the Explorer HUD on the bottom right. Try a season button, cycle the particle arrows, or move the Atmosphere slider.',
        ],
      };
    }

    if (activeSectorId === 'hero') {
      return {
        lines: ['Use Start exploring to jump into the tabbed lore, or use the left Explore panel to move between Intro, Content, and Contact.'],
      };
    }
    if (activeSectorId === 'contact') {
      return {
        lines: ['You are in the contact zone now. Use the links here when you want the practical exits: resume, GitHub, LinkedIn, or email.'],
      };
    }
    if (tabId === 'portfolio') {
      return {
        lines: ['Use the project subtabs to switch case studies. Scan each one for problem, role, architecture, evidence, and repository links.'],
      };
    }
    if (tabId === 'professional') {
      return {
        lines: ['Click a timeline card to zoom it forward. Click outside the timeline to settle it back into place.'],
      };
    }
    if (tabId === 'education') {
      return {
        lines: ['Use the same card-click behavior to inspect each academic milestone without leaving the timeline.'],
      };
    }
    if (tabId === 'personal') {
      return {
        lines: ['Switch between Photography, Writing, and Travel. Pick a side media card to swap it into the main display.'],
      };
    }
    return {
      lines: ['Use the tabs, timeline cards, media swaps, and side navigation to move through the lore at your own pace.'],
    };
  }, [activeSectorId, hudInteracted, tabId]);
  const [displayDialog, setDisplayDialog] = useState(targetDialog);
  const [dialogPhase, setDialogPhase] = useState('entering');
  const [typedCharCount, setTypedCharCount] = useState(0);
  const targetKey = targetDialog.lines.join('|');
  const displayKey = displayDialog.lines.join('|');
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

export function MissionMap({ activeSector, activeContentTab }) {
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

export function SectorHeader({ eyebrow, title, children }) {
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

export function ProjectCard({ project }) {
  const flowNodes = project.flow || ['mocap', 'ingest', 'kafka', 'redis', 'json', 'unreal'];

  return (
    <article className="project-card panel-card" data-tilt>
      <div className="card-glow" />
      <div className="project-topline"><span>{project.number}</span><em>{project.eyebrow}</em></div>
      <div className="project-visual" aria-hidden="true">
        {flowNodes.map((node, index) => (
          <div className="flow-node" key={node}><span>{node}</span>{index < flowNodes.length - 1 && <em>→</em>}</div>
        ))}
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="chip-row">{project.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
      {project.caseStudy && (
        <dl className="project-case-study">
          {project.caseStudy.map(([label, text]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      )}
      <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      {project.actions && (
        <div className="project-actions" aria-label={`${project.title} actions`}>
          {project.actions.map((action) => (
            <a key={action.label} href={action.href} {...getSafeLinkProps(action.href)}>
              {action.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export function ProjectDetailTabs() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex] || projects[0];

  return (
    <div className="project-detail-tabs">
      <div className="project-detail-list" role="tablist" aria-label="Project case studies">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            id={`project-tab-${index}`}
            role="tab"
            aria-selected={activeProjectIndex === index}
            aria-controls="project-detail-panel"
            className={activeProjectIndex === index ? 'active' : ''}
            onClick={() => setActiveProjectIndex(index)}
          >
            <span>{project.number}</span>
            <strong>{project.title}</strong>
            <em>{project.eyebrow}</em>
          </button>
        ))}
      </div>
      <div
        id="project-detail-panel"
        className="project-detail-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${activeProjectIndex}`}
      >
        <ProjectCard project={activeProject} />
        <ArchitectureSection project={activeProject} />
        <ProjectStackSection project={activeProject} />
      </div>
    </div>
  );
}

export function ProjectStackSection({ project }) {
  const groups = projectStacks[project?.architectureKey] || [];
  if (!groups.length) return null;

  return (
    <section className="tabbed-subsection project-stack-section">
      <SectorHeader eyebrow={`${project.title} stack`} title="Technology used in this project.">This stack is scoped to the selected project, so the architecture and implementation tools stay connected.</SectorHeader>
      <div className="stack-grid project-stack-grid">
        {groups.map(([title, items]) => (
          <article key={title} className="panel-card" data-tilt>
            <h3>{title}</h3>
            <div>{items.map((item) => <Chip key={item}>{item}</Chip>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProfileTabs({ tabs, activeTabId, onTabChange }) {
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

export function TimelineGrid({ items }) {
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

export function TimelineMaterialIcon({ name }) {
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


export function PersonalProjectTabs() {
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

export function PersonalMediaExperience({ project, mediaItems, activeMedia, activeMediaIndex, onSelect }) {
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

export function PersonalMediaAsset({ item, index, compact = false, featured = false }) {
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

export function ArchitectureSection({ project = null }) {
  const architectureKey = project?.architectureKey || 'all';
  const showPipeline = architectureKey === 'all' || architectureKey === 'pipeline';
  const showPlugin = architectureKey === 'all' || architectureKey === 'plugin';
  const showTelemetry = architectureKey === 'all' || architectureKey === 'telemetry';

  return (
    <section id="architecture" className="tabbed-subsection architecture-system">
      {showPipeline && (
      <article id="pipeline-architecture" className="architecture-panel panel-card" data-tilt>
        <SectorHeader eyebrow="Pipeline architecture" title="From motion data to Unreal-ready procedural animation JSON.">The backend pipeline separates ingestion, asynchronous processing, job state, validation, and Unreal-facing export artifacts.</SectorHeader>
        <div className="pipeline">{developerPipelineSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </article>
      )}

      {showPlugin && (
      <article id="plugin-architecture" className="architecture-panel plugin-architecture-panel panel-card" data-tilt>
        <SectorHeader eyebrow="Plugin runtime architecture" title="Procedural action playback layered after locomotion.">The Unreal plugin keeps base movement separate from short-lived procedural action layers, making runtime behavior easier to trigger, inspect, and reason about.</SectorHeader>
        <div className="pipeline plugin-workflow">{pluginWorkflowSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="plugin-architecture-details">
          <article className="plugin-placement-card">
            <span>Recommended Anim Blueprint placement</span>
            <div className="plugin-placement-flow" aria-label="Recommended Anim Blueprint placement">
              {pluginAnimPlacement.map((step, index) => (
                <div key={step}>
                  <strong>{step}</strong>
                  {index < pluginAnimPlacement.length - 1 && <em>↓</em>}
                </div>
              ))}
            </div>
            <p>This placement keeps the system additive: base locomotion remains responsible for normal movement, while Aegis contributes short-lived procedural action layers.</p>
          </article>
          <article className="plugin-debug-card">
            <span>Debugging</span>
            <code>aegis.Motion.DebugProceduralDriver 0</code>
            <p>Common values: 0 = off, 1 = log procedural driver state, 2 = draw debug visualization.</p>
            <ul>{pluginDebugChecks.map((check) => <li key={check}>{check}</li>)}</ul>
          </article>
        </div>
      </article>
      )}

      {showTelemetry && (
      <article id="telemetry-architecture" className="architecture-panel telemetry-architecture-panel panel-card" data-tilt>
        <SectorHeader eyebrow="Telemetry architecture" title="Realtime gameplay performance intelligence.">The telemetry tool follows the README flow: generate gameplay/server events, collect them through FastAPI, stream them through Redpanda, process rolling windows, store raw and aggregate data in ClickHouse, then inspect incidents and recommendations in Streamlit.</SectorHeader>
        <div className="pipeline telemetry-workflow">{telemetryArchitectureSteps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="telemetry-architecture-details">
          <article className="telemetry-scaling-card">
            <span>Developer flow</span>
            <p>Run the Docker stack, generate scenario traffic from the simulator, then use the dashboard to inspect regions, servers, time windows, hot zones, incident evidence, data quality, and scaling readiness.</p>
          </article>
          <article className="telemetry-scaling-card">
            <span>Production scaling story</span>
            <ul>{telemetryScaleNotes.map((note) => <li key={note}>{note}</li>)}</ul>
          </article>
        </div>
      </article>
      )}
    </section>
  );
}

export function StackSection() {
  return (
    <section className="tabbed-subsection stack-section">
      <SectorHeader eyebrow="Professional technical stack" title="Backend reliability, cloud delivery, game tooling, and data workflows.">A broader view of the tools and domains used across production work, portfolio systems, and ongoing technical study.</SectorHeader>
      <div className="stack-grid">{stackGroups.map(([title, items]) => <article key={title} className="panel-card" data-tilt><h3>{title}</h3><div>{items.map((item) => <Chip key={item}>{item}</Chip>)}</div></article>)}</div>
    </section>
  );
}

export function TabContentBlock({ block, tab }) {
  if (block.type === 'projects') {
    return (
      <section className="tabbed-subsection">
        <SectorHeader eyebrow="Engineering case studies" title="Projects with proof attached.">Problem, role, architecture, decisions, implementation evidence, and direct repository links for each project.</SectorHeader>
        <ProjectDetailTabs />
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

export function TabbedContent({ tab }) {
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
