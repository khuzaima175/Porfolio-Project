"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Zap } from "lucide-react";
import Lenis from "lenis";
import { Project } from "@/lib/data/projects";
import { AcousticVisualizer } from "@/components/specimens/AcousticVisualizer";
import { GNSSSimulator } from "@/components/specimens/GNSSSimulator";
import { SensoryRibbon } from "@/components/specimens/SensoryRibbon";
import { Odometer } from "@/components/ui/Odometer";
import { EASE_ENTER, SPRING_LAYOUT } from "@/lib/motion/tokens";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "deep-dive">("overview");
  const [specimenOpen, setSpecimenOpen] = useState(false);
  const [isInnerScrolled, setIsInnerScrolled] = useState(false);

  // Reset tabs when a new project opens
  useEffect(() => {
    if (project) {
      setActiveTab("overview");
      setSpecimenOpen(false);
      setIsInnerScrolled(false);
    }
  }, [project?.id]);

  // Dedicated Lenis instance inside the modal for smooth momentum scrolling
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

  // Initialize smooth momentum scroll inside the modal body on desktop, or native scroll on touch
  useEffect(() => {
    if (!project || !scrollWrapperRef.current) return;

    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    if (isTouchDevice) {
      // Native compositor scroll on mobile
      const el = scrollWrapperRef.current;
      const handleNativeScroll = () => {
        setIsInnerScrolled(el.scrollTop > 120);
      };
      el.addEventListener("scroll", handleNativeScroll, { passive: true });
      return () => {
        el.removeEventListener("scroll", handleNativeScroll);
      };
    }

    const modalLenis = new Lenis({
      wrapper: scrollWrapperRef.current,
      content: scrollContentRef.current || scrollWrapperRef.current,
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    modalLenis.on("scroll", (e: any) => {
      setIsInnerScrolled(e.scroll > 120);
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

  const hasSpecimen = project && project.specimenType && project.specimenType !== "none";

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE_ENTER }}
            className="relative w-full max-w-3xl bg-[#141415] border-l border-white/10 h-[100dvh] max-h-[100dvh] flex flex-col shadow-2xl z-10 overflow-hidden text-white select-text transform-gpu"
          >
            {/* Drawer Header (Condenses to one-line title on inner scroll > 120px) */}
            <div className="flex-shrink-0 bg-[#161617]/95 backdrop-blur-xl border-b border-white/10 p-4 sm:p-5 px-6 flex items-center justify-between z-20 transition-all duration-300">
              <div className="flex items-center space-x-3 overflow-hidden">
                <span className="px-3 py-1 bg-brand-blue/15 border border-brand-blue/30 text-brand-blue font-mono text-[10px] uppercase rounded-full font-medium flex-shrink-0">
                  {project.category}
                </span>
                <span className="text-brand-subtle font-mono text-xs flex-shrink-0">// {project.year}</span>
                {isInnerScrolled && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-sans text-xs font-semibold text-white truncate border-l border-white/10 pl-3"
                  >
                    {project.title}
                  </motion.span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-brand-subtle hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200 flex-shrink-0 ml-2"
                data-cursor-interactive="true"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switcher with layoutId underline */}
            <div className="flex-shrink-0 flex border-b border-white/10 bg-[#141415] relative">
              {(["overview", "deep-dive"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-colors relative ${
                      isActive ? "text-white font-semibold" : "text-brand-subtle hover:text-white"
                    }`}
                    data-cursor-interactive="true"
                  >
                    {tab === "overview" ? "Overview" : "Technical Deep-Dive"}
                    {isActive && (
                      <motion.div
                        layoutId="modal-tab-underline"
                        transition={SPRING_LAYOUT}
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-blue"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dedicated Smooth Scroll Wrapper */}
            <div
              ref={scrollWrapperRef}
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto overscroll-contain min-h-0 custom-scrollbar"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div ref={scrollContentRef} className="p-6 sm:p-8 space-y-7">
                {/* --- OVERVIEW TAB --- */}
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3, ease: EASE_ENTER }}
                      className="space-y-7"
                    >
                      {/* Title & Tagline */}
                      <div>
                        <h2 className="font-sans text-2xl sm:text-4xl font-bold text-white tracking-tight-editorial leading-tight">
                          {project.title}
                        </h2>
                        <p className="text-brand-subtle font-sans text-sm sm:text-base mt-2 leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Shared-Element Media Graphic */}
                      {project.image && (
                        <div className="relative border border-white/10 overflow-hidden bg-black rounded-3xl aspect-video shadow-2xl">
                          <motion.img
                            layoutId={`media-${project.id}`}
                            src={project.image}
                            alt={project.title}
                            loading="eager"
                            decoding="async"
                            className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 ease-out"
                          />
                          <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-brand-subtle font-mono text-[10px] rounded-full">
                            ARCHIVAL SPECIMEN // LIVE
                          </div>
                        </div>
                      )}

                      {/* Executive Briefing */}
                      <div className="p-5 bg-brand-blue/10 border-l-2 border-brand-blue rounded-r-2xl">
                        <h3 className="text-[10px] font-mono text-brand-blue uppercase tracking-wider mb-2 font-semibold">
                          Executive Briefing
                        </h3>
                        <p className="text-white text-sm leading-relaxed font-normal">
                          {project.executivePitch}
                        </p>
                      </div>

                      {/* Validated Metrics with Odometers */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-sm">
                            <div className="text-brand-subtle font-mono text-[10px] uppercase">
                              {metric.label}
                            </div>
                            <div className="font-sans text-xl font-bold text-brand-blue tabular-nums mt-1 flex items-center">
                              <Odometer value={metric.value} />
                            </div>
                            <div className="text-[11px] text-brand-subtle mt-1 leading-snug">
                              {metric.description}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech tags */}
                      <div>
                        <h3 className="text-[10px] font-mono text-brand-subtle uppercase tracking-wider mb-3">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                          {project.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3.5 py-1.5 bg-white/[0.05] border border-white/[0.08] text-neutral-200 font-sans text-sm font-medium rounded-xl"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Live Proof section with power-on sweep line */}
                      {hasSpecimen && (
                        <div className="border border-white/10 rounded-2xl overflow-hidden relative">
                          <button
                            onClick={() => setSpecimenOpen((v) => !v)}
                            className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                            data-cursor-interactive="true"
                          >
                            <div className="flex items-center space-x-2 text-xs font-mono">
                              <Zap className="w-3.5 h-3.5 text-brand-blue" />
                              <span className="text-white font-semibold uppercase tracking-wider">
                                Run Live Proof
                              </span>
                              <span className="text-brand-subtle">
                                — interactive model on client silicon
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-brand-subtle transition-transform duration-300 flex-shrink-0 ${
                                specimenOpen ? "rotate-180 text-brand-blue" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {specimenOpen && (
                              <motion.div
                                key="specimen"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: EASE_ENTER }}
                                className="overflow-hidden border-t border-white/10 relative"
                              >
                                {/* Power-on sweep line */}
                                <motion.div
                                  initial={{ left: "-100%" }}
                                  animate={{ left: "100%" }}
                                  transition={{ duration: 0.8, ease: EASE_ENTER }}
                                  className="absolute top-0 h-[1.5px] w-1/3 bg-gradient-to-r from-transparent via-brand-blue to-transparent z-10"
                                />

                                <div className="p-4">
                                  {project.specimenType === "acoustic" && <AcousticVisualizer />}
                                  {project.specimenType === "gnss" && <GNSSSimulator />}
                                  {project.specimenType === "sensory" && <SensoryRibbon />}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* CTA to deep-dive */}
                      <button
                        onClick={() => setActiveTab("deep-dive")}
                        className="w-full py-3 rounded-2xl border border-white/10 text-brand-subtle hover:text-white hover:border-white/30 transition-colors font-mono text-xs uppercase tracking-widest"
                        data-cursor-interactive="true"
                      >
                        View Full Architecture →
                      </button>
                    </motion.div>
                  )}

                  {/* --- TECHNICAL DEEP-DIVE TAB --- */}
                  {activeTab === "deep-dive" && (
                    <motion.div
                      key="deep-dive"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.3, ease: EASE_ENTER }}
                      className="space-y-7"
                    >
                      {/* Title repeat for context */}
                      <div>
                        <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug">
                          {project.title}
                        </h2>
                        <p className="text-brand-subtle font-sans text-sm mt-1.5 font-normal">
                          Technical Architecture & Engineering Highlights
                        </p>
                      </div>

                      {/* Architecture Highlights */}
                      <div>
                        <h3 className="text-xs font-mono text-brand-subtle uppercase tracking-wider mb-4">
                          Core Architecture & Engineering Highlights
                        </h3>
                        <div className="space-y-3">
                          {project.architectureHighlights.map((arch, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-white/20 transition-colors"
                            >
                              <div className="flex items-center space-x-2 text-white font-sans text-sm font-semibold">
                                <span className="text-brand-blue font-mono">0{idx + 1}.</span>
                                <span>{arch.title}</span>
                              </div>
                              <p className="text-brand-subtle text-sm sm:text-base mt-2 leading-relaxed font-normal">
                                {arch.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hard Metrics */}
                      {project.hardMetrics && project.hardMetrics.length > 0 && (
                        <div>
                          <h3 className="text-xs font-mono text-brand-subtle uppercase tracking-wider mb-3">
                            Hard Metrics & Quantitative Benchmarks
                          </h3>
                          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                            {project.hardMetrics.map((hm, idx) => (
                              <div key={idx} className="flex items-start space-x-2 text-sm font-mono text-white leading-relaxed">
                                <span className="text-brand-blue font-bold flex-shrink-0">[{idx + 1}]</span>
                                <span>{hm}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Engineering Impact Statements */}
                      <div>
                        <h3 className="text-xs font-mono text-brand-subtle uppercase tracking-wider mb-3">
                          Engineering Impact Statements
                        </h3>
                        <ul className="space-y-3">
                          {project.resumeBullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start space-x-2.5 text-sm sm:text-base text-brand-subtle leading-relaxed">
                              <span className="text-brand-blue mt-1 flex-shrink-0">&bull;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="flex-shrink-0 bg-[#161617]/95 backdrop-blur-xl border-t border-white/10 p-4 px-6 flex items-center justify-between text-brand-subtle font-mono text-xs z-20">
              <span className="text-[11px]">REF ID: {project.id}</span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-white text-black hover:bg-brand-blue hover:text-white font-semibold transition-colors duration-200 rounded-full text-xs shadow-md"
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
