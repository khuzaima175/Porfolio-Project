"use client";

import { useLocalTime } from "@/lib/hooks/useLocalTime";
import { ArrowUpRight } from "lucide-react";

export function AppleSubnav() {
  const localTime = useLocalTime();

  return (
    <div className="sticky top-4 z-50 max-w-6xl mx-auto px-4 pointer-events-auto">
      <div className="apple-subnav rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-2xl border border-white/10 bg-[#161617]/85 backdrop-blur-2xl">
        {/* Left branding & availability */}
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="text-sm font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
            data-cursor-interactive="true"
          >
            Khuzaima Ahmed
          </a>
          <div className="hidden lg:flex items-center space-x-1.5 text-[11px] font-mono text-apple-subtle border-l border-white/10 pl-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR ROLES</span>
          </div>
        </div>

        {/* Center section links */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-apple-subtle font-medium">
          <a
            href="#storyboard"
            className="hover:text-white transition-colors"
            data-cursor-interactive="true"
          >
            Overview
          </a>
          <a
            href="#bento"
            className="hover:text-white transition-colors"
            data-cursor-interactive="true"
          >
            Flagships
          </a>
          <a
            href="#compare"
            className="hover:text-white transition-colors"
            data-cursor-interactive="true"
          >
            Compare
          </a>
          <a
            href="#specimens"
            className="hover:text-white transition-colors"
            data-cursor-interactive="true"
          >
            Specimens
          </a>
          <a
            href="#archive"
            className="hover:text-white transition-colors"
            data-cursor-interactive="true"
          >
            Index
          </a>
        </div>

        {/* Right: Karachi Clock + Dispatch CTA */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1.5 font-mono text-[11px] text-apple-subtle px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-white tabular-nums">{localTime}</span>
            <span className="text-apple-blue text-[10px]">PKT</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full bg-apple-blue hover:bg-blue-400 text-white text-xs font-semibold tracking-tight transition-all shadow-md hover:shadow-apple-blue/25"
            data-cursor-interactive="true"
          >
            <span>Dispatch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
