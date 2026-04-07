
"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AddToCartButton } from "@/components/AddToCartButton"
import { FloatingCart } from "@/components/FloatingCart"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Utensils,
  Fish,
  Beef,
  Sandwich,
  Info,
  Sparkles,
  ShieldAlert,
  Wheat,
  Milk,
  Egg,
  Flame,
  Star,
  ChevronDown,
  Soup,
  ChefHat,
  Salad,
  FishSymbol,
  UtensilsCrossed,
  X,
  Zap,
  MapPin,
  Beer,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Plus,
  Minus,
  Settings2
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase"
import { collection } from "firebase/firestore"
import { MENU_BACKUP } from "@/lib/menu-backup"
import { Loader2, ShoppingBasket } from "lucide-react"
import { useCart, OrderType } from "@/context/CartContext"
import { FadeIn, FadeInStagger } from "@/components/FadeIn"

const CATEGORIES = ["Entrantes", "Tapas Variadas", "Montaditos", "Pescado Frito", "Pescado Plancha", "Carnes a la Brasa", "Bebidas"]

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Entrantes": <Salad className="h-5 w-5" strokeWidth={1.75} />,
  "Tapas Variadas": <UtensilsCrossed className="h-5 w-5" strokeWidth={1.75} />,
  "Montaditos": <Sandwich className="h-5 w-5" strokeWidth={1.75} />,
  "Pescado Frito": <FishSymbol className="h-5 w-5" strokeWidth={1.75} />,
  "Pescado Plancha": <Fish className="h-5 w-5" strokeWidth={1.75} />,
  "Carnes a la Brasa": <Beef className="h-5 w-5" strokeWidth={1.75} />,
  "Bebidas": <Beer className="h-5 w-5" strokeWidth={1.75} />,
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
};

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
];
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState("Entrantes")
  const [selectedItem, setSelectedItem] = React.useState<any>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [excludedAllergens, setExcludedAllergens] = React.useState<string[]>([])
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const { firestore } = useFirebase()
  const { addItem, updateQuantity, items } = useCart()

  const toggleAllergen = (name: string) => {
    setExcludedAllergens(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    )
  }

  // Control de scroll inteligente para el selector de menú
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Si scrolleamos hacia abajo más de 200px, ocultamos. Si subimos, mostramos.
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Suscribirse a la colección de platos en tiempo real
  const menuQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return collection(firestore, "menuItems")
  }, [firestore])

  const { data: menuItems, isLoading } = useCollection(menuQuery)

  // Organizar los platos por categoría para el renderizado
  const displayedMenu = React.useMemo(() => {
    const hasFirebaseData = menuItems && menuItems.length > 0
    const organized: Record<string, any> = {}

    CATEGORIES.forEach(cat => {
      // 1. Filtramos de Firebase o Backup para esta categoría (insensible a mayúsculas/espacios)
      const targetCat = cat.trim().toLowerCase();

      let items = hasFirebaseData ? menuItems.filter(item => {
        const itemCat = (item.categoria || item.category || "").trim().toLowerCase();
        return itemCat === targetCat;
      }) : (MENU_BACKUP[cat]?.items || [])

      // 2. Filtro de Búsqueda
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase()
        items = items.filter((item: any) =>
          item.nombre.toLowerCase().includes(lowerSearch) ||
          (item.desc && item.desc.toLowerCase().includes(lowerSearch))
        )
      }

      // 3. Filtro de Alérgenos (Excluir)
      if (excludedAllergens.length > 0) {
        items = items.filter((item: any) => {
          // Si no hay alérgenos definidos, el plato no se excluye (caso de las bebidas)
          if (!item.alergenos || !Array.isArray(item.alergenos)) return true;
          return !item.alergenos.some((a: string) => excludedAllergens.includes(a));
        })
      }

      organized[cat] = {
        items: items,
        footer: cat === "Carnes a la Brasa" ? "Consultar carnes fuera de carta." : (MENU_BACKUP[cat]?.footer || "")
      }
    })

    return organized
  }, [menuItems, searchTerm, excludedAllergens])

  const AllergenBadge = ({ name, size = "sm" }: { name: string, size?: "sm" | "md" }) => {
    const config = ALLERGENS_LIST.find(a => a.name === name)
    if (!config) return null
    return (
      <div
        title={name}
        className={cn(
          "rounded-full flex items-center justify-center text-white shadow-sm border border-white/20 shrink-0",
          size === "sm" ? "h-4 w-4 p-0.5" : "h-6 w-6 p-1.5",
          config.color
        )}
      >
        {ALLERGEN_ICONS[name]}
      </div>
    )
  }

  const PricePill = ({ label, price, variant, onClick, quantity, onSubtract, onAdd, hideLabel }: { 
    label: string, 
    price: number, 
    variant: 'primary' | 'secondary' | 'accent',
    onClick?: () => void,
    quantity?: number,
    onSubtract?: () => void,
    onAdd?: () => void,
    hideLabel?: boolean
  }) => {
    const colors = {
      primary: 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/10',
      secondary: 'bg-secondary/10 border-secondary/20 text-secondary hover:bg-secondary/10',
      accent: 'bg-accent/10 border-accent/20 text-accent hover:bg-accent/10'
    }

    if (quantity && quantity > 0) {
      return (
        <div className={cn(
          "w-full min-w-[80px] md:min-w-[100px] border px-2 md:px-5 py-1 md:py-1.5 rounded-xl text-center transition-all flex flex-col items-center gap-1",
          colors[variant],
          "ring-2 ring-primary/20"
        )}>
          {!hideLabel && <span className="block text-[7px] md:text-[8px] uppercase font-bold tracking-widest opacity-60">{label}</span>}
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); onSubtract?.(); }} className="hover:scale-110 active:scale-95 transition-transform p-0.5">
              <Minus className="h-3 w-3" strokeWidth={3} />
            </button>
            <span className="text-xs font-black">{quantity}</span>
            <button onClick={(e) => { e.stopPropagation(); onAdd?.(); }} className="hover:scale-110 active:scale-95 transition-transform p-0.5">
              <Plus className="h-3 w-3" strokeWidth={3} />
            </button>
          </div>
        </div>
      )
    }

    return (
      <button 
        onClick={onClick}
        className={cn(
          "w-full min-w-[75px] md:min-w-[100px] border px-2 md:px-5 py-1 md:py-1.5 rounded-xl text-center transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center",
          colors[variant]
        )}
      >
        {!hideLabel && <span className="block text-[7px] md:text-[8px] uppercase font-bold tracking-widest opacity-60 mb-0.5 md:mb-1">{label}</span>}
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[10px] md:text-xs opacity-60 font-black">+</span>
          <span className="text-xs md:text-base font-bold">{price.toFixed(2)}€</span>
        </div>
      </button>
    )
  }

  return (
    <div className="bg-transparent min-h-screen pb-16">
      {/* Hero Header */}
      <section className="relative pt-8 pb-6 text-center px-4" aria-labelledby="menu-title">
        <div className="relative z-10 space-y-4">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-[#152b1b]/90 dark:bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg shadow-black/20">
              <Sparkles className="h-3 w-3 text-[#b5c99a] dark:text-primary" />
              <span className="text-white dark:text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Sabor Tradicional de Sevilla</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 id="menu-title" className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">Nuestra Carta</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground text-sm md:text-base italic font-light max-w-xl mx-auto border-l-2 border-primary/30 pl-4">
              "Tradición de Coria del Río servida con alma en cada bocado desde 1968."
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-8 lg:max-w-7xl animate-in fade-in slide-in-from-top-2 duration-700">
        <div className="bg-card/30 backdrop-blur-md border border-border/40 rounded-2xl p-3 md:p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
          {/* Main Search - Expanded */}
          <div className="relative w-full md:flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="¿Qué te apetece hoy? Busca platos, ingredientes..."
              className="w-full bg-background/40 border border-border/50 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-muted-foreground/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="hidden md:block w-px h-6 bg-border/40" />

          {/* Allergen Popover Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(
                "w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border transition-all duration-300 shadow-sm font-bold text-[10px] uppercase tracking-widest",
                excludedAllergens.length > 0
                  ? "bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/20"
                  : "bg-background/40 border-border/50 text-muted-foreground hover:bg-background/80 hover:border-primary/20"
              )}>
                <Settings2 className={cn("h-4 w-4", excludedAllergens.length > 0 ? "animate-pulse" : "")} />
                <span>Filtro Alérgico</span>
                {excludedAllergens.length > 0 && (
                  <span className="flex items-center justify-center h-5 w-5 bg-primary text-white rounded-full text-[9px] animate-in zoom-in">
                    {excludedAllergens.length}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] sm:w-[480px] p-6 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-3xl" align="center">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border/30 pb-4">
                  <div className="space-y-1">
                    <h4 className="font-headline font-bold text-lg text-foreground italic leading-none">Restricciones</h4>
                    <p className="text-[10px] text-muted-foreground font-light uppercase tracking-widest italic">Selecciona para excluir</p>
                  </div>
                  {excludedAllergens.length > 0 && (
                    <button 
                      onClick={() => setExcludedAllergens([])}
                      className="text-[9px] font-bold text-primary hover:text-primary/70 transition-colors uppercase tracking-widest underline underline-offset-2"
                    >
                      Limpiar Todo
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALLERGENS_LIST.map((al) => {
                    const isExcluded = excludedAllergens.includes(al.name);
                    return (
                      <button
                        key={al.name}
                        onClick={() => toggleAllergen(al.name)}
                        className={cn(
                          "flex items-center gap-2.5 p-2 rounded-xl border transition-all duration-300 w-full group",
                          isExcluded
                            ? "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400 ring-1 ring-red-500/10"
                            : "bg-background/40 border-border/30 hover:border-primary/20 hover:bg-primary/[0.02] text-muted-foreground/80"
                        )}
                      >
                        <div className={cn(
                          "h-4 w-4 rounded-full flex items-center justify-center text-white p-0.5 shadow-sm transition-transform group-hover:scale-110",
                          isExcluded ? "bg-red-500 font-bold" : al.color
                        )}>
                          {isExcluded ? <X className="h-full w-full stroke-[3]" /> : ALLERGEN_ICONS[al.name]}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest truncate">{al.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        {/* Sticky Menu Container - Fixed background and blur with smart hide logic */}
        <nav
          className={cn(
            "sticky top-20 z-40 py-4 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-500 transform-gpu",
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          )}
          aria-label="Categorías del menú"
        >
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-6 lg:max-w-fit">

            {/* Desktop Tabs Wrapper */}
            <div className="hidden lg:flex items-center p-1.5 h-full">
              <TabsList className="bg-transparent w-full flex justify-between gap-1 h-12">
                {CATEGORIES.map(cat => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="relative bg-transparent data-[state=active]:text-primary border-none rounded-full h-full px-6 text-[11px] font-bold uppercase tracking-wider text-foreground/40 hover:text-primary transition-all duration-300 flex items-center gap-2 flex-1 whitespace-nowrap group"
                  >
                    <span className="shrink-0 transition-transform group-data-[state=active]:scale-110 group-hover:scale-110">
                      {CATEGORY_ICONS[cat]}
                    </span>
                    {cat}
                    {/* Indicador minimalista inferior */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-500 group-data-[state=active]:w-8 opacity-0 group-data-[state=active]:opacity-100" />
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Mobile Select Wrapper */}
            <div className="lg:hidden w-full flex justify-center">
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-auto min-w-[200px] h-14 bg-card rounded-full border-primary/10 font-bold uppercase tracking-widest text-xs shadow-md px-6 [&>span]:w-full [&>span]:flex [&>span]:justify-center" aria-label="Seleccionar categoría">
                  <SelectValue placeholder="Categoría">
                    <div className="flex items-center justify-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {CATEGORY_ICONS[activeCategory]}
                      </div>
                      {activeCategory}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-card rounded-2xl border-border p-2 shadow-2xl min-w-[220px]">
                  {CATEGORIES.map(cat => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="rounded-full text-[11px] font-bold uppercase tracking-widest py-3 focus:bg-primary/10 focus:text-primary data-[state=checked]:bg-primary/5 data-[state=checked]:text-primary mb-1 last:mb-0 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-center gap-3 w-full">
                        <div className="p-1.5 bg-primary/5 rounded-lg text-primary/60">
                          {CATEGORY_ICONS[cat]}
                        </div>
                        {cat}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


          </div>
        </nav>

        <div className="container mx-auto px-1 sm:px-4 py-12 lg:max-w-7xl overflow-x-auto">
          {Object.entries(displayedMenu).map(([section, data]) => (
            <TabsContent key={section} value={section} className="mt-0 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-10">
                <div className="inline-flex p-3 bg-card border border-border text-primary mb-4 [&>svg]:h-6 [&>svg]:w-6 shadow-sm">
                  {CATEGORY_ICONS[section]}
                </div>
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground italic pr-2">{section}</h2>
                <div className="h-[2px] w-16 bg-primary/20 mx-auto mt-4" />
              </div>

              {data.items.length === 0 ? (
                <div className="py-20 text-center space-y-4 bg-muted/10 rounded-3xl border border-dashed border-border/50">
                  <div className="p-4 bg-background rounded-full w-fit mx-auto shadow-sm">
                    <Utensils className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-headline font-bold text-foreground italic">No se han encontrado platos</p>
                    <p className="text-sm text-muted-foreground">Prueba a ajustar tu búsqueda o los filtros de alérgenos.</p>
                  </div>
                  <button
                    onClick={() => { setSearchTerm(""); setExcludedAllergens([]) }}
                    className="text-xs font-bold text-primary uppercase tracking-widest hover:underline"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                <div className="bg-card rounded-3xl border border-border shadow-2xl overflow-hidden glass-card">
                  {/* Desktop Version */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-primary/[0.05] border-b border-border">
                          <th className="px-4 md:px-6 lg:px-8 py-6 text-sm font-bold uppercase tracking-wider text-primary">
                            {section === "Bebidas" ? "Bebida / Refresco" : "Plato / Tapa"}
                          </th>
                          <th className="px-2 md:px-4 lg:px-6 py-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary w-32">
                            {section === "Bebidas" ? "Copa / Caña" : "Tapa"}
                          </th>
                          <th className="px-2 md:px-4 lg:px-6 py-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-secondary w-32">
                            {section === "Bebidas" ? "Botella" : "Media"}
                          </th>
                          <th className="px-2 md:px-4 lg:px-6 py-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-accent w-32">
                            {section === "Bebidas" ? "Jarra / Combinado" : "Ración"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {data.items.map((item: any) => (
                          <tr key={item.id} className="group hover:bg-primary/[0.03] transition-colors">
                            <td className="px-4 md:px-6 lg:px-8 py-7">
                              <div className="flex items-center gap-6">
                                {item.image ? (
                                  <button
                                    onClick={() => setSelectedItem(item)}
                                    className="relative h-16 w-16 shrink-0 rounded-2xl overflow-hidden border border-border shadow-md group-hover:shadow-lg group-hover:scale-105 active:scale-95 transition-all duration-500 cursor-zoom-in group/img"
                                  >
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity z-10">
                                      <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={item.image}
                                      alt={item.nombre}
                                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                    />
                                  </button>
                                ) : (
                                  <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary/5 flex items-center justify-center border border-dashed border-primary/20 group-hover:border-primary/40 transition-colors">
                                    <ChefHat className="h-6 w-6 text-primary/30" />
                                  </div>
                                )}
                                <div className="flex flex-col gap-1.5 min-w-0">
                                  <div className="flex items-center gap-4">
                                    <h3 className="text-xl font-headline font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                      {item.nombre}
                                    </h3>
                                    <div className="flex gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                                      {item.alergenos?.map((a: string) => (
                                        <AllergenBadge key={a} name={a} size="sm" />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground italic font-light truncate max-w-lg">{item.desc}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 md:px-4 lg:px-6 py-7 text-center">
                              {item.prices?.tapa ? (
                                <PricePill 
                                  label="Tapa" 
                                  price={item.prices.tapa} 
                                  variant="primary" 
                                  hideLabel={true}
                                  onClick={() => {
                                    if (item.nombre.toLowerCase().includes("lomo o pollo")) {
                                      setSelectedItem(item)
                                    } else {
                                      addItem(item, 'tapa', item.prices.tapa)
                                    }
                                  }}
                                  quantity={items.find(i => i.id === item.id && i.type === 'tapa')?.quantity}
                                  onSubtract={() => updateQuantity(item.id, 'tapa', -1)}
                                  onAdd={() => updateQuantity(item.id, 'tapa', 1)}
                                />
                              ) : (
                                <span className="text-muted-foreground/10">—</span>
                              )}
                            </td>
                            <td className="px-2 md:px-4 lg:px-6 py-7 text-center">
                              {item.prices?.media ? (
                                <PricePill 
                                  label="Media" 
                                  price={item.prices.media} 
                                  variant="secondary" 
                                  hideLabel={true}
                                  onClick={() => {
                                    if (item.nombre.toLowerCase().includes("lomo o pollo")) {
                                      setSelectedItem(item)
                                    } else {
                                      addItem(item, 'media', item.prices.media)
                                    }
                                  }}
                                  quantity={items.find(i => i.id === item.id && i.type === 'media')?.quantity}
                                  onSubtract={() => updateQuantity(item.id, 'media', -1)}
                                  onAdd={() => updateQuantity(item.id, 'media', 1)}
                                />
                              ) : (
                                <span className="text-muted-foreground/10">—</span>
                              )}
                            </td>
                            <td className="px-2 md:px-4 lg:px-6 py-7 text-center">
                              {item.prices?.racion ? (
                                <PricePill 
                                  label="Ración" 
                                  price={item.prices.racion} 
                                  variant="accent" 
                                  hideLabel={true}
                                  onClick={() => {
                                    if (item.nombre.toLowerCase().includes("lomo o pollo")) {
                                      setSelectedItem(item)
                                    } else {
                                      addItem(item, 'racion', item.prices.racion)
                                    }
                                  }}
                                  quantity={items.find(i => i.id === item.id && i.type === 'racion')?.quantity}
                                  onSubtract={() => updateQuantity(item.id, 'racion', -1)}
                                  onAdd={() => updateQuantity(item.id, 'racion', 1)}
                                />
                              ) : (
                                <span className="text-muted-foreground/10">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Version */}
                  <div className="md:hidden divide-y divide-border/50">
                    {data.items.map((item: any) => (
                      <div key={item.id} className="px-6 py-8 space-y-6 hover:bg-primary/[0.01] transition-colors">
                        <div className="flex items-start gap-5">
                          {item.image ? (
                            <button
                              onClick={() => setSelectedItem(item)}
                              className="relative h-20 w-20 shrink-0 rounded-[1.25rem] overflow-hidden border border-border shadow-md cursor-zoom-in"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.image}
                                alt={item.nombre}
                                className="object-cover w-full h-full"
                              />
                            </button>
                          ) : (
                            <div className="h-20 w-20 shrink-0 rounded-[1.25rem] bg-primary/5 flex items-center justify-center border border-dashed border-primary/20">
                              <ChefHat className="h-8 w-8 text-primary/30" />
                            </div>
                          )}
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-xl font-headline font-bold text-foreground leading-tight truncate pr-2">
                                {item.nombre}
                              </h3>
                              <div className="flex gap-1 shrink-0 items-center pt-1">
                                {item.alergenos?.map((a: string) => (
                                  <AllergenBadge key={a} name={a} size="sm" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-3 pr-4">{item.desc}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 py-1">
                          {item.prices?.tapa && (
                            <div className="flex-1 min-w-[80px] max-w-[140px]">
                              <PricePill 
                                label="Tapa" 
                                price={item.prices.tapa} 
                                variant="primary" 
                                onClick={() => {
                                  if (item.nombre.toLowerCase().includes("lomo o pollo")) {
                                    setSelectedItem(item)
                                  } else {
                                    addItem(item, 'tapa', item.prices.tapa)
                                  }
                                }}
                                quantity={items.find(i => i.id === item.id && i.type === 'tapa')?.quantity}
                                onSubtract={() => updateQuantity(item.id, 'tapa', -1)}
                                onAdd={() => updateQuantity(item.id, 'tapa', 1)}
                              />
                            </div>
                          )}
                          {item.prices?.media && (
                            <div className="flex-1 min-w-[80px] max-w-[140px]">
                              <PricePill 
                                label="Media" 
                                price={item.prices.media} 
                                variant="secondary" 
                                onClick={() => {
                                  if (item.nombre.toLowerCase().includes("lomo o pollo")) {
                                    setSelectedItem(item)
                                  } else {
                                    addItem(item, 'media', item.prices.media)
                                  }
                                }}
                                quantity={items.find(i => i.id === item.id && i.type === 'media')?.quantity}
                                onSubtract={() => updateQuantity(item.id, 'media', -1)}
                                onAdd={() => updateQuantity(item.id, 'media', 1)}
                              />
                            </div>
                          )}
                          {item.prices?.racion && (
                            <div className="flex-1 min-w-[80px] max-w-[140px]">
                              <PricePill 
                                label="Ración" 
                                price={item.prices.racion} 
                                variant="accent" 
                                onClick={() => {
                                  if (item.nombre.toLowerCase().includes("lomo o pollo")) {
                                    setSelectedItem(item)
                                  } else {
                                    addItem(item, 'racion', item.prices.racion)
                                  }
                                }}
                                quantity={items.find(i => i.id === item.id && i.type === 'racion')?.quantity}
                                onSubtract={() => updateQuantity(item.id, 'racion', -1)}
                                onAdd={() => updateQuantity(item.id, 'racion', 1)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.footer && (
                <div className="mt-8 bg-card/60 backdrop-blur-md p-5 rounded-3xl border border-border/50 flex items-center gap-5 shadow-sm max-w-2xl mx-auto">
                  <div className="p-3 bg-primary text-white rounded-2xl shrink-0 shadow-md">
                    <Info className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-muted-foreground italic font-medium leading-relaxed">
                    Nuestra cocina abre <span className="text-secondary font-bold">todos los mediodías</span> y de <span className="text-secondary font-bold">Jueves noche a Domingo mediodía</span>.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* Pie de Página Refinado - Estilo Taberna Premium */}
      <footer className="container mx-auto px-4 mt-24 mb-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden group">
          {/* Adorno sutil de fondo */}
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
            <Utensils className="h-32 w-32 rotate-12" />
          </div>

          <div className="flex flex-col items-center gap-8 relative z-10">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Flame className="h-4 w-4" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Horario de Cocina</span>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground italic">
                Coria del Río · Abierto mediodías diarios y cenas de Jueves a Domingo.
              </p>
            </div>

            <div className="w-full max-w-[150px] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

            <div className="space-y-2 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[.4em] text-muted-foreground/40">
                © 2026 Cafe Bar Titi Coria
              </p>
              <p className="text-[9px] font-headline font-bold italic text-primary/40 uppercase tracking-widest">
                Tradición del Aljarafe desde 1968
              </p>
            </div>
          </div>
        </div>
      </footer>


      <FloatingCart />
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-7xl p-0 border-none bg-transparent shadow-none overflow-visible flex items-end md:items-center justify-center p-0 md:p-4 pointer-events-none [&>button:last-child]:hidden">
          <div className="relative w-full max-w-md md:max-w-5xl bg-card rounded-t-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom md:zoom-in-95 fade-in duration-500 max-h-[92vh] flex flex-col">
            {/* Mobile Drag Indicator */}
            <div className="md:hidden w-12 h-1.5 bg-muted-foreground/20 rounded-full mx-auto mt-4 mb-2 shrink-0" />

            {/* Action Buttons Container */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 z-50 flex gap-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2.5 md:p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-xl border border-white/10 transition-colors shadow-lg"
                aria-label="Cerrar modal"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row h-full overflow-y-auto no-scrollbar">
              {/* Image Section */}
              <div className="w-full md:w-1/2 aspect-[16/10] md:aspect-square bg-muted/20 relative shrink-0 group">
                {selectedItem?.image && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden pointer-events-none" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.nombre}
                      className="object-cover w-full h-full"
                    />
                  </>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4 md:p-8 md:w-1/2 flex flex-col justify-center items-center md:items-start bg-card text-center md:text-left">
                <div className="space-y-6 md:space-y-8 w-full max-w-sm md:max-w-none">
                  <div className="space-y-3 md:space-y-5">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                      <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Recomendación de Titi</span>
                    </div>
                    <DialogTitle className="text-3xl md:text-5xl font-headline font-bold text-foreground leading-tight italic md:pr-4">
                      {selectedItem?.nombre}
                    </DialogTitle>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      {selectedItem?.alergenos?.map((a: string) => (
                        <AllergenBadge key={a} name={a} size="md" />
                      ))}
                    </div>
                  </div>

                  <DialogDescription className="text-muted-foreground text-base md:text-lg italic font-light leading-relaxed md:pr-2">
                    "{selectedItem?.desc}"
                  </DialogDescription>

                  <div className="pt-8 border-t border-border flex flex-row items-center justify-center md:justify-start gap-1.5 md:gap-4 overflow-x-auto no-scrollbar">
                    {selectedItem?.prices.tapa && (
                      <div className="flex flex-col gap-1 shrink-0">
                        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 ml-px">Tapa</span>
                        <div className="bg-primary/5 px-2.5 md:px-7 py-2.5 md:py-3.5 rounded-2xl border border-primary/20 shadow-sm">
                          <span className="text-sm md:text-xl font-bold text-primary whitespace-nowrap">{selectedItem.prices.tapa.toFixed(2)}€</span>
                        </div>
                      </div>
                    )}
                    {selectedItem?.prices.media && (
                      <div className="flex flex-col gap-1 shrink-0">
                        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 ml-px">Media</span>
                        <div className="bg-secondary/5 px-2.5 md:px-7 py-2.5 md:py-3.5 rounded-2xl border border-secondary/20 shadow-sm">
                          <span className="text-sm md:text-xl font-bold text-secondary whitespace-nowrap">{selectedItem.prices.media.toFixed(2)}€</span>
                        </div>
                      </div>
                    )}
                    {selectedItem?.prices.racion && (
                      <div className="flex flex-col gap-1 shrink-0">
                        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 ml-px">Ración</span>
                        <div className="bg-accent/5 px-2.5 md:px-7 py-2.5 md:py-3.5 rounded-2xl border border-accent/20 shadow-sm">
                          <span className="text-sm md:text-xl font-bold text-accent whitespace-nowrap">{selectedItem.prices.racion.toFixed(2)}€</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
