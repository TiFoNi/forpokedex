/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
    unoptimized: true,
  },
  output: "export",
  // async exportPathMap() {
  //   return {
  //     "/": { page: "/app/HomePage" },
  //   };
  // },
};

module.exports = nextConfig;
