"use client";

import { motion, type MotionValue } from "framer-motion";

interface Props {
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
  activeCardIndex: number;
}

export default function Scene2LowerCloudsLayer({ floorX, floorY, activeCardIndex }: Props) {
  // Image is 110vw wide, perfectly centered. This leaves exactly 5vw overflowing on each side.
  // However, the mouse parallax (floorX) can shift the entire layer by up to 40px.
  // To prevent the edges from showing when the user swipes 3 times AND moves the mouse to the extreme,
  // we must reserve 45px (for safety) from the 5vw overflow.
  // The remaining distance is divided by 3 to get the per-card swipe offset.
  // We use max(0px, ...) so the wheel never scrolls backwards on extremely small screens.
  const clampedIndex = Math.max(-3, Math.min(3, activeCardIndex));
  const cloudXOffset = `calc(${-clampedIndex} * max(0px, 5vw - 45px) / 3)`;

  return (
    // Outer wrapper handles mouse parallax (floorX) and positioning
    <motion.div
      className="pointer-events-none absolute bottom-0 left-1/2 w-[110vw] -translate-x-1/2"
      style={{ zIndex: 4, x: floorX }}
    >
      {/* Inner wrapper handles wheel swipe parallax with a spring transition */}
      <motion.div
        animate={{ x: cloudXOffset }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <img
          src={"lower-clouds.webp"}
          alt=""
          className="block w-full h-[30vh] md:h-[413px] scale-x-[-1] brightness-125"
        />
      </motion.div>
    </motion.div>
  );
}
