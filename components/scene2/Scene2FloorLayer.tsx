"use client";

import { motion, type MotionValue } from "framer-motion";

interface Props {
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
}

export default function Scene2FloorLayer({ floorX, floorY }: Props) {
  return (
    // wrapper owns geometry; framer-motion only handles parallax x/y
    <motion.div
      className="pointer-events-none absolute bottom-[-80px] left-1/2 w-[110vw] -translate-x-1/2"
      style={{ zIndex: 2, x: floorX, y: floorY }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={"preenchimento-generativo.png"}
        alt=""
        className="block h-auto w-full"
      />
    </motion.div>
  );
}
