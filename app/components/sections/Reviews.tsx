"use client";

import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { reviews } from "@/app/data/content";
import { ReviewCard } from "./ReviewCard";
import { useState } from "react";

interface ReviewsProps {
  cursorEnter: () => void;
  cursorLeave: () => void;
}

export function Reviews({ cursorEnter, cursorLeave }: ReviewsProps) {
  const [expanded, setExpanded] = useState(() => reviews.map(() => false));
  return (
    <section id="avis" className="py-20 px-6 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Ils nous font confiance</h2>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.div key={s} initial={{ opacity: 0.3 }} whileInView={{ opacity: 1 }} transition={{ delay: s * 0.1 }}>
                <Star size={24} className="text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                review={review}
                index={index}
                isExpanded={expanded[index]}
                onToggle={() => setExpanded(expanded => {
                  const arr = [...expanded];
                  arr[index] = !arr[index];
                  return arr;
                })}
              />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <a
            href="https://g.page/r/CQfzKGv0KZsLEBM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition"
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            <MapPin size={20} />
            <span>Lire les autres avis sur Google</span>
          </a>
          <a
            href="https://g.page/r/CQfzKGv0KZsLEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            <Star size={20} className="fill-yellow-500" />
            <span>RÉDIGER UN AVIS</span>
          </a>
        </div>
      </div>
    </section>
  );
}
