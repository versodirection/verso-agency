import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales du site verso-agency.fr — Informations sur l'éditeur, l'hébergement, la propriété intellectuelle et la politique de données.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
