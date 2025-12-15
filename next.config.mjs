/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "admin-u2be.corasolution.com",
      },
      {
        hostname: "127.0.0.1",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
