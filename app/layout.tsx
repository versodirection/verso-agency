import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 👇 TA CONFIGURATION SEO (ETAPE 1)
export const metadata: Metadata = {
  metadataBase: new URL('https://www.verso-agency.fr'),
  title: {
    default: "VERSO Agency | Création de Sites Web & Applications Sur-Mesure",
    template: "%s | VERSO Agency"
  },
  description: "Agence web experte en création de sites vitrines, e-commerce et applications web performantes. Transformez votre vision en réalité digitale.",
  keywords: ["Agence web", "Création site internet", "Développeur web", "Freelance", "React", "Next.js", "Toulouse", "Site vitrine", "E-commerce"],
  authors: [{ name: "VERSO Agency" }],
  creator: "VERSO Agency",
  openGraph: {
    title: "VERSO Agency | L'ingénierie web sans compromis",
    description: "Nous créons le futur du web pour des entreprises ambitieuses.",
    url: 'https://www.verso-agency.fr',
    siteName: 'VERSO Agency',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// 👇 LA PARTIE QUI MANQUAIT (L'affichage de la page)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}