"use client";

import React, { useRef, useEffect, useState } from "react";
import { useKarachiClock } from "@/lib/hooks/useKarachiClock";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

const NAV_ITEMS = [
  { id: "selected-work", label: "Selected work" },
  { id: "archive", label: "Archive" },
  { id: "signal-chain", label: "Signal chain" },
  { id: "telemetry", label: "Telemetry" },
  { id: "contact", label: "Contact" },
];

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette }) => {
  const timeStr = useKarachiClock();
  const activeSectionId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Calculate sliding underline position
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeLink = navContainerRef.current.querySelector(
      `[data-section-id="${activeSectionId}"]`
    ) as HTMLElement | null;

    if (activeLink) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    }
  }, [activeSectionId]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-none border-b border-line h-14 select-none">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Left: Wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="text-sm font-medium tracking-tight text-ink hover:text-signal transition-colors"
          >
            Syed Khuzaima
          </a>
          <span className="hidden sm:inline-block text-[11px] text-ink-muted border-l border-line pl-3">
            Systems & AI Engineering
          </span>
        </div>

        {/* Center: Sentence-case Nav with Sliding Underline */}
        <nav
          ref={navContainerRef}
          className="hidden md:flex items-center gap-6 relative h-full"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <button
                key={item.id}
                data-section-id={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs tracking-normal h-full flex items-center px-1 transition-colors relative ${
                  isActive ? "text-ink font-medium" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Sliding --signal underline indicator */}
          <div
            className="absolute bottom-0 h-[2px] bg-signal transition-all duration-300 ease-e-out pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.width > 0 ? 1 : 0,
            }}
          />
        </nav>

        {/* Right: Live Karachi Clock, Status & Command Palette Trigger */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Open command palette"
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-surface-2 text-ink-muted hover:text-ink hover:border-line-heavy border border-line text-[11px] transition-all"
          >
            <span>Search</span>
            <kbd className="font-mono text-[10px] text-ink-muted">⌘K</kbd>
          </button>

          {/* Karachi Live Clock */}
          <div className="hidden lg:flex items-center font-mono text-[11px] text-ink tabular-nums">
            {timeStr}
          </div>

          {/* Status Line */}
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-signal inline-block" />
            <span className="hidden sm:inline text-[11px] text-ink">Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
