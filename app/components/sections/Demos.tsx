"use client";

import Link from "next/link";
import Image from "next/image";
// Industry-specific demo templates
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
  // 3 démos originales uniquement
];
import { MaskText } from "../ui/MaskText";
import { TiltCard } from "../ui/TiltCard";

interface DemosProps {
  showAnimations: boolean;
  cursorEnter: () => void;
  cursorLeave: () => void;
}

export function Demos({ showAnimations, cursorEnter, cursorLeave }: DemosProps) {
  return (
    <section id="demos" className="py-20 px-6">
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
        <div className="mb-20">
          <MaskText enabled={showAnimations}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Showcase.</h2>
          </MaskText>
          <p className="text-neutral-400 text-xl max-w-xl">Des interfaces immersives qui marquent les esprits.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 2xl:gap-16">
          {demoTemplates.map((demo) => (
            <TiltCard
              key={demo.id}
              className="group relative aspect-[16/9] md:aspect-[16/7] rounded-2xl overflow-hidden border border-white/10 bg-transparent shadow-xl transition-transform duration-300"
            >
              <a
                href={demo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer"
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
                onClick={() => {
                  try { sessionStorage.setItem("verso-skip-preloader", "true"); } catch {}
                }}
              >
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                  <Image src={demo.image} alt={`Projet ${demo.title} - ${demo.category}`} fill className="object-cover transition duration-300 group-hover:brightness-75" sizes="(max-width: 768px) 100vw, 50vw" style={{background: "#18181b"}} />
                </div>
                {/* Gradient overlay for text readability */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-8 w-full z-20 pointer-events-none">
                  <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">{demo.category}</span>
                  <h3 className="text-2xl font-bold text-white group-hover:translate-x-2 transition-transform">{demo.title}</h3>
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
