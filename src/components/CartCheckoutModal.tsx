"use client"

import * as React from "react"
import { useCart } from "@/context/CartContext"
import { useFirebase } from "@/firebase"
import { collection, Timestamp } from "firebase/firestore"
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, Send, Clock, CreditCard, ChevronRight, ArrowRight, ShoppingBag, Pencil, Calendar } from "lucide-react"

interface CartCheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartCheckoutModal({ open, onOpenChange }: CartCheckoutModalProps) {
  const { items, total, updateQuantity, clearCart } = useCart()
  const { firestore } = useFirebase()
  const [name, setName] = React.useState("")
  const [pickupTime, setPickupTime] = React.useState("Pronto (aprox 40min)")
  const [notes, setNotes] = React.useState("")
  const [showNotes, setShowNotes] = React.useState(false)

  const isWeekend = () => {
    const day = new Date().getDay()
    return day === 0 || day === 5 || day === 6 // Sun, Fri, Sat
  }

  const handleWhatsApp = () => {
    if (!name) return

    // 1. Guardar el pedido en Firebase Firestore automáticamente para el panel de cocina
    if (firestore && items.length > 0) {
      const orderItems = items.map(i => ({
        id: i.id,
        nombre: i.nombre,
        type: i.variant || i.type,
        price: i.price,
        qty: i.quantity
      }))

      const orderData = {
        customerName: name.trim(),
        pickupTime: pickupTime.trim(),
        notes: notes.trim(),
        items: orderItems,
        total: parseFloat(total.toFixed(2)),
        status: "pending",
        createdAt: Timestamp.now()
      }

      addDocumentNonBlocking(collection(firestore, "orders"), orderData)
    }

    // 2. Abrir WhatsApp para enviar la confirmación al bar
    const orderText = items.map(i => `- ${i.quantity}x ${i.nombre} (${i.variant || i.type.toUpperCase()})`).join("\n")
    const notesText = notes.trim() ? `\n\n⚠️ NOTAS/ALERGIAS:\n${notes.trim()}` : ""
    
    const message = `📝 NUEVO PEDIDO PARA RECOGER\n---------------------\n👤 Nombre: ${name}\n🕒 Recogida: ${pickupTime}\n💳 Pago: En el local (Efectivo/Tarjeta)\n---------------------\n🥘 PEDIDO:\n${orderText}${notesText}\n---------------------\n💶 TOTAL: ${total.toFixed(2)}€\n\n¡Gracias!`
    
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/34661554522?text=${encoded}`, "_blank")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px] w-[95vw] h-auto max-h-[92vh] p-0 overflow-hidden border-none rounded-[1.5rem] bg-background text-foreground gap-0 shadow-2xl flex flex-col font-sans">
        {/* Header - Brand Identity (Constant in both modes) */}
        <DialogHeader className="bg-primary px-5 py-4 shrink-0 flex flex-row items-start gap-4 space-y-0 rounded-t-[1.5rem] text-white">
          <div className="bg-white/10 p-2.5 rounded-xl shadow-inner">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5 text-left">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-xl font-bold tracking-tight">Finalizar pedido</DialogTitle>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <DialogDescription className="text-white/50 font-bold uppercase tracking-[0.15em] text-[9px]">
              Todo listo para preparar tu tapeo
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Body - Dynamic Background & Text */}
        <div className="flex-1 overflow-y-auto min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-5 space-y-6">
          
          {/* 1. Datos del Cliente */}
          <div className="space-y-4 text-left">
            <div className="space-y-1.5">
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Tus Datos</h4>
              <Input 
                placeholder="Ej. Juan Pérez" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 rounded-xl border-border bg-muted/20 focus:bg-background transition-all text-sm font-medium placeholder:text-muted-foreground/30"
              />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">¿A qué hora vienes?</h4>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className={cn(
                    "flex-1 rounded-xl h-10 text-[9px] font-bold uppercase tracking-[0.05em] transition-all border-border shadow-sm px-3",
                    pickupTime.includes("Pronto") 
                      ? "bg-primary/5 border-primary/30 text-primary" 
                      : "bg-transparent text-foreground opacity-60 hover:opacity-100"
                  )}
                  onClick={() => setPickupTime(isWeekend() ? "Pronto (aprox 40min)" : "Pronto (aprox 20-30min)")}
                >
                  <Clock className="h-3.5 w-3.5 mr-2 opacity-50 shrink-0" />
                  <span className="truncate">Lo antes posible</span>
                </Button>
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground opacity-50 pointer-events-none" />
                  <select 
                    className="w-full h-10 rounded-xl border border-border bg-transparent pl-9 pr-8 text-[9px] font-bold uppercase tracking-[0.05em] appearance-none cursor-pointer focus:border-primary/30 transition-all text-foreground opacity-60 focus:opacity-100"
                    value={pickupTime.includes("Pronto") ? "" : pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  >
                    <option value="" disabled className="bg-background">Elegir hora</option>
                    {["20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"].map(h => (
                      <option key={h} value={h} className="bg-background text-foreground text-xs">{h}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 rotate-90 text-muted-foreground opacity-50 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Lista de Selección */}
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Tu Selección</h4>
              <Button 
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="h-6 px-3 text-[8px] font-bold text-muted-foreground/40 hover:text-red-500 hover:bg-red-50/5 transition-all uppercase tracking-[0.15em] border border-border/50 rounded-full"
              >
                Vaciar cesta
              </Button>
            </div>

            <div className="divide-y divide-border/30">
              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground/40 italic text-xs">Tu cesta está vacía</div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.type}-${item.variant}`} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Quantity Compact Control */}
                      <div className="flex items-center border border-border rounded-lg p-0.5 bg-muted/20 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-md hover:bg-background text-muted-foreground/40 hover:text-foreground"
                          onClick={() => updateQuantity(item.id, item.type, -1, item.variant)}
                        >
                          <Minus className="h-2 w-2" />
                        </Button>
                        <span className="text-[10px] font-bold w-5 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-md hover:bg-background text-foreground"
                          onClick={() => updateQuantity(item.id, item.type, 1, item.variant)}
                        >
                          <Plus className="h-2 w-2" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[12px] truncate text-foreground leading-tight">
                          {item.nombre}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-muted-foreground/40">
                          {item.variant ? `${item.variant} • ` : ""}{item.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <span className="text-[13px] font-bold text-foreground">{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Note Button / Field */}
            <div className="space-y-3 pt-1">
              {!showNotes ? (
                <Button 
                  variant="outline" 
                  onClick={() => setShowNotes(true)}
                  className="w-full h-9 rounded-xl border-border bg-muted/10 text-[9px] font-bold uppercase tracking-widest gap-2 opacity-50 hover:opacity-100 hover:bg-muted/20 transition-all text-foreground"
                >
                  <Pencil className="h-3 w-3 opacity-40" />
                  Añadir nota o alergias
                </Button>
              ) : (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Nota o Alergias</h4>
                    <button 
                      onClick={() => { setShowNotes(false); setNotes(""); }}
                      className="text-[8px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-widest transition-colors"
                    >
                      Quitar nota
                    </button>
                  </div>
                  <textarea
                    placeholder="Ej. Sin cebolla, alérgico a los frutos secos..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-20 rounded-xl border border-border bg-muted/20 p-3 text-xs font-medium placeholder:text-muted-foreground/30 focus:bg-background focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all resize-none text-foreground"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Checkout Action */}
        <div className="p-5 bg-muted/10 border-t border-border space-y-4 shrink-0 rounded-b-[1.5rem]">
          <div className="space-y-0.5">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              <span>Subtotal</span>
              <span>{total.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-xs font-bold text-muted-foreground/70">Total a pagar</span>
              <span className="text-2xl font-bold tracking-tight text-foreground">{total.toFixed(2)}€</span>
            </div>
          </div>

          <Button 
            className={cn(
              "w-full h-10 rounded-xl text-white transition-all duration-300 font-bold text-[11px] uppercase tracking-widest gap-3 shadow-xl active:scale-[0.98]",
              !name || items.length === 0 
                ? "bg-muted text-muted-foreground cursor-not-allowed" 
                : "bg-primary hover:bg-primary/90"
            )}
            disabled={items.length === 0 || !name}
            onClick={handleWhatsApp}
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Confirmar por WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
