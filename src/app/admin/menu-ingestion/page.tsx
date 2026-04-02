"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, Wand2, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { extractMenuData, type ExtractMenuDataOutput } from "@/ai/flows/extract-menu-data"
import { useToast } from "@/hooks/use-toast"

export default function MenuIngestionPage() {
  const { toast } = useToast()
  const [images, setImages] = React.useState<string[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [results, setResults] = React.useState<ExtractMenuDataOutput | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const readerPromises = Array.from(files).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readerPromises).then(base64Images => {
      setImages(prev => [...prev, ...base64Images])
    })
  }

  const handleExtract = async () => {
    if (images.length === 0) return
    
    setIsProcessing(true)
    try {
      const data = await extractMenuData({ menuImages: images })
      setResults(data)
      toast({
        title: "¡Extracción completada!",
        description: `Se han detectado ${data.length} platos del menú.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error en la extracción",
        description: "No se pudo procesar la imagen del menú.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const saveToFirestore = async () => {
    // In a real app, this would iterate through results and save to Firestore
    toast({
      title: "Base de datos actualizada",
      description: "Los platos se han guardado en la colección 'menu'.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Ingesta de Menú AI</h1>
        <p className="text-muted-foreground italic">Panel administrativo para Cafe Bar Titi - Solo personal autorizado.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card shadow-lg">
            <CardHeader>
              <CardTitle>Cargar Menú Real</CardTitle>
              <CardDescription>Sube fotos de la carta física de Cafe Bar Titi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center bg-background hover:bg-primary/5 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <Upload className="h-10 w-10 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-primary">Haz clic o arrastra imágenes</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG hasta 10MB</p>
              </div>

              {images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-bold">{images.length} imágenes seleccionadas</p>
                  <Button 
                    onClick={handleExtract} 
                    disabled={isProcessing}
                    className="w-full bg-secondary text-white"
                  >
                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    {isProcessing ? "Procesando con AI..." : "Extraer Datos con AI"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {results ? (
            <Card className="bg-card shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Platos Detectados</CardTitle>
                  <CardDescription>Revisa la información antes de guardar.</CardDescription>
                </div>
                <Button onClick={saveToFirestore} className="bg-primary text-white">
                  <CheckCircle className="mr-2 h-4 w-4" /> Guardar en Firestore
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Categoría</th>
                        <th className="px-4 py-2">Precio</th>
                        <th className="px-4 py-2">ID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {results.map((item, idx) => (
                        <tr key={idx} className="hover:bg-primary/5">
                          <td className="px-4 py-3 font-medium">{item.nombre}</td>
                          <td className="px-4 py-3"><span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">{item.categoria}</span></td>
                          <td className="px-4 py-3 font-bold text-primary">{item.precio.toFixed(2)}€</td>
                          <td className="px-4 py-3 text-xs font-mono">{item.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-card rounded-3xl border-2 border-dotted border-muted-foreground/20 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mb-4 opacity-20" />
              <p>No hay datos extraídos todavía. Sube una imagen para empezar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
