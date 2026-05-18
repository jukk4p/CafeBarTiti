import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(() => {
    if (typeof window !== "undefined") {
      const width = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth)
      return width < MOBILE_BREAKPOINT
    }
    return undefined
  })

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      const width = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth)
      setIsMobile(width < MOBILE_BREAKPOINT)
    }

    checkMobile()

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", checkMobile)
    window.addEventListener("resize", checkMobile)

    return () => {
      mql.removeEventListener("change", checkMobile)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return !!isMobile
}
