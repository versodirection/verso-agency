"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Grain } from "../ui/Grain";
import { siteConfig } from "@/app/data/content";

interface FooterProps {
  scrollTo: (id: string) => void;
}

export function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 relative overflow-hidden">
      <Grain />

      {/* Bottom bar */}
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            onClick={() => scrollTo("hero")}
            className="text-2xl font-bold tracking-tighter text-white cursor-pointer hover:opacity-70 transition"
            role="button"
            aria-label="VERSO. — Retour en haut de page"
          >
            VERSO<span className="text-indigo-500">.</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 text-sm hover:text-white transition-colors">
            <Mail size={14} />
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono uppercase tracking-widest">
            <Link href="/mentions-legales" className="hover:text-white transition">
              Mentions Légales
            </Link>
            <span>•</span>
            <p>©{new Date().getFullYear()} VERSO Agency.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
