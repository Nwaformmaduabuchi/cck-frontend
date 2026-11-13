/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development", // Disable in dev to prevent caching issues
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
  reactStrictMode: true,
  
  // ADD THIS BLOCK TO FIX THE PWA BUILD CRASH
  experimental: {
    // Disables the isolated Webpack build worker that is deadlocking Workbox
    webpackBuildWorker: false,
  },
  // ADD THIS TO SILENCE THE TURBOPACK WARNING
  turbopack: {},
};

export default withPWA(nextConfig);
