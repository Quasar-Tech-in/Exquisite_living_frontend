"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function ExitExperienceButton() {
  const { scene, returnToScene1 } = useScene();

  // Mirror isActive logic from Scene2 — button appears during the transition, not after
  const isActive = scene === "transitioning" || scene === "scene2";
  const isExiting = scene === "returningToScene1";
  const isVisible = isActive || isExiting;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="flex absolute bottom-12 lg:bottom-[8vh] left-1/2 -translate-x-1/2 group h-24 w-24 lg:h-32 lg:w-32 items-center justify-center cursor-pointer"
          style={{ zIndex: 10 }}
          onClick={returnToScene1}
          initial={{ y: 500, opacity: 0 }}
          animate={
            isExiting
              ? { y: 500, opacity: 0 }
              : { y: 0, opacity: 1 }
          }
          transition={
            isExiting
              ? { duration: 0.8, ease: [0.8, 0, 1, 0.2] }
              : { duration: 0.8, delay: 0.8, ease: [0.9, 0, 0.1, 1] }
          }
          exit={{ y: 500, opacity: 0, transition: { duration: 0.8, ease: [0.8, 0, 1, 0.2] } }}
          whileHover={isExiting ? undefined : "hover"}
        >
          {/* Rotating Border and Text Container */}
          <motion.div
            variants={{
              initial: { rotate: 180, opacity: 0 },
              animate: {
                rotate: 0,
                opacity: 1,
                transition: { duration: 1.5, ease: "easeOut" },
              },
              hover: {
                rotate: -45,
                opacity: 1,
                transition: { duration: 0.5, ease: "easeInOut" },
              },
            }}
            initial="initial"
            animate="animate"
            className={`pointer-events-none absolute inset-0 h-full w-full rounded-full transition-colors duration-500 ${
              isExiting
                ? "bg-white text-black"
                : "bg-transparent text-white/80 group-hover:bg-white group-hover:text-black"
            }`}
          >
            {/* Custom Dashed Border & Circular Text */}
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
              {/* Custom dashed border */}
              <circle
                cx="50"
                cy="50"
                r="49.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                strokeDasharray="2 5"
              />
              <path
                id="exitTextPath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text className="fill-current text-[8px] font-light tracking-[0.15em] uppercase">
                <textPath href="#exitTextPath" startOffset="0%">
                  EXIT EXPERIENCE
                </textPath>
                <textPath href="#exitTextPath" startOffset="50%">
                  EXIT EXPERIENCE
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center Arrows — pointing downward (opposite direction to Enter) */}
          <div className="relative z-10 flex -rotate-90 items-center justify-center gap-2">
            <Image
              src="/union.svg"
              alt="Arrow"
              width={20}
              height={20}
              className={`rotate-180 brightness-0 transition-all duration-500 ${
                isExiting
                  ? "opacity-100 invert-0"
                  : "opacity-60 invert group-hover:opacity-100 group-hover:invert-0"
              }`}
            />
            <Image
              src="/union.svg"
              alt="Arrow"
              width={20}
              height={20}
              className={`brightness-0 transition-all duration-500 ${
                isExiting
                  ? "opacity-100 invert-0"
                  : "opacity-60 invert group-hover:opacity-100 group-hover:invert-0"
              }`}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
