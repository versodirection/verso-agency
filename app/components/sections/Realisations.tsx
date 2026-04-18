"use client";

import { motion } from "framer-motion";
import { realisations } from "@/app/data/content";
import { MaskText } from "../ui/MaskText";
import { RealisationCard } from "./RealisationCard";

interface RealisationsProps {
  showAnimations: boolean;
}

export function Realisations({ showAnimations }: RealisationsProps) {
  return (
    <section id="realisations" className="pt-24 pb-0 bg-black relative z-10 border-b border-white/5">
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto px-6 pb-16">
        <div className="flex items-end justify-between">
          <div>
            <MaskText enabled={showAnimations}>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Réalisations.</h2>
            </MaskText>
            <p className="text-neutral-400 text-xl mt-4">Du concret. Des résultats.</p>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:block text-neutral-600 text-sm font-mono tracking-widest"
          >
            {realisations.length} projets livrés
          </motion.span>
        </div>
      </div>

      <div className="border-t border-white/5">
        {realisations.map((project, index) => (
          <div key={index} className="border-b border-white/5">
            <RealisationCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
