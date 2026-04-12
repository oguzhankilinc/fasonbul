import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use unoptimized images for local file uploads
    // This avoids issues with base64 data URLs and ephemeral file storage
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
