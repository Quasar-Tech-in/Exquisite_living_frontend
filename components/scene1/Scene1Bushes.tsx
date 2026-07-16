"use client";

import { motion, type MotionValue } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Props {
  fgX: MotionValue<number>;
  fgY: MotionValue<number>;
  isReturning?: boolean;
}

const entryTransition = { duration: 2, ease: [0.9, 0, 0.1, 1] } as const;
const exitTransition = { duration: 0.9, ease: [0.8, 0, 1, 0.2] } as const;
const returnTransition = { duration: 1.2, ease: [0.9, 0, 0.1, 1] } as const;

// -top-8 / h-[calc(100%+64px)] gives 32px top+bottom overflow so fgY(±25px) never exposes edges
const bushClassName =
  "pointer-events-none absolute -top-8 h-[calc(100%+64px)] w-auto max-w-none";

export default function Scene1Bushes({ fgX, fgY, isReturning = false }: Props) {
  const { scene } = useScene();
  const isExiting = scene === "transitioning";
  // isMobile is ONLY used for animate targets, never for `initial`.
  // This avoids the hydration false-start (useMediaQuery initialises to false on SSR).
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Resting position: desktop keeps bushes partially framing the scene (70vw from their edge).
  // Mobile pushes them fully off-screen (120vw so even large images are hidden).
  const restingRight = isMobile ? "120vw" : "70vw";
  const restingLeft  = isMobile ? "120vw" : "70vw";

  return (
    <>
      {/*
        Left bush — positioned with CSS `right`.
        Starts at right:"-30vw" so the image extends 30vw past the right edge into the center,
        ensuring full overlap with the right bush regardless of image width.
        Animates to restingRight (off-screen on mobile, framing on desktop).
        Exit (desktop): scale up + strong leftward x — same as original desktop behaviour.
        Exit (mobile): NO scale (scaling from center causes inward pop) — just a fast x-slide outward.
      */}
      <motion.img
        src={"left-full.webp"}
        className={bushClassName}
        style={{
          zIndex: 8,
          ...(isExiting ? {} : { x: fgX }),
          y: fgY,
        }}
        initial={{ right: "-30vw", scale: 1.1 }}
        animate={
          isExiting
            ? isMobile
              ? { right: restingRight, x: "-150vw", scale: 1.1 }   // mobile: slide out, no scale
              : { right: "70vw", x: "-150vw", scale: 2.5 }          // desktop: unchanged
            : { right: restingRight, scale: 1.1 }
        }
        transition={isExiting ? exitTransition : entryTransition}
      />

      {/*
        Right bush — positioned with CSS `left`.
        Starts at left:"-30vw" so the image extends 30vw past the left edge into the center.
        Exit (desktop): scale up + strong rightward x — unchanged.
        Exit (mobile): NO scale — fast x-slide outward to the right.
      */}
      <motion.img
        src={"right-full.webp"}
        className={bushClassName}
        style={{
          zIndex: 8,
          ...(isExiting ? {} : { x: fgX }),
          y: fgY,
        }}
        initial={{ left: "-30vw", scale: 1.1 }}
        animate={
          isExiting
            ? isMobile
              ? { left: restingLeft, x: "150vw", scale: 1.1 }       // mobile: slide out, no scale
              : { left: "70vw", x: "150vw", scale: 2.5 }            // desktop: unchanged
            : { left: restingLeft, scale: 1.1 }
        }
        transition={isExiting ? exitTransition : entryTransition}
      />
    </>
  );
}
