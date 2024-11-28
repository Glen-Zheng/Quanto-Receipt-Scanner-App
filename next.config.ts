import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Increase the body size limit
    },
  },
};
export default nextConfig;
