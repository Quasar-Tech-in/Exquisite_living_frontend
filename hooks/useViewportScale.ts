"use client";

import { useSyncExternalStore } from "react";
import { CARD_H } from "@/lib/wheelGeometry";

// Fraction of viewport height the active ferris-wheel card should occupy.
// Desktop (1440x900) and portrait phones already land close to this by virtue
// of the width curve below; this constant is what keeps landscape phones
// (wide but short) on the same target instead of the width curve alone
// pushing the card to ~45% of screen height. Starting estimate — expect to
// tune against a real device.
const CARD_H_FRACTION = 0.3;

function computeScale(width: number, height: number): number {
  let widthScale: number;

  // Fluid scale based on width to avoid collapsing on mobile aspect ratios
  if (width < 640) {
    // Mobile: 0.90 to 1.05 (large cards on mobile)
    widthScale = 0.9 + (Math.max(0, width - 320) / 320) * 0.15;
  } else if (width < 1024) {
    // Tablet: 0.6 to 0.85 (original)
    widthScale = 0.6 + ((width - 640) / 384) * 0.25;
  } else {
    // Desktop: 0.85 to 1.15 (original)
    widthScale = 0.85 + ((width - 1024) / 896) * 0.3;
  }
  widthScale = Math.max(0.45, Math.min(widthScale, 1.2));

  // Height cap: holds the active card at ~CARD_H_FRACTION of viewport height
  // regardless of aspect ratio. This is what fixes landscape phones — the
  // width curve alone has no signal that the viewport is short.
  const heightCap = (height * CARD_H_FRACTION) / CARD_H;

  return Math.max(0.35, Math.min(widthScale, heightCap, 1.2));
}

interface ViewportState {
  scale: number;
  width: number;
  height: number;
  /** True when either dimension is tight enough that layouts should compress. */
  isCompact: boolean;
}

// Matches the `short` custom variant in globals.css (max-height: 520px) and
// Tailwind's `md` breakpoint (768px), so CSS and JS agree by construction.
const COMPACT_WIDTH = 768;
const COMPACT_HEIGHT = 520;

const SERVER_SNAPSHOT: ViewportState = {
  scale: 1,
  width: 1440,
  height: 900,
  isCompact: false,
};

let cached: ViewportState | null = null;

function getSnapshot(): ViewportState {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (cached && cached.width === width && cached.height === height) {
    return cached;
  }

  cached = {
    scale: computeScale(width, height),
    width,
    height,
    isCompact: width < COMPACT_WIDTH || height < COMPACT_HEIGHT,
  };
  return cached;
}

function getServerSnapshot(): ViewportState {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("resize", callback);
  window.addEventListener("orientationchange", callback);
  return () => {
    window.removeEventListener("resize", callback);
    window.removeEventListener("orientationchange", callback);
  };
}

export function useViewportScale(): ViewportState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
