"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/icon";
import { apps, qalbifySteps } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Lattice, Rosette } from "./rosette";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";
import { Screen } from "./screen";

const app = apps.qalbify;
const sizes: Record<string, [number, number]> = {
  home: [626, 1356],
  filters: [667, 1358],
  library: [626, 1358],
  studio: [666, 1447],
};

function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return desktop;
}

function Step({ index, onActive, desktop }: { index: number; onActive: (i: number) => void; desktop: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // Desktop reads at the middle of the screen. On phones the pinned window covers the top, so read lower.
  const inView = useInView(ref, { margin: desktop ? "-50% 0px -50% 0px" : "-66% 0px -34% 0px" });
  const step = qalbifySteps[index];
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex min-h-[55svh] flex-col justify-center py-10 lg:min-h-[72vh] lg:py-0">
      <span className="font-display text-2xl text-brass-bright tabular-nums">0{index + 1}</span>
      <h3 className="mt-4 font-display text-3xl text-on-night md:text-4xl">{step.title}</h3>
      <p className="mt-4 max-w-md text-base leading-7 text-on-night-soft md:text-lg md:leading-8">{step.body}</p>
    </li>
  );
}

/** The pinned arch that shows the screen for the active step. Shared by the desktop and phone layouts. */
function StepWindow({
  active,
  reduce,
  className,
  screenSizes,
}: {
  active: number;
  reduce: boolean | null;
  className?: string;
  screenSizes: string;
}) {
  const current = qalbifySteps[active];
  return (
    <div className={cn("arch relative aspect-[4/5] overflow-hidden bg-night-2 ring-1 ring-white/10", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_45%,rgb(47_211_180/0.18),transparent_72%)]"
      />
      <Rosette className="absolute top-[3%] left-1/2 w-[110%] -translate-x-1/2 text-brass-bright/15" />
      {/* Every screen hangs from the same top line below the progress bars; the arch clips the bottom. */}
      <div className="absolute top-[14%] left-1/2 w-[62%] -translate-x-1/2">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.id}
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(24px) scale(0.98)", filter: "blur(4px)" }
            }
            animate={
              reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)", filter: "blur(0px)" }
            }
            exit={
              reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-16px) scale(0.98)", filter: "blur(4px)" }
            }
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          >
            <Screen
              src={current.screen}
              alt={current.alt}
              width={sizes[current.id][0]}
              height={sizes[current.id][1]}
              sizes={screenSizes}
              className="rounded-4xl shadow-float ring-white/10"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-8 left-1/2 flex -translate-x-1/2 items-center gap-2" aria-hidden="true">
        {qalbifySteps.map((s, i) => (
          <span key={s.id} className="h-1 w-6 overflow-hidden rounded-full bg-white/15">
            <span
              className={cn(
                "block h-full w-full origin-left rounded-full bg-qalbify-bright transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                i === active ? "scale-x-100" : "scale-x-0",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function ChapterQalbify() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const desktop = useDesktop();

  return (
    <section
      id="work"
      data-nav-tone="dark"
      aria-labelledby="qalbify-title"
      className="on-night relative bg-night text-on-night"
    >
      <Lattice
        id="lattice-qalbify"
        className="absolute inset-x-0 top-0 h-[28rem] w-full text-on-night/[0.05] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 md:px-8 md:pt-40">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <Image
                src={app.icon}
                alt="Qalbify app icon"
                width={64}
                height={64}
                className="size-16 rounded-2xl bg-white"
              />
              <div>
                <p className="label text-on-night-soft">Chapter 01</p>
                <p className="mt-1 font-display text-2xl">{app.name}</p>
              </div>
            </div>
            <SplitHeading
              id="qalbify-title"
              text={app.tagline}
              className="mt-10 font-display text-4xl leading-[1.08] md:text-5xl"
            />
            <p className="mt-6 flex items-center gap-3 text-base text-on-night-soft">
              <span lang="ar" dir="rtl" className="font-arabic text-2xl leading-none text-qalbify-bright">
                {app.arabic}
              </span>
              <span>The name comes from {app.meaning}.</span>
            </p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {[
                ["Rating", `${app.rating} from ${app.reviews} reviews`],
                ["Installs", app.installs],
                ["Ads", "None, and no music"],
                ["Updated", app.updated],
              ].map(([k, v]) => (
                <div key={k} className="bg-night p-5">
                  <dt className="label text-on-night-soft">{k}</dt>
                  <dd className="mt-2 text-base font-semibold text-on-night">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={app.store}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-base font-semibold text-on-night transition-[border-color,background-color,scale] duration-150 ease-out hover:border-qalbify-bright/60 hover:bg-white/5 active:scale-[0.97]"
            >
              <Icon name="google-play" className="size-4" />
              Get Qalbify on Google Play
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-16 pb-32 md:pb-40 lg:mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Phones: the window stays pinned under the nav while the steps scroll beneath it */}
          <div className="sticky top-20 z-10 -mx-6 bg-night px-6 pt-2 pb-4 lg:hidden">
            <StepWindow active={active} reduce={reduce} screenSizes="240px" className="mx-auto w-[min(15rem,64vw)]" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-full h-12 bg-gradient-to-b from-night to-transparent"
            />
          </div>

          <ol className="lg:col-span-5">
            {qalbifySteps.map((s, i) => (
              <Step key={s.id} index={i} onActive={setActive} desktop={desktop} />
            ))}
          </ol>

          <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
            <div className="sticky top-0 flex h-dvh items-center justify-center">
              <StepWindow active={active} reduce={reduce} screenSizes="320px" className="w-full max-w-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
