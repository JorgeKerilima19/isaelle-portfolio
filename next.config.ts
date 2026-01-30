// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Your other config (if any)
};

// Wrap with next-intl plugin
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
