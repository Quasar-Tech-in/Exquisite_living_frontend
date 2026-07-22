import { useState } from "react";

export type Scene = "scene1" | "transitioning" | "scene2" | "returningToScene1";

export function useSceneState() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scene, setScene] = useState<Scene>("scene1");
  const [isHoveringEnter, setIsHoveringEnter] = useState(false);
  const [isDraggingWheel, setIsDraggingWheel] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const startTransition = () => setScene("transitioning");
  const completeTransition = () => setScene("scene2");
  const returnToScene1 = () => setScene("returningToScene1");
  const completeReturn = () => {
    setScene("scene1");
    setActiveCardIndex(0); // Reset index on return to home
  };

  return {
    isLoaded,
    setIsLoaded,
    scene,
    startTransition,
    completeTransition,
    returnToScene1,
    completeReturn,
    isHoveringEnter,
    setIsHoveringEnter,
    isDraggingWheel,
    setIsDraggingWheel,
    activeCardIndex,
    setActiveCardIndex,
  };
}


