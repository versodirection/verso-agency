
"use client";

import React from "react";

import { Check, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { siteConfig } from "@/app/data/content";
import { MaskText } from "../ui/MaskText";
import { TiltCard } from "../ui/TiltCard";
import { Magnetic } from "../ui/Magnetic";

interface ContactProps {
  showAnimations: boolean;
  cursorEnter: () => void;
  cursorLeave: () => void;
  formMessage: string;
  setFormMessage: (msg: string) => void;
  formStatus: "idle" | "loading" | "success" | "error";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// Déclaration TypeScript pour window.grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function Contact({ showAnimations, cursorEnter, cursorLeave, formMessage, setFormMessage, formStatus, onSubmit }: ContactProps) {
  // Ajout du script reCAPTCHA v3 invisible côté client
  React.useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("recaptcha-script")) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=6Lds6XQsAAAAAPAKwost5mnr73sa6ZXDKrii2pz0";
      script.async = true;
      script.defer = true;
      script.id = "recaptcha-script";
      document.body.appendChild(script);
    }
  }, []);

  // Nouvelle fonction pour gérer la soumission avec reCAPTCHA v3
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha?.execute("6Lds6XQsAAAAAPAKwost5mnr73sa6ZXDKrii2pz0", { action: "submit" })
          .then((token: string) => {
            // On transmet le token au backend via un champ caché
            const form = e.target as HTMLFormElement;
            let input = form.querySelector('input[name="g-recaptcha-response"]') as HTMLInputElement;
            if (!input) {
              input = document.createElement('input');
              input.type = 'hidden';
              input.name = 'g-recaptcha-response';
              form.appendChild(input);
            }
            input.value = token;
            onSubmit(e);
          })
          .catch(() => {
            onSubmit(e);
          });
      });
    } else {
      onSubmit(e);
    }
  };
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-[90%] 2xl:max-w-[1800px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <MaskText enabled={showAnimations}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Projet ambitieux ?</h2>
          </MaskText>
          <p className="text-neutral-400 text-xl mb-12">Discutons de comment propulser votre marque au niveau supérieur.</p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                <Mail className="text-indigo-500" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Email</p>
                <p className="font-medium">{siteConfig.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                <Phone className="text-indigo-500" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Téléphone</p>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="font-medium hover:text-indigo-400 transition">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                <MapPin className="text-indigo-500" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Bureau</p>
                <p className="font-medium">{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </div>

        <TiltCard className="bg-neutral-900 p-8 md:p-12 rounded-3xl border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-6" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium text-neutral-400">Prénom</label>
                <input id="contact-name" type="text" name="name" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition cursor-text" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-lastname" className="text-sm font-medium text-neutral-400">Nom</label>
                <input id="contact-lastname" type="text" name="lastname" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition cursor-text" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium text-neutral-400">Email</label>
              <input id="contact-email" type="email" name="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition cursor-text" placeholder="john@company.com" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium text-neutral-400">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition resize-none cursor-text"
                placeholder="Parlez-nous de votre projet..."
                required
              />
            {/* Google reCAPTCHA v3 invisible : le token est généré dynamiquement */}
            </div>

            <Magnetic>
              <button
                type="submit"
                disabled={formStatus === "loading" || formStatus === "success"}
                className={`w-full font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 ${formStatus === "success" ? "bg-emerald-600 text-white" : "bg-white text-black hover:bg-gray-200"}`}
              >
                {formStatus === "loading" && <Loader2 className="animate-spin" size={20} />}
                {formStatus === "success" && <Check size={20} />}
                {formStatus === "success" ? "Message envoyé" : formStatus === "loading" ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </Magnetic>

            {formStatus === "error" && <p className="text-red-500 text-sm text-center">Une erreur est survenue. Réessayez plus tard.</p>}
          </form>
        </TiltCard>
      </div>
    </section>
  );
}
