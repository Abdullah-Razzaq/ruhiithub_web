import Image from "next/image";
import { Icon } from "@/components/icons/icon";
import { apps, ayyamiNotes } from "@/lib/content";
import { AyyamiMobile } from "./ayyami-mobile";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";
import { Screen } from "./screen";

const app = apps.ayyami;

// Pin positions are percentages of the calendar capture (see /public/apps/ayyami/screen-calendar.jpg).
const pins = [
  { n: 1, x: 2, y: 73.5 },
  { n: 2, x: 98, y: 9 },
  { n: 3, x: 2, y: 9 },
];

const side = [
  {
    src: "/apps/ayyami/screen-prayer.jpg",
    w: 636,
    h: 1418,
    caption: "Prayer times with azan reminders",
    alt: "Ayyami prayer times screen with reminders for Fajr, Dhuhr and Asr.",
    position: "md:left-0 md:-rotate-6",
  },
  {
    src: "/apps/ayyami/screen-duas.jpg",
    w: 596,
    h: 1338,
    caption: "Duas after every salah",
    alt: "Ayyami supplications screen listing duas after Fajr, Dhuhr, Asr, Maghrib and Isha.",
    position: "md:right-0 md:rotate-6",
  },
];

const facts: [string, string][] = [
  ["Rulings", "Hanafi fiqh, automatic"],
  ["Family", "Up to 5 profiles"],
  ["Privacy", "Encrypted, never sold"],
  ["Also inside", "Prayer times, azan, duas"],
];

export function ChapterAyyami() {
  return (
    <section aria-labelledby="ayyami-title" className="relative overflow-hidden bg-blush">
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-8 md:py-40">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <div className="flex items-center gap-4">
              <Image
                src={app.icon}
                alt="Ayyami app icon"
                width={64}
                height={64}
                className="size-16 rounded-2xl bg-white ring-1 ring-black/10"
              />
              <div>
                <p className="label text-ayyami-ink">Chapter 02</p>
                <p className="mt-1 font-display text-2xl text-ink">{app.name}</p>
              </div>
            </div>
            <SplitHeading
              id="ayyami-title"
              text={app.tagline}
              className="mt-10 font-display text-4xl leading-[1.08] text-ink md:text-5xl"
            />
            <p className="mt-6 flex items-center gap-3 text-base text-ink-soft">
              <span lang="ar" dir="rtl" className="font-arabic text-2xl leading-none text-ayyami-ink">
                {app.arabic}
              </span>
              <span>The name comes from {app.meaning}.</span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              Muslim women were doing the fiqh by hand: counting days, remembering habits, asking whether a prayer is
              owed. Ayyami logs the cycle and gives the ruling, then says clearly when to ask a scholar.
            </p>
          </div>
          <div className="hidden flex-col justify-end md:flex lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <dl className="divide-y divide-ayyami/30 border-y border-ayyami/30">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label text-ayyami-ink">{k}</dt>
                  <dd className="text-right text-base font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={app.store}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ayyami-ink px-5 py-3.5 text-base font-semibold text-blush transition-[background-color,scale] duration-150 ease-out hover:bg-ayyami-ink/90 active:scale-[0.97]"
            >
              <Icon name="google-play" className="size-4" />
              Get Ayyami on Google Play
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        {/* Phones get their own composition; tablets and desktops keep the annotated fan below */}
        <AyyamiMobile />

        <div className="mt-20 hidden items-center gap-16 md:grid lg:mt-32 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
            {/* A fan of the three real screens: the annotated calendar in front, daily worship tools behind */}
            <div className="relative mx-auto grid max-w-2xl grid-cols-2 gap-4 md:block md:aspect-[5/4]">
              <figure className="col-span-2 mx-auto w-full max-w-xs md:absolute md:top-0 md:left-1/2 md:z-10 md:w-[44%] md:max-w-none md:-translate-x-1/2">
                <div className="relative">
                  <div className="overflow-hidden rounded-4xl bg-white shadow-float ring-1 ring-black/10">
                    <Image
                      src="/apps/ayyami/screen-calendar.jpg"
                      alt="Ayyami cycle states calendar for June 2026, spanning Dhu al Hijjah 1447 to Muharram 1448, with a legend for menses, lochia, istihada and valid tuhr."
                      width={592}
                      height={1052}
                      sizes="(min-width: 768px) 300px, 80vw"
                      className="block h-auto w-full"
                    />
                  </div>
                  {pins.map((p) => (
                    <span
                      key={p.n}
                      aria-hidden="true"
                      className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ayyami-ink text-xs font-semibold text-blush tabular-nums ring-4 ring-blush"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      {p.n}
                    </span>
                  ))}
                </div>
                <figcaption className="mt-4 text-center text-sm font-semibold text-ink">
                  Cycle states, month by month
                </figcaption>
              </figure>

              {side.map((s) => (
                <figure key={s.src} className={`md:absolute md:top-[10%] md:w-[33%] ${s.position}`}>
                  <Screen
                    src={s.src}
                    alt={s.alt}
                    width={s.w}
                    height={s.h}
                    sizes="(min-width: 768px) 230px, 45vw"
                    className="rounded-3xl shadow-float ring-black/10"
                  />
                  <figcaption className="mt-3 text-center text-sm text-ink-soft md:hidden">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-8 hidden text-center text-sm text-ink-soft md:block">
              Behind the calendar: {side[0].caption.toLowerCase()} and {side[1].caption.toLowerCase()}.
            </p>
          </Reveal>
          <ol className="space-y-8 lg:col-span-4 lg:col-start-1 lg:row-start-1">
            {ayyamiNotes.map((note, i) => (
              <Reveal as="li" key={note.n} delay={i * 0.08} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ayyami-ink text-sm font-semibold text-blush tabular-nums">
                  {note.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{note.title}</h3>
                  <p className="mt-1.5 text-base leading-7 text-ink-soft">{note.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
