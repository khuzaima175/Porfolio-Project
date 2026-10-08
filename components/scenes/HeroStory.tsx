"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react";
import { OrbitalBackdrop } from "@/components/ui/OrbitalBackdrop";
import { GNSSSimulator } from "@/components/specimens/GNSSSimulator";
import { Odometer } from "@/components/ui/Odometer";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { SPRING_FLOAT } from "@/lib/motion/tokens";
import { scrollToTarget } from "@/lib/utils/scroll";

export function HeroStory() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track if scrolled past 50% to pause canvas loops
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      setIsPastHero(latest > 0.55);
      setActiveStage(latest < 0.3 ? 0 : latest < 0.73 ? 1 : 2);
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Pointer Parallax (Inverse tracking ±8px)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, SPRING_FLOAT);
  const springMouseY = useSpring(mouseY, SPRING_FLOAT);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const { innerWidth, innerHeight } = window;
    const normalizedX = (e.clientX / innerWidth - 0.5) * 16;
    const normalizedY = (e.clientY / innerHeight - 0.5) * 16;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  // Dynamic ambient background glow opacity
  const blueGlowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.35, 0.15, 0.05]);
  const amberGlowOpacity = useTransform(scrollYProgress, [0.3, 0.65, 0.9], [0.05, 0.28, 0.08]);

  // Continuous overlapping stage crossfades (zero black gaps)
  // Stage 1 Transforms (0.00 -> 0.38)
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.38], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.22, 0.38], [0, 0, -35]);
  const stage1Scale = useTransform(scrollYProgress, [0, 0.22, 0.38], [1, 1, 0.96]);
  const stage1PointerEvents = useTransform(stage1Opacity, (o) => (o > 0.15 ? "auto" : "none"));

  // Central Plate Parallax & Scale
  const plateScale = useTransform(scrollYProgress, [0, 0.35, 0.7], [1.12, 1.0, 0.92]);
  const plateOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [0.85, 0.55, 0.15]);

  // Stage 2 Transforms (0.22 -> 0.80)
  const stage2Opacity = useTransform(scrollYProgress, [0.22, 0.38, 0.65, 0.80], [0, 1, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.22, 0.38, 0.65, 0.80], [35, 0, 0, -35]);
  const stage2Scale = useTransform(scrollYProgress, [0.22, 0.38, 0.65, 0.80], [0.96, 1, 1, 0.96]);
  const stage2PointerEvents = useTransform(stage2Opacity, (o) => (o > 0.15 ? "auto" : "none"));

  // Stage 3 Transforms (0.65 -> 1.00)
  const stage3Opacity = useTransform(scrollYProgress, [0.65, 0.80, 1.0], [0, 1, 1]);
  const stage3Y = useTransform(scrollYProgress, [0.65, 0.80, 1.0], [35, 0, 0]);
  const stage3PointerEvents = useTransform(stage3Opacity, (o) => (o > 0.15 ? "auto" : "none"));

  // Scroll Hairline fill
  const hairlineScaleY = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Top Telemetry Header Transform (0.00 -> 0.12)
  const topHeaderOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const topHeaderY = useTransform(scrollYProgress, [0, 0.12], [0, -15]);

  return (
    <div
      id="storyboard"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="hero-story relative h-[250vh] bg-black text-white"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-24 pb-5 px-4 sm:pt-28 sm:pb-10 sm:px-12">
        <OrbitalBackdrop />
        {/* Dynamic Multi-Layer Ambient Specular Lights */}
        <motion.div
          style={{ opacity: blueGlowOpacity }}
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[46.875rem] h-[21.875rem] sm:h-[32.5rem] blue-glow blur-[40px] sm:blur-[120px]"
        />
        <motion.div
          style={{ opacity: amberGlowOpacity }}
          className="pointer-events-none absolute bottom-1/4 right-1/4 w-[80vw] sm:w-[40.625rem] h-[18.75rem] sm:h-[32.5rem] amber-glow blur-[50px] sm:blur-[140px]"
        />

        {/* Live Ambient Hardware Plate Layer (First-Paint Silicon Proof) */}
        <motion.div
          style={{
            scale: plateScale,
            opacity: plateOpacity,
            x: springMouseX,
            y: springMouseY,
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
        >
          <div className="w-[94vw] max-w-[107.5rem] h-[64vh] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/60 backdrop-blur-md">
            {/* Live Ambient Canvas */}
            <GNSSSimulator ambientMode={true} paused={isPastHero} />

            {/* Depth Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.8) 100%)' }} />

            {/* Subtle Plate Telemetry Watermark */}
            <div className="hidden sm:flex absolute bottom-4 left-5 items-center space-x-2 font-mono text-[10px] text-brand-subtle/80 bg-black/60 px-3 py-1.5 rounded-full border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              <span>LIVE AMBIENT SILICON PROOF // 30 FPS RTK FUSION</span>
            </div>
          </div>
        </motion.div>

        {/* Top Telemetry Header with Smooth Scroll Fade */}
        <motion.div
          style={{ opacity: topHeaderOpacity, y: topHeaderY }}
          className="z-10 flex items-center justify-between font-mono text-xs text-brand-subtle uppercase tracking-wider max-w-[95vw] 2xl:max-w-[110rem] mx-auto w-full"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <ScrambleText text="Khuzaima Ahmed // Systems & AI Engineering" duration={500} />
          </div>
          <div className="hidden sm:block text-neutral-400">
            <ScrambleText text="Scroll to explore architecture" delay={200} duration={400} />
          </div>
        </motion.div>

        {/* Center Stage Storyboard */}
        <div className="z-10 my-auto w-full max-w-[95vw] 2xl:max-w-[110rem] mx-auto text-center relative">
          {/* Radial Scrim Behind Headline to Eliminate Contour Bleed */}
          <div className="pointer-events-none absolute inset-0 -inset-x-12 -inset-y-8 blur-2xl -z-10" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)' }} />

          {/* Phase 1: Massive Statement */}
          <motion.div
            aria-hidden={activeStage !== 0}
            style={{
              opacity: stage1Opacity,
              y: stage1Y,
              scale: stage1Scale,
              pointerEvents: stage1PointerEvents,
            }}
            className="space-y-5"
          >
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand-blue font-mono"
              >
                Independent thinking. Precise engineering.
              </motion.span>
            </div>

            {/* Line-Masked Headline */}
            <h1 className="space-y-1" aria-label="Deterministic by construction.">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-headline font-bold tracking-tightest-editorial text-white"
                >
                  Deterministic
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-headline hero-gradient font-bold tracking-tightest-editorial"
                >
                  by construction.
                </motion.div>
              </div>
            </h1>

            <div className="overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto text-neutral-300 text-sm sm:text-lg font-normal leading-relaxed pt-3"
              >
                I build systems where every millisecond matters. Precision positioning,
                real-time audio, and AI that works beyond the demo.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-3"
            >
              <button tabIndex={activeStage === 0 ? 0 : -1} onClick={() => scrollToTarget("bento")} className="hero-primary group">
                Explore selected work <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button tabIndex={activeStage === 0 ? 0 : -1} onClick={() => scrollToTarget("contact")} className="hero-secondary">
                Let’s build something <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
            <div className="hero-disciplines" aria-label="Engineering specialties">
              <span>Systems engineering</span><i /><span>Sensor fusion</span><i /><span>Applied AI</span>
            </div>
          </motion.div>

          {/* Phase 2: 3-Column Comparative Metrics with Odometers */}
          <motion.div
            aria-hidden={activeStage !== 1}
            style={{
              opacity: stage2Opacity,
              y: stage2Y,
              scale: stage2Scale,
              pointerEvents: stage2PointerEvents,
            }}
            className="absolute inset-0 flex flex-col justify-center items-center space-y-6"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand-blue font-mono">
              Engineered From First Principles
            </span>

            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tightest-editorial text-white leading-tight">
              Uncompromising physics. <br />
              Zero measurable overhead.
            </h2>

            {/* 3-Column Stat Callouts with Rolling Odometers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7 pt-3 w-full max-w-4xl">
              <div className="text-center p-5 sm:p-6 bg-brand-gray/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-xs text-brand-subtle font-medium mb-1 uppercase font-mono">Up to</div>
                <div className="font-sans text-3xl sm:text-5xl font-bold text-white tracking-tight flex items-center justify-center">
                  <Odometer value="88.4%" />
                </div>
                <div className="text-xs text-brand-subtle mt-2 leading-snug">
                  lower horizontal error <br /> (1.235m RTS smoothed RMS)
                </div>
              </div>

              <div className="text-center p-5 sm:p-6 bg-brand-gray/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-xs text-brand-subtle font-medium mb-1 uppercase font-mono">Exactly</div>
                <div className="font-sans text-3xl sm:text-5xl font-bold text-white tracking-tight flex items-center justify-center">
                  <Odometer value="0.0%" />
                </div>
                <div className="text-xs text-brand-subtle mt-2 leading-snug">
                  CPU sensory overhead <br /> (Win32 foreground ctypes)
                </div>
              </div>

              <div className="text-center p-5 sm:p-6 bg-brand-gray/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-xs text-brand-subtle font-medium mb-1 uppercase font-mono">Within</div>
                <div className="font-sans text-3xl sm:text-5xl font-bold text-white tracking-tight flex items-center justify-center">
                  <Odometer value="≤ 0.5 dB" />
                </div>
                <div className="text-xs text-brand-subtle mt-2 leading-snug">
                  automated PEQ residual error <br /> (Harman 301-pt curve match)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phase 3: Transition Prompt */}
          <motion.div
            aria-hidden={activeStage !== 2}
            style={{
              opacity: stage3Opacity,
              y: stage3Y,
              pointerEvents: stage3PointerEvents,
            }}
            className="absolute inset-0 flex flex-col justify-center items-center space-y-4"
          >
            <span className="text-xs text-brand-subtle uppercase tracking-widest font-mono">
              Next // Flagship Systems
            </span>
            <h3 className="font-sans text-3xl sm:text-5xl font-bold text-white">
              Explore the engineering.
            </h3>
            <button
              tabIndex={activeStage === 2 ? 0 : -1}
              onClick={() => scrollToTarget("bento")}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-semibold mt-2 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              data-cursor-interactive="true"
            >
              <span>View Flagship Architectures</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Hairline Progress Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="z-10 flex flex-col items-center justify-center space-y-2 text-brand-subtle text-xs font-mono"
        >
          <div className="w-[1.5px] h-10 bg-white/15 rounded-full overflow-hidden relative">
            <motion.div
              style={{ scaleY: hairlineScaleY }}
              className="w-full h-full bg-brand-blue origin-top"
            />
          </div>
          <span className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-neutral-400">Scroll to discover <ArrowDown className="w-3 h-3" /></span>
        </motion.div>
      </div>
    </div>
  );
}
