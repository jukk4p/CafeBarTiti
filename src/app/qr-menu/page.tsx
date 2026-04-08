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

const CATEGORY_DATA: Record<string, { icon: React.ReactNode, description: string, color: string, border: string, bg: string }> = {
  "Entrantes": { 
    icon: <Salad className="h-8 w-8" />, 
    description: "FRESCOS Y DELICIOSOS",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10"
  },
  "Tapas Variadas": { 
    icon: <UtensilsCrossed className="h-8 w-8" />, 
    description: "CLÁSICOS DE NUESTRA COCINA",
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10"
  },
  "Montaditos": { 
    icon: <Sandwich className="h-8 w-8" />, 
    description: "EL SABOR EN PAN CRUJIENTE",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10"
  },
  "Pescado Frito": { 
    icon: <FishSymbol className="h-8 w-8" />, 
    description: "CALIDAD DE NUESTRA LONJA",
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10"
  },
  "Pescado Plancha": { 
    icon: <Fish className="h-8 w-8" />, 
    description: "SABOR PURO AL FUEGO",
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10"
  },
  "Carnes a la Brasa": { 
    icon: <Beef className="h-8 w-8" />, 
    description: "EXPERIENCIA A LA PARRILLA",
    color: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10"
  },
  "Bebidas": { 
    icon: <Beer className="h-8 w-8" />, 
    description: "FRÍAS Y REFRESCANTES",
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10"
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
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-primary selection:text-emerald-950 overflow-x-hidden relative">
      
      {/* Texture Layer - Mucho más visible para dar cuerpo */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
      
      {/* High Contrast Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[100%] h-[100%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-950/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-5 py-10 pb-32 max-w-4xl">
        
        {/* Header - Contraste Máximo */}
        <AnimatePresence mode="wait">
          {!selectedCategory && (
            <header className="flex flex-col items-center mb-16 text-center space-y-4">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-primary/10 border border-primary/20 px-4 py-1 rounded-full"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Cafe Bar Titi</span>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-1"
              >
                <h1 className="text-5xl md:text-7xl font-headline italic tracking-tighter text-white">
                   La Pizarra<br className="md:hidden" /><span className="text-primary not-italic font-sans font-black uppercase md:ml-4 tracking-[0.1em]">Titi</span>
                </h1>
                <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Desde 1968 · Tradición del Aljarafe</p>
              </motion.div>
            </header>
          )}
        </AnimatePresence>

        {/* Categories Grid - BOTONES CON CONTRASTE ALTO */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            >
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "group relative h-40 md:h-44 rounded-[2.5rem] overflow-hidden border-2 bg-slate-900/80 shadow-2xl transition-all hover:-translate-y-1 p-6 flex items-center text-left",
                    CATEGORY_DATA[cat]?.border || "border-white/10"
                  )}
                >
                  {/* Subtle color flare in corner */}
                  <div className={cn(
                    "absolute top-0 right-0 w-24 h-24 blur-[30px] opacity-40 -mr-12 -mt-12 rounded-full transition-opacity group-hover:opacity-70",
                    CATEGORY_DATA[cat]?.bg
                  )} />

                  <div className="relative z-10 flex items-center gap-6 w-full">
                    <div className={cn(
                        "p-4 rounded-2xl shadow-lg border-b-4 border-black/20 group-hover:scale-110 transition-transform duration-300",
                        CATEGORY_DATA[cat]?.bg,
                        CATEGORY_DATA[cat]?.color
                    )}>
                      {CATEGORY_DATA[cat]?.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-0.5 text-white">{cat}</h3>
                      <p className={cn(
                          "text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black opacity-60 group-hover:opacity-100 transition-opacity",
                          CATEGORY_DATA[cat]?.color
                      )}>
                        {CATEGORY_DATA[cat]?.description}
                      </p>
                    </div>
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-primary group-hover:text-emerald-950 transition-all">
                        <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* Detailed Category View */
            <motion.div 
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6 md:space-y-10"
            >
              {/* Floating Top Nav */}
              <div className="flex items-center justify-between sticky top-4 z-50 bg-slate-950/90 backdrop-blur-2xl p-4 -mx-4 border-b border-primary/20 md:rounded-[2.5rem] md:mx-0 md:border md:mb-12 shadow-2xl">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] bg-primary/10 px-5 py-3 rounded-full border border-primary/20"
                >
                  <ChevronLeft className="h-4 w-4 stroke-[3]" />
                  VOLVER
                </button>
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-xl border-b-2 border-black/20", CATEGORY_DATA[selectedCategory]?.bg, CATEGORY_DATA[selectedCategory]?.color)}>
                    {CATEGORY_DATA[selectedCategory]?.icon}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter text-white">{selectedCategory}</h2>
                </div>
              </div>

              {/* High Contrast Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {categoryItems.map((item: any, idx) => (
                  <motion.div
                    key={item.id || item.nombre}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="p-6 rounded-[2.5rem] bg-slate-900 border-2 border-slate-800 shadow-xl group relative overflow-hidden"
                  >
                    <div className="flex justify-between gap-4 mb-5">
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-bold text-xl text-white tracking-tight">{item.nombre}</h4>
                        {item.desc && (
                          <p className="text-[11px] md:text-sm text-slate-400 leading-relaxed italic line-clamp-2 md:line-clamp-none">{item.desc}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-800">
                        <div className="flex gap-4 md:gap-6">
                            {item.prices?.tapa && (
                                <div className="flex flex-col">
                                    <span className="text-[7px] uppercase tracking-[0.2em] text-primary/60 font-black mb-1">Tapa</span>
                                    <span className="text-xl font-bold text-white leading-none">{item.prices.tapa.toFixed(2)}€</span>
                                </div>
                            )}
                            {item.prices?.media && (
                                <div className="flex flex-col border-l border-slate-800 pl-4 md:pl-6">
                                    <span className="text-[7px] uppercase tracking-[0.2em] text-primary/60 font-black mb-1">Media</span>
                                    <span className="text-xl font-bold text-white leading-none">{item.prices.media.toFixed(2)}€</span>
                                </div>
                            )}
                            {item.prices?.racion && (
                                <div className="flex flex-col border-l border-slate-800 pl-4 md:pl-6">
                                    <span className="text-[7px] uppercase tracking-[0.2em] text-primary/60 font-black mb-1">Ración</span>
                                    <span className="text-xl font-bold text-white leading-none">{item.prices.racion.toFixed(2)}€</span>
                                </div>
                            )}
                        </div>
                        <AddToCartButton item={{...item, name: item.nombre, category: selectedCategory}} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Clear Informative Footer */}
              {categoryFooter && (
                <div className="mt-12 p-8 rounded-[3rem] bg-slate-900 border-2 border-primary/20 flex flex-col items-center text-center gap-4 mx-auto max-w-lg shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <Info className="h-6 w-6" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed italic">{categoryFooter}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingCart />
    </div>
  )
}
