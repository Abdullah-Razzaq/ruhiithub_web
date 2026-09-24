"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const StackContext = createContext<{ progress: MotionValue<number>; total: number } | null>(null);

/** A list whose items pin one below the other and slide over each other as you scroll. */
export function StackList({ total, className, children }: { total: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <StackContext.Provider value={{ progress: scrollYProgress, total }}>
      <ol ref={ref} className={className}>
        {children}
      </ol>
    </StackContext.Provider>
  );
}

/**
 * One pinned card. Each card settles back a little as the ones after it slide over; the last stays full size.
 * Transform only (Emil: GPU properties), and no scaling for people who prefer reduced motion.
 */
export function StackItem({ index, className, children }: { index: number; className?: string; children: ReactNode }) {
  const stack = useContext(StackContext);
  if (!stack) throw new Error("StackItem must be rendered inside StackList");
  const reduce = useReducedMotion();
  const target = 1 - (stack.total - 1 - index) * 0.035;
  const transform = useTransform(stack.progress, [index / stack.total, 1], [`scale(1)`, `scale(${target})`]);

  return (
    <li
      className="sticky top-[calc(5.5rem+var(--i)*0.75rem)] md:top-[calc(7.5rem+var(--i)*1.25rem)]"
      style={{ "--i": index } as CSSProperties}
    >
      <motion.article style={reduce ? undefined : { transform }} className={cn("origin-top", className)}>
        {children}
      </motion.article>
    </li>
  );
}
