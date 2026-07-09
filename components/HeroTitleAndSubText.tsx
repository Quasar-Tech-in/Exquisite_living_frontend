import { imprima, viaodaLibre } from "@/lib/fonts";
import { motion, type MotionValue } from "framer-motion";

export default function HeroTitleAndSubText({
  textX,
  isExiting = false,
}: {
  textX: MotionValue<number>;
  isExiting?: boolean;
}) {
  return (
    <motion.div
      className="absolute top-[30vh] left-[12vw] flex flex-col items-center text-left text-white"
      style={{ zIndex: 7, ...(isExiting ? {} : { x: textX }) }}
      animate={isExiting ? { x: -2500, scale: 4 } : {}}
      transition={isExiting ? { duration: 1.2, ease: [0.8, 0, 1, 0.2] } : {}}
    >
      <motion.div
        className={`flex flex-col items-start leading-[0.94] tracking-[0%] uppercase ${viaodaLibre.className}`}
        initial={{ translateY: -60, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`flex flex-row items-center gap-4 text-[65px]`}>
          <span>STEP</span>
          <img
            src={"union.svg"}
            className="h-[30px] w-auto object-contain"
          />
          <span>INTO</span>
        </div>
        <span className="text-[77px]">WONDER</span>
      </motion.div>
      <motion.p
        className={`mt-4 max-w-[200px] text-[16px] leading-[1.2] font-normal tracking-[0%] text-white ${imprima.className}`}
        initial={{ translateY: 60, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        Designing immersive digital experiences that blur the line between
        imagination, AI, and reality.
      </motion.p>
    </motion.div>
  );
}
