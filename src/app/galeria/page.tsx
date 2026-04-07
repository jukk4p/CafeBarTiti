
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Loader2, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn, FadeInStagger } from "@/components/FadeIn"

const FILTERS = ["Todas", "Nuestras Tapas", "El Bar", "Coria"]

export default function GaleriaPage() {
  const [activeFilter, setActiveFilter] = React.useState("Todas")
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number | null>(null)
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

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
    document.body.style.overflow = "auto"
  }

  const navigateNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length)
  }

  const navigatePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length)
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") navigateNext()
      if (e.key === "ArrowLeft") navigatePrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImageIndex, filteredImages])

  return (
    <div className="bg-transparent min-h-screen">
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground tracking-tight">
              El Sabor de Coria en Imágenes
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary text-lg max-w-3xl mx-auto leading-relaxed italic">
              Un recorrido visual por nuestra cocina tradicional, el ambiente acogedor de 
              nuestra taberna y la esencia auténtica de Coria del Río.
            </p>
          </FadeIn>
        </div>

        {/* Filter Buttons */}
        <FadeInStagger className="flex flex-wrap items-center justify-center gap-3 mb-20">
          {FILTERS.map((filter) => (
            <FadeIn
              key={filter}
              direction="none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] border transition-all duration-300 cursor-pointer",
                activeFilter === filter 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50"
              )}
            >
              {filter}
            </FadeIn>
          ))}
        </FadeInStagger>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Cargando Galería...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => (
                <motion.div 
                  layout
                  key={img.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group overflow-hidden rounded-3xl shadow-xl break-inside-avoid border border-black/5 bg-card cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={img.url}
                    alt={img.hint || "Imagen de la galería"}
                    width={800}
                    height={1200}
                    className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    priority={index < 6}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                    <Maximize2 className="text-white w-8 h-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" />
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {img.category}
                    </span>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">0{index + 1}</span>
                     </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button 
                className="absolute top-6 right-6 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={closeLightbox}
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Controls */}
              <button 
                className="absolute left-4 md:left-10 z-[110] p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all transform hover:scale-110"
                onClick={navigatePrev}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button 
                className="absolute right-4 md:right-10 z-[110] p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all transform hover:scale-110"
                onClick={navigateNext}
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <motion.div 
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-8"
                onClick={(e) => e.stopPropagation()}
              >
                 <div className="relative w-full h-[70vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <Image
                      src={filteredImages[selectedImageIndex].url}
                      alt={filteredImages[selectedImageIndex].hint || "Imagen de la galería"}
                      fill
                      className="object-contain"
                    />
                 </div>
                 
                 {/* Caption & Info */}
                 <div className="text-center space-y-4 max-w-2xl px-4">
                    <div className="flex items-center justify-center gap-4 mb-2">
                       <div className="h-px w-8 bg-white/20" />
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                          {filteredImages[selectedImageIndex].category}
                       </span>
                       <div className="h-px w-8 bg-white/20" />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-headline font-bold text-white leading-tight">
                       {filteredImages[selectedImageIndex].hint || "Capturando la esencia del Titi"}
                    </h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                       Foto {selectedImageIndex + 1} de {filteredImages.length}
                    </p>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action Section */}
        <div className="mt-32 bg-card border border-black/5 rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="space-y-6 text-center md:text-left relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">¿Te ha entrado hambre?</h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed italic">
              No te quedes solo con las fotos. Ven a visitarnos y disfruta 
              del auténtico sabor de Coria del Río en nuestra mesa.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-8 rounded-[2rem] text-xl font-bold font-headline shadow-2xl shadow-primary/20 transition-all hover:scale-105 relative z-10">
            <Link href="/reservas" className="flex items-center gap-3">
              <Calendar className="h-6 w-6" />
              Reservar Mesa Ahora
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
