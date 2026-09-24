"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const text = "People open our apps to pray, to listen and to remember. Everything we design protects that moment.";
const words = text.split(" ");
const accentFrom = words.length - 3;

function Word({
  word,
  i,
  progress,
  accent,
}: {
  word: string;
  i: number;
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const start = i / words.length;
  const end = start + 1 / words.length;
  const opacity = useTransform(progress, [start, end], [0.28, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-brass" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/** Elaya B11 tagline reveal: each word lifts from a muted tone to full ink as it crosses the reading line. */
export function Tagline() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });

  return (
    <section aria-label="What we stand for" className="py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <p ref={ref} className="font-display text-4xl leading-[1.15] text-ink md:text-5xl lg:text-6xl">
          {reduce ? (
            <>
              {words.slice(0, accentFrom).join(" ")}{" "}
              <span className="text-brass">{words.slice(accentFrom).join(" ")}</span>
            </>
          ) : (
            <>
              <span className="sr-only">{text}</span>
              <span aria-hidden="true">
                {words.map((w, i) => (
                  <Word key={i} word={w} i={i} progress={scrollYProgress} accent={i >= accentFrom} />
                ))}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
