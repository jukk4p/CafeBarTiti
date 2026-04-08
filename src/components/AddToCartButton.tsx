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
    const cartItem = items.find(i => i.id === item.id && i.type === type)
    
    // Colores según el tipo (como en la captura del usuario)
    const typeStyles: Record<string, string> = {
      tapa: "bg-[#e9f0e8] text-[#1a4731] border-[#1a4731]/10 hover:bg-[#1a4731] hover:text-white",
      media: "bg-[#fdf7e7] text-[#854d0e] border-[#854d0e]/10 hover:bg-[#854d0e] hover:text-white",
      racion: "bg-[#efeff0] text-[#334155] border-[#334155]/10 hover:bg-[#334155] hover:text-white"
    }

    if (cartItem) {
      return (
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-xl shadow-sm border transition-all",
          type === "tapa" ? "bg-[#1a4731] text-white" : 
          type === "media" ? "bg-[#854d0e] text-white" : 
          "bg-[#334155] text-white",
          className
        )}>
          <button 
              onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, type, -1); }}
              className="hover:bg-white/20 p-1 rounded-md transition-colors"
          >
              <Minus className="h-3 w-3" strokeWidth={4} />
          </button>
          <span className="font-bold text-sm min-w-[1ch] text-center">{cartItem.quantity}</span>
          <button 
              onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, type, 1); }}
              className="hover:bg-white/20 p-1 rounded-md transition-colors"
          >
              <Plus className="h-3 w-3" strokeWidth={4} />
          </button>
        </div>
      )
    }

    return (
      <button
        onClick={(e) => { e.stopPropagation(); handleAdd(type, price); }}
        className={cn(
          "flex flex-col items-center justify-center gap-0.5 px-4 py-3 rounded-2xl border transition-all active:scale-95 shadow-sm group min-w-[90px] md:min-w-[100px]",
          typeStyles[type] || "bg-slate-100 text-slate-700",
          className
        )}
      >
        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-black opacity-60 mb-0.5">
          {type === "racion" ? "RACIÓN" : type.toUpperCase()}
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap">
            <Plus className="h-3 w-3 opacity-40 group-hover:opacity-100 transition-opacity" strokeWidth={4} />
            <span className="text-sm md:text-base font-bold tracking-tight whitespace-nowrap">{price.toFixed(2)}€</span>
        </div>
      </button>
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
