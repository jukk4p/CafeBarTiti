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
  const [isVisible, setIsVisible] = React.useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false)

  React.useEffect(() => {
    if (itemCount > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [itemCount])

  if (!isVisible) return null

  return (
    <>
      <div className="fixed bottom-6 left-0 right-0 z-50 px-4 animate-in fade-in slide-in-from-bottom-10 h-16 md:h-20 max-w-lg mx-auto">
        <div className="bg-primary shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-primary-foreground/10 rounded-[2rem] w-full h-full flex items-center justify-between px-6 md:px-8 group">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="bg-white/20 p-2.5 rounded-xl text-white">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 bg-secondary text-primary font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-primary">
                {itemCount}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Tu Pedido</span>
              <span className="text-lg md:text-xl font-headline font-bold text-white">{total.toFixed(2)}€</span>
            </div>
          </div>

          <Button 
            className="rounded-full bg-white text-primary hover:bg-secondary hover:text-primary gap-2 h-10 md:h-12 px-6 font-bold shadow-xl transition-all duration-300"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Ver Pedido
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Modal para finalizar pedido */}
      <CartCheckoutModal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </>
  )
}
