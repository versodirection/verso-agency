import type { Metadata } from "next";
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
    title: "VERSO Agency | L'ingénierie web sans compromis",
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
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}

        {/* Schema.org — LocalBusiness + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "VERSO Agency",
                  description:
                    "Agence web à Toulouse — Création de sites vitrines, e-commerce et applications web performantes.",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: "fr-FR",
                },
                {
                  "@type": ["LocalBusiness", "ProfessionalService"],
                  "@id": `${SITE_URL}/#organization`,
                  name: "VERSO Agency",
                  url: SITE_URL,
                  logo: `${SITE_URL}/linkimage.png`,
                  image: `${SITE_URL}/linkimage.png`,
                  description:
                    "Agence web à Toulouse spécialisée en création de sites vitrines, e-commerce et applications web sur mesure.",
                  telephone: "+33768296612",
                  email: "contact@verso-agency.fr",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Toulouse",
                    addressRegion: "Occitanie",
                    postalCode: "31000",
                    addressCountry: "FR",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 43.6047,
                    longitude: 1.4442,
                  },
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "09:00",
                    closes: "18:00",
                  },
                  priceRange: "€€",
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5",
                    reviewCount: "2",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  areaServed: {
                    "@type": "GeoCircle",
                    geoMidpoint: {
                      "@type": "GeoCoordinates",
                      latitude: 43.6047,
                      longitude: 1.4442,
                    },
                    geoRadius: "50000",
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Services web",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Création de site vitrine",
                          description: "Design responsive sur mesure, SEO-friendly et performant.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Création de site e-commerce",
                          description:
                            "Boutique en ligne optimisée pour la conversion et le mobile.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Développement d'applications web",
                          description: "SaaS, tableaux de bord et outils métier sur mesure.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Refonte de site web",
                          description:
                            "Modernisation et optimisation de sites existants.",
                        },
                      },
                    ],
                  },
                  knowsAbout: [
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Création de sites internet",
                    "E-commerce",
                    "Applications web",
                    "SEO",
                  ],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}