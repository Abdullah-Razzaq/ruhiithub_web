import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs, site } from "@/lib/content";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SplitHeading
              id="faq-title"
              text="Questions we hear before a project starts."
              className="font-display text-5xl leading-[1.04] text-ink md:text-6xl lg:text-7xl"
            />
            <p className="mt-8 max-w-sm text-lg leading-8 text-ink-soft">
              Something else on your mind? Write to{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-brass"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6 lg:pt-4">
          <Accordion type="single" collapsible defaultValue="faq-0" className="border-t border-line">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="gap-8 py-7 font-display text-2xl leading-tight font-normal md:py-9 md:text-3xl [&>span]:size-12 [&>span_svg]:size-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-xl pb-9 text-lg leading-8">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
