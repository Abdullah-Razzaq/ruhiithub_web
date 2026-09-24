"use client";

import { motion, type Variants } from "motion/react";
import { Fragment } from "react";

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.04 } },
};

const word: Variants = {
  hidden: { transform: "translateY(110%)" },
  shown: { transform: "translateY(0%)", transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
};

type SplitHeadingProps = {
  text: string;
  id?: string;
  className?: string;
  as?: "h2" | "p";
  /** How many trailing words take the accent colour. */
  accentLast?: number;
  accentClass?: string;
};

/**
 * Section headings rise word by word as they enter view (awwwards bar, Emil's 30 to 80ms stagger).
 * The unsplit text stays the accessible name; the split copy is decorative and visible without JS.
 */
export function SplitHeading({
  text,
  id,
  className,
  as = "h2",
  accentLast = 0,
  accentClass = "text-brass",
}: SplitHeadingProps) {
  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        variants={container}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <motion.span
                data-reveal=""
                variants={word}
                className={i >= words.length - accentLast ? `inline-block ${accentClass}` : "inline-block"}
              >
                {w}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
