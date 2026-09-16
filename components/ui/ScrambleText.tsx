"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const GLYPHS = "0123456789ABCDEF_//XYZ#<>";

export function ScrambleText({
  text,
  className = "",
  delay = 0,
  duration = 450,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      const startTime = Date.now();
      const length = text.length;

      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        const resolvedLength = Math.floor(progress * length);

        let result = "";
        for (let i = 0; i < length; i++) {
          if (i < resolvedLength) {
            result += text[i];
          } else if (text[i] === " " || text[i] === "/" || text[i] === "-" || text[i] === ":") {
            result += text[i];
          } else {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(result);

        if (progress >= 1) {
          setDisplayText(text);
          clearInterval(intervalId);
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [inView, text, delay, duration]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
}
