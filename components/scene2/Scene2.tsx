"use client";
import { useState } from "react";

import Scene2CloudsLayer from "./Scene2CloudsLayer";
import Scene2FloorLayer from "./Scene2FloorLayer";
import Scene2WheelLayer from "./Scene2WheelLayer";
import Scene2LowerCloudsLayer from "./Scene2LowerCloudsLayer";
import Scene2HeroText from "./Scene2HeroText";
import { motion, type MotionValue } from "framer-motion";
import { imprima } from "@/lib/fonts";

interface Props {
  cloudX: MotionValue<number>;
  cloudY: MotionValue<number>;
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
  textX: MotionValue<number>;
}

/**
 * Always mounted — sits behind Scene 1 via z-index.
 * Becomes fully visible once Scene 1 exits.
 * Placeholder for future scrolling-cards content.
 */
export default function Scene2({ cloudX, cloudY, floorX, floorY, textX }: Props) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <>
      <Scene2CloudsLayer cloudX={cloudX} cloudY={cloudY} />
      <Scene2FloorLayer floorX={floorX} floorY={floorY} />
      <Scene2WheelLayer activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} />
      <Scene2LowerCloudsLayer floorX={floorX} floorY={floorY} activeCardIndex={activeCardIndex} />
      <Scene2HeroText textX={textX} />

      {/* Floating brand footer */}
      <motion.footer
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-center text-white/50 ${imprima.className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/wordmark_cream.png"
          alt="ExQuisite Living"
          className="h-4 md:h-5 w-auto opacity-80"
        />
        <div className="flex items-center gap-2.5 opacity-40">
          <img src="/icon_tree_cream.png" alt="" className="h-3.5 w-auto" />
          <img src="/icon_clover_cream.png" alt="" className="h-3.5 w-auto" />
          <img src="/icon_spiral_cream.png" alt="" className="h-3.5 w-auto" />
        </div>
        <p className="text-[10px] md:text-xs tracking-[0.05em] uppercase font-light text-white/40">
          Some lives are not arranged. They are composed.
        </p>
        <p className="text-[9px] text-white/30 font-light mt-0.5">
          © 2026 ExQuisite Living. Not a concierge service.
        </p>
      </motion.footer>
    </>
  );
}
