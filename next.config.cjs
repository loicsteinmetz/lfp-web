/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_ROOT: process.env.API_ROOT,
  }
}

module.exports = nextConfig
