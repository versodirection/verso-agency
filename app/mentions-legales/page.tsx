"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function MentionsLegales() {
  // Custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const cursorEnter = () => setCursorVariant("hover");
  const cursorLeave = () => setCursorVariant("default");

  const cursorVariants = {
    default: { 
      width: 20, 
      height: 20, 
      backgroundColor: "#fff", 
      mixBlendMode: "difference" as const 
    },
    hover: { 
      width: 80, 
      height: 80, 
      backgroundColor: "#fff", 
      mixBlendMode: "difference" as const 
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      
      <main className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-indigo-500 selection:text-white pt-24 pb-20 px-6 cursor-none">
        
        {/* LE CURSEUR */}
        <motion.div
          variants={cursorVariants}
          animate={cursorVariant}
          className="hidden md:flex fixed top-0 left-0 rounded-full pointer-events-none z-[9999] items-center justify-center"
          style={{ 
            translateX: "-50%", 
            translateY: "-50%", 
            x: cursorX,
            y: cursorY,
          }}
        >
          {cursorVariant === 'hover' && <div className="w-2 h-2 bg-white rounded-full" />}
        </motion.div>

        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-20 flex items-center px-6">
          <Link 
              href="/" 
              className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition"
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
          >
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>
        </nav>

        <div className="max-w-3xl mx-auto space-y-12">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Mentions Légales</h1>

          {/* SECTION 1 : ÉDITEUR */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-4">1. Éditeur du site</h2>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5 space-y-4 text-neutral-400">
              
              <div>
                  <p><strong className="text-white">Exploitation commerciale :</strong> VERSO AGENCY</p>
                  <p className="text-sm italic mt-1">Le site est édité par un collectif de micro-entrepreneurs indépendants exerçant en co-traitance.</p>
              </div>

              <hr className="border-white/10" />

              <div>
                  <p><strong className="text-white">Membre 1 (Responsable Publication) :</strong> M. Joan Diaz</p>
                  <p>Adresse : 8 cours du barry, 31140, Pechbonnieu</p>
                  <p>SIRET : 99985652900014</p>
              </div>
              
              <div>
                  <p><strong className="text-white">Membre 2 :</strong> M. Victor Da Costa Lima</p>
                  <p>Adresse : 8 rue du 19 mars 1962, 31790, Saint-Jory</p>
                  <p>SIRET : 98865449700029</p>
              </div>

              <div>
                  <p><strong className="text-white">Membre 3 :</strong> M. Soren Brancourt</p>
                  <p>Adresse : 4 Rue Jacques Labatut 16, 31000, Toulouse</p>
                  <p>SIRET : 100216969</p>
              </div>

              <hr className="border-white/10" />

              <div>
                  <p><strong className="text-white">Contact Commun :</strong></p>
                  <p>Email : contact@verso-agency.fr</p>
                  <p>Téléphone : +33 7 68 29 66 12</p>
              </div>

            </div>
          </section>

          {/* SECTION 2 : HÉBERGEMENT */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-4">2. Hébergement</h2>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5 text-neutral-400">
              <p>Le site est hébergé par :</p>
              <p className="mt-2"><strong className="text-white">Vercel Inc.</strong></p>
              <p>440 N Barranca Ave #4133</p>
              <p>Covina, CA 91723</p>
              <p>États-Unis</p>
            </div>
          </section>

          {/* SECTION 3 : PROPRIÉTÉ INTELLECTUELLE */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-4">3. Propriété Intellectuelle</h2>
            <p className="text-neutral-400 leading-relaxed">
              L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          {/* SECTION 4 : DONNÉES & COOKIES */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-4">4. Données et Cookies</h2>
            <p className="text-neutral-400 leading-relaxed">
              <strong>Cookies :</strong> Ce site vitrine n'utilise aucun cookie de traçage publicitaire ou d'analyse. Vous pouvez naviguer en toute tranquillité sans être pisté.
            </p>
            <p className="text-neutral-400 leading-relaxed mt-4">
              <strong>Formulaire :</strong> Les informations envoyées via le formulaire de contact (Nom, Email) ne sont utilisées que pour répondre à votre demande commerciale. Elles ne sont jamais revendues à des tiers.
            </p>
          </section>

        </div>
      </main>
    </ReactLenis>
  );
}