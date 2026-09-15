"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  FileText,
  Activity,
  Zap,
  Layers,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface TechDetail {
  name: string;
  category: string;
  role: string;
  metric: string;
  project: string;
}

const TECH_DATABASE: Record<string, TechDetail> = {
  Python: {
    name: "Python",
    category: "Real-Time Systems & DSP",
    role: "Extended Kalman Filter spatial fusion, biquad DSP audio math, and native Win32 ctypes sensory daemons.",
    metric: "0.0% CPU overhead • Sub-ms numerical loops",
    project: "GNSS Spatial Fusion & Silent Auditor",
  },
  TypeScript: {
    name: "TypeScript",
    category: "Full-Stack & Edge",
    role: "Strict type-safe application logic, audio worklet bridges, and serverless API contracts.",
    metric: "100% strict type coverage • Zero runtime any",
    project: "AudioSage & AI Learning Companion",
  },
  JavaScript: {
    name: "JavaScript",
    category: "Full-Stack & Edge",
    role: "Modern ESNext runtime execution, Web Audio API DSP graphs, and client-side reactive DOM.",
    metric: "23ms Web Audio DSP latency",
    project: "AudioSage & Browser Engines",
  },
  SQL: {
    name: "SQL",
    category: "Data & Storage",
    role: "Complex CTE queries, atomic transaction isolation, and spaced-repetition scheduler RPCs.",
    metric: "3 queries (slashed from 1+2N+V)",
    project: "Learning Companion & Calorie Tracker",
  },
  Bash: {
    name: "Bash",
    category: "Systems & DevOps",
    role: "Automated benchmarking harnesses, CI/CD telemetry pipelines, and zero-downtime deploy scripts.",
    metric: "Automated test harnesses",
    project: "DevOps & Local Toolchain",
  },
  React: {
    name: "React",
    category: "Frontend Architecture",
    role: "High-performance reactive interfaces with optimistic UI, virtualized lists, and custom hooks.",
    metric: "60 FPS smooth interactions",
    project: "CinemaVault & Learning Hub",
  },
  "Next.js": {
    name: "Next.js",
    category: "Full-Stack & Edge",
    role: "App Router SSR, Edge Route Handlers, serverless ISR caching, and dynamic OpenGraph generation.",
    metric: "100/100 Core Web Vitals",
    project: "Production Web Deployments",
  },
  "React Native": {
    name: "React Native",
    category: "Mobile Architecture",
    role: "Cross-platform mobile architecture with native SQLite bridge and hardware telemetry sensors.",
    metric: "60 FPS on low-power devices",
    project: "Smart Calorie Tracker",
  },
  FastAPI: {
    name: "FastAPI",
    category: "AI & Microservices",
    role: "Asynchronous Python microservices, streaming LLM completions, and low-latency API contracts.",
    metric: "<15ms response overhead",
    project: "AI Learning Companion 2.0",
  },
  Flask: {
    name: "Flask",
    category: "Systems Microservices",
    role: "Lightweight embedded web servers for desktop daemons and local hardware control panels.",
    metric: "Minimal memory footprint",
    project: "Local Microservices",
  },
  NumPy: {
    name: "NumPy",
    category: "Real-Time Systems & DSP",
    role: "Vectorized 3D ECEF coordinate matrix math, spatial rotation, and signal variance calculations.",
    metric: "Vectorized matrix operations",
    project: "GNSS Multi-Stream Fusion",
  },
  SciPy: {
    name: "SciPy",
    category: "Real-Time Systems & DSP",
    role: "Digital signal processing filter synthesizers, biquad PEQ curves, and statistical distributions.",
    metric: "Harman 2019 target curve fitting",
    project: "AudioSage PEQ Synthesizer",
  },
  "Win32 Ctypes": {
    name: "Win32 Ctypes",
    category: "Real-Time Systems & DSP",
    role: "Direct OS user32 / kernel32 DLL hooking for zero-overhead background event telemetry.",
    metric: "0.0% CPU daemon overhead",
    project: "Silent AI Daily Auditor",
  },
  "Web Audio API": {
    name: "Web Audio API",
    category: "Real-Time Systems & DSP",
    role: "Client-side biquad filter nodes, parametric equalizers, and anti-pop audio graph crossfaders.",
    metric: "23ms DSP tab latency",
    project: "AudioSage Synthesizer",
  },
  SQLite: {
    name: "SQLite",
    category: "Data & Storage",
    role: "Offline-first zero-latency local relational storage with WAL mode and atomic integrity.",
    metric: "0ms network latency • 100% private",
    project: "Silent Auditor & Calorie App",
  },
  PostgreSQL: {
    name: "PostgreSQL",
    category: "Data & Storage",
    role: "Robust relational data store with custom PL/pgSQL stored procedures and indexed search.",
    metric: "ACID transactions & SM-2 scheduling",
    project: "AI Learning Companion",
  },
  Docker: {
    name: "Docker",
    category: "Infrastructure & Cloud",
    role: "Hermetic containerized builds, multi-stage microservice isolation, and reproducible environments.",
    metric: "Reproducible production images",
    project: "Cloud Deployments & Services",
  },
  "Google Gemini API": {
    name: "Google Gemini API",
    category: "AI & Intelligence",
    role: "3-tier LLM fallback cascade (3.5 Flash → 2.5 → 2.0) with pipe-delimited CSV prompt optimization.",
    metric: "60% token reduction • 0.0% hallucination",
    project: "CinemaVault & Daily Chronicler",
  },
  "CSV Prompt Encoding": {
    name: "CSV Prompt Encoding",
    category: "AI & Intelligence",
    role: "Pipe-delimited dense tabular prompt serialization replacing verbose structured JSON payloads.",
    metric: "Up to 60% prompt token reduction",
    project: "CinemaVault AI Engine",
  },
  "OMDb API": {
    name: "OMDb API",
    category: "AI & Intelligence",
    role: "Authoritative ground-truth verification layer against hallucinated titles, release dates, and cast credits.",
    metric: "100% verified ground truth",
    project: "CinemaVault Truth Verifier",
  },
  "Resend API": {
    name: "Resend API",
    category: "Infrastructure & Cloud",
    role: "Transactional authentication emails, one-click verification tokens, and dispatch logging.",
    metric: "Sub-second delivery webhook sync",
    project: "Daily Chronicler & Auth",
  },
  Git: {
    name: "Git",
    category: "Infrastructure & Cloud",
    role: "Atomic commit history, branch isolation, trunk-based CI triggers, and release tagging.",
    metric: "Clean semantic changelogs",
    project: "All Codebases",
  },
  Vercel: {
    name: "Vercel",
    category: "Infrastructure & Cloud",
    role: "Edge routing, global serverless functions, automated previews, and CDN asset streaming.",
    metric: "Global edge CDN propagation",
    project: "Production Frontends",
  },
};

const CAPABILITY_HUBS = [
  {
    id: "systems",
    title: "Real-Time Systems & DSP",
    subtitle: "Low-latency numerical algorithms, hardware sensory daemons, and audio signal processing.",
    accent: "from-blue-500/20 via-blue-500/5 to-transparent",
    borderHover: "hover:border-blue-500/40",
    badgeGlow: "bg-apple-blue/15 text-apple-blue border-apple-blue/30",
    icon: Activity,
    stats: [
      { label: "CPU Overhead", value: "0.0%" },
      { label: "Target PEQ Error", value: "≤ 0.5 dB" },
      { label: "DSP Latency", value: "23 ms" },
    ],
    techList: ["Python", "SciPy", "NumPy", "Win32 Ctypes", "Web Audio API", "Bash"],
    flagship: "Powers GNSS Spatial Fusion & AudioSage PEQ",
  },
  {
    id: "ai",
    title: "Autonomous AI & Intelligence",
    subtitle: "Anti-hallucination pipelines, CSV token compression, and resilient multi-tier LLM cascades.",
    accent: "from-indigo-500/20 via-purple-500/5 to-transparent",
    borderHover: "hover:border-indigo-500/40",
    badgeGlow: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    icon: Zap,
    stats: [
      { label: "Cascade Fallback", value: "3-Tier" },
      { label: "Prompt Token Cut", value: "60%" },
      { label: "Hallucinations", value: "0.0%" },
    ],
    techList: ["Google Gemini API", "FastAPI", "CSV Prompt Encoding", "OMDb API"],
    flagship: "Powers CinemaVault & AI Daily Chronicler",
  },
  {
    id: "fullstack",
    title: "Full-Stack & Local-First Edge",
    subtitle: "Zero-latency offline persistence, cross-platform mobile architectures, and reactive web apps.",
    accent: "from-emerald-500/20 via-teal-500/5 to-transparent",
    borderHover: "hover:border-emerald-500/40",
    badgeGlow: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: Layers,
    stats: [
      { label: "Local Data Latency", value: "0 ms" },
      { label: "Mobile UI Frame Rate", value: "60 FPS" },
      { label: "Optimized DB Queries", value: "3 Queries" },
    ],
    techList: ["React Native", "Next.js", "TypeScript", "SQLite", "PostgreSQL", "Docker", "Resend API", "Vercel"],
    flagship: "Powers Smart Calorie Tracker & Learning Companion 2.0",
  },
];

const MARQUEE_ITEMS = [
  "3D ECEF Signal Fusion",
  "0.0% CPU Win32 Daemons",
  "Web Audio DSP Cascades",
  "3-Tier LLM Cascades",
  "Zero-Latency SQLite",
  "Offline-First React Native",
  "Harman Target Curve Synthesis",
  "CSV Token Compression",
  "SM-2 Spaced Repetition",
  "Automated E2E Telemetry",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function ProjectArchive() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const activeTechInfo = hoveredTech ? TECH_DATABASE[hoveredTech] : null;

  return (
    <section
      id="archive"
      className="py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-28 select-none"
    >
      {/* — 1. High-Impact Personal Statement & Executive Bio — */}
      <div className="space-y-10">
        <motion.div {...fadeUp(0)} className="flex items-center gap-3">
          <span className="inline-block text-sm font-sans font-semibold tracking-wider uppercase text-apple-blue">
            About // Systems & AI Engineer
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-apple-blue/60" />
          <span className="text-sm font-sans text-neutral-400">
            Karachi, PK
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.05)}
          className="font-sans text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1.04] tracking-tight max-w-6xl"
        >
          I build systems that run on real hardware, with real constraints —{" "}
          <span className="text-neutral-500 font-normal">
            not demos, not tutorials.
          </span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className="text-neutral-300 text-xl sm:text-2xl leading-relaxed max-w-4xl font-normal"
        >
          Based in Karachi. I specialise in systems & AI engineering, full-stack
          web, and mobile-first local apps. Everything I ship is production code —
          benchmarked, deployed, and built to survive edge cases.
        </motion.p>

        <motion.div
          {...fadeUp(0.15)}
          className="flex items-center gap-4 flex-wrap pt-2"
        >
          <a
            href="https://github.com/khuzaima175"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-base font-semibold transition-all duration-200 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]"
            data-cursor-interactive="true"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-apple-blue hover:bg-blue-400 text-white text-base font-semibold transition-all duration-200 shadow-xl shadow-apple-blue/25 hover:scale-[1.02] active:scale-[0.98]"
            data-cursor-interactive="true"
          >
            <FileText className="w-5 h-5" />
            Download CV
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-sans text-neutral-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for select engineering roles</span>
          </div>
        </motion.div>
      </div>

      {/* — 2. Massive Eye-Catching Kinetic Capabilities Stream — */}
      <motion.div
        {...fadeUp(0.2)}
        className="relative overflow-hidden py-8 border-y border-white/10 bg-gradient-to-r from-white/[0.01] via-white/[0.03] to-white/[0.01]"
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee space-x-12 items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-600 hover:text-white transition-colors duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-apple-blue" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* — 3. Grand Architectural Capability Hubs — */}
      <div className="space-y-10">
        <div className="space-y-3">
          <span className="text-sm font-sans font-semibold tracking-wider uppercase text-apple-blue">
            Core Toolchain & Architecture
          </span>
          <h3 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Engineered for speed. Built for scale.
          </h3>
          <p className="text-neutral-400 text-lg sm:text-xl max-w-3xl font-normal">
            Every tool is selected to maximize hardware performance, eliminate bloat, and deliver verifiable precision.
          </p>
        </div>

        {/* 3 Massive Architectural Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CAPABILITY_HUBS.map((hub, hIdx) => {
            const Icon = hub.icon;
            return (
              <motion.div
                key={hub.id}
                {...fadeUp(hIdx * 0.1)}
                className={`relative p-8 sm:p-10 bg-[#121214] border border-white/10 ${hub.borderHover} rounded-[2.5rem] transition-all duration-500 flex flex-col justify-between space-y-8 overflow-hidden group shadow-2xl`}
              >
                {/* Ambient Radial Specular Gradient */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${hub.accent} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700`}
                />

                <div className="space-y-6 relative z-10">
                  {/* Hub Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-apple-blue shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3.5 py-1 rounded-full text-xs font-sans font-semibold border ${hub.badgeGlow}`}>
                      PROD VERIFIED
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {hub.title}
                    </h4>
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-normal">
                      {hub.subtitle}
                    </p>
                  </div>

                  {/* Benchmark Performance Telemetry Grid */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10">
                    {hub.stats.map((st, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="text-[11px] text-neutral-400 uppercase font-sans font-medium tracking-wide">
                          {st.label}
                        </div>
                        <div className="font-sans text-base sm:text-lg font-bold text-white">
                          {st.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Tech Badges */}
                  <div className="space-y-3">
                    <div className="text-xs font-sans font-semibold uppercase tracking-wider text-neutral-400">
                      Technology Stack
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {hub.techList.map((techName) => {
                        const isHovered = hoveredTech === techName;
                        return (
                          <button
                            key={techName}
                            onMouseEnter={() => setHoveredTech(techName)}
                            onMouseLeave={() => setHoveredTech(null)}
                            onClick={() => setHoveredTech(techName)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-sans font-semibold transition-all duration-200 border ${
                              isHovered
                                ? "bg-apple-blue text-white border-apple-blue shadow-lg shadow-apple-blue/30 scale-105"
                                : "bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border-white/10 hover:border-white/30"
                            }`}
                            data-cursor-interactive="true"
                          >
                            {techName}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Flagship System Link Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-400 relative z-10">
                  <span className="truncate">{hub.flagship}</span>
                  <ChevronRight className="w-4 h-4 text-apple-blue flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* — 4. Grand Live Capability Telemetry HUD / Inspector Visor — */}
        <motion.div
          {...fadeUp(0.15)}
          className="relative p-8 sm:p-12 rounded-[2.5rem] bg-[#0d0d0f] border border-white/15 overflow-hidden shadow-2xl backdrop-blur-2xl"
        >
          {/* Glowing Top Specular Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-apple-blue to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 flex-1">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-apple-blue animate-ping" />
                <span className="text-sm font-sans uppercase tracking-wider text-apple-blue font-bold">
                  {activeTechInfo
                    ? `Live Telemetry // ${activeTechInfo.name}`
                    : "Interactive Capability Inspector"}
                </span>
                {activeTechInfo && (
                  <span className="px-3 py-0.5 rounded-full bg-white/10 text-xs font-sans font-semibold text-neutral-300">
                    {activeTechInfo.category}
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={hoveredTech || "default"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-sans text-lg sm:text-2xl text-white font-medium leading-relaxed"
                >
                  {activeTechInfo
                    ? activeTechInfo.role
                    : "Hover over or tap any technology chip above to inspect its verified production role, hardware benchmarks, and architectural implementation."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Benchmark & Target Spec Column */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:border-l lg:border-white/15 lg:pl-10 flex-shrink-0">
              <div className="space-y-1.5">
                <span className="text-xs font-sans uppercase tracking-wider text-neutral-400 font-semibold block">
                  {activeTechInfo ? "Verified Metric" : "Quality Standard"}
                </span>
                <span className="text-base sm:text-lg font-sans text-apple-blue font-bold block">
                  {activeTechInfo ? activeTechInfo.metric : "Zero Bloat • Sub-Millisecond"}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-sans uppercase tracking-wider text-neutral-400 font-semibold block">
                  {activeTechInfo ? "Deployed In" : "Flagship Suite"}
                </span>
                <span className="text-base sm:text-lg font-sans text-white font-semibold block">
                  {activeTechInfo ? activeTechInfo.project : "9 Production Architectures"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

