"use client";

import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";

export interface ParallaxValues {
  cloudX: MotionValue<number>;
  cloudY: MotionValue<number>;
  bgX: MotionValue<number>;
  bgY: MotionValue<number>;
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
  fgX: MotionValue<number>;
  fgY: MotionValue<number>;
  textX: MotionValue<number>;
  carouselX: MotionValue<number>;
}

/**
 * Tracks mouse position and returns layered parallax motion values.
 * @param isActive - when false, no mouse events are registered (during entry animation).
 */
export function useParallax(isActive: boolean): ParallaxValues {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive, mouseX, mouseY]);

  // ── layer offsets (edge-safe ranges — see architecture notes) ────────────────
  const cloudX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const cloudY = useTransform(smoothY, [-1, 1], [-25, 25]);

  const bgX = useTransform(smoothX, [-1, 1], [-35, 35]);
  const bgY = useTransform(smoothY, [-1, 1], [-20, 20]);

  // floor: 110vw wide → 5vw overflow each side, parallax well within that buffer
  const floorX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const floorY = useTransform(smoothY, [-1, 1], [-12, 12]);

  // bushes: scale:1.1 + h-[calc(100%+64px)] give sufficient edge buffer
  const fgX = useTransform(smoothX, [-1, 1], [-80, 80]);
  const fgY = useTransform(smoothY, [-1, 1], [-25, 25]);

  const textX = useTransform(smoothX, [-1, 1], [-45, 45]);
  const carouselX = useTransform(smoothX, [-1, 1], [-45, 45]);

  return { cloudX, cloudY, bgX, bgY, floorX, floorY, fgX, fgY, textX, carouselX };
}
