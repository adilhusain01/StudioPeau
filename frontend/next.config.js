/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image optimisation ─────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // ── Compiler ───────────────────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── Performance headers ────────────────────────────────────────────────────
  async headers() {
    const headers = [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];

    if (process.env.NODE_ENV === "production") {
      headers.push(
        {
          // Long-term caching for static assets
          source: "/_next/static/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
        {
          // Cache optimised images
          source: "/_next/image(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=86400, stale-while-revalidate=604800",
            },
          ],
        },
      );
    }

    return headers;
  },

  // ── Redirects ──────────────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: "/book",
        destination: "/#contact",
        permanent: false,
      },
    ];
  },

  // ── Bundle analyser (enable with ANALYZE=true) ─────────────────────────────
  ...(process.env.ANALYZE === "true" && {
    experimental: {
      bundlePagesRouterDependencies: true,
    },
  }),
};

export default nextConfig;
