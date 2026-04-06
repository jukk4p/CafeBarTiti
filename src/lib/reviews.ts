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

export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Bar+Titi/@37.2896171,-6.0545706,17z/data=!4m8!3m7!1s0xd1272c700389b23:0x53962cf33a184785!8m2!3d37.2896171!4d-6.0545706!9m1!1b1!16s%2Fg%2F11bycfd65j";

export const REVIEWS: Review[] = [
  {
    id: 1,
    nombre: "Jose maria barrera",
    puntuacion: 5,
    fecha: "Hace 7 meses",
    comentario: "El mejor lugar para tomar algo fresco, comer bien y reunirte con amigos y desconocidos",
    fuente: "Google Reviews",
    avatarUrl: "https://i.pravatar.cc/150?u=josemaria"
  },
  {
    id: 2,
    nombre: "Noelia Almeida",
    puntuacion: 5,
    fecha: "Hace 11 meses",
    comentario: "Servicio rapidísimo. Comida de tapeo muy rica, pescado muy fresco. Para volver.",
    fuente: "Google Reviews",
    avatarUrl: "https://i.pravatar.cc/150?u=noelia"
  },
  {
    id: 3,
    nombre: "Claudia Feria",
    puntuacion: 5,
    fecha: "Hace 1 año",
    comentario: "Tapas a buen precio y muy ricas. Me encanta el aliño de hueva y el de marisco. Y la brocheta de langostinos",
    fuente: "Google Reviews",
    avatarUrl: "https://i.pravatar.cc/150?u=claudia"
  },
  {
    id: 4,
    nombre: "Vanesa Garcia",
    puntuacion: 5,
    fecha: "Hace 1 año",
    comentario: "De lo mejor de toda coria, gran variedad en tapas, sus caracoles exquisitos y trato inmejorable. Recomendado 100x100",
    fuente: "Google Reviews",
    avatarUrl: "https://i.pravatar.cc/150?u=vanesa"
  },
  {
    id: 5,
    nombre: "Andres m r",
    puntuacion: 5,
    fecha: "Hace 1 año",
    comentario: "Buen tapeo y raciones a muy buen precio. La ensaladilla de gambas y las hueva aliñada muy buenas.",
    fuente: "Google Reviews",
    avatarUrl: "https://i.pravatar.cc/150?u=andres"
  },
  {
    id: 6,
    nombre: "Francisco Jose",
    puntuacion: 5,
    fecha: "Hace 1 año",
    comentario: "Lugar magnífico donde comer unas riquísimas tapas a un precio muy equilibrado con la calidad de los productos y con un servicio inmejorable por parte de todo el equipo.",
    fuente: "Google Reviews",
    avatarUrl: "https://i.pravatar.cc/150?u=francisco"
  }
];

export const REVIEWS_STATS = {
  average: 4.5,
  total: 410
};
