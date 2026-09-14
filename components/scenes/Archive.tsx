"use client";

import React, { useState, useRef, useEffect } from "react";
import { PROJECTS, Project, DOMAIN_TO_STAGE_INDEX } from "@/lib/data/projects";
import { FrameTicks } from "@/components/ui/FrameTicks";

interface ArchiveProps {
  onTransitionEnter?: () => void;
}

export const Archive: React.FC<ArchiveProps> = () => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tiltAngle, setTiltAngle] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [displayMetric, setDisplayMetric] = useState<string>("0");

  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const archiveProjects = PROJECTS.filter((p) => p.tier === "archive");

  // Determine representative rows for the 4 domains (used in S4->S5 transition)
  const seenDomains = new Set<string>();
  const representativeSlugs = new Set<string>();
  archiveProjects.forEach((p) => {
    if (!seenDomains.has(p.domain)) {
      seenDomains.add(p.domain);
      representativeSlugs.add(p.slug);
    }
  });

  // Track mouse coordinates for floating preview
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });

    // Calculate subtle tilt toward cursor (max 3 deg)
    const tiltX = Math.max(-3, Math.min(3, ((e.movementY || 0) * 0.4)));
    const tiltY = Math.max(-3, Math.min(3, -((e.movementX || 0) * 0.4)));
    setTiltAngle({ x: tiltX, y: tiltY });
  };

  // Tabular count-up simulation on hover
  useEffect(() => {
    if (!hoveredProject) return;

    // Check if numeric
    const rawVal = hoveredProject.metric.value;
    const numMatch = rawVal.match(/[\d.]+/);
    if (!numMatch) {
      setDisplayMetric(rawVal);
      return;
    }

    const targetNum = parseFloat(numMatch[0]);
    const prefix = rawVal.substring(0, numMatch.index);
    const suffix = rawVal.substring((numMatch.index || 0) + numMatch[0].length);

    let start = 0;
    const steps = 14;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = (targetNum * (step / steps)).toFixed(rawVal.includes(".") ? 1 : 0);
      setDisplayMetric(`${prefix}${current}${suffix}`);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayMetric(rawVal);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [hoveredProject]);

  const toggleExpand = (slug: string) => {
    setExpandedSlug(expandedSlug === slug ? null : slug);
  };

  return (
    <section
      id="archive"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-line relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-4 text-xs text-ink-muted">
        <div className="flex items-center gap-3">
          <span className="font-mono">S4 // THE ARCHIVE</span>
          <span>Index ledger of production systems & research prototypes</span>
        </div>
        <div className="font-mono text-[11px]">08 RECORDS</div>
      </div>

      {/* Index Ledger Table */}
      <div className="mt-8 divide-y divide-line border-b border-line">
        {archiveProjects.map((project) => {
          const isRepresentative = representativeSlugs.has(project.slug);
          const stageIndex = DOMAIN_TO_STAGE_INDEX[project.domain];
          const isExpanded = expandedSlug === project.slug;

          return (
            <div
              key={project.slug}
              id={`archive-row-${project.slug}`}
              data-representative={isRepresentative}
              data-stage-index={stageIndex}
              className={`group transition-all duration-200 ${
                isExpanded ? "bg-surface-2" : "hover:bg-surface-2/60"
              }`}
            >
              {/* Main Ledger Row */}
              <div
                onClick={() => toggleExpand(project.slug)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className="py-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-transform duration-200 group-hover:translate-x-2"
              >
                {/* Left: Year, Title, Domain, Representative badge */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono text-xs text-ink-muted w-10">
                    {project.year}
                  </span>
                  <span className="text-sm font-medium text-ink group-hover:text-signal transition-colors">
                    {project.title}
                  </span>
                  <span className="text-xs text-ink-muted border border-line px-2 py-0.5">
                    {project.domain}
                  </span>
                  {isRepresentative && (
                    <span className="hidden lg:inline-block text-[10px] font-mono text-signal bg-signal-subtle px-1.5 py-0.2 border border-signal/20">
                      STAGE_0{stageIndex + 1}
                    </span>
                  )}
                </div>

                {/* Right: Metric and Expand Indicator */}
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-right">
                    <span className="font-mono text-xs font-medium text-ink tabular-nums">
                      {project.metric.value}
                    </span>
                    <span className="text-[11px] text-ink-muted ml-2 hidden md:inline">
                      {project.metric.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-ink-muted transition-transform duration-200">
                    {isExpanded ? "−" : "+"}
                  </span>
                </div>
              </div>

              {/* In-Place Accordion Expansion (Height animation) */}
              {isExpanded && (
                <div className="px-4 pb-6 pt-2 border-t border-line/60 bg-surface text-xs text-ink-muted animate-fadeIn">
                  <p className="text-ink text-sm leading-relaxed mb-4">
                    {project.blurb}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <div className="font-mono text-[11px] text-ink mb-2">
                        FIELD NOTES & ARCHITECTURE
                      </div>
                      <ul className="space-y-1.5 list-disc list-inside">
                        {project.fieldNotes.map((note, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="font-mono text-[11px] text-ink mb-2">
                        STACK & VERIFIED BASELINE
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.stack.map((st) => (
                          <span
                            key={st}
                            className="bg-surface-2 border border-line px-2 py-0.5 text-[11px] text-ink"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                      <div className="p-2.5 bg-surface-2 border border-line text-[11px]">
                        <span className="font-medium text-ink">Baseline context: </span>
                        <span>{project.metric.context}</span>
                      </div>
                      <div className="mt-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-ink font-medium hover:text-signal"
                        >
                          <span>Inspect codebase & commits</span>
                          <span className="font-mono text-signal">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Spring Hover Preview Card (260x140px arriving with spring physics & tilt) */}
      {hoveredProject && (
        <div
          ref={previewRef}
          className="pointer-events-none fixed z-40 hidden md:block w-[260px] h-[140px] border border-line bg-surface p-3.5 shadow-xl transition-transform duration-100 ease-out"
          style={{
            top: cursorPos.y + 80,
            left: Math.min(cursorPos.x + 30, window.innerWidth - 300),
            transform: `translate3d(0, -12px, 0) rotateX(${tiltAngle.x}deg) rotateY(${tiltAngle.y}deg)`,
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", // stiffness 220, damping 22 spring feel
          }}
        >
          <FrameTicks />
          <div className="flex items-center justify-between text-[10px] font-mono text-ink-muted border-b border-line pb-1.5 mb-2">
            <span>{hoveredProject.year} // PREVIEW</span>
            <span className="text-signal">{hoveredProject.domain}</span>
          </div>

          <div className="text-xs font-medium text-ink line-clamp-1">
            {hoveredProject.title}
          </div>

          <p className="text-[11px] text-ink-muted line-clamp-2 mt-1 leading-normal">
            {hoveredProject.blurb}
          </p>

          <div className="mt-3 pt-2 border-t border-line flex items-baseline justify-between">
            <span className="font-mono text-base font-medium text-ink tabular-nums">
              {displayMetric}
            </span>
            <span className="text-[10px] text-ink-muted line-clamp-1">
              {hoveredProject.metric.label}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Archive;
