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
  const isActive = scene === "scene2";

  return (
    <motion.div
      className="absolute inset-0 flex -translate-y-40 flex-col items-center justify-center text-center text-white"
      style={{ zIndex: 4, x: textX }}
    >
      <motion.div
        className={`flex flex-col items-center leading-[1.1] tracking-[0%] uppercase ${viaodaLibre.className}`}
        initial={{ y: 60, opacity: 0 }}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[80px]">Create Beyond Reality</span>
      </motion.div>
      <motion.div
        className={`mt-4 max-w-[600px] text-[20px] leading-[1.6] text-white/80 ${imprima.className}`}
        initial={{ y: 40, opacity: 0 }}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        Exclusive journeys to breathtaking destinations curated for travelers
        seeking rare and unforgettable experiences.
      </motion.div>
    </motion.div>
  );
}
