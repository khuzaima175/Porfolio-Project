"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Lenis from "lenis";
import { Project } from "@/lib/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  // Dedicated Lenis instance inside the modal for buttery smooth momentum scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      // Pause main window Lenis
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  // Initialize smooth momentum scroll inside the modal body
  useEffect(() => {
    if (!project || !scrollWrapperRef.current) return;

    const modalLenis = new Lenis({
      wrapper: scrollWrapperRef.current,
      content: scrollContentRef.current || scrollWrapperRef.current,
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      modalLenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      modalLenis.destroy();
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Drawer Panel: Apple Cubic-Bezier Glide */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#141415] border-l border-white/10 h-screen max-h-screen flex flex-col shadow-2xl z-10 overflow-hidden text-white select-text transform-gpu"
          >
            {/* Drawer Header (Fixed at top) */}
            <div className="flex-shrink-0 bg-[#161617]/95 backdrop-blur-xl border-b border-white/10 p-5 px-6 flex items-center justify-between z-20">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-apple-blue/15 border border-apple-blue/30 text-apple-blue font-mono text-[10px] uppercase rounded-full font-medium">
                  {project.category}
                </span>
                <span className="text-apple-subtle font-mono text-xs">// {project.year}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-apple-subtle hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                data-cursor-interactive="true"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dedicated Smooth Scroll Wrapper */}
            <div
              ref={scrollWrapperRef}
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto overscroll-contain min-h-0 apple-scrollbar"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div ref={scrollContentRef} className="p-6 sm:p-8 space-y-8">
                {/* Title & Tagline */}
                <div>
                  <h2 className="font-sans text-2xl sm:text-4xl font-bold text-white tracking-apple-tight leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-apple-subtle font-mono text-xs sm:text-sm mt-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Media Graphic if available */}
                {project.image && (
                  <div className="relative border border-white/10 overflow-hidden bg-black rounded-3xl aspect-video shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-apple-subtle font-mono text-[10px] rounded-full">
                      ARCHIVAL SPECIMEN // LIVE
                    </div>
                  </div>
                )}

                {/* Executive Briefing */}
                <div className="p-6 bg-apple-blue/10 border-l-2 border-apple-blue rounded-r-2xl">
                  <h3 className="text-xs font-mono text-apple-blue uppercase tracking-wider mb-2 font-semibold">
                    Executive Briefing
                  </h3>
                  <p className="text-white text-sm sm:text-base leading-relaxed font-normal">
                    {project.executivePitch}
                  </p>
                </div>

                {/* Key Hard Metrics */}
                <div>
                  <h3 className="text-xs font-mono text-apple-subtle uppercase tracking-wider mb-3">
                    Validated Performance Metrics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="text-apple-subtle font-mono text-[10px] uppercase">
                          {metric.label}
                        </div>
                        <div className="font-sans text-xl font-bold text-apple-blue tabular-nums mt-1">
                          {metric.value}
                        </div>
                        <div className="text-[11px] text-apple-subtle mt-1 leading-snug">
                          {metric.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture & Engineering Highlights */}
                <div>
                  <h3 className="text-xs font-mono text-apple-subtle uppercase tracking-wider mb-4">
                    Core Architecture & Engineering Highlights
                  </h3>
                  <div className="space-y-3">
                    {project.architectureHighlights.map((arch, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-white/20 transition-colors"
                      >
                        <div className="flex items-center space-x-2 text-white font-mono text-xs font-semibold">
                          <span className="text-apple-blue">0{idx + 1}.</span>
                          <span>{arch.title}</span>
                        </div>
                        <p className="text-apple-subtle text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                          {arch.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hard Metrics & Benchmarks */}
                {project.hardMetrics && project.hardMetrics.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono text-apple-subtle uppercase tracking-wider mb-3">
                      Hard Metrics & Quantitative Benchmarks
                    </h3>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                      {project.hardMetrics.map((hm, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs font-mono text-white">
                          <span className="text-apple-blue font-bold">[{idx + 1}]</span>
                          <span>{hm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Deployed */}
                <div>
                  <h3 className="text-xs font-mono text-apple-subtle uppercase tracking-wider mb-3">
                    Technologies Deployed
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 text-apple-subtle font-mono text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engineering Impact Statements */}
                <div>
                  <h3 className="text-xs font-mono text-apple-subtle uppercase tracking-wider mb-3">
                    Engineering Impact Statements
                  </h3>
                  <ul className="space-y-2.5">
                    {project.resumeBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-apple-subtle leading-relaxed">
                        <span className="text-apple-blue mt-0.5">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Drawer Footer (Fixed at bottom) */}
            <div className="flex-shrink-0 bg-[#161617]/95 backdrop-blur-xl border-t border-white/10 p-4 px-6 flex items-center justify-between text-apple-subtle font-mono text-xs z-20">
              <span className="text-[11px]">REF ID: {project.id}</span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-white text-black hover:bg-apple-blue hover:text-white font-semibold transition-colors duration-200 rounded-full text-xs shadow-md"
                data-cursor-interactive="true"
              >
                CLOSE INSPECTION
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
