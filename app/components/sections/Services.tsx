"use client";

import { services } from "@/app/data/content";
import { MaskText } from "../ui/MaskText";
import { TiltCard } from "../ui/TiltCard";

interface ServicesProps {
  showAnimations: boolean;
  cursorEnter: () => void;
  cursorLeave: () => void;
}

export function Services({ showAnimations, cursorEnter, cursorLeave }: ServicesProps) {
  return (
    <section id="services" className="py-20 px-6 bg-neutral-950 relative z-10">
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
        <div className="mb-20">
          <MaskText enabled={showAnimations}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Expertise Technique.</h2>
          </MaskText>
          <p className="text-neutral-400 text-xl max-w-xl">Du code sur-mesure pour des performances inégalées.</p>
        </div>
        <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <TiltCard key={index} className="group p-10 rounded-3xl bg-neutral-900 border border-white/5 hover:border-indigo-500/30 transition-colors cursor-none">
              <div onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
                <service.icon className="w-12 h-12 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{service.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
