"use client"

import React, { useState, useEffect } from "react"
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Save, 
  Loader2, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export default function AdminInfoPage() {
  const { firestore } = useFirebase()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [settings, setSettings] = useState({
    contacto: {
      telefono: "954 77 21 32",
      email: "info@cafebartiti.es",
      direccion: "Av. Palomares, 1, 41100 Coria del Río, Sevilla",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=Cafe+Bar+Titi+Av.+Palomares+1+Coria+del+Rio"
    },
    redes: {
      facebook: "https://www.facebook.com/CasaTiTiCoriaDelRio/?locale=es_ES",
      instagram: "https://www.instagram.com/cafebartiti"
    },
    horario: {
      lun_mie: "06:00 - 00:00",
      jue_sab: "06:00 - 02:00",
      dom: "06:00 - 17:00",
      cocina: "Todos los mediodías | Jueves noche a Domingo mediodía"
    }
  })

  useEffect(() => {
    async function loadSettings() {
      if (!firestore) return
      try {
        const docRef = doc(firestore, "settings", "general")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setSettings(docSnap.data() as any)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [firestore])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firestore) return
    
    setSaving(true)
    setSuccess(false)
    try {
      const docRef = doc(firestore, "settings", "general")
      await setDoc(docRef, {
        ...settings,
        updatedAt: new Date().toISOString()
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Cargando configuración...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="space-y-10 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-foreground">Información del Negocio</h1>
          <p className="text-muted-foreground">Configura los datos de contacto, redes sociales y horarios de tu establecimiento.</p>
        </div>
        <Button disabled={saving} className="h-12 px-8 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          Guardar Cambios
        </Button>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-600 animate-in zoom-in duration-300">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-bold text-sm">¡Configuración guardada correctamente!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contacto */}
        <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4 border-b">
            <CardTitle className="text-xl font-bold font-headline flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" /> Datos de Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Teléfono</label>
              <Input 
                value={settings.contacto.telefono} 
                onChange={e => setSettings({...settings, contacto: {...settings.contacto, telefono: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email de contacto</label>
              <Input 
                value={settings.contacto.email} 
                onChange={e => setSettings({...settings, contacto: {...settings.contacto, email: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Dirección Física</label>
              <Input 
                value={settings.contacto.direccion} 
                onChange={e => setSettings({...settings, contacto: {...settings.contacto, direccion: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Horarios */}
        <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4 border-b">
            <CardTitle className="text-xl font-bold font-headline flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" /> Horarios de Apertura
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lunes a Miércoles</label>
              <Input 
                value={settings.horario.lun_mie} 
                onChange={e => setSettings({...settings, horario: {...settings.horario, lun_mie: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Jueves a Sábado</label>
              <Input 
                value={settings.horario.jue_sab} 
                onChange={e => setSettings({...settings, horario: {...settings.horario, jue_sab: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Domingo</label>
              <Input 
                value={settings.horario.dom} 
                onChange={e => setSettings({...settings, horario: {...settings.horario, dom: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="pt-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Notas de Cocina</label>
              <Input 
                value={settings.horario.cocina} 
                onChange={e => setSettings({...settings, horario: {...settings.horario, cocina: e.target.value}})}
                className="h-10 rounded-lg text-xs italic"
              />
            </div>
          </CardContent>
        </Card>

        {/* Redes Sociales */}
        <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden md:col-span-2">
          <CardHeader className="bg-muted/30 pb-4 border-b">
            <CardTitle className="text-xl font-bold font-headline flex items-center gap-2">
              <Instagram className="h-5 w-5 text-accent" /> Redes Sociales & Enlaces
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">URL de Facebook</label>
              <Input 
                value={settings.redes.facebook} 
                onChange={e => setSettings({...settings, redes: {...settings.redes, facebook: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">URL de Instagram</label>
              <Input 
                value={settings.redes.instagram} 
                onChange={e => setSettings({...settings, redes: {...settings.redes, instagram: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Enlace Google Maps</label>
              <Input 
                value={settings.contacto.googleMaps} 
                onChange={e => setSettings({...settings, contacto: {...settings.contacto, googleMaps: e.target.value}})}
                className="h-12 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/20 border border-border p-6 rounded-3xl flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-muted-foreground shrink-0 mt-1" />
        <div className="space-y-1">
          <p className="text-sm font-bold">Información de Seguridad</p>
          <p className="text-xs text-muted-foreground font-medium leading-relaxed">
            Estos datos se almacenan en Firestore y se actualizan en los pies de página (Footer) y la página de contacto automáticamente. 
            Asegúrate de que los enlaces de Google Maps y Redes Sociales sean URLs válidas para garantizar una buena experiencia de usuario.
          </p>
        </div>
      </div>
    </form>
  )
}
