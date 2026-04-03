
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Plus, Minus, Navigation, Flame, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

import { useFirebase } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function ContactoPage() {
  const historyBanner = PlaceHolderImages.find(img => img.id === 'hero-bar-exterior')
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Cafe+Bar+Titi+Av.+Palomares+1+Coria+del+Rio"
  
  const { firestore } = useFirebase()
  const [loading, setLoading] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [formData, setFormData] = React.useState({ nombre: "", email: "", mensaje: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firestore) return
    
    setLoading(true)
    try {
      await addDoc(collection(firestore, "contacts"), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: "nuevo"
      })
      setSubmitted(true)
      setFormData({ nombre: "", email: "", mensaje: "" })
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-transparent min-h-screen pb-20">
      {/* Hero Banner Section */}
      <section className="container mx-auto px-4 py-8 max-w-7xl" aria-labelledby="history-title">
        <div className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl bg-black">
          <Image
            src="/historia/historia-imagen.webp"
            alt="Cafe Bar Titi Fachada Exterior"
            fill
            className="object-cover scale-110 opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 space-y-4 z-10">
            <h1 id="history-title" className="text-4xl md:text-6xl font-headline font-bold text-white">Contacto y Nuestra Historia</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl font-light">
              Desde 1968, ofreciendo lo mejor de la gastronomía andaluza en el corazón de Coria del Río.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl mt-12">
        {/* History Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <article className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-10 bg-primary" />
                <h2 className="text-3xl font-headline font-bold text-foreground">Un legado familiar</h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4 text-lg">
                <p>
                  Cafe Bar Titi es un excelente bar típico ribereño que ha visto crecer a generaciones de corianos. Fundado en 1968, nos hemos mantenido fieles a nuestras raíces, creando el perfecto lugar de encuentro donde pasar una comida agradable con familia y amigos.
                </p>
                <p>
                  Destacamos por nuestras <span className="font-bold text-foreground">exquisitas tapas y guisos caseros</span>, elaborados a diario con productos frescos. Ya sea nuestra famosa ensaladilla, la carrillada, o nuestros pescados y carnes, cada bocado lleva nuestro sello. Además, en temporada contamos a diario con <span className="font-bold text-foreground">caracoles y cabrillas</span>. Y si prefieres disfrutar en casa, ¡<span className="font-bold text-foreground">todas nuestras tapas están disponibles para llevar</span>! (Servicio de recogida en el local, no disponemos de reparto a domicilio).
                </p>
              </div>
            </article>
          </div>

          <aside>
            <Card className="rounded-[2rem] border-none shadow-sm h-fit">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Clock className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Horario de Apertura</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">Lun - Mié</span>
                    <span className="font-bold">06:00 - 00:00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">Jue - Sáb</span>
                    <span className="font-bold">06:00 - 02:00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">Domingo</span>
                    <span className="font-bold">06:00 - 17:00</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-muted/20">
                  <div className="flex items-center gap-3 text-secondary mb-2">
                    <Flame className="h-5 w-5" />
                    <h4 className="font-bold text-sm uppercase tracking-wider">Horario de Cocina</h4>
                  </div>
                  <p className="text-xs text-muted-foreground italic font-medium leading-relaxed">
                    Nuestra cocina permanece abierta de <span className="text-secondary font-bold">Jueves noche a Domingo</span>.
                  </p>
                </div>

                <div className="bg-primary/5 p-4 rounded-xl text-center">
                  <p className="text-primary text-sm font-bold italic">¡Te esperamos para el tapeo!</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Contact Form Container Area */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12" aria-labelledby="contact-form-title">
          <div className="space-y-8">
            <div className="bg-card p-8 md:p-10 rounded-[2rem] shadow-sm border border-border">
              <div className="mb-8">
                <h2 id="contact-form-title" className="text-3xl font-headline font-bold text-foreground mb-2">Formulario de Contacto</h2>
                <p className="text-muted-foreground">¿Tienes alguna duda o sugerencia? Escríbenos.</p>
              </div>

              {submitted ? (
                <div className="bg-primary/10 border border-primary/20 rounded-2xl py-12 px-6 flex flex-col items-center text-center space-y-4">
                  <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-headline">¡Mensaje Enviado!</h3>
                  <p className="text-muted-foreground">Muchas gracias por contactar con Cafe Bar Titi. Te responderemos lo antes posible.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-xl font-bold mt-4">
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre completo</label>
                      <Input 
                        id="nombre" 
                        required
                        value={formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                        placeholder="Tu nombre" className="bg-background border-muted h-12" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Correo electrónico</label>
                      <Input 
                        id="email" type="email" required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="hola@ejemplo.com" className="bg-background border-muted h-12" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="mensaje" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mensaje</label>
                    <Textarea 
                      id="mensaje" required
                      value={formData.mensaje}
                      onChange={e => setFormData({...formData, mensaje: e.target.value})}
                      placeholder="¿En qué podemos ayudarte?" className="bg-background border-muted min-h-[150px] resize-none" 
                    />
                  </div>
                  <Button 
                    type="submit" disabled={loading}
                    className="w-full bg-primary text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90"
                  >
                    {loading ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </form>
              )}

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="bg-background border border-border p-4 rounded-2xl flex flex-col items-center text-center space-y-2 hover:bg-muted/30 transition-colors cursor-pointer" aria-label="Ver dirección en Google Maps">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Dirección</span>
                  <p className="text-[11px] font-medium leading-tight text-foreground">Av. Palomares, 1, 41100 Coria del Río</p>
                </Link>
                <div className="bg-background border border-border p-4 rounded-2xl flex flex-col items-center text-center space-y-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Teléfono</span>
                  <p className="text-[11px] font-medium leading-tight text-foreground">954 77 21 32</p>
                </div>
                <div className="bg-background border border-border p-4 rounded-2xl flex flex-col items-center text-center space-y-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Email</span>
                  <p className="text-[11px] font-medium leading-tight truncate w-full text-foreground">info@cafebartiti.es</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Interactive Area */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-sm min-h-[500px] border border-muted group" role="img" aria-label="Mapa de ubicación">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXB8ZW58MHx8fHwxNzcxMTc2NTA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Mapa de Ubicación de Cafe Bar Titi"
              fill
              className="object-cover grayscale opacity-40 group-hover:opacity-50 transition-opacity duration-500"
            />
            {/* Map Overlay Elements */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-end gap-2 pointer-events-auto">
                <button className="bg-card p-2 rounded-lg shadow-md border border-border hover:bg-muted transition-colors" aria-label="Aumentar zoom"><Plus className="h-4 w-4" /></button>
                <button className="bg-card p-2 rounded-lg shadow-md border border-border hover:bg-muted transition-colors" aria-label="Disminuir zoom"><Minus className="h-4 w-4" /></button>
              </div>

              <div className="flex justify-center">
                <Link
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 border border-border pointer-events-auto hover:scale-105 transition-transform"
                >
                  <div className="p-3 bg-primary rounded-xl">
                    <Image
                      src="https://picsum.photos/seed/restaurant-icon/40/40"
                      alt="Restaurante"
                      width={24}
                      height={24}
                      className="invert"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">Cafe Bar Titi</span>
                    <span className="text-xs text-muted-foreground">Av. Palomares, 1</span>
                  </div>
                </Link>
              </div>

              <div className="flex justify-start pointer-events-auto">
                <Button asChild className="bg-primary text-black gap-2 rounded-full px-8 h-12 shadow-lg hover:shadow-primary/30 transition-shadow hover:-translate-y-1">
                  <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="h-4 w-4" /> Cómo llegar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
