
"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MapPin, Phone, Mail, Flame, UtensilsCrossed, Maximize2 } from "lucide-react"

export function Footer() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Cafe+Bar+Titi+Av.+Palomares+1+Coria+del+Rio"
  const brandGreen = "text-[#b5c99a] dark:text-primary transition-colors duration-300"

  return (
    <footer className="bg-[#1A1614] dark:bg-[#050505] border-t border-white/5 text-white pt-16 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand & Social */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <Link href="/" className="flex items-center gap-4 transition-transform hover:scale-105 group">
              <UtensilsCrossed className={`h-10 w-10 ${brandGreen} opacity-80 transition-transform duration-500 group-hover:rotate-12 shrink-0`} />
              <div className="flex flex-col items-start">
                <span className="text-2xl md:text-3xl font-headline font-bold text-white dark:text-foreground leading-none">Cafe Bar Titi</span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${brandGreen} mt-1.5`}>Desde 1968</span>
              </div>
            </Link>
            <p className="text-stone-300/80 dark:text-muted-foreground text-sm leading-relaxed max-w-xs italic">
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
            </div>
          </div>

          {/* Nuestra Ubicación */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${brandGreen}`}>NUESTRA UBICACIÓN</h4>
            <div className="relative aspect-video w-full max-w-[300px] md:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-2xl mx-auto md:mx-0 group bg-stone-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.2327557183917!2d-6.054570600000001!3d37.28961710000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1272c700389b23%3A0x53962cf33a184785!2sBar%20Titi!5e0!3m2!1ses!2ses!4v1775488759347!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.1) contrast(1) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
              />
              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 transition-all hover:scale-105 hover:bg-primary hover:text-white group/link shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-3 h-3 text-primary group-hover/link:text-white" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-[0.2em] whitespace-nowrap">Ampliar Mapa</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Full Width Kitchen Hours */}
        <div className="mb-12 py-6 border-y border-white/5 dark:border-border/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center">
            <Flame className={`h-4 w-4 ${brandGreen} animate-pulse shrink-0 md:-translate-y-[1px]`} />
            <p className="max-w-[300px] md:max-w-none text-[10px] md:text-xs font-bold uppercase opacity-80 leading-relaxed tracking-[0.15em] md:tracking-[0.3em] text-white">
              LUNES A MIÉRCOLES: SOLO MEDIODÍA · JUEVES A SÁBADO: MEDIODÍA Y NOCHE · DOMINGOS: MEDIODÍA
            </p>
            <Flame className={`h-4 w-4 ${brandGreen} animate-pulse shrink-0 hidden md:block md:-translate-y-[1px]`} />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 dark:border-border/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-white/40 dark:text-muted-foreground uppercase tracking-widest font-bold text-center md:text-left">
          <p>© 2026 CAFE BAR TITI. TODOS LOS DERECHOS RESERVADOS.</p>
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
