"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Key, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { realisations } from "@/app/data/content";

export function RealisationCard({ project }: { project: (typeof realisations)[number] }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState("");
  const [demoStatus, setDemoStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
    <div className="group relative grid md:grid-cols-2 gap-8 items-start border border-white/10 bg-neutral-900/50 p-6 md:p-12 rounded-3xl hover:border-indigo-500/50 transition-colors">
      <div className="relative aspect-video rounded-xl overflow-hidden cursor-none">
        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="space-y-5">
        <div>
          <span className="text-indigo-500 text-sm font-bold uppercase tracking-widest">{project.category}</span>
          <h3 className="text-4xl md:text-5xl font-bold text-white mt-2">{project.title}</h3>
        </div>

        {project.tech && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full border border-indigo-500/40 text-indigo-400 bg-indigo-500/10">
                {t}
              </span>
            ))}
          </div>
        )}

        <p className="text-neutral-300 text-lg leading-relaxed">{project.description}</p>

        {project.details && (
          <div>
            <button onClick={() => setDetailsOpen(!detailsOpen)} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors">
              En savoir plus
              <ChevronDown size={16} className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {detailsOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3 space-y-2 pl-1"
                >
                  {project.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-300 text-sm">
                      <span className="text-indigo-500 mt-1">&#9654;</span>
                      {detail}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {project.link ? (
          <Link href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold hover:text-indigo-400 transition">
            Voir le site en ligne <ExternalLink size={18} />
          </Link>
        ) : project.demoRequest ? (
          <div>
            <button onClick={() => setDemoOpen(!demoOpen)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 text-indigo-400 font-semibold hover:bg-indigo-500/20 hover:text-indigo-300 transition-all text-sm cursor-pointer">
              <Key size={16} />
              Demander un accès démo
            </button>
            <AnimatePresence>
              {demoOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <form onSubmit={handleDemoRequest} className="mt-4 flex flex-col sm:flex-row gap-3">
                    <input type="email" required value={demoEmail} onChange={(e) => setDemoEmail(e.target.value)} placeholder="Votre email" className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors" />
                    <button type="submit" disabled={demoStatus === "loading" || demoStatus === "success"} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors disabled:opacity-50 flex items-center gap-2 justify-center cursor-pointer">
                      {demoStatus === "loading" && <Loader2 className="animate-spin" size={16} />}
                      {demoStatus === "success" ? "Demande envoyée ✓" : demoStatus === "loading" ? "Envoi..." : "Envoyer"}
                    </button>
                  </form>
                  {demoStatus === "success" && <p className="text-green-400 text-xs mt-2">Nous reviendrons vers vous avec les accès.</p>}
                  {demoStatus === "error" && <p className="text-red-400 text-xs mt-2">Une erreur est survenue, réessayez.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : null}
      </div>
    </div>
  );
}
