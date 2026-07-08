"use client";

import { motion, type MotionValue } from "framer-motion";

interface Props {
  cloudX: MotionValue<number>;
  cloudY: MotionValue<number>;
}

const transition = { duration: 2, ease: [0.9, 0, 0.1, 1] } as const;

export default function Scene2CloudsLayer({ cloudX, cloudY }: Props) {
  return (
    <motion.img
      src={"clouds.png"}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      style={{ zIndex: 1, x: cloudX, y: cloudY }}
      initial={{ scale: 1.5 }}
      animate={{ scale: 1.1 }}
      transition={transition}
    />
  );
}
