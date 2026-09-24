"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "figure";
};

/**
 * A quiet, one time fade up for content entering the viewport.
 * Full transform strings keep it on the compositor; the <noscript> rule in layout.tsx keeps content visible without JS.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </Tag>
  );
}
