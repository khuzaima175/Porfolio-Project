"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { GNSSSimulator } from "@/components/specimens/GNSSSimulator";
import { Odometer } from "@/components/ui/Odometer";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { SPRING_FLOAT } from "@/lib/motion/tokens";
import { scrollToTarget } from "@/lib/utils/scroll";

export function AppleHeroStory() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPastHero, setIsPastHero] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track if scrolled past 50% to pause canvas loops
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      setIsPastHero(latest > 0.55);
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Pointer Parallax (Inverse tracking ±8px)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, SPRING_FLOAT);
  const springMouseY = useSpring(mouseY, SPRING_FLOAT);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
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

  // Central Plate Parallax & Scale
  const plateScale = useTransform(scrollYProgress, [0, 0.35, 0.7], [1.12, 1.0, 0.92]);
  const plateOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [0.85, 0.55, 0.15]);

  // Stage 2 Transforms (0.22 -> 0.80)
  const stage2Opacity = useTransform(scrollYProgress, [0.22, 0.38, 0.65, 0.80], [0, 1, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.22, 0.38, 0.65, 0.80], [35, 0, 0, -35]);
  const stage2Scale = useTransform(scrollYProgress, [0.22, 0.38, 0.65, 0.80], [0.96, 1, 1, 0.96]);

  // Stage 3 Transforms (0.65 -> 1.00)
  const stage3Opacity = useTransform(scrollYProgress, [0.65, 0.80, 1.0], [0, 1, 1]);
  const stage3Y = useTransform(scrollYProgress, [0.65, 0.80, 1.0], [35, 0, 0]);

  // Scroll Hairline fill
  const hairlineScaleY = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div
      id="storyboard"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[280vh] bg-black text-white"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-12 select-none">
        {/* Dynamic Multi-Layer Ambient Specular Lights */}
        <motion.div
          style={{ opacity: blueGlowOpacity }}
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[520px] blue-glow blur-[120px]"
        />
        <motion.div
          style={{ opacity: amberGlowOpacity }}
          className="pointer-events-none absolute bottom-1/4 right-1/4 w-[650px] h-[520px] amber-glow blur-[140px]"
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
          <div className="w-[94vw] max-w-[1720px] h-[64vh] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/60 backdrop-blur-md">
            {/* Live Ambient Canvas */}
            <GNSSSimulator ambientMode={true} paused={isPastHero} />

            {/* Depth Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.8) 100%)' }} />

            {/* Subtle Plate Telemetry Watermark */}
            <div className="absolute bottom-4 left-5 flex items-center space-x-2 font-mono text-[10px] text-apple-subtle/80 bg-black/60 px-3 py-1.5 rounded-full border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-pulse" />
              <span>LIVE AMBIENT SILICON PROOF // 30 FPS RTK FUSION</span>
            </div>
          </div>
        </motion.div>

        {/* Top Telemetry Header */}
        <div className="z-10 flex items-center justify-between font-mono text-xs text-apple-subtle uppercase tracking-wider max-w-[95vw] 2xl:max-w-[1760px] mx-auto w-full">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-apple-blue animate-pulse" />
            <ScrambleText text="Khuzaima Ahmed // Systems & AI Engineering" duration={500} />
          </div>
          <div className="hidden sm:block text-neutral-400">
            <ScrambleText text="Scroll to explore architecture" delay={200} duration={400} />
          </div>
        </div>

        {/* Center Stage Storyboard */}
        <div className="z-10 my-auto w-full max-w-[95vw] 2xl:max-w-[1760px] mx-auto text-center relative">
          {/* Radial Scrim Behind Headline to Eliminate Contour Bleed */}
          <div className="pointer-events-none absolute inset-0 -inset-x-12 -inset-y-8 blur-2xl -z-10" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)' }} />

          {/* Phase 1: Massive Apple Statement */}
          <motion.div
            style={{
              opacity: stage1Opacity,
              y: stage1Y,
              scale: stage1Scale,
            }}
            className="space-y-6"
          >
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-blue font-mono"
              >
                The Sovereign Architecture
              </motion.span>
            </div>

            {/* Line-Masked Headline */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-apple-tightest leading-[0.92] text-white"
                >
                  Deterministic
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-apple-tightest leading-[0.92] text-apple-subtle"
                >
                  by construction.
                </motion.h1>
              </div>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto text-apple-subtle text-base sm:text-xl font-normal leading-relaxed pt-2"
              >
                Zero overhead by proof. Native Win32 background daemons, 3D multi-stream GNSS
                trajectory fusion, and real-time DSP audio synthesis.
              </motion.p>
            </div>
          </motion.div>

          {/* Phase 2: 3-Column Comparative Metrics with Odometers */}
          <motion.div
            style={{ opacity: stage2Opacity, y: stage2Y, scale: stage2Scale }}
            className="absolute inset-0 flex flex-col justify-center items-center space-y-8 pointer-events-auto"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-blue font-mono">
              Engineered From First Principles
            </span>

            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-apple-tightest text-white leading-tight">
              Uncompromising physics. <br />
              Zero measurable overhead.
            </h2>

            {/* Apple 3-Column Stat Callouts with Rolling Odometers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-4 w-full max-w-4xl">
              <div className="text-center p-6 bg-apple-gray/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-xs text-apple-subtle font-medium mb-1 uppercase font-mono">Up to</div>
                <div className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight flex items-center justify-center">
                  <Odometer value="88.4%" />
                </div>
                <div className="text-xs text-apple-subtle mt-2 leading-snug">
                  lower horizontal error <br /> (1.235m RTS smoothed RMS)
                </div>
              </div>

              <div className="text-center p-6 bg-apple-gray/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-xs text-apple-subtle font-medium mb-1 uppercase font-mono">Exactly</div>
                <div className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight flex items-center justify-center">
                  <Odometer value="0.0%" />
                </div>
                <div className="text-xs text-apple-subtle mt-2 leading-snug">
                  CPU sensory overhead <br /> (Win32 foreground ctypes)
                </div>
              </div>

              <div className="text-center p-6 bg-apple-gray/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-xs text-apple-subtle font-medium mb-1 uppercase font-mono">Within</div>
                <div className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight flex items-center justify-center">
                  <Odometer value="≤ 0.5 dB" />
                </div>
                <div className="text-xs text-apple-subtle mt-2 leading-snug">
                  automated PEQ residual error <br /> (Harman 301-pt curve match)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phase 3: Transition Prompt */}
          <motion.div
            style={{ opacity: stage3Opacity, y: stage3Y }}
            className="absolute inset-0 flex flex-col justify-center items-center space-y-4 pointer-events-auto"
          >
            <span className="text-xs text-apple-subtle uppercase tracking-widest font-mono">
              Next // Flagship Systems
            </span>
            <h3 className="font-sans text-3xl sm:text-5xl font-bold text-white">
              Explore the engineering.
            </h3>
            <button
              onClick={() => scrollToTarget("bento")}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-semibold mt-2 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              data-cursor-interactive="true"
            >
              <span>View Flagship Architectures</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Hairline Progress Indicator (Replaces Generic Chevron) */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="z-10 flex flex-col items-center justify-center space-y-2 text-apple-subtle text-xs font-mono"
        >
          <div className="w-[1.5px] h-10 bg-white/15 rounded-full overflow-hidden relative">
            <motion.div
              style={{ scaleY: hairlineScaleY }}
              className="w-full h-full bg-apple-blue origin-top"
            />
          </div>
          <span className="text-[10px] tracking-widest uppercase text-neutral-400">SCROLL</span>
        </motion.div>
      </div>
    </div>
  );
}
