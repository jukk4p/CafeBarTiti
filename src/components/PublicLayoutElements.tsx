"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StickyCallButton } from '@/components/StickyCallButton';
import { ChatAgent } from '@/components/ChatAgent';

export function PublicLayoutElements({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Si estamos en cualquier ruta de administración (/admin...), ocultamos la UI pública
  if (isAdmin) {
    return (
      <main className="flex-grow w-full" id="main-content">
        {children}
      </main>
    );
  }

  // Si estamos en la web pública, mostramos Navbar, Footer, Botón de llamada y Asistente IA
  return (
    <>
      <Navbar />
      <main className="flex-grow" id="main-content">
        {children}
      </main>
      <Footer />
      <StickyCallButton />
      <ChatAgent />
    </>
  );
}
