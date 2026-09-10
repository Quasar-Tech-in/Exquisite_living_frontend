"use client";

import { useScene } from "@/context/SceneContext";
import Scene1BgLayer from "./Scene1BgLayer";
import Scene1Bushes from "./Scene1Bushes";
import HeroTitleAndSubText from "@/components/HeroTitleAndSubText";
import HomeImageCarousel from "@/components/HomeImageCarousel";
import EnterExperienceButton from "@/components/EnterExperienceButton";
import { type MotionValue } from "framer-motion";

interface Props {
  bgX: MotionValue<number>;
  bgY: MotionValue<number>;
  fgX: MotionValue<number>;
  fgY: MotionValue<number>;
  textX: MotionValue<number>;
  carouselX: MotionValue<number>;
  onBgEntryComplete: () => void;
}

/**
 * Composes all Scene 1 elements.
 * Returns null once the transition to Scene 2 is fully complete.
 * Remounts during the reverse transition (returningToScene1).
 */
export default function Scene1({
  bgX,
  bgY,
  fgX,
  fgY,
  textX,
  carouselX,
  onBgEntryComplete,
}: Props) {
  const { scene, startTransition } = useScene();

  // Unmount cleanly after forward transition; Scene 2 is already fully visible by this point
  if (scene === "scene2") return null;

  const isExiting = scene === "transitioning";
  const isReturning = scene === "returningToScene1";

  return (
    <>
      <Scene1BgLayer bgX={bgX} bgY={bgY} onEntryComplete={onBgEntryComplete} isReturning={isReturning} />
      {/* Top gradient veil — darkens the sky behind the Navbar so the cream logo is legible on load */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[22dvh]"
        style={{
          zIndex: 7,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, transparent 100%)",
        }}
      />
      <Scene1Bushes fgX={fgX} fgY={fgY} isReturning={isReturning} />
      <HeroTitleAndSubText textX={textX} isExiting={isExiting} isReturning={isReturning} />
      <HomeImageCarousel carouselX={carouselX} isExiting={isExiting} isReturning={isReturning} />
      <EnterExperienceButton
        style={{ zIndex: 50 }}
        className="absolute top-[80dvh] short:top-[68dvh] left-[50vw] translate-x-[-50%]"
        onClick={startTransition}
        isExiting={isExiting}
        isReturning={isReturning}
      />
    </>
  );
}

