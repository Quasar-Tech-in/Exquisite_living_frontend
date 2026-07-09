"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSceneState, type Scene } from "@/hooks/useSceneState";

// ── types ──────────────────────────────────────────────────────────────────────
interface SceneContextValue {
  scene: Scene;
  startTransition: () => void;
  completeTransition: () => void;
  isHoveringEnter: boolean;
  setIsHoveringEnter: (val: boolean) => void;
  isDraggingWheel: boolean;
  setIsDraggingWheel: (val: boolean) => void;
}

// ── context ────────────────────────────────────────────────────────────────────
const SceneContext = createContext<SceneContextValue | null>(null);

// ── provider ───────────────────────────────────────────────────────────────────
export function SceneProvider({ children }: { children: ReactNode }) {
  const value = useSceneState();
  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
}

// ── consumer hook ──────────────────────────────────────────────────────────────
export function useScene(): SceneContextValue {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene must be used inside <SceneProvider>");
  return ctx;
}
