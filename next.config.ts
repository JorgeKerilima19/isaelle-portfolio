// next.config.ts
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  // Remove any "experimental: { turbo: ... }" — it's invalid
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)