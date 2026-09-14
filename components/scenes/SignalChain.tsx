"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SIGNAL_STAGES, SignalStage, StageTool } from "@/lib/data/projects";
import { FrameTicks } from "@/components/ui/FrameTicks";
import { Sparkline } from "@/components/ui/Sparkline";
import { useIntersectionRaf } from "@/lib/hooks/useIntersectionRaf";

export const SignalChain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStage, setSelectedStage] = useState<SignalStage>(SIGNAL_STAGES[0]);
  const [hoveredTool, setHoveredTool] = useState<StageTool | null>(null);
  const [pulseActive, setPulseActive] = useState<boolean>(false);
  const [pulseCycle, setPulseCycle] = useState<number>(0);
  const [pulseProgress, setPulseProgress] = useState<number>(0);

  // Trigger enter-pulse (exactly 3 cycles, then rest)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cyclesCount = 0;
    let animId: number;
    let startTimestamp: number | null = null;
    const cycleDuration = 1800; // 1.8s per pulse cycle

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cyclesCount < 3 && !pulseActive) {
          setPulseActive(true);
          const loop = (time: number) => {
            if (!startTimestamp) startTimestamp = time;
            const elapsed = time - startTimestamp;
            const progress = (elapsed % cycleDuration) / cycleDuration;
            setPulseProgress(progress);

            const currentCycle = Math.floor(elapsed / cycleDuration);
            setPulseCycle(currentCycle);

            if (currentCycle >= 3) {
              setPulseActive(false);
              setPulseProgress(0);
              return;
            }

            animId = requestAnimationFrame(loop);
          };
          animId = requestAnimationFrame(loop);
        }
      },
      { rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [pulseActive]);

  // Replay simulation on demand
  const handleRunSimulation = () => {
    if (pulseActive) return;
    setPulseActive(true);
    let start: number | null = null;
    const duration = 2000;

    const loop = (time: number) => {
      if (!start) start = time;
      const progress = Math.min(1, (time - start) / duration);
      setPulseProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(loop);
      } else {
        setTimeout(() => {
          setPulseActive(false);
          setPulseProgress(0);
        }, 150);
      }
    };
    requestAnimationFrame(loop);
  };

  // Check if a tool is a downstream dependent of the hovered tool
  const isDownstreamHighlighted = useCallback(
    (toolName: string) => {
      if (!hoveredTool) return false;
      return hoveredTool.downstreamIds.includes(toolName);
    },
    [hoveredTool]
  );

  return (
    <section
      id="signal-chain"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-line relative"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 text-xs text-ink-muted gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono">S5 // SIGNAL CHAIN</span>
          <span>Interactive capabilities pipeline & authentic dependency graph</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleRunSimulation}
            disabled={pulseActive}
            className="px-3 py-1 bg-surface-2 border border-line hover:border-signal text-ink font-mono text-[11px] transition-colors disabled:opacity-50"
          >
            {pulseActive ? "PULSING..." : "▶ RUN SIMULATION"}
          </button>
        </div>
      </div>

      {/* Pipeline Description */}
      <div className="mt-8 mb-6 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-ink">
          The physical path of verified data.
        </h2>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Hover any tool chip to trace its downstream consumers across the pipeline.
          Click a stage block to open its technical telemetry drawer.
        </p>
      </div>

      {/* 4 Connected Pipeline Stages Diagram */}
      <div className="relative mt-8">
        {/* Connection Hairlines with Traveling Pulse Dot */}
        <div className="hidden lg:block absolute top-[52px] left-0 w-full h-[1px] bg-line z-0">
          {pulseActive && (
            <div
              className="absolute -top-[3px] w-[7px] h-[7px] bg-signal shadow-[0_0_8px_var(--signal)] pointer-events-none transition-all"
              style={{
                left: `${pulseProgress * 100}%`,
              }}
            />
          )}
        </div>

        {/* 4 Stage Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {SIGNAL_STAGES.map((stage, idx) => {
            const isSelected = selectedStage.id === stage.id;
            return (
              <div
                key={stage.id}
                id={`stage-block-${idx}`}
                onClick={() => setSelectedStage(stage)}
                className={`border p-4 transition-all duration-200 cursor-pointer relative bg-surface-2 ${
                  isSelected
                    ? "border-signal shadow-sm"
                    : "border-line hover:border-line-heavy"
                }`}
              >
                <FrameTicks />

                {/* Stage Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted pb-2 border-b border-line mb-3">
                  <span className="font-semibold text-ink">STAGE_0{idx + 1}</span>
                  <span className={isSelected ? "text-signal" : ""}>
                    {idx < 3 ? "──▶" : "ENDPOINT"}
                  </span>
                </div>

                {/* Stage Title in Sentence Case */}
                <h3 className="text-base font-medium text-ink tracking-tight">
                  {stage.name}
                </h3>
                <p className="text-[11px] text-ink-muted mt-1 min-h-[32px] leading-snug">
                  {stage.subtitle}
                </p>

                {/* Tool Chips with Authentic Downstream Tracing */}
                <div className="mt-4 pt-3 border-t border-line space-y-1.5">
                  <div className="text-[10px] font-mono text-ink-muted uppercase">
                    Core tools & nodes
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {stage.tools.map((tool) => {
                      const isHovered = hoveredTool?.name === tool.name;
                      const isHighlighted = isDownstreamHighlighted(tool.name);

                      return (
                        <span
                          key={tool.name}
                          onMouseEnter={() => setHoveredTool(tool)}
                          onMouseLeave={() => setHoveredTool(null)}
                          className={`text-[11px] px-2 py-0.5 border transition-all duration-150 cursor-pointer ${
                            isHovered
                              ? "bg-signal text-surface border-signal"
                              : isHighlighted
                              ? "bg-signal-subtle border-signal text-signal font-medium ring-1 ring-signal"
                              : "bg-surface border-line text-ink hover:border-line-heavy"
                          }`}
                        >
                          {tool.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Benchmark Tag */}
                <div className="mt-4 pt-2.5 border-t border-line flex items-center justify-between text-[11px]">
                  <span className="text-ink-muted">{stage.benchmark.label}</span>
                  <span className="font-mono font-medium text-ink tabular-nums">
                    {stage.benchmark.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expandable Technical Terminal Drawer for Selected Stage */}
      <div className="mt-6 border border-line bg-surface p-6 relative">
        <FrameTicks />

        <div className="flex items-center justify-between border-b border-line pb-3 text-xs text-ink-muted mb-4 font-mono">
          <span>TERMINAL DRAWER // {selectedStage.name.toUpperCase()}</span>
          <span className="text-signal">STATUS: VERIFIED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Stage Detail & Benchmark */}
          <div className="md:col-span-7">
            <h4 className="text-xl font-medium text-ink tracking-tight">
              {selectedStage.name} Architecture
            </h4>
            <p className="text-sm text-ink-muted mt-2 leading-relaxed">
              {selectedStage.subtitle}. Operating within constrained compute ceilings to guarantee
              deterministic execution and real-time response.
            </p>

            <div className="mt-4 p-3 bg-surface-2 border border-line text-xs">
              <div className="font-mono font-medium text-ink">
                Verified Benchmark: {selectedStage.benchmark.value}
              </div>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                {selectedStage.benchmark.context}
              </p>
            </div>
          </div>

          {/* Right Column: Stage Real-Time Sparkline */}
          <div className="md:col-span-5 border-l border-line md:pl-6 flex flex-col justify-center">
            <div className="text-[11px] font-mono text-ink-muted mb-2 flex justify-between">
              <span>MEASURED RESIDUAL CONVERGENCE</span>
              <span className="text-ink font-medium">9 SAMPLES</span>
            </div>
            <div className="p-3 bg-surface-2 border border-line flex items-center justify-center">
              <Sparkline
                data={selectedStage.sparklineData}
                width={280}
                height={60}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignalChain;
