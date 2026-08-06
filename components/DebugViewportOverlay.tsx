"use client";

// Temporary, dev-only readout for tuning the responsive/orientation fixes
// against a real device. Remove once CARD_H_FRACTION (useViewportScale.ts)
// is confirmed and the layout is verified on-device.
import { useSyncExternalStore } from "react";
import { useViewportScale } from "@/hooks/useViewportScale";

interface Snapshot {
  innerWidth: number;
  innerHeight: number;
  dvh: number;
  pointerFine: boolean;
  safeAreaBottom: number;
}

// Measures live values via a hidden probe element rather than reading a CSS
// custom property, so this file is fully self-contained — nothing to add to
// (or remember to remove from) globals.css alongside it.
function measure(cssHeight: string): number {
  const probe = document.createElement("div");
  probe.style.height = cssHeight;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const value = probe.offsetHeight;
  document.body.removeChild(probe);
  return value;
}

// useSyncExternalStore requires getSnapshot to return a stable reference when
// nothing has changed, or React re-renders forever. Cache against the one
// thing that actually varies from call to call: viewport size.
let cached: Snapshot | null = null;

function getSnapshot(): Snapshot {
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  if (cached && cached.innerWidth === innerWidth && cached.innerHeight === innerHeight) {
    return cached;
  }

  cached = {
    innerWidth,
    innerHeight,
    dvh: measure("100dvh"),
    pointerFine: window.matchMedia("(pointer: fine)").matches,
    safeAreaBottom: measure("env(safe-area-inset-bottom, 0px)"),
  };
  return cached;
}

const SERVER_SNAPSHOT: Snapshot = {
  innerWidth: 0,
  innerHeight: 0,
  dvh: 0,
  pointerFine: false,
  safeAreaBottom: 0,
};

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  window.addEventListener("orientationchange", callback);
  return () => {
    window.removeEventListener("resize", callback);
    window.removeEventListener("orientationchange", callback);
  };
}

export default function DebugViewportOverlay() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
  const { scale, isCompact } = useViewportScale();

  return (
    <div
      className="pointer-events-none fixed top-1 left-1 flex flex-col gap-0.5 rounded bg-black/80 px-2 py-1.5 font-mono text-[10px] leading-tight text-lime-300"
      style={{ zIndex: 99999 }}
    >
      <span>
        {snap.innerWidth} × {snap.innerHeight} (dvh: {snap.dvh})
      </span>
      <span>scale: {scale.toFixed(3)} · isCompact: {String(isCompact)}</span>
      <span>pointer-fine: {String(snap.pointerFine)} · safe-bottom: {snap.safeAreaBottom}px</span>
    </div>
  );
}
