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
    navLabel: 'Home',
    eyebrow: 'The threshold',
    title: 'Systems built for the worlds behind the screen.',
    guide: 'I am Prerak: a full-stack engineer, wonderer, and storyteller. Explore my three cores, dive into my case studies, or grab my resume from the header.',
  },
  {
    id: 'cores',
    index: '01',
    navLabel: 'Cores',
    eyebrow: 'Engineering centers',
    title: 'Three cores. One connected practice.',
    guide: 'My work connects three cores: reliable services, Unreal tooling, and telemetry. In Case Studies, I show how those disciplines come together in working systems.',
  },
  {
    id: 'projects',
    index: '02',
    navLabel: 'Case Studies',
    eyebrow: 'Engineering systems',
    title: 'Proof attached to every claim.',
    guide: 'Choose a project to explore my pipeline, Unreal plugin, or telemetry tool. Inspect the topology and technical stack, then open the repository to see the implementation behind my decisions.',
  },
  {
    id: 'professional',
    index: '03',
    navLabel: 'Experience',
    eyebrow: 'Professional record',
    title: 'Production work, traced through time.',
    guide: 'I am reworking this chapter of my professional story. For now, my resume in the header has my experience, and Case Studies shows the systems I have built.',
  },
  {
    id: 'education',
    index: '04',
    navLabel: 'Education',
    eyebrow: 'Learning record',
    title: 'A foundation that keeps moving.',
    guide: 'I am preparing this chapter about my education and continuing learning. My resume has the current details; my projects show where I put that learning to work.',
  },
  {
    id: 'personal',
    index: '05',
    navLabel: 'Field Notes',
    eyebrow: 'Outside the system',
    title: 'Photography, writing, and journeys in progress.',
    guide: 'This is where I will collect stories, photographs, and observations beyond engineering. I am still putting these field notes together.',
  },
  {
    id: 'contact',
    index: '06',
    navLabel: 'Contact',
    eyebrow: 'The next transmission',
    title: 'Build the next system together.',
    guide: 'Thanks for spending a little of your time with me. While I finish this chapter, you can find my GitHub and resume in the header, including my contact details in the resume.',
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
