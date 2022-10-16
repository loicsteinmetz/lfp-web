/** @type {import('next').NextConfig} */

require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_ROOT: process.env.API_ROOT,
  }
}

module.exports = nextConfig
