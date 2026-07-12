import { imprima } from "@/lib/fonts";
import { HTMLMotionProps, motion, type Transition } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function Navbar({ className, ...props }: HTMLMotionProps<"nav">) {
  // Smooth, premium easing curve for the entrance
  const entryTransition: Transition = { duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] };

  const { scene, returnToScene1 } = useScene();
  const handleHomeClick = () => {
    if (scene === "scene2") returnToScene1();
  };

  return (
    <motion.nav
      {...props}
      className={`${imprima.className} ${className || ""} absolute top-0 flex w-full flex-row items-center justify-between p-4`}
      style={{ zIndex: 9, color: "rgba(255, 255, 255, 0.6)" }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={entryTransition}
    >
      {/* Left Links */}
      <div className="flex flex-1 justify-around">
        <span
          className="cursor-pointer transition-colors hover:text-white"
          onClick={handleHomeClick}
        >
          Sensibility
        </span>
        <span className="cursor-pointer transition-colors hover:text-white">Intelligence</span>
      </div>

      {/* Center Icon */}
      <div className="flex shrink-0 justify-center px-12">
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
      <div className="flex flex-1 justify-around">
        <span className="cursor-pointer transition-colors hover:text-white">Compositions</span>
        <span className="cursor-pointer transition-colors hover:text-white">Membership</span>
      </div>
    </motion.nav>
  );
}

