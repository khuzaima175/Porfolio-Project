"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useLocalTime } from "@/lib/hooks/useLocalTime";
import { ArrowUpRight } from "lucide-react";
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
  const activeSection = useScrollSpy(ALL_SECTION_IDS, 0.35);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
  });

  // Continuous progressive opacity/blur when scrolling in top zone
  const topFadeOpacity = useTransform(scrollY, [0, 80, 200], [1, 0.98, 0.95]);

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
    <div className="sticky top-5 z-50 max-w-[95vw] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          y: visible ? 0 : -85,
          opacity: visible ? 1 : 0,
          scale: visible ? (isScrolledPastHero ? 0.99 : 1) : 0.95,
          filter: visible ? "blur(0px)" : "blur(10px)",
        }}
        transition={{
          duration: 0.42,
          ease: EASE_ENTER,
        }}
        style={{
          opacity: visible ? topFadeOpacity : 0,
        }}
        className={`nav-glass-pill relative rounded-full px-5 sm:px-7 transition-all duration-300 flex items-center justify-between shadow-2xl border border-white/15 bg-[#121215]/90 backdrop-blur-2xl overflow-hidden ${
          isScrolledPastHero ? "py-2.5 sm:py-3" : "py-3 sm:py-3.5"
        } ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Left Branding & Availability Badge */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => scrollToTarget(0)}
            className="text-sm sm:text-base font-bold tracking-tight text-white hover:text-brand-blue transition-colors flex items-center gap-2"
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
        <div className="hidden md:flex items-center space-x-1 sm:space-x-1.5 text-xs sm:text-sm font-medium relative">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
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
          <div className="hidden sm:flex items-center space-x-2 font-mono text-xs sm:text-sm text-neutral-200 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 shadow-inner">
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
            <span>Dispatch</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Bottom Hairline Scroll Progress Bar */}
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-blue origin-left"
        />
      </motion.div>
    </div>
  );
}
