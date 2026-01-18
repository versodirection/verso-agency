import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 👇 TA CONFIGURATION SEO
// 👇 TA CONFIGURATION SEO
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
  
  // 👇 C'EST ICI QU'IL FAUT AJOUTER LES ICÔNES
  icons: {
    icon: '/icon.png',          // L'icône classique (onglet navigateur)
    apple: '/apple-icon.png',   // L'icône spéciale pour le Dock Mac et iPhone
  },

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}

        {/* 👇 SECRET SEO : LE PASSEPORT GOOGLE (JSON-LD) */}
        {/* Ce script dit à Google que tu es un business local actif autour de Toulouse */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "VERSO Agency",
              "image": "https://www.verso-agency.fr/icon.png",
              "@id": "https://www.verso-agency.fr",
              "url": "https://www.verso-agency.fr",
              "telephone": "+33660481692",
              "email": "contact@verso-agency.fr",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "8 cours du barry",
                "addressLocality": "Pechbonnieu",
                "postalCode": "31140",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.697, 
                "longitude": 1.467
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "priceRange": "$$",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 43.6047, // Centre de Toulouse
                  "longitude": 1.4442
                },
                "geoRadius": "30000" // Rayon de 30km (Couvre tout Toulouse et banlieue)
              }
            })
          }}
        />
      </body>
    </html>
  );
}