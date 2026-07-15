import {
  developerPipelineSteps,
  educationTimeline,
  personalProjects,
  pluginAnimPlacement,
  pluginDebugChecks,
  pluginWorkflowSteps,
  professionalTimeline,
  projectStacks,
  projects,
  stackGroups,
  telemetryArchitectureSteps,
  telemetryScaleNotes,
} from './portfolioData.js';
import { deepFreeze } from '../security/contentSecurity.js';

export const spatialChapters = [
  {
    id: 'intro',
    index: '00',
    navLabel: 'Intro',
    eyebrow: 'The threshold',
    title: 'Systems built for the worlds behind the screen.',
    guide: 'I build backend and full-stack systems for game technology, production tooling, and observable services. This threshold sets the focus for everything ahead.',
  },
  {
    id: 'projects',
    index: '01',
    navLabel: 'Case Studies',
    eyebrow: 'Engineering systems',
    title: 'Proof attached to every claim.',
    guide: 'In Case Studies, I unpack three evidence-led builds: an asynchronous animation pipeline, an Unreal procedural motion plugin, and a telemetry analytics tool. I have recorded the problem, my role, the difficult decisions, and the result for each one.',
  },
  {
    id: 'professional',
    index: '02',
    navLabel: 'Experience',
    eyebrow: 'Professional record',
    title: 'Production work, traced through time.',
    guide: 'In Experience, I trace my professional work across enterprise web delivery and data analysis, including my responsibilities, the production context, and the technical stack I used along the way.',
  },
  {
    id: 'education',
    index: '03',
    navLabel: 'Education',
    eyebrow: 'Learning record',
    title: 'A foundation that keeps moving.',
    guide: 'In Education, I connect my computer science foundation with the independent learning I continue in backend architecture, real-time systems, Unreal tooling, and game technology.',
  },
  {
    id: 'personal',
    index: '04',
    navLabel: 'Field Notes',
    eyebrow: 'Outside the system',
    title: 'Photography, writing, and journeys in progress.',
    guide: 'In Field Notes, I share photography, writing, and travel or adventure work. These are the observation, storytelling, and curiosity that I carry alongside engineering.',
  },
  {
    id: 'contact',
    index: '05',
    navLabel: 'Contact',
    eyebrow: 'The next transmission',
    title: 'Build the next system together.',
    guide: 'In Contact, I have gathered my email, GitHub, LinkedIn, and resume. Reach out when you want to talk about engineering, platforms, online services, tooling, or game technology.',
  },
];

export const projectArchitectures = {
  pipeline: {
    label: 'Asynchronous motion pipeline',
    description: 'A developer-readable path from source motion to a validated Unreal import artifact.',
    steps: developerPipelineSteps,
    notes: [
      'Kafka keeps slow transforms off the ingest request path.',
      'Redis makes progress, retries, and failures inspectable.',
      'The JSON boundary isolates backend processing from Unreal authoring.',
    ],
  },
  plugin: {
    label: 'Additive Unreal runtime',
    description: 'A short-lived procedural action layer that remains separate from the locomotion state machine.',
    steps: pluginWorkflowSteps,
    placement: pluginAnimPlacement,
    notes: pluginDebugChecks,
    command: 'aegis.Motion.DebugProceduralDriver 0',
  },
  telemetry: {
    label: 'Realtime telemetry intelligence',
    description: 'A local-to-production path from synthetic game events to incidents, evidence, and scaling decisions.',
    steps: telemetryArchitectureSteps,
    notes: telemetryScaleNotes,
  },
};

export const spatialThemes = [
  { id: 'default', label: 'Monochrome', short: 'M', atmosphere: 'Windblown sand' },
  { id: 'fall', label: 'Fall', short: 'F', atmosphere: 'Autumn leaf drift' },
  { id: 'spring', label: 'Spring', short: 'S', atmosphere: 'Leaves and blossoms' },
  { id: 'winter', label: 'Winter', short: 'W', atmosphere: 'Tundra snowfall' },
];

export const spatialWeather = [
  { id: 'clear', label: 'Dust' },
  { id: 'cloud', label: 'Haze' },
  { id: 'rain', label: 'Rain' },
  { id: 'storm', label: 'Storm' },
  { id: 'snow', label: 'Snow' },
];

export const spatialPortfolio = {
  projects,
  professionalTimeline,
  educationTimeline,
  personalProjects,
  stackGroups,
  projectStacks,
};

deepFreeze(spatialChapters);
deepFreeze(projectArchitectures);
deepFreeze(spatialThemes);
deepFreeze(spatialWeather);
deepFreeze(spatialPortfolio);
