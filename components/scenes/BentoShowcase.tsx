"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
import { Odometer } from "@/components/ui/Odometer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_ENTER, SPRING_LAYOUT, SPRING_FLOAT } from "@/lib/motion/tokens";
import { scrollToTarget } from "@/lib/utils/scroll";

interface BentoShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function BentoShowcase({
  projects,
  onSelectProject,
}: BentoShowcaseProps) {
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
      if (latest < 0.21) setActiveChapter(0);
      else if (latest < 0.49) setActiveChapter(1);
      else if (latest < 0.75) setActiveChapter(2);
      else setActiveChapter(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const chapters = [
    {
      project: gnss,
      shortLabel: "01 GNSS",
      icon: Compass,
      badge: "3D ECEF Signal Fusion // 20KM Drive Benchmark",
      glow: "rgba(41, 151, 255, 0.16)",
      stats: [
        { label: "HORIZ RMS", value: "1.235m" },
        { label: "TUNNEL DRIFT", value: "0.062 m/s" },
        { label: "ACCURACY", value: "+88.4%" },
      ],
    },
    {
      project: audiosage,
      shortLabel: "02 AudioSage",
      icon: Activity,
      badge: "Residual PEQ // Web Audio DSP Cascade",
      glow: "rgba(99, 102, 241, 0.16)",
      stats: [
        { label: "TARGET ERROR", value: "≤ 0.5 dB" },
        { label: "DSP LATENCY", value: "23 ms" },
        { label: "DATASET", value: "301 Pts" },
      ],
    },
    {
      project: auditor,
      shortLabel: "03 Auditor",
      icon: Cpu,
      badge: "0.0% CPU Sensory Engine // Win32 Ctypes",
      glow: "rgba(16, 185, 129, 0.14)",
      stats: [
        { label: "CPU DRAG", value: "0.0%" },
        { label: "GHOST WORK", value: "0 hrs" },
        { label: "UNIT TESTS", value: "66 Tests" },
      ],
    },
    {
      project: cinema,
      shortLabel: "04 CinemaVault",
      icon: Layers,
      badge: "Dual-Pass AI Critique // OMDb Truth Verification",
      glow: "rgba(245, 158, 11, 0.14)",
      stats: [
        { label: "TOKEN CUT", value: "~60%" },
        { label: "HALLUCINATION", value: "0.0%" },
        { label: "FAILOVER", value: "3-Tier" },
      ],
    },
  ];

  // Smooth scroll to chapter on pill or segment rail click
  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollableDistance = containerHeight - window.innerHeight;
    
    // Exact midpoint fractions corresponding to each chapter's solid focal zone
    const targetFractions = [0.05, 0.35, 0.62, 0.90];
    const targetY = containerTop + targetFractions[index] * scrollableDistance;
    scrollToTarget(targetY);
  };

  // Subtle 3D Pointer Tilt for Stage (±2.5deg)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, SPRING_FLOAT);
  const springTiltY = useSpring(tiltY, SPRING_FLOAT);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-y * 5);
    tiltY.set(x * 5);
  };

  const handleStageMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Continuous overlapping crossfades (opacity_A + opacity_B = 1.0, zero black gaps)
  // Dynamic transforms for Chapter 1 (0.00 -> 0.26)
  const ch1Opacity = useTransform(scrollYProgress, [0, 0.16, 0.26], [1, 1, 0]);
  const ch1Y = useTransform(scrollYProgress, [0, 0.16, 0.26], [0, 0, -35]);
  const ch1Scale = useTransform(scrollYProgress, [0, 0.16, 0.26], [1, 1, 0.96]);

  // Dynamic transforms for Chapter 2 (0.16 -> 0.54)
  const ch2Opacity = useTransform(scrollYProgress, [0.16, 0.26, 0.44, 0.54], [0, 1, 1, 0]);
  const ch2Y = useTransform(scrollYProgress, [0.16, 0.26, 0.44, 0.54], [35, 0, 0, -35]);
  const ch2Scale = useTransform(scrollYProgress, [0.16, 0.26, 0.44, 0.54], [0.96, 1, 1, 0.96]);

  // Dynamic transforms for Chapter 3 (0.44 -> 0.80)
  const ch3Opacity = useTransform(scrollYProgress, [0.44, 0.54, 0.70, 0.80], [0, 1, 1, 0]);
  const ch3Y = useTransform(scrollYProgress, [0.44, 0.54, 0.70, 0.80], [35, 0, 0, -35]);
  const ch3Scale = useTransform(scrollYProgress, [0.44, 0.54, 0.70, 0.80], [0.96, 1, 1, 0.96]);

  // Dynamic transforms for Chapter 4 (0.70 -> 1.00)
  const ch4Opacity = useTransform(scrollYProgress, [0.70, 0.80, 1.0], [0, 1, 1]);
  const ch4Y = useTransform(scrollYProgress, [0.70, 0.80, 1.0], [35, 0, 0]);
  const ch4Scale = useTransform(scrollYProgress, [0.70, 0.80, 1.0], [0.96, 1, 1]);

  const activeGlow = chapters[activeChapter]?.glow || "rgba(41, 151, 255, 0.15)";

  const chapterTransforms = [
    { opacity: ch1Opacity, y: ch1Y, scale: ch1Scale },
    { opacity: ch2Opacity, y: ch2Y, scale: ch2Scale },
    { opacity: ch3Opacity, y: ch3Y, scale: ch3Scale },
    { opacity: ch4Opacity, y: ch4Y, scale: ch4Scale },
  ];

  return (
    <div id="bento" className="bg-black text-white">
      {/* =========================================================================
          PART 1: THE 4 FLAGSHIPS CINEMATIC SCROLLYTELLING THEATER (440vh PINNED)
         ========================================================================= */}
      <div ref={containerRef} className="relative h-[440vh] select-none">
        {/* Pinned Cinematic Theater Viewport */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-8 px-4 sm:px-12">
          {/* Dynamic Ambient Specular Glow Behind the Theater */}
          <div
            className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[1600px] h-[350px] sm:h-[900px] rounded-full blur-[60px] sm:blur-[190px] transition-colors duration-1000"
            style={{ backgroundColor: activeGlow }}
          />

          {/* Top Header & Chapter Pill Switcher with Sliding Layout Pill */}
          <div className="relative z-20 max-w-[95vw] 2xl:max-w-[1760px] mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-mono text-brand-subtle">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span className="uppercase tracking-wider">FLAGSHIP SHOWCASE // CINEMATIC ARCHITECTURE</span>
            </div>

            {/* Chapter Pills with layoutId sliding background */}
            <div className="flex items-center space-x-2 p-1.5 rounded-full bg-[#161617]/85 backdrop-blur-xl border border-white/10 shadow-xl overflow-x-auto max-w-full">
              {chapters.map((ch, idx) => {
                const Icon = ch.icon;
                const isActive = activeChapter === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToChapter(idx)}
                    className={`relative flex items-center space-x-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono transition-colors z-10 ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-brand-subtle hover:text-white"
                    }`}
                    data-cursor-interactive="true"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="chapter-pill"
                        transition={SPRING_LAYOUT}
                        className="absolute inset-0 bg-white rounded-full -z-10 shadow-md"
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-brand-blue"}`} />
                    <span className="truncate">{ch.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central Scrollytelling Stage with 3D Tilt */}
          <motion.div
            style={{ rotateX: springTiltX, rotateY: springTiltY, transformPerspective: 1000 }}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            className="relative z-10 my-auto w-full max-w-[95vw] 2xl:max-w-[1760px] mx-auto grid grid-cols-1 grid-rows-1 items-center"
          >
            {chapters.map((ch, idx) => {
              const project = ch.project;
              const Icon = ch.icon;
              const trans = chapterTransforms[idx];
              const isCurrent = activeChapter === idx;

              return (
                <motion.div
                  key={project.id}
                  style={{
                    opacity: trans.opacity,
                    y: trans.y,
                    scale: trans.scale,
                  }}
                  className={`col-start-1 row-start-1 w-full space-y-4 sm:space-y-6 ${
                    isCurrent ? "pointer-events-auto z-10" : "pointer-events-none z-0"
                  }`}
                >
                  {/* Media Plate with Shared Layout Morph Hook (Expansive Cinematic Widescreen) */}
                  <div className="relative w-full h-[40vh] sm:h-[48vh] lg:h-[52vh] max-h-[560px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                    <motion.img
                      layoutId={`media-${project.id}`}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 flex items-center space-x-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-mono text-white shadow-xl">
                      <Icon className="w-4 h-4 text-brand-blue" />
                      <span>{ch.badge}</span>
                    </div>
                  </div>

                  {/* Title & Metadata with Line Masks */}
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1 w-full">
                    <div className="space-y-2 max-w-4xl">
                      <div className="flex items-center space-x-3 text-xs sm:text-sm font-mono text-brand-subtle">
                        <span className="text-brand-blue uppercase font-bold">{project.category}</span>
                        <span>// {project.year}</span>
                        <span>// CHAPTER 0{idx + 1} OF 04</span>
                      </div>

                      <div className="overflow-hidden">
                        <h3 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tightest-editorial leading-tight">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-brand-subtle text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl">
                        {project.executivePitch}
                      </p>
                    </div>

                    {/* Metric Cards with Slotted Odometers */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 sm:gap-4 flex-shrink-0">
                      <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
                        {ch.stats.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2 sm:p-4 px-3 sm:px-6 rounded-2xl bg-[#161617] border border-white/10 text-center flex-1 sm:flex-none min-w-[75px] sm:min-w-[130px] shadow-xl"
                          >
                            <div className="text-[9px] sm:text-[11px] text-brand-subtle uppercase font-mono tracking-wider">
                              {st.label}
                            </div>
                            <div className="font-sans text-base sm:text-2xl lg:text-3xl font-bold text-white flex items-center justify-center mt-0.5">
                              <Odometer value={st.value} duration={0.6} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <MagneticButton>
                        <button
                          onClick={() => onSelectProject(project)}
                          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs sm:text-sm font-semibold shadow-2xl active:scale-95 cursor-pointer min-h-[44px]"
                          data-cursor-interactive="true"
                          data-cursor-label="INSPECT"
                        >
                          <span>Inspect Full Architecture</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </MagneticButton>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Segmented Intra-Chapter Progress Rail */}
          <div className="relative z-20 max-w-[95vw] 2xl:max-w-[1760px] mx-auto w-full flex items-center justify-between font-mono text-xs sm:text-sm text-brand-subtle pt-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="uppercase tracking-wider">SCROLL TO PROGRESS FLAGSHIPS</span>
            </div>

            {/* 4 Interactive Segment Rails */}
            <div className="flex items-center space-x-2">
              {[0, 1, 2, 3].map((segIdx) => (
                <button
                  key={segIdx}
                  onClick={() => scrollToChapter(segIdx)}
                  className="group py-2 px-1 flex items-center"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeChapter === segIdx
                        ? "w-10 bg-brand-blue shadow-sm shadow-brand-blue/50"
                        : "w-4 bg-white/20 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-white">0{activeChapter + 1} / 04</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: THE EXTENDED PRO SUITE (THE OTHER 5 ARCHITECTURES DIRECTLY BELOW)
         ========================================================================= */}
      <div className="py-28 px-4 sm:px-8 lg:px-12 max-w-[95vw] 2xl:max-w-[1760px] mx-auto border-t border-white/10">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center sm:text-left">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand-subtle font-mono">
            Specialized Architectures // Local-First & Cloud
          </span>
          <h3 className="font-sans text-3xl sm:text-5xl font-bold tracking-tightest-editorial text-white leading-tight">
            Engineered for the edge. Built for scale.
          </h3>
          <p className="text-brand-subtle max-w-2xl text-sm sm:text-base font-normal">
            Autonomous mobile geofencing, zero-quota creator intelligence, client-side NLP forensics,
            and offline-first SQLite desktop applications.
          </p>
        </div>

        {/* Balanced 12-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {extendedProjects.map((item) => {
            const project = item.project;
            const Icon = item.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE_ENTER }}
                onClick={() => onSelectProject(project)}
                className={`${item.span} group pro-card rounded-[2.5rem] p-7 sm:p-9 flex flex-col justify-between overflow-hidden cursor-pointer relative transform-gpu hover:border-white/20 transition-all duration-300`}
                data-cursor-interactive="true"
                data-cursor-label="INSPECT"
              >
                {/* Visual Media Graphic with layoutId morph hook */}
                {project.image && (
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/5 bg-black">
                    <motion.img
                      layoutId={`media-${project.id}`}
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />
                    <div className="absolute bottom-3.5 left-3.5 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 text-xs font-mono text-white pointer-events-none">
                      <Icon className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                      <span className="truncate max-w-[260px] sm:max-w-none">{item.badge}</span>
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-brand-subtle">
                      <span className="text-brand-blue uppercase tracking-wider font-mono">
                        {project.category}
                      </span>
                      <span className="font-mono">{project.year}</span>
                    </div>

                    <h4 className="font-sans text-2xl sm:text-3xl font-bold text-white group-hover:text-brand-blue transition-colors duration-200 leading-tight">
                      {project.title}
                    </h4>

                    <p className="text-brand-subtle text-xs sm:text-sm leading-relaxed line-clamp-2 pt-1 font-normal">
                      {project.executivePitch}
                    </p>
                  </div>

                  {/* Quantitative Metrics Badges with Odometers */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.metrics.slice(0, 3).map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="text-[9px] text-brand-subtle uppercase font-mono">
                            {metric.label}
                          </div>
                          <div className="font-sans text-base sm:text-lg font-bold text-white tabular-nums">
                            <Odometer value={metric.value} />
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
                        <span className="text-xs font-mono px-2 py-1 text-brand-subtle font-medium">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Magnetic Action Icon Button */}
                <div className="absolute top-7 right-7">
                  <MagneticButton>
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-brand-blue transition-colors duration-200 shadow-lg pointer-events-none">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
