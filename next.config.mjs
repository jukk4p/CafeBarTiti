
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Configuración optimizada para producción */
  // Mejora el rendimiento en Docker/VPS
  output: 'standalone',
  compress: true,
  transpilePackages: ['undici', 'firebase', '@firebase/auth', 'three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': false,
    };
    return config;
  },
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
