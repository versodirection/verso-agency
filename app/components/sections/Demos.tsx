"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskText } from "../ui/MaskText";
import { TiltCard } from "../ui/TiltCard";

const demoTemplates = [
  {
    id: 1,
    title: "Fashion Store",
    category: "Mode",
    image: "/demos/demo-fashion.png",
    link: "/demo/fashion",
  },
  {
    id: 2,
    title: "Agence Immobilière",
    category: "Immobilier",
    image: "/demos/demo-immo.png",
    link: "/demo/immo",
  },
  {
    id: 3,
    title: "Restaurant Chic",
    category: "Restauration",
    image: "/demos/demo-restaurant.png",
    link: "/demo/restaurant",
  },
];

interface DemosProps {
  showAnimations: boolean;
  cursorEnter: () => void;
  cursorLeave: () => void;
}

export function Demos({ showAnimations, cursorEnter, cursorLeave }: DemosProps) {
  return (
    <section id="demos" className="py-24 px-6 overflow-hidden">
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
        <div className="mb-20">
          <MaskText enabled={showAnimations}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Showcase.</h2>
          </MaskText>
          <p className="text-neutral-400 text-xl max-w-xl">Des interfaces immersives qui marquent les esprits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-10">
          {demoTemplates.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
            >
              <TiltCard className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <a
                  href={demo.link}
                  className="block w-full h-full"
                  onMouseEnter={cursorEnter}
                  onMouseLeave={cursorLeave}
                  onClick={() => {
                    try { sessionStorage.setItem("verso-skip-preloader", "true"); } catch {}
                  }}
                >
                  {/* Image */}
                  <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-[1.06]">
                    <Image
                      src={demo.image}
                      alt={`Projet ${demo.title} - ${demo.category}`}
                      fill
                      className="object-cover transition-all duration-500 group-hover:brightness-50"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ background: "#18181b" }}
                    />
                  </div>

                  {/* Gradient base */}
                  <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                  {/* Default label */}
                  <div className="absolute bottom-0 left-0 p-7 w-full z-20 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2">
                    <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                      {demo.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{demo.title}</h3>
                  </div>

                  {/* Hover overlay — centré */}
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-300">
                      {demo.category}
                    </span>
                    <h3 className="text-3xl font-black text-white">{demo.title}</h3>
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mt-1">
                      <span className="text-white text-sm font-semibold">Voir la démo</span>
                      <ArrowUpRight size={16} className="text-white" />
                    </div>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
