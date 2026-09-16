"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Database, Compass } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_ENTER } from "@/lib/motion/tokens";

export function EngineeringMethod() {
  const principles = [
    {
      num: "01",
      title: "Zero Ghost Work",
      fullTitle: "Zero Ghost Work & 0.0% Daemon Overhead",
      icon: Cpu,
      accent: "from-blue-500/20 via-blue-500/5 to-transparent",
      badge: "0.0% CPU IMPACT",
      desc: "Poll native operating system APIs via Win32 ctypes with zero measurable CPU consumption. Eliminate phantom gaps and clock drift across Daylight Saving Time and multi-day shutdowns using UTC-anchored monotonic timing.",
      metrics: "Win32 Foreground Polling • time.monotonic() • Atomic JSON Resiliency",
    },
    {
      num: "02",
      title: "Physics First",
      fullTitle: "Physics-First Ground Truth Before ML",
      icon: Compass,
      accent: "from-indigo-500/20 via-indigo-500/5 to-transparent",
      badge: "5-TIER AUDIT LOCKED",
      desc: "Apply 5-tier metrological audits (LODO-CV, Chi-square NIS innovation gating) to expose out-of-fold generalization failures. When tree models degrade vertical accuracy (+15cm), anchor production systems strictly to deterministic physics and RTS filtering.",
      metrics: "LODO-CV Cross Validation • Chi-Square RAIM • 1.235m RTS Smoothed",
    },
    {
      num: "03",
      title: "Local Privacy",
      fullTitle: "Local-First Sovereign Privacy",
      icon: ShieldCheck,
      accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      badge: "100% PRIVATE SILICON",
      desc: "Design background intelligence that respects user confidentiality without compromise. Zero screen captures, zero video streams, and sub-millisecond offline full-text search backed by embedded SQLite FTS5 virtual tables.",
      metrics: "SQLite FTS5 Full Text • Zero Cloud Telemetry • Sub-Millisecond Search",
    },
    {
      num: "04",
      title: "Zero Quota Waste",
      fullTitle: "Zero-Quota-Waste Algorithmic Efficiency",
      icon: Database,
      accent: "from-amber-500/20 via-amber-500/5 to-transparent",
      badge: "~60% TOKEN COMPRESSION",
      desc: "Engineer client-side NLP clustering operating in <15ms directly in the browser. Compress LLM context windows by ~60% using pipe-delimited CSV encoding, and eliminate database N+1 bottlenecks down to atomic batch queries.",
      metrics: "In-Browser NLP • Pipe-Delimited CSV • 3-Tier Multi-LLM Cascades",
    },
  ];

  return (
    <section id="method" className="py-24 px-4 sm:px-8 lg:px-12 max-w-[95vw] 2xl:max-w-[110rem] mx-auto border-t border-white/10 space-y-12">
      {/* Header */}
      <Reveal variant="slide-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-blue font-mono">
              Engineering Philosophy
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tightest-editorial text-white leading-tight">
              Architectural Tenets.
            </h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm text-brand-subtle font-normal leading-relaxed">
            Engineered to run deterministically on real silicon, survive edge outages, and deliver mathematical certainty.
          </p>
        </div>
      </Reveal>

      {/* Sticky Stacking Cards */}
      <div className="space-y-8 relative">
        {principles.map((item, idx) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE_ENTER }}
              style={{
                top: `calc(7rem + ${idx * 1.5}rem)`,
              }}
              className="sticky pro-card rounded-[2.5rem] p-7 sm:p-10 border border-white/10 bg-[#141416]/95 backdrop-blur-2xl shadow-2xl overflow-hidden group"
            >
              {/* Specular Radial Accent */}
              <div
                className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${item.accent} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700`}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm font-bold text-brand-blue">{item.num}</span>
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-brand-blue">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </span>
                  </div>

                  <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/5 border border-white/10 text-brand-subtle">
                    {item.badge}
                  </span>
                </div>

                <p className="text-brand-subtle text-sm sm:text-base leading-relaxed font-normal max-w-4xl">
                  {item.desc}
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
                  <span className="text-white font-medium">{item.fullTitle}</span>
                  <span className="text-brand-blue">{item.metrics}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
