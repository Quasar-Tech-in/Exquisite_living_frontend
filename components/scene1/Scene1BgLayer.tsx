"use client";

import { motion, type MotionValue } from "framer-motion";
import { useScene } from "@/context/SceneContext";

interface Props {
  bgX: MotionValue<number>;
  bgY: MotionValue<number>;
  onEntryComplete: () => void;
  isReturning?: boolean;
}

const entryTransition = { duration: 2, ease: [0.9, 0, 0.1, 1] } as const;
const exitTransition = { duration: 1.2, ease: [0.8, 0, 1, 0.2] } as const;
// Mirror of exitTransition but playing in reverse — same ease, slightly longer for drama
const returnTransition = { duration: 1.4, ease: [0.9, 0, 0.1, 1] } as const;

/**
 * bg1.png — owns both entry (scale in), exit (scale up + fade), and reverse entry.
 * Its exit onAnimationComplete is the authoritative signal to advance to scene2.
 * Its return onAnimationComplete signals the scene is fully back to scene1.
 */
export default function Scene1BgLayer({ bgX, bgY, onEntryComplete, isReturning = false }: Props) {
  const { scene, completeTransition, completeReturn } = useScene();
  const isExiting = scene === "transitioning";

  return (
    <motion.img
      src={"bg1.png"}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      style={{ zIndex: 6, x: bgX, y: bgY }}
      // When returning: start zoomed in (where Scene 2 left off) and scale back down
      initial={isReturning ? { scale: 6 } : { scale: 1.3 }}
      animate={isExiting ? { scale: 6 } : { scale: 1.08 }}
      transition={isExiting ? exitTransition : isReturning ? returnTransition : entryTransition}
      onAnimationComplete={
        isExiting ? completeTransition : isReturning ? completeReturn : onEntryComplete
      }
    />
  );
}
