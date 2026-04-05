
"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
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
  Clock,
  MapPin
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
import { cn } from "@/lib/utils"
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase"
import { collection } from "firebase/firestore"
import { MENU_BACKUP } from "@/lib/menu-backup"
import { Loader2 } from "lucide-react"

const CATEGORIES = ["Entrantes", "Tapas Variadas", "Montaditos", "Pescado Frito", "Pescado Plancha", "Carnes a la Brasa"]

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Entrantes": <Salad className="h-5 w-5" strokeWidth={1.75} />,
  "Tapas Variadas": <UtensilsCrossed className="h-5 w-5" strokeWidth={1.75} />,
  "Montaditos": <Sandwich className="h-5 w-5" strokeWidth={1.75} />,
  "Pescado Frito": <FishSymbol className="h-5 w-5" strokeWidth={1.75} />,
  "Pescado Plancha": <Fish className="h-5 w-5" strokeWidth={1.75} />,
  "Carnes a la Brasa": <Beef className="h-5 w-5" strokeWidth={1.75} />,
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
  { name: "Contiene Gluten", color: "bg-orange-600" },
  { name: "Crustáceos", color: "bg-blue-500" },
  { name: "Huevos", color: "bg-yellow-500" },
  { name: "Pescado", color: "bg-blue-800" },
  { name: "Cacahuetes", color: "bg-amber-800" },
  { name: "Soja", color: "bg-green-700" },
  { name: "Lácteos", color: "bg-orange-800" },
  { name: "Frutos de cáscara", color: "bg-red-900" },
  { name: "Apio", color: "bg-emerald-600" },
  { name: "Mostaza", color: "bg-yellow-700" },
  { name: "Granos de sésamo", color: "bg-yellow-300 text-black" },
  { name: "Dióxido de azufre y sulfitos", color: "bg-purple-600" },
  { name: "Altramuces", color: "bg-yellow-400 text-black" },
  { name: "Moluscos", color: "bg-blue-400" },
];
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState("Entrantes")
  const [selectedItem, setSelectedItem] = React.useState<any>(null)
  const { firestore } = useFirebase()

  // Suscribirse a la colección de platos en tiempo real
  const menuQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return collection(firestore, "menuItems")
  }, [firestore])

  const { data: menuItems, isLoading } = useCollection(menuQuery)

  // Organizar los platos por categoría para el renderizado
  const displayedMenu = React.useMemo(() => {
    if (!menuItems || menuItems.length === 0) return MENU_BACKUP;
    
    const organized: Record<string, any> = {}
    CATEGORIES.forEach(cat => {
      organized[cat] = {
        items: menuItems.filter(item => item.category === cat),
        footer: cat === "Carnes a la Brasa" 
      }
    })
    return organized
  }, [menuItems])

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

  const PricePill = ({ label, price, variant }: { label: string, price: number, variant: 'primary' | 'secondary' | 'accent' }) => {
    const colors = {
      primary: 'bg-primary/5 border-primary/10 text-primary hover:bg-primary/10',
      secondary: 'bg-secondary/5 border-secondary/10 text-secondary hover:bg-secondary/10',
      accent: 'bg-accent/5 border-accent/10 text-accent hover:bg-accent/10'
    }

    return (
      <div className={cn(
        "w-fit min-w-[70px] md:min-w-[100px] border px-2 md:px-5 py-2 md:py-2.5 rounded-xl text-center transition-colors",
        colors[variant]
      )}>
        <span className="block text-[7px] md:text-[8px] uppercase font-bold tracking-widest opacity-60 mb-0.5 md:mb-1">{label}</span>
        <span className="text-xs md:text-base font-bold">{price.toFixed(2)}€</span>
      </div>
    )
  }

  return (
    <div className="bg-transparent min-h-screen pb-16">
      {/* Hero Header */}
      <section className="relative pt-8 pb-6 text-center px-4 overflow-hidden" aria-labelledby="menu-title">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#152b1b]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg shadow-black/20">
            <Sparkles className="h-3 w-3 text-[#b5c99a]" />
            <span className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Sabor Tradicional de Sevilla</span>
          </div>
          <h1 id="menu-title" className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">Nuestra Carta</h1>
          <p className="text-muted-foreground text-sm md:text-base italic font-light max-w-xl mx-auto border-l-2 border-primary/30 pl-4">
            "Tradición de Coria del Río servida con alma en cada bocado desde 1968."
          </p>
        </div>
      </section>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        {/* Sticky Menu Container */}
        <nav className="sticky top-20 z-40 py-6" aria-label="Categorías del menú">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-6 lg:max-w-fit bg-card/50 dark:bg-black/80 backdrop-blur-xl border border-border dark:border-white/10 rounded-[2.5rem] p-2 shadow-xl">

            {/* Desktop Tabs Wrapper */}
            <div className="hidden lg:flex items-center p-1.5 h-full">
              <TabsList className="bg-transparent w-full flex justify-between gap-1 h-12">
                {CATEGORIES.map(cat => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-full h-full px-6 text-[11px] font-bold uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 flex-1 whitespace-nowrap"
                  >
                    <span className="shrink-0">{CATEGORY_ICONS[cat]}</span>
                    {cat}
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

        <div className="container mx-auto px-4 py-12 lg:max-w-7xl">
          {Object.entries(displayedMenu).map(([section, data]) => (
            <TabsContent key={section} value={section} className="mt-0 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-10">
                <div className="inline-flex p-3 bg-card border border-border text-primary mb-4 [&>svg]:h-6 [&>svg]:w-6 shadow-sm">
                  {CATEGORY_ICONS[section]}
                </div>
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground italic pr-2">{section}</h2>
                <div className="h-[2px] w-16 bg-primary/20 mx-auto mt-4" />
              </div>

              <div className="bg-card rounded-3xl border border-border shadow-2xl overflow-hidden glass-card">
                {/* Desktop Version */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-primary/[0.05] border-b border-border">
                        <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-primary">Plato / Tapa</th>
                        <th className="px-6 py-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Tapa</th>
                        <th className="px-6 py-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Media</th>
                        <th className="px-6 py-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Ración</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {data.items.map((item: any) => (
                        <tr key={item.id} className="group hover:bg-primary/[0.03] transition-colors">
                          <td className="px-8 py-7">
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
                          <td className="px-6 py-7 text-center">
                            {item.prices?.tapa ? (
                              <span className="text-lg font-bold text-primary font-body">{item.prices.tapa.toFixed(2)}€</span>
                            ) : (
                              <span className="text-muted-foreground/10">—</span>
                            )}
                          </td>
                          <td className="px-6 py-7 text-center">
                            {item.prices?.media ? (
                              <span className="text-lg font-bold text-secondary font-body">{item.prices.media.toFixed(2)}€</span>
                            ) : (
                              <span className="text-muted-foreground/10">—</span>
                            )}
                          </td>
                          <td className="px-6 py-7 text-center">
                            {item.prices?.racion ? (
                              <span className="text-lg font-bold text-accent font-body">{item.prices.racion.toFixed(2)}€</span>
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

                      <div className="flex justify-center flex-wrap gap-4 pt-2">
                        {item.prices?.tapa && <PricePill label="Tapa" price={item.prices.tapa} variant="primary" />}
                        {item.prices?.media && <PricePill label="Media" price={item.prices.media} variant="secondary" />}
                        {item.prices?.racion && <PricePill label="Ración" price={item.prices.racion} variant="accent" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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

      {/* Guía de Alérgenos Universal */}
      <section className="container mx-auto px-4 mt-12 lg:max-w-7xl" aria-labelledby="allergen-title">
        <div className="bg-card rounded-[2.5rem] border border-border/50 shadow-xl relative overflow-hidden">
          <div className="hidden lg:flex p-12 items-center gap-16">
            <div className="space-y-3 shrink-0 max-w-[240px]">
              <div className="inline-flex items-center gap-2 text-secondary mb-1">
                <ShieldAlert className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Seguridad Alimentaria</span>
              </div>
              <h2 id="allergen-title" className="text-2xl font-headline font-bold text-foreground">Guía de Alérgenos</h2>
              <p className="text-muted-foreground text-[10px] italic leading-relaxed tracking-wider">
                Reglamento (UE) nº 1169/2011. Si tiene alguna alergia, por favor consulte con nuestro personal antes de realizar su pedido.
              </p>
            </div>

            <div className="flex-grow grid grid-cols-7 gap-y-6 gap-x-4">
              {ALLERGENS_LIST.map((al) => (
                <div key={al.name} className="flex flex-col items-center group cursor-default">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-card shadow-md transition-colors duration-300 group-hover:scale-110 mb-2",
                    al.color
                  )}>
                    <div className="h-6 w-6">
                      {ALLERGEN_ICONS[al.name]}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-center text-muted-foreground leading-tight">
                    {al.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <Collapsible className="group">
              <div className="p-8">
                <CollapsibleTrigger asChild>
                  <div className="relative flex items-center justify-center cursor-pointer py-4">
                    <div className="space-y-2 text-center">
                      <div className="inline-flex items-center justify-center gap-2 text-secondary mb-1">
                        <ShieldAlert className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Información Alérgenos</span>
                      </div>
                      <h2 className="text-2xl font-headline font-bold">Guía de Seguridad</h2>
                    </div>
                    <ChevronDown className="absolute right-0 h-6 w-6 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-4 gap-y-6 gap-x-3">
                    {ALLERGENS_LIST.map((al, idx) => (
                      <div
                        key={al.name}
                        className={cn(
                          "flex flex-col items-center group cursor-default",
                          idx === 12 && "col-start-2",
                          idx === 13 && "col-start-3"
                        )}
                      >
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-card shadow-md transition-colors duration-300 group-hover:scale-110 mb-2",
                          al.color
                        )}>
                          <div className="h-6 w-6">
                            {ALLERGEN_ICONS[al.name]}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-center text-muted-foreground leading-tight">
                          {al.name.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>

          <div className="px-8 pb-8 lg:px-12 lg:pb-12 pt-6 border-t border-black/5 flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex items-center justify-center gap-2 text-primary/60">
              <Flame className="h-3 w-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Cocina: <span className="font-bold">Todos los mediodías</span> y <span className="font-bold">Jueves noche a Domingo mediodía</span></span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">© 2026 Cafe Bar Titi Coria</p>
          </div>
        </div>
      </section>
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
