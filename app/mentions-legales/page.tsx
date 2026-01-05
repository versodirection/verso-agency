"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-indigo-500 selection:text-white pt-24 pb-20 px-6">
      
      {/* NAVBAR SIMPLE */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-20 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition">
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto space-y-12">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Mentions Légales</h1>

        {/* SECTION 1 : ÉDITEUR */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-4">1. Éditeur du site</h2>
          <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5 space-y-2 text-neutral-400">
            <p><strong className="text-white">Dénomination :</strong> VERSO AGENCY</p>
            <p><strong className="text-white">Forme juridique :</strong> Micro-entreprise</p>
            <p><strong className="text-white">Adresse du siège :</strong> 8 cours du barry, 31140, Pechbonnieu</p>
            <p><strong className="text-white">SIRET :</strong> [TON NUMERO SIRET]</p>
            <p><strong className="text-white">Directeur de la publication :</strong> M. Diaz Joan</p>
            <p><strong className="text-white">Email :</strong> verso.direction@gmail.com</p>
            <p><strong className="text-white">Téléphone :</strong> 06 60 48 16 92</p>
            <p><strong className="text-white">TVA Intracommunautaire :</strong> TVA non applicable, art. 293 B du CGI</p>
          </div>
        </section>

        {/* SECTION 2 : HÉBERGEMENT */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-4">2. Hébergement</h2>
          <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5 text-neutral-400">
            <p>Le site est hébergé par :</p>
            <p className="mt-2"><strong className="text-white">Vercel Inc.</strong></p>
            <p>440 N Barranca Ave #4133</p>
            <p>Covina, CA 91723</p>
            <p>États-Unis</p>
          </div>
        </section>

        {/* SECTION 3 : PROPRIÉTÉ INTELLECTUELLE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-4">3. Propriété Intellectuelle</h2>
          <p className="text-neutral-400 leading-relaxed">
            L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. 
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
        </section>

        {/* SECTION 4 : DONNÉES & COOKIES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-4">4. Données et Cookies</h2>
          <p className="text-neutral-400 leading-relaxed">
            <strong>Cookies :</strong> Ce site vitrine n'utilise aucun cookie de traçage publicitaire ou d'analyse. Vous pouvez naviguer en toute tranquillité sans être pisté.
          </p>
          <p className="text-neutral-400 leading-relaxed mt-4">
            <strong>Formulaire :</strong> Les informations envoyées via le formulaire de contact (Nom, Email) ne sont utilisées que pour répondre à votre demande commerciale. Elles ne sont jamais revendues à des tiers.
          </p>
        </section>

      </div>
    </main>
  );
}