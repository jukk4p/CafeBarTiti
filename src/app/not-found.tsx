
import Link from 'next/link'
import { Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-8">
        <Utensils className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4">404 - Plato no encontrado</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-12 italic">
        Lo sentimos, la página que buscas parece haberse agotado en nuestra cocina. ¡Vuelve a la barra principal para seguir disfrutando!
      </p>
      <Button asChild size="lg" className="bg-primary text-white rounded-xl px-10 h-14 font-bold uppercase tracking-widest hover:scale-105 transition-transform">
        <Link href="/">Volver al Inicio</Link>
      </Button>
    </div>
  )
}
