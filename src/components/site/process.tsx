"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { process } from "@/lib/content";
import { khatamPath } from "@/lib/geometry";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

/**
 * Phones and tablets: the rail from one star to the next. It fills as it crosses the reading line,
 * so the thread is drawn step by step while you scroll. Transform only; drawn in full for reduced motion.
 */
function Rail() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.62", "end 0.62"] });
  const transform = useTransform(scrollYProgress, (p) => `scaleY(${p})`);
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="absolute top-10 -bottom-12 left-4 w-px -translate-x-1/2 bg-brass/20 lg:hidden"
    >
      <motion.span
        className="absolute inset-0 origin-top bg-brass"
        style={{ transform: reduce ? "scaleY(1)" : transform }}
      />
    </span>
  );
}

export function Process() {
  const reduce = useReducedMotion();
  return (
    <section id="process" aria-labelledby="process-title" className="grain bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SplitHeading
          id="process-title"
          text="How a project moves, from intention to launch."
          className="max-w-2xl font-display text-4xl leading-[1.08] text-ink md:text-5xl"
        />

        <ol className="relative mt-16 grid gap-12 md:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* Desktop: the thread that joins the four steps, drawn once as the row enters */}
          <motion.span
            aria-hidden="true"
            className="absolute top-4 right-0 left-4 hidden h-px origin-left bg-brass/50 lg:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
          />
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={0.15 + i * 0.12}
              className="relative grid grid-cols-[2rem_1fr] gap-x-5 lg:block"
            >
              {i < process.length - 1 && <Rail />}
              <svg viewBox="0 0 32 32" className="relative size-8 text-brass" aria-hidden="true">
                <path d={khatamPath(16, 16, 14)} fill="var(--color-paper-2)" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="2.5" fill="currentColor" />
              </svg>
              <div>
                <p className="mt-1.5 text-sm font-semibold text-ink-soft tabular-nums lg:mt-8">Step {i + 1}</p>
                <h3 className="mt-2 font-display text-3xl text-ink">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-ink-soft">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
