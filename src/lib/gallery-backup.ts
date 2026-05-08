/**
 * @fileOverview Respaldo de la galería de imágenes de Cafe Bar Titi.
 */

export interface GalleryItem {
  id: string;
  url: string;
  hint: string;
  category: string;
}

export const GALLERY_BACKUP: GalleryItem[] = [
  { id: "alitas", url: "/galeria/alitas.webp", hint: "Alitas de pollo crujientes", category: "Nuestras Tapas" },
  { id: "burrito-empanado", url: "/galeria/burrito-empanado.webp", hint: "Burrito artesano empanado", category: "Nuestras Tapas" },
  { id: "calamares", url: "/galeria/calamares.webp", hint: "Calamares frescos", category: "Nuestras Tapas" },
  { id: "caracoles", url: "/galeria/caracoles.webp", hint: "Los famosos caracoles del Titi", category: "Nuestras Tapas" },
  { id: "chipiron-plancha", url: "/galeria/chipiron-plancha.webp", hint: "Chipirones a la plancha", category: "Nuestras Tapas" },
  { id: "entrecot-ternera", url: "/galeria/entrecot-ternera.webp", hint: "Entrecot de ternera a la brasa", category: "Nuestras Tapas" },
  { id: "gambas", url: "/galeria/gambas.webp", hint: "Gambas frescas de la costa", category: "Nuestras Tapas" },
  { id: "lagrimitas-con-salsa", url: "/galeria/lagrimitas-con-salsa.webp", hint: "Lagrimitas con salsa mozárabe", category: "Nuestras Tapas" },
  { id: "menestra", url: "/galeria/menestra.webp", hint: "Menestra de verduras tradicional", category: "Nuestras Tapas" },
  { id: "merluza", url: "/galeria/merluza.webp", hint: "Merluza fresca a la plancha", category: "Nuestras Tapas" },
  { id: "olla-caracoles", url: "/galeria/olla-caracoles.webp", hint: "Olla de caracoles en preparación", category: "Nuestras Tapas" },
  { id: "puntillitas", url: "/galeria/puntillitas.webp", hint: "Puntillitas fritas", category: "Nuestras Tapas" },
  { id: "coria-vista-aerea", url: "/galeria/Coria_Vista-Aerea.webp", hint: "Vista aérea de Coria del Río", category: "Coria" },
  { id: "bar-exterior", url: "/hero/00_Portada.webp", hint: "Exterior de Cafe Bar Titi", category: "El Bar" },
  { id: "bar-interior", url: "/hero/01_Portada.webp", hint: "Ambiente interior", category: "El Bar" },
  { id: "bar-barra", url: "/hero/02_Portada.webp", hint: "Nuestra barra tradicional", category: "El Bar" },
  { id: "bar-terraza", url: "/hero/03_Portada.webp", hint: "Terraza exterior", category: "El Bar" },
];
