import { apps, site } from "@/lib/content";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const stats = [
  { value: apps.qalbify.rating, label: `Qalbify's Google Play rating, from ${apps.qalbify.reviews} reviews` },
  { value: apps.qalbify.installs, label: "Qalbify installs" },
  { value: "2", label: "apps live on Google Play" },
  { value: "0", label: "ads across both apps" },
];

export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SplitHeading
          id="proof-title"
          text="Proof you can check on Google Play."
          className="max-w-2xl font-display text-4xl leading-[1.08] text-ink md:text-5xl"
        />

        <dl className="mt-16 grid grid-cols-2 border-y border-line md:mt-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="border-line py-8 odd:border-r max-lg:odd:pr-6 max-lg:even:pl-6 max-lg:nth-[n+3]:border-t lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-5xl leading-none text-ink tabular-nums sm:text-6xl md:text-7xl">
                  {s.value}
                </span>
                <span className="mt-4 block max-w-[14rem] text-sm leading-5 text-ink-soft">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <p className="mt-12 text-sm text-ink-soft">Figures from the public Google Play listings, {site.checkedOn}.</p>
      </div>
    </section>
  );
}
