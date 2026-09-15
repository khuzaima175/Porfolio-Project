"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AcousticVisualizer } from "@/components/specimens/AcousticVisualizer";
import { GNSSSimulator } from "@/components/specimens/GNSSSimulator";
import { SensoryRibbon } from "@/components/specimens/SensoryRibbon";
import { Activity, Compass, Zap } from "lucide-react";

export function SpecimensSection() {
  const [activeTab, setActiveTab] = useState<"acoustic" | "gnss" | "sensory">("acoustic");

  const tabs = [
    { id: "acoustic" as const, icon: Activity, label: "AUDIOSAGE PEQ SYNTHESIZER" },
    { id: "gnss" as const, icon: Compass, label: "GNSS RTS TRAJECTORY FILTER" },
    { id: "sensory" as const, icon: Zap, label: "0.0% CPU SENSORY RIBBON" },
  ];

  return (
    <section id="specimens" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-subtle">
            Show, Don't Tell
          </span>
          <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-apple-tightest text-white leading-tight mt-3">
            Interactive Specimens.
          </h2>
        </div>
        <p className="max-w-md text-sm text-apple-subtle font-normal leading-relaxed">
          Real mathematical models running directly in your browser. 
          Test biquad DSP curves, benchmark GNSS Kalman filtering, and inspect zero-overhead sensory daemons.
        </p>
      </div>

      {/* Specimen Switcher Tabs */}
      <div className="flex flex-wrap gap-3 pb-8 border-b border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-3 font-mono text-xs rounded-full border transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-transparent text-apple-subtle border-white/10 hover:text-white hover:border-white/30"
              }`}
              data-cursor-interactive="true"
            >
              <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? "text-black" : "text-apple-blue"}`} />
              <span>SPECIMEN: {tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Specimen Rendering */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === "acoustic" && <AcousticVisualizer />}
            {activeTab === "gnss" && <GNSSSimulator />}
            {activeTab === "sensory" && <SensoryRibbon />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
