import type { Metadata } from "next";
// Suppression des imports client
// Garde uniquement PreloaderWrapper
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://www.verso-agency.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VERSO Agency | Création de Sites Internet & Applications Web à Toulouse",
    template: "%s | VERSO Agency",
  },
  description:
    "Agence web à Toulouse experte en création de sites vitrines, e-commerce et applications web performantes. Design sur-mesure, Next.js, React. Devis gratuit.",
  keywords: [
    "agence web toulouse",
    "création site internet toulouse",
    "développeur web freelance",
    "site vitrine toulouse",
    "e-commerce toulouse",
    "application web sur mesure",
    "react next.js toulouse",
    "refonte site web",
    "création site vitrine",
    "développement web",
  ],
  authors: [{ name: "VERSO Agency", url: SITE_URL }],
  creator: "VERSO Agency",
  publisher: "VERSO Agency",
  category: "technology",

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "VERSO Agency | Le web sur mesure, tout simplement.",
    description:
      "Agence web à Toulouse — Sites vitrines, e-commerce et applications web performantes. Devis gratuit.",
    url: SITE_URL,
    siteName: "VERSO Agency",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/linkimage.png",
        width: 1200,
        height: 630,
        alt: "VERSO Agency — Création de sites internet à Toulouse",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VERSO Agency | Agence Web Toulouse",
    description:
      "Création de sites internet et applications web performantes à Toulouse.",
    images: ["/linkimage.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ajout logique Preloader global
  // Next.js 13+ : usePathname
  // On ne montre pas le Preloader sur /demo/* ou /mentions-legales
  // On ne montre pas si verso-skip-preloader
  // On ne montre pas sur SSR


  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        {/* ...existing code... */}
      </body>
    </html>
  );
}