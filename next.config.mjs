/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      esmExternals: 'loose'
    },
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
      return config;
    },
    images: {
      domains: ['res.cloudinary.com'],
    },
  }
  
  export default nextConfig
  