"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Salad, UtensilsCrossed, Sandwich, FishSymbol, Fish, Beef, Beer, IceCream,
  ChevronLeft, ChevronDown, Flame, Sparkles, Info, Star, ArrowRight, LayoutGrid, Smartphone,
  Wheat, Egg, Milk, ShieldAlert, X
} from "lucide-react"
import { MENU_BACKUP } from "@/lib/menu"
import { cn } from "@/lib/utils"
import { AddToCartButton } from "@/components/AddToCartButton"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FloatingCart } from "@/components/FloatingCart"

const CATEGORIES = ["Entrantes", "Tapas Variadas", "Montaditos", "Pescado Frito", "Pescado Plancha", "Carnes a la Brasa", "Postres o Helados", "Bebidas"]

const CATEGORY_DATA: Record<string, { icon: React.ReactNode, description: string, color: string, bg: string }> = {
  "Entrantes": {
    icon: <Salad className="h-8 w-8" />,
    description: "FRESCOS Y DELICIOSOS",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20"
  },
  "Tapas Variadas": {
    icon: <UtensilsCrossed className="h-8 w-8" />,
    description: "CLÁSICOS DE NUESTRA COCINA",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-500/20"
  },
  "Montaditos": {
    icon: <Sandwich className="h-8 w-8" />,
    description: "EL SABOR EN PAN CRUJIENTE",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10 dark:bg-orange-500/20"
  },
  "Pescado Frito": {
    icon: <FishSymbol className="h-8 w-8" />,
    description: "CALIDAD DE NUESTRA LONJA",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10 dark:bg-blue-500/20"
  },
  "Pescado Plancha": {
    icon: <Fish className="h-8 w-8" />,
    description: "SABOR PURO AL FUEGO",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-500/20"
  },
  "Carnes a la Brasa": {
    icon: <Beef className="h-8 w-8" />,
    description: "EXPERIENCIA A LA PARRILLA",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/10 dark:bg-red-500/20"
  },
  "Bebidas": {
    icon: <Beer className="h-8 w-8" />,
    description: "FRÍAS Y REFRESCANTES",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-500/10 dark:bg-yellow-500/20"
  },
  "Postres o Helados": {
    icon: <IceCream className="h-8 w-8" />,
    description: "EL BROCHE DE ORO DULCE",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-500/10 dark:bg-pink-500/20"
  },
}

const ALLERGEN_ICONS: Record<string, React.ReactNode> = {
  "Contiene Gluten": <Wheat className="h-full w-full" />,
  "Crustáceos": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><path d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10A10 10 0 0 0 12 2zM8 12h8" /></svg>
  ),
  "Huevos": <Egg className="h-full w-full" />,
  "Pescado": <Fish className="h-full w-full" />,
  "Cacahuetes": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><path d="M12 2a5 5 0 0 0-5 5v2a3 3 0 0 0 0 6v2a5 5 0 0 0 10 0v-2a3 3 0 0 0 0-6V7a5 5 0 0 0-5-5z" /></svg>
  ),
  "Soja": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4" /></svg>
  ),
  "Lácteos": <Milk className="h-full w-full" />,
  "Frutos de cáscara": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><circle cx="12" cy="12" r="3" /><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  ),
  "Apio": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><path d="M7 20l3-12m4 0l3 12M5 8h14" /></svg>
  ),
  "Mostaza": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><circle cx="12" cy="12" r="2" /><path d="M12 12l6 6M12 12L6 6" /></svg>
  ),
  "Granos de sésamo": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><path d="M8 6h.01M16 6h.01M12 12h.01" /></svg>
  ),
  "Dióxido de azufre y sulfitos": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><path d="M22 17H2l10-15 10 15z" /></svg>
  ),
  "Altramuces": <Egg className="h-full w-full" />,
  "Moluscos": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zM8 12h8" /></svg>
  ),
}

const ALLERGENS_LIST = [
  { name: "Contiene Gluten", label: "Gluten", color: "bg-orange-600" },
  { name: "Crustáceos", label: "Crustáceos", color: "bg-blue-500" },
  { name: "Huevos", label: "Huevos", color: "bg-yellow-500" },
  { name: "Pescado", label: "Pescado", color: "bg-blue-800" },
  { name: "Cacahuetes", label: "Cacahuetes", color: "bg-amber-800" },
  { name: "Soja", label: "Soja", color: "bg-green-700" },
  { name: "Lácteos", label: "Lácteos", color: "bg-orange-800" },
  { name: "Frutos de cáscara", label: "Frutos", color: "bg-red-900" },
  { name: "Apio", label: "Apio", color: "bg-emerald-600" },
  { name: "Mostaza", label: "Mostaza", color: "bg-yellow-700" },
  { name: "Granos de sésamo", label: "Sésamo", color: "bg-yellow-300 text-black" },
  { name: "Dióxido de azufre y sulfitos", label: "Sulfitos", color: "bg-purple-600" },
  { name: "Altramuces", label: "Altramuces", color: "bg-yellow-400 text-black" },
  { name: "Moluscos", label: "Moluscos", color: "bg-blue-400" },
]

const AllergenBadge = ({ name }: { name: string }) => {
  const config = ALLERGENS_LIST.find(a => a.name === name)
  if (!config) return null
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "h-4 w-4 rounded-full flex items-center justify-center text-white shadow-sm border border-white/20 p-0.5 shrink-0 transition-transform hover:scale-125 cursor-help",
              config.color
            )}
          >
            {ALLERGEN_ICONS[name]}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-card/95 backdrop-blur-md border-border text-[10px] font-bold uppercase tracking-widest p-2 px-3">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function QRMenuPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [excludedAllergens, setExcludedAllergens] = React.useState<string[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const toggleAllergen = (name: string) => {
    setExcludedAllergens(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    )
  }

  const categoryItems = React.useMemo(() => {
    if (!selectedCategory) return []
    let items = MENU_BACKUP[selectedCategory]?.items || []
    
    // Filtro inteligente de alérgenos
    if (excludedAllergens.length > 0) {
      items = items.filter((item: any) => {
        if (!item.alergenos || !Array.isArray(item.alergenos)) return true;
        return !item.alergenos.some((a: string) => excludedAllergens.includes(a));
      })
    }
    
    return items
  }, [selectedCategory, excludedAllergens])

  const categoryFooter = React.useMemo(() => {
    if (!selectedCategory) return null
    return MENU_BACKUP[selectedCategory]?.footer
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-emerald-950 overflow-x-hidden relative">
      
      {/* Texture Layer - Sutil para ambos modos */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
      
      {/* Image Modal Lightbox - THE SURPRISE */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative aspect-square w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <Image 
                src={selectedImage} 
                alt="Highlight" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 512px"
              />
              <div className="absolute top-6 right-6">
                <div className="h-10 w-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                    <X className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-5 py-10 pb-32 max-w-4xl">
        
        {/* Header Responsive */}
        <AnimatePresence mode="wait">
          {!selectedCategory && (
            <header className="flex flex-col items-center mb-16 text-center space-y-6">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-4 px-6 py-2 rounded-full border border-primary/20 bg-primary/5"
              >
                <Smartphone className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Carta Digital Interactiva</span>
                <Smartphone className="h-4 w-4 text-primary animate-pulse" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-3"
              >
                <h1 className="text-5xl md:text-8xl font-headline italic tracking-tighter text-foreground leading-[0.85]">
                  La Pizarra de <span className="text-primary not-italic font-sans font-black uppercase md:ml-1 tracking-[0.05em]">Titi</span>
                </h1>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <div className="h-px w-6 bg-border" />
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Desde 1968, cocinando historias para ti</p>
                    <div className="h-px w-6 bg-border" />
                </div>
              </motion.div>
            </header>
          )}
        </AnimatePresence>

        {/* Categories Grid - ADAPTABLE THEME */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "group relative h-44 rounded-[2.5rem] overflow-hidden border-2 border-border/50 bg-card hover:bg-primary/[0.03] dark:hover:bg-primary/10 hover:border-primary/40 shadow-lg md:shadow-xl transition-all flex items-center p-6 text-left",
                  )}
                >
                  {/* Subtle color flare in corner */}
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full",
                    CATEGORY_DATA[cat]?.bg
                  )} />

                  <div className="relative z-10 flex items-center gap-6 w-full">
                    <div className={cn(
                      "p-5 rounded-2xl shadow-inner border border-white/10 dark:border-black/10 group-hover:scale-110 transition-transform duration-500",
                      CATEGORY_DATA[cat]?.bg,
                      CATEGORY_DATA[cat]?.color
                    )}>
                      {CATEGORY_DATA[cat]?.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{cat}</h3>
                      <div className="flex items-center gap-2">
                        <span className="h-px w-4 bg-primary/40" />
                        <p className={cn(
                          "text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black opacity-70 group-hover:opacity-100 transition-opacity",
                          CATEGORY_DATA[cat]?.color
                        )}>
                          {CATEGORY_DATA[cat]?.description}
                        </p>
                      </div>
                    </div>
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_12px_rgba(181,201,154,0.4)] group-hover:translate-x-1 transition-all">
                      <ArrowRight className="h-5 w-5 stroke-[3]" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* Detailed Category View */
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 md:space-y-12"
            >
              {/* Top Nav - THE SURPRISE: FILTER TRIGGER */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center sticky top-2 z-50 bg-background/90 backdrop-blur-2xl px-2 py-3 -mx-2 border-b border-border shadow-md md:rounded-[2rem] md:mx-0 md:border md:mb-12 md:top-4 transition-all">
                <div className="flex justify-start pl-4">
                  {/* Espacio reservado para equilibrio visual */}
                </div>

                <div className="flex flex-col items-center justify-center">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                              <button className="flex flex-col items-center justify-center gap-2 outline-none group">
                                <motion.div 
                                  whileTap={{ scale: 0.9 }}
                                  className={cn(
                                    "p-2.5 rounded-2xl border-2 border-primary/20 bg-card shadow-lg scale-110 mb-0.5 transition-all group-hover:scale-125 group-hover:bg-primary/5 active:shadow-inner", 
                                    CATEGORY_DATA[selectedCategory!]?.color
                                  )}
                                >
                                  {React.cloneElement(CATEGORY_DATA[selectedCategory!]?.icon as any, { className: "h-6 w-6 stroke-[2.5]" })}
                                </motion.div>
                                <div className="flex items-center gap-2">
                                  <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-foreground leading-none ml-1">{selectedCategory}</h2>
                                  <ChevronDown className="h-3 w-3 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[280px] p-3 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-[2.5rem] mt-4" align="center">
                              <div className="space-y-1">
                                <div className="px-4 py-2 mb-2 border-b border-border/50">
                                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Saltar a categoría</p>
                                </div>
                                <div className="grid grid-cols-1 gap-1">
                                  {CATEGORIES.map(cat => (
                                    <button
                                      key={cat}
                                      onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsPopoverOpen(false);
                                      }}
                                      className={cn(
                                        "flex items-center gap-4 p-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all group/item",
                                        selectedCategory === cat 
                                          ? "bg-primary/10 text-primary" 
                                          : "hover:bg-primary/5 text-foreground/70 hover:text-foreground"
                                      )}
                                    >
                                      <div className={cn(
                                        "p-2 rounded-xl transition-transform group-hover/item:scale-110",
                                        selectedCategory === cat ? "bg-primary/20 shadow-none" : "bg-muted/50",
                                        CATEGORY_DATA[cat]?.color
                                      )}>
                                        {React.cloneElement(CATEGORY_DATA[cat]?.icon as any, { className: "h-4 w-4" })}
                                      </div>
                                      <span className="flex-1 text-left">{cat}</span>
                                      {selectedCategory === cat && <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                                    </button>
                                  ))}
                                </div>
                                <div className="pt-2 mt-2 border-t border-border/50">
                                  <button
                                    onClick={() => {
                                      setSelectedCategory(null);
                                      setIsPopoverOpen(false);
                                    }}
                                    className="w-full flex items-center gap-4 p-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-red-500/5 hover:text-red-500 transition-all group/back"
                                  >
                                    <div className="p-2 rounded-xl bg-muted/50 group-hover/back:bg-red-500/10 transition-colors">
                                      <LayoutGrid className="h-4 w-4" />
                                    </div>
                                    <span>Volver al inicio</span>
                                  </button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-md border-border text-[10px] font-bold uppercase tracking-widest p-2 px-3">
                        <p>Cambiar categoría</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex justify-end pr-4">
                   <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-fit h-fit">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className={cn(
                                        "flex items-center justify-center h-10 w-10 rounded-xl border border-border shadow-sm transition-all focus:outline-none relative group",
                                        excludedAllergens.length > 0 ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-card/50 text-muted-foreground hover:bg-primary/10"
                                    )}>
                                        <ShieldAlert className={cn("h-5 w-5", excludedAllergens.length > 0 ? "animate-pulse" : "")} />
                                        {excludedAllergens.length > 0 && (
                                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center font-black animate-in zoom-in">
                                                {excludedAllergens.length}
                                            </span>
                                        )}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-5 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-[2rem] mt-2" align="end">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-border pb-3">
                                            <h4 className="font-black uppercase tracking-[0.2em] text-[10px]">Restricciones</h4>
                                            {excludedAllergens.length > 0 && (
                                                <button onClick={() => setExcludedAllergens([])} className="text-[10px] text-primary font-bold underline">Limpiar</button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {ALLERGENS_LIST.map(al => (
                                                <button
                                                    key={al.name}
                                                    onClick={() => toggleAllergen(al.name)}
                                                    className={cn(
                                                        "flex items-center gap-2 p-2 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition-all",
                                                        excludedAllergens.includes(al.name) 
                                                            ? "bg-red-500/10 border-red-500/40 text-red-600"
                                                            : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                                                    )}
                                                >
                                                    <div className={cn("h-4 w-4 rounded-full p-0.5", al.color)}>
                                                        {ALLERGEN_ICONS[al.name]}
                                                    </div>
                                                    <span className="truncate">{al.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-[8px] text-muted-foreground italic text-center uppercase tracking-widest pt-2 opacity-60">Los platos no aptos se ocultarán</p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-md border-border text-[10px] font-bold uppercase tracking-widest p-2 px-3">
                          <p>Filtro de Alérgenos</p>
                        </TooltipContent>
                      </Tooltip>
                   </TooltipProvider>
                </div>
              </div>

              {/* Items List - Using Web Standard Styles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <AnimatePresence mode="popLayout">
                    {categoryItems.map((item: any, idx) => (
                    <motion.div
                        key={item.id || item.nombre}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="p-6 rounded-[2.5rem] bg-card border border-border hover:border-primary/40 shadow-sm md:shadow-md transition-all group flex flex-col justify-between"
                    >
                        <div className="flex flex-col gap-6 mb-6">
                            {item.image && (
                                <div 
                                    onClick={() => setSelectedImage(item.image)}
                                    className="relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden border border-border/50 shadow-inner cursor-zoom-in group/img"
                                >
                                    <Image 
                                        src={item.image} 
                                        alt={item.nombre} 
                                        fill 
                                        className="object-cover group-hover/img:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2 border border-white/30 text-white text-[9px] font-bold uppercase tracking-widest shadow-xl">
                                        <Sparkles className="h-3 w-3" /> Ver Detalle
                                    </div>
                                </div>
                            )}
                            
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors tracking-tight">{item.nombre}</h4>
                                    <div className="flex gap-1">
                                        {item.alergenos?.map((a: string) => (
                                            <AllergenBadge key={a} name={a} />
                                        ))}
                                    </div>
                                </div>
                                {item.desc && (
                                    <p className="text-[11px] md:text-sm text-muted-foreground leading-relaxed italic line-clamp-2 md:line-clamp-none">{item.desc}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-1 pt-5 pb-1 border-t border-border mt-auto h-auto overflow-x-auto no-scrollbar">
                            {item.prices?.tapa && (
                                <div className="w-fit">
                                    <AddToCartButton 
                                        item={{...item, name: item.nombre, category: selectedCategory}} 
                                        type="tapa"
                                        price={item.prices.tapa}
                                        showPriceOnly
                                        className="px-4"
                                    />
                                </div>
                            )}
                            {item.prices?.media && (
                                <div className="w-fit">
                                    <AddToCartButton 
                                        item={{...item, name: item.nombre, category: selectedCategory}} 
                                        type="media"
                                        price={item.prices.media}
                                        showPriceOnly
                                        className="px-4"
                                    />
                                </div>
                            )}
                            {item.prices?.racion && (
                                <div className="w-fit">
                                    <AddToCartButton 
                                        item={{...item, name: item.nombre, category: selectedCategory}} 
                                        type="racion"
                                        price={item.prices.racion}
                                        showPriceOnly
                                        className="px-4"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Informative Footer */}
              {categoryFooter && (
                <div className="mt-12 p-8 rounded-[3.5rem] bg-card border-2 border-primary/20 flex flex-col items-center text-center gap-6 mx-auto max-w-lg shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary animate-pulse">
                    <Info className="h-7 w-7" />
                  </div>
                  <p className="text-sm text-balance text-muted-foreground leading-relaxed italic">{categoryFooter}</p>
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
