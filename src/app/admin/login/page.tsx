"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useFirebase } from "@/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, ArrowRight, Loader2 } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { auth } = useFirebase()

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!auth) return
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email === 'jukk4p@gmail.com') {
          router.replace('/admin')
        } else {
          auth.signOut()
          setError("Acceso denegado: Usuario no autorizado.")
        }
      }
    })
    return () => unsubscribe()
  }, [auth, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) {
      setError("Error de inicialización de los servicios. Intenta recargar la página.")
      return
    }
    
    setIsLoading(true)
    setError("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Verificación estricta de admin
      if (userCredential.user.email !== 'jukk4p@gmail.com') {
        await auth.signOut()
        setError("Lo siento, tu correo no tiene privilegios de administrador.")
        setIsLoading(false)
        return
      }
      
      router.push('/admin')
    } catch (err: any) {
      setIsLoading(false)
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError("Correo o contraseña incorrectos.")
          break
        case 'auth/too-many-requests':
          setError("Demasiados intentos. Por favor, espera un momento y vuelve a intentarlo.")
          break
        default:
          setError("Ocurrió un error al intentar iniciar sesión. " + err.message)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background blobs for aesthetic */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-border/50 text-center">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-headline font-bold text-foreground mb-2">Acceso Seguro</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Panel de Administración Exclusivo<br/>Cafe Bar Titi
          </p>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Correo Electrónico</label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ejemplo.com"
                  className="h-14 bg-background border-muted rounded-2xl px-5 text-base"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Contraseña</label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-14 bg-background border-muted rounded-2xl px-5 text-base"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Entrar al Panel <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
        
        <p className="text-center text-xs text-muted-foreground font-bold uppercase tracking-widest mt-8">
          Solo Personal Autorizado
        </p>
      </div>
    </div>
  )
}
