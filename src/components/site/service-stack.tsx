"use client";

import Image from "next/image";
import { apps, services } from "@/lib/content";
import { seeded } from "@/lib/geometry";
import { cn } from "@/lib/utils";
import { StackItem, StackList } from "./stack";

type Tone = "paper" | "blush" | "night";

// One card per service. Each carries the real screen of the app it shipped in, and the ground of that app.
const cards: { tone: Tone; visual: Visual }[] = [
  { tone: "paper", visual: { kind: "screen", src: "/apps/qalbify/screen-home.jpg", w: 626, h: 1356, ground: "night" } },
  {
    tone: "blush",
    visual: { kind: "screen", src: "/apps/ayyami/screen-prayer.jpg", w: 636, h: 1418, ground: "blush" },
  },
  {
    tone: "night",
    visual: { kind: "screen", src: "/apps/qalbify/screen-editor.jpg", w: 666, h: 1447, ground: "night" },
  },
  { tone: "paper", visual: { kind: "waveform" } },
  {
    tone: "blush",
    visual: { kind: "screen", src: "/apps/ayyami/screen-calendar.jpg", w: 592, h: 1052, ground: "blush" },
  },
];

type Visual = { kind: "screen"; src: string; w: number; h: number; ground: "night" | "blush" } | { kind: "waveform" };

const toneClass: Record<Tone, string> = {
  paper: "bg-paper-2 text-ink ring-black/5",
  blush: "bg-blush text-ink ring-black/5",
  night: "on-night bg-night text-on-night ring-white/10",
};

const bars = seeded(40, 5).map((v, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 0.5)) * (0.55 + 0.45 * v));

function CardVisual({ visual, alt }: { visual: Visual; alt: string }) {
  if (visual.kind === "waveform") {
    return (
      <div className="flex h-full flex-col justify-center gap-6 bg-paper p-8">
        <div className="flex h-24 items-center gap-[3px]" aria-hidden="true">
          {bars.map((h, i) => (
            <span
              key={i}
              className="min-w-0 flex-1 rounded-full bg-qalbify"
              style={{ height: `${Math.round(h * 100)}%` }}
            />
          ))}
        </div>
        <p className="flex items-baseline justify-between gap-4 border-t border-line pt-4 text-sm text-ink-soft">
          <span>Ad breaks in a Qalbify recitation</span>
          <span className="font-display text-3xl text-ink tabular-nums">0</span>
        </p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden",
        visual.ground === "night"
          ? "bg-night-2 bg-[radial-gradient(60%_50%_at_50%_30%,rgb(47_211_180/0.16),transparent_70%)]"
          : "bg-blush-2",
      )}
    >
      <div className="absolute top-8 left-1/2 w-[58%] max-w-64 -translate-x-1/2">
        <div className="overflow-hidden rounded-3xl bg-white shadow-float ring-1 ring-black/10">
          <Image
            src={visual.src}
            alt={alt}
            width={visual.w}
            height={visual.h}
            sizes="256px"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ index, total }: { index: number; total: number }) {
  const service = services[index];
  const card = cards[index];

  return (
    <StackItem
      index={index}
      className={cn(
        "grid overflow-hidden rounded-4xl shadow-[0_-16px_40px_-24px_rgb(30_26_17/0.35)] ring-1 md:h-[28rem] md:grid-cols-2",
        toneClass[card.tone],
      )}
    >
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-center justify-between gap-4">
          <span
            className={cn(
              "font-display text-2xl tabular-nums",
              card.tone === "night" ? "text-brass-bright" : "text-brass",
            )}
          >
            0{index + 1}
          </span>
          <span className={cn("label", card.tone === "night" ? "text-on-night-soft" : "text-ink-soft")}>
            {index + 1} of {total}
          </span>
        </div>
        <h3 className="mt-8 font-display text-3xl leading-tight md:mt-auto md:text-4xl">{service.title}</h3>
        <p
          className={cn(
            "mt-4 max-w-md text-base leading-7",
            card.tone === "night" ? "text-on-night-soft" : "text-ink-soft",
          )}
        >
          {service.body}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className={cn("mr-1 text-sm", card.tone === "night" ? "text-on-night-soft" : "text-ink-soft")}>
            Shipped in
          </span>
          {service.shipped.map((key) => (
            <span
              key={key}
              className={cn(
                "inline-flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-sm font-semibold",
                card.tone === "night" ? "bg-white/10 text-on-night" : "bg-white/70 text-ink ring-1 ring-black/5",
              )}
            >
              <Image
                src={apps[key].icon}
                alt=""
                width={24}
                height={24}
                className="size-6 rounded-full bg-white outline-1 -outline-offset-1 outline-black/10"
              />
              {apps[key].name}
            </span>
          ))}
        </div>
      </div>
      <div className="h-64 p-2 pt-0 md:h-auto md:p-2 md:pl-0">
        <div className="h-full overflow-hidden rounded-2xl">
          <CardVisual visual={card.visual} alt={`${service.title}, as shipped in ${apps[service.shipped[0]].name}.`} />
        </div>
      </div>
    </StackItem>
  );
}

/** Services as a stack: each card pins below the last and slides over it as you scroll. */
export function ServiceStack() {
  return (
    <StackList total={services.length} className="mt-16 space-y-6 md:mt-20 md:space-y-10">
      {services.map((s, i) => (
        <Card key={s.title} index={i} total={services.length} />
      ))}
    </StackList>
  );
}
