"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { useIntersectionRaf } from "@/lib/hooks/useIntersectionRaf";

export const Oscilloscope: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorXRef = useRef<number>(0.5); // normalized [0, 1]
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    cursorXRef.current = x;
  };

  const renderFrame = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const t = timestamp * 0.001;

      // Filter sweep parameter
      let sweep = cursorXRef.current;
      if (isMobile) {
        // Pre-baked autonomous sweep sequence on mobile
        sweep = 0.5 + 0.4 * Math.sin(t * 1.2);
      }

      ctx.clearRect(0, 0, w, h);

      // Coordinate grid: 1-1.5-2-3-4-6-8 decade ticks
      ctx.strokeStyle = "rgba(20, 22, 26, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Zero dB reference baseline
      const zeroY = h * 0.5;
      ctx.strokeStyle = "rgba(20, 22, 26, 0.25)";
      ctx.beginPath();
      ctx.moveTo(0, zeroY);
      ctx.lineTo(w, zeroY);
      ctx.stroke();

      // Harman In-Ear 2019 Target Curve (static reference line)
      ctx.strokeStyle = "rgba(107, 110, 104, 0.5)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const normX = x / w;
        // Approximation of Harman in-ear pinna gain and sub-bass shelf
        const bassShelf = Math.exp(-normX * 5) * 22;
        const earGain = Math.exp(-Math.pow((normX - 0.65) * 6, 2)) * 32;
        const targetY = zeroY - bassShelf - earGain + 12;
        if (x === 0) ctx.moveTo(x, targetY);
        else ctx.lineTo(x, targetY);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Real-time Biquad Parametric PEQ Curve responding to sweep
      ctx.strokeStyle = "var(--signal)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();

      const notchCenter = sweep * w;
      const q = 2.0;

      for (let x = 0; x < w; x++) {
        const normX = x / w;
        const bassShelf = Math.exp(-normX * 5) * 22;
        const earGain = Math.exp(-Math.pow((normX - 0.65) * 6, 2)) * 32;

        // Interactive biquad notch filter sweep
        const dist = Math.abs(x - notchCenter);
        const notchGain = Math.exp(-Math.pow(dist / (35 / q), 2)) * 26;

        // Real-time acoustic oscillation wave
        const wave = Math.sin(normX * 24 + t * 4) * 4;

        const eqY = zeroY - bassShelf - earGain + notchGain + wave + 12;
        if (x === 0) ctx.moveTo(x, eqY);
        else ctx.lineTo(x, eqY);
      }
      ctx.stroke();

      // Notch center crosshair
      ctx.strokeStyle = "rgba(44, 90, 160, 0.6)";
      ctx.beginPath();
      ctx.moveTo(notchCenter, 0);
      ctx.lineTo(notchCenter, h);
      ctx.stroke();

      // Target frequency readout
      const freqHz = Math.round(20 * Math.pow(1000, sweep));
      ctx.fillStyle = "rgba(20, 22, 26, 0.7)";
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillText(`Fc: ${freqHz}Hz`, notchCenter + 5, 20);
      ctx.fillText("PEQ RESIDUAL: 0.48dB RMS", 10, h - 10);
    },
    [isMobile]
  );

  useIntersectionRaf(containerRef, renderFrame);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative flex flex-col justify-center cursor-ew-resize"
    >
      <canvas
        ref={canvasRef}
        width={420}
        height={240}
        className="w-full h-auto max-w-[420px] max-h-[240px] border border-line block mx-auto bg-surface"
      />
      <div className="flex justify-between items-center text-[10px] font-mono text-ink-muted px-4 mt-2">
        <span>20 Hz (SUB)</span>
        <span className="text-signal">{isMobile ? "AUTO SWEEP CYCLE" : "DRAG / HOVER TO SWEEP PEQ"}</span>
        <span>20 kHz (AIR)</span>
      </div>
    </div>
  );
};

export default Oscilloscope;
