"use client"

import React, { useState } from "react"
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase"
import { collection, doc, query, orderBy } from "firebase/firestore"
import { updateDocumentNonBlocking, deleteDocumentNonBlocking, addDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { 
  Plus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  Search,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Todas", "Nuestras Tapas", "El Bar", "Coria"]

export default function AdminGalleryPage() {
  const { firestore } = useFirebase()
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  
  // Suscribirse a la colección de galería
  const galleryQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, "gallery"), orderBy("id", "asc"))
  }, [firestore])

  const { data: galleryItems, isLoading } = useCollection(galleryQuery)

  const handleEdit = (item: any) => {
    setEditingItem({ ...item })
    setIsEditDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingItem({
      id: String(Date.now()),
      url: "",
      category: activeFilter === "Todas" ? "Nuestras Tapas" : activeFilter,
      hint: ""
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (item: any) => {
    setEditingItem(item)
    setIsDeleteDialogOpen(true)
  }

  const saveItem = async () => {
    if (!firestore || !editingItem) return
    
    const colRef = collection(firestore, "gallery")
    const dataToSave = {
      ...editingItem,
      updatedAt: new Date().toISOString()
    }

    if (editingItem.firestoreId) { // We use firestoreId to distinguish update from create
      const docRef = doc(colRef, editingItem.firestoreId)
      updateDocumentNonBlocking(docRef, dataToSave)
    } else {
      addDocumentNonBlocking(colRef, dataToSave)
    }

    setIsEditDialogOpen(false)
    setEditingItem(null)
  }

  const confirmDelete = () => {
    if (!firestore || !editingItem?.id) return
    // Note: useCollection adds 'id' to the data from doc.id. 
    // In our case we had 'id' as a field too. Let's be careful.
    // The hook gives doc.id as 'id'.
    const docRef = doc(firestore, "gallery", editingItem.id)
    deleteDocumentNonBlocking(docRef)
    setIsDeleteDialogOpen(false)
    setEditingItem(null)
  }

  const filteredItems = galleryItems?.filter(item => 
    activeFilter === "Todas" ? true : item.category === activeFilter
  )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Cargando galería...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold">Galería de Imágenes</h1>
          <p className="text-muted-foreground">Administra las fotos que aparecen en la sección "Nuestra Galería".</p>
        </div>
        <Button onClick={handleAddNew} className="h-12 px-6 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
          <Plus className="h-5 w-5" /> Añadir Imagen
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 bg-card/50 p-2 rounded-2xl border border-border backdrop-blur-sm">
        {CATEGORIES.map(cat => {
          const isActive = activeFilter === cat
          return (
            <Button
              key={cat}
              variant={isActive ? "default" : "ghost"}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "rounded-xl h-10 px-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              {cat}
            </Button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems?.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-card/50 rounded-[2rem] border-2 border-dashed border-muted">
            <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">No hay imágenes en esta categoría</h3>
          </div>
        ) : (
          filteredItems?.map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:border-primary/30 transition-all shadow-sm rounded-2xl">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative aspect-square bg-muted overflow-hidden">
                  {item.url ? (
                    <img src={item.url} alt={item.hint} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="secondary" size="icon" onClick={() => handleEdit(item)} className="rounded-full shadow-lg">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(item)} className="rounded-full shadow-lg">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-card">
                  <p className="text-xs font-medium text-muted-foreground truncate italic">"{item.hint || "Sin descripción"}"</p>
                  <p className="text-[10px] text-muted-foreground/40 mt-1 font-mono uppercase tracking-tighter truncate">{item.url}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* MODAL DE EDICIÓN / ADICIÓN */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">
              {editingItem?.firestoreId ? "Editar Imagen" : "Nueva Imagen"}
            </DialogTitle>
            <DialogDescription>
              Vincula una imagen local y asígnale una categoría.
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ruta del archivo (desde /public/...)</label>
                <Input 
                  value={editingItem.url} 
                  onChange={e => setEditingItem({...editingItem, url: e.target.value})}
                  placeholder="Ej. /galeria/plato-1.webp"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Descripción (Alt Text)</label>
                <Input 
                  value={editingItem.hint} 
                  onChange={e => setEditingItem({...editingItem, hint: e.target.value})}
                  placeholder="Ej. Plato de Jamón Ibérico en nuestra barra"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categoría</label>
                <select 
                  className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={editingItem.category}
                  onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                >
                  {CATEGORIES.filter(c => c !== "Todas").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">ID de Orden (opcional)</label>
                <Input 
                  value={editingItem.id} 
                  onChange={e => setEditingItem({...editingItem, id: e.target.value})}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 mt-2">
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="rounded-xl font-bold">Cancelar</Button>
            <Button onClick={() => {
              // Hack to handle firestore vs internal id field
              const item = { ...editingItem };
              if (!item.firestoreId) item.firestoreId = undefined;
              saveItem();
            }} className="rounded-xl font-bold gap-2 px-8">
              <Save className="h-4 w-4" /> Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL DE ELIMINACIÓN */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md rounded-[2.5rem]">
          <DialogHeader className="pt-6 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="h-8 w-8 text-destructive" />
            </div>
            <DialogTitle className="text-2xl font-bold font-headline">¿Eliminar imagen?</DialogTitle>
            <DialogDescription className="text-base mt-2 px-4 italic">
              Esta imagen se quitará de la sección Galería. No se borrará el archivo de tu servidor.
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
