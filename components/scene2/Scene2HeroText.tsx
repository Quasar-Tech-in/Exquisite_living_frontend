"use client";

import { imprima, viaodaLibre } from "@/lib/fonts";
import { motion, type MotionValue } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function Scene2HeroText({
  textX,
}: {
  textX: MotionValue<number>;
}) {
  const { scene } = useScene();
  const isActive = scene === "transitioning" || scene === "scene2";
  const isReturning = scene === "returningToScene1";

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-[12vh] flex flex-col items-center text-center text-white"
      style={{ zIndex: 5, x: textX }}
    >
      <motion.div
        className={`flex flex-col items-center leading-[1.1] tracking-[-0.01em] text-white ${viaodaLibre.className}`}
        initial={{ y: 60, opacity: 0 }}
        animate={
          isReturning
            ? { y: -60, opacity: 0 }
            : isActive
            ? { y: 0, opacity: 1 }
            : { y: 60, opacity: 0 }
        }
        transition={{ duration: 1.2, ease: [0.9, 0, 0.1, 1], delay: isActive ? 0.5 : 0 }}
      >
        <span className="text-[40px] md:text-[54px] lg:text-[64px]">
          Loose leaves,{" "}
          <span className="italic text-[#5f7d6a]">lifted from the book.</span>
        </span>
      </motion.div>
      <motion.div
        className={`mt-4 max-w-[620px] text-[18px] md:text-[20px] leading-[1.6] text-white/80 ${imprima.className}`}
        initial={{ y: 40, opacity: 0 }}
        animate={
          isReturning
            ? { y: -40, opacity: 0 }
            : isActive
            ? { y: 0, opacity: 1 }
            : { y: 40, opacity: 0 }
        }
        transition={{ duration: 1.2, ease: [0.9, 0, 0.1, 1], delay: isActive ? 0.6 : 0 }}
      >
        A selection of composed worlds and quiet details. Turn the wheel or use the arrow keys to browse through the chapters of an unarranged life.
      </motion.div>
    </motion.div>
  );
}
