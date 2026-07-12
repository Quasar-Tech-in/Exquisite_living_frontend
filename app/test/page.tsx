"use client";
import { useState } from "react";
import CardsFerrisWheel from "@/components/CardsFerrisWheel";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-[#111]">
      <CardsFerrisWheel activeCardIndex={activeIndex} setActiveCardIndex={setActiveIndex} />
    </div>
  );
}

