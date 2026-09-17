"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";

interface Props {
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
}

export default function Scene2FloorLayer({ floorX, floorY }: Props) {
  return (
    // wrapper owns geometry; framer-motion only handles parallax x/y
    <motion.div
      className="pointer-events-none absolute bottom-[-8vw] left-1/2 w-[110vw] -translate-x-1/2"
      style={{ zIndex: 2, x: floorX, y: floorY }}
    >
      <Image
        src="/preenchimento-generativo.webp"
        alt=""
        width={1920}
        height={391}
        loading="lazy"
        sizes="110vw"
        className="block h-auto w-full"
      />
    </motion.div>
  );
}
