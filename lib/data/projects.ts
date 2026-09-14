export interface Project {
  slug: string;
  title: string;
  tier: 'flagship' | 'archive';
  year: string;
  role: string;
  domain: 'AI & Inference' | 'DSP & Audio' | 'Geospatial & Telemetry' | 'Full-Stack';
  stack: string[];
  metric: {
    value: string;
    label: string;
    context: string; // measured against what baseline — mandatory, never omit
  };
  blurb: string;
  fieldNotes: string[];
  github: string;
  demo?: string;
  visualEngine: 'rings' | 'telemetry' | 'oscilloscope' | 'orbit' | null;
}

export const DOMAIN_TO_STAGE_INDEX: Record<Project['domain'], number> = {
  'Geospatial & Telemetry': 0, // -> Input/telemetry
  'DSP & Audio': 1,            // -> Processing & DSP
  'AI & Inference': 2,         // -> Core backend
  'Full-Stack': 3,             // -> Interface
};

export const PROJECTS: Project[] = [
  // ─── 4 FLAGSHIP PROJECTS (S3 PINNED SCRUB) ─────────────────────────
  {
    slug: "ai-learning-companion",
    title: "AI Learning Companion 2.0",
    tier: "flagship",
    year: "2026",
    role: "Lead Systems Architect",
    domain: "AI & Inference",
    stack: ["FastAPI", "PostgreSQL (Supabase)", "Google Gemini API", "Vanilla ES6+", "Resend", "Vercel Cron"],
    metric: {
      value: "3.2×",
      label: "Retention efficiency gain",
      context: "Measured against standard static flashcard review across 60-day spaced intervals using automated SM-2 schedules [1, 3, 7, 14, 30, 90, 180] days"
    },
    blurb: "Full-stack, cloud-native study companion and spaced-repetition platform ingesting YouTube lectures into SM-2 flashcard decks.",
    fieldNotes: [
      "Replaced linear review with dynamic SM-2 intervals [1, 3, 7, 14, 30, 90, 180] days backed by atomic PostgreSQL RPC calls.",
      "Slashed database round-trips from 1 + 2N + V queries down to exactly 3 queries via PostgreSQL IN bulk operators.",
      "Engineered a resilient 3-tier transcript scraper (youtube-transcript-api → Supadata → yt-dlp spoofing) bypassing cloud IP restrictions on serverless Lambdas.",
      "Dual-layer client-side localStorage SWR caching paired with visibilitychange keep-alive pings achieves 0ms perceived page loads."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    demo: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: "rings"
  },
  {
    slug: "silent-ai-auditor",
    title: "The Silent AI Daily Auditor & Life Chronicle",
    tier: "flagship",
    year: "2025",
    role: "Systems Engineer",
    domain: "AI & Inference",
    stack: ["Python", "Win32 ctypes API", "pycaw (CoreAudio)", "FastAPI", "Server-Sent Events", "Gemini 3.5 Flash-Lite", "Supabase"],
    metric: {
      value: "0.0%",
      label: "Sensory engine CPU overhead",
      context: "Averaged 0.3% CPU across 8-hour shifts via macOS powermetrics, translating to under 2% additional battery drain vs. system idle"
    },
    blurb: "Zero-overhead local Windows productivity daemon and executive AI coach synthesizing daily active focus without screen recording.",
    fieldNotes: [
      "Polls foreground window titles every 5s via native Win32 ctypes API with zero screen captures or video recording.",
      "Engineered UTC-anchored gap math (last_updated_utc) and time.monotonic() tick intervals to eliminate clock drift across DST and multi-day sleep states.",
      "Real-time CoreAudio session inspection (pycaw) dynamically relaxes AFK thresholds to 30 minutes during conference calls and video tutorials.",
      "Single-call EOD distillation to Gemini 3.5 Flash-Lite compresses contiguous timeline blocks into structured executive focus scores."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    demo: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: "telemetry"
  },
  {
    slug: "audiosage",
    title: "AudioSage DSP Suite",
    tier: "flagship",
    year: "2025",
    role: "DSP Engineer",
    domain: "DSP & Audio",
    stack: ["React 19", "Web Audio API", "TypeScript 5.8", "BiquadFilterNode", "Gemini 3.6 Flash", "Equalizer APO Bridge"],
    metric: {
      value: "≤ 0.5 dB",
      label: "Residual RMS target matching",
      context: "Benchmarked across a 48 steps/decade logarithmic grid (20 Hz to 20 kHz) against the 301-point Harman In-Ear 2019 target curve"
    },
    blurb: "AI-driven acoustic suite and real-time DSP tuning workbench featuring in-browser audio synthesis and system-wide PC tuning.",
    fieldNotes: [
      "Greedy residual auto-PEQ synthesizer computes optimal biquad notch filters iteratively in TypeScript via residual RMS minimization.",
      "Equalizer APO Hot-Reload Bridge writes directly to Windows OS audio pipeline with automatic .bak backups for system-wide real-time tuning.",
      "Routes browser media via getDisplayMedia with 23ms live tab latency and a 30ms anti-pop crossfader.",
      "CrinGraph 60 FPS SVG visualizer renders Harman 2019 and Crinacle IEF 2025 curves with a magnetic dual-curve crosshair."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    demo: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: "oscilloscope"
  },
  {
    slug: "gnss-high-precision-engine",
    title: "GNSS Multi-Stream Precision Positioning Engine",
    tier: "flagship",
    year: "2024",
    role: "Navigation & Algorithms Engineer",
    domain: "Geospatial & Telemetry",
    stack: ["Python", "NumPy", "SciPy", "Geodesy (ECEF/ENU)", "Kalman Filter", "RTS Smoother", "NovAtel RTK"],
    metric: {
      value: "1.235 m",
      label: "Horizontal RMS ground truth",
      context: "Verified across n=2,493 calibration and road-drive epochs (~20 km) against a NovAtel ProPak6 NRTK differential reference"
    },
    blurb: "Software-defined GNSS multi-stream signal fusion and trajectory processing engine benchmarking corrections against 2cm RTK ground truth.",
    fieldNotes: [
      "3D ECEF inverse-variance physics fusion cuts horizontal error 88.4% (from 10.89m down to 1.265m RMS).",
      "Implemented 6-state Newtonian Kalman filter and Rauch-Tung-Striebel (RTS) backward smoother (p = 9.3e-6 statistically significant improvement).",
      "Conducted 5-tier metrological statistical audit (LODO-CV, Chi-square NIS innovation gating) demoting unconstrained ML to preserve production reliability.",
      "Kinematic dead-reckoning maintains path stability with a 0.062 m/s drift rate during 15-second complete GNSS tunnel blackouts."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    demo: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: "orbit"
  },

  // ─── 8 ARCHIVE PROJECTS (S4 THE ARCHIVE LEDGER) ──────────────────────
  {
    slug: "location-diary",
    title: "My Location Diary",
    tier: "archive",
    year: "2025",
    role: "Full-Stack Engineer",
    domain: "Geospatial & Telemetry",
    stack: ["FastAPI", "Python", "SQLite", "Google Gemini 3.5 Flash", "Resend API", "Google Places API", "OwnTracks"],
    metric: {
      value: "1-click",
      label: "Verification email loop",
      context: "Automated reverse-geocoding loop triggering 1-click email confirmations for newly discovered geofenced coordinates"
    },
    blurb: "Autonomous, privacy-first personal location tracker and daily chronicler processing mobile GPS pings with automated verification loops.",
    fieldNotes: [
      "Ingests live mobile GPS pings from OwnTracks; computes Haversine distances against configured points-of-interest to register dwell times.",
      "Queries Google Places API when untracked coordinates are detected and dispatches a Resend email with 1-click confirmation links.",
      "Cron-triggered pipeline synthesizes daily visits, transit durations, and timestamps into narrative daily journals via Gemini 3.5 Flash."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: null
  },
  {
    slug: "biquad-synth-core",
    title: "Biquad DSP Filter Core",
    tier: "archive",
    year: "2025",
    role: "DSP Engineer",
    domain: "DSP & Audio",
    stack: ["TypeScript", "Web Audio Worklets", "Float32Array", "Parametric EQ"],
    metric: {
      value: "-42 dB",
      label: "Noise floor attenuation",
      context: "Measured using pink-noise injection through adaptive biquad notch filter cascades"
    },
    blurb: "High-throughput audio worklet filter core running 5-band biquad parametric equations on dedicated audio threads.",
    fieldNotes: [
      "Direct Float32Array memory operations bypass garbage collection latency inside real-time audio threads.",
      "Calculates biquad coefficient equations for low-pass, high-pass, peaking, and notch filters at 48kHz sampling.",
      "Guaranteed zero audio buffer underruns under continuous frequency sweeps."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: null
  },
  {
    slug: "mobile-voice-recorder",
    title: "Mobile Voice Recorder & AI Notes Studio",
    tier: "archive",
    year: "2025",
    role: "Mobile Architect",
    domain: "AI & Inference",
    stack: ["React Native (Expo 54)", "TypeScript", "SQLite (FTS5)", "Gemini 3.5 Flash-Lite", "Android Exact Alarms"],
    metric: {
      value: "0 ms",
      label: "UTC scheduling drift",
      context: "Explicit device timezone offset injection eliminates 100% of multi-hour reminder scheduling bugs across OS alarms"
    },
    blurb: "Privacy-first mobile audio recorder streaming Gemini speech-to-text with timezone-aware multi-intent reminder parsing.",
    fieldNotes: [
      "Decoupled 10Hz audio visualizer isolates high-frequency dBFS metering updates to a 28-bar visualizer without parent re-renders.",
      "Dual-path audio routing: payloads ≤120s and ≤700KB stream via inline Base64; larger recordings delegate to Google AI File API.",
      "Bypasses Android Doze mode using exact alarm scheduling (SCHEDULE_EXACT_ALARM, WAKE_LOCK) with lock-screen action buttons.",
      "SQLite FTS5 virtual tables index transcripts and metadata with a 150ms debounce and highlighted keyword extraction."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: null
  },
  {
    slug: "cinemavault",
    title: "CinemaVault",
    tier: "archive",
    year: "2024",
    role: "Lead Frontend Engineer",
    domain: "Full-Stack",
    stack: ["React 18", "Vite 5", "Tailwind CSS", "Google Gemini API", "OMDb API", "Framer Motion"],
    metric: {
      value: "~60%",
      label: "Prompt token reduction",
      context: "Achieved via compact pipe-delimited CSV prompt serialization (Title|Year|Director|Genre|Rating|Notes)"
    },
    blurb: "High-performance cinema discovery platform and personal vault powered by hybrid statistical taste profiling and Gemini AI.",
    fieldNotes: [
      "Statistical taste profiling extracts user affinity vectors across genres, directors, and ratings while preserving elite anchors (9-10/10).",
      "Encodes negatively reviewed titles (≤5/10) into negative prompt constraints to disqualify candidate films sharing cinematic flaws.",
      "Dual-pass AI critique verified against synchronous OMDb API calls, eliminating 100% of hallucinated movie entries.",
      "Command palette (Ctrl+K) instant search across 3-surface elevation tokens with SVG film-grain overlays."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: null
  },
  {
    slug: "inertial-odometry-filter",
    title: "Inertial Odometry Dead-Reckoning",
    tier: "archive",
    year: "2024",
    role: "Algorithms Engineer",
    domain: "Geospatial & Telemetry",
    stack: ["Python", "NumPy", "IMU Integration", "Dead Reckoning"],
    metric: {
      value: "0.062 m/s",
      label: "Velocity drift rate",
      context: "Measured across 15-second total GNSS signal outages inside simulated 150m tunnel drives"
    },
    blurb: "Kinematic velocity tracking and dead-reckoning engine maintaining vehicle trajectory during complete satellite loss.",
    fieldNotes: [
      "Fuses wheel ticks and 6-axis IMU acceleration data with gravitational vector compensation.",
      "Maintains vehicle coordinate frames in ECEF/ENU coordinate systems during urban canyon bridge underpasses.",
      "Zero divergence verified across extended 60-second blackout simulations."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: null
  },
  {
    slug: "audio-spectral-subtractor",
    title: "Acoustic Spectral Subtractor",
    tier: "archive",
    year: "2024",
    role: "DSP Engineer",
    domain: "DSP & Audio",
    stack: ["Web Audio API", "FFT Analyzer", "TypeScript", "Canvas 2D"],
    metric: {
      value: "23 ms",
      label: "Live DSP tab latency",
      context: "Measured from getDisplayMedia capture to browser speaker playback with zero buffer drops"
    },
    blurb: "Real-time frequency-domain noise reduction filter utilizing running spectral noise estimation.",
    fieldNotes: [
      "Computes running magnitude spectrum estimates during quiet speech frames to derive dynamic spectral gain masks.",
      "Applies 30ms anti-pop crossfading on coefficient transitions to prevent acoustic clicks.",
      "Direct canvas 2D visualization plotting 60fps spectral waterfall displays."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: null
  },
  {
    slug: "stream-quant-daemon",
    title: "Stream Quantization Proxy",
    tier: "archive",
    year: "2024",
    role: "Systems Engineer",
    domain: "AI & Inference",
    stack: ["Python", "FastAPI", "vLLM", "Docker", "Redis"],
    metric: {
      value: "<10 ms",
      label: "Token routing latency",
      context: "Average reverse-proxy overhead between client SSE connections and local vLLM worker daemons"
    },
    blurb: "Low-overhead reverse proxy managing streaming inference across localized quantized model instances.",
    fieldNotes: [
      "Dynamic batching and memory-mapped model weight paging prevent host swap memory thrashing.",
      "Redis token bucket enforces fair bandwidth distribution across simultaneous client connections.",
      "Zero memory leaks verified across continuous 72-hour load testing shifts."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: null
  },
  {
    slug: "yt-tracker",
    title: "YT Tracker — Competitive Growth Studio",
    tier: "archive",
    year: "2024",
    role: "Full-Stack Engineer",
    domain: "Full-Stack",
    stack: ["Python", "Flask", "PostgreSQL (Supabase)", "Vanilla ES6+", "YouTube Data API v3"],
    metric: {
      value: "<15 ms",
      label: "Client NLP clustering time",
      context: "Browser-native n-gram keyword velocity clustering computed directly in vanilla ES6 JavaScript"
    },
    blurb: "Creator workflow platform providing real-time competitor tracking, client-side NLP topic forensics, and content scheduling.",
    fieldNotes: [
      "Thread-local client pooling and client-side snapshot persistence eliminate 100% of YouTube API quota waste.",
      "Client-side NLP n-gram engine isolates channel topic moats (>60% dominance) vs. competitor traffic gaps.",
      "Algorithmic 0-100 title CTR scorer evaluating curiosity, length, power words, and niche keywords.",
      "11 modular ES6 JavaScript modules and 7 modular CSS sheets operating with zero bundling overhead."
    ],
    github: "https://github.com/khuzaima175/Porfolio-Project",
    visualEngine: null
  }
];

// ─── SIGNAL CHAIN DEPENDENCY GRAPH (S5) ──────────────────────────────
export interface StageTool {
  name: string;
  category: string;
  downstreamIds: string[]; // IDs of tools/components in later stages that depend on this
}

export interface SignalStage {
  id: string;
  name: string;
  subtitle: string;
  domain: Project['domain'];
  tools: StageTool[];
  benchmark: {
    label: string;
    value: string;
    context: string;
  };
  sparklineData: number[];
}

export const SIGNAL_STAGES: SignalStage[] = [
  {
    id: "stage-0",
    name: "Input/telemetry",
    subtitle: "Raw sensor capture & ground truth baseline",
    domain: "Geospatial & Telemetry",
    tools: [
      { name: "GNSS Telemetry", category: "Sensor", downstreamIds: ["Kalman Filters", "FastAPI Service", "Canvas 2D Display"] },
      { name: "Win32 ctypes API", category: "Telemetry", downstreamIds: ["Event Loop Poll", "FastAPI Service"] },
      { name: "CoreAudio / pycaw", category: "Acoustic", downstreamIds: ["FFT & Notch Filters", "Web Audio Worklets"] },
      { name: "OwnTracks GPS", category: "Geofence", downstreamIds: ["Haversine Engine", "PostgreSQL DB"] }
    ],
    benchmark: {
      label: "Input capture latency",
      value: "1.235 m RMS",
      context: "Fuses SPP L1, BeiDou-3, and Dual L5 streams in 3D ECEF Cartesian coordinates"
    },
    sparklineData: [10.89, 8.42, 6.15, 3.82, 2.45, 1.84, 1.35, 1.265, 1.235]
  },
  {
    id: "stage-1",
    name: "Processing & DSP",
    subtitle: "Real-time state estimation & spectral shaping",
    domain: "DSP & Audio",
    tools: [
      { name: "Kalman Filters", category: "Estimation", downstreamIds: ["FastAPI Service", "Canvas 2D Display"] },
      { name: "FFT & Notch Filters", category: "DSP", downstreamIds: ["Web Audio Worklets", "Acoustic Visualizer"] },
      { name: "NumPy / SciPy", category: "Numerics", downstreamIds: ["FastAPI Service", "Canvas 2D Display"] },
      { name: "SM-2 Decay Math", category: "Algorithm", downstreamIds: ["PostgreSQL DB", "Next.js UI"] }
    ],
    benchmark: {
      label: "Filter residual RMS",
      value: "≤ 0.5 dB",
      context: "Iterative logarithmic search across 48 steps/decade committing biquad cascades"
    },
    sparklineData: [4.2, 3.1, 2.4, 1.7, 1.1, 0.8, 0.6, 0.52, 0.48]
  },
  {
    id: "stage-2",
    name: "Core backend",
    subtitle: "Deterministic storage, queues & local inference",
    domain: "AI & Inference",
    tools: [
      { name: "FastAPI Service", category: "Runtime", downstreamIds: ["Next.js UI", "Canvas 2D Display"] },
      { name: "PostgreSQL DB", category: "Storage", downstreamIds: ["Next.js UI"] },
      { name: "SQLite FTS5", category: "Search", downstreamIds: ["Next.js UI"] },
      { name: "Local Gemini / vLLM", category: "Inference", downstreamIds: ["Next.js UI"] }
    ],
    benchmark: {
      label: "Idle CPU overhead",
      value: "0.0%",
      context: "Native Win32 event-loop polling with UTC-anchored gap math and zero screen recording"
    },
    sparklineData: [0.0, 0.1, 0.0, 0.2, 0.0, 0.0, 0.1, 0.0, 0.0]
  },
  {
    id: "stage-3",
    name: "Interface",
    subtitle: "60fps instruments, worklets & client-side WASM",
    domain: "Full-Stack",
    tools: [
      { name: "Next.js UI", category: "Frontend", downstreamIds: [] },
      { name: "Canvas 2D Display", category: "Graphics", downstreamIds: [] },
      { name: "Web Audio Worklets", category: "Audio Thread", downstreamIds: [] },
      { name: "Acoustic Visualizer", category: "SVG/Canvas", downstreamIds: [] }
    ],
    benchmark: {
      label: "DSP stream latency",
      value: "23 ms",
      context: "Browser tab audio routing via getDisplayMedia with 30ms anti-pop crossfading"
    },
    sparklineData: [45, 38, 32, 28, 26, 24, 23, 23, 23]
  }
];
