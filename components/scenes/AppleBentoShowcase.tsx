"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Activity,
  Cpu,
  Layers,
  GraduationCap,
  TrendingUp,
  Mic,
  MapPin,
  Flame,
  Sparkles,
} from "lucide-react";
import { Project } from "@/lib/data/projects";

interface AppleBentoShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function AppleBentoShowcase({
  projects,
  onSelectProject,
}: AppleBentoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 4 Primary Flagships for the Pinned Scrollytelling Theater
  const gnss = projects.find((p) => p.id === "gnss-engine") || projects[0];
  const audiosage = projects.find((p) => p.id === "audiosage") || projects[1];
  const auditor = projects.find((p) => p.id === "silent-auditor") || projects[2];
  const cinema = projects.find((p) => p.id === "cinemavault") || projects[3];

  // 5 Specialized Architectures placed directly below the theater
  const extendedProjects = [
    {
      project: projects.find((p) => p.id === "ai-learning-companion"),
      icon: GraduationCap,
      badge: "SM-2 Spaced Repetition // 80% SQL Cut",
      span: "lg:col-span-6",
    },
    {
      project: projects.find((p) => p.id === "yt-tracker"),
      icon: TrendingUp,
      badge: "<15ms Client-Side NLP // Topic Moats",
      span: "lg:col-span-6",
    },
    {
      project: projects.find((p) => p.id === "mobile-voice-notes"),
      icon: Mic,
      badge: "28-Bar 60 FPS Visualizer // Android Exact Alarms",
      span: "lg:col-span-4",
    },
    {
      project: projects.find((p) => p.id === "location-diary"),
      icon: MapPin,
      badge: "Sub-10m Haversine Geofence // 1-Click Loop",
      span: "lg:col-span-4",
    },
    {
      project: projects.find((p) => p.id === "calorie-tracker"),
      icon: Flame,
      badge: "0ms Desktop Latency // Local Macro Engine",
      span: "lg:col-span-4",
    },
  ].filter((item) => item.project !== undefined) as {
    project: Project;
    icon: typeof Compass;
    badge: string;
    span: string;
  }[];

  // Current active chapter index based on scroll (0 to 3)
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveChapter(0);
      else if (latest < 0.50) setActiveChapter(1);
      else if (latest < 0.75) setActiveChapter(2);
      else setActiveChapter(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const chapters = [
    { project: gnss, icon: Compass, badge: "3D ECEF Signal Fusion // 20KM Drive Benchmark", glow: "rgba(41, 151, 255, 0.16)" },
    { project: audiosage, icon: Activity, badge: "Residual PEQ // Web Audio DSP Cascade", glow: "rgba(99, 102, 241, 0.16)" },
    { project: auditor, icon: Cpu, badge: "0.0% CPU Sensory Engine // Win32 Ctypes", glow: "rgba(16, 185, 129, 0.14)" },
    { project: cinema, icon: Layers, badge: "Dual-Pass AI Critique // OMDb Truth Verification", glow: "rgba(245, 158, 11, 0.14)" },
  ];

  // Smooth scroll to chapter on pill click
  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetY = containerTop + (index / 4) * (containerHeight - window.innerHeight) + 50;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // Dynamic transforms for Chapter 1
  const ch1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.24], [1, 1, 0]);
  const ch1Y = useTransform(scrollYProgress, [0, 0.18, 0.24], [0, 0, -35]);
  const ch1Scale = useTransform(scrollYProgress, [0, 0.20], [1, 0.96]);

  // Dynamic transforms for Chapter 2
  const ch2Opacity = useTransform(scrollYProgress, [0.24, 0.29, 0.44, 0.49], [0, 1, 1, 0]);
  const ch2Y = useTransform(scrollYProgress, [0.24, 0.29, 0.44, 0.49], [40, 0, 0, -35]);
  const ch2Scale = useTransform(scrollYProgress, [0.24, 0.29, 0.44], [0.96, 1, 0.96]);

  // Dynamic transforms for Chapter 3
  const ch3Opacity = useTransform(scrollYProgress, [0.49, 0.54, 0.69, 0.74], [0, 1, 1, 0]);
  const ch3Y = useTransform(scrollYProgress, [0.49, 0.54, 0.69, 0.74], [40, 0, 0, -35]);
  const ch3Scale = useTransform(scrollYProgress, [0.49, 0.54, 0.69], [0.96, 1, 0.96]);

  // Dynamic transforms for Chapter 4
  const ch4Opacity = useTransform(scrollYProgress, [0.74, 0.79, 1.0], [0, 1, 1]);
  const ch4Y = useTransform(scrollYProgress, [0.74, 0.79, 1.0], [40, 0, 0]);
  const ch4Scale = useTransform(scrollYProgress, [0.74, 0.82, 1.0], [0.96, 1, 1]);

  const activeGlow = chapters[activeChapter]?.glow || "rgba(41, 151, 255, 0.15)";

  return (
    <div id="bento" className="bg-black text-white">
      {/* =========================================================================
          PART 1: THE 4 FLAGSHIPS CINEMATIC SCROLLYTELLING THEATER (440vh PINNED)
         ========================================================================= */}
      <div ref={containerRef} className="relative h-[440vh] select-none">
        {/* Pinned Cinematic Theater Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-6 sm:px-12">
          {/* Dynamic Ambient Specular Glow Behind the Theater */}
          <div
            className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] rounded-full blur-[140px] transition-colors duration-1000"
            style={{ backgroundColor: activeGlow }}
          />

          {/* Top Header & Chapter Pill Switcher */}
          <div className="relative z-20 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-apple-subtle">
              <Sparkles className="w-3.5 h-3.5 text-apple-blue" />
              <span className="uppercase tracking-wider">FLAGSHIP SHOWCASE // CINEMATIC ARCHITECTURE</span>
            </div>

            {/* Apple Chapter Pills */}
            <div className="flex items-center space-x-2 p-1 rounded-full bg-[#161617]/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-x-auto max-w-full">
              {chapters.map((ch, idx) => {
                const Icon = ch.icon;
                const isActive = activeChapter === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToChapter(idx)}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                      isActive
                        ? "bg-white text-black font-semibold shadow-md"
                        : "text-apple-subtle hover:text-white hover:bg-white/5"
                    }`}
                    data-cursor-interactive="true"
                  >
                    <Icon className={`w-3 h-3 ${isActive ? "text-black" : "text-apple-blue"}`} />
                    <span className="truncate max-w-[110px] sm:max-w-none">0{idx + 1} {ch.project.title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central Scrollytelling Stage */}
          <div className="relative z-10 my-auto w-full max-w-6xl mx-auto">
            {/* ================= CHAPTER 1: GNSS ENGINE ================= */}
            <motion.div
              style={{ opacity: ch1Opacity, y: ch1Y, scale: ch1Scale }}
              className={`space-y-6 ${activeChapter === 0 ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="relative w-full h-[40vh] sm:h-[46vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <img
                  src={gnss.image}
                  alt={gnss.title}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:left-6 flex items-center space-x-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                  <Compass className="w-4 h-4 text-apple-blue" />
                  <span>3D ECEF Signal Fusion // 20KM Drive Benchmark</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-3 text-xs font-mono text-apple-subtle">
                    <span className="text-apple-blue uppercase font-bold">{gnss.category}</span>
                    <span>// {gnss.year}</span>
                    <span>// CHAPTER 01 OF 04</span>
                  </div>
                  <h3 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-apple-tightest leading-tight">
                    {gnss.title}
                  </h3>
                  <p className="text-apple-subtle text-sm sm:text-base leading-relaxed font-normal">
                    {gnss.executivePitch}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 flex-shrink-0">
                  <div className="flex gap-3">
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">HORIZ RMS</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-white">1.235m</div>
                    </div>
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">TUNNEL DRIFT</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-white">0.062 m/s</div>
                    </div>
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">ACCURACY</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-apple-blue">+88.4%</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(gnss)}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold shadow-lg"
                    data-cursor-interactive="true"
                  >
                    <span>Inspect Full Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ================= CHAPTER 2: AUDIOSAGE ================= */}
            <motion.div
              style={{ opacity: ch2Opacity, y: ch2Y, scale: ch2Scale }}
              className={`absolute inset-0 space-y-6 ${activeChapter === 1 ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="relative w-full h-[40vh] sm:h-[46vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <img
                  src={audiosage.image}
                  alt={audiosage.title}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:left-6 flex items-center space-x-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                  <Activity className="w-4 h-4 text-apple-blue" />
                  <span>Residual PEQ Synthesizer // Web Audio DSP Cascade</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-3 text-xs font-mono text-apple-subtle">
                    <span className="text-apple-blue uppercase font-bold">{audiosage.category}</span>
                    <span>// {audiosage.year}</span>
                    <span>// CHAPTER 02 OF 04</span>
                  </div>
                  <h3 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-apple-tightest leading-tight">
                    {audiosage.title}
                  </h3>
                  <p className="text-apple-subtle text-sm sm:text-base leading-relaxed font-normal">
                    {audiosage.executivePitch}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 flex-shrink-0">
                  <div className="flex gap-3">
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">TARGET ERROR</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-white">≤ 0.5 dB</div>
                    </div>
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">DSP LATENCY</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-white">23 ms</div>
                    </div>
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">DATASET</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-apple-blue">301 Pts</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(audiosage)}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold shadow-lg"
                    data-cursor-interactive="true"
                  >
                    <span>Inspect Full Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ================= CHAPTER 3: THE SILENT AUDITOR ================= */}
            <motion.div
              style={{ opacity: ch3Opacity, y: ch3Y, scale: ch3Scale }}
              className={`absolute inset-0 space-y-6 ${activeChapter === 2 ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="relative w-full h-[40vh] sm:h-[46vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <img
                  src={auditor.image}
                  alt={auditor.title}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:left-6 flex items-center space-x-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                  <Cpu className="w-4 h-4 text-apple-blue" />
                  <span>0.0% CPU Sensory Daemon // Win32 Ctypes & CoreAudio</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-3 text-xs font-mono text-apple-subtle">
                    <span className="text-apple-blue uppercase font-bold">{auditor.category}</span>
                    <span>// {auditor.year}</span>
                    <span>// CHAPTER 03 OF 04</span>
                  </div>
                  <h3 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-apple-tightest leading-tight">
                    {auditor.title}
                  </h3>
                  <p className="text-apple-subtle text-sm sm:text-base leading-relaxed font-normal">
                    {auditor.executivePitch}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 flex-shrink-0">
                  <div className="flex gap-3">
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">CPU DRAG</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-white">0.0%</div>
                    </div>
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">GHOST WORK</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-white">0 hrs</div>
                    </div>
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">UNIT TESTS</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-apple-blue">66 Tests</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(auditor)}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold shadow-lg"
                    data-cursor-interactive="true"
                  >
                    <span>Inspect Full Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ================= CHAPTER 4: CINEMAVAULT ================= */}
            <motion.div
              style={{ opacity: ch4Opacity, y: ch4Y, scale: ch4Scale }}
              className={`absolute inset-0 space-y-6 ${activeChapter === 3 ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div className="relative w-full h-[40vh] sm:h-[46vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <img
                  src={cinema.image}
                  alt={cinema.title}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:left-6 flex items-center space-x-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                  <Layers className="w-4 h-4 text-apple-blue" />
                  <span>Dual-Pass AI Critique // OMDb Truth Verification</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-3 text-xs font-mono text-apple-subtle">
                    <span className="text-apple-blue uppercase font-bold">{cinema.category}</span>
                    <span>// {cinema.year}</span>
                    <span>// CHAPTER 04 OF 04</span>
                  </div>
                  <h3 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-apple-tightest leading-tight">
                    {cinema.title}
                  </h3>
                  <p className="text-apple-subtle text-sm sm:text-base leading-relaxed font-normal">
                    {cinema.executivePitch}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 flex-shrink-0">
                  <div className="flex gap-3">
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">TOKEN CUT</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-white">~60%</div>
                    </div>
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">HALLUCINATION</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-white">0.0%</div>
                    </div>
                    <div className="p-3.5 px-4 rounded-2xl bg-[#161617] border border-white/10 text-center min-w-[100px]">
                      <div className="text-[10px] text-apple-subtle uppercase font-mono">FAILOVER</div>
                      <div className="font-sans text-xl sm:text-2xl font-bold text-apple-blue">3-Tier</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(cinema)}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold shadow-lg"
                    data-cursor-interactive="true"
                  >
                    <span>Inspect Full Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Timeline Indicator */}
          <div className="relative z-20 max-w-6xl mx-auto w-full flex items-center justify-between font-mono text-xs text-apple-subtle pt-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-apple-blue animate-pulse" />
              <span>SCROLL TO PROGRESS FLAGSHIPS</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-apple-blue rounded-full transition-all duration-300"
                  style={{ width: `${((activeChapter + 1) / 4) * 100}%` }}
                />
              </div>
              <span>0{activeChapter + 1} / 04</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: THE EXTENDED PRO SUITE (THE OTHER 5 ARCHITECTURES DIRECTLY BELOW)
         ========================================================================= */}
      <div className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center sm:text-left">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-subtle font-mono">
            Specialized Architectures // Local-First & Cloud
          </span>
          <h3 className="font-sans text-3xl sm:text-5xl font-bold tracking-apple-tightest text-white leading-tight">
            Engineered for the edge. Built for scale.
          </h3>
          <p className="text-apple-subtle max-w-2xl text-sm sm:text-base font-normal">
            Autonomous mobile geofencing, zero-quota creator intelligence, client-side NLP forensics,
            and offline-first SQLite desktop applications.
          </p>
        </div>

        {/* Perfectly Balanced 12-Column Studio Grid (Row 1: 6+6=12, Row 2: 4+4+4=12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {extendedProjects.map((item) => {
            const project = item.project;
            const Icon = item.icon;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`${item.span} group apple-card rounded-[2.5rem] p-7 sm:p-9 flex flex-col justify-between overflow-hidden cursor-pointer relative transform-gpu hover:border-white/20 transition-all duration-300`}
                data-cursor-interactive="true"
                data-cursor-label="INSPECT"
              >
                {/* Visual Media Graphic with Uniform Aspect Ratio */}
                {project.image && (
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/5 bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />
                    <div className="absolute bottom-3.5 left-3.5 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 text-xs font-mono text-white pointer-events-none">
                      <Icon className="w-3.5 h-3.5 text-apple-blue flex-shrink-0" />
                      <span className="truncate max-w-[260px] sm:max-w-none">{item.badge}</span>
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-apple-subtle">
                      <span className="text-apple-blue uppercase tracking-wider font-mono">
                        {project.category}
                      </span>
                      <span className="font-mono">{project.year}</span>
                    </div>

                    <h4 className="font-sans text-2xl sm:text-3xl font-bold text-white group-hover:text-apple-blue transition-colors duration-200 leading-tight">
                      {project.title}
                    </h4>

                    <p className="text-apple-subtle text-xs sm:text-sm leading-relaxed line-clamp-2 pt-1 font-normal">
                      {project.executivePitch}
                    </p>
                  </div>

                  {/* Quantitative Metrics Badges */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.metrics.slice(0, 3).map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="text-[9px] text-apple-subtle uppercase font-mono">
                            {metric.label}
                          </div>
                          <div className="font-sans text-base sm:text-lg font-bold text-white tabular-nums">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {project.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-sans font-medium px-2.5 py-1 bg-white/[0.05] border border-white/[0.08] text-neutral-300 rounded-lg group-hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-xs font-mono px-2 py-1 text-apple-subtle font-medium">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Icon Pill Button */}
                <div className="absolute top-7 right-7 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-apple-blue transition-colors duration-200 shadow-lg pointer-events-none">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
