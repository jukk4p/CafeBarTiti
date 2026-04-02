/**
 * @fileOverview Datos de reseñas reales de Cafe Bar Titi extraídas de Google y otras plataformas.
 */

export interface Review {
  id: number;
  nombre: string;
  puntuacion: number;
  fecha: string;
  comentario: string;
  fuente: string;
  avatarUrl?: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    nombre: "Ivan Roman Saez",
    puntuacion: 5,
    fecha: "17 ene 2026",
    comentario: "Buen sitio para comer. Excelente. Con una gran variedad de tapas y buen género.",
    fuente: "Minube",
    avatarUrl: "https://i.pravatar.cc/150?u=ivan"
  },
  {
    id: 2,
    nombre: "Antonio M.",
    puntuacion: 4,
    fecha: "15 feb 2026",
    comentario: "Genial servicio. Precios justos. Terraza perfecta para verano.",
    fuente: "RestaurantGuru",
    avatarUrl: "https://i.pravatar.cc/150?u=antonio"
  },
  {
    id: 3,
    nombre: "María González",
    puntuacion: 5,
    fecha: "20 ene 2026",
    comentario: "Los mejores montaditos de Coria del Río. Trato familiar.",
    fuente: "Google Reviews",
    avatarUrl: "https://i.pravatar.cc/150?u=maria"
  },
  {
    id: 4,
    nombre: "Juan Pérez",
    puntuacion: 4,
    fecha: "10 nov 2025",
    comentario: "Muy recomendable para desayunos. Ambiente de barrio auténtico.",
    fuente: "TodoBares",
    avatarUrl: "https://i.pravatar.cc/150?u=juan"
  },
  {
    id: 5,
    nombre: "Carmen R.",
    puntuacion: 5,
    fecha: "05 feb 2026",
    comentario: "Tapas caseras excelentes. Relación calidad-precio imbatible.",
    fuente: "Google Reviews",
    avatarUrl: "https://i.pravatar.cc/150?u=carmen"
  },
  {
    id: 6,
    nombre: "Pedro S.",
    puntuacion: 4,
    fecha: "22 oct 2025",
    comentario: "Buen sitio para ver el partido con amigos. Terraza amplia.",
    fuente: "Facebook",
    avatarUrl: "https://i.pravatar.cc/150?u=pedro"
  }
];

export const REVIEWS_STATS = {
  average: 4.5,
  total: 351
};
