"use client";

import React, { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  useEffect(() => {
    // Skip on session revisit
    if (typeof window !== "undefined") {
      const alreadyCalibrated = sessionStorage.getItem("signal_calibrated");
      if (alreadyCalibrated) {
        setShouldRender(false);
        onComplete();
        return;
      }
    }

    const duration = 900; // <= 1.0s requirement
    const interval = 15;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.round((currentStep / steps) * 100));
      setCount(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("signal_calibrated", "true");
          }
          setTimeout(() => {
            setShouldRender(false);
            onComplete();
          }, 350); // fast 0.35s wipe
        }, 100);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col justify-between bg-surface p-8 sm:p-12 transition-transform duration-350 ease-e-io ${
        isDone ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
      }}
      aria-live="polite"
      aria-label="System calibration"
    >
      {/* Top boundary: calibration label in sentence case */}
      <div className="flex justify-between items-center text-xs text-ink-muted">
        <span>System calibration</span>
        <span className="font-mono text-ink tabular-nums">{count}%</span>
      </div>

      {/* Center: minimal 1px hairline drawing left-to-right */}
      <div className="w-full max-w-md mx-auto">
        <div className="h-[1px] w-full bg-line relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-signal transition-all duration-75"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      {/* Bottom: raw count in JetBrains Mono, no narrated phrase */}
      <div className="flex justify-between items-end">
        <span className="font-mono text-xs text-ink-muted">001 / 100</span>
        <span className="font-mono text-2xl sm:text-3xl text-ink tabular-nums font-medium">
          {count < 100 ? String(count).padStart(2, "0") : count}
        </span>
      </div>
    </div>
  );
};

export default Preloader;
