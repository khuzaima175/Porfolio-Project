"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING_LAYOUT } from "@/lib/motion/tokens";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { scrollToTarget } from "@/lib/utils/scroll";

const SECTIONS = [
  { id: "storyboard", label: "01 // Storyboard" },
  { id: "compare", label: "02 // Benchmark Matrix" },
  { id: "bento", label: "03 // Flagships & Pro Grid" },
  { id: "archive", label: "04 // Toolchain & About" },
  { id: "method", label: "05 // Tenets" },
  { id: "contact", label: "06 // Dispatch" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function ProgressRail() {
  const activeId = useScrollSpy(SECTION_IDS, 0.35);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <nav
      aria-label="Page section rail"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center space-y-3 p-2 rounded-full bg-[#161617]/70 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-auto"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeId === id;
        const isHovered = hoveredId === id;

        return (
          <div key={id} className="relative flex items-center justify-end">
            {/* Tooltip on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-7 px-2.5 py-1 rounded-full bg-[#18181a] border border-white/15 text-white font-mono text-[10px] whitespace-nowrap shadow-xl pointer-events-none"
                >
                  {label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot trigger */}
            <button
              onClick={() => scrollToTarget(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
              className="relative p-1.5 flex items-center justify-center cursor-pointer group"
              data-cursor-interactive="true"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-apple-blue shadow-md shadow-apple-blue/50 scale-125"
                    : "bg-white/25 group-hover:bg-white/60"
                }`}
              />

              {isActive && (
                <motion.div
                  layoutId="progress-rail-ring"
                  transition={SPRING_LAYOUT}
                  className="absolute inset-0 border border-apple-blue/60 rounded-full scale-150 pointer-events-none"
                />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
