"use client";

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ArrowLeft, X, Wine, Quote, Star, ChefHat } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// --- DATA ---
const menuItems = [
  { name: "Tartufo Nero", price: "34", desc: "Tagliatelles, truffe noire du Périgord.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop" },
  { name: "Risotto Oro", price: "28", desc: "Riz Carnaroli, safran d'Iran, feuille d'or 24k.", img: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop" },
  { name: "Bistecca", price: "85", desc: "Côte de bœuf maturée 45 jours.", img: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=800&auto=format&fit=crop" },
  { name: "Dolce Vita", price: "14", desc: "Tiramisu déstructuré.", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop" }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200", 
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200", 
  "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200", 
  "https://cdn.pixabay.com/photo/2013/08/29/04/41/wine-glasses-176991_1280.jpg"
];

const testimonials = [
    { text: "Une expérience culinaire inoubliable.", author: "Sophie L." },
    { text: "L'atmosphère est magique.", author: "Marc D." },
    { text: "La meilleure cuisine italienne.", author: "Isabelle R." },
    { text: "Un voyage sensoriel.", author: "Thomas B." },
    { text: "L'accord parfait.", author: "Antoine G." }
];

// DATA VINS
const wineList = {
    red: [
        { name: "Barolo Monfortino", year: "2013", region: "Piemonte", price: "850€" },
        { name: "Solaia Antinori", year: "2016", region: "Toscana", price: "420€" },
        { name: "Amarone della Valpolicella", year: "2015", region: "Veneto", price: "180€" }
    ],
    white: [
        { name: "Gaja Gaia & Rey", year: "2018", region: "Piemonte", price: "320€" },
        { name: "Cervaro della Sala", year: "2019", region: "Umbria", price: "140€" }
    ]
};

export default function RestaurantDemo() {
  // --- REFS ---
  const containerRef = useRef(null);
  
  // Refs Sections Scroll
  const terroirRef = useRef(null); 
  const terroirMoveRef = useRef<HTMLDivElement>(null); 
  const testimonialRef = useRef(null);
  const testimonialMoveRef = useRef<HTMLDivElement>(null);

  // --- STATES ---
  const [galleryWidth, setGalleryWidth] = useState(0);
  const [testimonialWidth, setTestimonialWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWineModalOpen, setIsWineModalOpen] = useState(false);

  const activeMenuItem = hoveredMenuIndex !== null ? menuItems[hoveredMenuIndex] : null;

  // --- SOURIS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const menuImageX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const menuImageY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleResize = () => {
        setViewportWidth(window.innerWidth);
        if (terroirMoveRef.current) setGalleryWidth(terroirMoveRef.current.scrollWidth);
        if (testimonialMoveRef.current) setTestimonialWidth(testimonialMoveRef.current.scrollWidth);
    };

    const timer = setTimeout(() => {
        handleResize();
        setLoading(false);
    }, 500);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); });

    return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timer);
    };
  }, []);

  // --- SCROLL ---
  const { scrollYProgress } = useScroll({ target: containerRef });
  const { scrollYProgress: terroirProgress } = useScroll({ target: terroirRef, offset: ["start start", "end end"] });
  const xGallery = useTransform(terroirProgress, [0, 1], ["0px", `-${galleryWidth - viewportWidth}px`]);
  const { scrollYProgress: testimonialProgress } = useScroll({ target: testimonialRef, offset: ["start start", "end end"] });
  const xTestimonials = useTransform(testimonialProgress, [0, 1], [`-${testimonialWidth - viewportWidth}px`, "0px"]);
  const yHero = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[#050505] text-[#e5e5e5] font-serif selection:bg-[#d4af37] selection:text-black cursor-none">
      
      {/* --- CURSEUR CORRIGÉ (Z-INDEX 9999) --- */}
      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block" 
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-3 h-3 bg-[#d4af37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
        <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37] opacity-50"
            animate={{ width: hoveredMenuIndex !== null ? 80 : 40, height: hoveredMenuIndex !== null ? 80 : 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>

      {/* HEADER */}
      <Link href="/#demos" className="fixed top-8 left-8 z-50 group">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-6 py-2 rounded-full text-xs font-sans font-bold group-hover:bg-[#d4af37] group-hover:text-black transition-all flex items-center gap-2">
            <ArrowLeft size={14} /> VERSO.
        </div>
      </Link>

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2000')] bg-cover bg-center opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
        </motion.div>
        <div className="relative z-10 px-6">
            <p className="text-[#d4af37] text-sm font-sans tracking-[0.5em] uppercase mb-6">Est. 1984 · Paris</p>
            <h1 className="text-[12vw] leading-[0.8] font-medium tracking-tighter text-white drop-shadow-2xl">GUSTAVO</h1>
        </div>
      </section>

      {/* PHILOSOPHIE */}
      <section className="py-40 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
            <div className="text-[#d4af37] font-sans text-xs tracking-[0.3em] uppercase mb-4">Philosophie</div>
            <h2 className="text-5xl md:text-7xl leading-[1.1] text-white">Cuisiner, c'est <span className="text-[#d4af37] italic">aimer</span>.</h2>
            <p className="mt-10 text-xl text-neutral-400 font-sans font-light leading-relaxed">Chez Gustavo, nous ne servons pas simplement des plats. Nous racontons l'histoire d'une Italie oubliée.</p>
        </div>
        <div className="h-[600px] w-full bg-[url('https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000')] bg-cover bg-center grayscale hover:grayscale-0 transition duration-700" />
      </section>

      {/* SCROLL 1 : IMAGES (GAUCHE) */}
      <div ref={terroirRef} className="relative h-[300vh]">
         <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-[#050505]">
            <motion.div ref={terroirMoveRef} style={{ x: xGallery }} className="flex gap-20 pl-20 items-center w-max">
                <div className="shrink-0 w-[400px]">
                    <span className="text-[#d4af37] font-sans text-xs tracking-[0.3em] uppercase block mb-4">Le Terroir</span>
                    <h3 className="text-6xl text-white italic">Voyage<br/>Immobile</h3>
                    <p className="mt-6 text-neutral-400 font-sans font-light">De la Toscane à la Sicile.</p>
                </div>
                {galleryImages.map((src, i) => (
                    <div key={i} className="shrink-0 w-[600px] h-[400px] grayscale hover:grayscale-0 transition duration-700">
                        <img src={src} className="w-full h-full object-cover" />
                    </div>
                ))}
                <div className="shrink-0 w-[400px] flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center text-[#d4af37] font-serif italic text-xl">Fine.</div>
                </div>
            </motion.div>
         </div>
      </div>

      {/* MENU */}
      <section className="py-40 bg-[#050505] relative z-20">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-24"><span className="text-[#d4af37] font-sans text-xs tracking-[0.3em] uppercase">La Carte</span><h3 className="text-6xl md:text-8xl italic text-white mt-4 opacity-10">Signatures</h3></div>
            <div className="relative border-t border-white/10">
                {menuItems.map((item, i) => (
                    <div key={i} onMouseEnter={() => setHoveredMenuIndex(i)} onMouseLeave={() => setHoveredMenuIndex(null)} className="group flex justify-between items-baseline border-b border-white/10 py-12 cursor-none transition-all hover:bg-white/5 px-4">
                        <div><h4 className="text-4xl md:text-5xl font-serif text-white group-hover:text-[#d4af37] transition-colors">{item.name}</h4><p className="text-neutral-500 font-sans text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</p></div>
                        <div className="text-3xl font-serif text-[#d4af37]"><span className="text-lg mr-1">€</span>{item.price}</div>
                    </div>
                ))}
            </div>
        </div>
        <motion.div className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-10 overflow-hidden rounded-lg opacity-0 hidden md:block mix-blend-screen" style={{ x: menuImageX, y: menuImageY, top: "-200px", left: "50px", opacity: hoveredMenuIndex !== null ? 0.8 : 0, rotate: -5 }}>
            <AnimatePresence mode="wait">
                {activeMenuItem && <motion.img key={activeMenuItem.name} src={activeMenuItem.img} initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.4 }} className="w-full h-full object-cover grayscale contrast-125" />}
            </AnimatePresence>
        </motion.div>
      </section>

      {/* SCROLL 2 : TÉMOIGNAGES (DROITE) */}
      <div ref={testimonialRef} className="relative h-[250vh]">
         <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0a]">
            <div className="max-w-6xl mx-auto w-full px-6 mb-12">
                <span className="text-[#d4af37] font-sans text-xs tracking-[0.3em] uppercase block mb-4">Échos</span>
                <h3 className="text-5xl md:text-7xl font-serif text-white italic">Ce qu'ils en disent</h3>
            </div>
            <motion.div ref={testimonialMoveRef} style={{ x: xTestimonials }} className="flex gap-12 pl-6 w-max">
                <div className="w-[10vw] shrink-0" />
                {testimonials.map((t, i) => (
                    <div key={i} className="w-[400px] p-12 border border-white/10 bg-white/5 flex flex-col justify-between shrink-0">
                        <Quote className="text-[#d4af37] mb-6 opacity-50" size={32} />
                        <p className="text-2xl text-white/90 font-light italic mb-8">"{t.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[1px] bg-[#d4af37]" />
                            <span className="text-sm font-sans uppercase tracking-widest text-white/60">{t.author}</span>
                        </div>
                    </div>
                ))}
            </motion.div>
         </div>
      </div>

      {/* SOMMELIER */}
      <section className="py-40 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
         <div className="order-2 md:order-1 relative h-[600px] bg-[#0c0c0c] flex items-center justify-center border border-white/10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1000')] bg-cover bg-center opacity-20" />
            <div className="relative z-10 p-12 text-center border border-[#d4af37]/20 bg-black/50 backdrop-blur-md">
                 <Wine className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                 <h4 className="text-3xl font-serif text-white mb-2">La Cave</h4>
                 <p className="text-neutral-400 font-sans text-sm tracking-widest uppercase">400 Références</p>
            </div>
         </div>
         <div className="order-1 md:order-2">
             <span className="text-[#d4af37] font-sans text-xs tracking-[0.3em] uppercase">Sommelier</span>
             <h2 className="text-5xl md:text-7xl leading-[1.1] text-white mt-6 mb-10">L'Accord <br/><span className="italic text-neutral-500">Parfait.</span></h2>
             <p className="text-xl text-neutral-400 font-sans font-light leading-relaxed">Une sélection rigoureuse des meilleurs vignobles italiens.</p>
             
             {/* --- BOUTON ACTIF --- */}
             <button 
                onClick={() => setIsWineModalOpen(true)}
                className="mt-12 group cursor-pointer w-fit text-left focus:outline-none"
             >
                <div className="text-white uppercase text-xs tracking-[0.2em] mb-2 group-hover:text-[#d4af37] transition">Découvrir la carte des vins</div>
                <div className="h-[1px] w-full bg-white/20 group-hover:bg-[#d4af37] transition duration-500 scale-x-50 origin-left group-hover:scale-x-100" />
             </button>
         </div>
      </section>

      {/* FOOTER CTA */}
      <section className="h-[80vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-[#050505]">
        <div className="relative z-10">
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white mb-12">Votre Table<br/><span className="text-[#d4af37] italic">Vous Attend.</span></h2>
            <button onClick={() => setIsModalOpen(true)} className="px-12 py-6 bg-white text-black font-sans font-bold text-sm tracking-[0.2em] uppercase hover:bg-[#d4af37] hover:text-white transition-colors">Réserver Maintenant</button>
        </div>
      </section>

      {/* MODALE RÉSERVATION */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-auto">
             <div className="w-full max-w-lg bg-[#111] border border-[#d4af37]/30 p-12 relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white hover:text-[#d4af37]"><X /></button>
                <div className="text-center mb-10"><span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs">Réservation</span><h3 className="text-4xl font-serif text-white italic mt-2">Benvenuto</h3></div>
                <div className="space-y-6">
                    <input type="text" placeholder="Nom" className="w-full bg-white/5 border-b border-white/10 p-4 text-white outline-none focus:border-[#d4af37] transition"/>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" className="bg-white/5 border-b border-white/10 p-4 text-white outline-none focus:border-[#d4af37] transition"/>
                        <select className="bg-white/5 border-b border-white/10 p-4 text-white outline-none focus:border-[#d4af37] transition"><option className="bg-black">19:30</option><option className="bg-black">20:30</option></select>
                    </div>
                    <button className="w-full bg-[#d4af37] text-black font-bold uppercase tracking-[0.2em] py-4 hover:bg-white transition">Confirmer</button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NOUVELLE MODALE : CARTE DES VINS --- */}
      <AnimatePresence>
        {isWineModalOpen && (
            <motion.div 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                exit={{ y: "100%" }} 
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[250] bg-[#0a0a0a] overflow-y-auto cursor-auto"
            >
                <div className="min-h-screen p-8 md:p-24 relative">
                    <button onClick={() => setIsWineModalOpen(false)} className="fixed top-8 right-8 z-[260] p-4 bg-white/10 rounded-full hover:bg-white hover:text-black transition">
                        <X size={24} />
                    </button>
                    
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-[#d4af37] font-sans text-xs tracking-[0.4em] uppercase">Sommelier</span>
                            <h2 className="text-6xl md:text-8xl font-serif text-white italic mt-4">La Cave</h2>
                        </div>

                        <div className="space-y-20">
                            {/* Vins Rouges */}
                            <div>
                                <h3 className="text-2xl font-sans uppercase tracking-widest text-white/50 mb-8 border-b border-white/10 pb-4">Rossi</h3>
                                <div className="space-y-8">
                                    {wineList.red.map((wine, i) => (
                                        <div key={i} className="flex justify-between items-end group cursor-pointer hover:opacity-100 opacity-60 transition-opacity">
                                            <div>
                                                <h4 className="text-3xl font-serif text-white group-hover:text-[#d4af37] transition-colors">{wine.name}</h4>
                                                <p className="text-neutral-500 font-sans text-sm mt-1">{wine.region} · {wine.year}</p>
                                            </div>
                                            <div className="text-xl font-serif text-[#d4af37]">{wine.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Vins Blancs */}
                            <div>
                                <h3 className="text-2xl font-sans uppercase tracking-widest text-white/50 mb-8 border-b border-white/10 pb-4">Bianchi</h3>
                                <div className="space-y-8">
                                    {wineList.white.map((wine, i) => (
                                        <div key={i} className="flex justify-between items-end group cursor-pointer hover:opacity-100 opacity-60 transition-opacity">
                                            <div>
                                                <h4 className="text-3xl font-serif text-white group-hover:text-[#d4af37] transition-colors">{wine.name}</h4>
                                                <p className="text-neutral-500 font-sans text-sm mt-1">{wine.region} · {wine.year}</p>
                                            </div>
                                            <div className="text-xl font-serif text-[#d4af37]">{wine.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-32 text-center">
                            <p className="text-neutral-500 italic">"Le vin est la poésie de la terre."</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}