
"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MapPin, Phone, Mail, Flame } from "lucide-react"

export function Footer() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Cafe+Bar+Titi+Av.+Palomares+1+Coria+del+Rio"
  const brandGreen = "text-[#b5c99a] dark:text-primary transition-colors duration-300"

  return (
    <footer className="bg-[#1A1614] dark:bg-[#050505] border-t border-white/5 text-white pt-16 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 md:mb-20">

          {/* Brand & Social */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <Link href="/" className="flex flex-col transition-transform hover:scale-105 group">
              <span className="text-3xl font-headline font-bold text-white dark:text-foreground leading-none">Cafe Bar Titi</span>
              <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${brandGreen} mt-2`}>Desde 1968</span>
            </Link>
            <p className="text-white/60 dark:text-muted-foreground text-sm leading-relaxed max-w-xs">
              Llevamos el sabor auténtico de Coria del Río a tu mesa. Tradición, frescura y el auténtico ambiente de nuestro pueblo.
            </p>
            <div className="flex items-center gap-5 justify-center md:justify-start">
              <Link
                href="https://www.facebook.com/CasaTiTiCoriaDelRio/?locale=es_ES"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 dark:text-muted-foreground hover:text-[#b5c99a] dark:hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white/60 dark:text-muted-foreground hover:text-[#b5c99a] dark:hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Location Info */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${brandGreen}`}>ENCUÉNTRANOS</h4>
            <div className="space-y-4 text-sm w-full text-white/80 dark:text-foreground/80">
              <div className="flex flex-col items-center md:flex-row md:items-start gap-3 justify-center md:justify-start group">
                <MapPin className={`h-5 w-5 ${brandGreen} shrink-0 transition-transform group-hover:scale-110`} />
                <p>Av. Palomares, 1<br />41100 Coria del Río, Sevilla</p>
              </div>
              <div className="flex flex-col items-center md:flex-row md:items-start gap-3 justify-center md:justify-start group">
                <Phone className={`h-5 w-5 ${brandGreen} shrink-0 transition-transform group-hover:scale-110`} />
                <p>954 77 21 32</p>
              </div>
              <div className="flex flex-col items-center md:flex-row md:items-start gap-3 justify-center md:justify-start group">
                <Mail className={`h-5 w-5 ${brandGreen} shrink-0 transition-transform group-hover:scale-110`} />
                <p>info@cafebartiti.es</p>
              </div>
            </div>
          </div>

          {/* Horario */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${brandGreen}`}>HORARIO</h4>
            <div className="w-full max-w-[280px] md:max-w-none space-y-3 text-sm text-white/80 dark:text-foreground/80 mx-auto md:mx-0">
              <div className="flex justify-between items-center border-b border-white/5 dark:border-border/10 pb-2">
                <span className="font-medium">Lun - Mié</span>
                <span className="font-bold">06:00 - 00:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 dark:border-border/10 pb-2">
                <span className="font-medium">Jue - Sáb</span>
                <span className="font-bold">06:00 - 02:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 dark:border-border/10 pb-2">
                <span className="font-medium">Domingos</span>
                <span className="font-bold">06:00 - 17:00</span>
              </div>
              <div className={`flex items-center justify-center md:justify-start gap-2 pt-4 ${brandGreen}`}>
                <Flame className="h-3 w-3" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Cocina: Jueves noche a Domingo</span>
              </div>
            </div>
          </div>

          {/* Nuestra Ubicación */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${brandGreen}`}>NUESTRA UBICACIÓN</h4>
            <Link
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-video w-full max-w-[300px] md:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-2xl mx-auto md:mx-0 group cursor-pointer block"
            >
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600"
                alt="Mapa Coria del Río"
                fill
                className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#b5c99a] dark:bg-primary p-2 rounded-full shadow-lg border-2 border-black/20 dark:border-background transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-[#1A1614] dark:text-black animate-bounce" />
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 dark:border-primary/20 transition-transform group-hover:scale-105">
                <span className="text-[9px] font-bold text-white uppercase tracking-widest whitespace-nowrap">Ver en Google Maps</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 dark:border-border/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-white/40 dark:text-muted-foreground uppercase tracking-widest font-bold text-center md:text-left">
          <p>© 2026 CAFE BAR TITI CORIA. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
            <Link href="/aviso-legal" className="hover:text-[#b5c99a] dark:hover:text-primary transition-colors">AVISO LEGAL</Link>
            <Link href="/privacidad" className="hover:text-[#b5c99a] dark:hover:text-primary transition-colors">PRIVACIDAD</Link>
            <Link href="/cookies" className="hover:text-[#b5c99a] dark:hover:text-primary transition-colors">COOKIES</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
