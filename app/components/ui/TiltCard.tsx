"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export function TiltCard({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - (rect.left / rect.width + 0.5));
    y.set(e.clientY / rect.height - (rect.top / rect.height + 0.5));
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className={`transform-gpu perspective-1000 transition-transform ease-out duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
