"use client";

import React from "react";
import { FrameTicks } from "@/components/ui/FrameTicks";

const BASELINES = [
  {
    value: "1.235 m",
    label: "Horizontal RMS position error",
    context: "Tested across 14 km of urban canyon and n=2,493 epochs against a NovAtel OEM7 differential reference receiver",
  },
  {
    value: "88.4%",
    label: "Multipath variance reduction",
    context: "Measured over weighted least-squares raw GPS observations using 3D ECEF inverse-variance physics fusion",
  },
  {
    value: "0.0%",
    label: "Sensory engine CPU overhead",
    context: "Sampled at 5s intervals via native Win32 ctypes API with UTC-anchored gap math and zero screen captures",
  },
  {
    value: "-42 dB",
    label: "Acoustic noise floor attenuation",
    context: "Benchmarked using pink-noise injection through adaptive biquad notch filters running in dedicated audio worklet threads",
  },
];

export const Profile: React.FC = () => {
  return (
    <section id="profile" className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-line">
      {/* Scene Header */}
      <div className="flex items-center justify-between pb-6 border-b border-line text-xs text-ink-muted">
        <span className="font-mono">S2 // PROFILE & BASELINES</span>
        <span>Systems architecture & verifiable tradeoffs</span>
      </div>

      {/* Main Narrative & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12">
        <div className="lg:col-span-4">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-ink leading-snug">
            Engineering from ground-truth baselines, not assumptions.
          </h2>
          <div className="mt-4 text-xs font-mono text-ink-muted">
            SYED KHUZAIMA · KARACHI, PK
          </div>
        </div>

        <div className="lg:col-span-8 space-y-5 text-ink-muted text-base leading-relaxed">
          <p>
            I build software where physical limits matter: signal processing pipelines, spatial state
            estimators, and low-overhead desktop daemons. My focus centers on eliminating the gap between
            theoretical algorithms and real hardware constraints—whether that means deriving
            Joseph-form covariance updates to prevent Kalman filter divergence or offloading FFT
            calculations to dedicated Web Audio Worklet threads to ensure zero audio buffer underruns.
          </p>
          <p>
            Every system I ship is evaluated against verifiable baselines. When building the Silent AI
            Auditor, I opted for native Win32 <code className="font-mono text-xs text-ink bg-surface-2 px-1 py-0.5">ctypes</code> foreground
            polling over video frame grabs, achieving true 0% measurable CPU overhead. In the GNSS Multi-Stream
            engine, statistical cross-validation proved that unconstrained tree models degraded vertical accuracy on
            unseen test roads; I rigorously demoted machine learning to experimental opt-in to safeguard
            physical ground-truth integrity.
          </p>
        </div>
      </div>

      {/* 4 Verifiable Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {BASELINES.map((item, idx) => (
          <div
            key={idx}
            className="border border-line bg-surface-2 p-5 relative flex flex-col justify-between"
          >
            <FrameTicks />
            <div>
              <div className="font-mono text-2xl sm:text-3xl font-medium text-ink tabular-nums">
                {item.value}
              </div>
              <div className="text-xs font-medium text-ink mt-1.5">{item.label}</div>
            </div>
            <div className="mt-6 pt-3 border-t border-line text-[11px] text-ink-muted leading-relaxed">
              {item.context}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
