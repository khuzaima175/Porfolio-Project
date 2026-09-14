Here is a portfolio-ready technical breakdown of all 9 projects extracted from
your repositories. Each project is structured with an Executive One-Liner, Tech
Stack, Core Architecture & Engineering Highlights, Hard Performance Metrics, and
Ready-to-Use Resume / Portfolio Bullets.

1. 🎯 The Silent AI Daily Auditor & Life Chronicle

Executive Pitch: An ultra-lightweight, zero-maintenance, local-first Windows
productivity daemon and executive AI coach that synthesizes daily active focus
into rich executive journals without screen recording or battery drain.

  - Tech Stack: Python, Win32 ctypes API, pycaw (Windows CoreAudio), FastAPI,
    Server-Sent Events (SSE), Google Gemini 3.5 Flash-Lite, Vanilla ES6+, CSS3
    Tokens, Vercel Static Edge, Supabase.
  - Core Architecture & Engineering Highlights:
      - 0% CPU Sensory Engine: Polls foreground window titles and user idle
        states every 5 seconds via native Windows ctypes API with zero screen
        captures or video recording.
      - System Sleep & DST Immunity: Engineered UTC-anchored gap math
        (last_updated_utc) and time.monotonic() tick intervals to eliminate
        clock drift and phantom gaps across Daylight Saving Time changes and
        multi-day shutdowns.
      - Acoustic & Silent Meeting Awareness: Integrates real-time CoreAudio
        session inspection (pycaw) and process detection (zoom.exe, teams.exe,
        meet.google.com), dynamically relaxing AFK thresholds to 30 minutes
        during conference calls or tutorials even with zero mouse movement.
      - Attention Fragmentation & Vibe-Coding Index: Computes window/tab
        switching velocity per 10-minute active window, intelligently separating
        chaotic social media thrashing from high-speed AI engineering flow
        (Cursor, IDE, terminal, local preview).
      - Single-Call EOD LLM Distillation: Compresses contiguous timeline blocks
        and sends a single 9-section prompt to Gemini 3.5 Flash-Lite, returning
        an executive focus score, 9-part narrative chronicle, and next-day
        startup directives.
      - Linear-Grade Reactive Web UI: Built with an "Alive Layer" featuring
        a 48px Biological Day Ribbon, 120° Radial Stability Gauge, and a 40-row
        virtualized timeline powered by real-time SSE streaming.
  - Hard Metrics & Impact:
      - 0.0% CPU overhead and <10ms atomic JSON persistence on unexpected
        power-off.
      - 0 "ghost work" hours: 100% retroactive AFK reattribution for idle
        intervals.
      - 66 offline unit tests passing in \sim0.50s.
  - Resume / Portfolio Bullet Points:
      - Architected a zero-overhead local-first Windows background daemon
        polling foreground APIs via Win32 ctypes, achieving 0% measurable CPU
        usage and complete screen-recording privacy.
      - Designed an intelligent AFK algorithm integrating Windows CoreAudio
        (pycaw) and meeting detection heuristics, relaxing idle boundaries
        during muted screen-shares and calls.
      - Built a 9-part LLM daily distillation pipeline using Gemini 3.5
        Flash-Lite, generating structured media, engineering, and
        attention-fragmentation audits in a single cost-effective API call.
      - Constructed a zero-build Linear-inspired web dashboard using FastAPI,
        Server-Sent Events (SSE), and virtualized DOM rendering with a
        live 24-hour biological day activity ribbon.

2. 🎓 AI Learning Companion 2.0

Executive Pitch: A full-stack, cloud-native study companion and
spaced-repetition platform that ingests YouTube lectures and transforms them
into interactive quizzes, structured notes, and SM-2 flashcard decks.

  - Tech Stack: FastAPI (Python 3.10+), Mangum, PostgreSQL (Supabase), Supabase
    Auth (JWT), Google Gemini API (gemini-2.5-flash / 2.0-flash), Vanilla ES6+,
    Modern CSS ("Neon Sunset"), Resend API, Vercel Serverless & Cron.
  - Core Architecture & Engineering Highlights:
      - 3-Tier Anti-Scrape Transcript Pipeline: Bypasses IP blocks and captchas
        using a multi-layer fallback chain: youtube-transcript-api \to Supadata
        API proxy \to yt-dlp mobile-client spoofing \to Direct manual transcript
        injection.
      - N+1 SQL Bottleneck Resolution: Refactored course and quiz fetching using
        PostgreSQL IN bulk operators and multi-threaded Python
        ThreadPoolExecutor counters, eliminating round-trip queries.
      - Anki-Style SM-2 Algorithm: Features an automated mathematical review
        schedule [1, 3, 7, 14, 30, 90, 180] days with atomic PostgreSQL RPC
        calls (increment_session) to prevent race conditions.
      - Dual-Layer SWR Caching & Edge Keep-Alive: Implemented client-side
        localStorage Stale-While-Revalidate rendering for 0ms page loads
        alongside a visibilitychange keep-alive ping to pre-warm serverless
        Lambda containers before user interaction.
      - 6-Stage Escalating Notification Cron: Automated Vercel cron triggering
        dynamic HTML email reminders that escalate in visual urgency as midnight
        approaches if SRS cards remain unreviewed.
  - Hard Metrics & Impact:
      - Query Optimization: Slashed database round-trips from 1 + 2N + V queries
        down to exactly 3 queries.
      - 0ms perceived load time achieved via client-side SWR caching and
        skeleton loading states.
  - Resume / Portfolio Bullet Points:
      - Engineered a cloud-native lecture study platform using FastAPI, Supabase
        PostgreSQL, and Google Gemini with multi-model fallback chaining.
      - Resolved severe database N+1 bottlenecks by migrating to bulk SQL IN
        queries and multi-threaded aggregations, reducing API query overhead by
        over 80%.
      - Built a resilient 3-tier transcript scraper (youtube-transcript-api \to
        Supadata \to yt-dlp spoofing) capable of bypassing cloud IP restrictions
        on serverless infrastructure.
      - Implemented an SM-2 spaced repetition engine backed by atomic PostgreSQL
        stored procedures (RPCs) and automated 6-stage escalating email
        notifications via Resend and Vercel Cron.

3. 🎛️ AudioSage: Audiophile Research Assistant & Acoustic Suite

Executive Pitch: An AI-driven acoustic suite and real-time DSP tuning workbench
featuring in-browser audio synthesis, automated parametric EQ generation, target
curve matching, and system-wide PC tuning.

  - Tech Stack: React 19.2, Vite 6.2, TypeScript 5.8, Tailwind CSS 3.4, Web
    Audio API (AudioContext, BiquadFilterNode), @google/genai (Gemini 3.6 Flash
    + Search Grounding), Equalizer APO Hot-Reload Bridge (Node/Vite middleware).
  - Core Architecture & Engineering Highlights:
      - Greedy Residual Auto-PEQ Synthesizer: Implemented a logarithmic search
        optimization engine over a 48 steps/decade grid
        (20\text{ Hz} \to 20\text{ kHz}) across Q \in [0.5, 4.0]. Commits
        optimal biquad filters iteratively via residual RMS minimization until
        target curves match within \le 0.5\text{ dB}.
      - Equalizer APO Hot-Reload Bridge: A non-destructive local bridge using an
        include-file strategy (audiosage-eq.txt + automatic .bak backups) that
        writes directly to the Windows Equalizer APO directory—tuning the entire
        PC's audio output in real-time.
      - Live Tab DSP Audio Capture: Uses getDisplayMedia with immediate video
        track disposal to route browser audio (YouTube/Spotify) through custom
        Web Audio biquad filter cascades with real-time latency telemetry and
        a 30ms anti-pop crossfader.
      - CrinGraph Acoustic Visualization Suite: Custom 60 FPS SVG visualizer
        displaying 1–1.5–2–3–4–6–8 decade ticks, Harman In-Ear 2019
        (verbatim 301-point curve), Crinacle IEF 2025 (B&K 5128), and a magnetic
        dual-curve crosshair.
      - Multi-Gear Shootouts with Google Grounding: Real-time side-by-side gear
        battle matrix querying Gemini 3.6 Flash with search grounding for driver
        specs, impedance, soundstage, and live market pricing.
      - Digital Headroom Safety Guard: Automatically calculates negative
        pre-amplification
        (\text{Preamp} = \min(0, -\max(\text{Gains}) - 0.2\text{ dB})) to
        eliminate inter-sample digital clipping upon profile export.
  - Hard Metrics & Impact:
      - Automated residual PEQ minimization drives raw frequency response
        deviations down to \le 0.5\text{ dB} RMS error.
      - 23ms live tab DSP latency with 0ms zero-pop latching A/B transitions.
      - Verbatim implementation of 301-point Harman In-Ear 2019 acoustic
        dataset.
  - Resume / Portfolio Bullet Points:
      - Developed a browser-based audiophile DSP acoustic suite using
        React 19.2, TypeScript 5.8, Web Audio API, and Gemini 3.6 Flash.
      - Programmed a greedy residual auto-PEQ algorithm in TypeScript that
        iteratively synthesizes biquad filters across logarithmic frequency
        bands, reducing target curve deviation to <0.5\text{ dB} RMS.
      - Engineered an Equalizer APO system bridge, enabling seamless,
        non-destructive, real-time hot-reloading of parametric EQ profiles
        directly into the Windows OS audio pipeline.
      - Constructed an in-browser audio capture and audition engine leveraging
        getDisplayMedia and custom biquad cascades to apply live EQ curves to
        streaming media with a 30ms anti-pop crossfader.

4. 🛰️ GNSS Multi-Stream Precision Positioning & Trajectory Processing Engine

Executive Pitch: An industrial-grade software-defined GNSS positioning,
multi-stream signal fusion, and trajectory processing engine benchmarking
multi-constellation corrections against 2cm RTK ground truth across calibration
and 20 KM road drives.

  - Tech Stack: Python, NumPy, SciPy, Geodesy (ECEF/ENU transformations),
    XGBoost, LightGBM, Kalman Filtering, Rauch-Tung-Striebel (RTS) Optimal
    Smoother.
  - Core Architecture & Engineering Highlights:
      - Stage 1: 3D ECEF Inverse-Variance Physics Fusion: Fuses Single-Frequency
        SPP (GPS L1), BeiDou-3 PPP-B2b, and Dual-Frequency L5 streams in 3D
        Cartesian coordinates weighted by w_i = 1 / \sigma_i^2, establishing the
        locked production baseline.
      - Stage 3 & RTS Trajectory Filtering: Implemented a 6-state forward
        Newtonian Kalman velocity filter and an offline Rauch-Tung-Striebel
        (RTS) backward smoother to eliminate turn-phase lag and acceleration
        noise.
      - 5-Tier Statistical & Metrological Audit: Conducted rigorous
        Leave-One-Round-Out (LODO-CV) cross-validation and hypothesis testing
        (p-values, Chi-square NIS innovation gating). Discovered that while
        unconstrained tree ML models fit within-session calibration, they
        degrade vertical accuracy on unseen environments (+15.01 cm,
        p = 1.98 \times 10^{-20}); rigorously demoted ML to experimental opt-in
        to safeguard production integrity.
      - Tunnel Blackout Dead-Reckoning: Kinematic velocity tracking maintains
        path stability during full satellite loss (5s, 15s, and 60s blackout
        simulations).
  - Hard Metrics & Impact:
      - Horizontal Accuracy: 1.265 m Horizontal RMS (88.4% error reduction over
        raw consumer GPS at 10.89 m RMS).
      - RTS Backward Smoothing: 1.235 m Horizontal RMS (p = 9.3 \times 10^{-6}
        statistically significant improvement).
      - Tunnel Blackout Integrity: Maintained a low real-time drift rate of
        0.062\text{ m/s} across 15-second total signal outages (150m
        underground).
      - Benchmark Scale: Validated across n=842 calibration epochs and n=1,651
        road drive epochs (\sim20\text{ KM}) against NovAtel ProPak6 NRTK ground
        truth.
  - Resume / Portfolio Bullet Points:
      - Architected a multi-stream GNSS signal fusion engine fusing SPP L1,
        BeiDou PPP-B2b, and Dual L5 streams in 3D ECEF coordinates, cutting
        horizontal error by 88.4% (from 10.89m to 1.265m RMS).
      - Implemented a 6-state Newtonian Kalman filter and Rauch-Tung-Striebel
        (RTS) backward smoother, achieving 1.235m RMS trajectory accuracy
        validated against 2cm NovAtel RTK ground truth.
      - Executed a 5-tier metrological statistical audit (LODO-CV, paired
        t-tests, Chi-square NIS RAIM gating) identifying out-of-fold ML
        generalization risks, preserving production physics reliability.
      - Engineered kinematic dead-reckoning algorithms resilient to 60-second
        complete GNSS tunnel blackouts with a measured drift rate of just 0.062
        m/s.

5. 🎙️ Mobile Voice Recorder & AI Notes Studio

Executive Pitch: A privacy-first React Native mobile application that records
audio, streams Gemini speech-to-text, parses multi-intent reminders with
timezone awareness, and registers exact OS lock-screen alarms.

  - Tech Stack: React Native (Expo SDK 54+), TypeScript, SQLite (with FTS5
    Full-Text Search), Google Gemini 3.5 Flash-Lite, expo-av, expo-secure-store,
    Android Exact Alarms (NotificationService).
  - Core Architecture & Engineering Highlights:
      - Decoupled 10Hz Audio Visualizer: 16kHz mono audio recorder (expo-av)
        decoupled via custom state hooks to isolate high-frequency dBFS metering
        updates strictly to a 28-bar animated visualizer without re-rendering
        parent screens.
      - Dual-Path Audio Pipeline: Routes audio \le 120s and \le 700\text{KB}
        directly via Base64 payloads, while automatically delegating larger
        recordings to the Google AI File API.
      - Streaming Transcription & Multi-Reminder Parsing: Employs a dual LLM
        call strategy: Call A streams transcription tokens in real-time, while
        Call B injects local device timezone offsets (getLocalTimeContext) to
        parse multiple scheduled tasks and deadlines into structured ISO
        timestamps.
      - Android Exact Alarms & Lock-Screen Actions: Bypasses Android Doze mode
        using exact alarm scheduling (SCHEDULE_EXACT_ALARM, WAKE_LOCK). Adds
        interactive lock-screen action buttons ("Mark Done", "Snooze 10m") that
        execute atomic SQLite updates directly from the notification shade.
      - SQLite FTS5 Full-Text Search: Virtual table indexing titles, content,
        raw transcripts, and tags with a 150ms debounce and dynamic keyword
        snippet highlighting.
  - Hard Metrics & Impact:
      - Zero UI Lag: Isolated 10Hz metering re-renders completely from
        navigation and list threads.
      - Zero UTC drift: Explicit timezone offset injection prevents 100% of
        multi-hour reminder scheduling bugs.
      - Offline Resilience: SQLite-backed FIFO sync queue handles automatic
        exponential backoff on API rate limits.
  - Resume / Portfolio Bullet Points:
      - Built a cross-platform voice recorder and speech intelligence app using
        React Native (Expo SDK 54), TypeScript, SQLite FTS5, and Gemini 3.5
        Flash-Lite.
      - Engineered an audio pipeline using dual-channel routing (Base64 inline
        vs. Google AI File API) and decoupled 10Hz dBFS metering for 60 FPS
        waveform animations.
      - Implemented timezone-aware LLM reminder parsing, scheduling native
        Android exact alarms with interactive lock-screen notifications ("Mark
        Done", "Snooze 10m") that manipulate SQLite directly.
      - Integrated SQLite FTS5 virtual tables with custom query debouncing and
        highlighted snippet extraction for instant sub-millisecond local
        transcript search.

6. 🎬 CinemaVault

Executive Pitch: A high-performance movie discovery platform and personal cinema
vault powered by a hybrid statistical taste-profiling engine and Gemini AI
recommendation pipeline with anti-hallucination verification.

  - Tech Stack: React 18, Vite 5, Tailwind CSS, Google Gemini API
    (@google/genai), OMDb API, Framer Motion, Lucide React.
  - Core Architecture & Engineering Highlights:
      - Statistical Taste Profiling & Stratified Sampling: Extracts user
        affinity vectors across genres, directors, and ratings. Preserves "Elite
        Anchors" (9–10/10) uncapped, samples supporting films (7–8/10), and
        tracks recent watches to bound context efficiently.
      - Anti-Pattern & Disqualification Penalty: Encodes negatively reviewed
        titles (\le 5/10) and user criticism notes into prompt constraints,
        forcing the AI to penalize candidate films sharing identical cinematic
        flaws.
      - Token-Efficient Compact CSV Encoding: Serializes movie metadata into
        pipe-delimited strings (Title|Year|Director|Genre|Rating|Notes),
        shrinking prompt token consumption by ~60%.
      - Dual-Pass AI Critique & Real-Data OMDb Anti-Hallucination: A secondary
        critique prompt audits generated recommendations against user
        anti-patterns. Every candidate title is then validated via live OMDb API
        calls to verify true release dates, IMDb ratings, and box office data,
        overwriting hallucinated metadata.
      - Glassmorphic UI Design System: Built with 3-surface elevation tokens,
        ambient gradient blur orbs, SVG film-grain overlays, and global
        Command-Palette (Ctrl+K) search.
  - Hard Metrics & Impact:
      - ~60% reduction in LLM prompt tokens achieved via custom pipe-delimited
        CSV encoding.
      - Zero hallucinated film entries: 100% verified against real-world OMDb
        API metadata.
      - Failover Resilience: 3-tier model fallback routing (gemini-3.6-flash \to
        2.5-flash \to 2.0-flash).
  - Resume / Portfolio Bullet Points:
      - Engineered a cinematic discovery platform using React 18, Vite, Tailwind
        CSS, Framer Motion, and Google Gemini AI.
      - Designed a hybrid recommendation algorithm featuring stratified
        preference sampling, anti-pattern disqualification, and a ~60%
        token-compressed CSV prompt representation.
      - Eliminated LLM hallucinations by implementing a dual-pass AI
        self-critique stage paired with synchronous real-time OMDb API metadata
        verification.
      - Created a theater-grade glassmorphic UI featuring responsive
        command-palette search, animated SVG posters, and deep vault analytics
        dashboards.

7. ⚡ YT Tracker — YouTube Competitive Intelligence & Growth Studio

Executive Pitch: A full-spectrum competitive intelligence platform and creator
workflow suite for YouTube creators, providing real-time competitor tracking,
client-side NLP topic forensics, and content scheduling with zero quota waste.

  - Tech Stack: Python, Flask, Gunicorn, PostgreSQL (Supabase), Vanilla ES6+
    JavaScript (11 modular modules), CSS3 (7 modular sheets), YouTube Data API
    v3, Tkinter/PIL companion.
  - Core Architecture & Engineering Highlights:
      - Zero-Quota-Waste Architecture: Implemented thread-local client pooling
        and aggressive multi-layer client-side caching, minimizing YouTube Data
        API v3 quota consumption.
      - Client-Side NLP N-Gram Topic Engine: Performs client-side multi-word
        topic clustering and alias normalization to identify surge velocities
        (>1.3\times momentum spikes) and generate 7×12 publication velocity
        heatmaps.
      - Topic Moats & Competitor Gap Analysis: Automatically isolates niche
        categories where your channel maintains >60\% upload dominance vs.
        untapped gaps where competitors are capturing traffic.
      - Creator Studio & Title Lab (0–100 CTR Scorer): Algorithmic title scoring
        evaluating Power Words, Curiosity, Character Length, and Niche Keywords,
        coupled with an interactive 4-stage swipe-snap Kanban board.
      - Bi-Directional State URL Synchronization: Serializes all view
        parameters, deep-dive filters, and competitor comparison sets directly
        into URL hash fragments for one-click shareability.
  - Hard Metrics & Impact:
      - Modular architecture: 11 decoupled ES6 JS modules and 7 modular CSS
        sheets running with zero bundling overhead.
      - Instant client-side NLP clustering operating in <15ms directly inside
        the browser.
  - Resume / Portfolio Bullet Points:
      - Built a full-stack YouTube analytics platform using Flask, Supabase
        (PostgreSQL), and modular Vanilla JavaScript.
      - Architected a client-side NLP topic extraction engine, computing n-gram
        keyword velocity, topic moats (>60% dominance), and competitive content
        gaps.
      - Engineered a real-time Title CTR Scorer and 4-stage swipe-snap Kanban
        pipeline for creator workflow management.
      - Optimized YouTube API quota consumption via thread-local client pooling,
        snapshot persistence, and bi-directional URL state serialization.

8. 📍 My Location Diary

Executive Pitch: An autonomous, privacy-first personal location tracker and
daily chronicler that processes mobile GPS pings, verifies unknown locations via
automated email loops, and generates narrative daily diaries using Gemini AI.

  - Tech Stack: FastAPI, Python, SQLite, Google Gemini 3.5 Flash, Resend API,
    Google Places API, OwnTracks (HTTP / Geofences), HTML5/Tailwind.
  - Core Architecture & Engineering Highlights:
      - Autonomous Geofencing Engine: Ingests live mobile GPS pings from
        OwnTracks; calculates Haversine distances against configured
        points-of-interest (places.json) to register visits and compute exact
        stay durations.
      - Interactive Human-in-the-Loop Confirmation: When untracked coordinates
        are detected, queries Google Places API and triggers an automated Resend
        email with one-click approval links (/confirm/{conf_id}/yes), logging
        new places seamlessly.
      - Automated Nightly AI Chronicler: Cron-triggered pipeline
        (cron_summary.py) synthesizes daily visits, transit durations, and
        timestamps into a warm, narrative diary entry dispatched directly to
        your inbox.
  - Resume / Portfolio Bullet Points:
      - Developed an automated location diary and geofencing platform using
        FastAPI, SQLite, OwnTracks, and Google Gemini 3.5 Flash.
      - Implemented Haversine distance-matching to log point-of-interest dwell
        times, backed by an automated Google Places API reverse-geocoding
        fallback.
      - Designed an email confirmation loop via Resend API enabling 1-click
        verification of unknown locations without opening the application.
      - Automated nightly narrative diary generation and email dispatch using
        Gemini 3.5 Flash and Linux cron jobs.

9. 🥗 Smart Calorie Tracker App

Executive Pitch: A clean, responsive desktop application for daily nutritional
logging, caloric balance monitoring, and macro-nutrient tracking built with a
lightweight Python GUI architecture.

  - Tech Stack: Python 3, Tkinter / CustomTkinter, SQLite.
  - Core Architecture & Engineering Highlights:
      - Local-First Nutritional Tracking: Fast desktop client built for
        zero-latency caloric intake and expenditure logging.
      - Structured UI Layer: Decoupled ui/app.py modular layout separating macro
        calculation formulas and visual charts from database persistence.
  - Resume / Portfolio Bullet Points:
      - Developed a lightweight desktop nutritional tracker in Python featuring
        interactive meal logging and daily macronutrient balance calculations.
      - Engineered a responsive local desktop GUI ensuring zero-latency data
        entry and local persistence.

💡 Recommended Portfolio Presentation Strategy

When displaying these projects on your website or resume:

1.  Highlight the "Systems & AI Engineering" Core: Group GNSS Precision Engine,
    The Silent AI Daily Auditor, and AudioSage at the top. These demonstrate
    complex algorithmic depth (Kalman filters, DSP Web Audio biquad cascades,
    Win32 API ctypes, and statistical cross-validation).
2.  Highlight "Full-Stack & Product Polish": Feature AI Learning Companion 2.0,
    CinemaVault, and YT Tracker. These prove your capability in building
    complete, polished SaaS-grade products with modern UX, state
    synchronization, caching, and database query optimization.
3.  Highlight "Mobile & Local-First": Feature Mobile Voice Recorder & AI Notes
    Studio to show native mobile capabilities (Expo/React Native, SQLite FTS5,
    Android OS alarms, and real-time audio visualization).
