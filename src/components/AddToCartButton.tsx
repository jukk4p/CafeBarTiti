"use client"

import * as React from "react"
import { useCart, OrderType } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Plus, Minus, ShoppingBag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AddToCartButtonProps {
  item: any
  variant?: "default" | "outline" | "ghost"
  className?: string
  type?: OrderType
  price?: number
  showPriceOnly?: boolean
}

export function AddToCartButton({ 
  item, 
  variant = "outline", 
  className,
  type,
  price,
  showPriceOnly
}: AddToCartButtonProps) {
  const { addItem, updateQuantity, items } = useCart()
  
  // Encontrar todas las variantes de este item en el carrito
  const cartItemsForItem = items.filter(i => i.id === item.id)
  const totalQuantity = cartItemsForItem.reduce((sum, i) => sum + i.quantity, 0)

  const availablePrices = Object.entries(item.prices || {}).filter(
    ([_, price]) => price !== null && price !== undefined && price !== 0
  ) as [OrderType, number][]

  const needsVariant = item.nombre.toLowerCase().includes("lomo o pollo")
  const variantOptions = ["Lomo", "Pollo"]

  const handleAdd = (type: OrderType, price: number, itemVariant?: string) => {
    addItem(item, type, price, itemVariant)
  }

  // MODO DIRECTO (Pizarra Digital / Carta Web) - CALCO DE LA CARTA ORIGINAL
  if (showPriceOnly && type && price !== undefined) {
    const cartItemsForType = cartItemsForItem.filter(i => i.type === type)
    const quantityForType = cartItemsForType.reduce((sum, i) => sum + i.quantity, 0)
    
    const typeStyles: Record<string, string> = {
      tapa: "bg-[#e9f0e8] text-[#1a4731] border-[#1a4731]/15",
      media: "bg-[#fdf7e7] text-[#854d0e] border-[#854d0e]/15",
      racion: "bg-[#efeff0] text-[#334155] border-[#334155]/15"
    }

    const Pill = ({ children, onClick, active }: { children: React.ReactNode, onClick?: any, active?: boolean }) => (
      <div 
        onClick={onClick}
        className={cn(
          "flex items-center h-10 rounded-full border shadow-sm transition-all duration-300",
          typeStyles[type] || "bg-slate-100 text-slate-700",
          active && (
            type === "tapa" ? "ring-2 ring-[#1a4731] ring-offset-1" : 
            type === "media" ? "ring-2 ring-[#854d0e] ring-offset-1" : 
            "ring-2 ring-[#334155] ring-offset-1"
          ),
          onClick && "cursor-pointer active:scale-95 hover:brightness-95"
        )}
      >
        {children}
      </div>
    )

    if (needsVariant) {
      return (
        <div className={cn("relative mx-auto w-fit", className)}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none" onClick={(e) => e.stopPropagation()}>
                <Pill active={quantityForType > 0}>
                   {quantityForType > 0 ? (
                     <div className="flex items-center gap-2.5 px-3">
                        <span className="text-[10px] font-black opacity-40 tracking-widest">{type.toUpperCase()}</span>
                        <div className="h-4 w-[1px] bg-current opacity-10" />
                        <span className="text-sm font-black">{quantityForType}</span>
                        <Plus className="h-3.5 w-3.5 opacity-40" strokeWidth={3} />
                     </div>
                   ) : (
                     <div className="flex items-center gap-1.5 px-3">
                        <Plus className="h-3.5 w-3.5 opacity-30" strokeWidth={3} />
                        <span className="text-sm font-black tracking-tight">{price.toFixed(2)}€</span>
                     </div>
                   )}
                </Pill>
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="center" className="rounded-2xl p-2 min-w-[200px] glass-card border-white/10 shadow-2xl">
              <div className="px-3 py-2 text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-60">
                Selecciona ingrediente
              </div>
              {variantOptions.map(v => {
                const variantItem = cartItemsForType.find(i => i.variant === v)
                const variantQty = variantItem?.quantity || 0
                return (
                  <div key={v} className="flex items-stretch mb-1.5 last:mb-0 h-12 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl overflow-hidden border border-black/5 dark:border-white/5 group/variant">
                    {variantQty > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, type, -1, v); }}
                        className="flex items-center justify-center w-12 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                      >
                        <Minus className="h-4 w-4" strokeWidth={3} />
                      </button>
                    )}
                    <div
                      className={cn(
                        "flex-1 flex justify-between items-center px-4 cursor-pointer transition-all",
                        variantQty > 0 ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-primary/5"
                      )}
                      onClick={(e) => { e.stopPropagation(); handleAdd(type, price, v); }}
                    >
                      <span className="font-bold text-[11px] uppercase tracking-wider">{v}</span>
                      {variantQty > 0 && (
                        <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full min-w-[20px] text-center">
                          {variantQty}
                        </span>
                      )}
                    </div>
                    <button
                       onClick={(e) => { e.stopPropagation(); handleAdd(type, price, v); }}
                       className="flex items-center justify-center w-10 text-primary hover:bg-primary hover:text-white transition-all active:scale-90"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                    </button>
                  </div>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }

    return (
      <div className={cn("mx-auto w-fit", className)}>
        {quantityForType > 0 ? (
          <Pill active={true}>
            <button
              onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, type, -1); }}
              className="px-2 h-full flex items-center hover:scale-110 active:scale-95 transition-transform"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={3} />
            </button>
            <div className="px-1 min-w-[2ch] text-center">
              <span className="text-sm font-black">{quantityForType}</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleAdd(type, price); }}
              className="px-2 h-full flex items-center hover:scale-110 active:scale-95 transition-transform"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={3} />
            </button>
          </Pill>
        ) : (
          <Pill onClick={(e: any) => { e.stopPropagation(); handleAdd(type, price); }}>
            <div className="flex items-center gap-1.5 px-3">
              <Plus className="h-3.5 w-3.5 opacity-30" strokeWidth={3} />
              <span className="text-sm font-black tracking-tight">{price.toFixed(2)}€</span>
            </div>
          </Pill>
        )}
      </div>
    )
  }

  if (availablePrices.length === 0) return null

  // Diseño base del botón rectangular (Capturas del usuario)
  const ButtonContent = (
    <Button
      variant="outline"
      className={cn(
        "rounded-xl h-8 md:h-9 px-3 md:px-5 font-bold flex items-center gap-2 transition-all active:scale-95 shrink-0 uppercase tracking-[0.15em] text-[10px] md:text-[11px]",
        // Estilo Integrado: Usa los colores de la marca para que parezca parte de la tabla
        "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40",
        // En modo oscuro se adapta solo si el fondo cambia, pero el esquema primary funciona en ambos
        "dark:bg-primary/10 dark:hover:bg-primary/20",
        className
      )}
    >
      <Plus className="h-3 w-3" strokeWidth={3} />
      <span>Añadir</span>
    </Button>
  )

  // Si necesita variante (Lomo/Pollo) O tiene varios formatos
  if (needsVariant || availablePrices.length > 1) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-1.5", className)}>
        {/* Chips de ítems ya añadidos con sus variantes/formatos */}
        {cartItemsForItem.map(cartItem => (
          <div key={`${cartItem.type}-${cartItem.variant}`} className="flex items-center gap-1.5 bg-primary/5 rounded-lg p-0.5 border border-primary/10">
            <div className="flex items-center">
               <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 rounded-md hover:bg-primary/10"
                  onClick={() => updateQuantity(item.id, cartItem.type, -1, cartItem.variant)}
                >
                  <Minus className="h-2.5 w-2.5" />
                </Button>
                <span className="font-bold text-[10px] min-w-[0.7rem] text-center">{cartItem.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 rounded-md hover:bg-primary/10"
                  onClick={() => updateQuantity(item.id, cartItem.type, 1, cartItem.variant)}
                >
                  <Plus className="h-2.5 w-2.5" />
                </Button>
            </div>
            <span className="text-[8px] uppercase font-bold text-primary/70 pr-1.5">
              {cartItem.variant || cartItem.type}
            </span>
          </div>
        ))}
        
        <TooltipProvider>
          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  {ButtonContent}
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl p-1.5 min-w-[150px] glass-card border-white/10 shadow-2xl">
                {needsVariant ? (
                  <>
                    <div className="px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-50">
                      Ingrediente
                    </div>
                    {variantOptions.map(v => (
                      <DropdownMenuItem
                        key={v}
                        className="flex justify-between items-center rounded-lg py-2.5 px-3 cursor-pointer focus:bg-primary focus:text-white mb-0.5 last:mb-0"
                        onClick={() => handleAdd(availablePrices[0][0], availablePrices[0][1], v)}
                      >
                        <span className="font-bold text-[11px] uppercase tracking-wider">{v}</span>
                        <span className="text-[9px] opacity-60">
                          {availablePrices.length > 1 ? availablePrices[0][0] : ""}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] font-bold text-muted-foreground opacity-50">
                      Formato
                    </div>
                    {availablePrices.map(([type, price]) => (
                      <DropdownMenuItem
                        key={type}
                        className="flex justify-between items-center rounded-lg py-2.5 px-3 cursor-pointer focus:bg-primary focus:text-white mb-0.5 last:mb-0"
                        onClick={() => handleAdd(type, price)}
                      >
                        <span className="capitalize font-bold text-[11px]">{type}</span>
                        <span className="font-bold text-[12px]">{price.toFixed(2)}€</span>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent className="rounded-full px-2 py-0.5 bg-primary text-white text-[9px] font-bold border-none">
              {totalQuantity > 0 ? "Añadir más" : "Añadir"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  // Caso simple: 1 formato y NO necesita variante
  const [singleType, singlePrice] = availablePrices[0]
  const cartItem = items.find(i => i.id === item.id && i.type === singleType)

  if (cartItem) {
    return (
      <div className={cn("flex items-center justify-center gap-1.5 bg-primary/5 rounded-lg p-0.5 border border-primary/10", className)}>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-md hover:bg-primary/20 transition-colors"
          onClick={() => updateQuantity(item.id, singleType, -1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="font-bold text-[11px] min-w-[0.8rem] text-center">{cartItem.quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-md hover:bg-primary/20 transition-colors"
          onClick={() => updateQuantity(item.id, singleType, 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex justify-center w-full", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={() => handleAdd(singleType, singlePrice)} className="cursor-pointer">
              {ButtonContent}
            </div>
          </TooltipTrigger>
          <TooltipContent className="rounded-full px-3 py-1 bg-primary text-white text-[10px] font-bold border-none">
            Añadir al pedido
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
