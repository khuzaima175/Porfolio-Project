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
  delay = 0,
  duration = 0.75,
}: {
  digit: number;
  delay: number;
  duration: number;
}) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <span className="inline-block relative h-[1.15em] overflow-hidden tabular-nums leading-none">
      <motion.span
        initial={{ y: "0%" }}
        animate={{ y: `-${digit * 10}%` }}
        transition={{
          duration,
          delay,
          ease: EASE_ENTER,
        }}
        className="flex flex-col text-center"
      >
        {numbers.map((num) => (
          <span
            key={num}
            className="h-[1.15em] flex items-center justify-center leading-none"
          >
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
  duration = 0.75,
  delay = 0,
  triggerOnView = false,
}: OdometerProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "100px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stringValue = String(value);
  const characters = stringValue.split("");

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
            const currentDelay = delay + digitIndex * 0.04;
            digitIndex++;
            return (
              <DigitColumn
                key={`${index}-${parsedInt}-${stringValue}`}
                digit={parsedInt}
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
