"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Megaphone, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Instagram,
  Facebook,
  Image as ImageIcon,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark
} from "lucide-react"
import { triggerSocialPost } from "@/app/actions/social"
import { cn } from "@/lib/utils"

export default function MarketingClient() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [postData, setPostData] = useState({
    caption: "",
    mediaUrl: "",
    platforms: ["instagram", "facebook"]
  })

  const handleTogglePlatform = (platform: string) => {
    setPostData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postData.caption || !postData.mediaUrl) {
      setError("Por favor, rellena el texto y la imagen.")
      return
    }
    
    if (postData.platforms.length === 0) {
      setError("Selecciona al menos una plataforma.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      const result = await triggerSocialPost(postData)
      if (result.success) {
        setSuccess(true)
        setPostData({
          caption: "",
          mediaUrl: "",
          platforms: ["instagram", "facebook"]
        })
        setTimeout(() => setSuccess(false), 5000)
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError("Error al enviar a n8n. Verifica la conexión.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-foreground">Marketing Social</h1>
          <p className="text-muted-foreground">Automatiza tus publicaciones en Instagram y Facebook desde aquí.</p>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-600 animate-in zoom-in duration-300">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-bold text-sm">¡Post enviado a n8n correctamente! Se publicará en unos instantes.</span>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-2xl flex items-center gap-3 text-destructive animate-in shake duration-300">
          <AlertCircle className="h-5 w-5" />
          <span className="font-bold text-sm">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Formulario */}
        <Card className="lg:col-span-3 rounded-[2.5rem] border-border shadow-sm overflow-hidden h-fit">
          <CardHeader className="bg-muted/30 pb-4 border-b">
            <CardTitle className="text-xl font-bold font-headline flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" /> Crear Publicación
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Texto de la publicación (Caption)</label>
              <Textarea 
                placeholder="Escribe algo increíble sobre el Cafe Bar Titi..."
                className="min-h-[150px] rounded-2xl p-4 text-base resize-none focus-visible:ring-primary/20"
                value={postData.caption}
                onChange={(e) => setPostData({...postData, caption: e.target.value})}
              />
              <div className="flex justify-end">
                <span className={cn(
                  "text-[10px] font-bold",
                  postData.caption.length > 2200 ? "text-destructive" : "text-muted-foreground"
                )}>
                  {postData.caption.length} / 2200 caracteres
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">URL de la Imagen</label>
              <div className="relative">
                <Input 
                  placeholder="https://tu-imagen.jpg"
                  className="h-12 rounded-xl pl-10"
                  value={postData.mediaUrl}
                  onChange={(e) => setPostData({...postData, mediaUrl: e.target.value})}
                />
                <ImageIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-[10px] text-muted-foreground font-medium italic">
                Pega la URL de una imagen de la galería o de Seedream 4.0.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Plataformas de destino</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleTogglePlatform("instagram")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 h-14 rounded-2xl border-2 transition-all",
                    postData.platforms.includes("instagram")
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border bg-transparent text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  <Instagram className="h-5 w-5" />
                  <span className="font-bold">Instagram</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTogglePlatform("facebook")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 h-14 rounded-2xl border-2 transition-all",
                    postData.platforms.includes("facebook")
                      ? "border-blue-600 bg-blue-600/5 text-blue-600 shadow-sm"
                      : "border-border bg-transparent text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  <Facebook className="h-5 w-5" />
                  <span className="font-bold">Facebook</span>
                </button>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 rounded-2xl font-headline font-bold text-lg gap-3 shadow-lg shadow-primary/20 mt-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Publicar ahora
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Previsualización */}
        <div className="lg:col-span-2 space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Previsualización (Instagram)</label>
          <Card className="rounded-[2rem] border-border shadow-2xl overflow-hidden bg-white max-w-[380px] mx-auto">
            <div className="p-3 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                  <div className="h-full w-full rounded-full bg-white p-[1px]">
                    <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center">
                      <Megaphone className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-black leading-none">casatiti1968</span>
                  <span className="text-[9px] text-gray-500">Coria del Río, Sevilla</span>
                </div>
              </div>
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
              {postData.mediaUrl ? (
                <img 
                  src={postData.mediaUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x600?text=Error+en+Imagen"
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="h-10 w-10 opacity-20" />
                  <span className="text-xs font-medium opacity-50">Sin imagen</span>
                </div>
              )}
            </div>

            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-black hover:text-red-500 cursor-pointer" />
                  <MessageCircle className="h-5 w-5 text-black" />
                  <Send className="h-5 w-5 text-black" />
                </div>
                <Bookmark className="h-5 w-5 text-black" />
              </div>
              <div className="text-[11px] font-bold text-black">1.248 Me gusta</div>
              <div className="text-[11px] leading-tight">
                <span className="font-bold mr-2 text-black">casatiti1968</span>
                <span className="text-gray-800 whitespace-pre-wrap">
                  {postData.caption || "El texto de tu publicación aparecerá aquí..."}
                </span>
              </div>
              <div className="text-[9px] text-gray-400 uppercase mt-1">HACE 2 MINUTOS</div>
            </div>
          </Card>
          
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
              Recuerda que n8n debe estar configurado con los tokens de acceso de Facebook e Instagram para que la publicación se haga efectiva.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
