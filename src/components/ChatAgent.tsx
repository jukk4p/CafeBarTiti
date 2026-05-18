"use client"

import * as React from "react"
import { useCart, OrderType } from "@/context/CartContext"
import { MenuItem } from "@/lib/menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, X, Send, Bot, User, ShoppingBag, Loader2, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatAgent() {
  const { addItem, removeItem, items } = useCart()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = React.useState(false)
  const [sessionId, setSessionId] = React.useState<string>("")
  const [messages, setMessages] = React.useState<Message[]>([])
  const [inputMessage, setInputMessage] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastActionFeedback, setLastActionFeedback] = React.useState<string | null>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Generar sessionId y mensaje de bienvenida al montar
  React.useEffect(() => {
    const newSessionId = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : 'sess_' + Math.random().toString(36).substring(2, 11);
    setSessionId(newSessionId);

    setMessages([
      {
        id: "welcome-msg",
        role: "assistant",
        content: "¡Hola! Soy el asistente virtual de Café Bar Titi 🍲. ¿En qué puedo ayudarte hoy? Puedes pedirme recomendaciones de la carta o decirme qué platos te apetece añadir a tu pedido.",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto scroll al último mensaje
  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      // Enfocar el input automáticamente al abrir
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage("");

    const newUserMsg: Message = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      role: "user",
      content: userText,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setIsLoading(true);
    setLastActionFeedback(null);

    try {
      // Construir el historial para el webhook en formato Gemini (user / model)
      const historyForWebhook = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        content: msg.content
      }));

      const response = await fetch("https://n8n.ivangonzalez.cloud/webhook/titi-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionId,
          message: userText,
          history: historyForWebhook,
          cart: items
        })
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${responseText.slice(0, 100)}`);
      }

      let data: any = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error("Respuesta del webhook no es JSON válido:", responseText);
        throw new Error("El webhook de n8n no devolvió un JSON válido (probablemente falló un nodo en n8n).");
      }

      // Procesar addItems y replaceItems de la respuesta de n8n
      const addItems = Array.isArray(data.addItems) ? data.addItems : [];
      const replaceItems = Array.isArray(data.replaceItems) ? data.replaceItems : [];

      if (addItems.length > 0 || replaceItems.length > 0) {
        let totalItemsAdded = 0;

        // 1. Procesar replaceItems primero (elimina el ítem anterior y añade el nuevo)
        replaceItems.forEach((item: any) => {
          const qty = item.qty && typeof item.qty === 'number' ? item.qty : 1;
          totalItemsAdded += qty;

          // Buscar y eliminar ítems previos en el carrito con el mismo id
          items.forEach((cartItem) => {
            if (cartItem.id === item.id) {
              removeItem(cartItem.id, cartItem.type, cartItem.variant);
            }
          });

          const menuItem: MenuItem = {
            id: item.id || 'item-custom',
            nombre: item.nombre || 'Plato',
            desc: '',
            prices: {
              [item.type || 'racion']: item.price || 0
            }
          };

          for (let i = 0; i < qty; i++) {
            addItem(menuItem, (item.type || 'racion') as OrderType, item.price || 0);
          }
        });

        // 2. Procesar addItems
        addItems.forEach((item: any) => {
          const qty = item.qty && typeof item.qty === 'number' ? item.qty : 1;
          totalItemsAdded += qty;

          const menuItem: MenuItem = {
            id: item.id || 'item-custom',
            nombre: item.nombre || 'Plato',
            desc: '',
            prices: {
              [item.type || 'racion']: item.price || 0
            }
          };

          for (let i = 0; i < qty; i++) {
            addItem(menuItem, (item.type || 'racion') as OrderType, item.price || 0);
          }
        });

        // Feedback visual dual (Toast de shadcn + banner animado interno en el chat)
        toast({
          title: "¡Pedido actualizado! 🍳",
          description: `Se han añadido/actualizado ${totalItemsAdded} producto(s) en tu pedido.`,
        });
        setLastActionFeedback(`¡Se han añadido/actualizado ${totalItemsAdded} producto(s) en el pedido!`);
        setTimeout(() => setLastActionFeedback(null), 6000);
      }

      // Agregar la respuesta del asistente al estado local
      const botReplyText = data.reply || (data.success ? "He procesado tu solicitud correctamente." : "He recibido tu mensaje, pero no obtuve respuesta del agente.");
      const newBotMsg: Message = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
        role: "assistant",
        content: botReplyText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMsg]);

    } catch (error: any) {
      console.error("Error al comunicar con el webhook de n8n:", error);
      const errorMsg: Message = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
        role: "assistant",
        content: `Lo siento, ha ocurrido un error técnico en el servidor: ${error?.message || "Error desconocido"}. Por favor, verifica el flujo en n8n.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      toast({
        title: "Error en el Asistente",
        description: error?.message || "No se pudo obtener respuesta del agente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60] select-none font-body">
      {/* Ventana de Chat (Burbuja) */}
      {isOpen && (
        <div className={cn(
          "absolute bottom-16 left-0 w-[90vw] sm:w-[380px] h-[520px] max-h-[82vh]",
          "bg-background/95 backdrop-blur-xl border border-border shadow-[0_25px_50px_rgba(0,0,0,0.3)] rounded-2xl flex flex-col overflow-hidden",
          "animate-in fade-in zoom-in-95 duration-200"
        )}>
          {/* Cabecera */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm shadow-inner">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none text-white">Asistente Titi</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-white/80 font-medium tracking-wide">En línea</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Área de Mensajes */}
          <ScrollArea className="flex-1 p-4 pr-3">
            <div className="space-y-4 my-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5 items-end",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mb-1">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none font-medium"
                        : "bg-muted/80 text-foreground dark:bg-white/5 rounded-bl-none border border-border/50"
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    <span className={cn(
                      "text-[9px] block mt-1 text-right opacity-60 font-medium tracking-tighter",
                      msg.role === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mb-1 shadow-md">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Indicador de escribiendo */}
              {isLoading && (
                <div className="flex gap-2.5 items-end justify-start animate-in fade-in duration-200">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mb-1">
                    <Bot className="h-3.5 w-3.5 text-primary animate-pulse" />
                  </div>
                  <div className="bg-muted/80 dark:bg-white/5 rounded-2xl rounded-bl-none px-4 py-3 border border-border/50 shadow-sm flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                  </div>
                </div>
              )}

              {/* Banner de feedback interno cuando se añaden ítems */}
              {lastActionFeedback && (
                <div className="my-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      {lastActionFeedback}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Puedes revisar tu pedido en el carrito inferior.
                    </p>
                  </div>
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Área de Entrada de Texto */}
          <form onSubmit={handleSendMessage} className="p-3 bg-background/80 backdrop-blur-md border-t border-border flex gap-2 items-center">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              disabled={isLoading}
              className="flex-1 h-10 rounded-xl text-xs sm:text-sm bg-muted/50 border-border focus-visible:ring-primary/20 pr-3"
            />
            <Button 
              type="submit" 
              disabled={!inputMessage.trim() || isLoading}
              className="h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-all active:scale-95 shrink-0 p-0 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      )}

      {/* Botón Flotante */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-[0_10px_25px_rgba(26,71,49,0.4)] transition-all duration-300 active:scale-95 p-0 flex items-center justify-center group relative",
          isOpen 
            ? "bg-secondary hover:bg-secondary/90 text-white rotate-12" 
            : "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 hover:rotate-0"
        )}
        aria-label={isOpen ? "Cerrar asistente virtual" : "Abrir asistente virtual"}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300 transform group-hover:rotate-90" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 transition-transform duration-300 transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white ring-2 ring-background animate-bounce">
              1
            </span>
          </>
        )}
      </Button>
    </div>
  )
}
