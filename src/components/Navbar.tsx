"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import Logo3D from "./Logo3D"
import { ThemeToggle } from "./ThemeToggle"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Carta", href: "/menu" },
  { name: "Reservas", href: "/reservas" },
  { name: "Galería", href: "/galeria" },
  { name: "Contacto", href: "/contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <>
    <nav className="sticky top-0 z-50 w-full glass-nav bg-white dark:bg-black border-b border-black/5 dark:border-white/5 h-20 lg:h-24 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between lg:max-w-7xl h-full">
        {/* Brand Identity: 3D Logo + Text with Scale Hover */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 origin-left group shrink-0"
        >
          <Logo3D />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-headline font-bold text-[#1a4731] dark:text-primary leading-tight whitespace-nowrap">
              Cafe Bar Titi
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mt-0.5 sm:mt-1 leading-none">
              Desde 1968
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-10 h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-[14px] font-bold transition-all px-1 py-1 flex items-center h-full",
                  isActive
                    ? "text-[#1a4731] dark:text-primary border-b-2 border-[#1a4731] dark:border-primary"
                    : "text-foreground/80 dark:text-white/80 hover:text-[#1a4731] dark:hover:text-primary"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* CTA Area */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Theme Switch - Only for large screens (xl and up) */}
          <div className="hidden xl:flex items-center">
            <ThemeToggle />
          </div>

          {/* CTA Reservas (Tablet & Desktop) */}
          <Button asChild size="sm" className="hidden sm:flex bg-[#1a4731] dark:bg-primary text-white dark:text-black border-none shadow-sm h-10 px-4 xl:px-6">
            <Link href="/reservas">Reservar Mesa</Link>
          </Button>

          {/* Wrapper for Tablet/Mobile Actions */}
          <div className="flex xl:hidden items-center gap-4 sm:gap-2 relative z-[100]">
            <ThemeToggle />
            {/* Hamburger Button with Custom Animation */}
            <button
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className={cn(
                "w-6 h-0.5 bg-foreground dark:bg-primary transition-all duration-300 origin-center",
                isOpen && "rotate-45 translate-y-2"
              )} />
              <span className={cn(
                "w-6 h-0.5 bg-foreground dark:bg-primary transition-all duration-300",
                isOpen && "opacity-0 translate-x-4"
              )} />
              <span className={cn(
                "w-6 h-0.5 bg-foreground dark:bg-primary transition-all duration-300 origin-center",
                isOpen && "-rotate-45 -translate-y-2"
              )} />
            </button>
          </div>
        </div>
      </div>

    </nav>

    {/* Mobile Menu Overlay - Portal Stability + Mockup Style */}
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="xl:hidden fixed inset-0 z-[9999] flex flex-col bg-white dark:bg-[#09090b]"
        >
          {/* Header optimized for UX: Logo Left, X Right */}
          <div className="h-20 sm:h-24 px-4 flex items-center justify-between border-b border-border/5">
            <div className="flex items-center gap-2 ml-1">
               <Logo3D />
               <div className="flex flex-col">
                  <span className="text-lg font-headline font-bold text-[#1a4731] dark:text-primary leading-tight">
                    Cafe Bar Titi
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary mt-0.5 leading-none">
                    Desde 1968
                  </span>
               </div>
            </div>
            <button
               className="relative w-10 h-10 flex items-center justify-center -mr-2"
               onClick={() => setIsOpen(false)}
             >
               <X className="h-7 w-7 text-foreground/40 dark:text-white/40 font-light" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <nav className="flex flex-col">
              {[
                { name: "Inicio", href: "/", sub: "Nuestra historia" },
                { name: "Carta", href: "/menu", sub: "Cocina con alma" },
                { name: "Reservas", href: "/reservas", sub: "Asegura tu mesa" },
                { name: "Galería", href: "/galeria", sub: "Sabor y tradición" },
                { name: "Contacto", href: "/contacto", sub: "Dónde estamos" },
              ].map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-6 px-8 py-6 border-b border-border/5 transition-all duration-300 w-full text-left",
                        isActive ? "bg-primary/[0.04] border-l-4 border-l-primary" : "hover:bg-muted/5 border-l-4 border-l-transparent"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-[14px] font-serif italic text-primary/40">0{index + 1}.</span>
                      <div className="flex flex-col">
                        <span className={cn(
                          "text-3xl font-headline font-bold tracking-tight",
                          isActive ? "text-[#1a4731] dark:text-primary" : "text-foreground/80 dark:text-white/80"
                        )}>
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mt-1 opacity-60">
                          {item.sub}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </div>

          {/* Mockup Footer with faint Reservas button */}
          <div className="p-8 mt-auto flex flex-col items-center gap-8 border-t border-border/5">
             <Button asChild variant="outline" size="lg" className="w-full h-14 rounded-xl border-border/20 text-muted-foreground font-headline font-bold tracking-widest bg-transparent hover:bg-muted/5">
                <Link href="/reservas" onClick={() => setIsOpen(false)}>RESERVAR MESA</Link>
             </Button>
             <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/30 font-bold">
               Coria del Río · Sevilla
             </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
)
}
