"use client"

import * as React from "react"

export type OrderType = "tapa" | "media" | "racion" | "unidad"

export interface CartItem {
  id: string
  nombre: string
  price: number
  type: OrderType
  variant?: string
  quantity: number
  image?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: any, type: OrderType, price: number, variant?: string) => void
  removeItem: (id: string, type: OrderType, variant?: string) => void
  updateQuantity: (id: string, type: OrderType, delta: number, variant?: string) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = React.createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])

  const addItem = (item: any, type: OrderType, price: number, variant?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.type === type && i.variant === variant)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.type === type && i.variant === variant
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [
        ...prev,
        {
          id: item.id,
          nombre: item.nombre,
          image: item.image,
          price,
          type,
          variant,
          quantity: 1,
        },
      ]
    })
  }

  const removeItem = (id: string, type: OrderType, variant?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.type === type && i.variant === variant)))
  }

  const updateQuantity = (id: string, type: OrderType, delta: number, variant?: string) => {
    setItems((prev) => {
      return prev
        .map((i) => {
          if (i.id === id && i.type === type && i.variant === variant) {
            const newQty = i.quantity + delta
            return { ...i, quantity: newQty }
          }
          return i
        })
        .filter((i) => i.quantity > 0)
    })
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = React.useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
