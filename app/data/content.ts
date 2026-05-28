// app/data/content.ts
import { Code, Rocket, Palette, Smartphone } from "lucide-react";

export const siteConfig = {
  name: "VERSO AGENCY",
  description: "Des sites web beaux, performants et utiles. Pas de jargon ni de fausses promesses :",
  email: "contact@verso-agency.fr",
  phone: "+33 7 68 29 66 12",
  address: "Toulouse, France",
  url: "https://www.verso-agency.fr",
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
    description: "Application web ultra-rapide. Stack moderne : Next.js 14, Tailwind CSS, Framer Motion et intégration Newsletter via API.",
    link: "https://coursdjembetoulouse.fr/",
    lighthouseScore: 100,
    tech: ["Next.js 14", "Tailwind CSS", "Framer Motion", "TypeScript", "Brevo API"]
  },
  {
    title: "Christian Glace",
    category: "Portfolio d'Artiste",
    image: "/projects/christianglace.png",
    description: "Portfolio sur mesure conçu pour un sculpteur sur bois contemporain. L'interface minimaliste et épurée efface la technique au profit de l'art, offrant une mise en valeur absolue des œuvres et des textures.",
    tech: ["Next.js", "Sanity CMS", "TypeScript", "Tailwind CSS"],
    lighthouseScore: 100,
    link: "https://christianglace.com",
  },
  {
    title: "Najo Music",
    category: "Application Privée",
    image: "/projects/najomusic.png",
    description: "Application musicale développée sur mesure pour un musicien. Projet privé à usage personnel — les fonctionnalités et le contenu musical répondent aux besoins spécifiques du client.",
    tech: ["React", "Firebase", "Web Audio API", "PWA"],
    demoRequest: true,
    details: [
      "Mixage Audio Multi-Pistes & Enregistrement micro (Web Audio API)",
      "Backend Firebase complet (Auth, Firestore, Storage)",
      "Mode Hors-Ligne (PWA & Service Workers)",
      "Visualisation audio & Accordeur chromatique intégré"
    ]
  }
];

// --- AVIS GOOGLE (Avec Dates) ---
export const reviews = [
  {
    author: "Fred Diaz.",
    role: "Professeur de musique",
    text: "J'ai fait appel à VERSO pour un site de musique. Étant musicien ma demande était assez complexe. Il me fallait un site \"outil\" me permettant de facilement travailler sur mes morceaux. Ils ont été hyper réactifs et leurs idées ont dépassé les miennes. Du coup il est encore mieux que ce à quoi je m'attendais. Un grand merci à cette équipe jeune et dynamique. Je recommande grandement!",
    stars: 5,
    reviewDate: new Date(2026, 0, 25) // 25 janvier 2026
  },
  {
    author: "Christian Glace.",
    role: "Sculpteur sur bois Toulousain",
    text: "Très bon contact, sympathique, ouvert, à l'écoute, patient tout en étant très réactif, s'adapte aux demandes tout en étant créatif, efficace, très bonne maîtrise de l'outil pour un excellent résultat. Valeur sûre.",
    stars: 5,
    reviewDate: new Date(2026, 1, 24) // 24 février 2026
  }
  ,{
    author: "Christian Baladou",
    role: "Président, Les Ateliers de Percussions Africaines (LAPA)",
    text: "L'association Les Ateliers de Percussions Africaines (LAPA) a fait appel à VERSO pour la refonte du site coursdejembetoulouse. Le résultat, réalisé dans un délai très bref, dépasse largement nos attentes. Outre le relooking de la palette graphique, de nouveaux choix d'images et de fonds d'écran, l'architecture et l'ergonomie du site ont été notablement améliorées : menus très clairs, fluidité dans les transitions, lien avec le site de l'association LAPA, informations pratiques sur les cours, les stages et les prestations de Team Building, audios pour illustrer la conception des cours et l'ambiance, etc.. Le site est devenu très clair tout en restant riche d'informations et c'est un véritable \"outil\" de communication. Je recommande fortement cette jeune entreprise et sa dynamique équipe. Pour LAPA, le président, Christian BALADOU",
    stars: 5,
    reviewDate: new Date(2026, 1, 11) // 11 février 2026
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
    price: "1 200€",
    description: "L'essentiel pour démarrer proprement.",
    features: ["Site One-Page", "Design Responsive", "Formulaire de contact", "Optimisation Mobile", "Hébergement inclus"],
    highlight: false
  },
  {
    title: "Pro",
    price: "3 200€",
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