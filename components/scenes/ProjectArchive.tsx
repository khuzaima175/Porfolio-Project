"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  FileText,
  Activity,
  Zap,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/ScrollTextReveal";
import { Odometer } from "@/components/ui/Odometer";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_ENTER, SPRING_LAYOUT } from "@/lib/motion/tokens";

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
    badgeGlow: "bg-brand-blue/15 text-brand-blue border-brand-blue/30",
    icon: Activity,
    direction: "left",
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
    direction: "bottom",
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
    direction: "right",
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

export function ProjectArchive() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const activeTechInfo = hoveredTech ? TECH_DATABASE[hoveredTech] : null;

  // Scroll velocity coupling for kinetic marquee
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const marqueeSkew = useTransform(smoothVelocity, [-1500, 1500], [-6, 6]);

  // Typewriter effect for visor role description
  const [typedRole, setTypedRole] = useState("");
  useEffect(() => {
    const targetText = activeTechInfo
      ? activeTechInfo.role
      : "Hover over or tap any technology chip above to inspect its verified production role, hardware benchmarks, and architectural implementation.";
    
    setTypedRole("");
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 2;
      setTypedRole(targetText.slice(0, currentIdx));
      if (currentIdx >= targetText.length) {
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [hoveredTech]);

  return (
    <section
      id="archive"
      className="py-28 px-4 sm:px-12 w-full border-t border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-[95vw] 2xl:max-w-[110rem] mx-auto space-y-24">
        {/* — 1. Personal Statement & Executive Bio — */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Editorial Column */}
        <div className="lg:col-span-7 space-y-7">
          <Reveal variant="slide-right">
            <div className="flex items-center gap-3">
              <span className="inline-block text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-brand-blue font-mono">
                About // Systems & AI Engineer
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
              <span className="text-xs sm:text-sm font-mono text-neutral-400">
                Karachi, PK
              </span>
            </div>
          </Reveal>

          {/* Unified High-Impact Headline */}
          <div className="space-y-2">
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight">
              I build systems that run on real hardware, with real constraints{" "}
              <span className="text-neutral-500 block sm:inline">— not demos, not tutorials.</span>
            </h2>
          </div>

          {/* Word-by-Word Scroll-Illuminated Bio */}
          <div className="pt-1 max-w-2xl">
            <ScrollTextReveal
              text="Based in Karachi. I specialise in systems & AI engineering, full-stack web, and mobile-first local apps. Everything I ship is production code — benchmarked, deployed, and built to survive edge cases."
              highlightWords={[
                "karachi",
                "systems",
                "ai",
                "engineering",
                "full-stack",
                "production",
                "code",
                "benchmarked",
                "deployed",
                "edge",
                "cases",
              ]}
              className="text-base sm:text-xl font-normal leading-relaxed text-brand-subtle"
            />
          </div>

          <Reveal variant="blur-rise" delay={0.2}>
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <a
                href="https://github.com/khuzaima175"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-semibold transition-all duration-200 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]"
                data-cursor-interactive="true"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>

              <a
                href={`mailto:khuzaima.ahmed.33820@gmail.com?subject=Resume%20Request%20-%20Khuzaima%20Ahmed`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-brand-blue/25 hover:scale-[1.02] active:scale-[0.98]"
                data-cursor-interactive="true"
              >
                <FileText className="w-4 h-4" />
                Request CV / Dossier
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-sans text-neutral-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for select engineering roles</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Architectural Dossier Snapshot Card */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_ENTER }}
            className="p-7 sm:p-9 rounded-3xl bg-[#141416]/95 border border-white/15 shadow-2xl backdrop-blur-2xl space-y-6 relative overflow-hidden"
          >
            {/* Ambient Radial Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/15 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                  Engineer Dossier // Verified
                </span>
              </div>
              <span className="font-mono text-[10px] text-brand-subtle uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                2026 ACTIVE
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-sans relative z-10">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-brand-subtle uppercase font-mono text-xs">Primary Discipline</span>
                <span className="text-white font-semibold">Real-Time Systems & AI Engineering</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-brand-subtle uppercase font-mono text-xs">Core Stacks</span>
                <span className="text-white font-semibold">Python • TypeScript • Web Audio DSP • Ctypes</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-brand-subtle uppercase font-mono text-xs">Validation Metric</span>
                <span className="text-brand-blue font-mono font-semibold">0.0% CPU • 1.235m RTS Smoothed</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-brand-subtle uppercase font-mono text-xs">Architectures Shipped</span>
                <span className="text-white font-semibold">9 Production Systems</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* — 2. Dynamic Velocity-Coupled Capabilities Marquee — */}
      <motion.div
        style={{ skewX: marqueeSkew }}
        className="relative overflow-hidden py-6 border-y border-white/10 bg-gradient-to-r from-white/[0.01] via-white/[0.03] to-white/[0.01] marquee-mask"
      >
        <div className="flex w-max animate-marquee space-x-10 items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-600 hover:text-white transition-colors duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* — 3. Grand Architectural Capability Hubs — */}
      <div className="space-y-10">
        <Reveal variant="slide-right">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-brand-blue">
              Core Toolchain & Architecture
            </span>
            <h3 className="font-sans text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Engineered for speed. Built for scale.
            </h3>
            <p className="text-neutral-400 text-base sm:text-lg max-w-3xl font-normal">
              Every tool is selected to maximize hardware performance, eliminate bloat, and deliver verifiable precision.
            </p>
          </div>
        </Reveal>

        {/* 3 Massive Architectural Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {CAPABILITY_HUBS.map((hub, hIdx) => {
            const Icon = hub.icon;
            const initialX = hub.direction === "left" ? -50 : hub.direction === "right" ? 50 : 0;
            const initialY = hub.direction === "bottom" ? 40 : 20;

            return (
              <motion.div
                key={hub.id}
                initial={{ opacity: 0, x: initialX, y: initialY, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: hIdx * 0.12, ease: EASE_ENTER }}
                className={`relative p-7 sm:p-9 bg-[#121214] border border-white/10 ${hub.borderHover} rounded-3xl transition-all duration-500 flex flex-col justify-between space-y-7 overflow-hidden group shadow-2xl`}
              >
                {/* Ambient Radial Specular Gradient */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${hub.accent} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700`}
                />

                <div className="space-y-6 relative z-10">
                  {/* Hub Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-brand-blue shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-sans font-semibold border ${hub.badgeGlow}`}>
                      PROD VERIFIED
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-sans text-2xl font-bold text-white tracking-tight">
                      {hub.title}
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                      {hub.subtitle}
                    </p>
                  </div>

                  {/* Benchmark Performance Telemetry Grid with Odometers */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10">
                    {hub.stats.map((st, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="text-[10px] text-neutral-400 uppercase font-sans font-medium tracking-wide">
                          {st.label}
                        </div>
                        <div className="font-sans text-sm sm:text-base font-bold text-white flex items-center">
                          <Odometer value={st.value} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Tech Badges with Shared Layout Rings */}
                  <div className="space-y-3">
                    <div className="text-xs font-sans font-semibold uppercase tracking-wider text-neutral-400">
                      Technology Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hub.techList.map((techName) => {
                        const isHovered = hoveredTech === techName;
                        return (
                          <button
                            key={techName}
                            onMouseEnter={() => setHoveredTech(techName)}
                            onMouseLeave={() => setHoveredTech(null)}
                            onClick={() => setHoveredTech(techName)}
                            className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all duration-200 border ${
                              isHovered
                                ? "bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/30 scale-105"
                                : "bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border-white/10 hover:border-white/30"
                            }`}
                            data-cursor-interactive="true"
                          >
                            {isHovered && (
                              <motion.div
                                layoutId="active-tech-ring"
                                transition={SPRING_LAYOUT}
                                className="absolute -inset-1 border border-brand-blue/50 rounded-2xl pointer-events-none"
                              />
                            )}
                            <span>{techName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Flagship System Link Footer with 2-line clamp & title */}
                <div
                  title={hub.flagship}
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-400 relative z-10"
                >
                  <span className="line-clamp-1 pr-2">{hub.flagship}</span>
                  <ChevronRight className="w-4 h-4 text-brand-blue flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* — 4. Grand Live Capability Telemetry HUD / Inspector Visor — */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_ENTER }}
          className="relative p-7 sm:p-10 rounded-3xl bg-[#0d0d0f] border border-white/15 overflow-hidden shadow-2xl backdrop-blur-2xl"
        >
          {/* Glowing Top Specular Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 flex-1">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-ping" />
                <span className="text-xs sm:text-sm font-sans uppercase tracking-wider text-brand-blue font-bold">
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

              {/* Monospace Typewriter Description */}
              <p className="font-sans text-base sm:text-xl text-white font-medium leading-relaxed min-h-[3.5rem]">
                {typedRole}
                <span className="inline-block w-1.5 h-4 bg-brand-blue ml-1 animate-pulse" />
              </p>
            </div>

            {/* Benchmark & Target Spec Column */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:border-l lg:border-white/15 lg:pl-10 flex-shrink-0">
              <div className="space-y-1">
                <span className="text-xs font-sans uppercase tracking-wider text-neutral-400 font-semibold block">
                  {activeTechInfo ? "Verified Metric" : "Quality Standard"}
                </span>
                <span className="text-sm sm:text-base font-sans text-brand-blue font-bold block">
                  {activeTechInfo ? activeTechInfo.metric : "Zero Bloat • Sub-Millisecond"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-sans uppercase tracking-wider text-neutral-400 font-semibold block">
                  {activeTechInfo ? "Deployed In" : "Flagship Suite"}
                </span>
                <span className="text-sm sm:text-base font-sans text-white font-semibold block">
                  {activeTechInfo ? activeTechInfo.project : "9 Production Architectures"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
