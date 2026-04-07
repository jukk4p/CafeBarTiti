"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ArrowRight, Heart, Home as HomeIcon, UtensilsCrossed, Wind } from "lucide-react"
import { ReviewsCarousel } from "@/components/ReviewsCarousel"
import { HeroSlider } from "@/components/HeroSlider"
import { cn } from "@/lib/utils"
import { FadeIn, FadeInStagger } from "@/components/FadeIn"

export default function Home() {
  const historyImg = PlaceHolderImages.find(i => i.id === 'historia-titi')

  const featuredTapas = [
    {
      name: "Serranito de Lomo",
      desc: "Nuestro icónico bocadillo sevillano: tierno lomo de cerdo, jamón serrano de primera, pimiento frito y rodajas de tomate en pan artesano crujiente.",
      price: "5,00€",
      imgId: 'serranito-lomo',
      badge: "EL REY DE SEVILLA"
    },
    {
      name: "Choco Frito",
      desc: "Tiras de choco fresco de la costa, fritas al estilo tradicional andaluz con un rebozado ligero y crujiente que se deshace en la boca.",
      price: "8,00€",
      imgId: 'choco',
      badge: "SABOR A MARISMA"
    },
    {
      name: "Presa Ibérica",
      desc: "Pieza noble de cerdo ibérico de bellota a la brasa, con un veteado excepcional que garantiza una jugosidad y sabor inigualables.",
      price: "13,00€",
      imgId: 'presa-iberica',
      badge: "CALIDAD SUPREMA"
    }
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <HeroSlider />

      {/* Featured Tapas */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3">
            <FadeIn>
              <div className="flex items-center gap-3 text-primary">
                <div className="h-px w-8 bg-primary/30" />
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase">NUESTRAS ESPECIALIDADES</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Los Imprescindibles del Titi</h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} direction="none" className="shrink-0">
            <Link href="/menu" className="group flex items-center gap-2 text-primary font-bold text-[10px] tracking-widest uppercase bg-primary/5 px-6 py-3 rounded-full hover:bg-primary/10 transition-colors">
              Ver carta completa <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        {/* Symmetric Grid layout replacing the asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-[450px]">
          {featuredTapas.map((tapa, idx) => {
            const img = PlaceHolderImages.find(i => i.id === tapa.imgId)
            const cardClasses = "group overflow-hidden border border-border/50 glass-card relative h-full flex flex-col transition-colors hover:border-primary/50";

            return (
              <Card key={idx} className={cardClasses}>
                <div className="relative h-[200px] shrink-0 overflow-hidden z-0">
                  {img && (
                    <Image
                      src={img.imageUrl}
                      alt={tapa.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      data-ai-hint={img.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-6 right-6 bg-primary/95 backdrop-blur-sm text-white px-4 py-2 font-bold text-sm rounded-xl shadow-lg border border-white/10">
                    {tapa.price}
                  </div>
                </div>

                <CardContent className="flex flex-col z-10 bg-card/80 backdrop-blur-md relative p-8 flex-grow justify-between">
                  <div className="space-y-4">
                    <h3 className="font-headline font-bold text-foreground group-hover:text-primary transition-colors text-2xl">
                      {tapa.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed italic font-light line-clamp-4">
                      "{tapa.desc}"
                    </p>
                  </div>

                  <div className="border-t border-muted/20 flex items-center gap-2 text-primary w-full pt-6 mt-4">
                    <UtensilsCrossed className="h-4 w-4" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{tapa.badge}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* History Section */}
      <section id="historia" className="py-24 md:py-32 bg-secondary/5 dark:bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative group flex justify-center items-center py-10">
            {/* Vintage Polaroid Style Frame */}
            <FadeIn
              className="relative bg-card p-4 pb-16 md:p-6 md:pb-24 shadow-2xl hover:rotate-0 transition-transform duration-700 max-w-md w-full border border-border z-10"
              style={{ rotate: -2 }}
            >
              <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden bg-stone-900 hover:shadow-inner">
                <Image
                  src="/historia/historia-imagen.webp"
                  alt="Historia Cafe Bar Titi en 1968"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] pointer-events-none" />
              </div>
              <div className="absolute bottom-4 md:bottom-6 left-0 w-full text-left pl-6 md:pl-8">
                <span className="font-editorial text-muted-foreground text-xl font-medium italic opacity-80 decoration-border underline underline-offset-4">Cafe Bar Titi, 1968</span>
              </div>
            </FadeIn>

            {/* Highlight Box */}
            <FadeIn
              direction="right"
              delay={0.2}
              className="absolute -bottom-4 -right-4 md:-right-16 bg-card p-8 md:p-10 max-w-[280px] border border-border z-20 shadow-xl hidden sm:block"
            >
              <div className="h-1 w-12 bg-secondary mb-4 rounded-full" />
              <h4 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2 italic">Nuestra</h4>
              <p className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground uppercase leading-tight">ESENCIA Y TRADICIÓN FAMILIAR EN CADA DETALLE</p>
            </FadeIn>

            {/* Background decorative elements */}
            <div className="absolute -inset-4 border border-primary/20 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4" />
          </div>

          <div className="space-y-10 relative z-10 pl-0 lg:pl-10">
            <div className="space-y-4">
              <FadeIn>
                <div className="flex items-center gap-3 text-secondary">
                  <div className="h-px w-12 bg-secondary" />
                  <span className="text-[10px] tracking-[0.3em] font-bold uppercase">NUESTRA HISTORIA</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-5xl md:text-6xl font-headline font-bold text-foreground leading-tight">Más que un Bar,<br /><span className="italic text-primary">una Familia.</span></h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
              <p>
                Ubicados en el corazón de Coria del Río, Cafe Bar Titi es un <strong className="font-bold text-foreground">excelente bar típico ribereño</strong> con un ambiente puramente familiar. Lo que comenzó como un pequeño local en 1968, ha crecido día a día gracias a la confianza de clientes que ya son parte de nuestra gran familia.
              </p>
              <p className="border-l-4 border-primary/40 pl-6 text-foreground/80 font-medium">
                Ofrecemos exquisitas tapas y guisos totalmente caseros, como nuestra famosa carrillada o ensaladilla. Y en temporada, no te pierdas nuestros <span className="font-bold text-primary">caracoles y cabrillas</span> a diario.
              </p>
            </FadeIn>

            <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 pt-10">
              <FadeIn className="flex gap-5 group">
                <div className="h-14 w-14 bg-card border border-border text-primary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-bold text-lg leading-tight mb-1">Punto de Encuentro</h5>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Ideal para familia y amigos</p>
                </div>
              </FadeIn>
              <FadeIn className="flex gap-5 group">
                <div className="h-14 w-14 bg-card border border-border text-secondary rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <HomeIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-bold text-lg leading-tight mb-1">Para Llevar</h5>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Recogida en local (sin reparto)</p>
                </div>
              </FadeIn>
              <FadeIn className="flex gap-5 group sm:col-span-2 lg:col-span-1">
                <div className="h-14 w-14 bg-card border border-border text-accent rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Wind className="h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-bold text-lg leading-tight mb-1">Nuestra Terraza</h5>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">El mejor clima de Sevilla</p>
                </div>
              </FadeIn>
            </FadeInStagger>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsCarousel />
    </div>
  )
}
