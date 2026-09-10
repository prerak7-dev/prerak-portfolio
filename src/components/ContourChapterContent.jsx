import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch, Layers, FileText, ListChecks } from 'lucide-react';
import { useContourContentLayout } from '../hooks/useContourContentLayout.js';
import { projectArchitectures, spatialPortfolio } from '../data/spatialPortfolioData.js';
import { getSafeLinkProps } from '../security/contentSecurity.js';

function useFocusStep(count) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef(null);
  useEffect(() => setIndex(current => Math.min(current, count-1)), [count]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const select = next => {
    if (leaving || next === index || next < 0 || next >= count) return;
    setLeaving(true);
    timer.current = setTimeout(() => { setIndex(next); setLeaving(false); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240);
  };
  return { index, leaving, select };
}

function FocusPager({ index, count, select, label }) {
  return <nav className="focus-pager" aria-label={label}>
    <button type="button" disabled={index === 0} aria-label={`Previous ${label}`} onClick={() => select(index-1)}><ArrowLeft aria-hidden="true" /></button>
    <span aria-live="polite">{String(index+1).padStart(2,'0')} / {String(count).padStart(2,'0')}</span>
    <button type="button" disabled={index === count-1} aria-label={`Next ${label}`} onClick={() => select(index+1)}><ArrowRight aria-hidden="true" /></button>
  </nav>;
}

const cores = [
  ['Services', 'Reliable backends and asynchronous content pipelines.'],
  ['Unreal', 'Production tooling and procedural runtime systems.'],
  ['Telemetry', 'Observable systems and actionable operational evidence.'],
];

export function ContourCores({ isActive, onContinue }) {
  const ref = useRef(null);
  useContourContentLayout(ref, 'cores', isActive);
  const focus = useFocusStep(cores.length);
  return <div ref={ref} className={`contour-content contour-cores ${isActive ? 'is-present' : ''}`}>
    <header><p className="contour-eyebrow">Cores</p><h2>Three cores.<br />One connected practice.</h2></header>
    <article key={focus.index} className={`contour-focus ${focus.leaving ? 'is-leaving' : ''}`}>
      <h3>{cores[focus.index][0]}</h3><p>{cores[focus.index][1]}</p>
    </article>
    <footer><FocusPager {...focus} count={cores.length} label="core" /><button className="contour-link" onClick={onContinue}>Case studies <ArrowRight aria-hidden="true" /></button></footer>
  </div>;
}

function CaseFocus({ project }) {
  const [chunkSize, setChunkSize] = useState(() => window.innerWidth < 900 ? (window.innerHeight < 780 ? 70 : 220) : 600);
  useEffect(() => {
    const resize = () => setChunkSize(window.innerWidth < 900 ? (window.innerHeight < 780 ? 70 : 220) : 600);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  const architecture = projectArchitectures[project.architectureKey];
  const stacks = spatialPortfolio.projectStacks[project.architectureKey] || [];
  const records = [
    { category: 'Overview', title: project.title, text: project.summary },
    ...project.caseStudy.map(([title, text]) => ({ category: 'Evidence', title, text })),
    ...architecture.steps.map(([title, text], index) => ({ category: 'Topology', title, text, step: index+1 })),
    ...(architecture.placement || []).map(title => ({ category: 'Anim Blueprint', title, text: 'Additive motion follows the base locomotion pose.' })),
    ...architecture.notes.map(text => ({ category: 'Implementation', title: architecture.label, text })),
    ...(architecture.command ? [{ category: 'Debug', title: 'Runtime visibility', text: architecture.command }] : []),
    ...stacks.map(([title, items]) => ({ category: 'Stack', title, text: items.join(' / ') })),
  ];
  const pages = records.flatMap(record => {
    const chunks = [];
    let chunk = '';
    for (const word of record.text.split(/\s+/)) {
      if (chunk && chunk.length + word.length + 1 > chunkSize) { chunks.push(chunk); chunk = ''; }
      chunk += (chunk ? ' ' : '') + word;
    }
    if (chunk) chunks.push(chunk);
    return chunks.map((text,index) => ({ ...record, text, part: chunks.length > 1 ? `${index+1}/${chunks.length}` : '' }));
  });
  const focus = useFocusStep(pages.length);
  const current = pages[Math.min(focus.index, pages.length-1)];
  return <>
    <div className="case-focus-modes" role="group" aria-label="Project details">
      {[[FileText,'Overview'],[ListChecks,'Evidence'],[GitBranch,'Topology'],[Layers,'Stack']].map(([Icon, label]) => <button key={label} aria-label={label} title={label} aria-pressed={current.category === label} onClick={()=>focus.select(pages.findIndex(p=>p.category===label))}><Icon aria-hidden="true" /><span>{label}</span></button>)}
    </div>
    <article key={focus.index} className={`contour-focus ${focus.leaving ? 'is-leaving' : ''}`} aria-live="polite">
      <p className="contour-eyebrow">{current.category}{current.step ? ` / ${String(current.step).padStart(2,'0')}` : ''}{current.part ? ` / ${current.part}` : ''}</p>
      <h3>{current.title}</h3><p>{current.text}</p>
    </article>
    <footer><FocusPager {...focus} count={pages.length} label="project detail" /><a className="contour-link" href={project.actions[0].href} {...getSafeLinkProps(project.actions[0].href)}>Repository <ExternalLink aria-hidden="true" /></a></footer>
  </>;
}

export function ContourCaseStudies({ isActive, displayedProjectIndex, selectedProjectIndex, onProjectChange, sequencePhase }) {
  const ref = useRef(null);
  useContourContentLayout(ref, 'projects', isActive);
  const project = spatialPortfolio.projects[displayedProjectIndex];
  return <div ref={ref} className={`contour-content contour-projects ${isActive ? 'is-present' : ''} ${sequencePhase === 'exiting' ? 'is-departing' : ''}`}>
    <header><h2>Case Studies</h2></header>
    <nav className="contour-project-tabs" aria-label="Projects">
      {spatialPortfolio.projects.map((item,index) => <button key={item.architectureKey} aria-pressed={selectedProjectIndex===index} onClick={()=>onProjectChange(index)}>{['Pipeline','Plugin','Telemetry'][index]}</button>)}
    </nav>
    <CaseFocus key={project.architectureKey} project={project} />
  </div>;
}
