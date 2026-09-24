import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/site/mark";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy · Ruhi IT Hub",
  description: "How the Ruhi IT Hub website handles your information.",
};

export default function Privacy() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Link href="/" aria-label="Ruhi IT Hub home">
        <Wordmark />
      </Link>
      <h1 className="mt-16 font-display text-5xl text-ink">Privacy</h1>
      <p className="mt-3 text-sm text-ink-soft">Website notice. Last updated {site.privacyUpdated}.</p>
      <div className="mt-10 max-w-xl space-y-6 text-lg leading-8 text-ink-soft">
        <p>
          This website does not use cookies, analytics or advertising trackers, and it does not store anything you type
          into the contact form. Sending the form opens your own email app; nothing reaches us until you press send
          there.
        </p>
        <p>
          When you email us, we use your message and address only to reply and to discuss your project. We do not sell
          or share it.
        </p>
        <p>
          Each of our apps has its own privacy policy, linked from its Google Play listing. To ask about your data,
          write to{" "}
          <a
            className="font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-brass"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>
      </div>
      <Link
        href="/"
        className="mt-16 inline-block text-base font-semibold text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors duration-200 hover:decoration-brass"
      >
        Back to the home page
      </Link>
    </main>
  );
}
