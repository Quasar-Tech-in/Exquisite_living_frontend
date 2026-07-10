"use client";

import { motion, type MotionValue } from "framer-motion";
import { useScene } from "@/context/SceneContext";

interface Props {
  cloudX: MotionValue<number>;
  cloudY: MotionValue<number>;
}

const transition = { duration: 2, ease: [0.9, 0, 0.1, 1] } as const;

export default function Scene2CloudsLayer({ cloudX, cloudY }: Props) {
  const { scene, isHoveringEnter } = useScene();
  const shouldDarken = scene === "transitioning" || scene === "scene2";

  return (
    <>
      {/* Base Clouds Layer */}
      <motion.img
        src={"clouds.webp"}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-110"
        style={{ zIndex: 1, x: cloudX, y: cloudY }}
        initial={{ scale: 1.5 }}
        animate={{ scale: scene === "scene2" || scene === "transitioning" ? 1.1 : (isHoveringEnter ? 1.3 : 1.5) }}
        transition={transition}
      />

      {/* Darkening Gradient Overlay (dullest at top, completely fades out by 60%) */}
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full bg-linear-to-b from-black/70 to-transparent to-60%"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldDarken ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.8, 0, 1, 0.2] }}
      />
    </>
  );
}
