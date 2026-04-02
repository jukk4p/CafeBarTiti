
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { StickyCallButton } from '@/components/StickyCallButton';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  themeColor: '#1F4E2D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Bar Titi - Tapas Tradicionales en Coria del Río | Sevilla',
    template: '%s | Cafe Bar Titi'
  },
  description: 'Desde 1968 ofreciendo el sabor auténtico de Sevilla. Serranitos, chocos y presa ibérica en el corazón de Coria del Río. ¡Reserva tu mesa!',
  keywords: ['Bar Titi', 'Tapas Coria del Río', 'Restaurante Sevilla', 'Serranitos Sevilla', 'Comer en Coria', 'Gastronomía Andaluza'],
  authors: [{ name: 'Cafe Bar Titi' }],
  metadataBase: new URL('https://bartiti.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bar Titi - Tapas Tradicionales en Coria del Río',
    description: 'El corazón del tapeo en Coria del Río desde 1968.',
    url: 'https://bartiti.com',
    siteName: 'Cafe Bar Titi',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/Portada/00_Portada.webp',
        width: 1200,
        height: 630,
        alt: 'Fachada Cafe Bar Titi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bar Titi - Tapas Tradicionales en Coria del Río',
    description: 'El corazón del tapeo en Coria del Río desde 1968.',
    images: ['/Portada/00_Portada.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Cafe Bar Titi",
    "image": "https://bartiti.com/Portada/00_Portada.webp",
    "@id": "https://bartiti.com",
    "url": "https://bartiti.com",
    "telephone": "+34954772132",
    "priceRange": "€",
    "servesCuisine": "Andaluza, Tapas",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Palomares, 1",
      "addressLocality": "Coria del Río",
      "addressRegion": "Sevilla",
      "postalCode": "41100",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.2882,
      "longitude": -6.0524
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday"],
        "opens": "06:00",
        "closes": "23:59"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Thursday", "Friday", "Saturday"],
        "opens": "06:00",
        "closes": "02:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "06:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/CasaTiTiCoriaDelRio/?locale=es_ES",
      "https://www.instagram.com/cafebartiti"
    ]
  };

  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FirebaseClientProvider>
            <Navbar />
            <main className="flex-grow" id="main-content">
              {children}
            </main>
            <Footer />
            <StickyCallButton />
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
