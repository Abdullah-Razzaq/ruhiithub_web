import { khatamPath } from "@/lib/geometry";
import { cn } from "@/lib/utils";

/** Constructed brand mark: the eight fold star with a still centre. Replace with the official logo when one exists. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden="true" focusable="false">
      <path d={khatamPath(16, 16, 14.5)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3.2" fill="var(--color-brass)" />
    </svg>
  );
}

export function Wordmark({ className, tone = "ink" }: { className?: string; tone?: "ink" | "night" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className={tone === "night" ? "text-on-night" : "text-ink"} />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-xl">Ruhi</span>
        <span
          className={cn(
            "text-xs font-semibold tracking-[0.14em] uppercase",
            tone === "night" ? "text-on-night-soft" : "text-ink-soft",
          )}
        >
          IT Hub
        </span>
      </span>
    </span>
  );
}
