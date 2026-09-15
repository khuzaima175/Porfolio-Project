"use client";

import { motion } from "framer-motion";
import { ArrowDown, Terminal, Cpu, Radio, Activity } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 max-w-7xl mx-auto border-b border-border-subtle">
      {/* Top Telemetry Header Line */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-pewter uppercase tracking-wider">
        <div className="flex items-center space-x-2">
          <span className="text-vermilion">SYS_REF //</span>
          <span>KHUZAIMA_AHMED_PORTFOLIO_V4.2</span>
        </div>
        <div className="flex items-center space-x-6">
          <span>LAT: 24.8607° N</span>
          <span>LON: 67.0011° E</span>
          <span className="hidden sm:inline text-bone/60">KARACHI, PK</span>
        </div>
      </div>

      {/* Center Kinetic Editorial Typography */}
      <div className="my-auto py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-slate border border-border-subtle text-bone-muted font-mono text-[11px] mb-4">
            <span className="w-1.5 h-1.5 bg-vermilion rounded-none" />
            <span>DISCIPLINE: LOW-LEVEL SYSTEMS &bull; SENSOR FUSION &bull; APPLIED AI</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tightest leading-[0.95] text-bone uppercase">
            Systems Engineer. <br />
            <span className="text-bone-dark hover:text-bone transition-colors duration-500">
              Deterministic Physics.
            </span> <br />
            Zero-Overhead AI.
          </h1>

          <p className="max-w-2xl text-bone-muted text-base sm:text-lg font-light leading-relaxed pt-4">
            Specializing in high-precision algorithmic engines, local-first background sensory daemons, 
            multi-constellation GNSS fusion, and real-time DSP acoustic synthesis. Built for pure performance, 
            zero battery drain, and mathematically rigorous ground truth.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 pt-8"
        >
          <a
            href="#work"
            className="group relative inline-flex items-center space-x-3 px-6 py-3.5 bg-bone text-carbon font-mono text-xs font-semibold tracking-wider uppercase hover:bg-vermilion hover:text-bone transition-all duration-300"
            data-cursor-interactive="true"
          >
            <span>EXPLORE FLAGSHIP WORK</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#specimens"
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-slate/80 border border-border-subtle text-bone font-mono text-xs tracking-wider uppercase hover:border-vermilion/50 hover:bg-slate transition-all duration-300"
            data-cursor-interactive="true"
          >
            <Activity className="w-3.5 h-3.5 text-vermilion" />
            <span>TEST LIVE SPECIMENS</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Telemetry Ticker */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border-subtle">
        <div className="p-3 bg-slate/40 border border-border-subtle/60">
          <div className="flex items-center justify-between text-pewter font-mono text-[10px] mb-1">
            <span>DAEMON OVERHEAD</span>
            <Cpu className="w-3 h-3 text-vermilion" />
          </div>
          <div className="font-editorial text-2xl font-bold text-bone tabular-nums">0.0%</div>
          <div className="text-[11px] text-bone-muted font-mono mt-0.5">Win32 ctypes active polling</div>
        </div>

        <div className="p-3 bg-slate/40 border border-border-subtle/60">
          <div className="flex items-center justify-between text-pewter font-mono text-[10px] mb-1">
            <span>GNSS ACCURACY</span>
            <Radio className="w-3 h-3 text-vermilion" />
          </div>
          <div className="font-editorial text-2xl font-bold text-bone tabular-nums">1.235m</div>
          <div className="text-[11px] text-bone-muted font-mono mt-0.5">RTS backward smoothed RMS</div>
        </div>

        <div className="p-3 bg-slate/40 border border-border-subtle/60">
          <div className="flex items-center justify-between text-pewter font-mono text-[10px] mb-1">
            <span>DSP PEQ ERROR</span>
            <Activity className="w-3 h-3 text-vermilion" />
          </div>
          <div className="font-editorial text-2xl font-bold text-bone tabular-nums">≤ 0.5 dB</div>
          <div className="text-[11px] text-bone-muted font-mono mt-0.5">301-pt Harman residual RMS</div>
        </div>

        <div className="p-3 bg-slate/40 border border-border-subtle/60">
          <div className="flex items-center justify-between text-pewter font-mono text-[10px] mb-1">
            <span>TOKEN EFFICIENCY</span>
            <Terminal className="w-3 h-3 text-vermilion" />
          </div>
          <div className="font-editorial text-2xl font-bold text-bone tabular-nums">~60% CUT</div>
          <div className="text-[11px] text-bone-muted font-mono mt-0.5">Compact pipe-delimited CSV</div>
        </div>
      </div>
    </section>
  );
}
