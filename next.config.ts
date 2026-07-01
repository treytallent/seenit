import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(dirname),
  },
  experimental: {
    testProxy: true,
  },
}

export default nextConfig
