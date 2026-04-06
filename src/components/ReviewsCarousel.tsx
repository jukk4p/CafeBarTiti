"use client"

import * as React from "react"
import { REVIEWS, REVIEWS_STATS, GOOGLE_REVIEWS_URL } from "@/lib/reviews"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ReviewCard } from "./ReviewCard"
import { ReviewsModal } from "./ReviewsModal"
import { StarRating } from "./StarRating"
import { ExternalLink, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ReviewsCarousel() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-primary text-[10px] tracking-[0.3em] font-bold uppercase block">CLIENTES REALES</span>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Google Reviews</h2>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3 pt-2">
            <div className="flex items-center gap-4 bg-stone-100 dark:bg-stone-900 px-6 py-3 rounded-2xl border border-border/50">
              <span className="text-3xl font-bold text-foreground">{REVIEWS_STATS.average}</span>
              <div className="flex flex-col items-start leading-none">
                <StarRating rating={Math.floor(REVIEWS_STATS.average)} />
                <a 
                  href={GOOGLE_REVIEWS_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1.5 hover:text-primary transition-colors flex items-center gap-1.5 group"
                >
                  Basado en {REVIEWS_STATS.total} opiniones verificadas
                  <ExternalLink className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {REVIEWS.map((review) => (
                <CarouselItem key={review.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <ReviewCard
                      review={review}
                      className="h-full border border-border/50 shadow-xl bg-card hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-primary text-primary hover:bg-primary hover:text-white h-11 w-11 cursor-pointer" />
            <CarouselNext className="hidden md:flex -right-12 border-primary text-primary hover:bg-primary hover:text-white h-11 w-11 cursor-pointer" />
          </Carousel>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ReviewsModal />
          <Button 
            variant="outline" 
            asChild
            className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white transition-all group"
          >
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              <span>Dejar reseña en Google</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
