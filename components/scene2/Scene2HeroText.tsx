"use client";

import { viaodaLibre, imprima } from "@/lib/fonts";
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

  let title = "Loose leaves, ";
  let italicTitle = "lifted from the book.";
  let subtitle = "A selection of composed worlds and quiet details.";
  let italicColor = "text-[#5f7d6a]"; // green sage

  if (normalizedIndex >= 0 && normalizedIndex <= 3) {
    title = "A sensibility, ";
    italicTitle = "not a service.";
    subtitle = "A concierge waits to be asked. We do not.";
    italicColor = "text-[#c19a6b]"; // warm gold/brass
  } else if (normalizedIndex >= 4 && normalizedIndex <= 11) {
    title = "A quiet intelligence, ";
    italicTitle = "composing in the background.";
    subtitle = "Built to know each member with depth no concierge could match.";
    italicColor = "text-[#8fa397]"; // sage-soft
  } else if (normalizedIndex >= 12 && normalizedIndex <= 17) {
    title = "Loose leaves, ";
    italicTitle = "lifted from the book.";
    subtitle = "Draw near and the pages part — a few composed worlds rise from the binding.";
    italicColor = "text-[#5f7d6a]"; // green sage
  } else if (normalizedIndex >= 18 && normalizedIndex <= 19) {
    title = "You do not join us. ";
    italicTitle = "We find you.";
    subtitle = "Conferred quietly, and only when our worlds align.";
    italicColor = "text-[#c19a6b]"; // warm gold/brass
  }

  let chapterKey = 0;
  if (normalizedIndex >= 0 && normalizedIndex <= 3) chapterKey = 1;
  else if (normalizedIndex >= 4 && normalizedIndex <= 11) chapterKey = 2;
  else if (normalizedIndex >= 12 && normalizedIndex <= 17) chapterKey = 3;
  else if (normalizedIndex >= 18 && normalizedIndex <= 19) chapterKey = 4;

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-[10vh] md:top-[12vh] flex flex-col items-center text-center text-white"
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
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: isActive ? 0.1 : 0 }}
      >
        <span className="text-[32px] sm:text-[44px] md:text-[50px] lg:text-[58px] px-4">
          {title}
          <span className={`italic ${italicColor}`}>{italicTitle}</span>
        </span>
      </motion.div>
      <motion.div
        key={`sub-${chapterKey}`}
        className={`mt-3 max-w-[90%] md:max-w-[620px] text-[15px] md:text-[17px] leading-[1.6] text-white/50 px-4 ${imprima.className}`}
        initial={{ y: 15, opacity: 0 }}
        animate={
          isReturning
            ? { y: 15, opacity: 0 }
            : isActive
            ? { y: 0, opacity: 1 }
            : { y: 15, opacity: 0 }
        }
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: isActive ? 0.25 : 0 }}
      >
        {subtitle}
      </motion.div>
    </motion.div>
  );
}
