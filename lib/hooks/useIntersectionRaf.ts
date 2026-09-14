"use client";

import { useEffect, useRef } from "react";

interface UseIntersectionRafOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * High-performance hook that gates canvas requestAnimationFrame loops
 * via IntersectionObserver (+200px margin). Stops the loop entirely
 * when outside the viewport to guarantee 0% idle CPU and 60fps sustainability.
 */
export function useIntersectionRaf(
  containerRef: React.RefObject<HTMLElement>,
  renderFrame: (timestamp: number) => void,
  options: UseIntersectionRafOptions = {}
) {
  const { rootMargin = "200px 0px", threshold = 0 } = options;
  const isIntersectingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const loop = (timestamp: number) => {
      if (isIntersectingRef.current) {
        renderFrame(timestamp);
        rafIdRef.current = requestAnimationFrame(loop);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasIntersecting = isIntersectingRef.current;
        isIntersectingRef.current = entry.isIntersecting;

        if (entry.isIntersecting && !wasIntersecting) {
          if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && wasIntersecting) {
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [containerRef, renderFrame, rootMargin, threshold]);
}
