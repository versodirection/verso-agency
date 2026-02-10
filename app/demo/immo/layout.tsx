import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arkitek | Démo Immobilier",
  description: "Démo d'un site immobilier de luxe au design minimaliste — réalisé par VERSO Agency.",
  openGraph: {
    title: "Arkitek | Démo Immobilier — VERSO Agency",
    description: "Démo d'un site immobilier de luxe au design minimaliste.",
    images: ["/image/Immo.jpg"],
  },
};

export default function ImmoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
