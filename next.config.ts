import type { NextConfig } from 'next';
import dotenv from 'dotenv';
dotenv.config();

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    API_URL: process.env.API_URL,
    MONGO_ADDR: process.env.MONGO_ADDR,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_DATABASE: process.env.MONGO_DATABASE,
  },
};

export default nextConfig;
