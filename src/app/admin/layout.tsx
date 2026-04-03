"use client"

import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useFirebase } from "@/firebase"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  BookOpen, 
  ImageIcon, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  UtensilsCrossed,
  Mail
} from "lucide-react"

const adminItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "Carta & Menú",
    url: "/admin/menu",
    icon: BookOpen,
  },
  {
    title: "Galería",
    url: "/admin/galeria",
    icon: ImageIcon,
  },
  {
    title: "Testimonios",
    url: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    title: "Mensajes",
    url: "/admin/contacto",
    icon: Mail,
  },
  {
    title: "Reservas",
    url: "/admin/reservas",
    icon: Calendar,
  },
  {
    title: "Información",
    url: "/admin/info",
    icon: Settings,
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { auth } = useFirebase()

  useEffect(() => {
    if (!auth) return
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Allow access to login page unauthenticated, but redirect if authenticated
      if (pathname === '/admin/login') {
        if (user && user.email === 'jukk4p@gmail.com') {
          router.replace('/admin')
        } else {
          setIsAuthenticated(false) // Not authed but allowed on login
        }
        return
      }

      // For all other /admin routes, check strict auth
      if (user && user.email === 'jukk4p@gmail.com') {
        setIsAuthenticated(true)
      } else {
        router.replace('/admin/login')
      }
    })
    return () => unsubscribe()
  }, [auth, pathname, router])

  const handleLogout = async () => {
    if (!auth) return
    await auth.signOut()
    router.push('/admin/login')
  }

  // If loading or non-auth state on protected route
  if (isAuthenticated === null && pathname !== '/admin/login') {
    return <div className="h-screen w-full flex items-center justify-center bg-background">Cargando...</div>
  }

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="bg-card">
        <SidebarHeader className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg leading-none">Cafe Bar Titi</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Panel</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-bold uppercase tracking-widest mt-2 mb-2">Gestión</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => {
                  const isActive = pathname === item.url || (item.url !== '/admin' && pathname.startsWith(item.url))
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        className={cn(
                          "relative rounded-xl h-11 px-4 transition-all duration-300 group",
                          isActive 
                            ? "bg-primary/10 text-primary font-bold shadow-[inset_0_0_0_1px_rgba(var(--primary),0.1)]" 
                            : "text-muted-foreground hover:bg-muted/50"
                        )}
                        tooltip={item.title}
                      >
                        <a href={item.url}>
                          {isActive && (
                            <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                          )}
                          <item.icon className={cn(
                            "h-5 w-5 transition-transform group-hover:scale-110",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )} />
                          <span className="ml-2">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-border/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold transition-colors">
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-sm bg-background/80 sticky top-0 z-30">
          <SidebarTrigger />
          <div className="w-px h-4 bg-border/50 mx-2" />
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {pathname.split('/').pop() || 'Dashboard'}
          </span>
        </header>
        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
