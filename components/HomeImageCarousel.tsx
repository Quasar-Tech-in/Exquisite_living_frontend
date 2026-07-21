"use client";

import { motion, type MotionValue } from "framer-motion";
import { viaodaLibre, imprima } from "@/lib/fonts";
import { useViewportScale } from "@/hooks/useViewportScale";

// ── card metadata ──────────────────────────────────────────────────────────────
type CardMeta =
  | { kind: "play"; label: string }
  | { kind: "stat"; number: string; label: string };

const CARDS: { src: string; delay: number; meta: CardMeta; icon: string }[] = [
  {
    src: "/scene_dawn.png",
    delay: 1,
    meta: { kind: "stat", number: "I", label: "The Sensibility" },
    icon: "/icon_spiral_cream.png",
  },
  {
    src: "/scene_mist.png",
    delay: 1.15,
    meta: { kind: "stat", number: "II", label: "The Intelligence" },
    icon: "/icon_clover_cream.png",
  },
  {
    src: "/closing_ambient.png",
    delay: 1.3,
    meta: { kind: "stat", number: "III", label: "The Compositions" },
    icon: "/icon_tree_cream.png",
  },
];

// Shared SVG filter — defined once so all 3 play buttons reference the same id
function SharedDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute"
    >
      <defs>
        <filter
          id="play-soft"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="0.6"
            result="blur"
          />
          <feComposite
            in="blur"
            in2="SourceGraphic"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>
  );
}

// ── play button ────────────────────────────────────────────────────────────────
function PlayButton() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-md">
      <svg
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 translate-x-[1.5px]"
      >
        {/* references the single shared filter defined in <SharedDefs> */}
        <path
          d="M2 1.5L14 9L2 16.5V1.5Z"
          fill="#66786b"
          filter="url(#play-soft)"
        />
      </svg>
    </div>
  );
}

// ── bottom footer ──────────────────────────────────────────────────────────────
function CardFooter({ meta }: { meta: CardMeta }) {
  if (meta.kind === "play") {
    return (
      <div className="flex flex-row items-center gap-2.5">
        <PlayButton />
        {/* two-line label */}
        <div
          className={`flex flex-col text-[13px] leading-tight text-white ${imprima.className}`}
          style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)" }}
        >
          {meta.label.split(" ").map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row items-center gap-2.5">
      <span
        className={`text-[32px] leading-none text-white ${viaodaLibre.className}`}
        style={{ textShadow: "0 2px 5px rgba(0, 0, 0, 0.4)" }}
      >
        {meta.number}
      </span>
      {/* two-line label */}
      <div
        className={`flex flex-col text-[13px] leading-tight text-white ${imprima.className}`}
        style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)" }}
      >
        {meta.label.split(" ").map((word, i) => (
          <span key={i}>{word}</span>
        ))}
      </div>
    </div>
  );
}

// ── single card ────────────────────────────────────────────────────────────────
function CarouselCard({
  src,
  delay,
  meta,
  icon,
  isReturning = false,
}: {
  src: string;
  delay: number;
  meta: CardMeta;
  icon: string;
  isReturning?: boolean;
}) {
  return (
    /* Wrapper is always the max height so the row never shifts */
    <div
      className="pointer-events-auto"
      style={{ width: 160, height: 200, flexShrink: 0, position: "relative" }}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 overflow-hidden rounded-3xl"
        style={{ cursor: "pointer", height: 160 }}
        /* enter animation — drop from top; skipped when returning */
        initial={isReturning ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          /* entry: staggered drop + fade in */
          y: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          opacity: { delay, duration: 0.5, ease: "easeOut" },
          /* hover height: instant spring */
          height: { type: "spring", stiffness: 280, damping: 24 },
        }}
        /* hover — grow upward from bottom, no layout shift */
        whileHover={{ height: 200 }}
      >
        {/* background image layer — zooms more than the div */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />

        {/* bottom blur — 50% height, fades out toward top */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "50%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 55%, transparent 100%)",
          }}
        />

        {/* bottom text — above the blur */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3 pb-3">
          <CardFooter meta={meta} />
          {/* Brand icon — top right of card */}
          <img src={icon} alt="" className="h-5 w-auto opacity-50 mb-0.5" style={{ filter: "brightness(0) invert(1)" }} />
        </div>
      </motion.div>
    </div>
  );
}

// ── indicators ─────────────────────────────────────────────────────────────────
const INDICATOR_OPACITIES = [1, 0.5, 0.3, 0.15];

function Indicators() {
  return (
    /* ml-[18px] = half of w-9 (36px) so dots start under play button centre */
    <div className="mt-3 ml-4.5 flex flex-row items-center justify-start gap-1.5">
      {INDICATOR_OPACITIES.map((op, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full bg-white"
          style={{
            width: 20, // all same length
            opacity: op,
          }}
        />
      ))}
    </div>
  );
}

// ── root ───────────────────────────────────────────────────────────────────────
export default function HomeImageCarousel({
  carouselX,
  isExiting = false,
  isReturning = false,
}: {
  carouselX: MotionValue<number>;
  isExiting?: boolean;
  isReturning?: boolean;
}) {
  const { width } = useViewportScale();
  const carouselScale = width < 768 ? 0.7 : 1;
  const exitX = width + 500;

  return (
    <motion.div
      className="pointer-events-none absolute top-[30vh] -right-2.5 hidden flex-col md:flex"
      style={{ zIndex: 7, x: carouselX, scale: carouselScale, transformOrigin: "right center" }}
    >
      <motion.div
        initial={isReturning ? { x: exitX, scale: 4 } : {}}
        animate={isExiting ? { x: exitX, scale: 4 } : { x: 0, scale: 1 }}
        transition={
          isExiting ? { duration: 1.2, delay: 0.05, ease: [0.8, 0, 1, 0.2] } :
          isReturning ? { duration: 2, delay: 0.05, ease: [0.9, 0, 0.1, 1] } : {}
        }
        className="flex flex-col"
      >
      {/* single shared SVG defs so all play buttons reference the same filter id */}
      <SharedDefs />
      <div className="flex flex-row gap-3">
        {CARDS.map((card, i) => (
          <CarouselCard
            key={i}
            {...card}
            isReturning={isReturning}
          />
        ))}
      </div>
      <Indicators />
      </motion.div>
    </motion.div>
  );
}
