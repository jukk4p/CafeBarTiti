"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import Logo3D from "./Logo3D"
import { ThemeToggle } from "./ThemeToggle"

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
    <nav className="sticky top-0 z-50 w-full glass-nav bg-white dark:bg-zinc-950 border-b border-black/5 dark:border-white/5 h-24 flex items-center shadow-sm dark:shadow-2xl transition-all duration-300">
      <div className="container mx-auto px-4 flex items-center justify-between lg:max-w-7xl h-full">
        {/* Brand Identity: 3D Logo + Text with Scale Hover */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105 origin-left group"
        >
          <Logo3D />
          <div className="flex flex-col">
            <span className="text-2xl font-headline font-bold text-[#1a4731] dark:text-primary leading-tight">
              Cafe Bar Titi
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mt-1 leading-none">
              Desde 1968
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-10 h-full">
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

        {/* CTA */}
        <div className="flex items-center gap-4">
          {/* CTA Mobile Phone (Hidden on desktop) */}
          <Link href="tel:+34954772132" className="flex sm:hidden text-[#1a4731] dark:text-primary hover:text-[#1a4731]/80 dark:hover:text-primary/80 transition-colors p-2.5">
            <span className="sr-only">Llamar a Bar Titi</span>
            <Phone className="h-6 w-6" />
          </Link>

          {/* Theme Switch */}
          <div className="hidden sm:flex items-center mx-2">
            <ThemeToggle />
          </div>

          {/* CTA Reservas (Desktop) */}
          <Button asChild size="sm" className="hidden sm:flex bg-[#1a4731] dark:bg-primary text-white dark:text-black hover:bg-[#1a4731]/90 dark:hover:bg-primary/90 text-xs font-bold tracking-widest px-6 h-11 rounded-md uppercase shadow-sm dark:shadow-lg border-none">
            <Link href="/reservas">Reservar Mesa</Link>
          </Button>

          {/* Theme Switch & Hamburger wrapper (Mobile) */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden text-foreground dark:text-white p-2.5 -mr-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="h-7 w-7 text-[#1a4731] dark:text-primary" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "lg:hidden absolute top-24 left-0 w-full bg-white/95 dark:bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out overflow-hidden z-40 shadow-xl",
          isOpen ? "max-h-screen opacity-100 py-10" : "max-h-0 opacity-0 py-0"
        )}
      >
        <div className="flex flex-col space-y-6 px-4 items-center text-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-lg font-bold uppercase tracking-widest",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild size="lg" className="w-full bg-primary text-white mt-4 uppercase tracking-widest text-xs font-bold">
            <Link href="/reservas" onClick={() => setIsOpen(false)}>RESERVAR MESA</Link>
          </Button>
        </div>
      </div>
    </nav >
  )
}
