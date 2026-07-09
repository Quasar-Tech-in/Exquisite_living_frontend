"use client";

import { useState } from "react";
import { SceneProvider, useScene } from "@/context/SceneContext";
import { useParallax } from "@/hooks/useParallax";
import Scene1 from "@/components/scene1/Scene1";
import Scene2 from "@/components/scene2/Scene2";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

// ── inner page (needs to be a child of SceneProvider to use useScene) ──────────
function InnerPage() {
  // Parallax activates once the bg1 entry animation completes (~2s)
  const [isParallaxActive, setIsParallaxActive] = useState(false);
  const { isDraggingWheel } = useScene();

  const {
    cloudX, cloudY,
    bgX, bgY,
    floorX, floorY,
    fgX, fgY,
    textX, carouselX,
  } = useParallax(isParallaxActive && !isDraggingWheel);

  return (
    <div className="absolute inset-0 h-full w-full cursor-none overflow-hidden bg-[#111]">
      {/* Scene 2 — always mounted behind Scene 1 (z:1–2) */}
      <Scene2 cloudX={cloudX} cloudY={cloudY} floorX={floorX} floorY={floorY} textX={textX} />

      {/* Scene 1 — unmounts after transition completes */}
      <Scene1
        bgX={bgX}
        bgY={bgY}
        fgX={fgX}
        fgY={fgY}
        textX={textX}
        carouselX={carouselX}
        onBgEntryComplete={() => setIsParallaxActive(true)}
      />

      {/* Navbar — scene-aware, exits with scene 1, unmounts on scene2 */}
      <Navbar />

      {/* Cursor — always above everything */}
      <CustomCursor />
    </div>
  );
}

// ── root — SceneProvider wraps everything so any descendant can call useScene() ──
export default function Home() {
  return (
    <SceneProvider>
      <InnerPage />
    </SceneProvider>
  );
}
