
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#FDFAF5]/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="absolute inset-0 h-12 w-12 animate-ping bg-primary/20 rounded-full" />
      </div>
      <p className="text-primary font-headline font-bold text-xl animate-pulse">
        Preparando el sabor de Coria...
      </p>
    </div>
  )
}
