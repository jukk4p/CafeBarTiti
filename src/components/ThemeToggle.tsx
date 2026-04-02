"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-9 h-9" /> // Placeholder
    }

    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative inline-flex h-9 w-16 items-center rounded-full bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Toggle theme"
        >
            <span className="sr-only">Cambiar modo oscuro</span>
            <motion.div
                className="flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-sm"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                initial={false}
                animate={{
                    x: isDark ? "32px" : "4px",
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Moon className="h-4 w-4 text-primary" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Sun className="h-4 w-4 text-secondary" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </button>
    )
}

// Ensure AnimatePresence is imported correctly within the component's scope
import { AnimatePresence } from "framer-motion"
