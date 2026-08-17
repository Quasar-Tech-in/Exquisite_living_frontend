"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
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
    meta: { kind: "stat", number: "III", label: "The Curation" },
    icon: "/icon_tree_cream.png",
  },
  {
    src: "/exp_table.png",
    delay: 1.45,
    meta: { kind: "stat", number: "IV", label: "The Membership" },
    icon: "/iconlogo_cream.png",
  },
];

// ── infinite-strip geometry ───────────────────────────────────────────────────
const CARD_WIDTH = 160;
const CARD_GAP = 12; // matches the row's `gap-3`
const CARD_STEP = CARD_WIDTH + CARD_GAP; // px from one card's left edge to the next
const LOOP_WIDTH = CARDS.length * CARD_STEP; // one full pass through the 4 unique cards
const VISIBLE_CARDS = 3;
const VIEWPORT_WIDTH = VISIBLE_CARDS * CARD_WIDTH + (VISIBLE_CARDS - 1) * CARD_GAP;

// The strip renders the 4 cards repeatedly so a drag can run in either
// direction without reaching an end. Between gestures `wrap` shifts the
// position by whole LOOP_WIDTHs back toward the middle copy — the content
// repeats every LOOP_WIDTH, so that shift is invisible while restoring the
// full buffer. It can't run during a drag: framer-motion's drag sets
// `origin + offset` every pointer frame (see VisualElementDragControls
// `updateAxis`), which would overwrite the correction on the next frame.
// 9 copies leaves ~2750px of travel on each side of home — more than a
// single edge-to-edge drag gesture — so wrapping only ever has to happen
// once a gesture has ended.
const LOOP_REPEATS = 9;
const HOME_LOOP = Math.floor(LOOP_REPEATS / 2);
const HOME_X = -HOME_LOOP * LOOP_WIDTH;
const repeatedCards = Array.from({ length: LOOP_REPEATS }, () => CARDS).flat();

// Hard bounds on the strip: the range of x over which the 3-card window is
// still fully covered by rendered cards. Used as dragConstraints so a single
// very long gesture (on a very wide screen) can never expose empty space —
// `wrap` keeps x near HOME_X between gestures, so these are never reached in
// normal use. For an element whose x is a motion value, framer-motion's
// relative constraints resolve to exactly these numbers in motion-value
// units: the layout offset cancels out in calcRelativeAxisConstraints +
// rebaseAxisConstraints, so this stays correct under the ancestor's scale.
const STRIP_WIDTH = LOOP_REPEATS * LOOP_WIDTH;
const DRAG_MIN_X = -(STRIP_WIDTH - VIEWPORT_WIDTH);
const DRAG_MAX_X = 0;

// Width of the left-edge fade, as a % of the viewport. Applied only while the
// strip is actually moving so the cards sit at full opacity at rest.
const FADE_WIDTH = 18;

// Clip padding: the viewport clips its overflow, so it needs headroom for the
// cards' entrance drop (y: -60) and the hover scale, with matching negative
// margins so the surrounding layout is unchanged.
const CLIP_PAD_TOP = 70;
const CLIP_PAD_BOTTOM = 10;

// Shared SVG filter — defined once so all play buttons reference the same id
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
    <div
      className="pointer-events-auto"
      style={{ width: CARD_WIDTH, height: 200, flexShrink: 0, position: "relative" }}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 overflow-hidden rounded-3xl"
        style={{ cursor: "grab", height: 180 }}
        /* enter animation — drop from top, once on mount; skipped when returning */
        initial={isReturning ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          /* entry: staggered drop + fade in */
          y: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          opacity: { delay, duration: 0.5, ease: "easeOut" },
          /* hover scale: spring */
          scale: { type: "spring", stiffness: 240, damping: 18 },
        }}
        /* hover — grow in size (scale) */
        whileHover={{ scale: 1.08 }}
      >
        {/* background image layer — zooms more than the div */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{ scale: 1.25 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />

        {/* bottom blur ── 50% height, fades out toward top */}
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
function Indicators({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  // Rotate indicators based on the active card to reflect position in the cycle
  const opacities = [1, 0.5, 0.3, 0.15];

  return (
    <div className="pointer-events-auto mt-3 ml-4.5 flex flex-row items-center justify-start gap-1.5">
      {CARDS.map((card, i) => {
        // Calculate relative opacity for each dot in the cycle
        const relativeIndex = (i - activeIndex + CARDS.length) % CARDS.length;
        const op = opacities[relativeIndex];

        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show ${card.meta.label}`}
            className="h-1.5 cursor-pointer rounded-full bg-white transition-opacity duration-300"
            style={{
              width: 20,
              opacity: op,
            }}
          />
        );
      })}
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
  const { width, isCompact } = useViewportScale();
  // isCompact also covers landscape phones (short but wide) — the width-only
  // check alone would leave 3 full-size cards fighting the hero text for
  // space on an 844x390 screen.
  // Intermediate tier keeps the row from crowding/clipping past the hero
  // text on common laptop widths (~1024-1280px), where full scale left no
  // room for all 3 cards to stay fully on-screen.
  const carouselScale = isCompact ? 0.55 : width < 768 ? 0.7 : width < 1280 ? 0.82 : 1;
  const exitX = width + 500;

  // Continuous strip position in px, starting on the middle loop copy so the
  // first paint matches the original default order (CARDS[0..2]).
  const x = useMotionValue(HOME_X);
  // Left-edge fade width, animated up only while the strip is moving.
  const fadeStop = useMotionValue(0);
  const maskImage = useMotionTemplate`linear-gradient(to right, transparent 0%, black ${fadeStop}%, black 100%)`;

  // Which of the 4 unique cards is leftmost — derived from x for the dots only,
  // never fed back into x.
  const [activeIndex, setActiveIndex] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const wheelSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFadeShown = useRef(false);

  useMotionValueEvent(x, "change", (latest) => {
    const index = Math.round(-latest / CARD_STEP);
    const mod = ((index % CARDS.length) + CARDS.length) % CARDS.length;
    setActiveIndex((prev) => (prev === mod ? prev : mod));
  });

  // Shift the position by whole loop-widths back toward the middle copy. The
  // strip repeats every LOOP_WIDTH so this never changes what's on screen —
  // it just restores travel room. Safe only between gestures (see note above).
  const wrap = useCallback(() => {
    let next = x.get();
    while (next < HOME_X - LOOP_WIDTH) next += LOOP_WIDTH;
    while (next > HOME_X + LOOP_WIDTH) next -= LOOP_WIDTH;
    if (next !== x.get()) x.set(next);
  }, [x]);

  const showFade = useCallback(() => {
    if (isFadeShown.current) return;
    isFadeShown.current = true;
    animate(fadeStop, FADE_WIDTH, { duration: 0.2, ease: "easeOut" });
  }, [fadeStop]);

  const hideFade = useCallback(() => {
    if (!isFadeShown.current) return;
    isFadeShown.current = false;
    animate(fadeStop, 0, { duration: 0.45, ease: "easeOut" });
  }, [fadeStop]);

  // Settle to the nearest card boundary, then reclaim travel room.
  const settle = useCallback(() => {
    const nearest = Math.round(x.get() / CARD_STEP) * CARD_STEP;
    animate(x, nearest, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onComplete: wrap,
    });
    hideFade();
  }, [x, wrap, hideFade]);

  // Trackpad two-finger scrolling. Registered natively (not via React's onWheel)
  // so it can be non-passive and preventDefault the browser's own horizontal
  // swipe/back-navigation gesture. Unlike drag, this writes x directly each
  // event, so wrapping mid-scroll is safe and keeps travel room unbounded.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      showFade();
      x.set(x.get() - delta);
      wrap();
      if (wheelSettleTimer.current) clearTimeout(wheelSettleTimer.current);
      wheelSettleTimer.current = setTimeout(settle, 150);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelSettleTimer.current) clearTimeout(wheelSettleTimer.current);
    };
  }, [x, wrap, showFade, settle]);

  const goToIndex = (target: number) => {
    const current = Math.round(-x.get() / CARD_STEP);
    const currentMod = ((current % CARDS.length) + CARDS.length) % CARDS.length;
    let diff = target - currentMod;
    // Take the shorter way around the 4-card cycle
    if (diff > CARDS.length / 2) diff -= CARDS.length;
    if (diff < -CARDS.length / 2) diff += CARDS.length;
    if (diff === 0) return;
    showFade();
    animate(x, x.get() - diff * CARD_STEP, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        wrap();
        hideFade();
      },
    });
  };

  return (
    <motion.div
      className="pointer-events-none absolute top-[30dvh] short:top-[22dvh] right-4 hidden flex-col md:flex short:flex!"
      style={{ zIndex: 10, x: carouselX, scale: carouselScale, transformOrigin: "right center" }}
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

        {/* Fixed 3-card window onto the strip. Clips the repeated cards and
            carries the left-edge fade; padding/negative margin give the
            entrance drop and hover scale room inside the clip. */}
        <motion.div
          ref={viewportRef}
          className="pointer-events-auto overflow-hidden"
          style={{
            width: VIEWPORT_WIDTH,
            paddingTop: CLIP_PAD_TOP,
            marginTop: -CLIP_PAD_TOP,
            paddingBottom: CLIP_PAD_BOTTOM,
            marginBottom: -CLIP_PAD_BOTTOM,
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          {/* Draggable strip — touch and mouse drag. framer-motion sets
              touch-action: pan-y for drag="x", so vertical page scrolling
              still works on touch devices. */}
          <motion.div
            className="flex flex-row gap-3"
            style={{ x }}
            drag="x"
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={{ left: DRAG_MIN_X, right: DRAG_MAX_X }}
            onDragStart={showFade}
            onDragEnd={settle}
          >
            {repeatedCards.map((card, i) => (
              <CarouselCard
                key={i}
                {...card}
                isReturning={isReturning}
              />
            ))}
          </motion.div>
        </motion.div>

        <Indicators activeIndex={activeIndex} onSelect={goToIndex} />
      </motion.div>
    </motion.div>
  );
}
