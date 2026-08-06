"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Tight spring so it tracks close but still feels alive
  const x = useSpring(rawX, { stiffness: 400, damping: 30, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 400, damping: 30, mass: 0.4 });

  const { isDraggingWheel } = useScene();
  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  // Record start position when dragging begins
  useEffect(() => {
    if (isDraggingWheel) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDragStart({ x: rawX.get(), y: rawY.get() });
    } else {
      setDragStart(null);
    }
  }, [isDraggingWheel, rawX, rawY]);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 h-full w-full hidden pointer-fine:block"
      style={{ zIndex: 9999, mixBlendMode: "difference" }}
    >
      {/* The Trail */}
      <AnimatePresence>
        {dragStart && (
          <motion.svg
            className="absolute top-0 left-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* The line connecting start to current */}
            <motion.line
              x1={dragStart.x}
              y1={dragStart.y}
              x2={x}
              y2={y}
              stroke="white"
              strokeWidth="36"
              strokeLinecap="round"
            />
            {/* The circle at the start position */}
            <motion.circle
              cx={dragStart.x}
              cy={dragStart.y}
              r="18"
              fill="white"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* The Cursor */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: "white",
        }}
      />
    </div>
  );
}
