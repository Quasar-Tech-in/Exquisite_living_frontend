"use client";

import { useState, useEffect } from "react";

export function useViewportScale() {
  const [scale, setScale] = useState(1);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newScale = 1;
      
      // Fluid scale based on width to avoid collapsing on mobile aspect ratios
      if (width < 640) {
        // Mobile: 0.90 to 1.05 (large cards on mobile)
        newScale = 0.90 + (Math.max(0, width - 320) / 320) * 0.15;
      } else if (width < 1024) {
        // Tablet: 1.05 to 1.15
        newScale = 1.05 + ((width - 640) / 384) * 0.10;
      } else {
        // Desktop: 1.15 to 1.2
        newScale = 1.15 + ((width - 1024) / 896) * 0.05;
      }

      newScale = Math.max(0.90, Math.min(newScale, 1.2));

      setScale(newScale);
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { scale, ...viewport };
}
