import Link from "next/link";
import { Wordmark } from "@/components/site/mark";
import { Rosette } from "@/components/site/rosette";

export default function NotFound() {
  return (
    <main
      id="main"
      className="grain relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <Rosette className="absolute top-1/2 left-1/2 w-[640px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 text-brass/20" />
      <div className="relative">
        <Link href="/" aria-label="Ruhi IT Hub home">
          <Wordmark />
        </Link>
        <h1 className="mt-12 font-display text-5xl leading-[1.08] text-ink md:text-6xl">This page is not here.</h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-ink-soft">
          The link may be old, or the page may have moved. Everything we make is one step away on the home page.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-paper transition-[background-color,scale] duration-150 hover:bg-ink/85 active:scale-[0.97]"
        >
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
