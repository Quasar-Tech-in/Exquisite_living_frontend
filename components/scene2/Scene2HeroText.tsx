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
      className="pointer-events-none absolute inset-x-0 top-[15vh] flex flex-col items-center text-center text-white"
      style={{ zIndex: 5, x: textX }}
    >
      <motion.div
        className={`flex flex-col items-center leading-[1.1] tracking-[0%] uppercase ${viaodaLibre.className}`}
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
        <span className="text-[80px]">Create Beyond Reality</span>
      </motion.div>
      <motion.div
        className={`mt-4 max-w-[600px] text-[22px] leading-[1.6] text-white/80 ${imprima.className}`}
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
        Exclusive journeys to breathtaking destinations curated for travelers
        seeking rare and unforgettable experiences.
      </motion.div>
    </motion.div>
  );
}
