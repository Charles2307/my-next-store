import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prisma loads its native engine dynamically; include it in server functions.
  outputFileTracingIncludes: {
    "/*": ["./src/generated/prisma/libquery_engine-*.node"],
  },
  // Pin the workspace root so Turbopack does not walk up past the repo.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
