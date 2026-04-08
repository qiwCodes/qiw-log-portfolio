import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Allow accessing `next dev` from LAN/Tailscale hosts during development.
  allowedDevOrigins: ["100.92.17.67", "100.92.176.47"],
};

export default nextConfig;
