import { imprima } from "@/lib/fonts";
import { HTMLMotionProps, motion, type Transition } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function Navbar({ className, ...props }: HTMLMotionProps<"nav">) {
  // Smooth, premium easing curve for the entrance
  const entryTransition: Transition = { duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] };

  const { scene, startTransition, activeCardIndex, setActiveCardIndex, returnToScene1 } = useScene();
  
  const handleHomeClick = () => {
    if (scene === "scene2" || scene === "transitioning") returnToScene1();
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
  const isCompositionsActive = isExperienceActive && normalizedIndex >= 12 && normalizedIndex <= 17;
  const isMembershipActive = isExperienceActive && normalizedIndex >= 18 && normalizedIndex <= 19;

  return (
    <motion.nav
      {...props}
      className={`${imprima.className} ${className || ""} absolute top-0 flex w-full flex-row items-center justify-center md:justify-between px-6 py-6 md:px-12`}
      style={{ zIndex: 9 }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={entryTransition}
    >
      {/* Left Links */}
      <div className="hidden md:flex flex-1 justify-around text-sm tracking-[0.15em] uppercase font-light">
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

      {/* Center Icon */}
      <div className="flex shrink-0 justify-center px-6 md:px-12">
        <motion.img
          src="/iconlogo_cream.png"
          alt="ExQuisite Living"
          className="h-10 md:h-12 w-auto cursor-pointer"
          initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ ...entryTransition, duration: 1.5 }}
          onClick={handleHomeClick}
        />
      </div>

      {/* Right Links */}
      <div className="hidden md:flex flex-1 justify-around text-sm tracking-[0.15em] uppercase font-light">
        <span
          className={`cursor-pointer transition-colors duration-300 hover:text-white ${
            isCompositionsActive ? "text-white font-normal" : "text-white/50"
          }`}
          onClick={() => handleNavClick(12)}
        >
          Compositions
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
    </motion.nav>
  );
}


