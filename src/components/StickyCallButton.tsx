
"use client"

import * as React from "react"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export function StickyCallButton() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 md:hidden transition-all duration-300 transform",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
    )}>
      <a
        href="tel:+34954772132"
        className="flex items-center justify-center h-14 w-14 bg-secondary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform"
        aria-label="Llamar a Bar Titi"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  )
}
