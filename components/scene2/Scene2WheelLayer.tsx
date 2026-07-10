"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useScene } from "@/context/SceneContext";
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
  // To bring next card (at +18deg) to top, wheel must rotate -18deg.
  const targetRotation = -activeCardIndex * (360 / 20);

  return (
    // Centering shell
    <div
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 overflow-visible"
      style={{
        top: "calc(42vh - 350px)",
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
        initial={{ y: 500, rotate: -90 }}
        animate={
          isActive ? { y: 0, rotate: targetRotation } : { y: 500, rotate: -90 }
        }
        transition={{
          y: { duration: 1.4, ease: [0.9, 0, 0.1, 1], delay: isActive ? 0.5 : 0 },
          rotate: isActive && activeCardIndex === 0
            ? { duration: 1.4, ease: [0.9, 0, 0.1, 1], delay: 0.5 }
            : !isActive 
            ? { duration: 1.4, ease: [0.9, 0, 0.1, 1], delay: 0 }
            : { type: "spring", stiffness: 100, damping: 20 },
        }}
      >
        <CardsFerrisWheel />
      </motion.div>
    </div>
  );
}
