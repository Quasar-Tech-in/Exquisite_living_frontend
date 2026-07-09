"use client";

import { motion, type MotionValue } from "framer-motion";
import { useScene } from "@/context/SceneContext";

interface Props {
  bgX: MotionValue<number>;
  bgY: MotionValue<number>;
  onEntryComplete: () => void;
}

const entryTransition = { duration: 2, ease: [0.9, 0, 0.1, 1] } as const;
const exitTransition = { duration: 1.2, ease: [0.8, 0, 1, 0.2] } as const;

/**
 * bg1.png — owns both entry (scale in) and exit (scale up + fade).
 * Its exit onAnimationComplete is the authoritative signal to advance to scene2,
 * since bg1 is the last element to finish animating out (~1.2s total).
 */
export default function Scene1BgLayer({ bgX, bgY, onEntryComplete }: Props) {
  const { scene, completeTransition } = useScene();
  const isExiting = scene === "transitioning";

  return (
    <motion.img
      src={"bg1.png"}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      style={{ zIndex: 6, x: bgX, y: bgY }}
      initial={{ scale: 1.3 }}
      animate={isExiting ? { scale: 6 } : { scale: 1.08 }}
      transition={isExiting ? exitTransition : entryTransition}
      onAnimationComplete={isExiting ? completeTransition : onEntryComplete}
    />
  );
}
