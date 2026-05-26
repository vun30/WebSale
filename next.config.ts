import type { NextConfig } from "next";

const CANONICAL_HOST = "www.hyundaigialaiofficial.com.vn";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "hyundaigialaiofficial.com.vn" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
