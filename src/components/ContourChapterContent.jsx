import { useRef } from 'react';
import { ArrowRight, ExternalLink, GitBranch, Layers, FileText, ListChecks } from 'lucide-react';
import { useContourContentLayout } from '../hooks/useContourContentLayout.js';
import { projectArchitectures, spatialPortfolio } from '../data/spatialPortfolioData.js';
import { getSafeLinkProps } from '../security/contentSecurity.js';

const cores = [
  ['Services', 'Reliable backends and asynchronous content pipelines.'],
  ['Unreal', 'Production tooling and procedural runtime systems.'],
  ['Telemetry', 'Observable systems and actionable operational evidence.'],
];

export function ContourCores({ isActive, onContinue }) {
  const ref = useRef(null);
  useContourContentLayout(ref, 'cores', isActive);
  return <div ref={ref} data-lenis-prevent className={`contour-content contour-cores ${isActive ? 'is-present' : ''}`}>
    <header><p className="contour-eyebrow">Cores</p><h2>Three cores.<br />One connected practice.</h2></header>
    <div className="contour-reading-list">
      {cores.map(([title, text]) => <article className="contour-record" key={title}><h3>{title}</h3><p>{text}</p></article>)}
    </div>
    <footer><button className="contour-link" onClick={onContinue}><span>Case studies</span> <ArrowRight aria-hidden="true" /></button></footer>
  </div>;
}

function CaseFocus({ project }) {
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
  const jumpTo = category => {
    const list = listRef.current;
    const target = [...list.children].find(node => node.dataset.category === category);
    if (target) list.scrollTo({ top: target.offsetTop - list.offsetTop, behavior: 'auto' });
  };
  return <>
    <div className="case-focus-modes" role="group" aria-label="Project details">
      {[[FileText, 'Overview'], [ListChecks, 'Evidence'], [GitBranch, 'Topology'], [Layers, 'Stack']].map(([Icon, label]) =>
        <button key={label} aria-label={label} title={label} onClick={() => jumpTo(label)}><Icon aria-hidden="true" /><span>{label}</span></button>)}
    </div>
    <div ref={listRef} className="contour-reading-list" data-lenis-prevent tabIndex={0} aria-label={`${project.title} details`}>
      {records.map((record, index) => <article className="contour-record" data-category={record.category} key={index}>
        <p className="contour-eyebrow">{record.category}{record.step ? ` / ${String(record.step).padStart(2, '0')}` : ''}</p>
        <h3>{record.title}</h3><p>{record.text}</p>
      </article>)}
    </div>
    <footer><a className="contour-link" href={project.actions[0].href} {...getSafeLinkProps(project.actions[0].href)}><span>Repository</span> <ExternalLink aria-hidden="true" /></a></footer>
  </>;
}

export function ContourCaseStudies({ isActive, displayedProjectIndex, selectedProjectIndex, onProjectChange }) {
  const ref = useRef(null);
  useContourContentLayout(ref, 'projects', isActive);
  const project = spatialPortfolio.projects[displayedProjectIndex];
  return <div ref={ref} data-lenis-prevent className={`contour-content contour-projects ${isActive ? 'is-present' : ''}`}>
    <header><h2>Case Studies</h2></header>
    <nav className="contour-project-tabs" aria-label="Projects">
      {spatialPortfolio.projects.map((item, index) => <button key={item.architectureKey} aria-pressed={selectedProjectIndex === index} onClick={() => onProjectChange(index)}>{['Pipeline', 'Plugin', 'Telemetry'][index]}</button>)}
    </nav>
    <CaseFocus key={project.architectureKey} project={project} />
  </div>;
}
