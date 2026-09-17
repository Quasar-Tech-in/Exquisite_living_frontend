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
      className="pointer-events-none absolute top-[20dvh] md:top-[30dvh] short:top-[16dvh] left-[8vw] md:left-[12vw] flex flex-col items-center text-left text-white"
      style={{ zIndex: 7, x: textX }}
    >
      <motion.div
        initial={isReturning ? { x: -2500, scale: 4 } : {}}
        animate={isExiting ? { x: -2500, scale: 4 } : { x: 0, scale: 1 }}
        transition={isExiting ? { duration: 1.2, ease: [0.8, 0, 1, 0.2] } : isReturning ? { duration: 2, ease: [0.9, 0, 0.1, 1] } : {}}
        className="relative flex flex-col items-start p-3 md:p-6 rounded-3xl"
      >
        {/* Subtle dark gradient backdrop behind text for optimal legibility over bushes & clouds */}
        <div
          className="pointer-events-none absolute -inset-4 md:-inset-8 rounded-3xl opacity-90 transition-opacity"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)",
            filter: "blur(16px)",
          }}
        />

        <motion.div
          className={`relative z-10 flex flex-col items-start leading-[1.05] tracking-[-0.01em] text-white ${viaodaLibre.className}`}
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 4px 40px rgba(0,0,0,0.6)" }}
          initial={isReturning ? { translateY: 0, opacity: 1 } : { translateY: -60, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="flex flex-col items-start text-[36px] sm:text-[46px] md:text-[56px] lg:text-[64px] short:text-[26px]!">
            <span>Some lives are not</span>
            <span className="text-white/90">arranged.</span>
            <span className="mt-1.5 md:mt-2 italic text-[#ffa02e] drop-shadow-md">They are composed.</span>
          </h1>
        </motion.div>
        <motion.p
          className={`relative z-10 mt-4 md:mt-6 short:mt-2 max-w-80 md:max-w-85 short:max-w-70 text-[14px] md:text-[16px] short:text-[12px] leading-[1.4] font-normal tracking-[0.02em] text-white/95 ${imprima.className}`}
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 4px 28px rgba(0,0,0,0.7)" }}
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
