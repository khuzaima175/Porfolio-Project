"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLocalTime } from "@/lib/hooks/useLocalTime";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { EASE_ENTER, SPRING_LAYOUT } from "@/lib/motion/tokens";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { scrollToTarget } from "@/lib/utils/scroll";

const SECTIONS = [
  { id: "storyboard", label: "Overview" },
  { id: "compare", label: "Comparison" },
  { id: "bento", label: "Flagships" },
  { id: "archive", label: "About & Stacks" },
  { id: "method", label: "Tenets" },
];

const ALL_SECTION_IDS = [
  "storyboard",
  "compare",
  "bento",
  "archive",
  "method",
  "contact",
];

export function Subnav() {
  const localTime = useLocalTime();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(ALL_SECTION_IDS, 0.35);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
  });

  // Continuous progressive opacity/blur when scrolling in top zone

  // Smooth directional scroll listener with hysteresis & velocity awareness
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolledPastHero(currentScrollY > 350);

      // Top anchor zone: Always fully present
      if (currentScrollY <= 80) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      // Scrolling DOWN with intent -> gracefully dissolve and glide out
      if (diff > 8) {
        setVisible(false);
        lastScrollY.current = currentScrollY;
      }
      // Scrolling BACK UP with intent -> gracefully glide down and crystallize
      else if (diff < -8) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav aria-label="Main navigation" onFocusCapture={() => setVisible(true)} className="fixed top-3 sm:top-5 inset-x-0 z-50 max-w-[1400px] mx-auto px-3 sm:px-6 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          y: visible || menuOpen ? 0 : -85,
          opacity: visible || menuOpen ? 1 : 0,
          scale: 1,
        }}
        transition={{
          duration: 0.42,
          ease: EASE_ENTER,
        }}
        className={`nav-glass-pill relative rounded-full px-3.5 sm:px-7 transition-all duration-300 flex items-center justify-between shadow-2xl border border-white/15 bg-[#121215]/90 backdrop-blur-2xl overflow-hidden ${
          isScrolledPastHero ? "py-2 sm:py-3" : "py-2.5 sm:py-3.5"
        } ${visible || menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Left Branding & Availability Badge */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => scrollToTarget(0)}
            className="text-xs sm:text-base font-bold tracking-tight text-white hover:text-brand-blue transition-colors flex items-center gap-2 py-1 min-h-[36px]"
            data-cursor-interactive="true"
          >
            <span>Khuzaima Ahmed</span>
          </button>

          <div className="hidden xl:flex items-center space-x-2 text-xs font-mono text-neutral-300 border-l border-white/15 pl-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-semibold text-emerald-400">OPEN FOR ROLES</span>
          </div>
        </div>

        {/* Center Navigation Tabs with Spring Pill */}
        <div className="hidden lg:flex items-center space-x-1 text-xs font-medium relative">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                aria-current={isActive ? "location" : undefined}
                onClick={() => scrollToTarget(sec.id)}
                className={`relative px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 z-10 select-none ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
                data-cursor-interactive="true"
              >
                {isActive && (
                  <motion.div
                    layoutId="subnav-active-pill"
                    transition={SPRING_LAYOUT}
                    className="absolute inset-0 bg-white/15 border border-white/20 rounded-full -z-10 shadow-sm backdrop-blur-sm"
                  />
                )}
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Area: Karachi Live Time Pill & Dispatch CTA */}
        <div className="flex items-center space-x-3.5">
          {/* Real-Time Karachi Clock */}
          <div className="hidden 2xl:flex items-center space-x-2 font-mono text-xs text-neutral-200 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            <span className="tabular-nums font-semibold tracking-wider text-white">
              {localTime}
            </span>
            <span className="text-brand-blue text-[11px] font-bold tracking-tight">
              PKT
            </span>
          </div>

          {/* Dispatch CTA Button */}
          <button
            onClick={() => scrollToTarget("contact")}
            className="inline-flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-full bg-brand-blue hover:bg-blue-400 text-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 shadow-md shadow-brand-blue/20 hover:scale-105 active:scale-95"
            data-cursor-interactive="true"
          >
            <span>Let’s talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom Hairline Scroll Progress Bar */}
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-blue origin-left"
        />
      </motion.div>
      {menuOpen && (
        <div id="mobile-navigation" className="lg:hidden nav-glass-pill pointer-events-auto mt-3 rounded-3xl p-3 shadow-2xl" onKeyDown={(event) => { if (event.key === "Escape") setMenuOpen(false); }}>
          {SECTIONS.map((section) => (
            <button key={section.id} aria-current={activeSection === section.id ? "location" : undefined} className="block w-full rounded-xl px-4 py-3 text-left text-sm text-neutral-200 hover:bg-white/10" onClick={() => { setMenuOpen(false); scrollToTarget(section.id); }}>
              {section.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
