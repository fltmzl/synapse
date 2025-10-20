import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin-panel",
        destination: "/admin-panel/clients",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
