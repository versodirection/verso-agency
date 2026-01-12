"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ShoppingBag, X, Search, ArrowRight, User, 
  Sparkles, Info
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // 👈 IMPORT IMPORTANT

// --- DATA PRODUITS (Tes données restent identiques) ---
const products = [
    {
      id: 1,
      name: "URBAN CHECK OVERSHIRT",
      price: 65.00,
      category: "TOPS",
      image: "/products/shirt-check.jpg", 
      sizes: ["M", "L", "XL"],
      tag: "STREET",
      ref: "REF. 8712/001",
      description: "Surchemise à carreaux style urbain. Coupe décontractée idéale pour le layering. Tissu flanelle doux.",
      composition: "100% Coton"
    },
    {
      id: 2,
      name: "SATIN SUNSET DRESS",
      price: 120.00,
      category: "DRESSES",
      image: "/products/dress-orange.jpg",
      sizes: ["XS", "S", "M"],
      tag: "HOT",
      ref: "REF. 4432/102",
      description: "Robe de soirée en satin fluide. Teinte orange brûlé captant la lumière. Dos nu élégant.",
      composition: "100% Satin de viscose"
    },
    {
      id: 3,
      name: "VINTAGE LEATHER JACKET",
      price: 189.90,
      category: "JACKETS",
      image: "/products/jacket-cuir.jpg",
      sizes: ["S", "M", "L", "XL"],
      tag: "CLASSIC",
      ref: "REF. 0021/329",
      description: "Veste style cuir patiné. Coupe trucker vintage. Indémodable et robuste.",
      composition: "100% Cuir Végan"
    },
    {
      id: 4,
      name: "SEQUIN PARTY PANTS",
      price: 85.00,
      category: "BOTTOMS",
      image: "/products/pant-party.jpg",
      sizes: ["34", "36", "38"],
      tag: "NIGHT",
      ref: "REF. 9921/404",
      description: "Pantalon à sequins texturé. Coupe fluide pour capter la lumière en mouvement.",
      composition: "Polyester / Sequins"
    },
    {
      id: 5,
      name: "GLITTER NIGHT DRESS",
      price: 95.00,
      category: "DRESSES",
      image: "/products/dress-party.jpg",
      sizes: ["S", "M", "L"],
      tag: "NEW",
      ref: "REF. 7721/112",
      description: "Robe courte scintillante. Parfaite pour les soirées. Coupe ajustée.",
      composition: "Mélange Lurex"
    },
    {
      id: 6,
      name: "NOIR FEDORA SET",
      price: 55.00,
      category: "ACCESSORIES", 
      image: "/products/hat-black.jpg",
      sizes: ["One Size"],
      tag: null,
      ref: "REF. 3321/992",
      description: "Chapeau Fedora noir en feutre. L'accessoire ultime pour terminer une silhouette.",
      composition: "100% Feutre de laine"
    },
    {
      id: 7,
      name: "GREY SCALE BLAZER",
      price: 110.00,
      category: "JACKETS",
      image: "/products/blaser.jpg",
      sizes: ["48", "50", "52", "54"],
      tag: "WORK",
      ref: "REF. 1102/331",
      description: "Blazer gris structuré. Coupe moderne ajustée. Idéal pour un look business casual.",
      composition: "60% Laine, 40% Polyester"
    },
    {
      id: 8,
      name: "PLEATED PINK CHINO",
      price: 49.90,
      category: "BOTTOMS",
      image: "/products/pants-pink.jpg",
      sizes: ["30", "32", "34"],
      tag: "SUMMER",
      ref: "REF. 8821/002",
      description: "Pantalon chino à pinces couleur vieux rose. Coupe confortable et élégante.",
      composition: "Coton léger"
    },
    {
      id: 9,
      name: "ARTISTIC VELVET TOP",
      price: 45.00,
      category: "TOPS",
      image: "/products/top-velvet.jpg",
      sizes: ["S", "M", "L"],
      tag: "ARTY",
      ref: "REF. 2201/552",
      description: "Haut texturé sombre. Une pièce forte au design minimaliste et artistique.",
      composition: "Velours de soie"
    },
    {
      id: 10,
      name: "MODERN DUO SUIT",
      price: 250.00,
      category: "SUITS",
      image: "/products/suit.jpg",
      sizes: ["48", "50", "52"],
      tag: "PREMIUM",
      ref: "REF. 5501/DUO",
      description: "Ensemble tailleur moderne. Coupe unisexe et lignes épurées.",
      composition: "Laine Froide"
    },
    {
      id: 11,
      name: "SUEDE VEST BROWN",
      price: 69.90,
      category: "TOPS",
      image: "/products/vest-brown.jpg",
      sizes: ["M", "L"],
      tag: "VINTAGE",
      ref: "REF. 1102/441",
      description: "Gilet sans manches en suédine marron. Inspiration vintage workwear.",
      composition: "Similicuir suédé"
    }
  ];

  const categories = ["ALL", "JACKETS", "TOPS", "BOTTOMS", "DRESSES", "SUITS"];

export default function NexusUltimatePink() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<{id: number, size: string, qty: number}[]>([]);
  const [toast, setToast] = useState<{show: boolean, msg: string, type: 'success' | 'info'}>({show: false, msg: "", type: 'info'});
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const filteredProducts = useMemo(() => {
    let res = activeCategory === "ALL" ? products : products.filter(p => p.category === activeCategory);
    if(searchQuery) res = res.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return res;
  }, [activeCategory, searchQuery]);

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

  useEffect(() => {
      if(selectedProduct || cartOpen || searchOpen || accountOpen) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset';
      }
  }, [selectedProduct, cartOpen, searchOpen, accountOpen]);

  useEffect(() => {
    if(selectedProduct && selectedProduct.sizes.length > 0) {
        setSelectedSize(selectedProduct.sizes[0]);
    }
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-[#EBE9E4] text-[#2C2420] font-sans selection:bg-[#FF0055] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#FFC0CB] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF0055] rounded-full mix-blend-multiply filter blur-[140px] opacity-20 animate-pulse delay-1000"></div>
      </div>

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

      <header className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-[#EBE9E4]">
         <Link href="/#demos" className="text-sm font-bold uppercase tracking-widest hover:opacity-50 flex items-center gap-2">
            <ArrowRight size={16} className="rotate-180"/> VERSO.
         </Link>
         <h1 className="text-3xl font-black uppercase tracking-tighter cursor-pointer" onClick={() => { setActiveCategory("ALL"); setSearchQuery(""); }}>
            AETHER<span className="text-[#FF0055]">.</span>
         </h1>
         <span className="text-xs font-mono hidden md:block opacity-60">ARCHIVE COLLECTION 2025</span>
      </header>

      <main className="relative z-10 pt-32 pb-40 px-4 md:px-12 max-w-[1800px] mx-auto">
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
            
            <div className="w-full md:w-[450px] aspect-[4/5] relative group cursor-pointer">
                <div className="absolute inset-0 bg-[#2C2420] rounded-[40px] rotate-3 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
                     <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" src="https://videos.pexels.com/video-files/4939598/4939598-hd_1080_1920_25fps.mp4" />
                </div>
                <div className="absolute -z-10 bottom-10 -left-10 w-40 h-40 bg-[#FF0055] rounded-full blur-2xl opacity-40 animate-pulse"></div>
            </div>
        </section>

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

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} key={product.id} className="group relative">
                        <div onClick={() => setSelectedProduct(product)} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 relative aspect-[3/4] cursor-pointer">
                            {product.tag && (
                                <div className="absolute top-4 left-4 z-20">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${product.tag === 'HOT' ? 'bg-[#FF0055] text-white' : 'bg-black text-white'}`}>
                                        {product.tag}
                                    </span>
                                </div>
                            )}
                            {/* 👇 IMAGE OPTIMISÉE */}
                            <Image 
                                src={product.image} 
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <div className="bg-[#EBE9E4]/95 backdrop-blur p-4 rounded-3xl translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-lg" onClick={(e) => e.stopPropagation()}>
                                    <p className="text-[9px] font-bold text-center uppercase mb-3 text-gray-500 tracking-widest">Quick Add</p>
                                    <div className="flex justify-center gap-2">
                                        {product.sizes.map(size => (
                                            <button key={size} onClick={() => addToCart(product, size)} className="w-8 h-8 rounded-full border border-[#2C2420] flex items-center justify-center text-[10px] font-bold hover:bg-[#2C2420] hover:text-[#FF0055] transition-all uppercase focus:bg-[#2C2420] focus:text-[#FF0055]">
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
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

      <AnimatePresence>
        {selectedProduct && (
            <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 z-[80] bg-[#2C2420]/60 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, y: 100, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.95 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed inset-0 m-auto z-[90] w-full max-w-5xl h-[90vh] md:h-[80vh] bg-[#EBE9E4] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-white relative">
                         {/* 👇 IMAGE OPTIMISÉE */}
                         <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover mix-blend-normal" />
                         <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 p-2 bg-white/50 backdrop-blur rounded-full md:hidden z-10"><X size={20}/></button>
                    </div>
                    <div className="w-full md:w-1/2 h-full overflow-y-auto p-8 md:p-12 bg-[#EBE9E4] relative flex flex-col">
                         <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full hidden md:block transition-colors"><X size={24}/></button>
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#2C2420] text-[#FF0055] px-2 py-1 rounded-md">{selectedProduct.category}</span>
                                {selectedProduct.tag && <span className="text-[10px] font-bold uppercase tracking-widest border border-[#2C2420] px-2 py-1 rounded-md">{selectedProduct.tag}</span>}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 text-[#2C2420]">{selectedProduct.name}</h2>
                            <p className="text-xs font-mono text-gray-500 mb-6">{selectedProduct.ref}</p>
                            <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8 font-medium">{selectedProduct.description}</p>
                            <div className="mb-8">
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2"><Info size={12}/> Composition & Care</h4>
                                <p className="text-xs text-gray-500 bg-white p-3 rounded-xl border border-black/5">{selectedProduct.composition}</p>
                            </div>
                            <div className="mb-8">
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-3">Select Size</h4>
                                <div className="flex flex-wrap gap-3">
                                    {selectedProduct.sizes.map((size: string) => (
                                        <button key={size} onClick={() => setSelectedSize(size)} className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all uppercase ${selectedSize === size ? "bg-[#2C2420] text-[#FF0055] border-[#2C2420]" : "border-[#2C2420] text-[#2C2420] hover:bg-[#2C2420] hover:text-[#FF0055]"}`}>{size}</button>
                                    ))}
                                </div>
                            </div>
                         </div>
                         <div className="border-t border-black/10 pt-6 flex items-center justify-between gap-6">
                            <div className="text-2xl font-mono font-bold">{selectedProduct.price.toFixed(2)}€</div>
                            <button onClick={() => addToCart(selectedProduct, selectedSize)} className="flex-1 bg-[#2C2420] text-[#EBE9E4] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#FF0055] hover:text-white transition-all shadow-xl flex items-center justify-center gap-2">Add to Bag <ArrowRight size={18}/></button>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#2C2420]/95 backdrop-blur-xl flex flex-col items-center pt-24 px-8">
                <button onClick={() => setSearchOpen(false)} className="absolute top-8 right-8 text-[#EBE9E4] hover:rotate-90 transition-transform"><X size={32} /></button>
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <h3 className="text-[#FF0055] font-mono text-xs uppercase mb-4 tracking-widest">Global Search</h3>
                    <input autoFocus type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="TYPE TO SEARCH..." className="bg-transparent border-b-2 border-[#EBE9E4]/20 text-[#EBE9E4] text-3xl md:text-6xl font-black uppercase text-center focus:border-[#FF0055] outline-none w-full py-4 transition-colors placeholder:text-[#EBE9E4]/10 mb-12"/>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 pb-20">
                        {searchQuery.length > 0 && products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={product.id} onClick={() => { setSelectedProduct(product); setSearchOpen(false); setSearchQuery(""); }} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl cursor-pointer border border-white/5 transition-colors group">
                                <Image src={product.image} alt={product.name} width={64} height={80} className="object-cover rounded-lg" />
                                <div><h4 className="text-[#EBE9E4] font-bold uppercase text-sm group-hover:text-[#FF0055] transition-colors">{product.name}</h4><p className="text-gray-400 text-xs font-mono">{product.price.toFixed(2)}€</p></div>
                                <ArrowRight className="ml-auto text-gray-500 group-hover:text-[#FF0055] transition-colors" size={16}/>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
            <>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setCartOpen(false)} className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" />
                <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#EBE9E4] z-[70] shadow-2xl border-l border-white/50 flex flex-col">
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
                                        <Image src={p.image} alt={p.name} width={80} height={96} className="object-cover rounded-xl bg-gray-50 mix-blend-multiply" />
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
                                                <button onClick={() => removeFromCart(item.id, item.size)} className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><X size={14}/></button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })
                        )}
                    </div>
                    <div className="p-6 bg-white border-t border-gray-100">
                        <div className="flex justify-between mb-4 text-sm font-bold uppercase"><span>Total Estimate</span><span>{cartTotal.toFixed(2)}€</span></div>
                        <button className="w-full bg-[#2C2420] text-[#EBE9E4] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#FF0055] hover:text-white transition-colors shadow-lg flex items-center justify-center gap-2">Secure Checkout <ArrowRight size={16}/></button>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast.show && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border ${toast.type === 'success' ? 'bg-[#2C2420] text-[#FF0055] border-[#2C2420]' : 'bg-white text-black border-gray-200'}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${toast.type === 'success' ? 'bg-[#FF0055]' : 'bg-black'}`}></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{toast.msg}</span>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}