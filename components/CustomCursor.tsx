"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Tight spring so it tracks close but still feels alive
  const x = useSpring(rawX, { stiffness: 400, damping: 30, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 400, damping: 30, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 9999,
        // white circle + mix-blend-mode difference = inverts whatever is beneath
        width: 36,
        height: 36,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference",
      }}
    />
  );
}
