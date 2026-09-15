"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  FileText,
  Code2,
  Layers,
  Cpu,
  Sparkles,
  Zap,
  Activity,
} from "lucide-react";

type DomainKey = "all" | "systems" | "ai" | "fullstack" | "mobile";

interface TechDetail {
  name: string;
  category: "languages" | "frameworks" | "infra";
  domains: DomainKey[];
  role: string;
  metric: string;
  project: string;
}

const TECH_DATABASE: Record<string, TechDetail> = {
  Python: {
    name: "Python",
    category: "languages",
    domains: ["all", "systems", "ai"],
    role: "Extended Kalman Filter spatial fusion, biquad DSP audio math, and native Win32 ctypes sensory daemons.",
    metric: "0.0% CPU overhead • Sub-ms numerical loops",
    project: "GNSS Spatial Fusion & Silent Auditor",
  },
  TypeScript: {
    name: "TypeScript",
    category: "languages",
    domains: ["all", "fullstack", "mobile"],
    role: "Strict type-safe application logic, audio worklet bridges, and serverless API contracts.",
    metric: "100% strict type coverage • Zero runtime any",
    project: "AudioSage & AI Learning Companion",
  },
  JavaScript: {
    name: "JavaScript",
    category: "languages",
    domains: ["all", "fullstack"],
    role: "Modern ESNext runtime execution, Web Audio API DSP graphs, and client-side reactive DOM.",
    metric: "23ms Web Audio DSP latency",
    project: "AudioSage & Browser Engines",
  },
  SQL: {
    name: "SQL",
    category: "languages",
    domains: ["all", "mobile", "fullstack"],
    role: "Complex CTE queries, atomic transaction isolation, and spaced-repetition scheduler RPCs.",
    metric: "3 queries (slashed from 1+2N+V)",
    project: "Learning Companion & Calorie Tracker",
  },
  Bash: {
    name: "Bash",
    category: "languages",
    domains: ["all", "systems", "fullstack"],
    role: "Automated benchmarking harnesses, CI/CD telemetry pipelines, and zero-downtime deploy scripts.",
    metric: "Automated test harnesses",
    project: "DevOps & Local Toolchain",
  },
  React: {
    name: "React",
    category: "frameworks",
    domains: ["all", "fullstack"],
    role: "High-performance reactive interfaces with optimistic UI, virtualized lists, and custom hooks.",
    metric: "60 FPS smooth interactions",
    project: "CinemaVault & Learning Hub",
  },
  "Next.js": {
    name: "Next.js",
    category: "frameworks",
    domains: ["all", "fullstack"],
    role: "App Router SSR, Edge Route Handlers, serverless ISR caching, and dynamic OpenGraph generation.",
    metric: "100/100 Core Web Vitals",
    project: "Production Web Deployments",
  },
  "React Native": {
    name: "React Native",
    category: "frameworks",
    domains: ["all", "mobile"],
    role: "Cross-platform mobile architecture with native SQLite bridge and hardware telemetry sensors.",
    metric: "60 FPS on low-power devices",
    project: "Smart Calorie Tracker",
  },
  FastAPI: {
    name: "FastAPI",
    category: "frameworks",
    domains: ["all", "systems", "ai"],
    role: "Asynchronous Python microservices, streaming LLM completions, and low-latency API contracts.",
    metric: "<15ms response overhead",
    project: "AI Learning Companion 2.0",
  },
  Flask: {
    name: "Flask",
    category: "frameworks",
    domains: ["all", "systems"],
    role: "Lightweight embedded web servers for desktop daemons and local hardware control panels.",
    metric: "Minimal memory footprint",
    project: "Local Microservices",
  },
  NumPy: {
    name: "NumPy",
    category: "frameworks",
    domains: ["all", "systems", "ai"],
    role: "Vectorized 3D ECEF coordinate matrix math, spatial rotation, and signal variance calculations.",
    metric: "Vectorized matrix operations",
    project: "GNSS Multi-Stream Fusion",
  },
  SciPy: {
    name: "SciPy",
    category: "frameworks",
    domains: ["all", "systems"],
    role: "Digital signal processing filter synthesizers, biquad PEQ curves, and statistical distributions.",
    metric: "Harman 2019 target curve fitting",
    project: "AudioSage PEQ Synthesizer",
  },
  "Framer Motion": {
    name: "Framer Motion",
    category: "frameworks",
    domains: ["all", "fullstack"],
    role: "Physics-based springs, gesture interactions, layout transitions, and GPU scrollytelling.",
    metric: "Hardware-accelerated transforms",
    project: "Portfolio & Interactive Tools",
  },
  SQLite: {
    name: "SQLite",
    category: "infra",
    domains: ["all", "mobile", "systems"],
    role: "Offline-first zero-latency local relational storage with WAL mode and atomic integrity.",
    metric: "0ms network latency • 100% private",
    project: "Silent Auditor & Calorie App",
  },
  PostgreSQL: {
    name: "PostgreSQL",
    category: "infra",
    domains: ["all", "fullstack"],
    role: "Robust relational data store with custom PL/pgSQL stored procedures and indexed search.",
    metric: "ACID transactions & SM-2 scheduling",
    project: "AI Learning Companion",
  },
  Docker: {
    name: "Docker",
    category: "infra",
    domains: ["all", "systems", "fullstack"],
    role: "Hermetic containerized builds, multi-stage microservice isolation, and reproducible environments.",
    metric: "Reproducible production images",
    project: "Cloud Deployments & Services",
  },
  "Google Gemini API": {
    name: "Google Gemini API",
    category: "infra",
    domains: ["all", "ai"],
    role: "3-tier LLM fallback cascade (3.5 Flash → 2.5 → 2.0) with CSV prompt optimization.",
    metric: "60% token reduction • 0.0% hallucination",
    project: "CinemaVault & Daily Chronicler",
  },
  "Resend API": {
    name: "Resend API",
    category: "infra",
    domains: ["all", "fullstack"],
    role: "Transactional authentication emails, one-click verification tokens, and dispatch logging.",
    metric: "Sub-second delivery webhook sync",
    project: "Daily Chronicler & Auth",
  },
  Git: {
    name: "Git",
    category: "infra",
    domains: ["all", "systems"],
    role: "Atomic commit history, branch isolation, trunk-based CI triggers, and release tagging.",
    metric: "Clean semantic changelogs",
    project: "All Codebases",
  },
  Vercel: {
    name: "Vercel",
    category: "infra",
    domains: ["all", "fullstack"],
    role: "Edge routing, global serverless functions, automated previews, and CDN asset streaming.",
    metric: "Global edge CDN propagation",
    project: "Production Frontends",
  },
};

const STACK_GROUPS = [
  {
    category: "Languages",
    icon: Code2,
    badge: "5 Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Bash"],
  },
  {
    category: "Frameworks & Libraries",
    icon: Layers,
    badge: "Full-Stack & DSP",
    items: [
      "React",
      "Next.js",
      "React Native",
      "FastAPI",
      "Flask",
      "NumPy",
      "SciPy",
      "Framer Motion",
    ],
  },
  {
    category: "Infrastructure & Tools",
    icon: Cpu,
    badge: "Cloud & Local-First",
    items: [
      "SQLite",
      "PostgreSQL",
      "Docker",
      "Google Gemini API",
      "Resend API",
      "Git",
      "Vercel",
    ],
  },
];

const DOMAINS: { id: DomainKey; label: string; icon: typeof Activity }[] = [
  { id: "all", label: "All Toolchain", icon: Sparkles },
  { id: "systems", label: "Systems & DSP", icon: Activity },
  { id: "ai", label: "AI & LLMs", icon: Zap },
  { id: "mobile", label: "Mobile & Local-First", icon: Cpu },
  { id: "fullstack", label: "Full-Stack & Cloud", icon: Layers },
];

const KINETIC_ITEMS = [
  "3D ECEF Signal Fusion",
  "0.0% CPU Win32 Daemons",
  "Web Audio DSP Cascades",
  "3-Tier LLM Cascades",
  "CSV Token Compression",
  "SM-2 Spaced Repetition",
  "Zero-Latency SQLite",
  "Offline-First React Native",
  "Automated E2E Telemetry",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function ProjectArchive() {
  const [selectedDomain, setSelectedDomain] = useState<DomainKey>("all");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const activeTechInfo = hoveredTech ? TECH_DATABASE[hoveredTech] : null;

  return (
    <section
      id="archive"
      className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-24 select-none"
    >
      {/* — Personal Statement & Executive Bio — */}
      <div className="space-y-10">
        <motion.div {...fadeUp(0)} className="flex items-center gap-3">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-apple-blue">
            About // Systems & AI Engineer
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-apple-blue/60" />
          <span className="text-xs font-mono text-apple-subtle">
            Karachi, PK
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.05)}
          className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-apple-tightest max-w-5xl"
        >
          I build systems that run on real hardware, with real constraints —{" "}
          <span className="text-neutral-500 font-normal">
            not demos, not tutorials.
          </span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className="text-neutral-300 text-lg sm:text-xl leading-relaxed max-w-3xl font-normal"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-all duration-200 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]"
            data-cursor-interactive="true"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-apple-blue hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-apple-blue/25 hover:scale-[1.02] active:scale-[0.98]"
            data-cursor-interactive="true"
          >
            <FileText className="w-4 h-4" />
            Download CV
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-apple-subtle">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for select engineering roles</span>
          </div>
        </motion.div>
      </div>

      {/* — Kinetic Engineering Capabilities Ticker — */}
      <motion.div
        {...fadeUp(0.2)}
        className="relative overflow-hidden py-4 border-y border-white/10 bg-white/[0.01]"
      >
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee space-x-8">
          {[...KINETIC_ITEMS, ...KINETIC_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 text-xs font-mono text-apple-subtle/80 tracking-wider uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-apple-blue/70" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* — Interactive Dynamic Toolchain Suite — */}
      <div className="space-y-8">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-apple-blue">
              Engineered Capabilities
            </span>
            <h3 className="font-sans text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Production-Tested Toolchain
            </h3>
          </div>

          {/* Interactive Domain Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {DOMAINS.map((domain) => {
              const Icon = domain.icon;
              const isActive = selectedDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-apple-subtle hover:text-white"
                  }`}
                  data-cursor-interactive="true"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-domain-pill"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/15"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-apple-blue" : "text-apple-subtle"}`} />
                  <span className="relative z-10">{domain.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Glass Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {STACK_GROUPS.map((group, gIdx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                {...fadeUp(gIdx * 0.08)}
                className="relative p-7 sm:p-8 bg-[#121214]/90 backdrop-blur-md border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6 overflow-hidden group shadow-2xl"
              >
                {/* Subtle Ambient Radial Glow on Card Top */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-apple-blue/5 rounded-full blur-2xl pointer-events-none group-hover:bg-apple-blue/10 transition-colors duration-500" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-apple-blue group-hover:scale-105 transition-transform duration-200 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-sans text-base sm:text-lg font-bold text-white tracking-tight">
                      {group.category}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-apple-subtle">
                    {group.badge}
                  </span>
                </div>

                {/* Tech Chips with Interactive Highlights */}
                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {group.items.map((techName) => {
                    const info = TECH_DATABASE[techName];
                    const isRelevant =
                      selectedDomain === "all" ||
                      (info && info.domains.includes(selectedDomain));
                    const isHovered = hoveredTech === techName;

                    return (
                      <button
                        key={techName}
                        onMouseEnter={() => setHoveredTech(techName)}
                        onMouseLeave={() => setHoveredTech(null)}
                        onClick={() => setHoveredTech(techName)}
                        className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left border ${
                          isHovered
                            ? "bg-apple-blue text-white border-apple-blue shadow-lg shadow-apple-blue/20 scale-105 z-20"
                            : isRelevant
                            ? "bg-white/[0.04] hover:bg-white/[0.09] text-neutral-200 hover:text-white border-white/[0.08] hover:border-white/25"
                            : "bg-white/[0.01] text-neutral-600 border-transparent opacity-40 hover:opacity-80"
                        }`}
                        data-cursor-interactive="true"
                      >
                        {techName}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* — Dynamic Capability Telemetry HUD / Live Inspector Visor — */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative p-6 sm:p-8 rounded-3xl bg-[#0c0c0e]/95 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-apple-blue/40 to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-apple-blue animate-ping" />
                <span className="text-xs font-mono uppercase tracking-widest text-apple-blue font-semibold">
                  {activeTechInfo
                    ? `Live Telemetry // ${activeTechInfo.name}`
                    : "Capability Inspector // Interactive Engine"}
                </span>
                {activeTechInfo && (
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-apple-subtle">
                    {activeTechInfo.category.toUpperCase()}
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={hoveredTech || "default"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="font-sans text-base sm:text-lg text-white font-medium leading-relaxed"
                >
                  {activeTechInfo
                    ? activeTechInfo.role
                    : "Hover or click any technology badge above to inspect its real-world production deployment, performance benchmarks, and architectural context."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Benchmark & Target Spec Column */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:border-l lg:border-white/10 lg:pl-8 flex-shrink-0">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-apple-subtle block">
                  {activeTechInfo ? "Benchmark Proof" : "Architecture Standard"}
                </span>
                <span className="text-xs sm:text-sm font-mono text-apple-blue font-semibold block">
                  {activeTechInfo ? activeTechInfo.metric : "Zero Bloat • Measured ms Latency"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-apple-subtle block">
                  {activeTechInfo ? "Deployed In" : "Flagship Systems"}
                </span>
                <span className="text-xs sm:text-sm font-mono text-neutral-300 font-medium block">
                  {activeTechInfo ? activeTechInfo.project : "9 Real-World Projects"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
