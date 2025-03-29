/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Adjust cache settings to prevent memory issues
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        compression: 'gzip',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;