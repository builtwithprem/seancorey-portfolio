import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network access for mobile device testing
  allowedDevOrigins: ["192.168.88.176"],
};

export default nextConfig;
