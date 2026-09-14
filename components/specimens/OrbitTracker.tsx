"use client";

import React, { useRef, useCallback } from "react";
import { useIntersectionRaf } from "@/lib/hooks/useIntersectionRaf";

export const OrbitTracker: React.FC = () => {
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
    const t = timestamp * 0.001;

    ctx.clearRect(0, 0, w, h);

    // ECEF / ENU Cartesian Grid
    ctx.strokeStyle = "rgba(20, 22, 26, 0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
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

    // Skyplot Constellation Rings (30°, 60°, 90° elevation)
    [35, 70, 105].forEach((radius) => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(20, 22, 26, 0.12)";
      ctx.stroke();
    });

    // Crosshairs
    ctx.strokeStyle = "rgba(20, 22, 26, 0.2)";
    ctx.beginPath();
    ctx.moveTo(cx - 110, cy);
    ctx.lineTo(cx + 110, cy);
    ctx.moveTo(cx, cy - 110);
    ctx.lineTo(cx, cy + 110);
    ctx.stroke();

    // Satellite Constellation SV nodes (GPS L1 + BeiDou PPP-B2b + Dual L5)
    const satellites = [
      { id: "G07", angle: t * 0.2 + 0.5, r: 85, color: "rgba(44, 90, 160, 0.85)" },
      { id: "B2a", angle: -t * 0.15 + 2.1, r: 60, color: "rgba(44, 90, 160, 0.85)" },
      { id: "G14", angle: t * 0.25 + 3.8, r: 95, color: "rgba(20, 22, 26, 0.7)" },
      { id: "B3i", angle: -t * 0.18 + 5.2, r: 75, color: "rgba(44, 90, 160, 0.85)" },
      { id: "L5_01", angle: t * 0.3 + 1.2, r: 45, color: "rgba(20, 22, 26, 0.7)" },
    ];

    satellites.forEach((sat) => {
      const sx = cx + Math.cos(sat.angle) * sat.r;
      const sy = cy + Math.sin(sat.angle) * sat.r;

      // Draw dashed pseudo-range ray to receiver
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.strokeStyle = "rgba(44, 90, 160, 0.15)";
      ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sat node
      ctx.beginPath();
      ctx.arc(sx, sy, 3, 0, Math.PI * 2);
      ctx.fillStyle = sat.color;
      ctx.fill();

      // Sat ID label
      ctx.fillStyle = "rgba(107, 110, 104, 0.85)";
      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.fillText(sat.id, sx + 5, sy + 3);
    });

    // Dynamic 7-state EKF Confidence Ellipse at Receiver
    const ellipseA = 16 + Math.sin(t * 1.5) * 3;
    const ellipseB = 9 + Math.cos(t * 1.2) * 2;
    const orientation = Math.PI / 4 + Math.sin(t * 0.5) * 0.2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(orientation);

    ctx.beginPath();
    ctx.ellipse(0, 0, ellipseA, ellipseB, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "var(--signal)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "rgba(44, 90, 160, 0.08)";
    ctx.fill();
    ctx.restore();

    // Receiver Ground Truth Node (NovAtel reference)
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "var(--ink)";
    ctx.fill();

    // Raw multipath scatter points (red/gray noise before filter)
    for (let i = 0; i < 6; i++) {
      const scatterAngle = t * 0.8 + i * 1.1;
      const scatterDist = 18 + ((i * 7) % 15);
      const px = cx + Math.cos(scatterAngle) * scatterDist;
      const py = cy + Math.sin(scatterAngle) * scatterDist;

      ctx.beginPath();
      ctx.arc(px, py, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(107, 110, 104, 0.4)";
      ctx.fill();
    }

    // Telemetry footer
    ctx.fillStyle = "rgba(20, 22, 26, 0.7)";
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillText("RTS SMOOTHED: 1.235m RMS", 10, h - 10);
    ctx.fillText("RTK RESIDUAL: 88.4% VAR REDUCTION", w - 190, h - 10);
  }, []);

  useIntersectionRaf(containerRef, renderFrame);

  return (
    <div ref={containerRef} className="w-full h-full relative flex flex-col justify-center">
      <canvas
        ref={canvasRef}
        width={420}
        height={260}
        className="w-full h-auto max-w-[420px] max-h-[260px] border border-line block mx-auto bg-surface"
      />
      <div className="flex justify-between items-center text-[10px] font-mono text-ink-muted px-4 mt-2">
        <span>3D ECEF INVERSE-VARIANCE</span>
        <span className="text-signal">7-STATE EKF CONVERGED</span>
      </div>
    </div>
  );
};

export default OrbitTracker;
