import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Add your allowed domains here
  },

};


module.exports = {
  output: 'standalone',
}

export default nextConfig;
