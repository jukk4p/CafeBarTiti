"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Flame, Sparkles, Smartphone, ArrowRight } from "lucide-react"

export default function QRPage() {
  const [productionUrl, setProductionUrl] = React.useState("https://bartiti.ivangonzalez.cloud/qr-menu")
  
  // Usamos una API externa para generar el QR real y funcional sin dependencias pesadas
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(productionUrl)}&bgcolor=FFFFFF&color=064e3b&margin=2`

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-4 md:p-8 font-serif">
      {/* Container del Poster (Proporción A4 o similar para imprimir) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden border border-emerald-900/5 flex flex-col items-center text-center p-8 md:p-16 relative"
      >
        {/* Adorno de esquina */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-900/5 rounded-br-full -translate-x-12 -translate-y-12" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-900/5 rounded-bl-full translate-x-12 -translate-y-12" />

        {/* Header */}
        <div className="space-y-4 mb-12 relative z-10">
          <div className="flex items-center justify-center gap-2 text-emerald-800">
            <Flame className="h-6 w-6 fill-current animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.4em]">Cafe Bar Titi</span>
            <Flame className="h-6 w-6 fill-current animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-950 italic">
            Carta Interactiva
          </h1>
          <div className="w-24 h-px bg-emerald-900/20 mx-auto" />
        </div>

        {/* QR Section */}
        <div className="relative group mb-12">
          {/* Decorative frames */}
          <div className="absolute -inset-4 border border-emerald-900/10 rounded-[2rem] scale-95 group-hover:scale-100 transition-transform duration-700" />
          
          <div className="relative bg-white p-6 rounded-[2.5rem] shadow-xl border border-emerald-900/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={qrImageUrl} 
              alt="QR Code Menu"
              className="w-64 h-64 md:w-80 md:h-80 object-contain mx-auto transition-transform hover:scale-[1.02] duration-500"
            />
          </div>

          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-emerald-900 text-white p-4 rounded-2xl shadow-lg border border-emerald-400/20 hidden md:block"
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
        </div>

        {/* Instructions */}
        <div className="space-y-8 relative z-10 max-w-sm mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-emerald-50 rounded-full text-emerald-900">
              <Smartphone className="h-8 w-8" />
            </div>
            <p className="text-xl md:text-2xl text-emerald-900/80 leading-relaxed italic">
              Escaneá este código con tu móvil para ver nuestra <span className="text-emerald-950 font-bold">experiencia digital inmersiva.</span>
            </p>
            
            <Link 
              href="/qr-menu" 
              className="mt-4 bg-emerald-950 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-emerald-800 transition-all flex items-center gap-2 group print:hidden"
            >
              Probar en este dispositivo
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-8 border-t border-emerald-900/10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-900/40">
              Tradición del Aljarafe desde 1968
            </p>
          </div>
        </div>

        {/* Input para que el usuario cambie la URL si necesita probar otra */}
        <div className="mt-12 pt-8 border-t border-emerald-900/5 w-full flex flex-col items-center gap-4 opacity-30 hover:opacity-100 transition-opacity print:hidden">
            <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/60">Configurar URL del QR (Solo para esta vista)</label>
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-900/10 w-full max-w-xs">
                <input 
                    type="text" 
                    value={productionUrl} 
                    onChange={(e) => setProductionUrl(e.target.value)}
                    className="bg-transparent border-none outline-none text-[10px] font-mono text-emerald-900 flex-1"
                />
                <ArrowRight className="h-3 w-3 text-emerald-400" />
            </div>
        </div>
      </motion.div>

      {/* Print Button Floating */}
      <button 
        onClick={() => window.print()}
        className="fixed bottom-8 right-8 bg-emerald-950 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl hover:bg-emerald-900 transition-all hover:scale-105 active:scale-95 print:hidden flex items-center gap-2"
      >
        Imprimir Poster
      </button>
    </div>
  )
}
