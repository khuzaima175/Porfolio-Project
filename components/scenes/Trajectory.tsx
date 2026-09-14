"use client";

import React from "react";
import { FrameTicks } from "@/components/ui/FrameTicks";

const MILESTONES = [
  {
    year: "2026",
    title: "AI Learning Companion 2.0 — Database & Anti-Scrape Architecture",
    domain: "Full-Stack / Distributed AI",
    summary:
      "Ingesting long-form YouTube lectures into SM-2 spaced repetition decks exposed severe cloud infrastructure ceilings.",
    challenge:
      "Initial production deployment suffered from N+1 query waterfalls (1 + 2N + V roundtrips) and frequent serverless IP bans on YouTube endpoints.",
    resolution:
      "Rewrote course aggregations into bulk PostgreSQL IN queries, reducing database calls to exactly 3. Built a 3-tier resilient scraping fallback (API proxy → yt-dlp mobile client spoofing → manual ingestion).",
    verdict: "Slashed API query overhead by 80%; achieved 0ms perceived loads via client SWR caching.",
  },
  {
    year: "2025",
    title: "AudioSage DSP — Real-Time Browser Audio Worklets",
    domain: "DSP & Audio Engineering",
    summary:
      "Engineered an in-browser audiophile tuning suite capable of matching target frequency response curves within 0.5 dB RMS.",
    challenge:
      "Main-thread JavaScript execution caused unacceptable audio buffer underruns and clicks during logarithmic frequency sweeps.",
    resolution:
      "Offloaded 5-band biquad parametric equations to dedicated Web Audio Worklet threads and designed a 30ms anti-pop crossfader on profile switching.",
    verdict: "Achieved 23ms live tab DSP latency with zero buffer underruns under continuous frequency sweeps.",
  },
  {
    year: "2025",
    title: "The Silent AI Daily Auditor — Zero-Overhead Windows Daemon",
    domain: "Systems & Local Daemons",
    summary:
      "Constructed a background executive coach that records daily focus without screen capture or battery drain.",
    challenge:
      "Traditional video recorders consumed 8-15% CPU. Furthermore, Windows sleep states and Daylight Saving Time induced phantom timeline gaps.",
    resolution:
      "Replaced video feeds with native Win32 ctypes foreground polling at 5s intervals. Anchored timeline continuity to time.monotonic() ticks and UTC timestamps.",
    verdict: "0.0% CPU sensory engine overhead verified via powermetrics; 66 offline unit tests passing in ~0.50s.",
  },
  {
    year: "2024",
    title: "GNSS Multi-Stream Positioning — Metrological Audit & ML Demotion",
    domain: "Geospatial & State Estimation",
    summary:
      "Benchmarked multi-constellation GNSS corrections against 2cm RTK ground truth across 20 km of road drives.",
    challenge:
      "Gradient-boosted decision trees initially appeared to fit calibration data well, but degraded vertical accuracy on unseen highway environments (+15.01 cm, p < 10⁻²⁰).",
    resolution:
      "Rigorously demoted ML from production baseline to experimental opt-in. Replaced with 3D ECEF inverse-variance physics fusion and a 6-state Newtonian Kalman filter with RTS backward smoothing.",
    verdict: "Achieved 1.235m Horizontal RMS (88.4% error reduction over raw GPS); maintained path stability through 15s tunnel outages.",
  },
];

export const Trajectory: React.FC = () => {
  return (
    <section id="trajectory" className="py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-line">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-4 text-xs text-ink-muted">
        <div className="flex items-center gap-3">
          <span className="font-mono">S8 // TRAJECTORY</span>
          <span>Chronological engineering milestones & verified architectural refactors</span>
        </div>
        <div className="font-mono text-[11px]">2024 — 2026</div>
      </div>

      <div className="mt-8 mb-12 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-ink">
          Milestones, bottlenecks, and honest redesigns.
        </h2>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Engineering credibility comes from identifying points of failure and systematically resolving
          them. Every milestone represents a genuine architectural inflection point.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-line ml-3 sm:ml-6 space-y-12 pl-6 sm:pl-10">
        {MILESTONES.map((item, idx) => (
          <div key={idx} className="relative">
            {/* Timeline node marker */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3 h-3 bg-surface border border-line-heavy flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-signal" />
            </div>

            {/* Content card */}
            <div className="border border-line bg-surface-2 p-6 relative">
              <FrameTicks />

              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-line mb-4">
                <span className="font-mono text-sm font-medium text-ink">
                  {item.year} // {item.domain}
                </span>
                <span className="text-[10px] font-mono text-ink-muted uppercase border border-line px-1.5 py-0.5">
                  POST-MORTEM VERIFIED
                </span>
              </div>

              <h3 className="text-lg font-medium text-ink tracking-tight">
                {item.title}
              </h3>

              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                {item.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-line text-xs">
                <div className="bg-surface p-3 border border-line">
                  <span className="font-mono text-[10px] text-ink block mb-1">
                    THE BOTTLENECK / TRADEOFF
                  </span>
                  <p className="text-ink-muted leading-relaxed">{item.challenge}</p>
                </div>
                <div className="bg-surface p-3 border border-line">
                  <span className="font-mono text-[10px] text-signal block mb-1">
                    THE ARCHITECTURAL REDESIGN
                  </span>
                  <p className="text-ink-muted leading-relaxed">{item.resolution}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[11px]">
                <span className="text-ink-muted">Verified Outcome</span>
                <span className="font-mono text-ink font-medium">{item.verdict}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trajectory;
