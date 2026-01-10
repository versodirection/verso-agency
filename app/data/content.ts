// app/data/content.ts
import { Code, Rocket, Palette, Smartphone, Check } from "lucide-react";

export const siteConfig = {
  name: "VERSO AGENCY",
  description: "Nous créons le futur du web pour des entreprises ambitieuses.",
  email: "contact@verso-agency.fr",
};

export const services = [
  {
    title: "Site Vitrine",
    description: "Un design époustouflant pour présenter votre activité. Rapide, SEO-friendly et unique.",
    icon: Palette,
  },
  {
    title: "E-Commerce",
    description: "Transformez vos visiteurs en acheteurs avec une boutique fluide et sécurisée.",
    icon: Smartphone,
  },
  {
    title: "Web Apps",
    description: "Des outils complexes (SaaS, Tableaux de bord) développés sur-mesure.",
    icon: Code,
  },
  {
    title: "Refonte",
    description: "Votre site est vieux ? On le modernise et on optimise votre conversion.",
    icon: Rocket,
  },
];

// --- NOUVEAU : NOS DÉMOS ---
export const demos = [
  {
    title: "Gustavo",
    category: "Restaurant / Food",
    image: "/image/gustavo.jpg",
    description: "Site immersif avec menu digital et module de réservation.",
    link: "/demo/restaurant"
  },
  {
    title: "Arkitek",
    category: "Architecture / Immo",
    image: "/image/Immo.jpg",
    description: "Design minimaliste mettant en valeur les photos haute définition.",
    link: "/demo/immo"
  },
  {
    title: "Aether",
    category: "E-Commerce",
    image: "/image/Aether.jpg",
    description: "Boutique en ligne moderne optimisée pour la conversion mobile.",
    link: "/demo/fashion"
    
  }
];

// --- NOUVEAU : NOS TARIFS ---
export const pricing = [
  {
    title: "Starter",
    price: "490€",
    description: "L'essentiel pour démarrer proprement.",
    features: ["Site One-Page", "Design Responsive", "Formulaire de contact", "Optimisation Mobile", "Hébergement inclus"],
    highlight: false
  },
  {
    title: "Pro",
    price: "1250€",
    description: "Pour les entreprises qui veulent convaincre.",
    features: ["Site Multi-pages (5 max)", "Animations fluides", "Blog / Actualités", "SEO Avancé", "Support prioritaire"],
    highlight: true // Celui qui sera en violet
  },
  {
    title: "Sur Mesure",
    price: "Devis",
    description: "Projets complexes et E-commerce.",
    features: ["Architecture personnalisée", "E-commerce complet", "Espace membre", "Intégrations API", "Maintenance annuelle"],
    highlight: false
  }
];