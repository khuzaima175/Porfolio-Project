"use client";

import { useState } from "react";
import { Cpu, Shield, Mic, Clock, Zap } from "lucide-react";

interface TimeBlock {
  hour: number;
  label: string;
  type: "focus" | "meeting" | "idle" | "rest";
  windowTitle: string;
  cpu: string;
  audioActive: boolean;
  afkRelaxed: boolean;
}

export function SensoryRibbon() {
  const [selectedHour, setSelectedHour] = useState<number>(14);

  // 24-hour synthetic timeline demonstrating daily tracking
  const blocks: TimeBlock[] = Array.from({ length: 24 }, (_, i) => {
    if (i >= 0 && i < 8) {
      return {
        hour: i,
        label: `${i.toString().padStart(2, "0")}:00`,
        type: "rest",
        windowTitle: "System Standby (UTC-anchored time.monotonic)",
        cpu: "0.0%",
        audioActive: false,
        afkRelaxed: false,
      };
    } else if (i === 10 || i === 11) {
      return {
        hour: i,
        label: `${i.toString().padStart(2, "0")}:00`,
        type: "meeting",
        windowTitle: "meet.google.com/xyz-arch-review — CoreAudio Stream Active",
        cpu: "0.0%",
        audioActive: true,
        afkRelaxed: true,
      };
    } else if (i >= 9 && i <= 17) {
      return {
        hour: i,
        label: `${i.toString().padStart(2, "0")}:00`,
        type: "focus",
        windowTitle: "nvim [gnss_fusion.py] · PowerShell Terminal (Win32 ctypes)",
        cpu: "0.0%",
        audioActive: false,
        afkRelaxed: false,
      };
    } else if (i === 13) {
      return {
        hour: i,
        label: `${i.toString().padStart(2, "0")}:00`,
        type: "idle",
        windowTitle: "Lunch / AFK (Retroactively Reattributed)",
        cpu: "0.0%",
        audioActive: false,
        afkRelaxed: false,
      };
    } else {
      return {
        hour: i,
        label: `${i.toString().padStart(2, "0")}:00`,
        type: "focus",
        windowTitle: "Cursor IDE · Vite Dev Server · Local LLM Pipeline",
        cpu: "0.0%",
        audioActive: false,
        afkRelaxed: false,
      };
    }
  });

  const current = blocks.find((b) => b.hour === selectedHour) || blocks[14];

  return (
    <div className="apple-card rounded-3xl p-6 sm:p-8 mt-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-apple-blue">
            <Zap className="w-3.5 h-3.5" />
            <span>THE SILENT AI AUDITOR // SENSORY ENGINE</span>
          </div>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mt-1 tracking-apple-tight">
            24-Hour Biological Day Ribbon & Zero-CPU Engine
          </h3>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <div className="flex items-center space-x-1.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <Cpu className="w-3 h-3 text-apple-blue" />
            <span className="text-apple-subtle">CPU IMPACT:</span>
            <span className="text-emerald-400 font-bold tabular-nums">0.0% MEASURABLE</span>
          </div>
        </div>
      </div>

      {/* 24-Hour Interactive Ribbon */}
      <div className="my-6">
        <div className="text-[11px] font-mono text-apple-subtle mb-2 flex justify-between">
          <span>00:00 (MIDNIGHT)</span>
          <span>SCRUB 24H BIOLOGICAL DAY TO INSPECT TELEMETRY</span>
          <span>23:59</span>
        </div>

        <div className="grid grid-cols-24 gap-1 h-12 bg-black/60 p-1 border border-white/10 rounded-2xl">
          {blocks.map((b) => {
            const isSelected = b.hour === selectedHour;
            let bgColor = "bg-white/10";
            if (b.type === "focus") bgColor = "bg-apple-blue";
            else if (b.type === "meeting") bgColor = "bg-amber-500";
            else if (b.type === "idle") bgColor = "bg-apple-subtle/40";
            else if (b.type === "rest") bgColor = "bg-white/5";

            return (
              <button
                key={b.hour}
                onClick={() => setSelectedHour(b.hour)}
                onMouseEnter={() => setSelectedHour(b.hour)}
                className={`relative h-full rounded-sm transition-all ${bgColor} ${
                  isSelected ? "ring-2 ring-white z-10 scale-105" : "hover:opacity-80"
                }`}
                title={`${b.label} - ${b.type.toUpperCase()}`}
                data-cursor-interactive="true"
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mt-3 font-mono text-[11px] text-apple-subtle">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-apple-blue" />
            <span>High-Speed Engineering Flow</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
            <span>CoreAudio Muted/Silent Meeting (AFK Relaxed)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-apple-subtle/40" />
            <span>Retroactive AFK Interval</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-white/5 border border-white/10" />
            <span>System Standby / Rest</span>
          </div>
        </div>
      </div>

      {/* Selected Hour Telemetry Inspector Card */}
      <div className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-apple-subtle pb-2 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-apple-blue" />
            <span className="text-white font-semibold">{current.label} UTC+5</span>
            <span className="uppercase text-apple-blue font-medium">[{current.type}]</span>
          </div>
          <span>ATOMIC WIN32 CTYPES POLLING // 5000ms INTERVAL</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div>
            <div className="text-apple-subtle text-[10px]">FOREGROUND WINDOW TITLE</div>
            <div className="text-white truncate font-medium mt-0.5">{current.windowTitle}</div>
          </div>
          <div>
            <div className="text-apple-subtle text-[10px]">COREAUDIO INSPECTION (PYCAW)</div>
            <div className="text-white flex items-center space-x-1.5 mt-0.5">
              <Mic className="w-3 h-3 text-apple-blue" />
              <span>{current.audioActive ? "Active Audio Stream Detected" : "No Audio Stream"}</span>
            </div>
          </div>
          <div>
            <div className="text-apple-subtle text-[10px]">AFK BOUNDARY RELAXATION</div>
            <div className="text-white mt-0.5">
              {current.afkRelaxed ? "Extended to 30m (Meeting Mode)" : "Standard 5m Threshold"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
