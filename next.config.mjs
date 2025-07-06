/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      // any sub‑domain of example.com
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**", // allow every path
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // allow every path
      },
      // fakestoreapi already OK via domains, but here’s the explicit form:
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
