"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, type ReactNode } from "react";

type PointerParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Max travel in px at the edge of the viewport. Negative values move against the pointer (depth). */
  depth?: number;
  rotate?: number;
};

// Shared pointer position, normalised to -1..1. One listener for the whole hero.
const listeners = new Set<(x: number, y: number) => void>();
let bound = false;
function bind() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      listeners.forEach((fn) => fn(x, y));
    },
    { passive: true },
  );
}

/**
 * Decorative, additive depth for the hero visual. Springs give it momentum (Emil: never tie decoration
 * directly to the cursor). Only for fine pointers, never for reduced motion, and the static frame is complete.
 */
export function PointerParallax({ children, className, depth = 10, rotate = 0 }: PointerParallaxProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 80, damping: 20, mass: 0.6 });
  const transform = useTransform(
    [sx, sy],
    ([x, y]: number[]) => `translate3d(${x * depth}px, ${y * depth * 0.6}px, 0) rotate(${x * rotate}deg)`,
  );

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    bind();
    const fn = (x: number, y: number) => {
      px.set(x);
      py.set(y);
    };
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, [reduce, px, py]);

  return (
    <motion.div className={className} style={reduce ? undefined : { transform }}>
      {children}
    </motion.div>
  );
}
