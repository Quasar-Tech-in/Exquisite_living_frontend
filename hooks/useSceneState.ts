import { useState } from "react";

export type Scene = "scene1" | "transitioning" | "scene2" | "returningToScene1";

export function useSceneState() {
  const [scene, setScene] = useState<Scene>("scene1");
  const [isHoveringEnter, setIsHoveringEnter] = useState(false);
  const [isDraggingWheel, setIsDraggingWheel] = useState(false);

  const startTransition = () => setScene("transitioning");
  const completeTransition = () => setScene("scene2");
  const returnToScene1 = () => setScene("returningToScene1");
  const completeReturn = () => setScene("scene1");

  return { scene, startTransition, completeTransition, returnToScene1, completeReturn, isHoveringEnter, setIsHoveringEnter, isDraggingWheel, setIsDraggingWheel };
}

