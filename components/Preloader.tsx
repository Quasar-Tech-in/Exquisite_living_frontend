"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useScene } from "@/context/SceneContext";

const CRITICAL_ASSETS = [
  "/bg1.webp",
  "/left-full.webp",
  "/right-full.webp",
];

export default function Preloader() {
  const { isLoaded, setIsLoaded } = useScene();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const loadAsset = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

    // Load critical Scene 1 assets in parallel with a 3s max fallback timeout
    const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 3000));
    const loadPromise = Promise.all(CRITICAL_ASSETS.map(loadAsset));

    Promise.race([loadPromise, timeoutPromise]).then(() => {
      if (!isCancelled) {
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => setShowPreloader(false), 800);
        }, 200);
      }
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
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/iconlogo_cream.png"
              alt="Logo"
              width={120}
              height={120}
              priority
              className="h-16 w-auto opacity-80"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
