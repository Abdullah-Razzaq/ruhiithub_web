"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { apps, sajdatiScreens } from "@/lib/content";
import { khatamPath } from "@/lib/geometry";
import { cn } from "@/lib/utils";
import { Lattice, Rosette } from "./rosette";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const app = apps.sajdati;

const facts: [string, string][] = [
  ["Status", app.status],
  ["Fiqh", "Hanafi guides"],
  ["Tracks", "Jamaat, alone, late, missed"],
  ["Also inside", "Qibla, Adhan, travel mode"],
];

/** The small eight fold star that separates facts, taken from the brand geometry. */
function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
      <path d={khatamPath(10, 10, 9)} fill="currentColor" />
    </svg>
  );
}

/** The tassels along the short edges of a prayer mat, as in the Sajdati logo. */
function Fringe({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-x-10 h-3 bg-[repeating-linear-gradient(90deg,var(--color-sajdati-ink)_0_2px,transparent_2px_7px)] md:inset-x-16",
        className,
      )}
    />
  );
}

export function ChapterSajdati() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = sajdatiScreens[active];

  const select = (i: number) => {
    const next = (i + sajdatiScreens.length) % sajdatiScreens.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowRight: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(sajdatiScreens.length - 1),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  };

  return (
    <section aria-labelledby="sajdati-title" className="relative overflow-hidden bg-cream">
      <Rosette className="absolute -top-64 left-1/2 w-[56rem] -translate-x-1/2 text-sajdati-ink/[0.06]" />

      <div className="relative mx-auto max-w-7xl px-6 py-32 md:px-8 md:py-40">
        {/* A centred, symmetrical opening: the page faces one direction, like the prayer it serves */}
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Image
            src={app.icon}
            alt="Sajdati app icon"
            width={80}
            height={80}
            className="size-20 rounded-3xl bg-cream-2 shadow-float ring-1 ring-black/10"
          />
          <p className="label mt-8 text-sajdati-ink">Chapter 03 · {app.name}</p>
          <SplitHeading
            id="sajdati-title"
            text={app.tagline}
            className="mt-6 font-display text-4xl leading-[1.08] text-ink md:text-6xl"
          />
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base text-ink-soft">
            <span aria-hidden="true" className="hidden h-px w-10 bg-sajdati-ink/25 sm:block" />
            <span lang="ar" dir="rtl" className="font-arabic text-3xl leading-none text-sajdati-ink">
              {app.arabic}
            </span>
            <span className="whitespace-nowrap">{app.meaning}</span>
            <span aria-hidden="true" className="hidden h-px w-10 bg-sajdati-ink/25 sm:block" />
          </p>
          <p className="mt-8 max-w-2xl text-base leading-7 text-pretty text-ink-soft md:text-lg md:leading-8">
            Prayer times, a log of how each salah was prayed and a running qaza count, in one calm place. When a prayer
            is missed, Sajdati keeps the record so making it up is a tap, not a tally in your head.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-y-8 md:flex md:items-start md:justify-center md:gap-0">
            {facts.map(([k, v], i) => (
              <div key={k} className="flex items-start">
                {i > 0 && <Star className="mx-8 mt-1.5 hidden size-3 shrink-0 text-sajdati md:block" />}
                <div className="w-full text-center">
                  <dt className="label text-sajdati-ink/80">{k}</dt>
                  <dd className="mt-2 text-sm font-semibold text-ink md:text-base">{v}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* The mat: a charcoal ground with fringed ends, an arch window at its centre */}
        <Reveal delay={0.12} className="relative mt-20 md:mt-28">
          <Fringe className="-top-3" />
          <Fringe className="-bottom-3" />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-sajdati-ink text-cream-2">
            <Lattice
              id="lattice-sajdati"
              className="absolute inset-0 h-full w-full text-cream-2/[0.05] [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]"
            />
            <div aria-hidden="true" className="absolute inset-3 rounded-[2rem] border border-cream-2/15 md:inset-4" />

            <div className="relative grid items-center gap-10 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-12 lg:gap-8 lg:px-16">
              {/* Tabs: every screen, named for what it does */}
              <div
                role="tablist"
                aria-label="Sajdati screens"
                aria-orientation="vertical"
                className="order-3 -mx-2 flex snap-x gap-2 overflow-x-auto px-2 pb-1 [scrollbar-width:none] lg:order-1 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
              >
                {sajdatiScreens.map((s, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={s.id}
                      ref={(el) => {
                        tabs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`sajdati-tab-${s.id}`}
                      aria-selected={selected}
                      aria-controls="sajdati-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(i)}
                      onKeyDown={onKeyDown}
                      className={cn(
                        "group flex shrink-0 snap-start items-center gap-4 rounded-full px-4 py-2.5 text-left transition-[background-color,color] duration-200 ease-out lg:rounded-2xl lg:px-5 lg:py-4",
                        selected ? "bg-cream-2 text-sajdati-ink" : "text-cream-2/70 hover:bg-cream-2/[0.06] hover:text-cream-2",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-lg tabular-nums transition-colors duration-200",
                          selected ? "text-sajdati-ink" : "text-sajdati",
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-sm font-semibold whitespace-nowrap lg:text-base lg:whitespace-normal">
                        {s.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* The arch window. All five screens are stacked so switching never waits on a download. */}
              <div className="order-1 lg:order-2 lg:col-span-4">
                <div className="arch-outer mx-auto w-full max-w-[19rem] p-3 ring-1 ring-cream-2/20">
                  <div className="arch relative aspect-[3/4.4] overflow-hidden bg-sajdati">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_30%,rgb(251_245_233/0.35),transparent_75%)]"
                    />
                    <Rosette className="absolute top-[4%] left-1/2 w-[120%] -translate-x-1/2 text-sajdati-ink/15" />
                    <div className="absolute top-[16%] left-1/2 aspect-[780/1688] w-[72%] -translate-x-1/2">
                      {sajdatiScreens.map((s, i) => (
                        <div
                          key={s.id}
                          aria-hidden={i !== active}
                          style={s.shift ? { transform: `translateY(-${s.shift}%)` } : undefined}
                          className={cn(
                            "absolute inset-0 overflow-hidden rounded-[1.75rem] bg-cream-2 shadow-float ring-1 ring-black/10 transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity",
                            i === active
                              ? "opacity-100"
                              : "pointer-events-none translate-y-4 scale-[0.98] opacity-0 blur-[4px] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:blur-none",
                          )}
                        >
                          <Image
                            src={s.src}
                            alt={i === active ? s.alt : ""}
                            width={s.w}
                            height={s.h}
                            sizes="(min-width: 1024px) 200px, 55vw"
                            className="block h-auto w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* What the active screen is for */}
              <div
                id="sajdati-panel"
                role="tabpanel"
                aria-labelledby={`sajdati-tab-${current.id}`}
                aria-live="polite"
                className="order-2 text-center lg:order-3 lg:col-span-4 lg:text-left"
              >
                <p className="font-display text-5xl text-sajdati tabular-nums md:text-6xl">
                  0{active + 1}
                  <span className="text-2xl text-cream-2/40 md:text-3xl"> / 0{sajdatiScreens.length}</span>
                </p>
                <h3 key={current.id} className="mt-4 font-display text-3xl text-cream-2 md:text-4xl">
                  {current.title}
                </h3>
                <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-cream-2/75 lg:mx-0">{current.body}</p>
                <div className="mt-8 flex justify-center gap-2 lg:justify-start">
                  {[
                    { label: "Previous screen", step: -1, d: "M15 6l-6 6 6 6" },
                    { label: "Next screen", step: 1, d: "M9 6l6 6-6 6" },
                  ].map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      aria-label={b.label}
                      onClick={() => setActive((active + b.step + sajdatiScreens.length) % sajdatiScreens.length)}
                      className="grid size-11 place-items-center rounded-full border border-cream-2/25 text-cream-2 transition-[background-color,border-color,scale] duration-150 ease-out hover:border-cream-2/50 hover:bg-cream-2/[0.06] active:scale-[0.96]"
                    >
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d={b.d} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
