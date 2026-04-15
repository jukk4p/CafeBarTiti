/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Se recomienda mover esto a un archivo .env.local y no tenerlo en el repo.
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || "",
  },
  /* Configuración optimizada para producción */
  output: 'standalone',
  compress: true,
  transpilePackages: ['firebase', '@firebase/auth'],
  typescript: {
    // Ya no ignoramos errores.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Ya no ignoramos linting.
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
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
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
