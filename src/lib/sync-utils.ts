import { doc, collection, setDoc, writeBatch, deleteDoc, getDocs } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { MENU_BACKUP } from "./menu";
import { GALLERY_BACKUP } from "./gallery-backup";
import { REVIEWS } from "./reviews";

/**
 * Utilidad para sincronizar todos los datos maestros con Firestore.
 * Borra los datos antiguos y sube los nuevos basados en el código.
 */
export async function syncAllData(firestore: Firestore) {
  const results = {
    menu: 0,
    gallery: 0,
    reviews: 0,
    settings: 0,
    error: null as string | null
  };

  try {
    // 1. Sincronizar Menú
    console.log("Sincronizando menú...");
    const menuCollection = collection(firestore, "menuItems");
    const menuSnapshot = await getDocs(menuCollection);
    
    // Borrar antiguos
    const menuBatch = writeBatch(firestore);
    menuSnapshot.docs.forEach(d => menuBatch.delete(d.ref));
    
    // Añadir nuevos
    Object.entries(MENU_BACKUP).forEach(([category, section]) => {
      section.items.forEach(item => {
        const docRef = doc(menuCollection);
        menuBatch.set(docRef, {
          ...item,
          category,
          updatedAt: new Date().toISOString()
        });
        results.menu++;
      });
    });
    await menuBatch.commit();

    // 2. Sincronizar Galería
    console.log("Sincronizando galería...");
    const galleryCollection = collection(firestore, "gallery");
    const gallerySnapshot = await getDocs(galleryCollection);
    
    const galleryBatch = writeBatch(firestore);
    gallerySnapshot.docs.forEach(d => galleryBatch.delete(d.ref));
    
    GALLERY_BACKUP.forEach(item => {
      const docRef = doc(galleryCollection);
      galleryBatch.set(docRef, {
        ...item,
        updatedAt: new Date().toISOString()
      });
      results.gallery++;
    });
    await galleryBatch.commit();

    // 3. Sincronizar Reseñas
    console.log("Sincronizando reseñas...");
    const reviewsCollection = collection(firestore, "reviews");
    const reviewsSnapshot = await getDocs(reviewsCollection);
    
    const reviewsBatch = writeBatch(firestore);
    reviewsSnapshot.docs.forEach(d => reviewsBatch.delete(d.ref));
    
    REVIEWS.forEach(review => {
      const docRef = doc(reviewsCollection);
      reviewsBatch.set(docRef, {
        ...review,
        updatedAt: new Date().toISOString()
      });
      results.reviews++;
    });
    await reviewsBatch.commit();

    // 4. Sincronizar Configuración del Sitio
    console.log("Sincronizando configuración...");
    const settingsRef = doc(firestore, "siteConfig", "global");
    await setDoc(settingsRef, {
      contactPhone: "954 77 21 32",
      contactEmail: "info@cafebartiti.es",
      address: "Av. Palomares, 1, 41100 Coria del Río, Sevilla",
      googleMaps: "https://www.google.com/maps/search/?api=1&query=Cafe+Bar+Titi+Av.+Palomares+1+Coria+del+Rio",
      facebook: "https://www.facebook.com/CasaTiTiCoriaDelRio/?locale=es_ES",
      instagram: "https://www.instagram.com/casatiti1968/",
      hours_lun_mie: "06:00 - 00:00",
      hours_jue_sab: "06:00 - 02:00",
      hours_dom: "06:00 - 17:00",
      kitchenHours: "Todos los mediodías | Jueves noche a Domingo mediodía",
      heroTitle: "Cafe Bar Titi: Sabor Tradicional en Coria del Río",
      heroSubtitle: "DESDE 1968 CUIDANDO EL TAPEO",
      historyTitle: "Una Taberna con Historia y Corazón",
      historyText: "Ubicados en el emblemático pueblo de Coria del Río...",
      updatedAt: new Date().toISOString()
    });
    results.settings = 1;

    return results;
  } catch (error: any) {
    console.error("Error en sincronización total:", error);
    results.error = error.message;
    return results;
  }
}
