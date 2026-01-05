"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ShoppingBag, X, Search, ArrowRight, User, 
  Menu, Sparkles, Zap, Heart, Plus, Minus, Share2, Info
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

// --- DATA PRODUITS ---
const products = [
  {
    id: 1,
    name: "GLOSSY PUFFER",
    price: 89.90,
    category: "JACKETS",
    image: "/products/03411510800-e1.jpg", 
    sizes: ["XS", "S", "M", "L"],
    tag: "HOT",
    ref: "REF. 8712/001",
    description: "Doudoune courte à finition brillante ultra-légère. Col montant et manches longues finies par élastique. Poches avant passepoilées.",
    composition: "Extérieur: 100% Nylon / Rembourrage: 100% Polyester recyclé"
  },
  {
    id: 2,
    name: "PASTEL DENIM",
    price: 49.90,
    category: "BOTTOMS",
    image: "/products/01300900620-e1.jpg",
    sizes: ["34", "36", "38", "40"],
    tag: "NEW",
    ref: "REF. 4432/102",
    description: "Jean taille haute coupe droite. Effet délavé rose pastel. Cinq poches, fermeture par zip et bouton métallique.",
    composition: "100% Coton organique"
  },
  {
    id: 3,
    name: "KNIT HALTER",
    price: 29.90,
    category: "TOPS",
    image: "/products/hautzara.jpg",
    sizes: ["XS", "S", "M"],
    tag: null,
    ref: "REF. 0021/329",
    description: "Top en maille côtelée avec encolure américaine. Dos nageur et finition sans coutures apparentes.",
    composition: "Viscose 80%, Polyamide 20%"
  },
  {
    id: 4,
    name: "WOOL OVERCOAT",
    price: 159.00,
    category: "JACKETS",
    image: "/products/02949150800-e1.jpg",
    sizes: ["S", "M", "L", "XL"],
    tag: "PREMIUM",
    ref: "REF. 9921/404",
    description: "Manteau long confectionné en mélange de laine Manteco. Col à revers et manches longues. Fermeture croisée.",
    composition: "75% Laine, 25% Polyamide"
  },
  {
    id: 5,
    name: "STRIPED PANTS",
    price: 59.90,
    category: "BOTTOMS",
    image: "/products/01300310400-e1.jpg",
    sizes: ["30", "32", "34", "36"],
    tag: null,
    ref: "REF. 7721/112",
    description: "Pantalon style carpenter à rayures hickory. Coupe large, poches plaquées au dos et boucle marteau.",
    composition: "100% Coton Heavyweight"
  },
  {
    id: 6,
    name: "HALF-ZIP KNIT",
    price: 69.90,
    category: "TOPS",
    image: "/products/05536312737-e1.jpg",
    sizes: ["S", "M", "L"],
    tag: "COZY",
    ref: "REF. 3321/992",
    description: "Pull en maille douce avec col montant zippé. Coupe relax et finitions bord-côte épaisses.",
    composition: "Laine mérinos 50%, Acrylique 50%"
  },
  {
    id: 7,
    name: "SCARF SHIRT",
    price: 45.90,
    category: "TOPS",
    image: "/products/05813054803-e1.jpg",
    sizes: ["XS", "S", "M", "L"],
    tag: "ARTY",
    ref: "REF. 1102/331",
    description: "Chemise fluide avec détail foulard intégré au col. Tissu satiné mat et boutons dissimulés.",
    composition: "100% Viscose Ecovero"
  },
  {
    id: 8,
    name: "TAILORED STRIPE",
    price: 59.90,
    category: "BOTTOMS",
    image: "/products/05792052017-e1.jpg",
    sizes: ["36", "38", "40", "42"],
    tag: null,
    ref: "REF. 8821/002",
    description: "Pantalon de costume à rayures tennis. Pinces sur le devant et poches latérales.",
    composition: "Polyester recyclé 60%, Viscose 40%"
  },
  {
    id: 9,
    name: "CLASSIC LOAFER",
    price: 89.90,
    category: "SHOES",
    image: "/products/13535610700-e1.jpg",
    sizes: ["40", "41", "42", "43", "44"],
    tag: "LEATHER",
    ref: "REF. 2201/552",
    description: "Mocassins en cuir brillant. Détail barrette sur le devant. Semelle épaisse crantée.",
    composition: "100% Cuir bovin"
  },
  {
    id: 10,
    name: "SUEDE BOAT",
    price: 79.90,
    category: "SHOES",
    image: "/products/12512610700-e1.jpg",
    sizes: ["39", "40", "41", "42", "43"],
    tag: null,
    ref: "REF. 1102/441",
    description: "Chaussures bateau en croûte de cuir. Lacets en cuir et semelle gomme contrastante.",
    composition: "100% Cuir suédé"
  }
];

const categories = ["ALL", "JACKETS", "TOPS", "BOTTOMS", "SHOES"];

export default function NexusUltimatePink() {
  // États Globaux
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  
  // États UI (Modals & Drawers)
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Données utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<{id: number, size: string, qty: number}[]>([]);
  const [toast, setToast] = useState<{show: boolean, msg: string, type: 'success' | 'info'}>({show: false, msg: "", type: 'info'});

  // Scroll Animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Filtrage
  const filteredProducts = useMemo(() => {
    let res = activeCategory === "ALL" ? products : products.filter(p => p.category === activeCategory);
    if(searchQuery) {
        res = res.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return res;
  }, [activeCategory, searchQuery]);

  // Actions Panier
  const addToCart = (product: any, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) return prev.map(item => item.id === product.id && item.size === size ? {...item, qty: item.qty + 1} : item);
      return [...prev, { id: product.id, size, qty: 1 }];
    });
    setCartOpen(true);
    triggerToast(`Added ${product.name} (${size})`, 'success');
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const triggerToast = (msg: string, type: 'success' | 'info' = 'info') => {
    setToast({show: true, msg, type});
    setTimeout(() => setToast(prev => ({...prev, show: false})), 3000);
  };

  const cartTotal = cart.reduce((acc, item) => {
    const p = products.find(prod => prod.id === item.id);
    return acc + (p ? p.price * item.qty : 0);
  }, 0);

  // Bloquer le scroll
  useEffect(() => {
      if(selectedProduct || cartOpen || searchOpen || accountOpen) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset';
      }
  }, [selectedProduct, cartOpen, searchOpen, accountOpen]);

  return (
    <div className="min-h-screen bg-[#EBE9E4] text-[#2C2420] font-sans selection:bg-[#FF0055] selection:text-white overflow-x-hidden">
      
      {/* --- BACKGROUND DYNAMIQUE (PINK EDITION) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#FFC0CB] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF0055] rounded-full mix-blend-multiply filter blur-[140px] opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* --- FLOATING DOCK (NAVIGATION) --- */}
      <motion.nav 
         initial={{ y: 100 }} animate={{ y: 0 }}
         className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2C2420] text-[#EBE9E4] px-8 py-4 rounded-full shadow-2xl flex items-center gap-10"
      >
         <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-[#FF0055] transition-colors"><Sparkles size={20} /></button>
         
         <div className="h-5 w-[1px] bg-white/20"></div>

         <button onClick={() => setCartOpen(true)} className="relative hover:text-[#FF0055] transition-colors group">
            <ShoppingBag size={20} className="group-hover:-translate-y-1 transition-transform"/>
            {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF0055] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cart.length}
                </span>
            )}
         </button>

         <button onClick={() => setSearchOpen(true)} className="hover:text-[#FF0055] transition-colors"><Search size={20} /></button>
         
         <button onClick={() => setAccountOpen(true)} className="relative hover:text-[#FF0055] transition-colors">
             <User size={20} />
             {isLoggedIn && <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF0055] rounded-full ring-2 ring-[#2C2420]"></span>}
         </button>
      </motion.nav>

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-[#EBE9E4]">
         {/* CORRECTION ICI : Ajout de l'ancre #demos pour revenir à la bonne section */}
         {/* Si ta section s'appelle autrement (ex: #work), change le lien ci-dessous */}
         <Link href="/#demos" className="text-sm font-bold uppercase tracking-widest hover:opacity-50 flex items-center gap-2">
            <ArrowRight size={16} className="rotate-180"/> VERSO.
         </Link>
         
         <h1 
           className="text-3xl font-black uppercase tracking-tighter cursor-pointer" 
           onClick={() => { setActiveCategory("ALL"); setSearchQuery(""); }}
         >
            AETHER<span className="text-[#FF0055]">.</span>
         </h1>
         <span className="text-xs font-mono hidden md:block opacity-60">ARCHIVE COLLECTION 2025</span>
      </header>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="relative z-10 pt-32 pb-40 px-4 md:px-12 max-w-[1800px] mx-auto">
        
        {/* HERO SECTION */}
        <section className="mb-24 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 z-10">
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                    <span className="bg-[#FF0055] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 inline-block">New Drop</span>
                    <h2 className="text-[12vw] leading-[0.8] font-black uppercase text-[#2C2420] tracking-tighter">
                        Pink<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] to-[#FF8DA1]">Obsession</span>
                    </h2>
                </motion.div>
                <div className="mt-8 flex gap-4">
                    <button onClick={() => {setActiveCategory('JACKETS'); document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}} className="px-6 py-3 border border-[#2C2420] rounded-full text-xs font-bold uppercase hover:bg-[#2C2420] hover:text-[#EBE9E4] transition-colors">
                        Explore Outerwear
                    </button>
                </div>
            </div>
            
            {/* Vidéo Organique */}
            <div className="w-full md:w-[450px] aspect-[4/5] relative group cursor-pointer">
                <div className="absolute inset-0 bg-[#2C2420] rounded-[40px] rotate-3 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
                     <video 
                        autoPlay loop muted playsInline 
                        className="w-full h-full object-cover opacity-90"
                        src="https://videos.pexels.com/video-files/4939598/4939598-hd_1080_1920_25fps.mp4" 
                     />
                </div>
                <div className="absolute -z-10 bottom-10 -left-10 w-40 h-40 bg-[#FF0055] rounded-full blur-2xl opacity-40 animate-pulse"></div>
            </div>
        </section>

        {/* FILTRES (STICKY) */}
        <div id="shop" className="sticky top-4 z-30 mb-16 flex justify-center">
            <div className="bg-[#EBE9E4]/80 backdrop-blur-xl p-1.5 rounded-full border border-black/5 shadow-lg inline-flex gap-1 overflow-x-auto max-w-full">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap
                            ${activeCategory === cat ? "bg-[#2C2420] text-[#FF0055] shadow-md" : "bg-transparent text-gray-500 hover:bg-white hover:text-black"}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* GRILLE PRODUITS */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        key={product.id}
                        className="group relative"
                    >
                        {/* CARTE PRODUIT */}
                        <div 
                            onClick={() => setSelectedProduct(product)}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 relative aspect-[3/4] cursor-pointer"
                        >
                            {/* TAG */}
                            {product.tag && (
                                <div className="absolute top-4 left-4 z-20">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider
                                        ${product.tag === 'HOT' ? 'bg-[#FF0055] text-white' : 'bg-black text-white'}
                                    `}>
                                        {product.tag}
                                    </span>
                                </div>
                            )}

                            {/* IMAGE */}
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />

                            {/* OVERLAY QUICK ADD */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <div 
                                    className="bg-[#EBE9E4]/95 backdrop-blur p-4 rounded-3xl translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-lg"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <p className="text-[9px] font-bold text-center uppercase mb-3 text-gray-500 tracking-widest">Quick Add</p>
                                    <div className="flex justify-center gap-2">
                                        {product.sizes.map(size => (
                                            <button 
                                                key={size}
                                                onClick={() => addToCart(product, size)}
                                                className="w-8 h-8 rounded-full border border-[#2C2420] flex items-center justify-center text-[10px] font-bold hover:bg-[#2C2420] hover:text-[#FF0055] transition-all uppercase focus:bg-[#2C2420] focus:text-[#FF0055]"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="mt-4 px-2 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wide cursor-pointer hover:underline" onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{product.category}</p>
                            </div>
                            <span className="font-mono text-sm bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{product.price.toFixed(2)}€</span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
      </main>

      {/* --- PRODUCT DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedProduct && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setSelectedProduct(null)}
                    className="fixed inset-0 z-[80] bg-[#2C2420]/60 backdrop-blur-sm"
                />
                
                <motion.div 
                    initial={{ opacity: 0, y: 100, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 100, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed inset-0 m-auto z-[90] w-full max-w-5xl h-[90vh] md:h-[80vh] bg-[#EBE9E4] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Colonne Image */}
                    <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-white relative">
                         <img src={selectedProduct.image} className="w-full h-full object-cover mix-blend-normal" />
                         <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 p-2 bg-white/50 backdrop-blur rounded-full md:hidden">
                            <X size={20}/>
                         </button>
                    </div>

                    {/* Colonne Infos */}
                    <div className="w-full md:w-1/2 h-full overflow-y-auto p-8 md:p-12 bg-[#EBE9E4] relative flex flex-col">
                         <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full hidden md:block transition-colors">
                            <X size={24}/>
                         </button>

                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#2C2420] text-[#FF0055] px-2 py-1 rounded-md">
                                    {selectedProduct.category}
                                </span>
                                {selectedProduct.tag && (
                                    <span className="text-[10px] font-bold uppercase tracking-widest border border-[#2C2420] px-2 py-1 rounded-md">
                                        {selectedProduct.tag}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 text-[#2C2420]">
                                {selectedProduct.name}
                            </h2>
                            <p className="text-xs font-mono text-gray-500 mb-6">{selectedProduct.ref}</p>

                            <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8 font-medium">
                                {selectedProduct.description}
                            </p>

                            <div className="mb-8">
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Info size={12}/> Composition & Care
                                </h4>
                                <p className="text-xs text-gray-500 bg-white p-3 rounded-xl border border-black/5">
                                    {selectedProduct.composition}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-3">Select Size</h4>
                                <div className="flex flex-wrap gap-3">
                                    {selectedProduct.sizes.map((size: string) => (
                                        <button 
                                            key={size}
                                            onClick={() => addToCart(selectedProduct, size)}
                                            className="w-12 h-12 rounded-xl border-2 border-[#2C2420] flex items-center justify-center text-sm font-bold hover:bg-[#2C2420] hover:text-[#FF0055] transition-all uppercase focus:bg-[#2C2420] focus:text-[#FF0055]"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                         </div>

                         <div className="border-t border-black/10 pt-6 flex items-center justify-between gap-6">
                            <div className="text-2xl font-mono font-bold">
                                {selectedProduct.price.toFixed(2)}€
                            </div>
                            <button 
                                onClick={() => addToCart(selectedProduct, selectedProduct.sizes[0])}
                                className="flex-1 bg-[#2C2420] text-[#EBE9E4] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#FF0055] hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
                            >
                                Add to Bag <ArrowRight size={18}/>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      {/* --- DRAWERS --- */}

      {/* SEARCH */}
      <AnimatePresence>
        {searchOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-[#2C2420]/95 backdrop-blur-xl flex flex-col items-center justify-center p-8"
            >
                <button onClick={() => setSearchOpen(false)} className="absolute top-8 right-8 text-[#EBE9E4] hover:rotate-90 transition-transform">
                    <X size={32} />
                </button>
                <h3 className="text-[#FF0055] font-mono text-xs uppercase mb-4 tracking-widest">Global Search</h3>
                <input 
                    autoFocus
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="TYPE TO SEARCH..." 
                    className="bg-transparent border-b-2 border-[#EBE9E4]/20 text-[#EBE9E4] text-4xl md:text-6xl font-black uppercase text-center focus:border-[#FF0055] outline-none w-full max-w-4xl py-4 transition-colors placeholder:text-[#EBE9E4]/10"
                />
            </motion.div>
        )}
      </AnimatePresence>

      {/* ACCOUNT */}
      <AnimatePresence>
        {accountOpen && (
            <>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setAccountOpen(false)} className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" />
                <motion.div 
                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                    className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#EBE9E4] z-[70] shadow-2xl border-l border-white/50 p-8 flex flex-col"
                >
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-xl font-black uppercase">Account</h2>
                        <button onClick={() => setAccountOpen(false)}><X size={24}/></button>
                    </div>

                    {!isLoggedIn ? (
                        <div className="flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-2">Member Access.</h3>
                            <p className="text-sm text-gray-500 mb-8">Enter your credentials to access the archive.</p>
                            <input className="bg-white p-4 rounded-xl mb-4 text-sm outline-none border border-transparent focus:border-[#2C2420]" placeholder="Email" />
                            <input className="bg-white p-4 rounded-xl mb-6 text-sm outline-none border border-transparent focus:border-[#2C2420]" type="password" placeholder="Password" />
                            <button onClick={() => {setIsLoggedIn(true); triggerToast("Welcome back!", "success");}} className="bg-[#2C2420] text-[#EBE9E4] py-4 rounded-xl font-bold uppercase hover:bg-[#FF0055] hover:text-white transition-colors shadow-lg">
                                Enter
                            </button>
                        </div>
                    ) : (
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-black/5">
                                <div className="w-12 h-12 bg-[#FF0055] rounded-full flex items-center justify-center font-bold text-xl text-white">J</div>
                                <div>
                                    <p className="font-bold">Joan Diaz</p>
                                    <p className="text-xs text-gray-400">VIP Member</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {['Orders', 'Wishlist', 'Returns', 'Settings'].map(item => (
                                    <button key={item} className="w-full text-left p-4 bg-white rounded-xl font-bold uppercase text-xs hover:bg-[#2C2420] hover:text-[#FF0055] transition-colors flex justify-between group">
                                        {item} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setIsLoggedIn(false)} className="w-full mt-8 p-4 border border-red-200 text-red-500 rounded-xl font-bold uppercase text-xs hover:bg-red-50">
                                Disconnect
                            </button>
                        </div>
                    )}
                </motion.div>
            </>
        )}
      </AnimatePresence>

      {/* CART */}
      <AnimatePresence>
        {cartOpen && (
            <>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setCartOpen(false)} className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" />
                <motion.div 
                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                    className="fixed top-0 right-0 h-full w-full max-w-md bg-[#EBE9E4] z-[70] shadow-2xl border-l border-white/50 flex flex-col"
                >
                    <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-black uppercase">Bag <span className="text-white bg-[#FF0055] px-2 py-0.5 rounded-full text-xs align-middle ml-2">{cart.length}</span></h2>
                        <button onClick={() => setCartOpen(false)}><X size={24}/></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-40">
                                <ShoppingBag size={64} className="mb-4 text-[#2C2420]"/>
                                <p className="font-bold uppercase tracking-widest text-xs">Your bag is empty</p>
                            </div>
                        ) : (
                            cart.map((item, i) => {
                                const p = products.find(x => x.id === item.id);
                                if (!p) return null;
                                return (
                                    <motion.div layout key={i} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-black/5">
                                        <img src={p.image} className="w-20 h-24 object-cover rounded-xl bg-gray-50 mix-blend-multiply" />
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-xs uppercase pr-2">{p.name}</h4>
                                                <span className="font-mono text-xs font-bold">{p.price.toFixed(2)}€</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-md uppercase">Size: {item.size}</span>
                                                    <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-md">Qty: {item.qty}</span>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id, item.size)} className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                                    <X size={14}/>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })
                        )}
                    </div>

                    <div className="p-6 bg-white border-t border-gray-100">
                        <div className="flex justify-between mb-4 text-sm font-bold uppercase">
                            <span>Total Estimate</span>
                            <span>{cartTotal.toFixed(2)}€</span>
                        </div>
                        <button className="w-full bg-[#2C2420] text-[#EBE9E4] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#FF0055] hover:text-white transition-colors shadow-lg flex items-center justify-center gap-2">
                            Secure Checkout <ArrowRight size={16}/>
                        </button>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast.show && (
            <motion.div 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border
                    ${toast.type === 'success' ? 'bg-[#2C2420] text-[#FF0055] border-[#2C2420]' : 'bg-white text-black border-gray-200'}
                `}
            >
                <div className={`w-2 h-2 rounded-full animate-pulse ${toast.type === 'success' ? 'bg-[#FF0055]' : 'bg-black'}`}></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{toast.msg}</span>
            </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}