"use client";

import { motion } from "framer-motion";

export function MaskText({ children, enabled = false }: { children: React.ReactNode; enabled?: boolean }) {
  if (!enabled) return <div className="overflow-hidden">{children}</div>;
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
