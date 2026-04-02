
"use client"

import * as React from "react"
import Link from "next/link"
import {
  Calendar as CalendarIcon,
  Phone,
  User,
  MessageSquare,
  Clock,
  Users,
  Send,
  CheckCircle2,
  MapPin,
  Flame,
  Utensils,
  Info,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { BookingCalendar } from "@/components/BookingCalendar"
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, addDoc, serverTimestamp } from "firebase/firestore"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

const LUNCH_SLOTS = ["13:00", "13:30", "14:00", "14:30", "15:00"]
const DINNER_SLOTS = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]
const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Cafe+Bar+Titi+Av.+Palomares+1+Coria+del+Rio"

export default function ReservasPage() {
  const { toast } = useToast()
  const firestore = useFirestore()
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const [formData, setFormData] = React.useState({
    nombre: "",
    telefono: "",
    hora: "",
    mesas: "1",
    notas: ""
  })

  // Estabilizar la fecha inicial en el cliente para evitar errores de hidratación
  React.useEffect(() => {
    setSelectedDate(new Date())
  }, [])

  const reservationsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, "reservas"))
  }, [firestore])

  const { data: reservations } = useCollection(reservationsQuery)

  const reservedDates = React.useMemo(() => {
    if (!reservations) return []
    return reservations.map(r => {
      if (r.fecha && typeof r.fecha === 'string') return new Date(r.fecha)
      if (r.fecha?.seconds) return new Date(r.fecha.seconds * 1000)
      return new Date()
    })
  }, [reservations])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  const handleWhatsApp = (dateStr: string, hour: string) => {
    const message = encodeURIComponent(`Hola, acabo de realizar una reserva para el día ${dateStr} a las ${hour} en Café Bar Titi. Mi nombre es ${formData.nombre}.`)
    window.open(`https://wa.me/34954772132?text=${message}`, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !firestore) return

    setIsSubmitting(true)
    const dateStr = format(selectedDate, 'yyyy-MM-dd')

    try {
      await addDoc(collection(firestore, "reservas"), {
        fecha: dateStr,
        hora: formData.hora,
        nombre: formData.nombre,
        telefono: formData.telefono,
        mesas: parseInt(formData.mesas),
        notas: formData.notas,
        createdAt: serverTimestamp()
      })

      setIsSubmitting(false)
      setIsModalOpen(false)
      setIsSuccess(true)

      handleWhatsApp(format(selectedDate, 'dd/MM/yyyy'), formData.hora)

      toast({
        title: "¡Reserva Confirmada!",
        description: "Tu mesa te espera en Cafe Bar Titi.",
      })
    } catch (err: unknown) {
      setIsSubmitting(false)
      const error = new FirestorePermissionError({
        path: 'reservas',
        operation: 'create',
        requestResourceData: formData
      })
      errorEmitter.emit('permission-error', error)
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 md:py-32 text-center max-w-2xl">
        <Card className="p-8 md:p-12 rounded-[2rem] shadow-2xl border-4 border-secondary/20 glass-card space-y-6">
          <CheckCircle2 className="h-16 w-16 md:h-20 md:w-20 text-secondary mx-auto animate-bounce" />
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">¡Reserva Solicitada!</h1>
          <p className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
            Hemos recibido tu solicitud para el día {selectedDate && format(selectedDate, 'dd/MM/yyyy')}.
            Te esperamos con el mejor sabor de Coria.
          </p>
          <div className="pt-6 flex flex-col gap-4">
            <Button onClick={() => setIsSuccess(false)} className="bg-primary text-white rounded-xl px-8 h-14 font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              Hacer otra reserva
            </Button>
            <Button variant="outline" asChild className="border-secondary text-secondary font-bold h-14 rounded-xl hover:bg-secondary/10">
              <a href="tel:+34954772132">¿Alguna duda? Llámanos</a>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-8 pb-20 font-body bg-transparent">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Bar Titi Coria del Río</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-headline font-bold text-foreground leading-tight">
            Reserva tu mesa<br /><span className="italic text-primary dark:text-secondary">en Café Bar Titi</span>
          </h1>
          <p className="text-accent text-sm md:text-xl italic font-medium max-w-2xl mx-auto opacity-80 px-4">
            "Sabor tradicional, ambiente familiar y el mejor tapeo de nuestro pueblo."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

          <div className="lg:col-span-8 space-y-8">
            <Card className="border-border/50 dark:border-white/10 shadow-2xl glass-card rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-primary dark:bg-black/40 p-6 md:p-8 text-center border-b-4 border-secondary dark:border-primary/30">
                <CardTitle className="text-2xl md:text-3xl font-headline text-white">¡Elige fecha y hora!</CardTitle>
                <CardDescription className="text-white/60 font-medium uppercase tracking-[0.1em] text-[10px]">
                  Consulta disponibilidad en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 md:p-12">
                <BookingCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  reservedDates={reservedDates}
                  maxTablesPerDay={4}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card className="bg-card/80 dark:bg-white/5 border-border/50 dark:border-white/10 glass shadow-md rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex items-start gap-4 md:gap-5">
                <div className="bg-secondary/20 dark:bg-primary/20 p-3 md:p-4 rounded-xl md:rounded-2xl text-secondary dark:text-primary">
                  <Clock className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="font-headline font-bold text-lg md:text-xl text-primary dark:text-foreground">Horario de Cocina</h3>
                  <p className="text-xs md:text-sm text-muted-foreground italic">
                    Abierta de <span className="text-secondary dark:text-primary font-bold">Jueves noche a Domingo mediodía</span>.
                  </p>
                </div>
              </Card>
              <Card className="bg-card/80 dark:bg-white/5 border-border/50 dark:border-white/10 glass shadow-md rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex items-start gap-4 md:gap-5">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 md:p-4 rounded-xl md:rounded-2xl text-primary">
                  <Phone className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="font-headline font-bold text-lg md:text-xl text-primary dark:text-foreground">Reservas Directas</h3>
                  <p className="text-xs md:text-sm text-muted-foreground italic">
                    Para grupos grandes (+10), llámanos al <span className="text-primary font-bold">954 77 21 32</span>.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Card className="rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-none dark:border-solid dark:border-white/10 bg-primary dark:bg-white/5 p-8 md:p-10 space-y-8 glass">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-secondary dark:text-primary">
                  <Info className="h-5 w-5 md:h-6 md:w-6" />
                  <h3 className="text-xl md:text-2xl font-headline font-bold">Información Útil</h3>
                </div>
                <ul className="space-y-4 text-[13px] md:text-sm font-light text-white/90 dark:text-foreground/80 italic leading-relaxed">
                  <li className="flex gap-3">
                    <ChevronRight className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span>Límite de 4 mesas diarias por reserva online.</span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span>Se ruega puntualidad. La mesa se mantendrá 15 min.</span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <span>Indíquenos en 'Notas' si prefiere terraza o interior.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-white/10 dark:border-border/50">
                <h4 className="text-lg font-headline font-bold mb-4 text-secondary dark:text-primary">Ubicación</h4>
                <Link
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border-2 border-white/20 group cursor-pointer block"
                >
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600"
                    alt="Ubicación de Bar Titi en Coria"
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <div className="bg-secondary dark:bg-primary p-2.5 rounded-full mb-2 shadow-2xl group-hover:scale-110 transition-transform">
                      <MapPin className="h-5 w-5 text-primary dark:text-background" />
                    </div>
                    <span className="text-[9px] font-bold text-white dark:text-background bg-primary dark:bg-primary px-4 py-1.5 rounded-full border border-white/20 dark:border-transparent uppercase tracking-widest shadow-lg">
                      Av. Palomares, 1
                    </span>
                  </div>
                </Link>
              </div>
            </Card>

            <Card className="rounded-[2rem] md:rounded-[2.5rem] shadow-md p-8 md:p-10 glass-card dark:border-white/10 border-4">
              <div className="flex items-center gap-4 text-primary mb-6">
                <Utensils className="h-5 w-5 md:h-6 md:w-6" />
                <h3 className="text-xl md:text-2xl font-headline font-bold">Gastronomía</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed italic mb-6">
                Acompaña tu reserva con nuestros platos estrella: Serranitos, Chocos fritos y la mejor carne a la brasa.
              </p>
              <Button asChild variant="outline" className="w-full border-primary text-primary h-12 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-primary hover:text-white transition-colors">
                <a href="/menu">Ver Carta Completa</a>
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95%] sm:max-w-[600px] p-0 overflow-hidden border-none rounded-[2rem] md:rounded-[3rem] bg-background">
          <DialogHeader className="bg-primary p-6 md:p-10 text-white border-b-4 border-secondary">
            <DialogTitle className="text-2xl md:text-4xl font-headline flex items-center gap-3">
              <CalendarIcon className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
              Finalizar Reserva
            </DialogTitle>
            <DialogDescription className="text-white/60 font-medium uppercase tracking-widest text-[10px] mt-2">
              {selectedDate && format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6 md:space-y-8 bg-card/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <User className="h-3 w-3" /> Nombre Completo
                </label>
                <Input
                  placeholder="Tu nombre"
                  className="bg-background border-muted h-12 md:h-14 rounded-xl md:rounded-2xl focus:ring-secondary focus:border-secondary transition-all"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Phone className="h-3 w-3" /> Teléfono
                </label>
                <Input
                  placeholder="954 77 21 32"
                  className="bg-background border-muted h-12 md:h-14 rounded-xl md:rounded-2xl focus:ring-secondary focus:border-secondary transition-all"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Clock className="h-3 w-3" /> Hora de llegada
                </label>
                <Select
                  required
                  onValueChange={(val) => setFormData({ ...formData, hora: val })}
                >
                  <SelectTrigger className="h-12 md:h-14 bg-background border-muted rounded-xl md:rounded-2xl focus:ring-secondary">
                    <SelectValue placeholder="Selecciona hora" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-muted">
                    <div className="p-2 text-[9px] font-bold uppercase text-muted-foreground border-b mb-2">Almuerzo</div>
                    {LUNCH_SLOTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    <div className="p-2 text-[9px] font-bold uppercase text-muted-foreground border-b my-2">Cena</div>
                    {DINNER_SLOTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <Users className="h-3 w-3" /> Comensales / Mesas
                </label>
                <Select
                  defaultValue="1"
                  onValueChange={(val) => setFormData({ ...formData, mesas: val })}
                >
                  <SelectTrigger className="h-12 md:h-14 bg-background border-muted rounded-xl md:rounded-2xl focus:ring-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-muted">
                    <SelectItem value="1">1 Mesa (1-4 pers.)</SelectItem>
                    <SelectItem value="2">2 Mesas (5-8 pers.)</SelectItem>
                    <SelectItem value="3">3 Mesas (9-12 pers.)</SelectItem>
                    <SelectItem value="4">4 Mesas (Max online)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <MessageSquare className="h-3 w-3" /> Peticiones o Alergias
              </label>
              <Textarea
                placeholder="Ej. Preferimos mesa en la terraza..."
                className="bg-background border-muted min-h-[80px] md:min-h-[100px] rounded-xl md:rounded-2xl resize-none focus:ring-secondary"
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 md:h-16 bg-secondary text-primary text-base md:text-lg font-bold rounded-xl md:rounded-2xl shadow-xl shadow-secondary/20 hover:bg-secondary/90 flex items-center justify-center gap-3 uppercase tracking-widest hover:scale-[1.02] transition-all"
            >
              {isSubmitting ? "Confirmando..." : <>Confirmar mi Reserva <Send className="h-5 w-5" /></>}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
