"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Database, Compass } from "lucide-react";

export function EngineeringMethod() {
  const principles = [
    {
      num: "01",
      title: "Zero Ghost Work & 0.0% Daemon Overhead",
      icon: Cpu,
      desc: "Poll native operating system APIs via Win32 ctypes with zero measurable CPU consumption. Eliminate phantom gaps and clock drift across Daylight Saving Time and multi-day shutdowns using UTC-anchored monotonic timing.",
    },
    {
      num: "02",
      title: "Physics-First Ground Truth Before ML",
      icon: Compass,
      desc: "Apply 5-tier metrological audits (LODO-CV, Chi-square NIS gating) to expose out-of-fold generalization failures. When tree models degrade vertical accuracy (+15cm), anchor production systems strictly to deterministic physics and RTS filtering.",
    },
    {
      num: "03",
      title: "Local-First Sovereign Privacy",
      icon: ShieldCheck,
      desc: "Design background intelligence that respects user confidentiality without compromise. Zero screen captures, zero video streams, and sub-millisecond offline full-text search backed by embedded SQLite FTS5 virtual tables.",
    },
    {
      num: "04",
      title: "Zero-Quota-Waste Algorithmic Efficiency",
      icon: Database,
      desc: "Engineer client-side NLP clustering operating in <15ms directly in the browser. Compress LLM context windows by ~60% using pipe-delimited CSV encoding, and eliminate database N+1 bottlenecks down to atomic batch queries.",
    },
  ];

  return (
    <section className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="mb-16 text-center sm:text-left">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-subtle">
          Engineering Philosophy
        </span>
        <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-apple-tightest text-white leading-tight mt-3">
          Architectural Tenets.
        </h2>
        <p className="max-w-2xl text-sm text-apple-subtle font-normal leading-relaxed mt-4">
          Code is not written to impress an AI generator. It is engineered to run deterministically 
          on real silicon, survive edge outages, and deliver mathematical certainty.
        </p>
      </div>

      {/* 4 Tenets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl apple-card group cursor-default"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-apple-blue font-mono text-sm font-bold tracking-wider">
                  TENET // {item.num}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-apple-blue/15 transition-colors">
                  <Icon className="w-5 h-5 text-apple-subtle group-hover:text-apple-blue transition-colors" />
                </div>
              </div>

              <h3 className="font-sans text-xl font-bold text-white mb-3 tracking-apple-tight group-hover:text-apple-blue transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-apple-subtle text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
