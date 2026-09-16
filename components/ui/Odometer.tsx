"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_ENTER } from "@/lib/motion/tokens";

interface OdometerProps {
  value: string | number;
  className?: string;
  duration?: number;
  delay?: number;
  triggerOnView?: boolean;
}

function DigitColumn({
  digit,
  isInView,
  delay = 0,
  duration = 0.8,
}: {
  digit: number;
  isInView: boolean;
  delay: number;
  duration: number;
}) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <span className="inline-block relative h-[1.1em] overflow-hidden tabular-nums leading-none">
      <motion.span
        initial={{ y: "0%" }}
        animate={isInView ? { y: `-${digit * 10}%` } : { y: "0%" }}
        transition={{
          duration,
          delay,
          ease: EASE_ENTER,
        }}
        className="flex flex-col text-center"
      >
        {numbers.map((num) => (
          <span key={num} className="h-[1.1em] flex items-center justify-center leading-none">
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Odometer({
  value,
  className = "",
  duration = 0.85,
  delay = 0,
  triggerOnView = true,
}: OdometerProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "-20px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stringValue = String(value);
  const characters = stringValue.split("");
  const shouldAnimate = triggerOnView ? inView : true;

  if (!mounted) {
    return <span className={`tabular-nums ${className}`}>{stringValue}</span>;
  }

  let digitIndex = 0;

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-baseline tabular-nums leading-none ${className}`}
      aria-label={stringValue}
    >
      <span className="inline-flex items-baseline" aria-hidden="true">
        {characters.map((char, index) => {
          const parsedInt = parseInt(char, 10);
          const isDigit = !isNaN(parsedInt);

          if (isDigit) {
            const currentDelay = delay + digitIndex * 0.05;
            digitIndex++;
            return (
              <DigitColumn
                key={index}
                digit={parsedInt}
                isInView={shouldAnimate}
                delay={currentDelay}
                duration={duration}
              />
            );
          }

          return (
            <span key={index} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
