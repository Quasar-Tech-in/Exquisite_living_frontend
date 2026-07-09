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

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-[15vh] flex flex-col items-center text-center text-white"
      style={{ zIndex: 5, x: textX }}
    >
      <motion.div
        className={`flex flex-col items-center leading-[1.1] tracking-[0%] uppercase ${viaodaLibre.className}`}
        initial={{ y: 60, opacity: 0 }}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.9, 0, 0.1, 1] }}
      >
        <span className="text-[80px]">Create Beyond Reality</span>
      </motion.div>
      <motion.div
        className={`mt-4 max-w-[600px] text-[22px] leading-[1.6] text-white/80 ${imprima.className}`}
        initial={{ y: 40, opacity: 0 }}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.9, 0, 0.1, 1] }}
      >
        Exclusive journeys to breathtaking destinations curated for travelers
        seeking rare and unforgettable experiences.
      </motion.div>
    </motion.div>
  );
}
