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

interface Props {
  cloudX: MotionValue<number>;
  cloudY: MotionValue<number>;
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
  textX: MotionValue<number>;
}

// ── Chapter Subcomponents ──────────────────────────────────────────────────────

// Sensibility Comparison Table
function ComparisonTable({ activeIndex }: { activeIndex: number }) {
  const isExquisiteActive = activeIndex >= 0 && activeIndex <= 3;
  return (
    <div className="flex flex-col gap-3 font-light text-xs md:text-sm">
      <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 opacity-50">
        <span className="text-[#8fa397] uppercase tracking-[0.1em] text-[10px] md:text-xs">The concierge</span>
        <span className="text-white/80">Responds to requests</span>
      </div>
      <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 opacity-50">
        <span className="text-[#8fa397] uppercase tracking-[0.1em] text-[10px] md:text-xs">The advisor</span>
        <span className="text-white/80">Presents options</span>
      </div>
      <motion.div 
        animate={isExquisiteActive ? { scale: 1.02, borderColor: "rgba(193, 154, 107, 0.4)" } : { scale: 1 }}
        className={`flex items-center justify-between p-3 rounded bg-white/[0.08] border transition-colors ${
          isExquisiteActive ? "border-[#c19a6b]/40 ring-1 ring-[#c19a6b]/20" : "border-white/10 opacity-70"
        }`}
      >
        <span className="text-[#c19a6b] uppercase tracking-[0.15em] font-medium text-[10px] md:text-xs">ExQuisite</span>
        <span className="text-white font-normal">Composes what was never asked for</span>
      </motion.div>
      <img src="/icon_clover_sage.png" alt="" className="h-6 md:h-8 w-auto mx-auto mt-4 opacity-30" />
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
              className={`flex flex-col justify-center h-14 md:h-16 p-2 md:p-3 rounded border font-light transition-colors ${
                isActive 
                  ? "bg-white/[0.08] border-[#8fa397] text-white" 
                  : "bg-white/5 border-white/5 text-white/40"
              }`}
            >
              <span className={`text-[8px] md:text-[9px] uppercase tracking-[0.1em] ${isActive ? "text-[#c19a6b]" : "text-white/30"}`}>
                {p.num}
              </span>
              <span className="mt-0.5 leading-snug truncate">{p.name}</span>
            </motion.div>
          );
        })}
      </div>
      <p className="text-[9px] md:text-[10px] text-white/35 text-center font-light leading-relaxed">
        A small selection of the dimensions we hold. The rest, we keep between us.
      </p>
    </div>
  );
}

// Compositions Split Layout Image Block
function YoursResembleBlock() {
  return (
    <div className="flex flex-col p-3 md:p-4 bg-white/5 border border-white/5 rounded-xl">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3">
        <img
          src="/exp_table.png"
          alt="An intimate composition"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <span className="text-[#8fa397] uppercase tracking-[0.1em] text-[9px] md:text-[10px] mb-1 block">
        ✦ The last leaf of this chapter
      </span>
      <h4 className={`text-base md:text-lg font-light leading-snug mb-1.5 ${viaodaLibre.className}`}>
        Yours would resemble none of these.
      </h4>
      <p className="text-white/50 text-[11px] md:text-xs font-light leading-relaxed">
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
      <p className="text-sm md:text-base font-light leading-snug mb-2">
        If our worlds are meant to meet, let us know you exist.
      </p>
      <p className="text-white/40 text-[10px] md:text-[11px] font-light mb-4 md:mb-6">
        Registering interest places no obligation on either of us.
      </p>
      
      {submitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[#c19a6b] font-light text-xs md:text-sm tracking-[0.1em] py-3 border border-dashed border-[#c19a6b]/30 w-full rounded"
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
            className="w-full bg-transparent border-b border-white/20 py-2 text-xs md:text-sm text-center focus:outline-none focus:border-white transition-colors placeholder-white/30 font-light"
            required
          />
          <button
            type="submit"
            className="w-full py-2 border border-white/30 text-white/80 rounded transition-all duration-300 hover:bg-white hover:text-black hover:border-white font-light tracking-[0.1em] text-[10px] md:text-xs uppercase cursor-pointer"
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
    { title: "Held to a number", desc: "We keep our membership deliberately small, so that the intelligence remains personal — never industrial." },
    { title: "Composed, not catered", desc: "No menu, no tiers of perks. Each member receives a world built only for them." },
    { title: "Discreet by nature", desc: "We do not publish names, partners, or particulars. What we make is known only to the member." },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 text-[10px] md:text-[11px] font-light">
      {policies.map((p, idx) => (
        <div key={idx} className="p-2 md:p-3 bg-white/5 border border-white/5 rounded flex flex-col justify-between">
          <span className="text-[#c19a6b] font-medium uppercase tracking-[0.1em] mb-1">{p.title}</span>
          <span className="text-white/55 leading-snug">{p.desc}</span>
        </div>
      ))}
    </div>
  );
}

// Composition narrative dataset
const compositionData: Record<number, { title: string; sub: string; desc: string }> = {
  12: {
    title: "An undisclosed ridge",
    sub: "A solitude composed from a passing remark",
    desc: "A solitude composed from a passing remark — the where, the silence, a single unhurried dawn, arranged so quietly it felt like your own idea.",
  },
  13: {
    title: "An unhurried dawn",
    sub: "A morning owned by no calendar",
    desc: "A morning owned by no calendar, arranged quietly and kept completely free from the demands of the world.",
  },
  14: {
    title: "A closed hall",
    sub: "Dinner for one in a room made for hundreds",
    desc: "Not a reservation but a composition: a chef drawn out of retirement, a space emptied of everyone, a menu read from preferences you never named.",
  },
  15: {
    title: "Cuisine artistry",
    sub: "A chef drawn from retirement for preferences unnamed",
    desc: "A private dining experience where the menu, the speed, and the setting are tailored around culinary preferences you never had to formulate.",
  },
  16: {
    title: "Vanishing craft",
    sub: "An afternoon inside a workshop without a sign",
    desc: "Hours beside a master few are permitted to meet, making something by hand that cannot be bought — only learned, briefly, in confidence.",
  },
  17: {
    title: "Unnamed coast",
    sub: "A passage, slow, the world kept completely out",
    desc: "A route composed for the way you watch light leave water. No itinerary survived it — only the feeling of being somewhere arranged entirely around you.",
  },
};

// ── main Scene 2 component ──────────────────────────────────────────────────────

export default function Scene2({ cloudX, cloudY, floorX, floorY, textX }: Props) {
  const { activeCardIndex, setActiveCardIndex, scene } = useScene();
  const isActive = scene === "transitioning" || scene === "scene2";

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
    sectionDesc = "A concierge waits to be asked. We do not. ExQuisite Living is not a desk, a hotline, or a catalogue of favours — it is an intelligence devoted to a single question: what would move you, before you thought to ask for it.";
  } else if (normalizedIndex >= 4 && normalizedIndex <= 11) {
    chapterKey = 2;
    sectionNum = "II — The Intelligence";
    sectionTitle = "A quiet intelligence, composing in the background.";
    sectionDesc = "At our core is a Curation Engine built for one purpose: to know each member with a depth no service ever could. It listens across more than two hundred touch-base points — the small, telling dimensions of a life — and from them composes experiences that feel less arranged than inevitable.";
  } else if (normalizedIndex >= 12 && normalizedIndex <= 17) {
    chapterKey = 3;
    sectionNum = "III — Compositions";
    sectionTitle = "Loose leaves, lifted from the book.";
    sectionDesc = "Draw near and the pages part — a few composed worlds rise from the binding. We rarely speak of what we make; these only hint at it.";
  } else if (normalizedIndex >= 18 && normalizedIndex <= 19) {
    chapterKey = 4;
    sectionNum = "IV — Membership";
    sectionTitle = "You do not join us. We find you.";
    sectionDesc = "Membership is conferred — quietly, and only when our worlds align.";
  }

  const activeComp = compositionData[normalizedIndex];

  return (
    <>
      <Scene2CloudsLayer cloudX={cloudX} cloudY={cloudY} />
      <Scene2FloorLayer floorX={floorX} floorY={floorY} />
      <Scene2WheelLayer activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} />
      <Scene2LowerCloudsLayer floorX={floorX} floorY={floorY} activeCardIndex={activeCardIndex} />
      <Scene2HeroText textX={textX} activeCardIndex={activeCardIndex} />

      {/* Desktop Left Details Sidebar */}
      <motion.div
        className={`hidden lg:flex absolute left-[5vw] top-[26vh] w-[26vw] flex-col z-10 select-none max-h-[50vh] overflow-y-auto pr-2 pointer-events-auto bg-black/35 border border-white/5 backdrop-blur-md rounded-2xl p-6 ${imprima.className}`}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -40 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[#8fa397] uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-light mb-2 block">
          {sectionNum}
        </span>
        <h3 className={`text-xl md:text-2xl font-light leading-tight text-white mb-4 ${viaodaLibre.className}`}>
          {sectionTitle}
        </h3>
        <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
          {sectionDesc}
        </p>

        {/* Dynamic narrative for compositions on left */}
        {chapterKey === 3 && activeComp && (
          <motion.div
            key={normalizedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-5 border-t border-white/10"
          >
            <span className="text-[#c19a6b] font-medium text-xs tracking-[0.1em] uppercase block mb-0.5">
              {activeComp.title}
            </span>
            <span className="text-white/40 text-[10px] block mb-2">{activeComp.sub}</span>
            <p className="text-white/70 text-xs font-light leading-relaxed">
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
        className={`hidden lg:flex absolute right-[5vw] top-[26vh] w-[27vw] flex-col z-10 select-none max-h-[52vh] overflow-y-auto pl-2 pointer-events-auto bg-black/35 border border-white/5 backdrop-blur-md rounded-2xl p-6 ${imprima.className}`}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 40 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {chapterKey === 1 && <ComparisonTable activeIndex={normalizedIndex} />}
        {chapterKey === 2 && <IntelligenceGrid activeIndex={normalizedIndex} />}
        {chapterKey === 3 && <YoursResembleBlock />}
        {chapterKey === 4 && <RegisterInterestForm />}
      </motion.div>

      {/* Mobile Drawer Trigger Button */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[8] lg:hidden pointer-events-auto">
        <motion.button
          onClick={() => setIsDetailsOpen(true)}
          className={`px-5 py-2.5 rounded-full border border-white/20 bg-black/50 text-white/90 text-[10px] md:text-xs tracking-[0.15em] uppercase font-light backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-lg cursor-pointer ${imprima.className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          ✦ View Chapter Details
        </motion.button>
      </div>

      {/* Mobile Details Modal Overlay */}
      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0c1411]/95 backdrop-blur-md flex flex-col p-6 overflow-y-auto"
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
                <span className="text-[#8fa397] uppercase tracking-[0.2em] text-[10px] font-light mb-2">
                  {sectionNum}
                </span>
                <h3 className={`text-2xl font-light text-white mb-3 ${viaodaLibre.className}`}>
                  {sectionTitle}
                </h3>
                <p className={`text-white/60 text-xs font-light leading-relaxed px-2 ${imprima.className}`}>
                  {sectionDesc}
                </p>
                
                {/* Compositions narrative injection */}
                {chapterKey === 3 && activeComp && (
                  <div className="mt-5 p-4 bg-white/5 border border-dashed border-white/10 rounded-lg text-left">
                    <span className="text-[#c19a6b] font-medium text-xs tracking-[0.1em] uppercase block mb-1">
                      {activeComp.title}
                    </span>
                    <span className="text-white/40 text-[10px] block mb-2">{activeComp.sub}</span>
                    <p className={`text-white/70 text-xs font-light leading-relaxed ${imprima.className}`}>
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

      {/* Floating brand footer */}
      <motion.footer
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-center text-white/50 ${imprima.className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/wordmark_cream.png"
          alt="ExQuisite Living"
          className="h-4 md:h-5 w-auto opacity-80"
        />
        <div className="flex items-center gap-2.5 opacity-40">
          <img src="/icon_tree_cream.png" alt="" className="h-3.5 w-auto" />
          <img src="/icon_clover_cream.png" alt="" className="h-3.5 w-auto" />
          <img src="/icon_spiral_cream.png" alt="" className="h-3.5 w-auto" />
        </div>
        <p className="text-[10px] md:text-xs tracking-[0.05em] uppercase font-light text-white/40">
          Some lives are not arranged. They are composed.
        </p>
        <p className="text-[9px] text-white/30 font-light mt-0.5">
          © 2026 ExQuisite Living. Not a concierge service.
        </p>
      </motion.footer>
    </>
  );
}

