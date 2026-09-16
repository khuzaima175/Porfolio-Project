"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLocalTime } from "@/lib/hooks/useLocalTime";
import { ArrowUpRight } from "lucide-react";
import { Odometer } from "@/components/ui/Odometer";
import { EASE_ENTER, SPRING_LAYOUT } from "@/lib/motion/tokens";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { scrollToTarget } from "@/lib/utils/scroll";

const SECTIONS = [
  { id: "storyboard", label: "Overview" },
  { id: "compare", label: "Compare" },
  { id: "bento", label: "Flagships" },
  { id: "archive", label: "About" },
];

const ALL_SECTION_IDS = ["storyboard", "compare", "bento", "archive", "method", "contact"];

export function AppleSubnav() {
  const localTime = useLocalTime();
  const [visible, setVisible] = useState(true);
  const activeSection = useScrollSpy(ALL_SECTION_IDS, 0.35);
  const [isScrolledPast400, setIsScrolledPast400] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });

  // Directional scroll listener + scroll depth detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolledPast400(currentScrollY > 400);

      // Always show near top of page
      if (currentScrollY <= 80) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      // Scrolling DOWN -> smoothly vanish
      if (diff > 12) {
        setVisible(false);
        lastScrollY.current = currentScrollY;
      }
      // Scrolling BACK UP -> smoothly reappear
      else if (diff < -12) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-4 z-50 max-w-[95vw] 2xl:max-w-[1760px] mx-auto px-4 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          y: visible ? 0 : -80,
          opacity: visible ? 1 : 0,
          scale: visible ? (isScrolledPast400 ? 0.98 : 1) : 0.95,
        }}
        transition={{
          duration: 0.35,
          ease: EASE_ENTER,
        }}
        className={`apple-subnav relative rounded-full px-5 sm:px-6 transition-all duration-300 flex items-center justify-between shadow-2xl border border-white/10 bg-[#161617]/85 backdrop-blur-2xl overflow-hidden ${
          isScrolledPast400 ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3"
        } ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Left branding & availability */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => scrollToTarget(0)}
            className="text-sm font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
            data-cursor-interactive="true"
          >
            Khuzaima Ahmed
          </button>
          <div className="hidden lg:flex items-center space-x-1.5 text-[11px] font-mono text-apple-subtle border-l border-white/10 pl-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR ROLES</span>
          </div>
        </div>

        {/* Center section links with animated sliding layout pill */}
        <div className="hidden md:flex items-center space-x-1 text-xs text-apple-subtle font-medium relative">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToTarget(sec.id)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors z-10 ${
                  isActive ? "text-white font-semibold" : "text-apple-subtle hover:text-white"
                }`}
                data-cursor-interactive="true"
              >
                {isActive && (
                  <motion.div
                    layoutId="subnav-active-pill"
                    transition={SPRING_LAYOUT}
                    className="absolute inset-0 bg-white/10 border border-white/15 rounded-full -z-10 shadow-sm"
                  />
                )}
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Karachi Clock with Odometer digits + Dispatch CTA */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1.5 font-mono text-[11px] text-apple-subtle px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            <Odometer value={localTime} className="text-white tabular-nums font-semibold" />
            <span className="text-apple-blue text-[10px] font-bold">PKT</span>
          </div>

          <button
            onClick={() => scrollToTarget("contact")}
            className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full bg-apple-blue hover:bg-blue-400 text-white text-xs font-semibold tracking-tight transition-all shadow-md hover:shadow-apple-blue/25 active:scale-95"
            data-cursor-interactive="true"
          >
            <span>Dispatch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom hairline scroll progress bar */}
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-apple-blue origin-left"
        />
      </motion.div>
    </div>
  );
}
