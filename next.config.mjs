/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "x8ki-letl-twmt.n7.xano.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "holushawlar.sirv.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "logo.png",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
