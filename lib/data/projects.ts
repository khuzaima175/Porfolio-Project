export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Systems & AI" | "Full-Stack & Web" | "Mobile & Local-First";
  tagline: string;
  executivePitch: string;
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  techStack: string[];
  architectureHighlights: {
    title: string;
    detail: string;
  }[];
  hardMetrics: string[];
  resumeBullets: string[];
  featured: boolean;
  image?: string;
  specimenType?: "acoustic" | "gnss" | "sensory" | "none";
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "gnss-engine",
    slug: "gnss-precision-engine",
    title: "GNSS Multi-Stream Precision Positioning Engine",
    category: "Systems & AI",
    tagline: "Software-Defined Multi-Constellation Signal Fusion & RTS Trajectory Filtering",
    executivePitch:
      "An industrial-grade software-defined GNSS positioning, multi-stream signal fusion, and trajectory processing engine benchmarking multi-constellation corrections against 2cm RTK ground truth across calibration and 20 KM road drives.",
    year: "2026",
    featured: true,
    image: "/images/gnss-telemetry.webp",
    specimenType: "gnss",
    metrics: [
      {
        label: "Horizontal Accuracy",
        value: "1.235m RMS",
        description: "88.4% error reduction over raw consumer GPS (10.89m RMS)",
      },
      {
        label: "Tunnel Outage Drift",
        value: "0.062 m/s",
        description: "Drift stability across 60-second total satellite signal blackouts",
      },
      {
        label: "Validation Scale",
        value: "2,493 Epochs",
        description: "Benchmarked against NovAtel ProPak6 2cm NRTK ground truth across 20 KM",
      },
    ],
    techStack: [
      "Python",
      "NumPy",
      "SciPy",
      "Geodesy (ECEF/ENU)",
      "Kalman Filtering (EKF)",
      "Rauch-Tung-Striebel (RTS)",
      "XGBoost",
      "LightGBM",
    ],
    architectureHighlights: [
      {
        title: "3D ECEF Inverse-Variance Physics Fusion",
        detail:
          "Fuses Single-Frequency SPP (GPS L1), BeiDou-3 PPP-B2b, and Dual-Frequency L5 streams in 3D Cartesian coordinates weighted by w_i = 1 / σ_i², establishing the locked production baseline.",
      },
      {
        title: "6-State Newtonian Kalman & RTS Smoothing",
        detail:
          "Implemented a 6-state forward Newtonian Kalman velocity filter and an offline Rauch-Tung-Striebel (RTS) backward smoother to eliminate turn-phase lag and acceleration noise, achieving 1.235m RMS (p = 9.3 × 10⁻⁶ statistically significant improvement).",
      },
      {
        title: "5-Tier Statistical & Metrological Audit",
        detail:
          "Conducted Leave-One-Round-Out (LODO-CV) cross-validation and hypothesis testing (Chi-square NIS innovation gating). Proved unconstrained ML degrades vertical accuracy on unseen environments (+15.01 cm, p = 1.98 × 10⁻²⁰), demoting ML to experimental to safeguard production physics.",
      },
      {
        title: "Tunnel Blackout Dead-Reckoning",
        detail:
          "Kinematic velocity tracking maintains path stability during full satellite loss (5s, 15s, and 60s blackout simulations) with a measured drift rate of just 0.062 m/s.",
      },
    ],
    hardMetrics: [
      "Horizontal Accuracy: 1.265 m Horizontal RMS (88.4% error reduction over raw consumer GPS at 10.89 m RMS).",
      "RTS Backward Smoothing: 1.235 m Horizontal RMS (p = 9.3 × 10⁻⁶ statistically significant improvement).",
      "Tunnel Blackout Integrity: Maintained a low real-time drift rate of 0.062 m/s across 15-second total signal outages (150m underground).",
      "Benchmark Scale: Validated across n=842 calibration epochs and n=1,651 road drive epochs (~20 KM) against NovAtel ProPak6 NRTK ground truth.",
    ],
    resumeBullets: [
      "Architected a multi-stream GNSS signal fusion engine fusing SPP L1, BeiDou PPP-B2b, and Dual L5 streams in 3D ECEF coordinates, cutting horizontal error by 88.4% (from 10.89m to 1.265m RMS).",
      "Implemented a 6-state Newtonian Kalman filter and Rauch-Tung-Striebel (RTS) backward smoother, achieving 1.235m RMS trajectory accuracy validated against 2cm NovAtel RTK ground truth.",
      "Executed a 5-tier metrological statistical audit (LODO-CV, paired t-tests, Chi-square NIS RAIM gating) identifying out-of-fold ML generalization risks, preserving production physics reliability.",
      "Engineered kinematic dead-reckoning algorithms resilient to 60-second complete GNSS tunnel blackouts with a measured drift rate of just 0.062 m/s.",
    ],
  },
  {
    id: "silent-auditor",
    slug: "silent-ai-daily-auditor",
    title: "The Silent AI Daily Auditor & Life Chronicle",
    category: "Systems & AI",
    tagline: "Zero-Overhead Local-First Windows Productivity Daemon & Life Chronicler",
    executivePitch:
      "An ultra-lightweight, zero-maintenance, local-first Windows productivity daemon and executive AI coach that synthesizes daily active focus into rich executive journals without screen recording or battery drain.",
    year: "2026",
    featured: true,
    image: "/images/daily-auditor.webp",
    specimenType: "sensory",
    metrics: [
      {
        label: "CPU Overhead",
        value: "0.0%",
        description: "Zero measurable CPU usage via Win32 ctypes polling foreground APIs",
      },
      {
        label: "Ghost Work Hours",
        value: "0 hrs",
        description: "100% retroactive AFK reattribution across sleep, idle, and DST boundaries",
      },
      {
        label: "Offline Unit Tests",
        value: "66 Tests",
        description: "Passing in ~0.50s with atomic JSON crash resilience",
      },
    ],
    techStack: [
      "Python 3.11",
      "Win32 ctypes API",
      "pycaw (Windows CoreAudio)",
      "FastAPI",
      "Server-Sent Events (SSE)",
      "Google Gemini 3.5 Flash-Lite",
      "Supabase",
      "Vanilla ES6+",
    ],
    architectureHighlights: [
      {
        title: "0% CPU Sensory Engine",
        detail:
          "Polls foreground window titles and user idle states every 5 seconds via native Windows ctypes API with zero screen captures or video recording, keeping privacy absolute.",
      },
      {
        title: "System Sleep & DST Immunity",
        detail:
          "Engineered UTC-anchored gap math (last_updated_utc) and time.monotonic() tick intervals to eliminate clock drift and phantom gaps across Daylight Saving Time changes and multi-day shutdowns.",
      },
      {
        title: "Acoustic & Silent Meeting Awareness",
        detail:
          "Integrates real-time CoreAudio session inspection (pycaw) and process detection (zoom.exe, teams.exe, meet.google.com), dynamically relaxing AFK thresholds to 30 minutes during calls or video tutorials even with zero mouse movement.",
      },
      {
        title: "Attention Fragmentation Index",
        detail:
          "Computes window/tab switching velocity per 10-minute active window, intelligently separating chaotic social media thrashing from high-speed AI engineering flow (IDE, terminal, local preview).",
      },
      {
        title: "Single-Call EOD LLM Distillation",
        detail:
          "Compresses contiguous timeline blocks and sends a single 9-section prompt to Gemini 3.5 Flash-Lite, returning an executive focus score, 9-part narrative chronicle, and next-day startup directives.",
      },
      {
        title: "Linear-Grade Reactive Web UI",
        detail:
          "Built with an 'Alive Layer' featuring a 48px Biological Day Ribbon, 120° Radial Stability Gauge, and a 40-row virtualized timeline powered by real-time SSE streaming.",
      },
    ],
    hardMetrics: [
      "0.0% CPU overhead and <10ms atomic JSON persistence on unexpected power-off.",
      "0 'ghost work' hours: 100% retroactive AFK reattribution for idle intervals.",
      "66 offline unit tests passing in ~0.50s.",
    ],
    resumeBullets: [
      "Architected a zero-overhead local-first Windows background daemon polling foreground APIs via Win32 ctypes, achieving 0% measurable CPU usage and complete screen-recording privacy.",
      "Designed an intelligent AFK algorithm integrating Windows CoreAudio (pycaw) and meeting detection heuristics, relaxing idle boundaries during muted screen-shares and calls.",
      "Built a 9-part LLM daily distillation pipeline using Gemini 3.5 Flash-Lite, generating structured media, engineering, and attention-fragmentation audits in a single cost-effective API call.",
      "Constructed a zero-build Linear-inspired web dashboard using FastAPI, Server-Sent Events (SSE), and virtualized DOM rendering with a live 24-hour biological day activity ribbon.",
    ],
  },
  {
    id: "audiosage",
    slug: "audiosage-acoustic-suite",
    title: "AudioSage: Audiophile Research Assistant & Acoustic Suite",
    category: "Systems & AI",
    tagline: "In-Browser Web Audio DSP Synthesis & Real-Time Windows Equalizer APO Bridge",
    executivePitch:
      "An AI-driven acoustic suite and real-time DSP tuning workbench featuring in-browser audio synthesis, automated parametric EQ generation, target curve matching, and system-wide PC tuning.",
    year: "2026",
    featured: true,
    image: "/images/audiosage-dsp.webp",
    specimenType: "acoustic",
    metrics: [
      {
        label: "Target Curve Error",
        value: "≤ 0.5 dB RMS",
        description: "Automated residual PEQ minimization against Harman In-Ear 2019 target",
      },
      {
        label: "DSP Processing Latency",
        value: "23 ms",
        description: "Live tab audio routing with a 30ms anti-pop crossfader",
      },
      {
        label: "Acoustic Dataset",
        value: "301 Points",
        description: "Verbatim Harman 2019 and Crinacle IEF 2025 acoustic curves",
      },
    ],
    techStack: [
      "React 19.2",
      "TypeScript 5.8",
      "Web Audio API",
      "BiquadFilterNode",
      "Equalizer APO Bridge",
      "Gemini 3.6 Flash",
      "Tailwind CSS",
      "Vite 6.2",
    ],
    architectureHighlights: [
      {
        title: "Greedy Residual Auto-PEQ Synthesizer",
        detail:
          "Implemented a logarithmic search optimization engine over a 48 steps/decade grid (20 Hz to 20 kHz) across Q ∈ [0.5, 4.0]. Commits optimal biquad filters iteratively via residual RMS minimization until target curves match within ≤ 0.5 dB.",
      },
      {
        title: "Equalizer APO Hot-Reload Bridge",
        detail:
          "A non-destructive local bridge using an include-file strategy (audiosage-eq.txt + automatic .bak backups) that writes directly to the Windows Equalizer APO directory—tuning the entire PC's audio output in real-time.",
      },
      {
        title: "Live Tab DSP Audio Capture",
        detail:
          "Uses getDisplayMedia with immediate video track disposal to route browser audio (YouTube/Spotify) through custom Web Audio biquad filter cascades with real-time latency telemetry and a 30ms anti-pop crossfader.",
      },
      {
        title: "CrinGraph Acoustic Visualizer Suite",
        detail:
          "Custom 60 FPS SVG visualizer displaying 1–1.5–2–3–4–6–8 decade ticks, Harman In-Ear 2019 (verbatim 301-point curve), Crinacle IEF 2025 (B&K 5128), and a magnetic dual-curve crosshair.",
      },
      {
        title: "Digital Headroom Safety Guard",
        detail:
          "Automatically calculates negative pre-amplification (Preamp = min(0, -max(Gains) - 0.2 dB)) to eliminate inter-sample digital clipping upon profile export.",
      },
    ],
    hardMetrics: [
      "Automated residual PEQ minimization drives raw frequency response deviations down to ≤ 0.5 dB RMS error.",
      "23ms live tab DSP latency with 0ms zero-pop latching A/B transitions.",
      "Verbatim implementation of 301-point Harman In-Ear 2019 acoustic dataset.",
    ],
    resumeBullets: [
      "Developed a browser-based audiophile DSP acoustic suite using React 19.2, TypeScript 5.8, Web Audio API, and Gemini 3.6 Flash.",
      "Programmed a greedy residual auto-PEQ algorithm in TypeScript that iteratively synthesizes biquad filters across logarithmic frequency bands, reducing target curve deviation to <0.5 dB RMS.",
      "Engineered an Equalizer APO system bridge, enabling seamless, non-destructive, real-time hot-reloading of parametric EQ profiles directly into the Windows OS audio pipeline.",
      "Constructed an in-browser audio capture and audition engine leveraging getDisplayMedia and custom biquad cascades to apply live EQ curves to streaming media with a 30ms anti-pop crossfader.",
    ],
  },
  {
    id: "cinemavault",
    slug: "cinemavault",
    title: "CinemaVault",
    category: "Full-Stack & Web",
    tagline: "Taste-Profiling Recommendation Engine with Real-Data OMDb Anti-Hallucination",
    executivePitch:
      "A high-performance movie discovery platform and personal cinema vault powered by a hybrid statistical taste-profiling engine and Gemini AI recommendation pipeline with anti-hallucination verification.",
    year: "2026",
    featured: true,
    image: "/images/cinemavault.webp",
    specimenType: "none",
    metrics: [
      {
        label: "Token Compression",
        value: "~60%",
        description: "Prompt token reduction via compact pipe-delimited CSV encoding",
      },
      {
        label: "Hallucination Rate",
        value: "0.0%",
        description: "100% verified against synchronous real-world OMDb API metadata",
      },
      {
        label: "Failover Resilience",
        value: "3-Tier",
        description: "Automatic fallback routing: Gemini 3.6 Flash → 2.5 Flash → 2.0 Flash",
      },
    ],
    techStack: [
      "React 18",
      "Vite 5",
      "Tailwind CSS",
      "Google Gemini API (@google/genai)",
      "OMDb API",
      "Framer Motion",
      "Lucide React",
    ],
    architectureHighlights: [
      {
        title: "Statistical Taste Profiling & Stratified Sampling",
        detail:
          "Extracts user affinity vectors across genres, directors, and ratings. Preserves 'Elite Anchors' (9–10/10) uncapped, samples supporting films (7–8/10), and tracks recent watches to bound context efficiently.",
      },
      {
        title: "Anti-Pattern & Disqualification Penalty",
        detail:
          "Encodes negatively reviewed titles (≤ 5/10) and user criticism notes into prompt constraints, forcing the AI to penalize candidate films sharing identical cinematic flaws.",
      },
      {
        title: "Token-Efficient Compact CSV Encoding",
        detail:
          "Serializes movie metadata into pipe-delimited strings (Title|Year|Director|Genre|Rating|Notes), shrinking prompt token consumption by ~60%.",
      },
      {
        title: "Dual-Pass AI Critique & Real-Data OMDb Anti-Hallucination",
        detail:
          "A secondary critique prompt audits generated recommendations against user anti-patterns. Every candidate title is then validated via live OMDb API calls to verify true release dates, IMDb ratings, and box office data.",
      },
      {
        title: "Glassmorphic Command-Palette UI",
        detail:
          "Built with 3-surface elevation tokens, ambient blur overlays, and global Command-Palette (Ctrl+K) search.",
      },
    ],
    hardMetrics: [
      "~60% reduction in LLM prompt tokens achieved via custom pipe-delimited CSV encoding.",
      "Zero hallucinated film entries: 100% verified against real-world OMDb API metadata.",
      "Failover Resilience: 3-tier model fallback routing (Gemini 3.6 Flash → 2.5 Flash → 2.0 Flash).",
    ],
    resumeBullets: [
      "Engineered a cinematic discovery platform using React 18, Vite, Tailwind CSS, Framer Motion, and Google Gemini AI.",
      "Designed a hybrid recommendation algorithm featuring stratified preference sampling, anti-pattern disqualification, and a ~60% token-compressed CSV prompt representation.",
      "Eliminated LLM hallucinations by implementing a dual-pass AI self-critique stage paired with synchronous real-time OMDb API metadata verification.",
      "Created a theater-grade glassmorphic UI featuring responsive command-palette search, animated SVG posters, and deep vault analytics dashboards.",
    ],
  },
  {
    id: "ai-learning-companion",
    slug: "ai-learning-companion-2",
    title: "AI Learning Companion 2.0",
    category: "Full-Stack & Web",
    tagline: "Cloud-Native Lecture Study Companion with SM-2 Spaced Repetition",
    executivePitch:
      "A full-stack, cloud-native study companion and spaced-repetition platform that ingests YouTube lectures and transforms them into interactive quizzes, structured notes, and SM-2 flashcard decks.",
    year: "2026",
    featured: true,
    image: "/images/learning-companion.jpg",
    metrics: [
      {
        label: "Query Overhead",
        value: "80% Cut",
        description: "Slashed database round-trips from 1 + 2N + V down to exactly 3 queries",
      },
      {
        label: "Perceived Load Time",
        value: "0 ms",
        description: "Client-side SWR caching paired with serverless keep-alive pings",
      },
      {
        label: "Spaced Repetition",
        value: "SM-2 Alg",
        description: "Atomic PostgreSQL RPC schedule [1, 3, 7, 14, 30, 90, 180] days",
      },
    ],
    techStack: [
      "FastAPI (Python 3.10+)",
      "Supabase PostgreSQL",
      "Supabase Auth (JWT)",
      "Google Gemini 2.5 Flash",
      "Vanilla ES6+",
      "Resend API",
      "Vercel Serverless & Cron",
    ],
    architectureHighlights: [
      {
        title: "3-Tier Anti-Scrape Transcript Pipeline",
        detail:
          "Bypasses IP blocks and captchas using a multi-layer fallback chain: youtube-transcript-api → Supadata API proxy → yt-dlp mobile-client spoofing → direct manual transcript injection.",
      },
      {
        title: "N+1 SQL Bottleneck Resolution",
        detail:
          "Refactored course and quiz fetching using PostgreSQL IN bulk operators and multi-threaded Python ThreadPoolExecutor counters, eliminating round-trip queries.",
      },
      {
        title: "Anki-Style SM-2 Algorithm",
        detail:
          "Features an automated mathematical review schedule [1, 3, 7, 14, 30, 90, 180] days with atomic PostgreSQL RPC calls (increment_session) to prevent race conditions.",
      },
      {
        title: "Dual-Layer SWR Caching & Edge Keep-Alive",
        detail:
          "Implemented client-side localStorage Stale-While-Revalidate rendering for 0ms page loads alongside a visibilitychange keep-alive ping to pre-warm serverless Lambda containers before user interaction.",
      },
    ],
    hardMetrics: [
      "Query Optimization: Slashed database round-trips from 1 + 2N + V queries down to exactly 3 queries.",
      "0ms perceived load time achieved via client-side SWR caching and skeleton loading states.",
    ],
    resumeBullets: [
      "Engineered a cloud-native lecture study platform using FastAPI, Supabase PostgreSQL, and Google Gemini with multi-model fallback chaining.",
      "Resolved severe database N+1 bottlenecks by migrating to bulk SQL IN queries and multi-threaded aggregations, reducing API query overhead by over 80%.",
      "Built a resilient 3-tier transcript scraper capable of bypassing cloud IP restrictions on serverless infrastructure.",
      "Implemented an SM-2 spaced repetition engine backed by atomic PostgreSQL stored procedures (RPCs) and automated 6-stage escalating email notifications.",
    ],
  },
  {
    id: "yt-tracker",
    slug: "yt-tracker",
    title: "YT Tracker: YouTube Competitive Intelligence & Growth Studio",
    category: "Full-Stack & Web",
    tagline: "Creator Intelligence Suite with Client-Side NLP Forensics & Zero-Quota Waste",
    executivePitch:
      "A full-spectrum competitive intelligence platform and creator workflow suite for YouTube creators, providing real-time competitor tracking, client-side NLP topic forensics, and content scheduling with zero quota waste.",
    year: "2025",
    featured: true,
    image: "/images/yt-tracker.jpg",
    metrics: [
      {
        label: "Clustering Latency",
        value: "<15 ms",
        description: "Client-side NLP n-gram clustering operating directly inside the browser",
      },
      {
        label: "Architecture",
        value: "Zero Build",
        description: "11 decoupled ES6 JS modules and 7 modular CSS sheets running with zero bundling",
      },
      {
        label: "Topic Moats",
        value: ">60% Dominance",
        description: "Automated competitor gap analysis detecting high-velocity traffic surges",
      },
    ],
    techStack: [
      "Python",
      "Flask",
      "Gunicorn",
      "PostgreSQL (Supabase)",
      "Vanilla ES6+ JavaScript",
      "CSS3 Design Tokens",
      "YouTube Data API v3",
    ],
    architectureHighlights: [
      {
        title: "Zero-Quota-Waste Architecture",
        detail:
          "Implemented thread-local client pooling and aggressive multi-layer client-side caching, minimizing YouTube Data API v3 quota consumption.",
      },
      {
        title: "Client-Side NLP N-Gram Topic Engine",
        detail:
          "Performs client-side multi-word topic clustering and alias normalization to identify surge velocities (>1.3× momentum spikes) and generate 7×12 publication velocity heatmaps.",
      },
      {
        title: "Creator Studio & Title Lab (0–100 CTR Scorer)",
        detail:
          "Algorithmic title scoring evaluating Power Words, Curiosity, Character Length, and Niche Keywords, coupled with an interactive 4-stage swipe-snap Kanban board.",
      },
      {
        title: "Bi-Directional State URL Synchronization",
        detail:
          "Serializes all view parameters, deep-dive filters, and competitor comparison sets directly into URL hash fragments for one-click shareability.",
      },
    ],
    hardMetrics: [
      "Modular architecture: 11 decoupled ES6 JS modules and 7 modular CSS sheets running with zero bundling overhead.",
      "Instant client-side NLP clustering operating in <15ms directly inside the browser.",
    ],
    resumeBullets: [
      "Built a full-stack YouTube analytics platform using Flask, Supabase (PostgreSQL), and modular Vanilla JavaScript.",
      "Architected a client-side NLP topic extraction engine, computing n-gram keyword velocity, topic moats (>60% dominance), and competitive content gaps.",
      "Engineered a real-time Title CTR Scorer and 4-stage swipe-snap Kanban pipeline for creator workflow management.",
      "Optimized YouTube API quota consumption via thread-local client pooling, snapshot persistence, and bi-directional URL state serialization.",
    ],
  },
  {
    id: "mobile-voice-notes",
    slug: "mobile-voice-notes-studio",
    title: "Mobile Voice Recorder & AI Notes Studio",
    category: "Mobile & Local-First",
    tagline: "Privacy-First React Native Audio Studio with SQLite FTS5 & Exact OS Alarms",
    executivePitch:
      "A privacy-first React Native mobile application that records audio, streams Gemini speech-to-text, parses multi-intent reminders with timezone awareness, and registers exact OS lock-screen alarms.",
    year: "2025",
    featured: true,
    image: "/images/mobile-voice-notes.jpg",
    metrics: [
      {
        label: "Visualizer UI",
        value: "60 FPS",
        description: "Decoupled 10Hz dBFS metering isolated from parent navigation re-renders",
      },
      {
        label: "Search Speed",
        value: "<1 ms",
        description: "SQLite FTS5 full-text indexing with highlighted query snippets",
      },
      {
        label: "Timezone Drift",
        value: "0 ms",
        description: "Explicit device timezone offset injection preventing scheduling bugs",
      },
    ],
    techStack: [
      "React Native (Expo SDK 54)",
      "TypeScript",
      "SQLite (FTS5)",
      "Google Gemini 3.5 Flash-Lite",
      "expo-av",
      "expo-secure-store",
      "Android Exact Alarms",
    ],
    architectureHighlights: [
      {
        title: "Decoupled 10Hz Audio Visualizer",
        detail:
          "16kHz mono audio recorder (expo-av) decoupled via custom state hooks to isolate high-frequency dBFS metering updates strictly to a 28-bar animated visualizer without re-rendering parent screens.",
      },
      {
        title: "Dual-Path Audio Pipeline",
        detail:
          "Routes audio ≤ 120s and ≤ 700KB directly via Base64 payloads, while automatically delegating larger recordings to the Google AI File API.",
      },
      {
        title: "Android Exact Alarms & Lock-Screen Actions",
        detail:
          "Bypasses Android Doze mode using exact alarm scheduling. Adds interactive lock-screen action buttons ('Mark Done', 'Snooze 10m') that execute atomic SQLite updates directly from notification shades.",
      },
      {
        title: "SQLite FTS5 Full-Text Search",
        detail:
          "Virtual table indexing titles, content, raw transcripts, and tags with a 150ms debounce and dynamic keyword snippet highlighting.",
      },
    ],
    hardMetrics: [
      "Zero UI Lag: Isolated 10Hz metering re-renders completely from navigation and list threads.",
      "Zero UTC drift: Explicit timezone offset injection prevents 100% of multi-hour reminder scheduling bugs.",
      "Offline Resilience: SQLite-backed FIFO sync queue handles automatic exponential backoff on API rate limits.",
    ],
    resumeBullets: [
      "Built a cross-platform voice recorder and speech intelligence app using React Native (Expo SDK 54), TypeScript, SQLite FTS5, and Gemini 3.5 Flash-Lite.",
      "Engineered an audio pipeline using dual-channel routing and decoupled 10Hz dBFS metering for 60 FPS waveform animations.",
      "Implemented timezone-aware LLM reminder parsing, scheduling native Android exact alarms with interactive lock-screen notifications.",
      "Integrated SQLite FTS5 virtual tables with custom query debouncing and highlighted snippet extraction for instant sub-millisecond local transcript search.",
    ],
  },
  {
    id: "location-diary",
    slug: "my-location-diary",
    title: "My Location Diary",
    category: "Mobile & Local-First",
    tagline: "Autonomous Geofencing & Narrative Daily Chronicler with Email Verification Loops",
    executivePitch:
      "An autonomous, privacy-first personal location tracker and daily chronicler that processes mobile GPS pings, verifies unknown locations via automated email loops, and generates narrative daily diaries using Gemini AI.",
    year: "2025",
    featured: true,
    image: "/images/location-diary.jpg",
    metrics: [
      {
        label: "Geofence Precision",
        value: "Sub-10m",
        description: "Haversine distance calculation registering dwell time and points of interest",
      },
      {
        label: "Human-in-the-Loop",
        value: "1-Click",
        description: "Out-of-band email verification of new coordinates via Resend API",
      },
      {
        label: "Daily Chronicling",
        value: "100% Auto",
        description: "Nightly cron synthesizing visits and transit durations into inbox narrative",
      },
    ],
    techStack: [
      "FastAPI",
      "Python",
      "SQLite",
      "Google Gemini 3.5 Flash",
      "Resend API",
      "Google Places API",
      "OwnTracks (HTTP/Geofences)",
      "Tailwind CSS",
    ],
    architectureHighlights: [
      {
        title: "Autonomous Geofencing Engine",
        detail:
          "Ingests live mobile GPS pings from OwnTracks; calculates Haversine distances against configured points-of-interest to register visits and compute exact stay durations.",
      },
      {
        title: "Interactive Human-in-the-Loop Confirmation",
        detail:
          "When untracked coordinates are detected, queries Google Places API and triggers an automated Resend email with one-click approval links (/confirm/{conf_id}/yes), logging new places seamlessly.",
      },
      {
        title: "Automated Nightly AI Chronicler",
        detail:
          "Cron-triggered pipeline synthesizes daily visits, transit durations, and timestamps into a warm, narrative diary entry dispatched directly to your inbox.",
      },
    ],
    hardMetrics: [
      "Sub-10m Haversine distance-matching to log point-of-interest dwell times accurately.",
      "100% automated nightly narrative diary generation and email dispatch using Gemini 3.5 Flash.",
    ],
    resumeBullets: [
      "Developed an automated location diary and geofencing platform using FastAPI, SQLite, OwnTracks, and Google Gemini 3.5 Flash.",
      "Implemented Haversine distance-matching to log point-of-interest dwell times, backed by an automated Google Places API reverse-geocoding fallback.",
      "Designed an email confirmation loop via Resend API enabling 1-click verification of unknown locations without opening the application.",
    ],
  },
  {
    id: "calorie-tracker",
    slug: "smart-calorie-tracker",
    title: "Smart Calorie Tracker App",
    category: "Mobile & Local-First",
    tagline: "Clean, Zero-Latency Desktop Nutritional Tracker & Macro-Balance Engine",
    executivePitch:
      "A clean, responsive desktop application for daily nutritional logging, caloric balance monitoring, and macro-nutrient tracking built with a lightweight Python GUI architecture.",
    year: "2024",
    featured: true,
    image: "/images/calorie-tracker.jpg",
    metrics: [
      {
        label: "Data Entry Latency",
        value: "0 ms",
        description: "Instant local persistence and real-time caloric balance calculation",
      },
      {
        label: "Architecture",
        value: "Decoupled",
        description: "Modular separation of UI, macronutrient formula engine, and SQLite storage",
      },
      {
        label: "Data Ownership",
        value: "100% Local",
        description: "Zero external network calls, zero cloud telemetry, complete privacy",
      },
    ],
    techStack: ["Python 3", "Tkinter", "CustomTkinter", "SQLite"],
    architectureHighlights: [
      {
        title: "Local-First Nutritional Tracking",
        detail:
          "Fast desktop client built for zero-latency caloric intake and expenditure logging without internet requirements.",
      },
      {
        title: "Structured UI Layer",
        detail:
          "Decoupled ui/app.py modular layout separating macro calculation formulas and visual charts from database persistence.",
      },
    ],
    hardMetrics: [
      "0ms latency on local desktop data persistence.",
      "Real-time instant calculation of daily macronutrient balances (protein, carb, fat).",
    ],
    resumeBullets: [
      "Developed a lightweight desktop nutritional tracker in Python featuring interactive meal logging and daily macronutrient balance calculations.",
      "Engineered a responsive local desktop GUI ensuring zero-latency data entry and local persistence.",
    ],
  },
];
