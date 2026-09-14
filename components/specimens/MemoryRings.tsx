"use client";

import React, { useRef, useCallback } from "react";
import { useIntersectionRaf } from "@/lib/hooks/useIntersectionRaf";

export const MemoryRings: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderFrame = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // SM-2 Review Intervals: [1, 3, 7, 14, 30, 90, 180] days
    const intervals = [1, 3, 7, 14, 30, 90, 180];
    const t = timestamp * 0.001;

    // Draw background concentric coordinate grid
    ctx.strokeStyle = "rgba(20, 22, 26, 0.08)";
    ctx.lineWidth = 1;
    for (let r = 25; r <= 160; r += 25) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Dynamic SM-2 retention decay rings
    intervals.forEach((days, i) => {
      // Retention rate R = e^(-t / S)
      const phase = (t * 0.8 + i * 0.5) % Math.PI;
      const decay = Math.exp(-phase * 0.4);
      const baseRadius = 25 + i * 18;
      const currentRadius = baseRadius + Math.sin(t + i) * 3;

      // Ring stroke
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle =
        i === 2
          ? "rgba(44, 90, 160, 0.9)" // --signal highlight for day 7
          : `rgba(20, 22, 26, ${0.12 + decay * 0.25})`;
      ctx.lineWidth = i === 2 ? 2 : 1.2;
      ctx.stroke();

      // Traveling recall packet on ring
      const angle = t * (0.8 / (i + 1)) + i;
      const px = cx + Math.cos(angle) * currentRadius;
      const py = cy + Math.sin(angle) * currentRadius;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = i === 2 ? "var(--signal)" : "var(--ink)";
      ctx.fill();

      // Day label
      if (i % 2 === 0) {
        ctx.fillStyle = "rgba(107, 110, 104, 0.8)";
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(`+${days}d`, cx + currentRadius - 10, cy - 4);
      }
    });

    // Center focal point
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = "var(--signal)";
    ctx.fill();
  }, []);

  useIntersectionRaf(containerRef, renderFrame);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={380}
        height={320}
        className="w-full h-full max-w-[380px] max-h-[320px] block"
      />
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-ink-muted">
        SM-2 DECAY: R = e^(-t/S)
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-signal">
        OPTIMAL SPACING
      </div>
    </div>
  );
};

export default MemoryRings;
