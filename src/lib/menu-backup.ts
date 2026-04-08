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
      { id: "ensalada-casa", nombre: "Ensalada de la Casa", prices: { racion: 5.00 }, desc: "Fresca y variada, ideal para acompañar tus platos.", alergenos: ["Huevos", "Crustáceos", "Dióxido de azufre y sulfitos"], image: "/menu/ensalada.webp" },
      { id: "ensaladilla-rusa", nombre: "Ensaladilla", desc: "Nuestra clásica ensaladilla casera.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Huevos", "Crustáceos", "Dióxido de azufre y sulfitos"], image: "/menu/ensaladilla.webp" },
      { id: "carne-mechada-titi", nombre: "Carne Mechada", desc: "Carne mechada en su jugo, receta tradicional de la casa.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/menu/mechada.webp" },
      { id: "salpicon-marisco", nombre: "Salpicón de Marisco", desc: "Mezcla fresca de mariscos y hortalizas del día.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Crustáceos", "Dióxido de azufre y sulfitos"], image: "/menu/salpicon.webp" },
      { id: "salmorejo-tapa", nombre: "Salmorejo", prices: { tapa: 4.00 }, desc: "Creama fría de tomate con virutas de jamón y huevo.", alergenos: ["Contiene Gluten", "Huevos", "Dióxido de azufre y sulfitos"], image: "/menu/salmorejo.webp" },
      { id: "alino-huevas", nombre: "Aliño de Huevas", desc: "Huevas frescas aliñadas con cebolla, pimiento y tomate.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Pescado", "Dióxido de azufre y sulfitos"], image: "/menu/alino_huevas.webp" },
    ]
  },
  "Tapas Variadas": {
    items: [
      { id: "brocheta-gambon", nombre: "Brocheta de Gambón", prices: { tapa: 4.30 }, desc: "Gambón a la brasa con un toque de sal y aceite.", alergenos: ["Crustáceos"], image: "/menu/brocheta.webp" },
      { id: "pepito-gambas", nombre: "Pepito de Gambas", prices: { tapa: 4.00 }, desc: "Delicioso mini bocadillo relleno de gambas frescas.", alergenos: ["Contiene Gluten", "Crustáceos"], image: "/menu/pepito.webp" },
      { id: "croquetas-puchero", nombre: "Croquetas de Puchero", desc: "Suaves, cremosas y con todo el sabor del puchero.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Huevos", "Lácteos", "Soja"], image: "/menu/croquetas.webp" },
      { id: "croquetas-cola-toro", nombre: "Croquetas de Cola de Toro", desc: "Sabor intenso a cola de toro tradicional guisada.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Dióxido de azufre y sulfitos", "Lácteos", "Huevos", "Soja"], image: "/menu/croquetas_toro.webp" },
      { id: "nuggets-pollo", nombre: "Nuggets de Pollo", desc: "Pechuga de pollo empanada y muy crujiente.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Huevos", "Lácteos", "Soja"], image: "/menu/nuggets.webp" },
      { id: "patatas-fritas-huevos-tapa", nombre: "Patatas Fritas con Huevos", prices: { tapa: 4.00 }, desc: "Un clásico imbatible, recién hechas.", alergenos: ["Huevos"], image: "/menu/patatas_huevos.webp" },
      { id: "pinchito-pollo-tapa", nombre: "Pinchito de Pollo", prices: { tapa: 4.00 }, desc: "Pollo marinado al estilo tradicional.", alergenos: ["Dióxido de azufre y sulfitos"], image: "/menu/pinchito_pollo.webp" },
      { id: "lagrimitas-mozarabe", nombre: "Lagrimitas con Salsa Mozárabe", desc: "Tiras de pollo con nuestra famosa salsa especial.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Huevos", "Dióxido de azufre y sulfitos", "Mostaza"], image: "/menu/lagrimitas.webp" },
      { id: "solomillo-mojo-picon", nombre: "Solomillo al Mojo Picón", desc: "Solomillo tierno con auténtico mojo canario.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/menu/solomillo_mojo.webp" },
      { id: "solomillo-whisky-tapa", nombre: "Solomillo al Whisky", desc: "El favorito de la casa en formato tapa.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/menu/solomillo.webp" },
      { id: "solomillo-carbonara", nombre: "Solomillo Carbonara", desc: "Solomillo con salsa cremosa de bacon.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Lácteos"], image: "/menu/solomillo_carbonara.webp" },
      { id: "pechuga-pollo-variada", nombre: "Pechuga de Pollo", desc: "Jugosa pechuga a la plancha.", prices: { tapa: 4.00, media: 8.00 }, image: "/menu/pechuga_pollo.webp" },
      { id: "lagartito-iberico-variada", nombre: "Lagartito Ibérico", desc: "Corte ibérico a la brasa muy jugoso.", prices: { tapa: 4.50, media: 9.00, racion: 18.00 }, image: "/menu/lagartito.webp" },
      { id: "carrilla-iberica", nombre: "Carrilla Ibérica", desc: "Carrillada tierna guisada a fuego lento.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/menu/carrilla.webp" },
      { id: "carne-con-tomate", nombre: "Carne con Tomate", desc: "Magro de cerdo con sofrito de tomate casero.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Dióxido de azufre y sulfitos"], image: "/menu/carne_tomate.webp" },
      { id: "alitas-pollo-tapa", nombre: "Alitas de Pollo", desc: "Alitas de pollo fritas y crujientes.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, image: "/menu/alitas.webp" },
    ]
  },
  "Montaditos": {
    items: [
      { id: "serranito-lomo-pollo", nombre: "Serranitos de Lomo o Pollo", prices: { racion: 5.00 }, desc: "El clásico de la casa con pimiento frito y jamón.", alergenos: ["Contiene Gluten"], image: "/menu/serranito.webp" },
      { id: "mini-serranito", nombre: "Mini Serranitos de Lomo o Pollo", prices: { racion: 4.00 }, desc: "Nuestra versión reducida del serranito tradicional.", alergenos: ["Contiene Gluten"], image: "/menu/mini_serranito.webp" },
      { id: "montadito-lomo-pollo", nombre: "Montaditos de Lomo o Pollo", prices: { racion: 3.50 }, desc: "Tierno lomo o pollo en pan crujiente.", alergenos: ["Contiene Gluten"], image: "/menu/montadito_lomo_pollo.webp" },
      { id: "montadito-jamon", nombre: "Montadito de Jamón", prices: { racion: 4.00 }, desc: "Jamón serrano seleccionado de primera calidad.", alergenos: ["Contiene Gluten"], image: "/menu/montadito_jamon.webp" },
      { id: "montadito-mechada", nombre: "Montadito de Carne Mechada", prices: { racion: 4.00 }, desc: "Carne mechada casera con su jugo.", alergenos: ["Contiene Gluten", "Dióxido de azufre y sulfitos"], image: "/menu/mechada.webp" },
    ]
  },
  "Pescado Frito": {
    items: [
      { id: "choco-frito", nombre: "Choco", desc: "Choco de la costa frito a la andaluza.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Moluscos"], image: "/menu/choco.webp" },
      { id: "calamares", nombre: "Calamares", desc: "Anillas de calamar frescas y crujientes.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Moluscos"], image: "/menu/calamares.webp" },
      { id: "boquerones-fritos", nombre: "Boquerones", desc: "Boquerones victorianos fritos en aceite de oliva.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Pescado"], image: "/menu/boquerones.webp" },
      { id: "cazon-adobo", nombre: "Cazón en Adobo", desc: "Cazón macerado con nuestra receta tradicional.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Contiene Gluten", "Pescado", "Dióxido de azufre y sulfitos"], image: "/menu/adobo.webp" },
      { id: "pijota", nombre: "Pijota", desc: "Pijota fresca de la lonja frita entera.", prices: { tapa: 5.00, media: 10.00 }, alergenos: ["Contiene Gluten", "Pescado"], image: "/menu/pijota.webp" },
      { id: "pavia-bacalao", nombre: "Pavía de Bacalao", prices: { tapa: 4.00 }, desc: "Precio por unidad. Bacalao desalado con rebozado crujiente.", unit: true, alergenos: ["Contiene Gluten", "Pescado"], image: "/menu/pavia_bacalao.webp" },
      { id: "twister-langostino", nombre: "Twister de Langostino", prices: { tapa: 4.00 }, desc: "Crujiente de langostino con un toque especial.", alergenos: ["Contiene Gluten", "Crustáceos", "Soja"], image: "/menu/twister_langostino.webp" },
    ]
  },
  "Pescado Plancha": {
    items: [
      { id: "chipirones-plancha", nombre: "Chipirones", desc: "Chipirones frescos a la plancha con aliño.", prices: { tapa: 4.00, media: 8.00 }, alergenos: ["Moluscos"], image: "/menu/chipirones_plancha.webp" },
      { id: "hueva-plancha", nombre: "Hueva", desc: "Hueva de pescado seleccionada a la plancha.", prices: { tapa: 4.00, media: 8.00, racion: 16.00 }, alergenos: ["Pescado"], image: "/menu/hueva_plancha.webp" },
      { id: "atun-plancha", nombre: "Atún", prices: { tapa: 5.00 }, desc: "Atún rojo a la plancha al punto de sal.", alergenos: ["Pescado"], image: "/menu/atun_plancha.webp" },
      { id: "pez-espada", nombre: "Pez Espada", prices: { racion: 10.00 }, desc: "Pez espada jugoso a la plancha con ajo y perejil.", alergenos: ["Pescado"], image: "/menu/pez_espada.webp" },
      { id: "choco-plancha", nombre: "Choco", prices: { tapa: 5.00 }, desc: "Choco fresco a la plancha con aliño verde.", alergenos: ["Moluscos"], image: "/menu/choco_plancha.webp" },
    ]
  },
  "Carnes a la Brasa": {
    items: [
      { id: "solomillo-iberico-brasa", nombre: "Solomillo Ibérico", prices: { racion: 14.00 }, desc: "Solomillo de cerdo ibérico seleccionado a la brasa.", image: "/menu/solomillo_iberico.webp" },
      { id: "entrecot-ternera", nombre: "Entrecot de Ternera", prices: { racion: 16.00 }, desc: "Entrecot de ternera rosada a la brasa.", image: "/menu/entrecot.webp" },
      { id: "churrasco-cerdo", nombre: "Churrasco de Cerdo", prices: { racion: 10.00 }, desc: "Tiras de costilla de cerdo a la brasa.", image: "/menu/churrasco_cerdo.webp" },
      { id: "presa-iberica", nombre: "Presa Ibérica", desc: "Presa ibérica de máxima calidad a la brasa.", prices: { tapa: 6.50, racion: 13.00 }, image: "/menu/presa.webp" },
    ],
    footer: "En todas las carnes: suplemento con jamón añadido de 4,50€. Salsa extra: 0,50€."
  },
  "Bebidas": {
    items: [
      { id: "cana-cruzcampo", nombre: "Caña Cruzcampo", desc: "Nuestra cerveza de barril, tirada a la perfección.", prices: { tapa: 1.50 }, image: "/menu/cana.png" },
      { id: "botellin-cruzcampo", nombre: "Botellín Cruzcampo", desc: "El tercio clásico, helado.", prices: { tapa: 1.80 }, image: "/menu/botellin.png" },
      { id: "jarra-cruzcampo", nombre: "Jarra de Cerveza", desc: "Medio litro de Cruzcampo bien tirada.", prices: { racion: 3.50 }, image: "/menu/jarra.png" },
      { id: "mosto-aljarafe", nombre: "Mosto del Aljarafe", desc: "Vino joven típico de nuestra tierra, suave y afrutado.", prices: { tapa: 1.50, media: 4.50, racion: 8.00 }, image: "/menu/mosto.png" },
      { id: "manzanilla-sanlucar", nombre: "Manzanilla de Sanlúcar", desc: "Vino generoso ideal para acompañar el pescaito frito.", prices: { tapa: 1.80, media: 12.00 }, image: "/menu/manzanilla.png" },
      { id: "vino-tinto-ribera", nombre: "Vino Tinto (Ribera o Rioja)", desc: "Copa de vino tinto seleccionado de la casa.", prices: { tapa: 2.50 }, image: "/menu/vino_tinto.png" },
      { id: "tinto-verano", nombre: "Tinto de Verano", desc: "Mezcla refrescante de vino tinto y limón o casera.", prices: { tapa: 2.50, racion: 8.00 }, image: "/menu/tinto_verano.png" },
      { id: "refrescos", nombre: "Refrescos Variados", desc: "Coca-Cola, Fanta, Aquarius, Nestea...", prices: { tapa: 2.20 }, image: "/menu/refresco.png" },
      { id: "combinado-nacional", nombre: "Copa Combinada", desc: "Larios, Barceló, Terry... con tu refresco favorito.", prices: { racion: 5.50 }, image: "/menu/combinado.png" },
      { id: "cafe-infusion", nombre: "Café o Infusión", desc: "Café recién hecho, té, manzanilla o poleo.", prices: { tapa: 1.40 }, image: "/menu/cafe.png" },
    ]
  }
};
