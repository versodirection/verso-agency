import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gustavo | Démo Restaurant",
  description: "Démo d'un site restaurant immersif avec menu digital et module de réservation — réalisé par VERSO Agency.",
  openGraph: {
    title: "Gustavo | Démo Restaurant — VERSO Agency",
    description: "Démo d'un site restaurant immersif avec menu digital et module de réservation.",
    images: ["/image/gustavo.jpg"],
  },
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
