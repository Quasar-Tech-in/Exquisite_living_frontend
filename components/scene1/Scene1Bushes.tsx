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
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {/*
        Left bush — entry: slides in from right edge to 70vw.
        Exit: parallax x is removed so animate.x can drive it freely;
        translates -1500px (off-screen left) while scaling up to 2.5x.
        Return: slides back in from off-screen left to resting position.
      */}
      <motion.img
        src={"left-full.webp"}
        className={bushClassName}
        style={{
          zIndex: 8,
          // During exit we drop fgX so animate.x owns the translation exclusively
          ...(isExiting ? {} : { x: fgX }),
          y: fgY,
        }}
        initial={{ right: isMobile ? "25vw" : 0, scale: 1.1 }}
        animate={
          isExiting
            ? { right: isMobile ? "100vw" : "70vw", x: "-150vw", scale: 2.5 }
            : { right: isMobile ? "100vw" : "70vw", scale: 1.1 }
        }
        transition={isExiting ? exitTransition : entryTransition}
      />

      {/*
        Right bush — entry: slides in from left edge to 70vw.
        Exit: translates +1500px (off-screen right) while scaling up to 2.5x.
        Return: slides back in from off-screen right to resting position.
      */}
      <motion.img
        src={"right-full.webp"}
        className={bushClassName}
        style={{
          zIndex: 8,
          ...(isExiting ? {} : { x: fgX }),
          y: fgY,
        }}
        initial={{ left: isMobile ? "25vw" : 0, scale: 1.1 }}
        animate={
          isExiting
            ? { left: isMobile ? "100vw" : "70vw", x: "150vw", scale: 2.5 }
            : { left: isMobile ? "100vw" : "70vw", scale: 1.1 }
        }
        transition={isExiting ? exitTransition : entryTransition}
      />
    </>
  );
}
