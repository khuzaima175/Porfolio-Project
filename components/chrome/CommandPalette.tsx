"use client";

import React, { useState, useEffect, useRef } from "react";
import { PROJECTS, Project, SIGNAL_STAGES, SignalStage } from "@/lib/data/projects";
import { FrameTicks } from "@/components/ui/FrameTicks";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  onSelectStage?: (stage: SignalStage) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectStage,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Ctrl+K, Cmd+K, and '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputActive =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable);

      // '/' trigger (suppressed if typing in input)
      if (e.key === "/" && !isInputActive && !isOpen) {
        e.preventDefault();
        // Trigger open via parent state or callback
      }

      // Escape to close
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter projects and stages
  const filteredProjects = PROJECTS.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.domain.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q)) ||
      p.blurb.toLowerCase().includes(q)
    );
  });

  const filteredStages = SIGNAL_STAGES.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.subtitle.toLowerCase().includes(q) ||
      s.tools.some((t) => t.name.toLowerCase().includes(q))
    );
  });

  const handleProjectClick = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project);
    }
    const sectionId = project.tier === "flagship" ? "selected-work" : "archive";
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  const handleStageClick = (stage: SignalStage) => {
    if (onSelectStage) {
      onSelectStage(stage);
    }
    const el = document.getElementById("signal-chain");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface-2 border border-line relative shadow-2xl overflow-hidden transition-all duration-200"
        style={{ animation: "maskDown 200ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <FrameTicks />

        {/* Search Input */}
        <div className="border-b border-line p-4 flex items-center gap-3">
          <svg
            className="w-4 h-4 text-ink-muted flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, stages, algorithms, or metrics..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-ink-muted border border-line px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-line p-2">
          {/* Signal Chain Stages */}
          {filteredStages.length > 0 && (
            <div className="py-2">
              <div className="text-[10px] text-ink-muted uppercase tracking-wider px-3 pb-1">
                Signal chain stages
              </div>
              {filteredStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => handleStageClick(stage)}
                  className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-surface transition-colors group"
                >
                  <div>
                    <span className="text-xs font-medium text-ink group-hover:text-signal transition-colors">
                      {stage.name}
                    </span>
                    <p className="text-[11px] text-ink-muted">{stage.subtitle}</p>
                  </div>
                  <span className="font-mono text-[10px] text-ink-muted">
                    {stage.benchmark.value}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="py-2">
              <div className="text-[10px] text-ink-muted uppercase tracking-wider px-3 pb-1">
                Engineering projects ({filteredProjects.length})
              </div>
              {filteredProjects.map((project) => (
                <button
                  key={project.slug}
                  onClick={() => handleProjectClick(project)}
                  className="w-full text-left px-3 py-2.5 flex items-start justify-between hover:bg-surface transition-colors group"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-ink group-hover:text-signal transition-colors">
                        {project.title}
                      </span>
                      <span className="text-[10px] text-ink-muted border border-line px-1 py-0.2">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">
                      {project.blurb}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {project.stack.slice(0, 3).map((st) => (
                        <span
                          key={st}
                          className="text-[10px] bg-surface text-ink-muted px-1.5 py-0.5"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-mono text-xs font-medium text-ink tabular-nums">
                      {project.metric.value}
                    </span>
                    <p className="text-[10px] text-ink-muted">{project.metric.label}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && filteredStages.length === 0 && (
            <div className="py-8 text-center text-xs text-ink-muted">
              No matching projects or stages for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-line px-4 py-2 flex items-center justify-between text-[10px] text-ink-muted bg-surface">
          <span>Navigate with Enter · Close with ESC</span>
          <span className="font-mono">12 projects indexed</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
