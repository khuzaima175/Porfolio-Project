"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch screens
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("button, a, [data-cursor-label], [data-cursor-interactive]");
      
      if (interactiveEl) {
        setIsHoveringInteractive(true);
        const label = interactiveEl.getAttribute("data-cursor-label") || "";
        setHoverLabel(label);
      } else {
        setIsHoveringInteractive(false);
        setHoverLabel("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-blue"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Trailing follower ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-white/25 pointer-events-none"
        animate={{
          width: isHoveringInteractive ? (hoverLabel ? 64 : 44) : 24,
          height: isHoveringInteractive ? (hoverLabel ? 64 : 44) : 24,
          borderColor: isHoveringInteractive ? "rgba(41, 151, 255, 0.7)" : "rgba(255, 255, 255, 0.2)",
          backgroundColor: isHoveringInteractive ? "rgba(41, 151, 255, 0.08)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {hoverLabel && (
          <span className="font-mono text-[9px] tracking-widest text-white uppercase">
            {hoverLabel}
          </span>
        )}
      </motion.div>
    </div>
  );
}
