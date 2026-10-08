/**
 * Smoothly scroll to a section or Y-position, integrating with Lenis momentum physics when active
 */
export function scrollToTarget(target: string | HTMLElement | number, offset: number = 0) {
  if (typeof window === "undefined") return;

  const lenis = (window as any).__lenis;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof target === "number") {
    if (lenis) {
      lenis.scrollTo(target + offset, { duration: 1.0, immediate: reduceMotion });
    } else {
      window.scrollTo({ top: target + offset, behavior: reduceMotion ? "auto" : "smooth" });
    }
    return;
  }

  const el = typeof target === "string" ? document.getElementById(target.replace("#", "")) : target;
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.0, immediate: reduceMotion });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }
}
