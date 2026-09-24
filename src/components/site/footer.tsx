import Link from "next/link";
import { apps, site } from "@/lib/content";
import { Wordmark } from "./mark";
import { Lattice } from "./rosette";
import { SplitHeading } from "./split-heading";

export function Footer() {
  const year = 2026;
  return (
    <footer data-nav-tone="dark" className="on-night relative overflow-hidden bg-night text-on-night">
      <Lattice
        id="lattice-footer"
        className="absolute inset-x-0 bottom-0 h-72 w-full text-on-night/[0.05] [mask-image:linear-gradient(to_top,black,transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 md:px-8 md:pt-32">
        <SplitHeading
          as="p"
          text="Build something people can trust with their prayers."
          accentLast={2}
          accentClass="text-brass-bright"
          className="max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl"
        />

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Wordmark tone="night" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-on-night-soft">
              Mobile apps for Muslim life, designed and built in {site.city}, {site.country}.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 text-sm md:col-span-6 md:col-start-6 md:grid-cols-3"
          >
            <div>
              <p className="label text-on-night-soft">Studio</p>
              <ul className="mt-4 space-y-3">
                {[
                  ["#work", "Work"],
                  ["#services", "Services"],
                  ["#process", "Process"],
                  ["#faq", "FAQ"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-on-night transition-colors duration-200 hover:text-brass-bright">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-on-night-soft">Apps</p>
              <ul className="mt-4 space-y-3">
                {[apps.qalbify, apps.ayyami].map((a) => (
                  <li key={a.name}>
                    <a
                      href={a.store}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-night transition-colors duration-200 hover:text-brass-bright"
                    >
                      {a.name}
                      <span className="sr-only"> on Google Play (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-on-night-soft">Contact</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-on-night transition-colors duration-200 hover:text-brass-bright"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="text-on-night-soft">
                  {site.city}, {site.country}
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 text-sm text-on-night-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ruhi IT Hub. All rights reserved.</p>
          <Link href="/privacy" className="transition-colors duration-200 hover:text-on-night">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
