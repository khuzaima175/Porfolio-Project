"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Cpu, Compass, Activity, ChevronRight } from "lucide-react";

export function AppleHeroStory() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamic ambient background glow opacity & position
  const blueGlowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.35, 0.15, 0.05]);
  const amberGlowOpacity = useTransform(scrollYProgress, [0.3, 0.65, 0.9], [0.05, 0.3, 0.1]);

  // Stage 1 Transforms (0.00 -> 0.40)
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.38], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.25, 0.38], [0, 0, -40]);
  const stage1Scale = useTransform(scrollYProgress, [0, 0.25, 0.38], [1, 1, 0.95]);

  // Central Image Scale & Opacity (Parallax hardware depth)
  const imageScale = useTransform(scrollYProgress, [0, 0.35, 0.7], [1.2, 1.0, 0.9]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [0.75, 0.5, 0.15]);

  // Stage 2 Transforms (0.38 -> 0.78)
  const stage2Opacity = useTransform(scrollYProgress, [0.38, 0.48, 0.72, 0.82], [0, 1, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.38, 0.48, 0.72, 0.82], [40, 0, 0, -40]);

  // Stage 3 Transforms (0.80 -> 1.00)
  const stage3Opacity = useTransform(scrollYProgress, [0.8, 0.92, 1.0], [0, 1, 1]);
  const stage3Y = useTransform(scrollYProgress, [0.8, 0.92, 1.0], [30, 0, 0]);

  return (
    <div id="storyboard" ref={containerRef} className="relative h-[280vh] bg-black text-white">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-12 select-none">
        {/* Dynamic Multi-Layer Ambient Specular Lights */}
        <motion.div
          style={{ opacity: blueGlowOpacity }}
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] blue-glow blur-[100px]"
        />
        <motion.div
          style={{ opacity: amberGlowOpacity }}
          className="pointer-events-none absolute bottom-1/4 right-1/4 w-[600px] h-[500px] amber-glow blur-[120px]"
        />

        {/* Floating Hardware Image Depth Layer */}
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
        >
          <div className="w-[85vw] max-w-5xl h-[60vh] relative rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <img
              src="/images/gnss-telemetry.webp"
              alt="Hardware Telemetry"
              className="w-full h-full object-cover grayscale contrast-150"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>
        </motion.div>

        {/* Top Telemetry Tag */}
        <div className="z-10 flex items-center justify-between font-mono text-xs text-apple-subtle uppercase tracking-wider">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-apple-blue animate-pulse" />
            <span>Khuzaima Ahmed // Systems & AI Engineering</span>
          </div>
          <div className="hidden sm:block">Scroll to experience the architecture</div>
        </div>

        {/* Center Stage Storyboard */}
        <div className="z-10 my-auto w-full max-w-5xl mx-auto text-center relative">
          {/* Phase 1: Massive Apple Statement */}
          <motion.div
            style={{ opacity: stage1Opacity, y: stage1Y, scale: stage1Scale }}
            className="space-y-6"
          >
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-subtle">
              The Sovereign Architecture
            </span>

            <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-apple-tightest leading-[0.92] text-white">
              Most wanted. <br />
              <span className="text-apple-subtle">Deterministic.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-apple-subtle text-base sm:text-xl font-normal leading-relaxed pt-2">
              Purpose-built for unprecedented performance. Zero-overhead background daemons, 
              multi-stream GNSS trajectory fusion, and real-time DSP audio synthesis.
            </p>
          </motion.div>

          {/* Phase 2: Apple 3-Column Comparative Metrics */}
          <motion.div
            style={{ opacity: stage2Opacity, y: stage2Y }}
            className="absolute inset-0 flex flex-col justify-center items-center space-y-8 pointer-events-auto"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-blue">
              Engineered From First Principles
            </span>

            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-apple-tightest text-white leading-tight">
              Uncompromising physics. <br />
              Zero measurable overhead.
            </h2>

            {/* Apple 3-Column Stat Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 pt-4 w-full max-w-4xl">
              <div className="text-center p-4 bg-apple-gray/40 backdrop-blur-xl rounded-2xl border border-white/5">
                <div className="text-xs text-apple-subtle font-medium mb-1">Up to</div>
                <div className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  88.4%
                </div>
                <div className="text-xs text-apple-subtle mt-1">
                  lower horizontal error <br /> (1.235m RTS smoothed RMS)
                </div>
              </div>

              <div className="text-center p-4 bg-apple-gray/40 backdrop-blur-xl rounded-2xl border border-white/5">
                <div className="text-xs text-apple-subtle font-medium mb-1">Exactly</div>
                <div className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  0.0%
                </div>
                <div className="text-xs text-apple-subtle mt-1">
                  CPU sensory overhead <br /> (Win32 foreground ctypes)
                </div>
              </div>

              <div className="text-center p-4 bg-apple-gray/40 backdrop-blur-xl rounded-2xl border border-white/5">
                <div className="text-xs text-apple-subtle font-medium mb-1">Within</div>
                <div className="font-sans text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  ≤ 0.5 dB
                </div>
                <div className="text-xs text-apple-subtle mt-1">
                  automated PEQ residual error <br /> (Harman 301-pt curve match)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phase 3: Transition Prompt */}
          <motion.div
            style={{ opacity: stage3Opacity, y: stage3Y }}
            className="absolute inset-0 flex flex-col justify-center items-center space-y-4"
          >
            <span className="text-xs text-apple-subtle uppercase tracking-widest font-mono">
              Next // Flagship Systems
            </span>
            <h3 className="font-sans text-3xl sm:text-5xl font-bold text-white">
              Explore the engineering.
            </h3>
            <a
              href="#bento"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-semibold mt-2"
              data-cursor-interactive="true"
            >
              <span>View Flagship Architectures</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="z-10 flex items-center justify-center space-x-2 text-apple-subtle text-xs font-mono">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-apple-blue" />
          <span>SCROLL PROGRESSION</span>
        </div>
      </div>
    </div>
  );
}
