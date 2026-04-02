
# Cafe Bar Titi - Web Oficial (Optimizado para Producción)

Esta es la aplicación web oficial de **Cafe Bar Titi**, un emblemático establecimiento de Coria del Río (Sevilla) fundado en 1968. La web ha sido optimizada para ofrecer un rendimiento excepcional, SEO local de alta fidelidad y una experiencia de usuario superior en dispositivos móviles y escritorio.

## 🚀 Funcionalidades Principales

- **Carta Digital Interactiva**: Exploración completa por categorías (Tapas, Raciones, Montaditos, etc.) con gestión detallada de alérgenos y precios actualizados.
- **Reservas Online**: Sistema intuitivo de solicitud de mesas para facilitar la planificación de los clientes y la gestión del local.
- **Galería Gastronómica**: Un recorrido visual por las especialidades y el ambiente del bar, con carga optimizada de imágenes.
- **Optimización SEO Local**: Implementación de datos estructurados (JSON-LD) de tipo `Restaurant` para mejorar el posicionamiento en Google Maps y búsquedas locales en Sevilla/Coria del Río.
- **Diseño Responsivo de Alta Fidelidad**: Interfaz optimizada específicamente para móviles con botones de acción rápida (llamada directa) y layouts adaptativos.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) en modo `standalone`.
- **UI/UX**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), y componentes de [ShadCN UI](https://ui.shadcn.com/).
- **IA**: [Genkit](https://firebase.google.com/docs/genkit) para la extracción inteligente de datos de menús físicos.
- **Backend**: Integración con **Firebase** (Firestore y Auth).
- **Despliegue**: Preparado para VPS (OVH/DigitalOcean) mediante Docker o PM2.

## ⚡ Optimización y Rendimiento

- **Lighthouse Score**: Objetivo 95+ en Performance, 100 en SEO y Accesibilidad.
- **Imágenes**: Uso de `next/image` con formatos WebP/AVIF y lazy loading.
- **Fuentes**: Google Fonts optimizadas con `next/font`.
- **Cache**: Configuración de Nginx para cache de assets estáticos y cabeceras de seguridad (CSP, HSTS).

## 📁 Estructura de Despliegue (VPS)

- `ecosystem.config.js`: Configuración de PM2 para modo cluster y auto-reinicio.
- `nginx.conf`: Configuración del servidor web con compresión Gzip y headers de seguridad.
- `next.config.ts`: Configuración optimizada para producción con salida `standalone`.

## 📦 Instalación y Desarrollo

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Construir para producción:
   ```bash
   npm run build
   ```

---
*Cafe Bar Titi: Tradición sevillana y sabor de ribera en cada detalle desde 1968.*
