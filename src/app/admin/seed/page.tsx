"use client"

import React, { useState } from "react"
import { useFirebase } from "@/firebase"
import { collection, doc, writeBatch, getDocs } from "firebase/firestore"
import { MENU_BACKUP } from "@/lib/menu-backup"
import { Button } from "@/components/ui/button"

export default function AdminSeedPage() {
  const { firestore } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [loadingGallery, setLoadingGallery] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSeed = async () => {
    if (!firestore) {
      setResult("Error: Firestore no está inicializado.")
      return
    }

    setLoading(true)
    setResult("Limpiando base de datos y migrando carta...")

    try {
      const menuCollection = collection(firestore, "menuItems")
      
      const querySnapshot = await getDocs(menuCollection)
      if (!querySnapshot.empty) {
        const deleteBatch = writeBatch(firestore)
        querySnapshot.forEach((docSnap) => {
          deleteBatch.delete(docSnap.ref)
        })
        await deleteBatch.commit()
      }

      const batch = writeBatch(firestore)
      let count = 0

      Object.entries(MENU_BACKUP).forEach(([category, data]) => {
        data.items.forEach((item) => {
          const docRef = doc(menuCollection, item.id)
          batch.set(docRef, {
            ...item,
            category: category,
            updatedAt: new Date().toISOString()
          })
          count++
        })
      })

      await batch.commit()
      setResult(`¡Hecho! Se eliminaron los datos viejos y se migraron ${count} platos nuevos correctamente.`)
    } catch (error: any) {
      setResult(`Error durante el proceso de carta: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGallerySeed = async () => {
    if (!firestore) {
      setResult("Error: Firestore no está inicializado.")
      return
    }

    setLoadingGallery(true)
    setResult("Reparando rutas de Galería...")

    try {
      const galleryCol = collection(firestore, "gallery")
      
      // Limpiar galería vieja
      const querySnapshot = await getDocs(galleryCol)
      const deleteBatch = writeBatch(firestore)
      querySnapshot.forEach((docSnap) => {
        deleteBatch.delete(docSnap.ref)
      })
      await deleteBatch.commit()

      // Insertar fotos con rutas CORRECTAS y estandarizadas
      const galleryBatch = writeBatch(firestore)
      let count = 0

      const galleryData = [
        // Hero / Portadas
        { id: "hero-1", url: "/hero/00_Portada.webp", category: "El Bar", hint: "Fachada de Cafe Bar Titi" },
        { id: "hero-2", url: "/hero/01_Portada.webp", category: "El Bar", hint: "Terraza exterior al aire libre" },
        { id: "hero-3", url: "/hero/02_Portada.webp", category: "El Bar", hint: "Salón interior climatizado" },
        { id: "hero-4", url: "/hero/03_Portada.webp", category: "El Bar", hint: "Ambiente tradicional" },
        // Coria
        { id: "coria-1", url: "/galeria/Coria_Vista-Aerea.webp", category: "Coria", hint: "Vista aérea de Coria del Río" },
        // Tapas y Platos
        { id: "tapa-1", url: "/galeria/alitas.webp", category: "Nuestras Tapas", hint: "Crujientes Alitas de Pollo" },
        { id: "tapa-2", url: "/galeria/burrito-empanado.webp", category: "Nuestras Tapas", hint: "Burrito Empanado especial" },
        { id: "tapa-3", url: "/galeria/calamares.webp", category: "Nuestras Tapas", hint: "Calamares frescos fritos" },
        { id: "tapa-4", url: "/galeria/caracoles.webp", category: "Nuestras Tapas", hint: "Nuestros famosos Caracoles" },
        { id: "tapa-5", url: "/galeria/chipiron-plancha.webp", category: "Nuestras Tapas", hint: "Chipirones a la plancha" },
        { id: "tapa-6", url: "/galeria/entrecot-ternera.webp", category: "Nuestras Tapas", hint: "Entrecot de ternera a la brasa" },
        { id: "tapa-7", url: "/galeria/gambas.webp", category: "Nuestras Tapas", hint: "Gambitas blancas frescas" },
        { id: "tapa-8", url: "/galeria/lagrimitas-con-salsa.webp", category: "Nuestras Tapas", hint: "Lagrimitas con Salsa Mozárabe" },
        { id: "tapa-9", url: "/galeria/menestra.webp", category: "Nuestras Tapas", hint: "Menestra casera de temporada" },
        { id: "tapa-10", url: "/galeria/merluza.webp", category: "Nuestras Tapas", hint: "Lomo de merluza fresca" },
        { id: "tapa-11", url: "/galeria/olla-caracoles.webp", category: "Nuestras Tapas", hint: "Preparación tradicional de caracoles" },
        { id: "tapa-12", url: "/galeria/puntillitas.webp", category: "Nuestras Tapas", hint: "Puntillitas de la costa" },
      ]

      galleryData.forEach(item => {
        const docRef = doc(galleryCol, item.id)
        galleryBatch.set(docRef, {
          ...item,
          updatedAt: new Date().toISOString()
        })
        count++
      })

      await galleryBatch.commit()
      setResult(`¡Hecho! Galería reparada con ${count} fotos sincronizadas.`)
    } catch (error: any) {
      setResult(`Error reparando galería: ${error.message}`)
    } finally {
      setLoadingGallery(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Mantenimiento de Datos</h1>
        <p className="text-muted-foreground italic">
          Herramientas de reparación para sincronizar archivos locales con Firestore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Carta de Menú</h3>
            <p className="text-xs text-muted-foreground mb-6">Restablece todos los platos con precios y alérgenos oficiales.</p>
          </div>
          <Button onClick={handleSeed} disabled={loading || loadingGallery} className="w-full h-12 font-bold bg-primary text-white">
            {loading ? "Trabajando..." : "Sincronizar Carta"}
          </Button>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col justify-between border-primary/20">
          <div>
            <h3 className="font-bold text-lg mb-2 text-primary">Reparar Galería</h3>
            <p className="text-xs text-muted-foreground mb-6">Arregla las fotos rotas y sincroniza las rutas correctas (/hero, /galeria).</p>
          </div>
          <Button onClick={handleGallerySeed} disabled={loading || loadingGallery} className="w-full h-12 font-bold bg-primary text-white">
            {loadingGallery ? "Reparando..." : "Sincronizar Galería"}
          </Button>
        </div>
      </div>

      {result && (
        <div className="p-4 bg-primary/10 text-primary border border-primary/20 rounded-xl font-medium text-center animate-in zoom-in-95 duration-300">
          {result}
        </div>
      )}
    </div>
  )
}
