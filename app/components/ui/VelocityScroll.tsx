"use client";

import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function VelocityScroll({ text }: { text: string }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * 2 * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="py-8 overflow-hidden flex flex-nowrap whitespace-nowrap opacity-30 select-none pointer-events-none">
      <motion.div
        style={{ x }}
        className="flex flex-nowrap gap-10 text-8xl md:text-[10rem] font-bold tracking-tighter text-transparent uppercase font-outline-2"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-stroke">
            {text} —{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
