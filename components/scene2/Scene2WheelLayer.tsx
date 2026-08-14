"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { imprima } from "@/lib/fonts";
import { useViewportScale } from "@/hooks/useViewportScale";
import dynamic from "next/dynamic";

const CardsFerrisWheel = dynamic(
  () => import("@/components/CardsFerrisWheel"),
  { ssr: false },
);

interface Props {
  activeCardIndex: number;
  setActiveCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Scene2WheelLayer({
  activeCardIndex,
  setActiveCardIndex,
}: Props) {
  const { scene, setIsDraggingWheel } = useScene();
  const isActive = scene === "transitioning" || scene === "scene2";
  const isReturning = scene === "returningToScene1";
  const { scale } = useViewportScale();

  // Track first user interaction so hint/pulse animations can stop
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = () => {
    if (!hasInteracted) setHasInteracted(true);
  };

  // Calculate rotation based on index. Total cards = 20, angle = 360 / 20 = 18deg.
  const targetRotation = -activeCardIndex * (360 / 20);

  // Wheel center is at canvas center (1255px). Active card sits at radius 785px above center.
  // Visual offset is scale * 785. We adjust top to keep active card locked near 42dvh.
  // No separate landscape anchor needed: useViewportScale's height cap already
  // keeps `scale` (and so the card's on-screen size) within budget on short screens.
  const visualRadiusOffset = 1255 - scale * 785;

  return (
    <>
      {/* Centering shell */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 overflow-visible"
        style={{
          top: `calc(42dvh - ${visualRadiusOffset}px)`,
          zIndex: 3,
        }}
      >
        {/* Animated wrapper — handles entry and swipe rotation */}
        <motion.div
          className="pointer-events-auto cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={() => {
            setIsDraggingWheel(true);
            handleInteraction();
          }}
          onDragEnd={(e, { offset }) => {
            setIsDraggingWheel(false);
            if (offset.x < -50) {
              setActiveCardIndex((prev) => prev + 1);
            } else if (offset.x > 50) {
              setActiveCardIndex((prev) => prev - 1);
            }
          }}
          initial={{ y: 500, rotate: -180, scale: scale }}
          animate={
            isActive
              ? { y: 0, rotate: targetRotation, scale: scale }
              : isReturning
              ? { y: 500, rotate: targetRotation, scale: scale }
              : { y: 500, rotate: -180, scale: scale }
          }
          transition={{
            y: { duration: 1.4, ease: [0.9, 0, 0.1, 1], delay: isActive ? 0.5 : 0 },
            rotate: isActive && activeCardIndex === 0
              // Delay rotation until the wheel is actually sliding up into the viewport
              ? { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }
              : isReturning
              ? { duration: 0 } // snap — no rotate animation on exit, just slide down
              : !isActive
              ? { duration: 1.4, ease: [0.9, 0, 0.1, 1], delay: 0 }
              : { type: "spring", stiffness: 100, damping: 20 },
            scale: { duration: 0.4 },
          }}
        >
          <CardsFerrisWheel activeCardIndex={activeCardIndex} setActiveCardIndex={(val) => { handleInteraction(); setActiveCardIndex(val); }} />
        </motion.div>
      </div>



      {/* Visual Navigation Controls - Floating left/right arrows */}
      {/* z-20: the desktop sidebars (Scene2.tsx) are z-10 and render later in
          the DOM, so at a tied z-index they painted over these buttons
          wherever their bounding boxes overlapped. */}
      <motion.button
        className="pointer-events-auto absolute left-6 md:left-10 lg:left-16 top-[46dvh] md:top-[44dvh] -translate-y-1/2 short:top-[50dvh]! flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:opacity-100 select-none z-20 cursor-pointer shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
          handleInteraction();
          setActiveCardIndex((prev) => prev - 1);
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isActive ? 0.9 : 0, x: isActive ? 0 : -20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={isReturning
          ? { duration: 0.8, delay: 0, ease: [0.8, 0, 1, 0.2] }
          : { duration: 0.8, delay: 0.6 }
        }
        aria-label="Previous card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </motion.button>

      <motion.button
        className="pointer-events-auto absolute right-6 md:right-10 lg:right-16 top-[46dvh] md:top-[44dvh] -translate-y-1/2 short:top-[50dvh]! flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:opacity-100 select-none z-20 cursor-pointer shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
          handleInteraction();
          setActiveCardIndex((prev) => prev + 1);
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isActive ? 0.9 : 0, x: isActive ? 0 : 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={isReturning
          ? { duration: 0.8, delay: 0, ease: [0.8, 0, 1, 0.2] }
          : { duration: 0.8, delay: 0.6 }
        }
        aria-label="Next card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </motion.button>
    </>
  );
}

