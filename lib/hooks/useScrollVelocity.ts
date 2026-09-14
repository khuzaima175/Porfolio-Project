"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Calculates real-time scroll velocity and returns a subtle skewY angle
 * clamped to [-2, 2] degrees. Automatically decays smoothly to 0 on settle.
 */
export function useScrollVelocity() {
  const [skewY, setSkewY] = useState<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const currentSkewRef = useRef<number>(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    lastTimeRef.current = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const dt = Math.max(1, now - lastTimeRef.current);
      const dy = currentScrollY - lastScrollYRef.current;

      const velocity = dy / dt; // pixels per millisecond
      // Target skew: map velocity to [-2, 2] degrees
      const targetSkew = Math.max(-2, Math.min(2, velocity * 1.5));
      currentSkewRef.current = targetSkew;

      lastScrollYRef.current = currentScrollY;
      lastTimeRef.current = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Smooth relaxation loop back to 0
    const relax = () => {
      currentSkewRef.current *= 0.88; // gentle dampening
      if (Math.abs(currentSkewRef.current) < 0.01) {
        currentSkewRef.current = 0;
      }
      setSkewY(Number(currentSkewRef.current.toFixed(3)));
      animFrameRef.current = requestAnimationFrame(relax);
    };

    animFrameRef.current = requestAnimationFrame(relax);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return skewY;
}
