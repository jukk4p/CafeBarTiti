"use client"

import React, { useState } from "react"
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, doc, Timestamp } from "firebase/firestore"
import { addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ShoppingBag, 
  Trash2, 
  User, 
  Clock, 
  Loader2,
  Inbox,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  Plus,
  Printer,
  DollarSign,
  Utensils,
  StickyNote,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface OrderItem {
  id: string
  nombre: string
  type: string
  price: number
  qty: number
}

interface Order {
  id: string
  customerName: string
  items: OrderItem[]
  total: number
  status: "pending" | "preparing" | "completed" | "cancelled"
  pickupTime: string
  notes?: string
  createdAt: any
}

// Platos frecuentes para añadir rápidamente en pedidos manuales
const FREQUENT_DISHES = [
  { id: "solomillo-whisky-tapa", nombre: "Solomillo al Whisky", type: "tapa", price: 4.00 },
  { id: "croquetas-puchero", nombre: "Croquetas de Puchero", type: "tapa", price: 4.00 },
  { id: "ensaladilla-rusa", nombre: "Ensaladilla Rusa", type: "tapa", price: 4.00 },
  { id: "serranito-lomo-pollo", nombre: "Serranito de Lomo", type: "racion", price: 5.00 },
  { id: "cana-cruzcampo", nombre: "Caña Cruzcampo", type: "tapa", price: 1.50 },
  { id: "cazon-adobo", nombre: "Cazón en Adobo", type: "tapa", price: 4.00 },
]

export default function AdminOrdersPage() {
  const { firestore } = useFirebase()
  const [filter, setFilter] = useState<"todos" | "pending" | "preparing" | "completed" | "cancelled">("todos")
  
  // Estado para el modal de nuevo pedido manual
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState("")
  const [newPickupTime, setNewPickupTime] = useState("Lo antes posible")
  const [newNotes, setNewNotes] = useState("")
  const [newItems, setNewItems] = useState<OrderItem[]>([])

  // Estado para añadir ítem personalizado en el modal
  const [customName, setCustomName] = useState("")
  const [customType, setCustomType] = useState("tapa")
  const [customPrice, setCustomPrice] = useState("")
  const [customQty, setCustomQty] = useState("1")

  const ordersQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, "orders"), orderBy("createdAt", "desc"))
  }, [firestore])

  const { data: rawOrders, isLoading } = useCollection(ordersQuery)
  const orders = rawOrders as Order[] | undefined

  // Funciones de actualización de estado
  const updateOrderStatus = (id: string, status: Order["status"]) => {
    if (!firestore) return
    const docRef = doc(firestore, "orders", id)
    updateDocumentNonBlocking(docRef, { status })
  }

  const deleteOrder = (id: string) => {
    if (!firestore) return
    const docRef = doc(firestore, "orders", id)
    deleteDocumentNonBlocking(docRef)
  }

  // Funciones para el formulario de nuevo pedido manual
  const addFrequentDish = (dish: typeof FREQUENT_DISHES[0]) => {
    setNewItems(prev => {
      const existing = prev.find(i => i.id === dish.id && i.type === dish.type)
      if (existing) {
        return prev.map(i => i.id === dish.id && i.type === dish.type ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { id: dish.id, nombre: dish.nombre, type: dish.type, price: dish.price, qty: 1 }]
    })
  }

  const addCustomDish = () => {
    if (!customName.trim() || !customPrice) return
    const priceNum = parseFloat(customPrice.replace(",", "."))
    const qtyNum = parseInt(customQty) || 1
    if (isNaN(priceNum)) return

    const newDish: OrderItem = {
      id: `custom-${Date.now()}`,
      nombre: customName.trim(),
      type: customType,
      price: priceNum,
      qty: qtyNum
    }

    setNewItems(prev => [...prev, newDish])
    setCustomName("")
    setCustomPrice("")
    setCustomQty("1")
  }

  const removeNewItem = (index: number) => {
    setNewItems(prev => prev.filter((_, i) => i !== index))
  }

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firestore || !newCustomerName.trim() || newItems.length === 0) return

    const total = newItems.reduce((sum, item) => sum + (item.price * item.qty), 0)

    const orderData = {
      customerName: newCustomerName.trim(),
      pickupTime: newPickupTime.trim() || "Lo antes posible",
      notes: newNotes.trim(),
      items: newItems,
      total: parseFloat(total.toFixed(2)),
      status: "pending",
      createdAt: Timestamp.now()
    }

    addDocumentNonBlocking(collection(firestore, "orders"), orderData)
    
    // Resetear formulario
    setNewCustomerName("")
    setNewPickupTime("Lo antes posible")
    setNewNotes("")
    setNewItems([])
    setIsNewOrderOpen(false)
  }

  // Filtrado y Estadísticas
  const filteredOrders = orders?.filter(order => 
    filter === "todos" ? true : order.status === filter
  )

  const pendingCount = orders?.filter(o => o.status === "pending").length || 0
  const preparingCount = orders?.filter(o => o.status === "preparing").length || 0
  const completedCount = orders?.filter(o => o.status === "completed").length || 0
  const todaysTotal = orders?.filter(o => o.status === "completed").reduce((sum, o) => sum + (o.total || 0), 0) || 0

  // Función para imprimir ticket
  const printTicket = (order: Order) => {
    const itemLines = order.items.map(i => `${i.qty}x ${i.nombre} (${i.type.toUpperCase()}) - ${(i.price * i.qty).toFixed(2)}€`).join('\n')
    const ticketContent = `
=== CAFÉ BAR TITI ===
TICKET DE PEDIDO #${order.id.slice(-6).toUpperCase()}
-----------------------------------
Cliente: ${order.customerName}
Recogida: ${order.pickupTime}
Fecha: ${format(new Date(), "dd/MM/yyyy HH:mm")}
-----------------------------------
${itemLines}
-----------------------------------
TOTAL: ${order.total.toFixed(2)}€
${order.notes ? `\nNOTAS: ${order.notes}\n-----------------------------------` : ''}
    `.trim()

    // Crear ventana emergente para imprimir
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Ticket #${order.id.slice(-6).toUpperCase()}</title>
            <style>
              body { font-family: monospace; white-space: pre-wrap; font-size: 14px; padding: 20px; color: #000; background: #fff; }
            </style>
          </head>
          <body>${ticketContent}</body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Cargando pedidos de cocina...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Cabecera y Botón Nuevo Pedido */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold">Gestión de Pedidos</h1>
          <p className="text-muted-foreground">Administra los pedidos de comida para recoger en el local.</p>
        </div>
        
        <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl font-bold gap-2 h-11 px-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
              <Plus className="h-5 w-5" /> Nuevo Pedido Manual
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-border bg-card p-6 md:p-8 shadow-2xl">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-headline font-bold flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" /> Crear Pedido Manual
              </DialogTitle>
              <p className="text-sm text-muted-foreground">Registra un pedido telefónico o de mesa directamente en cocina.</p>
            </DialogHeader>

            <form onSubmit={handleCreateOrder} className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="font-bold">Nombre del Cliente *</Label>
                  <Input 
                    id="customerName" 
                    placeholder="Ej. Paco Martínez" 
                    value={newCustomerName} 
                    onChange={e => setNewCustomerName(e.target.value)} 
                    className="rounded-xl h-11 bg-background/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupTime" className="font-bold">Hora de Recogida</Label>
                  <Input 
                    id="pickupTime" 
                    placeholder="Ej. 21:45 o Lo antes posible" 
                    value={newPickupTime} 
                    onChange={e => setNewPickupTime(e.target.value)} 
                    className="rounded-xl h-11 bg-background/50"
                  />
                </div>
              </div>

              {/* Botones rápidos de platos frecuentes */}
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Añadir Platos Rápidos</Label>
                <div className="flex flex-wrap gap-2">
                  {FREQUENT_DISHES.map(dish => (
                    <Button
                      key={dish.id}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addFrequentDish(dish)}
                      className="rounded-xl text-xs font-bold bg-background/30 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all gap-1"
                    >
                      <Plus className="h-3 w-3" /> {dish.nombre} ({dish.price}€)
                    </Button>
                  ))}
                </div>
              </div>

              {/* Añadir plato personalizado */}
              <div className="p-4 bg-muted/30 rounded-2xl border border-border space-y-4">
                <Label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Añadir Plato Personalizado</Label>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-5 space-y-1">
                    <Input 
                      placeholder="Nombre del plato" 
                      value={customName} 
                      onChange={e => setCustomName(e.target.value)}
                      className="rounded-xl h-10 bg-background"
                    />
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <Select value={customType} onValueChange={setCustomType}>
                      <SelectTrigger className="rounded-xl h-10 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tapa">Tapa</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="racion">Ración</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <Input 
                      placeholder="Precio (€)" 
                      type="number"
                      step="0.01"
                      value={customPrice} 
                      onChange={e => setCustomPrice(e.target.value)}
                      className="rounded-xl h-10 bg-background"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button 
                      type="button" 
                      onClick={addCustomDish} 
                      className="w-full rounded-xl h-10 font-bold bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    >
                      Añadir
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lista de platos añadidos */}
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Platos en el Pedido ({newItems.length})</Label>
                {newItems.length === 0 ? (
                  <div className="text-center py-8 bg-background/30 rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
                    No hay platos en el pedido todavía.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {newItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-background rounded-xl border border-border/50 text-sm">
                        <div className="flex items-center gap-3 font-medium">
                          <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md text-xs">
                            {item.qty}x
                          </span>
                          <span>{item.nombre} <span className="text-xs text-muted-foreground">({item.type.toUpperCase()})</span></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary">{(item.price * item.qty).toFixed(2)}€</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeNewItem(index)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 border-t border-border px-2 font-headline font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">{newItems.reduce((s, i) => s + (i.price * i.qty), 0).toFixed(2)}€</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="font-bold">Notas / Alergias (Opcional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Ej. Sin cebolla, muy hecho, alergia al marisco..." 
                  value={newNotes} 
                  onChange={e => setNewNotes(e.target.value)} 
                  className="rounded-xl bg-background/50 resize-none h-20"
                />
              </div>

              <DialogFooter className="gap-2 pt-4 border-t border-border/50">
                <Button type="button" variant="ghost" onClick={() => setIsNewOrderOpen(false)} className="rounded-xl font-bold">
                  Cancelar
                </Button>
                <Button type="submit" disabled={!newCustomerName.trim() || newItems.length === 0} className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20">
                  Guardar Pedido
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pendientes</p>
              <p className="text-3xl font-headline font-bold text-amber-500">{pendingCount}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <AlertCircle className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">En Cocina</p>
              <p className="text-3xl font-headline font-bold text-blue-500">{preparingCount}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <ChefHat className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Completados</p>
              <p className="text-3xl font-headline font-bold text-emerald-500">{completedCount}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Caja del Día</p>
              <p className="text-3xl font-headline font-bold text-primary">{todaysTotal.toFixed(2)}€</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas de Filtrado */}
      <div className="flex p-1 bg-muted/30 border border-border rounded-xl w-fit overflow-x-auto max-w-full">
        {(["todos", "pending", "preparing", "completed", "cancelled"] as const).map(f => {
          const labelMap = {
            todos: "Todos",
            pending: "Pendientes",
            preparing: "En Preparación",
            completed: "Completados",
            cancelled: "Cancelados"
          }
          return (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              onClick={() => setFilter(f)}
              size="sm"
              className={cn(
                "rounded-lg text-xs font-bold tracking-wide h-9 px-4 transition-all whitespace-nowrap",
                filter === f 
                  ? "bg-primary text-white shadow-md" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              {labelMap[f]}
            </Button>
          )
        })}
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {!filteredOrders || filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-card/50 rounded-[2rem] border-2 border-dashed border-muted flex flex-col items-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">No hay pedidos {filter !== 'todos' ? `en estado "${filter}"` : ''}</h3>
            {filter !== 'todos' && (
              <Button variant="link" onClick={() => setFilter('todos')} className="mt-4 text-primary font-bold">
                Ver todos los pedidos
              </Button>
            )}
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusConfig = {
              pending: { color: "border-l-amber-500 bg-amber-500/[0.02]", badge: "bg-amber-500 text-black", label: "Pendiente" },
              preparing: { color: "border-l-blue-500 bg-blue-500/[0.02]", badge: "bg-blue-500 text-white", label: "En Preparación" },
              completed: { color: "border-l-emerald-500 bg-emerald-500/[0.02]", badge: "bg-emerald-500 text-white", label: "Completado" },
              cancelled: { color: "border-l-destructive/50 bg-destructive/[0.02]", badge: "bg-destructive text-white", label: "Cancelado" },
            }[order.status || "pending"]

            return (
              <Card key={order.id} className={cn(
                "overflow-hidden border-l-4 transition-all hover:bg-muted/5 rounded-2xl border-border/50 shadow-sm",
                statusConfig.color
              )}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Detalles del Pedido */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-base font-headline font-bold bg-background px-3 py-1.5 rounded-xl border border-border/50 shadow-sm">
                          <User className="h-4 w-4 text-primary" />
                          {order.customerName}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background px-3 py-1.5 rounded-xl border border-border/50">
                          <Clock className="h-4 w-4 text-amber-500" />
                          Recogida: <span className="font-bold text-foreground">{order.pickupTime || "Lo antes posible"}</span>
                        </div>
                        <Badge className={cn("uppercase text-[10px] font-bold px-3 py-1 rounded-full ml-auto shadow-sm", statusConfig.badge)}>
                          {statusConfig.label}
                        </Badge>
                      </div>

                      {/* Platos del Pedido */}
                      <div className="bg-background/80 rounded-2xl border border-border/50 p-4 space-y-3 shadow-inner">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2 px-1">
                          <span>Platos ({order.items?.length || 0})</span>
                          <span>Subtotal</span>
                        </div>
                        <div className="space-y-2">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm px-1 font-medium">
                              <div className="flex items-center gap-3">
                                <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md text-xs">
                                  {item.qty || 1}x
                                </span>
                                <span>{item.nombre} <span className="text-xs text-muted-foreground">({(item.type || "").toUpperCase()})</span></span>
                              </div>
                              <span className="font-bold text-foreground">{((item.price || 0) * (item.qty || 1)).toFixed(2)}€</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-border/50 px-1 font-headline font-bold text-base">
                          <span className="text-muted-foreground">Total Pedido:</span>
                          <span className="text-primary text-xl">{(order.total || 0).toFixed(2)}€</span>
                        </div>
                      </div>

                      {/* Notas del cliente */}
                      {order.notes && (
                        <div className="bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/20 text-amber-200/90 flex gap-3 items-start">
                          <StickyNote className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Notas / Alergias del cliente</p>
                            <p className="text-sm italic leading-relaxed">{order.notes}</p>
                          </div>
                        </div>
                      )}

                      {/* Fecha de creación */}
                      <div className="text-[11px] text-muted-foreground px-1">
                        Registrado el: {(() => {
                          if (!order.createdAt) return "—";
                          try {
                            const date = typeof order.createdAt.toDate === 'function' 
                              ? order.createdAt.toDate() 
                              : new Date(order.createdAt);
                            return format(date, "d 'de' MMMM, HH:mm", { locale: es });
                          } catch (e) {
                            return "Fecha no válida";
                          }
                        })()}
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-row lg:flex-col gap-2 justify-end items-end min-w-[180px] border-t lg:border-t-0 lg:border-l border-border/50 pt-4 lg:pt-0 lg:pl-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => printTicket(order)}
                        className="rounded-xl font-bold gap-2 h-10 w-full bg-background hover:bg-background/80 shadow-sm"
                      >
                        <Printer className="h-4 w-4" /> Imprimir
                      </Button>

                      {order.status === "pending" && (
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, "preparing")}
                          className="rounded-xl font-bold gap-2 h-10 w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10"
                        >
                          <ChefHat className="h-4 w-4" /> A Cocina
                        </Button>
                      )}

                      {(order.status === "pending" || order.status === "preparing") && (
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, "completed")}
                          className="rounded-xl font-bold gap-2 h-10 w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10"
                        >
                          <CheckCircle2 className="h-4 w-4" /> Completar
                        </Button>
                      )}

                      {order.status !== "cancelled" && order.status !== "completed" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                          className="rounded-xl font-bold gap-2 h-10 w-full text-destructive hover:bg-destructive/10"
                        >
                          Cancelar
                        </Button>
                      )}

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteOrder(order.id)}
                        className="rounded-xl font-bold gap-2 h-10 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 lg:mt-auto"
                      >
                        <Trash2 className="h-4 w-4" /> Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
