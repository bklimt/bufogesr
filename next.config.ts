import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/knobiknows/all-the-bufo/refs/heads/main/all-the-bufo/**')],
  },
};

export default nextConfig;
