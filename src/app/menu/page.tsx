import type { Metadata } from "next"
import MenuClient from "./MenuClient"
import { Suspense } from "react"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Carta y Tapas | Cafe Bar Titi - Coria del Río, Sevilla",
    description: "Descubre nuestra carta de tapas: serranito, choco frito, presa ibérica, ensaladilla y mucho más. Tradición sevillana desde 1968.",
    keywords: ["serranito Coria del Río", "tapas Sevilla", "choco frito", "bar de tapas Coria", "presa ibérica Sevilla"],
    alternates: {
      canonical: "https://cafebartiti.es/menu",
    },
    openGraph: {
      title: "Carta y Tapas | Cafe Bar Titi - Coria del Río, Sevilla",
      description: "Descubre nuestra carta de tapas: serranito, choco frito, presa ibérica y mucho más. Tradición desde 1968.",
      url: "https://cafebartiti.es/menu",
      type: "website",
    }
  }
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <MenuClient />
    </Suspense>
  )
}
