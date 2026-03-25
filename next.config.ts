import type { NextConfig } from "next";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  allowedDevOrigins: [
    "192.168.31.175",
    "localhost",
    "127.0.0.1",
    "luleedeiMac.local",
  ],
};

export default withBundleAnalyzer(nextConfig);
