"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const HERO_IMAGES = [
  "/Portada/00_Portada.webp",
  "/Portada/01_Portada.webp",
  "/Portada/02_Portada.webp",
  "/Portada/03_Portada.webp"
]

export function HeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden bg-black">
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={src}
            alt={`Portada Cafe Bar Titi ${index + 1}`}
            fill
            className="object-cover sepia-[.3] contrast-125 saturate-50 blur-[1px] brightness-50 scale-105"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="relative z-10 max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-white/10">
          <Sparkles className="h-3 w-3 text-white" />
          <span className="text-white text-[10px] tracking-[0.2em] font-bold uppercase">TRADICIÓN SEVILLANA DESDE 1968</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-white leading-[1.1] drop-shadow-2xl">
          El Corazón del<br />Tapeo en Coria
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          Desde 1968, el sabor de Coria del Río servido con alma y tradición familiar.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 text-[10px] font-bold tracking-widest px-10 py-6 rounded-md uppercase shadow-xl">
            <Link href="/menu">VER NUESTRA CARTA</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-white/5 text-white border-white/20 backdrop-blur-md hover:bg-white/10 text-[10px] font-bold tracking-widest px-10 py-6 rounded-md uppercase">
            <Link href="/reservas">RESERVAR MESA</Link>
          </Button>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_IMAGES.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 w-8 rounded-full transition-all duration-500",
              index === currentImageIndex ? "bg-white" : "bg-white/30"
            )}
          />
        ))}
      </div>
    </section>
  )
}
