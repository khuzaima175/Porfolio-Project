"use client";

import React, { useEffect, useRef } from "react";
import { FrameTicks } from "@/components/ui/FrameTicks";

interface HeroProps {
  onExploreWork: () => void;
  onExploreSignalChain: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onExploreSignalChain,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live algorithmic SVG/Canvas instrument: EKF dispersion ellipse & oscilloscope trace
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Instrument coordinate grid
      ctx.strokeStyle = "rgba(20, 22, 26, 0.06)";
      ctx.lineWidth = 1;
      const step = 24;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center crosshairs
      const cx = w / 2;
      const cy = h / 2;
      ctx.strokeStyle = "rgba(20, 22, 26, 0.15)";
      ctx.beginPath();
      ctx.moveTo(cx - 15, cy);
      ctx.lineTo(cx + 15, cy);
      ctx.moveTo(cx, cy - 15);
      ctx.lineTo(cx, cy + 15);
      ctx.stroke();

      // Dynamic 7-state EKF confidence ellipse
      const a = 64 + Math.sin(t * 0.8) * 12;
      const b = 38 + Math.cos(t * 0.9) * 8;
      const rotation = t * 0.3;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.strokeStyle = "rgba(44, 90, 160, 0.5)"; // --signal with alpha
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.ellipse(0, 0, a, b, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Oscilloscope signal wave along the bottom third
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(44, 90, 160, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const freq1 = Math.sin(x * 0.04 + t * 2) * 14;
        const freq2 = Math.sin(x * 0.08 - t * 1.5) * 6;
        const envelope = Math.sin((x / w) * Math.PI); // tapering envelope
        const y = h * 0.72 + (freq1 + freq2) * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto"
    >
      {/* Top Telemetry Baseline Row */}
      <div className="flex items-center justify-between border-b border-line pb-3 text-xs text-ink-muted">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-1.5 h-1.5 bg-signal" />
          <span>SPEC-001 // LABORATORY INSTRUMENT</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 font-mono text-[11px]">
          <span>EKF 7-STATE RESIDUAL</span>
          <span className="text-ink font-medium">1.235m RMS</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-12 items-center">
        {/* Left Column: Headline & Supporting statement */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink leading-[1.08] max-w-2xl">
            Engineering signal pipelines, spatial estimators, and intelligent local software.
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed mt-6 max-w-xl">
            Architecting real-time DSP biquad filter suites, multi-constellation GNSS Kalman
            estimators, and zero-overhead Windows background daemons with verified telemetry.
          </p>

          {/* Action Row in sentence case */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={onExploreWork}
              className="px-5 py-2.5 bg-ink text-surface text-xs font-medium hover:bg-signal transition-colors flex items-center gap-2"
            >
              <span>Selected work</span>
              <span className="font-mono text-[11px]">↓</span>
            </button>
            <button
              onClick={onExploreSignalChain}
              className="px-5 py-2.5 bg-surface-2 text-ink border border-line text-xs font-medium hover:border-line-heavy transition-colors"
            >
              Interactive signal chain
            </button>
          </div>
        </div>

        {/* Right Column: Algorithmic Specimen Display */}
        <div className="lg:col-span-5 relative">
          <div className="relative border border-line bg-surface-2 p-3 sm:p-4">
            <FrameTicks />

            {/* Specimen Header */}
            <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted pb-2 border-b border-line mb-3">
              <span>DISPERSION_ELLIPSE_V2</span>
              <span className="text-signal">60 FPS REALTIME</span>
            </div>

            {/* Canvas instrument */}
            <canvas
              ref={canvasRef}
              width={420}
              height={260}
              className="w-full h-auto bg-surface border border-line block"
            />

            {/* Specimen Metadata Footer */}
            <div className="flex items-center justify-between text-[10px] font-mono text-ink-muted pt-2.5 mt-2 border-t border-line">
              <span>COV(X, Y) DIAGONALIZED</span>
              <span>CHI-SQ GATE: 99.7%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Section index & Right-edge Scroll Cue */}
      <div className="flex items-end justify-between border-t border-line pt-4 text-xs text-ink-muted relative">
        <div className="flex items-center gap-6">
          <span className="font-mono text-[11px]">S1 // THE INSTRUMENT</span>
          <span className="hidden sm:inline">Laboratory ground · Zero fabricated metrics</span>
        </div>

        {/* Scroll cue: thin vertical line with traveling 4px --signal dot on 2.4s loop */}
        <div className="flex items-center gap-2">
          <span className="text-[11px]">Scroll to calibrate</span>
          <div className="relative w-[1px] h-10 bg-line-heavy overflow-hidden">
            <div
              className="absolute left-[-1.5px] w-[4px] h-[4px] rounded-full bg-signal"
              style={{
                animation: "scrollDotTravel 2.4s linear infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Embedded Keyframe style for the scroll cue traveling dot */}
      <style jsx>{`
        @keyframes scrollDotTravel {
          0% {
            top: 0%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
