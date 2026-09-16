"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detect touch / mobile screen
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    // On mobile devices, delegate to native hardware-accelerated GPU compositor scrolling
    // to prevent main-thread touch hijacking and battery drain on low-end CPUs
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !isTouchDevice,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
      prevent: (node: any) => {
        return (
          Boolean(node?.hasAttribute?.("data-lenis-prevent")) ||
          Boolean(node?.closest?.("[data-lenis-prevent]"))
        );
      },
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as any).__lenis = lenis;
    }

    let rafId: number;
    let isTabActive = true;

    function raf(time: number) {
      if (isTabActive) {
        lenis.raf(time);
      }
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Pause RAF when browser tab is inactive / backgrounded (conserves mobile battery & CPU)
    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as any).__lenis;
      }
    };
  }, []);

  return lenisRef;
}
