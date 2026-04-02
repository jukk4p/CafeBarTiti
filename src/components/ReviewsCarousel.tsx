"use client"

import * as React from "react"
import { REVIEWS, REVIEWS_STATS } from "@/lib/reviews"
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

export function ReviewsCarousel() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary text-[10px] tracking-[0.3em] font-bold uppercase block">LO QUE DICEN DE NOSOTROS</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Nuestros Clientes Reales</h2>
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">{REVIEWS_STATS.average}</span>
              <StarRating rating={Math.floor(REVIEWS_STATS.average)} />
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Promedio basado en {REVIEWS_STATS.total} opiniones verificadas
            </p>
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

        <div className="mt-16 text-center">
          <ReviewsModal />
        </div>
      </div>
    </section>
  )
}
