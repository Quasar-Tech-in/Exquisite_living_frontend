"use client";

import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";
import { useViewportScale } from "./useViewportScale";

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
  const { scale } = useViewportScale();

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!isActive) return;
    // Gate on input modality, not viewport width — a 900px mouse-driven
    // window should still get parallax, and a touch-only tablet shouldn't.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive, mouseX, mouseY]);

  // ── layer offsets (edge-safe ranges — see architecture notes) ────────────────
  const cloudX = useTransform(smoothX, [-1, 1], [-25 * scale, 25 * scale]);
  const cloudY = useTransform(smoothY, [-1, 1], [-25 * scale, 25 * scale]);

  const bgX = useTransform(smoothX, [-1, 1], [-35 * scale, 35 * scale]);
  const bgY = useTransform(smoothY, [-1, 1], [-20 * scale, 20 * scale]);

  // floor: 110vw wide → 5vw overflow each side, parallax well within that buffer
  const floorX = useTransform(smoothX, [-1, 1], [-40 * scale, 40 * scale]);
  const floorY = useTransform(smoothY, [-1, 1], [-12 * scale, 12 * scale]);

  // bushes: scale:1.1 + h-[calc(100%+64px)] give sufficient edge buffer
  const fgX = useTransform(smoothX, [-1, 1], [-80 * scale, 80 * scale]);
  const fgY = useTransform(smoothY, [-1, 1], [-25 * scale, 25 * scale]);

  const textX = useTransform(smoothX, [-1, 1], [-45 * scale, 45 * scale]);
  const carouselX = useTransform(smoothX, [-1, 1], [-45 * scale, 45 * scale]);

  return { cloudX, cloudY, bgX, bgY, floorX, floorY, fgX, fgY, textX, carouselX };
}
