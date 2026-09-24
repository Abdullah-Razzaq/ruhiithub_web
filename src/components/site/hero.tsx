import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/icons/icon";
import { apps } from "@/lib/content";
import { PointerParallax } from "./pointer-parallax";
import { Rosette } from "./rosette";
import { Screen } from "./screen";

const lines = ["Apps that stay quiet", "while you pray, listen", "and remember."];

/** Delay helper for the CSS hero sequence (see globals.css, "Hero entrance"). */
const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pt-32 pb-24 md:pt-40 lg:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          {/* Beat 1: context */}
          <p className="hero-rise flex items-center gap-3 text-sm font-semibold text-ink-soft" style={at(0)}>
            <span lang="ur" dir="rtl" className="font-arabic text-2xl leading-none text-brass">
              روحی
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-line" />
            <span>
              <span className="text-ink">Ruhi</span>, of the soul
            </span>
          </p>

          {/* Beat 2: the promise, one masked line at a time */}
          <h1 className="mt-8 font-display text-5xl leading-[1.04] tracking-[-0.01em] text-ink sm:text-6xl lg:text-5xl xl:text-7xl">
            {/* Phones: one flowing, balanced paragraph. Wider screens: three masked lines broken where the thought breaks. */}
            <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em] sm:sr-only">
              <span className="hero-line block" style={at(80)}>
                {lines.join(" ")}
              </span>
            </span>
            {lines.map((line, i) => (
              <span key={line} aria-hidden="true" className="-mb-[0.08em] hidden overflow-hidden pb-[0.08em] sm:block">
                <span className="hero-line block" style={at(80 + i * 70)}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* Beat 3: explanation and actions, usable well before the visual settles */}
          <p className="hero-rise mt-8 max-w-xl text-lg leading-8 text-ink-soft" style={at(320)}>
            Ruhi IT Hub is a Lahore studio designing and building mobile apps for Muslim life. No ads inside worship, no
            data sold, and no music where it does not belong.
          </p>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4" style={at(400)}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink py-3.5 pr-5 pl-6 text-base font-semibold text-paper transition-[background-color,scale] duration-150 ease-out hover:bg-ink/85 active:scale-[0.97]"
            >
              Start a project
              <Icon
                name="arrow-right-up"
                className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 [&_path]:stroke-2"
              />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 py-3 text-base font-semibold text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors duration-200 hover:decoration-brass"
            >
              See our work
            </a>
          </div>

          <div className="hero-rise mt-12 flex items-center gap-4 text-sm text-ink-soft" style={at(480)}>
            <span className="flex shrink-0 -space-x-2">
              <Image
                src={apps.qalbify.icon}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-xl bg-white outline-1 -outline-offset-1 outline-black/10 ring-2 ring-paper"
              />
              <Image
                src={apps.ayyami.icon}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-xl bg-white outline-1 -outline-offset-1 outline-black/10 ring-2 ring-paper"
              />
            </span>
            <span>
              Two apps live on Google Play.{" "}
              <span className="font-semibold text-ink">
                Qalbify is rated {apps.qalbify.rating}
                <Icon name="star-solid" className="mx-0.5 -mt-0.5 inline size-3.5 text-brass" label="stars" />
              </span>{" "}
              by its listeners.
            </span>
          </div>
        </div>

        {/* Beat 4: the visual, revealed as one composition */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden="true"
            className="arch-outer hero-fade absolute -inset-3 border border-brass/35"
            style={at(700)}
          />
          <div className="arch hero-arch relative aspect-[4/5] overflow-hidden bg-night">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_30%,rgb(47_211_180/0.16),transparent_70%)]"
            />
            <PointerParallax depth={-8} rotate={-3} className="absolute inset-0">
              <Rosette
                draw
                delayMs={450}
                className="absolute top-[4%] left-1/2 w-[112%] -translate-x-1/2 text-brass-bright/35"
              />
            </PointerParallax>

            <div
              className="hero-screen absolute bottom-0 left-[6%] w-[46%]"
              style={
                {
                  ...at(650),
                  "--from-y": "30%",
                  "--to-y": "14%",
                  "--r": "-6deg",
                } as CSSProperties
              }
            >
              <PointerParallax depth={6}>
                <Screen
                  src="/apps/ayyami/screen-prayer.jpg"
                  alt="Ayyami prayer times screen with Asr set as the next prayer at 4:15 PM and reminders for each salah."
                  width={636}
                  height={1418}
                  eager
                  sizes="(min-width: 1024px) 240px, 45vw"
                  className="rounded-3xl shadow-float ring-white/10"
                />
              </PointerParallax>
            </div>
            <div
              className="hero-screen absolute right-[6%] bottom-0 w-[52%]"
              style={
                {
                  ...at(730),
                  "--from-y": "24%",
                  "--to-y": "8%",
                  "--r": "4deg",
                } as CSSProperties
              }
            >
              <PointerParallax depth={14}>
                <Screen
                  src="/apps/qalbify/screen-home.jpg"
                  alt="Qalbify home screen featuring Surah Al Kahf, a continue listening list and top reciters."
                  width={626}
                  height={1356}
                  lcp
                  sizes="(min-width: 1024px) 270px, 50vw"
                  className="rounded-3xl shadow-float ring-white/10"
                />
              </PointerParallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
