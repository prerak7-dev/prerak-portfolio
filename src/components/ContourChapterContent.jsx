import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, GitBranch, Layers, FileText, ListChecks } from 'lucide-react';
import { useContourContentLayout } from '../hooks/useContourContentLayout.js';
import { useCoresCompositionLayout } from '../hooks/useCoresCompositionLayout.js';
import { projectArchitectures, spatialPortfolio } from '../data/spatialPortfolioData.js';
import { getSafeLinkProps } from '../security/contentSecurity.js';
import { changeTextContent } from '../utils/changeTextContent.js';

const cores = [
  ['Services', 'Reliable backends and asynchronous content pipelines.'],
  ['Unreal', 'Production tooling and procedural runtime systems.'],
  ['Telemetry', 'Observable systems and actionable operational evidence.'],
];

export function ContourCores({ isActive, onContinue }) {
  const ref = useRef(null);
  const detailRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const desired = useRef(null);
  const latest = useRef({ selected, isActive });
  latest.current = { selected, isActive };
  useCoresCompositionLayout(ref, isActive);
  useEffect(() => {
    if (!isActive) { desired.current = null; setSelected(null); }
  }, [isActive]);
  const select = index => {
    desired.current = index;
    changeTextContent(() => setSelected(desired.current), detailRef.current, {
      key: 'cores-detail',
      shouldUpdate: () => latest.current.isActive && latest.current.selected !== desired.current,
    });
  };
  useEffect(() => {
    if (!isActive) return undefined;
    const dismiss = event => {
      if (event.key !== 'Escape' || event.defaultPrevented || desired.current === null) return;
      desired.current = null;
      changeTextContent(() => setSelected(desired.current), detailRef.current, {
        key: 'cores-detail',
        shouldUpdate: () => latest.current.isActive && latest.current.selected !== desired.current,
      });
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [isActive]);
  return <div ref={ref} data-lenis-prevent className={`contour-content contour-cores ${isActive ? 'is-present' : ''}`}>
    <header className="cores-chapter-heading"><h2>Three cores.</h2><p className="cores-chapter-subtitle">One connected practice.</p></header>
    <div className="core-suns" role="group" aria-label="Engineering disciplines">
      {cores.map(([title], index) => <button key={title} id={`core-sun-${index}`} className="core-sun" type="button"
        aria-label={title} aria-expanded={selected === index} aria-controls="core-details"
        onPointerEnter={event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') select(index); }}
        onFocus={() => select(index)} onClick={() => select(index)}>
        <span className="core-sun-ordinal" aria-hidden="true">{['I', 'II', 'III'][index]}</span>
        <span className="core-sun-name">{title}</span>
      </button>)}
    </div>
    <section ref={detailRef} className="core-detail" id="core-details" aria-live="polite" aria-atomic="true"
      aria-labelledby={selected === null ? undefined : `core-sun-${selected}`}>
      {selected !== null && <>
        <p className="core-detail-ordinal" aria-hidden="true">{['I', 'II', 'III'][selected]}</p>
        <p className="core-detail-copy">{cores[selected][1]}</p>
      </>}
    </section>
    <footer><button className="contour-link" aria-label="Case studies" title="Case studies" onClick={onContinue}><span>Case studies</span> <ArrowRight aria-hidden="true" /></button></footer>
  </div>;
}

function CaseFocus({ project, mode, onModeChange }) {
  const listRef = useRef(null);
  const architecture = projectArchitectures[project.architectureKey];
  const stacks = spatialPortfolio.projectStacks[project.architectureKey] || [];
  const records = [
    { category: 'Overview', title: project.title, text: project.summary },
    ...project.caseStudy.map(([title, text]) => ({ category: 'Evidence', title, text })),
    ...architecture.steps.map(([title, text], index) => ({ category: 'Topology', title, text, step: index + 1 })),
    ...(architecture.placement || []).map(title => ({ category: 'Anim Blueprint', title, text: 'Additive motion follows the base locomotion pose.' })),
    ...architecture.notes.map(text => ({ category: 'Implementation', title: architecture.label, text })),
    ...(architecture.command ? [{ category: 'Debug', title: 'Runtime visibility', text: architecture.command }] : []),
    ...stacks.map(([title, items]) => ({ category: 'Stack', title, text: items.join(' / ') })),
  ];
  const visibleRecords = records.filter(record => mode === 'Topology'
    ? ['Topology', 'Anim Blueprint', 'Implementation', 'Debug'].includes(record.category)
    : record.category === mode);
  return <>
    <div className="case-focus-modes" role="group" aria-label="Project details">
      {[[FileText, 'Overview'], [ListChecks, 'Evidence'], [GitBranch, 'Topology'], [Layers, 'Stack']].map(([Icon, label]) =>
        <button key={label} aria-label={label} title={label} aria-pressed={mode === label} onClick={() => onModeChange(label)}><Icon aria-hidden="true" /><span>{label}</span></button>)}
    </div>
    <div ref={listRef} className="contour-reading-list case-detail-copy" data-mode={mode} data-lenis-prevent data-contour-reading tabIndex={0} aria-label={`${project.title} ${mode.toLowerCase()}`}>
      {visibleRecords.map((record, index) => <article className="contour-record" data-category={record.category} key={`${mode}-${index}`}>
        <p className="contour-eyebrow">{record.category}{record.step ? ` / ${String(record.step).padStart(2, '0')}` : ''}</p>
        <h3>{record.title}</h3><p>{record.text}</p>
      </article>)}
    </div>
    <footer><a className="contour-link" href={project.actions[0].href} {...getSafeLinkProps(project.actions[0].href)}><span>Repository</span> <ExternalLink aria-hidden="true" /></a></footer>
  </>;
}

export function ContourCaseStudies({ isActive, displayedProjectIndex, selectedProjectIndex, onProjectChange }) {
  const ref = useRef(null);
  const projectIndexRef = useRef(displayedProjectIndex);
  projectIndexRef.current = displayedProjectIndex;
  const [detail, setDetail] = useState({ project: displayedProjectIndex, mode: 'Overview' });
  const mode = detail.project === displayedProjectIndex ? detail.mode : 'Overview';
  const latest = useRef({ isActive, mode });
  latest.current = { isActive, mode };
  if (detail.project !== displayedProjectIndex) setDetail({ project: displayedProjectIndex, mode: 'Overview' });
  const selectMode = mode => changeTextContent(() => {
    // Resolve the project at commit time, after any queued project transition.
    setDetail({ project: projectIndexRef.current, mode });
  }, '.contour-projects .contour-reading-list', {
    key: 'case-detail',
    shouldUpdate: () => latest.current.isActive && latest.current.mode !== mode,
  });
  useContourContentLayout(ref, 'projects', isActive);
  const project = spatialPortfolio.projects[displayedProjectIndex];
  return <div ref={ref} data-lenis-prevent className={`contour-content contour-projects ${isActive ? 'is-present' : ''}`}>
    <header><h2>Case Studies</h2></header>
    <nav className="contour-project-tabs" aria-label="Projects">
      {spatialPortfolio.projects.map((item, index) => <button key={item.architectureKey} aria-pressed={selectedProjectIndex === index} onClick={() => onProjectChange(index)}>{['Pipeline', 'Plugin', 'Telemetry'][index]}</button>)}
    </nav>
    <CaseFocus project={project} mode={mode} onModeChange={selectMode} />
  </div>;
}
