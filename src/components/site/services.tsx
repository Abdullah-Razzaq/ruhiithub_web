import { Reveal } from "./reveal";
import { ServiceStack } from "./service-stack";
import { SplitHeading } from "./split-heading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <SplitHeading
            id="services-title"
            text="Five things we have already shipped, and can ship for you."
            className="font-display text-4xl leading-[1.08] text-ink md:text-5xl lg:col-span-7"
          />
          <Reveal
            delay={0.2}
            className="max-w-md self-end text-base leading-7 text-ink-soft md:text-lg md:leading-8 lg:col-span-4 lg:col-start-9"
          >
            <p>
              Every service below is live inside one of our own apps, so you can open the store and judge the work for
              yourself.
            </p>
          </Reveal>
        </div>

        <ServiceStack />
      </div>
    </section>
  );
}
