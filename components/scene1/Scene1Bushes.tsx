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
// Match entry pace — bushes slide back in from their exited state
const returnTransition = { duration: 2, ease: [0.9, 0, 0.1, 1] } as const;

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
        Entry: sweeps in from center (right: -30vw) to resting.
        Exit  (entering scene2): scale up + strong leftward x.
        Return (exiting scene2): starts from the exited position and reverses back to resting.
        NOTE: `initial` uses hardcoded desktop exit values (right:"70vw", x:"-150vw", scale:2.5)
              because isMobile cannot be used in `initial` (SSR hydration risk).
      */}
      <motion.img
        src={"left-full.webp"}
        className={bushClassName}
        style={{
          zIndex: 8,
          ...((isExiting || isReturning) ? {} : { x: fgX }),
          y: fgY,
        }}
        initial={
          isReturning
            ? { right: "70vw", x: "-150vw", scale: 2.5 }  // desktop exit state → reverse from here
            : { right: "-30vw", scale: 1.1 }
        }
        animate={
          isExiting
            ? isMobile
              ? { right: restingRight, x: "-150vw", scale: 1.1 }   // mobile: slide out, no scale
              : { right: "70vw", x: "-150vw", scale: 2.5 }          // desktop: scale + slide left
            : { right: restingRight, x: 0, scale: 1.1 }             // entry + return: settle at resting
        }
        transition={
          isExiting ? exitTransition
          : isReturning ? returnTransition
          : entryTransition
        }
      />

      {/*
        Right bush — positioned with CSS `left`.
        Entry: sweeps in from center (left: -30vw) to resting.
        Exit  (entering scene2): scale up + strong rightward x.
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
        initial={
          isReturning
            ? { left: "70vw", x: "150vw", scale: 2.5 }   // desktop exit state → reverse from here
            : { left: "-30vw", scale: 1.1 }
        }
        animate={
          isExiting
            ? isMobile
              ? { left: restingLeft, x: "150vw", scale: 1.1 }       // mobile: slide out, no scale
              : { left: "70vw", x: "150vw", scale: 2.5 }            // desktop: scale + slide right
            : { left: restingLeft, x: 0, scale: 1.1 }               // entry + return: settle at resting
        }
        transition={
          isExiting ? exitTransition
          : isReturning ? returnTransition
          : entryTransition
        }
      />
    </>
  );
}
