import { imprima, viaodaLibre } from "@/lib/fonts";
import { motion, type MotionValue } from "framer-motion";

export default function HeroTitleAndSubText({
  textX,
  isExiting = false,
  isReturning = false,
}: {
  textX: MotionValue<number>;
  isExiting?: boolean;
  isReturning?: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute top-[30vh] left-[12vw] flex flex-col items-center text-left text-white"
      style={{ zIndex: 7, x: textX }}
    >
      <motion.div
        initial={isReturning ? { x: -2500, scale: 4 } : {}}
        animate={isExiting ? { x: -2500, scale: 4 } : { x: 0, scale: 1 }}
        transition={isExiting ? { duration: 1.2, ease: [0.8, 0, 1, 0.2] } : isReturning ? { duration: 1.2, ease: [0.9, 0, 0.1, 1] } : {}}
        className="flex flex-col items-center"
      >
      <motion.div
        className={`flex flex-col items-start leading-[1.05] tracking-[-0.01em] text-white ${viaodaLibre.className}`}
        initial={isReturning ? { translateY: 0, opacity: 1 } : { translateY: -60, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-start text-[50px] md:text-[56px] lg:text-[64px]">
          <span>Some lives are not</span>
          <span className="text-white/90">arranged.</span>
          <span className="mt-2 italic text-[#c19a6b]">They are composed.</span>
        </div>
      </motion.div>
      <motion.p
        className={`mt-6 max-w-[340px] text-[16px] leading-[1.4] font-normal tracking-[0.02em] text-white/80 ${imprima.className}`}
        initial={isReturning ? { translateY: 0, opacity: 1 } : { translateY: 60, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        An intelligence devoted to a single question: what would move you, before you thought to ask for it. By invitation.
      </motion.p>
      </motion.div>
    </motion.div>
  );
}
