import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.verso-agency.fr'),
  title: {
    default: "VERSO Agency | Création de Sites Internet & Applications Web à Toulouse",
    template: "%s | VERSO Agency"
  },
  description: "Agence web experte en création de sites vitrines, e-commerce et applications web performantes. Transformez votre vision en réalité digitale.",
  keywords: ["Agence web", "Création site internet", "Développeur web", "Freelance", "React", "Next.js", "Toulouse", "Site vitrine", "E-commerce"],
  authors: [{ name: "VERSO Agency" }],
  creator: "VERSO Agency",
  
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },

  // 👇 C'EST ICI LA CORRECTION POUR L'IMAGE 👇
  openGraph: {
    title: "VERSO Agency | L'ingénierie web sans compromis",
    description: "Nous créons le futur du web pour des entreprises ambitieuses.",
    url: 'https://www.verso-agency.fr',
    siteName: 'VERSO Agency',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/linkimage.png', // Nomme ton image ainsi dans le dossier PUBLIC
        width: 1200,
        height: 630,
        alt: 'Verso Agency - Création Web Toulouse',
      },
    ],
  },
  // 👇 AJOUTE AUSSI ÇA POUR TWITTER/X 👇
  twitter: {
    card: 'summary_large_image',
    title: "VERSO Agency | Agence Web Toulouse",
    description: "Création de sites internet et applications web performantes.",
    images: ['/linkimage.png'], // La même image
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "VERSO Agency",
              "image": "https://www.verso-agency.fr/opengraph-image.png", // J'ai mis ton image OG ici aussi
              "@id": "https://www.verso-agency.fr",
              "url": "https://www.verso-agency.fr",
              "telephone": "+33 7 68 29 66 12", // J'ai corrigé le "++33" en "+33"
              "email": "contact@verso-agency.fr",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4 Rue Jacques Labatut", // J'ai retiré le "16" qui semblait être une erreur de copie ?
                "addressLocality": "Toulouse",
                "postalCode": "31100",
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
                  "latitude": 43.6047,
                  "longitude": 1.4442
                },
                "geoRadius": "30000"
              }
            })
          }}
        />
      </body>
    </html>
  );
}