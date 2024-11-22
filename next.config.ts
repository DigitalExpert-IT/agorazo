import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.coinpayments.net',
        port: '',
        pathname: '/qrgen.php/**',
      },
    ],
  },
};

export default nextConfig;
