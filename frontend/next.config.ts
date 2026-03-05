import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    // Check if we are running inside docker or local dev
    // If DOCKER_ENV is set, route to the docker-compose backend service name
    const backendHost =
      process.env.DOCKER_ENV === "true"
        ? "http://backend:8000"
        : "http://127.0.0.1:8000";

    return [
      {
        source: "/api/:path*",
        destination: `${backendHost}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
