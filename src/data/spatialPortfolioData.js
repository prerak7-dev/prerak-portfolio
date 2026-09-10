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
    guide: 'A gate beneath a planet. Subtle. Notice the little circle at its heart? Even enormous mysteries tend to have a small way in.',
  },
  {
    id: 'cores',
    index: '01',
    navLabel: 'Cores',
    eyebrow: 'Engineering centers',
    title: 'Three cores. One connected practice.',
    guide: 'Three suns, and not one willing to set first. Watch the horizon hold them apart. Some ancient agreements are written in light rather than words.',
  },
  {
    id: 'projects',
    index: '02',
    navLabel: 'Case Studies',
    eyebrow: 'Engineering systems',
    title: 'Proof attached to every claim.',
    guide: 'That bright rim looks like an ending. Follow it a little farther. The sky has a habit of leaving its doors sideways.',
  },
  {
    id: 'professional',
    index: '03',
    navLabel: 'Experience',
    eyebrow: 'Professional record',
    title: 'Production work, traced through time.',
    guide: 'Keep an eye on the curve above us. The little wandering lights seem to know it by heart. I would ask for directions, but they look terribly busy being celestial.',
  },
  {
    id: 'education',
    index: '04',
    navLabel: 'Education',
    eyebrow: 'Learning record',
    title: 'A foundation that keeps moving.',
    guide: 'Recognise that curve? Good. A familiar sky is not always the same sky. Sometimes the trick is to stay still long enough to notice what moved.',
  },
  {
    id: 'personal',
    index: '05',
    navLabel: 'Field Notes',
    eyebrow: 'Outside the system',
    title: 'Photography, writing, and journeys in progress.',
    guide: 'There is a thin trail of light along the edge of this world. No footprints, naturally. Whoever passed through had the unfair advantage of not needing feet.',
  },
  {
    id: 'contact',
    index: '06',
    navLabel: 'Contact',
    eyebrow: 'The next transmission',
    title: 'Build the next system together.',
    guide: 'Look up. The last curve shelters a little more darkness than it explains. We could call that the end. The sky, rather inconveniently, has left room for another beginning.',
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
