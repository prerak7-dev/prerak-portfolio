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
    guide: 'You remembered a key? Keep it in your pocket, then. I have known this threshold a very long time. It was never built to keep anyone out.',
  },
  {
    id: 'cores',
    index: '01',
    navLabel: 'Cores',
    eyebrow: 'Engineering centers',
    title: 'Three cores. One connected practice.',
    guide: 'They divided the flame so no one could wield it alone. A sound precaution. Leaving the pieces within whispering distance was, perhaps, less wise.',
  },
  {
    id: 'projects',
    index: '02',
    navLabel: 'Case Studies',
    eyebrow: 'Engineering systems',
    title: 'Proof attached to every claim.',
    guide: 'A borrowed dawn, returned before nightfall. Those were the terms. The borrower has since misplaced several centuries. I suspect the debt has not forgotten him.',
  },
  {
    id: 'professional',
    index: '03',
    navLabel: 'Experience',
    eyebrow: 'Professional record',
    title: 'Production work, traced through time.',
    guide: 'I once waited here for a man who remembered tomorrow. He arrived yesterday. We have been missing each other ever since.',
  },
  {
    id: 'education',
    index: '04',
    navLabel: 'Education',
    eyebrow: 'Learning record',
    title: 'A foundation that keeps moving.',
    guide: 'He left a question on the back of my map. I wore the paper thin looking for an answer. Only then did I notice whose handwriting it was.',
  },
  {
    id: 'personal',
    index: '05',
    navLabel: 'Field Notes',
    eyebrow: 'Outside the system',
    title: 'Photography, writing, and journeys in progress.',
    guide: 'There was a name in the margin once. Rain took the ink, but not the promise. I still leave that line unwritten.',
  },
  {
    id: 'contact',
    index: '06',
    navLabel: 'Contact',
    eyebrow: 'The next transmission',
    title: 'Build the next system together.',
    guide: 'Ah. That key in your pocket. I wondered when it would grow warm. Keep it a little longer; someone has been waiting on the other side of this story.',
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
