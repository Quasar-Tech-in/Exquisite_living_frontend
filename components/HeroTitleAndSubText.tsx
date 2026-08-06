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
      className="pointer-events-none absolute top-[30dvh] short:top-[16dvh] left-[12vw] flex flex-col items-center text-left text-white"
      style={{ zIndex: 7, x: textX }}
    >
      <motion.div
        initial={isReturning ? { x: -2500, scale: 4 } : {}}
        animate={isExiting ? { x: -2500, scale: 4 } : { x: 0, scale: 1 }}
        transition={isExiting ? { duration: 1.2, ease: [0.8, 0, 1, 0.2] } : isReturning ? { duration: 2, ease: [0.9, 0, 0.1, 1] } : {}}
        className="flex flex-col items-center"
      >
        <motion.div
          className={`flex flex-col items-start leading-[1.05] tracking-[-0.01em] text-white ${viaodaLibre.className}`}
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)" }}
          initial={isReturning ? { translateY: 0, opacity: 1 } : { translateY: -60, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-start text-[50px] md:text-[56px] lg:text-[64px] short:text-[26px]!">
            <span>Some lives are not</span>
            <span className="text-white/90">arranged.</span>
            <span className="mt-2 italic text-[#ffa02e]">They are composed.</span>
          </div>
        </motion.div>
        <motion.p
          className={`mt-6 short:mt-2 max-w-85 short:max-w-70 text-[16px] short:text-[12px] leading-[1.4] font-normal tracking-[0.02em] text-white/90 ${imprima.className}`}
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3)" }}
          initial={isReturning ? { translateY: 0, opacity: 1 } : { translateY: 60, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          Not a concierge. Not a catalogue. 
          <br />A quiet intelligence that composes what would move you — before you thought to ask. 
          <br />By invitation only.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
