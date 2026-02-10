"use client";

import { Check } from "lucide-react";
import { pricing } from "@/app/data/content";
import { MaskText } from "../ui/MaskText";
import { TiltCard } from "../ui/TiltCard";

interface PricingProps {
  showAnimations: boolean;
  cursorEnter: () => void;
  cursorLeave: () => void;
  scrollTo: (id: string) => void;
  setFormMessage: (msg: string) => void;
  setIsQuoteOpen: (open: boolean) => void;
}

export function Pricing({ showAnimations, cursorEnter, cursorLeave, scrollTo, setFormMessage, setIsQuoteOpen }: PricingProps) {
  return (
    <section id="tarifs" className="py-20 px-6 bg-neutral-900/30 border-y border-white/5">
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
        <div className="text-center mb-20">
          <MaskText enabled={showAnimations}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Investissement.</h2>
          </MaskText>
          <p className="text-neutral-400 text-xl max-w-xl mx-auto">La qualité a un prix, mais elle rapporte toujours plus.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {pricing.map((plan, index) => (
            <TiltCard
              key={index}
              className={`relative p-8 rounded-3xl border flex flex-col ${plan.highlight ? "bg-white/5 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10" : "bg-neutral-900 border-white/5 hover:border-white/10"}`}
            >
              <div onMouseEnter={cursorEnter} onMouseLeave={cursorLeave} className="h-full flex flex-col">
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    Recommandé
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <div className="text-4xl font-bold mb-4 tracking-tight">{plan.price}</div>
                <p className="text-neutral-400 mb-8 text-sm h-10">{plan.description}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                      <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (plan.title === "Sur Mesure") {
                      setIsQuoteOpen(true);
                    } else {
                      setFormMessage(`Bonjour, je suis intéressé par le pack ${plan.title}. Pouvons-nous en discuter ?`);
                      scrollTo("contact");
                    }
                  }}
                  className={`w-full py-4 rounded-xl font-bold transition ${plan.highlight ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-white text-black hover:bg-gray-200"}`}
                >
                  {plan.title === "Sur Mesure" ? "Simuler un devis" : `Choisir ${plan.title}`}
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
