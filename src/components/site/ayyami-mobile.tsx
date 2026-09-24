"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/icon";
import type { IconName } from "@/components/icons/solar";
import { apps, ayyamiNotes } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

const app = apps.ayyami;

// Same pin positions as the desktop capture (percentages of /public/apps/ayyami/screen-calendar.jpg).
const pins = [
  { n: 1, x: 2, y: 73.5 },
  { n: 2, x: 98, y: 9 },
  { n: 3, x: 2, y: 9 },
];

const tiles: { icon: IconName; label: string; value: string }[] = [
  { icon: "shield-check", label: "Rulings", value: "Hanafi fiqh, automatic" },
  { icon: "users-group-rounded", label: "Family", value: "Up to 5 profiles" },
  { icon: "lock-keyhole", label: "Privacy", value: "Encrypted, never sold" },
  { icon: "moon", label: "Also inside", value: "Prayer times, azan, duas" },
];

/**
 * The deck: three real screens arrive stacked and fan open as they rise into view.
 * Scroll linked, transform only; people who prefer reduced motion see it already fanned.
 */
function Deck({ active, onPin }: { active: number; onPin: (n: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.35"] });
  const left = useTransform(scrollYProgress, [0, 1], ["translateX(0%) rotate(0deg)", "translateX(-62%) rotate(-8deg)"]);
  const right = useTransform(scrollYProgress, [0, 1], ["translateX(0%) rotate(0deg)", "translateX(62%) rotate(8deg)"]);
  const front = useTransform(scrollYProgress, [0, 1], ["translateY(8%) scale(0.92)", "translateY(0%) scale(1)"]);

  const sides = [
    {
      src: "/apps/ayyami/screen-prayer.jpg",
      w: 636,
      h: 1418,
      alt: "Ayyami prayer times screen with reminders for Fajr, Dhuhr and Asr.",
      style: reduce ? { transform: "translateX(-62%) rotate(-8deg)" } : { transform: left },
    },
    {
      src: "/apps/ayyami/screen-duas.jpg",
      w: 596,
      h: 1338,
      alt: "Ayyami supplications screen listing duas after each prayer.",
      style: reduce ? { transform: "translateX(62%) rotate(8deg)" } : { transform: right },
    },
  ];

  return (
    <figure>
      <div ref={ref} className="relative mx-auto h-[25rem] w-full max-w-[22rem]">
        {sides.map((s) => (
          <div key={s.src} className="absolute top-10 left-1/2 w-[40%] -translate-x-1/2">
            <motion.div style={s.style}>
              <div className="overflow-hidden rounded-3xl bg-white shadow-float ring-1 ring-black/10">
                <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="150px" className="block h-auto w-full" />
              </div>
            </motion.div>
          </div>
        ))}

        <div className="absolute top-0 left-1/2 z-10 w-[52%] -translate-x-1/2">
          <motion.div style={reduce ? undefined : { transform: front }} className="relative">
            <div className="overflow-hidden rounded-3xl bg-white shadow-float ring-1 ring-black/10">
              <Image
                src="/apps/ayyami/screen-calendar.jpg"
                alt="Ayyami cycle states calendar for June 2026, spanning Dhu al Hijjah 1447 to Muharram 1448, with a legend for menses, lochia, istihada and valid tuhr."
                width={592}
                height={1052}
                sizes="190px"
                className="block h-auto w-full"
              />
            </div>
            {pins.map((p) => {
              const on = p.n === active;
              return (
                <button
                  key={p.n}
                  type="button"
                  onClick={() => onPin(p.n)}
                  aria-label={`Show note ${p.n}: ${ayyamiNotes[p.n - 1].title}`}
                  aria-pressed={on}
                  className={cn(
                    "absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-semibold tabular-nums ring-4 transition-[scale,background-color,box-shadow] duration-200 ease-out before:absolute before:-inset-2 active:scale-95",
                    on ? "scale-125 bg-ayyami-ink text-blush ring-ayyami/40" : "bg-white text-ayyami-ink ring-blush",
                  )}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  {p.n}
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-ink-soft">
        Cycle states in front. Prayer times and duas behind.
      </figcaption>
    </figure>
  );
}

/** Phones only: a deck that fans open, notes you swipe that light up their pin, and the facts as tiles. */
export function AyyamiMobile() {
  const [active, setActive] = useState(1);
  const scroller = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  // The note that is mostly in view drives which pin is lit.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.note));
        }),
      { root, threshold: 0.6 },
    );
    root.querySelectorAll("[data-note]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const showNote = (n: number) => {
    const root = scroller.current;
    const card = root?.querySelector<HTMLElement>(`[data-note="${n}"]`);
    if (!root || !card) return;
    root.scrollTo({ left: card.offsetLeft - root.offsetLeft - 24, behavior: reduce ? "auto" : "smooth" });
    setActive(n);
  };

  return (
    <div className="mt-14 md:hidden">
      <Deck active={active} onPin={showNote} />

      <Reveal className="mt-12">
        <ol
          ref={scroller}
          data-lenis-prevent
          aria-label="What the calendar shows"
          className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto overscroll-x-contain px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ayyamiNotes.map((note) => {
            const on = note.n === active;
            return (
              <li
                key={note.n}
                data-note={note.n}
                className={cn(
                  "w-[82%] shrink-0 snap-start rounded-3xl p-5 ring-1 transition-[background-color,box-shadow] duration-300",
                  on
                    ? "bg-white shadow-[0_12px_28px_-18px_rgb(140_74_130/0.6)] ring-ayyami/40"
                    : "bg-white/55 ring-black/5",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-full text-sm font-semibold tabular-nums transition-colors duration-300",
                    on ? "bg-ayyami-ink text-blush" : "bg-blush-2 text-ayyami-ink",
                  )}
                >
                  {note.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{note.title}</h3>
                <p className="mt-1.5 text-base leading-7 text-ink-soft">{note.body}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden="true">
            {ayyamiNotes.map((note) => (
              <span key={note.n} className="h-1 w-6 overflow-hidden rounded-full bg-ayyami/30">
                <span
                  className={cn(
                    "block h-full w-full origin-left rounded-full bg-ayyami-ink transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    note.n === active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </span>
            ))}
          </div>
          <p className="text-sm text-ink-soft">Swipe, or tap a pin</p>
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <dl className="grid grid-cols-2 gap-3">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl bg-white/60 p-4 ring-1 ring-black/5">
              <Icon name={t.icon} className="size-5 text-ayyami-ink [&_path]:stroke-2" />
              <dt className="label mt-3 text-ayyami-ink">{t.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{t.value}</dd>
            </div>
          ))}
        </dl>
        <a
          href={app.store}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-ayyami-ink px-5 py-3.5 text-base font-semibold text-blush transition-[background-color,scale] duration-150 ease-out hover:bg-ayyami-ink/90 active:scale-[0.97]"
        >
          <Icon name="google-play" className="size-4" />
          Get Ayyami on Google Play
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </div>
  );
}
