"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "@/lib/hooks/useLenis";
import { Preloader } from "@/components/chrome/Preloader";
import { Header } from "@/components/chrome/Header";
import { CommandPalette } from "@/components/chrome/CommandPalette";
import { Hero } from "@/components/scenes/Hero";
import { Profile } from "@/components/scenes/Profile";
import { SelectedWork } from "@/components/scenes/SelectedWork";
import { Archive } from "@/components/scenes/Archive";
import { SignalChain } from "@/components/scenes/SignalChain";
import { Proof } from "@/components/scenes/Proof";
import { Method } from "@/components/scenes/Method";
import { Trajectory } from "@/components/scenes/Trajectory";
import { Dispatch } from "@/components/scenes/Dispatch";

export default function Home() {
  useLenis();

  const [isCalibrated, setIsCalibrated] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Global hotkeys for Command Palette: Ctrl+K, Cmd+K, and '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === "/" && !isInputFocused && !isCommandPaletteOpen) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-surface selection:bg-signal selection:text-surface">
      {/* S0 System Calibration Preloader (Silent <= 1.0s) */}
      <Preloader onComplete={() => setIsCalibrated(true)} />

      {/* Persistent Hairline Header with Scroll-Spy & Live Karachi Clock */}
      <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* S1: Hero / The Instrument */}
      <Hero
        onExploreWork={() => scrollToSection("selected-work")}
        onExploreSignalChain={() => scrollToSection("signal-chain")}
      />

      {/* S2: Profile & Measured Baselines */}
      <Profile />

      {/* S3: Selected Work (400vh Pinned Scrub, 4 Live Specimen Engines) */}
      <SelectedWork />

      {/* S4: The Archive (Index Ledger, Spring Tilt Preview & Accordion) */}
      <Archive />

      {/* S5: Signal Chain (Interactive Capabilities Pipeline & Dependency Tracing) */}
      <SignalChain />

      {/* S6: Proof & Telemetry (.theme-inverted, Verified SVG Sparklines) */}
      <Proof />

      {/* S7: Method (1–4 Genuinely Sequential Lifecycle) */}
      <Method />

      {/* S8: Trajectory (Chronological Milestones & Architectural Redesigns) */}
      <Trajectory />

      {/* S9: Dispatch & Colophon (.theme-inverted, Clipboard Copy, Colophon) */}
      <Dispatch />

      {/* Command Palette Overlay */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </main>
  );
}
