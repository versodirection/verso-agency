"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, X, Menu, Heart, Download,
  Shield, Briefcase, Gem, Feather, Check, Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

/* ─── Data ─── */

const projects = [
  { id: 1, title: "SKY MANSION", location: "Dubai, UAE", category: "Urban", year: "2024", price: "18,000,000 $", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2500&auto=format&fit=crop", desc: "L'ultime frontière du luxe sur Palm Jumeirah. Plage privée et héliport.", weather: { temp: "38°C", condition: "Soleil", time: "08:41 PM" } },
  { id: 2, title: "LUXUARY DESERT VILLA", location: "Montecito, CA", category: "Desert", year: "2025", price: "12,500,000 $", image: "/houses/villa1.jpg", desc: "Une prouesse d'invisibilité. Conçue pour se fondre dans le paysage désertique.", weather: { temp: "24°C", condition: "Soleil", time: "09:41 AM" } },
  { id: 3, title: "DUNE HOUSE", location: "Cap Ferret, FR", category: "Sea", year: "2023", price: "3,100,000 €", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2500&auto=format&fit=crop", desc: "Invisible depuis la plage, cette structure en bois brûlé (Shou Sugi Ban) se fond dans la topographie dunaire.", weather: { temp: "19°C", condition: "Vent", time: "06:41 PM" } },
  { id: 4, title: "ALPINE LOFT", location: "Zermatt, CH", category: "Sea", year: "2024", price: "5,200,000 CHF", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2500&auto=format&fit=crop", desc: "Le luxe au sommet. Des volumes vertigineux de 6 mètres sous plafond face au Cervin.", weather: { temp: "-4°C", condition: "Neige", time: "06:41 PM" } },
  { id: 5, title: "PENTHOUSE 56", location: "New York, USA", category: "Urban", year: "2023", price: "8,900,000 $", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2500&auto=format&fit=crop", desc: "Une oasis de calme au-dessus de la ville qui ne dort jamais. Marbre Calacatta et domotique invisible.", weather: { temp: "12°C", condition: "Nuageux", time: "12:41 PM" } },
  { id: 6, title: "SPA & POOL VILLA", location: "Mykonos, Greece", category: "Sea", year: "2024", price: "4,200,000 €", image: "/houses/villapiscine.jpg", desc: "Sculptée dans la roche. Une piscine intérieure magnifique.", weather: { temp: "28°C", condition: "Soleil", time: "07:41 PM" } },
  { id: 7, title: "DESERT LOTUS", location: "Amangiri, Utah", category: "Desert", year: "2025", price: "6,800,000 $", image: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2500&auto=format&fit=crop", desc: "Brutalisme minéral au cœur des canyons. Une architecture qui défie les éléments.", weather: { temp: "32°C", condition: "Soleil", time: "10:41 AM" } },
];

const architects = [
  { name: "Kengo Kuma", style: "Organic Minimalism", image: "https://images.pexels.com/photos/417273/pexels-photo-417273.jpeg" },
  { name: "Tadao Ando", style: "Concrete & Light", image: "https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg" },
  { name: "Zaha Hadid Architects", style: "Parametric Fluidity", image: "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=800&auto=format&fit=crop" },
  { name: "Bjarke Ingels (BIG)", style: "Hedonistic Sustainability", image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=800&auto=format&fit=crop" },
];

const services = [
  { title: "Off-Market Access", icon: <Shield />, desc: "Accès exclusif aux biens confidentiels non listés publiquement." },
  { title: "Asset Management", icon: <Briefcase />, desc: "Gestion patrimoniale et optimisation fiscale internationale." },
  { title: "Interior Curation", icon: <Gem />, desc: "Collaboration avec les plus grands décorateurs et galeristes." },
  { title: "Private Aviation", icon: <Feather />, desc: "Partenariat exclusif avec NetJets pour vos déplacements." },
];

const journal = [
  { title: "L'Art de Vivre en 2025", category: "Trends", date: "Oct 12" },
  { title: "Investir à Tokyo : Le Guide", category: "Market", date: "Sep 28" },
  { title: "Rencontre avec Peter Zumthor", category: "Interview", date: "Sep 15" },
];

const filters = ["All", "Sea", "Mountain", "Urban", "Desert"];

type ViewType = "collection" | "architects" | "services" | "journal" | "contact" | "detail";

/* ─── Scroll-reveal wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */

export default function RealEstateDemo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [activeProject, setActiveProject] = useState(projects[0]);
  const [showIntro, setShowIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>("collection");
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "loading" | "success">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProjects = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const handleMenuNavigation = useCallback((view: ViewType) => {
    setIsMenuOpen(false);
    setTimeout(() => setActiveView(view), 400);
  }, []);

  const closeOverlay = useCallback(() => setActiveView("collection"), []);

  const handleContactSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    const form = e.currentTarget;
    try {
      await fetch("https://formspree.io/f/mkogqyla", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
    } catch { /* best-effort */ }
    setFormStatus("success");
  }, []);

  const handleDownloadPDF = useCallback(() => {
    setDownloadStatus("loading");
    setTimeout(() => {
      setDownloadStatus("success");
      showToast("Dossier téléchargé");
      setTimeout(() => setDownloadStatus("idle"), 2500);
    }, 1500);
  }, [showToast]);

  const toggleFavorite = useCallback((e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
    showToast(favorites.includes(id) ? "Retiré des favoris" : "Ajouté aux favoris");
  }, [favorites, showToast]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-0 right-0 mx-auto w-fit z-[400] bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-4 bg-white/10 rounded-full hover:bg-white hover:text-black transition">
              <X size={24} />
            </button>
            <div className="text-center space-y-4">
              {(["collection", "architects", "services", "journal", "contact"] as ViewType[]).map((view, i) => {
                const labels: Record<string, string> = { collection: "Collection", architects: "Architectes", services: "Services Privés", journal: "Journal", contact: "Contact" };
                return (
                  <motion.button
                    key={view}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleMenuNavigation(view)}
                    className="block w-full text-5xl md:text-7xl font-bold tracking-tighter hover:text-[#d4af37] transition duration-300"
                  >
                    {labels[view]}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Intro splash ─── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[300] bg-[#050505] flex flex-col justify-between p-8 md:p-20"
          >
            <a
              href="/#demos"
              className="absolute top-8 left-8 flex items-center gap-2 text-white/40 hover:text-white transition group"
              onClick={() => { try { sessionStorage.setItem("verso-skip-preloader", "true"); } catch {} }}
            >
              <div className="p-2 border border-white/20 rounded-full group-hover:border-white"><ArrowLeft size={16} /></div>
              <span className="text-xs font-bold uppercase tracking-widest">VERSO<span className="text-indigo-500">.</span></span>
            </a>
            <div className="flex flex-col items-center justify-center text-center h-full">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/40 text-xs font-bold uppercase tracking-[0.4em] mb-6"
              >
                {projects.length} exclusive properties
              </motion.p>
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="text-[12vw] font-black tracking-tighter text-white"
              >
                ARKITEK
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] w-32 bg-[#d4af37] mt-6 origin-center"
              />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={() => setShowIntro(false)}
                className="mt-10 text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:opacity-50 transition cursor-pointer"
              >
                Entrer
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Background image ─── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover" priority sizes="100vw" />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Header ─── */}
      <header className="absolute top-0 left-0 w-full z-40 p-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-6">
          <a
            href="/#demos"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition backdrop-blur-md"
            onClick={() => { try { sessionStorage.setItem("verso-skip-preloader", "true"); } catch {} }}
          >
            <ArrowLeft size={16} />
          </a>
          {activeView === "collection" && (
            <div className="hidden md:flex gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                    activeFilter === f
                      ? "bg-white text-black border-white"
                      : "bg-black/20 text-white border-white/20 hover:border-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pointer-events-auto">
          <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Menu</span>
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* ─── Collection view ─── */}
      {activeView === "collection" && (
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-24 pointer-events-none">
          <div className="h-[60vh] overflow-y-auto no-scrollbar mask-gradient pr-10 pointer-events-auto">
            <div className="flex flex-col items-start gap-2 py-10">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setActiveProject(project)}
                  onClick={() => { setActiveProject(project); setActiveView("detail"); }}
                  className="group relative cursor-pointer w-full flex items-center justify-between"
                >
                  <h2
                    className={`text-5xl md:text-8xl font-bold tracking-tighter transition-all duration-700 ${
                      activeProject.id === project.id
                        ? "text-white translate-x-4 opacity-100"
                        : "text-transparent stroke-text opacity-30 hover:opacity-60"
                    }`}
                    style={{ WebkitTextStroke: activeProject.id !== project.id ? "1px rgba(255,255,255,0.5)" : "none" }}
                  >
                    {project.title}
                  </h2>
                  <button
                    onClick={(e) => toggleFavorite(e, project.id)}
                    className={`p-3 rounded-full border border-white/20 transition-all ${
                      activeProject.id === project.id ? "opacity-100" : "opacity-0"
                    } ${favorites.includes(project.id) ? "bg-red-500 border-red-500" : ""}`}
                  >
                    <Heart size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-12 left-8 md:left-24 flex gap-12 pointer-events-auto">
            <div className="hidden md:block">
              <p className="text-[10px] uppercase text-white/40">Local</p>
              <p className="text-xl font-mono">{activeProject?.weather.time}</p>
            </div>
          </div>
          <div className="absolute bottom-12 right-12 z-20 pointer-events-auto">
            <button onClick={() => setActiveView("detail")} className="group flex items-center gap-6">
              <div className="text-right text-white">
                <span className="block text-[10px] uppercase opacity-60">Estimation</span>
                <span className="block text-xl font-bold">{activeProject?.price}</span>
              </div>
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center group-hover:scale-110 transition">
                <ArrowUpRight size={24} />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ─── Architects overlay ─── */}
      <AnimatePresence>
        {activeView === "architects" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-[50] bg-[#111] text-white overflow-y-auto"
          >
            <button onClick={closeOverlay} className="fixed top-8 right-8 z-50 p-4 bg-white/10 backdrop-blur text-white rounded-full hover:bg-white hover:text-black transition duration-300">
              <X size={24} />
            </button>
            <div className="p-8 md:p-24 max-w-7xl mx-auto">
              <Reveal>
                <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-16">Partners.</h2>
              </Reveal>
              <div className="grid md:grid-cols-2 gap-12">
                {architects.map((arch, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="group cursor-pointer">
                      <div className="h-[400px] w-full relative overflow-hidden mb-6">
                        <Image
                          src={arch.image}
                          alt={arch.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest z-10">
                          {arch.style}
                        </div>
                      </div>
                      <h3 className="text-4xl font-bold">{arch.name}</h3>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Services overlay ─── */}
      <AnimatePresence>
        {activeView === "services" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-[50] bg-[#0a0a0a] text-white overflow-y-auto flex items-center"
          >
            <button onClick={closeOverlay} className="fixed top-8 right-8 z-50 p-4 bg-white/10 backdrop-blur text-white rounded-full hover:bg-white hover:text-black transition duration-300">
              <X size={24} />
            </button>
            <div className="p-8 md:p-24 max-w-7xl mx-auto w-full">
              <Reveal className="text-center mb-20">
                <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em]">Conciergerie</span>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mt-4">Private Office.</h2>
              </Reveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="p-8 border border-white/10 hover:bg-white/5 transition duration-300 hover:border-[#d4af37]/30 group">
                      <div className="text-[#d4af37] mb-6 w-8 h-8 transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                      <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Journal overlay ─── */}
      <AnimatePresence>
        {activeView === "journal" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-[50] bg-[#1a1a1a] text-white overflow-y-auto"
          >
            <button onClick={closeOverlay} className="fixed top-8 right-8 z-50 p-4 bg-white/10 backdrop-blur text-white rounded-full hover:bg-white hover:text-black transition duration-300">
              <X size={24} />
            </button>
            <div className="p-8 md:p-24 max-w-5xl mx-auto">
              <Reveal>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-20">Journal.</h2>
              </Reveal>
              <div className="space-y-12">
                {journal.map((article, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center border-b border-white/10 pb-12 group cursor-pointer">
                      <span className="text-xs font-mono text-white/40">{article.date}</span>
                      <div className="flex-1">
                        <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-2 block">{article.category}</span>
                        <h3 className="text-3xl md:text-5xl font-bold group-hover:translate-x-4 transition-transform duration-500">{article.title}</h3>
                      </div>
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition duration-300" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Contact overlay (Formspree) ─── */}
      <AnimatePresence>
        {activeView === "contact" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-lg bg-[#121212] border border-[#d4af37]/30 p-12 shadow-2xl relative"
            >
              <button onClick={closeOverlay} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <X size={24} />
              </button>
              {formStatus === "idle" && (
                <form onSubmit={handleContactSubmit} className="space-y-8">
                  <div className="text-center">
                    <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em]">Contact</span>
                    <h3 className="text-3xl font-light mt-2">Nous Écrire</h3>
                  </div>
                  <div className="space-y-4">
                    <input name="name" type="text" placeholder="Nom" required className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#d4af37] outline-none" />
                    <input name="email" type="email" placeholder="Email" required className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#d4af37] outline-none" />
                    <input name="_subject" type="hidden" value="Contact Arkitek (Demo VERSO)" />
                    <textarea name="message" placeholder="Message" rows={3} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#d4af37] outline-none" />
                  </div>
                  <button type="submit" className="w-full bg-[#d4af37] text-black font-bold uppercase tracking-[0.2em] py-4 hover:bg-white transition duration-500 cursor-pointer">
                    Envoyer
                  </button>
                </form>
              )}
              {formStatus === "loading" && (
                <div className="py-20 flex justify-center">
                  <Loader2 className="animate-spin text-[#d4af37]" />
                </div>
              )}
              {formStatus === "success" && (
                <div className="py-12 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
                    <Check className="mx-auto text-[#d4af37] mb-4" size={48} />
                  </motion.div>
                  <p className="text-lg">Message envoyé.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Detail overlay ─── */}
      <AnimatePresence>
        {activeView === "detail" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-[50] bg-[#0a0a0a] text-white overflow-y-auto"
          >
            <button onClick={closeOverlay} className="fixed top-8 right-8 z-50 p-4 bg-white/10 backdrop-blur rounded-full hover:bg-white hover:text-black">
              <X size={24} />
            </button>
            <div className="relative h-[80vh] w-full overflow-hidden">
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover" priority sizes="100vw" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8 md:p-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <p className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                    {activeProject.location} · {activeProject.year}
                  </p>
                  <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter mb-4">{activeProject.title}</h1>
                  <p className="text-2xl font-mono text-white/60">{activeProject.price}</p>
                </motion.div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-8 md:px-24 pb-32 grid md:grid-cols-12 gap-16 mt-12">
              <div className="md:col-span-8">
                <Reveal>
                  <p className="text-2xl md:text-3xl font-light text-white/80 mb-12">&ldquo;{activeProject.desc}&rdquo;</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-64 bg-neutral-900 rounded-sm w-full relative overflow-hidden group">
                      <Image src={activeProject.image} fill className="object-cover opacity-60 group-hover:opacity-100 transition duration-500 group-hover:scale-105" alt="Vue 1" style={{ filter: "hue-rotate(90deg)" }} />
                    </div>
                    <div className="h-64 bg-neutral-900 rounded-sm w-full relative overflow-hidden group">
                      <Image src={activeProject.image} fill className="object-cover opacity-60 group-hover:opacity-100 transition duration-500 group-hover:scale-105" alt="Vue 2" style={{ filter: "sepia(50%)" }} />
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
                    <div>
                      <p className="text-[10px] uppercase text-white/40 mb-1">Catégorie</p>
                      <p className="text-lg font-bold">{activeProject.category}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-white/40 mb-1">Météo locale</p>
                      <p className="text-lg font-bold">{activeProject.weather.temp}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-white/40 mb-1">Condition</p>
                      <p className="text-lg font-bold">{activeProject.weather.condition}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="md:col-span-4 space-y-8 sticky top-12 h-fit">
                <Reveal delay={0.2}>
                  <button
                    onClick={() => setActiveView("contact")}
                    className="w-full bg-[#d4af37] text-black py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition duration-500 cursor-pointer"
                  >
                    Solliciter une visite
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full border border-white/20 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition flex justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {downloadStatus === "loading" ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
                    Télécharger PDF
                  </button>
                </Reveal>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
        .mask-gradient { mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); }
      `}</style>
    </main>
  );
}
