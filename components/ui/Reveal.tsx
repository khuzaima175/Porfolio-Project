"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_ENTER, DUR_ENTER } from "@/lib/motion/tokens";

export type RevealVariant = "mask-up" | "slide-left" | "slide-right" | "blur-rise" | "fade";

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  containerClassName?: string;
  once?: boolean;
  margin?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Reveal({
  children,
  variant = "blur-rise",
  delay = 0,
  duration = DUR_ENTER,
  className = "",
  containerClassName = "",
  once = true,
  margin = "-40px",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: margin as any });

  // Line Mask Variant
  if (variant === "mask-up") {
    return (
      <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
        <motion.div
          initial={{ y: "110%", opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
          transition={{
            duration,
            delay,
            ease: EASE_ENTER,
          }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Directional Slide Left (enters from right)
  if (variant === "slide-left") {
    return (
      <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
        <motion.div
          initial={{ x: 40, opacity: 0, filter: "blur(6px)" }}
          animate={isInView ? { x: 0, opacity: 1, filter: "blur(0px)" } : { x: 40, opacity: 0, filter: "blur(6px)" }}
          transition={{
            duration,
            delay,
            ease: EASE_ENTER,
          }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Directional Slide Right (enters from left)
  if (variant === "slide-right") {
    return (
      <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
        <motion.div
          initial={{ x: -40, opacity: 0, filter: "blur(6px)" }}
          animate={isInView ? { x: 0, opacity: 1, filter: "blur(0px)" } : { x: -40, opacity: 0, filter: "blur(6px)" }}
          transition={{
            duration,
            delay,
            ease: EASE_ENTER,
          }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Fade only
  if (variant === "fade") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: EASE_ENTER,
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Default: Blur Rise (y: 28px -> 0, blur: 8px -> 0, opacity: 0 -> 1)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(8px)" }}
      transition={{
        duration,
        delay,
        ease: EASE_ENTER,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
