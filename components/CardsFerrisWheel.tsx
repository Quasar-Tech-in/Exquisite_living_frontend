"use client";

import { viaodaLibre, imprima } from "@/lib/fonts";

type CardsData = {
  title: string;
  subtext: string;
};

const cardsData: CardsData[] = [
  {
    title: "Sensibility",
    subtext: "An intelligence, not a favour desk or hotline.",
  },
  {
    title: "Anticipation",
    subtext: "Composing what moves you before you think to ask.",
  },
  {
    title: "Curation Engine",
    subtext: "Knowing each member with depth no concierge could match.",
  },
  {
    title: "Touchpoints",
    subtext: "Listening across 200+ dimensions of a telling life.",
  },
  {
    title: "Rhythm & Pace",
    subtext: "Chapter I: Attuning to the speed of your living.",
  },
  {
    title: "Aesthetic Sense",
    subtext: "Chapter II: Curating design, materials, and form.",
  },
  {
    title: "Palate & Origin",
    subtext: "Chapter III: Sourcing preferences you never named.",
  },
  {
    title: "Solitude & Co.",
    subtext: "Chapter IV: Finding the balance between quiet and company.",
  },
  {
    title: "Geography",
    subtext: "Chapter V: Adapting as you move across the world.",
  },
  {
    title: "Light & Scent",
    subtext: "Chapter VI: Creating comfort through sensory details.",
  },
  {
    title: "Daily Cycle",
    subtext: "Chapter VII: Aligning with the hours you come alive.",
  },
  {
    title: "Fixations",
    subtext: "Chapter VIII: Following the path of your curiosities.",
  },
  {
    title: "Undisclosed Ridge",
    subtext: "A solitude composed from a passing remark.",
  },
  {
    title: "Unhurried Dawn",
    subtext: "A morning owned by no calendar, arranged quietly.",
  },
  {
    title: "Closed Hall",
    subtext: "Dinner for one in a room made for hundreds.",
  },
  {
    title: "Cuisine Artistry",
    subtext: "A chef drawn from retirement for preferences unnamed.",
  },
  {
    title: "Vanishing Craft",
    subtext: "An afternoon inside a workshop without a sign.",
  },
  {
    title: "Unnamed Coast",
    subtext: "A passage, slow, with the world kept completely out.",
  },
  {
    title: "By Invitation",
    subtext: "Conferred quietly, only when our worlds align.",
  },
  {
    title: "Personal Scale",
    subtext: "Deliberately small, so the work remains personal.",
  },
];

// 10 premium organic colors that feel cohesive with the brand
const colors: string[] = [
  "#F9F6F0", // Ivory/Linen
  "#F0EDE6", // Warm Alabaster
  "#E6EAE4", // Soft Sage Mist
  "#ECE6DC", // Warm Sand
  "#E2DEC9", // Muted Brass Gold
  "#EAE8E2", // Pebble Gray
  "#E3E7E3", // Pale Green Clay
  "#ECE3DB", // Soft Almond
  "#E5DDD0", // Warm Cream
  "#EBEAE5", // Linen White
];

// Each of the 10 colors appears at position i and i+10 (opposite sides of the wheel)
// This guarantees no adjacent duplicates and equal frequency
const cardColors: string[] = [...colors, ...colors];

// Wheel geometry — gap constraint at INNER card edge (radius = RADIUS - CARD_H):
// arc_inner = 2π × (RADIUS - CARD_H) / N ≥ CARD_W + 2  →  RADIUS ≥ (222×20)/(2π) + 240 = 947
const TOTAL_CARDS = 20;
const RADIUS = 905; // rim of wheel — tightened from 950 for ~2px visual gap
const CARD_W = 220;
const CARD_H = 240;
const CARD_RADIUS = 40; // border-radius for all card corners
const CIRCLE_R = 22; // radius of the accent circle
// Place circle center at (CARD_RADIUS, CARD_RADIUS) from the corner vertex so it hugs the rounded corner
const CIRCLE_PADDING = CARD_RADIUS - CIRCLE_R; // = 18px

// Inline union SVG with dynamic fill
function UnionIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="13"
      height="23"
      viewBox="0 0 13 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.26696 13.9642C5.74054 12.4908 5.74065 10.1017 4.2672 8.62816L0.903418 5.26408C-0.300672 4.05988 -0.300713 2.10762 0.903329 0.903374C2.10755 -0.301054 4.06018 -0.301136 5.2645 0.903191L10.321 5.95966C13.2679 8.90663 13.268 13.6846 10.3211 16.6317L5.26437 21.6887C4.0601 22.8931 2.10752 22.8931 0.903211 21.6888C-0.301111 20.4845 -0.301067 18.5318 0.903309 17.3276L4.26696 13.9642Z"
        fill={fill}
      />
    </svg>
  );
}

interface Props {
  activeCardIndex: number;
  setActiveCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function CardsFerrisWheel({ activeCardIndex, setActiveCardIndex }: Props) {
  // Canvas must fit the whole wheel plus cards protruding outward
  const canvasSize = (RADIUS + CARD_H) * 2 + CARD_W;

  const normalizedActiveIndex = ((activeCardIndex % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;

  return (
    <div
      className="relative shrink-0"
      style={{ width: canvasSize, height: canvasSize }}
    >
      {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
        const angle = (360 / TOTAL_CARDS) * i; // degrees, clockwise from top
        const angleRad = (angle * Math.PI) / 180;

        // Card center sits at RADIUS - CARD_H/2 so the card bottom is tangent to the rim
        const cardCenterR = RADIUS - CARD_H / 2;
        const cx = cardCenterR * Math.sin(angleRad);
        const cy = -cardCenterR * Math.cos(angleRad);

        const bg = cardColors[i];
        const isWebActive = i === normalizedActiveIndex;

        // Circular distance on 20-card wheel
        const dist = Math.min(
          Math.abs(i - normalizedActiveIndex),
          TOTAL_CARDS - Math.abs(i - normalizedActiveIndex)
        );

        let cardOpacity = 0;
        if (dist === 0) cardOpacity = 1;
        else if (dist === 1) cardOpacity = 0.65;
        else if (dist === 2) cardOpacity = 0.35;
        else if (dist === 3) cardOpacity = 0.1;
        else cardOpacity = 0;

        return (
          <div
            key={i}
            className="absolute flex flex-col justify-end px-5 pb-8 shadow-2xl cursor-pointer select-none"
            style={{
              width: CARD_W,
              height: CARD_H,
              backgroundColor: bg,
              left: `calc(50% + ${cx}px - ${CARD_W / 2}px)`,
              top: `calc(50% + ${cy}px - ${CARD_H / 2}px)`,
              // Rotate so the card's bottom edge is tangent to the wheel rim, and scale active/inactive
              transform: `rotate(${angle}deg) scale(${isWebActive ? 1.05 : 0.82})`,
              transformOrigin: "center center",
              // Uniform 40px radius; circle is inset to align with the corner arc
              borderRadius: CARD_RADIUS,
              opacity: cardOpacity,
              pointerEvents: cardOpacity > 0 ? "auto" : "none",
              boxShadow: isWebActive
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 255, 255, 0.08)"
                : "0 8px 16px -4px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Shortest path navigation logic
              const diff = ((i - normalizedActiveIndex + 30) % TOTAL_CARDS) - 10;
              setActiveCardIndex((prev) => prev + diff);
            }}
          >
            {/* Black semi-transparent circle at top-right, inset from corner */}
            <div
              className="absolute flex items-center justify-center transition-transform duration-300 hover:scale-110"
              style={{
                width: CIRCLE_R * 2,
                height: CIRCLE_R * 2,
                top: CIRCLE_PADDING,
                right: CIRCLE_PADDING,
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "50%",
              }}
            >
              <div style={{ transform: "rotate(-45deg)" }}>
                <UnionIcon fill={bg} />
              </div>
            </div>

            {/* Text — tilted with the card (no counter-rotation) */}
            <h3
              className={`text-[28px] md:text-[30px] font-medium leading-tight text-black capitalize ${viaodaLibre.className}`}
            >
              {cardsData[i % cardsData.length].title}
            </h3>
            <p
              className={`mt-1.5 text-[14px] md:text-[15px] leading-snug text-black/75 ${imprima.className}`}
            >
              {cardsData[i % cardsData.length].subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
