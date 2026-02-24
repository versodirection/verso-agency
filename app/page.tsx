"use client";

import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import QuoteCalculator from "./components/QuoteCalculator";
import { Grain, Preloader, VelocityScroll } from "./components/ui";
import {
  Navbar,
  Hero,
  Realisations,
  Services,
  Demos,
  Reviews,
  Pricing,
  Contact,
  Footer,
} from "./components/sections";

export default function Home() {
  // --- State ---
  const [loading, setLoading] = useState(true);
  const [showAnimations, setShowAnimations] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  // --- Intro check ---
  useEffect(() => {
    // Toujours afficher le contenu si on revient sur la page d'accueil
    try {
      const skipPreloader = sessionStorage.getItem("verso-skip-preloader");
      if (skipPreloader) {
        sessionStorage.removeItem("verso-skip-preloader");
        setLoading(false);
        return;
      }
      // Si navigation interne ou retour, on ne montre pas le preloader
      if (performance && performance.getEntriesByType) {
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries.length > 0 && navEntries[0].type !== "reload") {
          setLoading(false);
          return;
        }
      }
      const hasSeen = sessionStorage.getItem("verso-intro-seen");
      if (!hasSeen) {
        setShowAnimations(true);
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, []);

  // --- Hash scroll ---
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  }, []);

  // --- Navigation ---
  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
      e.preventDefault();
      scrollTo(id);
    },
    [scrollTo]
  );

  // --- Intro ---
  const handleIntroComplete = useCallback(() => {
    setLoading(false);
    setShowAnimations(false);
    try {
      sessionStorage.setItem("verso-intro-seen", "true");
    } catch {}
  }, []);

  // --- Form ---
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormStatus("loading");

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setFormStatus("success");
          setFormMessage("");
          setTimeout(() => setFormStatus("idle"), 3000);
          (e.target as HTMLFormElement).reset();
        } else {
          setFormStatus("error");
        }
      } catch {
        setFormStatus("error");
      }
    },
    []
  );

  // --- Custom cursor ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const cursorEnter = useCallback(() => setCursorVariant("hover"), []);
  const cursorLeave = useCallback(() => setCursorVariant("default"), []);

  const cursorVariants = {
    default: { width: 20, height: 20, backgroundColor: "#fff", mixBlendMode: "difference" as const },
    hover: { width: 80, height: 80, backgroundColor: "#fff", mixBlendMode: "difference" as const },
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <main className={`min-h-screen selection:bg-indigo-500 selection:text-white overflow-hidden bg-black ${isQuoteOpen ? "cursor-auto" : "md:cursor-none"}`}>
        <Grain />

        {/* Custom cursor */}
        {!isQuoteOpen && (
          <motion.div
            variants={cursorVariants}
            animate={cursorVariant}
            className="hidden md:flex fixed top-0 left-0 rounded-full pointer-events-none z-[9999] items-center justify-center"
            style={{ translateX: "-50%", translateY: "-50%", x: cursorX, y: cursorY }}
          >
            {cursorVariant === "hover" && <div className="w-2 h-2 bg-white rounded-full" />}
          </motion.div>
        )}

        {/* Sections */}
        <Navbar
          showAnimations={showAnimations}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          scrollTo={scrollTo}
          handleScroll={handleScroll}
          cursorEnter={cursorEnter}
          cursorLeave={cursorLeave}
        />

        <Hero showAnimations={showAnimations} scrollTo={scrollTo} cursorEnter={cursorEnter} cursorLeave={cursorLeave} />

        <section className="py-2 bg-black border-y border-white/5 overflow-hidden">
          <VelocityScroll text="STRATEGY — DESIGN — DEVELOPMENT — EXPERIENCE" />
        </section>

        <Realisations showAnimations={showAnimations} />
        <Services showAnimations={showAnimations} cursorEnter={cursorEnter} cursorLeave={cursorLeave} />
        <Demos showAnimations={showAnimations} cursorEnter={cursorEnter} cursorLeave={cursorLeave} />
        <Reviews cursorEnter={cursorEnter} cursorLeave={cursorLeave} />
        <Pricing
          showAnimations={showAnimations}
          cursorEnter={cursorEnter}
          cursorLeave={cursorLeave}
          scrollTo={scrollTo}
          setFormMessage={setFormMessage}
          setIsQuoteOpen={setIsQuoteOpen}
        />
        <Contact
          showAnimations={showAnimations}
          cursorEnter={cursorEnter}
          cursorLeave={cursorLeave}
          formMessage={formMessage}
          setFormMessage={setFormMessage}
          formStatus={formStatus}
          onSubmit={handleFormSubmit}
        />
        <Footer scrollTo={scrollTo} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness", // Ou "ProfessionalService"
              "name": "Verso Agency",
              "image": "https://verso-agency.fr/linkimage.png", // Mets l'URL réelle de ton logo ici
              "url": "https://verso-agency.fr",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",       // Ta note moyenne (ex: 5)
                "reviewCount": "3",      // Le nombre TOTAL d'avis que tu as
                "bestRating": "5",
                "worstRating": "1"
              }
            }),
          }}
        />

        <AnimatePresence>
          {isQuoteOpen && <QuoteCalculator onClose={() => setIsQuoteOpen(false)} />}
        </AnimatePresence>
      </main>
    </ReactLenis>
  );
}