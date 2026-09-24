"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Motion honours the visitor's reduced motion setting everywhere: transforms drop, opacity stays. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
