"use client"

import * as React from "react"
import { Review, REVIEWS, REVIEWS_STATS } from "@/lib/reviews"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ReviewCard } from "./ReviewCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StarRating } from "./StarRating"

export function ReviewsModal() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const triggerButton = (
    <Button
      variant="outline"
      className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 font-bold px-10 py-6 rounded-full"
    >
      Ver todas las reseñas ({REVIEWS.length})
    </Button>
  )

  // Prevenir error de hidratación: renderizar solo el botón estático en el servidor e inicial inicial en el cliente
  if (!mounted) {
    return triggerButton
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="p-8 pb-4 bg-primary text-white">
          <DialogTitle className="text-3xl font-headline flex items-center justify-between">
            Opiniones de nuestros clientes
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{REVIEWS_STATS.average}</span>
                <StarRating rating={Math.floor(REVIEWS_STATS.average)} className="text-white" />
              </div>
              <span className="text-xs font-light opacity-80 uppercase tracking-widest">
                Basado en {REVIEWS_STATS.total} opiniones
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} className="bg-background shadow-none border-muted h-full" />
            ))}
          </div>
        </ScrollArea>
        <div className="p-6 bg-muted/30 border-t flex justify-center italic text-sm text-muted-foreground">
          Información recopilada de Google, TripAdvisor y otras plataformas.
        </div>
      </DialogContent>
    </Dialog>
  )
}
