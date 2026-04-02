/**
 * @fileOverview Respaldo completo de la carta de Cafe Bar Titi.
 * Contiene todos los platos, precios, descripciones y alérgenos.
 */

export interface MenuItem {
  id: string;
  nombre: string;
  desc: string;
  prices: {
    tapa?: number;
    media?: number;
    racion?: number;
  };
  alergenos?: string[];
  unit?: boolean;
  image?: string;
}

export interface MenuSection {
  items: MenuItem[];
  footer?: string;
}

export const MENU_BACKUP: Record<string, MenuSection> = {
  "Entrantes": {
    items: [
      { id: "ensalada-casa", nombre: "Ensalada de la Casa", prices: { racion: 5.00 }, desc: "Fresca y variada, ideal para acompañar tus platos.", alergenos: ["Huevos", "Crustáceos", "Dióxido de azufre y sulfitos"], image: "/images/ensalada.png" },
      { id: "ensaladilla-rusa", nombre: "Ensaladilla", desc: "Nuestra clásica ensaladilla casera.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Huevos", "Crustáceos", "Dióxido de azufre y sulfitos"], image: "/images/ensaladilla.png" },
      { id: "carne-mechada-titi", nombre: "Carne Mechada", desc: "Carne mechada en su jugo, receta tradicional de la casa.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/images/mechada.png" },
      { id: "salpicon-marisco", nombre: "Salpicón de Marisco", desc: "Mezcla fresca de mariscos y hortalizas del día.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Crustáceos", "Dióxido de azufre y sulfitos"], image: "/images/salpicon.png" },
      { id: "salmorejo-tapa", nombre: "Salmorejo", prices: { tapa: 4.00 }, desc: "Creama fría de tomate con virutas de jamón y huevo.", alergenos: ["Contiene Gluten", "Huevos", "Dióxido de azufre y sulfitos"], image: "/images/salmorejo.png" },
      { id: "alino-huevas", nombre: "Aliño de Huevas", desc: "Huevas frescas aliñadas con cebolla, pimiento y tomate.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Pescado", "Dióxido de azufre y sulfitos"], image: "/images/alino_huevas.png" },
    ]
  },
  "Tapas Variadas": {
    items: [
      { id: "brocheta-gambon", nombre: "Brocheta de Gambón", prices: { tapa: 4.30 }, desc: "Gambón a la brasa con un toque de sal y aceite.", alergenos: ["Crustáceos"], image: "/images/brocheta.png" },
      { id: "pepito-gambas", nombre: "Pepito de Gambas", prices: { tapa: 4.00 }, desc: "Delicioso mini bocadillo relleno de gambas frescas.", alergenos: ["Contiene Gluten", "Crustáceos"], image: "/images/pepito.png" },
      { id: "croquetas-puchero", nombre: "Croquetas de Puchero", desc: "Suaves, cremosas y con todo el sabor del puchero.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Huevos", "Lácteos", "Soja"], image: "/images/croquetas.png" },
      { id: "croquetas-cola-toro", nombre: "Croquetas de Cola de Toro", desc: "Sabor intenso a cola de toro tradicional guisada.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Dióxido de azufre y sulfitos", "Lácteos", "Huevos", "Soja"], image: "/images/croquetas_toro.png" },
      { id: "nuggets-pollo", nombre: "Nuggets de Pollo", desc: "Pechuga de pollo empanada y muy crujiente.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Huevos", "Lácteos", "Soja"], image: "/images/nuggets.png" },
      { id: "patatas-fritas-huevos-tapa", nombre: "Patatas Fritas con Huevos", prices: { tapa: 4.00 }, desc: "Un clásico imbatible, recién hechas.", alergenos: ["Huevos"], image: "/images/patatas_huevos.png" },
      { id: "pinchito-pollo-tapa", nombre: "Pinchito de Pollo", prices: { tapa: 4.00 }, desc: "Pollo marinado al estilo tradicional.", alergenos: ["Dióxido de azufre y sulfitos"], image: "/images/pinchito_pollo.png" },
      { id: "lagrimitas-mozarabe", nombre: "Lagrimitas con Salsa Mozárabe", desc: "Tiras de pollo con nuestra famosa salsa especial.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Huevos", "Dióxido de azufre y sulfitos", "Mostaza"], image: "/images/lagrimitas.png" },
      { id: "solomillo-mojo-picon", nombre: "Solomillo al Mojo Picón", desc: "Solomillo tierno con auténtico mojo canario.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/images/solomillo_mojo.png" },
      { id: "solomillo-whisky-tapa", nombre: "Solomillo al Whisky", desc: "El favorito de la casa en formato tapa.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/images/solomillo.png" },
      { id: "solomillo-carbonara", nombre: "Solomillo Carbonara", desc: "Solomillo con salsa cremosa de bacon.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Lácteos"], image: "/images/solomillo_carbonara.png" },
      { id: "pechuga-pollo-variada", nombre: "Pechuga de Pollo", desc: "Jugosa pechuga a la plancha.", prices: { tapa: 4.00, media: 8.00 }, image: "/images/pechuga_pollo.png" },
      { id: "lagartito-iberico-variada", nombre: "Lagartito Ibérico", desc: "Corte ibérico a la brasa muy jugoso.", prices: { tapa: 4.50, media: 9.00, racion: 18.00 }, image: "/images/lagartito.png" },
      { id: "carrilla-iberica", nombre: "Carrilla Ibérica", desc: "Carrillada tierna guisada a fuego lento.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/images/carrilla.png" },
      { id: "carne-con-tomate", nombre: "Carne con Tomate", desc: "Magro de cerdo con sofrito de tomate casero.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/images/carne_tomate.png" },
      { id: "alitas-pollo-tapa", nombre: "Alitas de Pollo", desc: "Alitas de pollo fritas y crujientes.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, image: "/images/alitas.png" },
    ]
  },
  "Montaditos": {
    items: [
      { id: "serranito-lomo-pollo", nombre: "Serranitos de Lomo o Pollo", prices: { racion: 5.00 }, desc: "El clásico de la casa con pimiento frito y jamón.", alergenos: ["Contiene Gluten"], image: "/images/serranito.png" },
      { id: "mini-serranito", nombre: "Mini Serranitos de Lomo o Pollo", prices: { racion: 4.00 }, desc: "Nuestra versión reducida del serranito tradicional.", alergenos: ["Contiene Gluten"], image: "/images/mini_serranito.png" },
      { id: "montadito-lomo-pollo", nombre: "Montaditos de Lomo o Pollo", prices: { racion: 3.50 }, desc: "Tierno lomo o pollo en pan crujiente.", alergenos: ["Contiene Gluten"], image: "/images/montadito_lomo_pollo.png" },
      { id: "montadito-jamon", nombre: "Montadito de Jamón", prices: { racion: 4.00 }, desc: "Jamón serrano seleccionado de primera calidad.", alergenos: ["Contiene Gluten"], image: "/images/montadito_jamon.png" },
      { id: "montadito-mechada", nombre: "Montadito de Carne Mechada", prices: { racion: 4.00 }, desc: "Carne mechada casera con su jugo.", alergenos: ["Contiene Gluten", "Dióxido de azufre y sulfitos"], image: "/menu/pringaa.png" },
    ]
  },
  "Pescado Frito": {
    items: [
      { id: "choco-frito", nombre: "Choco", desc: "Choco de la costa frito a la andaluza.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Moluscos"], image: "/images/choco.png" },
      { id: "calamares", nombre: "Calamares", desc: "Anillas de calamar frescas y crujientes.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Moluscos"], image: "/images/calamares.png" },
      { id: "boquerones-fritos", nombre: "Boquerones", desc: "Boquerones victorianos fritos en aceite de oliva.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Pescado"], image: "/images/boquerones.png" },
      { id: "cazon-adobo", nombre: "Cazón en Adobo", desc: "Cazón macerado con nuestra receta tradicional.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Pescado", "Dióxido de azufre y sulfitos"], image: "/images/adobo.png" },
      { id: "pijota", nombre: "Pijota", desc: "Pijota fresca de la lonja frita entera.", prices: { tapa: 5.00, media: 10.00 }, alergenos: ["Contiene Gluten", "Pescado"], image: "/images/pijota.png" },
      { id: "pavia-bacalao", nombre: "Pavía de Bacalao", prices: { tapa: 4.00 }, desc: "Precio por unidad. Bacalao desalado con rebozado crujiente.", unit: true, alergenos: ["Contiene Gluten", "Pescado"], image: "/images/pavia_bacalao.png" },
      { id: "twister-langostino", nombre: "Twister de Langostino", prices: { tapa: 4.00 }, desc: "Crujiente de langostino con un toque especial.", alergenos: ["Contiene Gluten", "Crustáceos", "Soja"], image: "/images/twister_langostino.png" },
    ]
  },
  "Pescado Plancha": {
    items: [
      { id: "chipirones-plancha", nombre: "Chipirones", desc: "Chipirones frescos a la plancha con aliño.", prices: { tapa: 4.00, media: 8.00 }, alergenos: ["Moluscos"], image: "/images/chipirones_plancha.png" },
      { id: "hueva-plancha", nombre: "Hueva", desc: "Hueva de pescado seleccionada a la plancha.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Pescado"], image: "/images/hueva_plancha.png" },
      { id: "atun-plancha", nombre: "Atún", prices: { tapa: 5.00 }, desc: "Atún rojo a la plancha al punto de sal.", alergenos: ["Pescado"], image: "/images/atun_plancha.png" },
      { id: "pez-espada", nombre: "Pez Espada", prices: { racion: 10.00 }, desc: "Pez espada jugoso a la plancha con ajo y perejil.", alergenos: ["Pescado"], image: "/images/pez_espada.png" },
      { id: "choco-plancha", nombre: "Choco", prices: { tapa: 5.00 }, desc: "Choco fresco a la plancha con aliño verde.", alergenos: ["Moluscos"], image: "/images/choco_plancha.png" },
    ]
  },
  "Carnes a la Brasa": {
    items: [
      { id: "solomillo-iberico-brasa", nombre: "Solomillo Ibérico", prices: { racion: 14.00 }, desc: "Solomillo de cerdo ibérico seleccionado a la brasa.", image: "/images/solomillo_iberico.png" },
      { id: "entrecot-ternera", nombre: "Entrecot de Ternera", prices: { racion: 16.00 }, desc: "Entrecot de ternera rosada a la brasa.", image: "/images/entrecot.png" },
      { id: "churrasco-cerdo", nombre: "Churrasco de Cerdo", prices: { racion: 10.00 }, desc: "Tiras de costilla de cerdo a la brasa.", image: "/images/churrasco_cerdo.png" },
      { id: "presa-iberica", nombre: "Presa Ibérica", desc: "Presa ibérica de máxima calidad a la brasa.", prices: { tapa: 6.50, racion: 13.00 }, image: "/images/presa.png" },
    ],
    footer: "En todas las carnes: suplemento con jamón añadido de 4,00€. Salsa extra: 0,50€."
  }
};
