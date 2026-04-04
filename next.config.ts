import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
