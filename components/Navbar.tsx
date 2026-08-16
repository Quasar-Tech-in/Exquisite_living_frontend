"use client";
import { useState } from "react";
import { imprima } from "@/lib/fonts";
import { HTMLMotionProps, motion, AnimatePresence, type Transition } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function Navbar({ className, ...props }: HTMLMotionProps<"nav">) {
  // Smooth, premium easing curve for the entrance
  const entryTransition: Transition = { duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] };

  const { scene, startTransition, activeCardIndex, setActiveCardIndex, returnToScene1 } = useScene();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const isInScene2 = scene === "scene2" || scene === "transitioning";

  const handleHomeClick = () => {
    if (isInScene2) returnToScene1();
  };

  const handleNavClick = (targetIndex: number) => {
    if (scene === "scene1" || scene === "returningToScene1") {
      startTransition();
    }
    setActiveCardIndex(targetIndex);
  };

  // Determine active section highlight based on normalized activeCardIndex
  const normalizedIndex = ((activeCardIndex % 20) + 20) % 20;
  const isExperienceActive = scene === "scene2" || scene === "transitioning";
  
  const isSensibilityActive = isExperienceActive && normalizedIndex >= 0 && normalizedIndex <= 3;
  const isIntelligenceActive = isExperienceActive && normalizedIndex >= 4 && normalizedIndex <= 11;
  const isCompositionActive = isExperienceActive && normalizedIndex >= 12 && normalizedIndex <= 17;
  const isMembershipActive = isExperienceActive && normalizedIndex >= 18 && normalizedIndex <= 19;

  return (
    <motion.nav
      {...props}
      className={`${imprima.className} ${className || ""} absolute top-0 flex w-full flex-row items-center justify-center md:justify-between px-6 py-6 short:py-2 md:px-12 mt-[env(safe-area-inset-top)]`}
      style={{ zIndex: 9 }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={entryTransition}
    >
      {/* Left Links */}
      <div className="hidden md:flex short:hidden! flex-1 justify-around text-sm tracking-[0.15em] uppercase font-light">
        <span
          className={`cursor-pointer transition-colors duration-300 hover:text-white ${
            isSensibilityActive ? "text-white font-normal" : "text-white/50"
          }`}
          onClick={() => handleNavClick(0)}
        >
          Sensibility
        </span>
        <span
          className={`cursor-pointer transition-colors duration-300 hover:text-white ${
            isIntelligenceActive ? "text-white font-normal" : "text-white/50"
          }`}
          onClick={() => handleNavClick(4)}
        >
          Intelligence
        </span>
      </div>

      {/* Center Icon + hover tooltip */}
      <div className="flex shrink-0 flex-col items-center justify-center px-6 md:px-12 relative">
        <motion.img
          src="/iconlogo_cream.png"
          alt="ExQuisite Living"
          className="h-10 md:h-12 w-auto cursor-pointer short:h-7!"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.55))" }}
          initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.12 }}
          transition={{
            rotate: { ...entryTransition, duration: 1.5 },
            scale: { duration: 0.3, ease: "easeOut" },
            opacity: { ...entryTransition, duration: 1.5 },
          }}
          onClick={handleHomeClick}
          onHoverStart={() => setIsLogoHovered(true)}
          onHoverEnd={() => setIsLogoHovered(false)}
        />
        {/* Desktop hover tooltip — only visible when in Scene 2 */}
        <AnimatePresence>
          {isLogoHovered && isInScene2 && (
            <motion.span
              className={`absolute top-full mt-1.5 text-[9px] tracking-[0.15em] uppercase text-white/50 whitespace-nowrap pointer-events-none ${imprima.className}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              ← Return to Landing
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Right Links */}
      <div className="hidden md:flex short:hidden! flex-1 justify-around text-sm tracking-[0.15em] uppercase font-light">
        <span
          className={`cursor-pointer transition-colors duration-300 hover:text-white ${
            isCompositionActive ? "text-white font-normal" : "text-white/50"
          }`}
          onClick={() => handleNavClick(12)}
        >
          Composition
        </span>
        <span
          className={`cursor-pointer transition-colors duration-300 hover:text-white ${
            isMembershipActive ? "text-white font-normal" : "text-white/50"
          }`}
          onClick={() => handleNavClick(18)}
        >
          Membership
        </span>
      </div>

      {/* Mobile back button — only appears in Scene 2, only on mobile */}
      <AnimatePresence>
        {isInScene2 && (
          <motion.button
            className={`md:hidden short:flex! absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-white/50 text-[9px] tracking-[0.15em] uppercase cursor-pointer hover:text-white transition-colors duration-300 ${imprima.className}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8, transition: { duration: 0.4, delay: 0, ease: [0.8, 0, 1, 0.2] } }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={returnToScene1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </motion.button>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
