"use client";

import { motion, type MotionValue } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { useViewportScale } from "@/hooks/useViewportScale";

interface Props {
  fgX: MotionValue<number>;
  fgY: MotionValue<number>;
  isReturning?: boolean;
}

const entryTransition = { duration: 2, ease: [0.9, 0, 0.1, 1] } as const;
const exitTransition = { duration: 0.9, ease: [0.8, 0, 1, 0.2] } as const;
// Match entry pace — bushes slide back in from their exited state
const returnTransition = { duration: 2, ease: [0.9, 0, 0.1, 1] } as const;

// -top-8 / h-[calc(100%+64px)] gives 32px top+bottom overflow so fgY(±25px) never exposes edges
const bushClassName =
  "pointer-events-none absolute -top-8 h-[calc(100%+64px)] w-auto max-w-none";

export default function Scene1Bushes({ fgX, fgY, isReturning = false }: Props) {
  const { scene } = useScene();
  const isExiting = scene === "transitioning";
  // InnerPage (the only place this mounts) is gated behind isLoaded, so this
  // never server-renders — the real value is available on the first render,
  // no SSR/hydration mismatch to guard against.
  const { isCompact } = useViewportScale();

  // Resting position: desktop keeps bushes partially framing the scene (70vw from their edge).
  // Compact (narrow OR short, e.g. a landscape phone) pushes them fully off-screen (120vw).
  const restingRight = isCompact ? "120vw" : "70vw";
  const restingLeft = isCompact ? "120vw" : "70vw";

  // Exit state mirrors the `animate` isExiting target below, so `isReturning`
  // always starts from wherever this device's exit animation actually left off
  // — instead of a hardcoded desktop-shaped state on every device.
  const exitedRight = isCompact
    ? { right: restingRight, x: "-150vw", scale: 1.1 }
    : { right: "70vw", x: "-150vw", scale: 2.5 };
  const exitedLeft = isCompact
    ? { left: restingLeft, x: "150vw", scale: 1.1 }
    : { left: "70vw", x: "150vw", scale: 2.5 };

  return (
    <>
      {/*
        Left bush — positioned with CSS `right`.
        Entry: sweeps in from center (right: -30vw) to resting.
        Exit  (entering scene2): scale up + strong leftward x on desktop; flat slide-out on compact.
        Return (exiting scene2): starts from the exited position and reverses back to resting.
      */}
      <motion.img
        src={"left-full.webp"}
        className={bushClassName}
        style={{
          zIndex: 8,
          ...((isExiting || isReturning) ? {} : { x: fgX }),
          y: fgY,
        }}
        initial={isReturning ? exitedRight : { right: "-30vw", scale: 1.1 }}
        animate={isExiting ? exitedRight : { right: restingRight, x: 0, scale: 1.1 }}
        transition={
          isExiting ? exitTransition
          : isReturning ? returnTransition
          : entryTransition
        }
      />

      {/*
        Right bush — positioned with CSS `left`.
        Entry: sweeps in from center (left: -30vw) to resting.
        Exit  (entering scene2): scale up + strong rightward x on desktop; flat slide-out on compact.
        Return (exiting scene2): starts from the exited position and reverses back to resting.
      */}
      <motion.img
        src={"right-full.webp"}
        className={bushClassName}
        style={{
          zIndex: 8,
          ...((isExiting || isReturning) ? {} : { x: fgX }),
          y: fgY,
        }}
        initial={isReturning ? exitedLeft : { left: "-30vw", scale: 1.1 }}
        animate={isExiting ? exitedLeft : { left: restingLeft, x: 0, scale: 1.1 }}
        transition={
          isExiting ? exitTransition
          : isReturning ? returnTransition
          : entryTransition
        }
      />
    </>
  );
}
