"use client"

import * as React from "react"
import { useCart } from "@/context/CartContext"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// Importamos el CheckoutModal
import { CartCheckoutModal } from "./CartCheckoutModal"

export function FloatingCart() {
  const { total, itemCount } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false)

  if (itemCount === 0) return null

  return (
    <>
      <div className={cn(
        "fixed left-0 right-0 z-[40] px-4 transition-all duration-500",
        "bottom-6 h-20 md:h-22",
        isCheckoutOpen ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
      )}>
        <div className={cn(
          "max-w-[440px] mx-auto h-full flex items-center justify-between px-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 rounded-[2rem] bg-primary/95 backdrop-blur-xl select-none"
        )}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="bg-white/10 p-2.5 rounded-xl text-white shadow-inner">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 bg-white text-primary font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center shadow-lg border-2 border-primary">
                {itemCount}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/50">Tu Pedido</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tracking-tighter leading-none">{total.toFixed(2)}</span>
                <span className="text-sm font-bold text-white/60">€</span>
              </div>
            </div>
          </div>

          <Button 
            className="rounded-2xl bg-white text-primary hover:bg-white/90 gap-2 h-11 px-6 font-bold shadow-xl transition-all duration-300 active:scale-95 group/btn"
            onClick={() => setIsCheckoutOpen(true)}
          >
            <span className="text-xs uppercase tracking-widest">Ver pedido</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
          </Button>
        </div>
      </div>

      <CartCheckoutModal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </>
  )
}
