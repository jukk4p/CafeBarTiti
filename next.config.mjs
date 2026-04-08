
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    N8N_WEBHOOK_URL: "https://n8n-yiezniczwepznycn3bf3kj1n.137.74.115.57.sslip.io/webhook-test/38685c10-8a73-4e57-a50a-7c836ed96936",
  },
  /* Configuración optimizada para producción */
  // Mejora el rendimiento en Docker/VPS
  output: 'standalone',
  compress: true,
  transpilePackages: ['firebase', '@firebase/auth'],
  /* No special webpack alias needed for current setup */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimización de formatos de imagen
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
