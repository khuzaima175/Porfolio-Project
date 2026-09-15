"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, Compass } from "lucide-react";

export function GNSSSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showRaw, setShowRaw] = useState(true);
  const [showRTS, setShowRTS] = useState(true);
  const [simBlackout, setSimBlackout] = useState(false);
  const [epoch, setEpoch] = useState(420);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = epoch;

    const render = () => {
      if (isPlaying) {
        t += 0.5;
        if (t > 1200) t = 0;
        setEpoch(Math.round(t));
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Coordinate center
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw subtle geodetic grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Trajectory mathematical formula (Lissajous / racetrack curve simulating 20 KM drive)
      const getRTKPoint = (timeVal: number) => {
        const rad = timeVal * 0.015;
        const x = cx + 240 * Math.sin(rad) + 50 * Math.cos(2 * rad);
        const y = cy + 100 * Math.cos(rad) + 30 * Math.sin(3 * rad);
        return { x, y };
      };

      // 1. Draw Ground Truth Path (NovAtel ProPak6 2cm NRTK)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 450; i += 2) {
        const pt = getRTKPoint(i * 2.5);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      // 2. Draw Raw GPS L1 (High Variance / Noisy)
      if (showRaw) {
        ctx.strokeStyle = "rgba(255, 180, 50, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 450; i += 3) {
          const pt = getRTKPoint(i * 2.5);
          // Noise variance simulating 10.89m RMS
          const noiseX = Math.sin(i * 12.3) * 16 + Math.cos(i * 5.1) * 8;
          const noiseY = Math.cos(i * 8.7) * 14 + Math.sin(i * 3.4) * 9;
          const rx = pt.x + noiseX;
          const ry = pt.y + noiseY;
          if (i === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.stroke();
      }

      // 3. Draw RTS Backward Smoothed Trajectory (1.235m RMS)
      if (showRTS) {
        ctx.strokeStyle = "#2997ff";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i < 450; i += 2) {
          const pt = getRTKPoint(i * 2.5);
          // Tight residual ~1.2m
          const smoothNoiseX = Math.sin(i * 0.8) * 2.2;
          const smoothNoiseY = Math.cos(i * 0.8) * 1.8;
          const sx = pt.x + smoothNoiseX;
          const sy = pt.y + smoothNoiseY;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // Current Vehicle Head Position
      const currentRTK = getRTKPoint(t);
      const blackoutOffset = simBlackout ? Math.sin((t % 60) * 0.1) * 12 : 0;

      // Draw Vehicle marker (RTK)
      ctx.fillStyle = "#f5f5f7";
      ctx.beginPath();
      ctx.arc(currentRTK.x, currentRTK.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Filtered RTS estimate with uncertainty ellipse
      if (showRTS) {
        ctx.strokeStyle = "#2997ff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(
          currentRTK.x + blackoutOffset,
          currentRTK.y + blackoutOffset * 0.5,
          simBlackout ? 14 : 7,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, showRaw, showRTS, simBlackout]);

  return (
    <div className="apple-card rounded-3xl p-6 sm:p-8 mt-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-apple-blue">
            <Compass className="w-3.5 h-3.5" />
            <span>GNSS MULTI-STREAM FUSION // BENCHMARK BENCH</span>
          </div>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mt-1 tracking-apple-tight">
            Rauch-Tung-Striebel (RTS) Trajectory Filter Simulator
          </h3>
        </div>

        {/* Live Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-white hover:border-apple-blue transition-all"
            data-cursor-interactive="true"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-apple-blue" /> : <Play className="w-3 h-3 text-emerald-400" />}
            <span>{isPlaying ? "PAUSE" : "RESUME"}</span>
          </button>

          <button
            onClick={() => setSimBlackout(!simBlackout)}
            className={`flex items-center space-x-2 px-4 py-2 font-mono text-xs rounded-full border transition-all ${
              simBlackout
                ? "bg-amber-950/40 border-amber-500 text-amber-300"
                : "bg-white/5 border-white/10 text-apple-subtle hover:text-white"
            }`}
            data-cursor-interactive="true"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>TUNNEL BLACKOUT [{simBlackout ? "ACTIVE" : "OFF"}]</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative my-6 bg-black/60 border border-white/10 rounded-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={760}
          height={320}
          className="w-full h-auto block select-none"
        />

        {/* Floating Telemetry HUD */}
        <div className="absolute top-3 left-4 space-y-1 font-mono text-[11px] text-apple-subtle bg-black/80 backdrop-blur-xl p-3 border border-white/10 rounded-2xl">
          <div className="flex items-center space-x-3">
            <span className="text-apple-subtle">EPOCH:</span>
            <span className="text-white font-semibold tabular-nums">{epoch} / 2493</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-apple-subtle">DRIFT RATE:</span>
            <span className="text-emerald-400 font-semibold tabular-nums">
              {simBlackout ? "0.062 m/s (DR)" : "0.003 m/s"}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-apple-subtle">RAIM STATUS:</span>
            <span className="text-white flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>LODO-CV LOCKED</span>
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 right-4 flex flex-wrap items-center gap-4 font-mono text-[10px] bg-black/80 backdrop-blur-xl p-2.5 border border-white/10 rounded-2xl">
          <button
            onClick={() => setShowRTS(!showRTS)}
            className="flex items-center space-x-1.5 text-white hover:text-apple-blue"
          >
            <span className="w-3 h-1 bg-apple-blue rounded-full" />
            <span>RTS Smoothed (1.235m RMS)</span>
          </button>
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="flex items-center space-x-1.5 text-amber-300 hover:text-amber-200"
          >
            <span className="w-3 h-0.5 bg-amber-400 rounded-full" />
            <span>Raw GPS SPP L1 (10.89m RMS)</span>
          </button>
          <div className="flex items-center space-x-1.5 text-apple-subtle">
            <span className="w-3 h-0.5 bg-white/40 rounded-full" />
            <span>NovAtel 2cm RTK Truth</span>
          </div>
        </div>
      </div>

      {/* Benchmark Comparisons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-apple-subtle text-[10px]">RAW CONSUMER GPS</div>
          <div className="font-sans text-lg text-amber-400 font-bold mt-1">10.89 m RMS</div>
          <div className="text-apple-subtle text-[11px] mt-0.5">High multipath and ionospheric delay</div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-apple-subtle text-[10px]">RTS BACKWARD SMOOTHER</div>
          <div className="font-sans text-lg text-apple-blue font-bold mt-1">1.235 m RMS</div>
          <div className="text-apple-subtle text-[11px] mt-0.5">88.4% error reduction (p = 9.3e-6)</div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-apple-subtle text-[10px]">TUNNEL DEAD-RECKONING</div>
          <div className="font-sans text-lg text-white font-bold mt-1">0.062 m/s</div>
          <div className="text-apple-subtle text-[11px] mt-0.5">Tested across 60s total signal outage</div>
        </div>
      </div>
    </div>
  );
}
