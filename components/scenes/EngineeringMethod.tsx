"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cpu, Database, Compass, ChevronDown } from "lucide-react";

export function EngineeringMethod() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const principles = [
    {
      num: "01",
      title: "Zero Ghost Work",
      fullTitle: "Zero Ghost Work & 0.0% Daemon Overhead",
      icon: Cpu,
      desc: "Poll native operating system APIs via Win32 ctypes with zero measurable CPU consumption. Eliminate phantom gaps and clock drift across Daylight Saving Time and multi-day shutdowns using UTC-anchored monotonic timing.",
    },
    {
      num: "02",
      title: "Physics First",
      fullTitle: "Physics-First Ground Truth Before ML",
      icon: Compass,
      desc: "Apply 5-tier metrological audits (LODO-CV, Chi-square NIS gating) to expose out-of-fold generalization failures. When tree models degrade vertical accuracy (+15cm), anchor production systems strictly to deterministic physics and RTS filtering.",
    },
    {
      num: "03",
      title: "Local Privacy",
      fullTitle: "Local-First Sovereign Privacy",
      icon: ShieldCheck,
      desc: "Design background intelligence that respects user confidentiality without compromise. Zero screen captures, zero video streams, and sub-millisecond offline full-text search backed by embedded SQLite FTS5 virtual tables.",
    },
    {
      num: "04",
      title: "Zero Quota Waste",
      fullTitle: "Zero-Quota-Waste Algorithmic Efficiency",
      icon: Database,
      desc: "Engineer client-side NLP clustering operating in <15ms directly in the browser. Compress LLM context windows by ~60% using pipe-delimited CSV encoding, and eliminate database N+1 bottlenecks down to atomic batch queries.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-apple-subtle">
            Engineering Philosophy
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-apple-tightest text-white leading-tight mt-2">
            Architectural Tenets.
          </h2>
        </div>
        <p className="max-w-xs text-xs text-apple-subtle font-normal leading-relaxed">
          Engineered to run deterministically on real silicon, survive edge outages, and deliver mathematical certainty.
        </p>
      </div>

      {/* 4-pill accordion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {principles.map((item, idx) => {
          const Icon = item.icon;
          const isOpen = openIndex === idx;

          return (
            <motion.button
              key={item.num}
              onClick={() => toggle(idx)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`group text-left w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "apple-card border-apple-blue/30 bg-apple-blue/5"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
              data-cursor-interactive="true"
            >
              {/* Pill header — always visible */}
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center space-x-3">
                  <span className={`font-mono text-xs font-bold ${isOpen ? "text-apple-blue" : "text-apple-subtle"}`}>
                    {item.num}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                      isOpen ? "bg-apple-blue/20" : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 transition-colors ${
                        isOpen ? "text-apple-blue" : "text-apple-subtle"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-sans text-sm font-semibold transition-colors ${
                      isOpen ? "text-apple-blue" : "text-white"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-apple-subtle transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-apple-blue" : ""
                  }`}
                />
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-white/10">
                      <p className="text-[11px] font-mono text-apple-blue uppercase tracking-wider mb-2">
                        {item.fullTitle}
                      </p>
                      <p className="text-apple-subtle text-sm leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
