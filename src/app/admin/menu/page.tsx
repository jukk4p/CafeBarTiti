"use client"

import React, { useState } from "react"
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase"
import { collection, doc } from "firebase/firestore"
import { updateDocumentNonBlocking, deleteDocumentNonBlocking, addDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  Plus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  Save, 
  Loader2, 
  ChevronRight,
  UtensilsCrossed,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Entrantes", "Tapas Variadas", "Montaditos", "Pescado Frito", "Pescado Plancha", "Carnes a la Brasa"]

const ALLERGENS = [
  "Contiene Gluten", "Crustáceos", "Huevos", "Pescado", "Cacahuetes", 
  "Soja", "Lácteos", "Frutos de cáscara", "Apio", "Mostaza", 
  "Granos de sésamo", "Dióxido de azufre y sulfitos", "Altramuces", "Moluscos"
]

export default function AdminMenuPage() {
  const { firestore } = useFirebase()
  const [activeCategory, setActiveCategory] = useState("Entrantes")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  
  // Suscribirse a la colección de platos
  const menuQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return collection(firestore, "menuItems")
  }, [firestore])

  const { data: menuItems, isLoading } = useCollection(menuQuery)

  const handleEdit = (item: any) => {
    setEditingItem({ 
      ...item, 
      prices: item.prices || { tapa: 0, media: 0, racion: 0 },
      alergenos: item.alergenos || []
    })
    setIsEditDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingItem({
      nombre: "",
      desc: "",
      category: activeCategory,
      prices: { tapa: 0, media: 0, racion: 0 },
      alergenos: [],
      image: ""
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (item: any) => {
    setEditingItem(item)
    setIsDeleteDialogOpen(true)
  }

  const saveItem = async () => {
    if (!firestore || !editingItem) return
    
    const colRef = collection(firestore, "menuItems")
    
    // Preparar datos para Firestore (limpiar ceros si se desea)
    const dataToSave = {
      ...editingItem,
      updatedAt: new Date().toISOString()
    }

    if (editingItem.id) {
      // Update
      const docRef = doc(colRef, editingItem.id)
      updateDocumentNonBlocking(docRef, dataToSave)
    } else {
      // Add
      addDocumentNonBlocking(colRef, dataToSave)
    }

    setIsEditDialogOpen(false)
    setEditingItem(null)
  }

  const confirmDelete = () => {
    if (!firestore || !editingItem?.id) return
    const docRef = doc(firestore, "menuItems", editingItem.id)
    deleteDocumentNonBlocking(docRef)
    setIsDeleteDialogOpen(false)
    setEditingItem(null)
  }

  const toggleAllergen = (allergen: string) => {
    if (!editingItem) return
    const current = editingItem.alergenos || []
    if (current.includes(allergen)) {
      setEditingItem({ ...editingItem, alergenos: current.filter((a: string) => a !== allergen) })
    } else {
      setEditingItem({ ...editingItem, alergenos: [...current, allergen] })
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Cargando carta...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold">Carta & Menú</h1>
          <p className="text-muted-foreground">Gestiona los platos, precios y alérgenos de tu carta física.</p>
        </div>
        <Button onClick={handleAddNew} className="h-12 px-6 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
          <Plus className="h-5 w-5" /> Añadir Nuevo Plato
        </Button>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="bg-card border border-border p-1 h-auto flex flex-wrap lg:grid lg:grid-cols-6 rounded-2xl">
          {CATEGORIES.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="rounded-xl py-3 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map(category => (
          <TabsContent key={category} value={category} className="mt-8 space-y-4">
            <div className="grid gap-4">
              {menuItems?.filter(item => item.category === category).length === 0 ? (
                <div className="text-center py-20 bg-card/50 rounded-[2rem] border-2 border-dashed border-muted">
                  <UtensilsCrossed className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-muted-foreground">No hay platos en esta categoría</h3>
                  <p className="text-sm text-muted-foreground mt-2">Usa el botón superior para añadir tu primer plato a {category}.</p>
                </div>
              ) : (
                menuItems?.filter(item => item.category === category).map((item) => (
                  <Card key={item.id} className="overflow-hidden group hover:border-primary/30 transition-all shadow-sm">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-4 gap-4">
                        <div className="h-20 w-20 rounded-2xl bg-muted overflow-hidden shrink-0 border border-border">
                          {item.image ? (
                            <img src={item.image} alt={item.nombre} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-primary/5">
                              <Sparkles className="h-6 w-6 text-primary/20" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold font-headline">{item.nombre}</h3>
                            <div className="flex gap-1">
                              {item.alergenos?.slice(0, 3).map((a: string) => (
                                <div key={a} className="h-1.5 w-1.5 rounded-full bg-primary/40" title={a} />
                              ))}
                              {item.alergenos?.length > 3 && <span className="text-[8px] font-bold opacity-40">+{item.alergenos.length - 3}</span>}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1 italic">{item.desc || "Sin descripción disponible."}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 px-4 border-l border-border/50">
                          {item.prices?.tapa > 0 && (
                            <div className="text-center">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Tapa</span>
                              <p className="font-bold text-primary">{item.prices.tapa.toFixed(2)}€</p>
                            </div>
                          )}
                          {item.prices?.media > 0 && (
                            <div className="text-center">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Media</span>
                              <p className="font-bold text-secondary">{item.prices.media.toFixed(2)}€</p>
                            </div>
                          )}
                          {item.prices?.racion > 0 && (
                            <div className="text-center">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Ración</span>
                              <p className="font-bold text-accent">{item.prices.racion.toFixed(2)}€</p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pl-4 border-l border-border/50">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="hover:bg-primary/10 hover:text-primary">
                            <Edit3 className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(item)} className="hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* MODAL DE EDICIÓN / CREACIÓN */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">
              {editingItem?.id ? "Editar Plato" : "Nuevo Plato"}
            </DialogTitle>
            <DialogDescription>
              Completa los detalles del plato para que aparezcan en la carta digital.
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nombre del Plato</label>
                  <Input 
                    value={editingItem.nombre} 
                    onChange={e => setEditingItem({...editingItem, nombre: e.target.value})}
                    placeholder="Ej. Salmorejo Cordobés"
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categoría</label>
                  <select 
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingItem.category}
                    onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ruta de Imagen (desde /public/...)</label>
                <Input 
                  value={editingItem.image} 
                  onChange={e => setEditingItem({...editingItem, image: e.target.value})}
                  placeholder="Ej. /menu/salmorejo.webp"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Descripción</label>
                <Textarea 
                  value={editingItem.desc} 
                  onChange={e => setEditingItem({...editingItem, desc: e.target.value})}
                  placeholder="Describe los ingredientes o la preparación..."
                  className="rounded-xl min-h-[100px]"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">Precios (€)</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-primary">Tapa</span>
                    <Input 
                      type="number" step="0.10"
                      value={editingItem.prices?.tapa ?? 0}
                      onChange={e => setEditingItem({...editingItem, prices: {...(editingItem.prices || {}), tapa: parseFloat(e.target.value) || 0}})}
                      className="rounded-xl border-primary/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-secondary">Media</span>
                    <Input 
                      type="number" step="0.10"
                      value={editingItem.prices?.media ?? 0}
                      onChange={e => setEditingItem({...editingItem, prices: {...(editingItem.prices || {}), media: parseFloat(e.target.value) || 0}})}
                      className="rounded-xl border-secondary/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-accent">Ración</span>
                    <Input 
                      type="number" step="0.10"
                      value={editingItem.prices?.racion ?? 0}
                      onChange={e => setEditingItem({...editingItem, prices: {...(editingItem.prices || {}), racion: parseFloat(e.target.value) || 0}})}
                      className="rounded-xl border-accent/20"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">Alérgenos</label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGENS.map(a => {
                    const isSelected = editingItem.alergenos?.includes(a)
                    return (
                      <Button 
                        key={a} 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleAllergen(a)}
                        className={cn(
                          "rounded-full text-[10px] font-bold uppercase tracking-tighter px-3 h-8 transition-all",
                          isSelected ? "bg-primary text-white border-primary" : "text-muted-foreground"
                        )}
                      >
                        {a}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-6 border-t border-border mt-4">
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="rounded-xl font-bold">Cancelar</Button>
            <Button onClick={saveItem} className="rounded-xl font-bold gap-2 px-8">
              <Save className="h-4 w-4" /> Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL DE ELIMINACIÓN */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md rounded-[2.5rem]">
          <DialogHeader className="pt-6 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <DialogTitle className="text-2xl font-bold font-headline">¿Eliminar este plato?</DialogTitle>
            <DialogDescription className="text-base mt-2 px-4 italic">
              Estás a punto de borrar <strong>"{editingItem?.nombre}"</strong>. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 py-6 px-10">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1 h-12 rounded-2xl font-bold">Cancelar</Button>
            <Button variant="destructive" onClick={confirmDelete} className="flex-1 h-12 rounded-2xl font-bold shadow-lg shadow-destructive/20">Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
