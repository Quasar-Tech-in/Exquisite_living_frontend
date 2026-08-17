"use client";
import { useState } from "react";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import { imprima, viaodaLibre } from "@/lib/fonts";
import { useScene } from "@/context/SceneContext";

import Scene2CloudsLayer from "./Scene2CloudsLayer";
import Scene2FloorLayer from "./Scene2FloorLayer";
import Scene2WheelLayer from "./Scene2WheelLayer";
import Scene2LowerCloudsLayer from "./Scene2LowerCloudsLayer";
import Scene2HeroText from "./Scene2HeroText";
import ExitExperienceButton from "@/components/ExitExperienceButton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { DEFAULT_TITLE } from "@/lib/siteMeta";

interface Props {
  cloudX: MotionValue<number>;
  cloudY: MotionValue<number>;
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
  textX: MotionValue<number>;
}

// ── Chapter Subcomponents ──────────────────────────────────────────────────────

function ComparisonTable({ activeIndex }: { activeIndex: number }) {
  const isExquisiteActive = activeIndex >= 0 && activeIndex <= 3;
  return (
    <div className="flex flex-col gap-3 text-xs font-light md:text-sm">
      {/* Concierge — neutral, recessive */}
      <div
        className="flex items-center justify-between rounded border border-white/6 p-3 opacity-50"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <span className="text-[10px] tracking-widest text-white/40 uppercase md:text-xs">
          The concierge
        </span>
        <span className="text-white/60">Responds to requests</span>
      </div>
      {/* Advisor — neutral, recessive */}
      <div
        className="flex items-center justify-between rounded border border-white/6 p-3 opacity-50"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <span className="text-[10px] tracking-widest text-white/40 uppercase md:text-xs">
          The advisor
        </span>
        <span className="text-white/60">Presents options</span>
      </div>
      {/* Separator */}
      <div className="border-t border-white/8" />
      {/* ExQuisite — highlighted with signature green */}
      <motion.div
        animate={
          isExquisiteActive
            ? { scale: 1.02, borderColor: "rgba(123, 238, 169, 0.45)" }
            : { scale: 1 }
        }
        className={`flex items-center justify-between rounded border p-3 transition-colors ${isExquisiteActive
            ? "border-[#7beea9]/40 ring-1 ring-[#7beea9]/20"
            : "border-white/10 opacity-70"
          }`}
        style={{
          background: isExquisiteActive
            ? "linear-gradient(135deg, rgba(123,238,169,0.10) 0%, rgba(20,32,25,0.85) 100%)"
            : "rgba(255,255,255,0.04)",
        }}
      >
        <span className="text-[10px] font-medium tracking-[0.15em] text-[#7beea9] uppercase md:text-xs">
          ExQuisite
        </span>
        <span className="font-normal text-white">
          Composes what was never asked for
        </span>
      </motion.div>
      <img
        src="/icon_spiral_cream.png"
        alt=""
        className="mx-auto mt-4 h-6 w-auto opacity-20 md:h-8"
      />
    </div>
  );
}

// Intelligence Dimensions Grid
function IntelligenceGrid({
  activeIndex,
  setActiveCardIndex,
}: {
  activeIndex: number;
  setActiveCardIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const currentActivePoint =
    activeIndex >= 4 && activeIndex <= 11 ? activeIndex - 3 : -1;

  const points = [
    { num: "01", name: "Rhythm & pace of living" },
    { num: "02", name: "Aesthetic sensibility" },
    { num: "03", name: "Palate & provenance" },
    { num: "04", name: "Solitude vs. company" },
    { num: "05", name: "Movement & geography" },
    { num: "06", name: "Sound, scent, light" },
    { num: "07", name: "Curiosities & fixations" },
    { num: "08", name: "Time of day you come alive" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 text-[11px] md:text-xs">
        {points.map((p, idx) => {
          const isActive = idx + 1 === currentActivePoint;
          const targetIndex = 4 + idx; // idx 0-7 maps to normalizedIndex 4-11
          return (
            <motion.div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                const diff = ((targetIndex - activeIndex + 30) % 20) - 10;
                setActiveCardIndex((prev) => prev + diff);
              }}
              animate={
                isActive
                  ? { scale: 1.03, borderColor: "rgba(123, 238, 169, 0.6)" }
                  : { scale: 1, borderColor: "rgba(255, 255, 255, 0.1)" }
              }
              className={`flex h-14 cursor-pointer flex-col justify-center rounded border p-2 font-light transition-colors md:h-16 md:p-3 ${isActive
                  ? "border-[#7beea9] bg-white/8 text-white"
                  : "border-white/10 bg-white/4 text-white/70"
                }`}
            >
              <span
                className={`text-[8px] tracking-widest uppercase md:text-[9px] ${isActive ? "text-[#E6C19A]" : "text-white/50"}`}
              >
                {p.num}
              </span>
              <span className="mt-0.5 truncate leading-snug">{p.name}</span>
            </motion.div>
          );
        })}
      </div>
      <p className="text-center text-[9px] leading-relaxed font-light text-white/55 md:text-[10px]">
        Eight of more than two hundred. The others, we hold quietly.
      </p>
    </div>
  );
}

// Curation Split Layout Image Block
function YoursResembleBlock() {
  return (
    <div className="flex flex-col rounded-xl border border-white/5 bg-white/5 p-3 md:p-4">
      <div className="relative mb-3 aspect-16/10 overflow-hidden rounded-lg">
        <img
          src="/exp_table.png"
          alt="An intimate composition"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
      </div>
      <span className="mb-1 block text-[9px] tracking-widest text-[#7beea9] uppercase md:text-[10px]">
        ✦ The last leaf of this chapter
      </span>
      <h4
        className={`mb-1.5 text-base leading-snug font-light text-white md:text-lg ${viaodaLibre.className}`}
      >
        The best experiences never feel designed.
      </h4>
      <p className="text-[11px] leading-relaxed font-light text-white/70 md:text-xs">
        They simply feel right. Behind that feeling is thoughtful planning,
        quiet attention, and a deep understanding of what matters most to you.
        That&apos;s how every experience we create begins.
      </p>
    </div>
  );
}

// Membership Registration Interest Form
function RegisterInterestForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-3 text-center md:p-4">
      <img
        src="/icon_tree_cream.png"
        alt=""
        className="mb-3 h-6 w-auto opacity-40 md:mb-4 md:h-8"
      />
      <p className="mb-2.5 text-base leading-snug font-light text-white md:text-lg lg:text-xl">
        If this is resonating, we would like to know you exist.
      </p>
      <p className="mb-5 text-xs font-light text-white/60 md:mb-7 md:text-sm lg:text-base">
        No obligation follows. We simply begin to listen.
      </p>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full rounded border border-dashed border-[#E6C19A]/30 py-4 text-sm font-light tracking-widest text-[#E6C19A] md:text-base lg:text-lg"
        >
          ✦ Interest Registered. We will find you. ✦
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 md:gap-4"
        >
          <input
            type="text"
            placeholder="Email address or referral name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-white/30 bg-transparent py-2.5 text-center text-sm font-light placeholder-white/50 transition-colors focus:border-white focus:outline-none md:text-base lg:text-lg"
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer rounded border border-white/30 py-3 text-xs font-normal tracking-widest text-white/80 uppercase transition-all duration-300 hover:border-white hover:bg-white hover:text-black md:text-sm lg:text-base"
          >
            Register Interest
          </button>
        </form>
      )}
    </div>
  );
}

// Membership Policies List
function MembershipPolicies() {
  const policies = [
    {
      title: "By invitation",
      desc: "Membership is offered, almost always by introduction. One does not apply so much as become known.",
    },
    {
      title: "Held to a number",
      desc: "We keep our membership deliberately small, so that the work remains personal — never processed.",
    },
    {
      title: "Composed, not catered",
      desc: "No menu, no tiers of perks. Each member receives a world built only for them.",
    },
    {
      title: "Discreet by nature",
      desc: "Names, particulars, and the nature of the work stay entirely between us.",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 text-[10px] font-light md:text-[11px]">
      {policies.map((p, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between rounded border border-white/8 p-2 md:p-3"
          style={{
            background:
              "linear-gradient(145deg, rgba(20,32,25,0.85) 0%, rgba(10,18,14,0.9) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <span className="mb-1 font-medium tracking-widest text-[#E6C19A] uppercase">
            {p.title}
          </span>
          <span className="leading-snug text-white/70">{p.desc}</span>
        </div>
      ))}
    </div>
  );
}

import { cardsData } from "@/lib/cardsData";

// ── main Scene 2 component ──────────────────────────────────────────────────────

export default function Scene2({
  cloudX,
  cloudY,
  floorX,
  floorY,
  textX,
}: Props) {
  const { activeCardIndex, setActiveCardIndex, scene } = useScene();
  const isActive = scene === "transitioning" || scene === "scene2";
  const isReturning = scene === "returningToScene1";

  // Mobile drawer state
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Compute active variables based on index
  const normalizedIndex = ((activeCardIndex % 20) + 20) % 20;

  let sectionNum = "";
  let sectionTitle = "";
  let sectionDesc = "";
  let tabTitle = "";
  let chapterKey = 0;

  if (normalizedIndex >= 0 && normalizedIndex <= 3) {
    chapterKey = 1;
    sectionNum = "I — Sensibility";
    sectionTitle = "Every client is different, and so is every decision we make.";
    sectionDesc =
      "We take the time to understand your preferences, routines, values, and the details that matter most to you. Every recommendation, introduction, and experience is thoughtfully curated to feel personal, intuitive, and unmistakably yours.";
    tabTitle = "ExQuisite Living — Sensibility";
  } else if (normalizedIndex >= 4 && normalizedIndex <= 11) {
    chapterKey = 2;
    sectionNum = "II — Intelligence";
    sectionTitle = "Behind every effortless experience is thoughtful planning.";
    sectionDesc =
      "We combine trusted relationships, meticulous research, and proactive execution to anticipate needs, simplify complexity, and ensure every detail is considered long before it becomes a request.";
    tabTitle = "ExQuisite Living — Intelligence";
  } else if (normalizedIndex >= 12 && normalizedIndex <= 17) {
    chapterKey = 3;
    sectionNum = "III — Curation";
    sectionTitle = "Every detail, thoughtfully curated";
    sectionDesc =
      "No two lives are the same, and neither are the experiences we create. Every journey, celebration, introduction, and moment is thoughtfully composed around your preferences, priorities, and the way you choose to live—never from a template, always with intention.";
    tabTitle = "ExQuisite Living — Curation";
  } else if (normalizedIndex >= 18 && normalizedIndex <= 19) {
    chapterKey = 4;
    sectionNum = "IV — Membership";
    sectionTitle = "You do not join us. We find you.";
    sectionDesc =
      "You do not apply. You become known. Membership, when it comes, is a quiet conferral — extended only when both worlds are in the right place.";
    tabTitle = "ExQuisite Living — Membership";
  }

  useDocumentTitle(scene === "scene1" ? DEFAULT_TITLE : tabTitle);

  const activeComp = cardsData[normalizedIndex];

  return (
    <>
      <Scene2CloudsLayer
        cloudX={cloudX}
        cloudY={cloudY}
      />
      <Scene2FloorLayer
        floorX={floorX}
        floorY={floorY}
      />
      <Scene2WheelLayer
        activeCardIndex={activeCardIndex}
        setActiveCardIndex={setActiveCardIndex}
      />
      <Scene2LowerCloudsLayer
        floorX={floorX}
        floorY={floorY}
        activeCardIndex={activeCardIndex}
      />
      <Scene2HeroText
        textX={textX}
        activeCardIndex={activeCardIndex}
      />

      {/* Chapter progress dots — desktop only, sits below the hero text */}
      <motion.div
        className={`pointer-events-none absolute inset-x-0 top-[30dvh] z-10 hidden justify-center gap-1.5 lg:flex ${imprima.className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={
          isReturning
            ? { duration: 0.8, delay: 0, ease: [0.8, 0, 1, 0.2] }
            : { duration: 0.8, delay: 1.2 }
        }
      >
        {(() => {
          // Chapter boundaries
          const chapters = [
            { start: 0, end: 3 }, // Sensibility
            { start: 4, end: 11 }, // Intelligence
            { start: 12, end: 17 }, // Curation
            { start: 18, end: 19 }, // Membership
          ];
          const currentChapter = chapters.find(
            (c) => normalizedIndex >= c.start && normalizedIndex <= c.end,
          );
          if (!currentChapter) return null;
          const total = currentChapter.end - currentChapter.start + 1;
          const position = normalizedIndex - currentChapter.start;
          return Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === position ? 20 : 6,
                height: 4,
                background:
                  i === position
                    ? "rgba(123,238,169,0.8)"
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ));
        })()}
      </motion.div>

      {/* Desktop Left Details Sidebar */}
      <motion.div
        className={`pointer-events-auto absolute top-[56dvh] left-[5vw] z-10 hidden h-fit max-h-[75dvh] w-[28vw] -translate-y-1/2 flex-col overflow-y-auto rounded-2xl border border-white/8 p-6 backdrop-blur-md select-none lg:flex ${imprima.className}`}
        style={{
          background:
            "linear-gradient(145deg, rgba(20,32,25,0.92) 0%, rgba(10,18,14,0.96) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.45)",
        }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -40 }}
        transition={
          isReturning
            ? { duration: 1.2, delay: 0, ease: [0.8, 0, 1, 0.2] }
            : { duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <div className="mb-2 flex items-center gap-2">
          {chapterKey === 1 && (
            <img
              src="/icon_spiral_cream.png"
              alt=""
              className="h-4 w-auto opacity-40"
            />
          )}
          {chapterKey === 2 && (
            <img
              src="/icon_clover_cream.png"
              alt=""
              className="h-4 w-auto opacity-40"
            />
          )}
          {chapterKey === 3 && (
            <img
              src="/icon_tree_cream.png"
              alt=""
              className="h-4 w-auto opacity-40"
            />
          )}
          {chapterKey === 4 && (
            <img
              src="/icon_clover_cream.png"
              alt=""
              className="h-4 w-auto opacity-40"
            />
          )}
          <span className="text-[10px] font-light tracking-[0.2em] text-[#7beea9] uppercase md:text-[11px]">
            {sectionNum}
          </span>
        </div>
        <h3
          className={`mb-4 text-xl leading-tight font-light text-white md:text-2xl ${viaodaLibre.className}`}
        >
          {sectionTitle}
        </h3>
        <p className="text-xs leading-relaxed font-light text-white/75 md:text-sm">
          {sectionDesc}
        </p>

        {/* Dynamic narrative for all cards on left */}
        {activeComp && (
          <motion.div
            key={normalizedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 border-t border-white/10 pt-5"
          >
            <span className="mb-0.5 block text-xs font-medium tracking-widest text-[#E6C19A] uppercase">
              {activeComp.title}
            </span>
            <span className="mb-2 block text-[10px] text-white/55">
              {activeComp.subtext}
            </span>
            <p className="text-xs leading-relaxed font-light text-white/80">
              {activeComp.desc}
            </p>
          </motion.div>
        )}

        {/* Policy list for membership on left */}
        {chapterKey === 4 && (
          <div className="mt-6 border-t border-white/10 pt-5">
            <MembershipPolicies />
          </div>
        )}
      </motion.div>

      {/* Desktop Right Component Sidebar */}
      <motion.div
        className={`pointer-events-auto absolute top-[56dvh] right-[5vw] z-10 hidden h-fit max-h-[75dvh] -translate-y-1/2 flex-col overflow-y-auto rounded-2xl border border-white/8 p-6 backdrop-blur-md select-none lg:flex ${imprima.className}`}
        style={{
          background:
            "linear-gradient(145deg, rgba(20,32,25,0.92) 0%, rgba(10,18,14,0.96) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.45)",
        }}
        initial={{ opacity: 0, x: 40, width: "29vw" }}
        animate={{
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : 40,
          width: chapterKey === 3 ? "23vw" : "29vw",
        }}
        transition={
          isReturning
            ? { duration: 1.2, delay: 0, ease: [0.8, 0, 1, 0.2] }
            : { duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
      >
        {chapterKey === 1 && <ComparisonTable activeIndex={normalizedIndex} />}
        {chapterKey === 2 && (
          <IntelligenceGrid
            activeIndex={normalizedIndex}
            setActiveCardIndex={setActiveCardIndex}
          />
        )}
        {chapterKey === 3 && <YoursResembleBlock />}
        {chapterKey === 4 && <RegisterInterestForm />}
      </motion.div>

      {/* Mobile Drawer Trigger Button */}
      <div
        className={`short:bottom-4! absolute bottom-36 left-1/2 z-8 mb-[env(safe-area-inset-bottom)] -translate-x-1/2 md:bottom-28 lg:hidden ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <motion.button
          onClick={() => setIsDetailsOpen(true)}
          disabled={!isActive}
          className={`short:px-3 short:py-1.5 short:text-[9px]! flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-[10px] font-light tracking-[0.15em] text-white/90 uppercase shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black md:text-xs ${imprima.className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={
            isReturning
              ? { duration: 0.8, delay: 0, ease: [0.8, 0, 1, 0.2] }
              : { duration: 0.8, delay: 1 }
          }
        >
          ✦ View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Details Modal Overlay */}
      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto p-6 backdrop-blur-md"
            style={{
              background:
                "linear-gradient(145deg, rgba(12,20,17,0.97) 0%, rgba(6,12,10,0.99) 100%)",
            }}
          >
            {/* Close Button */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content Container (Stacked) */}
            <div className="flex flex-col gap-6 pb-12">
              <div className="flex flex-col text-center">
                <span className="mb-2 text-[10px] font-light tracking-[0.2em] text-[#7beea9] uppercase">
                  {sectionNum}
                </span>
                <h3
                  className={`mb-3 text-2xl font-light text-white ${viaodaLibre.className}`}
                >
                  {sectionTitle}
                </h3>
                <p
                  className={`px-2 text-xs leading-relaxed font-light text-white/75 ${imprima.className}`}
                >
                  {sectionDesc}
                </p>

                {/* Narrative injection for all cards */}
                {activeComp && (
                  <div className="mt-5 rounded-lg border border-dashed border-white/10 bg-white/5 p-4 text-left">
                    <span className="mb-1 block text-xs font-medium tracking-widest text-[#E6C19A] uppercase">
                      {activeComp.title}
                    </span>
                    <span className="mb-2 block text-[10px] text-white/55">
                      {activeComp.subtext}
                    </span>
                    <p
                      className={`text-xs leading-relaxed font-light text-white/80 ${imprima.className}`}
                    >
                      {activeComp.desc}
                    </p>
                  </div>
                )}

                {/* Membership policy injection */}
                {chapterKey === 4 && (
                  <div className="mt-5 text-left">
                    <MembershipPolicies />
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-6">
                {chapterKey === 1 && (
                  <ComparisonTable activeIndex={normalizedIndex} />
                )}
                {chapterKey === 2 && (
                  <IntelligenceGrid
                    activeIndex={normalizedIndex}
                    setActiveCardIndex={setActiveCardIndex}
                  />
                )}
                {chapterKey === 3 && <YoursResembleBlock />}
                {chapterKey === 4 && <RegisterInterestForm />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Exit Experience Button */}
      <ExitExperienceButton />

      {/* Minimal copyright */}
      <p
        className={`short:hidden pointer-events-none absolute bottom-4 left-1/2 z-10 mb-[env(safe-area-inset-bottom)] -translate-x-1/2 text-[9px] font-light tracking-wider whitespace-nowrap text-white/20 ${imprima.className}`}
      >
        © 2026 ExQuisite Living.
      </p>
    </>
  );
}
