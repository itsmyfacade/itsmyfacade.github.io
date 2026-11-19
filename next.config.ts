import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(process.env.NODE_ENV === "development"
    ? {
        async redirects() {
          return [{ source: "/observatory/", destination: "/#observatory", permanent: false }];
        },
      }
    : {}),
};

export default nextConfig;
