/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['admin.headsupb2b.com', 'firebasestorage.googleapis.com', 'cdn.hashnode.com'],
    minimumCacheTTL:604800
  },
  compiler: {
    removeConsole: false,
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/metals",
        destination: "/",
        // "permanent": false,
        statusCode: 301

      },
      {
        source: "/natural-stone",
        destination: "/",
        // "permanent": false,
        statusCode: 301
      },
      {
        source: "/aggregates",
        destination: "/",
        // "permanent": false,
        statusCode: 301
      },
      {
        source: "/sand",
        destination: "/",
        // "permanent": false,
        statusCode: 301
      },
      {
        source: "/electrical",
        destination: "/electricals",
        // "permanent": false,
        statusCode: 301
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          source: "/blog",
          destination: "https://blog.headsupb2b.com/blog",
        },
        {
          source: "/blog/:path*",
          destination: "https://blog.headsupb2b.com/blog/:path*",
        },
      ],

    }

  }

};

export default nextConfig;


