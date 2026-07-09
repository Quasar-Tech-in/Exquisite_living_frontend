"use client";
import { useState } from "react";

import Scene2CloudsLayer from "./Scene2CloudsLayer";
import Scene2FloorLayer from "./Scene2FloorLayer";
import Scene2WheelLayer from "./Scene2WheelLayer";
import Scene2LowerCloudsLayer from "./Scene2LowerCloudsLayer";
import Scene2HeroText from "./Scene2HeroText";
import { type MotionValue } from "framer-motion";

interface Props {
  cloudX: MotionValue<number>;
  cloudY: MotionValue<number>;
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
  textX: MotionValue<number>;
}

/**
 * Always mounted — sits behind Scene 1 via z-index.
 * Becomes fully visible once Scene 1 exits.
 * Placeholder for future scrolling-cards content.
 */
export default function Scene2({ cloudX, cloudY, floorX, floorY, textX }: Props) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <>
      <Scene2CloudsLayer cloudX={cloudX} cloudY={cloudY} />
      <Scene2FloorLayer floorX={floorX} floorY={floorY} />
      <Scene2WheelLayer activeCardIndex={activeCardIndex} setActiveCardIndex={setActiveCardIndex} />
      <Scene2LowerCloudsLayer floorX={floorX} floorY={floorY} activeCardIndex={activeCardIndex} />
      <Scene2HeroText textX={textX} />
    </>
  );
}
