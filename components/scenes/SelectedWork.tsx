"use client";

import React, { useRef, useState, useEffect } from "react";
import { PROJECTS, Project } from "@/lib/data/projects";
import { FrameTicks } from "@/components/ui/FrameTicks";
import { MemoryRings } from "@/components/specimens/MemoryRings";
import { TerminalTelemetry } from "@/components/specimens/TerminalTelemetry";
import { Oscilloscope } from "@/components/specimens/Oscilloscope";
import { OrbitTracker } from "@/components/specimens/OrbitTracker";
import { useScrollVelocity } from "@/lib/hooks/useScrollVelocity";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const SelectedWork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrubProgress, setScrubProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const skewY = useScrollVelocity();
  const flagships = PROJECTS.filter((p) => p.tier === "flagship");

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP 400vh Pinned Scrub Timeline on Desktop
  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: pinSection,
      scrub: 0.8,
      onUpdate: (self) => {
        setScrubProgress(self.progress);
        const idx = Math.min(flagships.length - 1, Math.floor(self.progress * flagships.length));
        setActiveIndex(idx);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile, flagships.length]);

  const currentProject = flagships[activeIndex] || flagships[0];

  // Stage reveal factor based on sub-progress within each flagship's slice [0, 1]
  const projectFraction = 1 / flagships.length;
  const localProgress = Math.max(
    0,
    Math.min(1, (scrubProgress - activeIndex * projectFraction) / projectFraction)
  );

  return (
    <section
      id="selected-work"
      ref={containerRef}
      className={`relative ${isMobile ? "py-16" : "h-[400vh]"} bg-surface`}
    >
      {/* Pinned Desktop Container */}
      <div
        ref={pinSectionRef}
        className={`${
          isMobile ? "relative" : "sticky top-0 h-screen overflow-hidden flex flex-col justify-between"
        } px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-8`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-line pb-3 text-xs text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="font-mono">S3 // SELECTED WORK</span>
            <span className="hidden sm:inline">Signature pinned scrub</span>
          </div>
          <div className="font-mono text-[11px] tabular-nums">
            0{activeIndex + 1} / 0{flagships.length}
          </div>
        </div>

        {/* 50/50 Desktop Split Layout */}
        {!isMobile ? (
          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            {/* Left: Specimen Frame with 2-Layer Parallax & Velocity Skew */}
            <div
              className="col-span-6 relative border border-line bg-surface-2 p-6 transition-transform duration-100 ease-out"
              style={{
                transform: `skewY(${skewY}deg)`,
              }}
            >
              <FrameTicks />

              {/* Parallax Layer 1: Background Coordinate Grid drifting at 0.7x */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 transition-transform duration-75"
                style={{
                  transform: `translateY(${(scrubProgress * -60).toFixed(1)}px)`,
                  backgroundImage:
                    "linear-gradient(to right, rgba(20,22,26,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,22,26,0.06) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Specimen Header */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-ink-muted pb-3 border-b border-line mb-4">
                <span>SPECIMEN_0{activeIndex + 1} // {currentProject.domain.toUpperCase()}</span>
                <span className="text-signal">LIVE_ENGINE</span>
              </div>

              {/* Parallax Layer 2: Live Engine running at 1.0x */}
              <div className="relative z-10 h-[340px] flex items-center justify-center bg-surface border border-line overflow-hidden">
                {currentProject.visualEngine === "rings" && <MemoryRings />}
                {currentProject.visualEngine === "telemetry" && <TerminalTelemetry />}
                {currentProject.visualEngine === "oscilloscope" && <Oscilloscope />}
                {currentProject.visualEngine === "orbit" && <OrbitTracker />}
              </div>

              {/* Specimen Footer */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-ink-muted pt-3 mt-3 border-t border-line">
                <span>PARALLAX: 0.7x GRID / 1.0x ENGINE</span>
                <span className="text-ink">SKEW: {skewY}°</span>
              </div>
            </div>

            {/* Right: Staged Reveal Project Card */}
            <div className="col-span-6 pl-4 flex flex-col justify-center">
              {/* Year & Role */}
              <div
                className="flex items-center gap-3 text-xs text-ink-muted font-mono mb-2 transition-all duration-300"
                style={{ opacity: localProgress > 0.05 ? 1 : 0.4 }}
              >
                <span>{currentProject.year}</span>
                <span>·</span>
                <span>{currentProject.role}</span>
              </div>

              {/* Title with Mask Reveal */}
              <h3
                className="text-3xl sm:text-4xl font-medium tracking-tight text-ink leading-tight transition-all duration-300"
                style={{
                  clipPath: localProgress > 0.15 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                }}
              >
                {currentProject.title}
              </h3>

              {/* Blurb */}
              <p
                className="text-base text-ink-muted leading-relaxed mt-4 transition-all duration-300"
                style={{
                  opacity: localProgress > 0.25 ? 1 : 0.2,
                  transform: `translateY(${localProgress > 0.25 ? "0px" : "8px"})`,
                }}
              >
                {currentProject.blurb}
              </p>

              {/* Metric Pill Scaling In */}
              <div
                className="mt-6 p-4 border border-line bg-surface-2 transition-all duration-300 relative"
                style={{
                  opacity: localProgress > 0.4 ? 1 : 0.2,
                  transform: `scale(${localProgress > 0.4 ? 1 : 0.96})`,
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-medium text-ink tabular-nums">
                    {currentProject.metric.value}
                  </span>
                  <span className="text-xs font-medium text-ink">
                    {currentProject.metric.label}
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted mt-2 leading-relaxed border-t border-line pt-2">
                  {currentProject.metric.context}
                </p>
              </div>

              {/* Stack Chips in Sentence Case (Staggering In) */}
              <div
                className="flex flex-wrap gap-2 mt-5 transition-all duration-300"
                style={{
                  opacity: localProgress > 0.55 ? 1 : 0.2,
                }}
              >
                {currentProject.stack.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-surface-2 border border-line text-xs text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Field Notes (Revealing One at a Time) */}
              <div className="mt-6 space-y-2">
                {currentProject.fieldNotes.map((note, idx) => {
                  const threshold = 0.65 + idx * 0.1;
                  const isRevealed = localProgress >= threshold;
                  return (
                    <div
                      key={idx}
                      className="text-xs text-ink-muted flex items-start gap-2 transition-all duration-300"
                      style={{
                        opacity: isRevealed ? 1 : 0.2,
                        transform: `translateX(${isRevealed ? "0px" : "6px"})`,
                      }}
                    >
                      <span className="font-mono text-signal flex-shrink-0 mt-0.5">·</span>
                      <span>{note}</span>
                    </div>
                  );
                })}
              </div>

              {/* Outbound Link with Genuine ↗ */}
              <div
                className="mt-6 pt-4 border-t border-line transition-opacity duration-300"
                style={{ opacity: localProgress > 0.85 ? 1 : 0.3 }}
              >
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-ink hover:text-signal transition-colors group"
                >
                  <span>View repository & benchmarks</span>
                  <span className="font-mono text-signal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Natural Stack (Pin disabled) */
          <div className="space-y-16 py-8">
            {flagships.map((project, idx) => (
              <div key={project.slug} className="border border-line bg-surface-2 p-5 relative">
                <FrameTicks />

                {/* Mobile Specimen Engine */}
                <div className="h-[240px] bg-surface border border-line flex items-center justify-center overflow-hidden mb-5">
                  {project.visualEngine === "rings" && <MemoryRings />}
                  {project.visualEngine === "telemetry" && <TerminalTelemetry />}
                  {project.visualEngine === "oscilloscope" && <Oscilloscope />}
                  {project.visualEngine === "orbit" && <OrbitTracker />}
                </div>

                {/* Mobile Project Info */}
                <div className="text-xs font-mono text-ink-muted mb-1">
                  0{idx + 1} // {project.year} · {project.role}
                </div>
                <h3 className="text-2xl font-medium text-ink tracking-tight">{project.title}</h3>
                <p className="text-sm text-ink-muted mt-2 leading-relaxed">{project.blurb}</p>

                {/* Metric */}
                <div className="mt-4 p-3 bg-surface border border-line">
                  <div className="font-mono text-2xl font-medium text-ink tabular-nums">
                    {project.metric.value}
                  </div>
                  <div className="text-xs font-medium text-ink mt-0.5">{project.metric.label}</div>
                  <div className="text-[11px] text-ink-muted mt-2 border-t border-line pt-2">
                    {project.metric.context}
                  </div>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.stack.map((st) => (
                    <span
                      key={st}
                      className="text-[11px] bg-surface border border-line px-2 py-0.5 text-ink"
                    >
                      {st}
                    </span>
                  ))}
                </div>

                {/* Outbound Link */}
                <div className="mt-5 pt-3 border-t border-line">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-ink hover:text-signal flex items-center gap-1"
                  >
                    <span>View repository & benchmarks</span>
                    <span className="font-mono text-signal">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section Footer */}
        <div className="hidden md:flex items-center justify-between border-t border-line pt-3 text-xs text-ink-muted">
          <div className="flex items-center gap-4">
            <span>Scroll controls staged card reveal</span>
            <div className="w-24 h-[2px] bg-line relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-signal transition-all duration-100"
                style={{ width: `${scrubProgress * 100}%` }}
              />
            </div>
          </div>
          <span className="font-mono text-[11px]">SCRUB 400VH ACTIVE</span>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
