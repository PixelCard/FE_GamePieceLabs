import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "laserox.net",
        pathname: "/cdn/shop/files/**",
      },
      {
        protocol: "https",
        hostname: "laserox.net",
        pathname: "/cdn/shop/collections/**",
      },
    ],
  },
};

export default nextConfig;
