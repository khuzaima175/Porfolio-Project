"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

function Word({
  word,
  progress,
  range,
  isHighlight,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [2, 0]);

  return (
    <>
      <span className="inline-block mr-[0.28em] relative">
        <motion.span
          style={{ opacity, y }}
          className={`inline-block transition-colors duration-200 ${
            isHighlight ? "font-semibold text-white" : "text-apple-text"
          }`}
        >
          {word}
        </motion.span>
      </span>{" "}
    </>
  );
}

export function ScrollTextReveal({
  text,
  className = "",
  highlightWords = [],
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.88", "end 0.45"],
  });

  const words = text.split(" ");
  const cleanHighlights = highlightWords.map((w) => w.toLowerCase());

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed text-apple-subtle transition-all select-none ${className}`}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isHighlight = cleanHighlights.includes(cleanWord);

        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            isHighlight={isHighlight}
          />
        );
      })}
    </p>
  );
}
