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
}

export function AddToCartButton({ item, variant = "outline", className }: AddToCartButtonProps) {
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

  if (availablePrices.length === 0) return null

  // Si necesita variante (Lomo/Pollo) O tiene varios formatos
  if (needsVariant || availablePrices.length > 1) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
        {/* Chips de ítems ya añadidos con sus variantes/formatos */}
        {cartItemsForItem.map(cartItem => (
          <div key={`${cartItem.type}-${cartItem.variant}`} className="flex items-center gap-2 bg-primary/5 rounded-full p-1 border border-primary/10">
            <div className="flex items-center">
               <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => updateQuantity(item.id, cartItem.type, -1, cartItem.variant)}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="font-bold text-[10px] min-w-[0.8rem] text-center">{cartItem.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => updateQuantity(item.id, cartItem.type, 1, cartItem.variant)}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
            </div>
            <span className="text-[8px] uppercase font-bold text-primary/70 pr-3">
              {cartItem.variant || cartItem.type}
            </span>
          </div>
        ))}
        
        <TooltipProvider>
          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant={variant}
                    size="icon"
                    className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white h-9 w-9 shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[160px] glass">
                {needsVariant ? (
                  <>
                    <div className="px-2 py-1.5 text-[9px] uppercase tracking-widest font-bold text-muted-foreground opacity-50">
                      Elige ingrediente
                    </div>
                    {variantOptions.map(v => (
                      <DropdownMenuItem
                        key={v}
                        className="flex justify-between items-center rounded-xl py-2.5 px-3 cursor-pointer focus:bg-primary focus:text-white"
                        onClick={() => handleAdd(availablePrices[0][0], availablePrices[0][1], v)}
                      >
                        <span className="font-medium">{v}</span>
                        <span className="text-[10px] opacity-60">
                          {availablePrices.length > 1 ? availablePrices[0][0] : ""}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="px-2 py-1.5 text-[9px] uppercase tracking-widest font-bold text-muted-foreground opacity-50">
                      Selecciona formato
                    </div>
                    {availablePrices.map(([type, price]) => (
                      <DropdownMenuItem
                        key={type}
                        className="flex justify-between items-center rounded-xl py-2.5 px-3 cursor-pointer focus:bg-primary focus:text-white"
                        onClick={() => handleAdd(type, price)}
                      >
                        <span className="capitalize font-medium">{type}</span>
                        <span className="font-bold">{price.toFixed(2)}€</span>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent className="rounded-full px-3 py-1 bg-primary text-white text-[10px] font-bold">
              {totalQuantity > 0 ? "Añadir otro formato" : "Añadir al pedido"}
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
      <div className={cn("flex items-center justify-center gap-3 bg-primary/5 rounded-full p-1 border border-primary/10", className)}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => updateQuantity(item.id, singleType, -1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="font-bold text-sm min-w-[1.2rem] text-center">{cartItem.quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => updateQuantity(item.id, singleType, 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex justify-center w-full", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variant}
              size="icon"
              className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 h-9 w-9 shadow-sm"
              onClick={() => handleAdd(singleType, singlePrice)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="rounded-full px-3 py-1 bg-primary text-white text-[10px] font-bold">
            Añadir al pedido
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

