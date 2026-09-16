"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRING_FLOAT } from "@/lib/motion/tokens";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  pullDistance?: number;
  onClick?: () => void;
  [key: string]: any;
}

export function MagneticButton({
  children,
  className = "",
  pullDistance = 4,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING_FLOAT);
  const springY = useSpring(y, SPRING_FLOAT);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) / (width / 2);
    const deltaY = (e.clientY - centerY) / (height / 2);

    x.set(deltaX * pullDistance);
    y.set(deltaY * pullDistance);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
