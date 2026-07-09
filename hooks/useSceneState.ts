import { useState } from "react";

export type Scene = "scene1" | "transitioning" | "scene2";

export function useSceneState() {
  const [scene, setScene] = useState<Scene>("scene1");
  const [isHoveringEnter, setIsHoveringEnter] = useState(false);
  const [isDraggingWheel, setIsDraggingWheel] = useState(false);

  const startTransition = () => setScene("transitioning");
  const completeTransition = () => setScene("scene2");

  return { scene, startTransition, completeTransition, isHoveringEnter, setIsHoveringEnter, isDraggingWheel, setIsDraggingWheel };
}
