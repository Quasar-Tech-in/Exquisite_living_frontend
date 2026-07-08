"use client";
import Image from "next/image";
import { HTMLMotionProps, motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function EnterExperienceButton(
  props: HTMLMotionProps<"button"> & { isExiting?: boolean },
) {
  const { isExiting = false, ...rest } = props;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Remove the delay after the initial animation completes (1s delay + 1.5s duration)
    const timer = setTimeout(() => setIsReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button
      {...rest}
      whileHover={isExiting ? undefined : "hover"}
      initial="initial"
      animate={isExiting ? "exit" : "animate"}
      variants={{
        exit: {
          y: 500,
          opacity: 0,
          transition: { duration: 0.65, ease: [0.8, 0, 1, 0.2] },
        },
      }}
      className={`${rest.className} group relative flex h-32 w-32 items-center justify-center`}
    >
      {/* Rotating Border and Text Container */}
      <motion.div
        variants={{
          initial: { rotate: -180, opacity: 0 },
          animate: {
            rotate: 0,
            opacity: 1,
            transition: { duration: 1.5, delay: isReady ? 0 : 1, ease: "easeOut" },
          },
          hover: {
            rotate: 45,
            opacity: 1,
            transition: { duration: 0.5, delay: 0, ease: "easeInOut" },
          },
          exit: {
            rotate: 45,
            opacity: 1,
            transition: { duration: 0.5, delay: 0, ease: "easeInOut" },
          },
        }}
        className={`pointer-events-none absolute inset-0 h-full w-full rounded-full transition-colors duration-500 ${
          isExiting
            ? "bg-white text-black"
            : "bg-transparent text-white/80 group-hover:bg-white group-hover:text-black"
        }`}
      >
        {/* Custom Dashed Border & Circular Text */}
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full overflow-visible"
        >
          {/* Custom dashed border: dash length 6, gap length 8 */}
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
            id="textPath"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            fill="none"
          />
          <text className="fill-current text-[8px] font-light tracking-[0.15em] uppercase">
            <textPath
              href="#textPath"
              startOffset="0%"
            >
              ENTER EXPERIENCE
            </textPath>
            <textPath
              href="#textPath"
              startOffset="50%"
            >
              ENTER EXPERIENCE
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Icons (Union SVGs pointing away) */}
      <div className="relative z-10 flex rotate-90 items-center justify-center gap-2">
        <Image
          src="/union.svg"
          alt="Arrow Left"
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
          alt="Arrow Right"
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
  );
}
