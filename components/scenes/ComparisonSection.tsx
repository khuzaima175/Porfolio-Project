"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/ScrollTextReveal";
import { Odometer } from "@/components/ui/Odometer";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_ENTER, SPRING_LAYOUT } from "@/lib/motion/tokens";

interface ComparisonPreset {
  id: string;
  name: string;
  systemName: string;
  stat1: { label: string; value: string; desc: string; ratio: number };
  stat2: { label: string; value: string; desc: string; ratio: number };
  stat3: { label: string; value: string; desc: string; ratio: number };
}

export function ComparisonSection() {
  const presets: ComparisonPreset[] = [
    {
      id: "gnss",
      name: "Raw Consumer GPS L1 (Standard)",
      systemName: "GNSS Multi-Stream Fusion & RTS Smoother",
      stat1: { label: "Up to", value: "88.4%", desc: "lower horizontal RMS error (1.235m vs 10.89m)", ratio: 0.88 },
      stat2: { label: "Benchmark", value: "2,493", desc: "validation epochs vs 2cm NovAtel RTK truth", ratio: 0.95 },
      stat3: { label: "Stability", value: "0.062 m/s", desc: "dead-reckoning drift during 60s tunnel outages", ratio: 0.92 },
    },
    {
      id: "auditor",
      name: "Legacy Productivity Trackers (Screen-Recording Daemons)",
      systemName: "The Silent AI Daily Auditor",
      stat1: { label: "Down to", value: "0.0%", desc: "CPU overhead via Win32 ctypes sensory engine", ratio: 1.0 },
      stat2: { label: "Zero", value: "0 hrs", desc: "ghost work hours via retroactive AFK attribution", ratio: 1.0 },
      stat3: { label: "Meeting Aware", value: "30 min", desc: "relaxed AFK threshold during muted calls", ratio: 0.85 },
    },
    {
      id: "peq",
      name: "Manual Trial-and-Error PEQ Tuning",
      systemName: "AudioSage Residual Auto-PEQ Synthesizer",
      stat1: { label: "Within", value: "≤ 0.5 dB", desc: "residual RMS error against Harman 2019 target", ratio: 0.94 },
      stat2: { label: "DSP Latency", value: "23 ms", desc: "live tab audio capture with 30ms anti-pop crossfade", ratio: 0.90 },
      stat3: { label: "Precision", value: "48 Steps", desc: "steps per frequency decade logarithmic grid search", ratio: 0.88 },
    },
    {
      id: "tokens",
      name: "Verbose JSON LLM Pipelines",
      systemName: "CinemaVault CSV Encoding & Anti-Hallucination",
      stat1: { label: "Up to", value: "60%", desc: "prompt token reduction via pipe-delimited CSV", ratio: 0.60 },
      stat2: { label: "Hallucinations", value: "0.0%", desc: "100% verified against live OMDb API ground truth", ratio: 1.0 },
      stat3: { label: "Routing", value: "3-Tier", desc: "seamless failover (Gemini 3.6 → 2.5 → 2.0)", ratio: 0.92 },
    },
    {
      id: "learning",
      name: "Traditional Scraping & Brute-Force DBs",
      systemName: "AI Learning Companion 2.0",
      stat1: { label: "Query Cut", value: "80%", desc: "slashed DB round-trips from 1+2N+V to 3 queries", ratio: 0.80 },
      stat2: { label: "Perceived Load", value: "0 ms", desc: "client SWR caching + serverless keep-alive pings", ratio: 1.0 },
      stat3: { label: "Retention", value: "SM-2", desc: "atomic PostgreSQL RPC spaced repetition schedule", ratio: 0.96 },
    },
    {
      id: "yt",
      name: "Cloud-Heavy Creator Analytics Tools",
      systemName: "YT Tracker Growth Studio",
      stat1: { label: "Latency", value: "<15 ms", desc: "client-side NLP n-gram clustering in-browser", ratio: 0.88 },
      stat2: { label: "Topic Moats", value: ">60%", desc: "competitor content gap & surge velocity detection", ratio: 0.75 },
      stat3: { label: "Efficiency", value: "Zero Quota", desc: "thread-local client pooling & multi-layer caching", ratio: 1.0 },
    },
    {
      id: "mobile",
      name: "Sluggish Mobile Audio & Cloud Transcribers",
      systemName: "Mobile Voice Recorder & Notes Studio",
      stat1: { label: "Visualizer UI", value: "60 FPS", desc: "decoupled 10Hz dBFS metering without UI re-renders", ratio: 1.0 },
      stat2: { label: "Local Search", value: "<1 ms", desc: "SQLite FTS5 full-text indexing + highlighted snippets", ratio: 0.98 },
      stat3: { label: "Alarms", value: "Exact OS", desc: "bypasses Android Doze mode with lock-screen actions", ratio: 0.95 },
    },
    {
      id: "location",
      name: "Battery-Draining Real-Time Geotrackers",
      systemName: "My Location Diary",
      stat1: { label: "Precision", value: "Sub-10m", desc: "Haversine distance calculation for POI dwell times", ratio: 0.90 },
      stat2: { label: "Verification", value: "1-Click", desc: "out-of-band email verification via Resend API", ratio: 1.0 },
      stat3: { label: "Chronicler", value: "100% Auto", desc: "nightly narrative diary generation via Gemini AI", ratio: 1.0 },
    },
    {
      id: "calorie",
      name: "Cloud-Locked Heavy Nutrition Trackers",
      systemName: "Smart Calorie Tracker App",
      stat1: { label: "Data Entry", value: "0 ms", desc: "zero-latency local persistence via SQLite", ratio: 1.0 },
      stat2: { label: "Ownership", value: "100% Local", desc: "zero external network calls, absolute privacy", ratio: 1.0 },
      stat3: { label: "Calculation", value: "Real-Time", desc: "instant macro-nutrient formula balancing", ratio: 0.95 },
    },
  ];

  const [selectedId, setSelectedId] = useState<string>("gnss");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const current = presets.find((p) => p.id === selectedId) || presets[0];

  // 3 always-visible hero stats
  const heroStats = [
    { label: "Up to", value: "88.4%", desc: "lower GPS error" },
    { label: "Exactly", value: "0.0%", desc: "CPU daemon overhead" },
    { label: "Within", value: "≤ 0.5 dB", desc: "PEQ residual error" },
  ];

  return (
    <section id="compare" className="py-28 px-4 sm:px-12 w-full border-t border-white/10 text-center">
      <div className="max-w-[95vw] 2xl:max-w-[110rem] mx-auto">
        {/* Overline & Heading */}
        <div className="space-y-4 max-w-4xl mx-auto">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand-subtle font-mono">
          The sovereign upgrade
        </span>

        <h2 className="font-sans text-5xl sm:text-7xl md:text-8xl font-bold tracking-tightest-editorial text-white leading-none">
          Most wanted.
        </h2>

        {/* Word-by-Word Scroll-Illuminated Body */}
        <div className="pt-6 max-w-3xl mx-auto text-base sm:text-xl font-normal leading-relaxed text-brand-subtle">
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

      {/* Always-visible: 3 hero stat pills with Odometers */}
      <div className="mt-14 flex flex-wrap justify-center gap-4">
        {heroStats.map((s, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 px-5 py-3 pro-card rounded-full border border-white/10 shadow-lg"
          >
            <span className="text-[10px] font-mono text-brand-subtle uppercase">{s.label}</span>
            <span className="font-sans text-xl font-bold text-white tabular-nums">
              <Odometer value={s.value} />
            </span>
            <span className="text-[11px] text-brand-subtle">{s.desc}</span>
          </div>
        ))}
      </div>

      {/* Expand/collapse toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-8 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-white/15 text-brand-subtle hover:text-white hover:border-white/30 transition-all font-mono text-xs shadow-sm hover:scale-105 active:scale-95"
        data-cursor-interactive="true"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-3.5 h-3.5 text-brand-blue" />
            <span>COLLAPSE BENCHMARK MATRIX</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5 text-brand-blue" />
            <span>COMPARE ALL 9 ARCHITECTURES</span>
          </>
        )}
      </button>

      {/* Collapsible full comparison matrix with Directional Animation */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="comparison-matrix"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE_ENTER }}
            className="overflow-hidden"
          >
            {/* Dropdown Selector */}
            <div ref={dropdownRef} className="pt-12 pb-8 relative max-w-md mx-auto">
              <div className="text-xs text-brand-subtle uppercase tracking-wider mb-2 font-mono">
                Compare with
              </div>

              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-3.5 rounded-full bg-brand-gray/90 border border-white/15 text-white hover:border-white/30 transition-all shadow-xl font-medium text-sm"
                data-cursor-interactive="true"
                aria-expanded={dropdownOpen}
              >
                <span className="truncate">{current.name}</span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-subtle ml-2 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-brand-blue" : ""
                    }`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-[85px] left-0 right-0 z-30 max-h-60 sm:max-h-72 overflow-y-auto overscroll-contain custom-scrollbar rounded-2xl bg-brand-gray/95 backdrop-blur-2xl border border-white/15 shadow-2xl divide-y divide-white/5 text-left"
                  >
                    {presets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedId(preset.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full px-5 py-3 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between text-left ${
                          preset.id === selectedId
                            ? "bg-brand-blue/15 text-brand-blue font-semibold"
                            : "text-brand-text hover:bg-white/5 hover:text-white"
                        }`}
                        data-cursor-interactive="true"
                      >
                        <span className="truncate pr-2">{preset.name}</span>
                        {preset.id === selectedId && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Directional Animated 3-Column Stat Cards with Comparative Progress Bars */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: EASE_ENTER }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
              >
                {[current.stat1, current.stat2, current.stat3].map((stat, i) => (
                  <div key={i} className="p-8 rounded-3xl pro-card text-center space-y-3 relative overflow-hidden">
                    <div className="text-xs text-brand-subtle font-mono uppercase tracking-wider">
                      {stat.label}
                    </div>

                    <div className="font-sans text-4xl sm:text-6xl font-bold text-white tracking-tight flex items-center justify-center">
                      <Odometer value={stat.value} duration={0.65} />
                    </div>

                    {/* Comparative baseline vs engine hairline bars */}
                    <div className="pt-2 pb-1 space-y-1.5 max-w-[12.5rem] mx-auto">
                      <div className="flex items-center justify-between text-[10px] font-mono text-brand-subtle">
                        <span>BASELINE</span>
                        <span>ENGINE</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.ratio * 100}%` }}
                          transition={SPRING_LAYOUT}
                          className="h-full bg-brand-blue rounded-full"
                        />
                      </div>
                    </div>

                    <div className="text-xs text-brand-subtle leading-relaxed pt-1">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
