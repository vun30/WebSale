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
      {
        source: "/san-pham/sedan",
        destination: "/san-pham?type=sedan",
        permanent: true,
      },
      {
        source: "/san-pham/suv",
        destination: "/san-pham?type=suv",
        permanent: true,
      },
      {
        source: "/san-pham/mpv",
        destination: "/san-pham?type=mpv",
        permanent: true,
      },
      {
        source: "/san-pham/electric",
        destination: "/san-pham?type=electric",
        permanent: true,
      },
      {
        source:
          "/tin-tuc/danh-gia-santafe-2025-noi-that-rong-va-da-cong-nghe",
        destination: "/san-pham/santafe",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
