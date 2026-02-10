"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import { reviews } from "@/app/data/content";
import { TiltCard } from "../ui/TiltCard";

const getRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Il y a 1 jour";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "Il y a 1 semaine";
  if (diffWeeks < 4) return `Il y a ${diffWeeks} semaines`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "Il y a 1 mois";
  return `Il y a ${diffMonths} mois`;
};

export function ReviewCard({ review, index }: { review: (typeof reviews)[number]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowMore = review.text.length > 200;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} className="group h-full">
      <TiltCard className="p-8 rounded-2xl bg-gradient-to-br from-neutral-800/40 to-neutral-900/60 border border-white/10 hover:border-indigo-500/50 relative overflow-hidden backdrop-blur-sm transition-all duration-300 flex flex-col h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-300" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex gap-1 mb-4">
            {[...Array(review.stars)].map((_, i) => (
              <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>

          <div className="flex-1">
            <p className={`text-neutral-200 text-base mb-6 leading-relaxed transition-all duration-300 ${!isExpanded ? "line-clamp-4" : ""}`}>
              {review.text}
            </p>
          </div>

          {shouldShowMore && (
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold mb-6 transition-colors">
              {isExpanded ? "Afficher moins" : "Afficher plus"}
            </button>
          )}

          <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
            <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg flex-shrink-0">
              {review.author.charAt(0)}
            </motion.div>
            <div className="flex-1">
              <p className="font-semibold text-white">{review.author}</p>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">{review.role}</p>
              <p className="text-xs text-neutral-500 mt-1">{getRelativeDate(review.reviewDate)}</p>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
