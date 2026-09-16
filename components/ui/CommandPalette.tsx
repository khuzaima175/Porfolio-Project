"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Activity, Cpu, Layers, Sparkles, Terminal, ArrowRight, X, Flame, Mic, MapPin, GraduationCap, TrendingUp } from "lucide-react";
import { PROJECTS, Project } from "@/lib/data/projects";
import { EASE_ENTER } from "@/lib/motion/tokens";
import { scrollToTarget } from "@/lib/utils/scroll";

interface CommandPaletteProps {
  onSelectProject: (project: Project) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Architecture" | "Section" | "Workbench";
  icon: any;
  action: () => void;
}

export function CommandPalette({ onSelectProject }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Command items builder
  const allCommands: CommandItem[] = [
    // Sections
    {
      id: "sec-overview",
      title: "Hero Storyboard & Scrollytelling",
      subtitle: "Jump to 280vh sovereign architecture overview",
      category: "Section",
      icon: Sparkles,
      action: () => {
        scrollToTarget("storyboard");
        setOpen(false);
      },
    },
    {
      id: "sec-flagships",
      title: "Flagship Showcase Theater",
      subtitle: "Jump to 440vh 4-chapter flagship scrollytelling theater",
      category: "Section",
      icon: Layers,
      action: () => {
        scrollToTarget("bento");
        setOpen(false);
      },
    },
    {
      id: "sec-compare",
      title: "Benchmark Comparison Matrix",
      subtitle: "Compare 9 systems against legacy industry standards",
      category: "Section",
      icon: Activity,
      action: () => {
        scrollToTarget("compare");
        setOpen(false);
      },
    },
    {
      id: "sec-archive",
      title: "About & Core Capability Hubs",
      subtitle: "Personal statement, marquee, and live telemetry inspector",
      category: "Section",
      icon: Compass,
      action: () => {
        scrollToTarget("archive");
        setOpen(false);
      },
    },
    {
      id: "sec-method",
      title: "Architectural Tenets",
      subtitle: "4 sovereign engineering principles stacked cards",
      category: "Section",
      icon: Cpu,
      action: () => {
        scrollToTarget("method");
        setOpen(false);
      },
    },
    {
      id: "sec-contact",
      title: "Encrypted Dispatch Terminal",
      subtitle: "Send a direct encrypted payload or copy contact email",
      category: "Section",
      icon: Terminal,
      action: () => {
        scrollToTarget("contact");
        setOpen(false);
      },
    },
    // Projects
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      subtitle: `${proj.category} // ${proj.tagline}`,
      category: "Architecture" as const,
      icon:
        proj.id === "gnss-engine"
          ? Compass
          : proj.id === "audiosage"
          ? Activity
          : proj.id === "silent-auditor"
          ? Cpu
          : proj.id === "cinemavault"
          ? Layers
          : proj.id === "ai-learning-companion"
          ? GraduationCap
          : proj.id === "yt-tracker"
          ? TrendingUp
          : proj.id === "mobile-voice-notes"
          ? Mic
          : proj.id === "location-diary"
          ? MapPin
          : Flame,
      action: () => {
        onSelectProject(proj);
        setOpen(false);
      },
    })),
  ];

  const filteredCommands = allCommands.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleArrowKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Floating ⌘K Trigger pill in bottom-left */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#161617]/85 backdrop-blur-xl border border-white/10 text-brand-subtle hover:text-white hover:border-white/25 transition-all text-xs font-mono shadow-xl hover:scale-105 active:scale-95"
          data-cursor-interactive="true"
        >
          <Search className="w-3.5 h-3.5 text-brand-blue" />
          <span>Quick Jump</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white font-mono">⌘K</kbd>
        </button>
      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[110] flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.25, ease: EASE_ENTER }}
              className="relative w-full max-w-2xl bg-[#141416] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[70vh]"
            >
              {/* Search input header */}
              <div className="flex items-center px-5 py-4 border-b border-white/10 space-x-3 bg-[#18181a]">
                <Search className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleArrowKeys}
                  placeholder="Jump to architecture, section, or live workbench..."
                  className="w-full bg-transparent text-white placeholder:text-neutral-500 font-sans text-sm focus:outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-brand-subtle hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Command List */}
              <div className="overflow-y-auto p-2 space-y-1 divide-y divide-white/5 custom-scrollbar">
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center text-brand-subtle font-mono text-xs">
                    No matching architectures or sections found.
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const Icon = cmd.icon;
                    const isSelected = selectedIndex === idx;

                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all ${
                          isSelected ? "bg-white/10 text-white" : "text-brand-subtle hover:text-white"
                        }`}
                        data-cursor-interactive="true"
                      >
                        <div className="flex items-center space-x-3 truncate mr-3">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? "bg-brand-blue text-white"
                                : "bg-white/5 text-brand-subtle"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <div className="font-sans text-sm font-semibold text-white truncate">
                              {cmd.title}
                            </div>
                            <div className="font-mono text-[11px] text-brand-subtle truncate">
                              {cmd.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0 font-mono text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-brand-subtle">
                            {cmd.category}
                          </span>
                          {isSelected && <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer navigation hints */}
              <div className="px-5 py-2.5 bg-[#101012] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-brand-subtle">
                <div className="flex items-center space-x-3">
                  <span><kbd className="px-1 py-0.5 rounded bg-white/10 text-white">↑↓</kbd> Navigate</span>
                  <span><kbd className="px-1 py-0.5 rounded bg-white/10 text-white">↵</kbd> Select</span>
                  <span><kbd className="px-1 py-0.5 rounded bg-white/10 text-white">ESC</kbd> Close</span>
                </div>
                <span>9 Production Architectures</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
