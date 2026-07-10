import { createAssetPath, deepFreeze, validatePortfolioData } from '../security/contentSecurity.js';

const baseUrl = import.meta.env.BASE_URL;

export const profile = {
  name: 'Prerak Pandey',
  title: 'Backend / Full-Stack Engineer',
  tagline: 'building game-technology systems',
  location: 'Chicago, IL · Open to Amsterdam / relocation',
  email: 'prerak.pandey7@gmail.com',
  github: 'https://github.com/prerak7-dev',
  linkedin: 'https://www.linkedin.com/in/prerak-pandey',
  resume: createAssetPath(baseUrl, 'Prerak_Pandey_Resume.pdf'),
  photo: createAssetPath(baseUrl, 'profile-photo.png'),
};

export const sectors = [
  { id: 'hero', label: 'Intro', title: 'Backend + Game Tech', note: 'positioning' },
  { id: 'tab-content', label: 'Content', title: 'Tabbed Portfolio', note: 'selected view' },
  { id: 'contact', label: 'Contact', title: 'Next Step', note: 'links' },
];

export const projects = [
  {
    number: '01',
    title: 'Aegis Animation Pipeline',
    eyebrow: 'Java / Spring Boot / Redis / Kafka',
    architectureKey: 'pipeline',
    summary:
      'Designed an asynchronous processing system that decouples motion-data ingestion, transformation, job state, validation, and Unreal export.',
    tags: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'JSON', 'Validation'],
    flow: ['mocap', 'ingest', 'kafka', 'redis', 'json', 'unreal'],
    caseStudy: [
      ['Problem', 'Motion data work can become brittle when ingestion, processing, retries, and export concerns live in the same path.'],
      ['Role', 'Designed the service boundaries, job-state model, validation flow, and Unreal-facing output contract.'],
      ['Architecture', 'Spring Boot services communicate across Kafka topics while Redis tracks progress, metadata, retries, and failure state.'],
      ['Decision', 'Kept async boundaries explicit so processing can fail, retry, or be inspected without blocking ingest or export.'],
      ['Evidence', 'Repository includes the pipeline source, service structure, JSON overlay contract, and validation-oriented implementation.'],
      ['Result', 'A traceable path from uploaded motion data to Unreal-importable procedural animation overlays.'],
    ],
    bullets: [
      'Kafka-separated ingestion, processing, validation, and publishing flow.',
      'Redis-backed job state for progress tracking, retries, and fault isolation.',
      'JSON overlay output designed for Unreal procedural-animation import.',
      'Clear async boundaries between service responsibilities and Unreal-facing artifacts.',
    ],
    actions: [
      { label: 'View repository', href: 'https://github.com/prerak7-dev/AegisMotionSandbox' },
      { label: 'See architecture', href: '#pipeline-architecture' },
    ],
  },
  {
    number: '02',
    title: 'Aegis Motion Plugin',
    eyebrow: 'Unreal Engine C++ / Editor Tooling',
    architectureKey: 'plugin',
    summary:
      'A curve-driven Unreal Engine plugin for procedural animation authoring, runtime pose driving, data-asset workflows, and debug visualization.',
    tags: ['Unreal C++', 'Data Assets', 'Editor Tools', 'Animation Curves', 'Blueprint API'],
    flow: ['data asset', 'curves', 'driver', 'blueprint', 'debug', 'runtime'],
    caseStudy: [
      ['Problem', 'Procedural animation tools need authorable data, runtime controls, and editor visibility to be useful during iteration.'],
      ['Role', 'Built the Unreal-side tool surface: data assets, runtime driver behavior, debug overlays, and Blueprint-facing integration.'],
      ['Architecture', 'Animation curves and data assets drive runtime pose behavior while editor tooling keeps iteration inspectable.'],
      ['Decision', 'Favored explicit authored assets over hidden runtime assumptions so designers and engineers can reason about motion changes.'],
      ['Evidence', 'Repository contains the Unreal sandbox and plugin work that connects generated motion data to in-engine workflows.'],
      ['Result', 'A practical bridge from backend-generated animation data into Unreal authoring and runtime experimentation.'],
    ],
    bullets: [
      'Procedural motion driver using authored data assets and animation curves.',
      'Runtime smoothing, action playback, debug overlays, and editor-first iteration.',
      'Designed to connect backend-generated animation data to Unreal workflows.',
      'Exposes motion behavior through practical editor and Blueprint-facing surfaces.',
    ],
    actions: [
      { label: 'View repository', href: 'https://github.com/prerak7-dev/AegisMotionSandbox' },
      { label: 'See architecture', href: '#plugin-architecture' },
    ],
  },
  {
    number: '03',
    title: 'Aegis Telemetry Analytics Tool',
    eyebrow: 'Analytics / Telemetry / Tooling',
    architectureKey: 'telemetry',
    summary:
      'A telemetry analytics project for turning event streams and gameplay/system signals into inspectable trends, operational questions, and engineering feedback.',
    tags: ['Telemetry', 'Analytics', 'Data Modeling', 'Dashboards', 'Developer Tools'],
    flow: ['events', 'ingest', 'model', 'query', 'signals', 'insight'],
    caseStudy: [
      ['Problem', 'Raw telemetry is difficult to use when events are not shaped into clear questions, trends, and decisions.'],
      ['Role', 'Built the project as a separate analytics-focused proof point to show data workflow, product thinking, and engineering range beyond the animation pipeline.'],
      ['Architecture', 'Synthetic traffic flows into a FastAPI collector, through Redpanda topics, into a realtime processor, then into ClickHouse tables that power the Streamlit dashboard.'],
      ['Decision', 'Keeps the analytics surface separate from the animation pipeline so the work shows a different production-adjacent context.'],
      ['Evidence', 'Repository provides the implementation space for telemetry modeling, analysis views, and documentation as the tool evolves.'],
      ['Result', 'Adds a distinct data-platform project beside the Aegis game-tech systems and broadens the technical evidence set.'],
    ],
    bullets: [
      'Frames telemetry as product and engineering evidence, not just raw event logging.',
      'Separates event shape, analysis questions, and presentation concerns.',
      'Adds a third project context beyond animation pipeline and Unreal plugin work.',
      'Designed to grow into dashboards, test fixtures, sample events, and benchmark notes.',
    ],
    actions: [
      { label: 'View repository', href: 'https://github.com/prerak7-dev/AegisTelemetryAnalyticTool' },
      { label: 'See architecture', href: '#telemetry-architecture' },
    ],
  },
];

export const pipelineSteps = [
  ['Data Sources', 'Mocap · BVH · JSON · client/CMS data'],
  ['Ingest Service', 'Validation, normalization, job creation'],
  ['Kafka Topics', 'Async message boundaries between services'],
  ['Processors', 'Curve generation and overlay shaping'],
  ['Redis State', 'Progress, metadata, retry/fault isolation'],
  ['JSON Overlays', 'Unreal-ready procedural animation output'],
  ['Unreal Import', 'Data assets, curves, runtime driver'],
];

export const developerPipelineSteps = [
  ['Data Sources', 'Motion files, JSON payloads, or client data enter the system as source records.'],
  ['Ingest Service', 'The Spring Boot service validates the request, normalizes the payload, and creates a trackable job.'],
  ['Kafka Topics', 'Each major step publishes or consumes messages so slow processing does not block ingestion.'],
  ['Processors', 'Worker services transform the source data into curve and overlay data for procedural animation.'],
  ['Redis State', 'Redis stores job progress, metadata, retry state, and failure details that the API can report.'],
  ['JSON Overlays', 'The pipeline writes Unreal-facing JSON that describes the generated procedural motion output.'],
  ['Unreal Import', 'The Unreal side can turn the exported data into assets, curves, and runtime driver inputs.'],
];

export const pluginWorkflowSteps = [
  ['Attach Component', 'Add UAegisProceduralActionComponent to the character that owns procedural action state.'],
  ['Action Asset', 'Create or import a UAegisProceduralActionAsset that defines timing, curves, and affected channels.'],
  ['Gameplay Trigger', 'In the Character Blueprint, call StartAction when input or gameplay state should trigger the action.'],
  ['Anim Driver', 'Place the Aegis procedural motion driver after the base locomotion pose in the Anim Blueprint.'],
  ['State Binding', 'Point the driver at the character/component state so runtime playback can read active action data.'],
  ['Runtime Inspect', 'Play in editor and use debug tools to inspect timing, curves, and applied transforms.'],
];

export const pluginAnimPlacement = [
  'Locomotion State Machine',
  'Cached Base Pose',
  'Aegis Procedural Motion Driver',
  'Output Pose',
];

export const pluginDebugChecks = [
  'Confirm that the character owns an AegisProceduralActionComponent.',
  'Confirm that StartAction is called with a valid action asset.',
  'Confirm that normalized time moves from 0 to 1.',
  'Confirm that expected curve channels have keys.',
  'Confirm that the affected bone names match the active skeleton.',
  'Confirm that debug scrub mode is disabled during normal runtime playback.',
];

export const telemetryArchitectureSteps = [
  ['Simulator', 'A synthetic gameplay/server/network generator produces local demo traffic for normal load, physics spikes, login surges, replication overload, and weekend-event meltdowns.'],
  ['FastAPI Collector', 'Collector endpoints receive telemetry events, accept supported source profiles, validate request shape, and expose health and metrics endpoints.'],
  ['Redpanda Topics', 'Kafka-compatible topics decouple event collection from processing and model the partitioned stream used by a live-service backend.'],
  ['Realtime Processor', 'Python processors consume events, run rolling-window aggregation, score incidents, and attach evidence for recommendations.'],
  ['ClickHouse Storage', 'ClickHouse stores raw events, aggregates, quality failures, incidents, snapshots, and optional production tables for realtime OLAP queries.'],
  ['Streamlit Dashboard', 'The dashboard reads ClickHouse data for command-center views, incident drilldowns, data quality, scaling readiness, rules, timelines, and analyst tooling.'],
];

export const telemetryScaleNotes = [
  'Use regional collectors and partitioned Kafka-compatible streams when traffic grows beyond one local collector.',
  'Keep hot realtime aggregates in ClickHouse and move older or cheaper data to warm/cold storage paths.',
  'Apply backpressure and adaptive sampling so collector overload does not hide the most important telemetry.',
  'Use recommendation rules, evidence, confidence, owners, validation plans, and guardrail metrics to make incidents actionable.',
  'Production path: Kubernetes, Flink or Kafka Streams, ClickHouse clusters, object storage, OpenAPI contracts, Prometheus, Grafana, and SLO dashboards.',
];

export const stackGroups = [
  ['Backend & Services', ['Java', 'Spring Boot', 'C#', '.NET', 'Node.js', 'REST APIs', 'GraphQL']],
  ['Cloud & Delivery', ['AWS', 'S3', 'Cognito', 'IAM', 'Lambda', 'Docker', 'Git', 'CI/CD']],
  ['Game Tech', ['Unreal Engine C++', 'Anim Blueprints', 'Mocap', 'Data Assets', 'Editor Tools']],
  ['Data & DevOps', ['Kafka', 'Redis', 'SQL/PostgreSQL', 'MySQL', 'Logging', 'Monitoring']],
];

export const projectStacks = {
  pipeline: [
    ['Backend Runtime', ['Java', 'Spring Boot', 'REST APIs', 'Validation', 'Service Boundaries']],
    ['Async Processing', ['Kafka', 'Topic Design', 'Workers', 'Retries', 'Fault Isolation']],
    ['State & Output', ['Redis', 'Job Progress', 'JSON Overlays', 'Unreal Import Contract']],
    ['Developer Evidence', ['Repository Structure', 'Pipeline Docs', 'Sample Payloads', 'Implementation Notes']],
  ],
  plugin: [
    ['Unreal Runtime', ['Unreal Engine C++', 'Actor Components', 'Anim Blueprint Nodes', 'Runtime Pose Flow']],
    ['Authoring Model', ['Data Assets', 'Animation Curves', 'Blueprint API', 'StartAction Trigger']],
    ['Debugging', ['Console Variables', 'Driver Logs', 'Debug Visualization', 'Normalized Time Checks']],
    ['Integration Surface', ['Locomotion Additive Layer', 'Skeleton/Bone Mapping', 'Editor Iteration']],
  ],
  telemetry: [
    ['Collection & Stream', ['FastAPI', 'Redpanda', 'Kafka-Compatible Topics', 'Source Profiles']],
    ['Processing & Storage', ['Python Processors', 'Rolling Windows', 'ClickHouse', 'Raw + Aggregate Tables']],
    ['Analysis Surface', ['Streamlit', 'Incident Drilldowns', 'Data Quality', 'Scaling Readiness']],
    ['Production Readiness', ['OpenAPI', 'Prometheus', 'Grafana', 'Load Tests', 'Recommendation Rules']],
  ],
};

export const professionalTimeline = [
  {
    meta: 'Jul 2021 - Apr 2024 / Des Plaines, IL',
    title: 'Web Application Developer',
    subtitle: 'Americaneagle.com',
    body:
      'Built and maintained enterprise Sitecore and headless web applications for insurance, nonprofit, medical/scientific, and data-sector clients across CMS integrations, cloud services, CI/CD deployments, reporting tools, and client delivery.',
    bullets: [
      'Worked across backend services, frontend integration, QA cycles, deployments, and stakeholder-facing delivery.',
      'Translated ambiguous client requirements into maintainable implementation plans and production releases.',
    ],
  },
  {
    meta: 'Dec 2017 - May 2021 / Mahwah, NJ',
    title: 'Student Data Analyst',
    subtitle: 'Ramapo College of New Jersey',
    body:
      'Analyzed academic and non-academic data to support advising allocation, reporting, and student-success planning while automating recurring reporting workflows.',
    bullets: [
      'Built a practical foundation in data cleaning, analysis, reporting, and operational communication.',
      'Turned institutional data into recommendations that could be used by advising and planning teams.',
    ],
  },
];

export const educationTimeline = [
  {
    meta: '2017 - 2021 / Mahwah, NJ',
    title: 'Ramapo College of New Jersey',
    subtitle: 'Applied computing, analytics, and systems foundation',
    body:
      'Developed the academic base for software engineering, data analysis, reporting workflows, and technical communication while working in a student data role.',
    bullets: [
      'Combined coursework with hands-on institutional data analysis and recurring reporting responsibilities.',
      'Built the habits that now show up in backend design: clarity, traceability, and practical delivery.',
    ],
  },
  {
    meta: 'Ongoing',
    title: 'Independent Technical Study',
    subtitle: 'Backend systems, game technology, and production tooling',
    body:
      'Continues building systems around async services, cloud delivery, Unreal tooling, procedural animation, and content pipeline architecture.',
    bullets: [
      'Connects service architecture with game-production workflows through hands-on systems work.',
      'Focuses on production-adjacent systems that are visible, explainable, and extensible.',
    ],
  },
];

export const personalProjects = [
  {
    meta: 'Photography',
    title: 'Visual Field Notes',
    subtitle: 'Composition, light, cities, landscapes',
    body:
      'A personal practice for noticing detail, framing atmosphere, and building a sharper eye for environments and visual storytelling.',
    bullets: ['Street, travel, portrait, and landscape-oriented collections.', 'Useful creative muscle for game worlds, mood, and presentation.'],
    media: [
      {
        type: 'photo',
        src: '',
        alt: 'City light and architectural framing study',
        meta: 'Photo / Urban study',
        caption: 'A placeholder slot for a city, street, or architecture frame with notes about light, texture, and composition.',
      },
      {
        type: 'photo',
        src: '',
        alt: 'Landscape atmosphere and depth study',
        meta: 'Photo / Landscape',
        caption: 'A place to collect outdoor compositions, weather, mountain silhouettes, skyline layers, or wide environmental shots.',
      },
      {
        type: 'video',
        src: '',
        poster: '',
        alt: 'Short motion study from a photo walk',
        meta: 'Video / Motion note',
        caption: 'A short clip slot for movement, ambient detail, camera tests, or environmental reference gathered during a walk.',
      },
    ],
  },
  {
    meta: 'Writing',
    title: 'Essays, Notes, and Narrative Sketches',
    subtitle: 'Reflection, technical storytelling, creative work',
    body:
      'Writing as a way to clarify ideas, document experiences, and shape technical or personal material into something readable and memorable.',
    bullets: ['Short-form reflective writing and project narratives.', 'A bridge between engineering detail and human context.'],
    media: [
      {
        type: 'photo',
        src: '',
        alt: 'Writing desk, draft, or notebook image',
        meta: 'Photo / Draft context',
        caption: 'A visual cover slot for an essay, notebook scan, workspace image, or thematic reference connected to a piece of writing.',
      },
      {
        type: 'photo',
        src: '',
        alt: 'Narrative sketch or essay cover image',
        meta: 'Photo / Essay cover',
        caption: 'A caption space for the idea behind a personal essay, technical reflection, project narrative, or creative sketch.',
      },
      {
        type: 'video',
        src: '',
        poster: '',
        alt: 'Reading, voice note, or process clip',
        meta: 'Video / Process',
        caption: 'A video slot for a reading excerpt, process note, recorded thought, or short context clip around a written piece.',
      },
    ],
  },
  {
    meta: 'Travel / Adventure',
    title: 'Experience-Led Exploration',
    subtitle: 'Places, movement, and perspective',
    body:
      'Travel and adventure experiences feed the portfolio world-building sensibility: routes, weather, terrain, culture, and the feeling of moving through a place.',
    bullets: ['Designed to expand into location-specific stories, galleries, or field logs.', 'Pairs naturally with photography and writing sections.'],
    media: [
      {
        type: 'photo',
        src: '',
        alt: 'Route, trail, or destination field image',
        meta: 'Photo / Field log',
        caption: 'A slot for travel memories, trail references, city routes, or the first image in a location-specific adventure note.',
      },
      {
        type: 'video',
        src: '',
        poster: '',
        alt: 'Adventure movement or travel atmosphere clip',
        meta: 'Video / Movement',
        caption: 'A clip slot for road movement, weather, terrain, arrival moments, or ambient details from a trip.',
      },
      {
        type: 'photo',
        src: '',
        alt: 'Culture, food, people, or place detail',
        meta: 'Photo / Place detail',
        caption: 'A caption area for the small details that make a place memorable: textures, signs, rituals, meals, or quiet moments.',
      },
    ],
  },
];

export const heroTabs = [
  {
    id: 'portfolio',
    label: 'Engineering Case Studies',
    kicker: '01 / Systems',
    summary: 'Selected technical work with direct repositories, architecture decisions, implementation evidence, and Unreal-facing game-technology context.',
    blocks: [{ type: 'projects' }],
  },
  {
    id: 'professional',
    label: 'Professional Timeline',
    kicker: '02 / Work',
    summary: 'A detailed professional track from data analysis into production web engineering and client-facing delivery.',
    blocks: [{ type: 'timeline', eyebrow: 'Professional timeline', title: 'Production web engineering plus data-analysis roots.', items: professionalTimeline }, { type: 'stack' }],
  },
  {
    id: 'education',
    label: 'Education Timeline',
    kicker: '03 / Learning',
    summary: 'Academic foundation and ongoing technical study behind the engineering, data, and game-technology work.',
    blocks: [{ type: 'timeline', eyebrow: 'Education timeline', title: 'Academic foundation, self-directed study, and technical growth.', items: educationTimeline }],
  },
  {
    id: 'personal',
    label: 'Personal Projects',
    kicker: '04 / Outside Work',
    summary: 'Creative and exploratory projects that shape the visual, narrative, and experiential side of the portfolio.',
    blocks: [{ type: 'personal', eyebrow: 'Personal projects', title: 'Photography, writing, travel, and adventure experiences.' }],
  },
];

export const weatherCodes = {
  0: ['Clear', 'clear'], 1: ['Mainly clear', 'clear'], 2: ['Partly cloudy', 'cloud'], 3: ['Overcast', 'cloud'],
  45: ['Fog', 'fog'], 48: ['Rime fog', 'fog'],
  51: ['Light drizzle', 'drizzle'], 53: ['Drizzle', 'drizzle'], 55: ['Dense drizzle', 'rain'],
  56: ['Freezing drizzle', 'snow'], 57: ['Dense freezing drizzle', 'snow'],
  61: ['Slight rain', 'rain'], 63: ['Rain', 'rain'], 65: ['Heavy rain', 'heavy-rain'],
  66: ['Freezing rain', 'snow'], 67: ['Heavy freezing rain', 'snow'],
  71: ['Slight snow', 'snow'], 73: ['Snow', 'snow'], 75: ['Heavy snow', 'heavy-snow'], 77: ['Snow grains', 'snow'],
  80: ['Rain showers', 'rain'], 81: ['Rain showers', 'rain'], 82: ['Violent rain showers', 'heavy-rain'],
  85: ['Snow showers', 'snow'], 86: ['Heavy snow showers', 'heavy-snow'],
  95: ['Thunderstorm', 'storm'], 96: ['Thunderstorm with hail', 'storm'], 99: ['Heavy thunderstorm with hail', 'storm'],
};

export const weatherNames = {
  clear: 'Clear glow',
  cloud: 'Cloud cover',
  fog: 'Fog',
  drizzle: 'Drizzle',
  rain: 'Rain',
  'heavy-rain': 'Heavy rain',
  storm: 'Lightning',
  snow: 'Snow',
  'heavy-snow': 'Heavy snow',
};

export const manualWeatherCycle = ['snow', 'rain', 'storm', 'cloud', 'clear'];


validatePortfolioData({ profile, projects, personalProjects });
[
  profile,
  sectors,
  projects,
  pipelineSteps,
  developerPipelineSteps,
  pluginWorkflowSteps,
  pluginAnimPlacement,
  pluginDebugChecks,
  telemetryArchitectureSteps,
  telemetryScaleNotes,
  stackGroups,
  projectStacks,
  professionalTimeline,
  educationTimeline,
  personalProjects,
  heroTabs,
  weatherCodes,
  weatherNames,
  manualWeatherCycle,
].forEach((value) => deepFreeze(value));
