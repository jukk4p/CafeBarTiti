"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Salad, UtensilsCrossed, Sandwich, FishSymbol, Fish, Beef, Beer, 
  ChevronLeft, Flame, Sparkles, ShoppingBasket, Info 
} from "lucide-react"
import { MENU_BACKUP } from "@/lib/menu-backup"
import { cn } from "@/lib/utils"
import { AddToCartButton } from "@/components/AddToCartButton"
import { FloatingCart } from "@/components/FloatingCart"

const CATEGORIES = ["Entrantes", "Tapas Variadas", "Montaditos", "Pescado Frito", "Pescado Plancha", "Carnes a la Brasa", "Bebidas"]

const CATEGORY_DATA: Record<string, { icon: React.ReactNode, description: string, color: string }> = {
  "Entrantes": { 
    icon: <Salad className="h-8 w-8" />, 
    description: "Para empezar con ganas",
    color: "from-emerald-500/20 to-emerald-900/40"
  },
  "Tapas Variadas": { 
    icon: <UtensilsCrossed className="h-8 w-8" />, 
    description: "Nuestros clásicos de siempre",
    color: "from-amber-500/20 to-amber-900/40"
  },
  "Montaditos": { 
    icon: <Sandwich className="h-8 w-8" />, 
    description: "Pequeños bocados de gloria",
    color: "from-orange-500/20 to-orange-900/40"
  },
  "Pescado Frito": { 
    icon: <FishSymbol className="h-8 w-8" />, 
    description: "Directo de la lonja al aceite",
    color: "from-blue-500/20 to-blue-900/40"
  },
  "Pescado Plancha": { 
    icon: <Fish className="h-8 w-8" />, 
    description: "Sabor puro a mar",
    color: "from-cyan-500/20 to-cyan-900/40"
  },
  "Carnes a la Brasa": { 
    icon: <Beef className="h-8 w-8" />, 
    description: "El aroma de nuestra brasa",
    color: "from-red-500/20 to-red-900/40"
  },
  "Bebidas": { 
    icon: <Beer className="h-8 w-8" />, 
    description: "Frías y refrescantes",
    color: "from-yellow-500/20 to-yellow-900/40"
  },
}

export default function QRMenuPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  // Filtrar items por categoría
  const categoryItems = React.useMemo(() => {
    if (!selectedCategory) return []
    return MENU_BACKUP.categories.find(c => c.name === selectedCategory)?.items || []
  }, [selectedCategory])

  const categoryFooter = React.useMemo(() => {
    if (!selectedCategory) return null
    return MENU_BACKUP.categories.find(c => c.name === selectedCategory)?.footer
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-[#050a09] text-emerald-50 font-sans selection:bg-primary selection:text-emerald-950 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 pb-32">
        {/* Header Custom */}
        <header className="flex flex-col items-center mb-12 text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3 mb-4"
          >
            <Flame className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-primary/80">Cafe Bar Titi</span>
            <Flame className="h-6 w-6 text-primary animate-pulse" />
          </motion.div>
          <motion.h1 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-headline italic mb-2"
          >
            La Pizarra Digital
          </motion.h1>
          <p className="text-emerald-500/40 text-[10px] font-bold uppercase tracking-[0.2em]">Tradición del Aljarafe desde 1968</p>
        </header>

        {/* Main Grid View */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "group relative h-48 rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.03] backdrop-blur-xl transition-all hover:bg-white/[0.06] hover:border-primary/20 p-6 flex flex-col justify-between text-left",
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    CATEGORY_DATA[cat].color
                  )} />
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary group-hover:text-emerald-950 transition-colors duration-500">
                      {CATEGORY_DATA[cat].icon}
                    </div>
                    <Sparkles className="h-4 w-4 text-primary/20 group-hover:text-primary transition-colors duration-500" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-1 tracking-tight">{cat}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-500/40 font-bold group-hover:text-primary/60 transition-colors">
                      {CATEGORY_DATA[cat].description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* Category Expanded View */
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Top Bar for Detailed View */}
              <div className="flex items-center justify-between sticky top-4 z-50 bg-[#050a09]/80 backdrop-blur-xl p-4 -mx-4 border-b border-white/5 md:rounded-3xl md:mx-0 md:border md:mb-8">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-primary/10 px-4 py-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Volver a la Pizarra
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {CATEGORY_DATA[selectedCategory].icon}
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">{selectedCategory}</h2>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryItems.map((item: any, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex justify-between gap-4 mb-4">
                      <div className="space-y-1 flex-1">
                        <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h4>
                        {item.description && (
                          <p className="text-xs text-emerald-500/50 leading-relaxed italic">{item.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex gap-4">
                            {item.prices.tapa && (
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-widest text-emerald-500/30 font-bold">Tapa</span>
                                    <span className="text-primary font-bold">{item.prices.tapa.toFixed(2)}€</span>
                                </div>
                            )}
                            {item.prices.media && (
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-widest text-emerald-500/30 font-bold">Media</span>
                                    <span className="text-primary font-bold">{item.prices.media.toFixed(2)}€</span>
                                </div>
                            )}
                            {item.prices.racion && (
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-widest text-emerald-500/30 font-bold">Ración</span>
                                    <span className="text-primary font-bold">{item.prices.racion.toFixed(2)}€</span>
                                </div>
                            )}
                        </div>
                        <AddToCartButton item={item} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer Note */}
              {categoryFooter && (
                <div className="mt-8 p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-start gap-4 mx-auto max-w-xl">
                  <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-500/70 leading-relaxed italic">{categoryFooter}</p>
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
