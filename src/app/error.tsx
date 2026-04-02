
'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-destructive/10 p-6 rounded-full mb-8">
        <AlertCircle className="h-16 w-16 text-destructive" />
      </div>
      <h1 className="text-4xl font-headline font-bold text-primary mb-4">¡Ups! Algo ha fallado en la cocina</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-12 italic">
        Ha ocurrido un error inesperado. Por favor, intenta recargar la página o vuelve más tarde.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} size="lg" className="bg-primary text-white rounded-xl px-10 h-14 font-bold uppercase tracking-widest">
          Reintentar
        </Button>
        <Button variant="outline" asChild size="lg" className="border-primary text-primary rounded-xl px-10 h-14 font-bold uppercase tracking-widest">
          <a href="/">Volver al Inicio</a>
        </Button>
      </div>
    </div>
  )
}
