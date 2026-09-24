// Geometry for the eight fold star (khatam) used across the brand.

const round = (n: number) => Math.round(n * 100) / 100;

/** Alternating radius star outline: `points` tips, outer radius R, inner radius r. */
export function starPath(cx: number, cy: number, R: number, r: number, points = 8, rotation = 0) {
  const d: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? R : r;
    const a = (i * Math.PI) / points + rotation - Math.PI / 2;
    d.push(`${i === 0 ? "M" : "L"}${round(cx + radius * Math.cos(a))} ${round(cy + radius * Math.sin(a))}`);
  }
  return d.join(" ") + " Z";
}

/** The two overlapping squares star: tips at R, inner corners where the square edges cross. */
export function khatamPath(cx: number, cy: number, R: number, rotation = 0) {
  const half = R / Math.SQRT2;
  const inner = half / Math.cos(Math.PI / 8);
  return starPath(cx, cy, R, inner, 8, rotation);
}

/** A {n/k} star polygon drawn as one continuous path. */
export function starPolygonPath(cx: number, cy: number, R: number, n = 8, k = 3, rotation = 0) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n + rotation - Math.PI / 2;
    return [round(cx + R * Math.cos(a)), round(cy + R * Math.sin(a))] as const;
  });
  const d: string[] = [];
  let i = 0;
  for (let step = 0; step <= n; step++) {
    const [x, y] = pts[i];
    d.push(`${step === 0 ? "M" : "L"}${x} ${y}`);
    i = (i + k) % n;
  }
  return d.join(" ");
}

/** Deterministic pseudo random values so server and client render identical bars. */
export function seeded(count: number, seed = 1) {
  return Array.from({ length: count }, (_, i) => {
    const x = Math.sin((i + 1) * 12.9898 * seed) * 43758.5453;
    return x - Math.floor(x);
  });
}
