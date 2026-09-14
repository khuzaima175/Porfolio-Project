"use client";

import React from "react";
import { FrameTicks } from "@/components/ui/FrameTicks";

const METHODS = [
  {
    step: "1",
    title: "Discover & Instrument",
    desc: "Establish ground-truth baselines before writing application logic. Capture raw sensor feeds, inspect thread scheduling, and measure hardware reference limits.",
    highlight: "Ground-truth capture",
  },
  {
    step: "2",
    title: "Model & Simulate",
    desc: "Validate mathematical models in Python and NumPy before committing to production runtimes. Run hypothesis testing and cross-validation to expose overfitting early.",
    highlight: "Statistical validation",
  },
  {
    step: "3",
    title: "Implement & Constrain",
    desc: "Build runtimes under strict compute and memory ceilings. Isolate audio worklets, manage thread pools, and enforce zero-allocation inner loops.",
    highlight: "Zero allocation",
  },
  {
    step: "4",
    title: "Harden & Verify",
    desc: "Benchmark production builds against hardware reference standards—differential GNSS ground truth, powermetrics battery logs, and acoustic pink noise.",
    highlight: "Metrological verification",
  },
];

export const Method: React.FC = () => {
  return (
    <section id="method" className="py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-line">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-4 text-xs text-ink-muted">
        <div className="flex items-center gap-3">
          <span className="font-mono">S7 // METHOD</span>
          <span>Genuinely sequential engineering lifecycle</span>
        </div>
        <div className="font-mono text-[11px]">04 STAGES</div>
      </div>

      <div className="mt-8 mb-12 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-ink">
          How systems earn production trust.
        </h2>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Four sequential gates every architecture must clear before deployment. No phase is skipped.
        </p>
      </div>

      {/* 4 Sequential Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {METHODS.map((m) => (
          <div
            key={m.step}
            className="border border-line bg-surface-2 p-6 relative flex flex-col justify-between"
          >
            <FrameTicks />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
                <span className="font-mono text-2xl font-medium text-ink">
                  0{m.step}
                </span>
                <span className="text-[10px] font-mono text-signal bg-signal-subtle px-1.5 py-0.5 border border-signal/20">
                  {m.highlight}
                </span>
              </div>

              <h3 className="text-base font-medium text-ink tracking-tight">
                {m.title}
              </h3>

              <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                {m.desc}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-line text-[10px] font-mono text-ink-muted flex items-center justify-between">
              <span>GATE COMPLIANCE</span>
              <span>LOCKED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Method;
