"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Grain } from "../ui/Grain";
import { Magnetic } from "../ui/Magnetic";

interface NavbarProps {
  showAnimations: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
  handleScroll: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => void;
  cursorEnter: () => void;
  cursorLeave: () => void;
}

const NAV_ITEMS = ["Services", "Demos", "Avis", "Tarifs"];

const NAV_LINKS = [
  ...NAV_ITEMS.map((item) => ({
    label: item,
    href: `#${getTargetId(item)}`,
    isAnchor: true,
  })),
];

function getTargetId(item: string) {
  return item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function Navbar({ showAnimations, menuOpen, setMenuOpen, scrollTo, handleScroll, cursorEnter, cursorLeave }: NavbarProps) {
  return (
    <>
      <motion.nav
        initial={showAnimations ? { y: -100 } : { y: 0 }}
        animate={{ y: 0 }}
        transition={{ delay: showAnimations ? 0.8 : 0, duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300"
      >
        <div className="w-full max-w-[95%] 2xl:max-w-[1920px] mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="text-2xl font-bold tracking-tighter cursor-pointer z-[60]"
            onClick={() => scrollTo("hero")}
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
            role="button"
            aria-label="Retour en haut de page"
          >
            VERSO<span className="text-indigo-500">.</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) =>
              item.isAnchor ? (
                <button
                  key={item.label}
                  onClick={() => scrollTo(getTargetId(item.label))}
                  onMouseEnter={cursorEnter}
                  onMouseLeave={cursorLeave}
                  className="text-sm font-medium hover:text-indigo-400 transition"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium hover:text-indigo-400 transition"
                  onMouseEnter={cursorEnter}
                  onMouseLeave={cursorLeave}
                >
                  {item.label}
                </Link>
              )
            )}
            <Magnetic>
              <button
                onClick={() => scrollTo("contact")}
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition"
              >
                Démarrer un projet
              </button>
            </Magnetic>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-[60] text-white p-2"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-[55] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <Grain />
            {NAV_LINKS.map((item) =>
              item.isAnchor ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, getTargetId(item.label))}
                  className="text-4xl font-black uppercase tracking-tighter text-neutral-400 hover:text-white transition-all duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-4xl font-black uppercase tracking-tighter text-neutral-400 hover:text-white transition-all duration-300"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="w-12 h-1 bg-indigo-500 rounded-full my-4" />
            <button onClick={() => scrollTo("contact")} className="text-xl font-bold bg-white text-black px-8 py-4 rounded-full">
              Démarrer un projet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
