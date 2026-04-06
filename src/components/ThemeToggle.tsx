"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"


export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = (e: React.PointerEvent | React.MouseEvent) => {
        // Detener cualquier interferencia
        e.stopPropagation()
        
        // Vibrate immediately if possible
        if (typeof window !== 'undefined' && window.navigator.vibrate) {
            window.navigator.vibrate(40)
        }
        
        // Miramos directamente al DOM para no depender de estados de React
        if (typeof document !== 'undefined') {
            const isDark = document.documentElement.classList.contains('dark')
            setTheme(isDark ? "light" : "dark")
        }
    }

    if (!mounted) return (
        <div className="h-12 w-12 rounded-full border border-border bg-white/50 dark:bg-black/50 backdrop-blur-md animate-pulse shrink-0" />
    )

    // Solo para el icono visual, sí usamos resolvedTheme
    const isDark = resolvedTheme === "dark"

    return (
        <div className="relative p-2 -m-2 z-[999] touch-none">
            <button
                type="button"
                onPointerDown={toggleTheme}
                onClick={(e) => e.stopPropagation()} 
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-lg transition-all active:scale-90 overflow-hidden shrink-0"
                style={{ touchAction: 'none' }}
                aria-label="Cambiar tema"
            >
                {/* Visual feedback glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative h-5 w-5 pointer-events-none">
                    {isDark ? (
                        <Moon className="h-5 w-5 text-primary animate-in zoom-in spin-in-90 duration-500 fill-primary/10" />
                    ) : (
                        <Sun className="h-5 w-5 text-secondary animate-in zoom-in spin-in-90 duration-500" />
                    )}
                </div>
            </button>
        </div>
    )
}




