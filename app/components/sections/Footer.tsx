"use client";

import Link from "next/link";
import { Grain } from "../ui/Grain";

interface FooterProps {
  scrollTo: (id: string) => void;
}

export function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="bg-neutral-950 py-10 border-t border-white/5 relative overflow-hidden">
      <Grain />
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
          <div className="md:text-left">
            <div
              onClick={() => scrollTo("hero")}
              className="text-2xl font-bold tracking-tighter text-white cursor-pointer hover:opacity-80 transition inline-block"
              role="button"
              aria-label="Retour en haut de page"
            >
              VERSO<span className="text-indigo-500">.</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-neutral-600 font-mono uppercase tracking-widest order-3 md:order-2">
            <Link href="/mentions-legales" className="hover:text-white transition">
              Mentions Légales
            </Link>
            <span className="hidden md:block">•</span>
            <p>©{new Date().getFullYear()} VERSO Agency.</p>
          </div>

          <div className="hidden md:block order-2 md:order-3" />
        </div>
      </div>
    </footer>
  );
}
