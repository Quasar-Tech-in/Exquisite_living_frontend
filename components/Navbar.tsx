import { imprima } from "@/lib/fonts";
import { HTMLMotionProps, motion, type Transition } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function Navbar({ className, ...props }: HTMLMotionProps<"nav">) {
  // Smooth, premium easing curve for the entrance
  const entryTransition: Transition = { duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] };
  const exitTransition: Transition = { duration: 0.5, ease: [0.9, 0, 0.1, 1] };

  const { scene } = useScene();
  const isExiting = scene === "transitioning";

  if (scene === "scene2") return null;

  return (
    <motion.nav
      {...props}
      className={`${imprima.className} ${className || ""} absolute top-0 flex w-full flex-row items-center justify-between p-4`}
      style={{ zIndex: 6, color: "rgba(255, 255, 255, 0.6)" }}
      initial={{ y: -50, opacity: 0 }}
      animate={isExiting ? { y: -50, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={isExiting ? exitTransition : entryTransition}
    >
      {/* Left Links */}
      <div className="flex flex-1 justify-around">
        <span className="cursor-pointer transition-colors hover:text-white">Home</span>
        <span className="cursor-pointer transition-colors hover:text-white">Studio</span>
        <span className="cursor-pointer transition-colors hover:text-white">Experience</span>
      </div>

      {/* Center Icon */}
      <div className="flex shrink-0 justify-center px-12">
        <motion.img
          src="navbar-icon.svg"
          alt="navbar-icon"
          className="cursor-pointer"
          initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ ...entryTransition, duration: 1.5 }}
        />
      </div>

      {/* Right Links */}
      <div className="flex flex-1 justify-around">
        <span className="cursor-pointer transition-colors hover:text-white">Technologies</span>
        <span className="cursor-pointer transition-colors hover:text-white">Journal</span>
        <span className="cursor-pointer transition-colors hover:text-white">Contact</span>
      </div>
    </motion.nav>
  );
}
