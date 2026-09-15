"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight, Zap, Shield, Compass } from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/ScrollTextReveal";

interface ComparisonPreset {
  id: string;
  name: string;
  systemName: string;
  stat1: { label: string; value: string; desc: string };
  stat2: { label: string; value: string; desc: string };
  stat3: { label: string; value: string; desc: string };
}

export function AppleComparison() {
  const presets: ComparisonPreset[] = [
    {
      id: "gnss",
      name: "Raw Consumer GPS L1 (Standard)",
      systemName: "GNSS Multi-Stream Fusion & RTS Smoother",
      stat1: {
        label: "Up to",
        value: "88.4%",
        desc: "lower horizontal RMS error (1.235m vs 10.89m)",
      },
      stat2: {
        label: "Benchmark",
        value: "2,493",
        desc: "validation epochs vs 2cm NovAtel RTK truth",
      },
      stat3: {
        label: "Stability",
        value: "0.062 m/s",
        desc: "dead-reckoning drift during 60s tunnel outages",
      },
    },
    {
      id: "auditor",
      name: "Legacy Productivity Trackers (Screen-Recording Daemons)",
      systemName: "The Silent AI Daily Auditor",
      stat1: {
        label: "Down to",
        value: "0.0%",
        desc: "CPU overhead via Win32 ctypes sensory engine",
      },
      stat2: {
        label: "Zero",
        value: "0 hrs",
        desc: "ghost work hours via retroactive AFK attribution",
      },
      stat3: {
        label: "Meeting Aware",
        value: "30 min",
        desc: "relaxed AFK threshold during muted calls",
      },
    },
    {
      id: "peq",
      name: "Manual Trial-and-Error PEQ Tuning",
      systemName: "AudioSage Residual Auto-PEQ Synthesizer",
      stat1: {
        label: "Within",
        value: "≤ 0.5 dB",
        desc: "residual RMS error against Harman 2019 target",
      },
      stat2: {
        label: "DSP Latency",
        value: "23 ms",
        desc: "live tab audio capture with 30ms anti-pop crossfade",
      },
      stat3: {
        label: "Precision",
        value: "48 Steps",
        desc: "steps per frequency decade logarithmic grid search",
      },
    },
    {
      id: "tokens",
      name: "Verbose JSON LLM Pipelines",
      systemName: "CinemaVault CSV Encoding & Anti-Hallucination",
      stat1: {
        label: "Up to",
        value: "60%",
        desc: "prompt token reduction via pipe-delimited CSV",
      },
      stat2: {
        label: "Hallucinations",
        value: "0.0%",
        desc: "100% verified against live OMDb API ground truth",
      },
      stat3: {
        label: "Routing",
        value: "3-Tier",
        desc: "seamless failover (Gemini 3.6 → 2.5 → 2.0)",
      },
    },
    {
      id: "learning",
      name: "Traditional Scraping & Brute-Force DBs",
      systemName: "AI Learning Companion 2.0",
      stat1: {
        label: "Query Cut",
        value: "80%",
        desc: "slashed DB round-trips from 1+2N+V to 3 queries",
      },
      stat2: {
        label: "Perceived Load",
        value: "0 ms",
        desc: "client SWR caching + serverless keep-alive pings",
      },
      stat3: {
        label: "Retention",
        value: "SM-2",
        desc: "atomic PostgreSQL RPC spaced repetition schedule",
      },
    },
    {
      id: "yt",
      name: "Cloud-Heavy Creator Analytics Tools",
      systemName: "YT Tracker Growth Studio",
      stat1: {
        label: "Latency",
        value: "<15 ms",
        desc: "client-side NLP n-gram clustering in-browser",
      },
      stat2: {
        label: "Topic Moats",
        value: ">60%",
        desc: "competitor content gap & surge velocity detection",
      },
      stat3: {
        label: "Efficiency",
        value: "Zero Quota",
        desc: "thread-local client pooling & multi-layer caching",
      },
    },
    {
      id: "mobile",
      name: "Sluggish Mobile Audio & Cloud Transcribers",
      systemName: "Mobile Voice Recorder & Notes Studio",
      stat1: {
        label: "Visualizer UI",
        value: "60 FPS",
        desc: "decoupled 10Hz dBFS metering without UI re-renders",
      },
      stat2: {
        label: "Local Search",
        value: "<1 ms",
        desc: "SQLite FTS5 full-text indexing + highlighted snippets",
      },
      stat3: {
        label: "Alarms",
        value: "Exact OS",
        desc: "bypasses Android Doze mode with lock-screen actions",
      },
    },
    {
      id: "location",
      name: "Battery-Draining Real-Time Geotrackers",
      systemName: "My Location Diary",
      stat1: {
        label: "Precision",
        value: "Sub-10m",
        desc: "Haversine distance calculation for POI dwell times",
      },
      stat2: {
        label: "Verification",
        value: "1-Click",
        desc: "out-of-band email verification via Resend API",
      },
      stat3: {
        label: "Chronicler",
        value: "100% Auto",
        desc: "nightly narrative diary generation via Gemini AI",
      },
    },
    {
      id: "calorie",
      name: "Cloud-Locked Heavy Nutrition Trackers",
      systemName: "Smart Calorie Tracker App",
      stat1: {
        label: "Data Entry",
        value: "0 ms",
        desc: "zero-latency local persistence via SQLite",
      },
      stat2: {
        label: "Ownership",
        value: "100% Local",
        desc: "zero external network calls, absolute privacy",
      },
      stat3: {
        label: "Calculation",
        value: "Real-Time",
        desc: "instant macro-nutrient formula balancing",
      },
    },
  ];

  const [selectedId, setSelectedId] = useState<string>("gnss");
  const [isOpen, setIsOpen] = useState(false);

  const current = presets.find((p) => p.id === selectedId) || presets[0];

  return (
    <section id="compare" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto text-center border-t border-white/10">
      {/* Overline & Massive Heading (Apple Signature) */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-subtle">
          The sovereign upgrade
        </span>

        <h2 className="font-sans text-5xl sm:text-7xl md:text-8xl font-bold tracking-apple-tightest text-white leading-none">
          Most wanted.
        </h2>

        {/* Word-by-Word Scroll-Illuminated Body */}
        <div className="pt-6 max-w-3xl mx-auto text-base sm:text-xl font-normal leading-relaxed text-apple-subtle">
          <ScrollTextReveal
            text="Every system is purpose-built for unprecedented performance. Eliminate battery-draining screen recording with native Win32 ctypes daemons. Run software-defined GNSS multi-stream fusion to cut vehicle positioning error by 88.4 percent. Synthesize real-time biquad DSP cascades directly inside the browser — everything a mission-critical architecture requires."
            highlightWords={[
              "purpose-built",
              "unprecedented",
              "performance",
              "native",
              "Win32",
              "software-defined",
              "GNSS",
              "88.4",
              "real-time",
              "biquad",
              "mission-critical",
            ]}
          />
        </div>
      </div>

      {/* Apple-Style Dropdown Selector */}
      <div className="pt-16 pb-12 relative max-w-md mx-auto">
        <div className="text-xs text-apple-subtle uppercase tracking-wider mb-2 font-mono">
          Compare with
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-6 py-3.5 rounded-full bg-apple-gray/80 border border-white/15 text-white hover:border-white/30 transition-all shadow-xl font-medium text-sm"
          data-cursor-interactive="true"
        >
          <span className="truncate">{current.name}</span>
          <ChevronDown
            className={`w-4 h-4 text-apple-subtle ml-2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-[85px] left-0 right-0 z-30 rounded-2xl bg-apple-gray/95 backdrop-blur-2xl border border-white/15 overflow-hidden shadow-2xl divide-y divide-white/5 text-left">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedId(preset.id);
                  setIsOpen(false);
                }}
                className={`w-full px-5 py-3 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                  preset.id === selectedId
                    ? "bg-apple-blue/15 text-apple-blue"
                    : "text-apple-text hover:bg-white/5"
                }`}
              >
                <span>{preset.name}</span>
                {preset.id === selectedId && (
                  <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3-Column Comparative Stat Cards (Direct Apple Match) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <div className="p-8 rounded-3xl apple-card text-center space-y-2">
          <div className="text-xs text-apple-subtle font-medium uppercase tracking-wider">
            {current.stat1.label}
          </div>
          <div className="font-sans text-4xl sm:text-6xl font-bold text-white tracking-tight">
            {current.stat1.value}
          </div>
          <div className="text-xs text-apple-subtle leading-relaxed pt-1">
            {current.stat1.desc}
          </div>
        </div>

        <div className="p-8 rounded-3xl apple-card text-center space-y-2">
          <div className="text-xs text-apple-subtle font-medium uppercase tracking-wider">
            {current.stat2.label}
          </div>
          <div className="font-sans text-4xl sm:text-6xl font-bold text-white tracking-tight">
            {current.stat2.value}
          </div>
          <div className="text-xs text-apple-subtle leading-relaxed pt-1">
            {current.stat2.desc}
          </div>
        </div>

        <div className="p-8 rounded-3xl apple-card text-center space-y-2">
          <div className="text-xs text-apple-subtle font-medium uppercase tracking-wider">
            {current.stat3.label}
          </div>
          <div className="font-sans text-4xl sm:text-6xl font-bold text-white tracking-tight">
            {current.stat3.value}
          </div>
          <div className="text-xs text-apple-subtle leading-relaxed pt-1">
            {current.stat3.desc}
          </div>
        </div>
      </div>
    </section>
  );
}
