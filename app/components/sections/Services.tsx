"use client";

import { motion } from "framer-motion";
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
    <section id="services" className="py-24 px-6 bg-neutral-950 relative z-10">
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
        <div className="mb-20">
          <MaskText enabled={showAnimations}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Expertise Technique.</h2>
          </MaskText>
          <p className="text-neutral-400 text-xl max-w-xl">Du code sur-mesure pour des performances inégalées.</p>
        </div>

        <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            >
              <TiltCard className="group h-full p-10 rounded-3xl bg-neutral-900 border border-white/5 hover:border-indigo-500/30 transition-colors duration-300 cursor-none relative overflow-hidden">
                <div onMouseEnter={cursorEnter} onMouseLeave={cursorLeave} className="h-full flex flex-col">
                  {/* Number */}
                  <span className="absolute top-6 right-8 text-5xl font-black text-white/[0.04] select-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <service.icon className="w-11 h-11 text-indigo-500 mb-8 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{service.description}</p>

                  {/* Bottom accent line */}
                  <div className="mt-auto pt-8">
                    <div className="h-px w-0 bg-indigo-500 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
