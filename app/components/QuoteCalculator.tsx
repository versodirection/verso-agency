"use client";

import { useState, useEffect } from "react"; 
import { motion, useMotionValue } from "framer-motion"; // 👇 MODIF : useMotionValue
import { 
  X, Check, ArrowRight, ArrowLeft, Loader2, 
  Layout, ShoppingBag, Rocket, RefreshCcw, 
  File, Layers, Library, Globe, 
  Zap, Palette, 
  Search, Newspaper, Calendar, Mail 
} from "lucide-react";

// ... (Ton tableau "questions" reste identique, je ne le remets pas pour économiser de la place, il ne change pas)
const questions = [
  {
    id: "type",
    title: "Quel type de projet ?",
    options: [
      { label: "Site Vitrine (Présentation)", value: 900, icon: <Layout className="w-6 h-6" /> },
      { label: "E-Commerce (Shopify)", value: 2400, icon: <ShoppingBag className="w-6 h-6" /> },
      { label: "Application Web / SaaS", value: 5000, icon: <Rocket className="w-6 h-6" /> },
      { label: "Refonte de site existant", value: 1200, icon: <RefreshCcw className="w-6 h-6" /> },
    ]
  },
  {
    id: "pages",
    title: "Volume de pages",
    options: [
      { label: "Site One-Page (1 page)", value: 0, icon: <File className="w-6 h-6" /> },
      { label: "Petit Site (2 à 5 pages)", value: 400, icon: <Layers className="w-6 h-6" /> },
      { label: "Site Complet (5 à 10 pages)", value: 800, icon: <Library className="w-6 h-6" /> },
      { label: "Gros Site (10+ pages)", value: 1600, icon: <Globe className="w-6 h-6" /> },
    ]
  },
  {
    id: "design",
    title: "Niveau de Design & Animations",
    options: [
      { label: "Standard (Propre & Efficace)", value: 0, icon: <Zap className="w-6 h-6" /> },
      { label: "Premium (Animations avancées)", value: 600, icon: <Palette className="w-6 h-6" /> },
    ]
  },
  {
    id: "extras",
    title: "Fonctionnalités bonus (Optionnel)",
    multi: true,
    options: [
      { label: "Rédaction SEO & Textes", value: 500, icon: <Search className="w-6 h-6" /> },
      { label: "Module Blog / Actualités", value: 400, icon: <Newspaper className="w-6 h-6" /> },
      { label: "Système de Réservation", value: 500, icon: <Calendar className="w-6 h-6" /> },
      { label: "Newsletter / Capture Email", value: 200, icon: <Mail className="w-6 h-6" /> },
    ]
  }
];

export default function QuoteCalculator({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<any>({});
  const [total, setTotal] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // --- LOGIQUE CURSEUR ---
  // 👇 MODIF : Remplacement useSpring par useMotionValue
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);
  // -----------------------

  const handleSelect = (questionId: string, value: number, optionLabel: string, isMulti: boolean) => {
    let newSelections = { ...selections };
    let currentTotal = total;

    if (isMulti) {
      const currentList = newSelections[questionId] || [];
      const exists = currentList.find((item: any) => item.label === optionLabel);

      if (exists) {
        newSelections[questionId] = currentList.filter((item: any) => item.label !== optionLabel);
        currentTotal -= value;
      } else {
        newSelections[questionId] = [...currentList, { label: optionLabel, value }];
        currentTotal += value;
      }
    } else {
      const previousValue = newSelections[questionId]?.value || 0;
      currentTotal -= previousValue;
      newSelections[questionId] = { label: optionLabel, value };
      currentTotal += value;
      
      if (step < questions.length - 1 && !isMulti) {
        setTimeout(() => setStep(step + 1), 250);
      }
    }

    setSelections(newSelections);
    setTotal(currentTotal);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const summary = Object.keys(selections).map(key => {
        const sel = selections[key];
        if (Array.isArray(sel)) return `${key}: ${sel.map((s:any) => s.label).join(', ')}`;
        return `${key}: ${sel.label}`;
    }).join('\n');

    const finalData = {
        ...data,
        subject: `NOUVEAU DEVIS : ${total}€`,
        message: `ESTIMATION CLIENT : ${total}€\n\nDétails du projet :\n${summary}\n\nMessage client : ${data.message || "Aucun"}`
    };

    try {
        const response = await fetch("https://formspree.io/f/mkogqyla", { 
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        });

        if (response.ok) {
            setFormStatus('success');
            setTimeout(onClose, 3000);
        }
    } catch (error) {
        setFormStatus('idle');
    }
  };

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-none">
      
      {/* --- LE CURSEUR --- */}
      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[11000] hidden md:flex items-center justify-center" 
        style={{ translateX: "-50%", translateY: "-50%", x: cursorX, y: cursorY }}
      >
        <div className="w-5 h-5 bg-white rounded-full mix-blend-difference" />
      </motion.div>
      {/* ------------------ */}

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative z-[10001]"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-neutral-900">
          <div>
            <h2 className="text-xl font-bold text-white">Estimez votre projet</h2>
            <p className="text-xs text-neutral-400">Prix indicatifs pour lancement</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition"><X className="text-white" size={20} /></button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            {!isLastStep ? (
                <div className="space-y-6">
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-indigo-500" 
                            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                        />
                    </div>

                    <h3 className="text-2xl font-bold text-white">{currentQuestion.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentQuestion.options.map((option) => {
                            const isSelected = currentQuestion.multi 
                                ? selections[currentQuestion.id]?.find((i: any) => i.label === option.label)
                                : selections[currentQuestion.id]?.label === option.label;

                            return (
                                <button
                                    key={option.label}
                                    type="button"
                                    onClick={() => handleSelect(currentQuestion.id, option.value, option.label, currentQuestion.multi || false)}
                                    className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 group
                                        ${isSelected 
                                            ? "bg-indigo-600 border-indigo-500 text-white" 
                                            : "bg-white/5 border-white/10 text-neutral-300 hover:border-indigo-500/50 hover:bg-white/10"
                                        }
                                    `}
                                >
                                    <span className={`transition-colors ${isSelected ? "text-white" : "text-indigo-400 group-hover:text-indigo-300"}`}>
                                        {option.icon}
                                    </span>
                                    
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">{option.label}</span>
                                        <span className="text-xs opacity-60">{option.value === 0 ? "Inclus" : `+${option.value}€`}</span>
                                    </div>
                                    {isSelected && <Check className="ml-auto" size={16}/>}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                /* FORMULAIRE FINAL */
                <form onSubmit={handleSubmit} className="space-y-6 text-center">
                    {formStatus === 'success' ? (
                        <div className="py-10">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={32} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Bien reçu !</h3>
                            <p className="text-neutral-400 text-sm">On regarde ça et on revient vers toi sous 24h.</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl mb-6">
                                <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mb-2">Estimation Totale</p>
                                <div className="text-4xl font-black text-white">{total}€</div>
                                <p className="text-xs text-neutral-500 mt-2">*Prix indicatif, à affiner ensemble.</p>
                            </div>
                            
                            <p className="text-neutral-400 text-sm mb-6">Laissez-nous vos coordonnées pour valider cette offre.</p>
                            
                            <div className="space-y-3 text-left">
                                <div><label className="text-xs uppercase text-neutral-500 font-bold ml-2">Email</label><input required type="email" name="email" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition" placeholder="contact@..." /></div>
                                <div><label className="text-xs uppercase text-neutral-500 font-bold ml-2">Téléphone</label><input type="tel" name="phone" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition" placeholder="06..." /></div>
                                <div><label className="text-xs uppercase text-neutral-500 font-bold ml-2">Message</label><textarea name="message" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none h-20 resize-none transition" placeholder="Détails supplémentaires..." /></div>
                            </div>

                            <button type="submit" disabled={formStatus === 'loading'} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2 mt-4">
                                {formStatus === 'loading' ? <Loader2 className="animate-spin" size={20}/> : "Recevoir mon devis gratuit"}
                            </button>
                        </>
                    )}
                </form>
            )}
        </div>

        {/* FOOTER */}
        {!isLastStep && (
            <div className="p-4 border-t border-white/5 flex justify-between items-center bg-neutral-900">
                <div className="text-white font-bold">{total}€</div>
                <div className="flex gap-2">
                    {step > 0 && (
                        <button onClick={() => setStep(step - 1)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center gap-2 text-xs font-bold">Retour</button>
                    )}
                    {step < questions.length && (
                        <button onClick={() => setStep(step + 1)} className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2 text-xs">Suivant <ArrowRight size={14}/></button>
                    )}
                </div>
            </div>
        )}
      </motion.div>
    </div>
  );
}