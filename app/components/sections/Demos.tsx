"use client";

import Link from "next/link";
import Image from "next/image";
import { demos } from "@/app/data/content";
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
        <div className="grid md:grid-cols-3 gap-8 2xl:gap-16">
          {demos.map((demo, index) => (
            <TiltCard key={index} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <Link
                href={demo.link}
                className="block w-full h-full cursor-none"
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
                onClick={() => {
                  try { sessionStorage.setItem("verso-skip-preloader", "true"); } catch {}
                }}
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <Image src={demo.image} alt={`Projet ${demo.title} - ${demo.category}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">{demo.category}</span>
                  <h3 className="text-2xl font-bold text-white group-hover:translate-x-2 transition-transform">{demo.title}</h3>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
