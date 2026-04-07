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
        "fixed left-0 right-0 z-[70] px-0 md:px-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-10",
        "bottom-0 md:bottom-8 h-20 md:h-22"
      )}>
        <div className={cn(
          "max-w-xl mx-auto h-full flex items-center justify-between px-6 md:px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] md:shadow-[0_20px_60px_rgba(0,0,0,0.3)] group transition-all",
          "bg-primary/95 backdrop-blur-xl border-t border-white/10 md:border md:rounded-[2.5rem] md:bg-primary"
        )}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="bg-white/20 p-2.5 rounded-xl text-white">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 bg-secondary text-primary font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-primary animate-bounce">
                {itemCount}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/70">Tu Pedido</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl md:text-2xl font-headline font-bold text-white tracking-tight">{total.toFixed(2)}</span>
                <span className="text-sm font-bold text-white/80">€</span>
              </div>
            </div>
          </div>

          <Button 
            className="rounded-full bg-white text-primary hover:bg-secondary hover:text-primary gap-3 h-11 md:h-12 px-6 md:px-8 font-bold shadow-xl transition-all duration-300 active:scale-95 group/btn"
            onClick={() => setIsCheckoutOpen(true)}
          >
            <span className="hidden sm:inline">Ver mi pedido</span>
            <span className="inline sm:hidden">Ver pedido</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
          </Button>
        </div>
      </div>

      <CartCheckoutModal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </>
  )
}
