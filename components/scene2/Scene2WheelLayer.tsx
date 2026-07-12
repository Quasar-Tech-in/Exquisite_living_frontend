"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScene } from "@/context/SceneContext";
import { imprima } from "@/lib/fonts";
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

  // Responsive scale of the wheel based on viewport width
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScale(0.5); // Mobile
      } else if (window.innerWidth < 1024) {
        setScale(0.72); // Tablet
      } else {
        setScale(0.95); // Desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveCardIndex((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        setActiveCardIndex((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, setActiveCardIndex]);

  // Calculate rotation based on index. Total cards = 20, angle = 360 / 20 = 18deg.
  const targetRotation = -activeCardIndex * (360 / 20);

  // Wheel center is at canvas center (1255px). Active card sits at radius 785px above center.
  // Visual offset is scale * 785. We adjust top to keep active card locked near 42vh.
  const visualRadiusOffset = 1255 - scale * 785;

  return (
    <>
      {/* Centering shell */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 overflow-visible"
        style={{
          top: `calc(42vh - ${visualRadiusOffset}px)`,
          zIndex: 3,
        }}
      >
        {/* Animated wrapper — handles entry and swipe rotation */}
        <motion.div
          className="pointer-events-auto cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }} // spring back to center when released
          dragElastic={0}
          onDragStart={() => setIsDraggingWheel(true)}
          onDragEnd={(e, { offset }) => {
            setIsDraggingWheel(false);
            // Rotate if dragged more than 50px
            if (offset.x < -50) {
              setActiveCardIndex((prev) => prev + 1);
            } else if (offset.x > 50) {
              setActiveCardIndex((prev) => prev - 1);
            }
          }}
          initial={{ y: 500, rotate: -90, scale: scale }}
          animate={
            isActive 
              ? { y: 0, rotate: targetRotation, scale: scale } 
              : { y: 500, rotate: -90, scale: scale }
          }
          transition={{
            y: { duration: 1.4, ease: [0.9, 0, 0.1, 1], delay: isActive ? 0.5 : 0 },
            rotate: isActive && activeCardIndex === 0
              ? { duration: 1.4, ease: [0.9, 0, 0.1, 1], delay: 0.5 }
              : !isActive 
              ? { duration: 1.4, ease: [0.9, 0, 0.1, 1], delay: 0 }
              : { type: "spring", stiffness: 100, damping: 20 },
            scale: { duration: 0.4 },
          }}
        >
          <CardsFerrisWheel activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} />
        </motion.div>
      </div>

      {/* Visual Navigation Controls - Floating left/right arrows */}
      <motion.button
        className="pointer-events-auto absolute left-6 md:left-10 lg:left-16 top-[52vh] -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:opacity-100 select-none z-10 cursor-pointer shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
          setActiveCardIndex((prev) => prev - 1);
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isActive ? 0.8 : 0, x: isActive ? 0 : -20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        aria-label="Previous card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </motion.button>

      <motion.button
        className="pointer-events-auto absolute right-6 md:right-10 lg:right-16 top-[52vh] -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:opacity-100 select-none z-10 cursor-pointer shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
          setActiveCardIndex((prev) => prev + 1);
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isActive ? 0.8 : 0, x: isActive ? 0 : 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        aria-label="Next card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </motion.button>

      {/* Keyboard navigation helper hint */}
      <motion.div
        className={`pointer-events-none absolute bottom-[18vh] left-1/2 -translate-x-1/2 z-10 text-[9px] md:text-[10px] tracking-[0.25em] text-white/30 uppercase select-none ${imprima.className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Drag the wheel or use ←/→ keys to compose
      </motion.div>
    </>
  );
}

