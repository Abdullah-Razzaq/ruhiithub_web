import Image from "next/image";
import { cn } from "@/lib/utils";

type ScreenProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Above the fold: load immediately. Next 16 replaces `priority` with `loading` and `fetchPriority`. */
  eager?: boolean;
  /** The hero's Largest Contentful Paint image. */
  lcp?: boolean;
  sizes?: string;
};

/** A real app screen captured from the store listing. No fake device chrome, one hairline edge. */
export function Screen({
  src,
  alt,
  width,
  height,
  className,
  eager,
  lcp,
  sizes = "(min-width: 1024px) 320px, 70vw",
}: ScreenProps) {
  return (
    <figure className={cn("overflow-hidden rounded-4xl bg-white ring-1 ring-black/10", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager || lcp ? "eager" : undefined}
        fetchPriority={lcp ? "high" : undefined}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </figure>
  );
}
