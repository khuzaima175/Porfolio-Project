"use client";

import { useLocalTime } from "@/lib/hooks/useLocalTime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const localTime = useLocalTime();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        scrolled
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100 bg-black/40 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Identity & Status */}
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="text-sm font-semibold tracking-apple-tight text-white hover:text-apple-blue transition-colors duration-300"
            data-cursor-interactive="true"
          >
            KHUZAIMA AHMED
          </a>
          <div className="hidden md:flex items-center space-x-2 text-apple-subtle font-mono text-[11px] border-l border-white/10 pl-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AVAILABLE FOR HIGH-IMPACT ROLES</span>
          </div>
        </div>

        {/* Karachi Telemetry Clock */}
        <div className="hidden lg:flex items-center space-x-2 font-mono text-xs text-apple-subtle bg-apple-gray/60 border border-white/10 px-3 py-1 rounded-full">
          <span className="text-apple-subtle">KHI / PKT</span>
          <span className="text-white tabular-nums">{localTime}</span>
          <span className="text-apple-blue text-[10px]">UTC+5</span>
        </div>

        {/* Navigation Jump Anchors */}
        <nav className="flex items-center space-x-6 font-mono text-xs text-apple-subtle">
          <a
            href="#bento"
            className="hover:text-white transition-colors duration-300"
            data-cursor-interactive="true"
          >
            [01] WORK
          </a>
          <a
            href="#specimens"
            className="hover:text-white transition-colors duration-300"
            data-cursor-interactive="true"
          >
            [02] SPECIMENS
          </a>
          <a
            href="#archive"
            className="hidden sm:inline-block hover:text-white transition-colors duration-300"
            data-cursor-interactive="true"
          >
            [03] ARCHIVE
          </a>
          <a
            href="#contact"
            className="text-apple-blue hover:text-white transition-colors duration-300 font-medium"
            data-cursor-interactive="true"
          >
            [DISPATCH]
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
