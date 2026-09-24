"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Icon } from "@/components/icons/icon";
import { seeded } from "@/lib/geometry";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const BARS = 64;
const heights = seeded(BARS, 3).map((v, i) => 0.28 + 0.72 * Math.abs(Math.sin(i * 0.42)) * (0.55 + 0.45 * v));
const AD_START = 0.4;
const AD_END = 0.64;

function Bars({ className, gap }: { className: string; gap?: [number, number] }) {
  return (
    <div className="flex h-full w-full items-center gap-[3px]">
      {heights.map((h, i) => {
        const pos = i / BARS;
        const hidden = gap && pos >= gap[0] && pos < gap[1];
        return (
          <span
            key={i}
            className={cn("min-w-0 flex-1 rounded-full", hidden ? "opacity-0" : className)}
            style={{ height: `${Math.round(h * 100)}%` }}
          />
        );
      })}
    </div>
  );
}

function Track({ label, status, children }: { label: string; status: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <span className="font-semibold text-ink">{label}</span>
        <span className="text-ink-soft">{status}</span>
      </div>
      <div className="relative h-16">{children}</div>
    </div>
  );
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0.04, 0.96]);
  // translateX percentages resolve against the wrapper's own width, which spans the track: compositor only, no layout.
  const playhead = useTransform(progress, (p) => `translateX(${p * 100}%)`);
  const played = useTransform(progress, (p) => `inset(0 ${100 - p * 100}% 0 0)`);
  const [inAd, setInAd] = useState(reduce ?? false);

  useMotionValueEvent(progress, "change", (p) => setInAd(p >= AD_START && p < AD_END));

  return (
    <section aria-labelledby="problem-title" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SplitHeading
            id="problem-title"
            text="Most free Islamic apps pay their bills with your attention."
            className="font-display text-4xl leading-[1.08] text-ink md:text-5xl"
          />
          <Reveal
            delay={0.15}
            className="mt-8 max-w-lg space-y-5 text-base leading-7 text-ink-soft md:text-lg md:leading-8"
          >
            <p>
              A banner over the mushaf. A thirty second video, soundtrack included, between two ayat. In 2020 a popular
              prayer app was reported to be selling its users&apos; location data.
            </p>
            <p className="text-ink">
              We build the other kind. Our products earn in ways that keep worship uninterrupted and keep personal data
              personal.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div ref={ref} className="rounded-3xl border border-line bg-paper-2 p-6 md:p-10">
            <div className="relative space-y-10 overflow-x-clip">
              <Track
                label="A typical free app"
                status={
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 transition-colors duration-200",
                      inAd && "text-ink",
                    )}
                  >
                    <Icon name={inAd ? "music-note-slider-2" : "headphones-round"} className="size-4" />
                    {inAd ? "Ad playing, with music" : "Surah Al Kahf"}
                  </span>
                }
              >
                <Bars className="bg-ink/15" gap={[AD_START, AD_END]} />
                <motion.div
                  className="absolute inset-0"
                  style={reduce ? { clipPath: "inset(0 48% 0 0)" } : { clipPath: played }}
                >
                  <Bars className="bg-ink/55" gap={[AD_START, AD_END]} />
                </motion.div>
                <div
                  className="absolute inset-y-0 flex items-center justify-center rounded-xl border border-ink/20 bg-[repeating-linear-gradient(135deg,rgb(30_26_17/0.10)_0_6px,transparent_6px_12px)] text-xs font-semibold tracking-[0.14em] text-ink uppercase"
                  style={{ left: `${AD_START * 100}%`, width: `${(AD_END - AD_START) * 100}%` }}
                >
                  Ad · 0:30
                </div>
              </Track>

              <Track
                label="Qalbify"
                status={
                  <span className="inline-flex items-center gap-1.5 text-qalbify-ink">
                    <Icon name="headphones-round" className="size-4" />
                    Surah Al Kahf, uninterrupted
                  </span>
                }
              >
                <Bars className="bg-qalbify/20" />
                <motion.div
                  className="absolute inset-0"
                  style={reduce ? { clipPath: "inset(0 48% 0 0)" } : { clipPath: played }}
                >
                  <Bars className="bg-qalbify" />
                </motion.div>
              </Track>

              {/* The shared playhead: one moment, two very different experiences */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-3 -bottom-3"
                style={{ transform: reduce ? "translateX(52%)" : playhead }}
              >
                <span className="absolute inset-y-0 left-0 w-px bg-ink" />
                <span className="absolute -top-1 left-0 size-2.5 -translate-x-[calc(50%-0.5px)] rotate-45 bg-ink" />
              </motion.div>
            </div>
            <p className="mt-10 border-t border-line pt-5 text-sm text-ink-soft">
              Same recitation, same moment.{reduce ? "" : " Scroll to move the playhead."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
