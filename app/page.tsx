"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame, AnimatePresence } from "framer-motion"; 
import { ArrowRight, Check, Mail, Phone, MapPin, ExternalLink, Menu, X, Loader2, Star } from "lucide-react";
import { services, siteConfig, demos, pricing, realisations, reviews } from "./data/content"; 
import Link from "next/link";
import { useState, useEffect, Suspense, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { ReactLenis } from "@studio-freight/react-lenis";
import QuoteCalculator from "./components/QuoteCalculator";
import Image from "next/image";


// --- 1. UTILS ---
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

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

// --- 2. COMPOSANTS UI ---

const TiltCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };
  
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={`transform-gpu perspective-1000 transition-transform ease-out duration-200 ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
};

const VelocityScroll = ({ text }: { text: string }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * 2 * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="py-8 overflow-hidden flex flex-nowrap whitespace-nowrap opacity-30 select-none pointer-events-none">
      <motion.div style={{ x }} className="flex flex-nowrap gap-10 text-8xl md:text-[10rem] font-bold tracking-tighter text-transparent uppercase font-outline-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-stroke">{text} — </span>
        ))}
      </motion.div>
    </div>
  );
};

const MaskText = ({ children, enabled = false }: { children: React.ReactNode, enabled?: boolean }) => {
  if (!enabled) return <div className="overflow-hidden">{children}</div>;
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.05] mix-blend-overlay">
    <svg className="w-full h-full"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noise)" /></svg>
  </div>
);

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setTimeout(onComplete, 400); return 100; }
        return prev + Math.floor(Math.random() * 5) + 2; 
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col pointer-events-none bg-black">
      <motion.div initial={{ y: 0 }} exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }} className="w-full h-[50vh] bg-[#050505] relative border-b border-white/5" />
      <motion.div initial={{ y: 0 }} exit={{ y: "100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }} className="w-full h-[50vh] bg-[#050505] relative border-t border-white/5" />
      <motion.div exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }} className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-6">
        <div className="overflow-hidden"><motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white text-sm md:text-base font-mono tracking-[0.5em] uppercase pl-2">VERSO Agency</motion.p></div>
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden"><motion.div className="absolute inset-0 bg-indigo-500 shadow-[0_0_10px_#6366f1]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} /></div>
      </motion.div>
    </div>
  );
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    setPosition({ x: (clientX - (left + width / 2)) * 0.2, y: (clientY - (top + height / 2)) * 0.2 });
  };
  return (<motion.div style={{ position: "relative" }} ref={ref} onMouseMove={handleMouse} onMouseLeave={() => setPosition({x:0,y:0})} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}>{children}</motion.div>);
};

const NexusCore = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => { if(mesh.current) { mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2; mesh.current.rotation.y = state.clock.getElapsedTime() * 0.1; } });
  return (<Float speed={2} rotationIntensity={1} floatIntensity={2}><mesh ref={mesh} scale={2.8}><icosahedronGeometry args={[1, 15]} /><MeshDistortMaterial color="#4f46e5" attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.9} /></mesh></Float>);
};

const ReviewCard = ({ review, index }: { review: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textLines = review.text.split('\n').length;
  const shouldShowMore = review.text.length > 200;

  return (
    <motion.div 
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{delay: index * 0.2}}
      className="group h-full"
    >
      <TiltCard className="p-8 rounded-2xl bg-gradient-to-br from-neutral-800/40 to-neutral-900/60 border border-white/10 hover:border-indigo-500/50 relative overflow-hidden backdrop-blur-sm transition-all duration-300 flex flex-col h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-300"></div>
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex gap-1 mb-4">
            {[...Array(review.stars)].map((_, i) => (
              <motion.div key={i} initial={{scale: 0}} whileInView={{scale: 1}} transition={{delay: 0.3 + i * 0.1}}>
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>
          
          <div className="flex-1">
            <p className={`text-neutral-200 text-base mb-6 leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-4' : ''}`}>
              {review.text}
            </p>
          </div>

          {shouldShowMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold mb-6 transition-colors"
            >
              {isExpanded ? 'Afficher moins' : 'Afficher plus'}
            </button>
          )}

          <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
            <motion.div 
              whileHover={{scale: 1.1}}
              className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg flex-shrink-0"
            >
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
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showAnimations, setShowAnimations] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const hasSeen = sessionStorage.getItem("nexus-intro-seen");
    const shouldShow = !hasSeen;
    setLoading(shouldShow);
    setShowAnimations(shouldShow);
  }, []);

  const [cursorVariant, setCursorVariant] = useState("default");
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const [formMessage, setFormMessage] = useState("");

  const scrollTo = (id: string) => { 
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id); 
      if (el) el.scrollIntoView({ behavior: "smooth" }); 
    }, 100);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    scrollTo(id);
  };

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  }, []);

  useLayoutEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("nexus-intro-seen");
    if (hasSeenIntro) {
      setLoading(false);
      setShowAnimations(false);
    } 
  }, []);

  const handleIntroComplete = () => {
    setLoading(false);
    setShowAnimations(false);
    sessionStorage.setItem("nexus-intro-seen", "true"); 
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("https://formspree.io/f/mkogqyla", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            setFormStatus('success');
            setTimeout(() => setFormStatus('idle'), 3000);
            (e.target as HTMLFormElement).reset();
        } else {
            setFormStatus('error');
        }
    } catch (error) {
        setFormStatus('error');
    }
  };

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => { 
        cursorX.set(e.clientX); 
        cursorY.set(e.clientY); 
    };
    window.addEventListener("mousemove", moveCursor); 
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const cursorEnter = () => setCursorVariant("hover");
  const cursorLeave = () => setCursorVariant("default");
  const cursorVariants = { default: { width: 20, height: 20, backgroundColor: "#fff", mixBlendMode: "difference" as any }, hover: { width: 80, height: 80, backgroundColor: "#fff", mixBlendMode: "difference" as any } };
  
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handleIntroComplete} />}
      </AnimatePresence>


      <main className={`min-h-screen selection:bg-indigo-500 selection:text-white overflow-hidden bg-black ${isQuoteOpen ? 'cursor-auto' : 'md:cursor-none'}`}>
        <Grain />
        {!isQuoteOpen && (
            <motion.div 
                variants={cursorVariants} 
                animate={cursorVariant} 
                className="hidden md:flex fixed top-0 left-0 rounded-full pointer-events-none z-[9999] items-center justify-center" 
                style={{ translateX: "-50%", translateY: "-50%", x: cursorX, y: cursorY }}
            >
                {cursorVariant === 'hover' && <div className="w-2 h-2 bg-white rounded-full" />}
            </motion.div>
        )}

        <motion.nav 
            initial={showAnimations ? { y: -100 } : { y: 0 }} 
            animate={{ y: 0 }} 
            transition={{ delay: showAnimations ? 0.8 : 0, duration: 0.8 }} 
            className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300"
        >
            <div className="w-full max-w-[95%] 2xl:max-w-[1920px] mx-auto px-6 h-20 flex items-center justify-between">
                <div className="text-2xl font-bold tracking-tighter cursor-pointer z-[60]" onClick={() => scrollTo('hero')} onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>VERSO<span className="text-indigo-500">.</span></div>
                
                <div className="hidden md:flex items-center gap-8">
                    {['Services', 'Demos', 'Tarifs'].map((item) => (<button key={item} onClick={() => scrollTo(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))} onMouseEnter={cursorEnter} onMouseLeave={cursorLeave} className="text-sm font-medium hover:text-indigo-400 transition">{item}</button>))}
                    <Magnetic><button onClick={() => scrollTo('contact')} onMouseEnter={cursorEnter} onMouseLeave={cursorLeave} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">Démarrer un projet</button></Magnetic>
                </div>

                <button 
                    onClick={() => setMenuOpen(!menuOpen)} 
                    className="md:hidden z-[60] text-white p-2"
                >
                    {menuOpen ? <X size={24}/> : <Menu size={24}/>}
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
                    
                    {['Services', 'Demos', 'Tarifs'].map((item) => {
                        const targetId = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        return (
                            <Link 
                                key={item}
                                href={`#${targetId}`}
                                onClick={(e) => handleScroll(e, targetId)}
                                className="text-4xl font-black uppercase tracking-tighter text-neutral-400 hover:text-white transition-all duration-300"
                            >
                                {item}
                            </Link>
                        );
                    })}

                    <div className="w-12 h-1 bg-indigo-500 rounded-full my-4" />
                    
                    <button onClick={() => scrollTo('contact')} className="text-xl font-bold bg-white text-black px-8 py-4 rounded-full">
                        Démarrer un projet
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        <section id="hero" className="relative pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center min-h-screen">
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none"><Canvas camera={{ position: [0, 0, 6], fov: 45 }}><ambientLight intensity={0.5} /><pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" /><pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" /><Suspense fallback={null}><NexusCore /><Environment preset="city" /></Suspense></Canvas></div>
          <motion.div 
            initial={showAnimations ? "hidden" : "visible"} 
            animate="visible" 
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { delay: showAnimations ? 0.5 : 0, duration: 1 } } }} 
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-sm"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span></span>Disponible pour nouveaux projets</div>
            
            <MaskText enabled={showAnimations}>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8 text-white relative z-20" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
                    L'ingénierie web <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">sans compromis.</span>
                </h1>
            </MaskText>
            
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed mix-blend-screen">{siteConfig.description} Nous créons des expériences digitales ultra-performantes qui captivent vos utilisateurs et convertissent instantanément.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center"><Magnetic><button onClick={() => scrollTo('contact')} onMouseEnter={cursorEnter} onMouseLeave={cursorLeave} className="group bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition flex items-center gap-2 shadow-[0_0_40px_rgba(79,70,229,0.4)]">Réserver un appel<ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></button></Magnetic><Magnetic><button onClick={() => scrollTo('tarifs')} onMouseEnter={cursorEnter} onMouseLeave={cursorLeave} className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/10 hover:bg-white/5 transition backdrop-blur-md">Nos offres</button></Magnetic></div>
          </motion.div>
        </section>

        <section className="py-2 bg-black border-y border-white/5 overflow-hidden">
            <VelocityScroll text="STRATEGY — DESIGN — DEVELOPMENT — EXPERIENCE" />
        </section>

        {/* --- NOUVELLE SECTION : RÉALISATIONS (LAPA) --- */}
        <section className="py-20 px-6 bg-black relative z-10 border-b border-white/5">
            <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
                <div className="mb-20">
                    <MaskText enabled={showAnimations}><h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Réalisations.</h2></MaskText>
                    <p className="text-neutral-400 text-xl max-w-xl">Du concret. Des résultats.</p>
                </div>
                <div className="grid grid-cols-1 gap-12">
                    {realisations.map((project: any, index: number) => (
                        <div key={index} className="group relative grid md:grid-cols-2 gap-8 items-center border border-white/10 bg-neutral-900/50 p-6 md:p-12 rounded-3xl hover:border-indigo-500/50 transition-colors">
                            <div className="relative aspect-video rounded-xl overflow-hidden cursor-none">
                                 {/* Image du projet avec effet de zoom au survol */}
                                 <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <span className="text-indigo-500 text-sm font-bold uppercase tracking-widest">{project.category}</span>
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mt-2">{project.title}</h3>
                                </div>
                                <p className="text-neutral-300 text-lg leading-relaxed">{project.description}</p>
                                <Link href={project.link} target="_blank" className="inline-flex items-center gap-2 text-white font-bold hover:text-indigo-400 transition">
                                    Voir le site en ligne <ExternalLink size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="services" className="py-20 px-6 bg-neutral-950 relative z-10">
          <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
            <div className="mb-20">
              <MaskText enabled={showAnimations}><h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Expertise Technique.</h2></MaskText>
              <p className="text-neutral-400 text-xl max-w-xl">Du code sur-mesure pour des performances inégalées.</p>
            </div>
            <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-6">
              {services.map((service: any, index: number) => (
                <TiltCard key={index} className="group p-10 rounded-3xl bg-neutral-900 border border-white/5 hover:border-indigo-500/30 transition-colors cursor-none">
                  <div onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
                    <service.icon className="w-12 h-12 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" /><h3 className="text-2xl font-bold mb-3">{service.title}</h3><p className="text-neutral-400 leading-relaxed">{service.description}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section id="demos" className="py-20 px-6">
          <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
            <div className="mb-20">
              <MaskText enabled={showAnimations}><h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Showcase.</h2></MaskText>
              <p className="text-neutral-400 text-xl max-w-xl">Des interfaces immersives qui marquent les esprits.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 2xl:gap-16">
              {demos.map((demo: any, index: number) => (
                <TiltCard key={index} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                  <Link 
                    href={demo.link} 
                    className="block w-full h-full cursor-none" 
                    onMouseEnter={cursorEnter} 
                    onMouseLeave={cursorLeave}
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                        <Image 
                            src={demo.image} 
                            alt={`Projet ${demo.title} - ${demo.category}`} 
                            fill 
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">{demo.category}</span>
                        <h3 className="text-2xl font-bold text-white group-hover:translate-x-2 transition-transform">{demo.title}</h3>
                    </div>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION : AVIS GOOGLE --- */}
        <section className="py-20 px-6 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Ils nous font confiance</h2>
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((s) => <motion.div key={s} initial={{opacity: 0.3}} whileInView={{opacity: 1}} transition={{delay: s * 0.1}}><Star size={24} className="text-yellow-400 fill-yellow-400" /></motion.div>)}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                    {reviews.map((review: any, index: number) => (
                        <ReviewCard key={index} review={review} index={index} />
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                    <a 
                        href="https://g.page/r/CQfzKGv0KZsLEBM" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition"
                        onMouseEnter={cursorEnter}
                        onMouseLeave={cursorLeave}
                    >
                        <MapPin size={20} />
                        <span>Lire les autres avis sur Google</span>
                    </a>
                    <a 
                        href="https://g.page/r/CQfzKGv0KZsLEBM/review" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
                        onMouseEnter={cursorEnter}
                        onMouseLeave={cursorLeave}
                    >
                        <Star size={20} className="fill-yellow-500" />
                        <span>RÉDIGER UN AVIS</span>
                    </a>
                </div>
            </div>
          
        </section>

        <section id="tarifs" className="py-20 px-6 bg-neutral-900/30 border-y border-white/5">
          <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto">
            <div className="text-center mb-20">
              <MaskText enabled={showAnimations}><h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Investissement.</h2></MaskText>
              <p className="text-neutral-400 text-xl max-w-xl mx-auto">La qualité a un prix, mais elle rapporte toujours plus.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {pricing.map((plan: any, index: number) => (
                <TiltCard key={index} className={`relative p-8 rounded-3xl border flex flex-col ${plan.highlight ? "bg-white/5 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10" : "bg-neutral-900 border-white/5 hover:border-white/10"}`}>
                  <div onMouseEnter={cursorEnter} onMouseLeave={cursorLeave} className="h-full flex flex-col">
                    {plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">Recommandé</div>}
                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                    <div className="text-4xl font-bold mb-4 tracking-tight">{plan.price}</div>
                    <p className="text-neutral-400 mb-8 text-sm h-10">{plan.description}</p>
                    <ul className="space-y-4 mb-8 flex-1">{plan.features.map((feature: string, i: number) => (<li key={i} className="flex items-start gap-3 text-sm text-neutral-300"><Check className="w-5 h-5 text-indigo-500 shrink-0" />{feature}</li>))}</ul>
                    <button 
                        onClick={() => {
                            if (plan.title === "Sur Mesure") {
                                setIsQuoteOpen(true);
                            } else {
                                setFormMessage(`Bonjour, je suis intéressé par le pack ${plan.title}. Pouvons-nous en discuter ?`);
                                scrollTo('contact');
                            }
                        }} 
                        className={`w-full py-4 rounded-xl font-bold transition ${plan.highlight ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-white text-black hover:bg-gray-200"}`}
                    >
                        {plan.title === "Sur Mesure" ? "Simuler un devis" : `Choisir ${plan.title}`}
                    </button>

                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-6">
          <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <MaskText enabled={showAnimations}><h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Projet ambitieux ?</h2></MaskText>
              <p className="text-neutral-400 text-xl mb-12">Discutons de comment propulser votre marque au niveau supérieur.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center"><Mail className="text-indigo-500" /></div><div><p className="text-sm text-neutral-400">Email</p><p className="font-medium">{siteConfig.email}</p></div></div>
                <div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center"><Phone className="text-indigo-500" /></div><div><p className="text-sm text-neutral-400">Téléphone</p><p className="font-medium">+33 7 68 29 66 12</p></div></div>
                <div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center"><MapPin className="text-indigo-500" /></div><div><p className="text-sm text-neutral-400">Bureau</p><p className="font-medium">Toulouse, France</p></div></div>
              </div>
            </div>
            
            <TiltCard className="bg-neutral-900 p-8 md:p-12 rounded-3xl border border-white/5">
              <form onSubmit={handleFormSubmit} className="space-y-6" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-sm font-medium text-neutral-400">Prénom</label><input type="text" name="name" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition cursor-none" placeholder="John" required /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-neutral-400">Nom</label><input type="text" name="lastname" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition cursor-none" placeholder="Doe" /></div>
                </div>
                <div className="space-y-2"><label className="text-sm font-medium text-neutral-400">Email</label><input type="email" name="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition cursor-none" placeholder="john@company.com" required /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-neutral-400">Message</label>
                <textarea 
                    name="message" 
                    rows={4} 
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)} 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition resize-none cursor-none" 
                    placeholder="Parlez-nous de votre projet..." 
                    required>
                </textarea>
                
                </div>
                
                <Magnetic>
                    <button 
                        type="submit" 
                        disabled={formStatus === 'loading' || formStatus === 'success'}
                        className={`w-full font-bold py-4 rounded-xl transition flex items-center justify-center gap-2
                            ${formStatus === 'success' ? 'bg-emerald-600 text-white' : 'bg-white text-black hover:bg-gray-200'}
                        `}
                    >
                        {formStatus === 'loading' && <Loader2 className="animate-spin" size={20} />}
                        {formStatus === 'success' && <Check size={20} />}
                        {formStatus === 'success' ? "Message envoyé" : formStatus === 'loading' ? "Envoi en cours..." : "Envoyer le message"}
                    </button>
                </Magnetic>
                
                {formStatus === 'error' && (
                    <p className="text-red-500 text-sm text-center">Une erreur est survenue. Réessayez plus tard.</p>
                )}
              </form>
            </TiltCard>
          </div>
        </section>

        <footer className="bg-neutral-950 py-10 border-t border-white/5 relative overflow-hidden">
            <Grain />
            {/* 👇 MODIF : Footer élargi */}
            <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                    
                    <div className="md:text-left">
                        <div onClick={() => scrollTo('hero')} className="text-2xl font-bold tracking-tighter text-white cursor-pointer hover:opacity-80 transition inline-block">
                            VERSO<span className="text-indigo-500">.</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-neutral-600 font-mono uppercase tracking-widest order-3 md:order-2">
                        <Link href="/mentions-legales" className="hover:text-white transition">Mentions Légales</Link>
                        <span className="hidden md:block">•</span>
                        <p>©2025 VERSO Agency.</p>
                    </div>

                    <div className="hidden md:block order-2 md:order-3">
                    </div>

                </div>
            </div>
        </footer>
        <AnimatePresence>
            {isQuoteOpen && <QuoteCalculator onClose={() => setIsQuoteOpen(false)} />}
        </AnimatePresence>
      </main>
    </ReactLenis>
  );
}