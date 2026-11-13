import Image from "next/image";
import { apps, sajdatiScreens } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";
import { Screen } from "./screen";

const app = apps.sajdati;

const facts: [string, string][] = [
  ["Status", app.status],
  ["Fiqh", "Hanafi guides"],
  ["Tracks", "Jamaat, alone, late, missed"],
  ["Also inside", "Qibla, Adhan, travel mode"],
];

export function ChapterSajdati() {
  return (
    <section aria-labelledby="sajdati-title" className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-8 md:py-40">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <Image
                src={app.icon}
                alt="Sajdati app icon"
                width={64}
                height={64}
                className="size-16 rounded-2xl bg-cream-2 ring-1 ring-black/10"
              />
              <div>
                <p className="label text-sajdati-ink">Chapter 03</p>
                <p className="mt-1 font-display text-2xl text-ink">{app.name}</p>
              </div>
            </div>
            <SplitHeading
              id="sajdati-title"
              text={app.tagline}
              className="mt-10 font-display text-4xl leading-[1.08] text-ink md:text-5xl"
            />
            <p className="mt-6 flex items-center gap-3 text-base text-ink-soft">
              <span lang="ar" dir="rtl" className="font-arabic text-2xl leading-none text-sajdati-ink">
                {app.arabic}
              </span>
              <span>The name comes from {app.meaning}.</span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              Prayer times, a log of how each salah was prayed and a running qaza count, in one calm place. When a
              prayer is missed, Sajdati keeps the record so making it up is a tap, not a tally in your head.
            </p>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-sajdati-ink/15 border-y border-sajdati-ink/15">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label text-sajdati-ink">{k}</dt>
                  <dd className="text-right text-base font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Phones swipe through the screens; desktops lay all five out as a staggered strip */}
        <ol
          aria-label="Sajdati screens"
          className="-mx-6 mt-20 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] md:-mx-8 md:px-8 lg:mx-0 lg:mt-28 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-12 [&::-webkit-scrollbar]:hidden"
        >
          {sajdatiScreens.map((s, i) => (
            <Reveal
              as="li"
              key={s.id}
              delay={i * 0.06}
              className={cn("w-[62vw] max-w-64 shrink-0 snap-center lg:w-auto lg:max-w-none", i % 2 === 1 && "lg:mt-12")}
            >
              <Screen
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                sizes="(min-width: 1024px) 230px, 62vw"
                className="rounded-3xl shadow-float ring-black/10"
              />
              <h3 className="mt-5 text-base font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-ink-soft">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
