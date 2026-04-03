"use client"

import React from "react"
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase"
import { collection } from "firebase/firestore"
import { 
  BarChart3, 
  BookOpen, 
  ImageIcon, 
  MessageSquare, 
  Calendar, 
  Settings,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Loader2,
  Mail
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const { firestore } = useFirebase()

  // Queries for basic stats
  const menuQuery = useMemoFirebase(() => !firestore ? null : collection(firestore, "menuItems"), [firestore])
  const galleryQuery = useMemoFirebase(() => !firestore ? null : collection(firestore, "gallery"), [firestore])
  const contactsQuery = useMemoFirebase(() => !firestore ? null : collection(firestore, "contacts"), [firestore])
  const reservasQuery = useMemoFirebase(() => !firestore ? null : collection(firestore, "reservas"), [firestore])

  const { data: menuItems, isLoading: loadingMenu } = useCollection(menuQuery)
  const { data: galleryItems, isLoading: loadingGallery } = useCollection(galleryQuery)
  const { data: contacts, isLoading: loadingContacts } = useCollection(contactsQuery)
  const { data: reservas, isLoading: loadingReservas } = useCollection(reservasQuery)

  const stats = [
    {
      title: "Platos Carta",
      value: menuItems?.length || 0,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      href: "/admin/menu"
    },
    {
      title: "Fotos Galería",
      value: galleryItems?.length || 0,
      icon: ImageIcon,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      href: "/admin/galeria"
    },
    {
      title: "Reservas Mesa",
      value: reservas?.filter(r => r.status === "nuevo").length || 0,
      icon: Calendar,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      href: "/admin/reservas"
    },
    {
      title: "Mensajes Web",
      value: contacts?.filter(c => c.status === "nuevo").length || 0,
      icon: Mail,
      color: "text-orange-600",
      bg: "bg-orange-500/10",
      href: "/admin/contacto"
    }
  ]

  const isLoading = loadingMenu || loadingGallery || loadingContacts

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-foreground">Hola de nuevo, Titi Admin</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          Aquí tienes un resumen de la actividad de tu web.
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="group relative overflow-hidden border-border bg-card rounded-[2rem] hover:border-primary/30 transition-all shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <div className={stat.bg + " p-2 rounded-xl " + stat.color}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-headline font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1 group-hover:text-primary transition-colors cursor-pointer" onClick={() => window.location.href = stat.href}>
                Gestionar <ArrowUpRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity (Placeholders) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <CardTitle className="text-2xl font-headline font-bold">Actividad Reciente</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground/30" />
            </CardHeader>
            <CardContent className="space-y-4">
              {!contacts || contacts.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground italic">No hay actividad reciente.</div>
              ) : (
                contacts.slice(0, 5).map((contact, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-muted/20 rounded-2xl border border-border/50 group hover:border-primary/20 transition-all">
                    <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{contact.nombre}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Nuevo mensaje</p>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      {contact.createdAt ? contact.createdAt.split('T')[0] : "Recientemente"}
                    </p>
                  </div>
                ))
              )}
              <Button variant="outline" className="w-full h-12 rounded-xl mt-4 font-bold gap-2" asChild>
                <a href="/admin/reservas">Ver todos los mensajes</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-white overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles className="h-20 w-20" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-headline font-bold">Enlaces Rápidos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              <Button asChild variant="secondary" className="w-full rounded-xl h-12 font-bold justify-between group-hover:shadow-lg transition-all">
                <a href="/" target="_blank">
                  Ver Web Pública <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full rounded-xl h-12 font-bold justify-between">
                <a href="/admin/menu">
                  Gestionar Carta <BookOpen className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full rounded-xl h-12 font-bold justify-between">
                <a href="/admin/info">
                  Configuración <Settings className="h-4 w-4" />
                </a>
              </Button>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <Clock className="h-4 w-4 opacity-70" />
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Soporte siempre listo</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Estado del Servidor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold">Firebase Conectado</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                Todos los servicios (Auth, Firestore) están operando con normalidad.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
