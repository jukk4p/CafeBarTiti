"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Salad, UtensilsCrossed, Sandwich, FishSymbol, Fish, Beef, Beer, 
  ChevronLeft, Flame, Sparkles, Info, X, Zap, ArrowRight, Star
} from "lucide-react"
import { MENU_BACKUP } from "@/lib/menu-backup"
import { cn } from "@/lib/utils"
import { AddToCartButton } from "@/components/AddToCartButton"
import { FloatingCart } from "@/components/FloatingCart"

const CATEGORIES = ["Entrantes", "Tapas Variadas", "Montaditos", "Pescado Frito", "Pescado Plancha", "Carnes a la Brasa", "Bebidas"]

const CATEGORY_DATA: Record<string, { icon: React.ReactNode, description: string, color: string, glow: string }> = {
  "Entrantes": { 
    icon: <Salad className="h-7 w-7 md:h-8 md:w-8" />, 
    description: "FRESCOS Y DELICIOSOS",
    color: "bg-emerald-500/10",
    glow: "shadow-emerald-500/20"
  },
  "Tapas Variadas": { 
    icon: <UtensilsCrossed className="h-7 w-7 md:h-8 md:w-8" />, 
    description: "CLÁSICOS DE NUESTRA COCINA",
    color: "bg-amber-500/10",
    glow: "shadow-amber-500/20"
  },
  "Montaditos": { 
    icon: <Sandwich className="h-7 w-7 md:h-8 md:w-8" />, 
    description: "EL SABOR EN PAN CRUJIENTE",
    color: "bg-orange-500/10",
    glow: "shadow-orange-500/20"
  },
  "Pescado Frito": { 
    icon: <FishSymbol className="h-7 w-7 md:h-8 md:w-8" />, 
    description: "CALIDAD DE NUESTRA LONJA",
    color: "bg-blue-500/10",
    glow: "shadow-blue-500/20"
  },
  "Pescado Plancha": { 
    icon: <Fish className="h-7 w-7 md:h-8 md:w-8" />, 
    description: "SABOR PURO AL FUEGO",
    color: "from-cyan-500/10",
    glow: "shadow-cyan-500/20"
  },
  "Carnes a la Brasa": { 
    icon: <Beef className="h-7 w-7 md:h-8 md:w-8" />, 
    description: "EXPERIENCIA A LA PARRILLA",
    color: "from-red-500/10",
    glow: "shadow-red-500/20"
  },
  "Bebidas": { 
    icon: <Beer className="h-7 w-7 md:h-8 md:w-8" />, 
    description: "FRÍAS Y REFRESCANTES",
    color: "from-yellow-500/10",
    glow: "shadow-yellow-500/20"
  },
}

export default function QRMenuPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  const categoryItems = React.useMemo(() => {
    if (!selectedCategory) return []
    return MENU_BACKUP[selectedCategory]?.items || []
  }, [selectedCategory])

  const categoryFooter = React.useMemo(() => {
    if (!selectedCategory) return null
    return MENU_BACKUP[selectedCategory]?.footer
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-[#070b0a] text-emerald-50 font-sans selection:bg-primary selection:text-emerald-950 overflow-x-hidden relative">
      
      {/* Texture Layer - Papel antiguo / Pizarra sutil */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      
      {/* Mood Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-5 py-10 pb-32 max-w-4xl">
        
        {/* Header - Mas Tabernero */}
        <AnimatePresence mode="wait">
          {!selectedCategory && (
            <header className="flex flex-col items-center mb-16 text-center space-y-6">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-4 transition-all"
              >
                <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-primary/40" />
                <Flame className="h-5 w-5 md:h-6 md:w-6 text-primary animate-pulse" />
                <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-primary/40" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-2"
              >
                <h1 className="text-5xl md:text-7xl font-headline italic tracking-tight text-white drop-shadow-[0_0_15px_rgba(181,201,154,0.3)]">
                  La Pizarra <span className="text-primary not-italic font-sans font-black uppercase text-2xl md:text-3xl block md:inline-block md:ml-2 tracking-[0.2em]">Titi</span>
                </h1>
                <div className="flex items-center justify-center gap-3">
                    <Star className="h-3 w-3 text-primary/40" />
                    <p className="text-primary/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Tradición desde 1968</p>
                    <Star className="h-3 w-3 text-primary/40" />
                </div>
              </motion.div>
            </header>
          )}
        </AnimatePresence>

        {/* Categories Grid */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            >
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.04, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "group relative h-40 md:h-44 rounded-[2rem] overflow-hidden border border-white/[0.08] bg-white/[0.04] shadow-2xl transition-all hover:bg-white/[0.08] hover:border-primary/30 flex items-center p-6 text-left ring-1 ring-white/5",
                    CATEGORY_DATA[cat]?.glow
                  )}
                >
                  {/* Glass Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
                  
                  {/* Category Accent Color */}
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-20 -mr-16 -mt-16 rounded-full group-hover:opacity-40 transition-opacity",
                    CATEGORY_DATA[cat]?.color
                  )} />

                  <div className="relative z-10 flex items-center gap-6 w-full">
                    <div className="p-4 bg-emerald-950/50 rounded-2xl shadow-inner border border-white/5 group-hover:bg-primary group-hover:text-emerald-950 transition-all duration-500 scale-100 group-hover:scale-110">
                      {CATEGORY_DATA[cat]?.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{cat}</h3>
                      <div className="flex items-center gap-2">
                        <span className="h-px w-4 bg-primary/40" />
                        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-primary/60 font-black group-hover:text-white transition-colors">
                          {CATEGORY_DATA[cat]?.description}
                        </p>
                      </div>
                    </div>
                    <ChevronLeft className="h-5 w-5 text-primary/20 group-hover:text-primary transition-all rotate-180 group-hover:translate-x-1" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* Category Expanded View - Mas "Carta" */
            <motion.div 
              key="details"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="space-y-6 md:space-y-10"
            >
              {/* Top Bar Navigation */}
              <div className="flex items-center justify-between sticky top-4 z-50 bg-[#070b0a]/90 backdrop-blur-2xl p-4 -mx-4 border-b border-white/10 md:rounded-[2.5rem] md:mx-0 md:border md:mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary/10 px-5 py-3 rounded-full transition-all active:scale-90"
                >
                  <ChevronLeft className="h-4 w-4 stroke-[3]" />
                  VOLVER
                </button>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
                    {CATEGORY_DATA[selectedCategory]?.icon}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter text-white">{selectedCategory}</h2>
                </div>
              </div>

              {/* Items List - Card Design Improved */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {categoryItems.map((item: any, idx) => (
                  <motion.div
                    key={item.id || item.nombre}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="p-6 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-primary/40 transition-all group relative overflow-hidden active:bg-white/[0.08]"
                  >
                    <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex justify-between gap-4 mb-5">
                      <div className="space-y-2 flex-1">
                        <h4 className="font-bold text-xl text-white group-hover:text-primary transition-colors tracking-tight">{item.nombre}</h4>
                        {item.desc && (
                          <p className="text-[11px] md:text-sm text-emerald-500/50 leading-relaxed italic line-clamp-2 md:line-clamp-none">{item.desc}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
                        <div className="flex gap-5">
                            {item.prices?.tapa && (
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-widest text-[#b5c99a]/40 font-black mb-1">Tapa</span>
                                    <span className="text-lg font-bold text-white leading-none">{item.prices.tapa.toFixed(2)}€</span>
                                </div>
                            )}
                            {item.prices?.media && (
                                <div className="flex flex-col border-l border-white/5 pl-5">
                                    <span className="text-[8px] uppercase tracking-widest text-[#b5c99a]/40 font-black mb-1">Media</span>
                                    <span className="text-lg font-bold text-white leading-none">{item.prices.media.toFixed(2)}€</span>
                                </div>
                            )}
                            {item.prices?.racion && (
                                <div className="flex flex-col border-l border-white/5 pl-5">
                                    <span className="text-[8px] uppercase tracking-widest text-[#b5c99a]/40 font-black mb-1">Ración</span>
                                    <span className="text-lg font-bold text-white leading-none">{item.prices.racion.toFixed(2)}€</span>
                                </div>
                            )}
                        </div>
                        <AddToCartButton item={{...item, name: item.nombre, category: selectedCategory}} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Informative Footer */}
              {categoryFooter && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 p-8 rounded-[3rem] bg-emerald-950/20 border border-primary/10 flex flex-col items-center text-center gap-4 mx-auto max-w-lg shadow-2xl"
                >
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary animate-bounce-slow">
                    <Info className="h-6 w-6" />
                  </div>
                  <p className="text-sm text-[#b5c99a]/80 leading-relaxed italic">{categoryFooter}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingCart />
      
      {/* Bottom Visual Bar */}
      {!selectedCategory && (
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      )}
    </div>
  )
}
