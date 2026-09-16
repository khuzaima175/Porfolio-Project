"use client";

import React from "react";

export function GrainOverlay() {
  return (
    <div
      className="hidden md:block pointer-events-none fixed inset-0 z-[9990] opacity-[0.035] mix-blend-screen select-none overflow-hidden"
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
