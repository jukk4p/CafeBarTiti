"use client"

import React, { useState } from "react"
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, doc } from "firebase/firestore"
import { deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Trash2, 
  User, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Loader2,
  Inbox,
  Filter,
  Phone
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function AdminReservasPage() {
  const { firestore } = useFirebase()
  const [filter, setFilter] = useState<"todos" | "nuevo" | "revisado">("todos")

  const contactsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, "reservas"), orderBy("createdAt", "desc"))
  }, [firestore])

  const { data: messages, isLoading } = useCollection(contactsQuery)

  const markAsRead = (id: string) => {
    if (!firestore) return
    const docRef = doc(firestore, "reservas", id)
    updateDocumentNonBlocking(docRef, { status: "revisado" })
  }

  const deleteMessage = (id: string) => {
    if (!firestore) return
    const docRef = doc(firestore, "reservas", id)
    deleteDocumentNonBlocking(docRef)
  }

  const filteredMessages = messages?.filter(msg => 
    filter === "todos" ? true : msg.status === filter
  )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Buscando reservas...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold">Gestión de Reservas</h1>
          <p className="text-muted-foreground">Revisa las solicitudes de mesa enviadas por los clientes.</p>
        </div>
        
        <div className="flex p-1 bg-muted/30 border border-border rounded-xl">
          {(["todos", "nuevo", "revisado"] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              onClick={() => setFilter(f)}
              size="sm"
              className={cn(
                "rounded-lg text-[10px] font-bold uppercase tracking-widest h-8 px-4 transition-all",
                filter === f 
                  ? "bg-primary text-white shadow-md" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {!filteredMessages || filteredMessages.length === 0 ? (
          <div className="text-center py-20 bg-card/50 rounded-[2rem] border-2 border-dashed border-muted flex flex-col items-center">
            <Inbox className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">No hay reservas {filter !== 'todos' ? `en "${filter}"` : ''}</h3>
            {filter !== 'todos' && (
              <Button variant="link" onClick={() => setFilter('todos')} className="mt-4 text-primary font-bold">
                Ver todas las reservas
              </Button>
            )}
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <Card key={msg.id} className={cn(
              "overflow-hidden border-l-4 transition-all hover:bg-muted/5 rounded-2xl",
              msg.status === "nuevo" ? "border-l-primary bg-primary/[0.02]" : "border-l-muted/50"
            )}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm font-bold bg-muted/50 px-3 py-1 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                        {msg.nombre}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {msg.telefono}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto bg-card border border-border px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4" />
                        Recibida: {(() => {
                          if (!msg.createdAt) return "—";
                          try {
                            const date = typeof msg.createdAt.toDate === 'function' 
                              ? msg.createdAt.toDate() 
                              : new Date(msg.createdAt);
                            return format(date, "d 'de' MMM, HH:mm", { locale: es });
                          } catch (e) {
                            return "Fecha no válida";
                          }
                        })()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-background/80 p-3 rounded-xl border border-border/50 text-center">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Fecha</p>
                        <p className="font-bold text-primary">{msg.fecha || "—"}</p>
                      </div>
                      <div className="bg-background/80 p-3 rounded-xl border border-border/50 text-center">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Hora</p>
                        <p className="font-bold text-primary">{msg.hora || "—"}</p>
                      </div>
                      <div className="bg-background/80 p-3 rounded-xl border border-border/50 text-center">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Mesas/Pax</p>
                        <p className="font-bold text-primary">{msg.mesas || "1"}</p>
                      </div>
                      <div className="bg-background/80 p-3 rounded-xl border border-border/50 text-center">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Estado</p>
                        <Badge variant={msg.status === "nuevo" ? "default" : "secondary"} className="uppercase text-[9px] h-5">
                          {msg.status || "nuevo"}
                        </Badge>
                      </div>
                    </div>

                    {msg.notas && (
                      <div className="bg-muted/30 p-3 rounded-xl border border-dashed border-border/50 mt-2">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Notas del cliente:</p>
                        <p className="text-sm italic text-foreground/80 leading-relaxed">"{msg.notas}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col gap-2 justify-end min-w-[150px]">
                    {msg.status === "nuevo" && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={() => markAsRead(msg.id)}
                        className="rounded-xl font-bold gap-2 h-11 w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Atendida
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteMessage(msg.id)}
                      className="rounded-xl font-bold gap-2 h-11 w-full shadow-md shadow-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" /> Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

