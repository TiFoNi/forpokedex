/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
    unoptimized: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/HomePage",
  //     },
  //   ];
  // },
  output: "export",
};

module.exports = nextConfig;
