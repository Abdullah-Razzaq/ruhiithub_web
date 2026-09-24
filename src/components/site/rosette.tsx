import type { CSSProperties } from "react";
import { khatamPath, starPath, starPolygonPath } from "@/lib/geometry";
import { cn } from "@/lib/utils";

const C = 300;

// Concentric rings of the eight fold star family, listed from the centre outwards.
const layers = [
  { d: `M ${C} ${C - 44} a 44 44 0 1 1 0 88 a 44 44 0 1 1 0 -88`, w: 1 },
  { d: starPolygonPath(C, C, 112, 8, 3, Math.PI / 8), w: 0.8 },
  { d: khatamPath(C, C, 168, Math.PI / 8), w: 0.8 },
  { d: khatamPath(C, C, 168), w: 1.2 },
  { d: starPolygonPath(C, C, 236, 8, 3), w: 1 },
  { d: starPath(C, C, 280, 214, 16), w: 1 },
  { d: `M ${C} ${C - 292} a 292 292 0 1 1 0 584 a 292 292 0 1 1 0 -584`, w: 1 },
];

type RosetteProps = {
  className?: string;
  /** Draw the rings from the centre outwards once, starting after `delayMs`. CSS only, skipped for reduced motion. */
  draw?: boolean;
  delayMs?: number;
};

/** The signature rosette. */
export function Rosette({ className, draw = false, delayMs = 0 }: RosetteProps) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("pointer-events-none", draw && "draw-in", className)}
      style={draw ? ({ "--base": `${delayMs}ms` } as CSSProperties) : undefined}
      aria-hidden="true"
      focusable="false"
    >
      {layers.map((layer, i) => (
        <path
          key={i}
          d={layer.d}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={layer.w}
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/** A quiet repeating lattice of stars for dark grounds. Static, decorative. */
export function Lattice({ className, id = "lattice" }: { className?: string; id?: string }) {
  const t = 96;
  const R = 30;
  return (
    <svg className={cn("pointer-events-none", className)} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={t} height={t} patternUnits="userSpaceOnUse">
          <path d={khatamPath(t / 2, t / 2, R)} fill="none" stroke="currentColor" strokeWidth="1" />
          <path
            d={`M ${t / 2 + R} ${t / 2} H ${t + t / 2 - R} M ${t / 2} ${t / 2 + R} V ${t + t / 2 - R} M ${t / 2 - R} ${t / 2} H ${-t / 2 + R} M ${t / 2} ${t / 2 - R} V ${-t / 2 + R}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
