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
    <div className="flex flex-col gap-3 font-light text-xs md:text-sm">
      {/* Concierge — neutral, recessive */}
      <div className="flex items-center justify-between p-3 rounded border border-white/6 opacity-50"
        style={{ background: "rgba(255,255,255,0.02)" }}>
        <span className="text-white/40 uppercase tracking-widest text-[10px] md:text-xs">The concierge</span>
        <span className="text-white/60">Responds to requests</span>
      </div>
      {/* Advisor — neutral, recessive */}
      <div className="flex items-center justify-between p-3 rounded border border-white/6 opacity-50"
        style={{ background: "rgba(255,255,255,0.02)" }}>
        <span className="text-white/40 uppercase tracking-widest text-[10px] md:text-xs">The advisor</span>
        <span className="text-white/60">Presents options</span>
      </div>
      {/* Separator */}
      <div className="border-t border-white/8" />
      {/* ExQuisite — highlighted with signature green */}
      <motion.div
        animate={isExquisiteActive ? { scale: 1.02, borderColor: "rgba(123, 238, 169, 0.45)" } : { scale: 1 }}
        className={`flex items-center justify-between p-3 rounded border transition-colors ${isExquisiteActive
          ? "border-[#7beea9]/40 ring-1 ring-[#7beea9]/20"
          : "border-white/10 opacity-70"
          }`}
        style={{
          background: isExquisiteActive
            ? "linear-gradient(135deg, rgba(123,238,169,0.10) 0%, rgba(20,32,25,0.85) 100%)"
            : "rgba(255,255,255,0.04)",
        }}
      >
        <span className="text-[#7beea9] uppercase tracking-[0.15em] font-medium text-[10px] md:text-xs">ExQuisite</span>
        <span className="text-white font-normal">Composes what was never asked for</span>
      </motion.div>
      <img src="/icon_spiral_cream.png" alt="" className="h-6 md:h-8 w-auto mx-auto mt-4 opacity-20" />
    </div>
  );
}

// Intelligence Dimensions Grid
function IntelligenceGrid({ activeIndex }: { activeIndex: number }) {
  const currentActivePoint = activeIndex >= 4 && activeIndex <= 11 ? activeIndex - 3 : -1;

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
          return (
            <motion.div
              key={idx}
              animate={isActive ? { scale: 1.03, borderColor: "rgba(143, 163, 151, 0.6)" } : { scale: 1 }}
              className={`flex flex-col justify-center h-14 md:h-16 p-2 md:p-3 rounded border font-light transition-colors ${isActive
                ? "bg-white/8 border-[#7beea9] text-white"
                : "bg-white/4 border-white/10 text-white/70"
                }`}
            >
              <span className={`text-[8px] md:text-[9px] uppercase tracking-widest ${isActive ? "text-[#ffa02e]" : "text-white/50"}`}>
                {p.num}
              </span>
              <span className="mt-0.5 leading-snug truncate">{p.name}</span>
            </motion.div>
          );
        })}
      </div>
      <p className="text-[9px] md:text-[10px] text-white/55 text-center font-light leading-relaxed">
        Eight of more than two hundred. The others, we hold quietly.
      </p>
    </div>
  );
}

// Compositions Split Layout Image Block
function YoursResembleBlock() {
  return (
    <div className="flex flex-col p-3 md:p-4 bg-white/5 border border-white/5 rounded-xl">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-3">
        <img
          src="/exp_table.png"
          alt="An intimate composition"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
      </div>
      <span className="text-[#7beea9] uppercase tracking-widest text-[9px] md:text-[10px] mb-1 block">
        ✦ The last leaf of this chapter
      </span>
      <h4 className={`text-base md:text-lg font-light leading-snug mb-1.5 ${viaodaLibre.className}`}>
        Yours would resemble none of these.
      </h4>
      <p className="text-white/70 text-[11px] md:text-xs font-light leading-relaxed">
        These are anonymised fragments, offered only to suggest the shape of the work. What we would compose for you is written on a page no one else will read.
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
    <div className="flex flex-col items-center text-center p-3 md:p-4">
      <img src="/icon_tree_cream.png" alt="" className="h-6 md:h-8 w-auto mb-3 md:mb-4 opacity-40" />
      <p className="text-base md:text-lg lg:text-xl font-light leading-snug mb-2.5">
        If this is resonating, we would like to know you exist.
      </p>
      <p className="text-white/60 text-xs md:text-sm lg:text-base font-light mb-5 md:mb-7">
        No obligation follows. We simply begin to listen.
      </p>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[#ffa02e] font-light text-sm md:text-base lg:text-lg tracking-widest py-4 border border-dashed border-[#ffa02e]/30 w-full rounded"
        >
          ✦ Interest Registered. We will find you. ✦
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 md:gap-4">
          <input
            type="text"
            placeholder="Email address or referral name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-white/30 py-2.5 text-sm md:text-base lg:text-lg text-center focus:outline-none focus:border-white transition-colors placeholder-white/50 font-light"
            required
          />
          <button
            type="submit"
            className="w-full py-3 border border-white/30 text-white/80 rounded transition-all duration-300 hover:bg-white hover:text-black hover:border-white font-normal tracking-widest text-xs md:text-sm lg:text-base uppercase cursor-pointer"
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
    { title: "By invitation", desc: "Membership is offered, almost always by introduction. One does not apply so much as become known." },
    { title: "Held to a number", desc: "We keep our membership deliberately small, so that the work remains personal — never processed." },
    { title: "Composed, not catered", desc: "No menu, no tiers of perks. Each member receives a world built only for them." },
    { title: "Discreet by nature", desc: "Names, particulars, and the nature of the work stay entirely between us." },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 text-[10px] md:text-[11px] font-light">
      {policies.map((p, idx) => (
        <div
          key={idx}
          className="p-2 md:p-3 border border-white/8 rounded flex flex-col justify-between"
          style={{
            background: "linear-gradient(145deg, rgba(20,32,25,0.85) 0%, rgba(10,18,14,0.9) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-[#ffa02e] font-medium uppercase tracking-widest mb-1">{p.title}</span>
          <span className="text-white/70 leading-snug">{p.desc}</span>
        </div>
      ))}
    </div>
  );
}

import { cardsData } from "@/lib/cardsData";

// ── main Scene 2 component ──────────────────────────────────────────────────────

export default function Scene2({ cloudX, cloudY, floorX, floorY, textX }: Props) {
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
  let chapterKey = 0;

  if (normalizedIndex >= 0 && normalizedIndex <= 3) {
    chapterKey = 1;
    sectionNum = "I — The Sensibility";
    sectionTitle = "Not a service. A sensibility.";
    sectionDesc = "A concierge waits. We don't. ExQuisite is not a favour desk or a curated catalogue — it is an attentiveness, quietly composing the experiences that would reach you before you'd thought to reach for them.";
  } else if (normalizedIndex >= 4 && normalizedIndex <= 11) {
    chapterKey = 2;
    sectionNum = "II — The Intelligence";
    sectionTitle = "A quiet intelligence, composing in the background.";
    sectionDesc = "At the centre is a Curation Engine with a single purpose: to know a member the way a decade of close attention might. It reads across more than two hundred quiet dimensions of a life, and from them makes something that does not feel arranged at all.";
  } else if (normalizedIndex >= 12 && normalizedIndex <= 17) {
    chapterKey = 3;
    sectionNum = "III — Compositions";
    sectionTitle = "Loose leaves, lifted from the book.";
    sectionDesc = "We rarely speak of what we make. These few are offered only to suggest the shape of it — anonymised pages from a book that otherwise stays closed.";
  } else if (normalizedIndex >= 18 && normalizedIndex <= 19) {
    chapterKey = 4;
    sectionNum = "IV — Membership";
    sectionTitle = "You do not join us. We find you.";
    sectionDesc = "You do not apply. You become known. Membership, when it comes, is a quiet conferral — extended only when both worlds are in the right place.";
  }

  const activeComp = cardsData[normalizedIndex];

  return (
    <>
      <Scene2CloudsLayer cloudX={cloudX} cloudY={cloudY} />
      <Scene2FloorLayer floorX={floorX} floorY={floorY} />
      <Scene2WheelLayer activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} />
      <Scene2LowerCloudsLayer floorX={floorX} floorY={floorY} activeCardIndex={activeCardIndex} />
      <Scene2HeroText textX={textX} activeCardIndex={activeCardIndex} />

      {/* Chapter progress dots — desktop only, sits below the hero text */}
      <motion.div
        className={`pointer-events-none hidden lg:flex absolute inset-x-0 top-[30vh] justify-center gap-1.5 z-10 ${imprima.className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={isReturning
          ? { duration: 0.8, delay: 0, ease: [0.8, 0, 1, 0.2] }
          : { duration: 0.8, delay: 1.2 }
        }
      >
        {(() => {
          // Chapter boundaries
          const chapters = [
            { start: 0, end: 3 },   // Sensibility
            { start: 4, end: 11 },  // Intelligence
            { start: 12, end: 17 }, // Compositions
            { start: 18, end: 19 }, // Membership
          ];
          const currentChapter = chapters.find(
            (c) => normalizedIndex >= c.start && normalizedIndex <= c.end
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
                background: i === position ? "rgba(123,238,169,0.8)" : "rgba(255,255,255,0.2)",
              }}
            />
          ));
        })()}
      </motion.div>

      {/* Desktop Left Details Sidebar */}
      <motion.div
        className={`hidden lg:flex absolute left-[5vw] top-1/2 -translate-y-1/2 w-[28vw] h-fit max-h-[75vh] overflow-y-auto flex-col z-10 select-none pointer-events-auto border border-white/8 backdrop-blur-md rounded-2xl p-6 ${imprima.className}`}
        style={{
          background: "linear-gradient(145deg, rgba(20,32,25,0.92) 0%, rgba(10,18,14,0.96) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.45)",
        }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -40 }}
        transition={isReturning
          ? { duration: 1.2, delay: 0, ease: [0.8, 0, 1, 0.2] }
          : { duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <div className="flex items-center gap-2 mb-2">
          {chapterKey === 1 && <img src="/icon_spiral_cream.png" alt="" className="h-4 w-auto opacity-40" />}
          {chapterKey === 2 && <img src="/icon_clover_cream.png" alt="" className="h-4 w-auto opacity-40" />}
          {chapterKey === 3 && <img src="/icon_tree_cream.png" alt="" className="h-4 w-auto opacity-40" />}
          {chapterKey === 4 && <img src="/icon_clover_cream.png" alt="" className="h-4 w-auto opacity-40" />}
          <span className="text-[#7beea9] uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-light">
            {sectionNum}
          </span>
        </div>
        <h3 className={`text-xl md:text-2xl font-light leading-tight text-white mb-4 ${viaodaLibre.className}`}>
          {sectionTitle}
        </h3>
        <p className="text-white/75 text-xs md:text-sm font-light leading-relaxed">
          {sectionDesc}
        </p>

        {/* Dynamic narrative for all cards on left */}
        {activeComp && (
          <motion.div
            key={normalizedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-5 border-t border-white/10"
          >
            <span className="text-[#ffa02e] font-medium text-xs tracking-widest uppercase block mb-0.5">
              {activeComp.title}
            </span>
            <span className="text-white/55 text-[10px] block mb-2">{activeComp.subtext}</span>
            <p className="text-white/80 text-xs font-light leading-relaxed">
              {activeComp.desc}
            </p>
          </motion.div>
        )}

        {/* Policy list for membership on left */}
        {chapterKey === 4 && (
          <div className="mt-6 pt-5 border-t border-white/10">
            <MembershipPolicies />
          </div>
        )}
      </motion.div>

      {/* Desktop Right Component Sidebar */}
      <motion.div
        className={`hidden lg:flex absolute right-[5vw] top-1/2 -translate-y-1/2 h-fit max-h-[75vh] overflow-y-auto flex-col z-10 select-none pointer-events-auto border border-white/8 backdrop-blur-md rounded-2xl p-6 ${imprima.className}`}
        style={{
          background: "linear-gradient(145deg, rgba(20,32,25,0.92) 0%, rgba(10,18,14,0.96) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.45)",
        }}
        initial={{ opacity: 0, x: 40, width: "29vw" }}
        animate={{ 
          opacity: isActive ? 1 : 0, 
          x: isActive ? 0 : 40,
          width: chapterKey === 3 ? "23vw" : "29vw"
        }}
        transition={isReturning
          ? { duration: 1.2, delay: 0, ease: [0.8, 0, 1, 0.2] }
          : { duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
      >
        {chapterKey === 1 && <ComparisonTable activeIndex={normalizedIndex} />}
        {chapterKey === 2 && <IntelligenceGrid activeIndex={normalizedIndex} />}
        {chapterKey === 3 && <YoursResembleBlock />}
        {chapterKey === 4 && <RegisterInterestForm />}
      </motion.div>

      {/* Mobile Drawer Trigger Button */}
      <div className={`absolute bottom-36 md:bottom-28 left-1/2 -translate-x-1/2 z-8 lg:hidden ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}>
        <motion.button
          onClick={() => setIsDetailsOpen(true)}
          disabled={!isActive}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/50 text-white/90 text-[10px] md:text-xs tracking-[0.15em] uppercase font-light backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-lg cursor-pointer ${imprima.className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={isReturning
            ? { duration: 0.8, delay: 0, ease: [0.8, 0, 1, 0.2] }
            : { duration: 0.8, delay: 1 }
          }
        >
          ✦ View Details
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
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
            className="fixed inset-0 z-50 backdrop-blur-md flex flex-col p-6 overflow-y-auto"
            style={{
              background: "linear-gradient(145deg, rgba(12,20,17,0.97) 0%, rgba(6,12,10,0.99) 100%)",
            }}
          >
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Container (Stacked) */}
            <div className="flex flex-col gap-6 pb-12">
              <div className="flex flex-col text-center">
                <span className="text-[#7beea9] uppercase tracking-[0.2em] text-[10px] font-light mb-2">
                  {sectionNum}
                </span>
                <h3 className={`text-2xl font-light text-white mb-3 ${viaodaLibre.className}`}>
                  {sectionTitle}
                </h3>
                <p className={`text-white/75 text-xs font-light leading-relaxed px-2 ${imprima.className}`}>
                  {sectionDesc}
                </p>

                {/* Narrative injection for all cards */}
                {activeComp && (
                  <div className="mt-5 p-4 bg-white/5 border border-dashed border-white/10 rounded-lg text-left">
                    <span className="text-[#ffa02e] font-medium text-xs tracking-widest uppercase block mb-1">
                      {activeComp.title}
                    </span>
                    <span className="text-white/55 text-[10px] block mb-2">{activeComp.subtext}</span>
                    <p className={`text-white/80 text-xs font-light leading-relaxed ${imprima.className}`}>
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
                {chapterKey === 1 && <ComparisonTable activeIndex={normalizedIndex} />}
                {chapterKey === 2 && <IntelligenceGrid activeIndex={normalizedIndex} />}
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
      <p className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[9px] text-white/20 font-light tracking-wider whitespace-nowrap ${imprima.className}`}>
        © 2026 ExQuisite Living.
      </p>
    </>
  );
}
