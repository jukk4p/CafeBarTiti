
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"

const FILTERS = ["Todas", "Nuestras Tapas", "El Bar", "Coria"]

export default function GaleriaPage() {
  const [activeFilter, setActiveFilter] = React.useState("Todas")
  const firestore = useFirestore()

  const galleryQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, "gallery"), orderBy("id", "asc"))
  }, [firestore])

  const { data: galleryData, isLoading } = useCollection(galleryQuery)

  const filteredImages = React.useMemo(() => {
    if (!galleryData) return []
    return activeFilter === "Todas" 
      ? galleryData 
      : galleryData.filter(img => img.category === activeFilter)
  }, [galleryData, activeFilter])

  return (
    <div className="bg-transparent min-h-screen">
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-foreground">
            El Sabor de Coria en Imágenes
          </h1>
          <p className="text-primary text-lg max-w-3xl mx-auto leading-relaxed">
            Un recorrido visual por nuestra cocina tradicional, el ambiente acogedor de 
            nuestra taberna y la esencia auténtica de Coria del Río.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-8 py-2 rounded-full text-sm font-medium border border-muted transition-all",
                activeFilter === filter 
                  ? "bg-primary text-white border-transparent" 
                  : "bg-white text-muted-foreground hover:bg-muted"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img) => (
              <div 
                key={img.id} 
                className="relative group overflow-hidden rounded-2xl shadow-md break-inside-avoid border border-border bg-white"
              >
                <Image
                  src={img.url}
                  alt={img.hint || "Imagen de la galería"}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint={img.category === "Nuestras Tapas" ? "Spanish tapas" : img.hint}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-primary shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-24 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm border border-primary/10">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-headline font-bold text-primary">¿Te ha entrado hambre?</h2>
            <p className="text-muted-foreground max-w-md">
              No te quedes solo con las fotos. Ven a visitarnos y disfruta 
              del auténtico sabor de Coria del Río en nuestra mesa.
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-white px-10 py-7 rounded-2xl text-lg font-bold shadow-xl shadow-primary/10">
            <Link href="/reservas" className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Reservar Mesa Ahora
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
