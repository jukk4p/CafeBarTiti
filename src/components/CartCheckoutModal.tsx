"use client"

import * as React from "react"
import { useCart } from "@/context/CartContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, Send, Clock, CreditCard, ChevronRight } from "lucide-react"

interface CartCheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartCheckoutModal({ open, onOpenChange }: CartCheckoutModalProps) {
  const { items, total, updateQuantity, clearCart } = useCart()
  const [name, setName] = React.useState("")
  const [pickupTime, setPickupTime] = React.useState("Pronto (aprox 40min)")

  const isWeekend = () => {
    const day = new Date().getDay()
    return day === 0 || day === 5 || day === 6 // Sun, Fri, Sat
  }

  const handleWhatsApp = () => {
    if (!name) return

    const orderText = items.map(i => `- ${i.quantity}x ${i.nombre} (${i.variant || i.type.toUpperCase()})`).join("\n")
    const message = `📝 NUEVO PEDIDO PARA RECOGER\n---------------------\n👤 Nombre: ${name}\n🕒 Recogida: ${pickupTime}\n💳 Pago: En el local (Efectivo/Tarjeta)\n---------------------\n🥘 PEDIDO:\n${orderText}\n---------------------\n💶 TOTAL: ${total.toFixed(2)}€\n\n¡Gracias!`
    
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/34954772132?text=${encoded}`, "_blank")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px] w-[95vw] h-auto max-h-[95vh] p-0 overflow-hidden border-none rounded-[1.5rem] md:rounded-[2rem] bg-background gap-0 shadow-2xl flex flex-col">
        {/* Header - Compacto */}
        <DialogHeader className="bg-primary px-6 py-4 text-white flex flex-col items-center justify-center text-center shrink-0">
          <DialogTitle className="text-base md:text-xl font-headline font-semibold flex items-center gap-2">
            <Send className="h-4 w-4 md:h-5 md:w-5" />
            Finalizar Pedido
          </DialogTitle>
          <DialogDescription className="text-white/60 font-medium uppercase tracking-[0.2em] text-[7px] mt-1">
            Todo listo para preparar tu tapeo
          </DialogDescription>
        </DialogHeader>

        {/* Cuerpo - Scrollable y flexible */}
        <div className="flex-1 overflow-y-auto min-h-0 bg-background/50">
          <div className="p-4 md:px-8 md:py-6 space-y-6 pb-6">
            {/* Formulario */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="space-y-1.5 w-full max-w-[320px] flex flex-col items-center">
                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 text-center">Tu Nombre</label>
                <Input 
                  placeholder="Ej. Juan Pérez" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 rounded-lg border-muted bg-muted/20 focus:bg-background transition-all text-center text-sm font-sans"
                />
              </div>
              
              <div className="space-y-1.5 w-full max-w-[320px] flex flex-col items-center">
                  <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 text-center">Hora de Recogida</label>
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                      <Button 
                          variant={pickupTime.includes("Pronto") ? "default" : "outline"}
                          className="flex-1 rounded-lg h-9 text-[8px] font-bold"
                          onClick={() => setPickupTime(isWeekend() ? "Pronto (aprox 40min)" : "Pronto (aprox 20-30min)")}
                      >
                          <Clock className="h-3 w-3 mr-1.5" />
                          LO ANTES POSIBLE
                      </Button>
                      <select 
                          className="flex-1 rounded-lg border border-input bg-background px-2 h-9 text-[8px] font-bold text-center appearance-none cursor-pointer"
                          value={pickupTime.includes("Pronto") ? "" : pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                      >
                          <option value="" disabled>SELECCIONAR HORA...</option>
                          {["20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"].map(h => (
                              <option key={h} value={h}>{h}</option>
                          ))}
                      </select>
                  </div>
              </div>
            </div>

            {/* Resumen del Carrito */}
            <div className="space-y-4 flex flex-col items-center border-t border-muted/30 pt-6">
              <div className="flex flex-col items-center gap-1.5">
                  <h4 className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Tu Selección</h4>
                  <button 
                    onClick={clearCart}
                    className="text-[7px] font-bold text-red-500/30 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="h-2 w-2" /> vaciar
                  </button>
              </div>

              <div className="space-y-4 w-full">
                {items.length === 0 ? (
                  <p className="text-center py-6 text-muted-foreground italic text-[10px]">Tu carrito está vacío</p>
                ) : (
                  items.map((item) => (
                    <div key={`${item.id}-${item.type}-${item.variant}`} className="flex flex-col items-center gap-2 group">
                      <div className="text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-sm leading-tight text-center max-w-[240px]">
                            {item.nombre}
                          </span>
                          {item.variant && (
                            <span className="text-primary font-bold text-[9px] mt-0.5 uppercase tracking-widest opacity-70">
                              ({item.variant})
                            </span>
                          )}
                          <span className="text-[7px] uppercase font-bold text-muted-foreground/40 mt-1 tracking-[0.1em]">{item.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-muted/30 rounded-full p-0.5 border border-border/30">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full hover:bg-background"
                            onClick={() => updateQuantity(item.id, item.type, -1, item.variant)}
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </Button>
                          <span className="text-[10px] font-bold w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full hover:bg-background"
                            onClick={() => updateQuantity(item.id, item.type, 1, item.variant)}
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </Button>
                        </div>
                        <span className="text-sm font-bold text-primary min-w-[50px] text-center">{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Totales y Aviso (Fixed at bottom) - Ultra Compacto */}
        <div className="p-4 md:px-8 md:py-4 border-t border-border/30 bg-card flex flex-col items-center shrink-0">
          <div className="bg-primary/5 rounded-lg p-2 flex items-center justify-center gap-2 border border-primary/5 w-full max-w-[320px] mb-3">
              <CreditCard className="h-3.5 w-3.5 text-primary/50" />
              <div className="flex flex-col">
                  <span className="text-[7px] font-bold uppercase tracking-widest text-primary/50">Método de Pago</span>
                  <span className="text-[9px] font-medium opacity-70">Pago en el local (Efectivo / Tarjeta)</span>
              </div>
          </div>

          <div className="flex flex-col items-center gap-0 mb-4">
            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40">Total</span>
            <span className="text-xl md:text-2xl font-headline font-bold text-primary leading-none">{total.toFixed(2)}€</span>
          </div>

          <div className="w-full space-y-2">
            <Button 
              className="w-full h-10 md:h-12 rounded-xl bg-primary text-white transition-all font-headline font-semibold text-sm gap-1.5 disabled:opacity-50"
              disabled={items.length === 0 || !name}
              onClick={handleWhatsApp}
            >
              Confirmar por WhatsApp
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <p className="text-[7px] text-center text-muted-foreground/30 uppercase tracking-[0.1em] font-bold">
              Mensaje automático al bar
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
