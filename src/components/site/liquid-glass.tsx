"use client";

import { useEffect, useState, type RefObject } from "react";

type GlassMap = { href: string; width: number; height: number };

/**
 * Builds a displacement map for a capsule the size of `el`: pixels near the rim sample from further inside,
 * so whatever scrolls under the glass bends at the edges like light through a lens. The centre stays neutral.
 * Red and green encode the x and y offsets around a neutral 128.
 */
function capsuleMap(width: number, height: number, band: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const image = ctx.createImageData(width, height);
  const r = height / 2;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const cx = Math.min(Math.max(px, r), width - r);
      const vx = px - cx;
      const vy = py - r;
      const len = Math.hypot(vx, vy) || 1;
      const inside = r - len; // distance from the rim, positive inside
      let dx = 0;
      let dy = 0;
      if (inside > 0 && inside < band) {
        const t = 1 - inside / band;
        const strength = t * t * (3 - 2 * t); // smoothstep: strongest right at the rim
        dx = (-vx / len) * strength;
        dy = (-vy / len) * strength;
      }
      const i = (y * width + x) * 4;
      image.data[i] = 128 + dx * 127;
      image.data[i + 1] = 128 + dy * 127;
      image.data[i + 2] = 128;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

function supportsRefraction() {
  if (typeof navigator === "undefined") return false;
  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
  const chromium = !!brands?.some((b) => /Chromium|Google Chrome|Microsoft Edge/.test(b.brand));
  const reducedTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
  return chromium && !reducedTransparency;
}

/** Returns the displacement map for `ref`'s element, regenerated when its size changes. Chromium only. */
export function useLiquidGlass(ref: RefObject<HTMLElement | null>) {
  const [map, setMap] = useState<GlassMap | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !supportsRefraction()) return;
    let frame = 0;
    const build = () => {
      const width = Math.round(el.offsetWidth);
      const height = Math.round(el.offsetHeight);
      if (!width || !height) return;
      setMap((prev) =>
        prev && prev.width === width && prev.height === height
          ? prev
          : { href: capsuleMap(width, height, Math.min(height / 2, 18)), width, height },
      );
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(build);
    });
    observer.observe(el);
    build();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ref]);

  return map;
}

/** The SVG filter referenced by `.lg-refract .lg-backdrop` in globals.css. */
export function LiquidGlassFilter({ map }: { map: GlassMap }) {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <filter
        id="liquid-glass-refraction"
        x="0"
        y="0"
        width={map.width}
        height={map.height}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="soft" />
        <feImage
          href={map.href}
          x="0"
          y="0"
          width={map.width}
          height={map.height}
          preserveAspectRatio="none"
          result="lens"
        />
        <feDisplacementMap in="soft" in2="lens" scale="36" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
