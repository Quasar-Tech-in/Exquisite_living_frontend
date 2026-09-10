"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";

const ASSETS_TO_LOAD = [
  "/left-full.webp",
  "/right-full.webp",
  "/bg1.webp",
  "/preenchimento-generativo.webp",
  "/clouds.webp",
  "/lower-clouds.webp",
];

export default function Preloader() {
  const { isLoaded, setIsLoaded } = useScene();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const total = ASSETS_TO_LOAD.length;

    if (total === 0) {
      setIsLoaded(true);
      setShowPreloader(false);
      return;
    }

    const onAssetFinished = () => {
      if (isCancelled) return;
      loadedCount++;
      if (loadedCount >= total) {
        setTimeout(() => {
          if (!isCancelled) {
            setIsLoaded(true);
            setTimeout(() => setShowPreloader(false), 800);
          }
        }, 300);
      }
    };

    ASSETS_TO_LOAD.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = onAssetFinished;
      img.onerror = () => {
        console.warn(`Failed to preload ${src}`);
        onAssetFinished();
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [setIsLoaded]);

  if (!showPreloader) return null;

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.img
            src="/iconlogo_cream.png"
            alt="Logo"
            className="h-16 w-auto opacity-80"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
