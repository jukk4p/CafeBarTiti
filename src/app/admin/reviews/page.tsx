"use client"

import React, { useState } from "react"
import { useFirebase } from "@/firebase"
import { useCollection } from "@/firebase/firestore/use-collection"
import { useMemoFirebase } from "@/firebase/provider"
import { collection, query, orderBy, doc } from "firebase/firestore"
import { updateDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { 
  Loader2, 
  MessageSquare, 
  Star, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  User,
  Quote
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function AdminReviewsPage() {
  const { firestore } = useFirebase()
  const [filter, setFilter] = useState<"todos" | "pendientes" | "aprobados">("todos")

  const reviewsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, "reviews"), orderBy("createdAt", "desc"))
  }, [firestore])

  const { data: reviews, isLoading } = useCollection(reviewsQuery)

  const toggleApproval = (id: string, currentStatus: boolean) => {
    if (!firestore) return
    const docRef = doc(firestore, "reviews", id)
    updateDocumentNonBlocking(docRef, { approved: !currentStatus })
  }

  const deleteReview = (id: string) => {
    if (!firestore) return
    if (!confirm("¿Seguro que quieres borrar este testimonio?")) return
    const docRef = doc(firestore, "reviews", id)
    deleteDocumentNonBlocking(docRef)
  }

  const filteredReviews = reviews?.filter(rev => {
    if (filter === "todos") return true
    if (filter === "pendientes") return !rev.approved
    if (filter === "aprobados") return rev.approved
    return true
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Cargando testimonios...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-primary">Testimonios</h1>
          <p className="text-muted-foreground italic">Lo que dicen los clientes de Cafe Bar Titi.</p>
        </div>
        
        <div className="flex p-1 bg-muted/30 border border-border rounded-xl">
          {(["todos", "pendientes", "aprobados"] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              onClick={() => setFilter(f)}
              size="sm"
              className={cn(
                "rounded-lg text-[10px] font-bold uppercase tracking-widest h-8 px-4 transition-all",
                filter === f 
                  ? "bg-primary text-white shadow-md" 
                  : "text-muted-foreground hover:bg-primary/10"
              )}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!filteredReviews || filteredReviews.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-card/50 rounded-[2rem] border-2 border-dashed border-muted flex flex-col items-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground font-headline">No hay testimonios todavía</h3>
            <p className="text-sm text-muted-foreground mt-2 italic">Aún no han dejado reseñas en esta categoría.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <Card key={rev.id} className={cn(
              "overflow-hidden transition-all border-none shadow-sm hover:shadow-md rounded-[2rem] relative bg-card",
              !rev.approved && "opacity-80"
            )}>
              <CardContent className="p-8">
                <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/5 -z-0" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg leading-none mb-1">{rev.name || "Cliente Anónimo"}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-3 w-3", 
                                i < (rev.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-muted underline decoration-dotted"
                              )} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Badge variant={rev.approved ? "outline" : "default"} className={cn(
                      "uppercase text-[9px] font-bold tracking-tighter h-5 px-2",
                      rev.approved ? "border-emerald-500 text-emerald-600" : "bg-amber-500 text-white"
                    )}>
                      {rev.approved ? "Aprobado" : "Pendiente"}
                    </Badge>
                  </div>

                  <p className="text-foreground/80 italic leading-relaxed text-sm bg-muted/20 p-4 rounded-2xl border border-border/30">
                    "{rev.comment || rev.text || "Sin comentario."}"
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                      {rev.createdAt ? format(
                        typeof rev.createdAt.toDate === 'function' ? rev.createdAt.toDate() : new Date(rev.createdAt), 
                        "d 'de' MMMM, yyyy", 
                        { locale: es }
                      ) : "Hace tiempo"}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleApproval(rev.id, rev.approved)}
                        className={cn(
                          "rounded-xl h-9 px-3 gap-2 font-bold text-[11px]",
                          rev.approved ? "text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"
                        )}
                      >
                        {rev.approved ? (
                          <><XCircle className="h-4 w-4" /> Ocultar</>
                        ) : (
                          <><CheckCircle2 className="h-4 w-4" /> Aprobar</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteReview(rev.id)}
                        className="rounded-xl h-9 px-3 gap-2 font-bold text-[11px] text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" /> Borrar
                      </Button>
                    </div>
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
