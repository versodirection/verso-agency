"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/app/data/content";
import { MaskText } from "../ui/MaskText";
import { Magnetic } from "../ui/Magnetic";
import CanvasErrorBoundary from "../CanvasErrorBoundary";

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), { ssr: false });
const NexusCoreWrapper = dynamic(() => import("../NexusCore"), { ssr: false });

interface HeroProps {
  showAnimations: boolean;
  scrollTo: (id: string) => void;
  cursorEnter: () => void;
  cursorLeave: () => void;
}

export function Hero({ showAnimations, scrollTo, cursorEnter, cursorLeave }: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center min-h-screen">
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <CanvasErrorBoundary>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
            <Suspense fallback={null}>
              <NexusCoreWrapper />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      <motion.div
        initial={showAnimations ? "hidden" : "visible"}
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { delay: showAnimations ? 0.5 : 0, duration: 1 } },
        }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          Disponible pour nouveaux projets
        </div>

        <MaskText enabled={showAnimations}>
          <h1
            className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8 text-white relative z-20"
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            Le web sur mesure, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              tout simplement.
            </span>
          </h1>
        </MaskText>

        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed mix-blend-screen">
          {siteConfig.description} nous créons des outils digitaux simples et efficaces pour faire grandir votre activité sur internet.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Magnetic>
            <button
              onClick={() => scrollTo("contact")}
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
              className="group bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition flex items-center gap-2 shadow-[0_0_40px_rgba(79,70,229,0.4)]"
            >
              Réserver un appel
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => scrollTo("tarifs")}
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
              className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/10 hover:bg-white/5 transition backdrop-blur-md"
            >
              Nos offres
            </button>
          </Magnetic>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("realisations")}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: showAnimations ? 2 : 1, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll — Défiler vers le bas"
        onMouseEnter={cursorEnter}
        onMouseLeave={cursorLeave}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 group-hover:text-neutral-300 transition-colors">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-indigo-400"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.button>
    </section>
  );
}
