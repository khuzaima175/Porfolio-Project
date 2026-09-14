"use client";

import React, { useRef, useCallback } from "react";
import { useIntersectionRaf } from "@/lib/hooks/useIntersectionRaf";

export const TerminalTelemetry: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const logsRef = useRef<Array<{ text: string; time: string; color: string }>>([
    { text: "ctypes.windll.user32.GetForegroundWindow() -> 0x00140E2A", time: "12:00:01", color: "rgba(20, 22, 26, 0.7)" },
    { text: "CoreAudio: pycaw audio_sessions -> active [teams.exe]", time: "12:00:06", color: "rgba(44, 90, 160, 0.9)" },
    { text: "AFK threshold relaxed: 30m meeting mode latched", time: "12:00:06", color: "rgba(20, 22, 26, 0.7)" },
    { text: "gap_calc: monotonic delta 5.001s, drift: 0.000ms", time: "12:00:11", color: "rgba(20, 22, 26, 0.7)" },
    { text: "atomic_persist: state flushed in 4.2ms to journal.json", time: "12:00:16", color: "rgba(44, 90, 160, 0.9)" },
    { text: "CPU sensory load: 0.00% (Win32 event poll thread idle)", time: "12:00:21", color: "rgba(20, 22, 26, 0.7)" },
  ]);

  const lastUpdateRef = useRef<number>(0);

  const renderFrame = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Periodically cycle telemetry lines
    if (timestamp - lastUpdateRef.current > 1200) {
      lastUpdateRef.current = timestamp;
      const ms = Math.floor(timestamp % 1000).toString().padStart(3, "0");
      const cpuVal = (Math.random() * 0.02).toFixed(2);
      const newEntries = [
        `win32_idle_tick: GetLastInputInfo -> active [idle: 0s]`,
        `atomic_json: committed journal block [${(Math.random() * 3 + 2).toFixed(1)}ms]`,
        `powermetrics: daemon CPU ${cpuVal}% (below 0.1% floor)`,
        `pycaw: CoreAudio endpoint muted -> false`,
        `gemini_eod: single prompt distillation ready (9 sections)`,
      ];
      const randomEntry = newEntries[Math.floor(Math.random() * newEntries.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${ms}`;

      logsRef.current = [
        ...logsRef.current.slice(1),
        {
          text: randomEntry,
          time: timeStr,
          color: randomEntry.includes("CPU") || randomEntry.includes("atomic") ? "rgba(44, 90, 160, 0.95)" : "rgba(20, 22, 26, 0.75)",
        },
      ];
    }

    ctx.clearRect(0, 0, w, h);

    // Terminal canvas background
    ctx.fillStyle = "rgba(226, 228, 221, 0.5)"; // --surface-2 tint
    ctx.fillRect(0, 0, w, h);

    // Header bar
    ctx.fillStyle = "rgba(20, 22, 26, 0.1)";
    ctx.fillRect(0, 0, w, 22);

    ctx.fillStyle = "rgba(20, 22, 26, 0.6)";
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillText("DAEMON TELEMETRY FEED // WIN32 NATIVE CTYPES", 10, 15);
    ctx.fillText("CPU: 0.0%", w - 65, 15);

    // Render log lines
    ctx.font = "10px 'JetBrains Mono', monospace";
    const lineHeight = 18;
    const startY = 42;

    logsRef.current.forEach((log, idx) => {
      const y = startY + idx * lineHeight;
      ctx.fillStyle = "rgba(107, 110, 104, 0.8)";
      ctx.fillText(log.time, 10, y);

      ctx.fillStyle = log.color;
      ctx.fillText(`> ${log.text}`, 95, y);
    });

    // Blinking terminal cursor
    if (Math.floor(timestamp / 500) % 2 === 0) {
      const cursorY = startY + logsRef.current.length * lineHeight;
      ctx.fillStyle = "var(--signal)";
      ctx.fillRect(95, cursorY - 9, 6, 11);
    }
  }, []);

  useIntersectionRaf(containerRef, renderFrame);

  return (
    <div ref={containerRef} className="w-full h-full relative flex flex-col justify-center">
      <canvas
        ref={canvasRef}
        width={420}
        height={240}
        className="w-full h-auto max-w-[420px] max-h-[240px] border border-line block mx-auto"
      />
    </div>
  );
};

export default TerminalTelemetry;
