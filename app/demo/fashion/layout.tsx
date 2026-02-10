import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aether | Démo E-Commerce",
  description: "Démo d'une boutique e-commerce moderne optimisée pour la conversion mobile — réalisé par VERSO Agency.",
  openGraph: {
    title: "Aether | Démo E-Commerce — VERSO Agency",
    description: "Démo d'une boutique e-commerce moderne optimisée pour la conversion mobile.",
    images: ["/image/Aether.jpg"],
  },
};

export default function FashionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
