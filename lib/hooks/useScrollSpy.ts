"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offsetRatio: number = 0.35) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight * offsetRatio;
          const documentHeight = document.documentElement.scrollHeight;
          const windowHeight = window.innerHeight;

          // If scrolled near the very bottom, activate the last section
          if (window.scrollY + windowHeight >= documentHeight - 60) {
            setActiveId(sectionIds[sectionIds.length - 1]);
            ticking = false;
            return;
          }

          let current = sectionIds[0];
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            const top = el.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition >= top - 20) {
              current = id;
            }
          }
          setActiveId(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds, offsetRatio]);

  return activeId;
}
