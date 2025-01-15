/** @type {import('next').NextConfig} */
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    config.plugins.push(new NodePolyfillPlugin());
    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

export default nextConfig;