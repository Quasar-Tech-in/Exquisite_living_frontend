"use client";

import { viaodaLibre } from "@/lib/fonts";
import { motion, type MotionValue } from "framer-motion";
import { useScene } from "@/context/SceneContext";

interface Props {
  textX: MotionValue<number>;
  activeCardIndex: number;
}

export default function Scene2HeroText({
  textX,
  activeCardIndex,
}: Props) {
  const { scene } = useScene();
  const isActive = scene === "transitioning" || scene === "scene2";
  const isReturning = scene === "returningToScene1";

  const normalizedIndex = ((activeCardIndex % 20) + 20) % 20;

  let title = "Every detail, ";
  let italicTitle = "thoughtfully curated.";
  let italicColor = "text-[#1fda64]";

  if (normalizedIndex >= 0 && normalizedIndex <= 3) {
    title = "Every client is different, ";
    italicTitle = "and so is every decision we make.";
    italicColor = "text-[#ecb471]";
  } else if (normalizedIndex >= 4 && normalizedIndex <= 11) {
    title = "Behind every effortless experience, ";
    italicTitle = "is thoughtful planning.";
    italicColor = "text-[#3E5343]";
  } else if (normalizedIndex >= 12 && normalizedIndex <= 17) {
    title = "Every detail, ";
    italicTitle = "thoughtfully curated.";
    italicColor = "text-[#1fda64]";
  } else if (normalizedIndex >= 18 && normalizedIndex <= 19) {
    title = "You do not join us. ";
    italicTitle = "We find you.";
    italicColor = "text-[#ecb471]";
  }

  let chapterKey = 0;
  if (normalizedIndex >= 0 && normalizedIndex <= 3) chapterKey = 1;
  else if (normalizedIndex >= 4 && normalizedIndex <= 11) chapterKey = 2;
  else if (normalizedIndex >= 12 && normalizedIndex <= 17) chapterKey = 3;
  else if (normalizedIndex >= 18 && normalizedIndex <= 19) chapterKey = 4;

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-[10dvh] md:top-[12dvh] flex flex-col items-center text-center text-white short:top-[13dvh]!"
      style={{ zIndex: 5, x: textX }}
    >
      <motion.div
        key={`title-${chapterKey}`}
        className={`flex flex-col items-center leading-[1.1] tracking-[-0.01em] text-white ${viaodaLibre.className}`}
        initial={{ y: 20, opacity: 0 }}
        animate={
          isReturning
            ? { y: 20, opacity: 0 }
            : isActive
              ? { y: 0, opacity: 1 }
              : { y: 20, opacity: 0 }
        }
        transition={
          isReturning
            ? { duration: 1.0, ease: [0.8, 0, 1, 0.2], delay: 0 }
            : { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: isActive ? 0.8 : 0 }
        }
      >
        <span className="text-[32px] sm:text-[44px] md:text-[50px] lg:text-[58px] px-4 short:text-[20px]!" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.4)" }}>
          {title}
          <span className={`italic ${italicColor}`}>{italicTitle}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
