"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Key, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { realisations } from "@/app/data/content";

export function RealisationCard({ project, index }: { project: (typeof realisations)[number]; index: number }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState("");
  const [demoStatus, setDemoStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isReversed = index % 2 !== 0;
  const num = String(index + 1).padStart(2, "0");

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoStatus("loading");
    try {
      const response = await fetch("https://formspree.io/f/mkogqyla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: demoEmail,
          message: `Demande d'accès démo pour : ${project.title}`,
          _subject: `🔑 Demande d'accès démo - ${project.title}`,
        }),
      });
      if (response.ok) {
        setDemoStatus("success");
        setTimeout(() => { setDemoOpen(false); setDemoStatus("idle"); setDemoEmail(""); }, 3000);
      } else {
        setDemoStatus("error");
      }
    } catch {
      setDemoStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} min-h-[600px] md:min-h-[660px]`}
    >
      {/* IMAGE */}
      <div className="relative w-full md:w-[55%] aspect-video md:aspect-auto overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* CONTENT */}
      <div className="relative w-full md:w-[45%] flex flex-col justify-center px-8 py-16 md:px-16 md:py-24 bg-[#070707] overflow-hidden">
        {/* Ghost number */}
        <span className="absolute bottom-2 right-4 text-[9rem] md:text-[13rem] font-black text-white/[0.025] leading-none select-none pointer-events-none">
          {num}
        </span>

        <div className="relative z-10 space-y-7">
          <span className="block text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-400">
            {project.category}
          </span>

          <h3 className="text-4xl md:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.0] tracking-tight">
            {project.title}
          </h3>

          <p className="text-neutral-400 text-[15px] leading-relaxed max-w-sm">
            {project.description}
          </p>

          {project.tech && (
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-[11px] font-semibold rounded-full border border-white/10 text-neutral-500 tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {project.details && (
            <ul className="space-y-2">
              {project.details.slice(0, 2).map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-500 text-sm">
                  <span className="text-indigo-500 mt-0.5 shrink-0 text-xs">▸</span>
                  {detail}
                </li>
              ))}
            </ul>
          )}

          <div className="pt-1">
            {project.link ? (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group/btn"
              >
                <span className="text-white font-semibold text-[15px] group-hover/btn:text-indigo-400 transition-colors duration-300">
                  Voir le projet
                </span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-indigo-600 group-hover/btn:border-indigo-600 transition-all duration-300">
                  <ArrowUpRight size={18} className="text-white" />
                </span>
              </Link>
            ) : project.demoRequest ? (
              <div>
                <button
                  onClick={() => setDemoOpen(!demoOpen)}
                  className="inline-flex items-center gap-3 group/btn"
                >
                  <span className="text-white font-semibold text-[15px] group-hover/btn:text-indigo-400 transition-colors duration-300">
                    Accès sur demande
                  </span>
                  <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-indigo-600 group-hover/btn:border-indigo-600 transition-all duration-300">
                    <Key size={18} className="text-white" />
                  </span>
                </button>
                <AnimatePresence>
                  {demoOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-5"
                    >
                      <form onSubmit={handleDemoRequest} className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          required
                          value={demoEmail}
                          onChange={(e) => setDemoEmail(e.target.value)}
                          placeholder="Votre email"
                          className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={demoStatus === "loading" || demoStatus === "success"}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors disabled:opacity-50 flex items-center gap-2 justify-center"
                        >
                          {demoStatus === "loading" && <Loader2 className="animate-spin" size={16} />}
                          {demoStatus === "success" ? "Envoyé ✓" : demoStatus === "loading" ? "Envoi..." : "Envoyer"}
                        </button>
                      </form>
                      {demoStatus === "error" && (
                        <p className="text-red-400 text-xs mt-2">Une erreur est survenue. Réessayez.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
