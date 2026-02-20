import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "backbencher.dev",
          },
        ],
        destination: "https://www.joby.blog",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.backbencher.dev",
          },
        ],
        destination: "https://www.joby.blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
