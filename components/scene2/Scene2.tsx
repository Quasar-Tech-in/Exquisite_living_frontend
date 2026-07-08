"use client";

import Scene2CloudsLayer from "./Scene2CloudsLayer";
import Scene2FloorLayer from "./Scene2FloorLayer";
import { type MotionValue } from "framer-motion";

interface Props {
  cloudX: MotionValue<number>;
  cloudY: MotionValue<number>;
  floorX: MotionValue<number>;
  floorY: MotionValue<number>;
}

/**
 * Always mounted — sits behind Scene 1 via z-index.
 * Becomes fully visible once Scene 1 exits.
 * Placeholder for future scrolling-cards content.
 */
export default function Scene2({ cloudX, cloudY, floorX, floorY }: Props) {
  return (
    <>
      <Scene2CloudsLayer cloudX={cloudX} cloudY={cloudY} />
      <Scene2FloorLayer floorX={floorX} floorY={floorY} />
    </>
  );
}
