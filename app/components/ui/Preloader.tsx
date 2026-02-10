"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 5) + 2, 100);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col pointer-events-none bg-black">
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
        className="w-full h-[50vh] bg-[#050505] relative border-b border-white/5"
      />
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
        className="w-full h-[50vh] bg-[#050505] relative border-t border-white/5"
      />
      <motion.div
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-6"
      >
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white text-sm md:text-base font-mono tracking-[0.5em] uppercase pl-2"
          >
            VERSO Agency
          </motion.p>
        </div>
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-indigo-500 shadow-[0_0_10px_#6366f1]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
}
