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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const loadNext = (index: number) => {
      if (index >= ASSETS_TO_LOAD.length) {
        if (!isCancelled) {
          // Add a small delay for aesthetic purposes before unmounting
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => setShowPreloader(false), 800);
          }, 500);
        }
        return;
      }

      setCurrentIndex(index);

      const img = new window.Image();
      img.src = ASSETS_TO_LOAD[index];

      img.onload = () => {
        if (!isCancelled) {
          loadNext(index + 1);
        }
      };
      img.onerror = () => {
        // If an image fails to load, just continue so we don't get stuck forever
        if (!isCancelled) {
          console.warn(`Failed to preload ${ASSETS_TO_LOAD[index]}`);
          loadNext(index + 1);
        }
      };
    };

    loadNext(0);

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
