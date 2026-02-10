"use client";

import { realisations } from "@/app/data/content";
import { MaskText } from "../ui/MaskText";
import { RealisationCard } from "./RealisationCard";

interface RealisationsProps {
  showAnimations: boolean;
}

export function Realisations({ showAnimations }: RealisationsProps) {
  return (
    <section className="py-20 px-6 bg-black relative z-10 border-b border-white/5">
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
        <div className="mb-20">
          <MaskText enabled={showAnimations}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Réalisations.</h2>
          </MaskText>
          <p className="text-neutral-400 text-xl max-w-xl">Du concret. Des résultats.</p>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {realisations.map((project, index) => (
            <RealisationCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
