"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis is the single smooth scroll engine. It never runs for people who prefer reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -24 }, lerp: 0.12 });
    // Development hook so browser checks can jump to exact positions.
    if (process.env.NODE_ENV !== "production") (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    return () => lenis.destroy();
  }, []);
  return null;
}
