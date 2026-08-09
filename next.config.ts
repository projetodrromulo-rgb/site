import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/cidades/:location',
        destination: '/ortopedista-especialista-em-coluna/:location',
        permanent: true,
      },
      {
        source: '/cidades',
        destination: '/ortopedista-especialista-em-coluna/belo-horizonte',
        permanent: true,
      },
      {
        source: '/cirurgia-minimamente-invasiva',
        destination: '/procedimentos/cirurgia-minimamente-invasiva-de-coluna',
        permanent: true,
      },
      {
        source: '/tratamento-de-escoliose',
        destination: '/procedimentos/tratamento-de-escoliose',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
