// app/data/content.ts
import { Code, Rocket, Palette, Smartphone } from "lucide-react";

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

// --- VRAIS PROJETS CLIENTS ---
export const realisations = [
  {
    title: "Cours Djembé Toulouse",
    category: "Développement Sur-Mesure",
    image: "/projects/coursdjembetoulouse.png", 
    description: "Application web ultra-rapide (Score Lighthouse 100%). Stack moderne : Next.js 14, Tailwind CSS, Framer Motion et intégration Newsletter via API.",
    link: "https://coursdjembetoulouse.fr/"
  }
];

// --- AVIS GOOGLE (Avec Dates) ---
export const reviews = [
  {
    author: "Fred Diaz.",
    role: "Refonte du site de Cours Djembe Toulouse",
    text: "J'ai fait appel à VERSO pour un site de musique. Étant musicien ma demande était assez complexe. Il me fallait un site \"outil\" me permettant de facilement travailler sur mes morceaux. Ils ont été hyper réactifs et leurs idées ont dépassé les miennes. Du coup il est encore mieux que ce à quoi je m'attendais. Un grand merci à cette équipe jeune et dynamique. Je recommande grandement!",
    stars: 5,
    reviewDate: new Date(2026, 0, 25) // 25 janvier 2026
  },
  {
    author: "Victor M.",
    role: "Prestation privée",
    text: "Verso Agency montre une expertise dans la création des sites webs, avec un look élégant et moderne, qui reste dans la tendance actuelle ! Je recommande, pour tous les budgets !",
    stars: 5,
    reviewDate: new Date(2026, 1, 5) // 5 février 2026
  }
];

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

export const pricing = [
  {
    title: "Starter",
    price: "980€",
    description: "L'essentiel pour démarrer proprement.",
    features: ["Site One-Page", "Design Responsive", "Formulaire de contact", "Optimisation Mobile", "Hébergement inclus"],
    highlight: false
  },
  {
    title: "Pro",
    price: "2500€",
    description: "Pour les entreprises qui veulent convaincre.",
    features: ["Site Multi-pages (5 max)", "Animations fluides", "Blog / Actualités", "SEO Avancé", "Support prioritaire"],
    highlight: true 
  },
  {
    title: "Sur Mesure",
    price: "Devis",
    description: "Projets complexes et E-commerce.",
    features: ["Architecture personnalisée", "E-commerce complet", "Espace membre", "Intégrations API", "Maintenance annuelle"],
    highlight: false
  }
];